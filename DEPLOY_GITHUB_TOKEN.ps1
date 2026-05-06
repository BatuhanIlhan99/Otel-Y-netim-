$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/BatuhanIlhan99/Otel-Y-netim-.git"
$Branch = "main"
$CommitMessage = "Deploy otel yonetim uygulamasi"
$PagesUrl = "https://batuhanilhan99.github.io/Otel-Y-netim-/"
$ActionsUrl = "https://github.com/BatuhanIlhan99/Otel-Y-netim-/actions"
$Root = $PSScriptRoot
$GitCommand = Get-Command git -ErrorAction SilentlyContinue
$GitExe = if ($GitCommand) { $GitCommand.Source } else { $null }

if (-not $GitExe) {
  $GitCandidates = @(
    "C:\Program Files\Git\cmd\git.exe",
    "C:\Program Files\Git\bin\git.exe",
    "C:\Program Files (x86)\Git\cmd\git.exe",
    "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe"
  )
  $GitExe = $GitCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
}

function Run-Git {
  param(
    [string]$WorkTree,
    [string]$GitDir,
    [Parameter(ValueFromRemainingArguments = $true)][string[]]$Args
  )
  & $GitExe --git-dir=$GitDir --work-tree=$WorkTree @Args
  if ($LASTEXITCODE -ne 0) {
    throw "git $($Args -join ' ') komutu basarisiz oldu."
  }
}

function Copy-ProjectForDeploy {
  param([string]$Destination)
  $items = @(
    ".github",
    "backend",
    "data",
    ".env.example",
    ".gitignore",
    ".nojekyll",
    "404.html",
    "app.js",
    "DEPLOY_GITHUB.cmd",
    "DEPLOY_GITHUB.ps1",
    "DEPLOY_GITHUB_TOKEN.cmd",
    "DEPLOY_GITHUB_TOKEN.ps1",
    "2-PAGESI-YENIDEN-BASLAT.cmd",
    "2-PAGESI-YENIDEN-BASLAT.ps1",
    "3-TARAYICIDAN-DEPLOY.html",
    "4-TEK-TIK-DEPLOY.html",
    "5-OTOMATIK-DEPLOY.cmd",
    "5-OTOMATIK-DEPLOY.ps1",
    "6-OTOMATIK-DEPLOY-IZLE.cmd",
    "deploy-hotfix.js",
    "GITHUB_YUKLEME.md",
    "index.html",
    "MAIL_KURULUMU.md",
    "OTOMATIK_DEPLOY.md",
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
      Copy-Item -LiteralPath $from -Destination $Destination -Recurse -Force
    }
  }
}

Write-Host ""
Write-Host "Otel Yonetim GitHub deploy basliyor..." -ForegroundColor Cyan
Write-Host "Repo: $RepoUrl"
Write-Host ""

if (-not $GitExe) {
  Write-Host "Git bulunamadi. Git for Windows kurulu olmali." -ForegroundColor Red
  exit 1
}

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$workTree = Join-Path $env:TEMP "otel-yonetim-upload-$stamp"
$gitDir = Join-Path $env:TEMP "otel-yonetim-gitdb-$stamp"
New-Item -ItemType Directory -Path $workTree | Out-Null
Copy-ProjectForDeploy -Destination $workTree

Run-Git $workTree $gitDir init
Run-Git $workTree $gitDir branch -M $Branch
Run-Git $workTree $gitDir remote add origin $RepoUrl
Run-Git $workTree $gitDir config user.name "BatuhanIlhan99"
Run-Git $workTree $gitDir config user.email "270341779+BatuhanIlhan99@users.noreply.github.com"
Run-Git $workTree $gitDir add .

$ignoredData = & $GitExe --git-dir=$gitDir --work-tree=$workTree status --ignored -s data
Write-Host "Data guvenlik kontrolu:"
Write-Host $ignoredData

$status = & $GitExe --git-dir=$gitDir --work-tree=$workTree status --porcelain
if ($status) {
  Run-Git $workTree $gitDir commit -m $CommitMessage
} else {
  Write-Host "Commit edilecek degisiklik yok."
}

Write-Host ""
Write-Host "GitHub push icin Personal Access Token gerekecek." -ForegroundColor Yellow
Write-Host "Token chat'e yazilmayacak; sadece bu pencerede gizli olarak alinacak."
Write-Host "Token yetkisi: repo veya bu repository icin Contents read/write."
Write-Host ""

$plainToken = ""
try {
  $clipboardText = (Get-Clipboard -Raw -ErrorAction Stop).Trim()
  $clipboardMatch = [regex]::Match($clipboardText, "(ghp_[A-Za-z0-9_]+|github_pat_[A-Za-z0-9_]+)")
  if ($clipboardMatch.Success) {
    $plainToken = $clipboardMatch.Value
    Write-Host "Panodaki GitHub token kullanilacak." -ForegroundColor Green
  }
} catch {
  $plainToken = ""
}

if (-not $plainToken) {
  $secureToken = Read-Host "GitHub token gir" -AsSecureString
  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken)
  $plainToken = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
}

$plainToken = ($plainToken -replace "[\u0000-\u001F\u007F\s]", "").Trim()
$tokenMatch = [regex]::Match($plainToken, "(ghp_[A-Za-z0-9_]+|github_pat_[A-Za-z0-9_]+)")
if ($tokenMatch.Success) {
  $plainToken = $tokenMatch.Value
}

$askPass = Join-Path $env:TEMP "otel-git-askpass-$stamp.ps1"
@'
if ($args[0] -match "Username") {
  Write-Output "BatuhanIlhan99"
} else {
  Write-Output $env:OTEL_GITHUB_TOKEN
}
'@ | Set-Content -Path $askPass -Encoding UTF8

try {
  $env:GIT_ASKPASS = $askPass
  $env:SSH_ASKPASS = $askPass
  $env:GIT_TERMINAL_PROMPT = "0"
  $env:OTEL_GITHUB_TOKEN = $plainToken
  & $GitExe --git-dir=$gitDir --work-tree=$workTree -c http.sslBackend=openssl -c credential.helper= -c core.askPass=$askPass push -u origin $Branch
  if ($LASTEXITCODE -ne 0) {
    throw "GitHub push basarisiz oldu."
  }
} finally {
  Remove-Item Env:\GIT_ASKPASS -ErrorAction SilentlyContinue
  Remove-Item Env:\SSH_ASKPASS -ErrorAction SilentlyContinue
  Remove-Item Env:\GIT_TERMINAL_PROMPT -ErrorAction SilentlyContinue
  Remove-Item Env:\OTEL_GITHUB_TOKEN -ErrorAction SilentlyContinue
  Remove-Item -LiteralPath $askPass -Force -ErrorAction SilentlyContinue
  $plainToken = $null
}

Write-Host ""
Write-Host "Deploy tamamlandi." -ForegroundColor Green
Write-Host "GitHub Actions: $ActionsUrl"
Write-Host "Site yayina geldiginde: $PagesUrl"
Write-Host "GitHub Pages ilk yayin icin 1-3 dakika surebilir."
