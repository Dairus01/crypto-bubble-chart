# Deployment Guide

This guide will help you deploy your Crypto Bubble Chart application to various hosting platforms.

## Prerequisites

- Your project files are ready
- You have a GitHub account (for most options)
- Basic knowledge of Git (for GitHub deployment)

## Option 1: GitHub Pages (Recommended - Free)

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name it `crypto-bubble-chart`
4. Make it **Public** (required for free GitHub Pages)
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Upload Your Code

Open your terminal/command prompt in your project folder and run:

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit"

# Rename the default branch to main
git branch -M main

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/crypto-bubble-chart.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Under **Branch**, select **main** and **/(root)**
6. Click **Save**

### Step 4: Your Site is Live!

Your site will be available at:
`https://YOUR_USERNAME.github.io/crypto-bubble-chart`

**Note**: It may take a few minutes for the first deployment to complete.

---

## Option 2: Netlify (Free - Drag & Drop)

### Method 1: Drag & Drop (Easiest)

1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with your GitHub account
3. Drag your entire project folder to the deploy area
4. Your site is instantly live!
5. Netlify will give you a random URL like `https://amazing-name-123456.netlify.app`

### Method 2: Git Integration

1. Go to [netlify.com](https://netlify.com)
2. Click **New site from Git**
3. Connect your GitHub account
4. Select your `crypto-bubble-chart` repository
5. Click **Deploy site**

**Benefits**: Auto-deploys on every Git push!

---

## Option 3: Vercel (Free)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Deploy

```bash
# Navigate to your project folder
cd crypto-bubble-chart

# Deploy
vercel
```

### Step 3: Follow the Prompts

- Login to Vercel (browser will open)
- Confirm project name
- Confirm deployment settings
- Your site will be live!

**Benefits**: Auto-deploys on Git pushes, custom domains, analytics.

---

## Option 4: Firebase Hosting (Free)

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

### Step 3: Initialize Firebase

```bash
firebase init hosting
```

**Follow the prompts:**
- Select your project (create new if needed)
- Public directory: `.` (current directory)
- Configure as single-page app: `No`
- Don't overwrite index.html: `No`

### Step 4: Deploy

```bash
firebase deploy
```

Your site will be live at the provided Firebase URL.

---

## Option 5: Surge.sh (Free)

### Step 1: Install Surge

```bash
npm install -g surge
```

### Step 2: Deploy

```bash
surge
```

Follow the prompts to create an account and deploy.

---

## Custom Domain Setup

### GitHub Pages

1. In your repository Settings → Pages
2. Add your custom domain in the **Custom domain** field
3. Create a `CNAME` file in your repository root with your domain
4. Update your DNS settings with your domain provider

### Netlify/Vercel

1. Go to your site settings
2. Add custom domain
3. Follow the DNS configuration instructions

---

## Troubleshooting

### Common Issues

**1. Site not loading**
- Check if all files are uploaded
- Verify the main file is named `index.html`
- Check browser console for errors

**2. API not working**
- CoinGecko API might be down
- Check your internet connection
- The app has fallback demo data

**3. Styling issues**
- Clear browser cache
- Check if CSS file is loading
- Verify file paths are correct

**4. GitHub Pages not updating**
- Wait 5-10 minutes for deployment
- Check the Actions tab for deployment status
- Verify you're on the correct branch

### Performance Tips

1. **Optimize images**: Compress any images you add
2. **Minimize API calls**: The app is already optimized
3. **Use CDN**: Most hosting platforms provide CDN automatically

---

## Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] All features work (bubbles, AI chat, filters)
- [ ] Responsive design works on mobile
- [ ] API data is loading correctly
- [ ] Custom domain is working (if applicable)
- [ ] SSL certificate is active (https://)

---

## Support

If you encounter issues:

1. **Check the browser console** for JavaScript errors
2. **Verify file structure** matches the expected layout
3. **Test locally first** before deploying
4. **Check hosting platform status** pages
5. **Review platform-specific documentation**

---

**Your Crypto Bubble Chart is now live! 🚀**

Share your deployed URL and enjoy your interactive cryptocurrency visualization! 