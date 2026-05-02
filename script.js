/* ===================================================================
   SVET — interactions
   =================================================================== */

(function () {
  'use strict';

  /* ---------- 1. Scroll progress bar -------------------------------- */
  const progress = document.getElementById('progress');

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  /* ---------- 2. IntersectionObserver reveals ----------------------- */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.05
    });

    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- 3. Hero reveals fire immediately on load -------------- */
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal').forEach((el) => {
      el.classList.add('is-in');
    });
  });

  /* ---------- 4. Smooth scroll for anchor links --------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
  });

  /* ---------- 5. Subtle parallax on hero image ---------------------- */
  const heroBg = document.querySelector('.hero__bg img');
  if (heroBg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const offset = Math.min(window.scrollY * 0.25, 200);
          heroBg.style.transform = `translateY(${offset}px) scale(1.02)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

})();
