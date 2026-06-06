import type { Metadata } from "next";
import { Download, Printer, Clock, MapPin, Users, Mic, Coffee } from "lucide-react";

export const metadata: Metadata = {
  title: "Programme",
  description: "Full 3-day conference programme for the 23rd AIRDC Conference 2026.",
};

const programme = [
  {
    day: 1, label: "Day 1", date: "Tuesday, September 2026", theme: "Opening & Foundations of Resilience",
    sessions: [
      { time: "07:30–08:30", title: "Registration & Welcome Coffee", type: "break", venue: "Main Foyer", speakers: [] },
      { time: "09:00–09:30", title: "Official Opening Ceremony", type: "opening", venue: "Main Plenary Hall", speakers: ["His Excellency, Minister of Finance, Zimbabwe", "Mr. Januario Aliwalas, Secretary General AIRDC"] },
      { time: "09:30–10:30", title: "Keynote: Insurance in a Fractured World — Navigating Geopolitical Risk", type: "plenary", venue: "Main Plenary Hall", speakers: ["Mr. Roberto Silva, Latin America Reinsurers Association"] },
      { time: "10:30–11:00", title: "Networking Coffee Break", type: "break", venue: "Exhibition Hall", speakers: [] },
      { time: "11:00–12:30", title: "Panel: Geopolitical Disruption — Implications for Developing Market Insurers", type: "panel", venue: "Main Plenary Hall", speakers: ["Dr. Amara Diallo", "Ms. Priya Naidoo", "Mr. Chen Wei"] },
      { time: "12:30–14:00", title: "Networking Lunch", type: "break", venue: "Grand Dining Room", speakers: [] },
      { time: "14:00–15:30", title: "Workshop A: InsurTech & Digital Transformation in Developing Markets", type: "workshop", venue: "Conference Room A", speakers: ["Mr. Raj Patel, Munich Re Digital Partners"] },
      { time: "14:00–15:30", title: "Workshop B: Microinsurance Design for Low-Income Markets", type: "workshop", venue: "Conference Room B", speakers: ["Dr. Fatima Al-Hassan, IAIS"] },
      { time: "15:30–16:00", title: "Networking Break & Exhibition", type: "break", venue: "Exhibition Hall", speakers: [] },
      { time: "16:00–17:30", title: "Plenary: Zimbabwe Insurance Market — Showcase of Resilience", type: "plenary", venue: "Main Plenary Hall", speakers: ["Ms. Thandiwe Moyo, Insurance Council of Zimbabwe"] },
      { time: "19:00–22:00", title: "Welcome Reception & Cultural Evening", type: "networking", venue: "Hotel Gardens", speakers: [] },
    ],
  },
  {
    day: 2, label: "Day 2", date: "Wednesday, September 2026", theme: "Innovation & Climate Resilience",
    sessions: [
      { time: "09:00–10:00", title: "Keynote: Climate Risk & Parametric Insurance — Solutions for Developing Nations", type: "plenary", venue: "Main Plenary Hall", speakers: ["Prof. Akinwande Osei, African Development Bank"] },
      { time: "10:00–10:30", title: "Networking Coffee Break", type: "break", venue: "Exhibition Hall", speakers: [] },
      { time: "10:30–12:00", title: "Panel: Regulatory Sandboxes — Creating Space for Insurance Innovation", type: "panel", venue: "Main Plenary Hall", speakers: ["Dr. Amara Diallo", "Mr. Chen Wei", "Ms. Priya Naidoo", "Mr. Raj Patel"] },
      { time: "12:00–13:30", title: "Networking Lunch", type: "break", venue: "Grand Dining Room", speakers: [] },
      { time: "13:30–15:00", title: "Workshop C: AI & Machine Learning in Underwriting — Practical Applications", type: "workshop", venue: "Conference Room A", speakers: ["Mr. Raj Patel"] },
      { time: "13:30–15:00", title: "Workshop D: Parametric Insurance Product Design", type: "workshop", venue: "Conference Room B", speakers: ["Prof. Akinwande Osei"] },
      { time: "15:00–15:30", title: "Networking Break & Exhibition", type: "break", venue: "Exhibition Hall", speakers: [] },
      { time: "15:30–17:00", title: "Panel: Reinsurance Capacity for Developing Markets — Current State & Future Outlook", type: "panel", venue: "Main Plenary Hall", speakers: ["Ms. Priya Naidoo", "Mr. Roberto Silva"] },
      { time: "17:00–17:30", title: "AIRDC Excellence Awards — Nominations Showcase", type: "plenary", venue: "Main Plenary Hall", speakers: [] },
      { time: "19:30–23:00", title: "Gala Dinner & AIRDC Awards Ceremony", type: "networking", venue: "Grand Ballroom", speakers: [] },
    ],
  },
  {
    day: 3, label: "Day 3", date: "Thursday, September 2026", theme: "Action, Policy & Partnerships",
    sessions: [
      { time: "09:00–10:30", title: "Country Roundtables — Regional Resilience Strategies", type: "panel", venue: "Multiple Rooms", speakers: ["Regional Representatives"] },
      { time: "10:30–11:00", title: "Networking Coffee Break", type: "break", venue: "Exhibition Hall", speakers: [] },
      { time: "11:00–12:30", title: "Workshop E: Building Resilience Frameworks — A Practical Guide for Regulators", type: "workshop", venue: "Conference Room A", speakers: ["Dr. Amara Diallo", "Dr. Fatima Al-Hassan"] },
      { time: "11:00–12:30", title: "Workshop F: Digital Distribution Channels for Insurance", type: "workshop", venue: "Conference Room B", speakers: ["Mr. Chen Wei"] },
      { time: "12:30–14:00", title: "Networking Lunch & Exhibition Close", type: "break", venue: "Grand Dining Room", speakers: [] },
      { time: "14:00–16:00", title: "AIRDC AGM & Members Forum — Annual General Meeting", type: "plenary", venue: "Main Plenary Hall", speakers: ["Mr. Januario Aliwalas"] },
      { time: "16:00–16:30", title: "Closing Keynote & Conference Resolutions", type: "closing", venue: "Main Plenary Hall", speakers: ["All Keynote Speakers"] },
      { time: "16:30–17:00", title: "Official Conference Close", type: "closing", venue: "Main Plenary Hall", speakers: ["Mr. Januario Aliwalas"] },
      { time: "17:00+", title: "Delegate Networking & Departure", type: "break", venue: "Hotel Lobby", speakers: [] },
    ],
  },
];

