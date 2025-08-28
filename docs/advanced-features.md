# Advanced Features

This guide covers the advanced features of your blog system and how to extend them further.

## Search Functionality

### How It Works

The search system provides full-text search across:
- Post titles
- Post excerpts
- Post content
- Tags

### Search Features

- **Real-time search**: Results update as you type
- **Debounced input**: Waits 300ms after typing stops
- **Cross-field search**: Searches titles, content, and tags
- **Tag filtering**: Can be combined with search
- **Case insensitive**: Finds results regardless of case

### Customizing Search

**Modify search delay** in `js/search.js`:
```javascript
// Change the 300ms delay
searchTimeout = setTimeout(() => {
    this.performSearch(e.target.value);
}, 500); // Now 500ms
```

**Add search highlighting**:
```javascript
highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}
```

**Custom search weights**:
```javascript
matchesSearch(post, query) {
    let score = 0;
    
    // Title matches get higher score
    if (post.title.toLowerCase().includes(query)) score += 10;
    if (post.excerpt.toLowerCase().includes(query)) score += 5;
    if (post.content.toLowerCase().includes(query)) score += 1;
    
    return score > 0;
}
```

## Tag System

### Tag Cloud Visualization

The tag cloud sizes tags based on usage:
- More posts = larger tag size
- Size ranges from 0.8em to 1.8em
- Sorted by popularity (most used first)

### Advanced Tag Features

**Tag analytics**:
```javascript
getTagAnalytics() {
    const tagCounts = this.getTagCounts();
    const totalPosts = this.posts.length;
    
    return Object.entries(tagCounts).map(([tag, count]) => ({
        tag,
        count,
        percentage: (count / totalPosts * 100).toFixed(1)
    })).sort((a, b) => b.count - a.count);
}
```

**Related tags**:
```javascript
getRelatedTags(currentTag) {
    const posts = this.getPostsByTag(currentTag);
    const relatedTags = new Set();
    
    posts.forEach(post => {
        post.tags?.forEach(tag => {
            if (tag !== currentTag) {
                relatedTags.add(tag);
            }
        });
    });
    
    return Array.from(relatedTags);
}
```

**Tag co-occurrence**:
```javascript
getTagCoOccurrence(tag1, tag2) {
    return this.posts.filter(post => 
        post.tags?.includes(tag1) && post.tags?.includes(tag2)
    ).length;
}
```

## Archive System

### Timeline Visualization

The archive creates a chronological timeline:
- Organized by year, then month
- Posts sorted by date (newest first)
- Visual timeline with connecting lines

### Archive Extensions

**Add post counts**:
```javascript
renderYear(year, months) {
    const totalPosts = Object.values(months)
        .reduce((sum, posts) => sum + posts.length, 0);
    
    return `
        <div class="archive-year">
            <h2>${year} <span class="post-count">(${totalPosts} posts)</span></h2>
            ${/* ... rest of rendering */}
        </div>
    `;
}
```

**Archive statistics**:
```javascript
getArchiveStats() {
    const archive = this.getArchive();
    const years = Object.keys(archive);
    const months = Object.values(archive)
        .flatMap(year => Object.keys(year));
    
    return {
        totalYears: years.length,
        totalMonths: new Set(months).size,
        mostProductiveYear: this.getMostProductiveYear(archive),
        avgPostsPerMonth: this.posts.length / new Set(months).size
    };
}
```

## Theme System

### Dark/Light Mode Toggle

**Theme persistence**: Saves preference to localStorage
**System preference detection**: Respects OS dark mode setting
**Smooth transitions**: CSS transitions for theme changes

### Advanced Theme Features

**Multiple themes**:
```javascript
class AdvancedThemeManager extends ThemeManager {
    constructor() {
        super();
        this.themes = ['light', 'dark', 'sepia', 'high-contrast'];
        this.currentThemeIndex = 0;
    }
    
    cycleTheme() {
        this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
        this.setTheme(this.themes[this.currentThemeIndex]);
    }
}
```

**Custom theme colors**:
```css
[data-theme="sepia"] {
    --primary: #8b4513;
    --background: #fdf6e3;
    --text: #5d4e37;
    --surface: #f4e6d3;
}

[data-theme="high-contrast"] {
    --primary: #0066cc;
    --background: #ffffff;
    --text: #000000;
    --surface: #f0f0f0;
}
```

## Markdown Processing

### Showdown Configuration

The blog uses Showdown.js with these features enabled:
- **Tables**: GitHub-style tables
- **Strikethrough**: ~~deleted text~~
- **Task lists**: - [x] completed tasks
- **Code blocks**: Syntax-highlighted code
- **Smart indentation**: Automatic list formatting

