# Guía de Instalación

## Requisitos del Sistema

- Node.js v16 o superior
- npm v8 o superior
- Sistema operativo: Windows, macOS o Linux

## Instalación Automática

1. Clona o descarga el proyecto
2. Ejecuta el script de instalación:

```bash
./install.sh
```

## Instalación Manual

### Backend

```bash
cd backend
npm install
npm run init-db
```

### Frontend

```bash
cd frontend
npm install
```

## Iniciar la Aplicación

### Automático
```bash
./start.sh
```

### Manual

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

## URLs de Acceso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Página REPUVE**: http://localhost:3001/api/repuve/{VIN}

## Configuración

### Variables de Entorno

Backend (`backend/.env`):
```
PORT=3001
DB_PATH=./database.db
```

Frontend (`frontend/.env`):
```
REACT_APP_API_URL=http://localhost:3001/api
```