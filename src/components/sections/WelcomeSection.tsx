"use client";
import Image from "next/image";
import { Quote } from "lucide-react";
import { useState } from "react";

export function WelcomeSection() {
  const [imgError, setImgError] = useState(false);
  return (
    <section className="section-padding bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Welcome Message</p>
          <h2 className="section-title">A Word from the Secretary General</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start max-w-6xl mx-auto">

          {/* Photo column */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative w-56 h-64 lg:w-full lg:h-80 rounded-2xl overflow-hidden shadow-premium mb-4 bg-primary/10">
              {!imgError ? (
                <Image
                  src="/images/secretary-general.jpg"
                  alt="Januario Aliwalas — Secretary General, AIRDC"
                  fill
                  className="object-cover object-top"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                  <span className="text-6xl font-black text-primary/30">JA</span>
                </div>
              )}
            </div>
            <div className="text-center lg:text-left">
              <p className="font-heading font-bold text-primary text-lg">Januario Aliwalas</p>
              <p className="text-muted-foreground text-sm">Secretary General</p>
              <p className="text-secondary text-sm font-semibold">AIRDC</p>
            </div>
          </div>

          {/* Speech column */}
          <div className="lg:col-span-2">
            <div className="relative mb-6">
              <Quote size={52} className="text-secondary/20 absolute -top-4 -left-2" />
              <blockquote className="text-foreground/80 text-lg leading-relaxed italic pl-6 border-l-4 border-secondary">
                Welcome, esteemed delegates, industry leaders, and honored guests, to the Association of Insurers
                and Reinsurers of Developing Countries (AIRDC) Zimbabwe Conference, themed "INSURANCE RESILIENCE
                IN THE FACE OF GEO-POLITICAL AND TECHNOLOGICAL DISRUPTION FOR DEVELOPING MARKETS."
              </blockquote>
            </div>

            <div className="space-y-4 text-foreground/75 leading-relaxed">
              <p>
                On behalf of AIRDC, I extend our deepest gratitude to our gracious hosts, the Insurance Council
                of Zimbabwe. Thank you for your warm hospitality and for providing the perfect backdrop for this
                vital dialogue.
              </p>
              <p>
                Across the globe, developing markets are on the frontlines of rapid transformations. We are
                navigating an era marked by shifting global trade routes, geopolitical tensions, and the
                escalating impacts of climate-related risks. Simultaneously, the technological revolution is
                reshaping how we underwrite risk, distribute products, and interact with our policyholders.
              </p>
              <p>
                For developing markets, these disruptions are not just academic topics; they are day-to-day
                realities. However, within these disruptions lie unprecedented opportunities. Technological
                innovations—from mobile-integrated microinsurance to AI-driven predictive modeling—offer us
                the tools to expand our reach and make insurance more accessible and affordable than ever before.
              </p>
              <p>
                I encourage each of you to actively participate, share your unique regional perspectives, and
                challenge the status quo. Let us use this platform to forge new partnerships, exchange
                transformative ideas, and develop concrete strategies that will empower our markets to thrive
                in an uncertain future.
              </p>
              <p className="font-medium text-foreground/90">
                Once again, welcome to this crucial conference. I wish you all insightful deliberations,
                fruitful networking, and a highly memorable stay in Zimbabwe.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="font-heading font-bold text-primary">Januario Aliwalas</p>
              <p className="text-muted-foreground text-sm">Secretary General, AIRDC</p>
              <p className="text-muted-foreground text-sm italic mt-1">AIRDC Zimbabwe Conference, September 2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
