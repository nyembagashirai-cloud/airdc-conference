import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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
});

function generateCode(): string {
  return "AIRDC26-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

async function sendConfirmationEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  country: string;
  delegateType: string;
  confirmationCode: string;
}) {
  if (!process.env.RESEND_API_KEY) return;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #0D3B66, #1D4E89); padding: 40px 32px; text-align: center;">
        <h1 style="color: #D4AF37; font-size: 28px; margin: 0;">AIRDC 2026</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">23rd Annual Conference · Zimbabwe</p>
      </div>
      <div style="padding: 40px 32px;">
        <h2 style="color: #0D3B66; margin-top: 0;">Registration Confirmed ✓</h2>
        <p style="color: #374151;">Dear ${data.firstName},</p>
        <p style="color: #374151;">Thank you for registering for the <strong>23rd AIRDC Annual Conference</strong>. Your place is secured.</p>

        <div style="background: #F8F9FA; border-left: 4px solid #D4AF37; padding: 20px 24px; margin: 24px 0; border-radius: 0 8px 8px 0;">
          <p style="margin: 0 0 4px; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Your Confirmation Code</p>
          <p style="margin: 0; font-size: 28px; font-weight: bold; color: #0D3B66; letter-spacing: 2px;">${data.confirmationCode}</p>
          <p style="margin: 8px 0 0; color: #6B7280; font-size: 12px;">Keep this code — you will need it at registration</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 10px 0; color: #6B7280; font-size: 14px;">Name</td>
            <td style="padding: 10px 0; color: #111827; font-weight: 600; font-size: 14px;">${data.firstName} ${data.lastName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 10px 0; color: #6B7280; font-size: 14px;">Organisation</td>
            <td style="padding: 10px 0; color: #111827; font-size: 14px;">${data.organisation}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 10px 0; color: #6B7280; font-size: 14px;">Country</td>
            <td style="padding: 10px 0; color: #111827; font-size: 14px;">${data.country}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 10px 0; color: #6B7280; font-size: 14px;">Delegate Type</td>
            <td style="padding: 10px 0; color: #111827; font-size: 14px;">${data.delegateType}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 10px 0; color: #6B7280; font-size: 14px;">Dates</td>
            <td style="padding: 10px 0; color: #111827; font-size: 14px;">26–30 September 2026</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #6B7280; font-size: 14px;">Venue</td>
            <td style="padding: 10px 0; color: #111827; font-size: 14px;">Rainbow Towers Hotel, Harare, Zimbabwe</td>
          </tr>
        </table>

        <p style="color: #374151; font-size: 14px;">Further details including the full programme, accommodation guide and visa information will be sent closer to the conference date.</p>
        <p style="color: #374151; font-size: 14px;">For enquiries, please contact us at <a href="mailto:info@airdczim.co.zw" style="color: #0D3B66;">info@airdczim.co.zw</a></p>
      </div>
      <div style="background: #0D3B66; padding: 24px 32px; text-align: center;">
        <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0;">© 2026 AIRDC · 23rd Annual Conference · Harare, Zimbabwe</p>
        <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 4px 0 0;">www.airdczim.co.zw</p>
      </div>
    </div>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "AIRDC 2026 <noreply@airdczim.co.zw>",
      to: data.email,
      subject: `Registration Confirmed — AIRDC 2026 · ${data.confirmationCode}`,
      html,
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
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
          workshopChoice: data.workshopChoice,
          dietaryRequirements: data.dietaryRequirements,
          specialNeeds: data.specialNeeds,
          confirmationCode,
          paymentStatus: "PENDING",
        },
      });
    }

    // Send confirmation email (non-blocking — don't fail registration if email fails)
    try {
      await sendConfirmationEmail({
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

// GET — fetch all registrations for admin dashboard
export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ registrations: [] });
  }
  try {
    const { prisma } = await import("@/lib/prisma");
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ registrations });
  } catch (error) {
    console.error("Fetch registrations error:", error);
    return NextResponse.json({ registrations: [] });
  }
}
