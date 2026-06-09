import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the AIRDC 2026 organising team.",
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="bg-primary py-16">
        <div className="container text-center">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">Get in Touch</p>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-4">Contact Us</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Have a question about AIRDC 2026? Our team is ready to help.
          </p>
        </div>
      </div>

      <section className="section-padding bg-muted">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="card-premium p-6">
                <h2 className="font-heading font-bold text-primary mb-5">Conference Venue</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin size={18} className="text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground text-sm">Rainbow Towers Hotel &amp; Conference Centre</p>
                      <p className="text-muted-foreground text-xs mt-0.5">Harare, Zimbabwe</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock size={18} className="text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground text-sm">Conference Dates</p>
                      <p className="text-muted-foreground text-xs">27–30 September 2026</p>
                    </div>
                  </div>
                </div>
                {/* Map embed placeholder */}
                <div className="mt-4 h-40 bg-primary/10 rounded-xl flex items-center justify-center border border-border">
                  <div className="text-center text-muted-foreground text-sm">
                    <MapPin size={24} className="mx-auto mb-2 text-primary/30" />
                    <p>Map: Harare, Zimbabwe</p>
                  </div>
                </div>
              </div>

              <div className="card-premium p-6">
                <h2 className="font-heading font-bold text-primary mb-5">Contact Directory</h2>
                <div className="space-y-3">
                  <p className="font-semibold text-foreground text-sm">Conference Secretariat</p>
                  <p className="text-secondary text-xs">General Enquiries</p>
                  <a href="mailto:info@airdczim.co.zw" className="flex items-center gap-2 text-primary hover:text-accent text-sm transition-colors">
                    <Mail size={14} /> info@airdczim.co.zw
                  </a>
                  <a href="tel:+26308677007101" className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors">
                    <Phone size={14} /> +263 08677007101
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
