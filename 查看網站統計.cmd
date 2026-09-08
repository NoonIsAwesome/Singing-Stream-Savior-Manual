@echo off
title Singing Stream Savior - Site Stats

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\get-site-stats.ps1" -Friendly

echo.
pause
