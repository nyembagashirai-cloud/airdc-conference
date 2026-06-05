import { CheckCircle2, Lightbulb, Network, Award, BookOpen, Globe2 } from "lucide-react";

const reasons = [
  { icon: Network, title: "Unrivalled Networking", desc: "Connect with 500+ insurance professionals, regulators, and executives from 40+ developing countries." },
  { icon: Lightbulb, title: "Cutting-Edge Insights", desc: "Gain actionable intelligence on InsurTech, climate risk, geopolitical disruption, and market resilience." },
  { icon: Globe2, title: "Regional Market Access", desc: "Explore business opportunities across Africa, Asia, Latin America and other developing regions." },
  { icon: Award, title: "Industry Recognition", desc: "Showcase your organisation's innovations and thought leadership to a global audience." },
  { icon: BookOpen, title: "Expert-Led Sessions", desc: "30+ sessions, panels and workshops led by world-class speakers and industry leaders." },
  { icon: CheckCircle2, title: "CPD Credits", desc: "Earn Continuing Professional Development credits recognised across member countries." },
];

export function WhyAttendSection() {
  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/3 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">Why Attend</p>
          <h2 className="font-heading font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4">
            6 Compelling Reasons to Join Us
          </h2>
          <p className="text-white/70 text-lg">
            The 23rd AIRDC Conference is the unmissable event for insurance professionals in developing markets.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <div key={reason.title}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary/50 rounded-xl p-6 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-secondary/20 group-hover:bg-secondary flex items-center justify-center flex-shrink-0 transition-colors">
                  <reason.icon size={22} className="text-secondary group-hover:text-primary-dark transition-colors" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white mb-2">{reason.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
