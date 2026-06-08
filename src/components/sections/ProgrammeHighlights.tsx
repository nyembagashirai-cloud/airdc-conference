import Link from "next/link";
import { CalendarClock, ArrowRight } from "lucide-react";

export function ProgrammeHighlights() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Programme</p>
          <h2 className="section-title">Conference Programme</h2>
        </div>

        <div className="bg-muted border border-border rounded-2xl px-8 py-14 text-center max-w-2xl mx-auto shadow-card">
          <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
            <CalendarClock size={36} className="text-secondary" />
          </div>
          <h3 className="font-heading font-bold text-primary text-2xl mb-3">
            Programme to Be Announced
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Our team is finalising an exceptional programme of keynote addresses, panel discussions,
            workshops, and networking events for 27–30 September 2026.
            The full schedule will be published here ahead of the conference.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/register" className="btn-primary inline-flex items-center gap-2">
              Register Now <ArrowRight size={16} />
            </Link>
            <Link href="/programme" className="btn-outline border-primary text-primary hover:bg-primary hover:text-white px-5 py-2.5 text-sm inline-flex items-center gap-2">
              Check Programme Page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
