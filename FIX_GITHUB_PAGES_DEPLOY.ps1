$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/BatuhanIlhan99/Otel-Y-netim-.git"
$Branch = "main"
$Root = $PSScriptRoot
$Token = $env:OTEL_GITHUB_TOKEN

if ([string]::IsNullOrWhiteSpace($Token)) {
  throw "OTEL_GITHUB_TOKEN ortam degiskeni bos. Token panoda kopyaliyken calistir."
}

$GitCommand = Get-Command git -ErrorAction SilentlyContinue
$GitExe = if ($GitCommand) { $GitCommand.Source } else { $null }
if (-not $GitExe) {
  $GitExe = @(
    "C:\Program Files\Git\cmd\git.exe",
    "C:\Program Files\Git\bin\git.exe",
    "C:\Program Files (x86)\Git\cmd\git.exe",
    "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe"
  ) | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
}
if (-not $GitExe) {
  throw "Git bulunamadi."
}

$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$Work = Join-Path $env:TEMP "otel-yonetim-pages-fix-$Stamp"
$AskPass = Join-Path $env:TEMP "otel-pages-askpass-$Stamp.cmd"

@'
@echo off
echo %1 | findstr /i "Username" >nul
if not errorlevel 1 (
  echo BatuhanIlhan99
) else (
  echo %OTEL_GITHUB_TOKEN%
)
'@ | Set-Content -Path $AskPass -Encoding ASCII

try {
  & $GitExe -c http.sslBackend=openssl -c credential.helper= clone --depth 1 $RepoUrl $Work
  if ($LASTEXITCODE -ne 0) { throw "Repo clone basarisiz oldu." }

  Copy-Item -LiteralPath (Join-Path $Root ".github\workflows\pages.yml") -Destination (Join-Path $Work ".github\workflows\pages.yml") -Force

  & $GitExe -C $Work config user.name "BatuhanIlhan99"
  & $GitExe -C $Work config user.email "270341779+BatuhanIlhan99@users.noreply.github.com"
  & $GitExe -C $Work add ".github/workflows/pages.yml"

  $Status = & $GitExe -C $Work status --porcelain
  if ($Status) {
    & $GitExe -C $Work commit -m "Fix GitHub Pages deployment setup"
    if ($LASTEXITCODE -ne 0) { throw "Commit basarisiz oldu." }
  } else {
    Write-Host "Workflow dosyasinda commit edilecek degisiklik yok."
  }

  $env:GIT_ASKPASS = $AskPass
  $env:GIT_TERMINAL_PROMPT = "0"
  & $GitExe -C $Work -c http.sslBackend=openssl -c credential.helper= push origin $Branch
  if ($LASTEXITCODE -ne 0) { throw "Push basarisiz oldu." }

  Write-Host "GitHub Pages workflow duzeltmesi push edildi." -ForegroundColor Green
  & $GitExe -C $Work log --oneline -2
} finally {
  Remove-Item Env:\GIT_ASKPASS -ErrorAction SilentlyContinue
  Remove-Item Env:\GIT_TERMINAL_PROMPT -ErrorAction SilentlyContinue
  Remove-Item -LiteralPath $AskPass -Force -ErrorAction SilentlyContinue
}
