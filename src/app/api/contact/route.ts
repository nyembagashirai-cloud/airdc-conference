import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Required: prevent Next.js from statically rendering this route at build time
export const dynamic = "force-dynamic";

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
      // No DB configured — log only (useful during development)
      console.log("Contact submission (no DB):", data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET — fetch all contact submissions for admin dashboard
export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ submissions: [] });
  }
  try {
    const { prisma } = await import("@/lib/prisma");
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ submissions });
  } catch (error) {
    console.error("Fetch contacts error:", error);
    return NextResponse.json({ submissions: [] });
  }
}
