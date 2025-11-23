import React, { useState, useEffect } from 'react';
import { FileText, Users, Car, TrendingUp } from 'lucide-react';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    facturas: 0,
    clientes: 0,
    vehiculos: 0,
    ingresos: 0
  });

  useEffect(() => {
    // Aquí cargarías las estadísticas reales
    setStats({
      facturas: 12,
      clientes: 8,
      vehiculos: 15,
      ingresos: 2450000
    });
  }, []);

  const statCards = [
    {
      name: 'Facturas Generadas',
      value: stats.facturas,
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      name: 'Clientes Activos',
      value: stats.clientes,
      icon: Users,
      color: 'bg-green-500'
    },
    {
      name: 'Vehículos Registrados',
      value: stats.vehiculos,
      icon: Car,
      color: 'bg-purple-500'
    },
    {
      name: 'Ingresos Totales',
      value: `$${stats.ingresos.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Resumen general de tu agencia automotriz
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Actividad Reciente
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Nueva factura generada
                </p>
                <p className="text-xs text-gray-500">Hace 2 horas</p>
              </div>
              <span className="text-green-600 text-sm">$125,000</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Cliente registrado
                </p>
                <p className="text-xs text-gray-500">Hace 4 horas</p>
              </div>
              <span className="text-blue-600 text-sm">Nuevo</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Vehículo añadido a REPUVE
                </p>
                <p className="text-xs text-gray-500">Hace 1 día</p>
              </div>
              <span className="text-purple-600 text-sm">Honda Civic</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Accesos Rápidos
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="btn-primary text-center">
              Nueva Factura
            </button>
            <button className="btn-secondary text-center">
              Registrar Cliente
            </button>
            <button className="btn-secondary text-center">
              Consultar REPUVE
            </button>
            <button className="btn-secondary text-center">
              Ver Reportes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;