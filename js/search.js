class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('search');
        this.allPostsContainer = document.getElementById('all-posts');
        this.tagFilters = document.getElementById('tag-filters');
        this.originalPosts = [];
        this.filteredPosts = [];
        this.currentTag = '';
        
        this.init();
    }

    init() {
        if (!this.searchInput) return;
        
        this.setupEventListeners();
        this.loadPosts();
    }

    async loadPosts() {
        if (window.blogManager && window.blogManager.markdown) {
            this.originalPosts = window.blogManager.markdown.getAllPosts();
            this.filteredPosts = [...this.originalPosts];
        } else {
            setTimeout(() => this.loadPosts(), 100);
        }
    }

    setupEventListeners() {
        let searchTimeout;
        
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });

        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearSearch();
            }
        });

        if (this.tagFilters) {
            this.tagFilters.addEventListener('click', (e) => {
                if (e.target.classList.contains('tag-filter')) {
                    this.handleTagFilter(e.target);
                }
            });
        }
    }

    performSearch(query) {
        const trimmedQuery = query.trim().toLowerCase();
        
        if (!trimmedQuery) {
            this.filteredPosts = this.currentTag 
                ? window.blogManager.markdown.getPostsByTag(this.currentTag)
                : [...this.originalPosts];
        } else {
            const postsToSearch = this.currentTag 
                ? window.blogManager.markdown.getPostsByTag(this.currentTag)
                : this.originalPosts;
                
            this.filteredPosts = postsToSearch.filter(post => 
                this.matchesSearch(post, trimmedQuery)
            );
        }
        
        this.renderResults();
        this.updateSearchStats(query);
    }

    matchesSearch(post, query) {
        const searchFields = [
            post.title,
            post.excerpt,
            post.content,
            ...(post.tags || [])
        ];

        return searchFields.some(field => 
            field && field.toLowerCase().includes(query)
        );
    }

    handleTagFilter(tagButton) {
        const tag = tagButton.dataset.tag;
        
        document.querySelectorAll('.tag-filter').forEach(btn => 
            btn.classList.remove('active')
        );
        tagButton.classList.add('active');
        
        this.currentTag = tag;
        
        if (tag) {
            this.filteredPosts = window.blogManager.markdown.getPostsByTag(tag);
        } else {
            this.filteredPosts = [...this.originalPosts];
        }
        
        this.renderResults();
        
        if (this.searchInput.value) {
            this.performSearch(this.searchInput.value);
        }
    }

    renderResults() {
        if (!this.allPostsContainer) return;
        
        if (this.filteredPosts.length === 0) {
            this.renderNoResults();
        } else {
            this.allPostsContainer.innerHTML = `<ul class="posts-list">${this.filteredPosts
                .map(post => window.blogManager.createPostItem(post))
                .join('')}</ul>`;
        }
    }

    renderNoResults() {
        const query = this.searchInput.value;
        const message = query 
            ? `No posts found matching "${query}"`
            : 'No posts found';
            
        this.allPostsContainer.innerHTML = `
            <div class="no-results">
                <h3>${message}</h3>
                <p>Try adjusting your search terms or browse all posts.</p>
                <button class="btn-secondary" onclick="searchManager.clearSearch()">
                    Clear Search
                </button>
            </div>
        `;
    }

    updateSearchStats(query) {
        const existingStats = document.querySelector('.search-stats');
        if (existingStats) {
            existingStats.remove();
        }

        if (query && this.allPostsContainer) {
            const statsDiv = document.createElement('div');
            statsDiv.className = 'search-stats';
            statsDiv.innerHTML = `
                <p>Found ${this.filteredPosts.length} post${this.filteredPosts.length === 1 ? '' : 's'} 
                for "${query}"</p>
            `;
            this.allPostsContainer.parentNode.insertBefore(statsDiv, this.allPostsContainer);
        }
    }

    clearSearch() {
        this.searchInput.value = '';
        this.currentTag = '';
        this.filteredPosts = [...this.originalPosts];
        
        document.querySelectorAll('.tag-filter').forEach(btn => 
            btn.classList.remove('active')
        );
        
        const allTagsButton = document.querySelector('.tag-filter[data-tag=""]');
        if (allTagsButton) {
            allTagsButton.classList.add('active');
        }
        
        this.renderResults();
        
        const existingStats = document.querySelector('.search-stats');
        if (existingStats) {
            existingStats.remove();
        }
    }

    highlightText(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('search')) {
        window.searchManager = new SearchManager();
    }
});