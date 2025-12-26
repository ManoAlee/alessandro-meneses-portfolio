export interface ResumeData {
  personal: {
    name: string;
    role: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: {
    company: string;
    role: string;
    period: string;
    location: string;
    highlights: string[];
    isCurrent?: boolean;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
    status?: string;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
}

export const RESUME_CONTENT: ResumeData = {
  personal: {
    name: "Alessandro Meneses",
    role: "DevOps Engineer & Cloud Architect",
    email: "ale_meneses2004@hotmail.com",
    phone: "+55 (15) 99801-7732",
    location: "Boituva, SP - Brasil",
    linkedin: "https://www.linkedin.com/in/alessandro-meneses/",
    github: "https://github.com/ManoAlee",
  },
  summary: "Profissional de TI com 3+ anos de experiência focada em Infraestrutura e DevOps. Especialista em desenhar ambientes de alta disponibilidade utilizando Azure e AWS, com forte atuação em automação de processos (PowerShell/Python) e segurança de dados. Tenho um histórico comprovado de redução de custos operacionais (FinOps) e aumento de produtividade através da implementação de cultura CI/CD e infraestrutura como código (IaC).",
  experience: [
    {
      company: "Automotion",
      role: "Assistente de TI (Infra & DevOps) - Nível JR",
      period: "Jun 2025 - Presente",
      location: "Boituva, SP (Híbrido)",
      isCurrent: true,
      highlights: [
        "Sustentação de Missão Crítica: Responsável pela estabilidade de servidores Windows/Linux, garantindo SLA de atendimento N3.",
        "Automação de Rotinas: Desenvolvi scripts em PowerShell que automatizaram o onboarding de usuários, poupando 15h+ mês da equipe.",
        "Modernização de Backup: Implementei estratégia de backup imutável com Restic e Rclone, mitigando riscos de ransomware.",
        "Virtualização: Administração de clusters Proxmox e otimização de recursos de VDI."
      ]
    },
    {
      company: "BR Conecta",
      role: "Analista de Redes Júnior",
      period: "Jan 2024 - Fev 2024",
      location: "Boituva, SP",
      highlights: [
        "Conectividade: Suporte direto e troubleshooting de redes TCP/IP e links de dados corporativos.",
        "Satisfação do Cliente: Atuação focada em resolução rápida (First Call Resolution), mantendo altos índices de aprovação."
      ]
    }
  ],
  skills: [
    {
      category: "Cloud & Infra",
      items: ["AWS", "Azure", "Proxmox", "Linux", "Windows Server", "Docker", "Kubernetes"]
    },
    {
      category: "DevOps & Automação",
      items: ["CI/CD", "Git", "GitHub Actions", "Terraform", "Ansible", "PowerShell", "Python"]
    },
    {
      category: "Observabilidade",
      items: ["Prometheus", "Grafana", "Zabbix", "CloudWatch"]
    }
  ],
  education: [
    {
      institution: "Fatec Tatuí",
      degree: "Gestão da Tecnologia da Informação",
      period: "2022 - 2025",
      status: "Graduado"
    },
    {
      institution: "SENAI 'Ítalo Bologna'",
      degree: "Power BI e Administração",
      period: "2023"
    }
  ],
  languages: [
    { name: "Português", level: "Nativo" },
    { name: "Inglês", level: "Técnico (B1)" }
  ]
};
