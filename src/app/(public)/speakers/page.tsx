import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Speakers",
  description: "Meet the world-class speakers at the 23rd AIRDC Conference 2026.",
};

const typeColors: Record<string, string> = {
  "Keynote Speaker": "bg-secondary/10 text-secondary border-secondary/20",
  "Panel Speaker": "bg-accent/10 text-accent border-accent/20",
  "Moderator": "bg-primary/10 text-primary border-primary/20",
  "Workshop Facilitator": "bg-purple-50 text-purple-700 border-purple-200",
  "Guest Speaker": "bg-blue-50 text-blue-700 border-blue-200",
};

async function getSpeakers() {
  if (!process.env.DATABASE_URL) return [];
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.speaker.findMany({ where: { active: true }, orderBy: [{ order: "asc" }, { name: "asc" }] });
  } catch { return []; }
}

export default async function SpeakersPage() {
  const speakers = await getSpeakers();

  return (
    <div className="pt-20">
      <div className="bg-primary py-16">
        <div className="container text-center">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">Speakers</p>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-4">Conference Speakers</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            World-class industry leaders, regulators, innovators, and policymakers from across developing markets.
          </p>
        </div>
      </div>

      <section className="section-padding bg-muted">
        <div className="container">
          {speakers.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎤</span>
              </div>
              <h2 className="font-heading font-bold text-primary text-2xl mb-3">Speakers Coming Soon</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We are in the process of confirming our outstanding lineup of speakers. Check back soon for announcements.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {speakers.map((speaker) => {
                const initials = speaker.name.split(" ").map(n => n[0]).join("").slice(0, 2);
                return (
                  <div key={speaker.id} className="card-premium group overflow-hidden">
                    <div className="relative h-52 bg-gradient-to-br from-primary to-primary-mid">
                      {speaker.photoUrl ? (
                        <img src={speaker.photoUrl} alt={speaker.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-5xl font-bold text-white/20">{initials}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {speaker.country && (
                        <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full border border-white/20">
                          {speaker.country}
                        </div>
                      )}
                      <span className={`absolute bottom-3 left-3 text-xs font-bold px-2 py-1 rounded-full border ${typeColors[speaker.speakerType] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                        {speaker.speakerType}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading font-bold text-primary group-hover:text-accent transition-colors">{speaker.name}</h3>
                      <p className="text-secondary text-sm font-medium">{speaker.title}</p>
                      <p className="text-muted-foreground text-xs mb-3">{speaker.organisation}</p>
                      {speaker.bio && (
                        <p className="text-foreground/60 text-xs leading-relaxed border-t border-border pt-3 line-clamp-3">
                          {speaker.bio}
                        </p>
                      )}
                      {speaker.linkedinUrl && (
                        <a href={speaker.linkedinUrl} target="_blank" rel="noopener noreferrer"
                          className="mt-3 text-xs text-primary font-medium border-t border-border pt-3 block hover:text-accent">
                          LinkedIn Profile →
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-12 text-center p-8 bg-white rounded-2xl border border-border shadow-card">
            <h3 className="font-heading font-bold text-primary text-xl mb-2">Interested in Speaking?</h3>
            <p className="text-muted-foreground mb-4">Submit your abstract or speaking proposal for consideration at AIRDC 2026.</p>
            <Link href="/contact?subject=Speaking+Inquiry" className="btn-primary">Submit a Speaker Proposal</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
