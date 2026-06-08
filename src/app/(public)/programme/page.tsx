import type { Metadata } from "next";
import { Download, Clock, MapPin, Users, CalendarClock } from "lucide-react";

export const metadata: Metadata = {
  title: "Programme",
  description: "Full conference programme for the 23rd AIRDC Conference 2026.",
};

const typeStyles: Record<string, { bg: string; border: string; dot: string; label: string }> = {
  PLENARY:    { bg: "bg-blue-50",   border: "border-blue-400",  dot: "bg-blue-500",   label: "Plenary" },
  KEYNOTE:    { bg: "bg-purple-50", border: "border-purple-400",dot: "bg-purple-500", label: "Keynote" },
  PANEL:      { bg: "bg-indigo-50", border: "border-indigo-400",dot: "bg-indigo-500", label: "Panel" },
  WORKSHOP:   { bg: "bg-green-50",  border: "border-green-400", dot: "bg-green-500",  label: "Workshop" },
  BREAK:      { bg: "bg-gray-50",   border: "border-gray-300",  dot: "bg-gray-400",   label: "Break" },
  SOCIAL:     { bg: "bg-yellow-50", border: "border-yellow-400",dot: "bg-yellow-500", label: "Social" },
  MEETING:    { bg: "bg-orange-50", border: "border-orange-400",dot: "bg-orange-500", label: "Meeting" },
  NETWORKING: { bg: "bg-teal-50",   border: "border-teal-400",  dot: "bg-teal-500",   label: "Networking" },
};

const DAY_DATES: Record<string, string> = {
  "Day 1": "Sunday, 27 September 2026",
  "Day 2": "Monday, 28 September 2026",
  "Day 3": "Tuesday, 29 September 2026",
  "Day 4": "Wednesday, 30 September 2026",
};

async function getSessions() {
  if (!process.env.DATABASE_URL) return [];
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.programmeSession.findMany({ orderBy: [{ day: "asc" }, { startTime: "asc" }] });
  } catch { return []; }
}

export default async function ProgrammePage() {
  const sessions = await getSessions();

  // Group sessions by day
  const days = Array.from(new Set(sessions.map(s => s.day))).sort();
  const grouped = days.map(day => ({
    day,
    label: day,
    dateLabel: DAY_DATES[day] || day,
    sessions: sessions.filter(s => s.day === day),
  }));

  return (
    <div className="pt-20">
      <div className="bg-primary py-16">
        <div className="container">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">Programme</p>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-2">Conference Programme</h1>
          <p className="text-white/70 text-lg">27–30 September 2026 · Rainbow Towers Hotel, Harare</p>
          <div className="flex gap-4 mt-6">
            <a href="/brochure.pdf" target="_blank"
              className="flex items-center gap-2 bg-secondary hover:bg-secondary-light text-primary-dark font-bold px-5 py-2.5 rounded-lg text-sm transition-colors">
              <Download size={16} /> Download Programme
            </a>
          </div>
        </div>
      </div>

      {/* Coming soon notice */}
      <div className="bg-secondary/10 border-b border-secondary/20 py-4">
        <div className="container flex items-center gap-3">
          <CalendarClock size={18} className="text-secondary flex-shrink-0" />
          <p className="text-sm font-medium text-foreground">
            <span className="font-bold text-secondary">Programme in progress —</span>{" "}
            The full conference programme will be announced soon. Check back for session times, speakers and workshops.
          </p>
        </div>
      </div>

      <section className="section-padding bg-muted">
        <div className="container space-y-12">
          {grouped.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-border shadow-card">
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <CalendarClock size={36} className="text-secondary" />
              </div>
              <h2 className="font-heading font-bold text-primary text-2xl mb-3">Final Programme to Be Announced Soon</h2>
              <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Our team is finalising an exceptional programme of keynote addresses, panel discussions, workshops, and networking sessions.
                The full schedule will be published here ahead of the conference.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mt-6">
                <a href="/brochure.pdf" className="btn-primary inline-flex items-center gap-2">
                  <Download size={16} /> Download Brochure
                </a>
                <a href="/register" className="btn-secondary inline-flex items-center gap-2">
                  Register Now
                </a>
              </div>
            </div>
          ) : (
            grouped.map((day) => (
              <div key={day.day} className="card-premium overflow-hidden">
                <div className="bg-primary px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                  <div>
                    <span className="text-secondary font-bold text-sm uppercase tracking-widest">{day.label}</span>
                    <h2 className="text-white font-heading font-bold text-xl">{day.dateLabel}</h2>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {day.sessions.map((session) => {
                    const style = typeStyles[session.type] || typeStyles.BREAK;
                    return (
                      <div key={session.id} className={`flex flex-col sm:flex-row gap-4 p-5 ${style.bg} border-l-4 ${style.border}`}>
                        <div className="flex items-center gap-2 sm:w-36 flex-shrink-0">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${style.dot}`} />
                          <span className="text-xs font-bold text-muted-foreground">
                            {session.startTime}{session.endTime ? `–${session.endTime}` : ""}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-heading font-bold text-foreground leading-snug">{session.title}</p>
                          {session.subtitle && (
                            <div className="flex items-center gap-1 mt-1 text-muted-foreground text-xs">
                              <Users size={12} />
                              <span>{session.subtitle}</span>
                            </div>
                          )}
                          {session.venue && (
                            <div className="flex items-center gap-1 mt-1 text-muted-foreground text-xs">
                              <MapPin size={12} />
                              <span>{session.venue}</span>
                            </div>
                          )}
                          {session.description && (
                            <p className="text-muted-foreground text-xs mt-2 leading-relaxed">{session.description}</p>
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
            ))
          )}
        </div>
      </section>
    </div>
  );
}
