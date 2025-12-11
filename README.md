# Alessandro Meneses — Portfólio

Repositório oficial do portfólio de Alessandro Meneses (GitHub: `manoalee`). Este projeto foi criado com Vite + React + Tailwind CSS e contém a aplicação, scripts de desenvolvimento e CI para build.

Resumo do projeto

- Nome recomendado do repositório: `alessandro-meneses-portfolio`
- Tagline: "Infraestrutura · Automação · Suporte Técnico · Data-driven Operations"

Descrição curta
Este repositório contém a aplicação do portfólio construída com React + Vite + Tailwind CSS. O projeto foca em apresentar experiência técnica em administração de servidores, redes, automação (PowerShell/Bash/Python), backup (Restic/Rclone) e visualização de dados (Power BI).

Como publicar este repositório no GitHub

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
gh repo create ManoAlee/alessandro-meneses-portfolio --public --description "Portfólio técnico de Alessandro Meneses — Infraestrutura, Automação e Suporte Técnico" --homepage "https://ManoAlee.github.io/alessandro-meneses-portfolio" --source . --remote origin
git push -u origin main
```

Opção B: criar pelo site GitHub e adicionar remoto manualmente:

```powershell
git remote add origin https://github.com/ManoAlee/alessandro-meneses-portfolio.git
git push -u origin main
```

3. Habilitar GitHub Pages (opcional) — pública via branch `gh-pages` ou `main` + GitHub Pages settings.

Comandos rápidos para deploy via GitHub Pages (gh-pages):

```powershell
npm install --save-dev gh-pages
# build
npm run build
# publish
npx gh-pages -d dist
```

Conteúdo profissional incluído

- README com instruções de desenvolvimento e deploy
- MIT License
- GitHub Actions workflow (`.github/workflows/ci.yml`) que valida build no push/PR
- Scripts PowerShell para facilitar setup/start em Windows

Boas práticas e recomendações

- Preencha o campo `author` em `package.json` com seu e‑mail real.
- Atualize `index.html` Open Graph tags com uma imagem gerada (adicione `public/og-image.png`).
- Ao publicar, adicione uma seção de 'Projects / Case studies' com README por projeto (use MDX se quiser).

Se quiser, eu posso:

- Criar os arquivos de caso de estudo (2–3) e imagens otimizadas para `public/`.
- Gerar o comando `gh repo create` pronto com seu usuário GitHub (já usei `ManoAlee` como exemplo).
- Configurar deploy automático no GitHub Pages via Actions.

# Meu Portfolio — Setup e execução

Este repositório é um projeto Vite + React + TypeScript. Eu preparei templates e scripts para rodar o ambiente de desenvolvimento local com segurança.

O que foi adicionado/ajustado

- `public/index.html` — template Vite com mount point `#root`.
- `index.html` (raiz) — cópia do template para uso no root se necessário.
- `package.json` — scripts úteis: `dev`, `build`, `serve`, `kill-port`, `restart`, `start`.
- `scripts/restart-all.ps1` — PowerShell helper que executa `npm run restart`.
- `Makefile` — alvo `restart-all` que executa o PowerShell script.
- `scripts/check-env.ps1` — script para verificar se `node`/`npm` estão instalados.

Pré-requisitos

- Node.js (recomendado LTS). O `npm` precisa estar disponível no PATH.

Verificar ambiente (PowerShell)

```powershell
# No terminal PowerShell execute no diretório do projeto:
cd "C:\Users\Byale\Projet oPortifolio\meu-portfolio"
powershell -ExecutionPolicy Bypass -File .\scripts\check-env.ps1
```

Instalar dependências e iniciar (após garantir Node/npm)

```powershell
cd "C:\Users\Byale\Projet oPortifolio\meu-portfolio"
npm install
# não é obrigatório instalar kill-port porque o script usa `npx`, que baixa temporariamente
npm run restart
```

Usar o PowerShell helper (opção alternativa)

```powershell
cd "C:\Users\Byale\Projet oPortifolio\meu-portfolio"
powershell -ExecutionPolicy Bypass -File .\scripts\restart-all.ps1
```

Se preferir `make` (por ex. no WSL ou com make instalado):

```powershell
cd "C:\Users\Byale\Projet oPortifolio\meu-portfolio"
make restart-all
```

Notas

- O ambiente remoto onde eu executei os comandos aqui não tinha `npm` disponível, então eu não pude rodar `npm install` por você.
- Se quiser que eu tente executar comandos novamente aqui, instale/ative o Node.js no ambiente ou me informe que já está disponível.

Se precisar, eu posso também: adicionar `kill-port` como devDependency no `package.json` (requer `npm install` depois), adicionar tarefas do VS Code, ou criar um README em português/inglês mais detalhado.

# Meu Portfólio

Este é o meu portfólio pessoal, desenvolvido com React e TypeScript. Aqui você encontrará informações sobre mim, meus projetos e como entrar em contato.

## Estrutura do Projeto

O projeto é organizado da seguinte forma:

- **public/**: Contém arquivos estáticos, incluindo o HTML principal e o manifesto para PWA.

  - `index.html`: O ponto de entrada da aplicação.
  - `manifest.json`: Metadados sobre a aplicação.

- **src/**: Contém o código-fonte da aplicação.
  - `main.tsx`: O ponto de entrada da aplicação React.
  - `App.tsx`: O componente principal que configura a aplicação.
  - **components/**: Contém componentes reutilizáveis.
    - `Header.tsx`: Componente de cabeçalho com navegação.
    - `Footer.tsx`: Componente de rodapé com informações de copyright.
    - `ProjectCard.tsx`: Componente para exibir informações de projetos individuais.
  - **pages/**: Contém as páginas da aplicação.
    - `Home.tsx`: Página inicial que apresenta projetos em destaque.
    - `About.tsx`: Página sobre mim, incluindo habilidades e experiência.
  - **styles/**: Contém arquivos de estilo.
    - `globals.css`: Estilos globais para a aplicação.
    - `App.module.css`: Estilos específicos do componente App.
  - **data/**: Contém dados estáticos.
    - `projects.ts`: Array de objetos de projeto.
  - **types/**: Contém definições de tipos TypeScript.
    - `index.ts`: Interfaces e tipos utilizados na aplicação.

## Instalação

Para rodar este projeto, você precisa ter o Node.js instalado. Siga os passos abaixo:

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue até o diretório do projeto:
   ```
   cd meu-portfolio
   ```
3. Instale as dependências:
   ```
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

## Funcionalidades

- Navegação entre páginas (Home e About).
- Exibição de projetos com detalhes.
- Design responsivo e moderno.

## Contato

Para entrar em contato, você pode me encontrar nas redes sociais ou enviar um e-mail para [seu-email@example.com].
