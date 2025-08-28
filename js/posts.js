class BlogManager {
    constructor() {
        this.markdown = null;
        this.posts = [];
        this.init();
    }

    async init() {
        await this.loadMarkdownProcessor();
        this.setupEventListeners();
        this.renderContent();
    }

    async loadMarkdownProcessor() {
        if (typeof MarkdownProcessor === 'undefined') {
            const script = document.createElement('script');
            script.src = 'js/markdown.js';
            document.head.appendChild(script);
            
            await new Promise((resolve) => {
                script.onload = resolve;
            });
        }
        
        this.markdown = new MarkdownProcessor();
        await this.markdown.loadMarkdown();
        this.posts = this.markdown.getAllPosts();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchPosts(e.target.value);
            });
        }
    }

    renderContent() {
        const currentPage = this.getCurrentPage();
        
        switch(currentPage) {
            case 'index':
                this.renderHomePage();
                break;
            case 'posts':
                this.renderPostsPage();
                break;
            case 'post':
                this.renderIndividualPost();
                break;
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const params = new URLSearchParams(window.location.search);
        
        if (path.includes('posts.html')) return 'posts';
        if (path.includes('post.html') || params.has('post')) return 'post';
        return 'index';
    }

    renderHomePage() {
        const recentPostsContainer = document.getElementById('recent-posts');
        if (!recentPostsContainer) return;

        const recentPosts = this.posts.slice(0, 3);
        recentPostsContainer.innerHTML = `<ul class="posts-list">${recentPosts.map(post => this.createPostItem(post)).join('')}</ul>`;
    }

    renderPostsPage() {
        const allPostsContainer = document.getElementById('all-posts');
        if (!allPostsContainer) return;

        allPostsContainer.innerHTML = `<ul class="posts-list">${this.posts.map(post => this.createPostItem(post)).join('')}</ul>`;
        this.setupTagFilters();
    }

    renderIndividualPost() {
        const params = new URLSearchParams(window.location.search);
        const postSlug = params.get('post');
        
        if (!postSlug) {
            window.location.href = 'posts.html';
            return;
        }

        const post = this.markdown.getPostBySlug(postSlug);
        if (!post) {
            this.renderNotFound();
            return;
        }

        document.title = `${post.title} - Elhady's blog`;
        this.createPostPage(post);
    }

    createPostPage(post) {
        const main = document.querySelector('.main-content');
        if (!main) return;

        main.innerHTML = `
            <article class="post-content">
                <a href="posts.html" class="back-link">← Back to Posts</a>
                
                <header class="post-header">
                    <h1>${post.title}</h1>
                    <div class="post-meta-full">
                        <span class="post-date">${this.formatDate(post.date)}</span>
                        <div class="post-tags">
                            ${post.tags ? post.tags.map(tag => 
                                `<a href="tags.html?tag=${encodeURIComponent(tag)}" class="tag">${tag}</a>`
                            ).join('') : ''}
                        </div>
                    </div>
                </header>

                <div class="prose">
                    ${post.htmlContent}
                </div>
            </article>
        `;
    }

    createPostItem(post) {
        return `
            <li class="post-item">
                <a href="post.html?post=${post.slug}" class="post-link">
                    <h3 class="post-title">${post.title}</h3>
                    <div class="post-meta">
                        <span class="post-date">${this.formatDate(post.date)}</span>
                        ${post.tags ? `<span class="post-tags">${post.tags.map(tag => 
                            `<a href="tags.html?tag=${encodeURIComponent(tag)}" class="tag">${tag}</a>`
                        ).join('')}</span>` : ''}
                    </div>
                    <p class="post-excerpt">${post.excerpt}</p>
                </a>
            </li>
        `;
    }

    setupTagFilters() {
        const tagFiltersContainer = document.getElementById('tag-filters');
        if (!tagFiltersContainer) return;

        const allTags = this.markdown.getAllTags();
        
        tagFiltersContainer.innerHTML = `
            <button class="tag-filter active" data-tag="">All Posts</button>
            ${allTags.map(tag => 
                `<button class="tag-filter" data-tag="${tag}">${tag} (${this.getPostCountByTag(tag)})</button>`
            ).join('')}
        `;

        tagFiltersContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag-filter')) {
                this.filterByTag(e.target.dataset.tag);
                
                document.querySelectorAll('.tag-filter').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    }

    filterByTag(tag) {
        const postsToShow = tag ? this.markdown.getPostsByTag(tag) : this.posts;
        const allPostsContainer = document.getElementById('all-posts');
        
        if (allPostsContainer) {
            allPostsContainer.innerHTML = `<ul class="posts-list">${postsToShow.map(post => this.createPostItem(post)).join('')}</ul>`;
        }
    }

    searchPosts(query) {
        if (!query.trim()) {
            this.renderPostsPage();
            return;
        }

        const searchResults = this.posts.filter(post => 
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
        );

        const allPostsContainer = document.getElementById('all-posts');
        if (allPostsContainer) {
            allPostsContainer.innerHTML = `<ul class="posts-list">${searchResults.map(post => this.createPostItem(post)).join('')}</ul>`;
        }
    }

    getPostCountByTag(tag) {
        return this.posts.filter(post => post.tags && post.tags.includes(tag)).length;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    renderNotFound() {
        const main = document.querySelector('.main-content');
        if (!main) return;

        main.innerHTML = `
            <div class="page-content">
                <h1>Post Not Found</h1>
                <p>The post you're looking for doesn't exist.</p>
                <a href="posts.html" class="view-all-btn">← Back to Posts</a>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.blogManager = new BlogManager();
});