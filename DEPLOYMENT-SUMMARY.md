# 📦 AutoFacturas - Resumen de Despliegue

## ✅ Estado del Build

### Componentes Construidos

| Componente | Estado | Tamaño (gzip) | Ubicación |
|------------|--------|---------------|-----------|
| **Frontend** | ✅ Exitoso | ~81 KB JS, ~4 KB CSS | `frontend/build/` |
| **Landing** | ✅ Exitoso | ~70 KB JS, ~5 KB CSS | `landing/build/` |
| **Backend** | ✅ Listo | ~50-100 MB | `backend/` |
| **Production Server** | ✅ Configurado | - | `production-server.js` |

---

## 🚀 Opciones de Despliegue

### Opción 1: Servidor Unificado (Recomendado para Producción)

**Características:**
- Un solo proceso Node.js
- Sirve Frontend, Landing y API
- Menor consumo de recursos
- Configuración simplificada

**Inicio Rápido:**
```bash
# 1. Configurar entorno
cp .env.example .env
nano .env  # Editar configuración

# 2. Iniciar servidor
npm run prod:serve

# 3. Acceder a:
# - Frontend: http://localhost:8080/
# - Landing:  http://localhost:8080/landing
# - API:      http://localhost:8080/api
```

**Con PM2 (Recomendado):**
```bash
# Instalar PM2
npm install -g pm2

# Iniciar con PM2
pm2 start ecosystem.config.js --only autofacturas-production

# Configurar inicio automático
pm2 startup
pm2 save

# Monitorear
pm2 status
pm2 logs autofacturas-production
```

---

### Opción 2: Servicios Separados

**Características:**
- Procesos independientes
- Mayor flexibilidad
- Escalabilidad individual
- Ideal para microservicios

**Inicio:**
```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Servir Frontend
npx serve -s frontend/build -p 3000

# Terminal 3 - Servir Landing
npx serve -s landing/build -p 3002
```

**Con PM2:**
```bash
# Backend
pm2 start ecosystem.config.js --only autofacturas-backend-only

# Frontend (con serve)
pm2 start "npx serve -s frontend/build -p 3000" --name frontend

# Landing (con serve)
pm2 start "npx serve -s landing/build -p 3002" --name landing
```

---

### Opción 3: Docker

**Características:**
- Contenedor aislado
- Fácil despliegue
- Portabilidad completa
- Ideal para cloud

**Inicio:**
```bash
# Build imagen
docker build -t autofacturas:latest .

# Ejecutar contenedor
docker run -d \
  --name autofacturas \
  -p 8080:8080 \
  -v $(pwd)/backend/data:/app/backend/data \
  autofacturas:latest

# Con docker-compose
docker-compose up -d
```

---

## 🔧 Configuración de Producción

### Variables de Entorno Críticas

```env
# Servidor
NODE_ENV=production
PROD_SERVER_PORT=8080

# API Backend
PORT=3001
DATABASE_PATH=./backend/database.db

# URLs (actualizar con tu dominio)
REACT_APP_API_URL=https://tu-dominio.com

# Seguridad (CAMBIAR EN PRODUCCIÓN)
SESSION_SECRET=genera-un-string-aleatorio-muy-largo-y-seguro
CORS_ORIGIN=https://tu-dominio.com

# Servicios a servir
SERVE_FRONTEND=true
SERVE_LANDING=true
SERVE_BACKEND=true
```

### Generar SESSION_SECRET Seguro

```bash
# Opción 1
openssl rand -base64 32

# Opción 2
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 🌐 Configuración de Nginx

### Instalación y Configuración

```bash
# Instalar Nginx
sudo apt install nginx -y

# Copiar configuración
sudo cp nginx.conf /etc/nginx/sites-available/autofacturas

# Editar dominio
sudo nano /etc/nginx/sites-available/autofacturas
# Cambiar "tu-dominio.com" por tu dominio real

# Habilitar sitio
sudo ln -s /etc/nginx/sites-available/autofacturas /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

### SSL con Let's Encrypt

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# Verificar renovación automática
sudo certbot renew --dry-run
```

---

## 📊 Verificación del Despliegue

### Checklist Post-Despliegue

```bash
# 1. Verificar que el servidor esté corriendo
curl http://localhost:8080/health

# Respuesta esperada:
# {"status":"OK","timestamp":"...","services":{...}}

# 2. Verificar API
curl http://localhost:8080/api/health

# 3. Verificar Frontend
curl -I http://localhost:8080/

# 4. Verificar Landing
curl -I http://localhost:8080/landing

# 5. Verificar base de datos
ls -lh backend/database.db
```

### Tests de Funcionalidad

```bash
# Test de suscripción
curl -X POST http://localhost:8080/api/subscriptions \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "plan": "basico",
    "company_name": "Test Company"
  }'

# Test de solicitud de demo
curl -X POST http://localhost:8080/api/demo-requests \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Test Company",
    "contact_name": "John Doe",
    "email": "test@example.com",
    "phone": "1234567890"
  }'
```

---

## 📈 Monitoreo y Logs

### Con PM2

```bash
# Ver estado
pm2 status

# Ver logs en tiempo real
pm2 logs autofacturas-production

