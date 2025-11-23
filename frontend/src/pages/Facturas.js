import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, Search } from 'lucide-react';

const Facturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    // Datos de ejemplo - en producción vendría de la API
    setFacturas([
      {
        id: '1',
        folio: 'FAC-2024001',
        cliente: 'AUTOMOTRIZ EJEMPLO SA DE CV',
        fecha: '2024-01-15',
        total: 125000,
        estado: 'Pagada'
      },
      {
        id: '2',
        folio: 'FAC-2024002',
        cliente: 'DISTRIBUIDORA NORTE SA',
        fecha: '2024-01-16',
        total: 89000,
        estado: 'Pendiente'
      }
    ]);
  }, []);

  const facturasFiltradas = facturas.filter(factura =>
    factura.folio.toLowerCase().includes(filtro.toLowerCase()) ||
    factura.cliente.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Facturas</h1>
        <p className="mt-2 text-gray-600">
          Historial de facturas generadas
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar por folio o cliente..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="pl-10 input-field"
          />
        </div>
      </div>

      <div className="card">
        {facturasFiltradas.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay facturas
            </h3>
            <p className="text-gray-500">
              {filtro ? 'No se encontraron facturas con ese criterio' : 'Aún no has generado ninguna factura'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Folio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {facturasFiltradas.map((factura) => (
                  <tr key={factura.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {factura.folio}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {factura.cliente}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(factura.fecha).toLocaleDateString('es-MX')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${factura.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        factura.estado === 'Pagada'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {factura.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Download className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Facturas;