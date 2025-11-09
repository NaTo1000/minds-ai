# Cloudflare Pages Deployment Guide for Minds AI

## Prerequisites
- GitHub repository: https://github.com/NaTo1000/minds-ai ✅
- Cloudflare account with domain `infinite2025.com`

## Step-by-Step Deployment

### 1. Create Cloudflare Pages Project

1. Go to https://dash.cloudflare.com/
2. Click **"Workers & Pages"** in the left sidebar
3. Click **"Create application"**
4. Select **"Pages"** tab
5. Click **"Connect to Git"**

### 2. Connect GitHub Repository

1. Authorize Cloudflare to access your GitHub account
2. Select the **"minds-ai"** repository from the list
3. Click **"Begin setup"**

### 3. Configure Build Settings

```
Project name: minds-ai
Production branch: master
Framework preset: None (or Vite)
Build command: npm run build
Build output directory: client/dist
Root directory: (leave empty or /)
```

### 4. Environment Variables

**CRITICAL:** You need to add these environment variables in Cloudflare Pages settings.

Go to your Manus project → Settings → Secrets to get these values:

```
DATABASE_URL=<your_database_url>
JWT_SECRET=<your_jwt_secret>
VITE_APP_ID=<your_app_id>
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=<your_oauth_portal_url>
OWNER_OPEN_ID=<your_owner_open_id>
OWNER_NAME=<your_owner_name>
VITE_APP_TITLE=Minds AI
VITE_APP_LOGO=/trina-avatar.png
BUILT_IN_FORGE_API_URL=<your_forge_api_url>
BUILT_IN_FORGE_API_KEY=<your_forge_api_key>
VITE_FRONTEND_FORGE_API_KEY=<your_frontend_forge_api_key>
VITE_FRONTEND_FORGE_API_URL=<your_frontend_forge_api_url>
```

**Note:** Some of these are sensitive. Never commit them to GitHub.

### 5. Deploy

1. Click **"Save and Deploy"**
2. Wait for the build to complete (usually 2-5 minutes)
3. Once complete, you'll get a URL like: `minds-ai.pages.dev`

### 6. Add Custom Domain

1. In your Cloudflare Pages project, go to **"Custom domains"**
2. Click **"Set up a custom domain"**
3. Enter: `infinite2025.com`
4. Cloudflare will automatically configure DNS if the domain is in your account
5. Wait for SSL certificate to be issued (usually automatic)

### 7. DNS Configuration (if needed)

If your domain is not in Cloudflare, add these DNS records:

```
Type: CNAME
Name: infinite2025.com (or @)
Target: minds-ai.pages.dev
Proxy: Enabled (orange cloud)
```

## Important Notes

### Full-Stack Considerations

This is a full-stack application with:
- **Frontend:** React + Vite
- **Backend:** Express + tRPC
- **Database:** MySQL/TiDB

**Cloudflare Pages is designed for static sites.** For full-stack deployment, you have two options:

#### Option A: Cloudflare Pages + Cloudflare Workers (Recommended)
1. Deploy frontend to Cloudflare Pages
2. Deploy backend as a Cloudflare Worker
3. Configure Pages to use the Worker as the backend

#### Option B: Hybrid Deployment
1. Deploy frontend to Cloudflare Pages
2. Keep backend on Manus platform (or other hosting)
3. Configure CORS and API endpoints

### Recommended Approach

**For fastest deployment and full functionality:**
1. ✅ Use Manus platform (click Publish button) - handles everything
2. ✅ Add custom domain `infinite2025.com` in Manus Settings
3. Optional: Deploy frontend-only version to Cloudflare Pages as a backup

## Troubleshooting

### Build Fails
- Check that all environment variables are set
- Verify build command is correct
- Check build logs for specific errors

### Database Connection Issues
- Ensure DATABASE_URL is accessible from Cloudflare's network
- Consider using Cloudflare Hyperdrive for database connection pooling

### OAuth/Authentication Issues
- Verify all OAuth URLs are correct
- Update OAuth callback URLs to include your Cloudflare Pages domain

## Support

For issues with:
- **Manus deployment:** Use the Management UI or contact Manus support
- **Cloudflare Pages:** Check Cloudflare documentation or community forums
- **Code issues:** Check the GitHub repository

---

**Created:** 2025-11-10
**Repository:** https://github.com/NaTo1000/minds-ai
