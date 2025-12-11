<#
.\scripts\quick-push.ps1
Fluxo rápido para commitar e subir alterações ao repositório.

Uso:
  # commit with prompt for message and push
  powershell -ExecutionPolicy Bypass -File .\scripts\quick-push.ps1

  # pass a message directly
  powershell -ExecutionPolicy Bypass -File .\scripts\quick-push.ps1 -Message "feat: atualiza hero"

  # run full verification (instala deps, typecheck, build) then push (uses reverify-and-push.ps1)
  powershell -ExecutionPolicy Bypass -File .\scripts\quick-push.ps1 -Verify

Parâmetros:
  -Message <string>  Mensagem de commit. Se omitida, o script pedirá.
  -Verify            Executa o script de verificação completo (scripts/reverify-and-push.ps1).
  -Force             Pula confirmação antes do push.
#>

param(
    [string]$Message,
    [switch]$Verify,
    [switch]$Force
)

Set-StrictMode -Version Latest
function Test-CommandExists { param([string]$cmd) return $null -ne (Get-Command $cmd -ErrorAction SilentlyContinue) }

if (-not (Test-CommandExists -cmd "git")) { Write-Error "git não encontrado. Instale o Git primeiro."; exit 1 }

$repoRoot = Resolve-Path "$(Split-Path -Parent $MyInvocation.MyCommand.Path)\.."
Set-Location $repoRoot

if ($Verify) {
    Write-Host "[quick-push] Executando verificação completa (scripts/reverify-and-push.ps1)..." -ForegroundColor Cyan
    powershell -ExecutionPolicy Bypass -File .\scripts\reverify-and-push.ps1
    exit $LASTEXITCODE
}

# Detecta mudanças
$changes = git status --porcelain
if (-not $changes) {
    Write-Host "Nenhuma alteração local para commitar." -ForegroundColor Yellow
    exit 0
}

Write-Host "Alterações encontradas:" -ForegroundColor Green
Write-Host $changes

if (-not $Message) {
    $Message = Read-Host "Mensagem de commit (deixe vazio para cancelar)"
    if (-not $Message) { Write-Host "Cancelado pelo usuário."; exit 1 }
}

git add -A
try {
    git commit -m $Message
} catch {
    Write-Error "Falha ao commitar: $_"; exit 1
}

if (-not $Force) {
    $confirm = Read-Host "Confirmar push para origin/main? (s/N)"
    if ($confirm -notin @('s','S','y','Y')) { Write-Host "Push cancelado."; exit 0 }
}

Write-Host "Fazendo push para origin/main..." -ForegroundColor Cyan
if (git push origin main) {
    Write-Host "Push concluído." -ForegroundColor Green
    exit 0
} else {
    Write-Error "Falha no push. Verifique o estado do git e tente novamente."; exit 1
}
