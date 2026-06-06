import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      
      <div className="container relative z-10 text-center">
        <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">Join Us in Harare</p>
        <h2 className="font-heading font-black text-white text-4xl md:text-5xl lg:text-6xl mb-6 max-w-4xl mx-auto leading-tight">
          Be Part of the Conversation That Shapes Insurance in Developing Markets
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-white/80">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-secondary" />
            <span>26–30 September 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-secondary" />
            <span>Harare, Zimbabwe</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="btn-secondary text-base px-8 py-4 group">
            Register as Delegate
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/sponsors" className="btn-outline text-base px-8 py-4">
            Become a Sponsor
          </Link>
          <Link href="/contact" className="btn-outline text-base px-8 py-4">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
