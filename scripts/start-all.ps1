<#
 start-all.ps1
 Instala dependências e inicia o servidor de desenvolvimento sem precisar do make.
 Uso: PowerShell -ExecutionPolicy Bypass -File .\start-all.ps1
#>

Write-Host "[start-all] Verificando node/npm..." -ForegroundColor Cyan

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "node não encontrado. Feche e reabra o PowerShell ou instale Node.js LTS e tente novamente.";
    exit 1
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error "npm não encontrado. Feche e reabra o PowerShell ou instale Node.js LTS e tente novamente.";
    exit 1
}

$proj = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $proj

Write-Host "[start-all] Instalando dependências (npm install)..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) { Write-Error "npm install falhou."; exit 1 }

Write-Host "[start-all] Iniciando restart-all (libera porta 5173 e inicia dev)..." -ForegroundColor Yellow
powershell -ExecutionPolicy Bypass -File .\scripts\restart-all.ps1

Write-Host "[start-all] Pronto. Se o servidor tiver iniciado, abra http://localhost:5173" -ForegroundColor Green
