param(
  [switch]$Watch,
  [switch]$ResetToken,
  [int]$IntervalSeconds = 20,
  [int]$QuietSeconds = 8
)

$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/BatuhanIlhan99/Otel-Y-netim-.git"
$Branch = "main"
$SiteUrl = "https://batuhanilhan99.github.io/Otel-Y-netim-/"
$Root = $PSScriptRoot
$TokenDir = Join-Path $env:APPDATA "otel-yonetim"
$TokenFile = Join-Path $TokenDir "github-token.sec"

$DeployItems = @(
  ".env.example",
  ".gitignore",
  ".nojekyll",
  "404.html",
  "index.html",
  "app.js",
  "styles.css",
  "server.js",
  "package.json",
  "README.md",
  "MAIL_KURULUMU.md",
  "PRODUCTION_CHECKLIST.md",
  "YOL_HARITASI.md",
  "GITHUB_YUKLEME.md",
  "OTOMATIK_DEPLOY.md",
  "2-PAGESI-YENIDEN-BASLAT.cmd",
  "2-PAGESI-YENIDEN-BASLAT.ps1",
  "3-TARAYICIDAN-DEPLOY.html",
  "4-TEK-TIK-DEPLOY.html",
  "DEPLOY_GITHUB_TOKEN.cmd",
  "DEPLOY_GITHUB_TOKEN.ps1",
  "5-OTOMATIK-DEPLOY.cmd",
  "5-OTOMATIK-DEPLOY.ps1",
  "6-OTOMATIK-DEPLOY-IZLE.cmd",
  "backend",
  "data\.gitkeep"
)

function Write-Title([string]$Text) {
  Write-Host ""
  Write-Host $Text -ForegroundColor Cyan
}

function Get-GitExe {
  $command = Get-Command git -ErrorAction SilentlyContinue
  if ($command) { return $command.Source }

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

function Invoke-Git {
  param(
    [string]$GitExe,
    [string]$WorkDir,
    [Parameter(ValueFromRemainingArguments = $true)][string[]]$Args
  )

  & $GitExe -C $WorkDir @Args
  if ($LASTEXITCODE -ne 0) {
    throw "git $($Args -join ' ') komutu basarisiz oldu."
  }
}

function Get-PlainToken {
  if ($ResetToken) {
    if (Test-Path -LiteralPath $TokenFile) {
      Remove-Item -LiteralPath $TokenFile -Force
      Write-Host "Kayitli token silindi." -ForegroundColor Yellow
    } else {
      Write-Host "Kayitli token yok." -ForegroundColor Yellow
    }
    exit 0
  }

  if (Test-Path -LiteralPath $TokenFile) {
    $secureToken = (Get-Content -Raw -LiteralPath $TokenFile).Trim() | ConvertTo-SecureString
  } else {
    New-Item -ItemType Directory -Path $TokenDir -Force | Out-Null
    Write-Host "GitHub token ilk kez alinacak. Yazarken ekranda gorunmez." -ForegroundColor Yellow
    Write-Host "Gerekli yetki: Otel-Y-netim- repository icin Contents Read and write."
    $secureToken = Read-Host "GitHub token" -AsSecureString
    $secureToken | ConvertFrom-SecureString | Set-Content -LiteralPath $TokenFile -Encoding ASCII
    Write-Host "Token Windows kullanicina bagli sifreli olarak kaydedildi." -ForegroundColor Green
  }

  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken)
  try {
    $plainToken = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  } finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
  }

  $plainToken = ($plainToken -replace "[\u0000-\u001F\u007F\s]", "").Trim()
  $tokenMatch = [regex]::Match($plainToken, "(ghp_[A-Za-z0-9_]+|github_pat_[A-Za-z0-9_]+)")
  if ($tokenMatch.Success) { $plainToken = $tokenMatch.Value }
  if ([string]::IsNullOrWhiteSpace($plainToken)) { throw "Token bos." }
  return $plainToken
}

function Update-OneClickDeployPage {
  $deployPath = Join-Path $Root "4-TEK-TIK-DEPLOY.html"
  if (-not (Test-Path -LiteralPath $deployPath)) { return }

  $html = [System.IO.File]::ReadAllText($deployPath, [System.Text.Encoding]::UTF8)
  $match = [regex]::Match($html, "const files = (?<json>\[[\s\S]*?\]);")
  if (-not $match.Success) { return }

  $currentFiles = $match.Groups["json"].Value | ConvertFrom-Json
  $newFiles = @()
  foreach ($file in $currentFiles) {
    $relativePath = [string]$file.path
    $fullPath = Join-Path $Root $relativePath
    if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) { continue }

    $newFiles += [pscustomobject][ordered]@{
      path = $relativePath.Replace("\", "/")
      content = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes($fullPath))
    }
  }

  $newJson = $newFiles | ConvertTo-Json -Compress -Depth 5
  $newHtml = $html.Substring(0, $match.Index) + "const files = $newJson;" + $html.Substring($match.Index + $match.Length)
  if ($newHtml -ne $html) {
    [System.IO.File]::WriteAllText($deployPath, $newHtml, (New-Object System.Text.UTF8Encoding($false)))
  }
}

function Copy-DeployItems {
  param([string]$Destination)

  foreach ($item in $DeployItems) {
    $source = Join-Path $Root $item
    if (-not (Test-Path -LiteralPath $source)) { continue }

    $target = Join-Path $Destination $item
    if (Test-Path -LiteralPath $source -PathType Container) {
      if (Test-Path -LiteralPath $target) { Remove-Item -LiteralPath $target -Recurse -Force }
      Copy-Item -LiteralPath $source -Destination $target -Recurse -Force
    } else {
      $parent = Split-Path -Parent $target
      if ($parent) { New-Item -ItemType Directory -Path $parent -Force | Out-Null }
      Copy-Item -LiteralPath $source -Destination $target -Force
    }
  }
}

