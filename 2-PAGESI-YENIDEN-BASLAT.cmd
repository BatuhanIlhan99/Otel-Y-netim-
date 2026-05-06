@echo off
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp02-PAGESI-YENIDEN-BASLAT.ps1"
pause
