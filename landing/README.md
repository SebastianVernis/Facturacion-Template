# 🚗 AutoFacturas - Landing Page

Landing page con integración de suscripción y opciones de infraestructura personalizada para AutoFacturas.

## 🎯 Características

### Secciones Principales
- **Hero**: Presentación impactante con llamados a la acción
- **Features**: Showcase de características principales del sistema
- **Pricing**: Planes de suscripción (Prueba Gratuita, Básico, Profesional, Enterprise)
- **Custom Integration**: Formulario para solicitudes de integración personalizada
- **Footer**: Información de contacto y enlaces

### Opciones de Integración
1. **Suscripción SaaS**
   - Prueba Gratuita (30 días)
   - Plan Básico ($499 MXN/mes)
   - Plan Profesional ($999 MXN/mes)
   - Plan Enterprise (Personalizado)

2. **Infraestructura Personalizada**
   - On-Premise: Instalación en infraestructura propia
   - Nube Privada: Infraestructura dedicada en la nube
   - Híbrido: Combinación de on-premise y nube

## 🚀 Instalación

```bash
cd landing
npm install
```

## 💻 Desarrollo

```bash
npm start
# Disponible en: http://localhost:3000
```

## 🏗️ Build

```bash
npm run build
# Genera carpeta build/ con archivos estáticos
```

## 🔌 API Endpoints

La landing page se conecta con los siguientes endpoints del backend:

### Suscripciones
- `POST /api/subscriptions` - Crear solicitud de suscripción
- `GET /api/subscriptions` - Listar todas las suscripciones (admin)

### Integraciones Personalizadas
- `POST /api/integration-requests` - Crear solicitud de integración
- `GET /api/integration-requests` - Listar todas las solicitudes (admin)

### Demos
- `POST /api/demo-requests` - Crear solicitud de demo
- `GET /api/demo-requests` - Listar todas las solicitudes (admin)

## 📊 Base de Datos

Las solicitudes se almacenan en SQLite con las siguientes tablas:

- `subscriptions`: Solicitudes de suscripción
- `integration_requests`: Solicitudes de integración personalizada
- `demo_requests`: Solicitudes de demo

## 🎨 Tecnologías

- React 18
- Tailwind CSS
- Axios
- React Router DOM

## 📱 Responsive Design

La landing page está completamente optimizada para:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔗 Navegación

- `/` - Landing page principal
- `/app` - Redirección a la aplicación principal (frontend)

## 📝 Formularios

### Formulario de Suscripción
- Plan seleccionado
- Nombre de empresa
- Nombre de contacto
- Email
- Teléfono
- Mensaje (opcional)
- Ciclo de facturación (mensual/anual)

### Formulario de Integración Personalizada
- Nombre de empresa
- Nombre de contacto
- Email
- Teléfono
- Tipo de infraestructura
- Sistema actual
- Vehículos por mes
- Número de usuarios
- Requerimientos específicos
- Timeline de implementación

## ✅ Testing

Para probar los endpoints:

```bash
# Probar suscripción
curl -X POST http://localhost:3001/api/subscriptions \
  -H "Content-Type: application/json" \
  -d '{"plan":"Profesional","company":"Test","name":"Test","email":"test@test.com","phone":"555-1234","billingCycle":"monthly"}'

# Probar integración
curl -X POST http://localhost:3001/api/integration-requests \
  -H "Content-Type: application/json" \
  -d '{"company":"Test","name":"Test","email":"test@test.com","phone":"555-1234","infrastructureType":"on-premise","requirements":"Test requirements"}'
```

## 🎯 Próximos Pasos

1. Configurar pasarela de pagos (Stripe/PayPal)
2. Implementar sistema de notificaciones por email
3. Agregar panel de administración para gestionar solicitudes
4. Implementar analytics y tracking
5. Agregar chat en vivo para soporte
