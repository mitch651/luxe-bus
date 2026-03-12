# GitHub + Netlify Setup Guide

Your Luxe Bus project is ready to push. Follow these steps to create a GitHub repo and connect it to Netlify.

---

## Step 1: Create a New GitHub Repository

1. Go to **https://github.com/new**
2. Fill in:
   - **Repository name:** `luxe-bus` (or whatever you prefer)
   - **Description:** Optional, e.g. "Luxe Bus - Luxury Group Transportation"
   - **Visibility:** Private or Public (your choice)
   - **Do NOT** check "Add a README" or "Add .gitignore" — your project already has these
3. Click **Create repository**

---

## Step 2: Copy Your Repo URL

After creating the repo, GitHub will show you a URL like:
- `https://github.com/YOUR_USERNAME/luxe-bus.git`

Copy this URL. You'll need it in Step 3.

---

## Step 3: Add Remote and Push

Open a terminal in your project folder and run (replace with your actual URL):

```powershell
cd "C:\Users\mlc_t\Desktop\luxe-bus-next-files"

git remote add origin https://github.com/YOUR_USERNAME/luxe-bus.git

git branch -M main

git push -u origin main
```

When prompted, sign in to GitHub (or use a Personal Access Token if 2FA is enabled).

---

## Step 4: Connect GitHub to Netlify

1. Go to **https://app.netlify.com**
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub** as the provider
4. Authorize Netlify to access your GitHub (if needed)
5. Select your **luxe-bus** repository
6. Netlify will auto-detect Next.js. Build settings should be:
   - **Build command:** `npm run build` or `next build`
   - **Publish directory:** `.next` (or leave as Netlify's default for Next.js)
7. Under **Environment variables**, make sure you have:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_N8N_WEBHOOK_URL` = your n8n webhook URL
8. Click **Deploy site**

---

## Step 5: Use Your Custom Domain (Optional)

If luxe-bus.com is already connected to your current Netlify site:
- The new site from GitHub will get a random URL (e.g. `random-name-123.netlify.app`)
- Go to **Site settings** → **Domain management** → **Add custom domain**
- Add `luxe-bus.com` and follow the DNS setup
- If you're replacing an existing site, you may need to remove the old domain from the previous site first

---

## Going Forward

- Push changes: `git add .` → `git commit -m "Your message"` → `git push`
- Netlify will auto-deploy on every push to `main`
