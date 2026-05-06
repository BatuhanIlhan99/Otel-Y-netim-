$ErrorActionPreference = "Stop"

try {
  & (Join-Path $PSScriptRoot "DEPLOY_ET.ps1") @args
} catch {
  Write-Host $_.Exception.Message -ForegroundColor Red
  exit 1
}
