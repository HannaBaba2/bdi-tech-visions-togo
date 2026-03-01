
import React from 'react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-2xl font-bold">BDI</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Bloc Des Innovaateurs - Facilitant la recherche scientifique et l'innovation technologique au Togo.
            </p>
            <div className="flex space-x-4">
              {['📧', '📱', '🌐', '📍'].map((icon, index) => (
                <div key={index} className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <span className="text-lg">{icon}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
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
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nos Projets</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Fiscalité des entreprises tech</li>
              <li>Entrepreneuriat et innovation</li>
              <li>Projet qualité</li>
              <li>Transport et mobilité</li>
              <li>Environnement durable</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span>Lomé, Togo</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <span> blocdesinnovateurs@gmail.com </span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📱</span>
                <span>+228 93 31 83 59</span>
              </div>
            </div>
            <button
              onClick={() => scrollToSection('don')}
              className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
            >
              Faire un Don
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Bloc Des Innovaateurs. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </button>
              <button className="text-gray-400 hover:text-white text-sm transition-colors">
                Conditions d'utilisation
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
