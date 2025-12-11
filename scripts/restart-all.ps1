<#
  scripts/restart-all.ps1
  Reinicia o ambiente de desenvolvimento local de forma segura.
  Executa `npm run restart` (libera porta 5173 e roda `npm run dev`).
  Execute com: PowerShell -ExecutionPolicy Bypass -File scripts/restart-all.ps1
#>

Param(
    [switch]$NoDev
)

# Ir para o diretório do script (projeto)
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptDir

Write-Host "[restart-all] Running restart script (will free port 5173 then start dev server)..."

try {
    npm run restart
    if (-not $NoDev) {
        Write-Host "[restart-all] Dev server started."
    }
} catch {
    Write-Error "[restart-all] Failed to run restart: $_"
    exit 1
}

Write-Host "[restart-all] Done."
