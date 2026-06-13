# Deployment Guide - Vercel

## Quick Start: Deploy to Vercel

### Step 1: Push Code to GitHub
```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/gilded-gifts.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from Git → Select your GitHub repo
4. Vercel will auto-detect it's a TanStack Start project

### Step 3: Set Environment Variables
In Vercel project settings, add these environment variables:

```
SUPABASE_PROJECT_ID=kmhtmdzbbrtqopomnude
SUPABASE_PUBLISHABLE_KEY=sb_publishable_nGHu7MNEZwIRll3tOzunMA_ED3cNMPC
SUPABASE_URL=https://kmhtmdzbbrtqopomnude.supabase.co
VITE_SUPABASE_PROJECT_ID=kmhtmdzbbrtqopomnude
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_nGHu7MNEZwIRll3tOzunMA_ED3cNMPC
VITE_SUPABASE_URL=https://kmhtmdzbbrtqopomnude.supabase.co
```

### Step 4: Build Settings (Auto-Detected)
- **Framework**: TanStack Start
- **Build Command**: `npm run build` (auto-set)
- **Output Directory**: `.vercel/output` (auto-set)
- **Install Command**: `npm install` (auto-set)

### Step 5: Deploy
Click "Deploy" and wait! 🚀

---

## Post-Deployment Setup

### Update Supabase Auth Redirects
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your Vercel domain to "Redirect URLs":
   - `https://your-project.vercel.app/`
   - `https://your-project.vercel.app/auth`
   - `https://your-project.vercel.app/checkout`

### Update CORS Settings (if needed)
If you get CORS errors, update in Supabase:
- API Settings → Add your Vercel domain to allowed origins

---

## Troubleshooting

### Build Fails
Check Vercel logs for errors. Common issues:
- Missing environment variables
- TypeScript errors
- Missing dependencies

### White Screen / 404 Errors
- Ensure environment variables are set
- Check Supabase connection in browser DevTools
- Verify auth redirect URLs

### Slow Initial Load
- TanStack Start does edge function caching
- First load may take 30s, subsequent loads are fast

---

## Additional Commands

```bash
# Test production build locally
npm run build
npm run preview

# View Vercel deployment logs
vercel logs
```

---

## Your Project Details
- **Framework**: TanStack Start + React 19
- **Database**: Supabase
- **Deployment**: Vercel (Supports Cloudflare Workers)
- **Estimated Build Time**: 2-3 minutes
