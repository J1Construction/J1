document.addEventListener('DOMContentLoaded', function () {
  // Build every page title letter-by-letter, as if it's being assembled
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.building-title').forEach(function (titleEl) {
    if (reduceMotion) return;
    const lines = titleEl.innerHTML.split('<br>').map(function (l) { return l.trim(); });
    titleEl.innerHTML = '';
    const step = 0.032; // seconds between each letter
    let globalIndex = 0;
    lines.forEach(function (line) {
      const lineEl = document.createElement('span');
      lineEl.className = 'line';
      line.split('').forEach(function (ch) {
        const letterEl = document.createElement('span');
        letterEl.className = 'letter';
        letterEl.textContent = ch === ' ' ? '\u00A0' : ch;
        letterEl.style.animationDelay = (globalIndex * step) + 's';
        lineEl.appendChild(letterEl);
        globalIndex++;
      });
      titleEl.appendChild(lineEl);
    });
  });

  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const backdrop = document.getElementById('navBackdrop');
  if (!toggle || !nav || !backdrop) return;

  function closeMenu() {
    toggle.classList.remove('open');
    nav.classList.remove('open');
    backdrop.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    backdrop.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  toggle.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', closeMenu);
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 820) closeMenu();
  });
});