function New-AskPassFile {
  param([string]$Stamp)

  $askPass = Join-Path $env:TEMP "otel-auto-deploy-askpass-$Stamp.ps1"
  @'
if ($args[0] -match "Username") {
  Write-Output "BatuhanIlhan99"
} else {
  Write-Output $env:OTEL_GITHUB_TOKEN
}
'@ | Set-Content -LiteralPath $askPass -Encoding UTF8
  return $askPass
}

function Invoke-AutoDeploy {
  $gitExe = Get-GitExe
  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $cloneDir = Join-Path $env:TEMP "otel-yonetim-auto-deploy-$stamp"
  $askPass = $null
  $plainToken = $null

  Write-Title "Otel Yonetim otomatik deploy basliyor"
  Update-OneClickDeployPage

  try {
    & $gitExe -c http.sslBackend=openssl -c credential.helper= clone --depth 1 $RepoUrl $cloneDir
    if ($LASTEXITCODE -ne 0) { throw "GitHub repository klonlanamadi." }

    Copy-DeployItems -Destination $cloneDir

    Invoke-Git $gitExe $cloneDir config user.name "BatuhanIlhan99"
    Invoke-Git $gitExe $cloneDir config user.email "270341779+BatuhanIlhan99@users.noreply.github.com"
    Invoke-Git $gitExe $cloneDir add -A

    $status = & $gitExe -C $cloneDir status --porcelain
    if (-not $status) {
      Write-Host "GitHub'a gonderilecek yeni degisiklik yok." -ForegroundColor Yellow
      return
    }

    Invoke-Git $gitExe $cloneDir commit -m "Auto deploy otel yonetim"

    $plainToken = Get-PlainToken
    $askPass = New-AskPassFile -Stamp $stamp
    $env:GIT_ASKPASS = $askPass
    $env:SSH_ASKPASS = $askPass
    $env:GIT_TERMINAL_PROMPT = "0"
    $env:OTEL_GITHUB_TOKEN = $plainToken

    & $gitExe -C $cloneDir -c http.sslBackend=openssl -c credential.helper= -c core.askPass=$askPass push origin $Branch
    if ($LASTEXITCODE -ne 0) { throw "GitHub push basarisiz oldu." }

    Write-Host "Deploy GitHub'a gonderildi." -ForegroundColor Green
    Write-Host "GitHub Pages otomatik yayinlar: $SiteUrl"
    Write-Host "Yayin 1-5 dakika surebilir."
  } finally {
    Remove-Item Env:\GIT_ASKPASS -ErrorAction SilentlyContinue
    Remove-Item Env:\SSH_ASKPASS -ErrorAction SilentlyContinue
    Remove-Item Env:\GIT_TERMINAL_PROMPT -ErrorAction SilentlyContinue
    Remove-Item Env:\OTEL_GITHUB_TOKEN -ErrorAction SilentlyContinue
    if ($askPass) { Remove-Item -LiteralPath $askPass -Force -ErrorAction SilentlyContinue }
    if ($cloneDir -and (Test-Path -LiteralPath $cloneDir)) { Remove-Item -LiteralPath $cloneDir -Recurse -Force -ErrorAction SilentlyContinue }
    $plainToken = $null
  }
}

function Get-ProjectFingerprint {
  $extensions = @(".js", ".css", ".html", ".ps1", ".cmd", ".md", ".json", ".yml", ".yaml")
  $files = Get-ChildItem -LiteralPath $Root -Recurse -File -Force | Where-Object {
    $relative = $_.FullName.Substring($Root.Length).TrimStart("\")
    $top = $relative.Split("\")[0]
    if ($top -in @(".git", "node_modules")) { return $false }
    if ($relative -like "data\backups\*") { return $false }
    if ($relative -like "__deploy-check-*") { return $false }
    if ($relative -eq "data\app-data.json") { return $false }
    return $extensions -contains $_.Extension.ToLowerInvariant()
  } | Sort-Object FullName

  $text = ($files | ForEach-Object {
    $relative = $_.FullName.Substring($Root.Length).TrimStart("\")
    "$relative|$($_.Length)|$($_.LastWriteTimeUtc.Ticks)"
  }) -join "`n"

  $sha = [System.Security.Cryptography.SHA256]::Create()
  try {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($text)
    return [BitConverter]::ToString($sha.ComputeHash($bytes)).Replace("-", "")
  } finally {
    $sha.Dispose()
  }
}

Invoke-AutoDeploy

if ($Watch) {
  Write-Title "Izleme modu acik"
  Write-Host "Bu pencere acik kaldikca proje dosyalari degisince otomatik deploy yapilir."
  Write-Host "Durdurmak icin Ctrl+C."
  $fingerprint = Get-ProjectFingerprint

  while ($true) {
    Start-Sleep -Seconds $IntervalSeconds
    $nextFingerprint = Get-ProjectFingerprint
    if ($nextFingerprint -eq $fingerprint) { continue }

    Write-Host "Degisiklik algilandi. Dosyalar sakinlessin diye bekleniyor..." -ForegroundColor Yellow
    Start-Sleep -Seconds $QuietSeconds
    Invoke-AutoDeploy
    $fingerprint = Get-ProjectFingerprint
  }
}
