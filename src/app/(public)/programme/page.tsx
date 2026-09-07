import type { Metadata } from "next";
import { Users, MapPin, CalendarClock } from "lucide-react";
import { PROGRAMME, type ProgrammeDay, type ProgrammeItem } from "@/data/programme";

export const metadata: Metadata = {
  title: "Programme",
  description:
    "Full conference programme for the 24th AIRDC Conference, 27 to 30 September 2026, Rainbow Towers Hotel, Harare, Zimbabwe.",
};

const typeStyles: Record<string, { bg: string; border: string; dot: string; label: string }> = {
  PLENARY:      { bg: "bg-blue-50",   border: "border-blue-400",   dot: "bg-blue-500",   label: "Plenary" },
  KEYNOTE:      { bg: "bg-purple-50", border: "border-purple-400", dot: "bg-purple-500", label: "Keynote" },
  PANEL:        { bg: "bg-indigo-50", border: "border-indigo-400", dot: "bg-indigo-500", label: "Panel" },
  WORKSHOP:     { bg: "bg-green-50",  border: "border-green-400",  dot: "bg-green-500",  label: "Workshop" },
  BREAK:        { bg: "bg-gray-50",   border: "border-gray-300",   dot: "bg-gray-400",   label: "Break" },
  SOCIAL:       { bg: "bg-yellow-50", border: "border-yellow-400", dot: "bg-yellow-500", label: "Social" },
  MEETING:      { bg: "bg-orange-50", border: "border-orange-400", dot: "bg-orange-500", label: "Meeting" },
  NETWORKING:   { bg: "bg-teal-50",   border: "border-teal-400",   dot: "bg-teal-500",   label: "Networking" },
  REGISTRATION: { bg: "bg-sky-50",    border: "border-sky-400",    dot: "bg-sky-500",    label: "Registration" },
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
    return await prisma.programmeSession.findMany({
      orderBy: [{ day: "asc" }, { startTime: "asc" }],
    });
  } catch {
    return [];
  }
}

export default async function ProgrammePage() {
  const dbSessions = await getSessions();

  // Sessions entered through the admin dashboard take precedence.
  // When none exist, the published programme document is shown.
  let days: ProgrammeDay[];

  if (dbSessions.length > 0) {
    const uniqueDays = Array.from(new Set(dbSessions.map((s) => s.day))).sort();
    days = uniqueDays.map((day) => ({
      day,
      dateLabel: DAY_DATES[day] || day,
      items: dbSessions
        .filter((s) => s.day === day)
        .map((s) => ({
          startTime: s.startTime,
          endTime: s.endTime || undefined,
          title: s.title,
          subtitle: s.subtitle || undefined,
          description: s.description || undefined,
          type: s.type,
          venue: s.venue || undefined,
        })) as ProgrammeItem[],
    }));
  } else {
    days = PROGRAMME;
  }

  return (
    <div className="pt-20">
      <div className="bg-primary py-16">
        <div className="container">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">Programme</p>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-2">Conference Programme</h1>
          <p className="text-white/70 text-lg">
            27 to 30 September 2026 · Rainbow Towers Hotel, Harare
          </p>
          <p className="text-white/60 text-sm mt-3 max-w-2xl italic">
            Theme: Insurance resilience in the face of geopolitical and technological disruption for developing markets
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="/register"
              className="flex items-center gap-2 bg-secondary hover:bg-secondary-light text-primary-dark font-bold px-5 py-2.5 rounded-lg text-sm transition-colors"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>

      {/* Provisional programme notice */}
      <div className="bg-secondary/10 border-b border-secondary/20 py-4 print:hidden">
        <div className="container flex items-start gap-3">
          <CalendarClock size={18} className="text-secondary flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-foreground">
            <span className="font-bold text-secondary">Provisional programme.</span>{" "}
            Sessions, speakers and timings are subject to change. Remaining sessions will be published as they are
            confirmed.
          </p>
        </div>
      </div>

      <section className="section-padding bg-muted print:bg-white print:py-0">
        <div className="container space-y-12">
          {days.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-border shadow-card">
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <CalendarClock size={36} className="text-secondary" />
              </div>
              <h2 className="font-heading font-bold text-primary text-2xl mb-3">Programme to Be Announced</h2>
              <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
                The full schedule will be published here ahead of the conference.
              </p>
            </div>
          ) : (
            days.map((day) => (
              <div key={day.day} className="card-premium overflow-hidden break-inside-avoid">
                <div className="bg-primary px-8 py-5">
                  <span className="text-secondary font-bold text-sm uppercase tracking-widest">{day.day}</span>
                  <h2 className="text-white font-heading font-bold text-xl">{day.dateLabel}</h2>
                </div>
                <div className="divide-y divide-border">
                  {day.items.map((item, i) => {
                    const style = typeStyles[item.type] || typeStyles.PLENARY;
                    return (
                      <div
                        key={`${day.day}-${i}`}
                        className={`flex flex-col sm:flex-row gap-4 p-5 ${style.bg} border-l-4 ${style.border}`}
                      >
                        <div className="flex items-center gap-2 sm:w-36 flex-shrink-0">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${style.dot}`} />
                          <span className="text-xs font-bold text-muted-foreground">
                            {item.startTime}
                            {item.endTime ? ` – ${item.endTime}` : ""}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-heading font-bold text-foreground leading-snug">{item.title}</p>

                          {item.subtitle && (
                            <div className="flex items-center gap-1.5 mt-1.5 text-muted-foreground text-xs">
                              <Users size={12} className="flex-shrink-0" />
                              <span>{item.subtitle}</span>
                            </div>
                          )}

                          {item.venue && (
                            <div className="flex items-center gap-1.5 mt-1.5 text-muted-foreground text-xs">
                              <MapPin size={12} className="flex-shrink-0" />
                              <span>{item.venue}</span>
                            </div>
                          )}

                          {item.description && (
                            <p className="text-muted-foreground text-xs mt-2 leading-relaxed">{item.description}</p>
                          )}

                          {item.topics && item.topics.length > 0 && (
                            <div className="mt-4 space-y-3">
                              {item.topics.map((topic, ti) => (
                                <div
                                  key={ti}
                                  className="bg-white/80 border border-border rounded-lg px-4 py-3"
                                >
                                  {topic.label && (
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-secondary">
                                      {topic.label}
                                    </span>
                                  )}
                                  <p className="font-semibold text-sm text-foreground leading-snug mt-0.5">
                                    {topic.title}
                                  </p>
                                  {topic.moderator && (
                                    <p className="mt-2 text-xs text-muted-foreground">
                                      <span className="font-semibold">Moderator:</span>{" "}
                                      {topic.moderator}
                                    </p>
                                  )}
                                  {topic.speakers && topic.speakers.length > 0 && (
                                    <div className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                                      <Users size={12} className="flex-shrink-0 mt-0.5" />
                                      <span>
                                        <span className="font-semibold">
                                          {topic.speakerLabel || "Speaker"}:
                                        </span>{" "}
                                        {topic.speakers.join(" · ")}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <span
                          className={`self-start text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${style.bg} ${style.border} flex-shrink-0`}
                        >
                          {style.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}

          <p className="text-center text-xs text-muted-foreground print:hidden">
            Programme correct at time of publication. Please check this page for updates.
          </p>
        </div>
      </section>
    </div>
  );
}
