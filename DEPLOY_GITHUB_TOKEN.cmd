@echo off
title Otel Yonetim GitHub Deploy
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0DEPLOY_GITHUB_TOKEN.ps1"
echo.
pause
