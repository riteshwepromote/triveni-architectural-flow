import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap"; // Fixed: Imported from core 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import granite from "@/assets/granite.jpg";
import marble from "@/assets/marble.jpg";
import texture from "@/assets/texture1.jpg";

gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

interface StoneItem {
  name: string;
  origin: string;
  finish: string;
  img: string;
  note: string;
  rarity: "Exclusive" | "Limited" | "Signature";
  thickness: string;
}

const stones: StoneItem[] = [
  { 
    name: "Noir Doré", 
    origin: "Espirito Santo, Brazil", 
    finish: "Polished", 
    img: granite, 
    note: "Volcanic black quartzite embedded with deep, fractured veins of oxidised gold.",
    rarity: "Exclusive",
    thickness: "20mm / 30mm"
  },
  { 
    name: "Bianco Sereno", 
    origin: "Carrara, Italy", 
    finish: "Honed", 
    img: marble, 
    note: "A quiet, architectural white marble threaded with cool, structural grey shadows.",
    rarity: "Signature",
    thickness: "20mm"
  },
  { 
    name: "Travertino Sole", 
    origin: "Tivoli, Italy", 
    finish: "Brushed & Unfilled", 
    img: texture, 
    note: "Sun-warmed organic beige travertine with an open, deeply tactile hand-finished surface.",
    rarity: "Limited",
    thickness: "30mm"
  },
];

export function Textures() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header elements smoothly
      gsap.from(".library-header", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      // Animate the list rows up as they enter viewport
      gsap.from(".tex-row", {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: { 
          trigger: ".material-list-container", 
          start: "top 85%" 
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={root} 
      className="relative bg-[#FBF9F6] text-[#1C1B19] py-28 md:py-48 overflow-hidden select-none"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12">
        
        {/* Left Interactive Column (Sticky Showcase) */}
        <div className="md:col-span-5 md:sticky md:top-24 self-start flex flex-col justify-between h-auto md:h-[calc(100vh-12rem)]">
          <div>
            <span className="library-header block text-[11px] uppercase tracking-[0.35em] text-[#8C7A65] font-semibold">
              — Material Library
            </span>
            <h2 className="library-header font-display text-5xl md:text-7xl font-light tracking-tight leading-[0.95] mt-5">
              Touch the <br />
              <em className="font-serif italic font-normal text-[#8C7A65]">stone.</em>
            </h2>
            <p className="library-header mt-6 text-sm md:text-base text-[#1C1B19]/60 max-w-sm leading-relaxed">
              Hover any stone profile to inspect its character. Every single slab in our gallery is tracked live — what you view is the exact raw material allocated to your build.
            </p>
          </div>

          {/* Premium Interactive Media Display */}
          <div className="library-header mt-12 md:mt-0 relative aspect-[4/5] w-full max-w-sm overflow-hidden bg-[#1C1B19]/5 shadow-2xl group/frame">
            {stones.map((s, i) => (
              <div
                key={s.name}
                className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  clipPath: i === active ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 0, 0 0, 0 100%, 0 100%)",
                  zIndex: i === active ? 10 : 0
                }}
              >
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  className={`h-full w-full object-cover transition-transform duration-[2000ms] ease-out ${
                    i === active ? "scale-100" : "scale-110"
                  } group-hover/frame:scale-105`}
                />
              </div>
            ))}
            
            {/* Elegant overlay card details inside frame */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#1C1B19]/60 via-[#1C1B19]/20 to-transparent z-20 flex justify-between items-end text-[#FBF9F6]">
              <div>
                <span className="text-[9px] font-mono tracking-widest uppercase opacity-80">{stones[active].origin}</span>
                <h4 className="font-display text-xl tracking-wide mt-0.5">{stones[active].name}</h4>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest border border-[#FBF9F6]/30 px-2 py-1 bg-[#FBF9F6]/10 backdrop-blur-sm">
                {stones[active].rarity}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Architectural Spec Sheets */}
        <div className="md:col-span-6 md:col-start-7 material-list-container self-end">
          <ul className="divide-y divide-[#1C1B19]/10 border-y border-[#1C1B19]/10">
            {stones.map((s, i) => (
              <li
                key={s.name}
                onMouseEnter={() => setActive(i)}
                className="tex-row group relative grid grid-cols-12 gap-x-4 py-12 cursor-pointer transition-colors duration-300"
              >
                {/* Visual indicator bar that lines up with active choice */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 w-[2px] bg-[#8C7A65] origin-bottom transition-transform duration-500 ${
                    i === active ? "scale-y-100" : "scale-y-0"
                  }`} 
                />

                {/* Left Block: Index & Title Descriptive Parameters */}
                <div className="col-span-12 md:col-span-8 pl-4 md:pl-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] font-mono text-[#1C1B19]/30 tracking-wider">0{i + 1}</span>
                    <h3 className="font-display text-4xl md:text-5xl font-light tracking-tight text-[#1C1B19] transition-all duration-500 group-hover:translate-x-2 group-hover:text-[#8C7A65]">
                      {s.name}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-[#1C1B19]/50 max-w-sm md:max-w-md leading-relaxed ml-7 transition-colors duration-300 group-hover:text-[#1C1B19]/80">
                    {s.note}
                  </p>
                </div>

                {/* Right Block: Expanded Architectural Metrics */}
                <div className="col-span-12 md:col-span-4 mt-6 md:mt-0 flex md:flex-col justify-between md:justify-start items-center md:items-end gap-y-2 ml-7 md:ml-0 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1C1B19]/40">
                  <div className="text-right flex flex-col items-start md:items-end">
                    <span className="text-[#1C1B19]/70 transition-colors duration-300 group-hover:text-[#1C1B19]">{s.origin}</span>
                    <span className="font-normal lowercase text-[#1C1B19]/40 tracking-normal mt-0.5 group-hover:text-[#8C7A65] transition-colors font-mono">{s.thickness}</span>
                  </div>
                  <span className="md:mt-auto border border-[#1C1B19]/10 px-2 py-0.5 rounded-none font-normal tracking-widest text-[#1C1B19]/60 bg-[#1C1B19]/[0.02]">
                    {s.finish}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}