import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import g from "@/assets/granite.jpg";
import m from "@/assets/marble.jpg";
import bath from "@/assets/bathroom.jpg";
import k from "@/assets/kitchen.jpg";
import s from "@/assets/staircase.jpg";
import bed from "@/assets/bedroom.jpg";
import t from "@/assets/texture1.jpg";

// Register layout plugins
gsap.registerPlugin(ScrollTrigger, Flip);

interface GalleryItem {
  id: string;
  src: string;
  tag: string;
  gridSpan: string;
  aspect: string;
}

// Added explicit unique IDs to track instances during animation flips
const all: GalleryItem[] = [
  { id: "img-1", src: g, tag: "Stone", gridSpan: "md:col-span-4", aspect: "aspect-[3/4]" },
  { id: "img-2", src: bath, tag: "Interior", gridSpan: "md:col-span-8", aspect: "aspect-[16/10]" },
  { id: "img-3", src: m, tag: "Stone", gridSpan: "md:col-span-5", aspect: "aspect-square" },
  { id: "img-4", src: k, tag: "Interior", gridSpan: "md:col-span-7", aspect: "aspect-[4/5]" },
  { id: "img-5", src: s, tag: "Architecture", gridSpan: "md:col-span-7", aspect: "aspect-[16/10]" },
  { id: "img-6", src: t, tag: "Texture", gridSpan: "md:col-span-5", aspect: "aspect-[4/3]" },
  { id: "img-7", src: bed, tag: "Interior", gridSpan: "md:col-span-4", aspect: "aspect-[3/4]" },
  { id: "img-8", src: g, tag: "Stone", gridSpan: "md:col-span-8", aspect: "aspect-[21/9]" },
];

const filters = ["All", "Stone", "Interior", "Architecture", "Texture"];

export function Gallery() {
  const root = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("All");

  // Initial Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-header", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      gsap.from(".g-item", {
        y: 60,
        opacity: 0,
        stagger: 0.05,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Handle Smooth Filter Animations via GSAP Flip
  const handleFilterChange = (newFilter: string) => {
    if (newFilter === filter) return;

    // 1. Capture the current layout state of all grid items
    const items = gridRef.current?.querySelectorAll(".g-item");
    const state = Flip.getState(items);

    // 2. Apply the React State modification instantly
    setFilter(newFilter);

    // 3. Let React finish a render tick, then animate smoothly from original positions
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.7,
        ease: "power3.inOut",
        stagger: 0.02,
        absolute: true, // Prevents items layout-popping mid-flight
        onEnter: (elements) => 
          gsap.fromTo(elements, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 }),
        onLeave: (elements) => 
          gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.4 }),
      });
    });
  };

  const displayedItems = filter === "All" ? all : all.filter((x) => x.tag === filter);

  return (
    <section 
      id="gallery" 
      ref={root} 
      className="relative bg-[#FBF9F6] text-[#1C1B19] py-28 md:py-44 overflow-hidden select-none"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-16">
        
        {/* Editorial Header Layout */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-20 md:mb-28">
          <div>
            <span className="gallery-header block text-[11px] uppercase tracking-[0.35em] text-[#8C7A65] font-semibold mb-4">
              — Studio Portfolios
            </span>
            <h2 className="gallery-header font-display text-5xl md:text-8xl font-light tracking-tight leading-none">
              From the <em className="font-serif italic font-normal text-[#8C7A65]">archive.</em>
            </h2>
          </div>
          
          {/* Minimalist Tab Selectors */}
          <div className="gallery-header flex flex-wrap gap-x-6 gap-y-3 border-b border-[#1C1B19]/10 pb-2 self-start md:self-end">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`relative py-1 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                  filter === f ? "text-[#8C7A65]" : "text-[#1C1B19]/40 hover:text-[#1C1B19]"
                }`}
              >
                {f}
                {filter === f && (
                  <div className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-[#8C7A65]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric 12-Column Grid instead of generic CSS columns */}
        <div 
          ref={gridRef} 
          className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-8 md:gap-y-12 items-start"
        >
          {displayedItems.map((it) => (
            <div
              key={it.id}
              className={`g-item relative group overflow-hidden cursor-pointer w-full bg-[#1C1B19]/5 ${it.gridSpan}`}
            >
              <div className={`${it.aspect} w-full overflow-hidden`}>
                <img
                  src={it.src}
                  alt={it.tag}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.8s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                />
              </div>

              {/* Minimalist Editorial Floating Metadata */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B19]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="absolute bottom-5 left-6 text-[#FBF9F6] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out flex items-center gap-3">
                <span className="text-[9px] font-mono tracking-widest border border-[#FBF9F6]/20 bg-[#FBF9F6]/10 px-2 py-0.5 backdrop-blur-sm">
                  {it.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}