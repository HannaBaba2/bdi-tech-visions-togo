import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, ChevronDown, Mail, ArrowRight } from 'lucide-react';

type Partner = {
  id: number;
  name: string;
  logo: string;
  shortDescription: string;
  fullDescription: string;
  expertise: string[];
  contact?: {
    email?: string;
  };
};

const Partners = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedPartner, setExpandedPartner] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});

  const partners: Partner[] = [
    {
      id: 1,
      name: "WAAP SARL",
      logo: "/PHOTOS/partner-waap.jpeg",
      shortDescription: "Production de jus de fruits naturels, épicerie fine, confitures et caramels.",
      fullDescription: "WAAP SARL est spécialisée dans la production de jus de fruits naturels et des produits d'épicerie fine, des confitures, caramels... L'entreprise dispose d'une expertise reconnue dans le management de la qualité sanitaire des produits et process de production Agroalimentaire.",
      expertise: [
        "Production de jus de fruits naturels",
        "Épicerie fine, confitures, caramels",
        "Management de la qualité sanitaire",
        "Process de production agroalimentaire",
        "Formation, orientation, recrutement, conseil et étude"
      ],
      contact: { email: "contact@waap-togo.com" }
    },
    {
      id: 2,
      name: "INNOVASTRA",
      logo: "/PHOTOS/partner-innovastra.jpeg",
      shortDescription: "Innovations technologiques et fabrication d'équipements d'expérimentation scientifique.",
      fullDescription: "INNOVASTRA est spécialisée dans les innovations technologiques. Elle se concentre notamment sur la fabrication d'équipements d'expérimentation scientifique, témoignant d'un engagement fort dans le secteur technique et éducatif.",
      expertise: [
        "Innovations technologiques",
        "Fabrication d'équipements scientifiques",
        "Secteur technique et éducatif",
        "Expérimentation et R&D",
        "Solutions sur mesure pour laboratoires"
      ],
      contact: { email: "contact@innovastra.com" }
    },
    {
      id: 3,
      name: "DJANGO EXPERTISE",
      logo: "/PHOTOS/partner-django.jpeg",
      shortDescription: "Cabinet spécialisé en Formation, Orientation, Recrutement, Conseil et Étude.",
      fullDescription: "DJANGO EXPERTISE est un cabinet spécialisé en Formation - Orientation - Recrutement - Conseil - Étude. Notre vision est d'accroître le capital humain des organisations afin de les rendre meilleures, dynamiques et productives.",
      expertise: [
        "Formation professionnelle",
        "Orientation et recrutement",
        "Conseil en stratégie RH",
        "Études et audits organisationnels"
      ],
      contact: { email: "contact@django-expertise.com" }
    },
    {
      id: 4,
      name: "Shop Manager Togo",
      logo: "/PHOTOS/partner-shopmanager.jpeg",
      shortDescription: "Gestion opérationnelle et commerciale de points de vente au Togo.",
      fullDescription: "Un Shop Manager (Manager de Boutique) au Togo est responsable de la gestion opérationnelle et commerciale d'un point de vente. Il/elle supervise les équipes, gère les stocks, dynamise les ventes, assure le service client et optimise la rentabilité, souvent dans des secteurs tels que la vente de détail, les télécoms ou l'optique.",
      expertise: [
        "Supervision d'équipes commerciales",
        "Gestion des stocks et approvisionnements",
        "Dynamisation des ventes et merchandising",
        "Service client et fidélisation",
        "Optimisation de la rentabilité"
      ],
      // contact: { email: "contact@shopmanager-togo.com" }
    },
    {
      id: 5,
      name: "Magazine Tech & Com",
      logo: "/PHOTOS/partner-magazine.jpeg",
      shortDescription: "Magazine thématique sur les nouvelles technologies de l'information et communication.",
      fullDescription: "Magazine thématique dédié aux nouvelles technologies de l'information et de la communication. Nous couvrons l'actualité tech, les tendances digitales, les innovations africaines et les opportunités du numérique pour les professionnels et passionnés.",
      expertise: [
        "Veille technologique et digitale",
        "Contenu éditorial tech & innovation",
        "Couverture de l'écosystème tech africain",
        "Interviews d'experts et leaders",
        "Guides pratiques et tutoriels"
      ],
      // contact: { email: "redaction@magazine-techcom.com" }
    }
  ];

  // Animation au scroll (comme Publications)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.partner-card');
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

  const toggleExpand = (id: number) => {
    setExpandedPartner(expandedPartner === id ? null : id);
  };

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  const handleImageError = (id: number) => {
    setLoadedImages(prev => ({ ...prev, [id]: false }));
  };

  return (
    <section id="partenaires" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50 scroll-mt-24">
      <div className="container mx-auto px-4">
        
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Nos Partenaires</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les organisations et entreprises qui collaborent avec le Bloc Des Innovateurs.
          </p>
        </div>

        {/* Grille des partenaires */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <Card 
              key={partner.id}
              className="partner-card glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden bg-white flex flex-col"
            >
              {/* ✅ LOGO CENTRÉ AU MILIEU - Zone supérieure */}
              <div className="flex-1 flex items-center justify-center p-8 bg-white min-h-[280px]">
                {!loadedImages[partner.id] && loadedImages[partner.id] !== undefined ? (
                  <Building2 className="w-32 h-32 text-gray-300" />
                ) : (
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="w-full h-full object-contain max-h-48 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onLoad={() => handleImageLoad(partner.id)}
                    onError={() => handleImageError(partner.id)}
                  />
                )}
              </div>

              {/* ✅ BOUTON "Voir plus" EN BAS - Séparé du logo */}
              <div className="p-6 bg-white border-t border-gray-100">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all duration-300"
                  onClick={() => toggleExpand(partner.id)}
                >
                  <ArrowRight className="w-3 h-3 transition-transform" />
                  {expandedPartner === partner.id ? 'Voir moins' : 'Voir plus'}
                  <ChevronDown className={`w-3 h-3 transition-transform ${expandedPartner === partner.id ? 'rotate-180' : ''}`} />
                </Button>

                {/* ✅ CONTENU DÉPLIÉ (quand on clique sur "Voir plus") */}
                {expandedPartner === partner.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 animate-in fade-in">
                    
                    {/* Nom du partenaire */}
                    <h3 className="text-lg font-bold text-gray-800 text-center">
                      {partner.name}
                    </h3>
                    
                    {/* Description complète */}
                    <p className="text-sm text-gray-600 leading-relaxed text-center">
                      {partner.fullDescription}
                    </p>

                    {/* Expertise */}
                    <div className="pt-2">
                      <ul className="space-y-1.5">
                        {partner.expertise.map((item, index) => (
                          <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Email de contact */}
                    {partner.contact?.email && (
                      <a 
                        href={`mailto:${partner.contact.email}`}
                        className="flex items-center justify-center gap-1.5 text-xs text-blue-600 hover:underline pt-3 border-t border-gray-100"
                      >
                        {/* <Mail className="w-3 h-3" />
                        {partner.contact.email} */}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Partners;