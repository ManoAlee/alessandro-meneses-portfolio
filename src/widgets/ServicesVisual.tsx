import { motion, useTime, useTransform } from "framer-motion";

export function ServicesVisual() {
  const time = useTime();
  const rotate1 = useTransform(time, [0, 10000], [0, 360], { clamp: false });
  const rotate2 = useTransform(time, [0, 15000], [360, 0], { clamp: false });
  const rotate3 = useTransform(time, [0, 20000], [0, 360], { clamp: false });

  return (
    <div className="relative flex justify-center items-center h-[400px] w-[400px] perspective-1000">
      {/* Core Sphere - Recursive Depth */}
      <div className="relative flex justify-center items-center">
         
         {/* Layer 1: Outer Orbital */}
         <motion.div 
           style={{ rotate: rotate1 }}
           className="absolute w-80 h-80 rounded-full border border-dashed border-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.1)]"
         >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary/20 rounded-full blur-sm" />
         </motion.div>

         {/* Layer 2: Middle Orbital (Inverse Rotation) */}
         <motion.div 
           style={{ rotate: rotate2 }}
           className="absolute w-60 h-60 rounded-full border-[1px] border-cyan-500/30"
         >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_var(--cyan-400)]" />
         </motion.div>

         {/* Layer 3: Inner Orbital */}
         <motion.div 
           style={{ rotate: rotate3 }}
           className="absolute w-40 h-40 rounded-full border border-dotted border-purple-500/40"
         />

         {/* Center: Holographic Core */}
         <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-20 h-20 bg-gradient-to-tr from-primary via-cyan-500 to-purple-600 rounded-xl blur-xl opacity-50"
         />
         
         {/* Floating Glass Cube (Recursive Element) */}
         <motion.div 
            className="absolute z-20 w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl"
            animate={{ 
                rotateX: [0, 180, 360], 
                rotateY: [0, 180, 360],
                y: [0, -20, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
         >
             <div className="w-8 h-8 bg-white/10 rounded-lg border border-white/30 backdrop-blur-sm" />
         </motion.div>
      </div>

      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}
