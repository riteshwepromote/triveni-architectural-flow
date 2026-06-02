import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const v = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setP(v);
    };
    window.addEventListener("scroll", on);
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 h-[2px] bg-foreground/5 z-[60]">
      <div className="h-full bg-foreground origin-left" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}
