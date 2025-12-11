# Regras e Instruções para AIs que Analisam este Projeto

Este documento descreve orientações claras, comandos e regras de conduta para agentes automatizados (AIs / bots) que irão analisar, verificar e interagir com este repositório.

Objetivo
- Fornecer um checklist reproduzível que permite a uma AI: verificar build, rodar typecheck, executar linters, gerar relatórios de segurança e performance, e sugerir ou aplicar correções de baixo risco.

Ambiente recomendado
- Sistema: Linux / Ubuntu (CI), Windows (desenvolvimento local suportado).
- Node.js: 18.x LTS (usado em workflows). `npm` disponível.
- Comandos essenciais:
  - `npm ci` — instalar dependências em CI
  - `npm install` — instalar localmente
  - `npm run typecheck` — apenas checagem TypeScript (sem emitir arquivos)
  - `npm run build` — build de produção (gera `dist/`)
  - `npm run dev` — iniciar servidor de desenvolvimento (Vite)

Regras de leitura e escopo
- Comece lendo arquivos principais: `package.json`, `vite.config.ts`, `tsconfig.json`, `postcss.config.js`, `tailwind.config.js`.
- Verifique pontos de entrada: `index.html`, `src/main.tsx`, `src/App.tsx`.
- Verifique dados de conteúdo em `src/data/` (projetos, usuário) para possíveis textos a traduzir ou ajustar.

Checklist de verificações (ordem sugerida)
1. Segurança básica
   - Não exfiltrar segredos. Se encontrar chaves/credentials, pare a execução e abra uma issue (não faça commit nem logue o segredo).
   - Verificar `.gitignore` e history por arquivos sensíveis.
2. Instalação e build
   - Executar `npm ci` (preferível em CI) ou `npm install` local.
   - Executar `npm run typecheck`. Se falhar, gerar um relatório com erros TypeScript.
   - Executar `npm run build` e confirmar que `dist/` foi gerado.
3. Lint e qualidade de código
   - Se houver ESLint/Prettier configurados, executar e reportar resultados. (Se não existir, sugerir configuração.)
4. Testes
   - Executar qualquer suíte de testes (`npm test`) se existir. Reportar cobertura se a ferramenta estiver configurada.
5. Performance e bundle
   - Executar `vite build` e reportar tamanhos de bundle (arquivos em `dist/assets`).
   - Identificar ativos maiores que 200 KB e sugerir divisão de código ou compressão.
6. Acessibilidade e SEO (opcional)
   - Validar `index.html` meta tags OG e título. Sugerir melhorias.
7. Relatório final
   - Produzir um arquivo JSON e um resumo em Markdown com:
     - Status: PASS/FAIL para cada etapa do checklist
     - Erros e avisos (com trechos de logs)
     - Sugestões de correção (passos concretos)

Regras de modificação automática (apenas mudanças de baixo risco)
- A AI pode aplicar automaticamente correções quando:
  - São mudanças de formatação (Prettier) sem alterar a lógica.
  - Adição de `devDependencies` ausentes necessários para build (ex.: `@vitejs/plugin-react`) e atualização de lockfile via `npm install` — somente se o projeto não tem políticas contrárias.
  - Correções triviais em README, metadados (`package.json`) ou textos estáticos em `src/data/` quando explicitamente solicitado.
- A AI NÃO deve aplicar automaticamente:
  - Mudanças que alterem a lógica de negócio do código.
  - Remover ou substituir dependências sem explicar impacto.
  - Commitar chaves, credenciais ou arquivos binários grandes sem revisão humana.

Formato de commits/PRs gerados por AI
- Mensagem de commit: prefixo claro, por exemplo `fix(ci): ...`, `chore(docs): ...`, `feat(ui): ...`.
- Corpo do commit: resumo curto + linhas com "Por que" e "Como testar".
- Ao gerar PR: incluir checklist das verificações locais e links para artefatos do CI.

Como reproduzir localmente (comandos)
```powershell
cd <repositorio>
npm install
npm run typecheck
npm run build
npm run dev
```

Política de segurança e privacidade
- Nunca faça upload de logs contendo valores sensíveis para serviços públicos.
- Se uma verificação encontrar um secret, crie uma issue privada (ou sinalize com label `security`) e notifique o proprietário do repositório.

Integração com CI
- O repositório já contém workflows: `ci.yml` (typecheck + build) e um workflow de Pages que é executado após sucesso do CI.
- A AI pode acionar re-runs do workflow via API, mas deve anotar e explicar a razão do re-run no PR ou issue.

Formato de relatório (exemplo resumido)
```json
{
  "status": "FAIL",
  "checks": {
    "typecheck": { "status": "PASS" },
    "build": { "status": "PASS" },
    "lint": { "status": "WARN", "messages": ["No ESLint configured"] }
  },
  "artifacts": {
    "bundleSizes": { "main.js": 348120 }
  }
}
```

Etiquetas e issues
- Ao abrir issues automáticas, usar labels: `ai/analysis`, `security`, `ci-failure`, `suggestion`.

Contato e aprovação humana
- Todas as mudanças não triviais geradas pela AI devem ser revisadas por um mantenedor humano antes de mesclagem. A AI deve incluir instruções claras de como testar as mudanças localmente.

Observações finais
- Este documento pode ser atualizado conforme necessidades. Ao propor mudanças nas regras, a AI deve abrir uma PR com `docs: atualiza AI_ANALYSIS.md` e descrever o motivo.

---

Arquivo criado automaticamente por solicitação do mantenedor. Se quiser, eu também posso:
- Adicionar um `ISSUE_TEMPLATE` que preencha campos de análise automática.
- Criar um workflow GitHub Actions que executa este checklist e publica o JSON de relatório como artefato.
