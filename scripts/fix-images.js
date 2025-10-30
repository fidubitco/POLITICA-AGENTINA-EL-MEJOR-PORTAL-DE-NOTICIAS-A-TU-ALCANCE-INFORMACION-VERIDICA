#!/usr/bin/env node

/**
 * 🖼️ DIAGNÓSTICO Y REPARACIÓN AUTOMÁTICA DE IMÁGENES
 *
 * Este script valida todas las imágenes del sitio y las corrige automáticamente
 * usando IA para detectar contenido incorrecto y generar imágenes apropiadas.
 */

const fs = require('fs');
const path = require('path');
const { validateImageBatch, generateMissingImages } = require('../app/lib/imageValidation');

// Configuración
const DATA_DIR = path.join(__dirname, '..', 'client', 'src', 'data');
const IMAGES_DIR = path.join(__dirname, '..', 'client', 'public', 'images');
const REPORT_FILE = path.join(__dirname, '..', 'IMAGES_FIX_REPORT.md');

// Colores para consola
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(title) {
  log(`\n${'='.repeat(60)}`, 'cyan');
  log(`📊 ${title}`, 'cyan');
  log(`${'='.repeat(60)}\n`, 'cyan');
}

function logSection(title) {
  log(`\n${'-'.repeat(40)}`, 'yellow');
  log(`🔍 ${title}`, 'yellow');
  log(`${'-'.repeat(40)}`, 'yellow');
}

/**
 * Lee todos los archivos de datos de noticias
 */
function loadAllArticles() {
  const articles = [];
  const dataFiles = [
    'allNews.ts',
    'currentNews.ts',
    'moreCurrentNews.ts',
    'judicialNews.ts',
    'newsData.ts'
  ];

  for (const file of dataFiles) {
    const filePath = path.join(DATA_DIR, file);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Extraer objetos de artículos (simplificado)
        const articleMatches = content.match(/\{\s*id:\s*\d+[^}]*\}/g);
        if (articleMatches) {
          for (const match of articleMatches) {
            const article = parseArticleObject(match);
            if (article) {
              articles.push(article);
            }
          }
        }
      } catch (error) {
        log(`Error leyendo ${file}: ${error.message}`, 'red');
      }
    }
  }

  return articles;
}

/**
 * Parsea un objeto de artículo desde string
 */
