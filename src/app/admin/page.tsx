import { Users, UserCheck, MessageSquare, TrendingUp, Calendar, Award, Newspaper } from "lucide-react";

const stats = [
  { label: "Registrations", value: "0", icon: UserCheck, color: "bg-primary", change: "New" },
  { label: "Confirmed Speakers", value: "8", icon: Users, color: "bg-accent", change: "Active" },
  { label: "Sponsors", value: "0", icon: Award, color: "bg-secondary", change: "Pending" },
  { label: "Contact Messages", value: "0", icon: MessageSquare, color: "bg-purple-500", change: "Unread" },
  { label: "News Articles", value: "6", icon: Newspaper, color: "bg-pink-500", change: "Published" },
  { label: "Days to Conference", value: "TBC", icon: Calendar, color: "bg-orange-500", change: "Sep 2026" },
];

const quickActions = [
  { href: "/admin/registrations", label: "View Registrations", desc: "Manage delegate registrations" },
  { href: "/admin/speakers", label: "Add Speaker", desc: "Add or edit speaker profiles" },
  { href: "/admin/news/new", label: "Publish News", desc: "Create a new article or announcement" },
  { href: "/admin/sponsors", label: "Manage Sponsors", desc: "Add sponsors and partner logos" },
  { href: "/admin/gallery", label: "Upload Photos", desc: "Add images to the gallery" },
  { href: "/admin/contacts", label: "View Messages", desc: "Read contact form submissions" },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">AIRDC 23rd Conference 2026 — Admin Overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-card border border-border p-4">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon size={18} className="text-white" />
            </div>
            <p className="font-heading font-black text-2xl text-foreground">{stat.value}</p>
            <p className="text-muted-foreground text-xs font-medium">{stat.label}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-card border border-border p-6 mb-8">
        <h2 className="font-heading font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <a key={action.href} href={action.href}
              className="p-4 border border-border rounded-xl hover:border-primary hover:bg-primary/2 transition-all group">
              <p className="font-semibold text-foreground group-hover:text-primary text-sm">{action.label}</p>
              <p className="text-muted-foreground text-xs mt-1">{action.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-xl shadow-card border border-border p-6">
        <h2 className="font-heading font-bold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { action: "Conference website launched", time: "Just now", color: "bg-accent" },
            { action: "6 news articles published", time: "Today", color: "bg-primary" },
            { action: "8 speaker profiles added", time: "Today", color: "bg-secondary" },
            { action: "Programme uploaded (3 days)", time: "Today", color: "bg-purple-400" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.color}`} />
              <p className="text-sm text-foreground flex-1">{item.action}</p>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
