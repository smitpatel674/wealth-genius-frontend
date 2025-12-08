# Wealth Genius Frontend - Deployment Guide

Complete guide for deploying the Wealth Genius frontend to various platforms.

## Pre-Deployment Checklist

- [ ] Backend deployed and URL obtained
- [ ] Update `.env.production` with backend API URL
- [ ] Test build locally: `npm run build`
- [ ] Verify all images and assets are in `public/` folder
- [ ] Test production build: `npm run preview`

## Quick Deploy to Vercel (Recommended)

### Steps:

1. **Push to GitHub** (if not already)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select `frontend` folder (if monorepo)
   - Vercel auto-detects Vite configuration

3. **Configure Environment Variables**
   - In project settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.com/api/v1`

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Get your URL: `https://your-project.vercel.app`

5. **Custom Domain** (optional)
   - Go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

---

## Alternative Platforms

### Netlify

1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Build settings:
   ```
   Build command: npm run build
   Publish directory: dist
   ```
4. Add environment variable: `VITE_API_URL`
5. Deploy

### Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect GitHub repository
3. Framework preset: Vite
4. Add environment variable: `VITE_API_URL`
5. Deploy

---

## Environment Configuration

### Production (.env.production)
```env
VITE_API_URL=https://your-backend-domain.com/api/v1
```

Update this with your actual backend URL after deploying the backend.

---

## Build & Test Locally

### Build for Production

```bash
cd frontend
npm run build
```

### Preview Production Build

```bash
npm run preview
```

Opens at `http://localhost:4173` - test all functionality!

---

## Post-Deployment Steps

### 1. Update Backend CORS

In your backend deployment, update `ALLOWED_ORIGINS`:

```env
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### 2. Test All Features

- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Course enrollment form submits
- [ ] Consultation scheduling works
- [ ] Contact form submits
- [ ] All images load
- [ ] Mobile responsive
- [ ] Email notifications received

---

## Troubleshooting

### Issue: API Calls Failing (CORS Error)

**Solution**:
1. Check backend `ALLOWED_ORIGINS` includes your frontend domain
2. Verify `VITE_API_URL` is correct in `.env.production`
3. Check browser console for exact error

### Issue: 404 on Page Refresh

**Solution**: Create `public/_redirects` file:
```
/*    /index.html   200
```

### Issue: Images Not Loading

**Solution**:
- Ensure images are in `public/` folder
- Check image paths (should be `/images/...` not `./images/...`)
- Verify images are committed to repository

---

## Quick Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod
```

---

## Support

For detailed instructions, see the main `DEPLOYMENT_GUIDE.md` at the project root.

Contact: smitpatidar6704@gmail.com
