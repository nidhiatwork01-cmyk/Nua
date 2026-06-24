# Architectural Decisions & Retrospective

**Live Demo:** [nua-eight-rosy.vercel.app](https://nua-eight-rosy.vercel.app/)


## The Big Decision: React Context vs. an External State Manager

The cart and wishlist are the two pieces of global state that cross component boundaries — the Navbar badge, ProductCard heart overlays, the CartDrawer, and the ProductDetails CTA all read or write the same data. I had to choose how to wire them up.

**Option A — Zustand (or Jotai/Valtio):** Atomic stores with built-in persistence middleware, selector-level re-render control, and zero boilerplate. Zustand's `persist` middleware would have given me localStorage sync for free in ~4 lines.

**Option B — React Context + a custom `useLocalStorage` hook (chosen):** Two lean Context providers (`CartContext`, `WishlistContext`) exposing state and helpers through `useCart()` / `useWishlist()` hooks. Persistence is handled by a hand-rolled `useLocalStorage` hook that mirrors `useState`'s API while writing through to `localStorage` on every update.

### Why I chose Context

1. **Zero additional runtime.** The entire state layer ships with React itself — no extra kilobytes, no version to pin, no unfamiliar API for the next person reading the code. For a storefront with two slices of global state, that felt proportionate.
2. **Explicit data flow.** Wrapping `CartProvider` and `WishlistProvider` at the root makes the dependency tree visible in the component hierarchy. There is no magic store import hiding where state lives.
3. **It forced me to design better interfaces.** Because Context re-renders every consumer, I had to think carefully about what each context exposes. The cart context surfaces a loading map (`isAdding`), a toast queue, and an async `addItem` that returns a Promise — all co-located so the consumer never has to orchestrate side effects.

### The trade-off I knowingly accepted

The `useLocalStorage` hook closes over `storedValue` inside its `setValue` callback. That means rapid sequential writes (e.g., two `addItem` calls before a re-render) can read stale state. In production I would solve this with `useRef` to hold the latest value or by rewriting the hook on top of `useSyncExternalStore`, which subscribes to `window.storage` events and guarantees a single source of truth across tabs. For this scope, the closure caveat only surfaced in tests — and I worked around it with pre-populated `localStorage` fixtures and sequential `act()` calls — so the trade-off was acceptable.

Had the app required more slices (filters, search history, recently viewed), I would have reached for Zustand without hesitation. The decision was scope-dependent, not dogmatic.

---

## What I Would Clean Up With More Time

**1. Replace `useLocalStorage` with `useSyncExternalStore`.** This is the first thing I would ship. It eliminates the stale-closure issue, adds cross-tab reactivity, and removes the `storedValue` dependency from the `setValue` callback — making the hook safe for concurrent use without workarounds.

**2. Isolate a proper API service layer.** Right now `useProducts` calls `fetch` inline and pipes the response through `mapFakeStoreProduct`. With more time I would extract a typed API client (e.g., a thin `fetch` wrapper with generics) and a repository layer that owns caching, error normalisation, and retry logic. This would make it trivial to swap the Fake Store API for a real backend without touching any component code.

**3. URL-driven variant state everywhere.** The `useVariantUrl` hook already syncs size and colour to query params on the PDP, which means deep links and browser back/forward work correctly. I would extend this pattern to the listing page's filters and search, so the entire UI state is URL-serialisable and shareable.

**4. More tests, different kinds.** The current suite covers the variant selector (sold-out state, disabled CTA, quantity capping) and the cart context (async add with simulated failure). I would add Playwright end-to-end tests for the cart drawer open/close animation, the Razorpay checkout flow, and mobile-responsive breakpoints — the kinds of things unit tests cannot catch.
