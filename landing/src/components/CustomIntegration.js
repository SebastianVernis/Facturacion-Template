import React, { useState } from 'react';
import axios from 'axios';

const CustomIntegration = () => {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    infrastructureType: '',
    currentSystem: '',
    vehiclesPerMonth: '',
    users: '',
    requirements: '',
    timeline: ''
  });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const infrastructureOptions = [
    {
      id: 'on-premise',
      title: 'On-Premise',
      icon: '🏢',
      description: 'Instalación en tu propia infraestructura',
      features: [
        'Control total de datos',
        'Máxima seguridad',
        'Sin dependencia de internet',
        'Personalización completa',
        'Cumplimiento normativo'
      ]
    },
    {
      id: 'private-cloud',
      title: 'Nube Privada',
      icon: '☁️',
      description: 'Infraestructura dedicada en la nube',
      features: [
        'Escalabilidad automática',
        'Alta disponibilidad',
        'Backups automáticos',
        'Acceso desde cualquier lugar',
        'Actualizaciones gestionadas'
      ]
    },
    {
      id: 'hybrid',
      title: 'Híbrido',
      icon: '🔄',
      description: 'Combinación de on-premise y nube',
      features: [
        'Flexibilidad máxima',
        'Datos críticos locales',
        'Servicios en la nube',
        'Mejor de ambos mundos',
        'Migración gradual'
      ]
    }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: 'loading', message: 'Enviando solicitud...' });

    try {
      const response = await axios.post('/api/integration-requests', formData);

      setSubmitStatus({
        type: 'success',
        message: '¡Solicitud enviada exitosamente! Nuestro equipo te contactará en las próximas 24 horas.'
      });

      setTimeout(() => {
        setFormData({
          company: '',
          name: '',
          email: '',
          phone: '',
          infrastructureType: '',
          currentSystem: '',
          vehiclesPerMonth: '',
          users: '',
          requirements: '',
          timeline: ''
        });
        setSubmitStatus({ type: '', message: '' });
      }, 5000);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Error al enviar la solicitud. Por favor intenta de nuevo o contáctanos directamente.'
      });
    }
  };

  return (
    <section id="custom-integration" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Integración <span className="text-gradient">Personalizada</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Necesitas una solución a medida? Implementamos AutoFacturas en tu infraestructura 
            con las especificaciones exactas que requieres
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-primary-600 to-primary-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Infrastructure Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {infrastructureOptions.map((option) => (
            <div
              key={option.id}
              className={`card cursor-pointer transition-all ${
                formData.infrastructureType === option.id
                  ? 'border-2 border-primary-600 shadow-2xl'
                  : 'hover:border-primary-300 border-2 border-transparent'
              }`}
              onClick={() => setFormData({ ...formData, infrastructureType: option.id })}
            >
              <div className="text-5xl mb-4">{option.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <ul className="space-y-2">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Integration Benefits */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 mb-16 text-white">
          <h3 className="text-3xl font-bold mb-6 text-center">¿Por qué elegir integración personalizada?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="font-semibold mb-2">A tu medida</h4>
              <p className="text-sm text-primary-100">Adaptamos el sistema a tus procesos específicos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔧</div>
              <h4 className="font-semibold mb-2">Soporte dedicado</h4>
              <p className="text-sm text-primary-100">Equipo técnico exclusivo para tu implementación</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📈</div>
              <h4 className="font-semibold mb-2">Escalable</h4>
              <p className="text-sm text-primary-100">Crece con tu negocio sin limitaciones</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🛡️</div>
              <h4 className="font-semibold mb-2">Seguridad</h4>
              <p className="text-sm text-primary-100">Cumplimiento de tus políticas de seguridad</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              Solicita una Consulta Gratuita
            </h3>
            <p className="text-gray-600 mb-8 text-center">
              Cuéntanos sobre tu proyecto y te ayudaremos a encontrar la mejor solución
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre de la Empresa *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tu Agencia Automotriz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tu Nombre *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="juan@agencia.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+52 55 1234 5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Infraestructura *
                  </label>
                  <select
                    name="infrastructureType"
                    required
                    value={formData.infrastructureType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="on-premise">On-Premise</option>
                    <option value="private-cloud">Nube Privada</option>
                    <option value="hybrid">Híbrido</option>
                    <option value="not-sure">No estoy seguro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sistema Actual
                  </label>
                  <input
                    type="text"
                    name="currentSystem"
                    value={formData.currentSystem}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="¿Qué sistema usas actualmente?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vehículos por Mes
                  </label>
                  <select
                    name="vehiclesPerMonth"
                    value={formData.vehiclesPerMonth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Selecciona un rango</option>
                    <option value="1-50">1-50</option>
                    <option value="51-100">51-100</option>
                    <option value="101-500">101-500</option>
                    <option value="500+">Más de 500</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Número de Usuarios
                  </label>
                  <select
                    name="users"
                    value={formData.users}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Selecciona un rango</option>
                    <option value="1-5">1-5</option>
                    <option value="6-10">6-10</option>
                    <option value="11-25">11-25</option>
                    <option value="26-50">26-50</option>
                    <option value="50+">Más de 50</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Requerimientos Específicos *
                </label>
                <textarea
                  name="requirements"
                  required
                  rows="4"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Describe tus necesidades, integraciones requeridas, características especiales, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Timeline de Implementación
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Selecciona un plazo</option>
                  <option value="urgent">Urgente (menos de 1 mes)</option>
                  <option value="1-3-months">1-3 meses</option>
                  <option value="3-6-months">3-6 meses</option>
                  <option value="6+-months">Más de 6 meses</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              {submitStatus.message && (
                <div
                  className={`p-4 rounded-lg ${
                    submitStatus.type === 'success'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : submitStatus.type === 'error'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={submitStatus.type === 'loading'}
                className="w-full btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitStatus.type === 'loading' ? 'Enviando...' : 'Solicitar Consulta Gratuita'}
              </button>

              <p className="text-sm text-gray-500 text-center">
                Al enviar este formulario, aceptas que nos pongamos en contacto contigo para discutir tu proyecto.
              </p>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="font-bold text-gray-900 mb-2">Respuesta Rápida</h4>
            <p className="text-gray-600 text-sm">Te contactamos en menos de 24 horas</p>
          </div>
          <div>
            <div className="text-4xl mb-3">💼</div>
            <h4 className="font-bold text-gray-900 mb-2">Consulta Sin Costo</h4>
            <p className="text-gray-600 text-sm">Análisis inicial completamente gratuito</p>
          </div>
          <div>
            <div className="text-4xl mb-3">🤝</div>
            <h4 className="font-bold text-gray-900 mb-2">Compromiso Total</h4>
            <p className="text-gray-600 text-sm">Acompañamiento en cada etapa del proyecto</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomIntegration;
