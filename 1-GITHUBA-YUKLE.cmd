@echo off
setlocal
title OTEL YONETIM - GITHUBA YUKLE
cd /d "%~dp0"

cls
echo ============================================================
echo   OTEL YONETIM PROJESI - GITHUB DEPLOY
echo ============================================================
echo.
echo 1. Kopyaladigin GitHub tokeni asagidaki satira yapistir.
echo 2. Token ekranda gorunecek; bu pencere yerel bilgisayarinda.
echo 3. Yapistirdiktan sonra ENTER'a bas.
echo.
echo Repository:
echo https://github.com/BatuhanIlhan99/Otel-Y-netim-
echo.

set "OTEL_GITHUB_TOKEN="
set /p "OTEL_GITHUB_TOKEN=TOKENI BURAYA YAPISTIR VE ENTER'A BAS: "

if "%OTEL_GITHUB_TOKEN%"=="" (
  echo.
  echo HATA: Token bos girildi. Pencereyi kapatip tekrar dene.
  echo.
  pause
  exit /b 1
)

echo.
echo Token alindi. Deploy basliyor...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp01-GITHUBA-YUKLE.ps1"

echo.
echo Islem bitti. Bu penceredeki sonucu kontrol et.
echo.
pause
