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
  ExternalLink
} from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // ✅ Liens Digital Boost
  const DIGITAL_BOOST_PDF = "https://drive.google.com/file/d/1prIWm2dvOTs8_eZFjf-CUC-ZTswDmDBN/view?usp=drivesdk";
  const DIGITAL_BOOST_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSdQRHcigN27QtpZ5A8v38UH5SQjSwk5JX08HqAEWmyGJ9A8qg/viewform?usp=header";

  const projects = [
    // ✅ PROJET 1 : DIGITAL BOOST (description courte)
    {
      title: "Digital Boost",
      description: "Accélérez la transformation numérique de votre entreprise",
      icon: Rocket,
      color: "from-blue-600 to-purple-600",
      details: "Digital Boost accompagne les TPE, startups et PME togolaises dans leur transformation numérique : formation, développement d'outils digitaux, gestion des réseaux sociaux et intégration de l'IA.",
      impact: "20 entreprises • 6 mois • 10+ talents insérés",
      isDigitalBoost: true,
      pdfUrl: DIGITAL_BOOST_PDF,
      formUrl: DIGITAL_BOOST_FORM,
      benefits: [
        "Formations pratiques en transformation numérique",
        "Accompagnement personnalisé pour outils digitaux",
        "IA appliquée à votre secteur",
        "Gestion professionnelle des réseaux sociaux",
        "Une solution numérique fonctionnelle livrée"
      ],
      target: "TPE, startups et PME togolaises à fort potentiel"
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
    if (project.isDigitalBoost && project.pdfUrl) {
      window.open(project.pdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // ✅ Fonction pour gérer le bouton "Participer"
  const handleParticipate = (project: any) => {
    if (project.isDigitalBoost && project.formUrl) {
      window.open(project.formUrl, '_blank', 'noopener,noreferrer');
    }
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
                <div className="flex items-center space-x-4 mb-4">
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
              </CardHeader>
              <CardContent>
                {/* ✅ Description courte - même taille que les autres projets */}
                <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                  {projects[selectedProject].details}
                </p>
                
                {/* ✅ Digital Boost : Affiche les bénéfices (optionnel, caché par défaut si tu veux) */}
                {projects[selectedProject].isDigitalBoost && (
                  <div className="space-y-3 mb-6">
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        Voir les détails du programme ▾
                      </summary>
                      <div className="mt-3 space-y-2 text-sm text-gray-600">
                        <h4 className="font-semibold text-gray-800">Ce que vous gagnez :</h4>
                        <ul className="space-y-1">
                          {projects[selectedProject].benefits?.map((benefit: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                        {projects[selectedProject].target && (
                          <p className="text-xs text-gray-500 italic mt-2">
                             Public : {projects[selectedProject].target}
                          </p>
                        )}
                      </div>
                    </details>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* ✅ Bouton "En savoir plus" → Ouvre le PDF pour Digital Boost */}
                  <Button 
                    className={`bg-gradient-to-r ${projects[selectedProject].color} hover:scale-105 transition-transform inline-flex items-center justify-center gap-2`}
                    onClick={() => handleLearnMore(projects[selectedProject])}
                  >
                    En savoir plus
                    {projects[selectedProject].isDigitalBoost ? (
                      <ExternalLink className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </Button>
                  
                  {/* ✅ Bouton "Participer" → Ouvre le formulaire pour Digital Boost */}
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;