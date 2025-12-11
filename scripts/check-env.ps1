<#
  scripts/check-env.ps1
  Verifica se node/npm/npx estão disponíveis e fornece comandos de instalação sugeridos.
  Uso: PowerShell -ExecutionPolicy Bypass -File .\scripts\check-env.ps1
#>

function Test-CommandExists {
    param([string]$cmd)
    $null -ne (Get-Command $cmd -ErrorAction SilentlyContinue)
}

Write-Host "[check-env] Verificando Node.js / npm / npx..." -ForegroundColor Cyan

$hasNode = Test-CommandExists -cmd "node"
$hasNpm = Test-CommandExists -cmd "npm"
$hasNpx = Test-CommandExists -cmd "npx"

if ($hasNode) { Write-Host "node ->" (node -v) -ForegroundColor Green } else { Write-Host "node -> NÃO ENCONTRADO" -ForegroundColor Red }
if ($hasNpm)  { Write-Host "npm  ->" (npm -v) -ForegroundColor Green } else { Write-Host "npm  -> NÃO ENCONTRADO" -ForegroundColor Red }
if ($hasNpx)  { Write-Host "npx  ->" (npx -v) -ForegroundColor Green } else { Write-Host "npx  -> NÃO ENCONTRADO" -ForegroundColor Yellow }

if (-not $hasNode -or -not $hasNpm) {
    Write-Host "\nRecomendações para instalar Node.js (escolha um):" -ForegroundColor Cyan
    Write-Host "- Usar winget (Windows 10/11):`n  winget install OpenJS.NodeJS.LTS -e --source winget" -ForegroundColor White
    Write-Host "- Usar Chocolatey (requer admin):`n  choco install nodejs-lts -y" -ForegroundColor White
    Write-Host "- Ou baixe o instalador: https://nodejs.org/ (LTS)" -ForegroundColor White
    Write-Host "\nApós instalar, feche e reabra o PowerShell e rode este script novamente." -ForegroundColor Yellow
    exit 1
}

Write-Host "\nAmbiente OK. Você pode instalar dependências e iniciar o dev server: " -ForegroundColor Green
Write-Host "cd \"$(Get-Location)\"; npm install; npm run restart" -ForegroundColor White
<#
  scripts/check-env.ps1
  Verifica se Node.js e npm estão instalados e mostra sugestões de instalação para Windows.
#>

Write-Host "[check-env] Verificando Node.js / npm..."

$node = & node -v 2>$null
$npm = & npm -v 2>$null

if ($LASTEXITCODE -eq 0 -and $node -ne $null -and $npm -ne $null) {
    Write-Host "Node encontrado: $node"
    Write-Host "npm encontrado: $npm"
    exit 0
}

Write-Warning "Node.js / npm não encontrados ou não disponíveis no PATH."

Write-Host "Opções para instalar no Windows:"
Write-Host "1) winget (recomendado, se disponível):`
  winget install OpenJS.NodeJS.LTS -e --source winget`
2) Chocolatey (admin):`
  choco install nodejs-lts -y`
3) Baixar instalador manual: https://nodejs.org/ (LTS)
"

Write-Host "Após instalar, abra uma nova janela do PowerShell e rode:`n  node -v` e `npm -v` para confirmar."

exit 1
