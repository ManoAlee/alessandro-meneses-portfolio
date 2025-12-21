export interface Project {
    title: string;
    description: string;
    link?: string;
    github?: string;
    techStack?: string[];
}

const projects: Project[] = [
    {
        title: "Cloud Infrastructure Automation",
        description: "Automated provisioning of AWS resources using Terraform and Ansible. Reduced deployment time by 80%.",
        github: "https://github.com",
        techStack: ["Terraform", "AWS", "Ansible", "Python"]
    },
    {
        title: "Microservices Dashboard",
        description: "Real-time monitoring dashboard for microservices architecture. Built with React and WebSocket for live metrics.",
        link: "https://example.com",
        github: "https://github.com",
        techStack: ["React", "Node.js", "Socket.io", "Docker"]
    },
    {
        title: "Secure API Gateway",
        description: "High-performance API Gateway with rate limiting, caching, and JWT authentication.",
        github: "https://github.com",
        techStack: ["Go", "Redis", "PostgreSQL", "Nginx"]
    }
];

export default projects;