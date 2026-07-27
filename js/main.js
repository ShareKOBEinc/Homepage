(() => {
  'use strict';

  const header = document.getElementById('header');
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const contactForm = document.getElementById('contactForm');

  // Header scroll state
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu（右上ハンバーガー）
  if (menuBtn && mobileNav) {
    const toggleMenu = (open) => {
      const isOpen = open ?? !menuBtn.classList.contains('active');
      menuBtn.classList.toggle('active', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
      mobileNav.classList.toggle('open', isOpen);
      mobileNav.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleMenu();
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuBtn.classList.contains('active')) {
        toggleMenu(false);
      }
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const revealLines = document.querySelectorAll('.reveal-line');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el, i) => {
    if (!el.style.transitionDelay) {
      const siblings = el.parentElement
        ? [...el.parentElement.children].filter((child) => child.classList.contains('reveal'))
        : [];
      const index = Math.max(0, siblings.indexOf(el));
      el.style.transitionDelay = `${Math.min(index * 0.08, 0.4)}s`;
    }
    revealObserver.observe(el);
  });

  const lineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          lineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  revealLines.forEach((line) => lineObserver.observe(line));

  // Hero opening sequence
  const hero = document.getElementById('hero');
  const heroMap = hero?.querySelector('.hero__map');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (hero) {
    const startHero = () => {
      hero.classList.add('is-ready');
    };

    if (prefersReducedMotion) {
      startHero();
    } else {
      requestAnimationFrame(() => {
        requestAnimationFrame(startHero);
      });
    }
  }

  // Hero title lines on load
  requestAnimationFrame(() => {
    revealLines.forEach((line) => line.classList.add('visible'));
  });

  // Hero map parallax
  if (hero && heroMap && !prefersReducedMotion) {
    let rafId = 0;
    let targetX = 0;
    let targetY = 0;

    const applyParallax = () => {
      rafId = 0;
      heroMap.style.setProperty('--hero-parallax-x', `${targetX.toFixed(2)}px`);
      heroMap.style.setProperty('--hero-parallax-y', `${targetY.toFixed(2)}px`);
    };

    const onPointerMove = (event) => {
      const rect = hero.getBoundingClientRect();
      if (rect.height <= 0 || rect.width <= 0) return;
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      targetX = nx * -18;
      targetY = ny * -12;
      if (!rafId) rafId = requestAnimationFrame(applyParallax);
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!rafId) rafId = requestAnimationFrame(applyParallax);
    };

    hero.addEventListener('pointermove', onPointerMove, { passive: true });
    hero.addEventListener('pointerleave', onPointerLeave);
  }

  // Counter animation
  const counterEl = document.querySelector('[data-count]');
  if (counterEl) {
    const target = parseInt(counterEl.dataset.count, 10);
    const counterObserver = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        counterObserver.disconnect();

        const duration = 2000;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counterEl.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    counterObserver.observe(counterEl);
  }

  // Smooth anchor scroll offset for fixed header
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Contact form
  if (contactForm) {
    const requiredSelects = contactForm.querySelectorAll('select[required]');

    requiredSelects.forEach((select) => {
      const markTouched = () => select.classList.add('is-touched');
      select.addEventListener('change', markTouched);
      select.addEventListener('blur', markTouched);
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      requiredSelects.forEach((select) => select.classList.add('is-touched'));

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const btn = contactForm.querySelector('.btn-submit');
      const btnText = btn.querySelector('span');
      const original = btnText.textContent;

      btn.disabled = true;
      btnText.textContent = '送信中...';

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) throw new Error('送信に失敗しました');

        btnText.textContent = '送信完了！';
        contactForm.reset();
        setTimeout(() => {
          btnText.textContent = original;
          btn.disabled = false;
        }, 3000);
      } catch {
        btnText.textContent = '送信に失敗しました';
        setTimeout(() => {
          btnText.textContent = original;
          btn.disabled = false;
        }, 3000);
      }
    });
  }
})();
