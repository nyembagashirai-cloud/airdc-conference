import type { Metadata } from "next";
import Image from "next/image";

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

      {/* LOC Chairman Welcome */}
      <section className="section-padding bg-white">
        <div className="container max-w-5xl mx-auto">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3 text-center">Welcome Address</p>
          <h2 className="section-title text-center mb-12">Message from the LOC Chairman</h2>

          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {/* Photo and title */}
            <div className="lg:col-span-1 text-center">
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden mx-auto mb-4 shadow-premium border-4 border-secondary/20">
                <Image
                  src="/images/loc-chairman.jpeg"
                  alt="Mr. Patrick Kusikwenyu, LOC Chairman"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading font-bold text-primary text-lg leading-tight">Mr. Patrick Kusikwenyu</h3>
              <p className="text-secondary font-semibold text-sm mt-1">LOC Chairman</p>
              <p className="text-muted-foreground text-xs mt-1">24th AIRDC Conference 2026</p>
              <div className="mt-4 h-1 w-16 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, #C8941C, #E8B832)" }} />
            </div>

            {/* Speech */}
            <div className="lg:col-span-2">
              <div className="relative">
                <span className="absolute -top-4 -left-2 text-7xl text-secondary/20 font-serif leading-none select-none">&ldquo;</span>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-[15px] relative z-10 pt-4">
                  <p>
                    Distinguished guests, industry leaders, fellow insurers and reinsurers from across the developing world, a very warm welcome to Harare, the Sunshine City, and to Zimbabwe.
                  </p>
                  <p>
                    On behalf of the Local Organising Committee, it is my profound honour and privilege to welcome you to the 24th Conference of the Association of Insurers and Reinsurers of Developing Countries. That this conference is being held on African soil here in Zimbabwe, is a source of immense pride for us, and we have spared no effort to ensure that your experience here is both productive and memorable.
                  </p>
                  <p>
                    We gather under a theme that could not be more timely: &ldquo;Strengthening Insurance Resilience for Developing Countries Amid Geopolitical and Technological Disruptions.&rdquo; These are not words chosen lightly. They are a direct reflection of the world our industry inhabits today.
                  </p>

                  <h4 className="font-heading font-bold text-primary pt-2">The Climate Crisis Is Here</h4>
                  <p>
                    Zimbabwe&rsquo;s economy is undergoing rapid formalisation, bringing thousands of SMEs, informal traders, farmers and entrepreneurs into the formal financial system. For the insurance industry, this presents a significant growth opportunity but also a challenge. Many of our traditional products were designed for a different customer and a different era. As new segments enter the formal economy, we must rethink product design, distribution models, premium collection and claims processes to ensure insurance remains relevant, accessible and impactful.
                  </p>
                  <p>
                    At the same time, climate change continues to reshape risk across Africa. Droughts, floods, cyclones and erratic weather patterns are no longer future threats; they are present realities affecting livelihoods, businesses and economies. This demands innovative solutions, including parametric insurance, index-based agricultural products and other climate responsive risk transfer mechanisms that can build resilience among vulnerable communities.
                  </p>

                  <h4 className="font-heading font-bold text-primary pt-2">A World Fractured by Conflict</h4>
                  <p>
                    Beyond our borders, we cannot ignore the profound disruption that global conflicts are causing to the world economic order. Wars in Europe and the Middle East have reshuffled trade routes, spiked energy and commodity prices, disrupted reinsurance capacity, and introduced sanctions regimes that complicate cross-border transactions for our markets. For developing economies already navigating thin capital margins and currency volatility, these geopolitical tremors carry outsized consequences. We must interrogate, as an industry, how we price political risk, how we structure our reinsurance arrangements, and how we engage with regulators to preserve market stability when the world outside is anything but stable.
                  </p>

                  <h4 className="font-heading font-bold text-primary pt-2">Opportunity Within Disruption</h4>
                  <p>
                    Yet within these disruptions lie unprecedented opportunities. Africa&rsquo;s insurance penetration remains among the lowest in the world, and that is not only a statistic; it is an invitation. Technology &mdash; from artificial intelligence and advanced analytics to mobile platforms and satellite-based monitoring &mdash; is transforming how insurance is delivered, enabling us to reach previously underserved populations and accelerate financial inclusion across developing markets.
                  </p>
                  <p>
                    The AIRDC was founded on the belief that developing markets are stronger when they work together. As we gather in Harare, I encourage all delegates to engage openly, share experiences, forge new partnerships and explore practical solutions that will strengthen the resilience, relevance and sustainability of our industry.
                  </p>
                  <p>
                    To our international guests: thank you for making the journey. You honour us with your presence. Zimbabwe is open, ready, and eager to show you the warmth and resilience for which our people are known.
                  </p>
                  <p>
                    To all delegates: the work you do matters enormously. Insurance is the quiet foundation upon which economic recovery, social stability, and national development are built. In a world as disrupted and as full of possibility as ours, that foundation has never been more critical &mdash; or more worth strengthening.
                  </p>
                  <p className="font-semibold text-primary">
                    Welcome, once again, to Harare. Welcome to Zimbabwe. Let us get to work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
