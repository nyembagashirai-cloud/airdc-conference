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
   