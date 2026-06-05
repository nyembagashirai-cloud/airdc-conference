"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Award, Newspaper, Images,
  CalendarDays, UserCheck, MessageSquare, LogOut, Settings,
  BarChart3, Hotel
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/admin/registrations", icon: UserCheck, label: "Registrations" },
  { href: "/admin/speakers", icon: Users, label: "Speakers" },
  { href: "/admin/sponsors", icon: Award, label: "Sponsors" },
  { href: "/admin/programme", icon: CalendarDays, label: "Programme" },
  { href: "/admin/news", icon: Newspaper, label: "News & Updates" },
  { href: "/admin/gallery", icon: Images, label: "Gallery" },
  { href: "/admin/contacts", icon: MessageSquare, label: "Contacts" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-primary flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <p className="font-heading font-bold text-white text-sm">AIRDC 2026</p>
        <p className="text-secondary text-xs font-medium">Admin Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium",
                active
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/8"
              )}>
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <Link href="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-all text-sm font-medium">
          <Settings size={18} />Settings
        </Link>
        <Link href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-all text-sm font-medium">
          <LogOut size={18} />View Site
        </Link>
      </div>
    </aside>
  );
}
