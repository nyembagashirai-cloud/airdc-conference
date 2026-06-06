import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ sponsors: [] });
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";
    const { prisma } = await import("@/lib/prisma");
    const sponsors = await prisma.sponsor.findMany({
      where: all ? {} : { active: true },
      orderBy: [{ tier: "asc" }, { order: "asc" }],
    });
    return NextResponse.json({ sponsors });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ sponsors: [] });
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const body = await req.json();
    const { prisma } = await import("@/lib/prisma");
    const sponsor = await prisma.sponsor.create({ data: {
      name: body.name,
      tier: body.tier,
      logoUrl: body.logoUrl,
      website: body.website,
      description: body.description,
      contactName: body.contactName,
      contactEmail: body.contactEmail,
      order: body.order ?? 0,
      active: true,
    }});
    return NextResponse.json({ sponsor });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create sponsor" }, { status: 500 });
  }
}
