
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-xl font-bold text-gradient">BDI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('accueil')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Accueil
            </button>
            <button 
              onClick={() => scrollToSection('mission')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Mission
            </button>
            <button 
              onClick={() => scrollToSection('projets')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Projets
            </button>
            <button 
              onClick={() => scrollToSection('equipe')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Équipe
            </button>
            <button 
              onClick={() => scrollToSection('publications')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Publications
            </button>
            <Button 
              onClick={() => scrollToSection('don')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-full"
            >
              Faire un Don
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            <div className="w-6 h-6 flex flex-col justify-around">
              <span className={`block h-0.5 w-6 bg-gray-600 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-600 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-600 transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full glass-effect border-t border-white/20">
            <nav className="flex flex-col space-y-4 p-4">
              <button onClick={() => scrollToSection('accueil')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">Accueil</button>
              <button onClick={() => scrollToSection('mission')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">Mission</button>
              <button onClick={() => scrollToSection('projets')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">Projets</button>
              <button onClick={() => scrollToSection('equipe')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">Équipe</button>
              <button onClick={() => scrollToSection('publications')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">Publications</button>
              <Button onClick={() => scrollToSection('don')} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full">Faire un Don</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