### Custom Markdown Extensions

**Add custom syntax**:
```javascript
// Custom Showdown extension for alerts
showdown.extension('alerts', function() {
    return [{
        type: 'lang',
        regex: /^\> \[!(\w+)\]([\s\S]*?)(?=\n\n|\n$|$)/gim,
        replace: function(match, type, content) {
            return `<div class="alert alert-${type.toLowerCase()}">
                <strong>${type}:</strong>${content}
            </div>`;
        }
    }];
});

// Register the extension
this.converter.addExtension('alerts', 'alert');
```

**Usage in posts**:
```markdown
> [!WARNING]
> This is a warning message that will be styled specially.

> [!INFO]
> This is an info callout box.
```

### Syntax Highlighting

**Add Prism.js** for better code highlighting:
```html
<!-- Add to HTML files -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-core.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/autoloader/prism-autoloader.min.js"></script>
```

**Configure code highlighting**:
```javascript
markdownToHtml(markdown) {
    const html = this.converter.makeHtml(markdown);
    
    // Process code blocks for Prism
    return html.replace(
        /<pre><code class="language-(\w+)">/g,
        '<pre><code class="language-$1">'
    );
}
```

## Performance Optimizations

### Lazy Loading

**Implement post lazy loading**:
```javascript
class LazyPostLoader {
    constructor(postsPerPage = 6) {
        this.postsPerPage = postsPerPage;
        this.currentPage = 1;
        this.allPosts = [];
        this.filteredPosts = [];
    }
    
    loadMorePosts() {
        const start = (this.currentPage - 1) * this.postsPerPage;
        const end = start + this.postsPerPage;
        const postsToLoad = this.filteredPosts.slice(start, end);
        
        if (postsToLoad.length > 0) {
            this.renderPosts(postsToLoad, true); // append = true
            this.currentPage++;
        }
    }
}
```

**Virtual scrolling** for large archives:
```javascript
class VirtualScroller {
    constructor(container, itemHeight, renderItem) {
        this.container = container;
        this.itemHeight = itemHeight;
        this.renderItem = renderItem;
        this.visibleStart = 0;
        this.visibleEnd = 0;
    }
    
    updateVisibleRange() {
        const scrollTop = this.container.scrollTop;
        const containerHeight = this.container.clientHeight;
        
        this.visibleStart = Math.floor(scrollTop / this.itemHeight);
        this.visibleEnd = Math.ceil((scrollTop + containerHeight) / this.itemHeight);
        
        this.renderVisibleItems();
    }
}
```

### Caching

**Implement post caching**:
```javascript
class PostCache {
    constructor(maxSize = 50) {
        this.cache = new Map();
        this.maxSize = maxSize;
    }
    
    get(key) {
        const item = this.cache.get(key);
        if (item) {
            // Move to end (most recently used)
            this.cache.delete(key);
            this.cache.set(key, item);
            return item;
        }
        return null;
    }
    
    set(key, value) {
        if (this.cache.size >= this.maxSize) {
            // Remove least recently used
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}
```

## Analytics and Insights

### Reading Time Calculation

```javascript
calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    return readingTime === 1 ? '1 min read' : `${readingTime} min read`;
}
```

### Post View Tracking

```javascript
class PostTracker {
    constructor() {
        this.views = this.loadViews();
    }
    
    trackView(postSlug) {
        this.views[postSlug] = (this.views[postSlug] || 0) + 1;
        this.saveViews();
    }
    
    getMostPopular(limit = 5) {
        return Object.entries(this.views)
            .sort(([,a], [,b]) => b - a)
            .slice(0, limit);
    }
    
    loadViews() {
        return JSON.parse(localStorage.getItem('postViews') || '{}');
    }
    
    saveViews() {
        localStorage.setItem('postViews', JSON.stringify(this.views));
    }
}
```

### Content Analysis

```javascript
class ContentAnalyzer {
    analyzePost(post) {
        return {
            wordCount: this.getWordCount(post.content),
            readingTime: this.calculateReadingTime(post.content),
            complexity: this.calculateComplexity(post.content),
            sentiment: this.analyzeSentiment(post.content),
            keywords: this.extractKeywords(post.content)
        };
    }
    
    calculateComplexity(content) {
        const sentences = content.split(/[.!?]+/).length;
        const words = content.split(/\s+/).length;
        const avgWordsPerSentence = words / sentences;
        
        // Simple complexity score based on sentence length
        if (avgWordsPerSentence > 20) return 'High';
        if (avgWordsPerSentence > 15) return 'Medium';
        return 'Low';
    }
}
```

## SEO Enhancements

### Automatic Meta Tags

