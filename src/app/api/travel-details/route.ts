import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyTravelToken } from "@/lib/travel-details";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Public endpoint behind a per-delegate signed link.
 * GET  /api/travel-details?code=ABC123&t=<token>  → that delegate's current details
 * POST /api/travel-details                        → saves the submitted details
 * The token is an HMAC over confirmation code + email, so codes cannot be guessed.
 */

const postSchema = z.object({
  code: z.string().min(1),
  token: z.string().min(1),
  arrivalDate: z.string().max(40).optional(),
  arrivalTime: z.string().max(20).optional(),
  airlineCompany: z.string().max(120).optional(),
  flightNumber: z.string().max(40).optional(),
  departureDate: z.string().max(40).optional(),
  departureTime: z.string().max(20).optional(),
  departureAirline: z.string().max(120).optional(),
  departureFlightNumber: z.string().max(40).optional(),
  accommodation: z.string().max(200).optional(),
  airportPickup: z.string().max(20).optional(),
  specialNeeds: z.string().max(1000).optional(),
});

async function findByCode(code: string) {
  const { prisma } = await import("@/lib/prisma");
  return prisma.registration.findFirst({
    where: { confirmationCode: code.trim().toUpperCase() },
  });
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code")?.trim() || "";
  const token = req.nextUrl.searchParams.get("t")?.trim() || "";

  if (!code || !token) {
    return NextResponse.json({ error: "This link is incomplete." }, { status: 400 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "No database configured" }, { status: 500 });
  }

  try {
    const reg = await findByCode(code);
    if (!reg || !reg.confirmationCode || !verifyTravelToken(reg.confirmationCode, reg.email, token)) {
      return NextResponse.json(
        { error: "This link is not valid. Please use the link in your email, or contact info@airdczim.co.zw." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      delegate: {
        name: [reg.civility, reg.firstName, reg.lastName].filter(Boolean).join(" ").replace(/\s+/g, " ").trim(),
        firstName: reg.firstName,
        email: reg.email,
        organisation: reg.organisation,
        country: reg.country,
        confirmationCode: reg.confirmationCode,
        arrivalDate: reg.arrivalDate ?? "",
        arrivalTime: reg.arrivalTime ?? "",
        airlineCompany: reg.airlineCompany ?? "",
        flightNumber: reg.flightNumber ?? "",
        departureDate: reg.departureDate ?? "",
        departureTime: reg.departureTime ?? "",
        departureAirline: reg.departureAirline ?? "",
        departureFlightNumber: reg.departureFlightNumber ?? "",
        accommodation: reg.accommodation ?? "",
        airportPickup: reg.airportPickup ?? "",
        specialNeeds: reg.specialNeeds ?? "",
        travelUpdatedAt: reg.travelUpdatedAt ? reg.travelUpdatedAt.toISOString() : null,
      },
    });
  } catch (e) {
    console.error("Travel details lookup failed:", e);
    return NextResponse.json({ error: "Could not load your registration." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "No database configured" }, { status: 500 });
  }

  let data: z.infer<typeof postSchema>;
  try {
    data = postSchema.parse(await req.json());
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    const reg = await findByCode(data.code);
    if (!reg || !reg.confirmationCode || !verifyTravelToken(reg.confirmationCode, reg.email, data.token)) {
      return NextResponse.json({ error: "This link is not valid." }, { status: 404 });
    }

    const { prisma } = await import("@/lib/prisma");
    const clean = (v?: string) => (v && v.trim() ? v.trim() : null);

    await prisma.registration.update({
      where: { id: reg.id },
      data: {
        arrivalDate: clean(data.arrivalDate),
        arrivalTime: clean(data.arrivalTime),
        airlineCompany: clean(data.airlineCompany),
        flightNumber: clean(data.flightNumber),
        departureDate: clean(data.departureDate),
        departureTime: clean(data.departureTime),
        departureAirline: clean(data.departureAirline),
        departureFlightNumber: clean(data.departureFlightNumber),
        accommodation: clean(data.accommodation),
        airportPickup: clean(data.airportPickup),
        specialNeeds: clean(data.specialNeeds),
        travelUpdatedAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Travel details save failed:", e);
    return NextResponse.json({ error: "Could not save your details. Please try again." }, { status: 500 });
  }
}
