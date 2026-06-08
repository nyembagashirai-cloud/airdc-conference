import { Shield, Globe, TrendingUp, Users } from "lucide-react";

const pillars = [
  { icon: Shield, title: "Insurance Resilience", desc: "Building robust insurance markets capable of withstanding geopolitical and economic shocks." },
  { icon: Globe, title: "Developing Markets Focus", desc: "Tailored strategies for the unique challenges and opportunities of developing economies." },
  { icon: TrendingUp, title: "Technology & Innovation", desc: "Leveraging InsurTech, AI, and digital transformation for market growth." },
  { icon: Users, title: "Global Collaboration", desc: "Fostering partnerships between insurers, reinsurers, regulators and policymakers." },
];

export function AboutSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">About AIRDC</p>
          <h2 className="section-title">Shaping the Future of Insurance in Developing Markets</h2>
          <p className="section-subtitle mx-auto">
            The Association of Insurers and Reinsurers of Developing Countries (AIRDC) is the premier 
            body representing the insurance industry across developing nations, bringing together 
            stakeholders from 28 member countries across Asia, Africa, the Middle East, North America and Europe.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="card-premium p-6 group">
              <div className="w-12 h-12 rounded-xl bg-primary/5 group-hover:bg-primary flex items-center justify-center mb-4 transition-colors">
                <pillar.icon size={24} className="text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-heading font-bold text-primary mb-2">{pillar.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
