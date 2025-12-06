import React from 'react';

const Hero = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            🚗 <span className="text-gradient-white">AutoFacturas</span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary-400 to-primary-200 mx-auto rounded-full"></div>
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Sistema de Facturación Automotriz
          <br />
          <span className="text-primary-200">con Integración REPUVE</span>
        </h2>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-primary-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          Genera facturas profesionales con códigos QR que conectan directamente 
          con el Registro Público Vehicular. Simplifica tu proceso de facturación.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button 
            onClick={() => scrollToSection('pricing')}
            className="bg-white text-primary-700 font-bold py-4 px-10 rounded-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            Ver Planes
          </button>
          <button 
            onClick={() => scrollToSection('custom-integration')}
            className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-lg hover:bg-white hover:text-primary-700 transition-all duration-300 text-lg"
          >
            Integración Personalizada
          </button>
        </div>

        {/* Features highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-3">📄</div>
            <h3 className="text-white font-semibold text-lg mb-2">Facturas PDF</h3>
            <p className="text-primary-100 text-sm">Generación automática de facturas profesionales</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-white font-semibold text-lg mb-2">Códigos QR</h3>
            <p className="text-primary-100 text-sm">Acceso instantáneo a datos REPUVE</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="text-white font-semibold text-lg mb-2">100% Seguro</h3>
            <p className="text-primary-100 text-sm">Datos protegidos y encriptados</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Hero;
