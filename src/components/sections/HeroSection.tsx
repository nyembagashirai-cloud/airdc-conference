"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Download, ArrowRight, ChevronDown, Globe, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with subtle zoom */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/rainbow-hotel.webp')" }}
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      />
      {/* Green gradient overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(10,31,16,0.93) 0%, rgba(15,48,24,0.90) 40%, rgba(26,74,42,0.82) 70%, rgba(45,106,64,0.75) 100%)" }} />

      {/* Gold top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, #C8941C 0%, #E8B832 50%, #C8941C 100%)" }}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />

      {/* Decorative glow blobs */}
      <motion.div
        className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, #C8941C 0%, transparent 70%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 2, delay: 0.8 }}
      />
      <motion.div
        className="absolute top-20 left-1/3 w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, #C41230 0%, transparent 70%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 2, delay: 1 }}
      />

      <div className="container relative z-10 pt-28 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
              variants={fadeUp} initial="hidden" animate="show" custom={0.3}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#C8941C" }} />
              <span className="text-white/90 text-sm font-medium tracking-wide">24th Annual Conference • Harare, Zimbabwe</span>
            </motion.div>

            {/* Main title */}
            <h1 className="font-heading font-black text-white leading-[1.05] mb-6">
              <motion.span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
                variants={fadeUp} initial="hidden" animate="show" custom={0.5}>
                AIRDC
              </motion.span>
              <motion.span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
                style={{ color: "#C8941C" }}
                variants={fadeUp} initial="hidden" animate="show" custom={0.65}>
                2026
              </motion.span>
              <motion.span className="block text-2xl sm:text-3xl lg:text-4xl text-white/80 font-semibold mt-2 tracking-wide"
                variants={fadeUp} initial="hidden" animate="show" custom={0.78}>
                Zimbabwe Conference
              </motion.span>
            </h1>

            {/* Theme box */}
            <motion.div
              className="mb-10 border-l-4 pl-6 py-3 rounded-r-lg"
              style={{ borderColor: "#C8941C", background: "rgba(255,255,255,0.07)" }}
              variants={fadeUp} initial="hidden" animate="show" custom={0.9}
            >
              <p className="text-white/50 text-xs uppercase tracking-[0.15em] mb-1.5 font-semibold">Conference Theme</p>
              <p className="text-white font-medium text-base sm:text-lg leading-snug">
                "Strengthening Insurance Resilience for Developing Countries Amid Geopolitical and Technological Disruptions"
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div className="flex flex-wrap gap-4"
              variants={fadeUp} initial="hidden" animate="show" custom={1.05}>
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
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-5">

            {/* Key details card */}
            <motion.div
              className="rounded-2xl p-6 backdrop-blur-sm border border-white/15 space-y-4"
              style={{ background: "rgba(255,255,255,0.09)" }}
              variants={fadeUp} initial="hidden" animate="show" custom={0.6}
            >
              {[
                { icon: <Calendar size={18} style={{ color: "#C8941C" }} />, label: "Conference Dates", value: "27–30 September 2026" },
                { icon: <MapPin size={18} style={{ color: "#C8941C" }} />, label: "Venue", value: "Rainbow Towers Hotel, Harare" },
                { icon: <Globe size={18} style={{ color: "#C8941C" }} />, label: "Member Countries", value: "28 Countries" },
                { icon: <Users size={18} style={{ color: "#C8941C" }} />, label: "Expected Delegates", value: "500+ Professionals" },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(212,175,55,0.18)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white/45 text-xs uppercase tracking-wider">{item.label}</p>
                    <p className="text-white font-semibold text-sm mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Organiser Logos card */}
            <motion.div
              className="rounded-2xl px-6 py-6 backdrop-blur-sm border border-white/15"
              style={{ background: "rgba(255,255,255,0.09)" }}
              variants={fadeIn} initial="hidden" animate="show" custom={0.85}
            >
              <p className="text-white/60 text-xs uppercase tracking-[0.15em] font-semibold mb-5">Organised by</p>
              <div className="bg-white rounded-xl px-4 py-3">
                <div className="relative h-16 w-full">
                  <Image
                    src="/images/organiser-logos.png"
                    alt="24th AIRDC Conference | AIRDC | Insurance Council of Zimbabwe"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <span className="text-white/60 text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} className="text-white/60" />
      </motion.div>
    </section>
  );
}
