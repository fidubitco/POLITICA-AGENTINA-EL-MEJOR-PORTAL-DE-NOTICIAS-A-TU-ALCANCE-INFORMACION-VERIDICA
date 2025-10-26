import { useState, useEffect } from 'react';
import { BBCHeader } from '../components/BBCHeader';
import { MegaSEO } from '../components/MegaSEO';
import { PremiumCard, PremiumButton, PremiumBadge } from '../components/ui/premium';
import { BarChart3, CheckCircle, Clock, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface PollOption {
  id: number;
  option_text: string;
  votes: number;
  percentage: number;
}

interface Poll {
  id: number;
  title: string;
  description: string | null;
  question: string;
  status: string;
  total_votes: number;
  end_date: string | null;
  options: PollOption[];
}

export const Encuestas = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [votedPolls, setVotedPolls] = useState<Set<number>>(new Set());
  const [votingPoll, setVotingPoll] = useState<number | null>(null);

  useEffect(() => {
    loadPolls();
    loadVotedPolls();
  }, []);

  const loadPolls = async () => {
    setLoading(true);
    try {
      // Mock data (reemplazar con API real)
      const mockPolls: Poll[] = [
        {
          id: 1,
          title: 'Aprobación Presidencial Enero 2025',
          description: 'Encuesta mensual sobre la aprobación del gobierno',
          question: '¿Cómo califica la gestión del presidente Javier Milei?',
          status: 'active',
          total_votes: 15420,
          end_date: '2025-01-31',
          options: [
            { id: 1, option_text: 'Muy buena', votes: 4850, percentage: 31.45 },
            { id: 2, option_text: 'Buena', votes: 3850, percentage: 24.97 },
            { id: 3, option_text: 'Regular', votes: 3420, percentage: 22.18 },
            { id: 4, option_text: 'Mala', votes: 2100, percentage: 13.62 },
            { id: 5, option_text: 'Muy mala', votes: 1200, percentage: 7.78 },
          ],
        },
        {
          id: 2,
          title: 'Intención de Voto Legislativas 2025',
          description: 'Encuesta sobre intención de voto para las elecciones legislativas',
          question: '¿A qué partido votaría en las elecciones legislativas?',
          status: 'active',
          total_votes: 8920,
          end_date: '2025-10-20',
          options: [
            { id: 6, option_text: 'La Libertad Avanza', votes: 3200, percentage: 35.87 },
            { id: 7, option_text: 'Unión por la Patria', votes: 2680, percentage: 30.04 },
            { id: 8, option_text: 'Juntos por el Cambio', votes: 2140, percentage: 23.99 },
            { id: 9, option_text: 'Otros', votes: 900, percentage: 10.09 },
          ],
        },
      ];

      setPolls(mockPolls);
    } catch (error) {
      console.error('Error cargando encuestas:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadVotedPolls = () => {
    const voted = localStorage.getItem('voted_polls');
    if (voted) {
      setVotedPolls(new Set(JSON.parse(voted)));
    }
  };

  const handleVote = async (pollId: number, optionId: number) => {
    setVotingPoll(pollId);

    try {
      // Simular API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Actualizar estado local
      const newVotedPolls = new Set(votedPolls);
      newVotedPolls.add(pollId);
      setVotedPolls(newVotedPolls);
      localStorage.setItem('voted_polls', JSON.stringify(Array.from(newVotedPolls)));

      // Actualizar votos en la UI
      setPolls((prevPolls) =>
        prevPolls.map((poll) => {
          if (poll.id === pollId) {
            const newTotalVotes = poll.total_votes + 1;
            const updatedOptions = poll.options.map((option) => {
              if (option.id === optionId) {
                const newVotes = option.votes + 1;
                return {
                  ...option,
                  votes: newVotes,
                  percentage: (newVotes / newTotalVotes) * 100,
                };
              }
              return {
                ...option,
                percentage: (option.votes / newTotalVotes) * 100,
              };
            });

            return {
              ...poll,
              total_votes: newTotalVotes,
              options: updatedOptions,
            };
          }
          return poll;
        })
      );
    } catch (error) {
      console.error('Error votando:', error);
      alert('Error al registrar tu voto');
    } finally {
      setVotingPoll(null);
    }
  };

  const hasVoted = (pollId: number) => votedPolls.has(pollId);

  const getDaysRemaining = (endDate: string | null) => {
    if (!endDate) return null;
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MegaSEO
        title="Encuestas Políticas - Política Argentina"
        description="Participa en nuestras encuestas políticas y conoce la opinión pública en tiempo real."
      />

      <BBCHeader />

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <BarChart3 className="text-green-600" size={40} />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Encuestas Políticas</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Participa y conoce la opinión pública en tiempo real
          </p>
        </motion.div>

        {/* Polls */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Cargando encuestas...</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {polls.map((poll, index) => {
              const voted = hasVoted(poll.id);
              const daysRemaining = getDaysRemaining(poll.end_date);

              return (
                <motion.div
                  key={poll.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PremiumCard>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{poll.title}</h2>
                        {poll.description && (
                          <p className="text-gray-600 mb-4">{poll.description}</p>
                        )}
                        <h3 className="text-lg font-semibold text-gray-800">{poll.question}</h3>
                      </div>
                      {voted && (
                        <PremiumBadge variant="success" icon={<CheckCircle size={16} />}>
                          Ya votaste
                        </PremiumBadge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6 mb-6 pb-6 border-b border-gray-200">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users size={18} />
                        <span className="font-semibold">{poll.total_votes.toLocaleString()} votos</span>
                      </div>
                      {daysRemaining !== null && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock size={18} />
                          <span>
                            {daysRemaining === 0
                              ? 'Finaliza hoy'
                              : `${daysRemaining} días restantes`}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Options */}
                    <div className="space-y-4">
                      {poll.options.map((option) => {
                        const isVoting = votingPoll === poll.id;

                        return (
                          <div key={option.id} className="relative">
                            {/* Progress bar */}
                            {voted && (
                              <div className="absolute inset-0 bg-blue-50 rounded-lg overflow-hidden">
                                <motion.div
                                  className="h-full bg-blue-200"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${option.percentage}%` }}
                                  transition={{ duration: 0.5, delay: 0.1 }}
                                />
                              </div>
                            )}

                            {/* Option button/display */}
                            <button
                              onClick={() => !voted && !isVoting && handleVote(poll.id, option.id)}
                              disabled={voted || isVoting}
                              className={`relative w-full px-6 py-4 rounded-lg border-2 transition text-left ${
                                voted
                                  ? 'border-transparent cursor-default'
                                  : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
                              } ${isVoting ? 'opacity-50' : ''}`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-900">{option.option_text}</span>
                                {voted && (
                                  <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-600">
                                      {option.votes.toLocaleString()} votos
                                    </span>
                                    <span className="text-lg font-bold text-blue-600">
                                      {option.percentage.toFixed(1)}%
                                    </span>
                                  </div>
                                )}
                              </div>
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer */}
                    {!voted && (
                      <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
                        Selecciona una opción para votar. Los resultados se mostrarán después de votar.
                      </div>
                    )}
                  </PremiumCard>
                </motion.div>
              );
            })}
          </div>
        )}

        {polls.length === 0 && !loading && (
          <div className="text-center py-20">
            <BarChart3 className="mx-auto text-gray-400 mb-4" size={64} />
            <p className="text-xl text-gray-600">No hay encuestas activas en este momento</p>
          </div>
        )}
      </div>
    </div>
  );
};

