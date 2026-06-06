import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, Tag } from "lucide-react";

type Props = { params: { slug: string } };

async function getArticle(slug: string) {
  if (!process.env.DATABASE_URL) return null;
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.article.findFirst({ where: { slug, published: true } });
  } catch { return null; }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt || undefined,
    openGraph: article.coverImage ? { images: [article.coverImage] } : undefined,
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  return (
    <div className="pt-20">
      {article.coverImage && (
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}
      {!article.coverImage && <div className="bg-primary h-32" />}

      <section className="section-padding">
        <div className="container max-w-3xl mx-auto">
          <Link href="/news" className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to News
          </Link>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
              {article.category.replace("_", " ")}
            </span>
            {article.publishedAt && (
              <span className="text-muted-foreground text-xs flex items-center gap-1">
                <Calendar size={12} />
                {new Date(article.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            )}
          </div>

          <h1 className="font-heading font-black text-primary text-3xl md:text-4xl leading-tight mb-4">{article.title}</h1>

          {article.excerpt && (
            <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-secondary pl-4 mb-8">{article.excerpt}</p>
          )}

          {(article.authorName || article.authorTitle) && (
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {article.authorName?.charAt(0) || "A"}
              </div>
              <div>
                {article.authorName && <p className="font-semibold text-foreground text-sm">{article.authorName}</p>}
                {article.authorTitle && <p className="text-muted-foreground text-xs">{article.authorTitle}</p>}
              </div>
            </div>
          )}

          <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-8 pt-8 border-t border-border flex-wrap">
              <Tag size={14} className="text-muted-foreground" />
              {article.tags.map((tag: string) => (
                <span key={tag} className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          )}

          <div className="mt-10 p-6 bg-muted rounded-2xl border border-border text-center">
            <h3 className="font-heading font-bold text-primary mb-2">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">Get the latest AIRDC 2026 news and announcements</p>
            <Link href="/contact" className="btn-primary text-sm">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