```javascript
generateMetaTags(post) {
    return `
        <meta name="description" content="${post.excerpt}">
        <meta name="keywords" content="${post.tags?.join(', ')}">
        <meta property="og:title" content="${post.title}">
        <meta property="og:description" content="${post.excerpt}">
        <meta property="og:type" content="article">
        <meta property="article:published_time" content="${post.date}">
        <meta property="article:tag" content="${post.tags?.join('", "')}">
        <meta name="twitter:card" content="summary">
        <meta name="twitter:title" content="${post.title}">
        <meta name="twitter:description" content="${post.excerpt}">
    `;
}
```

### Sitemap Generation

```javascript
generateSitemap() {
    const posts = this.getAllPosts();
    const urls = [
        { loc: '/', changefreq: 'weekly', priority: '1.0' },
        { loc: '/posts.html', changefreq: 'weekly', priority: '0.8' },
        { loc: '/tags.html', changefreq: 'monthly', priority: '0.6' },
        { loc: '/archive.html', changefreq: 'monthly', priority: '0.6' },
        { loc: '/about.html', changefreq: 'monthly', priority: '0.5' },
        ...posts.map(post => ({
            loc: `/post.html?post=${post.slug}`,
            changefreq: 'monthly',
            priority: '0.7',
            lastmod: post.date
        }))
    ];
    
    return this.buildSitemapXML(urls);
}
```

## Accessibility Features

### Keyboard Navigation

```javascript
class KeyboardNavigation {
    constructor() {
        this.setupKeyboardShortcuts();
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + S for search
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                document.getElementById('search')?.focus();
            }
            
            // Alt + T for theme toggle
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                document.getElementById('theme-toggle')?.click();
            }
        });
    }
}
```

### Screen Reader Support

```html
<!-- Add ARIA labels and roles -->
<nav class="navbar" role="navigation" aria-label="Main navigation">
    <ul class="nav-menu" role="menubar">
        <li role="none">
            <a href="index.html" role="menuitem" aria-current="page">Home</a>
        </li>
    </ul>
</nav>

<main class="main-content" role="main" aria-label="Main content">
    <!-- Content -->
</main>
```

## Internationalization

### Multi-language Support

```javascript
class I18nManager {
    constructor(defaultLanguage = 'en') {
        this.currentLanguage = defaultLanguage;
        this.translations = {};
    }
    
    async loadLanguage(lang) {
        if (!this.translations[lang]) {
            const response = await fetch(`/i18n/${lang}.json`);
            this.translations[lang] = await response.json();
        }
        this.currentLanguage = lang;
        this.updateUI();
    }
    
    t(key) {
        return this.translations[this.currentLanguage]?.[key] || key;
    }
}
```

**Language files** (`i18n/en.json`):
```json
{
    "nav.home": "Home",
    "nav.posts": "Posts", 
    "nav.about": "About",
    "search.placeholder": "Search posts...",
    "post.readingTime": "min read",
    "archive.title": "Archive"
}
```

## API Integration

### External Content Sources

```javascript
class ExternalContentManager {
    async loadFromGitHub(repo, path) {
        const response = await fetch(
            `https://api.github.com/repos/${repo}/contents/${path}`
        );
        const data = await response.json();
        return atob(data.content); // Decode base64 content
    }
    
    async loadFromCMS(endpoint) {
        const response = await fetch(endpoint);
        return response.json();
    }
}
```

### Newsletter Integration

```javascript
class NewsletterManager {
    constructor(apiKey, listId) {
        this.apiKey = apiKey;
        this.listId = listId;
    }
    
    async subscribe(email) {
        const response = await fetch('/api/newsletter/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, listId: this.listId })
        });
        
        return response.json();
    }
}
```

## Extension System

### Plugin Architecture

```javascript
class PluginManager {
    constructor() {
        this.plugins = [];
    }
    
    register(plugin) {
        if (plugin.init && typeof plugin.init === 'function') {
            plugin.init();
            this.plugins.push(plugin);
        }
    }
    
    trigger(hook, ...args) {
        this.plugins.forEach(plugin => {
            if (plugin[hook] && typeof plugin[hook] === 'function') {
                plugin[hook](...args);
            }
        });
    }
}

// Example plugin
const SocialSharePlugin = {
    init() {
        console.log('Social Share Plugin initialized');
    },
    
    onPostRender(post) {
        this.addSocialButtons(post);
    },
    
    addSocialButtons(post) {
        const shareButtons = `
            <div class="social-share">
                <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}">
                    Share on Twitter
                </a>
            </div>
        `;
        // Add to DOM
    }
};

// Register plugin
pluginManager.register(SocialSharePlugin);
```

These advanced features can be gradually implemented as your blog grows and you need more functionality. Start with the basics and add complexity as needed.