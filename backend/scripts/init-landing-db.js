const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database.db');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Inicializando tablas para landing page...');

db.serialize(() => {
  // Tabla de suscripciones
  db.run(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id TEXT PRIMARY KEY,
      plan TEXT NOT NULL,
      company TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      message TEXT,
      billing_cycle TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error creando tabla subscriptions:', err.message);
    } else {
      console.log('✅ Tabla subscriptions creada');
    }
  });

  // Tabla de solicitudes de integración personalizada
  db.run(`
    CREATE TABLE IF NOT EXISTS integration_requests (
      id TEXT PRIMARY KEY,
      company TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      infrastructure_type TEXT NOT NULL,
      current_system TEXT,
      vehicles_per_month TEXT,
      users TEXT,
      requirements TEXT NOT NULL,
      timeline TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error creando tabla integration_requests:', err.message);
    } else {
      console.log('✅ Tabla integration_requests creada');
    }
  });

  // Tabla de solicitudes de demo
  db.run(`
    CREATE TABLE IF NOT EXISTS demo_requests (
      id TEXT PRIMARY KEY,
      company TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      company_size TEXT,
      message TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error creando tabla demo_requests:', err.message);
    } else {
      console.log('✅ Tabla demo_requests creada');
    }
  });
});

db.close((err) => {
  if (err) {
    console.error('❌ Error cerrando base de datos:', err.message);
  } else {
    console.log('✅ Base de datos actualizada exitosamente');
  }
});
