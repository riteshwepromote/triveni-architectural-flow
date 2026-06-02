import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";

export function Contact() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-h .reveal-line", {
        yPercent: 110, stagger: 0.1, duration: 1.4, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from(".contact-fade", {
        y: 30, opacity: 0, stagger: 0.1, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={root} className="relative bg-charcoal text-bone py-32 md:py-48 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <span className="contact-fade text-[10px] uppercase tracking-[0.4em] text-bone/50">— Visit the studio</span>
        <h2 className="contact-h font-display text-bone leading-[0.95] text-[14vw] md:text-[10vw] mt-6">
          <span className="block reveal-mask"><span className="reveal-line block">Let's compose</span></span>
          <span className="block reveal-mask"><span className="reveal-line block italic text-sand">something quiet.</span></span>
        </h2>

        <div className="mt-20 grid md:grid-cols-12 gap-10 md:gap-16">
          <form className="contact-fade md:col-span-7 space-y-10">
            {[
              { l: "Your name", t: "text" },
              { l: "Email", t: "email" },
              { l: "Project type", t: "text" },
            ].map((f) => (
              <label key={f.l} className="block relative group">
                <span className="absolute left-0 top-0 text-bone/40 text-sm uppercase tracking-[0.3em] group-focus-within:-translate-y-4 group-focus-within:text-xs transition-transform pointer-events-none">
                  {f.l}
                </span>
                <input
                  type={f.t}
                  className="w-full bg-transparent border-b border-bone/20 pt-6 pb-3 text-lg text-bone outline-none focus:border-bone transition"
                />
              </label>
            ))}
            <label className="block relative group">
              <span className="absolute left-0 top-0 text-bone/40 text-sm uppercase tracking-[0.3em] group-focus-within:-translate-y-4 group-focus-within:text-xs transition-transform pointer-events-none">
                Tell us about the space
              </span>
              <textarea
                rows={3}
                className="w-full bg-transparent border-b border-bone/20 pt-6 pb-3 text-lg text-bone outline-none focus:border-bone transition resize-none"
              />
            </label>
            <div className="pt-4">
              <MagneticButton variant="solid" className="bg-bone text-charcoal">
                Send Enquiry
              </MagneticButton>
            </div>
          </form>

          <div className="contact-fade md:col-span-4 md:col-start-9 space-y-12 text-bone/70">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-bone/40 mb-3">Studio</div>
              <p className="font-display text-2xl text-bone">14 Lavelle Road,<br />Bengaluru 560001</p>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-bone/40 mb-3">Contact</div>
              <p>+91 80 4500 0000<br />studio@triveni.co</p>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-bone/40 mb-3">Hours</div>
              <p>Tue — Sat<br />11:00 — 19:00 IST</p>
            </div>

            <div className="aspect-[4/3] w-full border border-bone/15 bg-bone/[0.03] relative overflow-hidden">
              <div className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: "linear-gradient(var(--bone) 1px, transparent 1px), linear-gradient(90deg, var(--bone) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-sand rounded-full">
                <span className="absolute inset-0 rounded-full bg-sand animate-ping" />
              </div>
              <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.3em] text-bone/50">
                12.972°N · 77.595°E
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
