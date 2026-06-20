@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo [AI探索者联盟] 启动开发服务器（代码改动自动重启）...
echo 访问地址: http://localhost:3000
echo 按 Ctrl+C 停止
npm run dev
