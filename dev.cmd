@echo off
setlocal

set "ROOT=%~dp0"

if exist "%ROOT%backend\.env" (
  findstr /C:"localhost:5432" "%ROOT%backend\.env" >nul
  if %errorlevel%==0 (
    echo Starting local PostgreSQL with Docker...
    docker compose -f "%ROOT%docker-compose.yml" up -d
  )
)

echo Starting backend...
start "TensorWealth Backend" powershell -NoExit -ExecutionPolicy Bypass -Command "Set-Location '%ROOT%backend'; & '.\.venv\Scripts\python.exe' -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"

echo Starting frontend...
start "TensorWealth Frontend" powershell -NoExit -ExecutionPolicy Bypass -Command "Set-Location '%ROOT%frontend'; npm run dev"

echo.
echo TensorWealth dev environment launched.
echo Backend:  http://127.0.0.1:8000
echo Frontend: http://localhost:3000
