/**
 * Horizontal card rows: native scrolling (touchpad, touch, keyboard) plus
 * arrow buttons that appear only when there is more content in that direction.
 */
(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('[data-scroller]').forEach(scroller => {
    const track = scroller.querySelector('[data-scroller-track]');
    const prev = scroller.querySelector('[data-scroller-prev]');
    const next = scroller.querySelector('[data-scroller-next]');
    if (!track) return;

    function update() {
      const max = track.scrollWidth - track.clientWidth;
      const atStart = track.scrollLeft <= 2;
      const atEnd = track.scrollLeft >= max - 2;
      if (prev) prev.hidden = atStart;
      if (next) next.hidden = atEnd || max <= 2;
      scroller.classList.toggle('has-more-left', !atStart);
      scroller.classList.toggle('has-more-right', !atEnd && max > 2);
    }

    function step() {
      const item = track.querySelector('.scroller-item');
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return item ? item.getBoundingClientRect().width + gap : track.clientWidth;
    }

    function scrollByCards(direction) {
      track.scrollBy({ left: direction * step(), behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }

    if (prev) prev.addEventListener('click', () => scrollByCards(-1));
    if (next) next.addEventListener('click', () => scrollByCards(1));
    track.addEventListener('scroll', update, { passive: true });
    new ResizeObserver(update).observe(track);
    update();
  });
})();
