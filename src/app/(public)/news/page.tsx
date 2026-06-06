import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Latest news, announcements and press releases from AIRDC 2026.",
};

const categoryColors: Record<string, string> = {
  ANNOUNCEMENT: "bg-secondary/10 text-secondary border-secondary/20",
  NEWS: "bg-accent/10 text-accent border-accent/20",
  PRESS_RELEASE: "bg-primary/10 text-primary border-primary/20",
  UPDATE: "bg-purple-50 text-purple-700 border-purple-200",
  INSIGHT: "bg-teal-50 text-teal-700 border-teal-200",
};

async function getArticles() {
  if (!process.env.DATABASE_URL) return [];
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.article.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } });
  } catch { return []; }
}

export default async function NewsPage() {
  const articles = await getArticles();

  return (
    <div className="pt-20">
      <div className="bg-primary py-16">
        <div className="container">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">News & Updates</p>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-2">Latest News</h1>
          <p className="text-white/70">Announcements, press releases and conference updates</p>
        </div>
      </div>

      <section className="section-padding bg-muted">
        <div className="container">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📰</span>
              </div>
              <h2 className="font-heading font-bold text-primary text-2xl mb-3">News Coming Soon</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Stay tuned for the latest announcements, speaker confirmations, and conference updates.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <Link key={article.id} href={`/news/${article.slug}`}
                  className={`card-premium group overflow-hidden block ${i === 0 ? "md:col-span-2" : ""}`}>
                  {article.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  {!article.coverImage && <div className="h-2 bg-gold-gradient" />}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className={`text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${categoryColors[article.category] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                        {article.category.replace("_", " ")}
                      </span>
                      {article.publishedAt && (
                        <span className="text-muted-foreground text-xs flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(article.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      )}
                    </div>
                    <h2 className={`font-heading font-bold text-primary group-hover:text-accent transition-colors mb-3 leading-snug ${i === 0 ? "text-xl" : "text-base"}`}>
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">{article.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      {article.authorName && <span className="text-xs text-muted-foreground">By {article.authorName}</span>}
                      <span className="text-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all ml-auto">
                        Read more <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
