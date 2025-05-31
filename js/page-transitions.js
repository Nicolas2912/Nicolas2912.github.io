/**
 * Page Transitions Handler
 * Adds smooth transitions when navigating between pages
 */

class PageTransitions {
    constructor() {
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupTransitions());
        } else {
            this.setupTransitions();
        }
    }
    
    setupTransitions() {
        // Add transition effects to navigation links
        this.setupNavigationTransitions();
        
        // Add page entrance animation
        this.addPageEntranceAnimation();
        
        // Mark active navigation link
        this.markActiveNavLink();
    }
    
    setupNavigationTransitions() {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only apply transition for internal links
                const href = link.getAttribute('href');
                if (href && href.startsWith('/') || href.startsWith('./') || href.startsWith('../')) {
                    this.handleNavigation(e, link);
                }
            });
        });
    }
    
    handleNavigation(event, link) {
        // Don't prevent default - let normal navigation happen
        // Just add a visual feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = '';
        }, 150);
        
        // Add a subtle loading state
        this.addLoadingState();
    }
    
    addLoadingState() {
        const body = document.body;
        body.style.transition = 'opacity 0.2s ease';
        body.style.opacity = '0.9';
        
        // Reset after a short delay (page will likely load before this)
        setTimeout(() => {
            body.style.opacity = '';
        }, 300);
    }
    
    addPageEntranceAnimation() {
        const container = document.querySelector('.container');
        if (container) {
            container.style.animation = 'pageSlideIn 0.5s ease-out';
        }
    }
    
    markActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (currentPath === href || currentPath.startsWith(href + '/') || 
                (href.includes('/projects/') && currentPath.includes('/projects/')))) {
                link.classList.add('active');
            }
        });
    }
}

// Add CSS for page slide-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pageSlideIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Smooth transitions for navigation */
    .navbar-nav .nav-link {
        transition: all 0.2s ease !important;
    }
    
    .navbar-nav .nav-link:active {
        transform: scale(0.95);
    }
`;
document.head.appendChild(style);

// Initialize page transitions when script loads
new PageTransitions(); 