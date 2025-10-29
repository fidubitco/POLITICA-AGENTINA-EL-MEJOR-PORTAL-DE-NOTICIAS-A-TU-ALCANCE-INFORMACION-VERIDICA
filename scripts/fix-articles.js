/**
 * Script para corregir artículos:
 * - Agregar categorySlug donde falte
 * - Normalizar categorías a minúsculas
 * - Agregar campos faltantes
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../client/src/data');
const files = ['currentNews.ts', 'moreCurrentNews.ts'];

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Agregar categorySlug después de category si no existe
  content = content.replace(
    /category: '([^']+)',\n(?!.*categorySlug)/gm,
    (match, category) => {
      const slug = category.toLowerCase();
      return `category: '${slug}',\n    categorySlug: '${slug}',\n`;
    }
  );
  
  // Agregar shares si no existe
  content = content.replace(
    /likes: (\d+),\n(?!.*shares)/gm,
    (match, likes) => {
      const shares = Math.floor(likes * 0.6);
      return `likes: ${likes},\n    shares: ${shares},\n`;
    }
  );
  
  // Agregar createdAt y updatedAt si no existen
  content = content.replace(
    /publishedAt: ([^,]+),\n(?!.*createdAt)/gm,
    (match, publishedAt) => {
      return `publishedAt: ${publishedAt},\n    createdAt: ${publishedAt},\n    updatedAt: ${publishedAt},\n`;
    }
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Fixed: ${file}`);
});

console.log('\n🎉 All articles fixed!');

