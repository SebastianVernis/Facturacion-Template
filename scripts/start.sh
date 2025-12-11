#!/bin/bash

echo "🚗 Iniciando Sistema de Facturación Automotriz..."

# Función para manejar la terminación
cleanup() {
    echo "🛑 Deteniendo aplicación..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Configurar trap para cleanup
trap cleanup SIGINT SIGTERM

# Iniciar backend
echo "🔧 Iniciando backend..."
cd backend
npm run dev &
BACKEND_PID=$!

# Esperar un poco para que el backend se inicie
sleep 3

# Iniciar frontend
echo "🎨 Iniciando frontend..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "✅ Aplicación iniciada!"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:3001"
echo ""
echo "Presiona Ctrl+C para detener la aplicación."

# Esperar a que terminen los procesos
wait $BACKEND_PID $FRONTEND_PID