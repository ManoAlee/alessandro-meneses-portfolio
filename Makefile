
## Makefile - targets úteis para desenvolvimento em ambientes que têm make

.PHONY: install start restart-all start-all

# Instala dependências do projeto via npm
## Makefile - Alvos úteis para desenvolvimento
## Observação: este Makefile executa comandos npm e scripts PowerShell.
## No Windows, ele usa o `powershell` embutido; em sistemas Unix com PowerShell Core instalado use `pwsh`.

.PHONY: help install ci-install dev build serve preview typecheck lint test quick-push reverify restart start start-all clean

SHELL := /bin/sh

HELP_TEXT := \
"make <target>\n\nTargets:\n  install        Install dependencies (npm install)\n  ci-install     Install dependencies for CI (npm ci)\n  dev            Start dev server (npm run dev)\n  build          Build production (npm run build)\n  serve          Serve production build (npm run serve)\n  typecheck      Run TypeScript typecheck (npm run typecheck)\n  lint           Run linter if configured (npm run lint)\n  test           Run tests (npm test)\n  quick-push     Quick commit & push (scripts/quick-push.ps1)\n  reverify       Run full verification and push (scripts/reverify-and-push.ps1)\n  restart        Run npm restart script (clears port and starts dev)\n  start-all      install + restart (convenience)\n  clean          Remove build artifacts (dist)\"

help:
	@echo $(HELP_TEXT)

install:
	npm install

ci-install:
	npm ci

dev:
	npm run dev

build:
	npm run build

serve:
	npm run serve

preview: serve

typecheck:
	npm run typecheck

lint:
	@npm run lint || echo "No lint script configured"

test:
	@npm test || echo "No tests configured"

restart:
	npm run restart

start-all: install restart
	@echo "Started project (install + restart)"

clean:
	rm -rf dist

# Quick push: usage:
#   make quick-push MSG="mensagem" VERIFY=1 FORCE=1
quick-push:
	@echo "Running quick-push..."
	@cmd="powershell -ExecutionPolicy Bypass -File ./scripts/quick-push.ps1"; \
	if [ -n "$(MSG)" ]; then cmd="$$cmd -Message \"$(MSG)\""; fi; \
	if [ "$(VERIFY)" = "1" ]; then cmd="$$cmd -Verify"; fi; \
	if [ "$(FORCE)" = "1" ]; then cmd="$$cmd -Force"; fi; \
	echo $$cmd; $$cmd

# Reverify (full verification and push). Use when you want automatic typecheck+build before push.
reverify:
	@echo "Running full verification (reverify-and-push.ps1)..."
	powershell -ExecutionPolicy Bypass -File ./scripts/reverify-and-push.ps1
