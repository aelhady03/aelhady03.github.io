# Customization Guide

This guide covers how to customize your blog's appearance, behavior, and features to match your personal style and needs.

## Quick Customizations

### 1. Site Identity

**Update Site Name and Branding**

In all HTML files, update:
```html
<!-- Navigation brand -->
<a href="index.html" class="nav-brand">Your Blog Name</a>

<!-- Page titles -->
<title>Your Blog Name - Elhady's blog</title>
```

**Update Footer**
```html
<footer class="site-footer">
    <div class="footer-content">
        <p>&copy; 2025 Your Name. Built with vanilla HTML, CSS, and JavaScript.</p>
    </div>
</footer>
```

### 2. Hero Section

In `index.html`, customize the main hero section:
```html
<section class="hero">
    <div class="hero-content">
        <h1 class="hero-title">Your Blog Title</h1>
        <p class="hero-description">Your unique description and what readers can expect.</p>
    </div>
</section>
```

### 3. About Page

Completely rewrite `about.html` with your information:
```html
<div class="prose">
    <p>Your introduction...</p>
    
    <h2>What You'll Find Here</h2>
    <ul>
        <li>Your topic 1</li>
        <li>Your topic 2</li>
        <!-- etc. -->
    </ul>

    <h2>About Me</h2>
    <p>Your background and experience...</p>
</div>
```

### 4. Contact Information

Update `contact.html` with your actual contact details:
```html
<div class="contact-item">
    <h3>Email</h3>
    <p><a href="mailto:your@email.com">your@email.com</a></p>
</div>

<div class="contact-item">
    <h3>GitHub</h3>
    <p><a href="https://github.com/yourusername">github.com/yourusername</a></p>
</div>

<div class="contact-item">
    <h3>LinkedIn</h3>
    <p><a href="https://linkedin.com/in/yourprofile">linkedin.com/in/yourprofile</a></p>
</div>
```

## Color Customization

### 1. Basic Color Changes

The blog uses CSS custom properties (variables) for easy theming. Update `styles.css`:

```css
:root {
  /* Primary colors - your brand colors */
  --primary: #3498db;        /* Links, buttons, accents */
  --primary-dark: #2980b9;   /* Hover states */
  --secondary: #2c3e50;      /* Secondary elements */
  --accent: #e74c3c;         /* Highlights, warnings */
  
  /* Text colors */
  --text: #2c3e50;           /* Main text */
  --text-muted: #7f8c8d;     /* Secondary text */
  
  /* Background colors */
  --background: #ffffff;      /* Main background */
  --surface: #f8f9fa;        /* Cards, containers */
  --border: #e1e5e9;         /* Borders, dividers */
  
  /* Effects */
  --shadow: rgba(0, 0, 0, 0.1); /* Box shadows */
  --code-bg: #f1f2f6;        /* Code backgrounds */
  --code-text: #e83e8c;      /* Inline code color */
}
```

### 2. Dark Theme Colors

Customize the dark theme:
```css
[data-theme="dark"] {
  --primary: #4fa8d8;
  --primary-dark: #3498db;
  --text: #ecf0f1;
  --text-muted: #95a5a6;
  --background: #1a1a1a;
  --surface: #2c2c2c;
  --border: #404040;
  --shadow: rgba(0, 0, 0, 0.3);
  --code-bg: #2d3748;
  --code-text: #f687b3;
}
```

### 3. Color Scheme Examples

**Blue Professional:**
```css
:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --accent: #dc2626;
  --text: #1f2937;
  --background: #ffffff;
  --surface: #f8fafc;
}
```

**Green Tech:**
```css
:root {
  --primary: #10b981;
  --primary-dark: #059669;
  --accent: #f59e0b;
  --text: #111827;
  --background: #ffffff;
  --surface: #f0fdf4;
}
```

**Purple Creative:**
```css
:root {
  --primary: #8b5cf6;
  --primary-dark: #7c3aed;
  --accent: #ec4899;
  --text: #374151;
  --background: #ffffff;
  --surface: #faf5ff;
}
```

## Typography Customization

### 1. Font Changes

The blog uses Inter for text and JetBrains Mono for code. To change fonts:

**Update font imports in HTML files:**
```html
<!-- Replace existing Google Fonts link -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet">
```

