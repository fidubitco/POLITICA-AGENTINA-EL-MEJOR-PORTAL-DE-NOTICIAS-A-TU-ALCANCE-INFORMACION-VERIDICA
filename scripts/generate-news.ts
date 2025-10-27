/**
 * 🤖 SCRIPT DE GENERACIÓN AUTOMÁTICA DE NOTICIAS
 * Genera noticias únicas basadas en fuentes argentinas
 */

import { getUniqueNewsByCategory, getTrendingNews } from '../server/services/newsAggregator';
import fs from 'fs';
import path from 'path';

const CATEGORIES = ['politica', 'economia', 'sociedad', 'judicial', 'internacional'];

/**
 * Generar noticias para todas las categorías
 */
async function generateAllNews() {
  console.log('🚀 Iniciando generación de noticias...\n');

  const allGeneratedNews: any[] = [];

  for (const category of CATEGORIES) {
    console.log(`📰 Generando noticias de ${category}...`);
    
    try {
      const news = await getUniqueNewsByCategory(category, 5);
      console.log(`✅ ${news.length} noticias generadas para ${category}`);
      
      allGeneratedNews.push(...news.map(n => ({
        ...n,
        category,
        status: 'published',
        featured: false,
        breaking: false,
        author: 'Redacción Política Argentina',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })));
    } catch (error) {
      console.error(`❌ Error en ${category}:`, error);
    }
  }

  console.log(`\n✅ Total de noticias generadas: ${allGeneratedNews.length}`);

  // Guardar en archivo JSON
  const outputPath = path.join(__dirname, '../client/src/data/generatedNews.json');
  fs.writeFileSync(outputPath, JSON.stringify(allGeneratedNews, null, 2));
  console.log(`💾 Noticias guardadas en: ${outputPath}`);

  return allGeneratedNews;
}

/**
 * Generar noticias trending
 */
async function generateTrendingNews() {
  console.log('\n🔥 Generando noticias trending...');
  
  try {
    const news = await getTrendingNews();
    console.log(`✅ ${news.length} noticias trending generadas`);
    
    const outputPath = path.join(__dirname, '../client/src/data/trendingNews.json');
    fs.writeFileSync(outputPath, JSON.stringify(news, null, 2));
    console.log(`💾 Trending guardado en: ${outputPath}`);
    
    return news;
  } catch (error) {
    console.error('❌ Error generando trending:', error);
    return [];
  }
}

/**
 * Ejecutar generación completa
 */
async function main() {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║     🤖 GENERADOR AUTOMÁTICO DE NOTICIAS                       ║
║     Basado en Top 50 Portales de Argentina                   ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);

  try {
    // Generar noticias por categoría
    const allNews = await generateAllNews();

    // Generar trending
    const trending = await generateTrendingNews();

    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║     ✅ GENERACIÓN COMPLETADA EXITOSAMENTE                     ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

📊 RESUMEN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Noticias generadas: ${allNews.length}
✅ Noticias trending: ${trending.length}
✅ Categorías procesadas: ${CATEGORIES.length}

📝 ARCHIVOS CREADOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ client/src/data/generatedNews.json
✅ client/src/data/trendingNews.json

🚀 PRÓXIMO PASO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ejecuta: pnpm build && vercel --prod

    `);
  } catch (error) {
    console.error('\n❌ Error en la generación:', error);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch(console.error);
}

export { generateAllNews, generateTrendingNews };

