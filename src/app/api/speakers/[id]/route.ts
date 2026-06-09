import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const { id } = await params;
    const body = await req.json();
    const { prisma } = await import("@/lib/prisma");
    const speaker = await prisma.speaker.update({ where: { id }, data: { name: body.name, title: body.title, organisation: body.organisation, country: body.country, bio: body.bio, photoUrl: body.photoUrl, speakerType: body.speakerType, featured: body.featured ?? false, linkedinUrl: body.linkedinUrl, order: body.order ?? 0 } });
    return NextResponse.json({ speaker });
  } catch (e) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const { id } = await params;
    const { prisma } = await import("@/lib/prisma");
    await prisma.speaker.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