**Update CSS font stacks:**
```css
body {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
}

code, pre {
  font-family: 'Source Code Pro', Consolas, Monaco, monospace;
}
```

### 2. Typography Scale

Adjust font sizes:
```css
/* Header sizes */
.hero-title {
  font-size: 3rem; /* Default: 3.5rem */
}

.page-header h1 {
  font-size: 2.5rem; /* Default: 3rem */
}

/* Body text */
body {
  font-size: 16px; /* Default: 16px */
  line-height: 1.6; /* Default: 1.6 */
}

/* Post content */
.prose {
  font-size: 1.125rem; /* Slightly larger for readability */
  line-height: 1.7;
}
```

### 3. Responsive Typography

Adjust sizes for mobile:
```css
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  body {
    font-size: 15px;
  }
}
```

## Layout Customization

### 1. Container Widths

Adjust maximum content width:
```css
.nav-container,
.main-content,
.footer-content {
  max-width: 1400px; /* Default: 1200px */
}

.page-content,
.post-content {
  max-width: 900px; /* Default: 800px */
}
```

### 2. Spacing Adjustments

Modify padding and margins:
```css
/* Increase overall spacing */
.main-content {
  padding: 3rem 2rem; /* Default: 2rem */
}

/* Adjust hero section */
.hero {
  padding: 6rem 0 8rem; /* Default: 4rem 0 6rem */
}

/* Modify post spacing */
.posts-grid {
  gap: 3rem; /* Default: 2rem */
}
```

### 3. Navigation Customization

**Sticky Navigation:**
```css
.site-header {
  position: sticky; /* Already enabled */
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
}
```

**Navigation Styling:**
```css
.navbar {
  padding: 0 3rem; /* Default: 0 2rem */
}

.nav-menu {
  gap: 3rem; /* Default: 2rem */
}

.nav-brand {
  font-size: 1.75rem; /* Default: 1.5rem */
  font-weight: 800; /* Default: 700 */
}
```

## Component Customization

### 1. Post Cards

Customize the appearance of post cards:
```css
.post-card {
  background: var(--surface);
  border: 2px solid var(--border); /* Default: 1px */
  border-radius: 1.5rem; /* Default: 1rem */
  padding: 2.5rem; /* Default: 2rem */
  transition: all 0.3s ease;
}

.post-card:hover {
  transform: translateY(-6px); /* Default: -4px */
  box-shadow: 0 20px 40px var(--shadow); /* Default: 0 12px 24px */
  border-color: var(--primary);
}
```

### 2. Tags Styling

Customize tag appearance:
```css
.tag {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  padding: 0.375rem 1rem; /* Default: 0.25rem 0.75rem */
  border-radius: 2rem; /* Default: 1rem */
  font-size: 0.875rem; /* Default: 0.75rem */
  font-weight: 600; /* Default: 500 */
}

.tag:hover {
  transform: scale(1.05);
  background: var(--primary-dark);
}
```

### 3. Buttons

Customize button styles:
```css
.view-all-btn {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  padding: 1rem 2rem; /* Default: 0.75rem 1.5rem */
  border-radius: 0.75rem; /* Default: 0.5rem */
  font-weight: 600; /* Default: 500 */
  font-size: 1rem; /* Default: inherit */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.view-all-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}
```

## Advanced Customizations

### 1. Custom CSS Classes

Add your own utility classes:
```css
/* Custom utility classes */
.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.highlight-box {
  background: var(--surface);
  border-left: 4px solid var(--primary);
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
}
```

Use in your posts:
```html
<div class="highlight-box">
  <p>This is highlighted content!</p>
</div>
```

### 2. Animation Enhancements

Add subtle animations:
```css
/* Fade in animation for post cards */
.post-card {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger animation for multiple cards */
.post-card:nth-child(1) { animation-delay: 0.1s; }
.post-card:nth-child(2) { animation-delay: 0.2s; }
.post-card:nth-child(3) { animation-delay: 0.3s; }
```

### 3. Custom Theme Toggle

Enhance the theme toggle button:
```css
.theme-toggle {
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 50%;
  width: 48px; /* Default: 40px */
  height: 48px; /* Default: 40px */
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.theme-toggle:hover {
  border-color: var(--primary);
  transform: rotate(180deg);
}

.theme-toggle .theme-icon {
  font-size: 1.5rem; /* Default: 1.2rem */
  transition: transform 0.3s ease;
}
```

