import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';

interface Project {
    title: string;
    description: string;
    image?: string;
    techStack?: string[];
    link?: string;
    github?: string;
}

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative bg-card rounded-xl border border-white/10 overflow-hidden hover:border-primary/50 transition-colors"
        >
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Folder className="w-6 h-6" />
                    </div>
                    <div className="flex gap-3 text-gray-400">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        )}
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                </p>

                {project.techStack && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.techStack.map((tech) => (
                            <span key={tech} className="text-xs px-2 py-1 bg-white/5 rounded text-gray-300">
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectCard;