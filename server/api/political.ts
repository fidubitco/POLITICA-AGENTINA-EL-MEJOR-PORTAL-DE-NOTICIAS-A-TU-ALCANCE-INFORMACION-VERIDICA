import { Router } from 'express';
import { verifyToken, requireRole } from './auth';
import * as political from '../services/political';

const router = Router();

// ===== CANDIDATOS =====

/**
 * GET /api/political/candidates
 * Obtener todos los candidatos
 */
router.get('/candidates', async (req, res) => {
  try {
    const { position } = req.query;
    const candidates = await political.getAllCandidates(position as string);
    res.json(candidates);
  } catch (error) {
    console.error('Error obteniendo candidatos:', error);
    res.status(500).json({ error: 'Error obteniendo candidatos' });
  }
});

/**
 * GET /api/political/candidates/:id
 * Obtener un candidato por ID
 */
router.get('/candidates/:id', async (req, res) => {
  try {
    const candidate = await political.getCandidateById(parseInt(req.params.id));
    
    if (!candidate) {
      return res.status(404).json({ error: 'Candidato no encontrado' });
    }
    
    res.json(candidate);
  } catch (error) {
    console.error('Error obteniendo candidato:', error);
    res.status(500).json({ error: 'Error obteniendo candidato' });
  }
});

/**
 * POST /api/political/candidates
 * Crear un nuevo candidato (requiere admin)
 */
router.post('/candidates', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const id = await political.createCandidate(req.body);
    res.status(201).json({ id, message: 'Candidato creado exitosamente' });
  } catch (error) {
    console.error('Error creando candidato:', error);
    res.status(500).json({ error: 'Error creando candidato' });
  }
});

/**
 * PUT /api/political/candidates/:id
 * Actualizar un candidato (requiere admin)
 */
router.put('/candidates/:id', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    await political.updateCandidate(parseInt(req.params.id), req.body);
    res.json({ message: 'Candidato actualizado exitosamente' });
  } catch (error) {
    console.error('Error actualizando candidato:', error);
    res.status(500).json({ error: 'Error actualizando candidato' });
  }
});

/**
 * DELETE /api/political/candidates/:id
 * Eliminar un candidato (requiere admin)
 */
router.delete('/candidates/:id', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    await political.deleteCandidate(parseInt(req.params.id));
    res.json({ message: 'Candidato eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando candidato:', error);
    res.status(500).json({ error: 'Error eliminando candidato' });
  }
});

// ===== ENCUESTAS =====

/**
 * GET /api/political/polls
 * Obtener todas las encuestas
 */
router.get('/polls', async (req, res) => {
  try {
    const { status } = req.query;
    const polls = await political.getAllPolls(status as string);
    res.json(polls);
  } catch (error) {
    console.error('Error obteniendo encuestas:', error);
    res.status(500).json({ error: 'Error obteniendo encuestas' });
  }
});

/**
 * GET /api/political/polls/:id
 * Obtener una encuesta por ID con sus opciones
 */
router.get('/polls/:id', async (req, res) => {
  try {
    const poll = await political.getPollById(parseInt(req.params.id));
    
    if (!poll) {
      return res.status(404).json({ error: 'Encuesta no encontrada' });
    }
    
    res.json(poll);
  } catch (error) {
    console.error('Error obteniendo encuesta:', error);
    res.status(500).json({ error: 'Error obteniendo encuesta' });
  }
});

/**
 * POST /api/political/polls
 * Crear una nueva encuesta (requiere editor)
 */
router.post('/polls', verifyToken, requireRole('editor'), async (req, res) => {
  try {
    const { options, ...pollData } = req.body;
    
    if (!options || options.length < 2) {
      return res.status(400).json({ error: 'Se requieren al menos 2 opciones' });
    }
    
    const id = await political.createPoll(pollData, options);
    res.status(201).json({ id, message: 'Encuesta creada exitosamente' });
  } catch (error) {
    console.error('Error creando encuesta:', error);
    res.status(500).json({ error: 'Error creando encuesta' });
  }
});

/**
 * PUT /api/political/polls/:id
 * Actualizar una encuesta (requiere editor)
 */
router.put('/polls/:id', verifyToken, requireRole('editor'), async (req, res) => {
  try {
    await political.updatePoll(parseInt(req.params.id), req.body);
    res.json({ message: 'Encuesta actualizada exitosamente' });
  } catch (error) {
    console.error('Error actualizando encuesta:', error);
    res.status(500).json({ error: 'Error actualizando encuesta' });
  }
});

/**
 * DELETE /api/political/polls/:id
 * Eliminar una encuesta (requiere admin)
 */
router.delete('/polls/:id', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    await political.deletePoll(parseInt(req.params.id));
    res.json({ message: 'Encuesta eliminada exitosamente' });
  } catch (error) {
    console.error('Error eliminando encuesta:', error);
    res.status(500).json({ error: 'Error eliminando encuesta' });
  }
});

/**
 * POST /api/political/polls/:id/vote
 * Votar en una encuesta
 */
