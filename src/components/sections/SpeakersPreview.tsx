import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function getFeaturedSpeakers() {
  if (!process.env.DATABASE_URL) return [];
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.speaker.findMany({
      where: { active: true, featured: true },
      orderBy: [{ order: "asc" }, { name: "asc" }],
      take: 6,
    });
  } catch { return []; }
}

export async function SpeakersPreview() {
  const speakers = await getFeaturedSpeakers();
  const showSection = speakers.length > 0;

  if (!showSection) {
    return (
      <section className="section-padding bg-muted">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Speakers</p>
              <h2 className="section-title">World-Class Speakers</h2>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Industry leaders, regulators, innovators, and policymakers from across the globe.
              </p>
            </div>
            <Link href="/speakers" className="btn-primary flex-shrink-0 group flex items-center gap-2">
              View Speakers <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="text-center py-12 bg-white rounded-2xl border border-border">
            <p className="text-muted-foreground">Speaker announcements coming soon.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-muted">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Speakers</p>
            <h2 className="section-title">World-Class Speakers</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Industry leaders, regulators, innovators, and policymakers from across the globe.
            </p>
          </div>
          <Link href="/speakers" className="btn-primary flex-shrink-0 group flex items-center gap-2">
            View All Speakers <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker) => {
            const initials = speaker.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2);
            return (
              <div key={speaker.id} className="card-premium group overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-primary to-primary-mid">
                  {speaker.photoUrl ? (
                    <img src={speaker.photoUrl} alt={speaker.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-4xl font-bold text-white/30">{initials}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {speaker.country && (
                    <div className="absolute top-3 right-3 bg-secondary text-primary-dark text-xs font-bold px-2 py-1 rounded-full">
                      {speaker.country}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-primary group-hover:text-accent transition-colors">{speaker.name}</h3>
                  <p className="text-secondary text-sm font-medium">{speaker.title}</p>
                  <p className="text-muted-foreground text-xs mb-3">{speaker.organisation}</p>
                  {speaker.bio && (
                    <p className="text-foreground/70 text-xs border-t border-border pt-3 leading-relaxed line-clamp-2">
                      {speaker.bio}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
