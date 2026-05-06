@echo off
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0BULUT_API_ADRESI_KAYDET.ps1"
pause
