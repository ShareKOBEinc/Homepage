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
    const slides = track ? [...track.querySelectorAll('.carousel__slide')] : [];
    carousels[key] = {
      index: 0,
      el: root,
      track,
      slides,
      count: slides.length,
    };
  });

  const heroOffset = () => {
    const root = carousels.hero.el;
    if (!root) return { slide: 84, gap: 1.25, pad: 8 };
    const styles = getComputedStyle(root);
    const slide = parseFloat(styles.getPropertyValue('--hero-slide')) || 84;
    const gap = parseFloat(styles.getPropertyValue('--hero-gap')) || 1.25;
    return { slide, gap, pad: (100 - slide) / 2 };
  };

  const syncHeroActive = () => {
    const state = carousels.hero;
    if (!state.slides) return;
    state.slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === state.index);
    });
  };

  const goTo = (key, next) => {
    const state = carousels[key];
    if (!state.track || !state.count) return;
    state.index = (next + state.count) % state.count;

    if (key === 'hero') {
      const { slide, gap, pad } = heroOffset();
      const step = slide + gap;
      state.track.style.transform = `translate3d(calc(${pad}% - ${state.index * step}%), 0, 0)`;
      syncHeroActive();
    } else {
      state.track.style.transform = `translate3d(${-state.index * 100}%, 0, 0)`;
    }
  };

  // Initial hero position (centered first slide + blur sides)
  goTo('hero', 0);

  window.addEventListener('resize', () => {
    if (carousels.hero.count) goTo('hero', carousels.hero.index);
  });

  document.querySelectorAll('[data-carousel]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-carousel');
      const dir = Number(btn.getAttribute('data-dir') || 1);
      goTo(key, carousels[key].index + dir);
    });
  });

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

  // Preview schedule data (date -> performances)
  const SCHEDULE = {
    '2026-11-01': [
      {
        title: 'ナゾカルタ EXPERT EDITION',
        time: '13:00 / 16:00',
        place: '神戸・室内会場',
        team: '1〜2人',
        duration: '約40分',
        price: '1人 ¥1,800 / 2人 ¥3,600',
        link: '/works/nazokaruta-ex.html',
      },
    ],
    '2026-11-03': [
      {
        title: 'ナゾカルタ EXPERT EDITION',
        time: '11:00 / 14:00 / 17:00',
        place: '神戸・室内会場',
        team: '1〜2人',
        duration: '約40分',
        price: '1人 ¥1,800 / 2人 ¥3,600',
        link: '/works/nazokaruta-ex.html',
      },
    ],
    '2026-11-07': [
      {
        title: 'ナゾカルタ EXPERT EDITION',
        time: '19:00',
        place: '神戸・室内会場',
        team: '1〜2人',
        duration: '約40分',
        price: '1人 ¥1,800 / 2人 ¥3,600',
        link: '/works/nazokaruta-ex.html',
      },
    ],
    '2026-11-08': [
      {
        title: 'ナゾカルタ EXPERT EDITION',
        time: '13:00 / 16:00',
        place: '神戸・室内会場',
        team: '1〜2人',
        duration: '約40分',
        price: '1人 ¥1,800 / 2人 ¥3,600',
        link: '/works/nazokaruta-ex.html',
      },
      {
        title: 'refine 体験会',
        time: '15:00',
        place: 'グッズブース',
        team: '1人〜',
        duration: '持ち帰り',
        price: '¥2,000',
        link: '/goods/refine.html',
      },
    ],
    '2026-11-14': [
      {
        title: 'ナゾカルタ EXPERT EDITION',
        time: '13:00 / 16:00',
        place: '神戸・室内会場',
        team: '1〜2人',
        duration: '約40分',
        price: '1人 ¥1,800 / 2人 ¥3,600',
        link: '/works/nazokaruta-ex.html',
      },
    ],
    '2026-11-15': [
      {
        title: 'ナゾカルタ EXPERT EDITION',
        time: '11:00 / 14:00 / 17:00',
        place: '神戸・室内会場',
        team: '1〜2人',
        duration: '約40分',
        price: '1人 ¥1,800 / 2人 ¥3,600',
        link: '/works/nazokaruta-ex.html',
      },
    ],
    '2026-11-21': [
      {
        title: 'ナゾカルタ EXPERT EDITION',
        time: '13:00 / 16:00',
        place: '神戸・室内会場',
        team: '1〜2人',
        duration: '約40分',
        price: '1人 ¥1,800 / 2人 ¥3,600',
        link: '/works/nazokaruta-ex.html',
      },
    ],
    '2026-11-22': [
      {
        title: 'ナゾカルタ EXPERT EDITION',
        time: '11:00 / 14:00 / 17:00',
        place: '神戸・室内会場',
        team: '1〜2人',
        duration: '約40分',
        price: '1人 ¥1,800 / 2人 ¥3,600',
        link: '/works/nazokaruta-ex.html',
      },
    ],
    '2026-11-23': [
      {
        title: 'ナゾカルタ EXPERT EDITION',
        time: '11:00 / 14:00 / 17:00',
        place: '神戸・室内会場',
        team: '1〜2人',
        duration: '約40分',
        price: '1人 ¥1,800 / 2人 ¥3,600',
        link: '/works/nazokaruta-ex.html',
      },
    ],
    '2026-11-28': [
      {
        title: 'ナゾカルタ EXPERT EDITION',
        time: '13:00 / 16:00',
        place: '神戸・室内会場',
        team: '1〜2人',
        duration: '約40分',
        price: '1人 ¥1,800 / 2人 ¥3,600',
        link: '/works/nazokaruta-ex.html',
      },
    ],
    '2026-11-29': [
      {
        title: 'ナゾカルタ EXPERT EDITION',
        time: '11:00 / 14:00 / 17:00',
        place: '神戸・室内会場',
        team: '1〜2人',
        duration: '約40分',
        price: '1人 ¥1,800 / 2人 ¥3,600',
        link: '/works/nazokaruta-ex.html',
      },
    ],
  };

  const cal = document.getElementById('ticketCal');
  const calGrid = document.getElementById('calGrid');
  const calLabel = document.getElementById('calLabel');
  const detail = document.getElementById('calDetail');
  const detailDate = document.getElementById('calDetailDate');
  const detailList = document.getElementById('calDetailList');
  const detailEmpty = document.getElementById('calDetailEmpty');
  if (!cal || !calGrid || !calLabel || !detail) return;

  let year = Number(cal.dataset.year || 2026);
  let month = Number(cal.dataset.month || 11);
  let selected = null;

  const pad = (n) => String(n).padStart(2, '0');
  const keyOf = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const formatDateLabel = (key) => {
    const [y, m, d] = key.split('-').map(Number);
    const dow = weekdays[new Date(y, m - 1, d).getDay()];
    return `${y}年${m}月${d}日（${dow}）`;
  };

  const showDetail = (key) => {
    detail.hidden = false;
    detailDate.textContent = formatDateLabel(key);
    const shows = SCHEDULE[key] || [];

    if (!shows.length) {
      detailList.innerHTML = '';
      detailEmpty.hidden = false;
      return;
    }

    detailEmpty.hidden = true;
    detailList.innerHTML = shows
      .map(
        (show) => `
      <article class="cal-show">
        <h3 class="cal-show__title">${escapeHtml(show.title)}</h3>
        <dl class="cal-show__meta">
          <div><dt>開演</dt><dd>${escapeHtml(show.time)}</dd></div>
          <div><dt>会場</dt><dd>${escapeHtml(show.place)}</dd></div>
          <div><dt>人数</dt><dd>${escapeHtml(show.team)}</dd></div>
          <div><dt>所要</dt><dd>${escapeHtml(show.duration)}</dd></div>
          <div><dt>料金</dt><dd>${escapeHtml(show.price)}</dd></div>
        </dl>
        <a class="cal-show__link" href="${escapeHtml(show.link)}">詳細をみる</a>
      </article>`
      )
      .join('');
  };

  const renderCal = () => {
    calLabel.textContent = `${year}年 ${month}月`;
    calGrid.innerHTML = '';

    const first = new Date(year, month - 1, 1);
    const start = (first.getDay() + 6) % 7; // Mon=0
    const daysInMonth = new Date(year, month, 0).getDate();
    const total = Math.ceil((start + daysInMonth) / 7) * 7;

    for (let i = 0; i < total; i += 1) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'cal__cell';
      cell.setAttribute('role', 'gridcell');

      const dayNum = i - start + 1;
      if (dayNum < 1 || dayNum > daysInMonth) {
        cell.classList.add('is-empty');
        cell.tabIndex = -1;
        cell.disabled = true;
        cell.setAttribute('aria-hidden', 'true');
        calGrid.appendChild(cell);
        continue;
      }

      const dow = i % 7;
      if (dow === 5) cell.classList.add('is-sat');
      if (dow === 6) cell.classList.add('is-sun');

      const key = keyOf(year, month, dayNum);
      const hasShow = Boolean(SCHEDULE[key]?.length);

      cell.innerHTML = `<span class="cal__day">${dayNum}</span>`;
      cell.dataset.date = key;

      if (hasShow) {
        cell.classList.add('is-open');
        cell.setAttribute('aria-label', `${month}月${dayNum}日 公演あり`);
      } else {
        cell.setAttribute('aria-label', `${month}月${dayNum}日`);
      }

      if (selected === key) cell.classList.add('is-selected');

      cell.addEventListener('click', () => {
        selected = key;
        renderCal();
        showDetail(key);
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
      selected = null;
      detail.hidden = true;
      renderCal();
    });
  });

  renderCal();
})();
