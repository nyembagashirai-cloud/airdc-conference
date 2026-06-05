import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  organisation: z.string().min(2),
  jobTitle: z.string().min(2),
  country: z.string().min(2),
  delegateType: z.enum(["DELEGATE", "SPEAKER", "SPONSOR", "PRESS", "ORGANISER", "VIP"]),
  workshopChoice: z.string().optional(),
  dietaryRequirements: z.string().optional(),
  specialNeeds: z.string().optional(),
  terms: z.boolean(),
});

function generateCode(): string {
  return "AIRDC26-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const confirmationCode = generateCode();

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

    return NextResponse.json({ success: true, confirmationCode });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Admin only - add auth middleware in production
  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json(registrations);
}
