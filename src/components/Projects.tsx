import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Rocket, 
  Award, 
  Truck, 
  Leaf, 
  ArrowRight,
  Users,
  CheckCircle
} from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const projects = [
    {
      title: "Fiscalité des entreprises tech",
      description: "Communication sur les obligations fiscales pour les startups tech",
      icon: Briefcase,
      color: "from-blue-500 to-cyan-500",
      details: "L'objectif est de faire la communication sur les obligations en terme fiscale pour la startup tech, en simplifiant les procédures et en accompagnant les entrepreneurs.",
      impact: "200+ startups accompagnées"
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
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                  {projects[selectedProject].details}
                </p>
                <div className="flex space-x-4">
                  <Button className={`bg-gradient-to-r ${projects[selectedProject].color} hover:scale-105 transition-transform inline-flex items-center gap-2`}>
                    En savoir plus
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="hover:scale-105 transition-transform inline-flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Participer
                  </Button>
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