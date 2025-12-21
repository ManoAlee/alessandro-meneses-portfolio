import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useGame } from "../context/GameContext";
import { useTour } from "../hooks/useTour";
import { Play, Square, SkipForward } from "lucide-react";

export default function AvatarGuide() {
  const { scrollY } = useScroll();
  const { isGameStarted } = useGame();
  const { isPlaying, currentStep, startTour, stopTour, nextStep, totalSteps, currentStepIndex } = useTour();

  const [isVisible, setIsVisible] = useState(false);
  const [localMessage, setLocalMessage] = useState("Olá! 👋");

  // Mouse tracking logic
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isGameStarted) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - (window.innerWidth - 80)) / 50;
      const y = (e.clientY - (window.innerHeight - 80)) / 50;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isGameStarted]);

  useEffect(() => {
    if (!isGameStarted) return;

    // Default Scroll Spy logic (Only active if NOT in Tour Mode)
    if (!isPlaying) {
      const unsubscribe = scrollY.on("change", (latest) => {
        const shouldShow = latest > 600;
        if (shouldShow !== isVisible) setIsVisible(shouldShow);

        if (latest > 3200) setLocalMessage("Vamos conversar? 📬");
        else if (latest > 2500) setLocalMessage("Minha Formação 🎓");
        else if (latest > 1800) setLocalMessage("Meus Projetos 💻");
        else if (latest > 1200) setLocalMessage("Minhas Skills ⚡");
        else if (latest > 600) setLocalMessage("Experiência 💼");
      });
      return unsubscribe;
    } else {
      // In Tour Mode, always visible
      setIsVisible(true);
    }
  }, [scrollY, isVisible, isGameStarted, isPlaying]);

  if (!isGameStarted) return null;

  // Determining active message
  const displayMessage = isPlaying ? currentStep.message : localMessage;

  return (
    <>
      {/* Stage Spotlight Effect (Darken Background during Tour) */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-30 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{
          opacity: isVisible || isPlaying ? 1 : 0,
          y: isVisible || isPlaying ? 0 : 50,
          scale: isVisible || isPlaying ? 1 : 0.8
        }}
        transition={{ duration: 0.5 }}
        className={`fixed bottom-6 right-6 z-50 flex items-end gap-4 pointer-events-none md:pointer-events-auto ${isPlaying ? 'flex-col-reverse items-center right-1/2 translate-x-1/2 bottom-[10%]' : ''}`}
      >
        {/* Controls (Only Visible in Tour Mode or Hover) */}
        <div className="flex gap-2 pointer-events-auto">
          {!isPlaying && isVisible && (
            <button
              onClick={startTour}
              className="bg-primary/20 hover:bg-primary/40 text-primary p-2 rounded-full border border-primary/50 backdrop-blur transition-all shadow-lg"
              title="Iniciar Apresentação"
            >
              <Play size={16} fill="currentColor" />
            </button>
          )}

          {isPlaying && (
            <div className="flex gap-2 bg-black/50 p-2 rounded-full border border-white/10 backdrop-blur">
              <button onClick={stopTour} className="p-2 hover:text-red-400 text-white transition-colors"><Square size={16} fill="currentColor" /></button>
              <button onClick={nextStep} className="p-2 hover:text-primary text-white transition-colors"><SkipForward size={16} /></button>
              <span className="text-xs font-mono text-slate-400 flex items-center px-2">
                {currentStepIndex + 1}/{totalSteps}
              </span>
            </div>
          )}
        </div>

        {/* Speech Bubble - Holographic Design */}
        <motion.div
          layout
          key={displayMessage}
          initial={{ opacity: 0, x: 20, scale: 0.9, filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          className={`backdrop-blur-xl bg-black/60 border border-cyan-500/30 text-cyan-50 text-sm font-light py-4 px-6 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] mb-4 hidden md:block max-w-[280px]
                ${isPlaying ? 'text-center border-b-2 border-b-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'rounded-tr-none'}
            `}
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <span className="relative z-10 drop-shadow-md">{displayMessage}</span>
        </motion.div>

        {/* Avatar Circle */}
        <motion.div
          layout
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => !isPlaying && window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`rounded-full border-4 border-primary/50 bg-black overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.5)] cursor-pointer relative transition-all duration-700
                ${isPlaying ? 'w-32 h-32 border-primary shadow-[0_0_50px_rgba(6,182,212,0.8)]' : 'w-16 h-16'}
            `}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent z-10" />

          {/* Active Scanline */}
          <motion.div
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] z-20 pointer-events-none opacity-70"
          />

          {/* Tech Ring Overlay */}
          <div className="absolute inset-0 border border-primary/40 rounded-full z-20 pointer-events-none" />

          <motion.img
            src="/avatar.png"
            alt="System Assistant"
            className="w-full h-full object-cover"
            animate={{
              x: isPlaying ? 0 : mousePos.x * 0.5,
              y: isPlaying ? 0 : mousePos.y * 0.5
            }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
