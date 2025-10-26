#!/usr/bin/env node
/**
 * Script para copiar archivos públicos al directorio de build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../client/public');
const buildDir = path.join(__dirname, '../public');

const filesToCopy = [
  'favicon.ico',
  'favicon.png',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'logo.png',
  'logo-horizontal.png',
  'manifest.json',
  'robots.txt',
  'sitemap.xml',
  'sw.js'
];

console.log('📦 Copiando archivos públicos...');

filesToCopy.forEach(file => {
  const source = path.join(publicDir, file);
  const dest = path.join(buildDir, file);
  
  if (fs.existsSync(source)) {
    try {
      fs.copyFileSync(source, dest);
      console.log(`✅ Copiado: ${file}`);
    } catch (error) {
      console.error(`❌ Error copiando ${file}:`, error.message);
    }
  } else {
    console.warn(`⚠️  No encontrado: ${file}`);
  }
});

// Copiar directorios
const dirsToCopy = ['images', 'locales'];

dirsToCopy.forEach(dir => {
  const source = path.join(publicDir, dir);
  const dest = path.join(buildDir, dir);
  
  if (fs.existsSync(source)) {
    try {
      fs.cpSync(source, dest, { recursive: true });
      console.log(`✅ Copiado directorio: ${dir}`);
    } catch (error) {
      console.error(`❌ Error copiando directorio ${dir}:`, error.message);
    }
  } else {
    console.warn(`⚠️  Directorio no encontrado: ${dir}`);
  }
});

console.log('✨ Archivos públicos copiados exitosamente!');

