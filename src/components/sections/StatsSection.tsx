"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const stats = [
  { value: 23, suffix: "rd", label: "Annual Edition", desc: "Years of excellence" },
  { value: 500, suffix: "+", label: "Delegates", desc: "Industry professionals" },
  { value: 40, suffix: "+", label: "Countries", desc: "Developing markets" },
  { value: 30, suffix: "+", label: "Sessions", desc: "Panels & workshops" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-heading font-black text-5xl lg:text-6xl text-secondary">
      {count}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 bg-white border-y border-border">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-border">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-4">
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="font-heading font-bold text-primary mt-2 text-lg">{stat.label}</p>
              <p className="text-muted-foreground text-sm">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
