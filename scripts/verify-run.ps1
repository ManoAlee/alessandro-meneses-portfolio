<#
 scripts/verify-run.ps1
 Script para verificar e testar localmente se o projeto builda e roda em preview.
 Uso: PowerShell -ExecutionPolicy Bypass -File .\scripts\verify-run.ps1
#>

param(
    [switch]$NoInstall
)

function Test-CommandExists { param([string]$cmd) return $null -ne (Get-Command $cmd -ErrorAction SilentlyContinue) }

Write-Host "[verify-run] Starting verification..." -ForegroundColor Cyan

if (-not (Test-CommandExists -cmd "node")) { Write-Error "node not found. Install Node.js LTS first."; exit 1 }
if (-not (Test-CommandExists -cmd "npm"))  { Write-Error "npm not found. Install Node.js LTS first."; exit 1 }

Push-Location (Split-Path -Parent $MyInvocation.MyCommand.Path)\..\

if (-not $NoInstall) {
    Write-Host "[verify-run] Installing dependencies (npm install)..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) { Write-Error "npm install failed."; Pop-Location; exit 1 }
}

Write-Host "[verify-run] Building project (npm run build)..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Build failed."; Pop-Location; exit 1 }

Write-Host "[verify-run] Starting preview server (npm run serve) in background..." -ForegroundColor Yellow
# Start preview in a new PowerShell job so this script can continue to verify port
$job = Start-Job -ScriptBlock { cd (Resolve-Path .).Path; npm run serve --silent } -InitializationScript { } 
Start-Sleep -Seconds 2

# check for listening port (default 5173)
$tries=0
while ($tries -lt 10) {
    $conn = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
    if ($conn) { break }
    Start-Sleep -Seconds 1
    $tries++
}

if ($conn) {
    Write-Host "[verify-run] Preview server is listening on port 5173." -ForegroundColor Green
    Write-Host "Open http://localhost:5173 in your browser." -ForegroundColor Green
} else {
    Write-Warning "[verify-run] Preview server did not start or port 5173 not open. Check npm run serve logs." 
    Receive-Job -Job $job -Keep | Out-String | Write-Host
}

Write-Host "[verify-run] Done. To stop preview server, find the job and stop it or run: Get-Job | Stop-Job; Get-Job | Remove-Job" -ForegroundColor Cyan

Pop-Location
