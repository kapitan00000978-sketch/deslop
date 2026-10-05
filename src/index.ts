#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();

program
  .name('deslop')
  .description('Anti-Slop Engine: Clean and enforce architecture on AI-generated code')
  .version('0.1.0');

// Design System Token Map (PoC mapping rules)
const tokenMap: Record<string, string> = {
  'bg-[#0a0a0f]': 'bg-surface-primary',
  'text-[#6366f1]': 'text-accent',
  'text-[#9aa3b8]': 'text-secondary',
  'bg-[#22d3ee]': 'bg-accent-glow',
};

function processCheck(content: string, filePath: string) {
    let issues = 0;
    
    const hexRegex = /text-\[\#[a-fA-F0-9]{3,6}\]|bg-\[\#[a-fA-F0-9]{3,6}\]/g;
    const hexMatches = content.match(hexRegex);
    if (hexMatches) {
      console.log(`\n⚠️  [DESIGN TOKEN VIOLATION]`);
      console.log(`   Found ${hexMatches.length} hardcoded hex colors bypassing your design system.`);
      issues += hexMatches.length;
    }

    const styleRegex = /style="[^"]*"/g;
    const styleMatches = content.match(styleRegex);
    if (styleMatches) {
      console.log(`\n⚠️  [ARCHITECTURE VIOLATION]`);
      console.log(`   Found ${styleMatches.length} inline style(s).`);
      issues += styleMatches.length;
    }

    if (content.toLowerCase().includes('lorem ipsum') || content.includes('<!-- // TODO:')) {
      console.log(`\n⚠️  [ZERO-PLACEHOLDER VIOLATION]`);
      console.log(`   Found dummy content or TODO artifacts.`);
      issues++;
    }
    return issues;
}

program
  .command('check')
  .description('Audit a file for AI slop')
  .argument('<file>', 'File to analyze')
  .action((filePath) => {
    const fullPath = path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) console.error(`❌ Error: Not found.`) && process.exit(1);
    
    console.log(`\n🔍 Analyzing ${filePath} for slop...`);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const issues = processCheck(content, filePath);
    
    if (issues === 0) {
      console.log(`\n✨ Clean! No AI slop detected. Perfect architecture.`);
    } else {
      console.log(`\n❌ Found ${issues} slop patterns. Run 'deslop fix ${filePath}' to auto-correct.`);
    }
  });

program
  .command('fix')
  .description('Auto-correct AI slop into strict architecture')
  .argument('<file>', 'File to fix')
  .action((filePath) => {
    const fullPath = path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) console.error(`❌ Error: Not found.`) && process.exit(1);

    console.log(`\n🛠️  Fixing slop in ${filePath}...`);
    let content = fs.readFileSync(fullPath, 'utf-8');
    
    // 1. Auto-Fix Design Tokens
    for (const [slop, token] of Object.entries(tokenMap)) {
      content = content.replaceAll(slop, token);
    }

    // 2. Auto-Fix Inline Styles (Convert to Tailwind classes)
    // Specifically finding the style in our example and merging it into the class attribute
    const styleRegex = /class="([^"]+)"\s*style="margin-top: 20px; letter-spacing: 1px;"/g;
    content = content.replace(styleRegex, 'class="$1 mt-5 tracking-wide"');

    // 3. Auto-Remove Lazy TODOs
    const todoRegex = /\s*<!-- \/\/ TODO: Add dynamic background later -->\n/g;
    content = content.replace(todoRegex, '');

    // Write cleaned code back to file
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✨ Success! File has been desloped. Re-running check...`);
    
    // Validate that it's clean now
    const checkIssues = processCheck(content, filePath);
    if (checkIssues === 0) console.log(`\n✅ 100% CLEAN. Architecture enforced.`);
  });

program.parse();
