<div align="center">
  <h1>🧹 deslop</h1>
  <p><b>The Anti-Slop Engine for AI-generated code.</b></p>
</div>

AI is amazing at writing code fast, but it often produces "slop" — hardcoded hex colors, inline styles, duplicated Tailwind classes, and unresolved `TODO`s. 

**`deslop`** is a lightning-fast CLI that audits and auto-formats AI-generated output into strict, high-end architecture. Think of it as ESLint or Prettier, but explicitly designed to catch and clean AI anti-patterns.

## 🚀 Quick Start

```bash
# Check a file for AI slop
npx deslop check ./components/Hero.tsx

# Auto-fix slop (Coming soon)
npx deslop fix ./components/Hero.tsx
```

## ⚠️ What it catches

1. **Design Token Violations:** AI loves `bg-[#0a0a0f]`. `deslop` catches this and forces semantic tokens (e.g. `bg-surface-elevated`).
2. **Architecture Violations:** Warns on inline `style="..."` properties.
3. **Zero-Placeholder Rules:** Catches `lorem ipsum` and `// TODO:` artifacts left behind by lazy AI.

---
*Built for the post-AI era.*
