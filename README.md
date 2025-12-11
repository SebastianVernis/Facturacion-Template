# 🚗 AutoFacturas - Sistema de Facturación Automotriz

Aplicación web para generar facturas de agencias automotrices con códigos QR que redirigen a datos de REPUVE (Registro Público Vehicular).

## Características

- Generación de facturas en PDF
- Códigos QR con redirección a datos REPUVE locales
- Gestión de clientes y vehículos
- Base de datos local de REPUVE
- Interfaz web responsive
- Landing page informativa

## Estructura del Proyecto

El proyecto está organizado como un monorepo con tres componentes principales:

```
autofacturas-app/
├── backend/        # API de Node.js/Express
├── frontend/       # Aplicación principal con React.js
├── landing/        # Landing page
├── scripts/        # Scripts de utilidad (deploy, install, start)
└── docs/           # Documentación
```

## Tecnologías

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Base de datos**: SQLite
- **Generación QR**: qrcode.js
- **Generación PDF**: jsPDF

## Cómo empezar

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/autofacturas-app.git
    cd autofacturas-app
    ```

2.  **Instalar dependencias:**
    Este comando instalará las dependencias para el proyecto raíz, `backend`, `frontend` y `landing`.
    ```bash
    npm run install:all
    ```

3.  **Iniciar en modo de desarrollo:**
    Puedes iniciar cada servicio por separado:
    ```bash
    # Iniciar backend (API)
    npm run dev:backend

    # Iniciar frontend (App principal)
    npm run dev:frontend

    # Iniciar landing page
    npm run dev:landing
    ```

## Scripts Disponibles

- `npm run install:all`: Instala todas las dependencias.
- `npm run build:all`: Construye las versiones de producción de `frontend`, `backend` y `landing`.
- `npm run start:backend`: Inicia el servidor de backend en modo producción.
- `npm run dev:backend`: Inicia el servidor de backend en modo desarrollo.

## Despliegue con Vercel

Este proyecto está configurado para un despliegue sencillo en Vercel.

1.  **Conectar a Vercel**: Importa tu repositorio de Git en Vercel.
2.  **Configuración del Proyecto**: Vercel detectará automáticamente la configuración del proyecto a través del archivo `vercel.json`.
3.  **Variables de Entorno**: Asegúrate de configurar las variables de entorno necesarias en la configuración de tu proyecto en Vercel.
4.  **Desplegar**: Vercel construirá y desplegará automáticamente cada commit.
