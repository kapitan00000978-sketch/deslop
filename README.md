<div align="center">
  <img src="./assets/logo.jpg" width="200" alt="deslop logo" style="border-radius: 20px; margin-bottom: 20px;" />
  <h1>deslop</h1>
  <p><b>The Anti-Slop Engine for AI-generated code.</b></p>
</div>

AI is amazing at writing code fast, but left unchecked, it produces "slop" — hardcoded hex colors, lazy placeholders, and boring 2010s-era Bootstrap templates. 

**`deslop`** is a lightweight, zero-dependency engine that strictly enforces high-end, Awwwards-winning architecture (GSAP, Three.js, clean Tailwind) on AI outputs.

## 🚀 Quick Start (via GitHub)
Since `deslop` is an open-source GitHub tool, you can run it directly from your terminal using `npx` without needing to install anything locally.

## The 3-Step Workflow

### Step 1: Protect your IDE (`init`)
Run this in any project to generate a strict rules file (`.cursorrules`, `.windsurfrules`, etc.). This acts as a strict firewall, telling IDE AIs to stop generating cheap templates and start writing premium UI code.

```bash
# Default (Cursor)
npx github:kapitan00000978-sketch/deslop init

# Specify Agent and Stack
npx github:kapitan00000978-sketch/deslop init --agent windsurf --stack framer-motion
```

### Step 2: The Prompt Dictator (`prompt`)
Building your own AI Agent? Wrap the user's prompt into our dictatorial system prompt to enforce premium quality at the API level.

```bash
npx github:kapitan00000978-sketch/deslop prompt "create a portfolio website"
```

### Step 3: Real-time Slop Interceptor (`pipe`)
AI still messed up? Pipe the streaming output directly through `deslop` to fix bad Tailwind classes, remove stray `console.log`s, and destroy lazy `// TODO` slop in real-time. Costs 0 extra API tokens.

```bash
# Stream your AI output through deslop
node run-my-ai.js | npx github:kapitan00000978-sketch/deslop pipe > result.tsx
```

## 📦 Usage as a Module

You can seamlessly install and import `deslop` directly from GitHub into your own AI projects:

```bash
npm install github:kapitan00000978-sketch/deslop
```

```typescript
import { buildStrictPrompt, deslop, DeslopStream } from 'deslop-engine';

// 1. Force the AI to write high-end code
const strictPrompt = buildStrictPrompt("Menga 3D portfolio sayt kerak");
const aiResponse = await myLLM.generate(strictPrompt);

// 2. Post-process: clean the resulting code of any remaining "slop"
const cleanCode = deslop(aiResponse);

// 3. Or use the Stream interceptor (0 extra tokens, 0 delay!)
process.stdin.pipe(new DeslopStream()).pipe(process.stdout);
```

---
*Built for the post-AI era.*