# Ver logs específicos
pm2 logs autofacturas-production --lines 100

# Monitoreo en tiempo real
pm2 monit

# Información detallada
pm2 info autofacturas-production
```

### Logs del Sistema

```bash
# Logs de Nginx
sudo tail -f /var/log/nginx/autofacturas-access.log
sudo tail -f /var/log/nginx/autofacturas-error.log

# Logs de la aplicación (si se configuraron)
tail -f logs/pm2-out.log
tail -f logs/pm2-error.log
```

---

## 🔄 Actualización del Sistema

### Proceso de Actualización

```bash
# 1. Detener servidor
pm2 stop autofacturas-production

# 2. Backup de base de datos
cp backend/database.db backend/database.db.backup-$(date +%Y%m%d-%H%M%S)

# 3. Actualizar código
git pull origin main
# O subir nuevos archivos

# 4. Reinstalar dependencias y rebuild
npm run install:all
npm run build:all

# 5. Reiniciar servidor
pm2 restart autofacturas-production

# 6. Verificar
curl http://localhost:8080/health
pm2 logs autofacturas-production --lines 50
```

---

## 🛡️ Seguridad

### Checklist de Seguridad

- [ ] ✅ SESSION_SECRET cambiado a valor aleatorio
- [ ] ✅ CORS_ORIGIN configurado correctamente
- [ ] ✅ SSL/HTTPS habilitado
- [ ] ✅ Firewall configurado (solo puertos 80, 443, 22)
- [ ] ✅ Actualizaciones de seguridad del sistema
- [ ] ✅ Backups automáticos configurados
- [ ] ✅ Logs de acceso habilitados
- [ ] ✅ Rate limiting configurado en Nginx

### Configurar Firewall (UFW)

```bash
# Habilitar UFW
sudo ufw enable

# Permitir SSH
sudo ufw allow 22/tcp

# Permitir HTTP y HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Verificar estado
sudo ufw status
```

---

## 📦 Backup y Recuperación

### Backup Manual

```bash
# Crear directorio de backups
mkdir -p backups

# Backup de base de datos
cp backend/database.db backups/database-$(date +%Y%m%d-%H%M%S).db

# Backup completo
tar -czf backups/autofacturas-backup-$(date +%Y%m%d-%H%M%S).tar.gz \
  backend/database.db \
  .env \
  logs/
```

### Backup Automático (Crontab)

```bash
# Editar crontab
crontab -e

# Agregar backup diario a las 2 AM
0 2 * * * cd /ruta/autofacturas && cp backend/database.db backups/database-$(date +\%Y\%m\%d).db

# Agregar limpieza de backups antiguos (mantener 30 días)
0 3 * * * find /ruta/autofacturas/backups -name "database-*.db" -mtime +30 -delete
```

---

## 🎯 Métricas de Rendimiento

### Tiempos de Respuesta Esperados

| Endpoint | Tiempo Esperado |
|----------|-----------------|
| `/health` | < 50ms |
| `/api/health` | < 100ms |
| Frontend (primera carga) | < 2s |
| Landing (primera carga) | < 2s |
| API endpoints | < 500ms |

### Monitoreo de Recursos

```bash
# Uso de CPU y memoria
pm2 monit

# Uso de disco
df -h

# Conexiones activas
netstat -an | grep :8080 | wc -l
```

---

## 📞 Soporte y Troubleshooting

### Problemas Comunes

#### 1. Servidor no inicia
```bash
# Verificar logs
pm2 logs autofacturas-production

# Verificar puerto
lsof -i :8080

# Reiniciar
pm2 restart autofacturas-production
```

#### 2. Error 502 Bad Gateway
```bash
# Verificar que el servidor esté corriendo
pm2 status

# Verificar logs de Nginx
sudo tail -f /var/log/nginx/error.log

# Reiniciar servicios
pm2 restart autofacturas-production
sudo systemctl restart nginx
```

#### 3. Base de datos bloqueada
```bash
# Verificar procesos
lsof backend/database.db

# Reiniciar servidor
pm2 restart autofacturas-production
```

---

## 📚 Documentación Adicional

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía completa de despliegue
- **[BUILD.md](./BUILD.md)** - Guía de construcción
- **[README.md](./README.md)** - Documentación general del proyecto

---

## ✅ Checklist Final

Antes de considerar el despliegue completo:

- [ ] ✅ Builds completados sin errores
- [ ] ✅ Variables de entorno configuradas
- [ ] ✅ Base de datos inicializada
- [ ] ✅ Servidor iniciado correctamente
- [ ] ✅ Health checks respondiendo
- [ ] ✅ Frontend accesible
- [ ] ✅ Landing accesible
- [ ] ✅ API funcionando
- [ ] ✅ Nginx configurado (si aplica)
- [ ] ✅ SSL configurado (si aplica)
- [ ] ✅ PM2 configurado para inicio automático
- [ ] ✅ Backups configurados
- [ ] ✅ Monitoreo activo
- [ ] ✅ Logs funcionando
- [ ] ✅ Firewall configurado

---

**🎉 ¡Despliegue Completado Exitosamente!**

Tu sistema AutoFacturas está listo para producción.
