import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Latest news, announcements and press releases from AIRDC 2026.",
};

const articles = [
  { slug: "airdc-2026-zimbabwe-announcement", category: "ANNOUNCEMENT", title: "AIRDC Announces 23rd Annual Conference in Harare, Zimbabwe", excerpt: "The Association of Insurers and Reinsurers of Developing Countries confirms Zimbabwe as host of the 23rd Annual Conference, themed around insurance resilience in disrupted markets.", date: "2026-01-15", authorName: "AIRDC Secretariat", readTime: "3 min" },
  { slug: "call-for-papers-2026", category: "ANNOUNCEMENT", title: "Call for Papers: Share Your Research at AIRDC 2026", excerpt: "We invite researchers, practitioners and academics to submit abstracts for presentation at the 23rd AIRDC Conference. Submissions close 30 March 2026.", date: "2026-01-20", authorName: "AIRDC Secretariat", readTime: "2 min" },
  { slug: "sponsorship-packages-2026", category: "NEWS", title: "2026 Sponsorship Packages Now Available", excerpt: "Platinum, Gold, Silver and Supporting partner packages for AIRDC 2026 are now available. Early bird pricing ends 28 February 2026.", date: "2026-01-25", authorName: "AIRDC Events Team", readTime: "3 min" },
  { slug: "registration-opens", category: "ANNOUNCEMENT", title: "Early Bird Registration Now Open for AIRDC 2026", excerpt: "Register before 30 April 2026 and save up to 25% on your delegate registration fee. Limited early bird places available.", date: "2026-02-01", authorName: "AIRDC Secretariat", readTime: "2 min" },
  { slug: "zimbabwe-host-profile", category: "NEWS", title: "Spotlight: Zimbabwe's Growing Insurance Market", excerpt: "An overview of Zimbabwe's dynamic insurance sector and why Harare is the perfect host for AIRDC's 23rd Conference.", date: "2026-02-10", authorName: "AIRDC Research Team", readTime: "5 min" },
  { slug: "keynote-speaker-announcement", category: "UPDATE", title: "First Keynote Speakers Confirmed for AIRDC 2026", excerpt: "We are pleased to announce the first wave of confirmed keynote speakers for the 23rd AIRDC Conference, representing regulators, CEOs and thought leaders from across developing markets.", date: "2026-02-15", authorName: "AIRDC Events Team", readTime: "4 min" },
];

const categoryColors: Record<string, string> = {
  ANNOUNCEMENT: "bg-secondary/10 text-secondary border-secondary/20",
  NEWS: "bg-accent/10 text-accent border-accent/20",
  PRESS_RELEASE: "bg-primary/10 text-primary border-primary/20",
  UPDATE: "bg-purple-50 text-purple-700 border-purple-200",
};

export default function NewsPage() {
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <Link key={article.slug} href={`/news/${article.slug}`}
                className={`card-premium group overflow-hidden block ${i === 0 ? "md:col-span-2" : ""}`}>
                <div className="h-2 bg-gold-gradient" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${categoryColors[article.category] || ""}`}>
                      {article.category.replace("_", " ")}
                    </span>
                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(article.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="text-muted-foreground text-xs ml-auto">{article.readTime} read</span>
                  </div>
                  <h2 className={`font-heading font-bold text-primary group-hover:text-accent transition-colors mb-3 leading-snug ${i === 0 ? "text-xl" : "text-base"}`}>
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">By {article.authorName}</span>
                    <span className="text-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
