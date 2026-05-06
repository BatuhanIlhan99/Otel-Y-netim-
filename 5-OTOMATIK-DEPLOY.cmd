@echo off
setlocal
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp05-OTOMATIK-DEPLOY.ps1" %*
pause
