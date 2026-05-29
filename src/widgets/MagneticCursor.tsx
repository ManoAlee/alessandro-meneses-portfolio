import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [gravityActive, setGravityActive] = useState(false);
  const [gravityRotation, setGravityRotation] = useState(0);
  const [gravityScaleX, setGravityScaleX] = useState(1);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const gravityRef = useRef({ x: 0, y: 0, active: false, strength: 0 });

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
        // Stretch factor increases as the mouse gets closer to the singularity (up to 3x stretch)
        setGravityScaleX(1 + strength * 2.2);
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
      
      if (g.active) {
        const targetX = e.clientX;
        const targetY = e.clientY;
        
        // Interpolate mouse target coordinates with the singularity coordinates
        // strength is higher closer to the center of the black hole
        const strength = g.strength * 0.7; 
        const finalX = targetX + (g.x - targetX) * strength;
        const finalY = targetY + (g.y - targetY) * strength;

        cursorX.set(finalX - 10);
        cursorY.set(finalY - 10);

        // Compute angle pointing straight towards the event horizon
        const dy = g.y - targetY;
        const dx = g.x - targetX;
        const angleRad = Math.atan2(dy, dx);
        const angleDeg = angleRad * (180 / Math.PI);
        setGravityRotation(angleDeg);
      } else {
        cursorX.set(e.clientX - 10);
        cursorY.set(e.clientY - 10);
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
    };
  }, [isVisible]);

  return (
    <motion.div
      className="fixed left-0 top-0 z-[9999] pointer-events-none hidden md:block mix-blend-difference transition-opacity duration-300"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0,
        rotate: gravityActive ? gravityRotation : 0,
      }}
    >
      <motion.div
        className="h-5 w-5 rounded-full bg-white origin-center"
        animate={{
          scaleY: isHovering ? 2.5 : 1,
          scaleX: gravityActive ? (isHovering ? 2.5 : 1) * gravityScaleX : (isHovering ? 2.5 : 1),
          // Deform the dot into a spaghettified teardrop shape pointing towards the event horizon
          borderRadius: gravityActive ? "100% 50% 50% 100%" : "50%",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
      />
    </motion.div>
  );
}
