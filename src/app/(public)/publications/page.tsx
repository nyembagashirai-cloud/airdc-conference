import type { Metadata } from "next";
import { Download, ExternalLink, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Read and download The Smart Insurer Digest — ICZ Half Year 2026 Edition, featuring the 24th AIRDC Annual Conference in Harare, Zimbabwe.",
};

const PDF_PATH = "/publications/smart-insurer-digest-airdc-special-edition.pdf";

export default function PublicationsPage() {
  return (
    <div className="pt-20">
      {/* Header banner */}
      <div className="bg-primary py-16">
        <div className="container text-center">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-4">
            Publications
          </p>
          <h1 className="font-heading font-black text-white text-4xl md:text-5xl mb-4">
            The Smart Insurer Digest
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            ICZ Half Year 2026 Edition — Special AIRDC Feature. Harare welcomes the 24th AIRDC
            Annual Conference.
          </p>
        </div>
      </div>

      {/* Action bar */}
      <div className="container py-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-muted rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-secondary/15 flex items-center justify-center flex-shrink-0">
              <BookOpen size={22} className="text-secondary" />
            </div>
            <div>
              <p className="font-heading font-bold text-foreground text-base leading-tight">
                Smart Insurer Digest — AIRDC Special Edition
              </p>
              <p className="text-sm text-foreground/60">Published by the Insurance Council of Zimbabwe</p>
            </div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <a
              href={PDF_PATH}
              download
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-secondary text-white hover:bg-secondary-light transition-all duration-200 shadow-card hover:-translate-y-0.5"
            >
              <Download size={17} /> Download PDF
            </a>
            <a
              href={PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
            >
              <ExternalLink size={17} /> Open in New Tab
            </a>
          </div>
        </div>

        {/* Embedded reader */}
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border shadow-premium bg-white">
          <object
            data={PDF_PATH}
            type="application/pdf"
            className="w-full"
            style={{ height: "85vh" }}
          >
            <div className="p-10 text-center">
              <p className="text-foreground/70 mb-4">
                Your browser can&apos;t display the PDF preview here.
              </p>
              <a
                href={PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-secondary text-white hover:bg-secondary-light transition-all duration-200"
              >
                <ExternalLink size={17} /> Open the Digest
              </a>
            </div>
          </object>
        </div>
      </div>
    </div>
  );
}
