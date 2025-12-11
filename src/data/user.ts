import { Facebook, Github, Linkedin, Mail, MapPin } from "lucide-react";

export const userData = {
  profile: {
    name: "Alessandro Meneses",
    role: "Analista de Infraestrutura & Suporte TI",
    headline: "Transformando problemas complexos em soluções de infraestrutura robustas.",
    location: "Boituva, São Paulo, Brasil",
    email: "ale_meneses2004@hotmail.com",
    linkedin: "https://www.linkedin.com/in/alessandro-meneses/",
    github: "https://github.com/ManoAlee",
    about: "Graduado em Gestão da Tecnologia da Informação com experiência sólida em suporte técnico e administração de infraestrutura. Especialista em resolver problemas (troubleshooting), gerenciar servidores (Windows/Linux) e automatizar processos com scripts (PowerShell, Bash, Python). Foco em alta disponibilidade, segurança e otimização de recursos.",
  },
  skills: {
    infrastructure: [
      "Windows Server", "Linux", "Active Directory (AD)", "DNS/DHCP", "VPN", "TCP/IP", "Hyper-V", "VMware", "Proxmox", "Office 365", "Azure AD"
    ],
    automation: [
      "PowerShell", "Bash", "Python", "Restic", "Rclone"
    ],
    support: [
      "Troubleshooting", "Service Desk", "Hardware Maintenance", "Cabling", "Network Administration", "ITIL"
    ],
    data: [
      "SQL", "Power BI", "Excel", "Data Analysis"
    ]
  },
  experience: [
    {
      company: "Automotion",
      role: "Assistente de TI JR",
      period: "Jun 2025 - Presente", // Note: User input said "Jun 2025", assuming 2024 or future? Copied as is but maybe typo in user input. Assuming user meant 2024 given current date is Dec 2025 in simulation? Or simple typo. I will keep as provided or adjust to "Jun 2025" if future. Wait, user prompt said "junho de 2025 - Present (7 meses)". 
      // If today is Dec 2025, then Jun 2025 makes sense. The Agent clock says 2025-12-10. So Jun 2025 is past. OK.
      description: "Atendimento de análise, suporte e troubleshooting. Administração de servidores Windows/Linux, virtualização (Hyper-V, Proxmox) e redes. Automação de processos com PowerShell/Bash. Gestão de ativos e backups (Restic/Rclone).",
      tags: ["Windows Server", "Linux", "Proxmox", "PowerShell", "Backup"]
    },
    {
      company: "Bellacor Indústria e Comércio de Tintas",
      role: "Assistente de Produção",
      period: "Abr 2024 - Dez 2024",
      description: "Atuação no setor de envase, operação de máquinas, controle de qualidade e inspeção de produtos. Foco em organização e cumprimento de metas de produção.",
      tags: ["Produção", "Qualidade", "Organização"]
    },
    {
      company: "BR Conecta",
      role: "Analista de Rede e Comunicação de Dados Jr.",
      period: "Jan 2024 - Fev 2024",
      description: "Suporte técnico júnior, atendimento ao cliente e resolução de problemas de conectividade. Foco em satisfação do cliente e infraestrutura de redes.",
      tags: ["Redes", "Atendimento", "Troubleshooting"]
    },
    {
      company: "Schmersal Brasil",
      role: "Assistente Administrativo",
      period: "Jan 2023 - Dez 2023",
      description: "Controle de qualidade, documentação, auditorias e gestão de processos administrativos.",
      tags: ["Administrativo", "Controle de Qualidade"]
    },
    {
      company: "Coocerqui",
      role: "Repositor / Empacotador",
      period: "Set 2020 - Jan 2023",
      description: "Atendimento ao cliente, organização de estoque e reposição de mercadorias.",
      tags: ["Atendimento", "Organização"]
    }
  ],
  education: [
    {
      institution: "Fatec Tatuí",
      degree: "Gestão da Tecnologia da Informação",
      period: "Fev 2022 - Jul 2025",
      status: "Graduado"
    },
    {
      institution: "SENAI 'Ítalo Bologna'",
      degree: "Assistente Administrativo",
      period: "Jan 2023 - Dez 2023"
    },
    {
      institution: "SENAI 'Ítalo Bologna'",
      degree: "Power BI, Administração",
      period: "Dez 2023"
    }
  ],
  projects: [
    {
      title: "AutoBackup-365",
      description: "Sistema de backup automatizado utilizando Restic e Rclone. Criptografa dados sensíveis localmente e sincroniza com versionamento para o OneDrive/SharePoint, garantindo proteção contra ransomware.",
      details: "Desenvolvi este script para resolver a falta de versionamento confiável em backups locais. A solução utiliza criptografia AES-256 (Restic) antes do upload, garantindo que os dados no OneDrive estejam seguros mesmo em caso de comprometimento da conta.",
      impact: "Redução de 90% no tempo de recuperação de arquivos (RTO) e economia de 100% em licenças de software de backup proprietário.",
      codeSnippet: "restic backup --verbose --exclude-file=excludes.txt /data\nrclone sync /local/repo remote:backup --transfers=8",
      tech: ["PowerShell", "Restic", "Rclone", "Azure Blob"],
      type: "Automação / Segurança"
    },
    {
      title: "AD User Manager Pro",
      description: "Ferramenta CLI interativa para 'onboarding' e 'offboarding' de usuários no Active Directory. Automatiza criação de contas, atribuição de grupos por setor e criação de caixas de correio no Exchange/Office 365.",
      details: "Para padronizar a entrada de novos funcionários, criei este utilitário que recebe um CSV do RH ou input manual. Ele gera senhas fortes, configura atributos do AD (Cargo, Depto) e sincroniza com o Azure AD Connect.",
      impact: "Eliminação de erros manuais na criação de usuários e redução do tempo de onboarding de 20min para 30 segundos.",
      codeSnippet: "New-ADUser -Name $User -SamAccountName $Logon -UserPrincipalName \"$Logon@domain.com\" -Enabled $true\nAdd-ADGroupMember -Identity $DeptGroup -Members $Logon",
      tech: ["PowerShell", "Active Directory", "Exchange Online"],
      type: "Infraestrutura"
    },
    {
      title: "NetWatch Python Monitor",
      description: "Dashboard de monitoramento leve que verifica latência (Ping), disponibilidade de portas (TCP) e serviços críticos em servidores Windows/Linux, enviando alertas via Webhook (Discord/Slack).",
      details: "Uma alternativa leve ao Zabbix/Nagios para ambientes menores. O script roda como um serviço systemd (Linux) ou Windows Service, verificando cada alvo a cada 60s e reportando downtime imediatamente.",
      impact: "Detecção proativa de quedas de link e travamento de serviços, permitindo resposta antes do chamado do usuário.",
      codeSnippet: "def check_ping(host):\n    response = ping(host, timeout=2)\n    return 'ONLINE' if response else 'OFFLINE'\n\nif check_ping('192.168.1.1') == 'OFFLINE':\n    send_discord_alert('Router Down!')",
      tech: ["Python", "Flask", "Ping3", "Webhooks"],
      type: "Monitoramento"
    },
    {
      title: "Secure File Server Setup",
      description: "Script de provisionamento para servidores de arquivos Linux (Samba) com integração ao AD via Winbind/SSSD, incluindo configuração automática de permissões ACL e auditoria de acesso.",
      details: "Automatiza a configuração 'hardened' de um servidor Samba, incluindo VFS modules para lixeira (Recycle Bin) e auditoria (Audit). Integra-se perfeitamente ao AD para autenticação transparente.",
      impact: "Criação de servidores de arquivos padronizados e seguros em menos de 10 minutos, com logs de auditoria completos para conformidade.",
      codeSnippet: "[global]\n   security = ADS\n   realm = DOMAIN.LOCAL\n   vfs objects = acl_xattr full_audit recycle\n   full_audit:success = connect open mkdir write unlink rename",
      tech: ["Bash", "Linux", "Samba", "Security"],
      type: "Linux / Infra"
    }
  ],
  certifications: [
    "Fundamentos de Data Science e IA",
    "Fundamentos do Power BI",
    "Administrando Banco de Dados",
    "Microsoft Excel 2016"
  ]
};
