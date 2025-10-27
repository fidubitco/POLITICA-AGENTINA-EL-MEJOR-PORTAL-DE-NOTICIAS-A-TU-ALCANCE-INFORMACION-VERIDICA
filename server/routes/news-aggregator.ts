/**
 * 🔄 RUTAS DE AGREGACIÓN DE NOTICIAS
 * Endpoints para obtener y generar noticias únicas
 */

import express from 'express';
import {
  fetchLatestNews,
  getUniqueNewsByCategory,
  getTrendingNews,
  getGoogleTrendsTopics,
} from '../services/newsAggregator';

const router = express.Router();

/**
 * GET /api/news/latest/:category
 * Obtener últimas noticias por categoría
 */
router.get('/latest/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;

    const news = await getUniqueNewsByCategory(category, limit);

    res.json({
      success: true,
      category,
      count: news.length,
      news,
    });
  } catch (error) {
    console.error('Error fetching latest news:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener noticias',
    });
  }
});

/**
 * GET /api/news/trending
 * Obtener noticias trending
 */
router.get('/trending', async (req, res) => {
  try {
    const news = await getTrendingNews();

    res.json({
      success: true,
      count: news.length,
      news,
    });
  } catch (error) {
    console.error('Error fetching trending news:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener noticias trending',
    });
  }
});

/**
 * GET /api/news/topics
 * Obtener topics de Google Trends
 */
router.get('/topics', async (req, res) => {
  try {
    const topics = await getGoogleTrendsTopics();

    res.json({
      success: true,
      count: topics.length,
      topics,
    });
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener topics',
    });
  }
});

/**
 * GET /api/news/raw/:category
 * Obtener noticias raw (sin procesar)
 */
router.get('/raw/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const news = await fetchLatestNews(category);

    res.json({
      success: true,
      category,
      count: news.length,
      news,
    });
  } catch (error) {
    console.error('Error fetching raw news:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener noticias',
    });
  }
});

/**
 * POST /api/news/generate
 * Generar y guardar noticias automáticamente
 */
router.post('/generate', async (req, res) => {
  try {
    const { category, limit = 5 } = req.body;

    const news = await getUniqueNewsByCategory(category, limit);

    // Aquí se guardarían en la base de datos
    // Por ahora solo retornamos las noticias generadas

    res.json({
      success: true,
      message: `${news.length} noticias generadas exitosamente`,
      news,
    });
  } catch (error) {
    console.error('Error generating news:', error);
    res.status(500).json({
      success: false,
      error: 'Error al generar noticias',
    });
  }
});

export default router;

