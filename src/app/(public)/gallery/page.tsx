import type { Metadata } from "next";
import { GalleryGrid } from "@/components/sections/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from the 24th AIRDC Annual Conference, Harare, 27 to 30 September 2026.",
};

export default function GalleryPage() {
  return (
    <div className="pt-20">
      <div className="bg-primary py-16">
        <div className="container text-center">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">Gallery</p>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-4">Conference Gallery</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Moments from the 24th AIRDC Annual Conference in Harare: sessions, networking and celebrations.
          </p>
        </div>
      </div>
      <GalleryGrid />
    </div>
  );
}
