# 🚀 AutoFacturas - Guía de Despliegue

Esta guía proporciona instrucciones completas para desplegar el sistema AutoFacturas en diferentes entornos.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Despliegue Rápido](#despliegue-rápido)
- [Despliegue en Producción](#despliegue-en-producción)
- [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
- [Opciones de Despliegue](#opciones-de-despliegue)
- [Mantenimiento](#mantenimiento)

---

## 🔧 Requisitos Previos

### Software Requerido

- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior
- **Sistema Operativo**: Linux, macOS, o Windows
- **Memoria RAM**: Mínimo 2GB recomendado
- **Espacio en Disco**: Mínimo 500MB

### Verificar Instalación

```bash
node --version  # Debe mostrar v18.0.0 o superior
npm --version   # Debe mostrar v9.0.0 o superior
```

---

## 📁 Estructura del Proyecto

```
autofacturas/
├── backend/              # API Backend (Express + SQLite)
│   ├── server.js        # Servidor principal
│   ├── database.db      # Base de datos SQLite
│   └── package.json     # Dependencias backend
├── frontend/            # Aplicación principal (React)
│   ├── src/            # Código fuente
│   ├── build/          # Build de producción
│   └── package.json    # Dependencias frontend
├── landing/            # Página de aterrizaje (React)
│   ├── src/           # Código fuente
│   ├── build/         # Build de producción
│   └── package.json   # Dependencias landing
├── production-server.js # Servidor de producción unificado
├── deploy.sh           # Script de despliegue automatizado
├── package.json        # Configuración raíz
├── .env.example        # Plantilla de variables de entorno
└── DEPLOYMENT.md       # Esta guía
```

---

## ⚡ Despliegue Rápido

### Opción 1: Script Automatizado (Recomendado)

```bash
# 1. Dar permisos de ejecución al script
chmod +x deploy.sh

# 2. Ejecutar el script de despliegue
./deploy.sh

# 3. Configurar variables de entorno
cp .env.example .env
nano .env  # Editar según necesidades

# 4. Iniciar servidor de producción
npm run prod:serve
```

### Opción 2: Comandos Manuales

```bash
# 1. Instalar todas las dependencias
npm run install:all

# 2. Construir todos los proyectos
npm run build:all

# 3. Inicializar base de datos
npm run init:db

# 4. Configurar variables de entorno
cp .env.example .env

# 5. Iniciar servidor
npm run prod:serve
```

---

## 🏭 Despliegue en Producción

### 1. Preparación del Servidor

```bash
# Actualizar sistema (Ubuntu/Debian)
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar instalación
node --version
npm --version
```

### 2. Clonar y Configurar Proyecto

```bash
# Clonar repositorio (o subir archivos)
git clone <tu-repositorio> autofacturas
cd autofacturas

# Ejecutar despliegue
chmod +x deploy.sh
./deploy.sh
```

### 3. Configurar Variables de Entorno

```bash
# Copiar plantilla
cp .env.example .env

# Editar configuración
nano .env
```

**Configuración de Producción Recomendada:**

```env
# Backend
PORT=3001
NODE_ENV=production
DATABASE_PATH=./backend/database.db

# Frontend
REACT_APP_API_URL=https://tu-dominio.com
REACT_APP_FRONTEND_PORT=3000

# Landing
REACT_APP_LANDING_PORT=3002

# Production Server
PROD_SERVER_PORT=8080
SERVE_FRONTEND=true
SERVE_LANDING=true
SERVE_BACKEND=true

# CORS
CORS_ORIGIN=https://tu-dominio.com

# Security
SESSION_SECRET=genera-un-string-aleatorio-seguro-aqui

# Database Backup
DB_BACKUP_ENABLED=true
DB_BACKUP_INTERVAL=86400000
```

### 4. Iniciar Servidor con PM2 (Recomendado)

```bash
# Instalar PM2 globalmente
sudo npm install -g pm2

# Iniciar aplicación
pm2 start production-server.js --name autofacturas

# Configurar inicio automático
pm2 startup
pm2 save

# Monitorear aplicación
pm2 status
pm2 logs autofacturas
pm2 monit
```

### 5. Configurar Nginx como Reverse Proxy

```bash
# Instalar Nginx
sudo apt install nginx -y

# Crear configuración
sudo nano /etc/nginx/sites-available/autofacturas
```

**Configuración de Nginx:**

```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    # Logs
    access_log /var/log/nginx/autofacturas-access.log;
    error_log /var/log/nginx/autofacturas-error.log;

    # Proxy settings
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:8080;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Habilitar sitio
sudo ln -s /etc/nginx/sites-available/autofacturas /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

### 6. Configurar SSL con Let's Encrypt

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado SSL
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# Renovación automática (ya configurada por defecto)
sudo certbot renew --dry-run
```

---

## 🔐 Configuración de Variables de Entorno

### Variables Principales

| Variable | Descripción | Valor por Defecto | Requerido |
|----------|-------------|-------------------|-----------|
| `PORT` | Puerto del backend | `3001` | No |
| `NODE_ENV` | Entorno de ejecución | `production` | Sí |
| `PROD_SERVER_PORT` | Puerto del servidor unificado | `8080` | No |
| `REACT_APP_API_URL` | URL de la API | `http://localhost:3001` | Sí |
| `CORS_ORIGIN` | Origen permitido para CORS | `*` | Sí |
| `SESSION_SECRET` | Secreto para sesiones | - | Sí |
| `DATABASE_PATH` | Ruta de la base de datos | `./backend/database.db` | No |

### Generar SESSION_SECRET Seguro

```bash
# Opción 1: OpenSSL
openssl rand -base64 32

# Opción 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 🎯 Opciones de Despliegue

### Opción A: Servidor Unificado (Recomendado)

**Ventajas:**
- Un solo proceso para todo
- Configuración simplificada
- Menor uso de recursos

**Comando:**
```bash
npm run prod:serve
```

**Acceso:**
- Frontend: `http://localhost:8080/`
- Landing: `http://localhost:8080/landing`
- API: `http://localhost:8080/api`

### Opción B: Servicios Separados

**Ventajas:**
- Mayor flexibilidad
- Escalabilidad independiente
- Mejor para microservicios

**Comandos:**
```bash
# Terminal 1 - Backend
npm run prod:backend

# Terminal 2 - Frontend (servir build)
npx serve -s frontend/build -p 3000

# Terminal 3 - Landing (servir build)
npx serve -s landing/build -p 3002
```

### Opción C: Docker (Próximamente)

```bash
# Construir imagen
docker build -t autofacturas .

# Ejecutar contenedor
docker run -p 8080:8080 autofacturas
```

---

## 🛠️ Mantenimiento

### Actualizar Aplicación

```bash
# 1. Detener servidor
pm2 stop autofacturas

# 2. Actualizar código
git pull origin main

# 3. Reinstalar dependencias y reconstruir
./deploy.sh

# 4. Reiniciar servidor
pm2 restart autofacturas
```

### Backup de Base de Datos

```bash
# Backup manual
cp backend/database.db backend/database.db.backup-$(date +%Y%m%d-%H%M%S)

# Backup automático (agregar a crontab)
0 2 * * * cd /ruta/autofacturas && cp backend/database.db backend/database.db.backup-$(date +\%Y\%m\%d)
```

### Monitoreo

```bash
# Ver logs en tiempo real
pm2 logs autofacturas

# Ver estado
pm2 status

# Ver métricas
pm2 monit

# Reiniciar si hay problemas
pm2 restart autofacturas
```

### Verificar Salud del Sistema

```bash
# Health check
curl http://localhost:8080/health

# Verificar API
curl http://localhost:8080/api/health

# Verificar todos los servicios
npm run test:health
```

---

## 🐛 Solución de Problemas

### Error: Puerto en Uso

```bash
# Encontrar proceso usando el puerto
lsof -i :8080

# Matar proceso
kill -9 <PID>
```

### Error: Base de Datos Bloqueada

```bash
# Reiniciar backend
pm2 restart autofacturas

# Si persiste, verificar permisos
chmod 644 backend/database.db
```

### Error: Build Fallido

```bash
# Limpiar caché de npm
npm cache clean --force

# Eliminar node_modules y reinstalar
rm -rf node_modules frontend/node_modules landing/node_modules backend/node_modules
npm run install:all
npm run build:all
```

---

## 📞 Soporte

Para problemas o preguntas:
- Revisar logs: `pm2 logs autofacturas`
- Verificar configuración: `cat .env`
- Revisar estado: `pm2 status`

---

## 📝 Notas Adicionales

### Seguridad

- Cambiar `SESSION_SECRET` en producción
- Configurar CORS apropiadamente
- Usar HTTPS en producción
- Mantener dependencias actualizadas

### Performance

- Habilitar compresión (ya incluida)
- Configurar caché en Nginx
- Monitorear uso de recursos con PM2

### Escalabilidad

- Usar PM2 cluster mode para múltiples instancias
- Considerar balanceador de carga
- Separar base de datos en servidor dedicado

---

**¡Despliegue exitoso! 🎉**
