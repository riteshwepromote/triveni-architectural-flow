import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const items = [
  { n: 16, suffix: "+", label: "Years of practice", body: "A steady, slow studio." },
  { n: 340, suffix: "", label: "Homes finished", body: "Each a singular composition." },
  { n: 27, suffix: "", label: "Quarries sourced", body: "From Carrara to Rajasthan." },
  { n: 100, suffix: "%", label: "Hand-laid", body: "Every joint cut on site." },
  { n: 5, suffix: "yr", label: "Studio warranty", body: "Quiet confidence in our work." },
];

export function WhyTriveni() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stat-row").forEach((row) => {
        const num = row.querySelector(".stat-num") as HTMLElement;
        const value = Number(num?.dataset.value || 0);
        const suffix = num?.dataset.suffix || "";
        const obj = { v: 0 };
        gsap.from(row, {
          y: 50, opacity: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
        gsap.to(obj, {
          v: value, duration: 2, ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 80%" },
          onUpdate: () => { if (num) num.textContent = Math.round(obj.v) + suffix; },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-foreground text-background py-32 md:py-48 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <h2 className="font-display text-5xl md:text-7xl leading-[1.02]">
            Why <em className="text-sand">Triveni.</em>
          </h2>
          <p className="max-w-sm text-background/60">
            Five quiet measures of the way we work.
          </p>
        </div>

        <div className="border-t border-background/20">
          {items.map((it, i) => (
            <div key={it.label} className="stat-row grid grid-cols-12 items-center gap-6 py-10 md:py-14 border-b border-background/20">
              <div className="col-span-2 md:col-span-1 text-[10px] uppercase tracking-[0.3em] text-background/40">
                0{i + 1}
              </div>
              <div className="col-span-10 md:col-span-5 font-display text-6xl md:text-8xl">
                <span className="stat-num tabular-nums" data-value={it.n} data-suffix={it.suffix}>0</span>
              </div>
              <div className="col-span-12 md:col-span-3 text-[11px] uppercase tracking-[0.3em] text-background/60">
                {it.label}
              </div>
              <div className="col-span-12 md:col-span-3 text-background/70">
                {it.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
