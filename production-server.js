const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PROD_SERVER_PORT || 8080;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for React apps
  crossOriginEmbedderPolicy: false
}));

// Compression middleware
app.use(compression());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    services: {
      backend: process.env.SERVE_BACKEND === 'true',
      frontend: process.env.SERVE_FRONTEND === 'true',
      landing: process.env.SERVE_LANDING === 'true'
    }
  });
});

// API Backend - backend already has /api routes, so mount at root
if (process.env.SERVE_BACKEND === 'true') {
  const backendApp = require('./backend/server');
  app.use(backendApp);
  console.log('✓ Backend API integrated (routes at /api/*)');
}

// Serve Landing Page
if (process.env.SERVE_LANDING === 'true') {
  const landingPath = path.join(__dirname, 'landing', 'build');
  app.use('/landing', express.static(landingPath));
  app.get('/landing/*', (req, res) => {
    res.sendFile(path.join(landingPath, 'index.html'));
  });
  console.log('✓ Landing page served at /landing');
}

// Serve Frontend App (main application)
if (process.env.SERVE_FRONTEND === 'true') {
  const frontendPath = path.join(__dirname, 'frontend', 'build');
  app.use(express.static(frontendPath));
  
  // Catch-all route for React Router (must be last)
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
  console.log('✓ Frontend app served at /');
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n🚀 AutoFacturas Production Server');
  console.log('================================');
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log('\nAvailable endpoints:');
  console.log(`  - Health Check: http://localhost:${PORT}/health`);
  if (process.env.SERVE_BACKEND === 'true') {
    console.log(`  - API Backend:  http://localhost:${PORT}/api`);
  }
  if (process.env.SERVE_LANDING === 'true') {
    console.log(`  - Landing Page: http://localhost:${PORT}/landing`);
  }
  if (process.env.SERVE_FRONTEND === 'true') {
    console.log(`  - Main App:     http://localhost:${PORT}/`);
  }
  console.log('\n================================\n');
});

module.exports = app;