## JavaScript Customizations

### 1. Custom Loading Messages

Modify the loading behavior in `js/posts.js`:
```javascript
// Add loading indicator
const showLoading = () => {
  const container = document.getElementById('recent-posts');
  if (container) {
    container.innerHTML = `
      <div class="loading">
        <p>Loading amazing content... ✨</p>
      </div>
    `;
  }
};
```

### 2. Custom Post Processing

Add custom post processing:
```javascript
// In js/posts.js, modify createPostCard method
createPostCard(post) {
  const readingTime = this.estimateReadingTime(post.content);
  
  return `
    <article class="post-card">
      <a href="post.html?post=${post.slug}">
        <h3 class="post-title">${post.title}</h3>
        <div class="post-meta">
          <span class="post-date">📅 ${this.formatDate(post.date)}</span>
          <span class="reading-time">⏱️ ${readingTime} min read</span>
        </div>
        <p class="post-excerpt">${post.excerpt}</p>
        <!-- ... rest of card ... -->
      </a>
    </article>
  `;
}

estimateReadingTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(' ').length;
  return Math.ceil(wordCount / wordsPerMinute);
}
```

### 3. Custom Search Features

Enhance search functionality in `js/search.js`:
```javascript
// Add search suggestions
setupSearchSuggestions() {
  const searchInput = document.getElementById('search');
  const suggestions = ['javascript', 'react', 'tutorial', 'nodejs'];
  
  // Add autocomplete logic
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const matches = suggestions.filter(s => s.includes(query));
    this.showSuggestions(matches);
  });
}
```

## Performance Customizations

### 1. Optimize CSS

Minimize unused CSS:
```css
/* Remove unused styles or create a minimal version */
/* Only include styles you actually use */
```

### 2. Lazy Loading Images

Add lazy loading to images:
```javascript
// In your markdown processor
.replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img alt="$1" src="$2" loading="lazy" />')
```

### 3. Font Loading Optimization

Optimize font loading:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="fonts.css" rel="stylesheet" media="print" onload="this.media='all'">
```

## Creating Custom Pages

### 1. New Page Template

Create new pages following this structure:
```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - Your Blog</title>
    <link rel="stylesheet" href="styles.css">
    <!-- Font links -->
</head>
<body>
    <!-- Copy header from existing page -->
    <header class="site-header">
        <!-- Navigation with updated active link -->
    </header>

    <main class="main-content">
        <!-- Your custom content -->
    </main>

    <!-- Copy footer from existing page -->
    <footer class="site-footer">
        <!-- Footer content -->
    </footer>

    <script src="js/theme.js"></script>
    <!-- Additional scripts if needed -->
</body>
</html>
```

### 2. Update Navigation

Add your new page to the navigation in all HTML files:
```html
<ul class="nav-menu">
    <!-- Existing items -->
    <li class="nav-item">
        <a href="your-new-page.html" class="nav-link">New Page</a>
    </li>
    <!-- More items -->
</ul>
```

## Troubleshooting Customizations

### Common Issues

1. **Changes not showing**: Clear browser cache or hard refresh (Ctrl+F5)
2. **Layout broken**: Check CSS syntax and matching brackets
3. **Colors not updating**: Ensure you're using CSS custom properties correctly
4. **Mobile layout issues**: Test responsive design at different screen sizes

### Testing Your Customizations

1. **Test all pages**: Navigate through every page after changes
2. **Test both themes**: Switch between light and dark mode
3. **Test mobile**: Use browser dev tools to test responsive design
4. **Test functionality**: Verify search, tags, and navigation still work

### Version Control

Always commit working versions before major customizations:
```bash
git add .
git commit -m "Working version before customization"
git push
```

This way you can easily revert if something breaks:
```bash
git checkout HEAD~1 -- styles.css  # Revert CSS changes
```

## Getting Help

For complex customizations:
1. Start with small changes
2. Test frequently
3. Keep backups of working versions
4. Use browser dev tools to experiment
5. Reference the existing code for patterns

The blog is designed to be customizable - don't be afraid to experiment and make it your own!