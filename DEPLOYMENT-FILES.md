# 📁 AutoFacturas - Archivos de Despliegue

## 📋 Resumen de Archivos Creados

Este documento lista todos los archivos de configuración y despliegue creados para el sistema AutoFacturas.

---

## 🎯 Archivos Principales

### 1. **package.json** (Raíz)
**Ubicación:** `/package.json`

**Propósito:** Gestión centralizada de scripts y dependencias del monorepo

**Scripts principales:**
```bash
npm run install:all      # Instalar todas las dependencias
npm run build:all        # Construir todos los proyectos
npm run deploy:build     # Build completo con inicialización
npm run prod:serve       # Iniciar servidor de producción
npm run init:db          # Inicializar base de datos
```

---

### 2. **production-server.js**
**Ubicación:** `/production-server.js`

**Propósito:** Servidor unificado de producción que sirve:
- Frontend (React app principal)
- Landing page (React marketing)
- Backend API (Express)

**Características:**
- Compresión gzip
- Headers de seguridad (Helmet)
- Health checks
- Manejo de errores
- Soporte para variables de entorno

**Puerto por defecto:** 8080

---

### 3. **.env.example**
**Ubicación:** `/.env.example`

**Propósito:** Plantilla de variables de entorno

**Variables clave:**
- `NODE_ENV` - Entorno de ejecución
- `PROD_SERVER_PORT` - Puerto del servidor
- `SERVE_FRONTEND/LANDING/BACKEND` - Servicios a activar
- `SESSION_SECRET` - Secreto para sesiones
- `CORS_ORIGIN` - Configuración CORS

**Uso:**
```bash
cp .env.example .env
nano .env  # Editar según necesidades
```

---

### 4. **deploy.sh**
**Ubicación:** `/deploy.sh`

**Propósito:** Script automatizado de despliegue

**Acciones:**
1. ✓ Verifica Node.js y npm
2. ✓ Instala dependencias raíz
3. ✓ Instala dependencias backend
4. ✓ Construye frontend
5. ✓ Construye landing
6. ✓ Inicializa base de datos
7. ✓ Crea archivo .env

**Uso:**
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🐳 Docker

### 5. **Dockerfile**
**Ubicación:** `/Dockerfile`

**Propósito:** Construcción de imagen Docker multi-stage

**Stages:**
1. Build frontend
2. Build landing
3. Imagen de producción final

**Características:**
- Optimizado para producción
- Multi-stage build (reduce tamaño)
- Health check integrado
- Volúmenes para base de datos

**Uso:**
```bash
docker build -t autofacturas:latest .
docker run -p 8080:8080 autofacturas:latest
```

---

### 6. **docker-compose.yml**
**Ubicación:** `/docker-compose.yml`

**Propósito:** Orquestación de contenedores

**Servicios:**
- `autofacturas` - Aplicación completa

**Características:**
- Volúmenes persistentes
- Health checks
- Restart automático
- Red aislada

**Uso:**
```bash
docker-compose up -d
docker-compose logs -f
docker-compose down
```

---

### 7. **.dockerignore**
**Ubicación:** `/.dockerignore`

**Propósito:** Excluir archivos del build de Docker

**Excluye:**
- node_modules
- builds existentes
- logs
- archivos temporales
- .git

---

## 🔧 PM2 (Process Manager)

### 8. **ecosystem.config.js**
**Ubicación:** `/ecosystem.config.js`

**Propósito:** Configuración de PM2 para gestión de procesos

**Apps configuradas:**
1. `autofacturas-production` - Servidor unificado
2. `autofacturas-backend-only` - Solo backend

**Características:**
- Auto-restart
- Logs configurados
- Límites de memoria
- Variables de entorno

**Uso:**
```bash
pm2 start ecosystem.config.js
pm2 start ecosystem.config.js --only autofacturas-production
pm2 logs
pm2 monit
```

---

## 🌐 Nginx

### 9. **nginx.conf**
**Ubicación:** `/nginx.conf`

**Propósito:** Configuración de Nginx como reverse proxy

**Características:**
- Redirect HTTP → HTTPS
- SSL/TLS configurado
- Compresión gzip
- Headers de seguridad
- Caché de archivos estáticos
- WebSocket support
- Rate limiting ready

