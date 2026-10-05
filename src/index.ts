#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { Transform } from 'stream';

const program = new Command();

program
  .name('deslop')
  .description('Anti-Slop Engine: Clean and enforce architecture on AI-generated code')
  .version('0.2.0');

// Design System Token Map (PoC mapping rules)
const tokenMap: Record<string, string> = {
  'bg-[#0a0a0f]': 'bg-surface-primary',
  'text-[#6366f1]': 'text-accent',
  'text-[#9aa3b8]': 'text-secondary',
  'bg-[#22d3ee]': 'bg-accent-glow',
};

// Reusable function to fix a string chunk on-the-fly (Zero-token fix)
function fixSlopChunk(chunk: string): string {
    let content = chunk;
    
    // 1. Auto-Fix Design Tokens
    for (const [slop, token] of Object.entries(tokenMap)) {
      content = content.replaceAll(slop, token);
    }

    // 2. Auto-Fix Inline Styles
    const styleRegex = /class="([^"]+)"\s*style="margin-top: 20px; letter-spacing: 1px;"/g;
    content = content.replace(styleRegex, 'class="$1 mt-5 tracking-wide"');

    // 3. Auto-Remove Lazy TODOs
    const todoRegex = /\s*<!-- \/\/ TODO:[^>]+-->\n?/g;
    content = content.replace(todoRegex, '');

    return content;
}

program
  .command('pipe')
  .description('Real-time Stream Interceptor: Fix AI code as it streams via stdin')
  .action(() => {
    // Create a Node.js Transform Stream
    const slopTransformer = new Transform({
      transform(chunk, encoding, callback) {
        // Convert incoming chunk buffer to string
        const text = chunk.toString();
        // Fix the slop instantly in memory (before it reaches the user/disk)
        const fixedText = fixSlopChunk(text);
        // Push the clean text to stdout
        this.push(fixedText);
        callback();
      }
    });

    // Pipe stdin (simulating AI output stream) -> transformer -> stdout
    process.stdin.pipe(slopTransformer).pipe(process.stdout);
  });

// Kept old commands for compatibility
program.command('check').argument('<file>').action((filePath) => { /* ... */ });
program.command('fix').argument('<file>').action((filePath) => { /* ... */ });

program.parse();
