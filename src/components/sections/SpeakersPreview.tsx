import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Linkedin, Twitter } from "lucide-react";

const featuredSpeakers = [
  { id: "1", name: "Dr. Amara Diallo", title: "Commissioner of Insurance", org: "Insurance Regulatory Authority, West Africa", country: "Ghana", photo: null, topic: "Regulatory Frameworks for Digital Insurance" },
  { id: "2", name: "Ms. Priya Naidoo", title: "Group CEO", org: "AfriRe Group", country: "South Africa", photo: null, topic: "Reinsurance in the Age of Climate Risk" },
  { id: "3", name: "Mr. Chen Wei", title: "Managing Director", org: "Asia Pacific Insurance Consortium", country: "Singapore", photo: null, topic: "InsurTech Innovation in Emerging Markets" },
  { id: "4", name: "Dr. Fatima Al-Hassan", title: "Head of Research", org: "IAIS Developing Markets Initiative", country: "Jordan", photo: null, topic: "Microinsurance & Financial Inclusion" },
  { id: "5", name: "Mr. Roberto Silva", title: "President", org: "Latin America Reinsurers Association", country: "Brazil", photo: null, topic: "Geopolitical Risk & Insurance Markets" },
  { id: "6", name: "Prof. Akinwande Osei", title: "Chair, Insurance Innovation", org: "African Development Bank", country: "Côte d'Ivoire", photo: null, topic: "Climate Resilience & Parametric Insurance" },
];

function SpeakerCard({ speaker }: { speaker: typeof featuredSpeakers[0] }) {
  const initials = speaker.name.split(" ").map(n => n[0]).join("").slice(0, 2);
  return (
    <div className="card-premium group overflow-hidden">
      <div className="relative h-48 bg-gradient-to-br from-primary to-primary-mid">
        {speaker.photo ? (
          <Image src={speaker.photo} alt={speaker.name} fill className="object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-4xl font-bold text-white/30">{initials}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 right-3 bg-secondary text-primary-dark text-xs font-bold px-2 py-1 rounded-full">
          {speaker.country}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-heading font-bold text-primary group-hover:text-accent transition-colors">{speaker.name}</h3>
        <p className="text-secondary text-sm font-medium">{speaker.title}</p>
        <p className="text-muted-foreground text-xs mb-3">{speaker.org}</p>
        <p className="text-foreground/70 text-xs border-t border-border pt-3 leading-relaxed">
          <span className="font-medium text-primary">Session: </span>{speaker.topic}
        </p>
      </div>
    </div>
  );
}

export function SpeakersPreview() {
  return (
    <section className="section-padding bg-muted">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Speakers</p>
            <h2 className="section-title">World-Class Speakers</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Industry leaders, regulators, innovators, and policymakers from across the globe.
            </p>
          </div>
          <Link href="/speakers" className="btn-primary flex-shrink-0 group">
            View All Speakers
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSpeakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
}
