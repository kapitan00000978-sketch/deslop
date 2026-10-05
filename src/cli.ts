#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { deslop, DeslopStream } from './core';
import { buildStrictPrompt } from './prompt';
import { generateRulesContent, StackType, AgentType } from './rules';

const program = new Command();

program
  .name('deslop')
  .description('Anti-Slop Engine CLI')
  .version('0.6.0');

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
  .description('Initialize AI rules in the current project to control IDE AI agents')
  .option('--agent <type>', 'Specify the agent type: cursor | windsurf | claude | general', 'cursor')
  .option('--stack <type>', 'Specify the stack: default | gsap-threejs | framer-motion', 'default')
  .action((options) => {
    const agent: AgentType = options.agent as AgentType;
    const stack: StackType = options.stack as StackType;
    
    let filename = '.cursorrules';
    if (agent === 'windsurf') filename = '.windsurfrules';
    else if (agent === 'claude') filename = 'CLAUDE.md';
    else if (agent === 'general') filename = 'AGENTS.md';

    const rulesContent = generateRulesContent(stack);
    const rulePath = path.resolve(process.cwd(), filename);

    if (fs.existsSync(rulePath)) {
      console.log(`⚠️  ${filename} already exists. Appending Deslop rules...`);
      fs.appendFileSync(rulePath, '\n\n' + rulesContent, 'utf-8');
    } else {
      fs.writeFileSync(rulePath, rulesContent, 'utf-8');
    }
    
    console.log(`✅ Success! Protected this project with Deslop rules (${filename}) using stack [${stack}].`);
  });

program.parse();
