@echo off
title Otel Yonetim Token Kaydet
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0TOKEN_KAYDET.ps1"
echo.
pause
