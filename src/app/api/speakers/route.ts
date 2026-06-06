import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URL) return NextResponse.json({ speakers: [] });
  try {
    const { prisma } = await import("@/lib/prisma");
    const speakers = await prisma.speaker.findMany({ orderBy: [{ order: "asc" }, { lastName: "asc" }] });
    return NextResponse.json({ speakers });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ speakers: [] });
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const body = await req.json();
    const { prisma } = await import("@/lib/prisma");
    const speaker = await prisma.speaker.create({ data: {
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
    }});
    return NextResponse.json({ speaker });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create speaker" }, { status: 500 });
  }
}
