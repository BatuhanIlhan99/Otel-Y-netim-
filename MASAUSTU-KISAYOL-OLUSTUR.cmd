@echo off
setlocal
set "TARGET=file:///C:/Users/batu/Desktop/codex/stok-sayim-uygulamasi/index.html"
set "SHORTCUT=%USERPROFILE%\Desktop\Otel Yonetim - Stok Sayim.url"
(
  echo [InternetShortcut]
  echo URL=%TARGET%
  echo IconFile=C:\Windows\System32\shell32.dll
  echo IconIndex=220
) > "%SHORTCUT%"
echo Masaustu kisayolu olusturuldu:
echo %SHORTCUT%
pause
