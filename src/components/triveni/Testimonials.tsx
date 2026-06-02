import { useEffect, useState } from "react";

const quotes = [
  {
    q: "Triveni did not sell us stone. They composed a home, slab by slab. The result feels older than the house itself.",
    n: "Anaïs & Dev Mehra",
    p: "Residence, Koramangala",
  },
  {
    q: "A studio that listens. The kitchen island they cut for us is the quietest object in the room — and the most alive.",
    n: "Architect Riya Kapoor",
    p: "Kapoor Atelier",
  },
  {
    q: "Patient, exacting, and a little obsessive about light. Exactly the people you want touching the stone in your bathroom.",
    n: "Vikram Shenoy",
    p: "Private Collector",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % quotes.length), 7000);
    return () => clearInterval(t);
  }, []);
  const cur = quotes[i];

  return (
    <section className="relative bg-background text-foreground py-32 md:py-48 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 md:px-12 text-center">
        <div className="font-display text-[20vw] md:text-[16rem] leading-[0.7] text-stone-warm/15 select-none -mb-12 md:-mb-24">
          “
        </div>
        <div key={i} className="animate-fade-in">
          <p className="font-display text-3xl md:text-5xl leading-[1.2] italic max-w-3xl mx-auto">
            {cur.q}
          </p>
          <div className="mt-12 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            {cur.n} <span className="mx-3 text-foreground/30">/</span> {cur.p}
          </div>
        </div>

        <div className="mt-16 flex justify-center gap-3">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-px transition-all ${idx === i ? "w-12 bg-foreground" : "w-6 bg-foreground/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
