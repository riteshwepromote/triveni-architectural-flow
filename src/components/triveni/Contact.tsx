import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

interface FormState {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Precise line reveal for headings without text clipping bounds
      gsap.from(".contact-h .reveal-line", {
        yPercent: 105,
        stagger: 0.12,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: { 
          trigger: root.current, 
          start: "top 78%" 
        },
      });

      // Staggered layout cells opacity tracking up smoothly
      gsap.from(".contact-fade", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: { 
          trigger: root.current, 
          start: "top 72%" 
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const handleInputChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section 
      id="contact" 
      ref={root} 
      className="relative bg-[#F4F0EA] text-[#1C1B19] py-28 md:py-44 overflow-hidden select-none"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-16">
        
        {/* Top Header Tagline */}
        <span className="contact-fade block text-[11px] uppercase tracking-[0.35em] text-[#705E49] font-bold">
          — Contact / Studio Appointment
        </span>
        
        <h2 className="contact-h font-display text-[#1C1B19] leading-[0.95] text-[11vw] md:text-[8.5vw] mt-6 tracking-tight">
          <span className="block overflow-hidden pb-1">
            <span className="reveal-line block font-light">Let's compose</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="reveal-line block italic font-serif font-normal text-[#705E49]">
              something quiet.
            </span>
          </span>
        </h2>

        {/* 12-Column Layout */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-16 items-start">
          
          {/* Interactive Dynamic Form Block */}
          <form 
            onSubmit={(e) => e.preventDefault()} 
            className="contact-fade md:col-span-7 space-y-12"
          >
            {[
              { id: "name", label: "Your name", type: "text", val: form.name },
              { id: "email", label: "Email address", type: "email", val: form.email },
              { id: "projectType", label: "Project profile / Material criteria", type: "text", val: form.projectType },
            ].map((f) => (
              <label key={f.id} className="block relative group cursor-text">
                <span 
                  className={`absolute left-0 text-sm uppercase tracking-[0.25em] duration-300 ease-out pointer-events-none transition-all ${
                    f.val || "group-focus-within:-translate-y-6 group-focus-within:text-[11px]" 
                      ? "-translate-y-6 text-[11px] text-[#705E49] font-bold" 
                      : "translate-y-1 text-[#1C1B19]/40 font-medium"
                  }`}
                >
                  {f.label}
                </span>
                <input
                  type={f.type}
                  value={f.val}
                  onChange={(e) => handleInputChange(f.id as keyof FormState, e.target.value)}
                  className="w-full bg-transparent border-b border-[#1C1B19]/15 pt-1 pb-3 text-base text-[#1C1B19] outline-none transition-colors duration-300 focus:border-[#705E49] font-normal"
                />
              </label>
            ))}

            {/* Floating Label Textarea Block */}
            <label className="block relative group cursor-text">
              <span 
                className={`absolute left-0 text-sm uppercase tracking-[0.25em] duration-300 ease-out pointer-events-none transition-all ${
                  form.message || "group-focus-within:-translate-y-6 group-focus-within:text-[11px]" 
                    ? "-translate-y-6 text-[11px] text-[#705E49] font-bold" 
                    : "translate-y-1 text-[#1C1B19]/40 font-medium"
                }`}
              >
                Tell us about the structural space
              </span>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="w-full bg-transparent border-b border-[#1C1B19]/15 pt-1 pb-3 text-base text-[#1C1B19] outline-none transition-colors duration-300 focus:border-[#705E49] font-normal resize-none"
              />
            </label>

            <div className="pt-6">
              <MagneticButton 
                variant="solid" 
                className="bg-[#1C1B19] text-[#F4F0EA] px-8 py-4 font-bold tracking-wider rounded-none text-xs uppercase hover:bg-[#705E49] hover:text-[#F4F0EA] transition-colors duration-500"
              >
                Send Enquiry
              </MagneticButton>
            </div>
          </form>

          {/* Right Column: Studio Coordinates & Dynamic Minimal Map */}
          <div className="contact-fade md:col-span-4 md:col-start-9 space-y-12 text-[#1C1B19]/70 text-sm">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#705E49] mb-3 font-bold">Studio Address</div>
              <p className="font-display text-2xl text-[#1C1B19] font-light leading-snug">
                14 Lavelle Road,<br />Bengaluru 560001
              </p>
            </div>
            
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#705E49] mb-3 font-bold">Inquiries</div>
              <p className="leading-relaxed tracking-wide font-medium text-[#1C1B19]/90">
                +91 80 4500 0000<br />
                <span className="text-[#705E49] hover:underline cursor-pointer font-semibold">studio@triveni.co</span>
              </p>
            </div>
            
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#705E49] mb-3 font-bold">Studio Hours</div>
              <p className="leading-relaxed tracking-wide font-medium">
                Tue — Sat<br />11:00 — 19:00 IST
              </p>
            </div>

            {/* Asymmetric Map Plotter Grid Panel */}
            <div className="aspect-[4/3] w-full border border-[#1C1B19]/10 bg-[#1C1B19]/[0.02] relative overflow-hidden group/map shadow-xl">
              <div 
                className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover/map:opacity-35"
                style={{
                  backgroundImage: "linear-gradient(#1C1B19 1px, transparent 1px), linear-gradient(90deg, #1C1B19 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }} 
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#705E49] rounded-full">
                <span className="absolute inset-0 rounded-full bg-[#705E49] animate-ping opacity-75" />
              </div>
              <div className="absolute bottom-4 left-4 text-[10px] font-mono tracking-widest text-[#1C1B19]/50 font-medium">
                12.972°N · 77.595°E
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}