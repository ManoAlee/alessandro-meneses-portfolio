import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

const ROLES = [
  "Especialista em Infraestrutura",
  "Engenheiro DevOps",
  "Arquiteto de Nuvem"
];

export function TypewriterEffect() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Blinking cursor
  const cursorOpacity = useMotionValue(1);
  useEffect(() => {
    const controls = animate(cursorOpacity, [1, 0, 1], {
      duration: 0.8,
      repeat: Infinity,
      ease: "linear"
    });
    return controls.stop;
  }, []);

  useEffect(() => {
    if (subIndex === ROLES[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % ROLES.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === ROLES[index].length ? 1000 : 150, Math.random() * 50));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="inline-flex">
      <span className="text-primary">{ROLES[index].substring(0, subIndex)}</span>
      <motion.span style={{ opacity: cursorOpacity }} className="ml-1 text-primary">|</motion.span>
    </span>
  );
}
