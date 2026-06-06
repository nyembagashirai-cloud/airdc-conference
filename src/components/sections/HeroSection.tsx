"use client";
import Link from "next/link";
import { Calendar, MapPin, Download, ArrowRight, ChevronDown, Globe } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Deep green gradient background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #0a1f10 0%, #0F3018 40%, #1A4A2A 70%, #2D6A40 100%)" }} />

      {/* Subtle geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0L80 12v2L54 40h-2zm4 0L80 16v2L58 40h-2zm4 0L80 20v2L62 40h-2zm4 0L80 24v2L66 40h-2zm4 0L80 28v2L70 40h-2zm4 0L80 32v2L74 40h-2zm4 0L80 36v2L78 40h-2zm4 0L80 40v0h-2l2-2v2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Gold top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #C8941C 0%, #E8B832 50%, #C8941C 100%)" }} />

      {/* Decorative glow blobs */}
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #C8941C 0%, transparent 70%)" }} />
      <div className="absolute top-20 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, #C41230 0%, transparent 70%)" }} />

      <div className="container relative z-10 pt-28 pb-32">
        <div className="max-w-4xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#C8941C" }} />
            <span className="text-white/90 text-sm font-medium tracking-wide">23rd Annual Conference • Harare, Zimbabwe</span>
          </div>

          {/* Main title */}
          <h1 className="font-heading font-black text-white leading-[1.05] mb-6">
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">AIRDC</span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl" style={{ color: "#C8941C" }}>2026</span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl text-white/80 font-semibold mt-2 tracking-wide">
              Zimbabwe Conference
            </span>
          </h1>

          {/* Theme box */}
          <div className="mb-10 max-w-3xl border-l-4 pl-6 py-3 rounded-r-lg" style={{ borderColor: "#C8941C", background: "rgba(255,255,255,0.07)" }}>
            <p className="text-white/50 text-xs uppercase tracking-[0.15em] mb-1.5 font-semibold">Conference Theme</p>
            <p className="text-white font-medium text-lg sm:text-xl leading-snug">
              "Insurance Resilience in the Face of Geopolitical and Technological Disruption for Developing Markets"
            </p>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-6 mb-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,175,55,0.2)" }}>
                <Calendar size={17} style={{ color: "#C8941C" }} />
              </div>
              <div>
                <p className="text-white/50 text-xs">Conference Dates</p>
                <p className="text-white font-semibold">26–30 September 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,175,55,0.2)" }}>
                <MapPin size={17} style={{ color: "#C8941C" }} />
              </div>
              <div>
                <p className="text-white/50 text-xs">Venue</p>
                <p className="text-white font-semibold">Rainbow Towers Hotel, Harare</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,175,55,0.2)" }}>
                <Globe size={17} style={{ color: "#C8941C" }} />
              </div>
              <div>
                <p className="text-white/50 text-xs">Website</p>
                <p className="text-white font-semibold">www.airdczim.co.zw</p>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #C8941C, #E8B832)", color: "#0F3018", boxShadow: "0 4px 20px rgba(212,175,55,0.4)" }}
            >
              Register Now <ArrowRight size={18} />
            </Link>
            <a
              href="/brochure.pdf"
              download
              className="inline-flex items-center justify-center gap-2 font-semibold text-base px-8 py-4 rounded-xl border-2 border-white/30 text-white transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5"
            >
              <Download size={18} />
              Download Brochure
            </a>
          </div>
        </div>
      </div>

      {/* Stats strip pinned to hero bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10" style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(12px)" }}>
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { num: "500+", label: "Delegates" },
              { num: "40+", label: "Countries" },
              { num: "30+", label: "Sessions" },
              { num: "5", label: "Conference Days" },
            ].map((s) => (
              <div key={s.label} className="text-center py-5 px-4">
                <p className="font-heading font-black text-2xl" style={{ color: "#C8941C" }}>{s.num}</p>
                <p className="text-white/60 text-xs uppercase tracking-wide mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
