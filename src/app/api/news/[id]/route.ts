import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const { id } = await params;
    const { prisma } = await import("@/lib/prisma");
    const article = await prisma.article.findUnique({ where: { id } });
    if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ article });
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const { id } = await params;
    const body = await req.json();
    const { prisma } = await import("@/lib/prisma");
    const existing = await prisma.article.findUnique({ where: { id } });
    const article = await prisma.article.update({ where: { id }, data: { title: body.title, excerpt: body.excerpt, content: body.content, coverImage: body.coverImage, category: body.category, published: body.published, publishedAt: body.published && !existing?.publishedAt ? new Date() : existing?.publishedAt, authorName: body.authorName, authorTitle: body.authorTitle, tags: body.tags || [] } });
    return NextResponse.json({ article });
  } catch (e) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const { id } = await params;
    const { prisma } = await import("@/lib/prisma");
    await prisma.article.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
