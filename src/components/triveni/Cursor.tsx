import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dot = ref.current;
    if (!dot) return;
    const xTo = gsap.quickTo(dot, "x", { duration: 0.5, ease: "expo.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.5, ease: "expo.out" });
    const move = (e: MouseEvent) => { xTo(e.clientX); yTo(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor='hover']")) dot.classList.add("hover");
      else dot.classList.remove("hover");
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);
  return <div ref={ref} className="cursor-dot hidden md:block" />;
}
