// ==========================================================
// Alex Rivera Portfolio — interactions
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Mobile nav toggle ---- */
  const navWrap = document.querySelector('.nav-wrap');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelectorAll('#navLinks a');

  if (navToggle && navWrap) {
    navToggle.addEventListener('click', () => {
      const isOpen = navWrap.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navWrap.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Scroll reveal animations ---- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: just show everything
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---- Subtle nav background on scroll ---- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 24) {
      nav.style.background = 'rgba(255,255,255,0.09)';
    } else {
      nav.style.background = '';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Ambient orb parallax on mouse move (desktop only) ---- */
  const orbs = document.querySelectorAll('.orb');
  if (window.matchMedia('(pointer: fine)').matches && orbs.length) {
    let rafId = null;
    let targetX = 0, targetY = 0;

    window.addEventListener('mousemove', (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          orbs.forEach((orb, i) => {
            const strength = (i + 1) * 8;
            orb.style.transform = `translate(${targetX * strength}px, ${targetY * strength}px)`;
          });
          rafId = null;
        });
      }
    });
  }

  /* ---- Smooth-scroll for in-page anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});
