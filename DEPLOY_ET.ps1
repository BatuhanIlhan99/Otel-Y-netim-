$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/BatuhanIlhan99/Otel-Y-netim-.git"
$Branch = "main"
$PagesUrl = "https://batuhanilhan99.github.io/Otel-Y-netim-/"
$Root = $PSScriptRoot
$SecretDir = Join-Path $Root ".deploy-secrets"
$SecretFile = Join-Path $SecretDir "github-token.sec"
$WorkRoot = Join-Path $Root ".deploy-work"
$WorkTree = Join-Path $WorkRoot "repo"
$CommitMessage = "Deploy otel yonetim uygulamasi"

function Get-GitExe {
  $gitCommand = Get-Command git -ErrorAction SilentlyContinue
  if ($gitCommand) { return $gitCommand.Source }
  $candidates = @(
    "C:\Program Files\Git\cmd\git.exe",
    "C:\Program Files\Git\bin\git.exe",
    "C:\Program Files (x86)\Git\cmd\git.exe",
    "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe"
  )
  foreach ($candidate in $candidates) {
    if (Test-Path -LiteralPath $candidate) { return $candidate }
  }
  throw "Git bulunamadi. Git for Windows kurulu olmali."
}

function Read-TokenFromClipboard {
  try {
    $text = (Get-Clipboard -Raw -ErrorAction Stop).Trim()
    $match = [regex]::Match($text, "(ghp_[A-Za-z0-9_]+|github_pat_[A-Za-z0-9_]+)")
    if ($match.Success) { return $match.Value }
  } catch {
    return ""
  }
  return ""
}

