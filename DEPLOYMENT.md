# Deployment Guide - GitHub Pages

This project is configured for **Static Site Generation (SSG)** and deployed to **GitHub Pages**.

## 🏗️ Build Configuration

### SvelteKit Adapter Settings

```javascript
// svelte.config.js
adapter: adapter({
  pages: 'docs',           // Output directory
  assets: 'docs',          // Assets directory
  fallback: 'index.html',  // SPA fallback for client-side routing
  precompress: false,      // No pre-compression
  strict: false            // Flexible mode for static generation
})
```

### Base Path Configuration

```javascript
paths: {
  base: process.env.NODE_ENV === 'production' 
    ? '/svelte-threejs-tech-store'  // GitHub Pages repository path
    : ''                             // Local development
}
```

## 📦 Building for Production

### Build Command

```bash
npm run build
```

This generates static files in the `docs/` folder:
- `docs/index.html` - Main entry point
- `docs/_app/` - Application code and assets
- `docs/assets/` - Static assets (models, images, fonts)
- `docs/products/` - Pre-rendered product pages
- `docs/.nojekyll` - Tells GitHub Pages not to ignore underscore files

### Output Structure

```
docs/
├── index.html              # Main HTML file
├── .nojekyll              # GitHub Pages config
├── _app/                  # SvelteKit app code
│   └── immutable/         # Hashed assets (cached)
├── assets/                # Static assets
│   ├── Macbook_Top.glb
│   ├── Macbook_Bottom.glb
│   └── ...
└── products/              # Pre-rendered pages
    ├── macbook-pro/
    ├── macbook-air/
    ├── ios/
    └── vision-pro/
```

## 🚀 Deployment Steps

### Initial Setup (One-time)

1. **Configure GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` (or your default branch)
   - Folder: `/docs`
   - Click "Save"

2. **Ensure `.nojekyll` exists:**
   - Located in `static/.nojekyll` (copies to `docs/.nojekyll` during build)
   - Prevents GitHub from ignoring files starting with `_`

### Regular Deployment

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Commit changes:**
   ```bash
   git add docs/
   git commit -m "Deploy: Update site"
   ```

3. **Push to GitHub:**
   ```bash
   git push origin main
   ```

4. **Wait for deployment:**
   - GitHub Actions will automatically deploy
   - Usually takes 1-3 minutes
   - Check status in Actions tab

### Verify Deployment

Your site will be live at:
```
https://gustavodslara.github.io/svelte-threejs-tech-store/
```

## 🔍 Important Notes

### About the `docs` Folder

- ✅ **MUST be committed** to git
- ✅ NOT in `.gitignore`
- ✅ Contains all built static files
- ✅ GitHub Pages serves directly from this folder

### Why Not `file://` Protocol?

The built site requires HTTP server because:
- **ES Modules** need proper MIME types
- **Three.js models** need CORS headers
- **Relative paths** work correctly over HTTP
- **Service Workers** require secure context

### Local Testing

To test the built site locally:

```bash
# Option 1: Using Python
python -m http.server 3000 --directory docs

# Option 2: Using Node.js http-server (install globally)
npx http-server docs -p 3000

# Option 3: Using SvelteKit preview
npm run preview
```

Then visit: `http://localhost:3000`

## 🛠️ Troubleshooting

### Issue: 404 on page refresh

**Solution:** Already configured! The `fallback: 'index.html'` setting creates a 404.html that redirects to index.html, enabling SPA routing.

### Issue: Assets not loading

**Cause:** Base path misconfiguration

**Solution:** Verify `svelte.config.js` has correct base path:
```javascript
base: process.env.NODE_ENV === 'production' ? '/svelte-threejs-tech-store' : ''
```

### Issue: Models not loading

**Cause:** MIME type issues or incorrect paths

**Solution:** 
- Ensure models are in `static/assets/`
- Verify build copies them to `docs/assets/`
- Check browser console for 404 errors

### Issue: Blank page on GitHub Pages

**Cause:** Missing `.nojekyll` file

**Solution:**
- Check `docs/.nojekyll` exists
- If missing, add empty file in `static/.nojekyll`
- Rebuild: `npm run build`

## 📋 Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Check `docs/` folder exists with all files
- [ ] Verify `docs/.nojekyll` file exists
- [ ] Test locally with HTTP server
- [ ] Commit `docs/` folder to git
- [ ] Push to GitHub
- [ ] Verify GitHub Pages settings
- [ ] Wait for deployment
- [ ] Test live site

## 🔄 CI/CD (Optional)

For automatic builds on every push, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          NODE_ENV: production
          
      - name: Commit and push
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add docs/
          git diff --staged --quiet || git commit -m "Deploy: Auto-build from ${{ github.sha }}"
          git push
```

## 📚 Additional Resources

- [SvelteKit Static Adapter Docs](https://kit.svelte.dev/docs/adapter-static)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Deploying SvelteKit to GitHub Pages](https://kit.svelte.dev/docs/adapter-static#github-pages)

---

**Last Updated:** November 7, 2025
