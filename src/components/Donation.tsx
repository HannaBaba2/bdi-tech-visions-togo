import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Donation = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const predefinedAmounts = [25000, 50000, 100000, 250000, 500000];
  const MIN_AMOUNT = 2500;

  const handleDonation = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (amount >= MIN_AMOUNT && donorInfo.name && donorInfo.email) {
      const message = `🎁 *Nouveau Don reçu !*\n\n👤 Nom : ${donorInfo.name}\n📧 Email : ${donorInfo.email}\n💶 Montant : ${amount.toLocaleString()} FCFA\n💬 Message : ${donorInfo.message || 'Aucun'}\n\n🚀 Vive l’innovation togolaise !`;
      const whatsappUrl = `https://wa.me/22891120671?text=${encodeURIComponent(message)}`;

      toast({
        title: "Merci pour votre don !",
        description: `Votre contribution de ${amount.toLocaleString()} FCFA nous aide à continuer notre mission.`,
      });

      // Reset form
      setDonorInfo({ name: '', email: '', message: '' });
      setCustomAmount('');
      setSelectedAmount(50);

      // Open WhatsApp message
      console.log('Lien WhatsApp généré :', whatsappUrl);
      window.open(whatsappUrl, '_blank');
    } else {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs requis.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="don" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Soutenez notre Mission</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre contribution nous aide à développer l'innovation technologique et à accompagner les entrepreneurs togolais
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <Card className="glass-effect border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Impact de vos dons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    amount: "25 000 FCFA",
                    impact: "Formation d'un jeune entrepreneur",
                    icon: "👨‍🎓",
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    amount: "50 000 FCFA",
                    impact: "Kit de démarrage pour une startup",
                    icon: "🚀",
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    amount: "100 000 FCFA",
                    impact: "Accompagnement d'un projet tech",
                    icon: "💻",
                    color: "from-green-500 to-emerald-500"
                  },
                  {
                    amount: "250 000 FCFA",
                    impact: "Recherche et développement",
                    icon: "🔬",
                    color: "from-orange-500 to-red-500"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-xl`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{item.amount}</div>
                      <div className="text-gray-600">{item.impact}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Pourquoi nous soutenir ?</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Développement de l'écosystème tech togolais</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Formation de la nouvelle génération d'innovateurs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span>Recherche appliquée pour le développement durable</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span>Création d'emplois et de valeur économique</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire de don */}
          <Card className="glass-effect border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">Faire un don</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Montant du don</label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`p-3 rounded-xl font-semibold transition-all duration-300 ${
                        selectedAmount === amount && !customAmount
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                          : 'bg-white/70 text-gray-700 hover:bg-white hover:scale-105'
                      }`}
                    >
                      {amount.toLocaleString()} FCFA
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Montant personnalisé (min. 2 500 FCFA)"
                  min={MIN_AMOUNT}
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(0);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet *</label>
                  <input
                    type="text"
                    value={donorInfo.name}
                    onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={donorInfo.email}
                    onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message (optionnel)</label>
                  <textarea
                    value={donorInfo.message}
                    onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Votre message de soutien..."
                  />
                </div>
              </div>

              <Button
                onClick={handleDonation}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Faire un don de {customAmount ? parseInt(customAmount).toLocaleString() : selectedAmount.toLocaleString()} FCFA
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Vos dons sont sécurisés et contribuent directement à nos projets d'innovation
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Donation;


