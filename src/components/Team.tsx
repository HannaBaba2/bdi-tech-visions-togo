import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Award, 
  Users, 
  Lightbulb,
  ArrowRight
} from 'lucide-react'; 

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const teamMembers = [
    {
      name: "BIASSA Palaqieme",
      role: "President",
      image: "/PHOTOS/BIASSA.jpg",
      description: "Expert en innovation technologique",
      gradient: "from-blue-500 to-purple-600",
      email: "marcelblak81@gmail.com",
    },
    {
      name: "KPEDZROKU Cephas",
      role: "Responsable Juridiques BD",
      image: "/PHOTOS/Cephas.jpg",
      description: "Passionné d'entrepreneuriat et d'accompagnement des startups",
      gradient: "from-purple-500 to-pink-600",
      email: "kpedzroku.ceph37@gmail.com",
    },
    {
      name: "KPANDJOM Koffi",
      role: "Responsable De Transfert de Technologie",
      image: "/PHOTOS/Koffi.jpg",
      description: "Spécialiste en développement de collaborations stratégiques",
      gradient: "from-teal-500 to-cyan-600",
      email: "kpedzroku.ceph37@gmail.com",
    },
    {
      name: "HOUNSI Komlan Josué",
      role: "Responsable. Du Développement Durable ",
      image: "/PHOTOS/Josue.jpg",
      description: "Autorité reconnue en recherche scientifique appliquée",
      gradient: "from-indigo-500 to-blue-600",
      email: "RESP. DU DÉVELOPPEMENT DURABLE ",
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
    <section id="equipe" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
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
            <Card 
              key={index} 
              className="team-card glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden"
            >
              <CardContent className="p-6">
                {/* Photo avec effet hover */}
                <div className="relative mb-6">
                  <div className={`w-28 h-28 bg-gradient-to-r ${member.gradient} rounded-full mx-auto p-1 shadow-lg`}>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover border-4 border-white"
                      onError={(e) => {
                        // Fallback si l'image ne charge pas
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.innerHTML = `
                            <div class="w-full h-full rounded-full bg-gradient-to-r ${member.gradient} flex items-center justify-center">
                              <Users class="w-12 h-12 text-white opacity-80" />
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                  {/* Effet de lueur au hover */}
                  <div className={`absolute inset-0 w-28 h-28 bg-gradient-to-r ${member.gradient} rounded-full mx-auto opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl`}></div>
                </div>

                {/* Informations */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r ${member.gradient} text-white text-sm font-medium rounded-full mb-4 shadow-md`}>
                    <Award className="w-3 h-3" />
                    {member.role}
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {member.description}
                  </p>

                  {/*  Réseaux sociaux : SEULEMENT Email */}
                  <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-200">
                    <a 
                      href={`mailto:${member.email}`}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      aria-label="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action - Professionnel avec icônes */}
        <div className="text-center mt-16">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto border border-blue-200">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-800">Rejoignez notre équipe</h3>
              <Lightbulb className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-600 mb-6 text-lg">
              Vous partagez notre vision ? Nous recherchons constamment de nouveaux talents pour renforcer notre équipe.
            </p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center gap-2">
              Voir les opportunités
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats équipe - Ajout professionnel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">4</div>
            <div className="text-sm text-gray-600">Membres clés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">50+</div>
            <div className="text-sm text-gray-600">Collaborateurs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">10+</div>
            <div className="text-sm text-gray-600">Départements</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">100%</div>
            <div className="text-sm text-gray-600">Engagés</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;