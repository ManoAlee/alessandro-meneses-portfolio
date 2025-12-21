import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { motion } from "framer-motion";
import { FADE_UP_VARIANTS } from "@/shared/lib/motion";

export interface RepoProps {
  name: string;
  description: string;
  lang: string;
  stars: number;
  forks: number;
  color: string;
}

export function RepoCard({ repo }: { repo: RepoProps }) {
  return (
    <motion.div variants={FADE_UP_VARIANTS} className="group relative rounded-lg border bg-card/50 backdrop-blur-sm p-6 hover:bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors decoration-primary underline-offset-4">
          {repo.name}
        </h3>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
      </div>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
        {repo.description}
      </p>
      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
           <span className="h-3 w-3 rounded-full" style={{ backgroundColor: repo.color }} />
           {repo.lang}
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3" />
          {repo.stars}
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="h-3 w-3" />
          {repo.forks}
        </div>
      </div>
    </motion.div>
  );
}
