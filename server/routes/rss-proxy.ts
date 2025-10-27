/**
 * 🔄 PROXY DE RSS - BACKEND
 * Proxy para obtener RSS feeds evitando problemas de CORS
 */

import express from 'express';
import axios from 'axios';
import { parseString } from 'xml2js';

const router = express.Router();

/**
 * Endpoint para obtener RSS feeds
 * Uso: GET /api/rss-proxy?url=https://example.com/rss
 */
router.get('/rss-proxy', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    // Validar que sea una URL válida
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    // Whitelist de dominios permitidos (seguridad)
    const allowedDomains = [
      'lanacion.com.ar',
      'clarin.com',
      'infobae.com',
      'pagina12.com.ar',
      'ambito.com',
      'perfil.com',
      'cronista.com',
      'telam.com.ar'
    ];

    const urlObj = new URL(url);
    const isAllowed = allowedDomains.some(domain => 
      urlObj.hostname.includes(domain)
    );

    if (!isAllowed) {
      return res.status(403).json({ error: 'Domain not allowed' });
    }

    // Obtener el RSS feed
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PoliticaArgentinaBot/1.0)'
      }
    });

    // Parsear XML a JSON
    parseString(response.data, { explicitArray: false }, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing RSS feed' });
      }

      // Extraer items del RSS
      const items = result?.rss?.channel?.item || [];
      const formattedItems = Array.isArray(items) ? items : [items];

      const processedItems = formattedItems.map((item: any) => ({
        title: item.title || '',
        description: item.description || '',
        link: item.link || '',
        pubDate: item.pubDate || '',
        category: item.category || '',
        guid: item.guid?._  || item.guid || ''
      }));

      res.json({
        success: true,
        source: urlObj.hostname,
        items: processedItems,
        count: processedItems.length,
        timestamp: new Date().toISOString()
      });
    });

  } catch (error: any) {
    console.error('RSS Proxy Error:', error.message);
    res.status(500).json({ 
      error: 'Error fetching RSS feed',
      message: error.message 
    });
  }
});

/**
 * NOTA LEGAL IMPORTANTE:
 * 
 * Este proxy obtiene RSS feeds públicos, lo cual es legal y permitido.
 * Los RSS feeds están diseñados para ser consumidos por terceros.
 * 
 * REGLAS A SEGUIR:
 * 1. ✅ Mostrar título y descripción del RSS
 * 2. ✅ Enlazar a la fuente original
 * 3. ✅ Dar crédito al medio original
 * 4. ❌ NO copiar el contenido completo
 * 5. ❌ NO presentar como contenido propio
 * 6. ✅ Respetar robots.txt del sitio
 * 7. ✅ No hacer requests excesivos (rate limiting)
 */

export default router;

