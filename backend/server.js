const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const db = new sqlite3.Database('./database.db');

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/clientes', (req, res) => {
  db.all('SELECT * FROM clientes ORDER BY nombre', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/clientes', (req, res) => {
  const { nombre, rfc, direccion, telefono, email } = req.body;
  const id = uuidv4();
  
  db.run(
    'INSERT INTO clientes (id, nombre, rfc, direccion, telefono, email) VALUES (?, ?, ?, ?, ?, ?)',
    [id, nombre, rfc, direccion, telefono, email],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id, message: 'Cliente creado exitosamente' });
    }
  );
});

app.get('/api/vehiculos/repuve/:vin', (req, res) => {
  const { vin } = req.params;
  
  db.get('SELECT * FROM repuve WHERE vin = ?', [vin], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Vehículo no encontrado en REPUVE' });
      return;
    }
    res.json(row);
  });
});

app.post('/api/facturas', async (req, res) => {
  const {
    clienteId,
    vehiculos,
    conceptos,
    subtotal,
    iva,
    total,
    metodoPago
  } = req.body;

  const facturaId = uuidv4();
  const folio = `FAC-${Date.now()}`;
  const fecha = moment().format('YYYY-MM-DD HH:mm:ss');

  try {
    await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO facturas (id, folio, cliente_id, fecha, subtotal, iva, total, metodo_pago, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [facturaId, folio, clienteId, fecha, subtotal, iva, total, metodoPago, 'activa'],
        (err) => err ? reject(err) : resolve()
      );
    });

    for (const vehiculo of vehiculos) {
      const qrUrl = `http://localhost:3001/api/repuve/${vehiculo.vin}`;
      const qrCode = await QRCode.toDataURL(qrUrl);
      
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO factura_vehiculos (factura_id, vin, marca, modelo, anio, precio, qr_code) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [facturaId, vehiculo.vin, vehiculo.marca, vehiculo.modelo, vehiculo.anio, vehiculo.precio, qrCode],
          (err) => err ? reject(err) : resolve()
        );
      });
    }

    for (const concepto of conceptos) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO factura_conceptos (factura_id, descripcion, cantidad, precio_unitario, importe) VALUES (?, ?, ?, ?, ?)',
          [facturaId, concepto.descripcion, concepto.cantidad, concepto.precioUnitario, concepto.importe],
          (err) => err ? reject(err) : resolve()
        );
      });
    }

    res.json({ 
      facturaId, 
      folio,
      message: 'Factura creada exitosamente',
      pdfUrl: `/api/facturas/${facturaId}/pdf`
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/facturas/:id/pdf', (req, res) => {
  const { id } = req.params;
  
  db.get(
    `SELECT f.*, c.nombre as cliente_nombre, c.rfc as cliente_rfc, c.direccion as cliente_direccion
     FROM facturas f 
     JOIN clientes c ON f.cliente_id = c.id 
     WHERE f.id = ?`,
    [id],
    (err, factura) => {
      if (err || !factura) {
        res.status(404).json({ error: 'Factura no encontrada' });
        return;
      }

      db.all('SELECT * FROM factura_vehiculos WHERE factura_id = ?', [id], (err, vehiculos) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        db.all('SELECT * FROM factura_conceptos WHERE factura_id = ?', [id], (err, conceptos) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }

          const facturaCompleta = {
            ...factura,
            vehiculos,
            conceptos
          };

          res.json(facturaCompleta);
        });
      });
    }
  );
});

