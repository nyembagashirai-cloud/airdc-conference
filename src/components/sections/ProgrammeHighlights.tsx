import Link from "next/link";
import { ArrowRight, Clock, Users, Mic, Coffee } from "lucide-react";

const days = [
  {
    day: "Day 1",
    date: "27–30 September 2026",
    theme: "Opening & Foundations",
    sessions: [
      { time: "08:00", title: "Registration & Welcome Coffee", type: "break" },
      { time: "09:00", title: "Opening Ceremony & Keynote Address", type: "plenary" },
      { time: "10:30", title: "Geopolitical Risk: Navigating Global Uncertainty", type: "panel" },
      { time: "12:00", title: "Networking Lunch", type: "break" },
      { time: "14:00", title: "InsurTech & Digital Transformation in Developing Markets", type: "workshop" },
      { time: "16:30", title: "Welcome Reception & Cultural Evening", type: "networking" },
    ],
  },
  {
    day: "Day 2",
    date: "27–30 September 2026",
    theme: "Innovation & Resilience",
    sessions: [
      { time: "09:00", title: "Keynote: Climate Risk & Parametric Insurance", type: "plenary" },
      { time: "10:30", title: "Regulatory Sandbox: Global Perspectives", type: "panel" },
      { time: "12:00", title: "Networking Lunch", type: "break" },
      { time: "14:00", title: "Microinsurance & Financial Inclusion Workshop", type: "workshop" },
      { time: "16:00", title: "Reinsurance Capacity for Developing Markets", type: "panel" },
      { time: "19:30", title: "Gala Dinner & AIRDC Awards Ceremony", type: "networking" },
    ],
  },
  {
    day: "Day 3",
    date: "27–30 September 2026",
    theme: "Action & Partnerships",
    sessions: [
      { time: "09:00", title: "AI & Machine Learning in Underwriting", type: "workshop" },
      { time: "10:30", title: "Building Resilience: Country Roundtables", type: "panel" },
      { time: "12:00", title: "Networking Lunch", type: "break" },
      { time: "14:00", title: "AIRDC AGM & Members Forum", type: "plenary" },
      { time: "15:30", title: "Closing Keynote & Resolutions", type: "plenary" },
      { time: "17:00", title: "Conference Close & Departure", type: "break" },
    ],
  },
];

const typeConfig: Record<string, { color: string; icon: typeof Mic }> = {
  plenary: { color: "bg-primary/10 text-primary border-primary/20", icon: Mic },
  panel: { color: "bg-accent/10 text-accent border-accent/20", icon: Users },
  workshop: { color: "bg-secondary/10 text-secondary border-secondary/20", icon: Users },
  break: { color: "bg-gray-100 text-gray-500 border-gray-200", icon: Coffee },
  networking: { color: "bg-purple-50 text-purple-700 border-purple-200", icon: Users },
};

export function ProgrammeHighlights() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Programme</p>
            <h2 className="section-title">3-Day Conference Programme</h2>
          </div>
          <div className="flex gap-3">
            <a href="/programme.pdf" download className="btn-outline border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 text-sm">
              Download PDF
            </a>
            <Link href="/programme" className="btn-primary group text-sm px-4 py-2">
              Full Programme <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {days.map((day) => (
            <div key={day.day} className="card-premium overflow-hidden">
              <div className="bg-primary px-6 py-4">
                <span className="text-secondary font-bold text-sm">{day.day}</span>
                <h3 className="text-white font-heading font-bold text-lg">{day.theme}</h3>
                <p className="text-white/60 text-xs mt-1">{day.date}</p>
              </div>
              <div className="p-4 space-y-2">
                {day.sessions.map((session, i) => {
                  const config = typeConfig[session.type] || typeConfig.break;
                  const Icon = config.icon;
                  return (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${config.color}`}>
                      <span className="text-xs font-bold w-10 flex-shrink-0 mt-0.5">{session.time}</span>
                      <p className="text-sm font-medium leading-snug flex-1">{session.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
