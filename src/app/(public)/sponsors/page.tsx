import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Check, Minus, Download, Mail, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Sponsors & Partners",
  description:
    "Sponsorship packages, rates and partner opportunities at the 24th AIRDC Conference 2026, Rainbow Towers Hotel, Harare, Zimbabwe.",
};

const TIER_ORDER = ["PLATINUM", "DIAMOND", "GOLD", "SILVER", "BRONZE", "SUPPORTING_PARTNER"];
const TIER_LABELS: Record<string, string> = {
  PLATINUM: "Platinum",
  DIAMOND: "Diamond",
  GOLD: "Gold",
  SILVER: "Silver",
  BRONZE: "Bronze",
  SUPPORTING_PARTNER: "Supporting Partner",
};
const TIER_COLORS: Record<string, string> = {
  PLATINUM: "text-gray-700 bg-gray-100 border-gray-300",
  DIAMOND: "text-sky-800 bg-sky-50 border-sky-200",
  GOLD: "text-yellow-800 bg-yellow-100 border-yellow-300",
  SILVER: "text-slate-600 bg-slate-100 border-slate-300",
  BRONZE: "text-orange-800 bg-orange-50 border-orange-200",
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

/* ---------------------------------------------------------------------------
   Sponsorship packages (from the official International Sponsorship Form)
--------------------------------------------------------------------------- */

const PACKAGE_TIERS = [
  { name: "Platinum", price: "$25,000", featured: true },
  { name: "Diamond", price: "$20,000", featured: false },
  { name: "Gold", price: "$15,000", featured: false },
  { name: "Silver", price: "$10,000", featured: false },
  { name: "Bronze", price: "$5,000", featured: false },
];

type Benefit = { label: string; values: (string | boolean)[] };

const PACKAGE_BENEFITS: Benefit[] = [
  { label: "Free registration", values: ["2", "1", "75% for 1", "50% for 1", false] },
  { label: "Complimentary meeting room", values: [true, true, true, false, false] },
  { label: "Complimentary booth", values: [false, false, false, true, false] },
  { label: "Display of 2-minute video advert during the opening", values: [true, true, true, true, true] },
  {
    label: "Video during ceremony sessions, coffee breaks and closing ceremony (60 sec)",
    values: [true, true, true, true, true],
  },
  { label: "Sponsor company’s name included in the opening speech", values: [true, true, true, true, true] },
  { label: "Roll-up banners displayed at the conference venue", values: ["4", "3", "2", "2", "1"] },
  { label: "Company logo projected on LED screen before and after sessions", values: [true, true, true, true, true] },
  { label: "Company promotional material placed in conference bags", values: [true, true, true, true, true] },
  {
    label: "Logo published on conference banners, registration platform and flyers",
    values: [true, true, true, true, true],
  },
  {
    label: "Logo on all AIRDC communication handles before and during the event",
    values: [true, true, true, true, true],
  },
];

/* Individual sponsorship items and rates */
const SPONSORSHIP_ITEMS: { item: string; note?: string; price: string }[] = [
  { item: "Welcome Cocktail", note: "HICC", price: "$20,000" },
  { item: "Closing Dinner", note: "Grand Hyatt", price: "$22,000" },
  { item: "Conference Room Stage Design", note: "Sponsor to approve design", price: "$16,000" },
  { item: "Conference Bags", note: "Sponsor to approve design", price: "$15,000" },
  { item: "Photography & Videography", price: "$7,500" },
  { item: "Lunch — Day 1", price: "$6,000" },
  { item: "Lunch — Day 2", price: "$6,000" },
  { item: "Coffee / Snack Station", note: "Sponsor to approve design", price: "$5,000" },
  { item: "Coffee / Tea Break 1", price: "$4,500" },
  { item: "Coffee / Tea Break 2", price: "$4,500" },
  { item: "Registration Area", note: "Sponsor to approve design", price: "$3,720" },
  { item: "Event Website Sponsor", price: "$3,000" },
  { item: "Presentation Session", price: "$2,000" },
  { item: "Medical Partner", note: "MARS", price: "$1,900" },
  { item: "Ushers", price: "$1,600" },
  { item: "Lanyards and Badges", price: "$700" },
  { item: "Transportation Sponsor", price: "At cost" },
  { item: "Presenters’ Gifts", price: "At cost" },
  { item: "Conference Venue Signage", price: "At cost" },
];

/* Detailed benefits for each named sponsorship opportunity */
const COMMON_VIDEO =
  "Display of a 2-minute video during the opening ceremony, sessions, coffee breaks and closing ceremony (video must be strictly 2 minutes maximum)";
const COMMON_OPENING = "Sponsor company’s name to be included in the opening speech";
const COMMON_SPONSOR_VIDEO = "Sponsor’s logo on the sponsors’ video displayed on the screens in the conference hall";
const COMMON_THANKS = "Sponsor’s logo on the sponsors’ thank-you post shared on social media";
const COMMON_HANDLES = "Sponsor’s logo on all AIRDC communication handles before, during and after the event";
const COMMON_BAGS = "Sponsor to provide promotional material to be included in conference bags";

const PACKAGE_DETAILS: { title: string; price: string; benefits: string[] }[] = [
  {
    title: "Welcome Cocktail Sponsor",
    price: "$20,000",
    benefits: [
      "Sponsor’s logo on the Cocktail Reception announcement post on social media",
      "Sponsor’s logo on stage screens during the Cocktail Reception",
      "Exclusive branding for the sponsor at the Cocktail Reception area",
      "A customised Cocktail Reception electronic invitation sent to all participants",
      COMMON_VIDEO,
      COMMON_OPENING,
      "One full-colour page advertisement in the event booklet",
      "Sponsor’s logo on the event website",
      COMMON_SPONSOR_VIDEO,
      COMMON_THANKS,
      COMMON_BAGS,
      COMMON_HANDLES,
    ],
  },
  {
    title: "Closing Dinner Sponsor",
    price: "$22,000",
    benefits: [
      "Sponsor’s logo exclusively on stage screens during the dinner",
      "Elevate your brand visibility — the dinner screens are officially yours (to be coordinated with the Event Manager)",
      COMMON_VIDEO,
      "One free meeting room, subject to availability",
      "Sponsor logo prominently featured on the event website’s dedicated sponsors’ page (Platinum location)",
      COMMON_SPONSOR_VIDEO,
      COMMON_THANKS,
      COMMON_BAGS,
      COMMON_HANDLES,
    ],
  },
  {
    title: "Coffee Break Sponsor — Day 1 & 2",
    price: "$4,500 each",
    benefits: [
      "Exclusive branding of the coffee break area",
      COMMON_VIDEO,
      COMMON_OPENING,
      "Sponsor’s logo on the event website",
      COMMON_SPONSOR_VIDEO,
      COMMON_THANKS,
      COMMON_HANDLES,
    ],
  },
  {
    title: "Lunch Sponsor — Day 1",
    price: "$6,000",
    benefits: [
      "Branding on the lunch electronic invitation with the sponsor’s logo as Lunch Sponsor (Day 1)",
      "Exclusive branding of the lunch area by the sponsor (Day 1)",
      COMMON_VIDEO,
      COMMON_OPENING,
      "Sponsor’s logo on the event website",
      COMMON_SPONSOR_VIDEO,
      COMMON_THANKS,
      COMMON_HANDLES,
    ],
  },
  {
    title: "Lunch Sponsor — Day 2",
    price: "$6,000",
    benefits: [
      "Branding on the lunch electronic invitation with the sponsor’s logo as Lunch Sponsor (Day 2)",
      "Exclusive branding of the lunch area by the sponsor (Day 2)",
      COMMON_VIDEO,
      COMMON_OPENING,
      "Sponsor’s logo on the event website",
      COMMON_SPONSOR_VIDEO,
      COMMON_THANKS,
      COMMON_HANDLES,
    ],
  },
  {
    title: "Conference Bags Sponsor",
    price: "$15,000",
    benefits: [
      "Exclusive branding on conference bags — your company logo prominently and exclusively featured on all conference bags provided to attendees, ensuring high visibility throughout the event",
      COMMON_VIDEO,
      "Sponsor logo prominently featured on the event website’s dedicated sponsors’ page",
      COMMON_SPONSOR_VIDEO,
      COMMON_THANKS,
      COMMON_BAGS,
      COMMON_HANDLES,
    ],
  },
  {
    title: "Conference Stage Sponsor",
    price: "$16,000",
    benefits: [
      "Exclusive branding of the conference stage by the sponsor",
      "Sponsor logo prominently featured on the event website’s dedicated sponsors’ page",
      COMMON_SPONSOR_VIDEO,
      COMMON_THANKS,
      COMMON_HANDLES,
    ],
  },
  {
    title: "Transportation Sponsor",
    price: "At cost",
    benefits: [
      "Special exclusive branding on all official event transportation",
      "Sponsor’s logo exclusively on the drivers’ t-shirts",
      COMMON_VIDEO,
      COMMON_OPENING,
      "Sponsor’s logo on the sponsors’ page on the event website",
      COMMON_SPONSOR_VIDEO,
      COMMON_THANKS,
      COMMON_HANDLES,
    ],
  },
  {
    title: "Registration Area Sponsor",
    price: "$3,720",
    benefits: [
      "Exclusive branding of the registration area by the sponsor",
      "Sponsor logo prominently featured on the event website’s dedicated sponsors’ page",
      COMMON_SPONSOR_VIDEO,
      COMMON_THANKS,
      COMMON_BAGS,
      COMMON_HANDLES,
    ],
  },
  {
    title: "Event Website Sponsor",
    price: "$3,000",
    benefits: [
      "Your logo prominently displayed on the event homepage",
      "Your logo prominently displayed in a special section of the registration confirmation email",
      "Exclusive branding on the registration page of the event website",
      "Sponsor logo prominently featured on the website’s dedicated sponsors’ page",
      COMMON_SPONSOR_VIDEO,
      COMMON_THANKS,
      COMMON_BAGS,
      COMMON_HANDLES,
    ],
  },
  {
    title: "Medical Sponsor",
    price: "$1,900",
    benefits: [
      "Free exhibition area to be used as a clinic",
      "Two complimentary passes",
      "Sponsor logo prominently featured on the event website’s dedicated sponsors’ page",
      COMMON_SPONSOR_VIDEO,
      COMMON_THANKS,
      COMMON_HANDLES,
    ],
  },
];

const SPONSORSHIP_CONTACTS = [
  { name: "Patrick Kusikwenyu", role: "Chairman — Local Organising Committee", email: "patrick@sanctuary.co.zw" },
  { name: "Alice Shumba", role: "Chairperson — Marketing & PR Committee", email: "alice.shumba@fbc.co.zw" },
  { name: "Ringisai Batiya", role: "Chairperson — Secretariat", email: "rbatiya@icz.co.zw" },
];

/* ------------------------------------------------------------------------ */

function BenefitMark({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10">
        <Check size={16} className="text-primary" strokeWidth={3} />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7">
        <Minus size={16} className="text-border" strokeWidth={3} />
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return <span className="font-heading font-bold text-primary text-sm">{value}</span>;
}

async function getSponsors() {
  if (!process.env.DATABASE_URL) return [];
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.sponsor.findMany({ where: { active: true }, orderBy: [{ tier: "asc" }, { order: "asc" }] });
  } catch {
    return [];
  }
}

export default async function SponsorsPage() {
  const sponsors = await getSponsors();
  const hasSponsors = sponsors.length > 0;

  return (
    <div className="pt-20">
      <div className="bg-primary py-16">
        <div className="container text-center">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">Sponsors &amp; Partners</p>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-4">Partner with AIRDC 2026</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Align your brand with Africa&rsquo;s premier insurance conference and reach decision-makers across 40+
            developing countries.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#packages" className="btn-secondary inline-flex items-center gap-2 px-6 py-3">
              View Packages
            </a>
            <a
              href="/AIRDC-2026-Sponsorship-Form.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              <Download size={18} />
              Sponsorship Form
            </a>
          </div>
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
            {TIER_ORDER.map((tier) => {
              const tierSponsors = sponsors.filter((s) => s.tier === tier);
              if (tierSponsors.length === 0) return null;
              return (
                <div key={tier} className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${TIER_COLORS[tier]}`}
                    >
                      {TIER_LABELS[tier]}
                    </span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className="flex flex-wrap gap-6 justify-center items-center">
                    {tierSponsors.map((s) => (
                      <div
                        key={s.id}
                        className={`flex flex-col items-center gap-3 ${
                          tier === "PLATINUM" || tier === "DIAMOND" ? "w-64" : tier === "GOLD" ? "w-48" : "w-36"
                        }`}
                      >
                        {s.website ? (
                          <a
                            href={s.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:opacity-80 transition-opacity"
                          >
                            {s.logoUrl ? (
                              <img
                                src={s.logoUrl}
                                alt={s.name}
                                className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                              />
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
                        {s.description && (
                          <p className="text-xs text-muted-foreground text-center leading-snug">{s.description}</p>
                        )}
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

      {/* Sponsorship Packages */}
      <section id="packages" className="section-padding bg-muted scroll-mt-24">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Packages</p>
            <h2 className="section-title">Sponsorship Packages</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Five headline packages, each combining on-site presence, stage visibility and year-round brand exposure
              across AIRDC channels. All amounts are in US dollars.
            </p>
          </div>

          {/* Tier headline cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-14">
            {PACKAGE_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`card-premium p-6 text-center relative ${
                  tier.featured ? "border-2 border-secondary" : ""
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-secondary text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                    <Sparkles size={11} />
                    Headline
                  </span>
                )}
                <p className="font-heading font-bold text-primary text-lg uppercase tracking-wide mb-2">{tier.name}</p>
                <p className="font-heading font-black text-secondary text-3xl mb-4">{tier.price}</p>
                <Link
                  href={`/contact?subject=Sponsorship+Enquiry+-+${tier.name}`}
                  className="btn-primary inline-block w-full px-4 py-2 text-sm"
                >
                  Enquire
                </Link>
              </div>
            ))}
          </div>

          {/* Comparison table — desktop */}
          <div className="hidden lg:block bg-white rounded-xl shadow-card border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <caption className="sr-only">Comparison of AIRDC 2026 sponsorship package benefits</caption>
                <thead>
                  <tr className="bg-primary">
                    <th scope="col" className="p-4 text-white font-heading font-bold text-sm w-[38%]">
                      Package Benefits
                    </th>
                    {PACKAGE_TIERS.map((tier) => (
                      <th key={tier.name} scope="col" className="p-4 text-center">
                        <span className="block font-heading font-bold text-white text-sm uppercase tracking-wide">
                          {tier.name}
                        </span>
                        <span className="block font-heading font-black text-secondary text-lg">{tier.price}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PACKAGE_BENEFITS.map((benefit, i) => (
                    <tr key={benefit.label} className={i % 2 === 1 ? "bg-muted/60" : "bg-white"}>
                      <th
                        scope="row"
                        className="p-4 text-foreground/80 text-sm font-medium leading-snug border-t border-border"
                      >
                        {benefit.label}
                      </th>
                      {benefit.values.map((value, j) => (
                        <td key={j} className="p-4 text-center border-t border-border">
                          <BenefitMark value={value} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Comparison — mobile stacked cards */}
          <div className="lg:hidden space-y-6">
            {PACKAGE_TIERS.map((tier, tierIndex) => (
              <div key={tier.name} className="bg-white rounded-xl shadow-card border border-border overflow-hidden">
                <div className="bg-primary px-5 py-4 flex items-baseline justify-between">
                  <span className="font-heading font-bold text-white text-base uppercase tracking-wide">
                    {tier.name}
                  </span>
                  <span className="font-heading font-black text-secondary text-xl">{tier.price}</span>
                </div>
                <ul className="divide-y divide-border">
                  {PACKAGE_BENEFITS.map((benefit) => {
                    const value = benefit.values[tierIndex];
                    if (value === false) return null;
                    return (
                      <li key={benefit.label} className="flex items-start gap-3 px-5 py-3">
                        {value === true ? (
                          <Check size={16} className="text-primary flex-shrink-0 mt-1" strokeWidth={3} />
                        ) : (
                          <span className="font-heading font-bold text-secondary text-xs flex-shrink-0 mt-0.5 min-w-[3.5rem]">
                            {value}
                          </span>
                        )}
                        <span className="text-foreground/80 text-sm leading-snug">{benefit.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Sponsorship Items */}
      <section id="items" className="section-padding bg-white scroll-mt-24">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Individual Items</p>
            <h2 className="section-title">Sponsorship Items &amp; Rates</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Prefer to sponsor a single element of the conference? These opportunities can be taken on their own or
              added to a headline package.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-card border border-border overflow-hidden">
            <ul className="divide-y divide-border">
              {SPONSORSHIP_ITEMS.map((row) => (
                <li
                  key={row.item}
                  className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 hover:bg-muted/60 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-heading font-semibold text-primary text-sm sm:text-base">{row.item}</p>
                    {row.note && <p className="text-muted-foreground text-xs mt-0.5">{row.note}</p>}
                  </div>
                  <p className="font-heading font-black text-secondary text-base sm:text-lg whitespace-nowrap">
                    {row.price}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-center text-muted-foreground text-xs mt-4">
            All amounts in USD. Items marked &ldquo;At cost&rdquo; are quoted on confirmation of supplier pricing.
          </p>
        </div>
      </section>

      {/* What each sponsorship includes */}
      <section id="benefits" className="section-padding bg-muted scroll-mt-24">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">In Detail</p>
            <h2 className="section-title">What Each Sponsorship Includes</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Select a sponsorship below to see the full list of branding and visibility benefits attached to it.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {PACKAGE_DETAILS.map((pkg) => (
              <details key={pkg.title} className="bg-white rounded-xl shadow-card border border-border overflow-hidden group">
                <summary className="flex items-center justify-between gap-4 px-5 sm:px-7 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-muted/60 transition-colors">
                  <span className="font-heading font-bold text-primary text-base sm:text-lg">{pkg.title}</span>
                  <span className="flex items-center gap-4 flex-shrink-0">
                    <span className="font-heading font-black text-secondary text-base sm:text-lg">{pkg.price}</span>
                    <span
                      aria-hidden="true"
                      className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-primary text-lg leading-none transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <div className="px-5 sm:px-7 pb-6 pt-1 border-t border-border">
                  <ul className="space-y-2.5 mt-4">
                    {pkg.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80 text-sm leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?subject=Sponsorship+Enquiry+-+${encodeURIComponent(pkg.title)}`}
                    className="btn-primary inline-block mt-6 px-6 py-2.5 text-sm"
                  >
                    Enquire About This Package
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Sponsor / Contacts */}
      <section id="become-a-sponsor" className="section-padding bg-white scroll-mt-24">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Get Involved</p>
            <h2 className="section-title">Become a Sponsor</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Stakeholders interested in partnering with the 24th AIRDC Conference are invited to contact any of the
              following members of the organising committee.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {SPONSORSHIP_CONTACTS.map((contact) => (
              <div key={contact.email} className="card-premium p-7 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-4">
                  <Mail size={22} className="text-primary" />
                </div>
                <p className="font-heading font-bold text-primary text-lg mb-1">{contact.name}</p>
                <p className="text-muted-foreground text-xs leading-snug mb-4">{contact.role}</p>
                <a
                  href={`mailto:${contact.email}?subject=AIRDC%202026%20Sponsorship%20Enquiry`}
                  className="text-accent font-medium text-sm break-all hover:underline"
                >
                  {contact.email}
                </a>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-card p-8 sm:p-10 text-center border-2 border-secondary/30">
            <h3 className="font-heading font-bold text-primary text-2xl mb-3">Ready to confirm your sponsorship?</h3>
            <p className="text-muted-foreground text-base leading-relaxed mb-7">
              Download the official International Sponsorship Form for the full package breakdown and payment
              instructions, or send us your details and the secretariat will be in touch.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="/AIRDC-2026-Sponsorship-Form.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-7 py-3"
              >
                <Download size={18} />
                Download Sponsorship Form
              </a>
              <Link
                href="/contact?subject=Sponsorship+Enquiry"
                className="btn-secondary inline-flex items-center gap-2 px-7 py-3"
              >
                Express Interest
              </Link>
            </div>
            <p className="text-muted-foreground text-sm mt-6">
              Or email the secretariat at{" "}
              <a href="mailto:info@airdczim.co.zw" className="text-primary font-medium hover:underline">
                info@airdczim.co.zw
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
