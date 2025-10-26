import { useState, useEffect } from 'react';
import { BBCHeader } from '../components/BBCHeader';
import { MegaSEO } from '../components/MegaSEO';
import { PremiumCard, PremiumBadge } from '../components/ui/premium';
import { Users, MapPin, Calendar, ExternalLink, Twitter, Facebook, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface Candidate {
  id: number;
  name: string;
  party: string;
  position: string;
  photo_url: string | null;
  bio: string | null;
  proposals: string | null;
  social_media: any;
  status: string;
}

export const Candidatos = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState<string>('all');

  useEffect(() => {
    loadCandidates();
  }, [selectedPosition]);

  const loadCandidates = async () => {
    setLoading(true);
    try {
      // Datos mock (reemplazar con API real)
      const mockCandidates: Candidate[] = [
        {
          id: 1,
          name: 'Javier Milei',
          party: 'La Libertad Avanza',
          position: 'Presidente',
          photo_url: '/images/milei-1.jpg',
          bio: 'Economista y político argentino. Presidente de Argentina desde 2023.',
          proposals: 'Dolarización de la economía, reducción del gasto público, reforma del Estado.',
          social_media: { twitter: '@JMilei', instagram: '@javiermilei' },
          status: 'active',
        },
        {
          id: 2,
          name: 'Sergio Massa',
          party: 'Unión por la Patria',
          position: 'Presidente',
          photo_url: '/images/casa-rosada-1.jpg',
          bio: 'Político y abogado argentino. Ex Ministro de Economía.',
          proposals: 'Estabilidad económica, desarrollo productivo, justicia social.',
          social_media: { twitter: '@SergioMassa', instagram: '@sergiomasaok' },
          status: 'active',
        },
        {
          id: 3,
          name: 'Patricia Bullrich',
          party: 'Juntos por el Cambio',
          position: 'Presidente',
          photo_url: '/images/casa-rosada-2.jpg',
          bio: 'Política argentina. Ex Ministra de Seguridad.',
          proposals: 'Seguridad ciudadana, combate al narcotráfico, reforma judicial.',
          social_media: { twitter: '@PatoBullrich', instagram: '@patobullrich' },
          status: 'active',
        },
      ];

      setCandidates(mockCandidates);
    } catch (error) {
      console.error('Error cargando candidatos:', error);
    } finally {
      setLoading(false);
    }
  };

  const positions = ['Presidente', 'Diputado', 'Senador', 'Gobernador'];

  const filteredCandidates =
    selectedPosition === 'all'
      ? candidates
      : candidates.filter((c) => c.position === selectedPosition);

  return (
    <div className="min-h-screen bg-gray-50">
      <MegaSEO
        title="Candidatos Políticos - Política Argentina"
        description="Conoce a los candidatos políticos de Argentina. Biografías, propuestas y redes sociales."
      />

      <BBCHeader />

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Users className="text-blue-600" size={40} />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Candidatos Políticos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conoce a los candidatos, sus propuestas y trayectorias políticas
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => setSelectedPosition('all')}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              selectedPosition === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Todos
          </button>
          {positions.map((position) => (
            <button
              key={position}
              onClick={() => setSelectedPosition(position)}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                selectedPosition === position
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {position}
            </button>
          ))}
        </div>

        {/* Candidates Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Cargando candidatos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCandidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PremiumCard className="h-full hover:shadow-2xl transition-shadow">
                  {/* Photo */}
                  <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-xl">
                    <img
                      src={candidate.photo_url || '/images/default-avatar.jpg'}
                      alt={candidate.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1">{candidate.name}</h3>
                      <PremiumBadge variant="info" className="bg-white/20 text-white border-white/30">
                        {candidate.position}
                      </PremiumBadge>
                    </div>
                  </div>

                  {/* Party */}
                  <div className="flex items-center gap-2 mb-4 text-gray-600">
                    <MapPin size={18} />
                    <span className="font-semibold">{candidate.party}</span>
                  </div>

                  {/* Bio */}
                  {candidate.bio && (
                    <p className="text-gray-700 mb-4 line-clamp-3">{candidate.bio}</p>
                  )}

                  {/* Proposals */}
                  {candidate.proposals && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Propuestas:</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{candidate.proposals}</p>
                    </div>
                  )}

                  {/* Social Media */}
                  {candidate.social_media && (
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      {candidate.social_media.twitter && (
                        <a
                          href={`https://twitter.com/${candidate.social_media.twitter.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition"
                        >
                          <Twitter size={18} />
                          <span className="text-sm">Twitter</span>
                        </a>
                      )}
                      {candidate.social_media.instagram && (
                        <a
                          href={`https://instagram.com/${candidate.social_media.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition"
                        >
                          <Instagram size={18} />
                          <span className="text-sm">Instagram</span>
                        </a>
                      )}
                      {candidate.social_media.website && (
                        <a
                          href={candidate.social_media.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-700 transition"
                        >
                          <ExternalLink size={18} />
                          <span className="text-sm">Web</span>
                        </a>
                      )}
                    </div>
                  )}
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        )}

        {filteredCandidates.length === 0 && !loading && (
          <div className="text-center py-20">
            <Users className="mx-auto text-gray-400 mb-4" size={64} />
            <p className="text-xl text-gray-600">No hay candidatos para mostrar</p>
          </div>
        )}
      </div>
    </div>
  );
};

