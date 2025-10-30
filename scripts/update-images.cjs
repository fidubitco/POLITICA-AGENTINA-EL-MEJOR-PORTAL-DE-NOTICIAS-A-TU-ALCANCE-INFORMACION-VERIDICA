#!/usr/bin/env node

/**
 * 🔄 ACTUALIZADOR AUTOMÁTICO DE IMÁGENES
 *
 * Actualiza todas las imágenes del sitio con el nuevo sistema optimizado
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

// Importar el mapeo de imágenes (simulado ya que no podemos usar ES modules aquí)
const imageMapping = {
  '/images/milei-1.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/milei-2.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/milei-3.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/casa-rosada-1.jpg': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/casa-rosada-2.jpg': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/economia-argentina-1.jpg': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/dolar-blue-1.jpg': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/dolar-pesos-1.jpg': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/argentina-celebracion-1.jpg': 'https://images.unsplash.com/photo-1555374018-13a8994ab246?w=1200&h=675&fit=crop&q=80&auto=format',
  '/images/argentina-celebracion-2.jpg': 'https://images.unsplash.com/photo-1555374018-13a8994ab246?w=1200&h=675&fit=crop&q=80&auto=format',
};

// Mapeo de categorías para fallbacks
const categoryFallbacks = {
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
 * Actualiza las imágenes en un archivo de datos
 */
function updateImagesInFile(filePath) {
  console.log(`\n📁 Procesando: ${path.basename(filePath)}`);

  let content = readFile(filePath);
  let changes = 0;

  // Buscar todas las asignaciones de imageUrl
  const imageUrlRegex = /imageUrl:\s*["']([^"']+)["']/g;
  let match;

  while ((match = imageUrlRegex.exec(content)) !== null) {
    const oldUrl = match[1];
    const startPos = match.index;
    const endPos = startPos + match[0].length;

    // Determinar la categoría del artículo (buscar categorySlug cercano)
    const contextStart = Math.max(0, startPos - 500);
    const contextEnd = Math.min(content.length, endPos + 500);
    const context = content.substring(contextStart, contextEnd);

    let categorySlug = 'politica'; // default
    const categoryMatch = context.match(/categorySlug:\s*["']([^"']+)["']/);
    if (categoryMatch) {
      categorySlug = categoryMatch[1];
    }

    // Obtener nueva URL
    let newUrl = oldUrl;

    if (oldUrl.startsWith('/images/')) {
      // Es una imagen local que necesita actualización
      if (imageMapping[oldUrl]) {
        newUrl = imageMapping[oldUrl];
        console.log(`  🔄 ${oldUrl} → ${newUrl.substring(0, 60)}...`);
        changes++;
      } else {
        // Usar fallback de categoría
        newUrl = categoryFallbacks[categorySlug] || categoryFallbacks['politica'];
        console.log(`  ⚠️  ${oldUrl} → Fallback (${categorySlug}): ${newUrl.substring(0, 60)}...`);
        changes++;
      }
    } else if (!oldUrl.startsWith('http')) {
      // URL inválida
      newUrl = categoryFallbacks[categorySlug] || categoryFallbacks['politica'];
      console.log(`  ❌ ${oldUrl} → Fixed: ${newUrl.substring(0, 60)}...`);
      changes++;
    }

    // Reemplazar en el contenido
    if (newUrl !== oldUrl) {
      const oldAssignment = `imageUrl: "${oldUrl}"`;
      const newAssignment = `imageUrl: "${newUrl}"`;
      content = content.replace(oldAssignment, newAssignment);
    }
  }

  // Guardar archivo si hubo cambios
  if (changes > 0) {
    writeFile(filePath, content);
    console.log(`✅ ${changes} imágenes actualizadas en ${path.basename(filePath)}`);
  } else {
    console.log(`ℹ️  No se encontraron imágenes para actualizar en ${path.basename(filePath)}`);
  }

  return changes;
}

/**
 * Función principal
 */
function main() {
  console.log('🖼️  ACTUALIZADOR AUTOMÁTICO DE IMÁGENES');
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

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    if (fs.existsSync(filePath)) {
      totalChanges += updateImagesInFile(filePath);
    } else {
      console.log(`⚠️  Archivo no encontrado: ${file}`);
    }
  }

  console.log(`\n🎉 PROCESO COMPLETADO`);
  console.log(`📊 Total de imágenes actualizadas: ${totalChanges}`);

  if (totalChanges > 0) {
    console.log('\n💡 RECOMENDACIONES:');
    console.log('1. Verifica que las nuevas imágenes se carguen correctamente');
    console.log('2. Ejecuta el sitio en modo desarrollo para probar');
    console.log('3. Si hay problemas, revisa la conectividad con Unsplash');
    console.log('4. Considera implementar un sistema de cache local para las imágenes');
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = {
  updateImagesInFile,
  main
};
