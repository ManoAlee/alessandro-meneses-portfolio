import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Play, RotateCcw } from 'lucide-react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;

export default function SnakeGame() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { addXp, unlockAchievement } = useGame();
  const gameLoopRef = useRef<number>();

  const generateFood = () => {
    return {
      x: Math.floor(Math.random() * (GRID_SIZE - 1)),
      y: Math.floor(Math.random() * (GRID_SIZE - 1)),
    };
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection("RIGHT");
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake((prev) => {
        const newHead = { ...prev[0] };

        switch (direction) {
          case "UP": newHead.y -= 1; break;
          case "DOWN": newHead.y += 1; break;
          case "LEFT": newHead.x -= 1; break;
          case "RIGHT": newHead.x += 1; break;
        }

        // Check Collisions
        if (
          newHead.x < 0 || newHead.x >= GRID_SIZE || 
          newHead.y < 0 || newHead.y >= GRID_SIZE ||
          prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)
        ) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [newHead, ...prev];
        
        // Eat Food
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood());
          addXp(50); // XP per food
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    gameLoopRef.current = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoopRef.current);
  }, [isPlaying, gameOver, direction, food, addXp]);

  // Keyboard Controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch(e.key) {
        case "ArrowUp": if (direction !== "DOWN") setDirection("UP"); break;
        case "ArrowDown": if (direction !== "UP") setDirection("DOWN"); break;
        case "ArrowLeft": if (direction !== "RIGHT") setDirection("LEFT"); break;
        case "ArrowRight": if (direction !== "LEFT") setDirection("RIGHT"); break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  // Achievement Check
  useEffect(() => {
      if (score >= 100) unlockAchievement("Snake Master");
  }, [score, unlockAchievement]);

  return (
    <div className="bg-black/50 p-4 rounded-xl border border-primary/20 backdrop-blur-sm max-w-[440px] mx-auto">
      <div className="flex justify-between items-center mb-4 text-primary font-mono text-sm">
        <div>SCORE: {score}</div>
        <div>STATUS: {gameOver ? "CRASHED" : isPlaying ? "RUNNING" : "READY"}</div>
      </div>

      <div 
        className="relative bg-black border border-white/10 mx-auto overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.1)]"
        style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
      >
        {!isPlaying && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
                <button onClick={resetGame} className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded hover:scale-105 transition-transform">
                    <Play size={20} /> START SYSTEM
                </button>
            </div>
        )}

        {gameOver && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 text-center">
                <div className="text-red-500 font-bold text-xl mb-2">SYSTEM FAILURE</div>
                <div className="text-slate-400 text-sm mb-4">You collected {score} Data Packets</div>
                <button onClick={resetGame} className="flex items-center gap-2 px-6 py-3 border border-primary text-primary font-bold rounded hover:bg-primary/10 transition-colors">
                    <RotateCcw size={20} /> REBOOT
                </button>
            </div>
        )}

        {/* Snake & Food */}
        {snake.map((seg, i) => (
             <div 
                key={i}
                className="absolute bg-primary rounded-sm"
                style={{ 
                    width: CELL_SIZE - 2, height: CELL_SIZE - 2,
                    left: seg.x * CELL_SIZE, top: seg.y * CELL_SIZE,
                    opacity: 1 - (i / snake.length) * 0.8 // Gradient tail
                }} 
             />
        ))}
        <div 
            className="absolute bg-purple-500 rounded-full animate-pulse shadow-[0_0_10px_#a855f7]"
            style={{ 
                width: CELL_SIZE - 2, height: CELL_SIZE - 2,
                left: food.x * CELL_SIZE, top: food.y * CELL_SIZE 
            }}
        />
        
        {/* Grid Lines Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="mt-4 text-center text-xs text-slate-500 font-mono hidden md:block">
        USE [ARROW KEYS] TO NAVIGATE DATA PACKETS
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden mt-4 grid grid-cols-3 gap-2 w-48 mx-auto">
        <div />
        <button 
            className="p-4 bg-white/5 rounded-lg active:bg-primary/20 transition-colors border border-white/10"
            onClick={() => { if (direction !== "DOWN") setDirection("UP"); }}
        >
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-primary mx-auto" />
        </button>
        <div />
        
        <button 
            className="p-4 bg-white/5 rounded-lg active:bg-primary/20 transition-colors border border-white/10"
            onClick={() => { if (direction !== "RIGHT") setDirection("LEFT"); }}
        >
             <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-r-primary mx-auto" />
        </button>
        
        <button 
            className="p-4 bg-white/5 rounded-lg active:bg-primary/20 transition-colors border border-white/10"
            onClick={() => { if (direction !== "UP") setDirection("DOWN"); }}
        >
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-primary mx-auto" />
        </button>

        <button 
            className="p-4 bg-white/5 rounded-lg active:bg-primary/20 transition-colors border border-white/10"
            onClick={() => { if (direction !== "LEFT") setDirection("RIGHT"); }}
        >
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-primary mx-auto" />
        </button>
      </div>
    </div>
  );
}
