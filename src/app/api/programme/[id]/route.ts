import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const body = await req.json();
    const { prisma } = await import("@/lib/prisma");
    const session = await prisma.programmeSession.update({
      where: { id: params.id },
      data: {
        day: body.day,
        date: new Date(body.date),
        startTime: body.startTime,
        endTime: body.endTime,
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        type: body.type,
        venue: body.venue,
      },
    });
    return NextResponse.json({ session });
  } catch (e) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.programmeSession.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
