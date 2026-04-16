import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TrainingModal from '@/components/TrainingModal';
import { FileText, UserPlus, ExternalLink } from 'lucide-react';

const Publications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedTraining, setSelectedTraining] = useState<any>(null);

  const getTrainingStatus = (publication: any) => {
    if (!publication.isTraining || !publication.details?.sessions) {
      return { status: 'normal', label: '', color: '' };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sessions = publication.details.sessions;
    let hasFutureSession = false;
    let hasCurrentSession = false;
    let hasPastSession = false;

    sessions.forEach((session: any) => {
      const dateStr = session.dates.toLowerCase();
      
      if (dateStr.includes('bientôt') || dateStr.includes('tba') || dateStr.includes('soon')) {
        hasFutureSession = true;
        return;
      }

      const dateMatch = dateStr.match(/(\d{1,2})[-\s](\d{1,2})?\s+(\w+)\s+(\d{4})/);
      if (dateMatch) {
        const day = parseInt(dateMatch[1]);
        const monthName = dateMatch[3].toLowerCase();
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
      title: "TOGOTECH EXPO",
      type: "Événement Tech",
      color: "from-purple-600 to-pink-600",
      isTraining: true,
      isEvent: true,
      posterUrl: "/PHOTOS/togotech-expo.jpeg",
      details: {
        theme: "TOGOTECH EXPO - Connecter les Esprits Brillants",
        description: "TOGOTECH EXPO arrive pour connecter les esprits les plus brillants, les innovateurs de demain et les leaders d'aujourd'hui. De l'intelligence artificielle à la réalité virtuelle, plongez au cœur de l'écosystème qui transforme notre continent.",
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
      title: "Formation Développement Web",
      type: "Formation",
      color: "from-blue-500 to-cyan-500",
      isTraining: true,
      posterUrl: "/PHOTOS/bdi-formation-web.jpeg",
      details: {
        theme: "LES BASES DU DÉVELOPPEMENT WEB POUR LES DÉBUTANTS",
        description: "Vous souhaitez apprendre à créer des sites web et faire vos premiers pas dans le numérique ? Cette formation est faite pour vous ! Nous lançons une formation en développement web destinée aux débutants, accessible à toute personne motivée, sans prérequis technique.",
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
        // ✅ DATES MISES À JOUR (Mai 2026 - FUTUR)
        sessions: [
          { id: 1, dates: "15-16 Mai 2026", time: "19h-20h GMT", format: "En ligne & en présentiel" },
          { id: 2, dates: "20-22 Mai 2026", time: "14h-17h GMT", format: "En ligne & en présentiel" }
        ],
        pricing: { 
          inscription: "2000 FCFA", 
          participation: "20 000 FCFA" 
        },
        contact: { 
          phone: "228 91311214", 
          email: "blocdesinnovateurs@gmail.com", 
          maxParticipants: 10 
        },
        registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdXl5Rde-uFdUk-TIt5FdMcq9TmweIwv2pq2XITWAYCHYMcKg/closedform"
      }
    },
    {
      id: 3,
      title: "Réunion Générale du BDI",
      type: "Réunion",
      color: "from-blue-600 to-indigo-600",
      isTraining: true,
      isEvent: true,
      posterUrl: "/PHOTOS/reunion-generale-bdi.jpeg",
      details: {
        theme: "Réunion Générale du BDI - Samedi 11 Avril 2026",
        description: "Vous êtes cordialement invités à prendre part à la prochaine réunion du BDI. Veuillez confirmer votre présence pour des prévisions logistique.",
        program: [
          "1. Présentation et amendement du projet d'ordre du jour (05min)",
          "2. Mot de bienvenue du Président (05min)",
          "3. Présentation du bureau 2026 (20min)",
          "4. Présentation du plan d'action 2026 (10min)",
          "5. Etude et adoption du Rapport des activités du 1er janvier jusqu'au 1er Avril 2026 (5min)",
          "6. Étude et Adoption des rapports financiers du 1er Janvier au 1er Avril 2026 (10min)",
          "7. Présentation du projet de la rencontre spéciale BDI (05min)",
          "8. Élection du Directeur du Club des amis de l'association (10min)",
          "9. Présentation des activités des différents responsables (20 min)",
          "10. Divers (10min)",
          "11. Clôture (1min)"
        ],
        objectives: [
          "Faire le point sur les activités réalisées",
          "Présenter le bureau et le plan d'action 2026",
          "Adopter les rapports d'activités et financiers",
          "Élire le Directeur du Club des amis",
          "Présenter les activités des responsables"
        ],
        targetAudience: [
          "Membres du BDI",
          "Partenaires",
          "Sympathisants"
        ],
        // ✅ DATE MISE À JOUR (Mai 2026 - FUTUR)
        sessions: [
          { id: 1, dates: "15 Mai 2026", time: "10h00", format: "Présentiel" }
        ],
        pricing: {
          inscription: "Gratuit",
          participation: "Gratuit"
        },
        contact: {
          phone: "+228 93 31 83 59",
          email: "contact@bloc-des-innovateurs.org",
          maxParticipants: 50
        },
        location: "Bureau de la FTES, AdidoAdin (non loin de l'hôtel Concorde)",
        registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfm0djo90ycMPnqbZIuPdvPHDbtYOe8PcVq5dsRxNNh2cMGzw/viewform?usp=publish-editor"
      }
    },
    {
      id: 4,
      title: "Digital Boost",
      type: "Appel à candidature",
      color: "from-teal-500 to-cyan-500",
      isTraining: true,
      posterUrl: "/PHOTOS/appel-candidature-digital-boost.jpeg",
      details: {
        theme: "Digital Boost - Transformation Numérique des TPME et Startups",
        description: "Vous êtes une TPME ou startup togolaise ? Bénéficiez d'un accompagnement dans la transformation numérique de votre entreprise grâce au programme Digital Boost.",
        program: [
          "Formations pratiques en transformation numérique",
          "Marketing digital et visibilité en ligne",
          "Développement d'applications web et mobile",
          "Intelligence artificielle appliquée",
          "Gestion des réseaux sociaux",
          "Création de solutions numériques fonctionnelles"
        ],
        objectives: [
          "Digitaliser votre entreprise",
          "Développer vos ventes et votre visibilité",
          "Maîtriser les outils digitaux",
          "Créer une application web ou mobile",
          "Utiliser l'intelligence artificielle"
        ],
        targetAudience: [
          "TPME togolaises",
          "Startups togolaises",
          "Entrepreneurs en digitalisation"
        ],
        sessions: [
          { id: 1, dates: "Durée : 6 mois", time: "À définir", format: "Hybride" }
        ],
        pricing: {
          inscription: "Gratuit",
          participation: "Gratuit"
        },
        contact: {
          phone: "+228 93 31 83 59",
          email: "blocdesinnovateurs@gmail.com",
          maxParticipants: 20
        },
        registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdQRHcigN27QtpZ5A8v38UH5SQjSwk5JX08HqAEWmyGJ9A8qg/viewform?usp=header",
        articleUrl: "https://drive.google.com/file/d/1prIWm2dvOTs8_eZFjf-CUC-ZTswDmDBN/view?usp=drivesdk",
        deadline: "15 mai 2026"
      }
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

  const handleRegistration = (pub: any) => {
    if (pub.details?.registrationUrl) {
      window.open(pub.details.registrationUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleReadClick = (pub: any) => {
    if (pub.id === 4 && pub.details?.articleUrl) {
      window.open(pub.details.articleUrl, '_blank', 'noopener,noreferrer');
    } else {
      openTraining(pub);
    }
  };

  const getReadButtonConfig = (pub: any) => {
    if (pub.id === 4) {
      return { text: "Lire AMI", icon: ExternalLink, isExternal: true };
    }
    return { text: "Lire", icon: FileText, isExternal: false };
  };

  return (
    <section id="publications" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="container mx-auto px-4">
        
        {/* En-tête épuré */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Nos Publications & Événements</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos dernières initiatives pour l'innovation technologique au Togo
          </p>
        </div>

        {/* Grille des publications */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((publication) => {
            const status = getTrainingStatus(publication);
            const readButton = getReadButtonConfig(publication);
            const ReadIcon = readButton.icon;
            
            return (
              <Card 
                key={publication.id} 
                className="publication-card bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                
                {/* Affiche */}
                {publication.posterUrl && (
                  <div className="relative bg-gray-50">
                    <img 
                      src={publication.posterUrl} 
                      alt={publication.title}
                      className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.className = `w-full h-56 bg-gradient-to-br ${publication.color} flex items-center justify-center`;
                          target.parentElement.innerHTML = `
                            <div class="text-center text-white p-4">
                              <svg class="w-12 h-12 mx-auto mb-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                              <p class="text-sm font-medium">Affiche indisponible</p>
                            </div>
                          `;
                        }
                      }}
                    />
                    
                    {/* Badge de statut */}
                    {status.label && (
                      <div className="absolute top-3 right-3">
                        <span 
                          className={`px-3 py-1 text-white text-xs font-bold rounded-full shadow-lg ${
                            status.status === 'past' ? 'bg-gray-500' : 
                            status.status === 'coming-soon' ? 'bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse' : 
                            'bg-green-600'
                          }`}
                        >
                          {status.label}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Contenu */}
                <CardContent className="p-6">
                  {/* Badge type */}
                  <div className={`inline-block px-3 py-1 bg-gradient-to-r ${publication.color} text-white text-xs font-semibold rounded-full mb-4`}>
                    {publication.type}
                  </div>
                  
                  {/* Titre */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {publication.title}
                  </h3>
                  
                  {/* Description courte */}
                  {publication.details?.description && (
                    <p className="text-sm text-gray-600 mb-6 line-clamp-2">
                      {publication.details.description}
                    </p>
                  )}
                  
                  {/* BOUTONS */}
                  <div className="flex flex-col gap-3">
                    {/* Bouton Lire → TrainingModal */}
                    <Button 
                      className={`w-full bg-gradient-to-r ${publication.color} hover:opacity-90 transition-opacity text-sm font-medium py-2.5`}
                      onClick={() => handleReadClick(publication)}
                    >
                      <ReadIcon className="w-4 h-4 mr-2" />
                      {readButton.text}
                      {readButton.isExternal && <ExternalLink className="w-3 h-3 ml-1 opacity-70" />}
                    </Button>
                    
                    {/* Bouton S'inscrire → Google Forms */}
                    {publication.details?.registrationUrl && status.status !== 'past' && (
                      <Button 
                        variant="outline"
                        className="w-full border-gray-300 hover:bg-gray-50 text-sm font-medium py-2.5"
                        onClick={() => handleRegistration(publication)}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        S'inscrire
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>

      {/* TrainingModal */}
      {selectedTraining?.isTraining && (
        <TrainingModal
          isOpen={!!selectedTraining}
          onClose={closeTraining}
          onDownload={() => {}}
          title={selectedTraining.title}
          authors={selectedTraining.authors || ""}
          color={selectedTraining.color}
          details={selectedTraining.details}
          posterUrl={selectedTraining.posterUrl}
        />
      )}
    </section>
  );
};

export default Publications;