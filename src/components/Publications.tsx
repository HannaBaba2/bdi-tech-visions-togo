import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TrainingModal from '@/components/TrainingModal';
import { FileText, UserPlus, ExternalLink } from 'lucide-react';

const Publications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedTraining, setSelectedTraining] = useState<any>(null);

  // ✅ Fonction CORRIGÉE pour vérifier le statut
  const getTrainingStatus = (publication: any) => {
    // Accepte les formations ET les événements
    if ((!publication.isTraining && !publication.isEvent) || !publication.details?.sessions) {
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
      
      // Si texte spécial → futur
      if (dateStr.includes('bientôt') || dateStr.includes('tba') || dateStr.includes('soon') || dateStr.includes('à définir')) {
        hasFutureSession = true;
        return;
      }

      // Pattern pour dates : "15 Mai 2026" ou "20-21 Mars 2026"
      const dateMatch = dateStr.match(/(\d{1,2})(?:[-\s](\d{1,2}))?\s+(\w+)\s+(\d{4})/);
      
      if (dateMatch) {
        const day = parseInt(dateMatch[1]);
        const monthName = dateMatch[dateMatch.length - 2].toLowerCase();
        const year = parseInt(dateMatch[dateMatch.length - 1]);
        
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
        // Si la date ne peut pas être parsée → considéré comme passé
        hasPastSession = true;
      }
    });

    // Priorité : passé > en cours > futur
    if (hasPastSession && !hasFutureSession && !hasCurrentSession) {
      return { status: 'past', label: ' Passé', color: 'bg-gray-500' };
    }
    
    if (hasFutureSession || hasCurrentSession) {
      if (publication.isEvent) {
        return { status: 'coming-soon', label: ' Coming Soon', color: 'from-purple-600 to-pink-600' };
      } else {
        return { status: 'in-progress', label: ' En cours', color: 'bg-green-600' };
      }
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
          { id: 1, dates: "20-25 Juin 2026", time: "TBA", format: "Présentiel & Virtuel" }
        ],
        pricing: {
          inscription: "Terminé",
          participation: "Terminé"
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
        sessions: [
          { id: 1, dates: "15-16 Mai 2026", time: "19h-20h GMT", format: "En ligne & en présentiel" },
          { id: 2, dates: "20-22 Mai 2026", time: "14h-17h GMT", format: "En ligne & en présentiel" }
        ],
        pricing: { 
          inscription: "2000 FCFA", 
          participation: "20 000 FCFA" 
        },
        contact: { 
          phone: "+228 91311214", 
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
        sessions: [
          { id: 1, dates: "11 Avril 2026", time: "10h00", format: "Présentiel" }
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
        description: "Digital Boost est un programme porté par l'association Bloc des Innovateurs, conçu pour accompagner les très petites entreprises (TPE), startups et PME togolaises à fort potentiel dans leur transformation numérique, tout en favorisant l'employabilité dans les métiers du digital.",
        program: [
          "Formation à la transformation numérique",
          "Développement d'outils numériques (sites web, applications, outils de gestion)",
          "Création et gestion des réseaux sociaux",
          "Intégration de l'intelligence artificielle"
        ],
        objectives: [
          "Digitaliser votre entreprise",
          "Développer vos ventes et votre visibilité",
          "Maîtriser les outils digitaux",
          "Créer une application web ou mobile",
          "Utiliser l'intelligence artificielle"
        ],
        targetAudience: [
          "TPE, startups et PME togolaises à fort potentiel"
        ],
        sessions: [
          { id: 1, dates: "15 Mai 2026", time: "Date limite", format: "Candidature en ligne" }
        ],
        pricing: {
          inscription: "Clôturé",
          participation: "Clôturé"
        },
        contact: {
          phone: "+228 93 31 83 59",
          email: "Contact@bloc-des-innovateurs.org",
          maxParticipants: 20
        },
        registrationUrl: "https://forms.gle/NcsHPhgvmM789Pzf7",
        articleUrl: "https://drive.google.com/file/d/1prIWm2dvOTs8_eZFjf-CUC-ZTswDmDBN/view?usp=drivesdk",
        deadline: "15 Mai 2026",
        benefits: [
          "20 entreprises accompagnées",
          "20 solutions numériques fonctionnelles",
          "1 réseau d'experts locaux mobilisé",
          "Au moins 10 talents insérés professionnellement"
        ]
      }
    },
    {
      id: 5,
      title: "Falling Walls Lab Lomé 2026",
      type: "Appel à candidatures",
      color: "from-indigo-500 to-violet-500",
      isTraining: true,
      isEvent: true,
      posterUrl: "/PHOTOS/falling-walls-lome.jpeg",
      details: {
        theme: "Falling Walls Lab Lomé 2026 – Présentez votre idée qui peut changer le monde",
        description: "Vous êtes étudiant(e), jeune chercheur(se) ou innovateur(trice) avec une idée capable de changer le monde ? C'est le moment de passer à l'action ! Falling Walls Lab est un concours international unique où vous avez 3 minutes pour présenter votre projet innovant devant un jury d'experts.",
        program: [
          "Présentation de votre projet en 3 minutes devant un jury d'experts",
          "Coaching et préparation au pitch",
          "Ateliers de communication et de networking",
          "Sélection des meilleurs projets pour la finale mondiale à Berlin"
        ],
        objectives: [
          "Présentez votre idée à un jury de haut niveau",
          "Gagnez en visibilité internationale",
          "Développez vos compétences en communication",
          "Élargissez votre réseau avec des profils interdisciplinaires",
          "Tentez de remporter un voyage tous frais payés à Berlin pour la finale mondiale",
          "Accédez au prestigieux Falling Walls Science Summit",
          "Concourez pour le titre de Breakthrough Winner – Emerging Talents"
        ],
        targetAudience: [
          "Étudiant(e)s",
          "Jeunes chercheur(se)s",
          "Innovateur(trice)s avec une idée capable de changer le monde"
        ],
        sessions: [
          { id: 1, dates: "24-25 juillet 2026", time: "À définir", format: "Présentiel - Unipod, Lomé" }
        ],
        pricing: {
          inscription: "Gratuit",
          participation: "Gratuit"
        },
        contact: {
          phone: "+228 90 00 00 00",
          email: "lome@falling-walls.com",
          maxParticipants: 0
        },
        registrationUrl: "https://falling-walls.com/falling-walls-lab-lome-togo",
        deadline: "10 juillet 2026",
        location: "Unipod, Lomé",
        requirements: "Une bonne maîtrise de l'anglais à l'oral est recommandée",
        benefits: [
          "Voyage tous frais payés à Berlin (5–11 novembre)",
          "Accès au Falling Walls Science Summit (6–9 novembre)",
          "Programme exclusif : coaching, ateliers, networking",
          "Concours pour le titre de Breakthrough Winner – Emerging Talents"
        ]
      }
    },
    {
      id: 6,
      title: "Formation Power BI",
      type: "Formation",
      color: "from-yellow-500 to-orange-500",
      isTraining: true,
      isEvent: false,
      posterUrl: "/PHOTOS/formation-powerbi.jpeg",
      details: {
        theme: "FORMATION POWER BI – DE LA DONNÉE AU TABLEAU DE BORD",
        description: "Vous souhaitez apprendre à transformer vos données en tableaux de bord interactifs et pertinents ? Rejoignez notre formation pratique sur Power BI et maîtrisez les étapes essentielles de la Business Intelligence.",
        program: [
          "Importation des données",
          "Transformation et nettoyage des données",
          "Modélisation des données",
          "Création de graphiques et tableaux de bord interactifs",
          "Publication des rapports et collaboration en ligne"
        ],
        objectives: [
          "Maîtriser les étapes essentielles de la Business Intelligence",
          "Développer vos compétences en analyse de données",
          "Créer des visualisations de données professionnelles",
          "Publier et partager vos rapports en ligne"
        ],
        targetAudience: [
          "Débutants en Business Intelligence",
          "Analystes de données",
          "Professionnels souhaitant valoriser leurs données",
          "Toute personne motivée, sans prérequis technique"
        ],
        sessions: [
          { id: 1, dates: "10-15 Juin 2026", time: "À définir", format: "En ligne & en présentiel" }
        ],
        pricing: {
          inscription: "Terminé",
          participation: "Terminé"
        },
        contact: {
          phone: "+228 93 31 83 59",
          email: "blocdesinnovateurs@gmail.com",
          maxParticipants: 15
        },
        registrationUrl: "https://forms.gle/WKp8BiAA8vpC1ArX6"
      }
    },
    {
      id: 7,
      title: "Formation Excel pour les Professionnels",
      type: "Formation Gratuite",
      color: "from-blue-600 to-cyan-600",
      isTraining: true,
      isEvent: false,
      posterUrl: "/PHOTOS/formation-excel.jpeg",
      details: {
        theme: "FORMATION GRATUITE - EXCEL POUR LES PROFESSIONNELS",
        description: "Nous avons le plaisir de vous informer d'une Formation en Excel. Cette formation a pour objectif de vous permettre de maîtriser les fonctionnalités essentielles d'Excel, d'améliorer votre productivité et de faciliter le traitement de vos données au quotidien.",
        program: [
          "Les bases Excel",
          "Formules & Fonctions",
          "Mise en forme conditionnelle",
          "Tableau croisé Dynamique"
        ],
        objectives: [
          "Maîtriser les fonctionnalités essentielles d'Excel",
          "Améliorer votre productivité",
          "Faciliter le traitement de vos données au quotidien"
        ],
        targetAudience: [
          "Débutants",
          "Utilisateurs d'Excel souhaitant renforcer leurs compétences",
          "Professionnels"
        ],
        sessions: [
          { id: 1, dates: "02 Mai 2026", time: "10H-13H GMT", format: "En ligne sur Google Meet" }
        ],
        pricing: {
          inscription: "Gratuit",
          participation: "Gratuit"
        },
        contact: {
          phone: "",
          email: "contact@bloc-des-innovateurs.org",
          maxParticipants: 0
        },
        registrationUrl: "https://forms.gle/bUp8SFAzhSt9SpFGA",
        trainer: "Papa Lat C. SECK - Expert en Suivi-Évaluation et Apprentissage",
        location: "En ligne sur Google Meet",
        additionalInfo: "Le lien de la formation sera envoyé par mail"
      }
    },
    // ✅ ÉVÉNEMENT 8 : Sortie Détente - Boma Beach (PASSÉ)
    {
      id: 8,
      title: "Sortie Détente - Boma Beach",
      type: "Événement",
      color: "from-teal-400 to-blue-500",
      isTraining: false,
      isEvent: true,
      posterUrl: "/PHOTOS/sortie-detente-boma.jpeg",
      details: {
        theme: "Les innovations technologiques à nos jours, quel impact dans la vie des entrepreneurs et la souveraineté de notre société ?",
        description: "Après les projets, les formations, les réunions et les deadlines… il faut aussi penser à souffler un peu  Le BDI vous embarque pour un moment de détente, d'échanges et de bonne humeur autour d'un thème super intéressant.",
        program: [
          "Moment de détente et de convivialité",
          "Échanges sur l'impact des innovations technologiques",
          "Networking entre innovateurs",
          "Partage d'expériences et d'idées"
        ],
        objectives: [
          "Apprendre et discuter dans une ambiance détendue",
          "Se détendre et profiter d'une bonne ambiance entre innovateurs",
          "Échanger sur les enjeux technologiques actuels"
        ],
        targetAudience: [
          "Membres du BDI",
          "Passionnés d'innovation",
          "Entrepreneurs et professionnels du numérique"
        ],
        sessions: [
          { id: 1, dates: "27 Mai 2026", time: "14H GMT", format: "Présentiel - Boma Beach, Avépozo" }
        ],
        pricing: {
          inscription: "5000 FCFA",
          participation: "5000 FCFA"
        },
        contact: {
          phone: "Tmoney: +228 93-27-06-77 | Flooz: +228 99-29-77-58",
          email: "",
          maxParticipants: 0
        },
        location: "Boma Beach, Avépozo",
        paymentInfo: "Les membres souhaitant participer peuvent envoyer leur contribution via Tmoney: (+228) 93-27-06-77 ou Flooz: (+228) 99-29-77-58"
      }
    },
    // ✅ ÉVÉNEMENT 9 : Rencontre Mensuelle des Membres (PASSÉ)
    {
      id: 9,
      title: "Rencontre Mensuelle des Membres",
      type: "Rencontre",
      color: "from-purple-500 to-pink-500",
      isTraining: false,
      isEvent: true,
      posterUrl: "/PHOTOS/rencontre-mensuelle.png",
      details: {
        theme: "Rencontre mensuelle avec les membres du BDI",
        description: "Chaque nouvelle rencontre est une nouvelle occasion de grandir ensemble. Le Bloc des Innovateurs vous donne rendez-vous pour sa rencontre mensuelle avec les membres. Nous aurons l'occasion de nous retrouver, d'accueillir les nouveaux membres, de partager nos expériences et d'échanger autour des projets et ambitions qui font vivre notre communauté.",
        program: [
          "Accueil des nouveaux membres",
          "Partage d'expériences",
          "Échanges sur les projets et ambitions",
          "Présentation de l'association",
          "Découverte des opportunités"
        ],
        objectives: [
          "Rencontrer d'autres passionnés d'innovation",
          "Mieux connaître l'association",
          "Découvrir les opportunités qui s'offrent à vous",
          "Partager un moment d'apprentissage et de convivialité"
        ],
        targetAudience: [
          "Nouvel adhérent",
          "Membre de longue date",
          "Passionnés d'innovation"
        ],
        sessions: [
          { id: 1, dates: "27 Juin 2026", time: "14H00", format: "Présentiel" }
        ],
        pricing: {
          inscription: "Gratuit",
          participation: "Gratuit"
        },
        contact: {
          phone: "",
          email: "",
          maxParticipants: 0
        },
        registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdq93fIXMhrQTjIdeyGEyRRZnK7Ldcj1sq6FHsUlJj_W3LcSQ/viewform?usp=publish-editor",
        additionalInfo: "Nous avons hâte de vous retrouver pour un moment de partage, d'apprentissage et de convivialité. À très bientôt ! "
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

  // ✅ CORRECTION : Accepte les formations ET les événements
  const openTraining = (pub: any) => {
    if (pub.isTraining || pub.isEvent) {
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
                    {/* Bouton Lire → TrainingModal ou PDF */}
                    <Button 
                      className={`w-full bg-gradient-to-r ${publication.color} hover:opacity-90 transition-opacity text-sm font-medium py-2.5`}
                      onClick={() => handleReadClick(publication)}
                    >
                      <ReadIcon className="w-4 h-4 mr-2" />
                      {readButton.text}
                      {readButton.isExternal && <ExternalLink className="w-3 h-3 ml-1 opacity-70" />}
                    </Button>
                    
                    {/* Bouton S'inscrire → Caché si statut = passé */}
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

      {/* TrainingModal - Accepte formations ET événements */}
      {(selectedTraining?.isTraining || selectedTraining?.isEvent) && (
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