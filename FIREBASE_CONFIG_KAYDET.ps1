param(
  [switch]$Deploy
)

$ErrorActionPreference = "Stop"

function Read-ConfigText {
  try {
    $clip = Get-Clipboard -Raw -ErrorAction Stop
    if ($clip -match "firebaseConfig" -or $clip -match "apiKey") {
      Write-Host "Panodaki Firebase config kullaniliyor." -ForegroundColor Green
      return $clip
    }
  } catch {}

  Write-Host "Firebase Console'dan kopyaladigin config blogunu buraya yapistir." -ForegroundColor Cyan
  Write-Host "Bitirmek icin bos satirda ENTER'a bas." -ForegroundColor Cyan
  $lines = New-Object System.Collections.Generic.List[string]
  while ($true) {
    $line = Read-Host
    if ([string]::IsNullOrWhiteSpace($line)) { break }
    $lines.Add($line)
  }
  return ($lines -join "`n")
}

function Get-ConfigValue {
  param(
    [string]$Text,
    [string]$Key,
    [switch]$Optional
  )
  $pattern = "(?m)['""]?$([regex]::Escape($Key))['""]?\s*:\s*['""]([^'""]+)['""]"
  $match = [regex]::Match($Text, $pattern)
  if ($match.Success) { return $match.Groups[1].Value.Trim() }
  if ($Optional) { return "" }
  throw "$Key bulunamadi. Firebase web app config blogunu eksiksiz kopyala."
}

$text = Read-ConfigText
$config = [ordered]@{
  apiKey = Get-ConfigValue $text "apiKey"
  authDomain = Get-ConfigValue $text "authDomain"
  projectId = Get-ConfigValue $text "projectId"
  storageBucket = Get-ConfigValue $text "storageBucket" -Optional
  messagingSenderId = Get-ConfigValue $text "messagingSenderId" -Optional
  appId = Get-ConfigValue $text "appId"
  measurementId = Get-ConfigValue $text "measurementId" -Optional
}

$configLines = $config.GetEnumerator() | ForEach-Object {
  if ($_.Value) { "    $($_.Key): `"$($_.Value)`"," } else { "    $($_.Key): `"`"," }
}

$content = @"
window.OTEL_CONFIG = {
  apiBaseUrl: "",
  firebaseAppId: "otel-yonetim",
  firebase: {
$($configLines -join "`n")
  },
};
"@

$configPath = Join-Path $PSScriptRoot "config.js"
Set-Content -LiteralPath $configPath -Value $content -Encoding UTF8

Write-Host ""
Write-Host "Firebase config.js icine kaydedildi." -ForegroundColor Green
Write-Host "Project ID: $($config.projectId)"

if (-not $Deploy) {
  $answer = Read-Host "Bu ayari GitHub Pages'e hemen deploy edeyim mi? (E/H)"
  if ($answer -match "^[EeYy]") { $Deploy = $true }
}

if ($Deploy) {
  & (Join-Path $PSScriptRoot "DEPLOY_ET.ps1")
}