function Read-SavedToken {
  if (-not (Test-Path -LiteralPath $SecretFile)) { return "" }
  try {
    $secure = Get-Content -LiteralPath $SecretFile | ConvertTo-SecureString
    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    try {
      return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
    } finally {
      [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
    }
  } catch {
    return ""
  }
}

function Save-TokenIfMissing {
  param([string]$Token)
  if (Test-Path -LiteralPath $SecretFile) { return }
  New-Item -ItemType Directory -Path $SecretDir -Force | Out-Null
  $secure = ConvertTo-SecureString $Token -AsPlainText -Force
  $secure | ConvertFrom-SecureString | Set-Content -LiteralPath $SecretFile -Encoding ASCII
}

function Require-WorkspacePath {
  param([string]$Path)
  $resolvedRoot = [IO.Path]::GetFullPath($Root)
  $resolvedPath = [IO.Path]::GetFullPath($Path)
  if (-not $resolvedPath.StartsWith($resolvedRoot, [StringComparison]::OrdinalIgnoreCase)) {
    throw "Guvenlik kontrolu basarisiz: $resolvedPath proje klasoru disinda."
  }
}

function Run-Git {
  & $GitExe @args
  if ($LASTEXITCODE -ne 0) {
    throw "git $($args -join ' ') komutu basarisiz oldu."
  }
}

function Copy-SafeItem {
  param([string]$Item)
  $source = Join-Path $Root $Item
  if (-not (Test-Path -LiteralPath $source)) { return }
  $destination = Join-Path $WorkTree $Item
  $parent = Split-Path -Parent $destination
  if ($parent -and -not (Test-Path -LiteralPath $parent)) {
    New-Item -ItemType Directory -Path $parent -Force | Out-Null
  }
  if ((Test-Path -LiteralPath $source -PathType Container) -and (Test-Path -LiteralPath $destination)) {
    Require-WorkspacePath $destination
    Remove-Item -LiteralPath $destination -Recurse -Force
  }
  Copy-Item -LiteralPath $source -Destination $destination -Recurse -Force
}

function Sync-ProjectFiles {
  $items = @(
    ".github",
    "backend",
    "data\.gitkeep",
    ".env.example",
    ".gitignore",
    ".nojekyll",
    "404.html",
    "app.js",
    "deploy-hotfix.js",
    "DEPLOY_ET.cmd",
    "DEPLOY_ET.ps1",
    "DEPLOY_GITHUB.cmd",
    "DEPLOY_GITHUB.ps1",
    "DEPLOY_GITHUB_TOKEN.cmd",
    "DEPLOY_GITHUB_TOKEN.ps1",
    "TOKEN_KAYDET.cmd",
    "TOKEN_KAYDET.ps1",
    "2-PAGESI-YENIDEN-BASLAT.cmd",
    "2-PAGESI-YENIDEN-BASLAT.ps1",
    "3-TARAYICIDAN-DEPLOY.html",
    "4-TEK-TIK-DEPLOY.html",
    "5-OTOMATIK-DEPLOY.cmd",
    "5-OTOMATIK-DEPLOY.ps1",
    "6-OTOMATIK-DEPLOY-IZLE.cmd",
    "FIX_GITHUB_PAGES_DEPLOY.ps1",
    "GITHUB_YUKLEME.md",
    "HIZLI_DEPLOY.md",
    "index.html",
    "MAIL_KURULUMU.md",
    "MASAUSTU-KISAYOL-OLUSTUR.cmd",
    "OTOMATIK_DEPLOY.md",
    "package.json",
    "PRODUCTION_CHECKLIST.md",
    "README.md",
    "RETRY_PAGES_FIX_PUSH.ps1",
    "server.js",
    "START_BACKEND.cmd",
    "START_BACKEND.ps1",
    "START_NODE_BACKEND.cmd",
    "styles.css",
    "YOL_HARITASI.md"
  )

  foreach ($item in $items) {
    Copy-SafeItem $item
  }
}

Write-Host ""
Write-Host "Otel Yonetim tek komut deploy basliyor..." -ForegroundColor Cyan

$GitExe = Get-GitExe
$plainToken = Read-SavedToken
if ($plainToken) {
  Write-Host "Kayitli token kullaniliyor." -ForegroundColor Green
} else {
  $plainToken = Read-TokenFromClipboard
  if ($plainToken) {
    Write-Host "Panodaki token kullaniliyor ve sonraki deploylar icin sifreli kaydediliyor." -ForegroundColor Green
    Save-TokenIfMissing $plainToken
  }
}

if (-not $plainToken) {
  Write-Host "Token bulunamadi. TOKEN_KAYDET.cmd dosyasini bir kez calistir veya tokeni panoya kopyalayip tekrar dene." -ForegroundColor Yellow
  exit 1
}

Require-WorkspacePath $WorkRoot
if (Test-Path -LiteralPath $WorkRoot) {
  Require-WorkspacePath $WorkRoot
  Remove-Item -LiteralPath $WorkRoot -Recurse -Force
}
New-Item -ItemType Directory -Path $WorkRoot -Force | Out-Null

try {
  Run-Git -c http.sslBackend=openssl clone --depth 1 --branch $Branch $RepoUrl $WorkTree
  Sync-ProjectFiles

  Run-Git -C $WorkTree config user.name "BatuhanIlhan99"
  Run-Git -C $WorkTree config user.email "270341779+BatuhanIlhan99@users.noreply.github.com"
  Run-Git -C $WorkTree add -A

  $status = & $GitExe -C $WorkTree status --porcelain
  if ($status) {
    Run-Git -C $WorkTree commit -m $CommitMessage
  } else {
    Write-Host "Gonderilecek yeni degisiklik yok." -ForegroundColor Yellow
  }

  $encodedToken = [System.Uri]::EscapeDataString($plainToken)
  $pushUrl = "https://x-access-token:$encodedToken@github.com/BatuhanIlhan99/Otel-Y-netim-.git"
  & $GitExe -C $WorkTree -c http.sslBackend=openssl -c credential.helper= -c credential.modalPrompt=false -c credential.interactive=never push $pushUrl "${Branch}:${Branch}"
  if ($LASTEXITCODE -ne 0) {
    throw "GitHub push basarisiz oldu."
  }

  $localHead = (& $GitExe -C $WorkTree rev-parse HEAD).Trim()
  $remoteLine = (& $GitExe -c http.sslBackend=openssl ls-remote $RepoUrl "refs/heads/$Branch").Trim()
  $remoteHead = ($remoteLine -split "\s+")[0]
  if ($localHead -ne $remoteHead) {
    throw "Deploy dogrulama basarisiz. Local: $localHead Remote: $remoteHead"
  }

  Write-Host ""
  Write-Host "Deploy tamamlandi." -ForegroundColor Green
  Write-Host "Commit: $($localHead.Substring(0, 7))"
  Write-Host "Site: $PagesUrl"
  Write-Host "Cache temiz link: ${PagesUrl}?v=$($localHead.Substring(0, 7))"
} finally {
  $plainToken = $null
  $encodedToken = $null
  $pushUrl = $null
}
