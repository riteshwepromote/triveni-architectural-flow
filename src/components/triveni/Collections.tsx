import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import granite from "@/assets/granite.jpg";
import marble from "@/assets/marble.jpg";
import kitchen from "@/assets/kitchen.jpg";
import bathroom from "@/assets/bathroom.jpg";
import staircase from "@/assets/staircase.jpg";
import texture from "@/assets/texture1.jpg";

const items = [
  { id: "01", name: "Granite", origin: "Brazil · India", img: granite, span: "md:col-span-5 md:row-span-2" },
  { id: "02", name: "Marble", origin: "Carrara, Italy", img: marble, span: "md:col-span-4" },
  { id: "03", name: "Texture Finishes", origin: "Studio Collection", img: texture, span: "md:col-span-3" },
  { id: "04", name: "Bathroom Concepts", origin: "Suite Series", img: bathroom, span: "md:col-span-4" },
  { id: "05", name: "Kitchen Concepts", origin: "Atelier Series", img: kitchen, span: "md:col-span-5" },
  { id: "06", name: "Staircase & Tiles", origin: "Architectural", img: staircase, span: "md:col-span-3" },
];

export function Collections() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".col-card").forEach((card) => {
        const img = card.querySelector("img");
        gsap.from(card, {
          y: 80, opacity: 0, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
        if (img) {
          gsap.to(img, {
            yPercent: -12, ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="collections" ref={root} className="relative bg-background text-foreground py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-20">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">— Catalogue 01</span>
            <h2 className="font-display text-5xl md:text-7xl leading-[1.02] mt-4">
              Featured <em className="text-stone-warm">collections.</em>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Six families of surfaces, each shaped by a different geography and temperament. Hover to enter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[28vh] gap-4 md:gap-6">
          {items.map((it) => (
            <a
              key={it.id}
              href="#experience"
              data-cursor="hover"
              className={`col-card group relative overflow-hidden bg-muted ${it.span}`}
            >
              <img
                src={it.img}
                alt={it.name}
                loading="lazy"
                className="absolute inset-0 h-[120%] w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent transition-opacity duration-700 opacity-90 group-hover:opacity-70" />
              <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8 text-bone">
                <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] opacity-80">
                  <span>{it.id}</span>
                  <span>{it.origin}</span>
                </div>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                    {it.name}
                  </h3>
                  <div className="mt-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="w-8 h-px bg-current" /> View Series
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
