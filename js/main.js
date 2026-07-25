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

  // Mobile menu
  if (menuBtn && mobileNav) {
    const toggleMenu = (open) => {
      const isOpen = open ?? !menuBtn.classList.contains('active');
      menuBtn.classList.toggle('active', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      mobileNav.classList.toggle('open', isOpen);
      mobileNav.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', () => toggleMenu());
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
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

  // Hero title lines on load
  requestAnimationFrame(() => {
    revealLines.forEach((line) => line.classList.add('visible'));
  });

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
