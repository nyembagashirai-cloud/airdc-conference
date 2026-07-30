import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  sendConfirmationEmail,
  getDelegateLabel,
  getRegistrationFee,
  type SendResult,
} from "@/lib/confirmation-email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

/** Sending more than this per request risks a serverless timeout. */
const MAX_BATCH = 4;
/** Resend's default limit is 2 requests/second. */
const THROTTLE_MS = 600;

const postSchema = z.object({
  codes: z.array(z.string().min(1)).min(1).max(MAX_BATCH),
  /** When set, all mail goes to this address instead of the delegates. */
  testEmail: z.string().email().optional(),
});

type Recipient = {
  confirmationCode: string;
  email: string;
  name: string;
  organisation: string;
  country: string;
  delegateLabel: string;
  fee: string;
  registeredAt: string;
  duplicatesSkipped: number;
};

async function requireAdmin() {
  const { auth } = await import("@/auth");
  const session = await auth();
  return session ?? null;
}

/**
 * Builds the deduplicated recipient list: one entry per email address, keeping
 * the most recent registration for that address.
 */
async function buildRecipients(): Promise<Recipient[]> {
  const { prisma } = await import("@/lib/prisma");
  const all = await prisma.registration.findMany({ orderBy: { createdAt: "desc" } });

  const byEmail = new Map<string, Recipient>();
  for (const r of all) {
    if (!r.email || !r.confirmationCode) continue;
    const key = r.email.trim().toLowerCase();
    const existing = byEmail.get(key);
    if (existing) {
      // Already have a newer record for this address (list is desc by createdAt).
      existing.duplicatesSkipped += 1;
      continue;
    }
    byEmail.set(key, {
      confirmationCode: r.confirmationCode,
      email: r.email.trim(),
      name: [r.civility, r.firstName, r.lastName].filter(Boolean).join(" ").replace(/\s+/g, " ").trim(),
      organisation: r.organisation,
      country: r.country,
      delegateLabel: getDelegateLabel(r.delegateType),
      fee: getRegistrationFee(r.delegateType),
      registeredAt: r.createdAt.toISOString(),
      duplicatesSkipped: 0,
    });
  }
  return [...byEmail.values()];
}

/**
 * GET /api/register/resend
 *   Dry run. Returns who would be emailed, with duplicates already collapsed.
 *   Sends nothing.
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
      duplicatesCollapsed: recipients.reduce((n, r) => n + r.duplicatesSkipped, 0),
      resendConfigured: Boolean(process.env.RESEND_API_KEY),
      maxBatch: MAX_BATCH,
      recipients,
    });
  } catch (e) {
    console.error("Resend dry run failed:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}

/**
 * POST /api/register/resend
 *   Body: { codes: string[], testEmail?: string }
 *   Sends the confirmation + invoice for each confirmation code, one at a time,
 *   throttled. Returns a per-recipient result so the caller can retry failures
 *   without re-sending successes.
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
  const results: SendResult[] = [];

  for (let i = 0; i < parsed.codes.length; i++) {
    const code = parsed.codes[i];
    const reg = await prisma.registration.findFirst({ where: { confirmationCode: code } });

    if (!reg) {
      results.push({
        email: "(unknown)",
        confirmationCode: code,
        ok: false,
        attached: false,
        error: "No registration found for this confirmation code",
      });
      continue;
    }

    try {
      results.push(
        await sendConfirmationEmail(
          {
            civility: reg.civility,
            firstName: reg.firstName,
            lastName: reg.lastName,
            email: reg.email,
            organisation: reg.organisation,
            country: reg.country,
            delegateType: reg.delegateType,
            confirmationCode: reg.confirmationCode ?? code,
          },
          { isResend: true, overrideTo: parsed.testEmail }
        )
      );
    } catch (e) {
      results.push({
        email: parsed.testEmail || reg.email,
        confirmationCode: code,
        ok: false,
        attached: false,
        error: e instanceof Error ? e.message : String(e),
      });
    }

    // Stay under Resend's rate limit (skip the wait after the final send).
    if (i < parsed.codes.length - 1) {
      await new Promise((r) => setTimeout(r, THROTTLE_MS));
    }
  }

  const sent = results.filter((r) => r.ok).length;
  return NextResponse.json({
    sent,
    failed: results.length - sent,
    testMode: Boolean(parsed.testEmail),
    results,
  });
}
