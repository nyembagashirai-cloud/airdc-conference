import type { Metadata } from "next";
import { RegistrationForm } from "@/components/sections/RegistrationForm";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Register",
  description: "Register for the 23rd AIRDC Conference 2026 in Harare, Zimbabwe.",
};

const fees = [
  { type: "AIRDC Member Delegate", early: 850, standard: 1050 },
  { type: "Non-Member Delegate", early: 1100, standard: 1350 },
  { type: "Government / Regulator", early: 650, standard: 800 },
  { type: "Academic / Researcher", early: 500, standard: 650 },
  { type: "Student", early: 250, standard: 300 },
];

export default function RegisterPage() {
  return (
    <div className="pt-20">
      <div className="bg-primary py-16">
        <div className="container text-center">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">Registration</p>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-4">Register for AIRDC 2026</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Secure your place at Africa's premier insurance conference. 26–30 September 2026 · Rainbow Towers Hotel, Harare.
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
            {/* Fees */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card-premium p-6">
                <h2 className="font-heading font-bold text-primary mb-5">Registration Fees (USD)</h2>
                <div className="space-y-3">
                  {fees.map((fee) => (
                    <div key={fee.type} className="pb-3 border-b border-border last:border-0">
                      <p className="font-medium text-sm text-foreground mb-1">{fee.type}</p>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground text-xs">Early Bird</span>
                          <p className="font-bold text-accent">${fee.early}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">Standard</span>
                          <p className="font-bold text-primary">${fee.standard}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
                  <p className="text-xs text-secondary font-medium">⚡ Early Bird ends 30 April 2026</p>
                </div>
              </div>

              <div className="card-premium p-6">
                <h3 className="font-heading font-bold text-primary mb-4">Registration Includes</h3>
                <ul className="space-y-2">
                  {[
                    "Access to all plenary sessions",
                    "Workshop participation",
                    "Conference materials & bag",
                    "Welcome reception",
                    "Daily lunches & refreshments",
                    "Delegate networking app",
                    "CPD certificate",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground/70">
                      <CheckCircle2 size={15} className="text-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
