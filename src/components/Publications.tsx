import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TrainingModal from '@/components/TrainingModal';
import { FileText, Download } from 'lucide-react';

const Publications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedTraining, setSelectedTraining] = useState<any>(null);

  const publications = [
    {
      id: 1,
      title: "Formation : Les Bases du Développement Web pour Débutants",
      authors: "BDI - Bloc Des Innovateurs",
      journal: "Formation Pratique",
      year: "2026",
      type: "Formation",
      color: "from-blue-500 to-cyan-500",
      isTraining: true,
      posterUrl: "/PHOTOS/bdi-formation-web.jpeg",
      details: {
        theme: "LES BASES DU DÉVELOPPEMENT WEB POUR LES DÉBUTANTS",
        description: "Nous lançons une formation en développement web destinée aux débutants, accessible à toute personne motivée, sans prérequis technique. L'objectif est de vous initier aux bases essentielles du développement web et de vous permettre de concevoir vos premières pages web de manière autonome.",
        program: [
          "Introduction au développement web",
          "Bases du HTML et CSS",
          "Notions fondamentales de JavaScript",
          "Création de pages web simples et responsives",
          "Bonnes pratiques et outils du développeur"
        ],
        objectives: [
          "Comprendre le fonctionnement du web",
          "Acquérir les bases du développement front-end",
          "Être capable de créer un site web simple",
          "Poser des bases solides pour aller vers des niveaux plus avancés"
        ],
        targetAudience: [
          "Débutants",
          "Étudiants, professionnels ou toute personne souhaitant se reconvertir",
          "Passionnés du numérique"
        ],
        sessions: [
          {
            id: 1,
            dates: "20-21 Mars 2026",
            time: "19h-20h GMT",
            format: "En ligne & en présentiel"
          },
          {
            id: 2,
            dates: "23-25 Mars 2026",
            time: "14h-17h GMT",
            format: "En ligne & en présentiel"
          }
        ],
        pricing: {
          inscription: "2000 FCFA",
          participation: "20 000 FCFA"
        },
        contact: {
          phone: "228 91311214",
          email: "blocdesinnovateurs@gmail.com",
          maxParticipants: 10
        }
      }
    },
    {
      id: 2,
      title: "L'Innovation Technologique au Togo : État des Lieux et Perspectives",
      authors: "Dr. Amina KOUADIO, Prof. Kwame ASANTE",
      journal: "Revue Africaine d'Innovation",
      year: "2024",
      type: "Article de recherche",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      title: "Entrepreneuriat Numérique en Afrique de l'Ouest",
      authors: "Dr. Fatou DIALLO, Ing. Joseph TOGO",
      journal: "Journal of Digital Innovation",
      year: "2024",
      type: "Étude de cas",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "Solutions Durables pour la Gestion des Déchets Urbains",
      authors: "Prof. Emmanuel KONE, Dr. Aïcha BARRY",
      journal: "Environmental Tech Review",
      year: "2023",
      type: "Recherche appliquée",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 5,
      title: "Transport Intelligent et Mobilité Urbaine",
      authors: "Ing. Joseph TOGO, Dr. Amina KOUADIO",
      journal: "Smart Cities Journal",
      year: "2023",
      type: "Innovation technologique",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 6,
      title: "Fiscalité et Startups : Guide Pratique",
      authors: "Dr. Fatou DIALLO",
      journal: "Business Innovation Quarterly",
      year: "2023",
      type: "Guide pratique",
      color: "from-teal-500 to-blue-500"
    },
    {
      id: 7,
      title: "Partenariats Public-Privé en Innovation",
      authors: "Dr. Aïcha BARRY, Prof. Kwame ASANTE",
      journal: "Policy & Innovation Review",
      year: "2023",
      type: "Analyse politique",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.publication-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('card-show');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const openTraining = (pub: any) => {
    if (pub.isTraining) {
      setSelectedTraining(pub);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeTraining = () => {
    setSelectedTraining(null);
    document.body.style.overflow = 'unset';
  };

  const downloadPoster = (pub: any) => {
    if (pub.posterUrl) {
      const link = document.createElement('a');
      link.href = pub.posterUrl;
      link.download = `BDI-Formation-${pub.year}.jpg`;
      link.click();
    } else {
      alert("L'affiche sera bientôt disponible !");
    }
  };

  return (
    <section id="publications" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Nos Publications</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos dernières recherches et contributions à l'avancement de l'innovation technologique
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((publication) => (
            <Card key={publication.id} className="publication-card glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <CardHeader>
                <div className={`w-full h-2 bg-gradient-to-r ${publication.color} rounded-full mb-4`}></div>
                <div className={`inline-block px-3 py-1 bg-gradient-to-r ${publication.color} text-white text-xs rounded-full mb-3 w-fit`}>
                  {publication.type}
                </div>
                <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
                  {publication.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Auteurs:</span> {publication.authors}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Journal:</span> {publication.journal}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Année:</span> {publication.year}
                  </p>
                  <div className="flex space-x-2 pt-4">
                    <Button 
                      size="sm" 
                      className={`bg-gradient-to-r ${publication.color} hover:scale-105 transition-transform text-xs`}
                      onClick={() => openTraining(publication)}
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      Lire
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="hover:scale-105 transition-transform text-xs"
                      onClick={() => downloadPoster(publication)}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {[
            { number: "150+", label: "Publications", color: "from-blue-500 to-cyan-500" },
            { number: "25+", label: "Revues partenaires", color: "from-green-500 to-emerald-500" },
            { number: "500+", label: "Citations", color: "from-purple-500 to-violet-500" },
            { number: "15+", label: "Prix reçus", color: "from-orange-500 to-red-500" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="text-center mt-16">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Restez informé</h3>
            <p className="text-gray-600 mb-6">
              Recevez nos dernières publications et actualités directement dans votre boîte mail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full">
                S'abonner
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de formation */}
      {selectedTraining?.isTraining && (
        <TrainingModal
          isOpen={!!selectedTraining}
          onClose={closeTraining}
          onDownload={() => downloadPoster(selectedTraining)}
          title={selectedTraining.title}
          authors={selectedTraining.authors}
          color={selectedTraining.color}
          details={selectedTraining.details}
          posterUrl={selectedTraining.posterUrl}
        />
      )}
    </section>
  );
};

export default Publications;