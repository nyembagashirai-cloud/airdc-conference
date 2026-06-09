import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URL) return NextResponse.json({ sessions: [] });
  try {
    const { prisma } = await import("@/lib/prisma");
    const sessions = await prisma.programmeSession.findMany({
      orderBy: [{ day: "asc" }, { startTime: "asc" }],
    });
    return NextResponse.json({ sessions });
  } catch (e) {
    return NextResponse.json({ sessions: [] });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const body = await req.json();
    const { prisma } = await import("@/lib/prisma");

    // Get or create the active conference
    let conference = await prisma.conference.findFirst({ where: { isActive: true } });
    if (!conference) {
      conference = await prisma.conference.create({ data: {
        edition: 24,
        title: "24th AIRDC Annual Conference",
        theme: "Strengthening Insurance Resilience for Developing Countries Amid Geopolitical and Technological Disruptions",
        startDate: new Date("2026-09-27"),
        endDate: new Date("2026-09-30"),
        venue: "Rainbow Towers Hotel",
        city: "Harare",
        country: "Zimbabwe",
        isActive: true,
      }});
    }

    const session = await prisma.programmeSession.create({ data: {
      conferenceId: conference.id,
      day: body.day,
      date: new Date(body.date),
      startTime: body.startTime,
      endTime: body.endTime,
      title: body.title,
      subtitle: body.subtitle,
      description: body.description,
      type: body.type || "PLENARY",
      venue: body.venue,
    }});
    return NextResponse.json({ session });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}
