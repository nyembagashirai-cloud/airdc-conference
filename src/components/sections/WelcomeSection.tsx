import Image from "next/image";
import { Quote } from "lucide-react";

export function WelcomeSection() {
  return (
    <section className="section-padding bg-muted">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Welcome Message</p>
            <h2 className="section-title mb-6">A Word from the Secretary General</h2>
            
            <div className="relative">
              <Quote size={48} className="text-secondary/20 absolute -top-4 -left-4" />
              <blockquote className="text-foreground/80 text-lg leading-relaxed italic pl-6 border-l-4 border-secondary mb-6">
                Welcome, esteemed delegates, industry leaders, and honored guests, to the AIRDC Zimbabwe Conference 2026.
                On behalf of AIRDC, I extend our deepest gratitude to our gracious hosts, the Insurance Council of Zimbabwe.
              </blockquote>
            </div>
            
            <p className="text-foreground/70 leading-relaxed mb-6">
              Across the globe, developing markets are on the frontlines of rapid transformations. 
              We are navigating an era marked by shifting global trade routes, geopolitical tensions, 
              and the escalating impacts of climate-related risks. Simultaneously, the technological 
              revolution is reshaping how we underwrite risk, distribute products, and interact with our policyholders.
            </p>

            <p className="text-foreground/70 leading-relaxed mb-8">
              I encourage each of you to actively participate, share your unique regional perspectives, 
              and challenge the status quo. Let us use this platform to forge new partnerships, exchange 
              transformative ideas, and develop concrete strategies that will empower our markets.
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-border">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">JA</div>
              <div>
                <p className="font-heading font-bold text-primary">Januario Aliwalas</p>
                <p className="text-muted-foreground text-sm">Secretary General, AIRDC</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-premium aspect-[4/5]">
              <Image
                src="/images/kv.png"
                alt="AIRDC Conference 2026"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <p className="text-white font-bold text-lg">23rd AIRDC Conference</p>
                  <p className="text-secondary text-sm">Rainbow Towers Hotel, Harare • 26–30 September 2026</p>
                </div>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full -z-10" />
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-accent/10 rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
