export type StackType = 'default' | 'gsap-threejs' | 'framer-motion';
export type AgentType = 'cursor' | 'windsurf' | 'claude' | 'general';

export function generateRulesContent(stack: StackType): string {
  let animationRules = '';

  if (stack === 'gsap-threejs') {
    animationRules = `
## 3. Premium Animations (GSAP & Three.js Enforced)
- MUST use GSAP for DOM animations and scroll choreographies.
- MUST use Three.js or React Three Fiber for 3D elements.
- Implement Lenis for smooth scroll.
`;
  } else if (stack === 'framer-motion') {
    animationRules = `
## 3. Premium Animations (Framer Motion Enforced)
- MUST use Framer Motion (\`framer-motion\`) for component transitions and layout animations.
- Rely on \`useScroll\` and \`useTransform\` for scroll-based effects.
`;
  } else {
    animationRules = `
## 3. Premium Animations
- React apps: Use \`framer-motion\`.
- Vanilla/Other: Use \`GSAP\`.
- Implement smooth scroll (Lenis) if generating a full page.
`;
  }

  return `
# Deslop Anti-Slop Policy
# This project enforces strict Awwwards-level UI standards.

## 1. Zero Placeholders
- DO NOT use \`// TODO\`, \`// implement later\`, or leave empty functions. 
- You must write complete, functional code. No lazy shortcuts.

## 2. No Boring Templates
- NO Bootstrap-style grid systems or dated layouts.
- Use asymmetrical grids, expansive whitespace, and modern typographic scales.
${animationRules}
## 4. Micro-Interactions
- Add subtle hover states (magnetic buttons, glow effects, or custom cursors).
- Use glassmorphism or noise textures where appropriate.

## 5. Clean Code
- Avoid inline styles. Rely on Tailwind (or CSS Modules) entirely.
- Keep semantic HTML (avoid excessive div wrapping).
`.trim();
}
