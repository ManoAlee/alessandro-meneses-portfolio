import { useRef, useState, useEffect } from "react";

const CYBER_CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function ScrambleText({ text, className }: { text: string, className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<any>(null);

  const startScramble = () => {
    let iteration = 0;
    
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    startScramble();
  }, []);

  return (
    <span 
      className={className} 
      onMouseEnter={startScramble}
    >
      {displayText}
    </span>
  );
}
