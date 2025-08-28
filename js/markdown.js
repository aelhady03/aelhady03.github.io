class MarkdownProcessor {
    constructor() {
        this.posts = [];
        this.loadMarkdown();
    }

    async loadMarkdown() {
        try {
            // Initialize Showdown first
            await this.initializeShowdown();
            
            const response = await fetch('posts/posts.json');
            if (!response.ok) {
                console.warn('posts.json not found, using sample data');
                this.posts = this.getSamplePosts();
                // Process sample posts with Showdown
                this.posts = this.posts.map(post => ({
                    ...post,
                    htmlContent: this.markdownToHtml(post.content)
                }));
                return;
            }
            const postsIndex = await response.json();
            
            this.posts = await Promise.all(
                postsIndex.map(async (postMeta) => {
                    try {
                        const markdownResponse = await fetch(`posts/${postMeta.file}`);
                        const markdownContent = await markdownResponse.text();
                        
                        const frontMatter = this.extractFrontMatter(markdownContent);
                        const content = this.removeFrontMatter(markdownContent);
                        
                        return {
                            ...postMeta,
                            ...frontMatter,
                            content: content,
                            htmlContent: this.markdownToHtml(content)
                        };
                    } catch (error) {
                        console.error(`Error loading post ${postMeta.file}:`, error);
                        return null;
                    }
                })
            );
            
            this.posts = this.posts.filter(post => post !== null);
            this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            
        } catch (error) {
            console.error('Error loading posts:', error);
            // Ensure Showdown is initialized even for sample posts
            if (!this.converter) {
                await this.initializeShowdown();
            }
            this.posts = this.getSamplePosts();
            // Process sample posts with Showdown
            this.posts = this.posts.map(post => ({
                ...post,
                htmlContent: this.markdownToHtml(post.content)
            }));
        }
    }

    extractFrontMatter(content) {
        const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (!frontMatterMatch) return {};
        
        const frontMatter = {};
        const lines = frontMatterMatch[1].split('\n');
        
        lines.forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                let value = valueParts.join(':').trim();
                
                if (value.startsWith('[') && value.endsWith(']')) {
                    value = value.slice(1, -1).split(',').map(tag => tag.trim().replace(/['"]/g, ''));
                } else {
                    value = value.replace(/['"]/g, '');
                }
                
                frontMatter[key.trim()] = value;
            }
        });
        
        return frontMatter;
    }

    removeFrontMatter(content) {
        return content.replace(/^---\n[\s\S]*?\n---\n/, '');
    }

    async initializeShowdown() {
        if (typeof showdown === 'undefined') {
            // Load Showdown.js from CDN
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js';
            document.head.appendChild(script);
            
            await new Promise((resolve, reject) => {
                script.onload = resolve;
                script.onerror = reject;
            });
        }
        
        // Configure Showdown converter
        this.converter = new showdown.Converter({
            tables: true,
            strikethrough: true,
            tasklists: true,
            ghCodeBlocks: true,
            smartIndentationFix: true,
            simpleLineBreaks: false,
            requireSpaceBeforeHeadingText: true,
            ghMentions: false,
            openLinksInNewWindow: false,
            backslashEscapesHTMLTags: true,
            emoji: false,
            underline: false,
            completeHTMLDocument: false,
            metadata: false,
            splitAdjacentBlockquotes: true
        });
    }

    markdownToHtml(markdown) {
        if (!this.converter) {
            console.error('Showdown not initialized');
            return markdown;
        }
        
        return this.converter.makeHtml(markdown);
    }

    getSamplePosts() {
        return [
            {
                title: "Getting Started with Clean Architecture",
                slug: "clean-architecture-getting-started",
                date: "2025-01-15",
                tags: ["architecture", "design-patterns", "software-engineering"],
                excerpt: "Learn the fundamentals of Clean Architecture and how it can improve your software design. We'll explore the key principles and practical implementation strategies.",
                content: `# Getting Started with Clean Architecture

Clean Architecture is a software design philosophy that emphasizes separation of concerns and dependency inversion. It was popularized by Robert C. Martin (Uncle Bob) and has become a cornerstone of modern software development.

## Core Principles

The main principles of Clean Architecture include:

* **Independence of Frameworks**: The architecture doesn't depend on external libraries
* **Testable**: Business rules can be tested without UI or database
* **Independence of UI**: UI can be easily changed without changing the system
* **Independence of Database**: Business rules are not bound to the database

## Implementation Strategy

When implementing Clean Architecture, consider these layers:

1. **Entities** - Core business logic
2. **Use Cases** - Application-specific business rules  
3. **Interface Adapters** - Convert data between use cases and external agencies
4. **Frameworks & Drivers** - Web, database, external interfaces

> Clean Architecture helps create systems that are easier to understand, develop, and maintain over time.

By following these principles, you'll create more maintainable and testable software systems.`
            },
            {
                title: "Modern JavaScript Best Practices 2025",
                slug: "javascript-best-practices-2025",
                date: "2025-01-10",
                tags: ["javascript", "best-practices", "web-development"],
                excerpt: "Discover the latest JavaScript best practices for 2025, including ES2025 features, performance optimization techniques, and modern development patterns.",
                content: `# Modern JavaScript Best Practices 2025

JavaScript continues to evolve rapidly. Here are the essential best practices every developer should follow in 2025.

## ES2025 Features to Use

### Top-Level Await
\`\`\`javascript
// Now you can use await at the top level
const data = await fetch('/api/data');
const result = await data.json();
\`\`\`

### Private Class Fields
\`\`\`javascript
class UserService {
  #apiKey = 'secret-key';
  
  async getUser(id) {
    // Use private field
    return fetch(\`/api/users/\${id}\`, {
      headers: { 'Authorization': this.#apiKey }
    });
  }
}
\`\`\`

## Performance Best Practices

* Use **const** and **let** instead of **var**
* Leverage **async/await** for better readability
* Implement **proper error handling**
* Use **modern bundling** techniques

## Code Organization

Structure your code with:

1. Clear module boundaries
2. Consistent naming conventions
3. Comprehensive documentation
4. Regular code reviews

> Modern JavaScript development is about writing clean, maintainable, and performant code that scales with your application.`
            },
            {
                title: "Building Scalable APIs with Node.js",
                slug: "scalable-apis-nodejs",
                date: "2025-01-05",
                tags: ["nodejs", "api", "backend", "scalability"],
                excerpt: "Learn how to build scalable and maintainable APIs using Node.js. Cover authentication, rate limiting, caching, and deployment strategies.",
                content: `# Building Scalable APIs with Node.js

Building APIs that can handle growth requires careful planning and implementation. Here's how to create scalable Node.js APIs.

## Essential Architecture Patterns

### Layered Architecture
Structure your API with distinct layers:

* **Route Layer** - Handle HTTP requests
* **Service Layer** - Business logic
* **Data Access Layer** - Database operations
* **Middleware Layer** - Cross-cutting concerns

### Database Design
\`\`\`javascript
// Use connection pooling
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000
});
\`\`\`

## Performance Optimization

### Caching Strategy
Implement Redis for session storage and frequently accessed data:

\`\`\`javascript
const redis = require('redis');
const client = redis.createClient();

app.get('/api/posts/:id', async (req, res) => {
  const cached = await client.get(\`post:\${req.params.id}\`);
  if (cached) return res.json(JSON.parse(cached));
  
  // Fetch from database if not cached
  const post = await Post.findById(req.params.id);
  await client.setex(\`post:\${req.params.id}\`, 3600, JSON.stringify(post));
  res.json(post);
});
\`\`\`

## Security Best Practices

1. **Authentication & Authorization**
2. **Rate Limiting**
3. **Input Validation**
4. **CORS Configuration**

> Scalable APIs require thoughtful architecture, proper caching, and robust security measures from day one.`
            }
        ];
    }

    getAllPosts() {
        return this.posts;
    }

    getPostBySlug(slug) {
        return this.posts.find(post => post.slug === slug);
    }

    getPostsByTag(tag) {
        return this.posts.filter(post => 
            post.tags && post.tags.includes(tag)
        );
    }

    getAllTags() {
        const tags = new Set();
        this.posts.forEach(post => {
            if (post.tags) {
                post.tags.forEach(tag => tags.add(tag));
            }
        });
        return Array.from(tags).sort();
    }

    getArchive() {
        const archive = {};
        this.posts.forEach(post => {
            const date = new Date(post.date);
            const year = date.getFullYear();
            const month = date.toLocaleDateString('en-US', { month: 'long' });
            
            if (!archive[year]) archive[year] = {};
            if (!archive[year][month]) archive[year][month] = [];
            
            archive[year][month].push(post);
        });
        return archive;
    }
}

window.MarkdownProcessor = MarkdownProcessor;