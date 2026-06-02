import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(".loader-count", { textContent: 100, duration: 1.8, ease: "power2.out", snap: { textContent: 1 } }, 0)
      .to(".loader-bar", { scaleX: 1, duration: 1.8, ease: "power2.out" }, 0)
      .to(ref.current, { yPercent: -100, duration: 1.2, ease: "expo.inOut", delay: 0.2 });
  }, []);
  return (
    <div ref={ref} className="fixed inset-0 z-[200] bg-charcoal text-bone flex flex-col justify-between p-6 md:p-10">
      <div className="flex justify-between text-[10px] uppercase tracking-[0.4em] text-bone/60">
        <span>Triveni</span>
        <span>The Granite Studio</span>
      </div>
      <div>
        <div className="font-display text-[18vw] md:text-[10vw] leading-none">
          <span className="loader-count">0</span><span className="text-sand">/</span>100
        </div>
        <div className="mt-6 h-px w-full bg-bone/15 overflow-hidden">
          <div className="loader-bar h-px w-full bg-bone origin-left scale-x-0" />
        </div>
      </div>
    </div>
  );
}
