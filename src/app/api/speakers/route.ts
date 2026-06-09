import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URL) return NextResponse.json({ speakers: [] });
  try {
    const { prisma } = await import("@/lib/prisma");
    const speakers = await prisma.speaker.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }] });
    return NextResponse.json({ speakers });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ speakers: [] });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const body = await req.json();
    const { prisma } = await import("@/lib/prisma");
    const speaker = await prisma.speaker.create({ data: {
      name: body.name,
      title: body.title,
      organisation: body.organisation,
      country: body.country,
      bio: body.bio,
      photoUrl: body.photoUrl,
      linkedinUrl: body.linkedinUrl,
      speakerType: body.speakerType || "Panel Speaker",
      featured: body.featured ?? false,
      active: body.active ?? true,
      order: body.order ?? 0,
    }});
    return NextResponse.json({ speaker });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create speaker" }, { status: 500 });
  }
}
