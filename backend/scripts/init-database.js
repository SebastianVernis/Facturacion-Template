const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');

const db = new sqlite3.Database('./database.db');

console.log('Inicializando base de datos...');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS clientes (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    rfc TEXT NOT NULL,
    direccion TEXT,
    telefono TEXT,
    email TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS facturas (
    id TEXT PRIMARY KEY,
    folio TEXT UNIQUE NOT NULL,
    cliente_id TEXT NOT NULL,
    fecha DATETIME NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    iva DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    metodo_pago TEXT NOT NULL,
    estado TEXT DEFAULT 'activa',
    FOREIGN KEY (cliente_id) REFERENCES clientes (id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS factura_vehiculos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    factura_id TEXT NOT NULL,
    vin TEXT NOT NULL,
    marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    anio INTEGER NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    qr_code TEXT,
    FOREIGN KEY (factura_id) REFERENCES facturas (id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS factura_conceptos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    factura_id TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    importe DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (factura_id) REFERENCES facturas (id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS repuve (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vin TEXT UNIQUE NOT NULL,
    niv TEXT,
    marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    anio INTEGER NOT NULL,
    color TEXT,
    tipo TEXT,
    combustible TEXT,
    origen TEXT,
    estado TEXT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  console.log('Insertando datos de ejemplo...');

  const clienteEjemplo = uuidv4();
  db.run(
    'INSERT OR REPLACE INTO clientes (id, nombre, rfc, direccion, telefono, email) VALUES (?, ?, ?, ?, ?, ?)',
    [clienteEjemplo, 'AUTOMOTRIZ EJEMPLO SA DE CV', 'AEJ850101XXX', 'Av. Principal 123, Ciudad, Estado', '555-1234567', 'ventas@automotrizejemplo.com']
  );

  const vehiculosEjemplo = [
    {
      vin: '1HGBH41JXMN109186',
      niv: 'MN109186',
      marca: 'HONDA',
      modelo: 'CIVIC',
      anio: 2021,
      color: 'BLANCO',
      tipo: 'SEDAN',
      combustible: 'GASOLINA',
      origen: 'NACIONAL',
      estado: 'NUEVO'
    },
    {
      vin: '3VWD17AJ1FM012345',
      niv: 'FM012345',
      marca: 'VOLKSWAGEN',
      modelo: 'JETTA',
      anio: 2022,
      color: 'GRIS',
      tipo: 'SEDAN',
      combustible: 'GASOLINA',
      origen: 'IMPORTADO',
      estado: 'NUEVO'
    },
    {
      vin: '1N4AL3AP8JC123456',
      niv: 'JC123456',
      marca: 'NISSAN',
      modelo: 'ALTIMA',
      anio: 2023,
      color: 'NEGRO',
      tipo: 'SEDAN',
      combustible: 'GASOLINA',
      origen: 'NACIONAL',
      estado: 'NUEVO'
    }
  ];

  vehiculosEjemplo.forEach((vehiculo) => {
    db.run(
      'INSERT OR REPLACE INTO repuve (vin, niv, marca, modelo, anio, color, tipo, combustible, origen, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [vehiculo.vin, vehiculo.niv, vehiculo.marca, vehiculo.modelo, vehiculo.anio, vehiculo.color, vehiculo.tipo, vehiculo.combustible, vehiculo.origen, vehiculo.estado]
    );
  });
});

db.close((err) => {
  if (err) {
    console.error('Error cerrando base de datos:', err.message);
  } else {
    console.log('Base de datos inicializada correctamente');
  }
});