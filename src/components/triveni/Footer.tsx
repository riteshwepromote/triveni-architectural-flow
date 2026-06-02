import { FaInstagram, FaPinterestP, FaLinkedinIn } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="relative bg-charcoal text-bone overflow-hidden border-t border-bone/10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 pt-24 pb-10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="font-display text-3xl">Triveni<span className="text-sand">.</span></div>
            <p className="mt-6 text-bone/60 max-w-sm">
              The Granite Studio. A patient practice of stone, light and architecture.
            </p>
          </div>
          <div className="md:col-span-3 md:col-start-7">
            <div className="text-[10px] uppercase tracking-[0.4em] text-bone/40 mb-4">Navigate</div>
            <ul className="space-y-3">
              {["About", "Collections", "Experience", "Gallery", "Contact"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="story-link text-bone/80 hover:text-bone">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.4em] text-bone/40 mb-4">Elsewhere</div>
            <div className="flex gap-4">
              {[FaInstagram, FaPinterestP, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#" className="w-11 h-11 grid place-items-center border border-bone/20 hover:bg-bone hover:text-charcoal transition">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 overflow-hidden">
          <div className="font-display text-[18vw] md:text-[14vw] leading-[0.85] text-bone/10 select-none whitespace-nowrap">
            TRIVENI · STONE
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-bone/10 flex flex-col md:flex-row justify-between gap-3 text-[10px] uppercase tracking-[0.3em] text-bone/40">
          <span>© {new Date().getFullYear()} Triveni Studio — All surfaces reserved.</span>
          <span>Crafted with intent.</span>
        </div>
      </div>
    </footer>
  );
}
