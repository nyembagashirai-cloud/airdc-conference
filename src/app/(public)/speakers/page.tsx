import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Linkedin, Twitter } from "lucide-react";

export const metadata: Metadata = {
  title: "Speakers",
  description: "Meet the world-class speakers at the 23rd AIRDC Conference 2026.",
};

const speakers = [
  { id: "1", name: "Dr. Amara Diallo", title: "Commissioner of Insurance", org: "Insurance Regulatory Authority", country: "Ghana", topic: "Regulatory Frameworks for Digital Insurance", type: "Keynote Speaker", bio: "Dr. Diallo has over 20 years of experience in insurance regulation across West Africa, having led multiple digital transformation initiatives." },
  { id: "2", name: "Ms. Priya Naidoo", title: "Group CEO", org: "AfriRe Group", country: "South Africa", topic: "Reinsurance in the Age of Climate Risk", type: "Keynote Speaker", bio: "A pioneer in African reinsurance markets, Ms. Naidoo has structured innovative parametric solutions for climate risk across 15 African nations." },
  { id: "3", name: "Mr. Chen Wei", title: "Managing Director", org: "Asia Pacific Insurance Consortium", country: "Singapore", topic: "InsurTech Innovation in Emerging Markets", type: "Panel Speaker", bio: "Mr. Wei leads APIC's emerging markets strategy and has overseen digital transformation programmes in 12 Asian developing markets." },
  { id: "4", name: "Dr. Fatima Al-Hassan", title: "Head of Research", org: "IAIS Developing Markets Initiative", country: "Jordan", topic: "Microinsurance & Financial Inclusion", type: "Panel Speaker", bio: "Dr. Al-Hassan specialises in microinsurance product development and financial inclusion policy for developing economies." },
  { id: "5", name: "Mr. Roberto Silva", title: "President", org: "Latin America Reinsurers Association", country: "Brazil", topic: "Geopolitical Risk & Insurance Markets", type: "Moderator", bio: "With 30 years in Latin American insurance markets, Mr. Silva is a leading voice on geopolitical risk management and market resilience." },
  { id: "6", name: "Prof. Akinwande Osei", title: "Chair, Insurance Innovation", org: "African Development Bank", country: "Côte d'Ivoire", topic: "Climate Resilience & Parametric Insurance", type: "Workshop Facilitator", bio: "Prof. Osei leads AfDB's insurance innovation agenda and has published extensively on parametric solutions for African smallholder farmers." },
  { id: "7", name: "Ms. Thandiwe Moyo", title: "Executive Director", org: "Insurance Council of Zimbabwe", country: "Zimbabwe", topic: "Zimbabwe Insurance Market: Opportunities & Challenges", type: "Keynote Speaker", bio: "Ms. Moyo heads Zimbabwe's insurance apex body and has been instrumental in the country's insurance sector transformation." },
  { id: "8", name: "Mr. Raj Patel", title: "Global Head of InsurTech", org: "Munich Re Digital Partners", country: "Germany", topic: "AI-Driven Underwriting: The New Frontier", type: "Panel Speaker", bio: "Mr. Patel oversees Munich Re's global InsurTech portfolio and AI implementation across 40+ markets." },
];

const typeColors: Record<string, string> = {
  "Keynote Speaker": "bg-secondary/10 text-secondary border-secondary/20",
  "Panel Speaker": "bg-accent/10 text-accent border-accent/20",
  "Moderator": "bg-primary/10 text-primary border-primary/20",
  "Workshop Facilitator": "bg-purple-50 text-purple-700 border-purple-200",
};

export default function SpeakersPage() {
  return (
    <div className="pt-20">
      <div className="bg-primary py-16">
        <div className="container text-center">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">Speakers</p>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-4">Conference Speakers</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            World-class industry leaders, regulators, innovators, and policymakers from across developing markets.
          </p>
        </div>
      </div>

      <section className="section-padding bg-muted">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {speakers.map((speaker) => {
              const initials = speaker.name.split(" ").map(n => n[0]).join("").slice(0, 2);
              return (
                <div key={speaker.id} className="card-premium group overflow-hidden">
                  <div className="relative h-52 bg-gradient-to-br from-primary to-primary-mid">
                    <div className="flex items-center justify-center h-full">
                      <span className="text-5xl font-bold text-white/20">{initials}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full border border-white/20">
                      {speaker.country}
                    </div>
                    <span className={`absolute bottom-3 left-3 text-xs font-bold px-2 py-1 rounded-full border ${typeColors[speaker.type] || "bg-gray-100 text-gray-600"}`}>
                      {speaker.type}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-primary group-hover:text-accent transition-colors">{speaker.name}</h3>
                    <p className="text-secondary text-sm font-medium">{speaker.title}</p>
                    <p className="text-muted-foreground text-xs mb-3">{speaker.org}</p>
                    <p className="text-foreground/60 text-xs leading-relaxed border-t border-border pt-3 line-clamp-2">
                      {speaker.bio}
                    </p>
                    <p className="mt-3 text-xs text-primary font-medium border-t border-border pt-3">
                      <span className="text-muted-foreground">Topic: </span>{speaker.topic}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Speaker CTA */}
          <div className="mt-12 text-center p-8 bg-white rounded-2xl border border-border shadow-card">
            <h3 className="font-heading font-bold text-primary text-xl mb-2">Interested in Speaking?</h3>
            <p className="text-muted-foreground mb-4">Submit your abstract or speaking proposal for consideration at AIRDC 2026.</p>
            <Link href="/contact?subject=Speaking+Inquiry" className="btn-primary">Submit a Speaker Proposal</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
