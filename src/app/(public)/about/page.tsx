import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the Conference",
  description: "About the 24th AIRDC Conference 2026 in Harare, Zimbabwe. Learn about the Association of Insurers and Reinsurers of Developing Countries.",
};


export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-primary py-20">
        <div className="container text-center">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">About the Conference</p>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl lg:text-6xl mb-6 max-w-4xl mx-auto leading-tight">
            24th AIRDC Conference 2026
          </h1>
          <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
            &ldquo;Strengthening Insurance Resilience for Developing Countries Amid Geopolitical and Technological Disruptions&rdquo;
          </p>
          <p className="text-white/50 text-sm mt-4">27&ndash;30 September 2026 &middot; Rainbow Towers Hotel &amp; Conference Centre, Harare, Zimbabwe</p>
        </div>
      </div>

      {/* About AIRDC — link out */}
      <section className="section-padding bg-muted">
        <div className="container text-center max-w-2xl mx-auto">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">The Organisation</p>
          <h2 className="section-title mb-4">About AIRDC</h2>
          <p className="section-subtitle mx-auto mb-8">
            Learn more about the Association of Insurers and Reinsurers of Developing Countries — its history, membership, objectives, and work across developing insurance markets worldwide.
          </p>
          <a
            href="https://www.airdevc.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-primary"
          >
            Visit AIRDC Website →
          </a>
        </div>
      </section>

      {/* Conference Theme */}
      <section className="section-padding bg-primary">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">Conference Theme 2026</p>
            <h2 className="font-heading font-bold text-white text-3xl md:text-4xl mb-8">Understanding Our Theme</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                {
                  title: "Strengthening Resilience",
                  desc: "The conference calls on developing countries to actively build stronger, more adaptive insurance ecosystems — not merely to survive disruption, but to emerge from it more capable and inclusive.",
                  color: "border-secondary",
                },
                {
                  title: "Geopolitical Disruptions",
                  desc: "Trade wars, sanctions, conflict, and shifting alliances are reshaping global supply chains and risk profiles. Developing markets bear outsized exposure, making cross-border solidarity and smart risk transfer more urgent than ever.",
                  color: "border-accent",
                },
                {
                  title: "Technological Disruptions",
                  desc: "AI, blockchain, IoT, and mobile platforms are transforming insurance delivery, underwriting, and claims — presenting developing countries with a historic opportunity to leapfrog legacy models and accelerate financial inclusion.",
                  color: "border-white/30",
                },
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

      {/* Past Conferences */}
      <section className="section-padding bg-muted">
        <div className="container max-w-3xl mx-auto text-center">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Conference History</p>
          <h2 className="section-title mb-8">Recent AIRDC Conferences</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { edition: "23rd", location: "Bangkok, Thailand", year: "2024", dates: "6–9 October 2024", link: "https://airdcthailand2024.com/" },
              { edition: "22nd", location: "Accra, Ghana", year: "2022", dates: "2022", link: "https://www.airdevc.org/ghana-2022" },
            ].map((conf) => (
              <a
                key={conf.edition}
                href={conf.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-6 border border-border shadow-card hover:shadow-premium hover:-translate-y-0.5 transition-all text-left group"
              >
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{conf.edition} Conference</p>
                <h3 className="font-heading font-bold text-primary text-lg group-hover:text-secondary transition-colors">{conf.location}</h3>
                <p className="text-muted-foreground text-sm">{conf.dates}</p>
              </a>
            ))}
          </div>
          <div className="mt-8 bg-secondary/10 border border-secondary/30 rounded-2xl p-6 text-left">
            <p className="text-xs text-secondary font-bold uppercase tracking-widest mb-2">Next</p>
            <h3 className="font-heading font-black text-primary text-xl">24th AIRDC Conference</h3>
            <p className="text-foreground/80 font-medium">Harare, Zimbabwe &middot; 27&ndash;30 September 2026</p>
            <p className="text-muted-foreground text-sm mt-1">Rainbow Towers Hotel &amp; Conference Centre (HICC)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
