import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Globe, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Gold bar */}
      <div className="h-1 bg-gold-gradient" />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 bg-white rounded-lg p-1">
                <Image src="/images/logo.png" alt="AIRDC" fill className="object-contain p-1" />
              </div>
              <div>
                <p className="font-heading font-bold text-white">AIRDC</p>
                <p className="text-secondary text-sm">23rd Conference 2026</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Association of Insurers and Reinsurers of Developing Countries.
              Building resilience across developing markets.
            </p>
            <div className="flex gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About the Conference" },
                { href: "/programme", label: "Programme" },
                { href: "/speakers", label: "Speakers" },
                { href: "/sponsors", label: "Sponsors & Partners" },
                { href: "/gallery", label: "Gallery" },
                { href: "/news", label: "News & Updates" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-white/70 hover:text-secondary text-sm transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-secondary rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Conference Info */}
          <div>
            <h3 className="font-heading font-bold text-white mb-6">Conference Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">
                  Harare International Conference Centre<br />
                  Harare, Zimbabwe
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Globe size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">
                  September 2026<br />
                  <span className="text-secondary font-medium">Save the Date</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                <a href="mailto:info@airdc2026.org" className="text-white/70 hover:text-secondary text-sm transition-colors">
                  info@airdc2026.org
                </a>
              </li>
            </ul>
          </div>

          {/* Register */}
          <div>
            <h3 className="font-heading font-bold text-white mb-6">Attend the Conference</h3>
            <p className="text-white/70 text-sm mb-6">
              Join over 500 insurance professionals from 40+ developing countries for Africa's premier insurance conference.
            </p>
            <Link href="/register"
              className="btn-secondary w-full text-center block mb-3">
              Register Now
            </Link>
            <Link href="/contact"
              className="btn-outline w-full text-center block text-sm">
              Enquire
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © 2026 AIRDC. 23rd Annual Conference. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-white/50 hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/50 hover:text-white text-xs transition-colors">Terms</Link>
            <Link href="/admin" className="text-white/50 hover:text-white text-xs transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
