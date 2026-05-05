$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/BatuhanIlhan99/Otel-Y-netim-.git"
$Branch = "main"
$CommitMessage = "Deploy otel yonetim uygulamasi"
$PagesUrl = "https://batuhanilhan99.github.io/Otel-Y-netim-/"
$ActionsUrl = "https://github.com/BatuhanIlhan99/Otel-Y-netim-/actions"
$Root = $PSScriptRoot
$LogFile = Join-Path $Root "github-deploy-sonuc.txt"

Start-Transcript -Path $LogFile -Force | Out-Null

try {
  Write-Host "GitHub deploy hazirlaniyor..." -ForegroundColor Cyan
  Write-Host "Log dosyasi: $LogFile"

  $token = $env:OTEL_GITHUB_TOKEN
  if ([string]::IsNullOrWhiteSpace($token)) {
    throw "Token alinamadi. 1-GITHUBA-YUKLE.cmd dosyasini tekrar calistir."
  }

  $gitCommand = Get-Command git -ErrorAction SilentlyContinue
  $gitExe = if ($gitCommand) { $gitCommand.Source } else { $null }
  if (-not $gitExe) {
    $gitCandidates = @(
      "C:\Program Files\Git\cmd\git.exe",
      "C:\Program Files\Git\bin\git.exe",
      "C:\Program Files (x86)\Git\cmd\git.exe",
      "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe"
    )
    $gitExe = $gitCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
  }
  if (-not $gitExe) {
    throw "Git bulunamadi. Git for Windows kurulu olmali."
  }
  Write-Host "Git bulundu: $gitExe"

  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $workTree = Join-Path $env:TEMP "otel-yonetim-upload-$stamp"
  $gitDir = Join-Path $env:TEMP "otel-yonetim-gitdb-$stamp"
  New-Item -ItemType Directory -Path $workTree -Force | Out-Null

  $items = @(
    ".github",
    "backend",
    "data",
    ".env.example",
    ".gitignore",
    "app.js",
    "DEPLOY_GITHUB.cmd",
    "DEPLOY_GITHUB.ps1",
    "DEPLOY_GITHUB_TOKEN.cmd",
    "DEPLOY_GITHUB_TOKEN.ps1",
    "1-GITHUBA-YUKLE.cmd",
    "1-GITHUBA-YUKLE.ps1",
    "GITHUB_YUKLEME.md",
    "index.html",
    "MAIL_KURULUMU.md",
    "package.json",
    "PRODUCTION_CHECKLIST.md",
    "README.md",
    "server.js",
    "START_BACKEND.cmd",
    "START_BACKEND.ps1",
    "START_NODE_BACKEND.cmd",
    "styles.css",
    "YOL_HARITASI.md"
  )

  foreach ($item in $items) {
    $from = Join-Path $Root $item
    if (Test-Path -LiteralPath $from) {
      Copy-Item -LiteralPath $from -Destination $workTree -Recurse -Force
    }
  }

  function Git {
    param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Args)
    & $gitExe --git-dir=$gitDir --work-tree=$workTree @Args
    if ($LASTEXITCODE -ne 0) {
      throw "git $($Args -join ' ') komutu basarisiz oldu."
    }
  }

  Write-Host "Gecici deploy klasoru: $workTree"
  Git init
  Git branch -M $Branch
  Git remote add origin $RepoUrl
  Git config user.name "BatuhanIlhan99"
  Git config user.email "270341779+BatuhanIlhan99@users.noreply.github.com"
  Git add .

  Write-Host ""
  Write-Host "Guvenlik kontrolu: data/*.json dosyalari repository'ye alinmiyor." -ForegroundColor Yellow
  & $gitExe --git-dir=$gitDir --work-tree=$workTree status --ignored -s data

  $status = & $gitExe --git-dir=$gitDir --work-tree=$workTree status --porcelain
  if ($status) {
    Git commit -m $CommitMessage
  } else {
    Write-Host "Commit edilecek degisiklik yok."
  }

  $askPass = Join-Path $env:TEMP "otel-git-askpass-$stamp.cmd"
  @'
@echo off
echo %1 | findstr /i "Username" >nul
if not errorlevel 1 (
  echo BatuhanIlhan99
) else (
  echo %OTEL_GITHUB_TOKEN%
)
'@ | Set-Content -Path $askPass -Encoding ASCII

  try {
    $env:GIT_ASKPASS = $askPass
    $env:GIT_TERMINAL_PROMPT = "0"
    Write-Host ""
    Write-Host "GitHub'a yukleniyor..." -ForegroundColor Cyan
    & $gitExe --git-dir=$gitDir --work-tree=$workTree -c http.sslBackend=openssl -c credential.helper= push -u origin $Branch
    if ($LASTEXITCODE -ne 0) {
      throw "GitHub push basarisiz oldu. Token yetkisini kontrol et: repo ve workflow secili olmali."
    }
  } finally {
    Remove-Item Env:\GIT_ASKPASS -ErrorAction SilentlyContinue
    Remove-Item Env:\GIT_TERMINAL_PROMPT -ErrorAction SilentlyContinue
    Remove-Item -LiteralPath $askPass -Force -ErrorAction SilentlyContinue
  }

  Write-Host ""
  Write-Host "DEPLOY TAMAMLANDI." -ForegroundColor Green
  Write-Host "GitHub Actions: $ActionsUrl"
  Write-Host "Site yayina geldiginde: $PagesUrl"
  Write-Host "Ilk yayin 1-3 dakika surebilir."
} catch {
  Write-Host ""
  Write-Host "HATA:" -ForegroundColor Red
  Write-Host $_.Exception.Message -ForegroundColor Red
  Write-Host ""
  Write-Host "Log dosyasi: $LogFile"
  exit 1
} finally {
  Remove-Item Env:\OTEL_GITHUB_TOKEN -ErrorAction SilentlyContinue
  Stop-Transcript | Out-Null
}
