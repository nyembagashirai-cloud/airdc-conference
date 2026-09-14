import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendConfirmationEmail } from "@/lib/confirmation-email";

export const dynamic = "force-dynamic";
// PDF rendering needs the Node runtime (fs + @react-pdf/renderer)
export const runtime = "nodejs";
export const maxDuration = 30;

const schema = z.object({
  civility: z.enum(["Mr.", "Mrs.", "Ms."]).optional(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  passportId: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  organisation: z.string().min(2),
  companyAddress: z.string().optional(),
  jobTitle: z.string().min(2),
  country: z.string().min(2),
  delegateType: z.string(),
  branchOfActivity: z.string().optional(),
  visaInvitation: z.enum(["YES", "NO"]).optional(),
  arrivalDate: z.string().optional(),
  arrivalTime: z.string().optional(),
  departureDate: z.string().optional(),
  departureTime: z.string().optional(),
  airlineCompany: z.string().optional(),
  flightNumber: z.string().optional(),
  workshopChoice: z.string().optional(),
  accommodation: z.string().optional(),
  dietaryRequirements: z.string().optional(),
  specialNeeds: z.string().optional(),
  terms: z.boolean(),
  turnstileToken: z.string().optional(),
});


type TurnstileResult = { ok: boolean; codes: string[] };

async function verifyTurnstile(token: string): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: true, codes: [] }; // Skip if not configured
  if (!token) return { ok: false, codes: ["missing-input-response"] };
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const json = await res.json() as { success: boolean; "error-codes"?: string[] };
    return { ok: json.success === true, codes: json["error-codes"] ?? [] };
  } catch (err) {
    // Cloudflare unreachable from the function. Blocking a real delegate over a
    // network blip is worse than the spam risk, so let the registration through
    // and record it in the logs.
    console.error("Turnstile siteverify unreachable, allowing registration:", err);
    return { ok: true, codes: ["siteverify-unreachable"] };
  }
}

function generateCode(): string {
  return "AIRDC26-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

  // Verify Turnstile CAPTCHA if secret key is configured
  if (process.env.TURNSTILE_SECRET_KEY) {
    const turnstile = await verifyTurnstile(data.turnstileToken ?? "");
    if (!turnstile.ok) {
      console.error(
        `Turnstile rejected a registration for ${data.email}. Codes: ${turnstile.codes.join(", ") || "none"}`
      );
      return NextResponse.json(
        {
          error:
            "The security check has expired. Please tick the security box again, then press Submit. If it keeps failing, email info@airdczim.co.zw and we will register you.",
        },
        { status: 400 }
      );
    }
  }
    const confirmationCode = generateCode();

    if (process.env.DATABASE_URL) {
      const { prisma } = await import("@/lib/prisma");
      const registrationData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          organisation: data.organisation,
          jobTitle: data.jobTitle,
          country: data.country,
          delegateType: data.delegateType,
          civility: data.civility,
          passportId: data.passportId,
          companyAddress: data.companyAddress,
          branchOfActivity: data.branchOfActivity,
          visaInvitation: data.visaInvitation,
          arrivalDate: data.arrivalDate,
          arrivalTime: data.arrivalTime,
          departureDate: data.departureDate,
          departureTime: data.departureTime,
          airlineCompany: data.airlineCompany,
          flightNumber: data.flightNumber,
          workshopChoice: data.workshopChoice,
          accommodation: data.accommodation,
          dietaryRequirements: data.dietaryRequirements,
          specialNeeds: data.specialNeeds,
          confirmationCode,
          paymentStatus: "PENDING" as const,
      };

      try {
        await prisma.registration.create({ data: registrationData });
      } catch (dbError) {
        // If the `accommodation` column has not been added to the database yet,
        // still save the registration rather than losing the delegate.
        console.error("Registration insert failed, retrying without accommodation:", dbError);
        const { accommodation, ...withoutAccommodation } = registrationData;
        void accommodation;
        await prisma.registration.create({ data: withoutAccommodation });
      }
    }

    try {
      await sendConfirmationEmail({
        civility: data.civility,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        organisation: data.organisation,
        country: data.country,
        delegateType: data.delegateType,
        confirmationCode,
      });
    } catch (emailError) {
      console.error("Email sending failed (non-fatal):", emailError);
    }

    return NextResponse.json({ success: true, confirmationCode });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fields = Array.from(new Set(error.errors.map(e => e.path.join(".")).filter(Boolean)));
      console.error("Registration rejected by validation. Fields:", fields.join(", "));
      return NextResponse.json(
        {
          error: fields.length
            ? `Please check these fields and submit again: ${fields.join(", ")}`
            : "Some of the details entered are not valid. Please check the form and submit again.",
          fields,
        },
        { status: 400 }
      );
    }
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "We could not save your registration. Please try again in a moment, or email info@airdczim.co.zw and we will register you." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Delegate records contain passport/ID numbers, phone numbers, addresses and
  // travel details — this endpoint must never be publicly readable.
  const { auth } = await import("@/auth");
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ registrations: [] });
  }
  try {
    const { prisma } = await import("@/lib/prisma");
    const registrations = await prisma.registration.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ registrations });
  } catch (error) {
    console.error("Fetch registrations error:", error);
    return NextResponse.json({ registrations: [] });
  }
}

export async function DELETE(req: NextRequest) {
  const { auth } = await import("@/auth");
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "No database" }, { status: 500 });
  }
  try {
    const { prisma } = await import("@/lib/prisma");
    // If IDs provided in body, delete only those; otherwise delete all
    let ids: string[] | undefined;
    try {
      const body = await req.json();
      if (Array.isArray(body.ids) && body.ids.length > 0) ids = body.ids;
    } catch { /* no body = delete all */ }

    const { count } = await prisma.registration.deleteMany(
      ids ? { where: { id: { in: ids } } } : undefined
    );
    console.log(`Admin deleted ${count} registrations${ids ? ` (selected)` : ` (all)`}`);
    return NextResponse.json({ success: true, deleted: count });
  } catch (error) {
    console.error("Delete registrations error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
