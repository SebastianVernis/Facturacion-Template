import React, { useState } from 'react';
import axios from 'axios';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [formData, setFormData] = useState({
    plan: '',
    company: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const plans = [
    {
      name: 'Prueba Gratuita',
      id: 'trial',
      price: { monthly: 0, annual: 0 },
      description: 'Perfecto para probar el sistema',
      features: [
        '10 facturas por mes',
        '1 usuario',
        'Gestión básica de clientes',
        'Códigos QR incluidos',
        'Soporte por email',
        '30 días de prueba'
      ],
      highlighted: false,
      cta: 'Comenzar Prueba'
    },
    {
      name: 'Básico',
      id: 'basic',
      price: { monthly: 499, annual: 4990 },
      description: 'Ideal para agencias pequeñas',
      features: [
        '100 facturas por mes',
        '3 usuarios',
        'Gestión completa de clientes',
        'Códigos QR ilimitados',
        'Integración REPUVE',
        'Soporte prioritario',
        'Reportes básicos',
        'Backup diario'
      ],
      highlighted: false,
      cta: 'Suscribirse'
    },
    {
      name: 'Profesional',
      id: 'professional',
      price: { monthly: 999, annual: 9990 },
      description: 'Para agencias en crecimiento',
      features: [
        'Facturas ilimitadas',
        '10 usuarios',
        'Gestión avanzada de clientes',
        'Códigos QR personalizados',
        'Integración REPUVE Premium',
        'Soporte 24/7',
        'Reportes avanzados',
        'API de integración',
        'Backup en tiempo real',
        'Personalización de marca'
      ],
      highlighted: true,
      cta: 'Más Popular'
    },
    {
      name: 'Enterprise',
      id: 'enterprise',
      price: { monthly: 'Personalizado', annual: 'Personalizado' },
      description: 'Solución completa para grandes agencias',
      features: [
        'Todo lo de Profesional',
        'Usuarios ilimitados',
        'Infraestructura dedicada',
        'Integración personalizada',
        'Soporte dedicado',
        'SLA garantizado',
        'Capacitación incluida',
        'Consultoría técnica',
        'Desarrollo a medida',
        'Múltiples sucursales'
      ],
      highlighted: false,
      cta: 'Contactar Ventas'
    }
  ];

  const handlePlanSelect = (plan) => {
    setFormData({ ...formData, plan: plan.name });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: 'loading', message: 'Enviando solicitud...' });

    try {
      const response = await axios.post('/api/subscriptions', {
        ...formData,
        billingCycle
      });

      setSubmitStatus({ 
        type: 'success', 
        message: '¡Solicitud enviada! Te contactaremos pronto.' 
      });
      
      setTimeout(() => {
        setShowModal(false);
        setFormData({ plan: '', company: '', name: '', email: '', phone: '', message: '' });
        setSubmitStatus({ type: '', message: '' });
      }, 3000);
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Error al enviar. Por favor intenta de nuevo.' 
      });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Planes y <span className="text-gradient">Precios</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Elige el plan que mejor se adapte a las necesidades de tu agencia
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                billingCycle === 'annual'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Anual
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Ahorra 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-2xl scale-105 border-4 border-primary-400'
                  : 'bg-white text-gray-900 shadow-lg hover:shadow-xl border border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                  ⭐ Recomendado
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlighted ? 'text-primary-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  {typeof plan.price[billingCycle] === 'number' ? (
                    <>
                      <span className="text-4xl font-bold">
                        ${plan.price[billingCycle].toLocaleString()}
                      </span>
                      <span className={`ml-2 ${plan.highlighted ? 'text-primary-200' : 'text-gray-600'}`}>
                        MXN/{billingCycle === 'monthly' ? 'mes' : 'año'}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold">{plan.price[billingCycle]}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${
                        plan.highlighted ? 'text-primary-200' : 'text-primary-600'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={`text-sm ${plan.highlighted ? 'text-primary-50' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanSelect(plan)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-white text-primary-700 hover:bg-primary-50'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            ¿Necesitas más información? <a href="#custom-integration" className="text-primary-600 font-semibold hover:underline">Contáctanos</a>
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <span className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Sin permanencia
            </span>
            <span className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Cancela cuando quieras
            </span>
            <span className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Soporte incluido
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Solicitar Plan: {formData.plan}
            </h3>
            <p className="text-gray-600 mb-6">
              Completa el formulario y nos pondremos en contacto contigo
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="company"
                placeholder="Nombre de la empresa *"
                required
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <input
                type="text"
                name="name"
                placeholder="Tu nombre *"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono *"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <textarea
                name="message"
                placeholder="Mensaje (opcional)"
                rows="3"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />

              {submitStatus.message && (
                <div
                  className={`p-4 rounded-lg ${
                    submitStatus.type === 'success'
                      ? 'bg-green-100 text-green-800'
                      : submitStatus.type === 'error'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={submitStatus.type === 'loading'}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitStatus.type === 'loading' ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
