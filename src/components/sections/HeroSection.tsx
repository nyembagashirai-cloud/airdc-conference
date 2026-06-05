"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Download, ArrowRight, ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
      />

      {/* Key Visual */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 hidden xl:block">
        <Image
          src="/images/kv.png"
          alt="AIRDC 2026"
          fill
          className="object-cover object-left"
          priority
        />
      </div>

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />

      <div className="container relative z-10 pt-24 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">23rd Annual Conference</span>
          </div>

          {/* Title */}
          <h1 className="font-heading font-black text-white mb-6 leading-tight">
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">AIRDC</span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">Zimbabwe</span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl text-secondary mt-2 font-semibold">
              Conference 2026
            </span>
          </h1>

          {/* Theme */}
          <div className="bg-white/10 backdrop-blur-sm border-l-4 border-secondary rounded-r-xl px-6 py-4 mb-8 max-w-3xl">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-1 font-medium">Conference Theme</p>
            <p className="text-white font-semibold text-lg sm:text-xl leading-snug">
              "Insurance Resilience in the Face of Geopolitical and Technological Disruption for Developing Markets"
            </p>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-6 mb-10">
            <div className="flex items-center gap-2 text-white/80">
              <Calendar size={18} className="text-secondary flex-shrink-0" />
              <span className="font-medium">September 2026</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin size={18} className="text-secondary flex-shrink-0" />
              <span className="font-medium">Harare, Zimbabwe</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register" className="btn-secondary text-base px-8 py-4 group">
              Register Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="/brochure.pdf" download className="btn-outline text-base px-8 py-4 group">
              <Download size={18} />
              Download Brochure
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} />
      </div>
    </section>
  );
}
