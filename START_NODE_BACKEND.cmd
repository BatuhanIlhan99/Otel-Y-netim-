@echo off
cd /d "%~dp0"
if not exist node_modules (
  echo Ilk kurulum yapiliyor...
  npm install
)
npm start
