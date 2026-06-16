import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Sponsors & Partners",
  description: "Sponsorship packages and partner opportunities at the 24th AIRDC Conference 2026.",
};

const TIER_ORDER = ["PLATINUM", "GOLD", "SILVER", "SUPPORTING_PARTNER"];
const TIER_LABELS: Record<string, string> = { PLATINUM: "Platinum", GOLD: "Gold", SILVER: "Silver", SUPPORTING_PARTNER: "Supporting Partner" };
const TIER_COLORS: Record<string, string> = {
  PLATINUM: "text-gray-700 bg-gray-100 border-gray-300",
  GOLD: "text-yellow-800 bg-yellow-100 border-yellow-300",
  SILVER: "text-slate-600 bg-slate-100 border-slate-300",
  SUPPORTING_PARTNER: "text-blue-700 bg-blue-50 border-blue-200",
};

const whySponsor = [
  "Access 500+ insurance decision-makers from 40+ developing countries",
  "Position your brand as a thought leader in developing market insurance",
  "Direct engagement with regulators, CEOs, and senior executives",
  "Launch products and partnerships in high-growth emerging markets",
  "Media coverage across AIRDC member country publications",
  "Year-round brand visibility through AIRDC digital channels",
];

async function getSponsors() {
  if (!process.env.DATABASE_URL) return [];
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.sponsor.findMany({ where: { active: true }, orderBy: [{ tier: "asc" }, { order: "asc" }] });
  } catch { return []; }
}

export default async function SponsorsPage() {
  const sponsors = await getSponsors();
  const hasSponsors = sponsors.length > 0;

  return (
    <div className="pt-20">
      <div className="bg-primary py-16">
        <div className="container text-center">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">Sponsors & Partners</p>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-4">Partner with AIRDC 2026</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Align your brand with Africa's premier insurance conference and reach decision-makers across 40+ developing countries.
          </p>
        </div>
      </div>

      {/* Current Sponsors — only shown if there are sponsors in DB */}
      {hasSponsors && (
        <section className="section-padding bg-white border-b border-border">
          <div className="container">
            <div className="text-center mb-10">
              <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Our Partners</p>
              <h2 className="section-title">Conference Sponsors</h2>
              <p className="text-muted-foreground mt-2">Thank you to our valued sponsors and partners</p>
            </div>
            {TIER_ORDER.map(tier => {
              const tierSponsors = sponsors.filter(s => s.tier === tier);
              if (tierSponsors.length === 0) return null;
              return (
                <div key={tier} className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${TIER_COLORS[tier]}`}>{TIER_LABELS[tier]}</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className={`flex flex-wrap gap-6 justify-center ${tier === "PLATINUM" ? "items-center" : "items-center"}`}>
                    {tierSponsors.map(s => (
                      <div key={s.id} className={`flex flex-col items-center gap-3 ${tier === "PLATINUM" ? "w-64" : tier === "GOLD" ? "w-48" : "w-36"}`}>
                        {s.website ? (
                          <a href={s.website} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
                            {s.logoUrl ? (
                              <img src={s.logoUrl} alt={s.name} className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                            ) : (
                              <div className="h-20 w-full bg-muted rounded-xl flex items-center justify-center border border-border">
                                <span className="font-heading font-bold text-primary text-lg">{s.name}</span>
                              </div>
                            )}
                          </a>
                        ) : (
                          <>
                            {s.logoUrl ? (
                              <img src={s.logoUrl} alt={s.name} className="h-20 w-auto object-contain" />
                            ) : (
                              <div className="h-20 w-full bg-muted rounded-xl flex items-center justify-center border border-border">
                                <span className="font-heading font-bold text-primary text-lg">{s.name}</span>
                              </div>
                            )}
                          </>
                        )}
                        {s.description && <p className="text-xs text-muted-foreground text-center leading-snug">{s.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Why Sponsor */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Why Sponsor</p>
              <h2 className="section-title mb-6">The Strategic Case for Sponsorship</h2>
              <div className="space-y-3">
                {whySponsor.map((item) => (
                  <div key={item} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                    <CheckCircle2 size={18} className="text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-foreground/80 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "500+", label: "Decision Makers" },
                { value: "40+", label: "Countries" },
                { value: "5", label: "Days of Exposure" },
                { value: "$B's", label: "in Premium Volume" },
              ].map((stat) => (
                <div key={stat.label} className="card-premium p-6 text-center">
                  <p className="font-heading font-black text-4xl text-secondary mb-1">{stat.value}</p>
                  <p className="text-primary font-semibold text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-padding bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Packages</p>
            <h2 className="section-title">Sponsorship Packages</h2>
          </div>
          <div className="max-w-2xl mx-auto text-center">
            <div className="card-premium p-12 border-2 border-secondary/30">
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📋</span>
              </div>
              <h3 className="font-heading font-bold text-primary text-2xl mb-3">Packages Coming Soon</h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Our sponsorship packages are currently being finalised. Please check back soon or get in touch to express your interest and we will send you the full prospectus as soon as it is available.
              </p>
              <Link href="/contact?subject=Sponsorship+Enquiry" className="btn-primary inline-block px-8 py-3">
                Express Interest
              </Link>
              <p className="text-muted-foreground text-sm mt-6">
                Or email us directly at{" "}
                <a href="mailto:info@airdczim.co.zw" className="text-primary font-medium">info@airdczim.co.zw</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
