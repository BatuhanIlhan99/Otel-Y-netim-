# Otomatik Deploy

Bu proje icin iki deploy yolu hazirlandi.

## Tek seferlik deploy

`5-OTOMATIK-DEPLOY.cmd` dosyasini ac.

Ilk calismada GitHub token ister. Token ekranda gorunmez ve Windows kullanicina bagli sifreli dosyada saklanir:

`%APPDATA%\otel-yonetim\github-token.sec`

Sonraki calistirmalarda token tekrar sorulmaz.

## Otomatik izleme modu

`6-OTOMATIK-DEPLOY-IZLE.cmd` dosyasini ac.

Bu pencere acik kaldigi surece proje dosyalarinda degisiklik algilar, kisa bir beklemeden sonra GitHub'a otomatik deploy eder. GitHub Pages daha sonra siteyi otomatik yayinlar:

https://batuhanilhan99.github.io/Otel-Y-netim-/

## Token sifirlama

Token degistirmek icin PowerShell'de:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\5-OTOMATIK-DEPLOY.ps1 -ResetToken
```

Sonra `5-OTOMATIK-DEPLOY.cmd` veya `6-OTOMATIK-DEPLOY-IZLE.cmd` tekrar acilir ve yeni token girilir.
