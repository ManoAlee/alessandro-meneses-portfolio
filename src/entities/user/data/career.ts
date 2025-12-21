export interface CareerItem {
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  status?: string;
  tags?: string[];
}

export const CAREER_DATA: CareerItem[] = [
  {
    company: "Automotion",
    role: "Assistente de TI JR",
    period: "Junho 2025 - Presente",
    description: "Atendimento de suporte e troubleshooting (N1/N2/N3) local e remoto (RDP, VNC, SSH). Administração de redes (TCP/IP, VPN, Firewall), servidores (Windows/Linux/Proxmox) e gestão de ativos. Automação de processos com PowerShell/Bash e implementação de backups robustos com Restic/Rclone.",
    tags: ["Infraestrutura", "Suporte", "Proxmox", "Backup"]
  },
  {
    company: "Bellacor Indústria e Comércio de Tintas",
    role: "Assistente de Produção",
    period: "Abril 2024 - Dezembro 2024",
    description: "Preparação de materiais, operação de máquinas de envase, controle de qualidade visual e etiquetagem. Manutenção da limpeza e organização do setor.",
    tags: ["Produção", "Qualidade", "Processos"]
  },
  {
    company: "BR Conecta",
    role: "Analista de rede e comunicação de dados júnior",
    period: "Janeiro 2024 - Fevereiro 2024",
    description: "Suporte técnico focado em conectividade. Atendimento ao cliente e resolução ágil de problemas técnicos de rede.",
    tags: ["Redes", "Suporte", "Atendimento"]
  },
  {
    company: "Schmersal Brasil",
    role: "Assistente administrativo",
    period: "Janeiro 2023 - Dezembro 2023",
    description: "Controle de qualidade, documentação e auditorias. Garantia de conformidade e inspeção de embalagens.",
    tags: ["Administrativo", "Qualidade", "ISO"]
  },
  {
    company: "Coocerqui",
    role: "Repositor / Empacotador",
    period: "Setembro 2020 - Janeiro 2023",
    description: "Logística interna, reposição de mercadorias e atendimento direto ao cliente.",
    tags: ["Logística", "Atendimento"]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: "Fatec Tatuí",
    degree: "Gestão da Tecnologia da Informação",
    period: "Fevereiro 2022 - Julho 2025",
    status: "Graduado"
  },
  {
    institution: "SENAI 'Ítalo Bologna'",
    degree: "Assistente Administrativo",
    period: "Janeiro 2023 - Dezembro 2023"
  },
  {
    institution: "SENAI 'Ítalo Bologna'",
    degree: "Power BI, Administração",
    period: "Dezembro 2023"
  }
];
