import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Globe2, Users2, BookOpen, Handshake } from "lucide-react";

export const metadata: Metadata = {
  title: "About the Conference",
  description: "About the 24th AIRDC Conference 2026 in Harare, Zimbabwe. Learn about the Association of Insurers and Reinsurers of Developing Countries.",
};

const airdcObjectives = [
  "Cooperate in the establishment and promotion of permanent contacts among members",
  "Gather, process and exchange statistical data and information relating to the insurance industry",
  "Develop programmes of insurance education and research on common problems of the insurance market",
  "Implement concrete means of technical cooperation among member organisations",
  "Encourage the development of reinsurance relations amongst developing countries",
  "Cooperate with public and private entities and regional organisations devoted to the promotion of the insurance industry",
  "Conduct trainings, forums and conferences, and engage in discourse and dialogue",
  "Promote and undertake studies and research, and publish articles and communications",
];

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
            &ldquo;Insurance Resilience in the Face of Geopolitical and Technological Disruption for Developing Markets&rdquo;
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
                    We gather under a theme that could not be more timely: &ldquo;Insurance Resilience in the Face of Geo-Political and Technological Disruption for Developing Markets.&rdquo; These are not words chosen lightly. They are a direct reflection of the world our industry inhabits today.
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

      {/* About AIRDC */}
      <section className="section-padding bg-muted">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">The Organisation</p>
              <h2 className="section-title mb-6">About AIRDC</h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  The <strong className="text-foreground">Association of Insurers and Reinsurers of Developing Countries (AIRDC)</strong> is an international organisation composed of insurance companies, reinsurance companies and other insurance groups that bonded together to develop and expand international collaboration and cooperation in the fields of insurance and reinsurance among them.
                </p>
                <p>
                  The AIRDC is <strong className="text-foreground">non-political, non-government, non-religious, and non-profit making.</strong> Its main objective is to strengthen the insurance market in developing countries and to foster inter-regional cooperation within the insurance industry.
                </p>
                <p>
                  The vision for the association came from Commissioner Gregoria Cruz Arnaldo, the longest-serving Insurance Commissioner of the Philippines, who was also instrumental in uniting insurance supervisory authorities across the ASEAN region. AIRDC was formally established during the 2nd Third World Insurance Congress (TWIC) in Buenos Aires, Argentina in 1980, following an initial draft constitution submitted at the 1st TWIC in Manila, Philippines in 1977. Its constitution and by-laws were approved at the 4th TWIC in Casablanca, Morocco in 1984.
                </p>
              </div>

              <div className="mt-6 p-5 rounded-xl bg-white border border-border shadow-card">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">Secretariat</p>
                <p className="text-sm text-foreground font-medium">26F, BPI-Philam Life Building</p>
                <p className="text-sm text-foreground">6811 Ayala Avenue, Makati City, Philippines</p>
                <p className="text-sm text-primary mt-1">
                  <a href="mailto:airdc@iiap.com.ph" className="hover:underline">airdc@iiap.com.ph</a>
                </p>
                <p className="text-sm text-muted-foreground">Tel: +632 8 887-7446</p>
              </div>
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: Globe2,
                  title: "International Reach",
                  desc: "AIRDC unites insurers and reinsurers from developing countries across Asia, Africa, Latin America and the Middle East, fostering cross-regional dialogue and cooperation.",
                },
                {
                  icon: Users2,
                  title: "Membership",
                  desc: "Membership is open to insurance companies, reinsurance companies, and other insurance groups operating in developing countries who share the association's objectives.",
                },
                {
                  icon: BookOpen,
                  title: "Education & Research",
                  desc: "AIRDC develops programmes of insurance education and research, promotes knowledge exchange, and publishes articles and communications relevant to developing market insurance.",
                },
                {
                  icon: Handshake,
                  title: "Technical Cooperation",
                  desc: "The association implements concrete means of technical cooperation and encourages the development of reinsurance relations among developing countries.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 rounded-xl bg-white border border-border shadow-card">
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

      {/* AIRDC Objectives */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Mandate</p>
          <h2 className="section-title mb-10">AIRDC Objectives</h2>
          <div className="space-y-3">
            {airdcObjectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted transition-colors border border-transparent hover:border-border">
                <CheckCircle2 size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                <p className="text-foreground/80 leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-6 italic">
            Source: <a href="https://www.airdevc.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">airdevc.org</a>
          </p>
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
                  title: "Geopolitical Disruption",
                  desc: "Trade wars, sanctions, conflict, and shifting alliances are reshaping global supply chains and insurance risk profiles. Developing markets are disproportionately exposed yet often underinsured.",
                  color: "border-secondary",
                },
                {
                  title: "Technological Disruption",
                  desc: "AI, blockchain, IoT, and mobile technology are transforming insurance distribution, underwriting, and claims — creating opportunities for leapfrogging traditional models in developing markets.",
                  color: "border-accent",
                },
                {
                  title: "Insurance Resilience",
                  desc: "Building insurance ecosystems that are robust, adaptive, and inclusive — capable of withstanding external shocks while continuing to deliver on the promise of risk protection.",
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
            <p className="text-foreground/80 font-medium">Harare, Zimbabwe &middot; 27–30 September 2026</p>
            <p className="text-muted-foreground text-sm mt-1">Rainbow Towers Hotel &amp; Conference Centre (HICC)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
