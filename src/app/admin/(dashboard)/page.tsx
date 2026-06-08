import { Users, UserCheck, MessageSquare, Calendar, Award, Newspaper } from "lucide-react";

async function getStats() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const [registrations, contacts, speakers, sponsors, articles, recentRegs, recentContacts] = await Promise.all([
      prisma.registration.count(),
      prisma.contactSubmission.count({ where: { status: "NEW" } }),
      prisma.speaker.count({ where: { featured: true } }),
      prisma.sponsor.count({ where: { active: true } }),
      prisma.article.count({ where: { published: true } }),
      prisma.registration.findMany({ orderBy: { createdAt: "desc" }, take: 5, select: { firstName: true, lastName: true, organisation: true, createdAt: true } }),
      prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 3, select: { name: true, subject: true, createdAt: true } }),
    ]);

    const conferenceDate = new Date("2026-09-27");
    const today = new Date();
    const daysToConference = Math.max(0, Math.ceil((conferenceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    return { registrations, contacts, speakers, sponsors, articles, daysToConference, recentRegs, recentContacts };
  } catch {
    return { registrations: 0, contacts: 0, speakers: 0, sponsors: 0, articles: 0, daysToConference: null, recentRegs: [], recentContacts: [] };
  }
}

const quickActions = [
  { href: "/admin/registrations", label: "View Registrations", desc: "Manage delegate registrations" },
  { href: "/admin/speakers", label: "Add Speaker", desc: "Add or edit speaker profiles" },
  { href: "/admin/news", label: "Publish News", desc: "Create a new article or announcement" },
  { href: "/admin/sponsors", label: "Manage Sponsors", desc: "Add sponsors and partner logos" },
  { href: "/admin/gallery", label: "Upload Photos", desc: "Add images to the gallery" },
  { href: "/admin/contacts", label: "View Messages", desc: "Read contact form submissions" },
];

export default async function AdminDashboard() {
  const { registrations, contacts, speakers, sponsors, articles, daysToConference, recentRegs, recentContacts } = await getStats();

  const stats = [
    { label: "Registrations", value: registrations, icon: UserCheck, color: "bg-primary", sub: "Total" },
    { label: "Speakers", value: speakers, icon: Users, color: "bg-red-600", sub: "Featured" },
    { label: "Sponsors", value: sponsors, icon: Award, color: "bg-secondary", sub: "Active" },
    { label: "Unread Messages", value: contacts, icon: MessageSquare, color: "bg-purple-500", sub: "New" },
    { label: "News Published", value: articles, icon: Newspaper, color: "bg-pink-500", sub: "Live" },
    { label: "Days to Conference", value: daysToConference ?? "—", icon: Calendar, color: "bg-orange-500", sub: "27 Sep 2026" },
  ];

  const recentActivity = [
    ...recentRegs.map(r => ({
      text: `${r.firstName} ${r.lastName} (${r.organisation}) registered`,
      time: new Date(r.createdAt).toLocaleDateString(),
      color: "bg-primary",
    })),
    ...recentContacts.map(c => ({
      text: `New message from ${c.name} — ${c.subject}`,
      time: new Date(c.createdAt).toLocaleDateString(),
      color: "bg-purple-500",
    })),
  ].sort((a, b) => b.time.localeCompare(a.time)).slice(0, 6);

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
            <p className="text-xs text-muted-foreground/60 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-card border border-border p-6 mb-8">
        <h2 className="font-heading font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <a key={action.href} href={action.href}
              className="p-4 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all group">
              <p className="font-semibold text-foreground group-hover:text-primary text-sm">{action.label}</p>
              <p className="text-muted-foreground text-xs mt-1">{action.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-card border border-border p-6">
        <h2 className="font-heading font-bold text-foreground mb-4">Recent Activity</h2>
        {recentActivity.length === 0 ? (
          <p className="text-muted-foreground text-sm">No recent activity yet.</p>
        ) : (
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.color}`} />
                <p className="text-sm text-foreground flex-1">{item.text}</p>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
