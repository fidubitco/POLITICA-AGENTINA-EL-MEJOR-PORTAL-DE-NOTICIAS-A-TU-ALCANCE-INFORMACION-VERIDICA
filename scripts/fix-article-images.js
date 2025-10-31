#!/usr/bin/env node

/**
 * 🔧 CORRECTOR DE IMÁGENES DE ARTÍCULOS
 *
 * Corrige automáticamente las imágenes de las noticias para que sean relevantes
 * al contenido, especialmente para figuras políticas argentinas
 */

const fs = require('fs');
const path = require('path');

// Función helper para leer archivos
function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

// Función helper para escribir archivos
function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

// Función para detectar figuras políticas en el texto
function detectPoliticalFigures(text) {
  const figures = [];
  const textLower = text.toLowerCase();

  const figurePatterns = {
    'milei': ['milei', 'javier milei', 'presidente milei'],
    'cristina_kirchner': ['cristina', 'cristina kirchner', 'cfk', 'fernández de kirchner'],
    'alberto_fernandez': ['alberto fernández', 'alberto fernandez'],
    'mauricio_macri': ['macri', 'mauricio macri'],
    'patricia_bullrich': ['bullrich', 'patricia bullrich'],
    'luis_petri': ['petri', 'luis petri'],
    'sergio_massa': ['massa', 'sergio massa'],
    'maximo_kirchner': ['máximo', 'maximo kirchner', 'máximo kirchner']
  };

  for (const [figure, patterns] of Object.entries(figurePatterns)) {
    for (const pattern of patterns) {
      if (textLower.includes(pattern)) {
        figures.push(figure);
        break;
      }
    }
  }

  return [...new Set(figures)]; // Eliminar duplicados
}

// Mapeo de imágenes específicas para figuras políticas
const politicalImageMap = {
  'milei': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=675&fit=crop&q=80&auto=format',
  'milei_congreso': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=675&fit=crop&q=80&auto=format',
  'cristina_kirchner': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=675&fit=crop&q=80&auto=format',
  'cristina_acto': 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=675&fit=crop&q=80&auto=format',
  'alberto_fernandez': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&h=675&fit=crop&q=80&auto=format',
  'mauricio_macri': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&h=675&fit=crop&q=80&auto=format',
  'patricia_bullrich': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1200&h=675&fit=crop&q=80&auto=format',
  'luis_petri': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=675&fit=crop&q=80&auto=format',
  'sergio_massa': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&h=675&fit=crop&q=80&auto=format',
  'maximo_kirchner': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&h=675&fit=crop&q=80&auto=format'
};

// Mapeo de imágenes por categoría
const categoryImageMap = {
  'politica': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=675&fit=crop&q=80&auto=format',
  'economia': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop&q=80&auto=format',
  'judicial': 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=1200&h=675&fit=crop&q=80&auto=format',
  'sociedad': 'https://images.unsplash.com/photo-1555374018-13a8994ab246?w=1200&h=675&fit=crop&q=80&auto=format',
  'internacional': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=675&fit=crop&q=80&auto=format',
  'elecciones': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&h=675&fit=crop&q=80&auto=format',
  'deportes': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=675&fit=crop&q=80&auto=format',
  'cultura': 'https://images.unsplash.com/photo-1489599689857-8e4917861ca1?w=1200&h=675&fit=crop&q=80&auto=format'
};

/**
 * Determina la mejor imagen para un artículo
 */
function getBestImageForArticle(title, content, categorySlug, tags) {
  const fullText = `${title} ${content} ${tags.join(' ')}`;
  const politicalFigures = detectPoliticalFigures(fullText);

  // Prioridad 1: Figuras políticas específicas
  if (politicalFigures.length > 0) {
    // Si hay Milei y menciona congreso
    if (politicalFigures.includes('milei') && fullText.toLowerCase().includes('congreso')) {
      return politicalImageMap['milei_congreso'];
    }

    // Si hay Cristina y menciona acto/discurso
    if (politicalFigures.includes('cristina_kirchner') && (fullText.toLowerCase().includes('acto') || fullText.toLowerCase().includes('discurso'))) {
      return politicalImageMap['cristina_acto'];
    }

    // Primera figura política encontrada
    const primaryFigure = politicalFigures[0];
    return politicalImageMap[primaryFigure] || politicalImageMap['milei'];
  }

  // Prioridad 2: Imagen por categoría
  return categoryImageMap[categorySlug] || categoryImageMap['politica'];
}

/**
 * Corrige las imágenes en un archivo de datos
 */
