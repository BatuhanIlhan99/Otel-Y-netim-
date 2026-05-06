param(
  [string]$ApiUrl = "",
  [switch]$Deploy
)

$ErrorActionPreference = "Stop"

function Clean-Url {
  param([string]$Value)
  return ($Value.Trim() -replace "/+$", "")
}

if (-not $ApiUrl) {
  try {
    $clip = (Get-Clipboard -Raw -ErrorAction Stop).Trim()
    if ($clip -match "^https://") {
      $ApiUrl = $clip
      Write-Host "Panodaki bulut backend adresi kullaniliyor: $ApiUrl" -ForegroundColor Green
    }
  } catch {}
}

if (-not $ApiUrl) {
  $ApiUrl = Read-Host "Render bulut backend adresini yaz (ornek: https://otel-yonetim.onrender.com)"
}

$ApiUrl = Clean-Url $ApiUrl
if ($ApiUrl -notmatch "^https://[A-Za-z0-9.-]+(:\d+)?($|/)") {
  throw "Bulut backend adresi https ile baslamali. Ornek: https://otel-yonetim.onrender.com"
}

$ConfigPath = Join-Path $PSScriptRoot "config.js"
$Content = @"
window.OTEL_CONFIG = {
  apiBaseUrl: "$ApiUrl",
};
"@

Set-Content -LiteralPath $ConfigPath -Value $Content -Encoding UTF8
Write-Host "config.js bulut backend adresiyle guncellendi." -ForegroundColor Green
Write-Host "API: $ApiUrl"

if (-not $Deploy) {
  $answer = Read-Host "Bu ayari GitHub Pages'e hemen deploy edeyim mi? (E/H)"
  if ($answer -match "^[EeYy]") {
    $Deploy = $true
  }
}

if ($Deploy) {
  & (Join-Path $PSScriptRoot "DEPLOY_ET.ps1")
}
