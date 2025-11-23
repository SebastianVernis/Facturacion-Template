# Documentación API

Base URL: `http://localhost:3001/api`

## Endpoints

### Salud del Sistema
- `GET /health` - Verificar estado del servidor

### Clientes
- `GET /clientes` - Listar todos los clientes
- `POST /clientes` - Crear nuevo cliente
  ```json
  {
    "nombre": "Nombre del cliente",
    "rfc": "RFC123456789",
    "direccion": "Dirección completa",
    "telefono": "555-1234567",
    "email": "email@ejemplo.com"
  }
  ```

### REPUVE
- `GET /vehiculos/repuve/:vin` - Consultar vehículo por VIN
- `GET /repuve/:vin` - Página web con datos REPUVE

### Facturas
- `POST /facturas` - Crear nueva factura
  ```json
  {
    "clienteId": "uuid-del-cliente",
    "vehiculos": [
      {
        "vin": "1HGBH41JXMN109186",
        "marca": "HONDA",
        "modelo": "CIVIC",
        "anio": 2021,
        "precio": 125000
      }
    ],
    "conceptos": [
      {
        "descripcion": "Seguro",
        "cantidad": 1,
        "precioUnitario": 5000
      }
    ],
    "subtotal": 130000,
    "iva": 20800,
    "total": 150800,
    "metodoPago": "Transferencia"
  }
  ```

- `GET /facturas/:id/pdf` - Obtener datos completos de factura

## Códigos QR

Cada vehículo en una factura genera un código QR que apunta a:
`http://localhost:3001/api/repuve/{VIN}`

Esta URL muestra una página HTML con todos los datos del vehículo desde REPUVE.

## Base de Datos

### Tablas
- `clientes` - Información de clientes
- `facturas` - Facturas generadas
- `factura_vehiculos` - Vehículos en cada factura
- `factura_conceptos` - Conceptos adicionales en facturas
- `repuve` - Base de datos local REPUVE

### Inicialización
```bash
npm run init-db
```