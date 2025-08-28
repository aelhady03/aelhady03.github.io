# Troubleshooting Guide

This guide covers common issues you might encounter and how to solve them.

## Common Issues

### Posts Not Displaying

**Problem**: Posts don't show up on the home page or posts page.

**Possible Causes & Solutions**:

1. **Missing or incorrect `posts.json`**
   ```bash
   # Check if file exists
   ls posts/posts.json
   
   # Validate JSON syntax
   cat posts/posts.json | python -m json.tool
   ```
   
   **Fix**: Ensure `posts.json` exists and has valid JSON:
   ```json
   [
     {
       "file": "your-post.md",
       "slug": "your-post"
     }
   ]
   ```

2. **Missing markdown files**
   ```bash
   # Check if referenced files exist
   ls posts/*.md
   ```
   
   **Fix**: Ensure all files listed in `posts.json` exist in the `posts/` directory.

3. **Incorrect front matter**
   ```markdown
   ---
   title: "Your Title"
   date: "2025-01-20"
   tags: ["tag1", "tag2"]
   excerpt: "Your excerpt"
   ---
   ```
   
   **Fix**: Ensure front matter is between `---` lines and properly formatted.

4. **JavaScript errors**
   - Open browser console (F12)
   - Check for error messages
   - Common issues: Showdown.js failed to load, network errors

### Markdown Not Rendering

**Problem**: Posts show raw markdown instead of formatted HTML.

**Solutions**:

1. **Check Showdown.js loading**
   ```javascript
   // In browser console
   console.log(typeof showdown);
   // Should output 'object' not 'undefined'
   ```
   
   **Fix**: Ensure internet connection for CDN access, or download Showdown.js locally.

2. **Check converter initialization**
   ```javascript
   // In browser console
   console.log(window.MarkdownProcessor);
   ```
   
   **Fix**: Verify `js/markdown.js` is loading correctly.

3. **Async loading issues**
   - Showdown may not be loaded when markdown processing starts
   - **Fix**: The updated code handles this with proper async/await

### Navigation Issues

**Problem**: Links don't work or lead to 404 errors.

**Solutions**:

1. **Case sensitivity**
   - File names are case-sensitive on some servers
   - **Fix**: Ensure link hrefs match exact file names
   ```html
   <!-- Correct -->
   <a href="posts.html">Posts</a>
   
   <!-- Wrong if file is posts.html -->
   <a href="Posts.html">Posts</a>
   ```

2. **Missing files**
   ```bash
   # Check all referenced files exist
   ls *.html
   ```

3. **Local file protocol issues**
   - Some features don't work with `file://` protocol
   - **Fix**: Use a local server:
   ```bash
   python3 -m http.server 8080
   ```

### Styling Issues

**Problem**: Blog looks unstyled or layout is broken.

**Solutions**:

1. **CSS file not loading**
   ```bash
   # Check file exists
   ls styles.css
   ```
   
   **Fix**: Ensure `styles.css` is in the root directory.

2. **CSS syntax errors**
   - Use browser dev tools to check for CSS errors
   - **Fix**: Validate CSS syntax

3. **Theme variables not working**
   ```css
   /* Check if CSS custom properties are supported */
   :root {
     --primary: #3498db;
   }
   
   .element {
     color: var(--primary); /* This might not work in very old browsers */
   }
   ```

4. **Font loading issues**
   ```html
   <!-- Check if Google Fonts are loading -->
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
   ```

### Search Not Working

**Problem**: Search box doesn't return results or shows errors.

**Solutions**:

1. **Check JavaScript loading**
   ```javascript
   // In browser console
   console.log(window.searchManager);
   ```

2. **Posts not loaded**
   ```javascript
   // In browser console
   console.log(window.blogManager.posts);
   // Should show array of posts
   ```

3. **Event listeners not attached**
   - Check browser console for errors
   - **Fix**: Ensure `js/search.js` loads after `js/posts.js`

### Dark Mode Not Working

**Problem**: Theme toggle doesn't work or theme doesn't persist.

**Solutions**:

