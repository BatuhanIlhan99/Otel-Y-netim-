@echo off
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0FIREBASE_CONFIG_KAYDET.ps1"
pause
