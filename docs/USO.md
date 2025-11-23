# Guía de Uso

## Funcionalidades Principales

### 1. Dashboard
- Vista general de estadísticas
- Accesos rápidos a funciones principales
- Actividad reciente

### 2. Gestión de Clientes
- Registro de nuevos clientes
- Edición de información existente
- Lista completa de clientes

### 3. Consulta REPUVE
- Búsqueda de vehículos por VIN
- Visualización de datos completos
- Generación de códigos QR

### 4. Generación de Facturas
- Selección de cliente
- Agregar vehículos (con consulta REPUVE automática)
- Conceptos adicionales
- Cálculo automático de IVA
- Códigos QR integrados

## Flujo de Trabajo Recomendado

### 1. Configuración Inicial
1. Registra tus clientes principales
2. Verifica que los VINs estén en REPUVE

### 2. Crear una Factura
1. Ve a "Nueva Factura"
2. Selecciona el cliente
3. Agrega vehículos:
   - Ingresa el VIN
   - Presiona "Buscar REPUVE" para auto-completar
   - Asigna el precio
   - Presiona "Agregar"
4. Agrega conceptos adicionales si es necesario
5. Revisa los totales
6. Genera la factura

### 3. Códigos QR
- Cada vehículo en la factura incluye un código QR
- El QR redirige a: `http://localhost:3001/api/repive/{VIN}`
- La página muestra información completa del REPUVE

## Datos de Ejemplo

La aplicación incluye datos de ejemplo:

**Vehículos REPUVE:**
- VIN: 1HGBH41JXMN109186 (Honda Civic 2021)
- VIN: 3VWD17AJ1FM012345 (Volkswagen Jetta 2022)
- VIN: 1N4AL3AP8JC123456 (Nissan Altima 2023)

**Cliente de ejemplo:**
- AUTOMOTRIZ EJEMPLO SA DE CV
- RFC: AEJ850101XXX