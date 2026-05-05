param(
  [string]$ConfigPath = (Join-Path $PSScriptRoot "config.json")
)

$ErrorActionPreference = "Stop"

function Resolve-AppPath([string]$path) {
  if ([System.IO.Path]::IsPathRooted($path)) { return $path }
  return [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot $path))
}

function Read-JsonFile([string]$path, $fallback) {
  if (-not (Test-Path -LiteralPath $path)) { return $fallback }
  $raw = Get-Content -Raw -LiteralPath $path -Encoding UTF8
  if ([string]::IsNullOrWhiteSpace($raw)) { return $fallback }
  return $raw | ConvertFrom-Json
}

function Write-JsonFile([string]$path, $value) {
  $dir = Split-Path -Parent $path
  if (-not (Test-Path -LiteralPath $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }
  $json = $value | ConvertTo-Json -Depth 100
  Set-Content -LiteralPath $path -Value $json -Encoding UTF8
}

function ConvertTo-PlainObject($value) {
  return $value | ConvertTo-Json -Depth 100 | ConvertFrom-Json
}

function Send-Response($ctx, [int]$statusCode, [string]$contentType, [byte[]]$bytes) {
  $reason = switch ($statusCode) {
    200 { "OK" }
    201 { "Created" }
    400 { "Bad Request" }
    401 { "Unauthorized" }
    403 { "Forbidden" }
    404 { "Not Found" }
    500 { "Internal Server Error" }
    default { "OK" }
  }
  $header = "HTTP/1.1 $statusCode $reason`r`n" +
    "Content-Type: $contentType`r`n" +
    "Content-Length: $($bytes.Length)`r`n" +
    "Access-Control-Allow-Origin: *`r`n" +
    "Access-Control-Allow-Headers: Content-Type`r`n" +
    "Access-Control-Allow-Methods: GET,POST,PUT,PATCH,OPTIONS`r`n" +
    "Connection: close`r`n`r`n"
  $stream = $ctx.Client.GetStream()
  $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
  $stream.Write($headerBytes, 0, $headerBytes.Length)
  if ($bytes.Length -gt 0) {
    $stream.Write($bytes, 0, $bytes.Length)
  }
  $stream.Flush()
  $ctx.Client.Close()
}

function Send-Json($ctx, [int]$statusCode, $value) {
  $json = $value | ConvertTo-Json -Depth 100
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
  Send-Response $ctx $statusCode "application/json; charset=utf-8" $bytes
}

function Send-Text($ctx, [int]$statusCode, [string]$text) {
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($text)
  Send-Response $ctx $statusCode "text/plain; charset=utf-8" $bytes
}

function Read-BodyJson($ctx) {
  $raw = $ctx.BodyRaw
  if ([string]::IsNullOrWhiteSpace($raw)) { return [pscustomobject]@{} }
  return $raw | ConvertFrom-Json
}

function Get-QueryValue($ctx, [string]$name, [string]$fallback = "") {
  $value = $ctx.Request.QueryString[$name]
  if ([string]::IsNullOrWhiteSpace($value)) { return $fallback }
  return $value
}

function Get-DateKey {
  return (Get-Date).ToString("yyyy-MM-dd")
}

function Get-TimeKey {
  return (Get-Date).ToString("HH:mm")
}

function Get-PublicUser($user) {
  return [pscustomobject]@{
    username = $user.username
    name = $user.name
    role = $user.role
    departmentId = $user.departmentId
  }
}

function Get-DepartmentName($db, [string]$id) {
  if ($id -eq "all") { return "Tüm Departmanlar" }
  $department = @($db.departments | Where-Object { $_.id -eq $id })[0]
  if ($department) { return $department.name }
  return $id
}

function Get-Count($db, [string]$date, [string]$productId) {
  if (-not $db.counts.PSObject.Properties[$date]) { return $null }
  return $db.counts.$date.PSObject.Properties[$productId].Value
}

function Get-ReportData($db, [string]$date, [string]$departmentId) {
  $items = New-Object System.Collections.Generic.List[object]
  foreach ($product in @($db.products | Where-Object { $_.active -eq $true })) {
    if ($departmentId -ne "all" -and $product.departmentId -ne $departmentId) { continue }
    $count = Get-Count $db $date $product.id
    $qty = if ($count) { [double]$count.qty } else { [double]$product.lastQty }
    if ($qty -le [double]$product.minQty) {
      $items.Add([pscustomobject]@{
        productId = $product.id
        productName = $product.name
        departmentId = $product.departmentId
        departmentName = Get-DepartmentName $db $product.departmentId
        unit = $product.unit
        qty = $qty
        minQty = $product.minQty
        note = if ($count) { $count.note } else { "" }
      })
    }
  }
  return $items
}

function Build-OrderReportMail($db, [string]$date, [string]$departmentId) {
  $settings = $db.mailSettings.report
  $items = Get-ReportData $db $date $departmentId
  $lines = New-Object System.Collections.Generic.List[string]
  $lines.Add([string]$settings.subject)
  $lines.Add("Tarih: $date")
  $lines.Add("Alıcılar: $($settings.recipients)")
  $lines.Add("Gönderim saati: $($settings.sendTime)")
  $lines.Add("")
  $lines.Add("Sipariş verilmesi gereken ürünler:")
  $lines.Add("")

  if ($items.Count -eq 0) {
    $lines.Add("Bugün minimum stok seviyesinin altında ürün bulunmuyor.")
    return ($lines -join "`n")
  }

  foreach ($group in ($items | Group-Object departmentName)) {
    $lines.Add($group.Name)
    foreach ($item in $group.Group) {
      $note = if ([string]::IsNullOrWhiteSpace($item.note)) { "" } else { " | Not: $($item.note)" }
      $lines.Add("- $($item.productName): $($item.qty) $($item.unit) | Minimum: $($item.minQty) | Sipariş gerekli$note")
    }
    $lines.Add("")
  }

  return ($lines -join "`n")
}

function Build-ReminderMail($db) {
  $settings = $db.mailSettings.reminder
  return @(
    $settings.subject,
    "Alıcılar: $($settings.recipients)",
    "Gönderim saati: $($settings.sendTime)",
    "",
    $settings.message,
    "",
    "Departmanlar: Temizlik, Mutfak, Büfe, Smile Food House, Resepsiyon"
  ) -join "`n"
}

function Add-MailLog([string]$kind, [string]$status, [string]$subject, [string]$recipients, [string]$body) {
  $log = Read-JsonFile $script:MailLogFile @()
  $items = @($log)
  $items += [pscustomobject]@{
    id = "mail-$([DateTimeOffset]::Now.ToUnixTimeMilliseconds())"
    kind = $kind
    status = $status
    subject = $subject
    recipients = $recipients
    body = $body
    createdAt = (Get-Date).ToString("s")
  }
  Write-JsonFile $script:MailLogFile $items
}

function Send-MailOrLog([string]$kind, [string]$subject, [string]$recipients, [string]$body) {
  if (-not $script:Config.smtp.enabled) {
    Add-MailLog $kind "logged" $subject $recipients $body
    return [pscustomobject]@{ sent = $false; logged = $true; message = "SMTP kapalı, mail log dosyasına yazıldı." }
  }

  $smtp = $script:Config.smtp
  $message = New-Object System.Net.Mail.MailMessage
  $message.From = $smtp.from
  foreach ($recipient in ($recipients -split ",")) {
    $clean = $recipient.Trim()
    if ($clean) { $message.To.Add($clean) }
  }
  $message.Subject = $subject
  $message.Body = $body
  $message.BodyEncoding = [System.Text.Encoding]::UTF8
  $message.SubjectEncoding = [System.Text.Encoding]::UTF8

  $client = New-Object System.Net.Mail.SmtpClient($smtp.host, [int]$smtp.port)
  $client.EnableSsl = [bool]$smtp.useSsl
  if ($smtp.username) {
    $client.Credentials = New-Object System.Net.NetworkCredential($smtp.username, $smtp.password)
  }
  $client.Send($message)
  Add-MailLog $kind "sent" $subject $recipients $body
  return [pscustomobject]@{ sent = $true; logged = $true; message = "Mail gönderildi." }
}

function Invoke-DueAutomations {
  $now = Get-TimeKey
  $today = Get-DateKey
  $db = Read-JsonFile $script:DataFile ([pscustomobject]@{})

  if ($db.mailSettings.reminder.sendTime -eq $now -and $script:LastReminderDate -ne $today) {
    $body = Build-ReminderMail $db
    Send-MailOrLog "reminder" $db.mailSettings.reminder.subject $db.mailSettings.reminder.recipients $body | Out-Null
    $script:LastReminderDate = $today
  }

  if ($db.mailSettings.report.sendTime -eq $now -and $script:LastReportDate -ne $today) {
    $body = Build-OrderReportMail $db $today "all"
    Send-MailOrLog "report" $db.mailSettings.report.subject $db.mailSettings.report.recipients $body | Out-Null
    $script:LastReportDate = $today
  }
}

function Serve-StaticFile($ctx, [string]$routePath) {
  $relativePath = if ($routePath -eq "/") { "index.html" } else { $routePath.TrimStart("/") }
  $staticPath = [System.IO.Path]::GetFullPath((Join-Path $script:RootPath $relativePath))
  if (-not $staticPath.StartsWith($script:RootPath)) {
    Send-Text $ctx 403 "Forbidden"
    return
  }
  if (-not (Test-Path -LiteralPath $staticPath -PathType Leaf)) {
    Send-Text $ctx 404 "Not found"
    return
  }
  $ext = [System.IO.Path]::GetExtension($staticPath).ToLowerInvariant()
  $type = switch ($ext) {
    ".html" { "text/html; charset=utf-8" }
    ".css" { "text/css; charset=utf-8" }
    ".js" { "application/javascript; charset=utf-8" }
    ".json" { "application/json; charset=utf-8" }
    default { "application/octet-stream" }
  }
  $bytes = [System.IO.File]::ReadAllBytes($staticPath)
  Send-Response $ctx 200 $type $bytes
}

function Handle-Api($ctx, [string]$method, [string]$path) {
  $db = Read-JsonFile $script:DataFile ([pscustomobject]@{})

  if ($method -eq "GET" -and $path -eq "/api/health") {
    Send-Json $ctx 200 ([pscustomobject]@{ ok = $true; app = "otel-yonetim"; time = (Get-Date).ToString("s") })
    return
  }

  if ($method -eq "GET" -and $path -eq "/api/bootstrap") {
    Send-Json $ctx 200 $db
    return
  }

  if ($method -eq "POST" -and $path -eq "/api/login") {
    $body = Read-BodyJson $ctx
    $user = @($db.users | Where-Object { $_.username -eq $body.username -and $_.password -eq $body.password })[0]
    if (-not $user) {
      Send-Json $ctx 401 ([pscustomobject]@{ ok = $false; message = "Kullanıcı adı veya şifre hatalı." })
      return
    }
    Send-Json $ctx 200 ([pscustomobject]@{ ok = $true; user = (Get-PublicUser $user) })
    return
  }

  if ($method -eq "GET" -and $path -eq "/api/products") {
    Send-Json $ctx 200 $db.products
    return
  }

  if ($method -eq "POST" -and $path -eq "/api/products") {
    $product = Read-BodyJson $ctx
    if (-not $product.id) { $product | Add-Member -NotePropertyName id -NotePropertyValue "p-$([DateTimeOffset]::Now.ToUnixTimeMilliseconds())" }
    if ($null -eq $product.active) { $product | Add-Member -NotePropertyName active -NotePropertyValue $true }
    $db.products = @($db.products) + $product
    Write-JsonFile $script:DataFile $db
    Send-Json $ctx 201 $product
    return
  }

  if ($path -match "^/api/products/([^/]+)$" -and $method -eq "PUT") {
    $id = [uri]::UnescapeDataString($Matches[1])
    $product = Read-BodyJson $ctx
    $products = @($db.products)
    $index = -1
    for ($i = 0; $i -lt $products.Count; $i += 1) {
      if ($products[$i].id -eq $id) { $index = $i; break }
    }
    if ($index -lt 0) { Send-Text $ctx 404 "Product not found"; return }
    $product.id = $id
    $products[$index] = $product
    $db.products = $products
    Write-JsonFile $script:DataFile $db
    Send-Json $ctx 200 $product
    return
  }

  if ($path -match "^/api/products/([^/]+)/active$" -and $method -eq "PATCH") {
    $id = [uri]::UnescapeDataString($Matches[1])
    $body = Read-BodyJson $ctx
    foreach ($product in @($db.products)) {
      if ($product.id -eq $id) { $product.active = [bool]$body.active }
    }
    Write-JsonFile $script:DataFile $db
    Send-Json $ctx 200 ([pscustomobject]@{ ok = $true })
    return
  }

  if ($method -eq "POST" -and $path -eq "/api/counts") {
    $body = Read-BodyJson $ctx
    $date = if ($body.date) { $body.date } else { Get-DateKey }
    if (-not $db.counts.PSObject.Properties[$date]) {
      $db.counts | Add-Member -NotePropertyName $date -NotePropertyValue ([pscustomobject]@{})
    }
    $entry = [pscustomobject]@{
      qty = [double]$body.qty
      note = if ($body.note) { $body.note } else { "" }
      user = $body.user
      username = $body.username
      departmentId = $body.departmentId
      time = if ($body.time) { $body.time } else { (Get-Date).ToString("HH:mm") }
    }
    if ($db.counts.$date.PSObject.Properties[$body.productId]) {
      $db.counts.$date.PSObject.Properties[$body.productId].Value = $entry
    } else {
      $db.counts.$date | Add-Member -NotePropertyName $body.productId -NotePropertyValue $entry
    }
    Write-JsonFile $script:DataFile $db
    Send-Json $ctx 200 $entry
    return
  }

  if ($method -eq "GET" -and $path -eq "/api/report") {
    $date = Get-QueryValue $ctx "date" (Get-DateKey)
    $departmentId = Get-QueryValue $ctx "departmentId" "all"
    $items = Get-ReportData $db $date $departmentId
    $mailText = Build-OrderReportMail $db $date $departmentId
    Send-Json $ctx 200 ([pscustomobject]@{ date = $date; departmentId = $departmentId; orderItems = $items; mailText = $mailText })
    return
  }

  if ($method -eq "GET" -and $path -eq "/api/mail-settings") {
    Send-Json $ctx 200 $db.mailSettings
    return
  }

  if ($method -eq "PUT" -and $path -eq "/api/mail-settings") {
    $db.mailSettings = Read-BodyJson $ctx
    Write-JsonFile $script:DataFile $db
    Send-Json $ctx 200 $db.mailSettings
    return
  }

  if ($method -eq "GET" -and $path -eq "/api/mail-log") {
    Send-Json $ctx 200 (Read-JsonFile $script:MailLogFile @())
    return
  }

  if ($method -eq "POST" -and $path -eq "/api/mail/send-reminder") {
    $bodyText = Build-ReminderMail $db
    $result = Send-MailOrLog "reminder" $db.mailSettings.reminder.subject $db.mailSettings.reminder.recipients $bodyText
    Send-Json $ctx 200 $result
    return
  }

  if ($method -eq "POST" -and $path -eq "/api/mail/send-report") {
    $date = Get-QueryValue $ctx "date" (Get-DateKey)
    $bodyText = Build-OrderReportMail $db $date "all"
    $result = Send-MailOrLog "report" $db.mailSettings.report.subject $db.mailSettings.report.recipients $bodyText
    Send-Json $ctx 200 $result
    return
  }

  Send-Text $ctx 404 "API route not found"
}

$script:Config = Read-JsonFile $ConfigPath ([pscustomobject]@{})
$script:RootPath = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$script:DataFile = Resolve-AppPath $script:Config.dataFile
$script:MailLogFile = Resolve-AppPath $script:Config.mailLogFile
$script:LastReminderDate = ""
$script:LastReportDate = ""

$prefix = "http://$($script:Config.host):$($script:Config.port)/"
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Parse("127.0.0.1"), [int]$script:Config.port)
$listener.Start()

