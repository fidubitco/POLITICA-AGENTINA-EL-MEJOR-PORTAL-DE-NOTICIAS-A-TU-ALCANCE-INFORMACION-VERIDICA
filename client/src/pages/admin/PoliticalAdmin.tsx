import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { PremiumCard, PremiumButton, PremiumBadge, PremiumInput } from '../../components/ui/premium';
import {
  Users,
  BarChart3,
  Trophy,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Activity,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface Poll {
  id: number;
  title: string;
  question: string;
  status: string;
  total_votes: number;
  options: any[];
}

interface Election {
  id: number;
  title: string;
  election_type: string;
  election_date: string;
  status: string;
  total_votes: number;
}

export const PoliticalAdmin = () => {
  const [activeTab, setActiveTab] = useState<'candidates' | 'polls' | 'elections' | 'updates'>('candidates');
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: 'Javier Milei',
      party: 'La Libertad Avanza',
      position: 'Presidente',
      photo_url: '/images/milei-1.jpg',
      bio: 'Economista y político argentino',
      proposals: 'Dolarización, reducción del gasto público',
      social_media: { twitter: '@JMilei' },
      status: 'active',
    },
  ]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [elections, setElections] = useState<Election[]>([]);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [showCandidateForm, setShowCandidateForm] = useState(false);

  // Candidate Form State
  const [candidateForm, setCandidateForm] = useState({
    name: '',
    party: '',
    position: 'Presidente',
    photo_url: '',
    bio: '',
    proposals: '',
    twitter: '',
    instagram: '',
    facebook: '',
    website: '',
  });

  const handleSaveCandidate = () => {
    if (editingCandidate) {
      // Update existing
      setCandidates(
        candidates.map((c) =>
          c.id === editingCandidate.id
            ? {
                ...c,
                ...candidateForm,
                social_media: {
                  twitter: candidateForm.twitter,
                  instagram: candidateForm.instagram,
                  facebook: candidateForm.facebook,
                  website: candidateForm.website,
                },
              }
            : c
        )
      );
      setEditingCandidate(null);
    } else {
      // Create new
      const newCandidate: Candidate = {
        id: Date.now(),
        name: candidateForm.name,
        party: candidateForm.party,
        position: candidateForm.position,
        photo_url: candidateForm.photo_url || null,
        bio: candidateForm.bio || null,
        proposals: candidateForm.proposals || null,
        social_media: {
          twitter: candidateForm.twitter,
          instagram: candidateForm.instagram,
          facebook: candidateForm.facebook,
          website: candidateForm.website,
        },
        status: 'active',
      };
      setCandidates([...candidates, newCandidate]);
    }
    resetCandidateForm();
    setShowCandidateForm(false);
  };

  const handleEditCandidate = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setCandidateForm({
      name: candidate.name,
      party: candidate.party,
      position: candidate.position,
      photo_url: candidate.photo_url || '',
      bio: candidate.bio || '',
      proposals: candidate.proposals || '',
      twitter: candidate.social_media?.twitter || '',
      instagram: candidate.social_media?.instagram || '',
      facebook: candidate.social_media?.facebook || '',
      website: candidate.social_media?.website || '',
    });
    setShowCandidateForm(true);
  };

  const handleDeleteCandidate = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este candidato?')) {
      setCandidates(candidates.filter((c) => c.id !== id));
    }
  };

  const resetCandidateForm = () => {
    setCandidateForm({
      name: '',
      party: '',
      position: 'Presidente',
      photo_url: '',
      bio: '',
      proposals: '',
      twitter: '',
      instagram: '',
      facebook: '',
      website: '',
    });
    setEditingCandidate(null);
  };

  const tabs = [
    { id: 'candidates', label: 'Candidatos', icon: Users },
    { id: 'polls', label: 'Encuestas', icon: BarChart3 },
    { id: 'elections', label: 'Elecciones', icon: Trophy },
    { id: 'updates', label: 'Actualizaciones', icon: Activity },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Panel Político</h1>
          <p className="text-gray-600">Gestiona candidatos, encuestas y elecciones</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'candidates' && (
            <motion.div
              key="candidates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Gestión de Candidatos</h2>
                <PremiumButton
                  onClick={() => {
                    resetCandidateForm();
                    setShowCandidateForm(true);
                  }}
                  icon={<Plus size={18} />}
                >
                  Nuevo Candidato
                </PremiumButton>
              </div>

              {/* Candidate Form */}
              {showCandidateForm && (
                <PremiumCard className="bg-blue-50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {editingCandidate ? 'Editar Candidato' : 'Nuevo Candidato'}
                    </h3>
                    <button
                      onClick={() => {
                        setShowCandidateForm(false);
                        resetCandidateForm();
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PremiumInput
                      label="Nombre Completo"
                      value={candidateForm.name}
                      onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
                      placeholder="Ej: Javier Milei"
                      required
                    />
                    <PremiumInput
                      label="Partido Político"
                      value={candidateForm.party}
                      onChange={(e) => setCandidateForm({ ...candidateForm, party: e.target.value })}
                      placeholder="Ej: La Libertad Avanza"
                      required
                    />
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Posición
                      </label>
                      <select
                        value={candidateForm.position}
                        onChange={(e) =>
                          setCandidateForm({ ...candidateForm, position: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      >
                        <option value="Presidente">Presidente</option>
                        <option value="Diputado">Diputado</option>
                        <option value="Senador">Senador</option>
                        <option value="Gobernador">Gobernador</option>
                        <option value="Intendente">Intendente</option>
                      </select>
                    </div>
                    <PremiumInput
                      label="URL de Foto"
                      value={candidateForm.photo_url}
                      onChange={(e) =>
                        setCandidateForm({ ...candidateForm, photo_url: e.target.value })
                      }
                      placeholder="https://..."
                    />
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Biografía
                      </label>
                      <textarea
                        value={candidateForm.bio}
                        onChange={(e) => setCandidateForm({ ...candidateForm, bio: e.target.value })}
                        placeholder="Breve biografía del candidato..."
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Propuestas
                      </label>
                      <textarea
                        value={candidateForm.proposals}
                        onChange={(e) =>
                          setCandidateForm({ ...candidateForm, proposals: e.target.value })
                        }
                        placeholder="Principales propuestas del candidato..."
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      />
                    </div>
                    <PremiumInput
                      label="Twitter"
                      value={candidateForm.twitter}
                      onChange={(e) =>
                        setCandidateForm({ ...candidateForm, twitter: e.target.value })
                      }
                      placeholder="@usuario"
                    />
                    <PremiumInput
                      label="Instagram"
                      value={candidateForm.instagram}
                      onChange={(e) =>
                        setCandidateForm({ ...candidateForm, instagram: e.target.value })
                      }
                      placeholder="@usuario"
                    />
                    <PremiumInput
                      label="Facebook"
                      value={candidateForm.facebook}
                      onChange={(e) =>
                        setCandidateForm({ ...candidateForm, facebook: e.target.value })
                      }
                      placeholder="usuario"
                    />
                    <PremiumInput
                      label="Sitio Web"
                      value={candidateForm.website}
                      onChange={(e) =>
                        setCandidateForm({ ...candidateForm, website: e.target.value })
                      }
                      placeholder="https://..."
                    />
                  </div>

                  <div className="flex gap-3 mt-6">
                    <PremiumButton onClick={handleSaveCandidate} icon={<Save size={18} />}>
                      {editingCandidate ? 'Actualizar' : 'Guardar'}
                    </PremiumButton>
                    <PremiumButton
                      onClick={() => {
                        setShowCandidateForm(false);
                        resetCandidateForm();
                      }}
                      variant="secondary"
                    >
                      Cancelar
                    </PremiumButton>
                  </div>
                </PremiumCard>
              )}

              {/* Candidates List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {candidates.map((candidate) => (
                  <PremiumCard key={candidate.id}>
                    {candidate.photo_url && (
                      <img
                        src={candidate.photo_url}
                        alt={candidate.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{candidate.name}</h3>
                    <p className="text-gray-600 mb-1">{candidate.party}</p>
                    <PremiumBadge className="mb-4">{candidate.position}</PremiumBadge>
                    {candidate.bio && (
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{candidate.bio}</p>
                    )}
                    <div className="flex gap-2">
                      <PremiumButton
                        onClick={() => handleEditCandidate(candidate)}
                        variant="secondary"
                        icon={<Edit size={16} />}
                        className="flex-1"
                      >
                        Editar
                      </PremiumButton>
                      <button
                        onClick={() => handleDeleteCandidate(candidate.id)}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </PremiumCard>
                ))}
              </div>

              {candidates.length === 0 && (
                <div className="text-center py-20">
                  <Users className="mx-auto text-gray-400 mb-4" size={64} />
                  <p className="text-xl text-gray-600 mb-4">No hay candidatos registrados</p>
                  <PremiumButton
                    onClick={() => setShowCandidateForm(true)}
                    icon={<Plus size={18} />}
                  >
                    Agregar Primer Candidato
                  </PremiumButton>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'polls' && (
            <motion.div
              key="polls"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PremiumCard>
                <div className="text-center py-20">
                  <BarChart3 className="mx-auto text-gray-400 mb-4" size={64} />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Gestión de Encuestas
                  </h3>
                  <p className="text-gray-600 mb-6">Próximamente disponible</p>
                  <PremiumButton icon={<Plus size={18} />}>Crear Encuesta</PremiumButton>
                </div>
              </PremiumCard>
            </motion.div>
          )}

          {activeTab === 'elections' && (
            <motion.div
              key="elections"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PremiumCard>
                <div className="text-center py-20">
                  <Trophy className="mx-auto text-gray-400 mb-4" size={64} />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Gestión de Elecciones
                  </h3>
                  <p className="text-gray-600 mb-6">Próximamente disponible</p>
                  <PremiumButton icon={<Plus size={18} />}>Crear Elección</PremiumButton>
                </div>
              </PremiumCard>
            </motion.div>
          )}

          {activeTab === 'updates' && (
            <motion.div
              key="updates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PremiumCard>
                <div className="text-center py-20">
                  <Activity className="mx-auto text-gray-400 mb-4" size={64} />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Actualizaciones en Vivo
                  </h3>
                  <p className="text-gray-600 mb-6">Próximamente disponible</p>
                  <PremiumButton icon={<Plus size={18} />}>Nueva Actualización</PremiumButton>
                </div>
              </PremiumCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

