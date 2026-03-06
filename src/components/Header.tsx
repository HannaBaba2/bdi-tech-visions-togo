import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Target, 
  FolderKanban, 
  Users, 
  FileText, 
  Heart, 
  UserPlus, 
  ExternalLink 
} from 'lucide-react';

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

  const MEMBERSHIP_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdsUTgK9bT4g909ADR6bzlTCYGLp05cpHARmCQXabb55vAewQ/viewform";

  // Items de navigation avec icônes
  const navItems = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'mission', label: 'Mission', icon: Target },
    { id: 'projets', label: 'Projets', icon: FolderKanban },
    { id: 'equipe', label: 'Équipe', icon: Users },
    { id: 'publications', label: 'Publications', icon: FileText },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo BDI - Responsive */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg sm:text-xl">B</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-gradient whitespace-nowrap">BDI</span>
          </div>

          {/* Desktop Navigation - Visible sur lg+ */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="inline-flex items-center gap-1 px-2.5 py-2 xl:px-3 text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600 transition-all rounded-lg hover:bg-blue-50"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden xl:inline">{item.label}</span>
                  <span className="xl:hidden">{item.label.slice(0, 3)}{item.label.length > 3 ? '.' : ''}</span>
                </button>
              );
            })}
            
            {/*  Bouton Devenir membre - Desktop */}
            <a
              href={MEMBERSHIP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all flex-shrink-0"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Devenir membre</span>
              <span className="lg:hidden">Membre</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            
            {/*  Bouton Faire un Don - Desktop */}
            <a
              href="#don"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('don');
              }}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 hover:shadow-lg transition-all flex-shrink-0"
            >
              <Heart className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Faire un Don</span>
              <span className="lg:hidden">Don</span>
            </a>
          </nav>

          {/* Mobile Menu Button - Responsive */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 flex-shrink-0"
            aria-label="Menu"
          >
            <div className="w-6 h-6 flex flex-col justify-around">
              <span className={`block h-0.5 w-6 bg-gray-600 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-600 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-600 transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu - Responsive */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full glass-effect border-t border-white/20 shadow-lg max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col p-3 sm:p-4">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="inline-flex items-center gap-3 px-4 py-3.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-lg font-medium text-sm sm:text-base border-b border-gray-100 last:border-b-0"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
              
              {/* Séparateur */}
              <div className="my-2 border-t border-gray-200"></div>
              
              {/*  Bouton Devenir membre - Mobile */}
              <a
                href={MEMBERSHIP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3.5 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-all mb-2"
              >
                <UserPlus className="w-5 h-5" />
                Devenir membre
                <ExternalLink className="w-4 h-4 opacity-60" />
              </a>
              
              {/*  Bouton Faire un Don - Mobile */}
              <a
                href="#don"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('don');
                  setIsMobileMenuOpen(false);
                }}
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
              >
                <Heart className="w-5 h-5" />
                Faire un Don
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;