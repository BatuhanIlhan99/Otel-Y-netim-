param(
  [string]$BaseUrl = "",
  [string]$Username = "admin",
  [string]$Password = "admin123"
)

$ErrorActionPreference = "Stop"

function Clean-Url {
  param([string]$Value)
  return ($Value.Trim() -replace "/+$", "")
}

if (-not $BaseUrl) {
  try {
    $clip = (Get-Clipboard -Raw -ErrorAction Stop).Trim()
    if ($clip -match "^https?://") {
      $BaseUrl = $clip
      Write-Host "Panodaki adres kullaniliyor: $BaseUrl" -ForegroundColor Green
    }
  } catch {}
}

if (-not $BaseUrl) {
  $BaseUrl = Read-Host "Test edilecek backend adresi"
}

$BaseUrl = Clean-Url $BaseUrl
if ($BaseUrl -notmatch "^https?://") {
  throw "Gecerli bir http/https adresi yazmalisin."
}

function Invoke-BackendLogin {
  param(
    [string]$LoginUsername,
    [string]$LoginPassword
  )
  $body = @{ username = $LoginUsername; password = $LoginPassword } | ConvertTo-Json
  return Invoke-RestMethod -Uri "$BaseUrl/api/login" -Method POST -ContentType "application/json" -Body $body -TimeoutSec 20
}

Write-Host ""
Write-Host "Bulut backend kontrolu basliyor: $BaseUrl" -ForegroundColor Cyan

$health = Invoke-RestMethod -Uri "$BaseUrl/api/health" -Method GET -TimeoutSec 20
if (-not $health.ok) { throw "Health endpoint ok donmedi." }

try {
  $login = Invoke-BackendLogin -LoginUsername $Username -LoginPassword $Password
} catch {
  Write-Host "Varsayilan admin bilgileriyle giris yapilamadi. Canli sistemde sifre degistirildiyse bu normaldir." -ForegroundColor Yellow
  $Username = Read-Host "Admin kullanici adi"
  $securePassword = Read-Host "Admin sifresi" -AsSecureString
  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
  try {
    $Password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  } finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
  }
  $login = Invoke-BackendLogin -LoginUsername $Username -LoginPassword $Password
}
if (-not $login.token) { throw "Admin login token donmedi." }

$headers = @{ Authorization = "Bearer $($login.token)" }
$bootstrap = Invoke-RestMethod -Uri "$BaseUrl/api/bootstrap" -Method GET -Headers $headers -TimeoutSec 20
$mailStatus = Invoke-RestMethod -Uri "$BaseUrl/api/mail/status" -Method GET -Headers $headers -TimeoutSec 20

Write-Host ""
Write-Host "Backend calisiyor." -ForegroundColor Green
Write-Host "Storage OK: $($health.storage.ok)"
Write-Host "Storage persistent: $($health.storage.persistent)"
Write-Host "SMTP enabled: $($mailStatus.smtp.enabled)"
Write-Host "SMTP status: $($mailStatus.smtp.message)"
Write-Host "Urun sayisi: $($bootstrap.products.Count)"
Write-Host "Departman sayisi: $($bootstrap.departments.Count)"
Write-Host ""
Write-Host "Adres tum cihazlarda kullanilabilir: $BaseUrl" -ForegroundColor Green
