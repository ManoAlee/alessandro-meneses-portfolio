import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export function AvatarVisual() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

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
  };

  const springConfig = { stiffness: 400, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-1, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-1, 1], [-8, 8]), springConfig);
  const shineX = useSpring(useTransform(x, [-1, 1], [0, 100]), springConfig);
  const shineY = useSpring(useTransform(y, [-1, 1], [0, 100]), springConfig);

  return (
    <div
      className="relative w-full max-w-sm mx-auto flex justify-center items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      {/* Subtle ambient glow — no pulse animation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10"
      >
        {/* Ground shadow */}
        <motion.div
          animate={{ scale: [1, 0.92, 1], opacity: [0.5, 0.35, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-36 h-3 bg-black/30 blur-xl rounded-[100%]"
        />

        {/* Glass avatar container */}
        <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full overflow-hidden border border-border/50 shadow-2xl bg-card ring-1 ring-border/30 group">
          {/* Light reflection on mouse move */}
          <motion.div
            className="absolute inset-0 z-10 opacity-40 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"
            style={{
              background: useTransform(
                [shineX, shineY],
                ([sx, sy]) =>
                  `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 65%)`
              ),
            }}
          />
          <motion.img
            src="/hero-avatar.png"
            alt="Alessandro Meneses"
            className="relative z-20 w-full h-full object-cover scale-110"
            style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.4))" }}
          />
          {/* Subtle top glare */}
          <div className="absolute inset-0 z-30 bg-gradient-to-br from-white/8 to-transparent pointer-events-none" />
        </div>

        {/* Floating badge — Available */}
        <motion.div
          className="absolute -right-6 top-10 z-20 flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-1.5 shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            x: useTransform(x, (v) => v * -8),
            y: useTransform(y, (v) => v * -4),
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs font-semibold">Disponível</span>
        </motion.div>

        {/* Floating badge — Location */}
        <motion.div
          className="absolute -left-6 bottom-10 z-20 rounded-full border border-border bg-card/90 px-4 py-1.5 shadow-lg backdrop-blur-sm flex items-center gap-2"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          style={{
            x: useTransform(x, (v) => v * -12),
            y: useTransform(y, (v) => v * -6),
          }}
        >
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">BASE:</span>
          <span className="text-xs font-bold text-foreground">Piedade · SP</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
