$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/BatuhanIlhan99/Otel-Y-netim-.git"
$Branch = "main"
$CommitMessage = "React tasarim + bundle.js + perf iyilestirmeleri"
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
  $cloneDir = Join-Path $env:TEMP "otel-yonetim-clone-$stamp"

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

  $env:GIT_ASKPASS = $askPass
  $env:GIT_TERMINAL_PROMPT = "0"

  try {
    Write-Host ""
    Write-Host "Mevcut repo klonlaniyor..." -ForegroundColor Cyan
    & $gitExe -c credential.helper= clone --branch $Branch --depth 50 $RepoUrl $cloneDir
    if ($LASTEXITCODE -ne 0) {
      throw "Repo klonlanamadi. Token yetkisini kontrol et (repo + workflow scope) veya repo URL'sini dogrula."
    }

    # Yuklenecek dosyalar
    $items = @(
      ".github",
      "backend",
      ".env.example",
      ".gitignore",
      ".nojekyll",
      "404.html",
      "app.js",
      "app.jsx",
      "bundle.js",
      "build.js",
      "config.js",
      "dashboard.jsx",
      "data.jsx",
      "DEPLOY_GITHUB.cmd",
      "DEPLOY_GITHUB.ps1",
      "DEPLOY_GITHUB_TOKEN.cmd",
      "DEPLOY_GITHUB_TOKEN.ps1",
      "1-GITHUBA-YUKLE.cmd",
      "1-GITHUBA-YUKLE.ps1",
      "firestore.rules",
      "GITHUB_YUKLEME.md",
      "index.html",
      "login.jsx",
      "MAIL_KURULUMU.md",
      "package.json",
      "PRODUCTION_CHECKLIST.md",
      "README.md",
      "render.yaml",
      "screens.jsx",
      "server.js",
      "START_BACKEND.cmd",
      "START_BACKEND.ps1",
      "START_NODE_BACKEND.cmd",
      "stock.jsx",
      "styles.css",
      "YOL_HARITASI.md"
    )

    Write-Host "Dosyalar uzerine kopyalaniyor..." -ForegroundColor Cyan
    foreach ($item in $items) {
      $from = Join-Path $Root $item
      if (Test-Path -LiteralPath $from) {
        $target = Join-Path $cloneDir $item
        if (Test-Path -LiteralPath $target -PathType Container) {
          Remove-Item -LiteralPath $target -Recurse -Force
        }
        Copy-Item -LiteralPath $from -Destination $cloneDir -Recurse -Force
      }
    }

    # data klasoru gitkeep ile beraber gelsin ama icindeki gercek veriler degil
    $dataKeep = Join-Path $Root "data\.gitkeep"
    if (Test-Path -LiteralPath $dataKeep) {
      $targetData = Join-Path $cloneDir "data"
      New-Item -ItemType Directory -Path $targetData -Force | Out-Null
      Copy-Item -LiteralPath $dataKeep -Destination $targetData -Force
    }

    & $gitExe -C $cloneDir config user.name "BatuhanIlhan99"
    if ($LASTEXITCODE -ne 0) { throw "git config user.name basarisiz oldu." }
    & $gitExe -C $cloneDir config user.email "270341779+BatuhanIlhan99@users.noreply.github.com"
    if ($LASTEXITCODE -ne 0) { throw "git config user.email basarisiz oldu." }
    & $gitExe -C $cloneDir add --all
    if ($LASTEXITCODE -ne 0) { throw "git add basarisiz oldu." }

    Write-Host ""
    Write-Host "Guvenlik kontrolu: data/*.json dosyalari repository'ye alinmiyor." -ForegroundColor Yellow
    & $gitExe -C $cloneDir status --ignored -s data

    $status = & $gitExe -C $cloneDir status --porcelain
    if (-not $status) {
      Write-Host "Commit edilecek degisiklik yok. Push atlanivor." -ForegroundColor Yellow
      return
    }

    & $gitExe -C $cloneDir commit -m $CommitMessage
    if ($LASTEXITCODE -ne 0) { throw "git commit basarisiz oldu." }

    Write-Host ""
    Write-Host "GitHub'a yukleniyor..." -ForegroundColor Cyan
    & $gitExe -C $cloneDir -c http.sslBackend=openssl -c credential.helper= push origin $Branch
    if ($LASTEXITCODE -ne 0) {
      throw "GitHub push basarisiz oldu. Token yetkisini kontrol et: repo ve workflow secili olmali."
    }

    Write-Host ""
    Write-Host "DEPLOY TAMAMLANDI." -ForegroundColor Green
    Write-Host "GitHub Actions: $ActionsUrl"
    Write-Host "Site yayina geldiginde: $PagesUrl"
    Write-Host "Ilk yayin 1-3 dakika surebilir."
  } finally {
    Remove-Item Env:\GIT_ASKPASS -ErrorAction SilentlyContinue
    Remove-Item Env:\GIT_TERMINAL_PROMPT -ErrorAction SilentlyContinue
    Remove-Item -LiteralPath $askPass -Force -ErrorAction SilentlyContinue
    if (Test-Path -LiteralPath $cloneDir) {
      Remove-Item -LiteralPath $cloneDir -Recurse -Force -ErrorAction SilentlyContinue
    }
  }
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
