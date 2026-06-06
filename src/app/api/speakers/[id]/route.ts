import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const body = await req.json();
    const { prisma } = await import("@/lib/prisma");
    const speaker = await prisma.speaker.update({
      where: { id: params.id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        title: body.title,
        jobTitle: body.jobTitle,
        organisation: body.organisation,
        country: body.country,
        bio: body.bio || "",
        photoUrl: body.photoUrl,
        email: body.email,
        linkedin: body.linkedin,
        featured: body.featured ?? false,
        order: body.order ?? 0,
      },
    });
    return NextResponse.json({ speaker });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.speaker.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
