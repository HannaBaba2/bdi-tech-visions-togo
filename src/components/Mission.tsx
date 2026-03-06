import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Rocket, Eye, Users, FileText, Lightbulb, Award, Globe } from 'lucide-react';

const Mission = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-fade-in-up');
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
    <section id="mission" ref={sectionRef} className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-on-scroll">
            <span className="text-gradient">Notre Mission</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-on-scroll">
            Transformer l'écosystème technologique togolais par l'innovation et la recherche
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Mission Card */}
          <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-on-scroll">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-blue-900">Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Faciliter la recherche scientifique avancée en créant un cadre d'échange visant à produire et à valoriser les travaux de recherches, tout en promouvant le développement de compétences et l'innovation au service du progrès économique et social du Togo.
              </p>
            </CardContent>
          </Card>

          {/* But Card */}
          <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-on-scroll">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-green-900">But</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Participer à la promotion de l'innovation technologique au Togo en créant un environnement propice au développement et à l'épanouissement des talents locaux.
              </p>
            </CardContent>
          </Card>

          {/* Vision Card */}
          <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-on-scroll">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-purple-900">Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Être la meilleure organisation qui accompagne les projets tech en Afrique de l'Ouest, en devenant une référence en matière d'innovation et de développement technologique.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section - Professionnelle avec icônes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center animate-on-scroll">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lightbulb className="w-6 h-6 text-blue-600" />
              <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent`}>
                50+
              </div>
            </div>
            <div className="text-gray-600 font-medium">Projets accompagnés</div>
          </div>

          <div className="text-center animate-on-scroll">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-6 h-6 text-green-600" />
              <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent`}>
                25+
              </div>
            </div>
            <div className="text-gray-600 font-medium">Partenaires</div>
          </div>

          <div className="text-center animate-on-scroll">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-6 h-6 text-purple-600" />
              <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent`}>
                100+
              </div>
            </div>
            <div className="text-gray-600 font-medium">Chercheurs</div>
          </div>

          <div className="text-center animate-on-scroll">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileText className="w-6 h-6 text-orange-600" />
              <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent`}>
                150+
              </div>
            </div>
            <div className="text-gray-600 font-medium">Publications</div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20 -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-100 to-blue-100 rounded-full opacity-20 translate-y-48 -translate-x-48"></div>
    </section>
  );
};

export default Mission;