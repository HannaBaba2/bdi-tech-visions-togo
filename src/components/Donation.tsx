import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Gift, 
  User, 
  Mail, 
  Coins, 
  MessageCircle, 
  Rocket, 
  GraduationCap, 
  Laptop, 
  FlaskConical,
  CheckCircle,
  Heart,
  Sparkles,
  ArrowRight,
  Shield
} from 'lucide-react';

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
      const message = `🎁 *Nouveau Don reçu !*\n\n👤 Nom : ${donorInfo.name}\n📧 Email : ${donorInfo.email}\n💶 Montant : ${amount.toLocaleString()} FCFA\n💬 Message : ${donorInfo.message || 'Aucun'}\n\n🚀 Vive l'innovation togolaise !`;
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
            {/* Impact Cards */}
            <Card className="glass-effect border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                  Impact de vos dons
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    amount: "25 000 FCFA",
                    impact: "Formation d'un jeune entrepreneur",
                    icon: GraduationCap,
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    amount: "50 000 FCFA",
                    impact: "Kit de démarrage pour une startup",
                    icon: Rocket,
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    amount: "100 000 FCFA",
                    impact: "Accompagnement d'un projet tech",
                    icon: Laptop,
                    color: "from-green-500 to-emerald-500"
                  },
                  {
                    amount: "250 000 FCFA",
                    impact: "Recherche et développement",
                    icon: FlaskConical,
                    color: "from-orange-500 to-red-500"
                  }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index} 
                      className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-md`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{item.amount}</div>
                        <div className="text-gray-600 text-sm">{item.impact}</div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Pourquoi nous soutenir */}
            <Card className="glass-effect border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Pourquoi nous soutenir ?
                </h3>
                <ul className="space-y-3">
                  {[
                    { text: "Développement de l'écosystème tech togolais", color: "text-blue-500" },
                    { text: "Formation de la nouvelle génération d'innovateurs", color: "text-green-500" },
                    { text: "Recherche appliquée pour le développement durable", color: "text-purple-500" },
                    { text: "Création d'emplois et de valeur économique", color: "text-orange-500" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3 text-gray-600">
                      <CheckCircle className={`w-4 h-4 ${item.color} flex-shrink-0`} />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Sécurité des dons */}
            <Card className="glass-effect border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">
                    Vos dons sont sécurisés et contribuent directement à nos projets d'innovation
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire de don */}
          <Card className="glass-effect border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Gift className="w-6 h-6 text-blue-600" />
                Faire un don
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Sélection du montant */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-green-600" />
                  Montant du don
                </label>
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

              {/* Informations du donateur */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={donorInfo.name}
                    onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    Email *
                  </label>
                  <input
                    type="email"
                    value={donorInfo.email}
                    onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    Message (optionnel)
                  </label>
                  <textarea
                    value={donorInfo.message}
                    onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Votre message de soutien..."
                  />
                </div>
              </div>

              {/* Bouton de don */}
              <Button
                onClick={handleDonation}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Faire un don de {customAmount ? parseInt(customAmount).toLocaleString() : selectedAmount.toLocaleString()} FCFA
                <ArrowRight className="w-4 h-4" />
              </Button>

              {/* Note de sécurité */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                <span>Paiement sécurisé • Impact direct</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Donation;