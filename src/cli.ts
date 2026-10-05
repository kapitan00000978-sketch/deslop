#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { deslop, DeslopStream } from './core';
import { buildStrictPrompt } from './prompt';

const program = new Command();

program
  .name('deslop')
  .description('Anti-Slop Engine CLI')
  .version('0.4.0');

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

program.parse();
