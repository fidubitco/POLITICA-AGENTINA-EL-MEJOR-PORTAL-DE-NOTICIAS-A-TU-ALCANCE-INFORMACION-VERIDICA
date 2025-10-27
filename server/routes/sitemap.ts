/**
 * 🗺️ RUTAS DE SITEMAP - ENTERPRISE GRADE
 * Endpoints para servir sitemaps dinámicos
 */

import express from 'express';
import { generateSitemap, generateNewsSitemap, generateRobotsTxt } from '../services/sitemapGenerator';

const router = express.Router();

/**
 * Sitemap principal
 * GET /sitemap.xml
 */
router.get('/sitemap.xml', (req, res) => {
  try {
    const sitemap = generateSitemap();
    
    res.header('Content-Type', 'application/xml');
    res.header('Cache-Control', 'public, max-age=3600'); // Cache por 1 hora
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

/**
 * Sitemap de noticias (Google News)
 * GET /sitemap-news.xml
 */
router.get('/sitemap-news.xml', (req, res) => {
  try {
    const sitemap = generateNewsSitemap();
    
    res.header('Content-Type', 'application/xml');
    res.header('Cache-Control', 'public, max-age=600'); // Cache por 10 minutos
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating news sitemap:', error);
    res.status(500).send('Error generating news sitemap');
  }
});

/**
 * Robots.txt
 * GET /robots.txt
 */
router.get('/robots.txt', (req, res) => {
  try {
    const robotsTxt = generateRobotsTxt();
    
    res.header('Content-Type', 'text/plain');
    res.header('Cache-Control', 'public, max-age=86400'); // Cache por 24 horas
    res.send(robotsTxt);
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    res.status(500).send('Error generating robots.txt');
  }
});

export default router;

