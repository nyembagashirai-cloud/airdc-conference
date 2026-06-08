import type { Metadata } from "next";
import { RegistrationForm } from "@/components/sections/RegistrationForm";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Register",
  description: "Register for the 24th AIRDC Conference 2026 in Harare, Zimbabwe.",
};

export default function RegisterPage() {
  return (
    <div className="pt-20">
      <div className="bg-primary py-16">
        <div className="container text-center">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">Registration</p>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-4">Register for AIRDC 2026</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Secure your place at Africa&apos;s premier insurance conference. 27–30 September 2026 · Rainbow Towers Hotel, Harare.
          </p>
        </div>
      </div>

      {/* Zimbabwe Immigration Notice */}
      <div className="bg-secondary/10 border-y-2 border-secondary">
        <div className="container py-6">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white font-black text-lg">!</span>
            </div>
            <div>
              <h3 className="font-heading font-bold text-primary text-lg mb-1">
                🇿🇼 Zimbabwe Immigration Update — Important Notice
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed mb-2">
                Passengers travelling to Zimbabwe are now required to complete arrival forms <strong>online before departure</strong>, as paper forms are no longer in use. While iPads are provided at immigration in Zimbabwe for this purpose, completing the form on arrival may result in delays.
              </p>
              <p className="text-foreground/80 text-sm leading-relaxed">
                To ensure a smoother and quicker journey through immigration, we recommend completing your form in advance at:{" "}
                <a
                  href="https://evisa.gov.zw/app/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold underline hover:text-primary-mid"
                >
                  https://evisa.gov.zw/app/index.html
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding bg-muted">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Fees summary */}
              <div className="card-premium p-6">
                <h2 className="font-heading font-bold text-primary mb-4">Registration Fees (USD)</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-sm font-medium text-foreground">AIRDC Members</span>
                    <span className="font-black text-2xl text-secondary">$350</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm font-medium text-foreground">Non-Members</span>
                    <span className="font-black text-2xl text-foreground">$500</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs mt-4 leading-relaxed">
                  Payment instructions will be sent within 48 hours of registration. A proforma invoice will be attached to your confirmation email.
                </p>
              </div>

              {/* What's included */}
              <div className="card-premium p-6">
                <h3 className="font-heading font-bold text-primary mb-4">What&apos;s Included</h3>
                <ul className="space-y-2">
                  {[
                    "Access to all plenary sessions",
                    "Workshops & breakout sessions",
                    "Conference materials",
                    "Welcome Reception",
                    "Networking events",
                    "Gala Dinner",
                    "Tea/Coffee & Lunch breaks",
                    "Certificate of attendance",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-2">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
