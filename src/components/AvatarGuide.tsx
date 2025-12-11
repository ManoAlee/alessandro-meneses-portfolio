import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function AvatarGuide() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("Olá! 👋");
  
  // Mouse tracking logic for "Eye" effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        // Calculate position relative to bottom right (where avatar is)
        const x = (e.clientX - (window.innerWidth - 80)) / 50;
        const y = (e.clientY - (window.innerHeight - 80)) / 50;
        setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      // Hide in Hero section (top 500px), show afterwards
      const shouldShow = latest > 600;
      if (shouldShow !== isVisible) setIsVisible(shouldShow);

      // Context-aware messages based on scroll position (approximate section heights)
      if (latest > 3200) setMessage("Vamos conversar? 📬"); // Contact
      else if (latest > 2500) setMessage("Minha Formação 🎓"); // Education
      else if (latest > 1800) setMessage("Meus Projetos 💻"); // Projects
      else if (latest > 1200) setMessage("Minhas Skills ⚡"); // Skills
      else if (latest > 600) setMessage("Experiência 💼"); // Experience
    });
  }, [scrollY, isVisible]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 50,
        scale: isVisible ? 1 : 0.8
      }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40 flex items-end gap-4 pointer-events-none md:pointer-events-auto"
    >
      {/* Speech Bubble */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        key={message}
        className="bg-white text-black text-sm font-bold py-2 px-4 rounded-xl rounded-tr-none shadow-lg mb-8 hidden md:block"
      >
        {message}
      </motion.div>

      {/* Avatar Circle */}
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-16 h-16 rounded-full border-4 border-primary/50 bg-black overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.5)] cursor-pointer relative"
      >
         <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent z-10" />
         <motion.img 
            src="/avatar.png" 
            alt="Assistant" 
            className="w-full h-full object-cover"
            animate={{ 
                x: mousePos.x, 
                y: mousePos.y 
            }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
         />
      </motion.div>
    </motion.div>
  );
}
