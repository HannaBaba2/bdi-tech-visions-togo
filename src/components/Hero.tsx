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
    <section id="accueil" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Titre principal - Responsive */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in-up">
            <span className="text-gradient">Bloc Des</span>
            <br />
            <span className="text-gray-800">Innovateurs</span>
          </h1>
          
          {/* Texte animé rotatif - Responsive */}
          <div className="text-base sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 h-14 sm:h-16 flex items-center justify-center animate-slide-in-left" style={{ animationDelay: '0.5s' }}>
            <span>Promouvoir </span>
            <span className="text-gradient font-semibold ml-1 sm:ml-2 min-w-[200px] sm:min-w-[300px] text-left">
              {texts[currentText]}
            </span>
            <span className="animate-blink ml-1">|</span>
          </div>

          {/* Description - Responsive */}
          <p className="text-sm sm:text-lg text-gray-600 mb-8 sm:mb-12 px-2 sm:px-0 max-w-2xl mx-auto animate-slide-in-right" style={{ animationDelay: '1s' }}>
            Faciliter la recherche scientifique avancée en créant un cadre d'échange visant à produire et à valoriser les travaux de recherches, tout en promouvant le développement de compétences et l'innovation au service du progrès économique et social du Togo.
          </p>

          {/* Boutons d'action - Responsive */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
            <Button 
              onClick={() => scrollToSection('projets')}
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Découvrir nos projets
            </Button>
            <Button 
              onClick={() => scrollToSection('mission')}
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Notre mission
            </Button>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default Hero;