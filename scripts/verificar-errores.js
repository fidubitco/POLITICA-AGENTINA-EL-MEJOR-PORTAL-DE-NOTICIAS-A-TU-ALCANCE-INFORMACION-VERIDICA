#!/usr/bin/env node

/**
 * Script de Verificación de Errores 404 y 403
 * Verifica todas las rutas, imágenes y recursos del sitio
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('🔍 Iniciando auditoría de errores 404 y 403...\n');

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

let errorsFound = 0;
let warningsFound = 0;

// 1. Verificar imágenes requeridas
console.log('📸 Verificando imágenes locales...');
const requiredImages = [
  'milei-1.jpg',
  'milei-2.jpg',
  'milei-3.jpg',
  'casa-rosada-1.jpg',
  'casa-rosada-2.jpg',
  'dolar-blue-1.jpg',
  'economia-argentina-1.jpg',
  'argentina-celebracion-1.jpg',
];

const imagesDir = path.join(rootDir, 'public', 'images');

if (!fs.existsSync(imagesDir)) {
  console.log(`${colors.red}❌ ERROR: Directorio /public/images/ no existe${colors.reset}`);
  errorsFound++;
} else {
  requiredImages.forEach(image => {
    const imagePath = path.join(imagesDir, image);
    if (fs.existsSync(imagePath)) {
      console.log(`${colors.green}✅ ${image}${colors.reset}`);
    } else {
      console.log(`${colors.red}❌ FALTA: ${image}${colors.reset}`);
      errorsFound++;
    }
  });
}

// 2. Verificar páginas requeridas
console.log('\n📄 Verificando páginas...');
const requiredPages = [
  'app/page.tsx',
  'app/politica/page.tsx',
  'app/economia/page.tsx',
  'app/judicial/page.tsx',
  'app/internacional/page.tsx',
  'app/sociedad/page.tsx',
  'app/admin/page.tsx',
  'app/admin/noticias/page.tsx',
  'app/admin/noticias/nueva/page.tsx',
  'app/admin/categorias/page.tsx',
  'app/admin/tags/page.tsx',
  'app/admin/usuarios/page.tsx',
  'app/admin/configuracion/page.tsx',
];

requiredPages.forEach(page => {
  const pagePath = path.join(rootDir, page);
  if (fs.existsSync(pagePath)) {
    console.log(`${colors.green}✅ ${page}${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ FALTA: ${page}${colors.reset}`);
    errorsFound++;
  }
});

// 3. Verificar archivos de configuración
console.log('\n⚙️  Verificando archivos de configuración...');
const configFiles = [
  'next.config.js',
  'package.json',
  'tsconfig.json',
  'tailwind.config.js',
  'app/layout.tsx',
  'app/globals.css',
];

configFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`${colors.green}✅ ${file}${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ FALTA: ${file}${colors.reset}`);
    errorsFound++;
  }
});

// 4. Verificar archivos SEO
console.log('\n🔍 Verificando archivos SEO...');
const seoFiles = [
  'app/sitemap.ts',
  'app/robots.ts',
  'app/manifest.ts',
];

seoFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`${colors.green}✅ ${file}${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠️  OPCIONAL: ${file}${colors.reset}`);
    warningsFound++;
  }
});

// 5. Buscar URLs externas que puedan causar 403
console.log('\n🌐 Buscando URLs externas...');
const searchForExternalUrls = (dir) => {
  const files = fs.readdirSync(dir);
  const externalUrls = [];

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      externalUrls.push(...searchForExternalUrls(filePath));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Buscar URLs de Unsplash
      const unsplashMatches = content.match(/https?:\/\/.*unsplash\.com[^\s"')]+/g);
      if (unsplashMatches) {
        unsplashMatches.forEach(url => {
          externalUrls.push({ file: filePath.replace(rootDir, ''), url, type: 'unsplash' });
        });
      }

      // Buscar otras URLs externas en src o imageUrl
      const externalMatches = content.match(/(src|imageUrl)=["']https?:\/\/[^\s"']+["']/g);
      if (externalMatches) {
        externalMatches.forEach(match => {
          const url = match.match(/https?:\/\/[^\s"']+/)[0];
          if (!url.includes('politicaargentina.com')) {
            externalUrls.push({ file: filePath.replace(rootDir, ''), url, type: 'external' });
          }
        });
      }
    }
  });

  return externalUrls;
};

const appDir = path.join(rootDir, 'app');
const externalUrls = searchForExternalUrls(appDir);

if (externalUrls.length === 0) {
  console.log(`${colors.green}✅ No se encontraron URLs externas en imágenes${colors.reset}`);
} else {
  console.log(`${colors.yellow}⚠️  Se encontraron ${externalUrls.length} URLs externas:${colors.reset}`);
  externalUrls.forEach(({ file, url, type }) => {
    if (type === 'unsplash') {
      console.log(`${colors.yellow}  ⚠️  ${file}: ${url}${colors.reset}`);
      warningsFound++;
    } else {
      console.log(`${colors.blue}  ℹ️  ${file}: ${url}${colors.reset}`);
    }
  });
}

// 6. Verificar links rotos (href="#")
console.log('\n🔗 Verificando links...');
const searchForBrokenLinks = (dir) => {
  const files = fs.readdirSync(dir);
  const brokenLinks = [];

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      brokenLinks.push(...searchForBrokenLinks(filePath));
    } else if (file.endsWith('.tsx')) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Buscar href="#"
      const matches = content.match(/href=["']#["']/g);
      if (matches) {
        brokenLinks.push({ file: filePath.replace(rootDir, ''), count: matches.length });
      }
    }
  });

  return brokenLinks;
};

const brokenLinks = searchForBrokenLinks(appDir);

if (brokenLinks.length === 0) {
  console.log(`${colors.green}✅ No se encontraron links rotos (href="#")${colors.reset}`);
} else {
  console.log(`${colors.yellow}⚠️  Se encontraron ${brokenLinks.length} archivos con links vacíos:${colors.reset}`);
  brokenLinks.forEach(({ file, count }) => {
    console.log(`${colors.yellow}  ⚠️  ${file}: ${count} link(s) con href="#"${colors.reset}`);
    warningsFound++;
  });
}

// Resumen final
console.log('\n' + '='.repeat(60));
console.log('📊 RESUMEN DE LA AUDITORÍA');
console.log('='.repeat(60));

if (errorsFound === 0 && warningsFound === 0) {
  console.log(`${colors.green}✅ ¡Perfecto! No se encontraron errores ni advertencias${colors.reset}`);
} else {
  if (errorsFound > 0) {
    console.log(`${colors.red}❌ Errores críticos: ${errorsFound}${colors.reset}`);
  }
  if (warningsFound > 0) {
    console.log(`${colors.yellow}⚠️  Advertencias: ${warningsFound}${colors.reset}`);
  }
}

console.log('\n✅ Auditoría completada\n');

// Exit code
process.exit(errorsFound > 0 ? 1 : 0);

