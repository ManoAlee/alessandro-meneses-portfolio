<#
scripts/reverify-and-push.ps1
Runs a local verification (typecheck + build) and only pushes if verification succeeds.
Usage: PowerShell -ExecutionPolicy Bypass -File .\scripts\reverify-and-push.ps1
#>

param(
    [string]$Remote = 'origin',
    [string]$Branch = 'main'
)

function Test-CommandExists { param([string]$cmd) return $null -ne (Get-Command $cmd -ErrorAction SilentlyContinue) }

if (-not (Test-CommandExists -cmd "node")) { Write-Error "node not found. Install Node.js LTS first."; exit 1 }
if (-not (Test-CommandExists -cmd "npm"))  { Write-Error "npm not found. Install Node.js LTS first."; exit 1 }
if (-not (Test-CommandExists -cmd "git"))  { Write-Error "git not found."; exit 1 }

Push-Location (Split-Path -Parent $MyInvocation.MyCommand.Path)\..\

Write-Host "[reverify] Installing dependencies (npm install)..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) { Write-Error "npm install failed."; Pop-Location; exit 1 }

Write-Host "[reverify] Running typecheck (tsc --noEmit)..." -ForegroundColor Yellow
npm run typecheck
if ($LASTEXITCODE -ne 0) { Write-Error "Typecheck failed. Fix TypeScript errors before pushing."; Pop-Location; exit 1 }

Write-Host "[reverify] Building project (vite build)..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Build failed."; Pop-Location; exit 1 }

Write-Host "[reverify] Verification passed. Pushing to $Remote/$Branch..." -ForegroundColor Green
git push $Remote HEAD:$Branch
if ($LASTEXITCODE -ne 0) { Write-Error "git push failed."; Pop-Location; exit 1 }

Write-Host "[reverify] Push complete." -ForegroundColor Green
Pop-Location
