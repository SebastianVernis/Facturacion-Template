# ⚡ AutoFacturas - Guía de Inicio Rápido

## 🚀 Despliegue en 5 Minutos

### Requisitos Previos
- Node.js 18+ instalado
- 2GB RAM disponible
- 500MB espacio en disco

---

## 📦 Opción 1: Script Automatizado (Más Rápido)

```bash
# 1. Dar permisos y ejecutar
chmod +x deploy.sh && ./deploy.sh

# 2. Configurar entorno (opcional - usa valores por defecto)
cp .env.example .env

# 3. Iniciar servidor
npm run prod:serve
```

**¡Listo!** Accede a:
- 🌐 Frontend: http://localhost:8080/
- 🎯 Landing: http://localhost:8080/landing
- 🔌 API: http://localhost:8080/api

---

## 🛠️ Opción 2: Comandos Manuales

```bash
# Paso 1: Instalar dependencias
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
cd landing && npm install && cd ..

# Paso 2: Construir aplicaciones
cd frontend && npm run build && cd ..
cd landing && npm run build && cd ..

# Paso 3: Inicializar base de datos
cd backend
node scripts/init-database.js
node scripts/init-landing-db.js
cd ..

# Paso 4: Configurar entorno
cp .env.example .env

# Paso 5: Iniciar servidor
npm run prod:serve
```

---

## 🐳 Opción 3: Docker (Más Simple)

```bash
# Build y ejecutar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

---

## ✅ Verificación Rápida

```bash
# Verificar que todo funciona
curl http://localhost:8080/health
curl http://localhost:8080/api/health
```

**Respuesta esperada:**
```json
{"status":"OK","timestamp":"...","services":{...}}
```

---

## 🔧 Configuración Básica

### Variables de Entorno Esenciales

Edita `.env` si necesitas cambiar:

```env
# Puerto del servidor
PROD_SERVER_PORT=8080

# Entorno
NODE_ENV=production

# Servicios a servir
SERVE_FRONTEND=true
SERVE_LANDING=true
SERVE_BACKEND=true
```

---

## 📱 Acceso a la Aplicación

### Frontend Principal (Sistema de Facturación)
```
http://localhost:8080/
```
**Funcionalidades:**
- Gestión de clientes
- Gestión de vehículos
- Generación de facturas
- Integración REPUVE
- Códigos QR

### Landing Page (Marketing)
```
http://localhost:8080/landing
```
**Funcionalidades:**
- Información del producto
- Planes de suscripción
- Formulario de contacto
- Solicitud de demo

### API Backend
```
http://localhost:8080/api
```
**Endpoints principales:**
- `GET /api/health` - Estado del servidor
- `GET /api/clientes` - Lista de clientes
- `GET /api/vehiculos` - Lista de vehículos
- `POST /api/facturas` - Crear factura
- `POST /api/subscriptions` - Nueva suscripción
- `POST /api/demo-requests` - Solicitar demo

---

## 🎯 Casos de Uso Rápidos

### 1. Desarrollo Local

```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend
cd frontend && npm start

# Terminal 3 - Landing
cd landing && npm start
```

### 2. Producción con PM2

```bash
# Instalar PM2
npm install -g pm2

# Iniciar
pm2 start ecosystem.config.js

# Monitorear
pm2 monit

# Logs
pm2 logs
```

### 3. Producción Simple

```bash
# Iniciar en background
npm run prod:serve &

# Ver logs
tail -f logs/pm2-out.log
```

---

## 🔍 Troubleshooting Rápido

### Puerto en Uso
```bash
# Cambiar puerto
PROD_SERVER_PORT=9090 npm run prod:serve
```

### Limpiar y Reinstalar
```bash
rm -rf node_modules */node_modules */build
npm run install:all
npm run build:all
```

### Ver Logs
```bash
# Si usas PM2
pm2 logs

# Si usas npm run prod:serve
# Los logs aparecen en la consola
```

---

## 📚 Documentación Completa

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía completa de despliegue
- **[BUILD.md](./BUILD.md)** - Guía de construcción
- **[DEPLOYMENT-SUMMARY.md](./DEPLOYMENT-SUMMARY.md)** - Resumen ejecutivo
- **[README.md](./README.md)** - Documentación del proyecto

---

## 🆘 Ayuda Rápida

### Comandos Útiles

```bash
# Ver estado
pm2 status

# Reiniciar
pm2 restart autofacturas-production

# Detener
pm2 stop autofacturas-production

# Ver procesos
ps aux | grep node

# Matar proceso en puerto
lsof -ti:8080 | xargs kill -9
```

### Health Checks

```bash
# Servidor principal
curl http://localhost:8080/health

# API
curl http://localhost:8080/api/health

# Frontend (debe devolver HTML)
curl -I http://localhost:8080/

# Landing (debe devolver HTML)
curl -I http://localhost:8080/landing
```

---

## 🎉 ¡Listo para Usar!

Tu sistema AutoFacturas está funcionando. 

**Próximos pasos:**
1. Personaliza el `.env` con tu configuración
2. Configura un dominio (opcional)
3. Configura SSL con Let's Encrypt (producción)
4. Configura backups automáticos

---

**¿Necesitas más ayuda?**
- Revisa [DEPLOYMENT.md](./DEPLOYMENT.md) para configuración avanzada
- Revisa [BUILD.md](./BUILD.md) para detalles de construcción
- Revisa logs con `pm2 logs` o en la consola
