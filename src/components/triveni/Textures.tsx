import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import granite from "@/assets/granite.jpg";
import marble from "@/assets/marble.jpg";
import texture from "@/assets/texture1.jpg";

const stones = [
  { name: "Noir Doré", origin: "Brazil", finish: "Polished", img: granite, note: "Volcanic black with veins of oxidised gold." },
  { name: "Bianco Sereno", origin: "Carrara, Italy", finish: "Honed", img: marble, note: "A quiet white, threaded with cool grey." },
  { name: "Travertino Sole", origin: "Tivoli, Italy", finish: "Brushed", img: texture, note: "Sun-warmed beige, with an open hand." },
];

export function Textures() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tex-row", {
        y: 60, opacity: 0, stagger: 0.1, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-background text-foreground py-32 md:py-48 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5 md:sticky md:top-32 self-start">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">— Material Library</span>
          <h2 className="font-display text-5xl md:text-6xl leading-[1.02] mt-4">
            Touch the<br /><em className="text-stone-warm">stone.</em>
          </h2>
          <p className="mt-8 text-muted-foreground max-w-md">
            Hover any stone to bring it forward. Each slab is one of one — the sample you see is the slab you receive.
          </p>

          <div className="mt-12 relative aspect-[4/5] w-full max-w-sm overflow-hidden bg-muted">
            {stones.map((s, i) => (
              <img
                key={s.name}
                src={s.img}
                alt={s.name}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out ${
                  i === active ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 text-bone">
              <div className="text-[10px] uppercase tracking-[0.3em] opacity-80">{stones[active].finish}</div>
              <div className="font-display text-2xl mt-1">{stones[active].name}</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <ul className="divide-y divide-border border-y border-border">
            {stones.map((s, i) => (
              <li
                key={s.name}
                onMouseEnter={() => setActive(i)}
                data-cursor="hover"
                className="tex-row group flex items-center justify-between py-10 cursor-pointer transition-all"
              >
                <div>
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs text-muted-foreground tabular-nums">0{i + 1}</span>
                    <h3 className="font-display text-4xl md:text-5xl group-hover:translate-x-3 group-hover:italic transition-all duration-500">
                      {s.name}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-md text-muted-foreground pl-10">{s.note}</p>
                </div>
                <div className="hidden md:flex flex-col items-end text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  <span>{s.origin}</span>
                  <span className="mt-2">{s.finish}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
