@echo off
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0BULUT_BACKEND_TEST.ps1"
pause
