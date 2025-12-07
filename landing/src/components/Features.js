import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '🚗',
      title: 'Gestión de Vehículos',
      description: 'Administra tu inventario de vehículos con información completa y actualizada del REPUVE.',
      benefits: ['Base de datos integrada', 'Búsqueda por VIN', 'Historial completo']
    },
    {
      icon: '📋',
      title: 'Facturación Inteligente',
      description: 'Crea facturas profesionales en segundos con todos los datos fiscales requeridos.',
      benefits: ['Plantillas personalizables', 'Cálculo automático de IVA', 'Múltiples métodos de pago']
    },
    {
      icon: '📱',
      title: 'Códigos QR Dinámicos',
      description: 'Cada factura incluye códigos QR que enlazan directamente con los datos REPUVE del vehículo.',
      benefits: ['Verificación instantánea', 'Acceso móvil', 'Trazabilidad completa']
    },
    {
      icon: '👥',
      title: 'Gestión de Clientes',
      description: 'Mantén un registro completo de tus clientes con toda su información fiscal.',
      benefits: ['Perfiles detallados', 'Historial de compras', 'Datos fiscales seguros']
    },
    {
      icon: '📊',
      title: 'Reportes y Análisis',
      description: 'Obtén insights valiosos sobre tus ventas y operaciones con reportes detallados.',
      benefits: ['Dashboard en tiempo real', 'Exportación a Excel', 'Gráficas interactivas']
    },
    {
      icon: '🔐',
      title: 'Seguridad Garantizada',
      description: 'Tus datos y los de tus clientes están protegidos con los más altos estándares de seguridad.',
      benefits: ['Encriptación de datos', 'Backups automáticos', 'Cumplimiento normativo']
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Características <span className="text-gradient">Principales</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Todo lo que necesitas para gestionar tu agencia automotriz de manera eficiente y profesional
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-primary-600 to-primary-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card hover:scale-105 border-t-4 border-primary-500"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Integration Info */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Integración con REPUVE</h3>
          <p className="text-xl text-primary-100 mb-6 max-w-3xl mx-auto">
            Conecta directamente con el Registro Público Vehicular para validar y verificar 
            la información de cada vehículo en tiempo real.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">✓ Datos oficiales</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">✓ Actualización automática</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">✓ Verificación instantánea</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">✓ Cumplimiento legal</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
