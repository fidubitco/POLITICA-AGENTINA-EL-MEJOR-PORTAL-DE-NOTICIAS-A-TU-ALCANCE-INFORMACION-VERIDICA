/**
 * 🗳️ POLLS & VOTING SERVICE - Sistema de Encuestas y Votaciones
 */

import { db } from '../db';

export interface Candidate {
  id: number;
  name: string;
  party: string;
  position: string;
  province?: string;
  photo_url?: string;
  bio?: string;
  proposals?: string;
  social_twitter?: string;
  social_facebook?: string;
  social_instagram?: string;
  website?: string;
  status: 'active' | 'inactive' | 'retired';
  stats?: CandidateStats;
}

export interface CandidateStats {
  total_ratings: number;
  avg_leadership: number;
  avg_proposals: number;
  avg_honesty: number;
  avg_experience: number;
  avg_communication: number;
  avg_overall: number;
  total_votes: number;
  approval_rating: number;
}

export interface Poll {
  id: number;
  title: string;
  description?: string;
  question: string;
  poll_type: 'presidential' | 'legislative' | 'gubernatorial' | 'approval' | 'general';
  province?: string;
  start_date: Date;
  end_date?: Date;
  status: 'draft' | 'active' | 'closed' | 'archived';
  total_votes: number;
  is_featured: boolean;
  options?: PollOption[];
}

export interface PollOption {
  id: number;
  poll_id: number;
  candidate_id?: number;
  option_text: string;
  option_order: number;
  votes: number;
  percentage: number;
  color: string;
  candidate?: Candidate;
}

export interface Campaign {
  id: number;
  candidate_id: number;
  campaign_name: string;
  slogan?: string;
  description?: string;
  start_date?: Date;
  end_date?: Date;
  budget?: number;
  status: 'planning' | 'active' | 'completed' | 'suspended';
  province?: string;
  target_position?: string;
  candidate?: Candidate;
}

export interface ElectionResult {
  id: number;
  election_name: string;
  election_type: 'presidential' | 'legislative' | 'gubernatorial' | 'municipal';
  election_date: Date;
  province?: string;
  candidate_id?: number;
  party: string;
  votes: number;
  percentage: number;
  position?: number;
  is_winner: boolean;
  total_eligible_voters?: number;
  turnout_percentage?: number;
  candidate?: Candidate;
}

// ============================================
// CANDIDATES
// ============================================

export async function getAllCandidates(): Promise<Candidate[]> {
  const candidates = await db.query<Candidate>(
    `SELECT pc.*, cs.* 
     FROM political_candidates pc
     LEFT JOIN candidate_stats cs ON pc.id = cs.candidate_id
     WHERE pc.status = 'active'
     ORDER BY cs.avg_overall DESC, pc.name ASC`
  );
  return candidates;
}

export async function getCandidateById(id: number): Promise<Candidate | null> {
  const candidate = await db.queryOne<Candidate>(
    `SELECT pc.*, cs.* 
     FROM political_candidates pc
     LEFT JOIN candidate_stats cs ON pc.id = cs.candidate_id
     WHERE pc.id = ?`,
    [id]
  );
  return candidate;
}

export async function createCandidate(data: Partial<Candidate>): Promise<number> {
  const id = await db.insert('political_candidates', data);
  
  // Inicializar estadísticas
  await db.insert('candidate_stats', {
    candidate_id: id,
    total_ratings: 0,
    avg_overall: 0,
    approval_rating: 0,
  });
  
  return id;
}

export async function updateCandidate(id: number, data: Partial<Candidate>): Promise<void> {
  await db.update('political_candidates', data, 'id = ?', [id]);
}

export async function deleteCandidate(id: number): Promise<void> {
  await db.delete('political_candidates', 'id = ?', [id]);
}

// ============================================
// POLLS
// ============================================

