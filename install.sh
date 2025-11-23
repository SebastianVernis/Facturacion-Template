#!/bin/bash

echo "🚗 Instalando Sistema de Facturación Automotriz..."

# Verificar que Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js v16 o superior."
    exit 1
fi

# Verificar que npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Por favor instala npm."
    exit 1
fi

echo "📦 Instalando dependencias del backend..."
cd backend
npm install

echo "🗄️ Inicializando base de datos..."
npm run init-db

echo "📦 Instalando dependencias del frontend..."
cd ../frontend
npm install

echo "✅ Instalación completada!"
echo ""
echo "Para ejecutar la aplicación:"
echo "1. Backend: cd backend && npm run dev"
echo "2. Frontend: cd frontend && npm start"
echo ""
echo "La aplicación estará disponible en:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:3001"