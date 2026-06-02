import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  n: number;
  suffix: string;
  label: string;
  body: string;
}

const items: StatItem[] = [
  { n: 16, suffix: "+", label: "Years of practice", body: "A steady, slow studio building spaces meant to outlive trends." },
  { n: 340, suffix: "", label: "Homes finished", body: "Each a singular, highly architectural composition." },
  { n: 27, suffix: "", label: "Quarries sourced", body: "Direct, meticulous extractions from Carrara to Rajasthan." },
  { n: 100, suffix: "%", label: "Hand-laid", body: "Every seam aligned, every joint cut manually on site." },
  { n: 5, suffix: "yr", label: "Studio warranty", body: "A quiet, absolute confidence in our structural masonry." },
];

export function WhyTriveni() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".stat-row");

      rows.forEach((row) => {
        const num = row.querySelector(".stat-num") as HTMLElement;
        if (!num) return;

        const value = Number(num.dataset.value || 0);
        const suffix = num.dataset.suffix || "";
        const obj = { v: 0 };

        // Create a single, unified timeline per row to prevent layout shifting/glitches
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });

        tl.from(row.querySelectorAll(".animate-cell"), {
          y: 30,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.08,
        }).to(
          obj,
          {
            v: value,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              num.textContent = Math.round(obj.v) + suffix;
            },
          },
          "-=1.0" // Starts counting smoothly while text is finishing its lift
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative bg-[#FBF9F6] text-[#1C1B19] py-28 md:py-44 overflow-hidden selection:bg-[#C2B29F]/30"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-16">
        
        {/* Section Header: Intentional Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24 md:mb-36">
          <div className="md:col-span-7">
            <h2 className="font-display text-5xl md:text-8xl font-light tracking-tight leading-[0.95]">
              Why <br />
              <em className="font-serif italic font-normal text-[#8C7A65]">Triveni.</em>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9 flex flex-col justify-end mt-6 md:mt-0">
            <p className="text-sm md:text-base font-normal text-[#1C1B19]/60 leading-relaxed tracking-wide">
              Five quiet measures of the way we source materials, refine details, and practice our craft.
            </p>
          </div>
        </div>

        {/* Premium List Layout */}
        <div className="border-t border-[#1C1B19]/10">
          {items.map((it, i) => (
            <div
              key={it.label}
              className="stat-row group relative grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8 py-10 md:py-14 border-b border-[#1C1B19]/10 transition-colors duration-500 hover:bg-[#1C1B19]/[0.01]"
            >
              {/* Subtle architectural hover line background accent */}
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-[#8C7A65] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />

              {/* Index */}
              <div className="animate-cell md:col-span-1 text-[11px] font-mono tracking-widest text-[#1C1B19]/40 self-start pt-2">
                0{i + 1}
              </div>

              {/* Number: Asymmetric width allocation */}
              <div className="animate-cell md:col-span-4 font-display text-6xl md:text-8xl font-light tracking-tighter leading-none self-start transition-transform duration-500 ease-out group-hover:translate-x-1">
                <span className="stat-num tabular-nums" data-value={it.n} data-suffix={it.suffix}>
                  {it.n}
                </span>
              </div>

              {/* Label */}
              <div className="animate-cell md:col-span-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#1C1B19]/80 self-start pt-3">
                {it.label}
              </div>

              {/* Body Paragraph: Extended for editorial substance */}
              <div className="animate-cell md:col-span-4 text-sm md:text-base text-[#1C1B19]/50 font-normal leading-relaxed self-start pt-2 max-w-sm transition-colors duration-300 group-hover:text-[#1C1B19]">
                {it.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}