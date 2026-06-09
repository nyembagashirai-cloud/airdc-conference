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
    const sponsor = await prisma.sponsor.update({ where: { id }, data: { name: body.name, tier: body.tier, logoUrl: body.logoUrl, website: body.website, description: body.description, contactName: body.contactName, contactEmail: body.contactEmail, active: body.active ?? true } });
    return NextResponse.json({ sponsor });
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
    await prisma.sponsor.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
