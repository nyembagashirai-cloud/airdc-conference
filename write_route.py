content = r'''import { NextRequest, NextResponse } from "next/server";
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

function getRegistrationFee(delegateType: string): string {
  const feeMap: Record<string, string> = {
    AIRDC_MEMBER: "350.00",
    SUPERVISORY_AUTHORITY_MEMBER: "350.00",
    NATIONAL_ASSOCIATION: "350.00",
    NON_MEMBER: "500.00",
    SUPERVISORY_AUTHORITY_NON_MEMBER: "500.00",
  };
  return feeMap[delegateType] ?? "0.00";
}

function getDelegateLabel(delegateType: string): string {
  const labels: Record<string, string> = {
    AIRDC_MEMBER: "AIRDC Member",
    NON_MEMBER: "Non Member",
    SUPERVISORY_AUTHORITY_MEMBER: "Supervisory Authority / AIRDC Member",
    SUPERVISORY_AUTHORITY_NON_MEMBER: "Supervisory Authority / Non Member",
    NATIONAL_ASSOCIATION: "National Association / Training Institution",
    SPONSOR: "Sponsor",
    SPEAKER: "Speaker",
    ORGANISER: "Organiser",
    MEDIA: "Media",
  };
  return labels[delegateType] ?? delegateType;
}

function buildInvoiceHtml(
  fullName: string,
  email: string,
  organisation: string,
  country: string,
  delegateLabel: string,
  confirmationCode: string,
  invoiceDate: string,
  feeDisplay: string,
  totalDisplay: string,
  paymentBlock: string
): string {
  return (
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>AIRDC 2026 Invoice ' +
    confirmationCode +
    '</title></head><body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#F8F9FA;">' +
    '<div style="max-width:700px;margin:40px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)">' +
    '<div style="background:linear-gradient(135deg,#0D3B66,#1D4E89);padding:40px 48px;text-align:center">' +
    '<h1 style="margin:0;color:#D4AF37;font-size:32px;font-weight:900;letter-spacing:2px">AIRDC 2026</h1>' +
    '<p style="margin:8px 0 0;color:rgba(255,255,255,.85);font-size:15px">24th Annual Conference &mdash; Harare, Zimbabwe</p>' +
    '<p style="margin:4px 0 0;color:rgba(255,255,255,.55);font-size:13px">27&ndash;30 September 2026 &middot; Rainbow Towers Hotel</p></div>' +
    '<div style="background:#D4AF37;padding:14px 48px;display:flex;justify-content:space-between">' +
    '<span style="font-size:18px;font-weight:700;color:#0D3B66;letter-spacing:1px">PROFORMA INVOICE</span>' +
    '<span style="font-size:13px;color:#0D3B66;font-weight:600">' + confirmationCode + '</span></div>' +
    '<div style="padding:32px 48px 0;display:flex;justify-content:space-between;gap:24px">' +
    '<div><p style="margin:0 0 4px;color:#6B7280;font-size:11px;text-transform:uppercase;letter-spacing:1px">Invoice Date</p>' +
    '<p style="margin:0;color:#111827;font-size:14px;font-weight:600">' + invoiceDate + '</p></div>' +
    '<div><p style="margin:0 0 4px;color:#6B7280;font-size:11px;text-transform:uppercase;letter-spacing:1px">Reference</p>' +
    '<p style="margin:0;color:#111827;font-size:14px;font-weight:600">' + confirmationCode + '</p></div>' +
    '<div><p style="margin:0 0 4px;color:#6B7280;font-size:11px;text-transform:uppercase;letter-spacing:1px">Status</p>' +
    '<p style="margin:0;color:#D97706;font-size:14px;font-weight:700">PENDING</p></div></div>' +
    '<div style="padding:24px 48px 0">' +
    '<p style="margin:0 0 8px;color:#6B7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600">Bill To</p>' +
    '<div style="background:#F8F9FA;border-radius:8px;padding:20px 24px">' +
    '<p style="margin:0 0 4px;color:#111827;font-size:15px;font-weight:700">' + fullName + '</p>' +
    '<p style="margin:0 0 2px;color:#374151;font-size:13px">' + organisation + '</p>' +
    '<p style="margin:0 0 2px;color:#374151;font-size:13px">' + country + '</p>' +
    '<p style="margin:0;color:#374151;font-size:13px">' + email + '</p></div></div>' +
    '<div style="padding:24px 48px 0"><table style="width:100%;border-collapse:collapse">' +
    '<thead><tr style="background:#0D3B66">' +
    '<th style="padding:12px 16px;text-align:left;color:#fff;font-size:12px;text-transform:uppercase">Description</th>' +
    '<th style="padding:12px 16px;text-align:center;color:#fff;font-size:12px;text-transform:uppercase">Qty</th>' +
    '<th style="padding:12px 16px;text-align:right;color:#fff;font-size:12px;text-transform:uppercase">Amount</th>' +
    '</tr></thead><tbody>' +
    '<tr style="border-bottom:1px solid #E5E7EB">' +
    '<td style="padding:16px;color:#111827;font-size:14px">Conference Registration &mdash; ' + delegateLabel +
    '<br><span style="color:#6B7280;font-size:12px">24th AIRDC Annual Conference &middot; 27&ndash;30 Sep 2026 &middot; Harare</span></td>' +
    '<td style="padding:16px;text-align:center;color:#111827;font-size:14px">1</td>' +
    '<td style="padding:16px;text-align:right;color:#111827;font-size:14px;font-weight:600">' + feeDisplay + '</td></tr>' +
    '</tbody><tfoot><tr style="background:#F8F9FA">' +
    '<td colspan="2" style="padding:16px;text-align:right;color:#374151;font-size:14px;font-weight:700">Total Due:</td>' +
    '<td style="padding:16px;text-align:right;color:#0D3B66;font-size:20px;font-weight:900">' + totalDisplay + '</td>' +
    '</tr></tfoot></table></div>' +
    paymentBlock +
    '<div style="padding:24px 48px 0"><p style="margin:0 0 8px;color:#6B7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600">Event Details</p>' +
    '<table style="width:100%;border-collapse:collapse">' +
    '<tr style="border-bottom:1px solid #E5E7EB"><td style="padding:10px 0;color:#6B7280;font-size:13px;width:40%">Conference</td>' +
    '<td style="padding:10px 0;color:#111827;font-size:13px;font-weight:600">24th AIRDC Annual Conference 2026</td></tr>' +
    '<tr style="border-bottom:1px solid #E5E7EB"><td style="padding:10px 0;color:#6B7280;font-size:13px">Dates</td>' +
    '<td style="padding:10px 0;color:#111827;font-size:13px;font-weight:600">27&ndash;30 September 2026</td></tr>' +
    '<tr style="border-bottom:1px solid #E5E7EB"><td style="padding:10px 0;color:#6B7280;font-size:13px">Venue</td>' +
    '<td style="padding:10px 0;color:#111827;font-size:13px;font-weight:600">Rainbow Towers Hotel &amp; Conference Centre, Harare, Zimbabwe</td></tr>' +
    '<tr><td style="padding:10px 0;color:#6B7280;font-size:13px">Confirmation Code</td>' +
    '<td style="padding:10px 0;color:#0D3B66;font-size:13px;font-weight:900;letter-spacing:1px">' + confirmationCode + '</td></tr>' +
    '</table></div>' +
    '<div style="margin-top:40px;background:#0D3B66;padding:28px 48px;text-align:center">' +
    '<p style="margin:0 0 6px;color:#D4AF37;font-size:13px;font-weight:600">AIRDC 2026 Local Organising Committee</p>' +
    '<p style="margin:0 0 4px;color:rgba(255,255,255,.6);font-size:12px">info@airdczim.co.zw &middot; www.airdczim.co.zw</p>' +
    '<p style="margin:8px 0 0;color:rgba(255,255,255,.35);font-size:11px">This is a proforma invoice. It is not a receipt of payment.</p>' +
    '</div></div></body></html>'
  );
}

function generateInvoiceHtml(data: {
  civility?: string;
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  country: string;
  delegateType: string;
  confirmationCode: string;
}): string {
  const fee = getRegistrationFee(data.delegateType);
  const isComplimentary = fee === "0.00";
  const delegateLabel = getDelegateLabel(data.delegateType);
  const invoiceDate = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  const fullName = [data.civility, data.firstName, data.lastName].filter(Boolean).join(" ");
  const feeDisplay = isComplimentary ? "Complimentary" : ("USD $" + fee);
  const totalDisplay = isComplimentary ? "Complimentary" : ("USD $" + fee);
  const paymentBlock = isComplimentary ? "" :
    '<div style="padding:24px 48px 0">' +
    '<div style="background:#FEF3C7;border:1px solid #D97706;border-radius:8px;padding:20px 24px">' +
    '<p style="margin:0 0 8px;color:#92400E;font-size:13px;font-weight:700;text-transform:uppercase">Payment Instructions</p>' +
    '<p style="margin:0;color:#78350F;font-size:13px;line-height:1.6">A member of the AIRDC 2026 Local Organising Committee will contact you within 48 hours with full payment instructions including bank transfer details. ' +
    'Please reference your confirmation code <strong>' + data.confirmationCode + '</strong> in all payment correspondence.</p>' +
    '</div></div>';

  return buildInvoiceHtml(fullName, data.email, data.organisation, data.country, delegateLabel, data.confirmationCode, invoiceDate, feeDisplay, totalDisplay, paymentBlock);
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
  const feeDisplay = isComplimentary ? "Complimentary" : ("USD $" + fee);
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

  const invoiceHtml = generateInvoiceHtml(data);
  const invoiceBase64 = Buffer.from(invoiceHtml).toString("base64");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "AIRDC 2026 <noreply@airdczim.co.zw>",
      to: data.email,
      subject: `Registration Confirmed — AIRDC 2026 — ${data.confirmationCode}`,
      html,
      attachments: [
        { filename: `AIRDC2026-Invoice-${data.confirmationCode}.html`, content: invoiceBase64 },
      ],
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
'''

with open('src/app/api/register/route.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print('Written:', len(content), 'chars')
