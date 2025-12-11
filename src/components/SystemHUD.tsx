import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SystemHUD() {
  const [time, setTime] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    // Clock
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('pt-BR', { hour12: false }));
    }, 1000);

    // Mouse Tracker
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    // Scroll Tracker
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScroll(Math.round(scrolled));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden hidden md:block">
      {/* Scanlines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-[101]" />
      
      {/* Top Left: System Bio */}
      <div className="absolute top-8 left-8 text-[10px] font-mono text-primary/60 tracking-widest uppercase">
        <div>SYS.VER: 2.5.0-RC</div>
        <div>USR: ANONYMOUS</div>
        <div>NET: CONNECTED_SECURE</div>
        <div className="mt-2 text-white animate-pulse">PRESS [CTRL+K] FOR CMD</div>
      </div>

      {/* Top Right: Clock */}
      <div className="absolute top-8 right-8 text-xs font-mono text-primary font-bold">
        [{time}]
      </div>

      {/* Bottom Left: Coords */}
      <div className="absolute bottom-8 left-8 text-[10px] font-mono text-slate-500">
        <div>POS: X:{coords.x} Y:{coords.y}</div>
        <div>MEM: OPTIMIZED</div>
      </div>

      {/* Bottom Right: Scroll */}
      <div className="absolute bottom-8 right-8 text-[10px] font-mono text-primary flex items-center gap-2">
        <span>SCROLL_DEPTH</span>
        <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
             <div className="h-full bg-primary transition-all duration-100 ease-linear" style={{ width: `${scroll}%` }} />
        </div>
        <span>{scroll}%</span>
      </div>

      {/* Crosshairs */}
      <div className="absolute top-1/2 left-8 w-2 h-2 border-l border-t border-white/20" />
      <div className="absolute top-1/2 right-8 w-2 h-2 border-r border-t border-white/20" />
      <div className="absolute bottom-8 left-1/2 w-2 h-2 border-l border-b border-white/20" />

      {/* Custom Cursor Circle Interaction */}
      <motion.div
        className="fixed w-8 h-8 rounded-full border border-primary/50 mix-blend-exclusion pointer-events-none z-[102]"
        animate={{ x: coords.x - 16, y: coords.y - 16 }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      <div 
        className="fixed w-1 h-1 bg-white rounded-full mix-blend-exclusion pointer-events-none z-[102]"
        style={{ left: coords.x, top: coords.y }}
      />
    </div>
  );
}
