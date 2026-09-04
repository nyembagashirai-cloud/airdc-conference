"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

// Conference opens 27 September 2026, 16:00 Harare time (UTC+2).
const START = new Date("2026-09-27T16:00:00+02:00").getTime();
// Conference closes 30 September 2026, 18:00 Harare time.
const END = new Date("2026-09-30T18:00:00+02:00").getTime();

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  phase: "before" | "during" | "after";
};

function getRemaining(): Remaining {
  const now = Date.now();
  if (now >= END) return { days: 0, hours: 0, minutes: 0, seconds: 0, phase: "after" };
  if (now >= START) return { days: 0, hours: 0, minutes: 0, seconds: 0, phase: "during" };

  let diff = Math.floor((START - now) / 1000);
  const days = Math.floor(diff / 86400);
  diff -= days * 86400;
  const hours = Math.floor(diff / 3600);
  diff -= hours * 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = diff - minutes * 60;

  return { days, hours, minutes, seconds, phase: "before" };
}

function useCountdown() {
  // Null until mounted so the server and client render the same first frame.
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return remaining;
}

const UNITS = ["Days", "Hours", "Minutes", "Seconds"] as const;

function values(r: Remaining | null) {
  if (!r) return ["--", "--", "--", "--"];
  return [
    String(r.days),
    String(r.hours).padStart(2, "0"),
    String(r.minutes).padStart(2, "0"),
    String(r.seconds).padStart(2, "0"),
  ];
}

/* ── Compact variant, sits inside the hero on the dark background ── */
export function HeroCountdown() {
  const remaining = useCountdown();
  const vals = values(remaining);

  if (remaining?.phase === "during") {
    return (
      <div
        className="rounded-2xl px-6 py-5 backdrop-blur-sm border border-white/15 text-center"
        style={{ background: "rgba(255,255,255,0.09)" }}
      >
        <p className="text-white font-heading font-bold text-lg">The conference is under way</p>
        <p className="text-white/60 text-sm mt-1">Rainbow Towers Hotel, Harare</p>
      </div>
    );
  }

  if (remaining?.phase === "after") return null;

  return (
    <div
      className="rounded-2xl px-6 py-5 backdrop-blur-sm border border-white/15"
      style={{ background: "rgba(255,255,255,0.09)" }}
    >
      <p className="text-white/60 text-xs uppercase tracking-[0.15em] font-semibold mb-4 text-center">
        Conference Countdown
      </p>
      <div className="grid grid-cols-4 gap-2">
        {UNITS.map((unit, i) => (
          <div key={unit} className="text-center">
            <div
              className="rounded-xl py-3 tabular-nums font-heading font-black text-2xl sm:text-3xl"
              style={{ background: "rgba(212,175,55,0.18)", color: "#E8B832" }}
            >
              {vals[i]}
            </div>
            <p className="text-white/50 text-[10px] uppercase tracking-wider mt-2">{unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Full-width band for the home page ── */
export function CountdownBand() {
  const remaining = useCountdown();
  const vals = values(remaining);

  if (remaining?.phase === "after") {
    return (
      <section className="bg-primary py-12">
        <div className="container text-center">
          <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl">
            Thank you for joining us in Harare
          </h2>
          <p className="text-white/70 mt-2">
            The 24th AIRDC Conference has concluded. Highlights and photographs will be published shortly.
          </p>
        </div>
      </section>
    );
  }

  const isDuring = remaining?.phase === "during";

  return (
    <section className="bg-primary py-14 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, #C8941C 0%, #E8B832 50%, #C8941C 100%)" }}
      />
      <div className="container relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-secondary font-semibold text-sm uppercase tracking-widest">
            <CalendarDays size={16} />
            <span>{isDuring ? "Happening Now" : "Countdown to Harare"}</span>
          </div>
          <h2 className="font-heading font-black text-white text-2xl sm:text-3xl mt-3">
            {isDuring
              ? "The 24th AIRDC Conference is under way"
              : "24th AIRDC Conference · 27 to 30 September 2026"}
          </h2>
          <p className="text-white/60 text-sm mt-2">Rainbow Towers Hotel, Harare, Zimbabwe</p>
        </div>

        {!isDuring && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {UNITS.map((unit, i) => (
              <div
                key={unit}
                className="rounded-2xl border border-white/15 px-4 py-6 text-center"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <div
                  className="font-heading font-black text-4xl sm:text-5xl tabular-nums"
                  style={{ color: "#E8B832" }}
                >
                  {vals[i]}
                </div>
                <p className="text-white/50 text-xs uppercase tracking-widest mt-2">{unit}</p>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #C8941C, #E8B832)", color: "#0F3018" }}
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
}
