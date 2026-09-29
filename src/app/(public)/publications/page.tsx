import type { Metadata } from "next";
import Link from "next/link";
import { Download, ExternalLink, BookOpen, Presentation as SlidesIcon, FileText } from "lucide-react";
import { PRESENTATIONS } from "@/data/presentations";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Speaker presentations from the 24th AIRDC Annual Conference in Harare, and The Smart Insurer Digest, ICZ Half Year 2026 Edition.",
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
            Presentations &amp; Publications
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Speaker slides and papers from the 24th AIRDC Annual Conference, and the ICZ Smart
            Insurer Digest.
          </p>
        </div>
      </div>

      {/* Conference presentations */}
      <section className="bg-muted border-b border-border">
        <div className="container py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-2">
              Conference Presentations
            </p>
            <h2 className="font-heading font-bold text-primary text-2xl md:text-3xl mb-8">
              Slides and papers from the speakers
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {PRESENTATIONS.map((p) => (
                <article
                  key={p.id}
                  className="bg-white rounded-2xl border border-border shadow-card overflow-hidden flex flex-col"
                >
                  <a
                    href={p.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-primary/5 aspect-video overflow-hidden group"
                  >
                    <img
                      src={p.cover}
                      alt={`Cover of ${p.title}`}
                      loading="lazy"
                      className={`w-full h-full group-hover:scale-[1.02] transition-transform duration-300 ${
                        p.coverShape === "portrait" ? "object-cover object-top" : "object-cover"
                      }`}
                    />
                  </a>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-secondary mb-3">
                      {p.kind === "Slides" ? <SlidesIcon size={14} /> : <FileText size={14} />}
                      {p.kind} · {p.pages} pages · {p.sizeMb} MB
                    </div>
                    <h3 className="font-heading font-bold text-primary text-lg leading-snug">{p.title}</h3>
                    {p.subtitle && <p className="text-foreground/70 text-sm mt-1">{p.subtitle}</p>}
                    <p className="text-sm text-foreground mt-4">
                      {p.speakerSlug ? (
                        <Link href={`/speakers/${p.speakerSlug}`} className="font-semibold hover:text-accent">
                          {p.speaker}
                        </Link>
                      ) : (
                        <span className="font-semibold">{p.speaker}</span>
                      )}
                      , {p.organisation}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {p.session} · {p.date}
                    </p>
                    <div className="flex gap-3 pt-4 border-t border-border mt-auto">
                      <a
                        href={p.file}
                        download
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-secondary text-white hover:bg-secondary-light transition-all"
                      >
                        <Download size={16} /> Download
                      </a>
                      <a
                        href={p.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
                      >
                        <ExternalLink size={16} /> View
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Smart Insurer Digest */}
      <div className="container pt-12 md:pt-16 text-center">
        <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-2">Magazine</p>
        <h2 className="font-heading font-bold text-primary text-2xl md:text-3xl">The Smart Insurer Digest</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          ICZ Half Year 2026 Edition, Special AIRDC Feature. Harare welcomes the 24th AIRDC Annual Conference.
        </p>
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