export async function getAllPolls(status?: string): Promise<Poll[]> {
  let query = `
    SELECT pp.*, 
           COUNT(DISTINCT po.id) as total_options,
           COUNT(DISTINCT pv.id) as actual_votes
    FROM political_polls pp
    LEFT JOIN poll_options po ON pp.id = po.poll_id
    LEFT JOIN poll_votes pv ON pp.id = pv.poll_id
  `;
  
  const params: any[] = [];
  if (status) {
    query += ' WHERE pp.status = ?';
    params.push(status);
  }
  
  query += ' GROUP BY pp.id ORDER BY pp.is_featured DESC, pp.created_at DESC';
  
  const polls = await db.query<Poll>(query, params);
  
  // Cargar opciones para cada encuesta
  for (const poll of polls) {
    poll.options = await getPollOptions(poll.id);
  }
  
  return polls;
}

export async function getPollById(id: number): Promise<Poll | null> {
  const poll = await db.queryOne<Poll>(
    'SELECT * FROM political_polls WHERE id = ?',
    [id]
  );
  
  if (poll) {
    poll.options = await getPollOptions(id);
  }
  
  return poll;
}

export async function getPollOptions(pollId: number): Promise<PollOption[]> {
  const options = await db.query<PollOption>(
    `SELECT po.*, pc.name as candidate_name, pc.party, pc.photo_url
     FROM poll_options po
     LEFT JOIN political_candidates pc ON po.candidate_id = pc.id
     WHERE po.poll_id = ?
     ORDER BY po.option_order ASC`,
    [pollId]
  );
  return options;
}

export async function createPoll(data: Partial<Poll>): Promise<number> {
  const id = await db.insert('political_polls', {
    ...data,
    total_votes: 0,
    status: data.status || 'draft',
  });
  return id;
}

export async function updatePoll(id: number, data: Partial<Poll>): Promise<void> {
  await db.update('political_polls', data, 'id = ?', [id]);
}

export async function deletePoll(id: number): Promise<void> {
  await db.delete('political_polls', 'id = ?', [id]);
}

export async function addPollOption(data: Partial<PollOption>): Promise<number> {
  const id = await db.insert('poll_options', {
    ...data,
    votes: 0,
    percentage: 0,
  });
  return id;
}

export async function updatePollOption(id: number, data: Partial<PollOption>): Promise<void> {
  await db.update('poll_options', data, 'id = ?', [id]);
}

export async function deletePollOption(id: number): Promise<void> {
  await db.delete('poll_options', 'id = ?', [id]);
}

// ============================================
// VOTING
// ============================================

export async function castVote(
  pollId: number,
  optionId: number,
  userId?: number,
  ipAddress?: string,
  userAgent?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Verificar si ya votó
    const existingVote = await db.queryOne(
      'SELECT id FROM poll_votes WHERE poll_id = ? AND (user_id = ? OR ip_address = ?)',
      [pollId, userId || null, ipAddress || null]
    );
    
    if (existingVote) {
      return { success: false, error: 'Ya has votado en esta encuesta' };
    }
    
    // Registrar voto
    await db.insert('poll_votes', {
      poll_id: pollId,
      option_id: optionId,
      user_id: userId,
      ip_address: ipAddress,
      user_agent: userAgent,
    });
    
    // Los triggers de la base de datos actualizarán automáticamente:
    // - poll_options.votes
    // - poll_options.percentage
    // - political_polls.total_votes
    
    return { success: true };
  } catch (error: any) {
    console.error('Error casting vote:', error);
    return { success: false, error: 'Error al registrar el voto' };
  }
}

export async function hasUserVoted(pollId: number, userId?: number, ipAddress?: string): Promise<boolean> {
  const vote = await db.queryOne(
    'SELECT id FROM poll_votes WHERE poll_id = ? AND (user_id = ? OR ip_address = ?)',
    [pollId, userId || null, ipAddress || null]
  );
  return !!vote;
}

// ============================================
// RATINGS
// ============================================

