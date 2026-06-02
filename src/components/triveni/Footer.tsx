import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaPinterestP, FaLinkedinIn } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const textMarqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textMarqueeRef.current) {
        gsap.fromTo(
          textMarqueeRef.current,
          { xPercent: -5 },
          {
            xPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="relative bg-[#161514] text-[#FBF9F6] overflow-hidden border-t border-[#FBF9F6]/10 select-none"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-16 pt-28 pb-12">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12">
          
          {/* Brand Vision Block */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="font-display text-4xl font-light tracking-wide text-[#FBF9F6]">
                Triveni<span className="text-[#D4C3B3]">.</span>
              </div>
              {/* Increased from /50 to /80 for high-contrast paragraph readability */}
              <p className="mt-6 text-sm text-[#FBF9F6]/80 max-w-sm leading-relaxed tracking-wide font-normal">
                The Granite Studio. A patient, highly structural practice of processing natural stone, mastering raw architectural light, and crafting monumental compositions.
              </p>
            </div>
          </div>

          {/* Directory Links Layout */}
          <div className="md:col-span-3 md:col-start-7">
            {/* Switched header to high-contrast warm sand gold */}
            <div className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-[#D4C3B3] mb-6">
              Navigation
            </div>
            <ul className="space-y-4">
              {["About", "Collections", "Experience", "Gallery", "Contact"].map((l) => (
                <li key={l}>
                  <a 
                    href={`#${l.toLowerCase()}`} 
                    className="group relative inline-block text-sm text-[#FBF9F6]/80 transition-colors duration-300 hover:text-[#FBF9F6] tracking-wide font-medium"
                  >
                    {l}
                    {/* Glowing underline marker */}
                    <span className="absolute bottom-[-2px] left-0 right-0 h-[1px] bg-[#D4C3B3] scale-x-0 origin-left transition-transform duration-400 ease-out group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / External Connections */}
          <div className="md:col-span-3">
            <div className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-[#D4C3B3] mb-6">
              Elsewhere
            </div>
            <div className="flex gap-3">
              {[
                { Icon: FaInstagram, url: "#" },
                { Icon: FaPinterestP, url: "#" },
                { Icon: FaLinkedinIn, url: "#" }
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.url} 
                  className="w-12 h-12 grid place-items-center border border-[#FBF9F6]/20 text-[#FBF9F6]/80 rounded-none bg-transparent transition-all duration-500 ease-out hover:border-[#D4C3B3] hover:bg-[#D4C3B3] hover:text-[#161514]"
                >
                  <item.Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Cinematic Parallax Text Wrap */}
        <div className="mt-28 md:mt-36 overflow-hidden w-full select-none pointer-events-none border-b border-[#FBF9F6]/5 pb-4">
          {/* Lifted opacity from 0.02 to 0.04 so it acts as a subtle structural watermark instead of being completely invisible */}
          <div 
            ref={textMarqueeRef}
            className="font-display text-[16vw] md:text-[13vw] font-light leading-[0.8] text-bone tracking-tighter whitespace-nowrap will-change-transform"
          >
            TRIVENI · STUDIO · TRIVENI · STUDIO
          </div>
        </div>

        {/* Footer Meta Credits */}
        {/* Switched text opacity from /30 to /50 for clean legal text visibility */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-y-4 text-[10px] font-mono uppercase tracking-[0.25em] text-[#FBF9F6]/50">
          <span>
            © {new Date().getFullYear()} Triveni Studio — All surfaces reserved.
          </span>
          <span className="flex items-center gap-2 text-[#D4C3B3] tracking-widest font-bold">
            Crafted with intent.
          </span>
        </div>

      </div>
    </footer>
  );
}