const typeStyles: Record<string, { bg: string; border: string; dot: string; label: string }> = {
  plenary: { bg: "bg-primary/5", border: "border-primary/20", dot: "bg-primary", label: "Plenary" },
  panel: { bg: "bg-accent/5", border: "border-accent/20", dot: "bg-accent", label: "Panel" },
  workshop: { bg: "bg-secondary/5", border: "border-secondary/20", dot: "bg-secondary", label: "Workshop" },
  break: { bg: "bg-gray-50", border: "border-gray-100", dot: "bg-gray-300", label: "Break" },
  networking: { bg: "bg-purple-50", border: "border-purple-100", dot: "bg-purple-400", label: "Networking" },
  opening: { bg: "bg-primary/10", border: "border-primary/30", dot: "bg-primary", label: "Opening" },
  closing: { bg: "bg-primary/10", border: "border-primary/30", dot: "bg-primary", label: "Closing" },
};

export default function ProgrammePage() {
  return (
    <div className="pt-20">
      <div className="bg-primary py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">Programme</p>
              <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-2">Conference Programme</h1>
              <p className="text-white/70">3-day programme · September 2026 · Harare, Zimbabwe</p>
            </div>
            <div className="flex gap-3">
              <a href="/programme.pdf" download
                className="flex items-center gap-2 bg-secondary text-primary-dark font-semibold px-5 py-3 rounded-lg hover:bg-secondary-light transition-all text-sm">
                <Download size={16} /> Download PDF
              </a>
              <a
  href="#"
  className="flex items-center gap-2 bg-white/10 text-white font-semibold px-5 py-3 rounded-lg hover:bg-white/20 transition-all text-sm border border-white/20"
>
  <Printer size={16} /> Print
</a>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white border-b border-border py-3">
        <div className="container flex flex-wrap gap-4 text-xs">
          {Object.entries(typeStyles).filter(([k]) => k !== "opening" && k !== "closing").map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${val.dot}`} />
              <span className="text-muted-foreground font-medium">{val.label}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="section-padding bg-muted">
        <div className="container space-y-12">
          {programme.map((day) => (
            <div key={day.day} className="card-premium overflow-hidden">
              <div className="bg-primary px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                <div>
                  <span className="text-secondary font-bold text-sm uppercase tracking-widest">{day.label}</span>
                  <h2 className="text-white font-heading font-bold text-xl">{day.theme}</h2>
                </div>
                <p className="text-white/60 text-sm">{day.date}</p>
              </div>
              <div className="divide-y divide-border">
                {day.sessions.map((session, i) => {
                  const style = typeStyles[session.type] || typeStyles.break;
                  return (
                    <div key={i} className={`flex flex-col sm:flex-row gap-4 p-5 ${style.bg} border-l-4 ${style.border}`}>
                      <div className="flex items-center gap-2 sm:w-36 flex-shrink-0">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${style.dot}`} />
                        <span className="text-xs font-bold text-muted-foreground">{session.time}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-heading font-bold text-foreground leading-snug">{session.title}</p>
                        {session.speakers.length > 0 && (
                          <div className="flex items-center gap-1 mt-1 text-muted-foreground text-xs">
                            <Users size={12} />
                            <span>{session.speakers.join(" · ")}</span>
                          </div>
                        )}
                        {session.venue && (
                          <div className="flex items-center gap-1 mt-1 text-muted-foreground text-xs">
                            <MapPin size={12} />
                            <span>{session.venue}</span>
                          </div>
                        )}
                      </div>
                      <span className={`self-start text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${style.bg} ${style.border} flex-shrink-0`}>
                        {style.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
