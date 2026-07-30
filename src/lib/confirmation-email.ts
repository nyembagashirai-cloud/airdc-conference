import { generateInvoicePdf } from "@/lib/invoice-pdf";

/**
 * Single source of truth for the AIRDC 2026 registration confirmation email.
 * Used both by the public registration route and the admin resend tool, so the
 * two can never drift apart.
 */

export const REGISTRATION_FEES: Record<string, string> = {
  AIRDC_MEMBER: "350.00",
  SUPERVISORY_AUTHORITY_MEMBER: "350.00",
  NON_MEMBER: "500.00",
  SUPERVISORY_AUTHORITY_NON_MEMBER: "500.00",
  MEDIA_SPEAKER_ORGANISER: "0.00",
};

export const DELEGATE_LABELS: Record<string, string> = {
  AIRDC_MEMBER: "AIRDC Member",
  NON_MEMBER: "Non Member",
  SUPERVISORY_AUTHORITY_MEMBER: "Supervisory Authority / AIRDC Member",
  SUPERVISORY_AUTHORITY_NON_MEMBER: "Supervisory Authority / Non Member",
  MEDIA_SPEAKER_ORGANISER: "Media / Speaker / Organiser",
};

export function getRegistrationFee(delegateType: string): string {
  return REGISTRATION_FEES[delegateType] ?? "0.00";
}

export function getDelegateLabel(delegateType: string): string {
  return DELEGATE_LABELS[delegateType] ?? delegateType;
}

export interface ConfirmationEmailData {
  civility?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  country: string;
  delegateType: string;
  confirmationCode: string;
}

export interface SendOptions {
  /** Prepends a short note explaining why the delegate is receiving this again. */
  isResend?: boolean;
  /** Override the destination address (used for "send a test to myself"). */
  overrideTo?: string;
}

export interface SendResult {
  email: string;
  confirmationCode: string;
  ok: boolean;
  attached: boolean;
  error?: string;
}

/** Loads the AIRDC logo as a base64 data URI, or undefined if unavailable. */
async function loadLogo(): Promise<string | undefined> {
  try {
    const fs = await import("fs");
    const path = await import("path");
    const logoPath = path.join(process.cwd(), "public", "images", "logo.png");
    return "data:image/png;base64," + fs.readFileSync(logoPath).toString("base64");
  } catch {
    console.warn("Invoice logo unavailable — PDF will render without it");
    return undefined;
  }
}

function buildBankTable(confirmationCode: string): string {
  const rows: [string, string][] = [
    ["Bank", "FBC Bank"],
    ["Account Name", "ASSOCIATION OF INSURERS AND REINSURERS OF DEVELOPING COUNTRIES"],
    ["Account Number (USD)", "1070455180152"],
    ["Branch Name", "FBC Centre"],
    ["Branch Sort Code", "8120"],
    ["Swift Code", "FBCPZWHA"],
  ];
  const body = rows
    .map(([label, value], i) => {
      const border = i < rows.length - 1 ? ' style="border-bottom:1px solid #D97706"' : "";
      return (
        "<tr" + border + ">" +
        '<td style="padding:7px 10px;background:#FEF3C7;font-weight:700;color:#92400E;width:40%">' + label + "</td>" +
        '<td style="padding:7px 10px;background:#FEF9ED;color:#78350F;font-weight:700">' + value + "</td>" +
        "</tr>"
      );
    })
    .join("");

  return (
    '<div style="background:#FEF9ED;border:1px solid #D97706;border-radius:8px;padding:16px 20px;margin:20px 0">' +
    '<p style="margin:0 0 10px;color:#92400E;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Payment Instructions</p>' +
    '<p style="margin:0 0 12px;color:#78350F;font-size:13px;line-height:1.6">Please transfer the registration fee to the bank account below. Use your confirmation code <strong>' +
    confirmationCode +
    "</strong> as the payment reference. Bank charges are the responsibility of the delegate.</p>" +
    '<table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:10px">' + body + "</table>" +
    '<p style="margin:0;color:#78350F;font-size:12px;line-height:1.6">After payment, please email your proof of payment to <strong>info@airdczim.co.zw</strong> quoting your confirmation code.</p>' +
    "</div>"
  );
}

function detailRow(label: string, value: string, bold = false): string {
  const valueStyle = bold
    ? "padding:10px 0;color:#0D3B66;font-weight:700;font-size:14px"
    : "padding:10px 0;color:#111827;font-size:14px";
  return (
    '<tr style="border-bottom:1px solid #E5E7EB">' +
    '<td style="padding:10px 0;color:#6B7280;font-size:14px">' + label + "</td>" +
    '<td style="' + valueStyle + '">' + value + "</td></tr>"
  );
}

/**
 * Generates the invoice PDF and sends the confirmation email via Resend.
 * Never throws for PDF problems — the email still goes out, with `attached: false`.
 */
