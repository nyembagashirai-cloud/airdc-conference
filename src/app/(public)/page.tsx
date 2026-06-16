import { HeroSection } from "@/components/sections/HeroSection";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { SpeakersPreview } from "@/components/sections/SpeakersPreview";
import { ProgrammeHighlights } from "@/components/sections/ProgrammeHighlights";
import { HotelsSection } from "@/components/sections/HotelsSection";
import { SponsorsSection } from "@/components/sections/SponsorsSection";
import { NewsPreview } from "@/components/sections/NewsPreview";
import { CtaSection } from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <section className="section-padding bg-white">
        <div className="container text-center max-w-2xl mx-auto">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">About AIRDC</p>
          <h2 className="section-title mb-4">Association of Insurers and Reinsurers of Developing Countries</h2>
          <p className="section-subtitle mx-auto mb-8">
            Learn more about AIRDC — its history, membership, objectives, and work across developing insurance markets worldwide.
          </p>
          <a
            href="https://www.airdevc.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-primary"
          >
            Visit AIRDC Website →
          </a>
        </div>
      </section>
      <StatsSection />
      <SpeakersPreview />
      <ProgrammeHighlights />
      <HotelsSection />
      <SponsorsSection />
      <NewsPreview />
      <CtaSection />
    </>
  );
}
