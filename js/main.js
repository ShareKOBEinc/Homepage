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
    const assetBase = document.body.dataset.assetBase || '';
    const boneSrc = `${assetBase}assets/Bone.png`;
    const makeBone = () => {
      const img = document.createElement('img');
      img.className = 'menu-btn__bone';
      img.src = boneSrc;
      img.alt = '';
      img.width = 64;
      img.height = 64;
      img.decoding = 'async';
      img.setAttribute('aria-hidden', 'true');
      return img;
    };
    menuBtn.replaceChildren(makeBone(), makeBone());
    if (document.getElementById('workLogoTint')) {
      menuBtn.querySelectorAll('.menu-btn__bone').forEach((bone) => {
        bone.style.filter = 'url(#workLogoTint)';
      });
    }

    const navIcons = {
      news: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h12a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2V5Z" stroke="currentColor" stroke-width="1.6"/><path d="M18 9h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" stroke="currentColor" stroke-width="1.6"/><path d="M7 9h8M7 13h8M7 17h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
      about: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.25" stroke="currentColor" stroke-width="1.6"/><path d="M5.5 19.5c1.6-3.2 4-4.8 6.5-4.8s4.9 1.6 6.5 4.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
      works: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" stroke="currentColor" stroke-width="1.6"/><rect x="13.5" y="3.5" width="7" height="7" stroke="currentColor" stroke-width="1.6"/><rect x="3.5" y="13.5" width="7" height="7" stroke="currentColor" stroke-width="1.6"/><rect x="13.5" y="13.5" width="7" height="7" stroke="currentColor" stroke-width="1.6"/></svg>',
      goods: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 9h11l-.8 9.2a2 2 0 0 1-2 1.8H9.3a2 2 0 0 1-2-1.8L6.5 9Z" stroke="currentColor" stroke-width="1.6"/><path d="M9 9V7.5A3 3 0 0 1 12 4.5v0A3 3 0 0 1 15 7.5V9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
      contact: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="m4.5 7.5 7.5 6 7.5-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    };

    const resolveNavIcon = (link) => {
      if (link.classList.contains('mobile-nav__social')) return null;
      const href = (link.getAttribute('href') || '').toLowerCase();
      const text = (link.textContent || '').trim().toLowerCase();
      if (href.includes('news') || text === 'news') return navIcons.news;
      if (href.includes('about') || text === 'about') return navIcons.about;
      if (href.includes('works') || text === 'works') return navIcons.works;
      if (href.includes('goods') || text === 'goods') return navIcons.goods;
      if (href.includes('contact') || text === 'contact') return navIcons.contact;
      return null;
    };

    mobileNav.querySelectorAll('nav > a').forEach((link) => {
      const icon = resolveNavIcon(link);
      if (!icon || link.querySelector('.mobile-nav__icon')) return;
      link.classList.add('mobile-nav__link');
      link.insertAdjacentHTML(
        'afterbegin',
        `<span class="mobile-nav__icon">${icon}</span><span class="mobile-nav__label">${link.textContent.trim()}</span>`
      );
      // Remove leftover text node after wrapping label
      [...link.childNodes].forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) node.remove();
      });
    });

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
    mobileNav.addEventListener('click', (event) => {
      if (event.target === mobileNav) toggleMenu(false);
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
