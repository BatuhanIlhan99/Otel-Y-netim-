@echo off
title Otel Yonetim Agda Calistir
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -NoExit -File "%~dp0START_BACKEND.ps1"
