import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const { id } = await params;
    const body = await req.json();
    const { prisma } = await import("@/lib/prisma");
    if (body.type === "image") {
      const image = await prisma.galleryImage.update({ where: { id }, data: { caption: body.caption, altText: body.altText, order: body.order } });
      return NextResponse.json({ image });
    } else {
      const album = await prisma.galleryAlbum.update({ where: { id }, data: { title: body.title, description: body.description, coverImage: body.coverImage, year: body.year, order: body.order }, include: { images: { orderBy: { order: "asc" } } } });
      return NextResponse.json({ album });
    }
  } catch (e) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const { prisma } = await import("@/lib/prisma");
    if (type === "image") {
      await prisma.galleryImage.delete({ where: { id } });
    } else {
      await prisma.galleryAlbum.delete({ where: { id } });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
