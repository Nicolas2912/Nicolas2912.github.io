/**
 * Scroll Animations Handler
 * Uses Intersection Observer API for smooth, performant animations
 */

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
        } else {
            this.setupAnimations();
        }
    }
    
    setupAnimations() {
        // Create intersection observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);
        
        // Find and observe all elements that should be animated
        this.observeElements();
        
        // Add staggered animations for skill badges
        this.setupSkillBadgeAnimations();
        
        // Add staggered animations for project tiles
        this.setupProjectTileAnimations();
    }
    
    observeElements() {
        // Observe elements with scroll-animate classes
        const animateElements = document.querySelectorAll('.scroll-animate, .scroll-animate-fade, .scroll-animate-slide-left, .scroll-animate-slide-right, .scroll-animate-scale, .scroll-animate-slide-down');
        
        animateElements.forEach(element => {
            this.observer.observe(element);
        });
    }
    
    animateElement(element) {
        // Add a small delay for smoother effect
        setTimeout(() => {
            element.classList.add('animate-in');
        }, 100);
        
        // Stop observing this element once animated
        this.observer.unobserve(element);
    }
    
    setupSkillBadgeAnimations() {
        const skillsSection = document.querySelector('.skills-section');
        if (!skillsSection) return;
        
        const badges = skillsSection.querySelectorAll('.badge');
        
        // Create observer specifically for skill badges
        const badgeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBadges(entry.target);
                    badgeObserver.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        // Observe the skills section container
        badgeObserver.observe(skillsSection);
    }
    
    animateSkillBadges(skillsSection) {
        const badges = skillsSection.querySelectorAll('.badge');
        
        badges.forEach((badge, index) => {
            setTimeout(() => {
                badge.style.opacity = '1';
                badge.style.transform = 'scale(1)';
            }, index * 100); // Stagger the animations
        });
    }
    
    setupProjectTileAnimations() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;
        
        const projectTiles = projectsGrid.querySelectorAll('.project-tile-animate');
        
        // Create observer specifically for project tiles
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProjectTiles(entry.target);
                    projectObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observe the projects grid container
        projectObserver.observe(projectsGrid);
    }
    
    animateProjectTiles(projectsGrid) {
        const projectTiles = projectsGrid.querySelectorAll('.project-tile-animate');
        
        projectTiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.classList.add('animate-in');
            }, index * 150); // Stagger the animations with 150ms delay
        });
    }
}

// Initialize scroll animations when script loads
new ScrollAnimations(); 