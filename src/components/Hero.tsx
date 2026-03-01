
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "l'innovation technologique",
    "la recherche scientifique",
    "le développement durable",
    "l'entrepreneuriat innovant"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="text-gradient">Bloc Des</span>
            <br />
            <span className="text-gray-800">Innovateurs</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-600 mb-8 h-16 flex items-center justify-center animate-slide-in-left" style={{ animationDelay: '0.5s' }}>
            <span>Promouvoir </span>
            <span className="text-gradient font-semibold ml-2 min-w-[300px] text-left">
              {texts[currentText]}
            </span>
            <span className="animate-blink">|</span>
          </div>

          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto animate-slide-in-right" style={{ animationDelay: '1s' }}>
            Faciliter la recherche scientifique avancée en créant un cadre d'échange visant à produire et à valoriser les travaux de recherches, tout en promouvant le développement de compétences et l'innovation au service du progrès économique et social du Togo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
            <Button 
              onClick={() => scrollToSection('projets')}
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Découvrir nos projets
            </Button>
            <Button 
              onClick={() => scrollToSection('mission')}
              variant="outline" 
              size="lg" 
              className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Notre mission
            </Button>
          </div>

          {/* Floating cards */}
          <div className="absolute top-20 right-10 glass-effect rounded-2xl p-4 max-w-xs animate-float hidden lg:block">
            <div className="text-2xl font-bold text-blue-600">Des</div>
            <div className="text-sm text-gray-600">Projets accompagnés</div>
          </div>

          <div className="absolute bottom-20 left-10 glass-effect rounded-2xl p-4 max-w-xs animate-float hidden lg:block" style={{ animationDelay: '3s' }}>
            <div className="text-2xl font-bold text-purple-600">Plusiers </div>
            <div className="text-sm text-gray-600">Partenaires</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
