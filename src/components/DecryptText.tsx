import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

export const DecryptText = ({ text, className = "", speed = 30 }: { text: string, className?: string, speed?: number }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2; 
    }, speed);

    return () => clearInterval(interval);
  }, [text, isInView, speed]);

  return <span ref={ref} className={className}>{display}</span>;
};
