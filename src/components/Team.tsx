
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const teamMembers = [
    {
      name: "BIASSA Palaqieme ",
      role: "Directeur Générale",
      image: "/PHOTOS/BIASSA.jpg",
      description: "Experte en innovation technologique ",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      name: "TCHEDRE G. Yves-Roland",
      role: "Directeur de Recherche",
      image: "/PHOTOS/TCHEDRE.jpg",
      description: "Spécialiste en développement durable et technologies vertes",
      gradient: "from-green-500 to-blue-600"
    },
    {
      name: "KPEDROKU Cephas",
      role: "Responsable Innovation",
      image: "/PHOTOS/Cephas.jpg",
      description: "Passionnée d'entrepreneuriat et d'accompagnement des startups",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      name: "AMENUTI Yao Félicité",
      role: "Chef de Projet Tech",
      image: "/PHOTOS/YAO.jpg",
      description: "Expert en solutions technologiques innovantes",
      gradient: "from-orange-500 to-red-600"
    },
    {
      name: "KPANDJOM Koffi",
      role: "Responsable Partenariats",
      image: "/PHOTOS/Koffi.jpg",
      description: "Spécialiste en développement de collaborations stratégiques",
      gradient: "from-teal-500 to-cyan-600"
    },
    {
      name: "HOUNSI Komlan Josué",
      role: "Conseiller Scientifique",
      image: "/PHOTOS/Josue.jpg",
      description: "Autorité reconnue en recherche scientifique appliquée",
      gradient: "from-indigo-500 to-blue-600"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.team-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in-up');
              }, index * 150);
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
    <section id="equipe" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Notre Équipe</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une équipe passionnée d'experts dédiés à l'innovation et au développement technologique
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="team-card glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <div className={`w-24 h-24 bg-gradient-to-r ${member.gradient} rounded-full mx-auto p-1`}>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className={`absolute inset-0 w-24 h-24 bg-gradient-to-r ${member.gradient} rounded-full mx-auto opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <div className={`inline-block px-3 py-1 bg-gradient-to-r ${member.gradient} text-white text-sm rounded-full mb-3`}>
                    {member.role}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Rejoignez notre équipe</h3>
            <p className="text-gray-600 mb-6">
              Vous partagez notre vision ? Nous recherchons constamment de nouveaux talents pour renforcer notre équipe.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              Voir les opportunités
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
