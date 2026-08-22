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

  // ---------- PROJECTS PAGE: grouped gallery + lightbox ----------
  const projects = [
    {
      title: "Dutch Bros Coffee",
      location: "El Paso, TX — Woodrow Bean Transmountain",
      images: ["assets/1.1.png", "assets/1.2.png", "assets/1.3.png"]
    },
    {
      title: "Dutch Bros Coffee",
      location: "Las Cruces, NM",
      images: ["assets/2.1.png", "assets/2.2.png"]
    },
    {
      title: "Dutch Bros Coffee",
      location: "Alamogordo, NM",
      images: ["assets/3.1.png", "assets/3.2.png"]
    },
    {
      title: "Sonic",
      location: "Alamogordo, NM",
      images: ["assets/4.1.png", "assets/4.2.png", "assets/4.3.png"]
    },
    {
      title: "Dutch Bros Coffee",
      location: "Alamogordo, NM",
      images: ["assets/5.1.png", "assets/5.2.png"]
    },
    {
      title: "Burger King",
      location: "El Paso, TX",
      images: ["assets/6.1.png", "assets/6.2.png"]
    }
  ];

  const gallery = document.getElementById('projectsGallery');
  if (gallery) {
    const overlay = document.getElementById('lightboxOverlay');
    const closeBtn = document.getElementById('lightboxClose');
    const titleEl = document.getElementById('lightboxTitle');
    const locationEl = document.getElementById('lightboxLocation');
    const imagesEl = document.getElementById('lightboxImages');

    function openProject(project) {
      titleEl.textContent = project.title;
      locationEl.textContent = project.location;
      imagesEl.innerHTML = '';
      project.images.forEach(function (src) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = project.title + ' — ' + project.location;
        imagesEl.appendChild(img);
      });
      overlay.classList.add('open');
      document.body.classList.add('lightbox-locked');
      closeBtn.focus();
    }

    function closeProject() {
      overlay.classList.remove('open');
      document.body.classList.remove('lightbox-locked');
    }

    projects.forEach(function (project) {
      const card = document.createElement('button');
      card.className = 'project-card';
      card.type = 'button';

      const img = document.createElement('img');
      img.src = project.images[0];
      img.alt = project.title + ' — ' + project.location;
      card.appendChild(img);

      const badge = document.createElement('span');
      badge.className = 'view-badge';
      badge.textContent = 'View Photos (' + project.images.length + ')';
      card.appendChild(badge);

      const cap = document.createElement('div');
      cap.className = 'cap';
      cap.innerHTML = project.title + '<br>' + project.location;
      card.appendChild(cap);

      card.addEventListener('click', function () { openProject(project); });
      gallery.appendChild(card);
    });

    closeBtn.addEventListener('click', closeProject);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeProject();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeProject();
    });
  }

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
