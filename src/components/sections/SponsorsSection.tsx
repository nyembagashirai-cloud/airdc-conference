import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SPONSORS, type StaticSponsor } from "@/data/sponsors";

const TIER_ORDER = ["PLATINUM", "DIAMOND", "GOLD", "SILVER", "BRONZE", "SUPPORTING_PARTNER"];
const TIER_LABELS: Record<string, string> = { PLATINUM: "Platinum Sponsors", DIAMOND: "Diamond Sponsors", GOLD: "Gold Sponsors", SILVER: "Silver Sponsors", BRONZE: "Bronze Sponsors", SUPPORTING_PARTNER: "Supporting Partners" };
const TIER_SIZES: Record<string, string> = { PLATINUM: "h-24 w-48", DIAMOND: "h-20 w-44", GOLD: "h-20 w-40", SILVER: "h-16 w-32", BRONZE: "h-14 w-28", SUPPORTING_PARTNER: "h-14 w-28" };

async function getSponsors(): Promise<StaticSponsor[]> {
  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("@/lib/prisma");
      const rows = await prisma.sponsor.findMany({
        where: { active: true },
        orderBy: [{ tier: "asc" }, { order: "asc" }],
      });
      // Sponsors entered through the admin dashboard take precedence.
      if (rows.length > 0) {
        return rows.map((s) => ({
          id: s.id,
          name: s.name,
          tier: s.tier,
          logoUrl: s.logoUrl,
          website: s.website,
          description: s.description,
          order: s.order,
        }));
      }
    } catch {
      // fall through to the published list
    }
  }
  return SPONSORS;
}

export async function SponsorsSection() {
  const sponsors = await getSponsors();
  const hasSponsors = sponsors.length > 0;

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Sponsors & Partners</p>
          <h2 className="section-title">Our Conference Partners</h2>
          <p className="section-subtitle mx-auto">
            Join leading global organisations in supporting the development of insurance across emerging markets.
          </p>
        </div>

        {hasSponsors ? (
          <>
            {TIER_ORDER.map((tier) => {
              const tierSponsors = sponsors.filter(s => s.tier === tier);
              if (tierSponsors.length === 0) return null;
              return (
                <div key={tier} className="mb-12 last:mb-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{TIER_LABELS[tier]}</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  {(tier === "SUPPORTING_PARTNER"
                    ? [tierSponsors.slice(0, Math.ceil(tierSponsors.length / 2)), tierSponsors.slice(Math.ceil(tierSponsors.length / 2))]
                    : [tierSponsors]
                  ).filter(row => row.length > 0).map((row, rowIndex) => (
                  <div key={rowIndex} className={`flex flex-wrap justify-center gap-6 items-center${tier === "SUPPORTING_PARTNER" ? " lg:flex-nowrap" : ""}${rowIndex > 0 ? " mt-6" : ""}`}>
                    {row.map(s => (
                      <div key={s.id} className={`${TIER_SIZES[tier] || "h-16 w-32"} border-2 border-border bg-white rounded-xl flex items-center justify-center p-3 hover:border-secondary/50 transition-all hover:shadow-md`}>
                        {s.logoUrl ? (
                          s.website
                            ? <a href={s.website} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                                <img src={s.logoUrl} alt={s.name} className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all" />
                              </a>
                            : <img src={s.logoUrl} alt={s.name} className="max-h-full max-w-full object-contain" />
                        ) : (
                          <span className="font-heading font-bold text-primary text-center text-sm leading-tight">{s.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  ))}
                </div>
              );
            })}
          </>
        ) : (
          <div className="text-center py-10 mb-8">
            <p className="text-muted-foreground text-sm">Sponsorship announcements will appear here.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-4 bg-primary/5 border border-primary/10 rounded-2xl px-8 py-6">
            <p className="font-heading font-bold text-primary text-lg">Become a Sponsor</p>
            <p className="text-muted-foreground text-sm max-w-md">
              Partner with AIRDC 2026 and gain unparalleled access to 500+ insurance decision-makers from 40+ countries.
            </p>
            <Link href="/sponsors" className="btn-primary group flex items-center gap-2">
              View Sponsorship Packages
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
