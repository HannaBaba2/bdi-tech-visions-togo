import React from 'react';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-2xl font-bold">BDI</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Bloc Des Innovateurs - Facilitant la recherche scientifique et l'innovation technologique au Togo.
            </p>
            
            {/* Réseaux sociaux professionnels */}
            <div className="flex space-x-3 pt-2">
              <a 
                href="mailto:blocdesinnovateurs@gmail.com"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 group"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="tel:+22893318359"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300 group"
                aria-label="Téléphone"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://www.bloc-des-innovateurs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all duration-300 group"
                aria-label="Site web"
              >
                <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Navigation</h3>
            <ul className="space-y-3">
              {[
                { name: 'Accueil', id: 'accueil' },
                { name: 'Mission', id: 'mission' },
                { name: 'Projets', id: 'projets' },
                { name: 'Équipe', id: 'equipe' },
                { name: 'Publications', id: 'publications' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Nos Projets</h3>
            <ul className="space-y-3 text-gray-300">
              {[
                "Fiscalité des entreprises tech",
                "Entrepreneuriat et innovation",
                "Projet qualité",
                "Transport et mobilité",
                "Environnement durable"
              ].map((project, index) => (
                <li key={index} className="hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer">
                  {project}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Lomé, Togo</span>
              </div>
              <a 
                href="mailto:blocdesinnovateurs@gmail.com"
                className="flex items-start space-x-3 hover:text-white transition-colors group"
              >
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>blocdesinnovateurs@gmail.com</span>
              </a>
              <a 
                href="tel:+22893318359"
                className="flex items-start space-x-3 hover:text-white transition-colors group"
              >
                <Phone className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>+228 93 31 83 59</span>
              </a>
            </div>
            <button
              onClick={() => scrollToSection('don')}
              className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Faire un Don
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Bloc Des Innovateurs. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6">
              <button className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </button>
              <button className="text-gray-400 hover:text-white text-sm transition-colors">
                Conditions d'utilisation
              </button>
              {/* Bouton retour en haut */}
              <button 
                onClick={scrollToTop}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 group"
                aria-label="Retour en haut"
              >
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;