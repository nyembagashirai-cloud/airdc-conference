import { HeroSection } from "@/components/sections/HeroSection";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyAttendSection } from "@/components/sections/WhyAttendSection";
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
      <AboutSection />
      <WhyAttendSection />
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
