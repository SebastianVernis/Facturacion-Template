import React, { useState, useEffect } from 'react';
import { Plus, X, QrCode, Search } from 'lucide-react';
import QRCode from 'react-qr-code';
import api from '../services/api';

const NuevaFactura = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [vehiculos, setVehiculos] = useState([]);
  const [conceptos, setConceptos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    vin: '',
    marca: '',
    modelo: '',
    anio: '',
    precio: ''
  });

  const [nuevoConcepto, setNuevoConcepto] = useState({
    descripcion: '',
    cantidad: 1,
    precioUnitario: ''
  });

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const response = await api.get('/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error cargando clientes:', error);
    }
  };

  const buscarVehiculoRepive = async (vin) => {
    if (!vin) return;
    
    setLoading(true);
    try {
      const response = await api.get(`/vehiculos/repive/${vin}`);
      setNuevoVehiculo(prev => ({
        ...prev,
        marca: response.data.marca,
        modelo: response.data.modelo,
        anio: response.data.anio
      }));
    } catch (error) {
      alert('VIN no encontrado en REPUVE');
    }
    setLoading(false);
  };

  const agregarVehiculo = () => {
    if (!nuevoVehiculo.vin || !nuevoVehiculo.precio) {
      alert('Por favor completa todos los campos del vehículo');
      return;
    }

    const vehiculo = {
      ...nuevoVehiculo,
      id: Date.now(),
      qrUrl: `http://localhost:3001/api/repuve/${nuevoVehiculo.vin}`
    };

    setVehiculos([...vehiculos, vehiculo]);
    setNuevoVehiculo({
      vin: '',
      marca: '',
      modelo: '',
      anio: '',
      precio: ''
    });
  };

  const agregarConcepto = () => {
    if (!nuevoConcepto.descripcion || !nuevoConcepto.precioUnitario) {
      alert('Por favor completa todos los campos del concepto');
      return;
    }

    const concepto = {
      ...nuevoConcepto,
      id: Date.now(),
      importe: nuevoConcepto.cantidad * parseFloat(nuevoConcepto.precioUnitario)
    };

    setConceptos([...conceptos, concepto]);
    setNuevoConcepto({
      descripcion: '',
      cantidad: 1,
      precioUnitario: ''
    });
  };

  const eliminarVehiculo = (id) => {
    setVehiculos(vehiculos.filter(v => v.id !== id));
  };

  const eliminarConcepto = (id) => {
    setConceptos(conceptos.filter(c => c.id !== id));
  };

  const calcularTotales = () => {
    const subtotalVehiculos = vehiculos.reduce((sum, v) => sum + parseFloat(v.precio || 0), 0);
    const subtotalConceptos = conceptos.reduce((sum, c) => sum + c.importe, 0);
    const subtotal = subtotalVehiculos + subtotalConceptos;
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    return { subtotal, iva, total };
  };

  const generarFactura = async () => {
    if (!clienteSeleccionado || (vehiculos.length === 0 && conceptos.length === 0)) {
      alert('Por favor selecciona un cliente y agrega al menos un vehículo o concepto');
      return;
    }

    const totales = calcularTotales();
    
    const factura = {
      clienteId: clienteSeleccionado,
      vehiculos,
      conceptos,
      ...totales,
      metodoPago: 'Transferencia'
    };

    setLoading(true);
    try {
      const response = await api.post('/facturas', factura);
      alert(`Factura generada exitosamente: ${response.data.folio}`);
      
      // Resetear formulario
      setClienteSeleccionado('');
      setVehiculos([]);
      setConceptos([]);
    } catch (error) {
      console.error('Error generando factura:', error);
      alert('Error al generar la factura');
    }
    setLoading(false);
  };

  const { subtotal, iva, total } = calcularTotales();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nueva Factura</h1>
        <p className="mt-2 text-gray-600">
          Genera una nueva factura con códigos QR para REPUVE
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Selección de Cliente */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Cliente
            </h3>
            <select
              value={clienteSeleccionado}
              onChange={(e) => setClienteSeleccionado(e.target.value)}
              className="input-field"
            >
              <option value="">Seleccionar cliente...</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre} - {cliente.rfc}
                </option>
              ))}
            </select>
          </div>

          {/* Vehículos */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Vehículos
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div className="lg:col-span-2">
                <input
                  type="text"
                  placeholder="VIN"
                  value={nuevoVehiculo.vin}
                  onChange={(e) => setNuevoVehiculo({...nuevoVehiculo, vin: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Marca"
                  value={nuevoVehiculo.marca}
                  onChange={(e) => setNuevoVehiculo({...nuevoVehiculo, marca: e.target.value})}
                  className="input-field"
                  readOnly
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Modelo"
                  value={nuevoVehiculo.modelo}
                  onChange={(e) => setNuevoVehiculo({...nuevoVehiculo, modelo: e.target.value})}
                  className="input-field"
                  readOnly
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Año"
                  value={nuevoVehiculo.anio}
                  onChange={(e) => setNuevoVehiculo({...nuevoVehiculo, anio: e.target.value})}
                  className="input-field"
                  readOnly
                />
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <input
                type="number"
                placeholder="Precio"
                value={nuevoVehiculo.precio}
                onChange={(e) => setNuevoVehiculo({...nuevoVehiculo, precio: e.target.value})}
                className="input-field"
              />
              <button
                onClick={() => buscarVehiculoRepive(nuevoVehiculo.vin)}
                disabled={loading}
                className="btn-secondary flex items-center"
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar REPUVE
              </button>
              <button
                onClick={agregarVehiculo}
                className="btn-primary flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar
              </button>
            </div>

            {vehiculos.length > 0 && (
              <div className="space-y-2">
                {vehiculos.map((vehiculo) => (
                  <div key={vehiculo.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">
                        {vehiculo.marca} {vehiculo.modelo} {vehiculo.anio}
                      </p>
                      <p className="text-sm text-gray-600">VIN: {vehiculo.vin}</p>
                      <p className="text-sm text-green-600">${parseFloat(vehiculo.precio).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <QRCode value={vehiculo.qrUrl} size={40} />
                      <button
                        onClick={() => eliminarVehiculo(vehiculo.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Conceptos Adicionales */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Conceptos Adicionales
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Descripción"
                  value={nuevoConcepto.descripcion}
                  onChange={(e) => setNuevoConcepto({...nuevoConcepto, descripcion: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={nuevoConcepto.cantidad}
                  onChange={(e) => setNuevoConcepto({...nuevoConcepto, cantidad: parseInt(e.target.value) || 1})}
                  className="input-field"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Precio unitario"
                  value={nuevoConcepto.precioUnitario}
                  onChange={(e) => setNuevoConcepto({...nuevoConcepto, precioUnitario: e.target.value})}
                  className="input-field"
                />
              </div>
            </div>

            <button
              onClick={agregarConcepto}
              className="btn-primary flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Concepto
            </button>

            {conceptos.length > 0 && (
              <div className="mt-4 space-y-2">
                {conceptos.map((concepto) => (
                  <div key={concepto.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{concepto.descripcion}</p>
                      <p className="text-sm text-gray-600">
                        {concepto.cantidad} x ${parseFloat(concepto.precioUnitario).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-green-600">
                        ${concepto.importe.toLocaleString()}
                      </span>
                      <button
                        onClick={() => eliminarConcepto(concepto.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Resumen */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resumen de Factura
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>IVA (16%):</span>
              <span>${iva.toLocaleString()}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-600">
              Vehículos: {vehiculos.length}
            </p>
            <p className="text-sm text-gray-600">
              Conceptos: {conceptos.length}
            </p>
            {vehiculos.length > 0 && (
              <p className="text-sm text-blue-600 flex items-center">
                <QrCode className="h-4 w-4 mr-1" />
                QR codes incluidos
              </p>
            )}
          </div>

          <button
            onClick={generarFactura}
            disabled={loading || !clienteSeleccionado || (vehiculos.length === 0 && conceptos.length === 0)}
            className="w-full mt-6 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generando...' : 'Generar Factura'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NuevaFactura;