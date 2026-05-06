$ErrorActionPreference = "Continue"

$GitExe = "C:\Program Files\Git\cmd\git.exe"
$Work = "C:\Users\batu\AppData\Local\Temp\otel-yonetim-pages-fix-20260505-150733"
$Token = $env:OTEL_GITHUB_TOKEN

if ([string]::IsNullOrWhiteSpace($Token)) {
  throw "OTEL_GITHUB_TOKEN bos."
}
if (-not (Test-Path -LiteralPath $Work)) {
  throw "Push klasoru bulunamadi: $Work"
}

$AskPass = Join-Path $env:TEMP "otel-pages-retry-askpass.cmd"
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
  $env:GIT_ASKPASS = $AskPass
  $env:GIT_TERMINAL_PROMPT = "0"
  for ($i = 1; $i -le 3; $i += 1) {
    Write-Host "Push denemesi $i"
    & $GitExe -C $Work -c http.sslBackend=openssl -c credential.helper= push origin main
    if ($LASTEXITCODE -eq 0) {
      Write-Host "PUSH_OK" -ForegroundColor Green
      exit 0
    }
    Start-Sleep -Seconds 5
  }
  throw "Push 3 denemede basarisiz oldu."
} finally {
  Remove-Item Env:\GIT_ASKPASS -ErrorAction SilentlyContinue
  Remove-Item Env:\GIT_TERMINAL_PROMPT -ErrorAction SilentlyContinue
  Remove-Item -LiteralPath $AskPass -Force -ErrorAction SilentlyContinue
}
