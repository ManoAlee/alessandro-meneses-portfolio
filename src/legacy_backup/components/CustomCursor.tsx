import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Use MotionValues for high performance
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for the "trailing" effect
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-500 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
      animate={{
        scale: isHovered ? 2.5 : 1,
        backgroundColor: isHovered ? "rgba(6,182,212,0.2)" : "transparent",
        borderColor: isHovered ? "rgba(6,182,212,0)" : "rgba(6,182,212,0.5)",
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Center Dot */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full transition-all duration-300 ${isHovered ? 'bg-white opacity-50' : ''}`}
      />
    </motion.div>
  );
};
