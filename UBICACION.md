# 📂 AutoFacturas - Nueva Ubicación

## 🚗 Aplicación Movida

La aplicación **AutoFacturas** ha sido movida a un directorio independiente:

### 📍 **Nueva Ubicación:**
```
/home/sebastianvernis/autofacturas-app/
```

### 📁 **Estructura del Directorio:**
```
autofacturas-app/
├── README.md           # Documentación principal
├── ESTADO.md          # Estado del despliegue
├── demo.html          # Demo HTML
├── install.sh         # Script de instalación
├── start.sh           # Script para iniciar
├── backend/           # API Node.js + Express
├── frontend/          # React.js app
├── docs/              # Documentación
└── database/          # (vacío - BD está en backend/)
```

### 🚀 **Para Ejecutar desde la Nueva Ubicación:**

```bash
# Cambiar al directorio
cd /home/sebastianvernis/autofacturas-app

# Instalar dependencias (si es necesario)
./install.sh

# Iniciar aplicación
./start.sh
```

### 🔧 **URLs Actualizadas:**
- **API**: http://localhost:3001
- **Frontend**: http://localhost:3000 (cuando se inicie)
- **Demo**: abrir `demo.html` en navegador

### ✅ **Estado Actual:**
- ✅ Todos los archivos movidos correctamente
- ✅ Scripts de instalación y ejecución disponibles
- ✅ Base de datos SQLite en `/backend/database.db`
- ✅ Datos REPUVE de ejemplo precargados

La aplicación está lista para usar desde su nueva ubicación independiente.