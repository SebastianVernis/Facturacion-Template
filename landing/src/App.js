import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import CustomIntegration from './components/CustomIntegration';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero />
      <Features />
      <Pricing />
      <CustomIntegration />
      <Footer />
    </div>
  );
}

export default App;
