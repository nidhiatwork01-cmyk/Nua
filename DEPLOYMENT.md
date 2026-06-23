# Vercel Deployment Guide

Deploying **AURA Skincare** to Vercel is simple and fully optimized. Because this is a Single Page Application (SPA) utilizing React Router, we have configured it to handle client-side routing on page refreshes seamlessly.

---

## 1. SPA Routing Prerequisite (`vercel.json`)

To prevent Vercel from returning `404 Not Found` when users reload routes like `/our-story`, `/journal`, or `/product/:id`, we've added a [vercel.json](file:///c:/AllMyProjects/nua/vercel.json) configuration file in the project root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
*This rewrites all request paths to load `index.html` so React Router can process the route in the client.*

---

## 2. Option A: Deploy via Vercel Dashboard (Recommended)

This connects Vercel directly to your Git repository for automatic preview and production deployments on every push.

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New** > **Project**.
2. Select your repository (GitHub/GitLab/Bitbucket) and click **Import**.
3. In the **Configure Project** step:
   - **Framework Preset:** Select **Vite** (Vercel should detect this automatically).
   - **Root Directory:** `./` (Leave as default).
   - **Build and Output Settings:**
     - **Build Command:** `npm run build` (or `tsc -b && vite build`)
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`
4. Click **Deploy**.
5. Once finished, you will receive a custom production domain (e.g., `aura-skincare.vercel.app`).

---

## 3. Option B: Deploy via Vercel CLI

If you prefer deploying directly from your local terminal using the command line:

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```
2. **Log in to Vercel:**
   ```bash
   vercel login
   ```
3. **Trigger the deployment from the project root:**
   ```bash
   vercel
   ```
   - Follow the prompts (link to your account, create a new project, etc.).
   - Press **Enter** to accept default build settings.
4. **Deploy to production:**
   Once the preview deployment is built successfully, deploy it to production using:
   ```bash
   vercel --prod
   ```

---

## ✦ Environment & Optimization Checklist

- **Environment Variables:** The app currently loads mock data from a public API (`https://fakestoreapi.com`) hardcoded in constants. If you hook this up to a staging/production server later, add your custom variables (e.g., `VITE_API_BASE_URL`) in the **Environment Variables** section of your Vercel project settings.
- **Vite Cache & Builds:** Vercel automatically caches `node_modules` and Vite caches between builds to keep deployment times under 1 minute.
