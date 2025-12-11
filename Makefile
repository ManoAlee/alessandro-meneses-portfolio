
## Makefile - targets úteis para desenvolvimento em ambientes que têm make

.PHONY: install start restart-all start-all

# Instala dependências do projeto via npm
install:
	npm install

# Inicia o servidor (usa o script npm `restart` que libera porta e inicia vite)
start:
	npm run restart

# Chama o script PowerShell que orquestra restart
restart-all:
	powershell -ExecutionPolicy Bypass -File scripts/restart-all.ps1

# Instala e inicia tudo (útil para um único comando)
start-all: install restart-all
	@echo "Started project (install + restart)"
