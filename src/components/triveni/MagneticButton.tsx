import { useRef, type ReactNode, type MouseEvent } from "react";
import { gsap } from "gsap";

interface Props {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "ghost";
  className?: string;
}

export function MagneticButton({ children, href = "#", variant = "solid", className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.35, y: y * 0.45, duration: 0.5, ease: "power3.out" });
  };
  const handleLeave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  };

  const base = "magnetic inline-flex items-center gap-3 px-8 py-4 text-[11px] uppercase tracking-[0.32em] transition-colors";
  const styles =
    variant === "solid"
      ? "bg-foreground text-background hover:bg-accent hover:text-foreground"
      : "border border-foreground/40 text-foreground hover:bg-foreground hover:text-background";

  return (
    <a
      ref={ref}
      href={href}
      className={`${base} ${styles} ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <span>{children}</span>
      <span className="w-6 h-px bg-current" />
    </a>
  );
}
