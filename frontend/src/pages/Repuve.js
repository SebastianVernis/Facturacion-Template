import React, { useState } from 'react';
import { Search, Database, Car, CheckCircle, XCircle } from 'lucide-react';
import QRCode from 'react-qr-code';
import api from '../services/api';

const Repuve = () => {
  const [vin, setVin] = useState('');
  const [vehiculo, setVehiculo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const buscarVehiculo = async (e) => {
    e.preventDefault();
    
    if (!vin.trim()) {
      setError('Por favor ingresa un VIN');
      return;
    }

    setLoading(true);
    setError('');
    setVehiculo(null);

    try {
      const response = await api.get(`/vehiculos/repive/${vin}`);
      setVehiculo(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setError('Vehículo no encontrado en REPUVE');
      } else {
        setError('Error al consultar REPUVE');
      }
    }
    
    setLoading(false);
  };

  const generarQR = () => {
    return `http://localhost:3001/api/repuve/${vin}`;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Consulta REPUVE</h1>
        <p className="mt-2 text-gray-600">
          Consulta información vehicular en el Registro Público Vehicular
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="card mb-6">
          <form onSubmit={buscarVehiculo}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                VIN (Número de Identificación Vehicular)
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  placeholder="Ingresa el VIN del vehículo"
                  className="flex-1 input-field"
                  maxLength={17}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-4 btn-primary flex items-center"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {loading ? 'Buscando...' : 'Consultar'}
                </button>
              </div>
              {vin && (
                <p className="text-xs text-gray-500 mt-1">
                  Caracteres: {vin.length}/17
                </p>
              )}
            </div>
          </form>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}
        </div>

        {vehiculo && (
          <div className="card">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Vehículo Encontrado
                </h3>
                <div className="p-2 bg-white border border-gray-200 rounded-lg">
                  <QRCode value={generarQR()} size={80} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    VIN
                  </label>
                  <p className="text-lg font-mono text-gray-900">
                    {vehiculo.vin}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Marca
                  </label>
                  <p className="text-lg text-gray-900">{vehiculo.marca}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Modelo
                  </label>
                  <p className="text-lg text-gray-900">{vehiculo.modelo}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Año
                  </label>
                  <p className="text-lg text-gray-900">{vehiculo.anio}</p>
                </div>
              </div>

              <div className="space-y-4">
                {vehiculo.niv && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      NIV
                    </label>
                    <p className="text-lg text-gray-900">{vehiculo.niv}</p>
                  </div>
                )}

                {vehiculo.color && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Color
                    </label>
                    <p className="text-lg text-gray-900">{vehiculo.color}</p>
                  </div>
                )}

                {vehiculo.tipo && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Tipo
                    </label>
                    <p className="text-lg text-gray-900">{vehiculo.tipo}</p>
                  </div>
                )}

                {vehiculo.combustible && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Combustible
                    </label>
                    <p className="text-lg text-gray-900">{vehiculo.combustible}</p>
                  </div>
                )}

                {vehiculo.origen && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Origen
                    </label>
                    <p className="text-lg text-gray-900">{vehiculo.origen}</p>
                  </div>
                )}

                {vehiculo.estado && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Estado
                    </label>
                    <span className="inline-flex px-2 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                      {vehiculo.estado}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    URL del código QR:
                  </p>
                  <p className="text-sm text-blue-600 break-all">
                    {generarQR()}
                  </p>
                </div>
                <button
                  onClick={() => window.open(generarQR(), '_blank')}
                  className="btn-primary flex items-center"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Ver Página REPUVE
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Información adicional */}
        <div className="mt-8 card bg-blue-50 border-blue-200">
          <div className="flex items-start">
            <Database className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Sobre REPUVE
              </h4>
              <p className="text-sm text-blue-700">
                El Registro Público Vehicular (REPUVE) es una base de datos que contiene 
                información de todos los vehículos registrados en México. Los códigos QR 
                generados en las facturas redirigen a una página local con los datos 
                completos del vehículo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repuve;