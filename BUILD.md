# 🔨 AutoFacturas - Guía de Build

Esta guía detalla el proceso de construcción (build) del sistema AutoFacturas para diferentes entornos.

## 📋 Índice

- [Requisitos](#requisitos)
- [Build Local](#build-local)
- [Build para Producción](#build-para-producción)
- [Verificación del Build](#verificación-del-build)
- [Optimizaciones](#optimizaciones)
- [Troubleshooting](#troubleshooting)

---

## ✅ Requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0
- 2GB RAM mínimo
- 500MB espacio en disco

---

## 🏗️ Build Local

### Build Completo (Todos los Componentes)

```bash
# Instalar todas las dependencias
npm run install:all

# Construir todos los proyectos
npm run build:all
```

### Build Individual

#### Backend
```bash
cd backend
npm install --production
cd ..
```

#### Frontend
```bash
cd frontend
npm install
npm run build
# Output: frontend/build/
cd ..
```

#### Landing Page
```bash
cd landing
npm install
npm run build
# Output: landing/build/
cd ..
```

---

## 🚀 Build para Producción

### Método 1: Script Automatizado (Recomendado)

```bash
# Dar permisos de ejecución
chmod +x deploy.sh

# Ejecutar build completo
./deploy.sh
```

Este script realiza:
1. ✓ Instala dependencias raíz
2. ✓ Instala dependencias del backend
3. ✓ Construye frontend optimizado
4. ✓ Construye landing optimizado
5. ✓ Inicializa base de datos
6. ✓ Crea archivo .env

### Método 2: Comandos NPM

```bash
# Build completo con inicialización
npm run deploy:build
```

### Método 3: Docker Build

```bash
# Build imagen Docker
docker build -t autofacturas:latest .

# Build con docker-compose
docker-compose build
```

---

## 🔍 Verificación del Build

### 1. Verificar Estructura de Archivos

```bash
# Verificar que existan los builds
ls -la frontend/build/
ls -la landing/build/
ls -la backend/node_modules/

# Verificar tamaños
du -sh frontend/build/
du -sh landing/build/
```

**Tamaños esperados:**
- Frontend build: ~2-5 MB
- Landing build: ~2-4 MB
- Backend node_modules: ~50-100 MB

### 2. Verificar Archivos Críticos

```bash
# Frontend
test -f frontend/build/index.html && echo "✓ Frontend OK" || echo "✗ Frontend FAIL"
test -d frontend/build/static && echo "✓ Static files OK" || echo "✗ Static files FAIL"

# Landing
test -f landing/build/index.html && echo "✓ Landing OK" || echo "✗ Landing FAIL"
test -d landing/build/static && echo "✓ Static files OK" || echo "✗ Static files FAIL"

# Backend
test -f backend/server.js && echo "✓ Backend OK" || echo "✗ Backend FAIL"
test -f backend/database.db && echo "✓ Database OK" || echo "✗ Database FAIL"
```

### 3. Test de Inicio Rápido

```bash
# Iniciar servidor de producción
npm run prod:serve &

# Esperar 5 segundos
sleep 5

# Verificar health
curl http://localhost:8080/health

# Detener servidor
pkill -f "node production-server.js"
```

### 4. Verificar Dependencias

```bash
# Verificar que no falten dependencias
cd backend && npm ls --depth=0
cd ../frontend && npm ls --depth=0
cd ../landing && npm ls --depth=0
cd ..
```

---

## ⚡ Optimizaciones

### 1. Optimización de Build de React

**Frontend y Landing ya incluyen:**
- Minificación de JavaScript
- Minificación de CSS
- Tree shaking
- Code splitting
- Optimización de imágenes

**Variables de entorno para build:**

```bash
# Build con análisis de bundle
cd frontend
GENERATE_SOURCEMAP=false npm run build

# Build con análisis detallado
npm install --save-dev webpack-bundle-analyzer
npm run build -- --stats
```

### 2. Reducir Tamaño de node_modules

```bash
# Instalar solo dependencias de producción
cd backend
npm ci --only=production

# Limpiar caché
npm cache clean --force
```

### 3. Optimización de Base de Datos

```bash
# Compactar base de datos SQLite
sqlite3 backend/database.db "VACUUM;"

# Analizar y optimizar
sqlite3 backend/database.db "ANALYZE;"
```

### 4. Compresión de Assets

```bash
# Comprimir archivos estáticos (opcional)
cd frontend/build
find . -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" \) -exec gzip -k {} \;
cd ../..

cd landing/build
find . -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" \) -exec gzip -k {} \;
cd ../..
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module"

```bash
# Limpiar todo y reinstalar
rm -rf node_modules frontend/node_modules landing/node_modules backend/node_modules
rm -rf frontend/build landing/build
npm run install:all
npm run build:all
```

### Error: "Out of memory"

```bash
# Aumentar memoria de Node.js
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build:all
```

### Error: Build de React falla

```bash
# Limpiar caché de React
cd frontend
rm -rf node_modules/.cache
npm run build

cd ../landing
rm -rf node_modules/.cache
npm run build
cd ..
```

### Error: Permisos en Linux

```bash
# Dar permisos correctos
chmod +x deploy.sh
chmod 644 backend/database.db
chmod 755 backend/
```

### Verificar Logs de Build

```bash
# Build con logs detallados
npm run build:frontend 2>&1 | tee frontend-build.log
npm run build:landing 2>&1 | tee landing-build.log
```

---

## 📊 Análisis de Build

### Tamaño de Bundles

```bash
# Analizar tamaño de frontend
cd frontend
npm run build
ls -lh build/static/js/*.js
ls -lh build/static/css/*.css

# Analizar tamaño de landing
cd ../landing
npm run build
ls -lh build/static/js/*.js
ls -lh build/static/css/*.css
cd ..
```

### Tiempo de Build

```bash
# Medir tiempo de build
time npm run build:all
```

**Tiempos esperados:**
- Backend: ~10-30 segundos
- Frontend: ~30-60 segundos
- Landing: ~30-60 segundos
- **Total: ~1-3 minutos**

---

## 🎯 Checklist de Build Exitoso

Antes de desplegar, verificar:

- [ ] ✓ Todas las dependencias instaladas
- [ ] ✓ Frontend build generado en `frontend/build/`
- [ ] ✓ Landing build generado en `landing/build/`
- [ ] ✓ Backend dependencies instaladas
- [ ] ✓ Base de datos inicializada
- [ ] ✓ Archivo `.env` configurado
- [ ] ✓ No hay errores en los logs
- [ ] ✓ Health check responde correctamente
- [ ] ✓ Tamaños de build son razonables
- [ ] ✓ Permisos de archivos correctos

---

## 📝 Comandos Rápidos

```bash
# Build completo desde cero
rm -rf node_modules */node_modules */build && npm run install:all && npm run build:all

# Build solo frontend
cd frontend && npm run build && cd ..

# Build solo landing
cd landing && npm run build && cd ..

# Build y test
npm run build:all && npm run test:health

# Build para Docker
docker build -t autofacturas:latest .

# Build con PM2
npm run build:all && pm2 start ecosystem.config.js
```

---

**Build completado exitosamente! 🎉**

Siguiente paso: Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones de despliegue.
