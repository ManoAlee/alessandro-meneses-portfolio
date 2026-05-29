import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Particle {
  angle: number;
  radius: number;
  speed: number;
  pullSpeed: number;
  size: number;
  color: string;
  z: number; // Used for 3D depth layering
}

export function AvatarVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mouse move handler for tilt & gravitational center pull
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center normalized (-1 to 1)
    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);
    x.set(normX);
    y.set(normY);

    // Dispatch gravity pull event for text/elements on the page
    window.dispatchEvent(new CustomEvent('blackhole-move', { detail: { x: normX, y: normY } }));

    // Dispatch cursor gravity event (pulling the cursor dot to center)
    const distance = Math.sqrt(normX * normX + normY * normY);
    const strength = Math.max(0, 1 - distance);
    window.dispatchEvent(new CustomEvent('cursor-gravity', { 
      detail: { 
        x: centerX + window.scrollX, 
        y: centerY + window.scrollY, 
        active: true,
        strength: strength
      } 
    }));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    
    // Reset page elements gravity
    window.dispatchEvent(new CustomEvent('blackhole-leave'));
    // Reset cursor gravity
    window.dispatchEvent(new CustomEvent('cursor-gravity', { detail: { active: false } }));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    window.dispatchEvent(new CustomEvent('blackhole-hover'));
  };

  // Parallax Tilt Configuration (Physics-based springs)
  const springConfig = { stiffness: 300, damping: 25 };
  const rotateX = useSpring(useTransform(y, [-1, 1], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-1, 1], [-15, 15]), springConfig);

  // Black Hole simulation animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = 400);
    let height = (canvas.height = 400);

    // Particle pool setup
    const particles: Particle[] = [];
    const particleCount = 350;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 150 + 35;
      const isOrange = Math.random() > 0.4; // Mix of accretion disk colors
      const hue = isOrange ? 15 + Math.random() * 25 : 210 + Math.random() * 40; // Orange/Gold vs Cyan/Indigo
      const saturation = 90 + Math.random() * 10;
      const lightness = isOrange ? 50 + Math.random() * 20 : 60 + Math.random() * 20;

      particles.push({
        angle,
        radius,
        speed: (0.015 + Math.random() * 0.02) * (40 / radius), // Faster rotation closer to center
        pullSpeed: 0.15 + Math.random() * 0.2,
        size: Math.random() * 1.5 + 0.5,
        color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        z: Math.random() * 2 - 1 // 3D depth layers
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + x.get() * 15; // Singularity shifts slightly with mouse
      const centerY = height / 2 + y.get() * 15;
      const singularityRadius = 38;

      // 1. Draw Background Gravitational Lens Distortion / Space Glow
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        singularityRadius,
        centerX,
        centerY,
        singularityRadius * 3.5
      );
      glowGrad.addColorStop(0, "rgba(249, 115, 22, 0.15)"); // Orange core accretion boundary
      glowGrad.addColorStop(0.3, "rgba(99, 102, 241, 0.08)"); // Indigo mid layer
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, singularityRadius * 4, 0, Math.PI * 2);
      ctx.fill();

      // 2. Sort particles by Z and Angle to render background accretion disk (behind event horizon)
      // We render particles behind first (those moving away)
      particles.forEach((p) => {
        // Update physics
        p.angle += p.speed;
        p.radius -= p.pullSpeed;

        // Gravity pull/respawn
        if (p.radius < singularityRadius - 4) {
          p.radius = Math.random() * 80 + 130; // Respawn at outer boundary
          p.angle = Math.random() * Math.PI * 2;
          p.speed = (0.015 + Math.random() * 0.02) * (40 / p.radius);
        }

        // Calculate 3D circular coordinates
        // Warp coordinates to simulate Einstein Lensing ring bending behind singularity
        const rawX = Math.cos(p.angle) * p.radius;
        let rawY = Math.sin(p.angle) * p.radius * 0.28; // Accretion disk flat profile

        // Relativistic bending: warp Y coordinate upwards/downwards around horizon
        const distToCenter = Math.sqrt(rawX * rawX + rawY * rawY);
        if (distToCenter < singularityRadius * 2.2) {
          const bendFactor = (singularityRadius * 2.2 - distToCenter) * 0.35;
          // Warp particles behind singularity to show above/below it
          if (p.angle > Math.PI && p.angle < Math.PI * 2) {
            rawY -= bendFactor;
          } else {
            rawY += bendFactor;
          }
        }

        const partX = centerX + rawX;
        const partY = centerY + rawY;

        // Render particles that are in background (behind horizon)
        const isBehind = p.angle > Math.PI && p.angle < Math.PI * 2;
        if (isBehind) {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(partX, partY, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 3. Render Singularity & Photon Ring boundary (Einstein ring glow)
      // Outer photon boundary ring
      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(249, 115, 22, 0.8)";
      ctx.strokeStyle = "rgba(255, 140, 0, 0.4)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, singularityRadius + 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow

      // The Singularity (Event Horizon) - Pure pitch black
      ctx.fillStyle = "#020203";
      ctx.beginPath();
      ctx.arc(centerX, centerY, singularityRadius, 0, Math.PI * 2);
      ctx.fill();

      // 4. Render foreground accretion disk particles (crossing in front of event horizon)
      particles.forEach((p) => {
        const rawX = Math.cos(p.angle) * p.radius;
        let rawY = Math.sin(p.angle) * p.radius * 0.28;

        const distToCenter = Math.sqrt(rawX * rawX + rawY * rawY);
        if (distToCenter < singularityRadius * 2.2) {
          const bendFactor = (singularityRadius * 2.2 - distToCenter) * 0.35;
          if (p.angle > Math.PI && p.angle < Math.PI * 2) {
            rawY -= bendFactor;
          } else {
            rawY += bendFactor;
          }
        }

        const partX = centerX + rawX;
        const partY = centerY + rawY;

        const isForeground = !(p.angle > Math.PI && p.angle < Math.PI * 2);
        if (isForeground) {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(partX, partY, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 5. Bright relativistic jet reflection line
      const lineGrad = ctx.createLinearGradient(centerX - 100, centerY, centerX + 100, centerY);
      lineGrad.addColorStop(0, "rgba(255,140,0,0)");
      lineGrad.addColorStop(0.3, "rgba(255,200,50,0.4)");
      lineGrad.addColorStop(0.5, "rgba(255,255,255,0.7)");
      lineGrad.addColorStop(0.7, "rgba(255,200,50,0.4)");
      lineGrad.addColorStop(1, "rgba(255,140,0,0)");
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX - 120, centerY);
      ctx.lineTo(centerX + 120, centerY);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [x, y]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-lg mx-auto lg:max-w-none lg:mx-0 flex justify-center items-center perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Background Cosmic Gas Glow */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" 
      />
      
      {/* Container - Floating Idle */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 flex items-center justify-center"
      >
        {/* Einstein Ring external dust */}
        <div className="absolute inset-[-15px] rounded-full bg-gradient-to-tr from-orange-500/10 via-transparent to-indigo-500/10 blur-xl animate-spin-slow opacity-60 pointer-events-none" />
        
        {/* Dynamic gravity center shadow mapping */}
        <motion.div 
           animate={{ scale: [1, 0.85, 1], opacity: [0.5, 0.3, 0.5] }}
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-3 bg-black/50 blur-xl rounded-[100%] pointer-events-none"
        />

        {/* 3D Glass Container enclosing the black hole */}
        <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md bg-zinc-950/80 ring-1 ring-white/10 group transition-colors duration-500 flex items-center justify-center">
             
             {/* Dynamic Canvas Simulation */}
             <canvas 
               ref={canvasRef}
               className="w-full h-full object-contain"
             />
             
             {/* Curved Lens Flare reflections */}
             <div className="absolute inset-0 z-30 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-40 pointer-events-none" />
             <div className="absolute top-0 right-0 z-30 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent opacity-20 pointer-events-none" />
        </div>

        {/* Floating Badge - Available for Work */}
        <motion.div 
            className="absolute -right-8 top-12 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-background/80 px-4 py-2 shadow-xl backdrop-blur-xl animate-float"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            style={{ 
              x: useTransform(x, val => val * -12), 
              y: useTransform(y, val => val * -6) 
            }}
        >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wide">Available for Work</span>
        </motion.div>

      </motion.div>
    </div>
  );
}
