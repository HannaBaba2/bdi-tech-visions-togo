import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Rocket, 
  Award, 
  Truck, 
  Leaf, 
  ArrowRight,
  Users,
  CheckCircle,
  ExternalLink,
  X,
  Mail
} from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [showDigitalBoostDetails, setShowDigitalBoostDetails] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // ✅ Liens Digital Boost
  const DIGITAL_BOOST_PDF = "https://drive.google.com/file/d/1prIWm2dvOTs8_eZFjf-CUC-ZTswDmDBN/view?usp=drivesdk";
  const DIGITAL_BOOST_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSdQRHcigN27QtpZ5A8v38UH5SQjSwk5JX08HqAEWmyGJ9A8qg/viewform?usp=header";
  const DIGITAL_BOOST_EMAIL = "Contact@bloc-des-innovateurs.org";

  // ✅ Texte EXACT du PDF Digital Boost (formaté pour l'affichage)
  const DIGITAL_BOOST_FULL_TEXT = `Digital Boost
Accélérez la transformation numérique de votre entreprise.
Boostez vos performances. Créez des opportunités d'emploi.

Digital Boost est un programme porté par l'association Bloc des Innovateurs, conçu pour accompagner les très petites entreprises (TPE), startups et PME togolaises à fort potentiel dans leur transformation numérique, tout en favorisant l'employabilité dans les métiers du digital.

Pourquoi Digital Boost ?
De nombreuses entreprises togolaises peinent encore à exploiter pleinement le numérique : absence de visibilité en ligne, outils inadaptés, faible automatisation, manque de compétences numériques.

En parallèle, de nombreux talents sont en reconversion professionnelle vers le digital, mais manquent d'opportunités concrètes pour mettre en pratique leurs compétences.

👉 Digital Boost apporte une réponse concrète à ces deux enjeux.

Un programme d'accompagnement complet en 4 volets

1. Formation à la transformation numérique

2. Développement d'outils numériques
Chaque entreprise bénéficie d'un accompagnement personnalisé pour la création de :
• sites web professionnels,
• applications web ou mobiles,
• outils de gestion (clients, ventes, logistique, e-commerce).

3. Création et gestion des réseaux sociaux

4. Intégration de l'intelligence artificielle

Un fort accent sur l'employabilité
Digital Boost ne transforme pas seulement les entreprises : il crée aussi des opportunités professionnelles concrètes.

Le programme mobilise des équipes composées de personnes en reconversion vers les métiers du numérique, qui interviennent directement sur des projets réels en entreprise, sous la supervision d'experts et de mentors.

🎯 Objectif : au moins 10 personnes recrutées ou insérées professionnellement à l'issue du programme.

À qui s'adresse le programme ?
• TPE, startups et PME togolaises à fort potentiel

Chiffres clés
• ⏱ Durée : 6 mois
• 🚀 20 entreprises accompagnées
• 💻 20 solutions numériques fonctionnelles
• 👥 1 réseau d'experts locaux mobilisé
• 🧑‍💼 Au moins 10 talents insérés professionnellement

Un écosystème collaboratif et durable
Digital Boost s'appuie sur :
• des entreprises numériques locales,
• des formateurs et mentors spécialisés,

Rejoignez le programme Digital Boost
Vous êtes une entreprise à fort potentiel ?
Vous souhaitez digitaliser vos activités et améliorer votre performance ?

👉 Digital Boost est fait pour vous.`;

  const projects = [
    // ✅ PROJET 1 : DIGITAL BOOST
    {
      title: "Digital Boost",
      description: "Accélérez la transformation numérique de votre entreprise",
      icon: Rocket,
      color: "from-blue-600 to-purple-600",
      details: "Digital Boost accompagne les TPE, startups et PME togolaises dans leur transformation numérique : formation, développement d'outils digitaux, gestion des réseaux sociaux et intégration de l'IA.",
      impact: "20 entreprises • 6 mois • 10+ talents insérés",
      isDigitalBoost: true,
      pdfUrl: DIGITAL_BOOST_PDF,
      formUrl: DIGITAL_BOOST_FORM
    },
    {
      title: "Entrepreneuriat et innovation",
      description: "Encourager l'entrepreneuriat innovant chez les jeunes",
      icon: Rocket,
      color: "from-purple-500 to-pink-500",
      details: "L'objectif est d'encourager l'entrepreneuriat innovant, en initiant les jeunes à l'innovation et les professionnels des domaines scientifiques à l'importance de l'innovation.",
      impact: "500+ jeunes formés"
    },
    {
      title: "Projet qualité",
      description: "Engagement au développement local et durable",
      icon: Award,
      color: "from-green-500 to-emerald-500",
      details: "L'objectif est d'encourager les entreprises à un engagement au développement local et durable et en offrant des services de qualité, en leur décernant une marque distinctive BDI.",
      impact: "50+ certifications délivrées"
    },
    {
      title: "Transport et mobilité",
      description: "Solutions innovantes pour le transport de marchandises",
      icon: Truck,
      color: "from-orange-500 to-red-500",
      details: "L'objectif est de développer un projet innovant facilitant le transport des marchandises agricoles et autres ; faciliter la mobilité en trouvant un moyen de survoler les embouteillages.",
      impact: "15+ solutions développées"
    },
    {
      title: "Environnement et gestion durable",
      description: "Recyclage des déchets pour l'agriculture et l'énergie",
      icon: Leaf,
      color: "from-teal-500 to-green-500",
      details: "Le projet a pour but de recycler les déchets ménagers des domiciles pour des usages agricoles et énergétiques. Elle a aussi pour but de réduire le coût de construction des ménages des conduites de rejets des eaux vannes.",
      impact: "30+ communautés impliquées"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.project-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-slide-in-left');
              }, index * 200);
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

  // ✅ Fonction pour gérer le bouton "En savoir plus"
  const handleLearnMore = (project: any) => {
    if (project.isDigitalBoost) {
      // Digital Boost → affiche le texte exact DANS la carte
      setShowDigitalBoostDetails(true);
    }
  };

  // ✅ Fonction pour gérer le bouton "Participer" (en bas de carte)
  const handleParticipate = (project: any) => {
    if (project.isDigitalBoost && project.pdfUrl) {
      // ✅ Ouvre le PDF Google Drive
      window.open(project.pdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // ✅ Fonction pour fermer les détails Digital Boost
  const closeDigitalBoostDetails = () => {
    setShowDigitalBoostDetails(false);
  };

  return (
    <section id="projets" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Nos Projets</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des initiatives innovantes pour transformer l'écosystème technologique togolais
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Projects List */}
          <div className="space-y-4">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <Card 
                  key={index}
                  className={`project-card cursor-pointer transition-all duration-300 border-0 shadow-lg hover:shadow-xl ${
                    selectedProject === index ? 'glass-effect scale-105 glow-box' : 'bg-white/80 hover:bg-white'
                  }`}
                  onClick={() => setSelectedProject(index)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${project.color} rounded-xl flex items-center justify-center shadow-md`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-800">{project.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Project Details */}
          <div className="lg:sticky lg:top-20">
            <Card className="glass-effect border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${projects[selectedProject].color} rounded-2xl flex items-center justify-center shadow-lg animate-glow`}>
                      {(() => {
                        const Icon = projects[selectedProject].icon;
                        return <Icon className="w-8 h-8 text-white" />;
                      })()}
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-800">
                        {projects[selectedProject].title}
                      </CardTitle>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${projects[selectedProject].color} text-white text-sm rounded-full mt-2`}>
                        <CheckCircle className="w-3 h-3" />
                        {projects[selectedProject].impact}
                      </div>
                    </div>
                  </div>
                  
                  {/* ✅ Bouton fermer pour Digital Boost détails */}
                  {projects[selectedProject].isDigitalBoost && showDigitalBoostDetails && (
                    <button 
                      onClick={closeDigitalBoostDetails}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Fermer les détails"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* ✅ Digital Boost : Affiche le texte EXACT du PDF quand showDigitalBoostDetails est true */}
                {projects[selectedProject].isDigitalBoost && showDigitalBoostDetails ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 max-h-[60vh] overflow-y-auto pr-2">
                    
                    {/* Texte exact du PDF */}
                    <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed font-sans">
                      {DIGITAL_BOOST_FULL_TEXT}
                    </pre>
                    
                    {/* ✅ Liens cliquables à la fin du texte */}
                    <div className="space-y-3 pt-4 border-t border-gray-200">
                      
                      {/* Lien "Postuler au programme" → PDF Google Drive */}
                      <a 
                        href={DIGITAL_BOOST_PDF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Postuler au programme
                      </a>
                      
                      {/* Lien "Devenir partenaire" → Email */}
                      <a 
                        href={`mailto:${DIGITAL_BOOST_EMAIL}`}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                      >
                        <Mail className="w-4 h-4" />
                        Devenir partenaire
                      </a>
                    </div>
                  </div>
                ) : (
                  /* ✅ Description courte par défaut */
                  <>
                    <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                      {projects[selectedProject].details}
                    </p>
                    
                    {/* Boutons par défaut */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        className={`bg-gradient-to-r ${projects[selectedProject].color} hover:scale-105 transition-transform inline-flex items-center justify-center gap-2`}
                        onClick={() => handleLearnMore(projects[selectedProject])}
                      >
                        En savoir plus
                        {projects[selectedProject].isDigitalBoost ? (
                          <ArrowRight className="w-4 h-4" />
                        ) : (
                          <ArrowRight className="w-4 h-4" />
                        )}
                      </Button>
                      
                      {projects[selectedProject].isDigitalBoost ? (
                        <Button 
                          variant="outline" 
                          className="hover:scale-105 transition-transform inline-flex items-center justify-center gap-2"
                          onClick={() => handleParticipate(projects[selectedProject])}
                        >
                          <Users className="w-4 h-4" />
                          Postuler au programme
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          className="hover:scale-105 transition-transform inline-flex items-center gap-2"
                        >
                          <Users className="w-4 h-4" />
                          Participer
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;