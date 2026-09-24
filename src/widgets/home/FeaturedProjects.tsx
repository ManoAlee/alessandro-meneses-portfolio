import { motion } from "framer-motion";
import { FADE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS } from "@/shared/lib/motion";
import { GITHUB_PROJECTS } from "@/entities/project/data/github-projects";
import { ArrowRight, ArrowUpRight, Github, Sparkles, FolderGit2 } from "lucide-react";
import { Link } from "react-router-dom";

export function FeaturedProjects() {
  // Top 3 standout projects
  const featured = GITHUB_PROJECTS.slice(0, 3);

  return (
    <section className="container py-16 md:py-24 border-b border-border/40">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trabalhos Selecionados</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight text-foreground">
            Projetos em Destaque
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl">
            Aplicações reais, automações agênticas e dashboards construídos com código limpo e foco em utilidade.
          </p>
        </div>

        <Link
          to="/opensource"
          className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:underline"
        >
          <span>Ver catálogo completo ({GITHUB_PROJECTS.length})</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={STAGGER_CONTAINER_VARIANTS}
        className="grid gap-6 md:grid-cols-3"
      >
        {featured.map((project) => (
          <motion.div
            key={project.id}
            variants={FADE_UP_VARIANTS}
            className="group rounded-[1.5rem] p-1.5 bg-gradient-to-b from-white/10 to-transparent ring-1 ring-border/60 hover:ring-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
          >
            <div className="rounded-[calc(1.5rem-0.375rem)] bg-card/80 backdrop-blur-md p-6 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase font-semibold text-muted-foreground px-2.5 py-0.5 rounded-full bg-secondary/80">
                    {project.type}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Público
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <FolderGit2 className="w-4 h-4 text-primary shrink-0" />
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    project.language === 'TypeScript' ? 'bg-blue-500' :
                    project.language === 'Python' ? 'bg-emerald-500' : 'bg-amber-400'
                  }`} />
                  <span className="text-xs font-medium text-foreground">{project.language}</span>
                </div>

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    aria-label={`Ver código do repositório ${project.name}`}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Código</span>
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">
                      <ArrowUpRight className="w-3 h-3 text-primary" />
                    </span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
