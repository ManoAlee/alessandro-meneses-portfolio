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
        description: "Sistema completo de provisionamento automatizado de recursos AWS utilizando Terraform para infraestrutura como código e Ansible para gerenciamento de configuração. Implementação de CI/CD pipelines, reduzindo tempo de deployment em 80% e eliminando erros manuais. Inclui monitoramento, auto-scaling e disaster recovery.",
        github: "https://github.com",
        techStack: ["Terraform", "AWS", "Ansible", "Python"]
    },
    {
        title: "Microservices Dashboard",
        description: "Dashboard de monitoramento em tempo real para arquitetura de microserviços. Interface interativa desenvolvida com React e WebSocket para visualização de métricas ao vivo, health checks, logs distribuídos e alertas. Integração com Prometheus e Grafana para análise de performance e identificação proativa de problemas.",
        link: "https://example.com",
        github: "https://github.com",
        techStack: ["React", "Node.js", "Socket.io", "Docker"]
    },
    {
        title: "Secure API Gateway",
        description: "Gateway de API de alta performance com múltiplas camadas de segurança. Implementa rate limiting inteligente, cache distribuído com Redis, autenticação JWT, load balancing e circuit breaker patterns. Suporta versionamento de API, logging detalhado e métricas em tempo real para garantir disponibilidade e segurança.",
        github: "https://github.com",
        techStack: ["Go", "Redis", "PostgreSQL", "Nginx"]
    }
];

export default projects;