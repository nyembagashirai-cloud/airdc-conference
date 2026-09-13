import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, MapPin, Linkedin } from "lucide-react";
import { SPEAKERS } from "@/data/speakers";

type Props = { params: Promise<{ id: string }> };

type SpeakerView = {
  name: string;
  title: string;
  organisation: string;
  country: string;
  speakerType: string;
  photoUrl: string;
  bio: string;
  linkedinUrl: string;
};

async function getSpeaker(id: string): Promise<SpeakerView | null> {
  // Speakers captured in the admin dashboard take precedence.
  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("@/lib/prisma");
      const s = await prisma.speaker.findFirst({ where: { id, active: true } });
      if (s) {
        return {
          name: s.name,
          title: s.title || "",
          organisation: s.organisation || "",
          country: s.country || "",
          speakerType: s.speakerType || "Speaker",
          photoUrl: s.photoUrl || "",
          bio: s.bio || "",
          linkedinUrl: s.linkedinUrl || "",
        };
      }
    } catch {
      // fall through to the published list
    }
  }

  const fallback = SPEAKERS.find((s) => s.slug === id);
  if (!fallback) return null;
  return {
    name: fallback.name,
    title: fallback.title,
    organisation: fallback.organisation,
    country: fallback.country,
    speakerType: fallback.speakerType,
    photoUrl: fallback.photo,
    bio: fallback.bio,
    linkedinUrl: "",
  };
}

export async function generateStaticParams() {
  return SPEAKERS.map((s) => ({ id: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const speaker = await getSpeaker(id);
  if (!speaker) return { title: "Speaker Not Found" };
  return {
    title: speaker.name,
    description: `${speaker.name}, ${speaker.title}, ${speaker.organisation}. Speaking at the 24th AIRDC Conference, Harare, Zimbabwe.`,
    openGraph: speaker.photoUrl ? { images: [speaker.photoUrl] } : undefined,
  };
}

export default async function SpeakerProfilePage({ params }: Props) {
  const { id } = await params;
  const speaker = await getSpeaker(id);
  if (!speaker) notFound();

  const initials = speaker.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const paragraphs = speaker.bio.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="pt-20">
      <div className="bg-primary h-28" />

      <section className="section-padding">
        <div className="container max-w-4xl mx-auto">
          <Link
            href="/speakers"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Speakers
          </Link>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            <div className="md:col-span-1">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-primary-mid shadow-card">
                {speaker.photoUrl ? (
                  <img
                    src={speaker.photoUrl}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-6xl font-bold text-white/20">{initials}</span>
                  </div>
                )}
              </div>
              {speaker.linkedinUrl && (
                <a
                  href={speaker.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-primary border border-border rounded-xl py-2.5 hover:bg-muted transition-colors"
                >
                  <Linkedin size={16} /> LinkedIn Profile
                </a>
              )}
            </div>

            <div className="md:col-span-2">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                {speaker.speakerType}
              </span>
              <h1 className="font-heading font-black text-primary text-3xl md:text-4xl leading-tight">
                {speaker.name}
              </h1>
              <p className="text-lg text-foreground/80 font-medium mt-2">{speaker.title}</p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-muted-foreground">
                {speaker.organisation && (
                  <span className="flex items-center gap-2">
                    <Building2 size={15} className="text-secondary" /> {speaker.organisation}
                  </span>
                )}
                {speaker.country && (
                  <span className="flex items-center gap-2">
                    <MapPin size={15} className="text-secondary" /> {speaker.country}
                  </span>
                )}
              </div>

              {paragraphs.length > 0 && (
                <div className="mt-8 border-t border-border pt-8 space-y-4">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="text-foreground/75 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-14 text-center p-8 bg-muted rounded-2xl border border-border">
            <h2 className="font-heading font-bold text-primary text-xl mb-2">
              Join us in Harare
            </h2>
            <p className="text-muted-foreground mb-4">
              27 to 30 September 2026, Rainbow Towers Hotel &amp; Conference Centre.
            </p>
            <Link href="/register" className="btn-primary">
              Register Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
