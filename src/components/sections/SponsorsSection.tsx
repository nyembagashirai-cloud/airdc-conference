import Link from "next/link";
import { ArrowRight } from "lucide-react";

const sponsors = {
  PLATINUM: [
    { name: "Sponsor Placeholder", desc: "Platinum Partner" },
    { name: "Sponsor Placeholder 2", desc: "Platinum Partner" },
  ],
  GOLD: [
    { name: "Gold Sponsor", desc: "" },
    { name: "Gold Sponsor 2", desc: "" },
    { name: "Gold Sponsor 3", desc: "" },
  ],
  SILVER: [
    { name: "Silver", desc: "" },
    { name: "Silver 2", desc: "" },
    { name: "Silver 3", desc: "" },
    { name: "Silver 4", desc: "" },
  ],
};

const tierConfig = {
  PLATINUM: { label: "Platinum Sponsors", color: "border-gray-300 bg-gray-50", size: "h-24", textSize: "text-2xl" },
  GOLD: { label: "Gold Sponsors", color: "border-secondary/30 bg-secondary/5", size: "h-20", textSize: "text-xl" },
  SILVER: { label: "Silver Sponsors", color: "border-border bg-white", size: "h-16", textSize: "text-lg" },
};

export function SponsorsSection() {
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

        {(Object.entries(tierConfig) as [keyof typeof tierConfig, typeof tierConfig[keyof typeof tierConfig]][]).map(([tier, config]) => (
          <div key={tier} className="mb-12 last:mb-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{config.label}</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {sponsors[tier].map((s, i) => (
                <div key={i}
                  className={`${config.size} w-40 sm:w-48 border-2 ${config.color} rounded-xl flex items-center justify-center font-bold ${config.textSize} text-muted-foreground/30 transition-all hover:border-secondary/50`}>
                  {s.name.slice(0, 2).toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-4 bg-primary/5 border border-primary/10 rounded-2xl px-8 py-6">
            <p className="font-heading font-bold text-primary text-lg">Become a Sponsor</p>
            <p className="text-muted-foreground text-sm max-w-md">
              Partner with AIRDC 2026 and gain unparalleled access to 500+ insurance decision-makers from 40+ countries.
            </p>
            <Link href="/sponsors" className="btn-primary group">
              View Sponsorship Packages
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
