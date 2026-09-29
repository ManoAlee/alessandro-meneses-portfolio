import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, RotateCcw, Crosshair, Trophy, Shield, Heart } from "lucide-react";

// Web Audio API Retro Sound Effects
class GameAudio {
  private ctx: AudioContext | null = null;
  public enabled = true;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
  }

  playShoot() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.08);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.08);
    } catch {}
  }

  playJump() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(400, t + 0.12);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.12);
    } catch {}
  }

  playExplosion() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, t);
      filter.frequency.exponentialRampToValueAtTime(100, t + 0.15);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(t);
    } catch {}
  }
}

const audio = new GameAudio();

interface Enemy {
  x: number;
  y: number;
  type: "bug" | "server" | "glitch";
  speed: number;
  hp: number;
  size: number;
}

interface Bullet {
  x: number;
  y: number;
  dir: 1 | -1;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
}

interface MetalSlugGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MetalSlugGameModal({ isOpen, onClose }: MetalSlugGameModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [highScore, setHighScore] = useState(0);

  // Character sprite image
  const spriteRef = useRef<HTMLImageElement | null>(null);

  // Game control inputs
  const keys = useRef<Record<string, boolean>>({});

  // Reset and restart game
  const startGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setGameOver(false);
  }, []);

  // Lock page scrolling while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Keyboard events with preventDefault to eliminate background scrolling
  useEffect(() => {
    if (!isOpen) return;

    const GAME_KEYS = [
      "Space", 
      "ArrowUp", 
      "ArrowDown", 
      "ArrowLeft", 
      "ArrowRight", 
      "KeyW", 
      "KeyS", 
      "KeyA", 
      "KeyD", 
      "KeyJ", 
      "KeyF", 
      "KeyZ"
    ];

    const onKeyDown = (e: KeyboardEvent) => {
      if (GAME_KEYS.includes(e.code)) {
        e.preventDefault();
      }
      keys.current[e.code] = true;
      if (e.code === "Escape") onClose();
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (GAME_KEYS.includes(e.code)) {
        e.preventDefault();
      }
      keys.current[e.code] = false;
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [isOpen, onClose]);

  // Main Canvas Game Loop
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load sprite
    if (!spriteRef.current) {
      const img = new Image();
      img.src = "/images/tactical-avatar.png";
      spriteRef.current = img;
    }

    // Set fixed virtual resolution for authentic retro arcade look
    const W = 640;
    const H = 360;
    canvas.width = W;
    canvas.height = H;

    // Player state
    let px = 80;
    let py = 0; // vertical offset from floor
    let vy = 0;
    let pDir: 1 | -1 = 1;
    let isShooting = false;
    let shootCooldown = 0;
    let currentLives = 3;
    let currentScore = 0;

    let enemies: Enemy[] = [];
    let bullets: Bullet[] = [];
    let particles: Particle[] = [];
    let spawnTimer = 0;

    let animId: number;

    const floorY = H - 55;

    const loop = () => {
      animId = requestAnimationFrame(loop);

      // --- 1. Player Physics & Controls ---
      if (currentLives > 0) {
        if (keys.current["KeyA"] || keys.current["ArrowLeft"]) {
          px = Math.max(20, px - 4.5);
          pDir = -1;
        }
        if (keys.current["KeyD"] || keys.current["ArrowRight"]) {
          px = Math.min(W - 70, px + 4.5);
          pDir = 1;
        }

        // Jump: W, ArrowUp, KeyK
        if ((keys.current["KeyW"] || keys.current["ArrowUp"] || keys.current["KeyK"]) && py === 0) {
          vy = 13;
          audio.playJump();
        }

        // Shoot: Space, J, F, Z, X, Enter
        if (shootCooldown > 0) shootCooldown--;
        const wantsToShoot = keys.current["Space"] || keys.current["KeyJ"] || keys.current["KeyF"] || keys.current["KeyZ"] || keys.current["KeyX"] || keys.current["Enter"];
        if (wantsToShoot && shootCooldown <= 0) {
          isShooting = true;
          shootCooldown = 8; // responsive rate of fire
          audio.playShoot();
          bullets.push({
            x: pDir === 1 ? px + 52 : px - 12,
            y: floorY - py - 30,
            dir: pDir,
          });
        } else if (!wantsToShoot) {
          isShooting = false;
        }
      }

      // Gravity
      py += vy;
      vy -= 0.85;
      if (py <= 0) {
        py = 0;
        vy = 0;
      }

      // --- 2. Update Bullets ---
      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.x += b.dir * 18;
        if (b.x < -20 || b.x > W + 20) {
          bullets.splice(i, 1);
        }
      }

      // --- 3. Spawn & Update Enemies ---
      spawnTimer++;
      if (spawnTimer > 55 && currentLives > 0) {
        spawnTimer = 0;
        const types: ("bug" | "server" | "glitch")[] = ["bug", "server", "glitch"];
        const type = types[Math.floor(Math.random() * types.length)];
        const size = type === "server" ? 34 : 26;
        enemies.push({
          x: W + 20,
          y: type === "server" ? floorY - 50 : type === "glitch" ? floorY - 42 : floorY - 32,
          type,
          speed: 1.4 + Math.random() * 1.5,
          hp: type === "server" ? 2 : 1,
          size,
        });
      }

      for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        e.x -= e.speed;

        // Collision with bullets (Generous AABB box detection with hit margin)
        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          const bW = 20;
          const bH = 10;
          
          const hitX = (b.x + bW >= e.x - 6) && (b.x <= e.x + e.size + 6);
          const hitY = Math.abs((b.y + bH / 2) - (e.y + e.size / 2)) <= (e.size / 2 + 16);

          if (hitX && hitY) {
            e.hp--;
            bullets.splice(j, 1);

            // Sparks
            for (let k = 0; k < 6; k++) {
              particles.push({
                x: e.x + e.size / 2,
                y: e.y + e.size / 2,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                color: "#f59e0b",
                life: 18,
              });
            }

            if (e.hp <= 0) {
              audio.playExplosion();
              currentScore += e.type === "server" ? 300 : e.type === "glitch" ? 200 : 100;
              setScore(currentScore);

              // Death explosion
              for (let k = 0; k < 16; k++) {
                particles.push({
                  x: e.x + e.size / 2,
                  y: e.y + e.size / 2,
                  vx: (Math.random() - 0.5) * 9,
                  vy: (Math.random() - 0.5) * 9,
                  color: e.type === "bug" ? "#22c55e" : e.type === "server" ? "#ef4444" : "#a855f7",
                  life: 26,
                });
              }
              enemies.splice(i, 1);
              break;
            }
          }
        }

        // Collision with player
        if (
          currentLives > 0 &&
          e.x < px + 40 &&
          e.x + e.size > px + 10 &&
          e.y < floorY - py &&
          e.y + e.size > floorY - py - 50
        ) {
          currentLives--;
          setLives(currentLives);
          audio.playExplosion();
          enemies.splice(i, 1);

          if (currentLives <= 0) {
            setGameOver(true);
            setHighScore(prev => Math.max(prev, currentScore));
          }
          continue;
        }

        // Escaped screen
        if (e.x < -40) {
          enemies.splice(i, 1);
        }
      }

      // --- 4. Update Particles ---
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) particles.splice(i, 1);
      }

      // --- 5. RENDER RETRO SCENE ---
      ctx.imageSmoothingEnabled = false;

      // Dark cyber server room background
      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, W, H);

      // Grid background lines
      ctx.strokeStyle = "rgba(14, 165, 233, 0.1)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Server Racks in background
      ctx.fillStyle = "#0f172a";
      for (let rx = 30; rx < W; rx += 140) {
        ctx.fillRect(rx, 60, 90, floorY - 60);
        ctx.strokeStyle = "rgba(34, 197, 94, 0.4)";
        ctx.strokeRect(rx, 60, 90, floorY - 60);

        // Blinking server LEDs
        for (let l = 75; l < floorY - 20; l += 14) {
          ctx.fillStyle = Math.random() > 0.4 ? "#22c55e" : "#0284c7";
          ctx.fillRect(rx + 10, l, 4, 3);
          ctx.fillRect(rx + 20, l, 4, 3);
        }
      }

      // Floor Platform
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, floorY, W, H - floorY);
      ctx.fillStyle = "#0284c7";
      ctx.fillRect(0, floorY, W, 4);

      // Floor hazard stripes
      ctx.fillStyle = "#f59e0b";
      for (let fx = 0; fx < W; fx += 40) {
        ctx.fillRect(fx, floorY + 6, 16, 4);
      }

      // Render Bullets
      ctx.fillStyle = "#fef08a";
      ctx.shadowColor = "#f59e0b";
      ctx.shadowBlur = 6;
      for (const b of bullets) {
        ctx.fillRect(b.x, b.y, 16, 4);
      }
      ctx.shadowBlur = 0;

      // Render Enemies
      for (const e of enemies) {
        if (e.type === "bug") {
          // Green Code Bug
          ctx.fillStyle = "#22c55e";
          ctx.fillRect(e.x, e.y, e.size, e.size);
          // Eyes
          ctx.fillStyle = "#000";
          ctx.fillRect(e.x + 3, e.y + 4, 4, 4);
          ctx.fillRect(e.x + 12, e.y + 4, 4, 4);
          // Label
          ctx.fillStyle = "#fff";
          ctx.font = "bold 9px monospace";
          ctx.fillText("BUG", e.x - 2, e.y - 4);
        } else if (e.type === "server") {
          // Red 500 Error
          ctx.fillStyle = "#ef4444";
          ctx.fillRect(e.x, e.y, e.size, e.size);
          ctx.fillStyle = "#fff";
          ctx.font = "bold 10px monospace";
          ctx.fillText("500", e.x + 4, e.y + 18);
        } else {
          // Purple Memory Leak
          ctx.fillStyle = "#a855f7";
          ctx.fillRect(e.x, e.y, e.size, e.size);
          ctx.fillStyle = "#fff";
          ctx.font = "bold 8px monospace";
          ctx.fillText("LEAK", e.x + 1, e.y + 14);
        }
      }

      // Render Particles
      for (const p of particles) {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 3, 3);
      }

      // Render Player Character Sprite
      if (currentLives > 0 && spriteRef.current && spriteRef.current.complete) {
        const charW = 58;
        const charH = 62;
        const drawX = px;
        const drawY = floorY - py - charH + 4;

        ctx.save();
        if (pDir === -1) {
          ctx.translate(drawX + charW, drawY);
          ctx.scale(-1, 1);
          ctx.drawImage(spriteRef.current, 0, 0, charW, charH);
        } else {
          ctx.drawImage(spriteRef.current, drawX, drawY, charW, charH);
        }

        // Muzzle Flash
        if (isShooting) {
          ctx.fillStyle = "#fef08a";
          ctx.beginPath();
          const flashX = pDir === 1 ? drawX + charW + 6 : drawX - 6;
          ctx.arc(flashX, drawY + 28, 8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // CRT Scanlines Effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      for (let y = 0; y < H; y += 4) {
        ctx.fillRect(0, y, W, 1);
      }
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isOpen]);

  // Touch virtual buttons
  const touchStart = (code: string) => {
    keys.current[code] = true;
  };
  const touchEnd = (code: string) => {
    keys.current[code] = false;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md"
      >
        {/* Retro Cabinet Frame */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border-2 border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.3)] overflow-hidden flex flex-col"
        >
          {/* Top Marquee Bar */}
          <div className="px-5 py-3 bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border-b border-amber-500/40 flex items-center justify-between font-mono text-xs select-none">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="font-extrabold text-amber-400 tracking-wider text-sm hidden sm:inline">
                METAL SLUG: IT DEFENDER
              </span>
              <span className="text-muted-foreground text-[11px] sm:hidden">
                IT DEFENDER
              </span>
            </div>

            {/* Score & Health Header */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-emerald-400 font-bold">
                <Trophy className="w-3.5 h-3.5" />
                <span>{score.toString().padStart(6, "0")}</span>
              </div>
              <div className="flex items-center gap-1 text-red-400">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Heart
                    key={idx}
                    className={`w-3.5 h-3.5 ${idx < lives ? "fill-red-500 text-red-500" : "text-slate-600"}`}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  audio.enabled = !audio.enabled;
                  setIsMuted(!audio.enabled);
                }}
                className="p-1 rounded text-slate-400 hover:text-white"
                title="Mudo"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                title="Sair (ESC)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Screen Canvas Area */}
          <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
            <canvas 
              ref={canvasRef} 
              onClick={() => {
                keys.current["Space"] = true;
                setTimeout(() => { keys.current["Space"] = false; }, 90);
              }}
              className="w-full h-full object-contain cursor-crosshair" 
              title="Clique na tela para atirar!"
            />

            {/* Game Over Screen */}
            {gameOver && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center gap-3 p-4 text-center font-mono select-none"
              >
                <h3 className="text-3xl sm:text-4xl font-black text-red-500 tracking-wider animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">
                  GAME OVER
                </h3>
                <p className="text-slate-300 text-sm">
                  BUGS ELIMINADOS • SCORE: <span className="text-amber-400 font-bold">{score}</span>
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={startGame}
                    className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-lg active:scale-95 transition-all flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>JOGAR NOVAMENTE</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all"
                  >
                    VOLTAR AO PORTFÓLIO
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Virtual Controls for Mobile / Touch Screen */}
          <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-muted-foreground select-none">
            {/* Desktop Key Helper */}
            <div className="hidden sm:flex items-center gap-3 text-[11px]">
              <span>🎮 <strong className="text-white">A / D</strong> para Andar</span>
              <span>•</span>
              <span><strong className="text-white">W / ↑</strong> para Pular</span>
              <span>•</span>
              <span><strong className="text-white">Espaço / F / J</strong> para Atirar</span>
              <span>•</span>
              <span className="text-amber-400 font-semibold">🖱️ Clique na tela para Atirar</span>
            </div>

            {/* Mobile Touch Controller */}
            <div className="flex sm:hidden items-center justify-between w-full">
              {/* D-Pad */}
              <div className="flex items-center gap-2">
                <button
                  onTouchStart={() => touchStart("KeyA")}
                  onTouchEnd={() => touchEnd("KeyA")}
                  onMouseDown={() => touchStart("KeyA")}
                  onMouseUp={() => touchEnd("KeyA")}
                  className="w-11 h-11 rounded-xl bg-slate-800 active:bg-slate-700 text-white font-bold flex items-center justify-center border border-slate-700 active:scale-95 select-none"
                >
                  ◀
                </button>
                <button
                  onTouchStart={() => touchStart("KeyD")}
                  onTouchEnd={() => touchEnd("KeyD")}
                  onMouseDown={() => touchStart("KeyD")}
                  onMouseUp={() => touchEnd("KeyD")}
                  className="w-11 h-11 rounded-xl bg-slate-800 active:bg-slate-700 text-white font-bold flex items-center justify-center border border-slate-700 active:scale-95 select-none"
                >
                  ▶
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onTouchStart={() => touchStart("KeyW")}
                  onTouchEnd={() => touchEnd("KeyW")}
                  onMouseDown={() => touchStart("KeyW")}
                  onMouseUp={() => touchEnd("KeyW")}
                  className="w-12 h-12 rounded-full bg-amber-600 active:bg-amber-500 text-white font-bold text-xs flex items-center justify-center border border-amber-400 active:scale-95 shadow-md select-none"
                >
                  PULAR
                </button>
                <button
                  onTouchStart={() => touchStart("Space")}
                  onTouchEnd={() => touchEnd("Space")}
                  onMouseDown={() => touchStart("Space")}
                  onMouseUp={() => touchEnd("Space")}
                  className="w-14 h-14 rounded-full bg-red-600 active:bg-red-500 text-white font-black text-sm flex items-center justify-center border-2 border-red-400 active:scale-95 shadow-lg select-none"
                >
                  FOGO
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
