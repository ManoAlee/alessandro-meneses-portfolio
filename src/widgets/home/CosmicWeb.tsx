import { useEffect, useRef, useState } from "react";

interface WebParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  zLayer: number; // 0 = background (slow, dim), 1 = foreground (fast, bright)
}

export function CosmicWeb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      });
    };

    const handleMouseLeave = () => {
      setMouse({ x: -1000, y: -1000, active: false });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Initialize 140 multi-layered particles
    const particles: WebParticle[] = [];
    const particleCount = 140;

    for (let i = 0; i < particleCount; i++) {
      const zLayer = Math.random() > 0.45 ? 1 : 0;
      const speedMult = zLayer === 1 ? 0.55 : 0.25;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speedMult,
        vy: (Math.random() - 0.5) * speedMult,
        size: zLayer === 1 ? Math.random() * 1.5 + 0.8 : Math.random() * 0.8 + 0.3,
        color: zLayer === 1 
          ? (Math.random() > 0.5 ? "rgba(56, 189, 248, 0.45)" : "rgba(168, 85, 247, 0.45)") // Cyan vs Purple
          : "rgba(99, 102, 241, 0.22)", // Dimmer Indigo background
        zLayer
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Locate the black hole center
      const bhCanvas = document.querySelector("canvas");
      let bhX: number | null = null;
      let bhY: number | null = null;
      const singularityRadius = 38;

      if (bhCanvas) {
        const bhRect = bhCanvas.getBoundingClientRect();
        const parentRect = canvas.getBoundingClientRect();
        bhX = bhRect.left - parentRect.left + bhRect.width / 2;
        bhY = bhRect.top - parentRect.top + bhRect.height / 2;
      }

      // 1. Draw Connecting Filaments with Einstein Gravitational Lensing
      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];

          // Connect only within the same depth layer to preserve 3D parallax feel
          if (p1.zLayer !== p2.zLayer) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = p1.zLayer === 1 ? 95 : 70;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (p1.zLayer === 1 ? 0.22 : 0.1);
            ctx.strokeStyle = p1.zLayer === 1 ? `rgba(99, 102, 241, ${alpha})` : `rgba(79, 70, 229, ${alpha})`;
            ctx.lineWidth = p1.zLayer === 1 ? 0.75 : 0.45;
            
            ctx.beginPath();
            const segments = 4; // Segment the line to allow curved relativistic bending
            for (let k = 0; k <= segments; k++) {
              const t = k / segments;
              let lx = p1.x + (p2.x - p1.x) * t;
              let ly = p1.y + (p2.y - p1.y) * t;

              // Warp line points near black hole singularity
              if (bhX !== null && bhY !== null) {
                const bdx = lx - bhX;
                const bdy = ly - bhY;
                const bd = Math.sqrt(bdx * bdx + bdy * bdy);
                if (bd > singularityRadius) {
                  const warpFactor = (singularityRadius * singularityRadius * 1.6) / bd;
                  const finalWarp = Math.min(warpFactor, bd - singularityRadius + 2);
                  lx -= (bdx / bd) * finalWarp;
                  ly -= (bdy / bd) * finalWarp;
                } else {
                  lx = bhX;
                  ly = bhY;
                }
              }

              if (k === 0) {
                ctx.moveTo(lx, ly);
              } else {
                ctx.lineTo(lx, ly);
              }
            }
            ctx.stroke();
          }
        }
      }

      // 2. Physics & Draw Stars
      particles.forEach((p) => {
        // Base coordinate velocity drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse gravity pull (subtle space warp on hover)
        if (mouse.active) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 120 && mdist > 5) {
            const pull = (1 - mdist / 120) * 0.08;
            p.x += (mdx / mdist) * pull;
            p.y += (mdy / mdist) * pull;
          }
        }

        // Singularity gravitational pull & event horizon suction
        if (bhX !== null && bhY !== null) {
          const dx = bhX - p.x;
          const dy = bhY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 220) {
            // Pull scale factors
            const pullForce = (220 - dist) * 0.0006;
            p.vx += (dx / dist) * pullForce;
            p.vy += (dy / dist) * pullForce;

            // Spiral orbital rotation velocity around event horizon
            const tx = -dy / dist;
            const ty = dx / dist;
            p.vx += tx * pullForce * 0.65;
            p.vy += ty * pullForce * 0.65;

            // Suction threshold: cross event horizon and respawn at borders
            if (dist < singularityRadius + 4) {
              p.x = Math.random() > 0.5 ? 0 : width;
              p.y = Math.random() * height;
              const speedMult = p.zLayer === 1 ? 0.55 : 0.25;
              p.vx = (Math.random() - 0.5) * speedMult;
              p.vy = (Math.random() - 0.5) * speedMult;
            }
          }
        }

        // Draw star
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouse]);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
