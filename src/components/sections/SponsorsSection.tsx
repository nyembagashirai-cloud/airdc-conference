import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TIER_ORDER = ["PLATINUM", "GOLD", "SILVER", "SUPPORTING_PARTNER"];
const TIER_LABELS: Record<string, string> = { PLATINUM: "Platinum Sponsors", GOLD: "Gold Sponsors", SILVER: "Silver Sponsors", SUPPORTING_PARTNER: "Supporting Partners" };
const TIER_SIZES: Record<string, string> = { PLATINUM: "h-24 w-48", GOLD: "h-20 w-40", SILVER: "h-16 w-32", SUPPORTING_PARTNER: "h-14 w-28" };

async function getSponsors() {
  if (!process.env.DATABASE_URL) return [];
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.sponsor.findMany({
      where: { active: true },
      orderBy: [{ tier: "asc" }, { order: "asc" }],
    });
  } catch { return []; }
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
                  <div className="flex flex-wrap justify-center gap-6 items-center">
                    {tierSponsors.map(s => (
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
