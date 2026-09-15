import crypto from "crypto";

/**
 * Shared logic for the "send us your flight and hotel details" campaign.
 * Used by the public travel-details form, the API that saves it, and the admin
 * send tool, so the link, the token and the copy can never drift apart.
 */

export const HOTEL_OPTIONS = [
  "Rainbow Towers Hotel & Conference Centre (Conference Venue)",
  "Holiday Inn Harare",
  "Cresta Lodge Harare",
  "Cresta Jameson Hotel",
  "N1 Hotel Harare",
];

/** Signing secret for the per-delegate form link. */
function tokenSecret(): string {
  return (
    process.env.NEXTAUTH_SECRET ||
    process.env.RESEND_API_KEY ||
    "airdc-2026-travel-details-fallback"
  );
}

/**
 * Per-delegate token. Ties the link to one confirmation code AND one email
 * address, so a delegate cannot open someone else's record by guessing codes.
 */
export function travelToken(confirmationCode: string, email: string): string {
  return crypto
    .createHmac("sha256", tokenSecret())
    .update(confirmationCode.trim().toUpperCase() + "|" + email.trim().toLowerCase())
    .digest("hex")
    .slice(0, 24);
}

export function verifyTravelToken(confirmationCode: string, email: string, token: string): boolean {
  const expected = travelToken(confirmationCode, email);
  const a = Buffer.from(expected);
  const b = Buffer.from(token || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Public base URL of the site, used to build absolute links inside emails. */
export function siteUrl(): string {
  // In production the delegate link must always point at the live site, even if
  // NEXTAUTH_URL happens to be a preview deployment URL.
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://www.airdczim.co.zw"
      : process.env.NEXTAUTH_URL || "http://localhost:3000");
  return raw.replace(/\/+$/, "");
}

export function travelFormUrl(confirmationCode: string, email: string): string {
  const params = new URLSearchParams({
    code: confirmationCode,
    t: travelToken(confirmationCode, email),
  });
  return siteUrl() + "/travel-details?" + params.toString();
}

export interface TravelEmailData {
  civility?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  country: string;
  confirmationCode: string;
  /** Deadline shown in the email, e.g. "15 September 2026". */
  deadline?: string;
}

export interface TravelSendResult {
  email: string;
  confirmationCode: string;
  ok: boolean;
  error?: string;
}

export const DEFAULT_DEADLINE = "22 September 2026";

function bullet(text: string): string {
  return (
    '<tr><td style="padding:4px 0;color:#374151;font-size:14px;line-height:1.6">&bull;&nbsp;&nbsp;' +
    text +
    "</td></tr>"
  );
}

export function buildTravelEmailHtml(data: TravelEmailData): string {
  const link = travelFormUrl(data.confirmationCode, data.email);
  const deadline = data.deadline || DEFAULT_DEADLINE;

  return (
    '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff">' +
    '<div style="background:linear-gradient(135deg,#0D3B66,#1D4E89);padding:40px 32px;text-align:center">' +
    '<h1 style="color:#D4AF37;font-size:28px;margin:0">AIRDC 2026</h1>' +
    '<p style="color:rgba(255,255,255,.8);margin:8px 0 0">24th Annual Conference &mdash; Zimbabwe</p></div>' +

    '<div style="padding:40px 32px">' +
    '<h2 style="color:#0D3B66;margin-top:0">Your Travel and Accommodation Details</h2>' +
    '<p style="color:#374151">Dear ' + data.firstName + ',</p>' +
    '<p style="color:#374151;font-size:14px;line-height:1.7">' +
    "As we finalise arrangements for the <strong>24th AIRDC Annual Conference</strong> in Harare, " +
    "we are putting together airport transfers, hotel liaison and delegate welcome arrangements. " +
    "To include you, we need your flight and accommodation details." +
    "</p>" +

    '<div style="background:#F8F9FA;border-left:4px solid #D4AF37;padding:20px 24px;margin:24px 0;border-radius:0 8px 8px 0">' +
    '<p style="margin:0 0 10px;color:#6B7280;font-size:12px;text-transform:uppercase;letter-spacing:1px">What we need from you</p>' +
    '<table style="width:100%;border-collapse:collapse">' +
    bullet("Arrival date, time, airline and flight number") +
    bullet("Departure date, time, airline and flight number") +
    bullet("The hotel you are staying at (or that you are still deciding)") +
    bullet("Whether you would like an airport pick-up on arrival") +
    "</table></div>" +

    '<p style="color:#374151;font-size:14px;line-height:1.7">' +
    "Your personal form is already linked to your registration &mdash; just click below, check the details and submit. " +
    "It takes under two minutes." +
    "</p>" +

    '<div style="text-align:center;margin:28px 0">' +
    '<a href="' + link + '" ' +
    'style="display:inline-block;background:#0D3B66;color:#fff;text-decoration:none;font-weight:bold;font-size:15px;padding:16px 36px;border-radius:8px">' +
    "Submit My Travel Details</a>" +
    '<p style="margin:12px 0 0;color:#6B7280;font-size:12px">' +
    "If the button does not work, copy this link into your browser:<br/>" +
    '<span style="color:#1D4E89;word-break:break-all">' + link + "</span></p></div>" +

    '<table style="width:100%;border-collapse:collapse;margin:24px 0">' +
    '<tr style="border-bottom:1px solid #E5E7EB">' +
    '<td style="padding:10px 0;color:#6B7280;font-size:14px">Your Confirmation Code</td>' +
    '<td style="padding:10px 0;color:#0D3B66;font-weight:700;font-size:14px;letter-spacing:1px">' + data.confirmationCode + "</td></tr>" +
    '<tr style="border-bottom:1px solid #E5E7EB">' +
    '<td style="padding:10px 0;color:#6B7280;font-size:14px">Please respond by</td>' +
    '<td style="padding:10px 0;color:#111827;font-size:14px;font-weight:700">' + deadline + "</td></tr>" +
    '<tr style="border-bottom:1px solid #E5E7EB">' +
    '<td style="padding:10px 0;color:#6B7280;font-size:14px">Conference Dates</td>' +
    '<td style="padding:10px 0;color:#111827;font-size:14px">27&ndash;30 September 2026</td></tr>' +
    '<tr><td style="padding:10px 0;color:#6B7280;font-size:14px">Venue</td>' +
    '<td style="padding:10px 0;color:#111827;font-size:14px">Rainbow Towers Hotel, Harare, Zimbabwe</td></tr></table>' +

    '<div style="background:#FEF9ED;border:1px solid #D97706;border-radius:8px;padding:16px 20px;margin:20px 0">' +
    '<p style="margin:0 0 8px;color:#92400E;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Zimbabwe Immigration Notice</p>' +
    '<p style="margin:0;color:#78350F;font-size:13px;line-height:1.6">' +
    "Arrival forms must now be completed <strong>online before departure</strong> &mdash; paper forms are no longer in use. " +
    'Complete yours in advance at <a href="https://evisa.gov.zw/app/index.html" style="color:#92400E">evisa.gov.zw</a> to avoid delays at immigration.' +
    "</p></div>" +

    '<p style="color:#374151;font-size:14px;line-height:1.7">' +
    "Accommodation is booked and paid for directly with the hotel. Official conference rates and hotel contacts are on the " +
    '<a href="' + siteUrl() + '/accommodation" style="color:#0D3B66">accommodation page</a> &mdash; quote <strong>"AIRDC 2026"</strong> when booking.' +
    "</p>" +

    '<p style="color:#374151;font-size:14px">If anything is unclear, reply to this email or contact us at ' +
    '<a href="mailto:info@airdczim.co.zw" style="color:#0D3B66">info@airdczim.co.zw</a>.</p>' +
    '<p style="color:#374151;font-size:14px;margin-bottom:0">We look forward to welcoming you to Harare.</p>' +
    '<p style="color:#374151;font-size:14px;margin-top:4px"><strong>The AIRDC 2026 Organising Committee</strong></p>' +
    "</div>" +

    '<div style="background:#0D3B66;padding:24px 32px;text-align:center">' +
    '<p style="color:rgba(255,255,255,.6);font-size:12px;margin:0">2026 AIRDC &mdash; 24th Annual Conference &mdash; Harare, Zimbabwe</p>' +
    '<p style="color:rgba(255,255,255,.4);font-size:11px;margin:4px 0 0">www.airdczim.co.zw</p></div></div>'
  );
}

/** Sends the travel details request via Resend. Never throws. */
export async function sendTravelRequestEmail(
  data: TravelEmailData,
  opts: { overrideTo?: string } = {}
): Promise<TravelSendResult> {
  const to = opts.overrideTo || data.email;
  const base: TravelSendResult = { email: to, confirmationCode: data.confirmationCode, ok: false };

  if (!process.env.RESEND_API_KEY) {
    return { ...base, error: "RESEND_API_KEY is not configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AIRDC 2026 <noreply@airdczim.co.zw>",
        reply_to: "info@airdczim.co.zw",
        to,
        subject: `Your flight and hotel details — AIRDC 2026 — ${data.confirmationCode}`,
        html: buildTravelEmailHtml(data),
      }),
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ...base, error: `Resend ${res.status}: ${JSON.stringify(body)}` };
    }
    return { ...base, ok: true };
  } catch (e) {
    return { ...base, error: e instanceof Error ? e.message : String(e) };
  }
}
