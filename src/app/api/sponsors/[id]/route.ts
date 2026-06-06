import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const body = await req.json();
    const { prisma } = await import("@/lib/prisma");
    const sponsor = await prisma.sponsor.update({
      where: { id: params.id },
      data: { name: body.name, tier: body.tier, logoUrl: body.logoUrl, website: body.website, description: body.description, contactName: body.contactName, contactEmail: body.contactEmail, active: body.active ?? true },
    });
    return NextResponse.json({ sponsor });
  } catch (e) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.sponsor.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
