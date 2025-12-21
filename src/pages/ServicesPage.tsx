import { SERVICES_DATA } from "@/entities/skill/data/services";
import { ServiceCard } from "@/entities/skill/ui/ServiceCard";
import { Button } from "@/shared/ui/Button";
import { motion } from "framer-motion";
import { FADE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS } from "@/shared/lib/motion";
import { useNavigate } from "react-router-dom";
import { ServicesVisual } from "@/widgets/ServicesVisual"; // Import Visual
import * as Icons from "lucide-react";

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-12 md:py-20 min-h-[85vh]">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={STAGGER_CONTAINER_VARIANTS}
        className="space-y-16"
      >
        {/* Header Grid Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <motion.h1 variants={FADE_UP_VARIANTS} className="text-4xl font-bold font-display leading-tight md:text-5xl">
                  Serviços & <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Capacidades</span>
                </motion.h1>
                <motion.p variants={FADE_UP_VARIANTS} className="text-lg text-muted-foreground leading-relaxed">
                  Catálogo técnico completo. Da arquitetura de nuvem escalável à automação de pipelines, ofereço soluções robustas para desafios de infraestrutura complexos.
                </motion.p>
                 <motion.div variants={FADE_UP_VARIANTS}>
                    <Button size="lg" className="px-8" onClick={() => navigate("/contact")}>
                        Agendar Consultoria
                    </Button>
                </motion.div>
            </div>
             {/* Visual */}
            <motion.div variants={FADE_UP_VARIANTS} className="flex justify-center lg:justify-end">
                <ServicesVisual />
            </motion.div>
        </div>

        {/* Services Grid */}
        <div className="space-y-8">
             <motion.div variants={FADE_UP_VARIANTS} className="flex items-center gap-4">
                <div className="h-px bg-border flex-1" />
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Catálogo de Soluções</span>
                <div className="h-px bg-border flex-1" />
             </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {SERVICES_DATA.map((service, index) => (
                <ServiceCard 
                    key={index} 
                    // @ts-ignore
                    domain={service} 
                    onNavigate={(id) => navigate(service.link || "/contact")} 
                />
                ))}
            </div>
        </div>

        <div className="mt-20 text-center space-y-6 bg-card/30 rounded-2xl p-8 border border-white/5">
            <h2 className="text-2xl font-bold font-display">Não encontrou o que procura?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
            Tenho experiência em diversas outras tecnologias e estou sempre aprendendo. 
            Entre em contato para discutirmos seu desafio específico.
            </p>
            <Button variant="outline" size="lg" onClick={() => navigate("/contact")}>Falar com Alessandro</Button>
        </div>
      </motion.div>
    </div>
  );
}
