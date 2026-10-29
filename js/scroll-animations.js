/**
 * Fades sections in once as they scroll into view.
 * Content stays visible without JavaScript or with reduced motion.
 */
(function () {
  const elements = document.querySelectorAll('.scroll-animate');
  if (!elements.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('animate-in'));
    return;
  }

  document.documentElement.classList.add('js-animate');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();
