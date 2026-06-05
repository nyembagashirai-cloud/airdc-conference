import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  organisation: z.string().optional(),
  subject: z.enum(["GENERAL", "SPONSORSHIP", "MEDIA", "LOGISTICS", "SPEAKER_INQUIRY", "FEEDBACK"]),
  message: z.string().min(20),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ success: true }); // Silent reject
    }

    const data = schema.parse(body);

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

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
