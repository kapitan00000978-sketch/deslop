<div align="center">
  <h1>🛑 deslop</h1>
  <p><b>The Anti-Slop Engine for AI-generated code.</b></p>
</div>

AI is amazing at writing code fast, but left unchecked, it produces "slop" — hardcoded hex colors, lazy placeholders, and boring 2010s-era Bootstrap templates. 

**`deslop`** fixes AI in two ways:
1. **Pre-Processing (Prompt Dictator):** Forces the AI to generate high-end, Awwwards-winning code (Three.js, GSAP, Spline, Lenis) instead of cheap generic templates.
2. **Post-Processing (Real-time Stream Interceptor):** Cleans up bad Tailwind, removes inline styles, and intercepts `// TODO` lazy blocks with zero extra token costs.

## 🚀 Quick Start

### 1. Pre-Processing (Force Premium Quality)
Wrap your user's prompt into a draconian system instruction that forces the AI to be a top-tier frontend architect.

```bash
# Compile a basic request into an elite strict prompt
npx deslop prompt "create a portfolio website"
```
*Output will inject strict rules mandating GSAP, Three.js, Codrops-style micro-interactions, and smooth scrolling.*

### 2. Post-Processing (Fix AI output in real-time)
If you are streaming AI output, pipe it directly through `deslop` to fix it in memory before it even reaches the file system!

```bash
# Example: Stream your AI script through deslop
node run-my-ai.js | npx deslop pipe > result.tsx
```

## 📦 Using as a Library in your AI Agent

You can use `deslop` inside your own AI tool or Node.js backend.

```typescript
import { buildStrictPrompt, deslop, DeslopStream } from 'deslop';

// 1. Force the AI to write high-end code
const prompt = buildStrictPrompt("Menga 3D portfolio sayt kerak");
const aiResponse = await myLLM.generate(prompt);

// 2. Clean the resulting code of any remaining "slop"
const cleanCode = deslop(aiResponse);

// 3. Or use the Stream interceptor (0 extra tokens!)
process.stdin.pipe(new DeslopStream()).pipe(process.stdout);
```

---
*Built for the post-AI era.*
