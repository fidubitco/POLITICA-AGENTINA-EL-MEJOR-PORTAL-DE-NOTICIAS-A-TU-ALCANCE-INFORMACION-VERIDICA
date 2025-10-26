import { useState, useEffect } from 'react';
import { BBCHeader } from '../components/BBCHeader';
import { MegaSEO } from '../components/MegaSEO';
import { PremiumCard, PremiumBadge } from '../components/ui/premium';
import { Trophy, TrendingUp, Users, MapPin, Calendar, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ElectionResult {
  id: number;
  candidate_id: number;
  candidate_name: string;
  party: string;
  votes: number;
  percentage: number;
  position: number;
  province: string | null;
}

interface Election {
  id: number;
  title: string;
  description: string | null;
  election_type: string;
  election_date: string;
  status: string;
  total_votes: number;
  participation_rate: number | null;
  results: ElectionResult[];
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export const ResultadosElectorales = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [liveUpdates, setLiveUpdates] = useState<any[]>([]);

  useEffect(() => {
    loadElections();
    loadLiveUpdates();
    
    // Auto-refresh cada 30 segundos
    const interval = setInterval(() => {
      loadElections();
      loadLiveUpdates();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadElections = async () => {
    setLoading(true);
    try {
      // Mock data (reemplazar con API real)
      const mockElections: Election[] = [
        {
          id: 1,
          title: 'Elecciones Presidenciales 2023',
          description: 'Segunda vuelta electoral',
          election_type: 'Presidencial',
          election_date: '2023-11-19',
          status: 'completed',
          total_votes: 26000000,
          participation_rate: 78.5,
          results: [
            {
              id: 1,
              candidate_id: 1,
              candidate_name: 'Javier Milei',
              party: 'La Libertad Avanza',
              votes: 14500000,
              percentage: 55.69,
              position: 1,
              province: null,
            },
            {
              id: 2,
              candidate_id: 2,
              candidate_name: 'Sergio Massa',
              party: 'Unión por la Patria',
              votes: 11500000,
              percentage: 44.31,
              position: 2,
              province: null,
            },
          ],
        },
        {
          id: 2,
          title: 'Elecciones Legislativas 2025',
          description: 'Renovación parcial del Congreso',
          election_type: 'Legislativa',
          election_date: '2025-10-26',
          status: 'in_progress',
          total_votes: 8500000,
          participation_rate: 62.3,
          results: [
            {
              id: 3,
              candidate_id: 1,
              candidate_name: 'La Libertad Avanza',
              party: 'La Libertad Avanza',
              votes: 3200000,
              percentage: 37.65,
              position: 1,
              province: null,
            },
            {
              id: 4,
              candidate_id: 2,
              candidate_name: 'Unión por la Patria',
              party: 'Unión por la Patria',
              votes: 2800000,
              percentage: 32.94,
              position: 2,
              province: null,
            },
            {
              id: 5,
              candidate_id: 3,
              candidate_name: 'Juntos por el Cambio',
              party: 'Juntos por el Cambio',
              votes: 2500000,
              percentage: 29.41,
              position: 3,
              province: null,
            },
          ],
        },
      ];

      setElections(mockElections);
      if (!selectedElection && mockElections.length > 0) {
        setSelectedElection(mockElections[0].id);
      }
    } catch (error) {
      console.error('Error cargando elecciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLiveUpdates = async () => {
    try {
      // Mock data
      const mockUpdates = [
        {
          id: 1,
          title: 'Cierre de mesas en Buenos Aires',
          content: 'Se han cerrado todas las mesas electorales en CABA',
          importance: 'high',
          created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        },
        {
          id: 2,
          title: 'Primeros resultados provisionales',
          content: 'Comienza el conteo de votos en las principales ciudades',
          importance: 'critical',
          created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        },
      ];
      setLiveUpdates(mockUpdates);
    } catch (error) {
      console.error('Error cargando actualizaciones:', error);
    }
  };

  const currentElection = elections.find((e) => e.id === selectedElection);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <PremiumBadge variant="success">Finalizada</PremiumBadge>;
      case 'in_progress':
        return <PremiumBadge variant="warning" icon={<Activity size={16} className="animate-pulse" />}>En Curso</PremiumBadge>;
      case 'upcoming':
        return <PremiumBadge variant="info">Próxima</PremiumBadge>;
      default:
        return <PremiumBadge>Desconocido</PremiumBadge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Hace un momento';
    if (minutes < 60) return `Hace ${minutes} minutos`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Hace ${hours} horas`;
    return `Hace ${Math.floor(hours / 24)} días`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MegaSEO
        title="Resultados Electorales - Política Argentina"
        description="Resultados electorales en tiempo real. Seguimiento de elecciones presidenciales y legislativas."
      />

      <BBCHeader />

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
            <Trophy className="text-purple-600" size={40} />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Resultados Electorales</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Seguimiento en tiempo real de las elecciones en Argentina
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Cargando resultados...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Election Selector */}
              <div className="flex flex-wrap gap-3">
                {elections.map((election) => (
                  <button
                    key={election.id}
                    onClick={() => setSelectedElection(election.id)}
                    className={`px-6 py-3 rounded-full font-semibold transition ${
                      selectedElection === election.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {election.title}
                  </button>
                ))}
              </div>

              {currentElection && (
                <>
                  {/* Election Info */}
                  <PremiumCard>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          {currentElection.title}
                        </h2>
                        {currentElection.description && (
                          <p className="text-gray-600 mb-4">{currentElection.description}</p>
                        )}
                      </div>
                      {getStatusBadge(currentElection.status)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <Calendar size={18} />
                          <span className="text-sm">Fecha</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {formatDate(currentElection.election_date)}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <Users size={18} />
                          <span className="text-sm">Votos</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {currentElection.total_votes.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <TrendingUp size={18} />
                          <span className="text-sm">Participación</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {currentElection.participation_rate?.toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <MapPin size={18} />
                          <span className="text-sm">Tipo</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {currentElection.election_type}
                        </p>
                      </div>
                    </div>
                  </PremiumCard>

                  {/* Results */}
                  <PremiumCard>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Resultados</h3>

                    {/* Bar Chart */}
                    <div className="mb-8">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={currentElection.results}>
                          <XAxis dataKey="candidate_name" angle={-45} textAnchor="end" height={100} />
                          <YAxis />
                          <Tooltip formatter={(value: any) => `${value.toLocaleString()} votos`} />
                          <Bar dataKey="votes" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Results List */}
                    <div className="space-y-4">
                      {currentElection.results
                        .sort((a, b) => a.position - b.position)
                        .map((result, index) => (
                          <motion.div
                            key={result.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                          >
                            {/* Progress bar */}
                            <div className="absolute inset-0 bg-blue-50 rounded-lg overflow-hidden">
                              <motion.div
                                className={`h-full ${
                                  result.position === 1 ? 'bg-green-200' : 'bg-blue-200'
                                }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${result.percentage}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                              />
                            </div>

                            {/* Content */}
                            <div className="relative px-6 py-4 flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                {result.position === 1 && (
                                  <Trophy className="text-yellow-500" size={24} />
                                )}
                                <div>
                                  <h4 className="text-lg font-bold text-gray-900">
                                    {result.candidate_name}
                                  </h4>
                                  <p className="text-sm text-gray-600">{result.party}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-blue-600">
                                  {result.percentage.toFixed(2)}%
                                </p>
                                <p className="text-sm text-gray-600">
                                  {result.votes.toLocaleString()} votos
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </PremiumCard>

                  {/* Pie Chart */}
                  <PremiumCard>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Distribución de Votos</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          data={currentElection.results}
                          dataKey="votes"
                          nameKey="candidate_name"
                          cx="50%"
                          cy="50%"
                          outerRadius={120}
                          label={(entry) => `${entry.percentage.toFixed(1)}%`}
                        >
                          {currentElection.results.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => `${value.toLocaleString()} votos`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </PremiumCard>
                </>
              )}
            </div>

            {/* Sidebar - Live Updates */}
            <div className="lg:col-span-1">
              <PremiumCard className="sticky top-6">
                <div className="flex items-center gap-2 mb-6">
                  <Activity className="text-red-500 animate-pulse" size={24} />
                  <h3 className="text-xl font-bold text-gray-900">Actualizaciones en Vivo</h3>
                </div>

                <div className="space-y-4">
                  {liveUpdates.map((update) => (
                    <div
                      key={update.id}
                      className={`p-4 rounded-lg border-l-4 ${
                        update.importance === 'critical'
                          ? 'bg-red-50 border-red-500'
                          : update.importance === 'high'
                          ? 'bg-orange-50 border-orange-500'
                          : 'bg-blue-50 border-blue-500'
                      }`}
                    >
                      <h4 className="font-semibold text-gray-900 mb-1">{update.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{update.content}</p>
                      <p className="text-xs text-gray-500">{formatTimeAgo(update.created_at)}</p>
                    </div>
                  ))}
                </div>

                {liveUpdates.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Activity size={48} className="mx-auto mb-2 opacity-30" />
                    <p>No hay actualizaciones recientes</p>
                  </div>
                )}
              </PremiumCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

