import type { Metadata } from "next";
import { Suspense } from "react";
import { TravelDetailsForm } from "@/components/sections/TravelDetailsForm";

export const metadata: Metadata = {
  title: "Travel Details",
  description: "Submit your flight and accommodation details for the 24th AIRDC Annual Conference.",
  robots: { index: false, follow: false },
};

export default function TravelDetailsPage() {
  return (
    <div className="pt-20">
      <div className="bg-primary py-16">
        <div className="container text-center">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">Delegate Travel</p>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-4">Your Travel &amp; Hotel Details</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            So we can arrange your airport transfer and welcome. 27&ndash;30 September 2026 &middot; Rainbow Towers Hotel, Harare.
          </p>
        </div>
      </div>

      <div className="section-padding bg-muted">
        <div className="container max-w-3xl">
          <Suspense fallback={<p className="text-center text-muted-foreground py-12">Loading your registration…</p>}>
            <TravelDetailsForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
