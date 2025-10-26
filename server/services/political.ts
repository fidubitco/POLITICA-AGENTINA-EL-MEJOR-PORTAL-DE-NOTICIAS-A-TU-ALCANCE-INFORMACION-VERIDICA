import { db } from '../api/database';

// ===== CANDIDATOS =====

export interface Candidate {
  id: number;
  name: string;
  party: string;
  position: string;
  photo_url: string | null;
  bio: string | null;
  proposals: string | null;
  social_media: any;
  status: 'active' | 'inactive';
  order_position: number;
}

export async function getAllCandidates(position?: string): Promise<Candidate[]> {
  let query = 'SELECT * FROM candidates WHERE status = "active"';
  const params: any[] = [];
  
  if (position) {
    query += ' AND position = ?';
    params.push(position);
  }
  
  query += ' ORDER BY order_position ASC, name ASC';
  
  return await db.query(query, params);
}

export async function getCandidateById(id: number): Promise<Candidate | null> {
  const results = await db.query('SELECT * FROM candidates WHERE id = ?', [id]);
  return results[0] || null;
}

export async function createCandidate(data: Partial<Candidate>): Promise<number> {
  return await db.insert('candidates', {
    name: data.name,
    party: data.party,
    position: data.position,
    photo_url: data.photo_url || null,
    bio: data.bio || null,
    proposals: data.proposals || null,
    social_media: data.social_media ? JSON.stringify(data.social_media) : null,
    status: data.status || 'active',
    order_position: data.order_position || 0,
  });
}

export async function updateCandidate(id: number, data: Partial<Candidate>): Promise<void> {
  const updateData: any = {};
  
  if (data.name) updateData.name = data.name;
  if (data.party) updateData.party = data.party;
  if (data.position) updateData.position = data.position;
  if (data.photo_url !== undefined) updateData.photo_url = data.photo_url;
  if (data.bio !== undefined) updateData.bio = data.bio;
  if (data.proposals !== undefined) updateData.proposals = data.proposals;
  if (data.social_media) updateData.social_media = JSON.stringify(data.social_media);
  if (data.status) updateData.status = data.status;
  if (data.order_position !== undefined) updateData.order_position = data.order_position;
  
  await db.update('candidates', updateData, { id });
}

export async function deleteCandidate(id: number): Promise<void> {
  await db.query('DELETE FROM candidates WHERE id = ?', [id]);
}

// ===== ENCUESTAS =====

export interface Poll {
  id: number;
  title: string;
  description: string | null;
  question: string;
  poll_type: 'single' | 'multiple';
  status: 'draft' | 'active' | 'closed';
  start_date: Date | null;
  end_date: Date | null;
  total_votes: number;
  options?: PollOption[];
}

export interface PollOption {
  id: number;
  poll_id: number;
  option_text: string;
  candidate_id: number | null;
  votes: number;
  percentage: number;
  order_position: number;
}

export async function getAllPolls(status?: string): Promise<Poll[]> {
  let query = 'SELECT * FROM polls';
  const params: any[] = [];
  
  if (status) {
    query += ' WHERE status = ?';
    params.push(status);
  }
  
  query += ' ORDER BY created_at DESC';
  
  return await db.query(query, params);
}

export async function getPollById(id: number): Promise<Poll | null> {
  const results = await db.query('SELECT * FROM polls WHERE id = ?', [id]);
  const poll = results[0];
  
  if (!poll) return null;
  
  // Obtener opciones
  const options = await db.query(
    'SELECT * FROM poll_options WHERE poll_id = ? ORDER BY order_position ASC',
    [id]
  );
  
  poll.options = options;
  return poll;
}

export async function createPoll(data: Partial<Poll>, options: string[]): Promise<number> {
  // Crear encuesta
  const pollId = await db.insert('polls', {
    title: data.title,
    description: data.description || null,
    question: data.question,
    poll_type: data.poll_type || 'single',
    status: data.status || 'draft',
    start_date: data.start_date || null,
    end_date: data.end_date || null,
    total_votes: 0,
    created_by: data.created_by || null,
  });
  
  // Crear opciones
  for (let i = 0; i < options.length; i++) {
    await db.insert('poll_options', {
      poll_id: pollId,
      option_text: options[i],
      votes: 0,
      percentage: 0,
      order_position: i + 1,
    });
  }
  
  return pollId;
}

