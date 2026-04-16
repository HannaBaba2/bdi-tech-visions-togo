import React, { useState, useEffect, useRef } from 'react';
import { Heart, ExternalLink, ChevronDown, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPartnersDropdownOpen, setIsPartnersDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown Partenaires au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPartnersDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Gérer l'effet de scroll pour le header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Fermer tous les menus
  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsPartnersDropdownOpen(false);
  };

  // ✅ SCROLL ROBUSTE : window.location.hash + scrollIntoView
  const scrollToSection = (sectionId: string) => {
    closeAllMenus();
    setTimeout(() => {
      window.location.hash = `#${sectionId}`;
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const MEMBERSHIP_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdsUTgK9bT4g909ADR6bzlTCYGLp05cpHARmCQXabb55vAewQ/viewform";

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'mission', label: 'Mission' },
    { id: 'projets', label: 'Projets' },
    { id: 'equipe', label: 'Équipe' },
    { id: 'publications', label: 'Publications' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* ✅ Logo */}
          <button 
            onClick={() => scrollToSection('accueil')}
            className="flex items-center space-x-3 group flex-shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-xl sm:text-2xl">B</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">BDI</span>
              <span className="text-xs text-gray-500 -mt-0.5 hidden sm:block">Bloc Des Innovateurs</span>
            </div>
          </button>

          {/* ✅ Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-lg hover:bg-blue-50/50"
              >
                {item.label}
              </button>
            ))}
            
            {/* ✅ Partenaires Dropdown - Desktop */}
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={() => setIsPartnersDropdownOpen(true)}
              onMouseLeave={() => setIsPartnersDropdownOpen(false)}
            >
              <button className="group inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-lg hover:bg-blue-50/50">
                <span>Partenaires</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isPartnersDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isPartnersDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="py-2">
                    <button 
                      onClick={() => scrollToSection('partenaires')}
                      className="block w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all text-left"
                    >
                      Voir les partenaires
                    </button>
                    <a 
                      href={MEMBERSHIP_FORM_URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={closeAllMenus}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all border-t border-gray-100"
                    >
                      <span className="text-emerald-700 font-medium">Devenir partenaire</span>
                      <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            {/* ✅ Bouton Faire un Don - Desktop */}
            <button
              onClick={() => scrollToSection('don')}
              className="ml-2 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Heart className="w-4 h-4" />
              <span>Faire un Don</span>
            </button>
          </nav>

          {/* ✅ Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className="block h-0.5 w-full bg-gray-700 rounded-full"></span>
                <span className="block h-0.5 w-full bg-gray-700 rounded-full"></span>
                <span className="block h-0.5 w-full bg-gray-700 rounded-full"></span>
              </div>
            )}
          </button>
        </div>

        {/* ✅ Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl z-40">
            <nav className="flex flex-col p-4 space-y-1 max-h-[70vh] overflow-y-auto">
              
              {/* ✅ Liens de navigation */}
              {navItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full px-4 py-3.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all rounded-xl font-medium text-left"
                >
                  {item.label}
                </button>
              ))}
              
              {/* ✅ Partenaires - Mobile */}
              <div className="pt-2">
                <button 
                  onClick={() => setIsPartnersDropdownOpen(!isPartnersDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all rounded-xl font-medium text-left"
                >
                  <span>Partenaires</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isPartnersDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isPartnersDropdownOpen && (
                  <div className="pl-4 pr-4 pb-2 space-y-1 mt-1">

                    {/*
                      ✅ FIX MOBILE "Voir les partenaires" :
                      On scrolle D'ABORD, puis on ferme les menus après.
                      Si on ferme avant, React re-rend et annule le scroll
                      avant qu'il ait eu le temps de s'exécuter sur mobile.
                    */}
                    <button
                      onClick={() => {
                        const el = document.getElementById('partenaires');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                        setTimeout(closeAllMenus, 50);
                      }}
                      className="block w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all rounded-lg text-left"
                    >
                      Voir les partenaires
                    </button>
                    
                    {/*
                      ✅ FIX MOBILE "Devenir partenaire" :
                      Vrai <a> avec target="_blank" — le navigateur mobile
                      gère l'ouverture directement depuis l'événement utilisateur.
                      window.open() dans un setTimeout est bloqué sur iOS/Android
                      car considéré hors événement utilisateur direct.
                    */}
                    <a 
                      href={MEMBERSHIP_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeAllMenus}
                      className="flex items-center justify-between w-full px-4 py-3 text-sm text-emerald-700 hover:bg-emerald-50 transition-all rounded-lg"
                    >
                      <span>Devenir partenaire</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                )}
              </div>
              
              {/* ✅ Faire un Don - Mobile */}
              <button 
                onClick={() => scrollToSection('don')}
                className="flex items-center justify-center gap-2 w-full px-4 py-3.5 mt-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-md"
              >
                <Heart className="w-4 h-4" />
                Faire un Don
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;