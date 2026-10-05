#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { deslop, DeslopStream } from './core';
import { buildStrictPrompt } from './prompt';
import { CURSOR_RULES_CONTENT } from './rules';

const program = new Command();

program
  .name('deslop')
  .description('Anti-Slop Engine CLI')
  .version('0.5.0');

program
  .command('fix')
  .description('Auto-correct AI slop into strict architecture')
  .argument('<file>', 'File to fix')
  .action((filePath) => {
    const fullPath = path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) {
      console.error("❌ Error: Not found.");
      process.exit(1);
    }

    console.log(`\n🚀  Fixing slop in ${filePath}...`);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const fixedContent = deslop(content);

    fs.writeFileSync(fullPath, fixedContent, 'utf-8');
    console.log(`✅ Success! File has been desloped.`);
  });

program
  .command('pipe')
  .description('Real-time Stream Interceptor: Fix AI code as it streams via stdin')
  .action(() => {
    process.stdin.pipe(new DeslopStream()).pipe(process.stdout);
  });

program
  .command('prompt')
  .description('Compile a user request into a strict, Awwwards-level dictatorial prompt')
  .argument('<request>', 'The user request')
  .action((request) => {
    const strictPrompt = buildStrictPrompt(request);
    console.log(strictPrompt);
  });

program
  .command('init')
  .description('Initialize .cursorrules in the current project to control IDE AI agents')
  .action(() => {
    const rulePath = path.resolve(process.cwd(), '.cursorrules');
    if (fs.existsSync(rulePath)) {
      console.log(`⚠️  .cursorrules already exists. Appending Deslop rules...`);
      fs.appendFileSync(rulePath, '\n\n' + CURSOR_RULES_CONTENT, 'utf-8');
    } else {
      fs.writeFileSync(rulePath, CURSOR_RULES_CONTENT.trim(), 'utf-8');
    }
    console.log(`✅ Success! Protected this project with Deslop AI rules (.cursorrules).`);
  });

program.parse();