export async function updatePoll(id: number, data: Partial<Poll>): Promise<void> {
  const updateData: any = {};
  
  if (data.title) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.question) updateData.question = data.question;
  if (data.poll_type) updateData.poll_type = data.poll_type;
  if (data.status) updateData.status = data.status;
  if (data.start_date !== undefined) updateData.start_date = data.start_date;
  if (data.end_date !== undefined) updateData.end_date = data.end_date;
  
  await db.update('polls', updateData, { id });
}

export async function deletePoll(id: number): Promise<void> {
  await db.query('DELETE FROM polls WHERE id = ?', [id]);
}

export async function voteInPoll(
  pollId: number,
  optionId: number,
  userId: number | null,
  ipAddress: string,
  userAgent: string
): Promise<boolean> {
  try {
    // Verificar si ya votó
    const existingVote = await db.query(
      'SELECT id FROM poll_votes WHERE poll_id = ? AND (user_id = ? OR ip_address = ?)',
      [pollId, userId, ipAddress]
    );
    
    if (existingVote.length > 0) {
      return false; // Ya votó
    }
    
    // Registrar voto
    await db.insert('poll_votes', {
      poll_id: pollId,
      option_id: optionId,
      user_id: userId,
      ip_address: ipAddress,
      user_agent: userAgent,
    });
    
    // Actualizar contadores
    await db.query('UPDATE poll_options SET votes = votes + 1 WHERE id = ?', [optionId]);
    await db.query('UPDATE polls SET total_votes = total_votes + 1 WHERE id = ?', [pollId]);
    
    // Recalcular porcentajes
    await recalculatePollPercentages(pollId);
    
    return true;
  } catch (error) {
    console.error('Error voting in poll:', error);
    return false;
  }
}

async function recalculatePollPercentages(pollId: number): Promise<void> {
  const poll = await db.query('SELECT total_votes FROM polls WHERE id = ?', [pollId]);
  const totalVotes = poll[0]?.total_votes || 0;
  
  if (totalVotes === 0) return;
  
  const options = await db.query('SELECT id, votes FROM poll_options WHERE poll_id = ?', [pollId]);
  
  for (const option of options) {
    const percentage = (option.votes / totalVotes) * 100;
    await db.query('UPDATE poll_options SET percentage = ? WHERE id = ?', [
      percentage.toFixed(2),
      option.id,
    ]);
  }
}

// ===== ELECCIONES =====

export interface Election {
  id: number;
  name: string;
  election_type: string;
  description: string | null;
  election_date: Date;
  status: 'upcoming' | 'in_progress' | 'completed';
  total_votes: number;
  participation_percentage: number;
  results?: ElectionResult[];
}

export interface ElectionResult {
  id: number;
  election_id: number;
  candidate_id: number;
  candidate_name?: string;
  candidate_party?: string;
  candidate_photo?: string;
  votes: number;
  percentage: number;
  position: number;
  province: string | null;
}

export async function getAllElections(): Promise<Election[]> {
  return await db.query('SELECT * FROM elections ORDER BY election_date DESC');
}

export async function getElectionById(id: number): Promise<Election | null> {
  const results = await db.query('SELECT * FROM elections WHERE id = ?', [id]);
  const election = results[0];
  
  if (!election) return null;
  
  // Obtener resultados con información del candidato
  const electionResults = await db.query(
    `SELECT 
      er.*,
      c.name as candidate_name,
      c.party as candidate_party,
      c.photo_url as candidate_photo
    FROM election_results er
    LEFT JOIN candidates c ON er.candidate_id = c.id
    WHERE er.election_id = ?
    ORDER BY er.percentage DESC, er.votes DESC`,
    [id]
  );
  
  election.results = electionResults;
  return election;
}

export async function createElection(data: Partial<Election>): Promise<number> {
  return await db.insert('elections', {
    name: data.name,
    election_type: data.election_type,
    description: data.description || null,
    election_date: data.election_date,
    status: data.status || 'upcoming',
    total_votes: 0,
    participation_percentage: 0,
  });
}

