import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateInvoicePdf } from "@/lib/invoice-pdf";

export const dynamic = "force-dynamic";

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

function getRegistrationFee(delegateType: string): string {
  const feeMap: Record<string, string> = {
    AIRDC_MEMBER: "350.00",
    SUPERVISORY_AUTHORITY_MEMBER: "350.00",
    NON_MEMBER: "500.00",
    SUPERVISORY_AUTHORITY_NON_MEMBER: "500.00",
    MEDIA_SPEAKER_ORGANISER: "0.00",
  };
  return feeMap[delegateType] ?? "0.00";
}

function getDelegateLabel(delegateType: string): string {
  const labels: Record<string, string> = {
    AIRDC_MEMBER: "AIRDC Member",
    NON_MEMBER: "Non Member",
    SUPERVISORY_AUTHORITY_MEMBER: "Supervisory Authority / AIRDC Member",
    SUPERVISORY_AUTHORITY_NON_MEMBER: "Supervisory Authority / Non Member",
    MEDIA_SPEAKER_ORGANISER: "Media / Speaker / Organiser",
  };
  return labels[delegateType] ?? delegateType;
}

async function sendConfirmationEmail(data: {
  civility?: string;
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  country: string;
  delegateType: string;
  confirmationCode: string;
}) {
  if (!process.env.RESEND_API_KEY) return;

  const fee = getRegistrationFee(data.delegateType);
  const isComplimentary = fee === "0.00";
  const delegateLabel = getDelegateLabel(data.delegateType);
  const feeDisplay = isComplimentary ? "USD $0.00" : ("USD $" + fee);
  const paymentEmailBlock = isComplimentary ? "" :
    '<div style="background:#FEF3C7;border:1px solid #D97706;border-radius:8px;padding:16px 20px;margin:20px 0">' +
    '<p style="margin:0 0 6px;color:#92400E;font-size:13px;font-weight:700">Payment Instructions</p>' +
    '<p style="margin:0;color:#78350F;font-size:13px;line-height:1.6">Your proforma invoice is attached. ' +
    'A member of our team will contact you within 48 hours with full payment instructions. ' +
    'Please reference <strong>' + data.confirmationCode + '</strong> in all payment correspondence.</p></div>';

  const html =
    '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff">' +
    '<div style="background:linear-gradient(135deg,#0D3B66,#1D4E89);padding:40px 32px;text-align:center">' +
    '<h1 style="color:#D4AF37;font-size:28px;margin:0">AIRDC 2026</h1>' +
    '<p style="color:rgba(255,255,255,.8);margin:8px 0 0">24th Annual Conference &mdash; Zimbabwe</p></div>' +
    '<div style="padding:40px 32px">' +
    '<h2 style="color:#0D3B66;margin-top:0">Registration Confirmed</h2>' +
    '<p style="color:#374151">Dear ' + data.firstName + ',</p>' +
    '<p style="color:#374151">Thank you for registering for the <strong>24th AIRDC Annual Conference</strong>. Your place is secured.</p>' +
    '<div style="background:#F8F9FA;border-left:4px solid #D4AF37;padding:20px 24px;margin:24px 0;border-radius:0 8px 8px 0">' +
    '<p style="margin:0 0 4px;color:#6B7280;font-size:12px;text-transform:uppercase;letter-spacing:1px">Your Confirmation Code</p>' +
    '<p style="margin:0;font-size:28px;font-weight:bold;color:#0D3B66;letter-spacing:2px">' + data.confirmationCode + '</p>' +
    '<p style="margin:8px 0 0;color:#6B7280;font-size:12px">Keep this code &mdash; you will need it at registration</p></div>' +
    '<table style="width:100%;border-collapse:collapse;margin:24px 0">' +
    '<tr style="border-bottom:1px solid #E5E7EB"><td style="padding:10px 0;color:#6B7280;font-size:14px">Name</td>' +
    '<td style="padding:10px 0;color:#111827;font-weight:600;font-size:14px">' + data.firstName + ' ' + data.lastName + '</td></tr>' +
    '<tr style="border-bottom:1px solid #E5E7EB"><td style="padding:10px 0;color:#6B7280;font-size:14px">Organisation</td>' +
    '<td style="padding:10px 0;color:#111827;font-size:14px">' + data.organisation + '</td></tr>' +
    '<tr style="border-bottom:1px solid #E5E7EB"><td style="padding:10px 0;color:#6B7280;font-size:14px">Country</td>' +
    '<td style="padding:10px 0;color:#111827;font-size:14px">' + data.country + '</td></tr>' +
    '<tr style="border-bottom:1px solid #E5E7EB"><td style="padding:10px 0;color:#6B7280;font-size:14px">Delegate Category</td>' +
    '<td style="padding:10px 0;color:#111827;font-size:14px">' + delegateLabel + '</td></tr>' +
    '<tr style="border-bottom:1px solid #E5E7EB"><td style="padding:10px 0;color:#6B7280;font-size:14px">Registration Fee</td>' +
    '<td style="padding:10px 0;color:#0D3B66;font-weight:700;font-size:14px">' + feeDisplay + '</td></tr>' +
    '<tr style="border-bottom:1px solid #E5E7EB"><td style="padding:10px 0;color:#6B7280;font-size:14px">Dates</td>' +
    '<td style="padding:10px 0;color:#111827;font-size:14px">27&ndash;30 September 2026</td></tr>' +
    '<tr><td style="padding:10px 0;color:#6B7280;font-size:14px">Venue</td>' +
    '<td style="padding:10px 0;color:#111827;font-size:14px">Rainbow Towers Hotel, Harare, Zimbabwe</td></tr></table>' +
    paymentEmailBlock +
    '<p style="color:#374151;font-size:14px">Further details including the full programme, accommodation guide and visa information will be sent closer to the conference date.</p>' +
    '<p style="color:#374151;font-size:14px">For enquiries, contact us at <a href="mailto:info@airdczim.co.zw" style="color:#0D3B66">info@airdczim.co.zw</a></p></div>' +
    '<div style="background:#0D3B66;padding:24px 32px;text-align:center">' +
    '<p style="color:rgba(255,255,255,.6);font-size:12px;margin:0">2026 AIRDC &mdash; 24th Annual Conference &mdash; Harare, Zimbabwe</p>' +
    '<p style="color:rgba(255,255,255,.4);font-size:11px;margin:4px 0 0">www.airdczim.co.zw</p></div></div>';

  const invoicePdfBuffer = await generateInvoicePdf({
    fullName: (data.civility ? data.civility + " " : "") + data.firstName + " " + data.lastName,
    email: data.email,
    organisation: data.organisation,
    country: data.country,
    delegateLabel: getDelegateLabel(data.delegateType),
    confirmationCode: data.confirmationCode,
    fee,
    isComplimentary,
  });
  const invoiceBase64 = invoicePdfBuffer.toString("base64");

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "AIRDC 2026 <onboarding@resend.dev>",
      to: data.email,
      subject: `Registration Confirmed — AIRDC 2026 — ${data.confirmationCode}`,
      html,
      attachments: [
        { filename: `AIRDC2026-Invoice-${data.confirmationCode}.pdf`, content: invoiceBase64 },
      ],
    }),
  });
  if (!resendRes.ok) {
    const resendError = await resendRes.json().catch(() => ({}));
    console.error("Resend API error:", resendRes.status, JSON.stringify(resendError));
    throw new Error(`Resend ${resendRes.status}: ${JSON.stringify(resendError)}`);
  }
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
