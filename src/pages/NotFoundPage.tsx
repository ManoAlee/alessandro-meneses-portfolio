import { Button } from "@/shared/ui/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FADE_UP_VARIANTS } from "@/shared/lib/motion";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={FADE_UP_VARIANTS}
        className="space-y-4"
      >
        <h1 className="text-9xl font-extrabold text-primary/20">404</h1>
        <h2 className="text-4xl font-bold font-display">Página não encontrada</h2>
        <p className="text-xl text-muted-foreground max-w-lg mx-auto">
          Parece que o link que você tentou acessar está quebrado ou foi movido para outra dimensão da nuvem.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button size="lg" onClick={() => navigate("/")}>
          Voltar para o Início
        </Button>
      </motion.div>
    </div>
  );
}