router.post('/polls/:id/vote', async (req, res) => {
  try {
    const { option_id } = req.body;
    const userId = req.user?.id || null;
    const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    
    if (!option_id) {
      return res.status(400).json({ error: 'Se requiere option_id' });
    }
    
    const success = await political.voteInPoll(
      parseInt(req.params.id),
      option_id,
      userId,
      ipAddress,
      userAgent
    );
    
    if (!success) {
      return res.status(400).json({ error: 'Ya has votado en esta encuesta' });
    }
    
    res.json({ message: 'Voto registrado exitosamente' });
  } catch (error) {
    console.error('Error votando en encuesta:', error);
    res.status(500).json({ error: 'Error registrando voto' });
  }
});

// ===== ELECCIONES =====

/**
 * GET /api/political/elections
 * Obtener todas las elecciones
 */
router.get('/elections', async (req, res) => {
  try {
    const elections = await political.getAllElections();
    res.json(elections);
  } catch (error) {
    console.error('Error obteniendo elecciones:', error);
    res.status(500).json({ error: 'Error obteniendo elecciones' });
  }
});

/**
 * GET /api/political/elections/:id
 * Obtener una elección por ID con resultados
 */
router.get('/elections/:id', async (req, res) => {
  try {
    const election = await political.getElectionById(parseInt(req.params.id));
    
    if (!election) {
      return res.status(404).json({ error: 'Elección no encontrada' });
    }
    
    res.json(election);
  } catch (error) {
    console.error('Error obteniendo elección:', error);
    res.status(500).json({ error: 'Error obteniendo elección' });
  }
});

/**
 * POST /api/political/elections
 * Crear una nueva elección (requiere admin)
 */
router.post('/elections', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const id = await political.createElection(req.body);
    res.status(201).json({ id, message: 'Elección creada exitosamente' });
  } catch (error) {
    console.error('Error creando elección:', error);
    res.status(500).json({ error: 'Error creando elección' });
  }
});

/**
 * PUT /api/political/elections/:id
 * Actualizar una elección (requiere admin)
 */
router.put('/elections/:id', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    await political.updateElection(parseInt(req.params.id), req.body);
    res.json({ message: 'Elección actualizada exitosamente' });
  } catch (error) {
    console.error('Error actualizando elección:', error);
    res.status(500).json({ error: 'Error actualizando elección' });
  }
});

/**
 * DELETE /api/political/elections/:id
 * Eliminar una elección (requiere admin)
 */
router.delete('/elections/:id', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    await political.deleteElection(parseInt(req.params.id));
    res.json({ message: 'Elección eliminada exitosamente' });
  } catch (error) {
    console.error('Error eliminando elección:', error);
    res.status(500).json({ error: 'Error eliminando elección' });
  }
});

/**
 * POST /api/political/elections/:id/results
 * Actualizar resultados de una elección (requiere admin)
 */
router.post('/elections/:id/results', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const { candidate_id, votes, province } = req.body;
    
    if (!candidate_id || votes === undefined) {
      return res.status(400).json({ error: 'Se requiere candidate_id y votes' });
    }
    
    await political.updateElectionResult(
      parseInt(req.params.id),
      candidate_id,
      votes,
      province || null
    );
    
    res.json({ message: 'Resultado actualizado exitosamente' });
  } catch (error) {
    console.error('Error actualizando resultado:', error);
    res.status(500).json({ error: 'Error actualizando resultado' });
  }
});

// ===== ACTUALIZACIONES EN TIEMPO REAL =====

/**
 * GET /api/political/live-updates
 * Obtener actualizaciones en tiempo real
 */
router.get('/live-updates', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const updates = await political.getLiveUpdates(limit);
    res.json(updates);
  } catch (error) {
    console.error('Error obteniendo actualizaciones:', error);
    res.status(500).json({ error: 'Error obteniendo actualizaciones' });
  }
});

/**
 * POST /api/political/live-updates
 * Crear una actualización en tiempo real (requiere editor)
 */
router.post('/live-updates', verifyToken, requireRole('editor'), async (req, res) => {
  try {
    const id = await political.createLiveUpdate(req.body);
    res.status(201).json({ id, message: 'Actualización creada exitosamente' });
  } catch (error) {
    console.error('Error creando actualización:', error);
    res.status(500).json({ error: 'Error creando actualización' });
  }
});

// ===== CONFIGURACIÓN =====

/**
 * GET /api/political/settings
 * Obtener configuración del sistema político
 */
router.get('/settings', verifyToken, async (req, res) => {
  try {
    const settings = await political.getPoliticalSettings();
    res.json(settings);
  } catch (error) {
    console.error('Error obteniendo configuración:', error);
    res.status(500).json({ error: 'Error obteniendo configuración' });
  }
});

/**
 * PUT /api/political/settings/:key
 * Actualizar una configuración (requiere admin)
 */
router.put('/settings/:key', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const { value } = req.body;
    
    if (value === undefined) {
      return res.status(400).json({ error: 'Se requiere value' });
    }
    
    await political.updatePoliticalSetting(req.params.key, value);
    res.json({ message: 'Configuración actualizada exitosamente' });
  } catch (error) {
    console.error('Error actualizando configuración:', error);
    res.status(500).json({ error: 'Error actualizando configuración' });
  }
});

export default router;

