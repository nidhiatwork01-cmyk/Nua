# Architectural Decisions & Retrospective

## Zustand vs. React Context for Global State

When implementing the cart and wishlist features, I faced a choice between pulling in a lightweight state library like **Zustand** or utilizing React’s native **Context API** combined with a custom `useLocalStorage` hook.

### Options Considered
1. **React Context + useLocalStorage (Chosen):** Centralizes bag items and favorite lists into clean React Contexts (`CartContext` and `WishlistContext`), exposing states and helper functions via custom hooks (`useCart` and `useWishlist`).
2. **Zustand:** An external state manager with simplified state mutation, built-in persistence middleware, and optimized component re-render boundaries.

### Rationale
I opted for **React Context**. For a standard e-commerce storefront of this size, keeping dependencies minimal is key. React Context is built into the core framework, meaning zero additional bundle overhead or learning curves. It neatly decoupled our presentation layout (Navbar badges, Product Card hearts, and drawers) from state synchronization. 

However, this choice introduced a common React closure caveat: concurrent state updates in batch operations (e.g., adding multiple items synchronously in unit tests) read stale states due to the custom `useLocalStorage` hook's dependency on the closure value `storedValue`. I successfully worked around this in tests by running updates sequentially and utilizing pre-populated storage mockups.

---

## What I Would Do Differently with More Time

1. **Refactor useLocalStorage using useSyncExternalStore:**
   To solve the state synchronization and closure capture issue described above, I would rewrite `useLocalStorage` using React 18's `useSyncExternalStore`. This hooks cleanly into the window storage events, ensuring concurrent reads/writes always access the latest, single source of truth without closure stale-state pitfalls.
2. **Extract a Dedicated API Client Layer:**
   Currently, products are fetched and mapped from the Fake Store API using custom inline hooks (`useProducts`). With more time, I would extract this logic into an isolated API service module (e.g., using Axios or fetch wrapper classes) with explicit type-checking, cache-invalidation rules, and cleaner repository interfaces.
3. **Extend Component Testing:**
   While we now have robust integration tests for size selectors, CTAs, and quantity capping, I would write further visual regression and end-to-end tests using tools like Playwright to verify the checkout drawer drawer animations, Razorpay payment flows, and cart drawer responsiveness.
