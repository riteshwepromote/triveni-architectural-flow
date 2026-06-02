import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        yPercent: 110,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.12,
        delay: 0.3,
      });
      gsap.from(".hero-meta", { opacity: 0, y: 20, duration: 1, delay: 1.4, stagger: 0.1 });
      gsap.from(".hero-cta", { opacity: 0, y: 30, duration: 1, delay: 1.7, stagger: 0.1 });

      // parallax + slow zoom
      gsap.to(imgRef.current, {
        scale: 1.18,
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-content", {
        yPercent: -40,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={root} className="relative h-[100svh] w-full overflow-hidden bg-charcoal text-bone">
      <img
        ref={imgRef}
        src={heroImg}
        alt="Polished black granite interior, lit from above"
        className="absolute inset-0 h-full w-full object-cover scale-105"
      />
      <div className="absolute inset-0 vignette" />
      <div className="absolute inset-0 bg-charcoal/30" />

      {/* top meta */}
      <div className="absolute top-28 inset-x-0 z-10 flex justify-between px-6 md:px-12 text-[10px] uppercase tracking-[0.35em] text-bone/60">
        <span className="hero-meta">Est. 2008 — Bengaluru</span>
        <span className="hero-meta hidden md:block">Vol. 01 / Studio Catalogue</span>
      </div>

      <div className="hero-content relative z-10 flex h-full flex-col justify-end px-6 md:px-12 pb-24 md:pb-32">
        <div className="hero-meta text-[10px] uppercase tracking-[0.4em] text-bone/70 mb-8">
          ▌ The Granite Studio
        </div>

        <h1 className="font-display text-bone leading-[0.95] text-[11vw] md:text-[8.4vw]">
          <span className="block reveal-mask"><span className="hero-line block">Great design</span></span>
          <span className="block reveal-mask"><span className="hero-line block italic text-sand">begins with the</span></span>
          <span className="block reveal-mask"><span className="hero-line block">right foundation.</span></span>
        </h1>

        <div className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <p className="hero-meta max-w-md text-sm md:text-base text-bone/70 leading-relaxed">
            Premium granite, marble and luxury surfaces — curated, crafted and laid by hand for the homes of those who notice detail.
          </p>
          <div className="hero-cta flex flex-wrap gap-4">
            <MagneticButton href="#collections" variant="solid" className="bg-bone text-charcoal">
              Explore Collection
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost" className="border-bone/40 text-bone hover:bg-bone hover:text-charcoal">
              Visit Studio
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-bone/60">
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <div className="scroll-hint relative h-12 w-px bg-bone/15" />
      </div>
    </section>
  );
}
