import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TrainingModal from '@/components/TrainingModal';
import { FileText, Download } from 'lucide-react';

const Publications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedTraining, setSelectedTraining] = useState<any>(null);

  // Fonction pour vérifier le statut d'une formation selon la date
  const getTrainingStatus = (publication: any) => {
    if (!publication.isTraining || !publication.details?.sessions) {
      return { status: 'normal', label: '', color: '' };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Parser les dates des sessions
    const sessions = publication.details.sessions;
    let hasFutureSession = false;
    let hasCurrentSession = false;
    let hasPastSession = false;

    sessions.forEach((session: any) => {
      // Extraire la date (ex: "20-21 Mars 2026" ou "Bientôt annoncé")
      const dateStr = session.dates.toLowerCase();
      
      if (dateStr.includes('bientôt') || dateStr.includes('tba') || dateStr.includes('soon')) {
        hasFutureSession = true;
        return;
      }

      // Parser la date (format: "20-21 Mars 2026")
      const dateMatch = dateStr.match(/(\d{1,2})[-\s](\d{1,2})?\s+(\w+)\s+(\d{4})/);
      if (dateMatch) {
        const day = parseInt(dateMatch[1]);
        const monthName = dateMatch[3];
        const year = parseInt(dateMatch[4]);
        
        const months: { [key: string]: number } = {
          'janvier': 0, 'jan': 0,
          'février': 1, 'fev': 1,
          'mars': 2, 'mar': 2,
          'avril': 3, 'avr': 3,
          'mai': 4,
          'juin': 5,
          'juillet': 6, 'jul': 6,
          'août': 7, 'aout': 7,
          'septembre': 8, 'sep': 8,
          'octobre': 9, 'oct': 9,
          'novembre': 10, 'nov': 10,
          'décembre': 11, 'dec': 11
        };

        const month = months[monthName] !== undefined ? months[monthName] : 0;
        const sessionDate = new Date(year, month, day);
        sessionDate.setHours(0, 0, 0, 0);

        // Ajouter quelques jours pour la fin de session
        const sessionEnd = new Date(sessionDate);
        sessionEnd.setDate(sessionEnd.getDate() + 5);

        if (sessionDate > today) {
          hasFutureSession = true;
        } else if (sessionEnd >= today) {
          hasCurrentSession = true;
        } else {
          hasPastSession = true;
        }
      } else {
        hasFutureSession = true; 
      }
    });

    // Déterminer le statut
    if (hasFutureSession || hasCurrentSession) {
      if (publication.isEvent) {
        return { status: 'coming-soon', label: ' Coming Soon', color: 'from-purple-600 to-pink-600' };
      } else {
        return { status: 'in-progress', label: ' En cours', color: 'bg-green-600' };
      }
    } else if (hasPastSession) {
      return { status: 'past', label: ' Passé', color: 'bg-gray-500' };
    }

    return { status: 'normal', label: '', color: '' };
  };

  const publications = [
    {
      id: 1,
      title: "TOGOTECH EXPO - L'Innovation Technologique au Togo",
      authors: "BDI - Estetic - Falling Walls Lab",
      journal: "Événement Tech",
      year: "2026",
      type: "Expo Tech",
      color: "from-purple-600 to-pink-600",
      isTraining: true,
      isEvent: true,
      posterUrl: "/PHOTOS/togotech-expo.jpeg",
      details: {
        theme: "TOGOTECH EXPO - Connecter les Esprits Brillants",
        description: "TOGOTECH EXPO arrive pour connecter les esprits les plus brillants, les innovateurs de demain et les leaders d'aujourd'hui. De l'intelligence artificielle à la réalité virtuelle, plongez au cœur de l'écosystème qui transforme notre continent. Restez connectés, le futur est en marche.",
        program: [
          "Intelligence Artificielle & Machine Learning",
          "Réalité Virtuelle & Augmentée",
          "Innovation Tech en Afrique",
          "Startups & Entrepreneuriat Digital",
          "Networking avec les leaders tech",
          "Démonstrations et ateliers pratiques"
        ],
        objectives: [
          "Découvrir les dernières innovations technologiques",
          "Rencontrer les acteurs majeurs de la tech africaine",
          "Explorer les opportunités de l'IA et de la VR",
          "Créer des connexions avec les innovateurs",
          "S'inspirer des leaders d'aujourd'hui et de demain"
        ],
        targetAudience: [
          "Développeurs et ingénieurs tech",
          "Entrepreneurs et startups",
          "Étudiants en technologie",
          "Investisseurs et business angels",
          "Passionnés d'innovation digitale"
        ],
        sessions: [
          { id: 1, dates: "Bientôt annoncé", time: "TBA", format: "Présentiel & Virtuel" }
        ],
        pricing: {
          inscription: "Bientôt disponible",
          participation: "Bientôt disponible"
        },
        contact: {
          phone: "+228 90154745 / 99667676 / 93318359",
          email: "togotechexpo@magazineafriqueit.com",
          maxParticipants: 0
        }
      }
    },
    {
      id: 2,
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
          { id: 1, dates: "20-21 Mars 2026", time: "19h-20h GMT", format: "En ligne & en présentiel" },
          { id: 2, dates: "23-25 Mars 2026", time: "14h-17h GMT", format: "En ligne & en présentiel" }
        ],
        pricing: { inscription: "2000 FCFA", participation: "20 000 FCFA" },
        contact: { phone: "228 91311214", email: "blocdesinnovateurs@gmail.com", maxParticipants: 10 }
      }
    },
    {
      id: 3,
      title: "L'Innovation Technologique au Togo : État des Lieux et Perspectives",
      authors: "Dr. Amina KOUADIO, Prof. Kwame ASANTE",
      journal: "Revue Africaine d'Innovation",
      year: "2024",
      type: "Article de recherche",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 4,
      title: "Entrepreneuriat Numérique en Afrique de l'Ouest",
      authors: "Dr. Fatou DIALLO, Ing. Joseph TOGO",
      journal: "Journal of Digital Innovation",
      year: "2024",
      type: "Étude de cas",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 5,
      title: "Solutions Durables pour la Gestion des Déchets Urbains",
      authors: "Prof. Emmanuel KONE, Dr. Aïcha BARRY",
      journal: "Environmental Tech Review",
      year: "2023",
      type: "Recherche appliquée",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 6,
      title: "Transport Intelligent et Mobilité Urbaine",
      authors: "Ing. Joseph TOGO, Dr. Amina KOUADIO",
      journal: "Smart Cities Journal",
      year: "2023",
      type: "Innovation technologique",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 7,
      title: "Fiscalité et Startups : Guide Pratique",
      authors: "Dr. Fatou DIALLO",
      journal: "Business Innovation Quarterly",
      year: "2023",
      type: "Guide pratique",
      color: "from-teal-500 to-blue-500"
    },
    {
      id: 8,
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
      const extension = pub.posterUrl.split('.').pop() || 'jpeg';
      link.download = `${pub.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${extension}`;
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
            <span className="text-gradient">Nos Publications & Événements</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos dernières recherches, formations et événements à venir pour l'avancement de l'innovation technologique
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((publication) => {
            const status = getTrainingStatus(publication);
            
            return (
              <Card 
                key={publication.id} 
                className="publication-card glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                
                {/*  Affiche pour les formations et événements */}
                {publication.isTraining && publication.posterUrl && (
                  <div 
                    className="relative cursor-pointer bg-white border-b-4 border-blue-500" 
                    onClick={() => openTraining(publication)}
                  >
                    <img 
                      src={publication.posterUrl} 
                      alt={publication.title}
                      className="w-full h-auto max-h-80 object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.innerHTML = `
                            <div class="w-full h-48 bg-gradient-to-br ${publication.color} flex items-center justify-center">
                              <div class="text-center text-white p-4">
                                <svg class="w-10 h-10 mx-auto mb-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <p class="text-sm font-medium">Affiche indisponible</p>
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
                    
                    {/*  Badge dynamique selon la date */}
                    {status.label && (
                      <div className="absolute top-3 right-3">
                        <span 
                          className={`px-3 py-1 text-white text-xs font-bold rounded-full shadow-lg border-2 border-white/80 ${
                            status.status === 'past' 
                              ? 'bg-gray-500' 
                              : status.status === 'coming-soon'
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse'
                              : 'bg-green-600'
                          }`}
                        >
                          {status.label}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/*  Contenu de la carte */}
                <CardHeader className={publication.isTraining ? "pt-4" : ""}>
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
                        className={`bg-gradient-to-r ${publication.color} hover:scale-105 transition-transform text-xs ${
                          status.status === 'past' ? 'opacity-60' : ''
                        }`}
                        onClick={() => openTraining(publication)}
                        disabled={status.status === 'past'}
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        {status.status === 'past' ? 'Archivé' : 'Lire'}
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
            );
          })}
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
              Recevez nos dernières publications, formations et événements directement dans votre boîte mail.
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

      {/* Modal de formation/événement */}
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