# ✧ AURA Skincare ✧

A premium, high-fidelity D2C botanical skincare e-commerce storefront. Built with a focus on rich aesthetics, smooth animations, and robust real-world product engineering practices.

**Live Demo:** [nua-eight-rosy.vercel.app](https://nua-eight-rosy.vercel.app/)

---

## ✦ Key Features

- **Curated Storefront & Enriched Catalog:** Generic product data from Fake Store API is intercepted and dynamically enriched on-the-fly into luxury skincare formulas complete with rich descriptions, custom pricing, and multi-image galleries.
- **Deep-Linked Variant Synchronization:** Product variant options (size, color/type) map directly to search parameters in the URL (e.g., `/product/1?size=50ml&color=Rose`). Refreshing or sharing links preserves customer selections perfectly.
- **Seamless Cart Experience & LocalStorage:** A slide-out cart drawer with real-time subtotal calculations, product quantity adjustments, and persistence across sessions via `localStorage`.
- **Real-World Network Simulation:** Implements a simulated **800ms API latency** and a **20% random network drop rate** on checkout actions. Provides instant visual feedback using disabled loading/spinner button states (debouncing) and custom success/error toast alerts.
- **Scroll-Reveal Animations & Micro-Interactions:** The **Our Story** page is driven by a custom `IntersectionObserver` hook for scroll-triggered slide-ins, parallax hero zooms, quote border accents, and premium button micro-states.
- **Figma-Matched Journal:** The **Journal** page features a grid/list viewport toggle, category filtering tags, elegant article layouts, and a newsletter subscription form.

---

## ✦ Core Frontend Quality Principles

A great frontend is not just about loading fast; it is defined by stability, predictability, and invisible technical details. Here is how AURA implements these qualities:

- **The URL as the Single Source of Truth:** Instead of storing temporary UI states in transient memory, variant selections and search queries map directly to URL parameters. This enables bulletproof deep-linking, shareable links, and native browser back/forward navigation.
- **Defensive UI & Network Resilience:** Rather than assuming a perfect network, the checkout actions simulate a real-world mobile environment with **800ms latency** and a **20% failure rate**. The UI handles this gracefully with debounced button spinners, disabled action states, and custom toast fallback alerts to prevent double-submissions.
- **Performant Motion Architecture:** Scroll animations are driven by a custom `IntersectionObserver` hook (`useReveal`) that triggers transitions precisely once. This preserves CPU cycles, avoids scroll-jacking, and prevents animation fatigue during back-and-forth browsing.
- **Lean State Management:** Cart items utilize React's native Context API with `localStorage` persistence. By avoiding heavy third-party state managers, the codebase keeps the Javascript footprint minimal.
- **Fluid Layout Integrity:** Scoped SCSS Modules with consistent spacing tokens guarantee that layouts do not shift layout boxes or cause visual jumps on page load, maintaining high-fidelity typography and design proportions on all viewport sizes.

---

## ✦ Tech Stack & Architectural Decisions

- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/) (fast HMR, optimized builds).
- **Styling:** **Vanilla SCSS Modules** (`.module.scss`) for scoped styles, utilizing custom CSS variables, keyframe animations, and mixins for high-fidelity responsiveness.
- **State Management:** **React Context API** for cart actions. Zero third-party dependencies (like Zustand or Redux) to keep the bundle footprint light and compile-times fast.
- **Routing:** [React Router v6](https://reactrouter.com/) for page navigations and URL state queries.
- **Custom Hooks:** 
  - `useVariantUrl`: Decouples and tests variant-to-URL parameter syncing.
  - `useReveal`: Simple `IntersectionObserver` wrapper for triggering one-time scroll animations.
  - `useLocalStorage`: Handles state-saving to client memory seamlessly.

---

## ✦ Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized output folder (`dist`) ready to be deployed.

---

## ✦ Deployment

See the [Vercel Deployment Guide](file:///c:/AllMyProjects/nua/DEPLOYMENT.md) for step-by-step instructions on deploying the application to Vercel with smooth client-side routing support.

