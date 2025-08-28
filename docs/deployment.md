# Deployment Guide

This guide covers how to deploy your blog to GitHub Pages and configure it for public access.

## GitHub Pages Deployment

### Prerequisites

- GitHub account
- Your blog repository on GitHub
- Git installed locally

### Step 1: Prepare Your Repository

1. **Create a GitHub repository** (if you haven't already):
   - Go to GitHub and create a new repository
   - Name it something like `yourusername-blog` or `blog`
   - Initialize with README if starting fresh

2. **Upload your blog files**:
   ```bash
   git clone https://github.com/yourusername/your-blog-repo.git
   cd your-blog-repo
   
   # Copy all your blog files here
   # Then add and commit
   git add .
   git commit -m "Initial blog setup"
   git push origin main
   ```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

Your blog will be available at: `https://yourusername.github.io/repository-name`

### Step 3: Verify Deployment

1. Wait a few minutes for GitHub to build your site
2. Visit your site URL
3. Check that all pages work:
   - Home page loads
   - Navigation works
   - Posts display correctly
   - Tags and archive function properly

### Step 4: Configuration Files

The blog includes several files for GitHub Pages:

**`.nojekyll`** - Tells GitHub Pages not to process with Jekyll
```
# This file disables Jekyll processing
```

**`_config.yml`** - GitHub Pages configuration (optional)
```yaml
title: Your Blog Name
description: Your blog description
url: "https://yourusername.github.io"
baseurl: "/repository-name"  # Only if not using yourusername.github.io
```

### Step 5: Custom Domain (Optional)

If you want to use your own domain:

1. **Purchase a domain** from a registrar
2. **Create CNAME file** in your repository root:
   ```
   yourdomain.com
   ```
3. **Configure DNS** with your domain registrar:
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```
4. **Update repository settings**:
   - Go to Settings > Pages
   - Under "Custom domain", enter your domain
   - Check "Enforce HTTPS"

## Alternative Deployment Options

### Netlify

1. **Connect your repository**:
   - Go to Netlify.com
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure build settings**:
   - Build command: (leave empty)
   - Publish directory: (leave empty or set to `/`)
   - Deploy!

3. **Custom domain**: Add your domain in Netlify settings

### Vercel

1. **Import repository**:
   - Go to Vercel.com
   - Import your GitHub repository
   
2. **Configure**:
   - Framework preset: Other
   - Build command: (leave empty)
   - Output directory: (leave empty)
   - Deploy!

### Surge.sh

```bash
# Install Surge
npm install -g surge

# Deploy from your blog directory
surge
```

## Deployment Checklist

Before deploying, ensure:

- [ ] All HTML files have correct titles
- [ ] Navigation links work properly
- [ ] About and Contact pages are customized
- [ ] At least one blog post exists
- [ ] `posts/posts.json` is updated
- [ ] No broken links or missing files
- [ ] Dark/light mode toggle works
- [ ] Mobile responsive design verified
- [ ] Search functionality tested
- [ ] Tags and archive work correctly

## Common Deployment Issues

### Pages Not Found (404)

**Problem**: Links return 404 errors
**Solution**: 
- Ensure file names match exactly (case-sensitive)
- Check that all referenced files exist
- Verify paths in links are correct

### Posts Not Loading

**Problem**: Posts don't appear or show errors
**Solution**:
- Verify `posts.json` syntax is valid JSON
- Ensure markdown files exist in `posts/` directory
- Check browser console for JavaScript errors
- Confirm front matter format is correct

### Styling Broken

**Problem**: CSS not loading or looking wrong
**Solution**:
- Check that `styles.css` is in the root directory
- Verify CSS file isn't corrupted
- Clear browser cache
- Check for console errors

### Search/Tags Not Working

**Problem**: JavaScript functionality broken
**Solution**:
- Verify all JS files are present in `js/` directory
- Check browser console for errors
- Ensure CDN resources (Showdown.js) are loading
- Test with browser dev tools

## Updating Your Blog

### Adding New Posts

1. Create new `.md` file in `posts/` directory
2. Update `posts/posts.json` with new entry
3. Commit and push:
   ```bash
   git add .
   git commit -m "Add new post: Your Post Title"
   git push origin main
   ```

### Making Changes

```bash
# Make your changes locally
# Test thoroughly

git add .
git commit -m "Describe your changes"
git push origin main

# GitHub Pages will automatically rebuild
```

## Performance Optimization

### Enable Compression

GitHub Pages automatically enables gzip compression.

### Optimize Images

- Use WebP format when possible
- Compress images before uploading
- Use appropriate sizes for different screen densities

### Minimize HTTP Requests

- The blog already minimizes external dependencies
- Showdown.js is loaded from CDN for caching benefits
- Google Fonts are optimized for performance

## SEO Configuration

### Update Meta Tags

In each HTML file, ensure proper meta tags:
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Your blog description">
    <meta name="author" content="Your Name">
    <title>Page Title - Your Blog</title>
</head>
```

### Add Structured Data

Consider adding JSON-LD structured data for better SEO:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Your Blog Name",
  "description": "Your blog description",
  "url": "https://yourdomain.com",
  "author": {
    "@type": "Person",
    "name": "Your Name"
  }
}
</script>
```

### Create Sitemap

Generate a `sitemap.xml` file:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://yourdomain.com/</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://yourdomain.com/posts.html</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <!-- Add more URLs -->
</urlset>
```

## Analytics Setup

### Google Analytics 4

Add to each HTML file before closing `</head>`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Simple Analytics

For privacy-focused analytics:
```html
<script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
<noscript><img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade" /></noscript>
```

## Security Considerations

### Content Security Policy

Add CSP header (in Netlify `_headers` file):
```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com
```

### HTTPS

- GitHub Pages automatically provides HTTPS
- Enforce HTTPS in repository settings
- Use HTTPS URLs in all links

## Monitoring and Maintenance

### Regular Tasks

1. **Update dependencies**: Check for Showdown.js updates periodically
2. **Monitor performance**: Use Google PageSpeed Insights
3. **Check links**: Verify all internal and external links work
4. **Review analytics**: Monitor visitor patterns and popular content
5. **Security updates**: Keep domain and hosting configurations current

### Backup Strategy

- Your GitHub repository serves as your primary backup
- Consider periodic local backups of the entire repository
- Document your customizations for easy recreation

## Troubleshooting Deployment

### Build Fails

Check GitHub Actions tab for error details:
1. Go to your repository
2. Click "Actions" tab
3. Review failed build logs
4. Fix issues and push again

### Site Not Updating

1. Check GitHub Actions for successful builds
2. Clear browser cache
3. Wait 5-10 minutes for CDN propagation
4. Verify changes are in the main branch

### Domain Issues

1. Verify DNS settings with your domain provider
2. Check that CNAME file contains only the domain name
3. Ensure HTTPS is enforced in GitHub settings
4. Wait for DNS propagation (can take up to 48 hours)

Remember: GitHub Pages can take a few minutes to reflect changes after pushing to your repository. Be patient and check the Actions tab for build status.