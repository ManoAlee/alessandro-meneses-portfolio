import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  
  // Gravity states
  const [gravityActive, setGravityActive] = useState(false);
  const [gravityRotation, setGravityRotation] = useState(0);
  const [gravityScaleX, setGravityScaleX] = useState(1);

  // Vector spaceship rotation
  const [shipRotation, setShipRotation] = useState(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 650 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const gravityRef = useRef({ x: 0, y: 0, active: false, strength: 0 });
  const lastPosRef = useRef({ x: 0, y: 0, time: Date.now() });
  const movingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleGravity = (e: Event) => {
      const customEvent = e as CustomEvent<{ x: number; y: number; active: boolean; strength?: number }>;
      const active = customEvent.detail.active;
      const strength = customEvent.detail.strength || 0;
      
      gravityRef.current = {
        x: customEvent.detail.x,
        y: customEvent.detail.y,
        active,
        strength
      };
      setGravityActive(active);

      if (active) {
        setGravityScaleX(1 + strength * 1.5);
      } else {
        setGravityScaleX(1);
      }
    };

    window.addEventListener("cursor-gravity", handleGravity);
    return () => {
      window.removeEventListener("cursor-gravity", handleGravity);
    };
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const g = gravityRef.current;
      const targetX = e.clientX;
      const targetY = e.clientY;
      const now = Date.now();

      // Calculate direction/angle of motion
      const last = lastPosRef.current;
      const dx = targetX - last.x;
      const dy = targetY - last.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 1.5) {
        // Spacecraft angle of rotation (default UP is 0, so atan2 + 90 degrees)
        const motionAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        setShipRotation(motionAngle);
        setIsMoving(true);

        // Reset moving flag after delay when stopped
        if (movingTimeoutRef.current) clearTimeout(movingTimeoutRef.current);
        movingTimeoutRef.current = setTimeout(() => {
          setIsMoving(false);
        }, 150);
      }

      lastPosRef.current = { x: targetX, y: targetY, time: now };

      if (g.active) {
        // Gravity attraction physics
        const strength = g.strength * 0.7; 
        const finalX = targetX + (g.x - targetX) * strength;
        const finalY = targetY + (g.y - targetY) * strength;

        cursorX.set(finalX - 12);
        cursorY.set(finalY - 12);

        // Align ship pointing directly towards the singularity
        const gdx = g.x - targetX;
        const gdy = g.y - targetY;
        const gAngle = Math.atan2(gdy, gdx) * (180 / Math.PI) + 90;
        setGravityRotation(gAngle);
      } else {
        cursorX.set(targetX - 12);
        cursorY.set(targetY - 12);
      }

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === "a" || 
          target.tagName.toLowerCase() === "button" ||
          target.getAttribute("role") === "button" ||
          target.closest("a") || 
          target.closest("button")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      if (movingTimeoutRef.current) clearTimeout(movingTimeoutRef.current);
    };
  }, [isVisible]);

  return (
    <motion.div
      className="fixed left-0 top-0 z-[9999] pointer-events-none hidden md:block mix-blend-difference transition-opacity duration-300"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0,
        rotate: gravityActive ? gravityRotation : shipRotation,
      }}
    >
      <div className="relative flex items-center justify-center w-6 h-6">
        {/* Sleek Vector Spaceship */}
        <svg 
          viewBox="0 0 24 24" 
          width="20" 
          height="20" 
          fill="none" 
          stroke="white" 
          strokeWidth="2"
          className="transition-transform duration-200"
          style={{
            transform: `scale(${isHovering ? 1.3 : 1.0})`
          }}
        >
          {/* Outer Delta Wings */}
          <path d="M12 2L3 20L12 15L21 20L12 2Z" fill="black" />
          {/* Cockpit Canopy glass outline */}
          <path d="M12 5L8 14L12 12L16 14L12 5Z" fill="white" opacity="0.4" />
        </svg>

        {/* Dynamic Engine Thrust Flame */}
        {(isMoving || gravityActive) && (
          <motion.div
            className={`absolute -bottom-2 w-1.5 h-3 rounded-full blur-[1px] origin-top`}
            style={{
              background: gravityActive ? "linear-gradient(to bottom, #f97316, #ef4444)" : "linear-gradient(to bottom, #38bdf8, #a855f7)"
            }}
            animate={{ 
              scaleY: isMoving ? [1, 2.0, 1] : [1, 1.4, 1],
              opacity: [0.7, 1.0, 0.7]
            }}
            transition={{ duration: 0.1, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
}
