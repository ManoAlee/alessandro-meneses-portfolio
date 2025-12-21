import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function AvatarVisual() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mouse move handler for Parallax & Lighting
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center normalized (-1 to 1)
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Parallax Tilt Configuration (Physics-based springs)
  const springConfig = { stiffness: 400, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-1, 1], [10, -10]), springConfig); // Inverted Y for natural tilt
  const rotateY = useSpring(useTransform(x, [-1, 1], [-10, 10]), springConfig);
  
  // Lighting Effect - Dynamic Gradient Position
  const shineX = useSpring(useTransform(x, [-1, 1], [0, 100]), springConfig);
  const shineY = useSpring(useTransform(y, [-1, 1], [0, 100]), springConfig);

  return (
    <div 
      className="relative w-full max-w-lg mx-auto lg:max-w-none lg:mx-0 flex justify-center items-center perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Glow - Breathing Pulse */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" 
      />
      
      {/* Main Container - Floating Animation (Idle) */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10"
      >
        {/* Rotating Energy Ring */}
        <div className="absolute inset-[-10px] rounded-full bg-gradient-to-tr from-primary/30 via-transparent to-blue-500/30 blur-md animate-spin-slow opacity-50" />
        
        {/* Dynamic Shadow (Expands when avatar floats up) */}
        <motion.div 
           animate={{ scale: [1, 0.9, 1], opacity: [0.6, 0.4, 0.6] }}
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-40 h-4 bg-black/40 blur-xl rounded-[100%]"
        />

        {/* 3D Glass Container - Adaptive Theme Style */}
        <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full overflow-hidden border border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md bg-white/30 dark:bg-zinc-950 ring-1 ring-white/20 dark:ring-white/10 group transition-colors duration-500">
             
             {/* Internal Background (Adaptive: Cloud-White for Light, Cosmic-Dark for Dark) */}
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-100/50 via-white/50 to-transparent dark:from-indigo-900/40 dark:via-zinc-950 dark:to-zinc-950 opacity-80 transition-colors duration-500" />

             {/* Internal Lighting (Follows Mouse) */}
             <motion.div 
               className="absolute inset-0 z-10 opacity-50 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"
               style={{
                 background: useTransform(
                   [shineX, shineY], 
                   ([sx, sy]) => `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)`
                 )
               }}
             />

             {/* The Avatar Image */}
             <motion.img 
               src="/hero-avatar.png" 
               alt="Alessandro Meneses" 
               className="relative z-20 w-full h-full object-cover scale-110 transition-transform duration-700"
               style={{
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
               }}
             />
             
             {/* Glass Reflections */}
             <div className="absolute inset-0 z-30 bg-gradient-to-tr from-white/10 to-transparent opacity-40 pointer-events-none" />
             <div className="absolute top-0 right-0 z-30 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-30 pointer-events-none" />
        </div>

        {/* Floating Badge - "Status" (Spring Physics Delay) */}
        <motion.div 
            className="absolute -right-8 top-12 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-background/80 px-4 py-2 shadow-xl backdrop-blur-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            style={{ 
              x: useTransform(x, x => x * -10), 
              y: useTransform(y, y => y * -5) 
            }}
        >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wide">Available for Work</span>
        </motion.div>

        {/* Floating Badge - "Role" (Spring Physics Delay) */}
        <motion.div 
            className="absolute -left-8 bottom-12 z-20 rounded-full border border-white/20 bg-background/80 px-5 py-2 shadow-xl backdrop-blur-xl flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            style={{ 
              x: useTransform(x, x => x * -15), 
              y: useTransform(y, y => y * -8) 
            }}
        >
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">ROLE:</span>
            <span className="text-xs font-extrabold text-primary tracking-wide">DEVOPS ARCHITECT</span>
        </motion.div>

      </motion.div>
    </div>
  );
}
