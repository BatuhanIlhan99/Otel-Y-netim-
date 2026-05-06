$ErrorActionPreference = "Stop"

$Root = $PSScriptRoot
$SecretDir = Join-Path $Root ".deploy-secrets"
$SecretFile = Join-Path $SecretDir "github-token.sec"

function Read-TokenFromClipboard {
  try {
    $text = (Get-Clipboard -Raw -ErrorAction Stop).Trim()
    $match = [regex]::Match($text, "(ghp_[A-Za-z0-9_]+|github_pat_[A-Za-z0-9_]+)")
    if ($match.Success) {
      return $match.Value
    }
  } catch {
    return ""
  }
  return ""
}

Write-Host ""
Write-Host "Otel Yonetim deploy token kaydi" -ForegroundColor Cyan
Write-Host "Token ekrana yazilmayacak. Dosya Windows kullanicina ozel sifreli saklanacak."
Write-Host ""

$plainToken = Read-TokenFromClipboard
if ($plainToken) {
  Write-Host "Panodaki GitHub token bulundu." -ForegroundColor Green
} else {
  $secureToken = Read-Host "GitHub token gir" -AsSecureString
  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken)
  try {
    $plainToken = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  } finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
  }
}

$plainToken = ($plainToken -replace "[\u0000-\u001F\u007F\s]", "").Trim()
$match = [regex]::Match($plainToken, "(ghp_[A-Za-z0-9_]+|github_pat_[A-Za-z0-9_]+)")
if (-not $match.Success) {
  throw "Gecerli GitHub token bulunamadi."
}

New-Item -ItemType Directory -Path $SecretDir -Force | Out-Null
$secure = ConvertTo-SecureString $match.Value -AsPlainText -Force
$secure | ConvertFrom-SecureString | Set-Content -LiteralPath $SecretFile -Encoding ASCII
$plainToken = $null
$secure = $null

Write-Host ""
Write-Host "Token kaydedildi: .deploy-secrets/github-token.sec" -ForegroundColor Green
Write-Host "Bu klasor .gitignore icinde; GitHub'a yuklenmeyecek."
