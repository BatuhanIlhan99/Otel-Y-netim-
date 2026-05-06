$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/BatuhanIlhan99/Otel-Y-netim-.git"
$Branch = "main"
$PagesUrl = "https://batuhanilhan99.github.io/Otel-Y-netim-/"
$LogFile = Join-Path $PSScriptRoot "PAGES_YENIDEN_BASLAT_LOG.txt"

$GitExe = @(
  "C:\Program Files\Git\cmd\git.exe",
  "C:\Program Files\Git\bin\git.exe",
  "C:\Program Files (x86)\Git\cmd\git.exe",
  "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe"
) | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1

if (-not $GitExe) {
  throw "Git bulunamadi. Git for Windows kurulu olmali."
}

function Run-Git {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Args)

  Add-Content -LiteralPath $LogFile -Value "" -Encoding UTF8
  Add-Content -LiteralPath $LogFile -Value "> git $($Args -join ' ')" -Encoding UTF8

  $oldPreference = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  try {
    $output = & $GitExe @Args 2>&1
    $exitCode = $LASTEXITCODE
  } finally {
    $ErrorActionPreference = $oldPreference
  }

  foreach ($line in $output) {
    $text = [string]$line
    Add-Content -LiteralPath $LogFile -Value $text -Encoding UTF8
    if ($text -match "Authentication failed|Invalid username or token|could not read Username|Write access|not granted|Permission denied|403|Repository not found") {
      Write-Host $text -ForegroundColor Yellow
    }
  }

  if ($exitCode -ne 0) {
    throw "git $($Args -join ' ') basarisiz oldu."
  }
}

Set-Content -LiteralPath $LogFile -Value "GitHub Pages yeniden baslatma logu - $(Get-Date)" -Encoding UTF8

Write-Host ""
Write-Host "GitHub Pages yeniden baslatiliyor..." -ForegroundColor Cyan
Write-Host "Bu islem .nojekyll dosyasini GitHub'a push eder ve Pages build'ini tetikler."
Write-Host "Token ekranda gorunmez, dosyaya yazilmaz."
Write-Host "Hata olursa log: $LogFile"
Write-Host ""

$secureToken = Read-Host "GitHub token yapistir" -AsSecureString
$bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken)
$plainToken = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
$plainToken = ($plainToken -replace "[\u0000-\u001F\u007F\s]", "").Trim()

$tokenMatch = [regex]::Match($plainToken, "(ghp_[A-Za-z0-9_]+|github_pat_[A-Za-z0-9_]+)")
if ($tokenMatch.Success) {
  $plainToken = $tokenMatch.Value
}

if ([string]::IsNullOrWhiteSpace($plainToken)) {
  throw "Token bos."
}

if (($plainToken -notlike "ghp_*") -and ($plainToken -notlike "github_pat_*")) {
  Write-Host "Token formati beklenen gibi degil. Kopyaladigin metnin ghp_ veya github_pat_ ile basladigindan emin ol." -ForegroundColor Yellow
}

$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$Work = Join-Path $env:TEMP "otel-pages-restart-$Stamp"
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
  Write-Host "Repo indiriliyor..."
  Run-Git -c http.sslBackend=openssl -c credential.helper= clone --depth 1 $RepoUrl $Work

  Set-Content -LiteralPath (Join-Path $Work ".nojekyll") -Value ("GitHub Pages rebuild: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')") -Encoding ASCII

  Run-Git -C $Work config user.name "BatuhanIlhan99"
  Run-Git -C $Work config user.email "270341779+BatuhanIlhan99@users.noreply.github.com"
  Run-Git -C $Work add .nojekyll

  $status = & $GitExe -C $Work status --porcelain
  if ($status) {
    Run-Git -C $Work commit -m "Trigger GitHub Pages rebuild"
  } else {
    Run-Git -C $Work commit --allow-empty -m "Trigger GitHub Pages rebuild"
  }

  $env:GIT_ASKPASS = $AskPass
  $env:SSH_ASKPASS = $AskPass
  $env:GIT_TERMINAL_PROMPT = "0"
  $env:OTEL_GITHUB_TOKEN = $plainToken

  Write-Host "GitHub'a gonderiliyor..."
  Run-Git -C $Work -c http.sslBackend=openssl -c credential.helper= -c core.askPass=$AskPass push origin $Branch

  Write-Host ""
  Write-Host "Pages yeniden baslatildi." -ForegroundColor Green
  Write-Host "1-5 dakika sonra siteyi ac:"
  Write-Host $PagesUrl
} catch {
  Write-Host ""
  Write-Host "Islem basarisiz oldu." -ForegroundColor Red
  Write-Host $_.Exception.Message -ForegroundColor Red
  Write-Host ""
  Write-Host "Token icin gerekli izinler:"
  Write-Host "- Classic token: repo"
  Write-Host "- Fine-grained token: Otel-Y-netim- repository + Contents: Read and write"
  Write-Host "Ayrinti log dosyasi: $LogFile"
  throw
} finally {
  Remove-Item Env:\GIT_ASKPASS -ErrorAction SilentlyContinue
  Remove-Item Env:\SSH_ASKPASS -ErrorAction SilentlyContinue
  Remove-Item Env:\GIT_TERMINAL_PROMPT -ErrorAction SilentlyContinue
  Remove-Item Env:\OTEL_GITHUB_TOKEN -ErrorAction SilentlyContinue
  Remove-Item -LiteralPath $AskPass -Force -ErrorAction SilentlyContinue
  $plainToken = $null
}
