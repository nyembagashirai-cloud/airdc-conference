import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";

// Required: prevent Next.js from statically rendering this route at build time
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { prisma } = await import("@/lib/prisma");
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ submissions });
}

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  organisation: z.string().optional(),
  subject: z.enum([
    "GENERAL",
    "SPONSORSHIP",
    "MEDIA",
    "LOGISTICS",
    "SPEAKER_INQUIRY",
    "FEEDBACK",
  ]),
  message: z.string().min(20),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot spam protection — silently accept but discard
    if (body.honeypot) {
      return NextResponse.json({ success: true });
    }

    const data = schema.parse(body);

    // Lazily import prisma so it's never evaluated at build time
    if (process.env.DATABASE_URL) {
      const { prisma } = await import("@/lib/prisma");
      await prisma.contactSubmission.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
          type: data.subject,
          status: "NEW",
        },
      });
    } else {
      return NextResponse.json({ error: "Database not available" }, { status: 500 });
    }

    // Send email notification to secretariat
    if (process.env.RESEND_API_KEY) {
      const subjectLabels: Record<string, string> = {
        GENERAL: "General Enquiry",
        SPONSORSHIP: "Sponsorship",
        MEDIA: "Media",
        LOGISTICS: "Logistics",
        SPEAKER_INQUIRY: "Speaker Inquiry",
        FEEDBACK: "Feedback",
      };
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "noreply@airdczim.co.zw",
          to: "info@airdczim.co.zw",
          reply_to: data.email,
          subject: `New message from ${data.name} — ${subjectLabels[data.subject] ?? data.subject}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;">
              <h2 style="color:#0D3B66;margin-top:0;">New Contact Form Message</h2>
              <table style="width:100%;border-collapse:collapse;margin-bottom:20px;font-size:14px;">
                <tr><td style="padding:6px 0;color:#6b7280;width:140px;">Name</td><td style="padding:6px 0;font-weight:600;">${data.name}</td></tr>
                <tr><td style="padding:6px 0;color:#6b7280;">Email</td><td style="padding:6px 0;"><a href="mailto:${data.email}" style="color:#1D4E89;">${data.email}</a></td></tr>
                ${data.phone ? `<tr><td style="padding:6px 0;color:#6b7280;">Phone</td><td style="padding:6px 0;">${data.phone}</td></tr>` : ""}
                ${data.organisation ? `<tr><td style="padding:6px 0;color:#6b7280;">Organisation</td><td style="padding:6px 0;">${data.organisation}</td></tr>` : ""}
                <tr><td style="padding:6px 0;color:#6b7280;">Subject</td><td style="padding:6px 0;">${subjectLabels[data.subject] ?? data.subject}</td></tr>
              </table>
              <div style="background:#f8f9fa;border-radius:6px;padding:16px;font-size:14px;color:#1f2937;white-space:pre-wrap;">${data.message}</div>
              <p style="margin-top:20px;font-size:12px;color:#9ca3af;">Reply directly to this email to respond to ${data.name}. Message saved in the <a href="https://www.airdczim.co.zw/admin" style="color:#1D4E89;">admin dashboard</a>.</p>
            </div>
          `,
        }),
      }).catch((err) => console.error("Notification email failed:", err));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