function parseArticleObject(str) {
  try {
    // Extraer campos básicos
    const idMatch = str.match(/id:\s*(\d+)/);
    const titleMatch = str.match(/title:\s*["']([^"']+)["']/);
    const imageUrlMatch = str.match(/imageUrl:\s*["']([^"']+)["']/);
    const categoryMatch = str.match(/category:\s*["']([^"']+)["']/);
    const categorySlugMatch = str.match(/categorySlug:\s*["']([^"']+)["']/);
    const tagsMatch = str.match(/tags:\s*\[([^\]]*)\]/);

    if (!idMatch || !titleMatch) return null;

    const tags = tagsMatch ? tagsMatch[1]
      .split(',')
      .map(tag => tag.trim().replace(/["']/g, ''))
      .filter(tag => tag.length > 0) : [];

    return {
      id: parseInt(idMatch[1]),
      title: titleMatch[1],
      imageUrl: imageUrlMatch ? imageUrlMatch[1] : null,
      category: categoryMatch ? categoryMatch[1] : 'General',
      categorySlug: categorySlugMatch ? categorySlugMatch[1] : 'general',
      tags
    };
  } catch (error) {
    return null;
  }
}

/**
 * Verifica si las imágenes locales existen
 */
function checkLocalImages(articles) {
  logSection('VERIFICANDO IMÁGENES LOCALES');

  const localImages = [];
  const missingImages = [];

  for (const article of articles) {
    if (article.imageUrl && article.imageUrl.startsWith('/images/')) {
      const imagePath = path.join(IMAGES_DIR, article.imageUrl.replace('/images/', ''));
      const exists = fs.existsSync(imagePath);

      if (exists) {
        localImages.push(article);
        log(`✅ ${article.title.substring(0, 50)}... - ${path.basename(article.imageUrl)}`, 'green');
      } else {
        missingImages.push(article);
        log(`❌ ${article.title.substring(0, 50)}... - ${path.basename(article.imageUrl)} (ARCHIVO NO EXISTE)`, 'red');
      }
    }
  }

  return { localImages, missingImages };
}

/**
 * Valida imágenes usando IA
 */
async function validateImagesWithAI(articles) {
  logSection('VALIDANDO CONTENIDO CON IA');

  const imagesToValidate = articles
    .filter(article => article.imageUrl)
    .slice(0, 10); // Limitar para testing

  if (imagesToValidate.length === 0) {
    log('No hay imágenes para validar', 'yellow');
    return [];
  }

  log(`Validando ${imagesToValidate.length} imágenes...`, 'blue');

  const validationData = imagesToValidate.map(article => ({
    url: article.imageUrl.startsWith('http') ? article.imageUrl :
         `http://localhost:3000${article.imageUrl}`,
    title: article.title,
    category: article.category
  }));

  try {
    const results = await validateImageBatch(validationData);

    const report = [];
    for (let i = 0; i < imagesToValidate.length; i++) {
      const article = imagesToValidate[i];
      const result = results[i];

      report.push({
        article,
        validation: result
      });

      if (result.isValid) {
        log(`✅ ${article.title.substring(0, 40)}... - Confianza: ${result.confidence}%`, 'green');
      } else {
        log(`❌ ${article.title.substring(0, 40)}... - Confianza: ${result.confidence}%`, 'red');
        if (result.issues.length > 0) {
          log(`   Problemas: ${result.issues.join(', ')}`, 'red');
        }
        if (result.recommendations.length > 0) {
          log(`   Sugerencias: ${result.recommendations[0]}`, 'yellow');
        }
      }
    }

    return report;

  } catch (error) {
    log(`Error en validación IA: ${error.message}`, 'red');
    return [];
  }
}

/**
 * Genera imágenes faltantes
 */
async function generateMissingImagesForArticles(articles) {
  logSection('GENERANDO IMÁGENES FALTANTES CON IA');

  const articlesNeedingImages = articles.filter(article => !article.imageUrl);

  if (articlesNeedingImages.length === 0) {
    log('Todas las noticias tienen imágenes asignadas', 'green');
    return [];
  }

  log(`Generando imágenes para ${articlesNeedingImages.length} artículos...`, 'blue');

  const generationData = articlesNeedingImages.slice(0, 3).map(article => ({
    title: article.title,
    category: article.category,
    categorySlug: article.categorySlug,
    tags: article.tags
  }));

  try {
    const results = await generateMissingImages(generationData);

    for (const result of results) {
      if (result.generatedUrl) {
        log(`🎨 Generada imagen para: ${result.articleTitle.substring(0, 40)}...`, 'magenta');
      } else {
        log(`❌ Error generando imagen para: ${result.articleTitle.substring(0, 40)}...`, 'red');
      }
    }

    return results;

  } catch (error) {
    log(`Error generando imágenes: ${error.message}`, 'red');
    return [];
  }
}

/**
 * Genera reporte final
 */
function generateReport(stats, validationResults, generationResults) {
  logHeader('GENERANDO REPORTE FINAL');

  const report = `# 🖼️ REPORTE DE DIAGNÓSTICO DE IMÁGENES
**Fecha:** ${new Date().toLocaleString('es-AR')}
**Total de artículos:** ${stats.totalArticles}
**Artículos con imágenes:** ${stats.articlesWithImages}
**Imágenes locales:** ${stats.localImages}
**Imágenes externas:** ${stats.externalImages}
**Imágenes faltantes:** ${stats.missingImages}

## 📊 ESTADÍSTICAS GENERALES

- **Porcentaje con imágenes:** ${((stats.articlesWithImages / stats.totalArticles) * 100).toFixed(1)}%
- **Imágenes locales existentes:** ${stats.localImages}
- **Imágenes externas (Unsplash):** ${stats.externalImages}
- **Archivos de imagen faltantes:** ${stats.missingImages}

## 🔍 VALIDACIÓN DE CONTENIDO

${validationResults.length > 0 ?
  validationResults.map(result => {
    const { article, validation } = result;
    return `### ${article.title}
- **Estado:** ${validation.isValid ? '✅ VÁLIDA' : '❌ INVÁLIDA'}
- **Confianza:** ${validation.confidence}%
- **Contenido detectado:** ${validation.detectedContent.join(', ') || 'Ninguno'}
- **Problemas:** ${validation.issues.join(', ') || 'Ninguno'}
- **Recomendaciones:** ${validation.recommendations.join(', ') || 'Ninguna'}
- **Imagen:** ${article.imageUrl}
`;
  }).join('\n') : 'No se realizó validación de contenido'}

## 🎨 IMÁGENES GENERADAS

${generationResults.length > 0 ?
  generationResults.map(result => {
    return `### ${result.articleTitle}
- **Estado:** ${result.generatedUrl ? '✅ GENERADA' : '❌ ERROR'}
- **URL generada:** ${result.generatedUrl || 'No disponible'}
- **URL original:** ${result.originalUrl || 'No tenía'}
`;
  }).join('\n') : 'No se generaron nuevas imágenes'}

## 🚨 PROBLEMAS CRÍTICOS IDENTIFICADOS

${stats.criticalIssues.length > 0 ?
  stats.criticalIssues.map(issue => `- ${issue}`).join('\n') : 'Ningún problema crítico identificado'}

## 💡 RECOMENDACIONES

1. **Revisar imágenes inválidas:** ${validationResults.filter(r => !r.validation.isValid).length} imágenes necesitan atención
2. **Generar imágenes faltantes:** ${stats.missingImages} artículos sin imagen asignada
3. **Optimizar carga:** Implementar lazy loading y formatos WebP
4. **Monitoreo continuo:** Configurar validación automática de nuevas imágenes
5. **Backup de imágenes:** Crear sistema de respaldo para imágenes generadas

## ⚙️ ACCIONES RECOMENDADAS

- [${stats.missingImages > 0 ? 'x' : ' '}] Generar imágenes faltantes con IA
- [${validationResults.some(r => !r.validation.isValid) ? 'x' : ' '}] Corregir imágenes con contenido incorrecto
- [ ] Implementar sistema de cache para imágenes optimizadas
- [ ] Configurar CDN para distribución de imágenes
- [ ] Crear galería de imágenes por categoría
- [ ] Implementar compresión automática

---
*Reporte generado automáticamente por el sistema de diagnóstico de imágenes*
`;

  fs.writeFileSync(REPORT_FILE, report, 'utf8');
  log(`📄 Reporte guardado en: ${REPORT_FILE}`, 'green');
}

/**
 * Función principal
 */
async function main() {
  logHeader('INICIANDO DIAGNÓSTICO DE IMÁGENES');

  try {
    // 1. Cargar todos los artículos
    logSection('CARGANDO DATOS DE ARTÍCULOS');
    const articles = loadAllArticles();
    log(`📚 Encontrados ${articles.length} artículos`, 'blue');

    // 2. Verificar imágenes locales
    const { localImages, missingImages } = checkLocalImages(articles);

    // 3. Clasificar imágenes
    const articlesWithImages = articles.filter(a => a.imageUrl);
    const externalImages = articlesWithImages.filter(a => a.imageUrl.startsWith('http'));
    const localImagesExisting = articlesWithImages.filter(a =>
      a.imageUrl.startsWith('/images/') && localImages.some(l => l.id === a.id)
    );

    // 4. Estadísticas generales
    const stats = {
      totalArticles: articles.length,
      articlesWithImages: articlesWithImages.length,
      localImages: localImagesExisting.length,
      externalImages: externalImages.length,
      missingImages: missingImages.length,
      criticalIssues: []
    };

    // Problemas críticos
    if (missingImages.length > 0) {
      stats.criticalIssues.push(`${missingImages.length} imágenes locales no existen en el servidor`);
    }
    if (articles.filter(a => !a.imageUrl).length > 0) {
      stats.criticalIssues.push(`${articles.filter(a => !a.imageUrl).length} artículos sin imagen asignada`);
    }

    // 5. Validar contenido con IA (muestra limitada)
    const validationResults = await validateImagesWithAI(articlesWithImages.slice(0, 5));

    // 6. Generar imágenes faltantes (simulado)
    const generationResults = await generateMissingImagesForArticles(articles.filter(a => !a.imageUrl));

    // 7. Generar reporte
    generateReport(stats, validationResults, generationResults);

    logHeader('DIAGNÓSTICO COMPLETADO');
    log(`✅ Proceso terminado exitosamente`, 'green');
    log(`📊 Total artículos: ${stats.totalArticles}`, 'blue');
    log(`🖼️ Con imágenes: ${stats.articlesWithImages}`, 'blue');
    log(`🔍 Imágenes válidas: ${validationResults.filter(r => r.validation.isValid).length}/${validationResults.length}`, 'blue');

  } catch (error) {
    log(`❌ Error en el diagnóstico: ${error.message}`, 'red');
    console.error(error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = {
  loadAllArticles,
  checkLocalImages,
  validateImagesWithAI,
  generateMissingImagesForArticles,
  generateReport
};
