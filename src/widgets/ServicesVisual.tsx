import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";

export function ServicesVisual() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse coordinates mapped to 3D tilt angles
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 18 };
  const rotateX = useSpring(useTransform(y, [-1, 1], [25, -25]), springConfig);
  const rotateY = useSpring(useTransform(x, [-1, 1], [-25, 25]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div 
      className="relative flex justify-center items-center h-[400px] w-[400px] perspective-1000 cursor-grab active:cursor-grabbing"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Background Glow */}
      <motion.div 
        animate={{ 
          scale: isHovered ? 1.2 : 1.0,
          opacity: isHovered ? 0.3 : 0.15 
        }}
        className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full pointer-events-none transition-all duration-500" 
      />

      {/* 3D Rotating Interactive Hologram */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative flex justify-center items-center w-full h-full"
      >
        {/* Ring 1: Outer Orbital (Rotates dynamically) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ 
            duration: isHovered ? 6 : 14, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ transform: "translateZ(-40px)" }}
          className="absolute w-80 h-80 rounded-full border border-dashed border-primary/20 flex items-center justify-center"
        >
          {/* Orbital Satellite */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_var(--primary)]" />
        </motion.div>

        {/* Ring 2: Middle Orbital (Inverse Rotation) */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ 
            duration: isHovered ? 8 : 18, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ transform: "translateZ(0px)" }}
          className="absolute w-60 h-60 rounded-full border border-cyan-500/20"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3.5 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee]" />
        </motion.div>

        {/* Ring 3: Inner Orbital */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ 
            duration: isHovered ? 5 : 12, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ transform: "translateZ(40px)" }}
          className="absolute w-40 h-40 rounded-full border border-dotted border-purple-500/30"
        >
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]" />
        </motion.div>

        {/* Core Pulsing Sphere */}
        <motion.div 
          animate={{ 
            scale: isHovered ? [1, 1.25, 1] : [1, 1.1, 1],
            opacity: isHovered ? [0.6, 0.9, 0.6] : [0.4, 0.6, 0.4] 
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(-10px)" }}
          className="absolute w-24 h-24 bg-gradient-to-tr from-primary via-cyan-500 to-purple-600 rounded-full blur-xl"
        />
        
        {/* Floating Glass Isometric Cube */}
        <motion.div 
          className="absolute w-20 h-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl origin-center"
          style={{ transform: "translateZ(80px)" }}
          animate={{ 
            rotateX: [0, 180, 360], 
            rotateY: [0, 180, 360],
            y: [0, -15, 0]
          }}
          transition={{ 
            rotateX: { duration: 15, repeat: Infinity, ease: "linear" },
            rotateY: { duration: 15, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{ scale: 1.15, border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <div className="w-7 h-7 bg-gradient-to-br from-primary/30 to-cyan-500/30 rounded-lg border border-white/20" />
        </motion.div>
      </motion.div>
    </div>
  );
}