1. **LocalStorage issues**
   ```javascript
   // In browser console
   console.log(localStorage.getItem('theme'));
   ```
   
   **Fix**: Clear localStorage if corrupted:
   ```javascript
   localStorage.removeItem('theme');
   ```

2. **CSS custom properties not updating**
   ```javascript
   // Check current theme
   console.log(document.documentElement.getAttribute('data-theme'));
   ```

3. **Event listener not attached**
   ```javascript
   // In browser console
   console.log(window.ThemeManager);
   ```

### Mobile Layout Issues

**Problem**: Blog doesn't look good on mobile devices.

**Solutions**:

1. **Missing viewport meta tag**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

2. **CSS media queries not working**
   - Test in browser dev tools
   - Check for syntax errors in CSS

3. **Touch events not working**
   - Ensure buttons are large enough (44px minimum)
   - Check for hover-only interactions

## GitHub Pages Issues

### Site Not Building

**Problem**: GitHub Pages build fails.

**Solutions**:

1. **Check Actions tab**
   - Go to your repository
   - Click "Actions" tab
   - Review failed build details

2. **Common build issues**:
   - Invalid HTML syntax
   - Missing files referenced in links
   - Incorrect file names or paths

3. **Jekyll processing issues**
   - Ensure `.nojekyll` file exists
   - Check for Jekyll syntax in your files (remove if any)

### Site Not Updating

**Problem**: Changes don't appear on live site.

**Solutions**:

1. **Cache issues**
   - Clear browser cache (Ctrl+F5)
   - Try incognito/private browsing mode

2. **Build not completing**
   - Check GitHub Actions for completion
   - Wait 5-10 minutes for deployment

3. **Branch issues**
   - Ensure changes are pushed to the main branch
   - Check GitHub Pages settings for correct branch

### 404 Errors on GitHub Pages

**Problem**: Pages show 404 errors on GitHub Pages but work locally.

**Solutions**:

1. **Case sensitivity**
   - GitHub Pages is case-sensitive
   - Ensure exact file name matches

2. **File extensions**
   ```html
   <!-- Include .html extension -->
   <a href="about.html">About</a>
   
   <!-- This might not work on GitHub Pages -->
   <a href="about">About</a>
   ```

3. **Path issues**
   - Use relative paths: `posts.html` not `/posts.html`
   - Check that all referenced files exist

## Performance Issues

### Slow Loading

**Problem**: Blog loads slowly.

**Solutions**:

1. **Large images**
   - Compress images before uploading
   - Use appropriate image formats (WebP, optimized JPEG/PNG)

2. **Too many HTTP requests**
   - Minimize external dependencies
   - Use CSS sprites for small images

3. **Unoptimized fonts**
   ```html
   <!-- Optimize font loading -->
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   ```

4. **JavaScript blocking**
   - Move scripts to bottom of page
   - Use async/defer attributes where appropriate

### Memory Issues

**Problem**: Browser becomes slow or unresponsive with many posts.

**Solutions**:

1. **Implement pagination**
   ```javascript
   // Limit posts displayed at once
   const postsPerPage = 10;
   ```

2. **Virtual scrolling**
   - Only render visible posts
   - Implement lazy loading for large lists

3. **Memory leaks**
   - Remove event listeners when not needed
   - Clear timers and intervals

## Browser Compatibility Issues

### Internet Explorer/Edge Legacy

**Problem**: Blog doesn't work in older browsers.

**Solutions**:

1. **CSS custom properties**
   ```css
   /* Fallback for older browsers */
   .element {
     color: #3498db; /* fallback */
     color: var(--primary);
   }
   ```

2. **JavaScript ES6+ features**
   ```javascript
   // Use traditional function syntax for older browsers
   function() {
     // instead of arrow functions () => {}
   }
   ```

3. **Fetch API**
   ```javascript
   // Add polyfill for older browsers
   if (!window.fetch) {
     // Load fetch polyfill
   }
   ```

### Safari Issues

**Problem**: Features work in Chrome/Firefox but not Safari.

**Solutions**:

1. **CSS Grid/Flexbox**
   - Use proper vendor prefixes
   - Test layouts in Safari

