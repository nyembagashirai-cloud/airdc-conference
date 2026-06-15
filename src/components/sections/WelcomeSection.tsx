"use client";
import Image from "next/image";
import { ChevronDown, Quote } from "lucide-react";
import { useState } from "react";

const speakers = [
  {
    name: "Januario Aliwalas",
    title: "Secretary General",
    org: "AIRDC",
    imgSrc: "/images/secretary-general.jpg",
    initials: "JA",
    objectPosition: "object-top",
    quote:
      "Welcome, esteemed delegates, industry leaders, and honored guests, to the AIRDC Zimbabwe Conference.",
    body: [
      "On behalf of AIRDC, I extend our deepest gratitude to our gracious hosts, the Insurance Council of Zimbabwe. Thank you for your warm hospitality and for providing the perfect backdrop for this vital dialogue.",
      "Across the globe, developing markets are on the frontlines of rapid transformations. We are navigating an era marked by shifting global trade routes, geopolitical tensions, and the escalating impacts of climate-related risks. Simultaneously, the technological revolution is reshaping how we underwrite risk, distribute products, and interact with our policyholders.",
      "For developing markets, these disruptions are not just academic topics; they are day-to-day realities. However, within these disruptions lie unprecedented opportunities. Technological innovations—from mobile-integrated microinsurance to AI-driven predictive modeling—offer us the tools to expand our reach and make insurance more accessible and affordable than ever before.",
      "I encourage each of you to actively participate, share your unique regional perspectives, and challenge the status quo. Let us use this platform to forge new partnerships, exchange transformative ideas, and develop concrete strategies that will empower our markets to thrive in an uncertain future.",
      "Once again, welcome to this crucial conference. I wish you all insightful deliberations, fruitful networking, and a highly memorable stay in Zimbabwe.",
    ],
    label: "AIRDC Zimbabwe Conference, September 2026",
  },
  {
    name: "Mr. Patrick Kusikwenyu",
    title: "LOC Chairman",
    org: "24th AIRDC Conference 2026",
    imgSrc: "/images/loc-chairman.jpeg",
    initials: "PK",
    objectPosition: "object-center",
    quote:
      "Distinguished guests, fellow insurers and reinsurers — a very warm welcome to Harare, the Sunshine City, and to Zimbabwe.",
    body: [
      "On behalf of the Local Organising Committee, it is my profound honour and privilege to welcome you to the 24th Conference of the Association of Insurers and Reinsurers of Developing Countries. That this conference is being held on African soil here in Zimbabwe is a source of immense pride for us, and we have spared no effort to ensure that your experience here is both productive and memorable.",
      "We gather under a theme that could not be more timely: "Strengthening Insurance Resilience for Developing Countries Amid Geopolitical and Technological Disruptions." These are not words chosen lightly. They are a direct reflection of the world our industry inhabits today.",
      "Zimbabwe's economy is undergoing rapid formalisation, bringing thousands of SMEs, informal traders, farmers and entrepreneurs into the formal financial system. Climate change continues to reshape risk across Africa. Beyond our borders, global conflicts are causing profound disruption to the world economic order — reshuffling trade routes, disrupting reinsurance capacity, and introducing sanctions regimes that complicate cross-border transactions.",
      "Yet within these disruptions lie unprecedented opportunities. Africa's insurance penetration remains among the lowest in the world, and that is not only a statistic — it is an invitation. Technology is transforming how insurance is delivered, enabling us to reach previously underserved populations and accelerate financial inclusion.",
      "The AIRDC was founded on the belief that developing markets are stronger when they work together. To all delegates: the work you do matters enormously. Welcome, once again, to Harare. Welcome to Zimbabwe. Let us get to work.",
    ],
    label: "24th AIRDC Conference 2026, Harare",
  },
];

function WelcomeCard({ speaker }: { speaker: typeof speakers[0] }) {
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="card-premium flex flex-col overflow-hidden">
      {/* Header — always visible */}
      <div className="p-6 flex gap-4 items-start">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-primary/10 shadow-md">
          {!imgError ? (
            <Image
              src={speaker.imgSrc}
              alt={speaker.name}
              fill
              className={`object-cover ${speaker.objectPosition}`}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-lg font-black text-primary/40">{speaker.initials}</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-primary leading-tight">{speaker.name}</p>
          <p className="text-muted-foreground text-sm">{speaker.title}</p>
          <p className="text-secondary text-xs font-semibold mt-0.5">{speaker.org}</p>
        </div>
      </div>

      {/* Quote — always visible */}
      <div className="px-6 pb-4">
        <div className="relative pl-4 border-l-4 border-secondary">
          <Quote size={20} className="text-secondary/30 absolute -top-1 -left-0.5" />
          <p className="text-foreground/70 text-sm leading-relaxed italic">{speaker.quote}</p>
        </div>
      </div>

      {/* Expanded body */}
      {open && (
        <div className="px-6 pb-4 space-y-3">
          {speaker.body.map((para, i) => (
            <p key={i} className="text-foreground/70 text-sm leading-relaxed">{para}</p>
          ))}
          <p className="text-xs text-muted-foreground italic pt-2">{speaker.label}</p>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="mt-auto flex items-center justify-center gap-1.5 w-full py-3 px-6 border-t border-border text-xs font-semibold text-primary hover:bg-primary/5 transition-colors"
      >
        {open ? "Collapse" : "Read full message"}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}

export function WelcomeSection() {
  return (
    <section className="section-padding bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Welcome Messages</p>
          <h2 className="section-title">Words from Our Leaders</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {speakers.map((s) => (
            <WelcomeCard key={s.name} speaker={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
