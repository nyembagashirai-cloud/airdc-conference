"use client";
import Link from "next/link";
import { Calendar, MapPin, Download, ArrowRight, ChevronDown, Globe } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Rainbow Towers background image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/rainbow-hotel.webp')" }} />
      {/* Green gradient overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(10,31,16,0.92) 0%, rgba(15,48,24,0.88) 40%, rgba(26,74,42,0.80) 70%, rgba(45,106,64,0.72) 100%)" }} />


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
            <span className="text-white/90 text-sm font-medium tracking-wide">24th Annual Conference • Harare, Zimbabwe</span>
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
                <p className="text-white font-semibold">27–30 September 2026</p>
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
                <p className="text-white/50 text-xs">Member Countries</p>
                <p className="text-white font-semibold">28 Countries</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #C8941C, #E8B832)", color: "#0F3018" }}
            >
              Register Now <ArrowRight size={18} />
            </Link>
            <a
              href="/brochure.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base border-2 text-white transition-all duration-200 hover:bg-white/10 backdrop-blur-sm"
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            >
              <Download size={18} /> Download Brochure
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
        <span className="text-white/60 text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} className="text-white/60" />
      </div>
    </section>
  );
}
