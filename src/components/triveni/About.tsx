import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import founder from "@/assets/founder.jpg";

export function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-img-mask", {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from(".about-img", {
        scale: 1.4,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from(".about-stagger", {
        y: 40, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative bg-background text-foreground py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 grid md:grid-cols-12 gap-10 md:gap-20 items-center">
        <div className="md:col-span-5">
          <div className="about-img-mask overflow-hidden">
            <img
              src={founder}
              alt="Triveni studio founder"
              loading="lazy"
              width={1200}
              height={1600}
              className="about-img w-full h-[70vh] object-cover"
            />
          </div>
          <div className="about-stagger mt-4 flex justify-between text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            <span>— Rohan Triveni</span>
            <span>Founder · Curator</span>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <span className="about-stagger inline-block text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-8">
            ⌁ About the Studio
          </span>
          <h2 className="about-stagger font-display text-5xl md:text-7xl leading-[1.02]">
            Stone, considered <em className="text-stone-warm">slowly.</em>
          </h2>
          <p className="about-stagger mt-10 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
            For sixteen years Triveni has worked at the quiet intersection of architecture and material. Each slab is hand-picked from quarries across Rajasthan, Italy and Brazil — chosen not for fashion, but for the way it lives with light.
          </p>
          <p className="about-stagger mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
            We are a studio first, a supplier second. From the first sketch to the final polish, every surface carries the steady hand of our master craftsmen.
          </p>

          <div className="about-stagger mt-14 grid grid-cols-3 gap-8 border-t border-border pt-10">
            {[
              ["16+", "Years of practice"],
              ["340", "Homes finished"],
              ["27", "Quarries sourced"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-4xl md:text-5xl">{n}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