$timer = New-Object System.Timers.Timer
$timer.Interval = 60000
$timer.AutoReset = $true
Register-ObjectEvent -InputObject $timer -EventName Elapsed -Action { Invoke-DueAutomations } | Out-Null
$timer.Start()

Write-Host "Otel Yönetim backend çalışıyor: $prefix"
Write-Host "Durdurmak için Ctrl+C"

function Read-HttpContext($client) {
  $stream = $client.GetStream()
  $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8, $false, 8192, $true)
  $requestLine = $reader.ReadLine()
  if ([string]::IsNullOrWhiteSpace($requestLine)) { return $null }

  $headers = @{}
  while ($true) {
    $line = $reader.ReadLine()
    if ($null -eq $line -or $line -eq "") { break }
    $parts = $line.Split(":", 2)
    if ($parts.Count -eq 2) {
      $headers[$parts[0].Trim().ToLowerInvariant()] = $parts[1].Trim()
    }
  }

  $body = ""
  $contentLength = 0
  if ($headers.ContainsKey("content-length")) {
    [int]::TryParse($headers["content-length"], [ref]$contentLength) | Out-Null
  }
  if ($contentLength -gt 0) {
    $buffer = New-Object char[] $contentLength
    $read = 0
    while ($read -lt $contentLength) {
      $chunk = $reader.Read($buffer, $read, $contentLength - $read)
      if ($chunk -le 0) { break }
      $read += $chunk
    }
    $body = -join $buffer[0..($read - 1)]
  }

  $requestParts = $requestLine.Split(" ")
  $method = $requestParts[0]
  $target = $requestParts[1]
  $uri = [uri]("http://localhost:$($script:Config.port)$target")
  $query = @{}
  if ($uri.Query.Length -gt 1) {
    foreach ($pair in $uri.Query.TrimStart("?").Split("&")) {
      if ([string]::IsNullOrWhiteSpace($pair)) { continue }
      $kv = $pair.Split("=", 2)
      $name = [uri]::UnescapeDataString($kv[0])
      $value = if ($kv.Count -gt 1) { [uri]::UnescapeDataString($kv[1]) } else { "" }
      $query[$name] = $value
    }
  }

  return [pscustomobject]@{
    Client = $client
    BodyRaw = $body
    Request = [pscustomobject]@{
      HttpMethod = $method
      Url = $uri
      QueryString = $query
    }
  }
}

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    $ctx = Read-HttpContext $client
    if (-not $ctx) {
      $client.Close()
      continue
    }
    $method = $ctx.Request.HttpMethod.ToUpperInvariant()
    $path = $ctx.Request.Url.AbsolutePath

    if ($method -eq "OPTIONS") {
      Send-Json $ctx 200 ([pscustomobject]@{ ok = $true })
      continue
    }

    try {
      if ($path.StartsWith("/api/")) {
        Handle-Api $ctx $method $path
      } else {
        Serve-StaticFile $ctx $path
      }
    } catch {
      Send-Json $ctx 500 ([pscustomobject]@{ ok = $false; message = $_.Exception.Message })
    }
  }
} finally {
  $timer.Stop()
  $listener.Stop()
}
