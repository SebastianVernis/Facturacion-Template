import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Facturas from './pages/Facturas';
import NuevaFactura from './pages/NuevaFactura';
import Repuve from './pages/Repuve';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/facturas" element={<Facturas />} />
          <Route path="/facturas/nueva" element={<NuevaFactura />} />
          <Route path="/repuve" element={<Repuve />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;