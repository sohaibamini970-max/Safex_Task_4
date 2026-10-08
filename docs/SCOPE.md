# Scope Statement: Regional Printing Press Design System

**Project:** Heritage Regional Printing Press UI Design System & Component Library  
**Author:** Lead Front-End Engineer & Design-Systems Architect  
**Status:** Approved Baseline  
**Date:** Prior to Sprint Commencement (Week 4 Specialist Advanced Build)  

---

## 1. Client Background
**Heritage Regional Printing Press** is a mid-sized, high-craft commercial print house specializing in offset lithography, Heidelberg letterpress, foil stamping, and short-run bespoke publications. Their internal press floor, prepress client proofing portal, and automated plate queue systems suffer from fragmented user interfaces built across different decades without shared style standards.

## 2. Problem Statement
The client faces three operational bottlenecks in their digital tooling:
1. **Inconsistent Theming & Night-Shift Strain:** Machine operators running graveyard press shifts struggle with harsh office-light interfaces, while clients reviewing digital proofs require warm parchment aesthetics that accurately mimic physical paper tones.
2. **Brittle Error Handling:** When press networks disconnect, heavy RIP (Raster Image Processor) files time out, or unverified PDF preflight data arrives, the existing UI displays raw JavaScript exceptions or unstyled white screens.
3. **Unchecked Style Regressions:** Front-end changes regularly break critical production controls without automated detection, leading to delays on the physical print floor.

## 3. Goals
- Architect an enterprise-ready, 3-layer CSS custom property design token system.
- Implement 3 bespoke themes: **Light** (office/daylight), **Dark** (graveyard shift/low-light), and **Brand** (Heritage letterpress: deep ink blues, warm paper creams, and vermilion proof red).
- Develop 10 accessible, production-grade UI components with zero hard-coded colors or arbitrary spacing.
- Build 3 responsive layout primitives (Stack, Grid, Container).
- Model 5 user-facing failure state workflows (Offline, Timeout, 500 Server Error, Invalid Data, Expired Session).
- Establish automated visual regression testing using Playwright with an intentional style regression workflow.
- Enforce strict token adherence via automated AST/regex validation scripts.

## 4. In Scope
- **Design Token Layers:**
  - Layer 1: Atomic Primitives (raw colors, spacing, typography, radii, shadows).
  - Layer 2: Semantic Tokens (functional aliases for surfaces, text, borders, feedback).
  - Layer 3: Component Tokens (isolated component styles referencing semantic tokens).
- **Themes:**
  - Light, Dark, and Brand themes overriding semantic tokens exclusively.
- **Component Specimen (10 Components):**
  - Button, Card, Badge, Alert, Input, Modal, Tabs, Tooltip, Skeleton, EmptyState.
- **Layout Primitives:**
  - Stack (flex flow with token gap), Grid (responsive grid with token gap), Container (max-width viewport wrapper).
- **Failure Recovery States:**
  - OfflineState, TimeoutState, ServerErrorState, InvalidDataState, ExpiredSessionState.
- **Playground Showcase:**
  - Single-page specimen with live theme switching, interactive modal, tab controls, and data-testid attributes for testing.
- **Automated Quality Assurances:**
  - Playwright visual regression test suite capturing >20 snapshots across themes and states.
  - Custom Node.js validation script (`check-hardcoded-colors.js`) verifying 0 hard-coded colors.
  - GitHub Actions CI workflow definition.

## 5. Out of Scope
- Backend database implementations (e.g. Postgres/Cloud SQL) or live printer hardware serial drivers.
- Live billing, credit card payment gateways, or cart checkout processing.
- Multi-tenant client customer relationship management (CRM) backend.
- Proprietary desktop RIP rasterization software integrations.

## 6. Assumptions
- Modern browser compatibility: Chromium, WebKit, and Firefox with native CSS custom property support.
- Local execution runs via Node.js v20+ with Vite and TypeScript strict mode.
- Users have local or CI environments capable of running headless Chromium for Playwright screenshot comparison.

## 7. Constraints
- **Zero Arbitrary Colors:** No raw hex, rgb, or default Tailwind color classes in component source code outside token files.
- **Theme Override Discipline:** Themes may ONLY override semantic tokens; primitive tokens must remain immutable.
- **Visual Failure States:** Each failure state must compose existing design system components (`Alert`, `EmptyState`, `Button`) and provide an actionable recovery pathway.
- **Self-Contained Icons:** Zero external icon dependencies in failure state components (inline SVGs only).

## 8. Success Criteria
1. **Token Hygiene:** `npm run check:colors` completes with 0 violations found across all component and layout files.
2. **Thematic Fidelity:** Instantaneous theme toggling without page reload; brand theme authentically conveys letterpress identity (warm paper creams and vermilion red).
3. **Visual Testing Coverage:** Over 20 screenshot test cases passing across all themes in Playwright.
4. **Reproducible Regression Catch:** Intentional token modifications in `brand.css` reliably trigger diff failures in the visual regression suite.
5. **Zero TypeScript Errors:** Strict type-checking passes cleanly with `npm run lint`.
