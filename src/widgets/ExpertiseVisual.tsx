import { useEffect, useRef, useState } from "react";

interface SkillNode {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  label: string;
  color: string;
  size: number;
}

export function ExpertiseVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    });
  };

  const handleMouseLeave = () => {
    setMouse({ x: -1000, y: -1000, active: false });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = 400);
    const height = (canvas.height = 400);

    // Initial node positioning
    const nodes: SkillNode[] = [
      { x: 200, y: 200, homeX: 200, homeY: 200, vx: 0, vy: 0, label: "Core", color: "#10b981", size: 30 }, // Central Hub
      { x: 100, y: 100, homeX: 100, homeY: 100, vx: 0, vy: 0, label: "DevOps", color: "#3b82f6", size: 24 },
      { x: 300, y: 120, homeX: 300, homeY: 120, vx: 0, vy: 0, label: "IaC", color: "#a855f7", size: 24 },
      { x: 90, y: 300, homeX: 90, homeY: 300, vx: 0, vy: 0, label: "Docker", color: "#06b6d4", size: 24 },
      { x: 290, y: 290, homeX: 290, homeY: 290, vx: 0, vy: 0, label: "Proxmox", color: "#f97316", size: 24 },
      { x: 210, y: 80, homeX: 210, homeY: 80, vx: 0, vy: 0, label: "Automation", color: "#ec4899", size: 24 }
    ];

    // Define connection lines between node indices
    const connections = [
      [0, 1], // Core - DevOps
      [0, 2], // Core - IaC
      [0, 3], // Core - Docker
      [0, 4], // Core - Proxmox
      [0, 5], // Core - Automation
      [1, 3], // DevOps - Docker
      [2, 4], // IaC - Proxmox
      [1, 5]  // DevOps - Automation
    ];

    const springStiffness = 0.03;
    const gravityForce = 0.45;
    const friction = 0.88;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Network Connections
      connections.forEach(([i1, i2]) => {
        const n1 = nodes[i1];
        const n2 = nodes[i2];

        // Draw connections with glowing cyan/emerald gradients
        const grad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
        grad.addColorStop(0, n1.color + "22");
        grad.addColorStop(0.5, "rgba(255, 255, 255, 0.15)");
        grad.addColorStop(1, n2.color + "22");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();

        // Mouse hover highlighting connections
        if (mouse.active) {
          const d1 = Math.sqrt((mouse.x - n1.x) ** 2 + (mouse.y - n1.y) ** 2);
          const d2 = Math.sqrt((mouse.x - n2.x) ** 2 + (mouse.y - n2.y) ** 2);
          if (d1 < n1.size + 15 || d2 < n2.size + 15) {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
            ctx.lineWidth = 2.5;
            ctx.stroke();
          }
        }
      });

      // 2. Physics & Node Rendering
      nodes.forEach((n, idx) => {
        // Floating motion offset
        const time = Date.now() * 0.001;
        const waveX = Math.sin(time + idx) * 0.35;
        const waveY = Math.cos(time + idx * 1.5) * 0.35;

        n.vx += waveX;
        n.vy += waveY;

        // Spring back force to default home coordinates
        const ax = (n.homeX - n.x) * springStiffness;
        const ay = (n.homeY - n.y) * springStiffness;
        n.vx += ax;
        n.vy += ay;

        // Mouse gravity pull
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            // Stronger pull when cursor is closer
            const pull = (1 - dist / 130) * gravityForce;
            n.vx += (dx / dist) * pull;
            n.vy += (dy / dist) * pull;
          }
        }

        // Apply friction and position updates
        n.vx *= friction;
        n.vy *= friction;
        n.x += n.vx;
        n.y += n.vy;

        // Draw Nodes Glow
        const isCenter = idx === 0;
        ctx.shadowBlur = mouse.active && Math.sqrt((mouse.x - n.x) ** 2 + (mouse.y - n.y) ** 2) < n.size + 20 ? 25 : 12;
        ctx.shadowColor = n.color;

        // Node Circle Background
        ctx.fillStyle = "#0c0c0e";
        ctx.strokeStyle = n.color;
        ctx.lineWidth = isCenter ? 3 : 2;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0; // Reset glow

        // Node Label
        ctx.fillStyle = "#ffffff";
        ctx.font = isCenter ? "bold 11px monospace" : "10px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, n.x, n.y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouse]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-lg mx-auto lg:max-w-none lg:mx-0 hidden lg:block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 rounded-2xl border border-white/5 bg-zinc-950/20 backdrop-blur-md p-4">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
