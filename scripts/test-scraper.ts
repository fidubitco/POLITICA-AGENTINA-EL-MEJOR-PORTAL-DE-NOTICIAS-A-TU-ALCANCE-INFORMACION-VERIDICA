#!/usr/bin/env tsx

import { newsScraper } from '../server/services/scraper';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

async function testScraper() {
  console.log('🧪 Probando servicio de scraping...\n');

  try {
    // Ejecutar scraping
    console.log('🚀 Iniciando scraping de prueba...');
    const result = await newsScraper.startScraping();

    console.log('\n📊 Resultados del scraping:');
    console.log(`✅ Fuentes exitosas: ${result.success}`);
    console.log(`❌ Fuentes fallidas: ${result.failed}`);
    console.log(`📈 Total de fuentes: ${result.total}`);

    // Obtener artículos scrapeados
    console.log('\n📄 Artículos scrapeados recientemente:');
    const articles = await newsScraper.getScrapedArticles(10);

    if (articles.length > 0) {
      articles.forEach((article, index) => {
        console.log(`${index + 1}. ${article.title.substring(0, 60)}...`);
        console.log(`   📅 ${article.publishDate}`);
        console.log(`   📰 ${article.source} - ${article.category}`);
        console.log(`   📊 Estado: ${article.status}\n`);
      });
    } else {
      console.log('⚠️  No se encontraron artículos scrapeados');
    }

    console.log('✅ Prueba completada exitosamente');

  } catch (error) {
    console.error('❌ Error en la prueba:', error);
    process.exit(1);
  }
}

// Ejecutar la prueba
testScraper();