2. **Date parsing**
   ```javascript
   // Safari is strict about date formats
   new Date('2025-01-20'); // Works
   new Date('2025/01/20'); // Might not work in Safari
   ```

## Development Issues

### Local Server Problems

**Problem**: Local server won't start or files won't serve.

**Solutions**:

1. **Python server issues**
   ```bash
   # Try different Python versions
   python3 -m http.server 8080
   python -m http.server 8080
   python -m SimpleHTTPServer 8080
   ```

2. **Port already in use**
   ```bash
   # Use different port
   python3 -m http.server 8081
   ```

3. **File permissions**
   ```bash
   # Fix file permissions
   chmod -R 755 .
   ```

### CORS Issues

**Problem**: Can't load files due to CORS restrictions.

**Solutions**:

1. **Use proper server**
   - Don't open HTML files directly in browser
   - Use local HTTP server

2. **File protocol limitations**
   - Many features don't work with `file://` protocol
   - Use `http://localhost` instead

## Data Issues

### Posts.json Corruption

**Problem**: JSON file becomes invalid.

**Solutions**:

1. **Validate JSON**
   ```bash
   # Check JSON syntax
   cat posts/posts.json | python -m json.tool
   ```

2. **Common JSON errors**:
   - Missing commas between objects
   - Trailing commas (not allowed in JSON)
   - Unescaped quotes in strings

3. **Backup strategy**
   - Keep backups of working `posts.json`
   - Use version control (git) to track changes

### Front Matter Issues

**Problem**: Post metadata not parsing correctly.

**Solutions**:

1. **YAML syntax**
   ```yaml
   ---
   title: "Correct Title"  # Use quotes for safety
   date: "2025-01-20"      # YYYY-MM-DD format
   tags: ["tag1", "tag2"]  # Array format
   excerpt: "Description"  # No colons without quotes
   ---
   ```

2. **Special characters**
   - Escape quotes in titles: `title: "He said \"Hello\""`
   - Be careful with colons and other YAML special chars

3. **Date formats**
   ```yaml
   # Correct
   date: "2025-01-20"
   
   # Might cause issues
   date: "January 20, 2025"
   date: "20/01/2025"
   ```

## Debugging Tools

### Browser Console

**Essential debugging commands**:
```javascript
// Check if main objects are loaded
console.log(window.blogManager);
console.log(window.MarkdownProcessor);
console.log(window.searchManager);

// Check posts data
console.log(window.blogManager?.posts);

// Check theme
console.log(document.documentElement.getAttribute('data-theme'));

// Check localStorage
console.log(localStorage.getItem('theme'));
```

### Network Tab

**Check for loading issues**:
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Look for failed requests (red entries)
5. Check if all CSS/JS files load correctly

### Console Errors

**Common error messages and solutions**:

- `Uncaught ReferenceError: showdown is not defined`
  - Solution: Check internet connection, CDN accessibility

- `Failed to fetch`
  - Solution: Use local server, check file paths

- `Unexpected token in JSON`
  - Solution: Validate `posts.json` syntax

## Getting Help

### Before Asking for Help

1. **Check browser console** for error messages
2. **Try in different browser** to isolate browser-specific issues
3. **Test locally** with a proper HTTP server
4. **Validate your files** (JSON syntax, HTML markup)
5. **Check recent changes** that might have caused the issue

### Providing Good Bug Reports

When reporting issues, include:

1. **What you were trying to do**
2. **What you expected to happen**
3. **What actually happened**
4. **Browser and version** (Chrome 91, Safari 14, etc.)
5. **Operating system** (Windows 10, macOS 11, Ubuntu 20.04)
6. **Console error messages** (copy exact text)
7. **Steps to reproduce** the issue
8. **Minimal example** if possible

### Self-Help Resources

1. **Browser DevTools** - Your best debugging friend
2. **JSON Validator** - For checking `posts.json` syntax
3. **HTML Validator** - For checking HTML markup
4. **CSS Validator** - For checking CSS syntax
5. **Markdown Editor** - For testing markdown syntax

Remember: Most issues are caused by simple syntax errors or file path problems. Take your time to carefully check the basics before diving into complex solutions.