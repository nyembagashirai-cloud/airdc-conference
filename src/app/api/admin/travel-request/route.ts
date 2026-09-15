import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  sendTravelRequestEmail,
  travelFormUrl,
  DEFAULT_DEADLINE,
  type TravelSendResult,
} from "@/lib/travel-details";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

/** Sending more than this per request risks a serverless timeout. */
const MAX_BATCH = 5;
/** Resend's default limit is 2 requests/second. */
const THROTTLE_MS = 600;

const postSchema = z.object({
  codes: z.array(z.string().min(1)).min(1).max(MAX_BATCH),
  /** When set, all mail goes to this address instead of the delegates. */
  testEmail: z.string().email().optional(),
  deadline: z.string().max(60).optional(),
});

type Recipient = {
  confirmationCode: string;
  email: string;
  name: string;
  firstName: string;
  organisation: string;
  country: string;
  /** True once the delegate has submitted the travel form. */
  submitted: boolean;
  /** True when we already hold arrival flight details from registration. */
  hasFlightInfo: boolean;
  hasHotel: boolean;
  formLink: string;
  duplicatesSkipped: number;
};

async function requireAdmin() {
  const { auth } = await import("@/auth");
  const session = await auth();
  return session ?? null;
}

const isZimbabwe = (country: string) =>
  country.trim().toLowerCase().replace(/\s+/g, " ") === "zimbabwe";

/**
 * Non-Zimbabwe delegates, one entry per email address, keeping the most recent
 * registration for that address.
 */
async function buildRecipients(): Promise<Recipient[]> {
  const { prisma } = await import("@/lib/prisma");
  const all = await prisma.registration.findMany({ orderBy: { createdAt: "desc" } });

  const byEmail = new Map<string, Recipient>();
  for (const r of all) {
    if (!r.email || !r.confirmationCode) continue;
    if (isZimbabwe(r.country || "")) continue;

    const key = r.email.trim().toLowerCase();
    const existing = byEmail.get(key);
    if (existing) {
      existing.duplicatesSkipped += 1;
      continue;
    }

    byEmail.set(key, {
      confirmationCode: r.confirmationCode,
      email: r.email.trim(),
      name: [r.civility, r.firstName, r.lastName].filter(Boolean).join(" ").replace(/\s+/g, " ").trim(),
      firstName: r.firstName,
      organisation: r.organisation,
      country: r.country,
      submitted: Boolean(r.travelUpdatedAt),
      hasFlightInfo: Boolean(r.arrivalDate && r.flightNumber),
      hasHotel: Boolean(r.accommodation && r.accommodation !== "Not yet decided"),
      formLink: travelFormUrl(r.confirmationCode, r.email),
      duplicatesSkipped: 0,
    });
  }
  return [...byEmail.values()];
}

/**
 * GET /api/admin/travel-request
 *   Dry run. Returns who would be emailed. Sends nothing.
 */
export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "No database configured" }, { status: 500 });
  }
  try {
    const recipients = await buildRecipients();
    return NextResponse.json({
      totalRecipients: recipients.length,
      alreadySubmitted: recipients.filter(r => r.submitted).length,
      duplicatesCollapsed: recipients.reduce((n, r) => n + r.duplicatesSkipped, 0),
      resendConfigured: Boolean(process.env.RESEND_API_KEY),
      defaultDeadline: DEFAULT_DEADLINE,
      maxBatch: MAX_BATCH,
      recipients,
    });
  } catch (e) {
    console.error("Travel request dry run failed:", e);
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

/**
 * POST /api/admin/travel-request
 *   Body: { codes: string[], testEmail?: string, deadline?: string }
 *   Sends the travel details request, one at a time, throttled, with a
 *   per-recipient result so failures can be retried without re-sending successes.
 */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "No database configured" }, { status: 500 });
  }

  let parsed: z.infer<typeof postSchema>;
  try {
    parsed = postSchema.parse(await req.json());
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { prisma } = await import("@/lib/prisma");
  const results: TravelSendResult[] = [];

  for (let i = 0; i < parsed.codes.length; i++) {
    const code = parsed.codes[i];
    const reg = await prisma.registration.findFirst({ where: { confirmationCode: code } });

    if (!reg) {
      results.push({
        email: "(unknown)",
        confirmationCode: code,
        ok: false,
        error: "No registration found for this confirmation code",
      });
      continue;
    }

    results.push(
      await sendTravelRequestEmail(
        {
          civility: reg.civility,
          firstName: reg.firstName,
          lastName: reg.lastName,
          email: reg.email,
          organisation: reg.organisation,
          country: reg.country,
          confirmationCode: reg.confirmationCode ?? code,
          deadline: parsed.deadline,
        },
        { overrideTo: parsed.testEmail }
      )
    );

    if (i < parsed.codes.length - 1) {
      await new Promise(r => setTimeout(r, THROTTLE_MS));
    }
  }

  const sent = results.filter(r => r.ok).length;
  return NextResponse.json({
    sent,
    failed: results.length - sent,
    testMode: Boolean(parsed.testEmail),
    results,
  });
}
