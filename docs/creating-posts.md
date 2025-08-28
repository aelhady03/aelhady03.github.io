# Creating Posts

This guide covers everything you need to know about writing and publishing blog posts, from basic formatting to advanced features.

## Post Structure

Every blog post consists of two parts:
1. **Front Matter** - Metadata about the post
2. **Content** - The actual post content in Markdown format

## Front Matter

Front matter is metadata that goes at the top of your post, enclosed by `---` lines:

```yaml
---
title: "Your Post Title"
date: "2025-01-20"
tags: ["tag1", "tag2", "tag3"]
excerpt: "A brief description that appears in post listings."
---
```

### Required Fields

- **title**: The post title (will appear in navigation and SEO)
- **date**: Publication date in YYYY-MM-DD format
- **tags**: Array of tags for categorization
- **excerpt**: Short description for post previews

### Optional Fields

You can add custom fields for future use:

```yaml
---
title: "Advanced JavaScript Patterns"
date: "2025-01-20"
tags: ["javascript", "patterns", "advanced"]
excerpt: "Exploring advanced JavaScript patterns for better code organization."
author: "Your Name"
category: "Tutorial"
difficulty: "Advanced"
reading_time: "10 min read"
---
```

## Markdown Syntax Guide

### Headers

```markdown
# Main Title (H1)
## Section Title (H2)
### Subsection Title (H3)
#### Minor Section (H4)
```

### Text Formatting

```markdown
**Bold text**
*Italic text*
***Bold and italic***
`Inline code`
~~Strikethrough~~ (not supported yet)
```

### Links and Images

```markdown
[Link text](https://example.com)
[Internal link](other-post.html)
![Alt text](image-url.jpg)
![Local image](../images/screenshot.png)
```

### Lists

**Unordered Lists:**
```markdown
* Item 1
* Item 2
  * Nested item
  * Another nested item
* Item 3
```

**Ordered Lists:**
```markdown
1. First item
2. Second item
3. Third item
   1. Nested numbered item
   2. Another nested item
```

### Code Blocks

**Inline code:**
```markdown
Use the `console.log()` function to debug.
```

**Code blocks:**
````markdown
```javascript
function greetUser(name) {
    console.log(`Hello, ${name}!`);
}
```
````

**Supported languages for syntax highlighting:**
- `javascript`
- `python`
- `html`
- `css`
- `bash`
- `json`
- `markdown`
- And many more...

### Blockquotes

```markdown
> This is a blockquote. Use it for highlighting important information,
> quotes from other sources, or callout sections.
>
> You can have multiple paragraphs in a blockquote.
```

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | More     |
| Row 2    | Data     | Data     |
```

*Note: Table support may be limited in the current markdown processor.*

## Post Organization

### File Naming

Use descriptive, URL-friendly names for your post files:

**Good:**
- `clean-architecture-principles.md`
- `javascript-async-await-guide.md`
- `docker-deployment-tutorial.md`

**Avoid:**
- `post1.md`
- `My New Post!.md`
- `2025-01-20-post.md`

### Slug Creation

The `slug` in `posts.json` should match your filename (without `.md`):

```json
{
  "file": "clean-architecture-principles.md",
  "slug": "clean-architecture-principles"
}
```

The slug becomes part of the URL: `post.html?post=clean-architecture-principles`

## Advanced Features

### Tags Best Practices

**Good tagging:**
```yaml
tags: ["javascript", "async", "promises", "tutorial"]
```

**Tips:**
- Use 3-6 tags per post
- Be consistent with tag names (always lowercase)
- Use specific tags: "react-hooks" instead of just "react"
- Create a mental tag taxonomy for consistency

**Common tag categories:**
- **Technologies**: "javascript", "python", "react", "nodejs"
- **Topics**: "algorithms", "databases", "security", "performance"
- **Types**: "tutorial", "opinion", "review", "news"
- **Levels**: "beginner", "intermediate", "advanced"

### Series and Related Posts

For post series, use consistent tagging and naming:

```markdown
---
title: "React Hooks Guide - Part 1: useState"
tags: ["react", "hooks", "series-react-hooks", "tutorial"]
series: "React Hooks Guide"
part: 1
---
```

### Rich Content Examples

**Code with explanations:**
```markdown
Here's how to implement a simple debounce function:

```javascript
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
```

This function prevents a function from being called too frequently by delaying its execution.
```

**Step-by-step tutorials:**
```markdown
## Step 1: Setup the Project

First, create a new directory:

```bash
mkdir my-project
cd my-project
```

## Step 2: Install Dependencies

Add the required packages:

```bash
npm init -y
npm install express
```

## Step 3: Create the Server

Create `server.js`:

```javascript
const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```
```

## Publishing Workflow

### 1. Create the Post

1. Create `.md` file in `posts/` folder
2. Write your content with proper front matter
3. Save the file

### 2. Update Index

Add entry to `posts/posts.json`:
```json
[
  {
    "file": "your-new-post.md",
    "slug": "your-new-post"
  },
  // ... existing posts
]
```

### 3. Test Locally

1. Start local server: `python3 -m http.server 8080`
2. Visit `http://localhost:8080`
3. Check your post appears in recent posts
4. Click through to read full post
5. Test tags and search functionality

### 4. Deploy

Commit and push your changes to deploy to GitHub Pages:

```bash
git add .
git commit -m "Add new post: Your Post Title"
git push origin main
```

## Content Ideas

### Technical Tutorials
- Step-by-step guides
- Problem-solving walkthroughs
- Tool comparisons
- Best practices guides

### Opinion and Analysis
- Technology trends
- Career advice
- Industry insights
- Tool reviews

### Personal Journey
- Learning experiences
- Project retrospectives
- Challenges and solutions
- Skills development

## SEO and Discoverability

### Writing Good Titles
- Be descriptive and specific
- Include key terms
- Keep under 60 characters for better display

**Good titles:**
- "Building Scalable APIs with Node.js and Express"
- "Understanding JavaScript Closures with Examples"
- "Docker Deployment Guide for React Applications"

### Writing Good Excerpts
- Summarize the main value proposition
- Keep under 160 characters
- Include key terms
- Make it compelling

**Good excerpt:**
"Learn how to build scalable Node.js APIs with proper error handling, rate limiting, and database optimization. Includes production deployment guide."

## Common Issues

### Markdown Not Rendering
- Check front matter format (must be between `---` lines)
- Verify proper spacing in YAML
- Ensure file is saved as `.md`

### Post Not Appearing
- Did you add it to `posts.json`?
- Is the file path correct?
- Check browser console for JavaScript errors

### Broken Formatting
- Ensure proper spacing around headers
- Check code block formatting (three backticks)
- Verify list item spacing

### Tags Not Working
- Use lowercase tag names
- Ensure tags are in array format: `["tag1", "tag2"]`
- Check for typos in tag names

## Advanced Customization

If you want to modify how posts are processed, you can edit:
- `js/markdown.js` - Markdown processing
- `js/posts.js` - Post display logic
- `styles.css` - Post styling

For more advanced customization, see the [Customization Guide](customization.md).

## Examples

Check the existing sample posts for examples of:
- `clean-architecture-getting-started.md` - Technical tutorial
- `javascript-best-practices-2025.md` - Best practices guide
- `scalable-apis-nodejs.md` - Comprehensive how-to guide

Each demonstrates different writing styles and formatting techniques you can use in your own posts.