function fixImagesInFile(filePath) {
  console.log(`\n📁 Procesando: ${path.basename(filePath)}`);

  let content = readFile(filePath);
  let changes = 0;
  let articlesProcessed = 0;

  // Buscar bloques de artículos (objetos con id, title, content, etc.)
  const articleRegex = /\{\s*id:\s*\d+[^}]*\}/g;
  let match;

  while ((match = articleRegex.exec(content)) !== null) {
    articlesProcessed++;
    const articleBlock = match[0];

    // Extraer información del artículo
    const idMatch = articleBlock.match(/id:\s*(\d+)/);
    const titleMatch = articleBlock.match(/title:\s*["']([^"']+)["']/);
    const contentMatch = articleBlock.match(/content:\s*`([^`]*)`/);
    const categorySlugMatch = articleBlock.match(/categorySlug:\s*["']([^"']+)["']/);
    const tagsMatch = articleBlock.match(/tags:\s*\[([^\]]*)\]/);

    if (!titleMatch) continue;

    const articleId = idMatch ? idMatch[1] : 'unknown';
    const title = titleMatch[1];
    const articleContent = contentMatch ? contentMatch[1] : '';
    const categorySlug = categorySlugMatch ? categorySlugMatch[1] : 'politica';

    // Extraer tags
    let tags = [];
    if (tagsMatch) {
      try {
        tags = tagsMatch[1]
          .split(',')
          .map(tag => tag.trim().replace(/["']/g, ''))
          .filter(tag => tag.length > 0);
      } catch (e) {
        tags = [];
      }
    }

    // Determinar la mejor imagen
    const bestImageUrl = getBestImageForArticle(title, articleContent, categorySlug, tags);

    // Verificar si ya tiene la imagen correcta
    const currentImageMatch = articleBlock.match(/imageUrl:\s*["']([^"']+)["']/);
    const currentImageUrl = currentImageMatch ? currentImageMatch[1] : null;

    if (currentImageUrl !== bestImageUrl) {
      // Reemplazar la imagen
      const oldImageDeclaration = `imageUrl: "${currentImageUrl || ''}"`;
      const newImageDeclaration = `imageUrl: "${bestImageUrl}"`;

      if (content.includes(oldImageDeclaration)) {
        content = content.replace(oldImageDeclaration, newImageDeclaration);
        console.log(`  🔄 Artículo ${articleId}: "${title.substring(0, 40)}..."`);
        console.log(`     ${currentImageUrl || 'Sin imagen'} → ${bestImageUrl}`);
        changes++;
      }
    } else {
      console.log(`  ✅ Artículo ${articleId}: "${title.substring(0, 40)}..." - Imagen correcta`);
    }
  }

  // Guardar archivo si hubo cambios
  if (changes > 0) {
    writeFile(filePath, content);
    console.log(`✅ ${changes} imágenes corregidas en ${path.basename(filePath)} (${articlesProcessed} artículos procesados)`);
  } else {
    console.log(`ℹ️  No se encontraron imágenes para corregir en ${path.basename(filePath)} (${articlesProcessed} artículos procesados)`);
  }

  return changes;
}

/**
 * Función principal
 */
function main() {
  console.log('🖼️  CORRECTOR DE IMÁGENES DE ARTÍCULOS');
  console.log('=====================================\n');

  const dataDir = path.join(__dirname, '..', 'client', 'src', 'data');
  const files = [
    'allNews.ts',
    'currentNews.ts',
    'moreCurrentNews.ts',
    'judicialNews.ts',
    'newsData.ts'
  ];

  let totalChanges = 0;
  let totalArticles = 0;

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    if (fs.existsSync(filePath)) {
      const changes = fixImagesInFile(filePath);
      totalChanges += changes;

      // Contar artículos en el archivo
      const content = readFile(filePath);
      const articleCount = (content.match(/id:\s*\d+/g) || []).length;
      totalArticles += articleCount;
    } else {
      console.log(`⚠️  Archivo no encontrado: ${file}`);
    }
  }

  console.log(`\n🎉 CORRECCIÓN COMPLETADA`);
  console.log(`📊 Total de imágenes corregidas: ${totalChanges}`);
  console.log(`📝 Total de artículos procesados: ${totalArticles}`);

  if (totalChanges > 0) {
    console.log('\n💡 CAMBIOS REALIZADOS:');
    console.log('1. ✅ Imágenes de figuras políticas corregidas');
    console.log('2. ✅ Imágenes de categorías asignadas correctamente');
    console.log('3. ✅ Contenido visual ahora coincide con el texto');

    console.log('\n🔍 VERIFICACIÓN RECOMENDADA:');
    console.log('1. Ejecuta el sitio y verifica las imágenes en las noticias');
    console.log('2. Confirma que las imágenes de Milei muestran a Milei');
    console.log('3. Verifica que las imágenes de Cristina muestran a Cristina');
    console.log('4. Comprueba que las imágenes económicas son relevantes');
  } else {
    console.log('\n✅ Todas las imágenes ya estaban correctas');
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = {
  fixImagesInFile,
  getBestImageForArticle,
  main
};
