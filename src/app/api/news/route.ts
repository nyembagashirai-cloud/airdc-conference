import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ articles: [] });
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";
    const { prisma } = await import("@/lib/prisma");
    const articles = await prisma.article.findMany({
      where: all ? {} : { published: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ articles });
  } catch (e) {
    return NextResponse.json({ articles: [] });
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No DB" }, { status: 500 });
  try {
    const body = await req.json();
    const { prisma } = await import("@/lib/prisma");
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const article = await prisma.article.create({ data: {
      title: body.title,
      slug,
      excerpt: body.excerpt,
      content: body.content || "",
      coverImage: body.coverImage,
      category: body.category || "NEWS",
      published: body.published ?? false,
      publishedAt: body.published ? new Date() : null,
      authorName: body.authorName,
      authorTitle: body.authorTitle,
      tags: body.tags || [],
    }});
    return NextResponse.json({ article });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
