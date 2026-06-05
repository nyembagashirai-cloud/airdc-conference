import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";

const articles = [
  {
    slug: "airdc-2026-zimbabwe-announcement",
    category: "ANNOUNCEMENT",
    title: "AIRDC Announces 23rd Annual Conference in Harare, Zimbabwe",
    excerpt: "The Association of Insurers and Reinsurers of Developing Countries confirms Zimbabwe as host of the 23rd Annual Conference, themed around insurance resilience in disrupted markets.",
    date: "2026-01-15",
    authorName: "AIRDC Secretariat",
  },
  {
    slug: "call-for-papers-2026",
    category: "ANNOUNCEMENT",
    title: "Call for Papers: Share Your Research at AIRDC 2026",
    excerpt: "We invite researchers, practitioners and academics to submit abstracts for presentation at the 23rd AIRDC Conference. Submissions close 30 March 2026.",
    date: "2026-01-20",
    authorName: "AIRDC Secretariat",
  },
  {
    slug: "sponsorship-packages-2026",
    category: "NEWS",
    title: "2026 Sponsorship Packages Now Available",
    excerpt: "Platinum, Gold, Silver and Supporting partner packages for AIRDC 2026 are now available. Early bird pricing ends 28 February 2026.",
    date: "2026-01-25",
    authorName: "AIRDC Events Team",
  },
];

const categoryColors: Record<string, string> = {
  ANNOUNCEMENT: "bg-secondary/10 text-secondary",
  NEWS: "bg-accent/10 text-accent",
  PRESS_RELEASE: "bg-primary/10 text-primary",
  UPDATE: "bg-purple-50 text-purple-700",
};

export function NewsPreview() {
  return (
    <section className="section-padding bg-muted">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">News</p>
            <h2 className="section-title">Latest Updates</h2>
          </div>
          <Link href="/news" className="btn-primary group flex-shrink-0">
            All News <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article.slug} href={`/news/${article.slug}`}
              className="card-premium group overflow-hidden block">
              <div className="h-3 bg-gold-gradient" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full ${categoryColors[article.category] || "bg-gray-100 text-gray-600"}`}>
                    {article.category.replace("_", " ")}
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Calendar size={12} />
                    {new Date(article.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                </div>
                <h3 className="font-heading font-bold text-primary group-hover:text-accent transition-colors mb-3 leading-snug">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center gap-1 mt-4 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                  Read more <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
