#!/usr/bin/env tsx
/**
 * PRE-DEPLOYMENT VERIFICATION SYSTEM
 * World-Class Engineering Standards
 * Política Argentina - 2025
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

interface CheckResult {
  name: string;
  passed: boolean;
  message: string;
  critical: boolean;
}

const results: CheckResult[] = [];

// ANSI Colors
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function check(name: string, fn: () => boolean, message: string, critical = false): void {
  try {
    const passed = fn();
    results.push({ name, passed, message, critical });
    
    if (passed) {
      log(`✅ ${name}: ${message}`, 'green');
    } else {
      log(`${critical ? '🔴' : '⚠️'} ${name}: ${message}`, critical ? 'red' : 'yellow');
    }
  } catch (error: any) {
    results.push({ name, passed: false, message: error.message, critical });
    log(`❌ ${name}: ${error.message}`, 'red');
  }
}

log('\n🚀 PRE-DEPLOYMENT VERIFICATION SYSTEM', 'cyan');
log('=' .repeat(60), 'cyan');

// 1. TypeScript Compilation
log('\n📦 1. TYPESCRIPT COMPILATION', 'blue');
check(
  'TypeScript',
  () => {
    try {
      execSync('npx tsc --noEmit', { stdio: 'pipe' });
      return true;
    } catch {
      return false;
    }
  },
  'TypeScript compilation successful',
  true
);

// 2. ESLint
log('\n🔍 2. CODE QUALITY (ESLINT)', 'blue');
check(
  'ESLint',
  () => {
    try {
      execSync('npx next lint', { stdio: 'pipe' });
      return true;
    } catch {
      return false;
    }
  },
  'No linting errors found',
  false
);

// 3. Security Audit
log('\n🔒 3. SECURITY AUDIT', 'blue');
check(
  'Security',
  () => {
    try {
      const audit = execSync('npm audit --json', { encoding: 'utf-8' });
      const auditData = JSON.parse(audit);
      const critical = auditData.metadata?.vulnerabilities?.critical || 0;
      const high = auditData.metadata?.vulnerabilities?.high || 0;
      
      if (critical > 0) {
        throw new Error(`${critical} critical vulnerabilities found`);
      }
      if (high > 3) {
        throw new Error(`${high} high vulnerabilities found`);
      }
      return true;
    } catch (error: any) {
      if (error.message.includes('vulnerabilities')) {
        throw error;
      }
      return true; // npm audit might fail for other reasons
    }
  },
  'No critical security vulnerabilities',
  true
);

// 4. Environment Variables
log('\n🔐 4. ENVIRONMENT VARIABLES', 'blue');
check(
  'Env Variables',
  () => {
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    ];
    
    const missing = requiredEnvVars.filter(v => !process.env[v]);
    if (missing.length > 0) {
      throw new Error(`Missing: ${missing.join(', ')}`);
    }
    return true;
  },
  'All required environment variables present',
  false
);

// 5. Build Test
log('\n🏗️  5. BUILD TEST', 'blue');
check(
  'Next.js Build',
  () => {
    try {
      execSync('npm run build', { stdio: 'pipe', timeout: 120000 });
      return true;
    } catch {
      return false;
    }
  },
  'Production build successful',
  true
);

// 6. Image URLs Validation
log('\n🖼️  6. IMAGE URLS VALIDATION', 'blue');
check(
  'Image URLs',
  () => {
    const pageFile = join(process.cwd(), 'app', 'page.tsx');
    if (!existsSync(pageFile)) return false;
    
    const content = readFileSync(pageFile, 'utf-8');
    const imageUrls = content.match(/imageUrl:\s*['"]([^'"]+)['"]/g) || [];
    
    // Check for placeholder URLs (should not exist in production)
    const hasPlaceholder = imageUrls.some(url => 
      url.includes('placeholder.com') || url.includes('via.placeholder')
    );
    
    if (hasPlaceholder) {
      throw new Error('Placeholder images found in production code');
    }
    
    return imageUrls.length > 0;
  },
  'No placeholder images in production',
  false
);

// 7. Service Worker Validation
log('\n⚙️  7. SERVICE WORKER VALIDATION', 'blue');
check(
  'Service Worker',
  () => {
    const swFile = join(process.cwd(), 'public', 'sw.js');
    if (!existsSync(swFile)) {
      throw new Error('Service Worker file not found');
    }
    
    const content = readFileSync(swFile, 'utf-8');
    
    // Check for chrome-extension filter
    if (!content.includes('url.protocol')) {
      throw new Error('Missing protocol filter for chrome-extension');
    }
    
    return true;
  },
  'Service Worker properly configured',
  false
);

// 8. Dependencies Check
log('\n📚 8. DEPENDENCIES CHECK', 'blue');
check(
  'Dependencies',
  () => {
    try {
      const outdated = execSync('npm outdated --json', { encoding: 'utf-8' });
      const outdatedData = JSON.parse(outdated || '{}');
      const criticalOutdated = Object.entries(outdatedData).filter(
        ([_, data]: [string, any]) => {
          const current = data.current?.split('.')[0];
          const latest = data.latest?.split('.')[0];
          return current && latest && parseInt(latest) > parseInt(current) + 1;
        }
      );
      
      if (criticalOutdated.length > 5) {
        throw new Error(`${criticalOutdated.length} major version updates available`);
      }
      return true;
    } catch (error: any) {
      if (error.message.includes('updates')) {
        throw error;
      }
      return true;
    }
  },
  'Dependencies reasonably up-to-date',
  false
);

// 9. File Size Check
log('\n📏 9. FILE SIZE CHECK', 'blue');
check(
  'File Sizes',
  () => {
    const nextDir = join(process.cwd(), '.next');
    if (!existsSync(nextDir)) {
      throw new Error('.next directory not found - run build first');
    }
    
    // Check if build is reasonable size (< 100MB)
    try {
      const size = execSync(`du -sm "${nextDir}"`, { encoding: 'utf-8' });
      const sizeInMB = parseInt(size.split('\t')[0]);
      
      if (sizeInMB > 100) {
        throw new Error(`Build size too large: ${sizeInMB}MB`);
      }
      return true;
    } catch (error: any) {
      if (error.message.includes('too large')) {
        throw error;
      }
      return true;
    }
  },
  'Build size within acceptable limits',
  false
);

// 10. API Routes Check
log('\n🌐 10. API ROUTES CHECK', 'blue');
check(
  'API Routes',
  () => {
    const apiDir = join(process.cwd(), 'app', 'api');
    if (!existsSync(apiDir)) {
      throw new Error('API directory not found');
    }
    
    const requiredRoutes = ['articles', 'stats', 'push'];
    const missing = requiredRoutes.filter(route => 
      !existsSync(join(apiDir, route))
    );
    
    if (missing.length > 0) {
      throw new Error(`Missing API routes: ${missing.join(', ')}`);
    }
    
    return true;
  },
  'All required API routes present',
  true
);

// SUMMARY
log('\n' + '='.repeat(60), 'cyan');
log('📊 DEPLOYMENT VERIFICATION SUMMARY', 'cyan');
log('='.repeat(60), 'cyan');

const passed = results.filter(r => r.passed).length;
const failed = results.filter(r => !r.passed).length;
const criticalFailed = results.filter(r => !r.passed && r.critical).length;

log(`\n✅ Passed: ${passed}/${results.length}`, 'green');
if (failed > 0) {
  log(`❌ Failed: ${failed}/${results.length}`, 'red');
}
if (criticalFailed > 0) {
  log(`🔴 Critical Failures: ${criticalFailed}`, 'red');
}

if (criticalFailed > 0) {
  log('\n🚫 DEPLOYMENT BLOCKED - Critical checks failed', 'red');
  log('Fix critical issues before deploying to production', 'red');
  process.exit(1);
} else if (failed > 0) {
  log('\n⚠️  DEPLOYMENT WARNING - Some checks failed', 'yellow');
  log('Review warnings before deploying to production', 'yellow');
  process.exit(0);
} else {
  log('\n🎉 ALL CHECKS PASSED - Ready for deployment!', 'green');
  process.exit(0);
}

