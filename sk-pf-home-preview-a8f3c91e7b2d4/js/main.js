(() => {
  const carousels = {
    hero: { index: 0, el: null, track: null, count: 0 },
    goods: { index: 0, el: null, track: null, count: 0 },
  };

  Object.keys(carousels).forEach((key) => {
    const root =
      key === 'hero'
        ? document.getElementById('heroCarousel')
        : document.getElementById('goodsCarousel');
    if (!root) return;
    const track = root.querySelector(`[data-track="${key}"]`);
    const slides = track ? track.querySelectorAll('.carousel__slide') : [];
    carousels[key] = {
      index: 0,
      el: root,
      track,
      count: slides.length,
    };
  });

  const goTo = (key, next) => {
    const state = carousels[key];
    if (!state.track || !state.count) return;
    state.index = (next + state.count) % state.count;
    state.track.style.transform = `translate3d(${-state.index * 100}%, 0, 0)`;
  };

  document.querySelectorAll('[data-carousel]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-carousel');
      const dir = Number(btn.getAttribute('data-dir') || 1);
      goTo(key, carousels[key].index + dir);
    });
  });

  // Auto-advance hero gently
  let heroTimer = window.setInterval(() => {
    goTo('hero', carousels.hero.index + 1);
  }, 5200);

  const hero = document.getElementById('heroCarousel');
  if (hero) {
    hero.addEventListener('pointerenter', () => {
      window.clearInterval(heroTimer);
      heroTimer = null;
    });
    hero.addEventListener('pointerleave', () => {
      if (heroTimer) return;
      heroTimer = window.setInterval(() => {
        goTo('hero', carousels.hero.index + 1);
      }, 5200);
    });
  }

  // Calendar — Monday-first, preview open dates
  const cal = document.getElementById('ticketCal');
  const calGrid = document.getElementById('calGrid');
  const calLabel = document.getElementById('calLabel');
  if (!cal || !calGrid || !calLabel) return;

  let year = Number(cal.dataset.year || 2026);
  let month = Number(cal.dataset.month || 11); // 1-12
  let selected = null;

  // Preview: open weekends + a few weekdays in Nov 2026
  const openDays = new Set([
    '2026-11-01',
    '2026-11-03',
    '2026-11-07',
    '2026-11-08',
    '2026-11-14',
    '2026-11-15',
    '2026-11-21',
    '2026-11-22',
    '2026-11-23',
    '2026-11-28',
    '2026-11-29',
  ]);

  const pad = (n) => String(n).padStart(2, '0');
  const keyOf = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;

  const renderCal = () => {
    calLabel.textContent = `${year}年 ${month}月`;
    calGrid.innerHTML = '';

    const first = new Date(year, month - 1, 1);
    // JS: 0=Sun ... convert to Mon-first index (Mon=0)
    const start = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month, 0).getDate();
    const cells = start + daysInMonth;
    const total = Math.ceil(cells / 7) * 7;

    for (let i = 0; i < total; i += 1) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'cal__cell';
      cell.setAttribute('role', 'gridcell');

      const dayNum = i - start + 1;
      if (dayNum < 1 || dayNum > daysInMonth) {
        cell.classList.add('is-empty');
        cell.tabIndex = -1;
        cell.setAttribute('aria-hidden', 'true');
        calGrid.appendChild(cell);
        continue;
      }

      const dow = i % 7; // 0 Mon ... 5 Sat 6 Sun
      if (dow === 5) cell.classList.add('is-sat');
      if (dow === 6) cell.classList.add('is-sun');

      const key = keyOf(year, month, dayNum);
      cell.textContent = String(dayNum);
      cell.dataset.date = key;

      if (openDays.has(key)) {
        cell.classList.add('is-open');
        cell.setAttribute('aria-label', `${month}月${dayNum}日 公演あり`);
      } else {
        cell.setAttribute('aria-label', `${month}月${dayNum}日`);
      }

      if (selected === key) cell.classList.add('is-selected');

      cell.addEventListener('click', () => {
        selected = key;
        renderCal();
      });

      calGrid.appendChild(cell);
    }
  };

  cal.querySelectorAll('[data-cal-dir]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dir = Number(btn.getAttribute('data-cal-dir') || 0);
      month += dir;
      if (month < 1) {
        month = 12;
        year -= 1;
      } else if (month > 12) {
        month = 1;
        year += 1;
      }
      renderCal();
    });
  });

  renderCal();
})();
