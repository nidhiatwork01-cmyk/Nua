# Technical Decisions & Architectural Choices

This document outlines the engineering rationale behind the design and implementation of the e-commerce web application.

---

## 1. State Management: Context API vs. Zustand

### The Choice
For cart state management, the **React Context API** was selected over third-party alternatives like Zustand or Redux.

### Rationale
- **Nature of State**: The cart state is a single, shallow slice of data containing an array of items and five basic operations: `addItem`, `removeItem`, `updateQty`, `clearCart`, and drawer visibility toggles.
- **Dependency Overhead**: Using Context API allows the application to remain lightweight with zero additional dependencies, relying purely on React 18 built-in primitives (`createContext`, `useContext`, and state hooks).
- **Zustand Justification**: Third-party state management libraries like Zustand are excellent tools, but their overhead wasn't justified for this specific scope. I would readily reach for Zustand if:
  1. We needed to implement optimistic updates with rollback states.
  2. We were synchronizing state via complex middleware or WebSockets.
  3. We had deeply nested state slices where React Context re-renders would cause noticeable performance bottlenecks.

---

## 2. Refactoring for Testability: The `useVariantUrl` Hook

### Problem
Variant-to-URL synchronization (e.g., deep-linking `/product/:id?colour=rose&size=M`) is often tightly coupled to the page component's UI rendering, making the logic difficult to test or reuse.

### Solution
I extracted this synchronization logic into a custom hook: `useVariantUrl.ts`.
- **Isolation**: By separating state retrieval/manipulation from components, the synchronization behavior can be unit-tested in isolation without mocking the entire DOM.
- **Simplification**: It reduces the cognitive load of the `ProductDetails.tsx` component, keeping it focused on presentation.

---

## 3. Real-world Product Engineering Moves

### Simulated API Latency & Network Failures
D2C commerce applications succeed or fail based on cart reliability. To make this frontend feel real, the Context API integrates a simulated network request:
- **`mockAddToCart`**: Introduces an 800ms simulated latency to mimic API processing times.
- **20% Failure Rate**: Randomly fails to simulate real-world mobile network drops, prompting the UI to fire warning toasts.
- **Button Micro-States**: The Add to Cart button disables and renders a spinner during checkout transitions, preventing double-submission (debouncing).

### Fake Store API Data Enrichment
The raw Fake Store API is generic. To align the application with high-end personal care commerce:
- I created a dynamic mapper `mapFakeStoreProduct()` to intercept raw API products.
- Generic clothing/electronics are remapped into botanical skincare products (Luminous Serums, Cloud Creams, Recover Oils).
- Overrode and enriched the database with high-resolution imagery, descriptive copy, and multi-image galleries for proper carousel navigation.

---

## 4. What I'd Clean Up With More Time

1. **Playwright E2E Testing**:
   Implement automated end-to-end integration tests mapping the critical user journey: `Landing Page -> Add to Cart -> Verify Spinner -> Slide Open Drawer -> Quantity Update -> Page Refresh -> Verify Persistent LocalStorage State`.
2. **Cloudflare Images Integration**:
   For production deployment, I would serve media assets through Cloudflare Images to dynamic resize images (`/cdn-cgi/image/width=400,format=webp/...`) to optimize page speed.
3. **Advanced CSS Code Splitting**:
   Optimize performance further by lazy-loading route stylesheets alongside components.
