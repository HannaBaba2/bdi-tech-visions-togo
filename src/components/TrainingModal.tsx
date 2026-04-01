// src/components/TrainingModal.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  BookOpen, 
  Target, 
  Users, 
  DollarSign, 
  Phone, 
  Mail, 
  Download,
  AlertCircle
} from 'lucide-react'; // ← ExternalLink supprimé

// Types pour les données de formation
export type TrainingSession = {
  id: number;
  dates: string;
  time: string;
  format: string;
};

export type TrainingDetails = {
  theme: string;
  description: string;
  program: string[];
  objectives: string[];
  targetAudience: string[];
  sessions: TrainingSession[];
  pricing: {
    inscription: string;
    participation: string;
  };
  contact: {
    phone: string;
    email: string;
    maxParticipants: number;
  };
  registrationUrl?: string;
};

export type TrainingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  title: string;
  authors: string;
  color: string;
  details: TrainingDetails;
  posterUrl?: string;
};

const TrainingModal: React.FC<TrainingModalProps> = ({
  isOpen,
  onClose,
  onDownload,
  title,
  authors,
  color,
  details
}) => {
  if (!isOpen) return null;

  //  handleRegistration supprimé car plus utilisé (inscription se fait sur la page)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 modal-appear">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-up border-4 border-blue-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête coloré */}
        <div className={`sticky top-0 bg-gradient-to-r ${color} text-white p-6 rounded-t-2xl`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold pr-8">{title}</h2>
          <p className="text-white/90 mt-1">{authors}</p>
        </div>

        {/* Contenu de la modal */}
        <div className="p-6 space-y-6">
          
          {/* Description */}
          <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-500">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {details.theme}
            </h3>
            <p className="text-gray-700">{details.description}</p>
          </div>

          {/* Sessions */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Sessions de formation
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {details.sessions.map((session) => (
                <div key={session.id} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-900">{session.dates}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700 text-sm">{session.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600 text-sm">{session.format}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Programme */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Programme
            </h3>
            <ul className="space-y-2">
              {details.program.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Objectifs */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-500" />
              Objectifs
            </h3>
            <ul className="space-y-2">
              {details.objectives.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Public cible */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              Public cible
            </h3>
            <ul className="space-y-2">
              {details.targetAudience.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tarifs */}
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-600" />
              Investissement
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-4 text-center border border-amber-100">
                <p className="text-sm text-gray-600 mb-1">Inscription</p>
                <p className="text-2xl font-bold text-amber-600">{details.pricing.inscription}</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-amber-100">
                <p className="text-sm text-gray-600 mb-1">Participation</p>
                <p className="text-2xl font-bold text-orange-600">{details.pricing.participation}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-amber-700 bg-amber-100/50 rounded-lg p-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p className="text-sm font-medium">
                Places limitées à {details.contact.maxParticipants} apprenants !
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-500" />
              Contact & Inscriptions
            </h3>
            <div className="space-y-3">
              <a 
                href={`tel:${details.contact.phone}`} 
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <Phone className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700 font-medium">{details.contact.phone}</span>
              </a>
              <a 
                href={`mailto:${details.contact.email}`} 
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <Mail className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700">{details.contact.email}</span>
              </a>
            </div>
          </div>

          {/*  Bouton d'action : UNIQUEMENT Télécharger l'affiche */}
          <div className="pt-2">
            <Button 
              variant="outline"
              className="w-full hover:scale-105 transition-transform py-6 text-lg font-semibold inline-flex items-center justify-center gap-2"
              onClick={onDownload}
            >
              <Download className="w-5 h-5" />
              Télécharger l'affiche
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TrainingModal;