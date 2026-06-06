import { NextRequest, NextResponse } from "next/server";
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
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const body = await req.json();
    const { prisma } = await import("@/lib/prisma");

    // Get or create the active conference
    let conference = await prisma.conference.findFirst({ where: { isActive: true } });
    if (!conference) {
      conference = await prisma.conference.create({ data: {
        edition: 23,
        title: "23rd AIRDC Annual Conference",
        theme: "Insurance Resilience in the Face of Geopolitical and Technological Disruption for Developing Markets",
        startDate: new Date("2026-09-26"),
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
