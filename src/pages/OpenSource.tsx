import { Button } from "@/shared/ui/Button";
import { motion } from "framer-motion";
import { FADE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS } from "@/shared/lib/motion";
import { Github, Loader2 } from "lucide-react";
import { RepoCard } from "@/entities/project/ui/RepoCard";
import { useEffect, useState } from "react";
import { OpenSourceVisual } from "@/widgets/OpenSourceVisual";
import { PRIVATE_PROJECTS } from "@/entities/project/data/privateProjects";
import { PrivateRepoCard } from "@/entities/project/ui/PrivateRepoCard";

interface GatewayRepo {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

export default function OpenSourcePage() {
  const [repos, setRepos] = useState<GatewayRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch("https://api.github.com/users/ManoAlee/repos?sort=updated&per_page=6");
        const data = await response.json();
        // Filter out forks if desired, or keep them. Using top 6 updated.
        if (Array.isArray(data)) {
           setRepos(data);
        }
      } catch (error) {
        console.error("Failed to fetch repos", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

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
                  Contribuições <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Open Source</span>
                </motion.h1>
                <motion.p variants={FADE_UP_VARIANTS} className="text-lg text-muted-foreground leading-relaxed">
                  Acredito no poder da comunidade. Meus projetos públicos focam em ferramentas de automação, boilerplate para infraestrutura e utilitários para desenvolvedores.
                </motion.p>
                <motion.div variants={FADE_UP_VARIANTS}>
                    <Button size="lg" className="gap-2 shadow-lg shadow-primary/20" onClick={() => window.open("https://github.com/ManoAlee", "_blank")}>
                    <Github className="h-5 w-5" />
                    Explorar GitHub
                    </Button>
                </motion.div>
            </div>
            {/* Visual */}
            <motion.div variants={FADE_UP_VARIANTS} className="flex justify-center lg:justify-end">
                <OpenSourceVisual />
            </motion.div>
        </div>

        {/* Repos Grid */}
        <div className="space-y-6">
            <motion.h2 variants={FADE_UP_VARIANTS} className="text-2xl font-bold font-display border-l-4 border-primary pl-4">
                Repositórios em Destaque
            </motion.h2>

            {loading ? (
            <div className="flex h-40 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
            ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {repos.map((repo) => (
                <RepoCard key={repo.id} repo={{
                    name: repo.name,
                    description: repo.description || "Sem descrição definida.",
                    lang: repo.language || "Code",
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    color: "#3b82f6"
                }} />
                ))}

                {/* Private Projects Peek Card - "Relance" Interaction */}
            </div>
            )}
            {/* Private Projects Section */}
            <div className="space-y-6 pt-12">
                 <motion.h2 variants={FADE_UP_VARIANTS} className="flex items-center gap-3 text-2xl font-bold font-display border-l-4 border-red-500 pl-4">
                    Projetos Confidenciais
                    <span className="text-sm font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">
                        (Restricted Access)
                    </span>
                </motion.h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {PRIVATE_PROJECTS.map((project) => (
                        <PrivateRepoCard key={project.id} project={project} />
                    ))}
                </div>
            </div>

            {/* Original "Peek Card" Removed in favor of the full Grid above */}
        </div>
      </motion.div>
    </div>
  );
}
