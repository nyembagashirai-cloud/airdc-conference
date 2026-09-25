import type { Metadata } from "next";
import { CalendarClock } from "lucide-react";
import {
  PROGRAMME,
  PROGRAMME_HEADER,
  type ProgrammeDay,
  type ProgrammeRow,
} from "@/data/programme";

export const metadata: Metadata = {
  title: "Programme",
  description:
    "Full conference programme for the 24th AIRDC Conference, 27 to 30 September 2026, Rainbow Towers Hotel, Harare, Zimbabwe.",
};

const toneStyles: Record<string, string> = {
  default: "bg-white border-blue-400",
  break: "bg-gray-50 border-gray-300",
  social: "bg-yellow-50 border-yellow-400",
  meeting: "bg-orange-50 border-orange-400",
  registration: "bg-sky-50 border-sky-400",
};

const DAY_HEADINGS: Record<string, string> = {
  "Day 1": "DAY 1: Sunday 27 September 2026",
  "Day 2": "DAY 2: Monday 28 September 2026",
  "Day 3": "DAY 3: Tuesday 29 September 2026",
  "Day 4": "DAY 4: Wednesday 30 September 2026",
};

// Renders text exactly as written, with **double asterisks** shown in bold.
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

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
  // When none exist, the approved programme document is shown exactly as written.
  let days: ProgrammeDay[];

  if (dbSessions.length > 0) {
    const uniqueDays = Array.from(new Set(dbSessions.map((s) => s.day))).sort();
    days = uniqueDays.map((day) => ({
      heading: DAY_HEADINGS[day] || day,
      rows: dbSessions
        .filter((s) => s.day === day)
        .map(
          (s): ProgrammeRow => ({
            time: [s.endTime ? `${s.startTime} – ${s.endTime}` : s.startTime],
            blocks: [
              [
                { text: `**${s.title}**` },
                ...(s.subtitle ? [{ text: s.subtitle }] : []),
                ...(s.description ? [{ text: s.description }] : []),
                ...(s.venue ? [{ text: s.venue }] : []),
              ],
            ],
          }),
        ),
    }));
  } else {
    days = PROGRAMME;
  }

  return (
    <div className="pt-20">
      <div className="bg-primary py-16">
        <div className="container">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">
            {PROGRAMME_HEADER.organisation}
          </p>
          <h1 className="font-heading font-black text-white text-3xl md:text-5xl mb-3">
            {PROGRAMME_HEADER.title}
          </h1>
          <p className="text-white/80 text-lg">{PROGRAMME_HEADER.dates}</p>
          <p className="text-white/70 text-sm mt-1">{PROGRAMME_HEADER.venue}</p>
          <p className="text-white/60 text-sm mt-3 max-w-2xl italic">{PROGRAMME_HEADER.theme}</p>
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
              <div key={day.heading} className="card-premium overflow-hidden break-inside-avoid">
                <div className="bg-primary px-6 sm:px-8 py-5">
                  <h2 className="text-white font-heading font-bold text-lg sm:text-xl">{day.heading}</h2>
                </div>
                <div className="divide-y divide-border">
                  {day.rows.map((row, i) => (
                    <div
                      key={`${day.heading}-${i}`}
                      className={`flex flex-col sm:flex-row gap-3 sm:gap-6 p-5 border-l-4 ${toneStyles[row.tone || "default"]}`}
                    >
                      <div className="sm:w-36 flex-shrink-0 space-y-1">
                        {row.time.map((t, ti) => (
                          <p key={ti} className="text-sm font-bold text-primary">
                            {t}
                          </p>
                        ))}
                      </div>

                      <div className="flex-1 min-w-0 divide-y divide-border/70">
                        {row.blocks.map((block, bi) => (
                          <div key={bi} className={bi === 0 ? "pb-3 last:pb-0" : "py-3 last:pb-0"}>
                            {block.map((line, li) =>
                              line.text === "" ? (
                                <div key={li} className="h-3" />
                              ) : (
                                <p
                                  key={li}
                                  className={`text-sm text-muted-foreground leading-relaxed ${line.indent ? "pl-[4.75rem]" : ""}`}
                                >
                                  <RichText text={line.text} />
                                </p>
                              ),
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
