import { Variants } from "framer-motion";

export const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const STAGGER_CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const SCALE_ON_HOVER = {
  scale: 1.02,
  transition: { duration: 0.2 }
};

export const TAP_ANIMATION = {
  scale: 0.95
};
