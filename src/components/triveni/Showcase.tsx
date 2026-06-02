import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bath from "@/assets/bathroom.jpg";
import kitchen from "@/assets/kitchen.jpg";
import stair from "@/assets/staircase.jpg";
import bedroom from "@/assets/bedroom.jpg";
import granite from "@/assets/granite.jpg";

const panels = [
  { tag: "I", title: "Atelier Bath", img: bath, body: "Travertine carved as a single gesture." },
  { tag: "II", title: "Granite Kitchen", img: kitchen, body: "A monolithic island, polished to a mirror." },
  { tag: "III", title: "Stone Staircase", img: stair, body: "Ascending light, in cut limestone." },
  { tag: "IV", title: "Quiet Bedroom", img: bedroom, body: "Stone as a horizon line behind sleep." },
  { tag: "V", title: "Slab Study", img: granite, body: "The drawing inside the stone." },
];

export function Showcase() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".showcase-panel");
      if (!track.current) return;
      const total = track.current.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: -total,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${total}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      sections.forEach((s) => {
        const img = s.querySelector("img");
        if (img) {
          gsap.fromTo(img, { scale: 1.15 }, {
            scale: 1, ease: "none",
            scrollTrigger: { trigger: s, containerAnimation: ScrollTrigger.getAll()[0], start: "left right", end: "right left", scrub: true },
          });
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="experience" className="relative bg-charcoal text-bone overflow-hidden">
      <div className="absolute top-0 inset-x-0 z-10 flex justify-between px-6 md:px-12 py-10 text-[10px] uppercase tracking-[0.4em] text-bone/50 pointer-events-none">
        <span>— Immersive Showcase</span>
        <span>Scroll horizontally</span>
      </div>
      <div ref={track} className="flex h-screen will-change-transform">
        <div className="showcase-intro flex-shrink-0 w-screen h-screen flex items-center px-6 md:px-24">
          <h2 className="font-display text-bone text-[14vw] md:text-[10vw] leading-[0.9]">
            Lived-in<br /><em className="text-sand">surfaces.</em>
          </h2>
        </div>
        {panels.map((p) => (
          <div key={p.tag} className="showcase-panel flex-shrink-0 w-[85vw] md:w-[60vw] h-screen flex items-center px-6 md:px-12">
            <div className="relative w-full h-[70vh] overflow-hidden">
              <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
                <span className="text-[10px] uppercase tracking-[0.4em] text-bone/70">{p.tag}</span>
                <div>
                  <h3 className="font-display text-4xl md:text-6xl">{p.title}</h3>
                  <p className="mt-3 max-w-sm text-bone/70">{p.body}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex-shrink-0 w-[40vw] h-screen" />
      </div>
    </section>
  );
}