export async function updateElection(id: number, data: Partial<Election>): Promise<void> {
  const updateData: any = {};
  
  if (data.name) updateData.name = data.name;
  if (data.election_type) updateData.election_type = data.election_type;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.election_date) updateData.election_date = data.election_date;
  if (data.status) updateData.status = data.status;
  if (data.total_votes !== undefined) updateData.total_votes = data.total_votes;
  if (data.participation_percentage !== undefined) updateData.participation_percentage = data.participation_percentage;
  
  await db.update('elections', updateData, { id });
}

export async function deleteElection(id: number): Promise<void> {
  await db.query('DELETE FROM elections WHERE id = ?', [id]);
}

export async function updateElectionResult(
  electionId: number,
  candidateId: number,
  votes: number,
  province: string | null = null
): Promise<void> {
  // Verificar si ya existe el resultado
  const existing = await db.query(
    'SELECT id FROM election_results WHERE election_id = ? AND candidate_id = ? AND province <=> ?',
    [electionId, candidateId, province]
  );
  
  if (existing.length > 0) {
    // Actualizar
    await db.update(
      'election_results',
      { votes },
      { id: existing[0].id }
    );
  } else {
    // Crear
    await db.insert('election_results', {
      election_id: electionId,
      candidate_id: candidateId,
      votes,
      percentage: 0,
      position: 0,
      province,
    });
  }
  
  // Recalcular totales y porcentajes
  await recalculateElectionResults(electionId, province);
}

async function recalculateElectionResults(electionId: number, province: string | null = null): Promise<void> {
  // Obtener total de votos
  const results = await db.query(
    'SELECT SUM(votes) as total FROM election_results WHERE election_id = ? AND province <=> ?',
    [electionId, province]
  );
  
  const totalVotes = results[0]?.total || 0;
  
  if (totalVotes === 0) return;
  
  // Actualizar porcentajes y posiciones
  const allResults = await db.query(
    'SELECT id, votes FROM election_results WHERE election_id = ? AND province <=> ? ORDER BY votes DESC',
    [electionId, province]
  );
  
  for (let i = 0; i < allResults.length; i++) {
    const result = allResults[i];
    const percentage = (result.votes / totalVotes) * 100;
    
    await db.query(
      'UPDATE election_results SET percentage = ?, position = ? WHERE id = ?',
      [percentage.toFixed(2), i + 1, result.id]
    );
  }
  
  // Actualizar total en elección
  if (!province) {
    await db.query('UPDATE elections SET total_votes = ? WHERE id = ?', [totalVotes, electionId]);
  }
}

// ===== ACTUALIZACIONES EN TIEMPO REAL =====

export interface LiveUpdate {
  id: number;
  type: 'election' | 'poll' | 'candidate';
  reference_id: number;
  title: string;
  content: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  is_breaking: boolean;
  created_at: Date;
}

export async function getLiveUpdates(limit: number = 20): Promise<LiveUpdate[]> {
  return await db.query(
    'SELECT * FROM live_updates ORDER BY created_at DESC LIMIT ?',
    [limit]
  );
}

export async function createLiveUpdate(data: Partial<LiveUpdate>): Promise<number> {
  return await db.insert('live_updates', {
    type: data.type,
    reference_id: data.reference_id,
    title: data.title,
    content: data.content,
    importance: data.importance || 'medium',
    is_breaking: data.is_breaking || false,
    created_by: data.created_by || null,
  });
}

// ===== CONFIGURACIÓN =====

export async function getPoliticalSettings(): Promise<{ [key: string]: string }> {
  const results = await db.query('SELECT setting_key, setting_value FROM political_settings');
  
  const settings: { [key: string]: string } = {};
  for (const row of results) {
    settings[row.setting_key] = row.setting_value;
  }
  
  return settings;
}

export async function updatePoliticalSetting(key: string, value: string): Promise<void> {
  await db.query(
    'UPDATE political_settings SET setting_value = ? WHERE setting_key = ?',
    [value, key]
  );
}

