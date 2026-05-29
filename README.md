# 🌐 Portfólio Profissional — Alessandro Meneses

> **Analista de Infraestrutura & DevOps | DevOps Engineer | Cloud Architect**

<p align="center">
  <img src="https://img.shields.io/badge/Status-Produção-success?style=for-the-badge&logo=github" alt="Status">
  <img src="https://img.shields.io/badge/Deploy-Netlify-blueviolet?style=for-the-badge&logo=netlify" alt="Netlify">
  <img src="https://img.shields.io/badge/Stack-React_|_TS_|_Tailwind_|_Motion-blue?style=for-the-badge&logo=react" alt="Stack">
  <img src="https://img.shields.io/badge/Architecture-FSD%20Pattern-orange?style=for-the-badge" alt="FSD Architecture">
</p>

---

## 👁️ Visão Geral

Este repositório contém o código-fonte do meu portfólio profissional. Desenvolvido para servir não apenas como uma página de apresentação de projetos e experiências, mas também como uma **vitrine técnica** de engenharia de software frontend moderna, combinando alta performance, UX interativa e organização de código robusta.

🚀 **Acesse o portfólio online:** [am-infrastructure.netlify.app](https://am-infrastructure.netlify.app/)

---

## 🌟 Funcionalidades em Destaque

### 1. Cyber-Portrait 2.0 🤖
* **Parallax 3D**: Efeito dinâmico do avatar reagindo ao movimento do cursor com física de molas.
* **Iluminação Dinâmica**: Sistema de iluminação reativa que segue o cursor do mouse.
* **Tema Fluido**: Transição suave do background entre o "Portal Cósmico" (Dark Mode) e "Nuvens de Vidro" (Light Mode).
* **Badges Físicos**: Badges de ferramentas flutuantes com efeito realista de arraste e inércia.

### 2. Catálogo Holográfico de Serviços 💎
Apresentação interativa e animada das minhas capacidades em TI:
* **Infraestrutura Híbrida**: Clusters Proxmox/VMware, servidores Linux/Windows e gestão de redes.
* **Segurança & Compliance**: Backups imutáveis (Restic/Rclone), criptografia e conformidade LGPD.
* **Automação & DevOps**: Pipelines de CI/CD, IaC (Terraform), Ansible e scripting avançado.
* **Visual Recursivo**: Renderizadores abstratos com rotação perpétua de esferas e elementos 3D.

### 3. Sistema de Temas Dinâmico 🌗
* **Toggle Integrado**: Botão switch global na barra de navegação fluida.
* **Persistência de Tema**: Design e contraste totalmente responsivos e otimizados para ambos os modos.

---

## ⚙️ Stack Tecnológico

| Categoria | Tecnologias Utilizadas |
| :--- | :--- |
| **Core** | React 18, TypeScript, Vite |
| **Estilização** | Tailwind CSS, Lucide Icons, Glassmorphism |
| **Animações** | Framer Motion (Motion.dev) |
| **Roteamento** | React Router DOM v6 |
| **Arquitetura** | Feature-Sliced Design (FSD) |

---

## 📂 Arquitetura de Diretórios (FSD Pattern)

O projeto é estruturado de acordo com a metodologia **Feature-Sliced Design (FSD)**, garantindo desacoplamento, testabilidade e escalabilidade:

```text
src/
├── app/          # Configurações globais (Rotas, Estilos, Providers)
├── entities/     # Modelos de Domínio (User, Skill, Project - Dados Reais)
│   ├── user/     # Dados do profissional (Currículo, Cargos, Habilidades)
│   └── project/  # Lista de repositórios do GitHub estruturada
├── features/     # Funcionalidades interativas com estado
├── pages/        # Telas da Aplicação (Home, Expertise, OpenSource, Contact)
├── shared/       # Componentes agnósticos reutilizáveis (UI Kit, libs, motion helpers)
└── widgets/      # Elementos compostos complexos (Navbar, Footer, Hero, AvatarVisual)
```

---

## 🚀 Instalação e Execução Local

### Pré-requisitos
* Node.js v18+ instalado
* NPM ou Yarn instalado

### Passos para Rodar:

1. **Clonar o Repositório:**
   ```bash
   git clone git@github.com:ManoAlee/alessandro-meneses-portfolio.git
   cd alessandro-meneses-portfolio
   ```

2. **Instalar Dependências:**
   ```bash
   npm install
   ```

3. **Rodar em Modo de Desenvolvimento:**
   ```bash
   npm run dev
   ```
   *(Acesse o projeto em `http://localhost:5173`)*

4. **Compilar para Produção (Build):**
   ```bash
   npm run build
   ```

---

## 📩 Contato e Redes

* **E-mail:** ale_meneses2004@hotmail.com
* **LinkedIn:** [linkedin.com/in/alessandromeneses](https://www.linkedin.com/in/alessandromeneses)
* **GitHub:** [github.com/ManoAlee](https://github.com/ManoAlee)

---

<p align="center">
  <b>© 2026 Alessandro Meneses</b><br>
  <i>Infraestrutura SRE, DevOps & Cloud com foco em Alta Disponibilidade e Segurança.</i>
</p>
