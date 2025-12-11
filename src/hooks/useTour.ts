import { useState, useEffect, useCallback } from "react";

export type TourStep = {
  id: string;
  message: string;
  delay?: number; // How long to stay on this step before moving next (if auto-play)
};

const TOUR_STEPS: TourStep[] = [
  { id: "hero", message: "Bem-vindo ao meu Sistema. Eu sou Alessandro, seu Arquiteto de Infraestrutura.", delay: 5000 },
  { id: "about", message: "Aqui inicio os processos. Minha base é transformar complexidade em eficiência.", delay: 6000 },
  { id: "experience", message: "Minha linha do tempo operacional. De suporte tático à engenharia estratégica.", delay: 7000 },
  { id: "skills", message: "Meu arsenal técnico. Ferramentas de alta precisão para servidores e automação.", delay: 6000 },
  { id: "setup", message: "A Battle Station. O hardware onde a mágica acontece.", delay: 5000 },
  { id: "projects", message: "Projetos implantados. Soluções reais, impacto mensurável.", delay: 7000 },
  { id: "contact", message: "Canal de comunicação aberto. Vamos iniciar um protocolo de conexão?", delay: 5000 },
];

export function useTour() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startTour = useCallback(() => {
    setIsPlaying(true);
    setCurrentStepIndex(0);
    scrollToStep(0);
  }, []);

  const stopTour = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      scrollToStep(nextIndex);
    } else {
      stopTour(); // End of tour
    }
  }, [currentStepIndex, stopTour]);

  const scrollToStep = (index: number) => {
    const step = TOUR_STEPS[index];
    const element = document.getElementById(step.id);
    if (element) {
      // Smooth scroll to center of element
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Auto-play Logic
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      const step = TOUR_STEPS[currentStepIndex];
      timer = setTimeout(() => {
        nextStep();
      }, step.delay || 5000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, nextStep]);

  return {
    isPlaying,
    currentStep: TOUR_STEPS[currentStepIndex],
    currentStepIndex,
    totalSteps: TOUR_STEPS.length,
    startTour,
    stopTour,
    nextStep
  };
}
