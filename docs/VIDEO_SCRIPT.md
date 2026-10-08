# Screen Recording Video Walkthrough Script (5–10 Minutes)

**Presenter:** Lead Front-End Engineer & Design-Systems Architect  
**Project:** Heritage Regional Printing Press UI Design System  
**Format:** Screen recording with webcam in corner; switching between code editor, browser playground, and terminal.

---

### [0:00 – 0:45] 1. Introduction
- **Visual:** Face on camera, transition to full screen view of the Heritage Press Design System Playground.
- **Audio / Talking Points:**
  - *"Hi everyone, I'm presenting my Week 4 Specialist Advanced Build for the SDC Web Development internship."*
  - *"Today I'm presenting a complete, production-grade design system engineered for the Heritage Regional Printing Press, built with React, Vite, TypeScript, Tailwind CSS, and Playwright."*
  - *"This project solves a real-world multi-shift printing press operational challenge with a 3-layer design token architecture, 3 full themes, 10 accessible components, 5 resilient failure state workflows, and automated visual regression testing."*

---

### [0:45 – 2:00] 2. Client Problem & Scope
- **Visual:** Open `docs/SCOPE.md` in VS Code, highlighting Section 2 (Problem Statement).
- **Audio / Talking Points:**
  - *"The client operates high-precision Heidelberg letterpresses and offset printing machinery."*
  - *"Their digital operations suffered from three core issues: night-shift operators experienced severe eye fatigue under fluorescent-tuned interfaces, critical preflight errors crashed ungracefully with blank screens, and small style updates caused unintended visual regressions across disparate screens."*
  - *"In response, we scoped out an airtight token pipeline with zero hard-coded colors, an editorial 'Brand' theme modeled on paper parchment and vermilion press proof stamps, and automated pixel-by-pixel regression detection."*

---

### [2:00 – 4:00] 3. Token Architecture Walkthrough
- **Visual:** Split screen in VS Code showing `primitives.css`, `semantic.css`, and `components.css`.
- **Audio / Talking Points:**
  - *"Let's look at our 3-tier token architecture."*
  - *"In `primitives.css`, we define raw physical constants: Heidelberg ink black `#0a0f1d`, paper parchment tones, and 4px baseline spacing scales from 4px to 64px."*
  - *"Next, in `semantic.css`, we map these raw values to contextual aliases: `--color-bg-primary`, `--color-text-secondary`, and `--color-accent`."*
  - *"Crucially, our theme files — `light.css`, `dark.css`, and `brand.css` — override ONLY semantic tokens. Primitive tokens are completely immutable."*
  - *"Finally, in `components.css`, components bind to these semantic tokens. Notice `--button-primary-bg` references `--color-accent`. When the theme changes on the root HTML tag, the button responds instantaneously without altering component code."*

---

### [4:00 – 6:00] 4. Live Browser Demo: Components & Theming
- **Visual:** Browser showing `http://localhost:3000/`.
- **Audio / Talking Points:**
  - *"Here is the live design system playground running in Vite."*
  - *"Notice the theme selector at the top right. Watch how smoothly we transition from Daylight Light mode to Night Shift Dark mode — designed specifically for low-light pressrooms with deep ink backgrounds."*
  - *"Now observe our signature Brand theme: the canvas transforms into warm cotton-rag paper cream, typography switches to classical editorial serif, and accents take on the rich vermilion red of letterpress proof stamps."*
  - *"Let's inspect our components: primary, secondary, ghost, and danger buttons; 3 card variants; accessible status badges; and input states."*
  - *"Now let's highlight our 5 failure states: Offline, Timeout, 500 Server Error, Invalid Data, and Expired Session. Each failure state uses tokens exclusively, contains inline SVGs, and offers a clear recovery button."*

---

### [6:00 – 7:30] 5. Visual Regression Testing Demo (The "Intentional Break")
- **Visual:** Terminal split with VS Code.
- **Audio / Talking Points:**
  - *"Now let's see how we protect this design system against accidental regressions without relying on expensive SaaS tools like Chromatic."*
  - *"We configured Playwright to capture pixel screenshots of all components across all three themes."*
  - *"Let's simulate a regression. In `src/themes/brand.css`, suppose an engineer accidentally changes `--color-accent` to neon green: `#00ff00`."*
  - *"I run `npm run test:visual` in the terminal."*
  - *(Show terminal failing with screenshot mismatch error).*
  - *"Playwright immediately halts the build, detecting a 12.8% pixel ratio drift."*
  - *"Opening the Playwright HTML report reveals a side-by-side comparison with the golden baseline, highlighting the exact drifted pixels in red overlay."*
  - *"We revert the change, rerun, and all tests turn green."*

---

### [7:30 – 8:30] 6. Color Validation Script & Results
- **Visual:** Terminal running `npm run check:colors`.
- **Audio / Talking Points:**
  - *"To guarantee that no developer accidentally introduces a hard-coded hex or Tailwind color utility, we created `scripts/check-hardcoded-colors.js`."*
  - *"Let's run `npm run check:colors`."*
  - *"The script scans 24 source files across `src/` using AST regex patterns. It confirms that zero hard-coded hex, rgb, hsl, or Tailwind color utilities exist outside the token files."*
  - *"This check runs automatically on every Git commit and PR via our GitHub Actions workflow."*

---

### [8:30 – 9:30] 7. Limitations & Future Roadmap
- **Visual:** `README.md` Limitations and Improvements sections.
- **Audio / Talking Points:**
  - *"Let's discuss current limitations and future enhancements."*
  - *"Limitation 1: Browser font anti-aliasing can cause subtle 0.1% sub-pixel rendering differences when running Playwright across different host OSes. We solved this in CI by pinning our tests to a fixed Linux container."*
  - *"Limitation 2: We have not yet integrated automated contrast ratio (APCA/WCAG 2.2) assertions in CI for custom user-generated color palettes."*
  - *"For future improvements: we plan to generate Figma Tokens Studio JSON sync pipelines, and implement a live color-blindness simulator mode directly in the playground."*

---

### [9:30 – 10:00] 8. Wrap-up
- **Visual:** Return to live playground in Brand theme.
- **Audio / Talking Points:**
  - *"In summary, the Heritage Press Design System provides a bulletproof foundation: 3-tier token architecture, 3 cohesive themes, 10 accessible components, 5 failure states, and full automated visual regression testing."*
  - *"All code, tests, and documentation are available in the repository. Thank you for watching!"*
