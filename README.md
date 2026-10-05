<div align="center">
  <h1>🛑 deslop</h1>
  <p><b>The Anti-Slop Engine for AI-generated code.</b></p>
</div>

AI is amazing at writing code fast, but left unchecked, it produces "slop" — hardcoded hex colors, lazy placeholders, and boring 2010s-era Bootstrap templates. 

**`deslop`** is a lightweight, zero-dependency engine that strictly enforces high-end, Awwwards-winning architecture (GSAP, Three.js, clean Tailwind) on AI outputs.

## 🚀 The 3-Step Workflow

### Step 1: Protect your IDE (`init`)
Run this in any project to generate a `.cursorrules` file. This acts as a strict firewall, telling IDE AIs (like Cursor or Copilot) to stop generating cheap templates and start writing premium UI code.

```bash
npx deslop init
```
*Creates `.cursorrules` instructing the AI to use GSAP, avoid placeholders (`// TODO`), and write clean semantic HTML.*

### Step 2: The Prompt Dictator (`prompt`)
Building your own AI Agent? Wrap the user's prompt into our dictatorial system prompt to enforce premium quality at the API level.

```bash
npx deslop prompt "create a portfolio website"
```

### Step 3: Real-time Slop Interceptor (`pipe`)
AI still messed up? Pipe the streaming output directly through `deslop` to fix bad Tailwind classes and remove lazy slop in real-time. Costs 0 extra API tokens.

```bash
# Stream your AI output through deslop
node run-my-ai.js | npx deslop pipe > result.tsx
```

## 📦 Usage as an NPM Library

You can seamlessly import `deslop` into your own AI projects:

```typescript
import { buildStrictPrompt, deslop, DeslopStream } from 'deslop-ai';

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