export async function rateCand(
  candidateId: number,
  rating: number,
  category: string,
  userId?: number,
  comment?: string,
  ipAddress?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (rating < 1 || rating > 5) {
      return { success: false, error: 'La calificación debe estar entre 1 y 5' };
    }
    
    // Verificar si ya calificó en esta categoría
    const existing = await db.queryOne(
      'SELECT id FROM candidate_ratings WHERE candidate_id = ? AND category = ? AND (user_id = ? OR ip_address = ?)',
      [candidateId, category, userId || null, ipAddress || null]
    );
    
    if (existing) {
      // Actualizar calificación existente
      await db.update('candidate_ratings', 
        { rating, comment, updated_at: new Date() },
        'id = ?',
        [existing.id]
      );
    } else {
      // Crear nueva calificación
      await db.insert('candidate_ratings', {
        candidate_id: candidateId,
        user_id: userId,
        rating,
        category,
        comment,
        ip_address: ipAddress,
      });
    }
    
    // El trigger actualizará automáticamente candidate_stats
    
    return { success: true };
  } catch (error: any) {
    console.error('Error rating candidate:', error);
    return { success: false, error: 'Error al registrar la calificación' };
  }
}

export async function getCandidateRatings(candidateId: number): Promise<any> {
  const stats = await db.queryOne(
    'SELECT * FROM candidate_stats WHERE candidate_id = ?',
    [candidateId]
  );
  
  const recentRatings = await db.query(
    `SELECT cr.*, u.name as user_name
     FROM candidate_ratings cr
     LEFT JOIN users u ON cr.user_id = u.id
     WHERE cr.candidate_id = ?
     ORDER BY cr.created_at DESC
     LIMIT 10`,
    [candidateId]
  );
  
  return {
    stats,
    recent_ratings: recentRatings,
  };
}

// ============================================
// CAMPAIGNS
// ============================================

export async function getAllCampaigns(): Promise<Campaign[]> {
  const campaigns = await db.query<Campaign>(
    `SELECT pc.*, cand.name as candidate_name, cand.party, cand.photo_url
     FROM political_campaigns pc
     LEFT JOIN political_candidates cand ON pc.candidate_id = cand.id
     ORDER BY pc.start_date DESC`
  );
  return campaigns;
}

export async function getCampaignById(id: number): Promise<Campaign | null> {
  const campaign = await db.queryOne<Campaign>(
    `SELECT pc.*, cand.*
     FROM political_campaigns pc
     LEFT JOIN political_candidates cand ON pc.candidate_id = cand.id
     WHERE pc.id = ?`,
    [id]
  );
  return campaign;
}

export async function createCampaign(data: Partial<Campaign>): Promise<number> {
  const id = await db.insert('political_campaigns', data);
  return id;
}

export async function updateCampaign(id: number, data: Partial<Campaign>): Promise<void> {
  await db.update('political_campaigns', data, 'id = ?', [id]);
}

export async function deleteCampaign(id: number): Promise<void> {
  await db.delete('political_campaigns', 'id = ?', [id]);
}

// ============================================
// ELECTION RESULTS
// ============================================

export async function getAllElectionResults(): Promise<ElectionResult[]> {
  const results = await db.query<ElectionResult>(
    `SELECT er.*, pc.name as candidate_name, pc.photo_url
     FROM election_results er
     LEFT JOIN political_candidates pc ON er.candidate_id = pc.id
     ORDER BY er.election_date DESC, er.position ASC`
  );
  return results;
}

export async function getElectionResultsByType(type: string): Promise<ElectionResult[]> {
  const results = await db.query<ElectionResult>(
    `SELECT er.*, pc.name as candidate_name, pc.photo_url
     FROM election_results er
     LEFT JOIN political_candidates pc ON er.candidate_id = pc.id
     WHERE er.election_type = ?
     ORDER BY er.election_date DESC, er.position ASC`,
    [type]
  );
  return results;
}

export async function createElectionResult(data: Partial<ElectionResult>): Promise<number> {
  const id = await db.insert('election_results', data);
  return id;
}

export async function updateElectionResult(id: number, data: Partial<ElectionResult>): Promise<void> {
  await db.update('election_results', data, 'id = ?', [id]);
}

export async function deleteElectionResult(id: number): Promise<void> {
  await db.delete('election_results', 'id = ?', [id]);
}

