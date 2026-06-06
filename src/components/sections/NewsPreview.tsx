import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

const categoryColors: Record<string, string> = {
  ANNOUNCEMENT: "bg-secondary/10 text-secondary",
  NEWS: "bg-accent/10 text-accent",
  PRESS_RELEASE: "bg-primary/10 text-primary",
  UPDATE: "bg-purple-50 text-purple-700",
  INSIGHT: "bg-teal-50 text-teal-700",
};

async function getLatestArticles() {
  if (!process.env.DATABASE_URL) return [];
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
  } catch { return []; }
}

export async function NewsPreview() {
  const articles = await getLatestArticles();

  return (
    <section className="section-padding bg-muted">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">News</p>
            <h2 className="section-title">Latest Updates</h2>
          </div>
          <Link href="/news" className="btn-primary group flex-shrink-0 flex items-center gap-2">
            All News <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-border">
            <p className="text-muted-foreground">News and announcements will appear here soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`}
                className="card-premium group overflow-hidden block">
                {article.coverImage ? (
                  <div className="h-40 overflow-hidden">
                    <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                ) : (
                  <div className="h-3 bg-gold-gradient" />
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full ${categoryColors[article.category] || "bg-gray-100 text-gray-600"}`}>
                      {article.category.replace("_", " ")}
                    </span>
                    {article.publishedAt && (
                      <div className="flex items-center gap-1 text-muted-foreground text-xs">
                        <Calendar size={12} />
                        {new Date(article.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-primary group-hover:text-accent transition-colors mb-3 leading-snug">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>
                  )}
                  <div className="flex items-center gap-1 mt-4 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                    Read more <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
