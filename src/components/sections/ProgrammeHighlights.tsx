import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

const DAYS = [
  {
    day: "Day 1",
    date: "Sunday, 27 September",
    highlights: ["AIRDC Committee Meeting", "Arrival and Registration", "Welcome Cocktail"],
  },
  {
    day: "Day 2",
    date: "Monday, 28 September",
    highlights: [
      "Official Opening and Guest of Honour",
      "Session 1: Geo Politics and Impact of Insurance",
      "Session 2: Impact of AI and Technology on Insurance",
    ],
  },
  {
    day: "Day 3",
    date: "Tuesday, 29 September",
    highlights: ["ESG and Sustainable Insurance", "Session 3: Regulators Session"],
  },
  {
    day: "Day 4",
    date: "Wednesday, 30 September",
    highlights: ["Programme to be confirmed"],
  },
];

export function ProgrammeHighlights() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Programme</p>
          <h2 className="section-title">Conference Programme</h2>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Four days of keynotes, expert panels and networking at the Rainbow Towers Hotel, Harare.
            Sessions and timings are provisional and subject to change.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {DAYS.map((d) => (
            <div
              key={d.day}
              className="bg-muted border border-border rounded-2xl p-6 shadow-card flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays size={16} className="text-secondary flex-shrink-0" />
                <span className="text-secondary font-bold text-xs uppercase tracking-widest">{d.day}</span>
              </div>
              <h3 className="font-heading font-bold text-primary text-base mb-4">{d.date}</h3>
              <ul className="space-y-2.5">
                {d.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-muted-foreground leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-1.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/programme" className="btn-primary inline-flex items-center gap-2">
            View Full Programme <ArrowRight size={16} />
          </Link>
          <Link
            href="/register"
            className="btn-outline border-primary text-primary hover:bg-primary hover:text-white px-5 py-2.5 text-sm inline-flex items-center gap-2"
          >
            Register Now
          </Link>
        </div>
      </div>
    </section>
  );
}
