import type { Metadata } from "next";
import { GalleryGrid } from "@/components/sections/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photo gallery from AIRDC conferences past and present.",
};

export default function GalleryPage() {
  return (
    <div className="pt-20">
      <div className="bg-primary py-16">
        <div className="container text-center">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">Gallery</p>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-4">Conference Gallery</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Moments captured from AIRDC conferences — networking, sessions, and celebrations.
          </p>
        </div>
      </div>
      <GalleryGrid />
    </div>
  );
}
