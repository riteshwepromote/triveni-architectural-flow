import { useEffect, useState } from "react";

const items = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Collections", href: "#collections" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "py-3 backdrop-blur-xl bg-background/70 border-b border-border/60"
          : "py-6 bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12">
        <a href="#home" className="font-display text-2xl tracking-tight">
          Triveni<span className="text-accent">.</span>
        </a>
        <ul className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.28em]">
          {items.map((it) => (
            <li key={it.href}>
              <a href={it.href} className="story-link relative hover:opacity-100 opacity-70 transition">
                {it.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 border border-foreground/30 px-5 py-2 text-[11px] uppercase tracking-[0.28em] hover:bg-foreground hover:text-background transition"
        >
          Visit Studio
        </a>
        <button
          aria-label="Menu"
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block h-px w-7 bg-foreground transition ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block h-px w-7 bg-foreground transition ${open ? "-rotate-45 -translate-y-[1px]" : ""}`} />
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-background border-t border-border px-6 py-6">
          <ul className="flex flex-col gap-5 text-sm uppercase tracking-[0.28em]">
            {items.map((it) => (
              <li key={it.href}>
                <a href={it.href} onClick={() => setOpen(false)}>{it.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
