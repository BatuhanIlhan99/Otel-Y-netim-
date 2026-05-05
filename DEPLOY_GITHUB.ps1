$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/BatuhanIlhan99/Otel-Y-netim-.git"
$Branch = "main"
$CommitMessage = "Deploy otel yonetim uygulamasi"
$PagesUrl = "https://batuhanilhan99.github.io/Otel-Y-netim-/"
$ActionsUrl = "https://github.com/BatuhanIlhan99/Otel-Y-netim-/actions"

Set-Location -LiteralPath $PSScriptRoot

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
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Args)
  & $GitExe @Args
  if ($LASTEXITCODE -ne 0) {
    throw "git $($Args -join ' ') komutu basarisiz oldu."
  }
}

Write-Host ""
Write-Host "Otel Yonetim GitHub deploy basliyor..." -ForegroundColor Cyan
Write-Host "Klasor: $PSScriptRoot"
Write-Host "Repo:   $RepoUrl"
Write-Host ""

if (-not $GitExe) {
  Write-Host "Git bulunamadi." -ForegroundColor Red
  Write-Host "Once Git for Windows kur: https://git-scm.com/download/win"
  exit 1
}

Write-Host "Git:    $GitExe"

if (-not (Test-Path -LiteralPath ".git")) {
  Write-Host "Git deposu olusturuluyor..."
  Run-Git init
}

$userName = (& $GitExe config user.name) 2>$null
if (-not $userName) {
  Run-Git config user.name "BatuhanIlhan99"
}

$userEmail = (& $GitExe config user.email) 2>$null
if (-not $userEmail) {
  Run-Git config user.email "270341779+BatuhanIlhan99@users.noreply.github.com"
}

$CurrentBranch = (& $GitExe branch --show-current)
if ($CurrentBranch -ne $Branch) {
  Run-Git branch -M $Branch
}

$remoteNames = @(& $GitExe remote)
if ($remoteNames -notcontains "origin") {
  Run-Git remote add origin $RepoUrl
} else {
  Run-Git remote set-url origin $RepoUrl
}

Write-Host ""
Write-Host "Dosyalar hazirlaniyor..."
Run-Git add .

$status = (& $GitExe status --porcelain)
if ($status) {
  Write-Host "Commit olusturuluyor..."
  Run-Git commit -m $CommitMessage
} else {
  Write-Host "Commit edilecek yeni degisiklik yok."
}

Write-Host ""
Write-Host "GitHub'a yukleniyor..."
Write-Host "Ilk yuklemede GitHub girisi istenirse tarayicidan onay ver."
Run-Git push -u origin $Branch

Write-Host ""
Write-Host "Deploy tamamlandi." -ForegroundColor Green
Write-Host "GitHub Actions: $ActionsUrl"
Write-Host "Site yayina geldiginde: $PagesUrl"
Write-Host ""
Write-Host "Not: GitHub Pages ilk yayin icin 1-3 dakika surebilir."
