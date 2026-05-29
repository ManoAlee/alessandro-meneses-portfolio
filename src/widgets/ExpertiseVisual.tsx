import { useEffect, useRef, useState } from "react";
import { Cpu, Terminal, Layers, Box, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface SkillNode {
  id: string;
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  label: string;
  color: string;
  size: number;
  iconName: string;
}

interface Packet {
  connectionIndex: number;
  progress: number;
  speed: number;
  direction: 1 | -1;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export function ExpertiseVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000, active: false });
  const [nodes, setNodes] = useState<SkillNode[]>([
    { id: "core", x: 200, y: 200, homeX: 200, homeY: 200, vx: 0, vy: 0, label: "Core", color: "#10b981", size: 65, iconName: "cpu" },
    { id: "devops", x: 80, y: 120, homeX: 80, homeY: 120, vx: 0, vy: 0, label: "DevOps", color: "#3b82f6", size: 55, iconName: "terminal" },
    { id: "iac", x: 320, y: 130, homeX: 320, homeY: 130, vx: 0, vy: 0, label: "IaC", color: "#a855f7", size: 55, iconName: "layers" },
    { id: "docker", x: 100, y: 290, homeX: 100, homeY: 290, vx: 0, vy: 0, label: "Docker", color: "#06b6d4", size: 55, iconName: "box" },
    { id: "proxmox", x: 300, y: 290, homeX: 300, homeY: 290, vx: 0, vy: 0, label: "Proxmox", color: "#f97316", size: 55, iconName: "shield" },
    { id: "automation", x: 200, y: 70, homeX: 200, homeY: 70, vx: 0, vy: 0, label: "Automation", color: "#ec4899", size: 55, iconName: "zap" }
  ]);

  const shockwavesRef = useRef<Shockwave[]>([]);
  const nodesRef = useRef<SkillNode[]>([]);
  nodesRef.current = nodes;

  // Render Lucide icons dynamically
  const renderIcon = (name: string, color: string) => {
    const props = { className: "w-5 h-5 transition-transform group-hover:scale-110", style: { color } };
    switch (name) {
      case "cpu": return <Cpu {...props} className="w-6 h-6 text-emerald-400" />;
      case "terminal": return <Terminal {...props} />;
      case "layers": return <Layers {...props} />;
      case "box": return <Box {...props} />;
      case "shield": return <Shield {...props} />;
      case "zap": return <Zap {...props} />;
      default: return <Cpu {...props} />;
    }
  };

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

  // Node click triggers physical shockwave rippling outwards
  const handleNodeClick = (node: SkillNode) => {
    shockwavesRef.current.push({
      x: node.x,
      y: node.y,
      radius: 10,
      maxRadius: 180,
      alpha: 1
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = 400);
    const height = (canvas.height = 400);

    const connections = [
      [0, 1], // Core - DevOps
      [0, 2], // Core - IaC
      [0, 3], // Core - Docker
      [0, 4], // Core - Proxmox
      [0, 5], // Core - Automation
      [1, 5], // DevOps - Automation
      [2, 4], // IaC - Proxmox
      [1, 3]  // DevOps - Docker
    ];

    // Data packets travelling through the network connections
    const packets: Packet[] = connections.map(() => ({
      connectionIndex: Math.floor(Math.random() * connections.length),
      progress: Math.random(),
      speed: 0.008 + Math.random() * 0.008,
      direction: Math.random() > 0.5 ? 1 : -1
    }));

    const springStiffness = 0.035;
    const gravityForce = 0.35;
    const friction = 0.88;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const currentNodes = [...nodesRef.current];

      // 1. Draw Network Connections
      connections.forEach(([i1, i2], idx) => {
        const n1 = currentNodes[i1];
        const n2 = currentNodes[i2];
        if (!n1 || !n2) return;

        // Draw connections with fine gradient lines
        const grad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
        grad.addColorStop(0, n1.color + "1a");
        grad.addColorStop(0.5, "rgba(255, 255, 255, 0.06)");
        grad.addColorStop(1, n2.color + "1a");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();

        // Highlight connections under mouse hover
        if (mouse.active) {
          const d1 = Math.sqrt((mouse.x - n1.x) ** 2 + (mouse.y - n1.y) ** 2);
          const d2 = Math.sqrt((mouse.x - n2.x) ** 2 + (mouse.y - n2.y) ** 2);
          if (d1 < n1.size / 2 + 10 || d2 < n2.size / 2 + 10) {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
            ctx.lineWidth = 2.0;
            ctx.stroke();
          }
        }

        // Draw flowing data packets
        const p = packets[idx];
        if (p) {
          p.progress += p.speed * p.direction;
          if (p.progress > 1 || p.progress < 0) {
            p.direction = p.direction === 1 ? -1 : 1;
            p.progress = Math.max(0, Math.min(1, p.progress));
          }

          const px = n1.x + (n2.x - n1.x) * p.progress;
          const py = n1.y + (n2.y - n1.y) * p.progress;

          ctx.shadowBlur = 8;
          ctx.shadowColor = n1.color;
          ctx.fillStyle = n1.color;
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // Reset shadow
        }
      });

      // 2. Physics calculations for Nodes
      const updatedNodes = currentNodes.map((n, idx) => {
        // Floating wave drift
        const time = Date.now() * 0.0012;
        const waveX = Math.sin(time + idx) * 0.3;
        const waveY = Math.cos(time + idx * 1.4) * 0.3;

        let vx = n.vx + waveX;
        let vy = n.vy + waveY;

        // Hooke's Law spring force towards home target coordinates
        const ax = (n.homeX - n.x) * springStiffness;
        const ay = (n.homeY - n.y) * springStiffness;
        vx += ax;
        vy += ay;

        // Mouse gravity push
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120 && dist > 10) {
            const pull = (1 - dist / 120) * gravityForce;
            vx += (dx / dist) * pull;
            vy += (dy / dist) * pull;
          }
        }

        // Apply velocities & damping
        vx *= friction;
        vy *= friction;

        return {
          ...n,
          vx,
          vy,
          x: n.x + vx,
          y: n.y + vy
        };
      });

      // 3. Render and update shockwaves
      const shockwaves = shockwavesRef.current;
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const s = shockwaves[i];
        s.radius += 3.5;
        s.alpha = 1 - s.radius / s.maxRadius;

        ctx.strokeStyle = `rgba(16, 185, 129, ${s.alpha * 0.28})`;
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Shockwave ripples push nodes physically outwards
        updatedNodes.forEach((n) => {
          const dx = n.x - s.x;
          const dy = n.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(dist - s.radius) < 20 && dist > 5) {
            n.vx += (dx / dist) * 1.8;
            n.vy += (dy / dist) * 1.8;
          }
        });

        if (s.radius >= s.maxRadius) {
          shockwaves.splice(i, 1);
        }
      }

      // Commit coordinates to state so absolute-positioned React nodes follow canvas physics
      setNodes(updatedNodes);

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
      className="relative w-[400px] h-[400px] hidden lg:block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Space glow aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Network Canvas (Connections & Particles) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Interactive Absolute React Nodes */}
      {nodes.map((node) => {
        const isCenter = node.id === "core";
        
        return (
          <motion.div
            key={node.id}
            onClick={() => handleNodeClick(node)}
            className="absolute z-10 flex flex-col items-center justify-center rounded-full bg-zinc-950/80 backdrop-blur-xl border border-white/10 cursor-pointer shadow-xl select-none group transition-all duration-300"
            style={{
              width: node.size,
              height: node.size,
              left: node.x - node.size / 2,
              top: node.y - node.size / 2,
              boxShadow: `inset 0 0 15px rgba(255,255,255,0.03), 0 0 20px ${node.color}18`,
              borderColor: `${node.color}30`
            }}
            whileHover={{
              scale: 1.12,
              borderColor: node.color,
              boxShadow: `inset 0 0 15px rgba(255,255,255,0.05), 0 0 28px ${node.color}3f`
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Status Ping dot */}
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: node.color }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: node.color }}></span>
            </span>

            {/* Icon */}
            {renderIcon(node.iconName, node.color)}

            {/* Label inside node */}
            <span 
              className="text-[10px] font-mono mt-1 font-bold select-none tracking-wide text-white/90 group-hover:text-white"
              style={{ fontSize: isCenter ? "11px" : "9px" }}
            >
              {node.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
