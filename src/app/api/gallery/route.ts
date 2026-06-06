import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URL) return NextResponse.json({ albums: [] });
  try {
    const { prisma } = await import("@/lib/prisma");
    const albums = await prisma.galleryAlbum.findMany({
      include: { images: { orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ albums });
  } catch (e) {
    return NextResponse.json({ albums: [] });
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const body = await req.json();
    const { prisma } = await import("@/lib/prisma");

    if (body.type === "image") {
      // Add image to existing album
      const image = await prisma.galleryImage.create({
        data: {
          albumId: body.albumId,
          url: body.url,
          publicId: body.publicId,
          caption: body.caption,
          altText: body.altText,
          order: body.order ?? 0,
        },
      });
      return NextResponse.json({ image });
    } else {
      // Create new album
      const album = await prisma.galleryAlbum.create({
        data: {
          title: body.title,
          description: body.description,
          coverImage: body.coverImage,
          year: body.year ?? 2026,
          order: body.order ?? 0,
        },
        include: { images: true },
      });
      return NextResponse.json({ album });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
