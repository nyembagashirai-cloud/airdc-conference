"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programme", label: "Programme" },
  { href: "/speakers", label: "Speakers" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-card border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="relative w-16 h-16 lg:w-20 lg:h-20">
              <Image
                src="/images/logo.png"
                alt="AIRDC Logo"
                fill
                className="object-contain drop-shadow-md"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className={cn("font-heading font-bold text-base leading-tight",
                scrolled ? "text-primary" : "text-white")}>AIRDC</p>
              <p className={cn("text-xs font-medium",
                scrolled ? "text-secondary" : "text-secondary-light")}>
                23rd Annual Conference 2026
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  scrolled
                    ? "text-foreground hover:text-primary hover:bg-muted"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/register"
              className="bg-secondary text-primary-dark font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-secondary-light transition-all duration-200 shadow-card hover:-translate-y-0.5"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-border shadow-premium">
          <div className="container py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-foreground hover:text-primary hover:bg-muted font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border mt-3">
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="btn-secondary w-full text-center block"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