**Instalación:**
```bash
sudo cp nginx.conf /etc/nginx/sites-available/autofacturas
sudo ln -s /etc/nginx/sites-available/autofacturas /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 📚 Documentación

### 10. **DEPLOYMENT.md**
**Ubicación:** `/DEPLOYMENT.md`

**Propósito:** Guía completa de despliegue

**Contenido:**
- Requisitos previos
- Estructura del proyecto
- Despliegue paso a paso
- Configuración de producción
- Nginx y SSL
- Monitoreo y logs
- Troubleshooting
- Seguridad
- Backups

**Audiencia:** DevOps, Administradores de sistemas

---

### 11. **BUILD.md**
**Ubicación:** `/BUILD.md`

**Propósito:** Guía detallada de construcción

**Contenido:**
- Build local
- Build para producción
- Verificación del build
- Optimizaciones
- Troubleshooting
- Análisis de bundles
- Checklist de build

**Audiencia:** Desarrolladores

---

### 12. **DEPLOYMENT-SUMMARY.md**
**Ubicación:** `/DEPLOYMENT-SUMMARY.md`

**Propósito:** Resumen ejecutivo de despliegue

**Contenido:**
- Estado del build
- Opciones de despliegue
- Configuración rápida
- Verificación
- Monitoreo
- Actualización
- Seguridad
- Backups
- Checklist final

**Audiencia:** Project Managers, DevOps

---

### 13. **QUICKSTART.md**
**Ubicación:** `/QUICKSTART.md`

**Propósito:** Guía de inicio rápido (5 minutos)

**Contenido:**
- Despliegue en 5 minutos
- 3 opciones de inicio
- Verificación rápida
- Configuración básica
- Acceso a la aplicación
- Troubleshooting rápido

**Audiencia:** Todos los usuarios

---

### 14. **DEPLOYMENT-FILES.md** (Este archivo)
**Ubicación:** `/DEPLOYMENT-FILES.md`

**Propósito:** Índice de todos los archivos de despliegue

**Contenido:**
- Lista completa de archivos
- Propósito de cada archivo
- Uso y comandos
- Referencias cruzadas

---

## 📊 Estructura de Archivos

```
autofacturas/
├── 📄 package.json                 # Scripts y dependencias raíz
├── 📄 production-server.js         # Servidor de producción
├── 📄 .env.example                 # Plantilla de variables
├── 📄 .env                         # Variables de entorno (crear)
├── 🔧 deploy.sh                    # Script de despliegue
├── 🐳 Dockerfile                   # Imagen Docker
├── 🐳 docker-compose.yml           # Orquestación Docker
├── 🐳 .dockerignore                # Exclusiones Docker
├── 🔧 ecosystem.config.js          # Configuración PM2
├── 🌐 nginx.conf                   # Configuración Nginx
├── 📚 DEPLOYMENT.md                # Guía completa
├── 📚 BUILD.md                     # Guía de build
├── 📚 DEPLOYMENT-SUMMARY.md        # Resumen ejecutivo
├── 📚 QUICKSTART.md                # Inicio rápido
├── 📚 DEPLOYMENT-FILES.md          # Este archivo
├── 📚 README.md                    # Documentación general
├── backend/                        # Backend API
│   ├── server.js                  # Servidor Express
│   ├── database.db                # Base de datos SQLite
│   ├── package.json               # Dependencias backend
│   └── scripts/                   # Scripts de inicialización
├── frontend/                       # Aplicación principal
│   ├── src/                       # Código fuente
│   ├── build/                     # Build de producción
│   └── package.json               # Dependencias frontend
└── landing/                        # Landing page
    ├── src/                       # Código fuente
    ├── build/                     # Build de producción
    └── package.json               # Dependencias landing
```

---

## 🎯 Flujo de Despliegue

### Desarrollo → Producción

```
1. Desarrollo Local
   ├── npm run dev:backend
   ├── npm run dev:frontend
   └── npm run dev:landing

2. Build
   ├── npm run build:frontend
   ├── npm run build:landing
   └── npm run build:backend

3. Despliegue
   ├── Opción A: npm run prod:serve
   ├── Opción B: pm2 start ecosystem.config.js
   └── Opción C: docker-compose up -d

4. Configuración
   ├── Nginx (reverse proxy)
   ├── SSL (Let's Encrypt)
   └── Firewall (UFW)

5. Monitoreo
   ├── pm2 monit
   ├── pm2 logs
   └── curl /health
```

---

## 🔗 Referencias Rápidas

### Comandos Esenciales

```bash
# Despliegue completo
./deploy.sh

# Iniciar producción
npm run prod:serve

# Con PM2
pm2 start ecosystem.config.js

# Con Docker
docker-compose up -d

# Verificar
curl http://localhost:8080/health
```

### Archivos a Editar

1. **`.env`** - Configuración de entorno
2. **`nginx.conf`** - Cambiar dominio
3. **`ecosystem.config.js`** - Ajustar PM2
4. **`docker-compose.yml`** - Ajustar Docker

### Archivos a NO Modificar

- `production-server.js` (a menos que sepas lo que haces)
- `deploy.sh` (a menos que sepas lo que haces)
- `Dockerfile` (a menos que sepas lo que haces)

---

## 📝 Checklist de Archivos

Antes de desplegar, verifica que existan:

- [ ] ✅ package.json (raíz)
- [ ] ✅ production-server.js
- [ ] ✅ .env (creado desde .env.example)
- [ ] ✅ deploy.sh (con permisos +x)
- [ ] ✅ Dockerfile
- [ ] ✅ docker-compose.yml
- [ ] ✅ ecosystem.config.js
- [ ] ✅ nginx.conf
- [ ] ✅ Documentación (MD files)
- [ ] ✅ backend/server.js
- [ ] ✅ frontend/build/
- [ ] ✅ landing/build/

---

## 🆘 Ayuda

### ¿Qué archivo usar?

| Necesidad | Archivo |
|-----------|---------|
| Inicio rápido | `QUICKSTART.md` |
| Despliegue completo | `DEPLOYMENT.md` |
| Problemas de build | `BUILD.md` |
| Resumen ejecutivo | `DEPLOYMENT-SUMMARY.md` |
| Lista de archivos | `DEPLOYMENT-FILES.md` (este) |
| Configuración Docker | `Dockerfile`, `docker-compose.yml` |
| Configuración PM2 | `ecosystem.config.js` |
| Configuración Nginx | `nginx.conf` |
| Variables de entorno | `.env.example` |
| Script automatizado | `deploy.sh` |

---

**Todos los archivos están listos para despliegue en producción! 🚀**
