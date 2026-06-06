import type { Metadata } from "next";
import { Target, Eye, CheckCircle2, Users2, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About the Conference",
  description: "Learn about the 23rd AIRDC Conference — objectives, theme, organising committee and benefits of attending.",
};

const objectives = [
  "Strengthen insurance market resilience in developing countries against geopolitical and technological disruptions",
  "Foster knowledge exchange on regulatory frameworks, InsurTech innovation, and climate risk solutions",
  "Facilitate partnerships between insurers, reinsurers, regulators, and international development institutions",
  "Showcase successful case studies from developing markets that demonstrate resilience and innovation",
  "Develop actionable resolutions and policy recommendations for member country implementation",
  "Promote financial inclusion through accessible and affordable insurance solutions",
];

const committee = [
  { name: "Januario Aliwalas", role: "Secretary General", org: "AIRDC", country: "Philippines" },
  { name: "Dr. Tendai Musikavanhu", role: "Commissioner of Insurance", org: "Insurance and Pensions Commission (IPEC)", country: "Zimbabwe" },
  { name: "Ms. Grace Muradzikwa", role: "Chairperson", org: "Insurance Council of Zimbabwe", country: "Zimbabwe" },
  { name: "Mr. James Madzimure", role: "Conference Coordinator", org: "AIRDC Zimbabwe Secretariat", country: "Zimbabwe" },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-primary py-20">
        <div className="container text-center">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">About the Conference</p>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl lg:text-6xl mb-6 max-w-4xl mx-auto">
            23rd AIRDC Conference 2026
          </h1>
          <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
            "Insurance Resilience in the Face of Geopolitical and Technological Disruption for Developing Markets"
          </p>
        </div>
      </div>

      {/* Overview */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Overview</p>
              <h2 className="section-title mb-6">Conference Overview</h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  The 23rd Annual Conference of the Association of Insurers and Reinsurers of Developing Countries (AIRDC) 
                  will be held in Harare, Zimbabwe, 26–30 September 2026, hosted by the Insurance Council of Zimbabwe.
                </p>
                <p>
                  This landmark conference brings together insurance professionals, regulators, reinsurers, policymakers, 
                  and industry stakeholders from over 40 developing nations to address the most pressing challenges and 
                  opportunities facing the global insurance industry.
                </p>
                <p>
                  Zimbabwe's dynamic insurance landscape and strategic location make it the ideal setting for this 
                  critical dialogue. The conference will explore how developing market insurers can build resilience 
                  while embracing technological transformation and navigating an increasingly complex geopolitical environment.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              {[
                { icon: Target, title: "Mission", desc: "To advance the development of sustainable, inclusive, and resilient insurance markets in developing countries." },
                { icon: Eye, title: "Vision", desc: "A world where every developing market has access to robust insurance solutions that drive economic growth and social protection." },
                { icon: Award, title: "Host Organisation", desc: "Insurance Council of Zimbabwe — the apex body representing all licensed insurers, reinsurers and brokers in Zimbabwe." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 rounded-xl bg-muted border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <item.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-primary mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Theme Explanation */}
      <section className="section-padding bg-primary">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">Theme Deep Dive</p>
            <h2 className="font-heading font-bold text-white text-3xl md:text-4xl mb-8">Understanding Our Theme</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                { title: "Geopolitical Disruption", desc: "Trade wars, sanctions, conflict, and shifting alliances are reshaping global supply chains and insurance risk profiles. Developing markets are disproportionately exposed yet often underinsured.", color: "border-secondary" },
                { title: "Technological Disruption", desc: "AI, blockchain, IoT, and mobile technology are transforming insurance distribution, underwriting, and claims — creating opportunities for leapfrogging traditional models in developing markets.", color: "border-accent" },
                { title: "Insurance Resilience", desc: "Building insurance ecosystems that are robust, adaptive, and inclusive — capable of withstanding external shocks while continuing to deliver on the promise of risk protection.", color: "border-white/30" },
              ].map((item) => (
                <div key={item.title} className={`bg-white/5 rounded-xl p-6 border-l-4 ${item.color}`}>
                  <h3 className="font-heading font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Objectives</p>
          <h2 className="section-title mb-10">Conference Objectives</h2>
          <div className="space-y-4">
            {objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted transition-colors">
                <CheckCircle2 size={20} className="text-accent mt-0.5 flex-shrink-0" />
                <p className="text-foreground/80 leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organising Committee */}
      <section className="section-padding bg-muted">
        <div className="container">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Organising Committee</p>
          <h2 className="section-title mb-10">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {committee.map((person) => {
              const initials = person.name.split(" ").map(n => n[0]).join("").slice(0, 2);
              return (
                <div key={person.name} className="card-premium p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                    {initials}
                  </div>
                  <h3 className="font-heading font-bold text-primary">{person.name}</h3>
                  <p className="text-secondary text-sm font-medium">{person.role}</p>
                  <p className="text-muted-foreground text-xs mt-1">{person.org}</p>
                  <p className="text-muted-foreground text-xs">{person.country}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