app.get('/api/repuve/:vin', (req, res) => {
  const { vin } = req.params;
  
  db.get('SELECT * FROM repuve WHERE vin = ?', [vin], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Datos REPUVE no encontrados' });
      return;
    }
    
    const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Datos REPIVE - ${row.vin}</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { text-align: center; color: #2c5aa0; border-bottom: 3px solid #2c5aa0; padding-bottom: 20px; margin-bottom: 30px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
            .info-item { padding: 15px; background: #f8f9fa; border-left: 4px solid #2c5aa0; }
            .label { font-weight: bold; color: #333; display: block; margin-bottom: 5px; }
            .value { color: #666; font-size: 18px; }
            .status { padding: 10px; text-align: center; border-radius: 5px; margin-top: 20px; }
            .status.valido { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>REGISTRO PÚBLICO VEHICULAR</h1>
                <h2>REPUVE</h2>
                <p>Consulta de Datos Vehiculares</p>
            </div>
            
            <div class="info-grid">
                <div class="info-item">
                    <span class="label">VIN:</span>
                    <span class="value">${row.vin}</span>
                </div>
                <div class="info-item">
                    <span class="label">NIV:</span>
                    <span class="value">${row.niv || 'N/A'}</span>
                </div>
                <div class="info-item">
                    <span class="label">Marca:</span>
                    <span class="value">${row.marca}</span>
                </div>
                <div class="info-item">
                    <span class="label">Modelo:</span>
                    <span class="value">${row.modelo}</span>
                </div>
                <div class="info-item">
                    <span class="label">Año:</span>
                    <span class="value">${row.anio}</span>
                </div>
                <div class="info-item">
                    <span class="label">Color:</span>
                    <span class="value">${row.color || 'N/A'}</span>
                </div>
                <div class="info-item">
                    <span class="label">Tipo:</span>
                    <span class="value">${row.tipo || 'N/A'}</span>
                </div>
                <div class="info-item">
                    <span class="label">Combustible:</span>
                    <span class="value">${row.combustible || 'N/A'}</span>
                </div>
                <div class="info-item">
                    <span class="label">Origen:</span>
                    <span class="value">${row.origen || 'N/A'}</span>
                </div>
                <div class="info-item">
                    <span class="label">Estado:</span>
                    <span class="value">${row.estado || 'N/A'}</span>
                </div>
            </div>
            
            <div class="status valido">
                <strong>✓ VEHÍCULO REGISTRADO EN REPUVE</strong><br>
                <small>Fecha de consulta: ${moment().format('DD/MM/YYYY HH:mm:ss')}</small>
            </div>
        </div>
    </body>
    </html>`;
    
    res.send(html);
  });
});

// ==================== LANDING PAGE ENDPOINTS ====================

// Endpoint para solicitudes de suscripción
app.post('/api/subscriptions', (req, res) => {
  const { plan, company, name, email, phone, message, billingCycle } = req.body;
  const id = uuidv4();
  
  db.run(
    `INSERT INTO subscriptions (id, plan, company, name, email, phone, message, billing_cycle, status) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, plan, company, name, email, phone, message || '', billingCycle || 'monthly', 'pending'],
    function(err) {
      if (err) {
        console.error('Error al crear suscripción:', err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ 
        id, 
        message: 'Solicitud de suscripción recibida exitosamente',
        status: 'success'
      });
    }
  );
});

// Endpoint para solicitudes de integración personalizada
app.post('/api/integration-requests', (req, res) => {
  const { 
    company, 
    name, 
    email, 
    phone, 
    infrastructureType, 
    currentSystem, 
    vehiclesPerMonth, 
    users, 
    requirements, 
    timeline 
  } = req.body;
  const id = uuidv4();
  
  db.run(
    `INSERT INTO integration_requests 
     (id, company, name, email, phone, infrastructure_type, current_system, 
      vehicles_per_month, users, requirements, timeline, status) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id, company, name, email, phone, infrastructureType, 
      currentSystem || '', vehiclesPerMonth || '', users || '', 
      requirements, timeline || '', 'pending'
    ],
    function(err) {
      if (err) {
        console.error('Error al crear solicitud de integración:', err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ 
        id, 
        message: 'Solicitud de integración recibida exitosamente',
        status: 'success'
      });
    }
  );
});

// Endpoint para solicitudes de demo
app.post('/api/demo-requests', (req, res) => {
  const { company, name, email, phone, companySize, message } = req.body;
  const id = uuidv4();
  
  db.run(
    `INSERT INTO demo_requests (id, company, name, email, phone, company_size, message, status) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, company, name, email, phone, companySize || '', message || '', 'pending'],
    function(err) {
      if (err) {
        console.error('Error al crear solicitud de demo:', err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ 
        id, 
        message: 'Solicitud de demo recibida exitosamente',
        status: 'success'
      });
    }
  );
});

// Endpoint para obtener todas las suscripciones (admin)
app.get('/api/subscriptions', (req, res) => {
  db.all('SELECT * FROM subscriptions ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Endpoint para obtener todas las solicitudes de integración (admin)
app.get('/api/integration-requests', (req, res) => {
  db.all('SELECT * FROM integration_requests ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Endpoint para obtener todas las solicitudes de demo (admin)
app.get('/api/demo-requests', (req, res) => {
  db.all('SELECT * FROM demo_requests ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Solo iniciar servidor si no está siendo importado
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✓ Backend API ejecutándose en puerto ${PORT}`);
    console.log(`✓ Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✓ Base de datos: ${process.env.DATABASE_PATH || './database.db'}`);
  });
}

// Exportar app para uso en production-server.js
module.exports = app;