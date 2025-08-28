class ArchiveManager {
    constructor() {
        this.markdown = null;
        this.archiveContainer = document.getElementById('archive-timeline');
        this.init();
    }

    async init() {
        await this.loadMarkdownProcessor();
        this.renderArchive();
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

    renderArchive() {
        if (!this.archiveContainer) return;
        
        const archive = this.markdown.getArchive();
        const years = Object.keys(archive).sort((a, b) => b - a);
        
        this.archiveContainer.innerHTML = years.map(year => 
            this.renderYear(year, archive[year])
        ).join('');
    }

    renderYear(year, months) {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const sortedMonths = Object.keys(months).sort((a, b) => {
            return monthNames.indexOf(b) - monthNames.indexOf(a);
        });

        return `
            <div class="archive-year">
                <h2>${year}</h2>
                ${sortedMonths.map(month => 
                    this.renderMonth(month, months[month])
                ).join('')}
            </div>
        `;
    }

    renderMonth(month, posts) {
        const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        return `
            <div class="archive-month">
                <h3>${month}</h3>
                <div class="archive-posts">
                    ${sortedPosts.map(post => this.renderArchivePost(post)).join('')}
                </div>
            </div>
        `;
    }

    renderArchivePost(post) {
        return `
            <a href="post.html?post=${post.slug}" class="archive-post">
                <span class="archive-post-title">${post.title}</span>
                <span class="archive-post-date">${this.formatDate(post.date)}</span>
            </a>
        `;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short',
            day: 'numeric'
        });
    }

    getPostStats() {
        const posts = this.markdown.getAllPosts();
        const stats = {
            total: posts.length,
            byYear: {},
            byMonth: {},
            tags: this.markdown.getAllTags().length
        };
        
        posts.forEach(post => {
            const date = new Date(post.date);
            const year = date.getFullYear();
            const month = date.toLocaleDateString('en-US', { month: 'long' });
            
            stats.byYear[year] = (stats.byYear[year] || 0) + 1;
            
            const monthKey = `${year}-${month}`;
            stats.byMonth[monthKey] = (stats.byMonth[monthKey] || 0) + 1;
        });
        
        return stats;
    }

    renderStats() {
        const stats = this.getPostStats();
        
        return `
            <div class="archive-stats">
                <h3>Blog Statistics</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-number">${stats.total}</span>
                        <span class="stat-label">Total Posts</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${Object.keys(stats.byYear).length}</span>
                        <span class="stat-label">Years Active</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${stats.tags}</span>
                        <span class="stat-label">Tags Used</span>
                    </div>
                </div>
            </div>
        `;
    }

    addStatsToPage() {
        if (this.archiveContainer && this.archiveContainer.parentNode) {
            const statsHtml = this.renderStats();
            const statsDiv = document.createElement('div');
            statsDiv.innerHTML = statsHtml;
            
            this.archiveContainer.parentNode.insertBefore(
                statsDiv.firstChild, 
                this.archiveContainer
            );
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('archive-timeline')) {
        window.archiveManager = new ArchiveManager();
    }
});