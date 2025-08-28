# Getting Started

This guide will help you set up your blog and create your first post in just a few minutes.

## Prerequisites

- Basic knowledge of HTML/CSS (optional for basic usage)
- Text editor (VS Code, Sublime Text, or any text editor)
- Git (for deployment to GitHub Pages)
- Web browser for testing

## Initial Setup

### 1. Download or Clone the Blog

If you're starting from scratch:
```bash
git clone https://github.com/yourusername/blog-repository.git
cd blog-repository
```

### 2. Customize Site Information

Update the following files with your information:

#### Update Navigation and Titles

Edit these files to change the site title and navigation:
- `index.html` - Home page title and hero section
- `about.html` - Your personal information
- `contact.html` - Your contact details
- All other HTML files - Update `<title>` tags

**Example: Updating the home page hero section**

In `index.html`, find and update:
```html
<h1 class="hero-title">Your Blog Name</h1>
<p class="hero-description">Your blog description here.</p>
```

#### Update Contact Information

In `contact.html`, update your contact details:
```html
<div class="contact-item">
    <h3>Email</h3>
    <p><a href="mailto:your.email@example.com">your.email@example.com</a></p>
</div>
```

### 3. Test Locally

Open `index.html` in your browser to see your blog. For best results, use a local server:

```bash
# Python 3
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080

# Node.js (if you have it installed)
npx serve .
```

Then visit `http://localhost:8080` in your browser.

## Creating Your First Post

### 1. Create a Markdown File

Create a new file in the `posts/` directory. Let's call it `my-first-post.md`:

```markdown
---
title: "My First Blog Post"
date: "2025-01-20"
tags: ["welcome", "first-post", "blogging"]
excerpt: "Welcome to my new blog! This is my first post where I introduce myself and share what I plan to write about."
---

# Welcome to My Blog!

This is my first post on my new Elhady's blog. I'm excited to share my journey and insights with you.

## What I Plan to Write About

I'll be covering topics like:

* **Software Architecture** - Design patterns and best practices
* **Web Development** - Frontend and backend technologies  
* **Career Advice** - Tips for growing as a software engineer
* **Tool Reviews** - My favorite development tools and why

## A Code Example

Here's a simple JavaScript function:

```javascript
function greetReader(name) {
    console.log(`Hello, ${name}! Welcome to my blog.`);
}

greetReader('World');
```

## What's Next?

Stay tuned for more posts! I'll be sharing tutorials, experiences, and insights regularly.

Thanks for reading!
```

### 2. Add Post to Index

Update `posts/posts.json` to include your new post:

```json
[
  {
    "file": "my-first-post.md",
    "slug": "my-first-post"
  },
  {
    "file": "clean-architecture-getting-started.md",
    "slug": "clean-architecture-getting-started"
  },
  {
    "file": "javascript-best-practices-2025.md",
    "slug": "javascript-best-practices-2025"
  },
  {
    "file": "scalable-apis-nodejs.md",
    "slug": "scalable-apis-nodejs"
  }
]
```

**Important**: Add your new post at the top of the array for it to appear first.

### 3. Test Your Post

1. Refresh your browser on the home page
2. You should see your new post in the "Recent Posts" section
3. Click on it to read the full post
4. Test the tags functionality by clicking on a tag

## Understanding the File Structure

```
your-blog/
├── posts/                    # All your blog posts go here
│   ├── posts.json           # Index of all posts (MUST UPDATE)
│   ├── my-first-post.md     # Your posts
│   └── *.md                 # More posts...
├── js/                      # JavaScript (don't modify unless advanced)
├── index.html              # Home page
├── posts.html              # All posts page
├── post.html               # Individual post viewer
├── tags.html               # Tags page
├── archive.html            # Archive page
├── about.html              # Your about page (customize this!)
├── contact.html            # Your contact page (customize this!)
└── styles.css              # Styling (customize colors, fonts, etc.)
```

## Next Steps

Now that you have your first post:

1. **Write More Posts**: Create more `.md` files in the `posts/` folder
2. **Organize with Tags**: Use consistent tags to categorize your content
3. **Customize Styling**: Modify `styles.css` to match your preferences
4. **Deploy Online**: Follow the [Deployment Guide](deployment.md) to publish to GitHub Pages

## Common First-Time Issues

### Post Not Showing Up?
- Check that you added the post to `posts.json`
- Verify the file path is correct
- Make sure the front matter is properly formatted (between `---` lines)

### Styling Looks Broken?
- Make sure you're using a local server, not just opening the HTML file
- Check for JavaScript errors in browser console (F12)

### Links Not Working?
- Ensure you're testing with a local server
- Check that file paths are correct (case-sensitive on some systems)

## Getting Help

If you run into issues:

1. Check the [Troubleshooting Guide](troubleshooting.md)
2. Look at the existing sample posts for formatting examples
3. Verify your JSON syntax in `posts.json` using a JSON validator

Ready to create more content? Check out the [Creating Posts Guide](creating-posts.md) for advanced features!