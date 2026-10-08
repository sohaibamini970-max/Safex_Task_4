#!/usr/bin/env node

/**
 * Design Token Enforcer — Heritage Press Design System
 * 
 * Verifies that zero hard-coded colors (hex, rgb, rgba, hsl, hsla, or standard
 * Tailwind utility colors like bg-red-500, text-blue-600) exist outside
 * the designated token primitive and theme definition directories.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_ROOT = path.resolve(__dirname, '../src');

// Directories where raw color definitions are legitimately permitted
const ALLOWED_DIRECTORIES = [
  path.resolve(SRC_ROOT, 'tokens'),
  path.resolve(SRC_ROOT, 'themes')
];

// Regex patterns to detect hard-coded colors
const PATTERNS = [
  {
    name: 'Hex Color (#rgb, #rrggbb, #rrggbbaa)',
    // Match hex color codes not followed by variable names or url fragments
    regex: /#([0-9a-fA-F]{3,8})\b/g,
  },
  {
    name: 'RGB / RGBA Functional Color',
    regex: /rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+(?:\s*,\s*[\d.]+%?)?\s*\)/gi,
  },
  {
    name: 'HSL / HSLA Functional Color',
    regex: /hsla?\(\s*[\d.]+(?:deg)?\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?(?:\s*,\s*[\d.]+%?)?\s*\)/gi,
  },
  {
    name: 'Hard-coded Tailwind Color Utility (e.g. text-red-500, bg-blue-600)',
    // Match common tailwind hard-coded color utilities like bg-slate-100, text-zinc-900, border-red-500
    regex: /\b(?:bg|text|border|ring|fill|stroke)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white)(?:-(?:50|100|200|300|400|500|600|700|800|900|950))?\b/g,
  }
];

let totalViolations = 0;
let filesScanned = 0;
const violationsReport = [];

function isAllowedFile(filePath) {
  return ALLOWED_DIRECTORIES.some(allowedDir => filePath.startsWith(allowedDir));
}

function scanFile(filePath) {
  // Only scan .ts, .tsx, .css files
  if (!/\.(tsx?|css)$/.test(filePath)) return;
  if (isAllowedFile(filePath)) return;

  filesScanned++;
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip comments in code if any specifically marked for check-ignore
    if (line.includes('token-check-ignore')) return;

    for (const pattern of PATTERNS) {
      const matches = line.match(pattern.regex);
      if (matches) {
        // Exclude false positives like href="#...", CSS ID selectors in specs, or markdown headers
        const filteredMatches = matches.filter(match => {
          if (match.startsWith('#') && (line.includes('href=') || line.includes('anchor') || line.includes('data-testid'))) {
            return false;
          }
          return true;
        });

        if (filteredMatches.length > 0) {
          totalViolations += filteredMatches.length;
          violationsReport.push({
            file: path.relative(path.resolve(__dirname, '..'), filePath),
            line: index + 1,
            rule: pattern.name,
            matches: filteredMatches,
            snippet: line.trim()
          });
        }
      }
    }
  });
}

function scanDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile()) {
      scanFile(fullPath);
    }
  }
}

console.log('========================================================');
console.log('  Heritage Press Design System — Color Token Validator  ');
console.log('========================================================\n');
console.log(`Scanning source files under src/ (excluding tokens/ and themes/)...`);

scanDir(SRC_ROOT);

console.log(`Scanned ${filesScanned} source files.\n`);

if (totalViolations > 0) {
  console.error(`❌ FAILED: Found ${totalViolations} hard-coded color violation(s) outside token definitions!\n`);
  violationsReport.forEach((v, i) => {
    console.error(`[Violation ${i + 1}] ${v.file}:${v.line}`);
    console.error(`  Rule: ${v.rule}`);
    console.error(`  Matched: ${v.matches.join(', ')}`);
    console.error(`  Code: "${v.snippet}"\n`);
  });
  console.error('All colors MUST be referenced via CSS variable design tokens.');
  console.error('See docs/TOKENS.md for allowed semantic & component token variables.\n');
  process.exit(1);
} else {
  console.log('✅ PASSED: Zero hard-coded colors detected!');
  console.log('All components, layouts, failure states, and views strictly adhere to design tokens.\n');
  process.exit(0);
}
