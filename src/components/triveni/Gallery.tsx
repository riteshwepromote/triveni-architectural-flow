import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import g from "@/assets/granite.jpg";
import m from "@/assets/marble.jpg";
import bath from "@/assets/bathroom.jpg";
import k from "@/assets/kitchen.jpg";
import s from "@/assets/staircase.jpg";
import bed from "@/assets/bedroom.jpg";
import t from "@/assets/texture1.jpg";

const all = [
  { src: g, tag: "Stone", h: "tall" },
  { src: bath, tag: "Interior", h: "wide" },
  { src: m, tag: "Stone", h: "short" },
  { src: k, tag: "Interior", h: "tall" },
  { src: s, tag: "Architecture", h: "wide" },
  { src: t, tag: "Texture", h: "short" },
  { src: bed, tag: "Interior", h: "tall" },
  { src: g, tag: "Stone", h: "short" },
];

const filters = ["All", "Stone", "Interior", "Architecture", "Texture"];

export function Gallery() {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".g-item", {
        y: 60, opacity: 0, stagger: 0.06, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, [filter]);

  const items = filter === "All" ? all : all.filter((x) => x.tag === filter);

  return (
    <section id="gallery" ref={root} className="relative bg-background text-foreground py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <h2 className="font-display text-5xl md:text-7xl leading-[1.02]">
            From the <em className="text-stone-warm">archive.</em>
          </h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 text-[10px] uppercase tracking-[0.3em] border transition ${
                  filter === f
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 md:columns-3 gap-4 md:gap-6 [column-fill:_balance]">
          {items.map((it, i) => (
            <div
              key={i}
              className="g-item mb-4 md:mb-6 break-inside-avoid overflow-hidden group relative"
              data-cursor="hover"
            >
              <img
                src={it.src}
                alt={it.tag}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110 ${
                  it.h === "tall" ? "aspect-[3/4]" : it.h === "wide" ? "aspect-[4/3]" : "aspect-square"
                }`}
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-500" />
              <div className="absolute bottom-4 left-4 text-bone opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <div className="text-[10px] uppercase tracking-[0.3em]">{it.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
