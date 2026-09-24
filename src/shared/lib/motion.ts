import { Variants } from "framer-motion";

export const EASING_LUXURY = [0.16, 1, 0.3, 1]; // High-end agency cubic bezier

export const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASING_LUXURY }
  }
};

export const FADE_IN_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: EASING_LUXURY }
  }
};

export const STAGGER_CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

export const SCALE_ON_HOVER = {
  scale: 1.02,
  transition: { duration: 0.25, ease: EASING_LUXURY }
};

export const TAP_ANIMATION = {
  scale: 0.98,
  transition: { duration: 0.1 }
};
