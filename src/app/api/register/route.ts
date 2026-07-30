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
  dietaryRequirements: z.string().optional(),
  specialNeeds: z.string().optional(),
  terms: z.boolean(),
  turnstileToken: z.string().optional(),
});


async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Skip if not configured
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const json = await res.json() as { success: boolean };
    return json.success === true;
  } catch {
    return false;
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
    const tokenOk = await verifyTurnstile(data.turnstileToken ?? "");
    if (!tokenOk) {
      return NextResponse.json({ error: "CAPTCHA verification failed. Please refresh and try again." }, { status: 400 });
    }
  }
    const confirmationCode = generateCode();

    if (process.env.DATABASE_URL) {
      const { prisma } = await import("@/lib/prisma");
      await prisma.registration.create({
        data: {
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
          dietaryRequirements: data.dietaryRequirements,
          specialNeeds: data.specialNeeds,
          confirmationCode,
          paymentStatus: "PENDING",
        },
      });
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
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
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
