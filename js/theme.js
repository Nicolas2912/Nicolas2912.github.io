(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let dark = root.classList.contains('dark-mode');
  let activeTransition;
  let fadeTimeout;

  function applyTheme() {
    root.classList.toggle('dark-mode', dark);
    toggle.textContent = dark ? '☀️' : '🌙';
    toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (error) {}
  }

  applyTheme();

  toggle.addEventListener('click', () => {
    dark = !dark;
    if (activeTransition) activeTransition.skipTransition();
    clearTimeout(fadeTimeout);
    root.classList.remove('theme-fading');

    if (reducedMotion.matches) {
      applyTheme();
      return;
    }

    if (!document.startViewTransition) {
      root.classList.add('theme-fading');
      // Establish the old colors before applying the new theme.
      getComputedStyle(root).backgroundColor;
      applyTheme();
      fadeTimeout = setTimeout(() => root.classList.remove('theme-fading'), 450);
      return;
    }

    root.classList.add('theme-revealing');

    const transition = document.startViewTransition(applyTheme);
    activeTransition = transition;
    // A new click or a hidden tab can skip a transition; the theme still updates.
    transition.ready.catch(() => {});
    transition.finished.finally(() => {
      if (activeTransition === transition) {
        activeTransition = null;
        root.classList.remove('theme-revealing');
      }
    });
  });
})();
