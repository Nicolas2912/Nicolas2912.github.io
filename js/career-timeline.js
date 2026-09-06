(function () {
  const timeline = document.querySelector('.cv-timeline');
  if (!timeline) return;
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.classList.add('cv-connections');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  // Keep the drawing safe even if a browser still has the previous stylesheet.
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;padding:0;pointer-events:none;overflow:visible;z-index:1';
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', '#438ed5');
  svg.setAttribute('stroke-width', '1.5');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  timeline.prepend(svg);

  function draw() {
    const bounds = timeline.getBoundingClientRect();
    // Cards read newest first; the journey runs from bottom right back to top left.
    const steps = [...timeline.querySelectorAll('.cv-step')].reverse().map(step => {
      const icon = step.querySelector('.cv-icon').getBoundingClientRect();
      return {
        x: icon.left + icon.width / 2 - bounds.left,
        y: icon.top + icon.height / 2 - bounds.top,
        bottom: step.getBoundingClientRect().bottom - bounds.top
      };
    });
    svg.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
    svg.replaceChildren();
    const gap = 34;
    steps.slice(0, -1).forEach((from, i) => {
      const to = steps[i + 1];
      const path = document.createElementNS(ns, 'path');
      let d;
      const tipX = to.x + gap;
      const tipY = to.y;
      if (Math.abs(from.y - to.y) < 2) {
        d = `M ${from.x - gap} ${from.y} H ${tipX}`;
      } else if (Math.abs(from.x - to.x) < 2) {
        // A single-column layout uses a side rail, clear of dates and descriptions.
        const rail = bounds.width - 10;
        d = `M ${from.x + gap} ${from.y} H ${rail - 12} Q ${rail} ${from.y} ${rail} ${from.y - 12} V ${to.y + 12} Q ${rail} ${to.y} ${rail - 12} ${to.y} H ${tipX}`;
      } else {
        // Wrap upward to the rightmost milestone in the preceding row.
        const left = 8;
        const right = bounds.width - 8;
        const mid = Math.max(...steps.filter(step => Math.abs(step.y - to.y) < 2).map(step => step.bottom)) + 16;
        d = `M ${from.x - gap} ${from.y} H ${left + 12} Q ${left} ${from.y} ${left} ${from.y - 12} V ${mid + 12} Q ${left} ${mid} ${left + 12} ${mid} H ${right - 12} Q ${right} ${mid} ${right} ${mid - 12} V ${to.y + 12} Q ${right} ${to.y} ${right - 12} ${to.y} H ${tipX}`;
      }
      path.setAttribute('d', d);
      svg.append(path);
      const arrow = document.createElementNS(ns, 'path');
      arrow.classList.add('cv-arrow');
      arrow.setAttribute('d', `M ${tipX + 6} ${tipY - 4} L ${tipX} ${tipY} L ${tipX + 6} ${tipY + 4}`);
      svg.append(arrow);
    });
  }

  const observer = new ResizeObserver(draw);
  observer.observe(timeline);
  timeline.querySelectorAll('.cv-step').forEach(step => observer.observe(step));
  if (document.fonts) document.fonts.ready.then(draw);
  draw();
})();
