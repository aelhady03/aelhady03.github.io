class TagsManager {
    constructor() {
        this.markdown = null;
        this.tagCloudContainer = document.getElementById('tag-cloud');
        this.tagPostsSection = document.getElementById('tag-posts');
        this.currentTagSpan = document.getElementById('current-tag');
        this.taggedPostsContainer = document.getElementById('tagged-posts');
        this.clearTagButton = document.getElementById('clear-tag');
        
        this.init();
    }

    async init() {
        await this.loadMarkdownProcessor();
        this.setupEventListeners();
        this.renderTagCloud();
        // Check URL params after everything is loaded
        setTimeout(() => this.checkUrlParams(), 100);
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
    }

    setupEventListeners() {
        if (this.clearTagButton) {
            this.clearTagButton.addEventListener('click', () => {
                this.showAllTags();
            });
        }

        window.addEventListener('popstate', () => {
            this.checkUrlParams();
        });
    }

    checkUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const selectedTag = params.get('tag');
        console.log('checkUrlParams - selectedTag:', selectedTag);
        
        if (selectedTag) {
            this.showPostsByTag(selectedTag);
        } else {
            this.showAllTags();
        }
    }

    renderTagCloud() {
        if (!this.tagCloudContainer) return;
        
        const allTags = this.markdown.getAllTags();
        const tagCounts = this.getTagCounts();
        
        const sortedTags = allTags.sort((a, b) => tagCounts[b] - tagCounts[a]);
        
        this.tagCloudContainer.innerHTML = sortedTags.map(tag => {
            const count = tagCounts[tag];
            const size = this.calculateTagSize(count, tagCounts);
            
            return `
                <button class="tag" 
                        data-tag="${tag}" 
                        style="font-size: ${size}em"
                        onclick="tagsManager.showPostsByTag('${tag}')">
                    ${tag} (${count})
                </button>
            `;
        }).join('');
    }

    getTagCounts() {
        const posts = this.markdown.getAllPosts();
        const tagCounts = {};
        
        posts.forEach(post => {
            if (post.tags) {
                post.tags.forEach(tag => {
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                });
            }
        });
        
        return tagCounts;
    }

    calculateTagSize(count, allTagCounts) {
        const counts = Object.values(allTagCounts);
        const minCount = Math.min(...counts);
        const maxCount = Math.max(...counts);
        
        if (minCount === maxCount) return 1;
        
        const minSize = 0.8;
        const maxSize = 1.8;
        const ratio = (count - minCount) / (maxCount - minCount);
        
        return minSize + (ratio * (maxSize - minSize));
    }

    showPostsByTag(tag) {
        console.log('showPostsByTag called with:', tag);
        if (!this.tagPostsSection || !this.currentTagSpan || !this.taggedPostsContainer) {
            console.log('Missing elements:', {
                tagPostsSection: this.tagPostsSection,
                currentTagSpan: this.currentTagSpan,
                taggedPostsContainer: this.taggedPostsContainer
            });
            return;
        }
        
        const posts = this.markdown.getPostsByTag(tag);
        console.log('Posts found for tag:', posts);
        
        this.currentTagSpan.textContent = tag;
        this.taggedPostsContainer.innerHTML = `<ul class="posts-list">${posts.map(post => this.createPostItem(post)).join('')}</ul>`;
        
        this.tagCloudContainer.style.display = 'none';
        this.tagPostsSection.style.display = 'block';
        
        const url = new URL(window.location);
        url.searchParams.set('tag', tag);
        window.history.pushState({}, '', url);
        
        document.title = `Posts tagged "${tag}" - Elhady's blog`;
    }

    showAllTags() {
        if (!this.tagPostsSection || !this.tagCloudContainer) return;
        
        this.tagCloudContainer.style.display = 'flex';
        this.tagPostsSection.style.display = 'none';
        
        const url = new URL(window.location);
        url.searchParams.delete('tag');
        window.history.pushState({}, '', url);
        
        document.title = "Tags - Elhady's blog";
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

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    getRelatedTags(currentTag) {
        const posts = this.markdown.getAllPosts();
        const relatedTags = new Set();
        
        posts.forEach(post => {
            if (post.tags && post.tags.includes(currentTag)) {
                post.tags.forEach(tag => {
                    if (tag !== currentTag) {
                        relatedTags.add(tag);
                    }
                });
            }
        });
        
        return Array.from(relatedTags);
    }

    renderRelatedTags(currentTag) {
        const relatedTags = this.getRelatedTags(currentTag);
        
        if (relatedTags.length > 0) {
            return `
                <div class="related-tags">
                    <h3>Related Tags</h3>
                    <div class="tag-list">
                        ${relatedTags.map(tag => `
                            <button class="tag" onclick="tagsManager.showPostsByTag('${tag}')">${tag}</button>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        return '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('tag-cloud')) {
        window.tagsManager = new TagsManager();
    }
});