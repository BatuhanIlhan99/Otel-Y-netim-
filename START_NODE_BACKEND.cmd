@echo off
cd /d "%~dp0"
echo Otel Yonetim backend baslatiliyor...
set "NODE_EXE=%LOCALAPPDATA%\OpenAI\Codex\bin\node.exe"
if exist "%NODE_EXE%" (
  "%NODE_EXE%" server.js
) else (
  node server.js
)
pause