export async function sendConfirmationEmail(
  data: ConfirmationEmailData,
  opts: SendOptions = {}
): Promise<SendResult> {
  const { isResend = false, overrideTo } = opts;
  const to = overrideTo || data.email;
  const base: SendResult = {
    email: to,
    confirmationCode: data.confirmationCode,
    ok: false,
    attached: false,
  };

  if (!process.env.RESEND_API_KEY) {
    return { ...base, error: "RESEND_API_KEY is not configured" };
  }

  const fee = getRegistrationFee(data.delegateType);
  const isComplimentary = fee === "0.00";
  const delegateLabel = getDelegateLabel(data.delegateType);
  const feeDisplay = isComplimentary ? "USD $0.00" : "USD $" + fee;

  // ── Invoice PDF (non-fatal on failure) ──
  let attachments: { filename: string; content: string }[] = [];
  let pdfError: string | undefined;
  try {
    const logoBase64 = await loadLogo();
    const buf = await generateInvoicePdf({
      fullName: (data.civility ? data.civility + " " : "") + data.firstName + " " + data.lastName,
      email: data.email,
      organisation: data.organisation,
      country: data.country,
      delegateLabel,
      confirmationCode: data.confirmationCode,
      fee,
      isComplimentary,
      logoBase64,
    });
    attachments = [{
      filename: `AIRDC2026-Invoice-${data.confirmationCode}.pdf`,
      content: buf.toString("base64"),
    }];
  } catch (e) {
    pdfError = e instanceof Error ? e.message : String(e);
    console.error("Invoice PDF failed for", data.confirmationCode, pdfError);
  }

  const resendNote = !isResend ? "" :
    '<div style="background:#F0F6FC;border-left:4px solid #1D4E89;padding:14px 18px;margin:0 0 24px;border-radius:0 8px 8px 0">' +
    '<p style="margin:0;color:#0D3B66;font-size:13px;line-height:1.6">' +
    "We are resending your registration confirmation, now with your <strong>proforma invoice attached</strong> " +
    "for your records and finance department. Your registration is unchanged and no action is needed if you have already paid." +
    "</p></div>";

  const invoiceNotice = attachments.length === 0 ? "" :
    '<div style="background:#F0F6FC;border:1px solid #C7D9EC;border-radius:8px;padding:14px 18px;margin:20px 0">' +
    '<p style="margin:0;color:#0D3B66;font-size:13px;line-height:1.6">' +
    "<strong>&#128206; Your invoice is attached to this email</strong><br/>" +
    "A PDF proforma invoice (<strong>AIRDC2026-Invoice-" + data.confirmationCode + ".pdf</strong>) is attached, " +
    "including the full banking details for payment. Please forward it to your finance department if required." +
    "</p></div>";

  const html =
    '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff">' +
    '<div style="background:linear-gradient(135deg,#0D3B66,#1D4E89);padding:40px 32px;text-align:center">' +
    '<h1 style="color:#D4AF37;font-size:28px;margin:0">AIRDC 2026</h1>' +
    '<p style="color:rgba(255,255,255,.8);margin:8px 0 0">24th Annual Conference &mdash; Zimbabwe</p></div>' +
    '<div style="padding:40px 32px">' +
    '<h2 style="color:#0D3B66;margin-top:0">Registration Confirmed</h2>' +
    '<p style="color:#374151">Dear ' + data.firstName + ',</p>' +
    resendNote +
    '<p style="color:#374151">Thank you for registering for the <strong>24th AIRDC Annual Conference</strong>. Your place is secured.</p>' +
    '<div style="background:#F8F9FA;border-left:4px solid #D4AF37;padding:20px 24px;margin:24px 0;border-radius:0 8px 8px 0">' +
    '<p style="margin:0 0 4px;color:#6B7280;font-size:12px;text-transform:uppercase;letter-spacing:1px">Your Confirmation Code</p>' +
    '<p style="margin:0;font-size:28px;font-weight:bold;color:#0D3B66;letter-spacing:2px">' + data.confirmationCode + "</p>" +
    '<p style="margin:8px 0 0;color:#6B7280;font-size:12px">Keep this code &mdash; you will need it at registration</p></div>' +
    '<table style="width:100%;border-collapse:collapse;margin:24px 0">' +
    detailRow("Name", data.firstName + " " + data.lastName, true) +
    detailRow("Organisation", data.organisation) +
    detailRow("Country", data.country) +
    detailRow("Delegate Category", delegateLabel) +
    detailRow("Registration Fee", feeDisplay, true) +
    detailRow("Dates", "27&ndash;30 September 2026") +
    '<tr><td style="padding:10px 0;color:#6B7280;font-size:14px">Venue</td>' +
    '<td style="padding:10px 0;color:#111827;font-size:14px">Rainbow Towers Hotel, Harare, Zimbabwe</td></tr></table>' +
    (isComplimentary ? "" : buildBankTable(data.confirmationCode)) +
    invoiceNotice +
    '<p style="color:#374151;font-size:14px">Further details including the full programme, accommodation guide and visa information will be sent closer to the conference date.</p>' +
    '<p style="color:#374151;font-size:14px">For enquiries, contact us at <a href="mailto:info@airdczim.co.zw" style="color:#0D3B66">info@airdczim.co.zw</a></p></div>' +
    '<div style="background:#0D3B66;padding:24px 32px;text-align:center">' +
    '<p style="color:rgba(255,255,255,.6);font-size:12px;margin:0">2026 AIRDC &mdash; 24th Annual Conference &mdash; Harare, Zimbabwe</p>' +
    '<p style="color:rgba(255,255,255,.4);font-size:11px;margin:4px 0 0">www.airdczim.co.zw</p></div></div>';

  const subject = isResend
    ? `Your AIRDC 2026 Invoice — ${data.confirmationCode}`
    : `Registration Confirmed — AIRDC 2026 — ${data.confirmationCode}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "AIRDC 2026 <noreply@airdczim.co.zw>",
      to,
      subject,
      html,
      ...(attachments.length > 0 && { attachments }),
    }),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = `Resend ${res.status}: ${JSON.stringify(body)}`;
    console.error("Email send failed for", to, msg);
    return { ...base, attached: attachments.length > 0, error: msg };
  }

  return {
    ...base,
    ok: true,
    attached: attachments.length > 0,
    ...(pdfError && { error: "Email sent but invoice failed: " + pdfError }),
  };
}
