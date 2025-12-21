import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
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
  }, []);

  return (
    <motion.div
      className="fixed left-0 top-0 z-[9999] pointer-events-none hidden md:block mix-blend-difference transition-opacity duration-300"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0
      }}
    >
      <motion.div
        className="h-5 w-5 rounded-full bg-white"
        animate={{
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
