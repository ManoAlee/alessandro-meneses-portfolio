# Alessandro Meneses — Portfólio

[![Pages build & deploy](https://github.com/ManoAlee/alessandro-meneses-portfolio/actions/workflows/pages.yml/badge.svg)](https://github.com/ManoAlee/alessandro-meneses-portfolio/actions)

Repositório oficial do portfólio de Alessandro Meneses (GitHub: `manoalee`). Este projeto foi criado com Vite + React + Tailwind CSS e contém a aplicação, scripts de desenvolvimento e CI para build.

## Resumo do projeto

- Nome recomendado do repositório: `alessandro-meneses-portfolio`
- Tagline: "Infraestrutura · Automação · Suporte Técnico · Operações orientadas por dados"

## Descrição

Este repositório contém a aplicação do portfólio construída com React + Vite + Tailwind CSS. O projeto apresenta experiência em administração de servidores, redes, automação (PowerShell/Bash/Python), backup (Restic/Rclone) e visualização de dados (Power BI).

## Como publicar este repositório no GitHub

1. Inicializar git (se ainda não):

```powershell
cd "C:\Users\Byale\Projet oPortifolio\meu-portfolio"
git init
git add .
git commit -m "chore: initial portfolio scaffold"
```

2. Criar repositório no GitHub (opção A: GH CLI — recomendada):

```powershell
# autentique-se com: gh auth login
gh repo create ManoAlee/alessandro-meneses-portfolio --public --description "Portfólio técnico de Alessandro Meneses — Infraestrutura, Automação e Suporte Técnico" --homepage "https://manoalee.github.io/alessandro-meneses-portfolio" --source . --remote origin
git push -u origin main
```

Opção B: criar pelo site GitHub e adicionar remoto manualmente:

```powershell
git remote add origin https://github.com/ManoAlee/alessandro-meneses-portfolio.git
git push -u origin main
```

3. Habilitar GitHub Pages (opcional) — pública via branch `gh-pages` ou `main` + GitHub Pages settings.

## Deploy (guia rápido)

Build localmente e verifique a saída:

```powershell
npm ci
npm run build
```

Servir o build para verificação (preview):

```powershell
npm run serve
# por padrão o preview estará em http://localhost:5173
```

Publicação automática:

- O workflow `.github/workflows/pages.yml` builda `dist/` e publica usando GitHub Pages quando você dá push em `main`.
- Se preferir publicar manualmente, instale `gh-pages` e publique:

```powershell
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
```

## Estrutura do projeto

- `public/`: arquivos estáticos (HTML, manifest, imagens)
- `src/`: código-fonte (React + TypeScript)
  - `components/` - componentes reutilizáveis
  - `pages/` - páginas da aplicação
  - `styles/` - css/tailwind
  - `data/` - conteúdo (projetos, usuário)

## Instalação e execução

```powershell
git clone <URL_DO_REPOSITORIO>
cd meu-portfolio
npm install
npm run dev
```

## Makefile e atalhos rápidos

Este repositório inclui um `Makefile` com alvos úteis e scripts PowerShell para acelerar o fluxo de desenvolvimento. Você pode usar o `make` (no WSL ou sistemas Unix) ou os atalhos npm abaixo no Windows.

Exemplos com Make:

```bash
make help        # lista os alvos disponíveis
make install     # npm install
make dev         # inicia o servidor de desenvolvimento
make build       # build de produção
make quick-push MSG="mensagem" VERIFY=1 FORCE=1   # usa o scripts/quick-push.ps1
make reverify    # roda a verificação completa e empurra se tudo ok
```

Atalhos npm (Windows / cross-platform):

```powershell
npm run quick-push     # abre prompt para mensagem e faz commit/push (usa scripts/quick-push.ps1)
npm run reverify-push  # executa verificação completa (typecheck + build) e faz push se passar
```

## Contato

Para entrar em contato, envie um e-mail para: ale_meneses2004@hotmail.com

---

Se quiser que eu substitua o `README.md` principal pelo conteúdo em Português, me diga e eu faço essa alteração (apagar o README atual e renomear este arquivo).