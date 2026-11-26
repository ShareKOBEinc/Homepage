(() => {
  const carousels = {
    hero: { index: 0, el: null, track: null, slides: [], count: 0, realCount: 0, looping: false },
    goods: { index: 0, el: null, track: null, slides: [], count: 0, realCount: 0, looping: false },
  };

  const heroOffset = () => {
    const root = carousels.hero.el;
    if (!root) return { slide: 84, gap: 1.25, pad: 8 };
    const styles = getComputedStyle(root);
    const slide = parseFloat(styles.getPropertyValue('--hero-slide')) || 84;
    const gap = parseFloat(styles.getPropertyValue('--hero-gap')) || 1.25;
    return { slide, gap, pad: (100 - slide) / 2 };
  };

  const applyTransform = (key, instant) => {
    const state = carousels[key];
    if (!state.track || !state.count) return;

    if (instant) {
      state.track.style.transition = 'none';
    }

    if (key === 'hero') {
      const { slide, gap, pad } = heroOffset();
      const step = slide + gap;
      state.track.style.transform = `translate3d(calc(${pad}% - ${state.index * step}%), 0, 0)`;
      state.slides.forEach((slideEl, i) => {
        slideEl.classList.toggle('is-active', i === state.index);
      });
    } else {
      state.track.style.transform = `translate3d(${-state.index * 100}%, 0, 0)`;
    }

    if (instant) {
      // Force reflow so the jump isn't animated
      void state.track.offsetWidth;
      state.track.style.transition = '';
    }
  };

  const snapIfClone = (key) => {
    const state = carousels[key];
    if (!state.looping) return;
    window.clearTimeout(state.loopTimer);
    if (state.index === 0) {
      state.index = state.realCount;
      applyTransform(key, true);
    } else if (state.index === state.realCount + 1) {
      state.index = 1;
      applyTransform(key, true);
    }
    state.looping = false;
  };

  const goTo = (key, next) => {
    const state = carousels[key];
    if (!state.track || !state.count) return;
    if (state.looping) return;

    if (state.realCount < 2) {
      state.index = 0;
      applyTransform(key, false);
      return;
    }

    state.index = next;
    state.looping = state.index === 0 || state.index === state.realCount + 1;
    applyTransform(key, false);

    if (state.looping) {
      const durMs =
        (parseFloat(getComputedStyle(state.track).transitionDuration) || 0.55) * 1000;
      if (durMs === 0) {
        snapIfClone(key);
      } else {
        window.clearTimeout(state.loopTimer);
        state.loopTimer = window.setTimeout(() => snapIfClone(key), durMs + 40);
      }
    }
  };

  const setupInfinite = (key) => {
    const root =
      key === 'hero'
        ? document.getElementById('heroCarousel')
        : document.getElementById('goodsCarousel');
    if (!root) return;

    const track = root.querySelector(`[data-track="${key}"]`);
    if (!track) return;

    const realSlides = [...track.querySelectorAll('.carousel__slide:not([data-clone])')];
    const realCount = realSlides.length;

    carousels[key] = {
      index: realCount > 1 ? 1 : 0,
      el: root,
      track,
      slides: realSlides,
      count: realCount,
      realCount,
      looping: false,
    };

    if (realCount < 2) {
      applyTransform(key, true);
      return;
    }

    const firstClone = realSlides[0].cloneNode(true);
    const lastClone = realSlides[realCount - 1].cloneNode(true);
    firstClone.classList.remove('is-active');
    lastClone.classList.remove('is-active');
    firstClone.setAttribute('aria-hidden', 'true');
    lastClone.setAttribute('aria-hidden', 'true');
    firstClone.dataset.clone = 'first';
    lastClone.dataset.clone = 'last';

    track.insertBefore(lastClone, realSlides[0]);
    track.appendChild(firstClone);

    carousels[key].slides = [...track.querySelectorAll('.carousel__slide')];
    carousels[key].count = carousels[key].slides.length;
    carousels[key].index = 1;

    track.addEventListener('transitionend', (event) => {
      if (event.target !== track || event.propertyName !== 'transform') return;
      snapIfClone(key);
    });

    applyTransform(key, true);
  };

  setupInfinite('hero');
  setupInfinite('goods');

  window.addEventListener('resize', () => {
    if (carousels.hero.count) applyTransform('hero', true);
    if (carousels.goods.count) applyTransform('goods', true);
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
  const KV = {
    nazokaruta: '../assets/ナゾカルタEXKV（大阪.jpg',
    refine: '../assets/A4_refine.jpg',
  };

  const nazokarutaShow = (time) => ({
    title: 'ナゾカルタ EXPERT EDITION',
    time,
    place: '神戸・室内会場',
    team: '1〜2人',
    duration: '約40分',
    price: '1人 ¥1,800 / 2人 ¥3,600',
    link: '/works/nazokaruta-ex.html',
    kv: KV.nazokaruta,
  });

  const SCHEDULE = {
    '2026-11-01': [nazokarutaShow('13:00 / 16:00')],
    '2026-11-03': [nazokarutaShow('11:00 / 14:00 / 17:00')],
    '2026-11-07': [nazokarutaShow('19:00')],
    '2026-11-08': [
      nazokarutaShow('13:00 / 16:00'),
      {
        title: 'refine 体験会',
        time: '15:00',
        place: 'グッズブース',
        team: '1人〜',
        duration: '持ち帰り',
        price: '¥2,000',
        link: '/goods/refine.html',
        kv: KV.refine,
      },
    ],
    '2026-11-14': [nazokarutaShow('13:00 / 16:00')],
    '2026-11-15': [nazokarutaShow('11:00 / 14:00 / 17:00')],
    '2026-11-21': [nazokarutaShow('13:00 / 16:00')],
    '2026-11-22': [nazokarutaShow('11:00 / 14:00 / 17:00')],
    '2026-11-23': [nazokarutaShow('11:00 / 14:00 / 17:00')],
    '2026-11-28': [nazokarutaShow('13:00 / 16:00')],
    '2026-11-29': [nazokarutaShow('11:00 / 14:00 / 17:00')],
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

  let closeTimer = null;

  const populateDetail = (key) => {
    detailDate.textContent = formatDateLabel(key);
    const shows = SCHEDULE[key] || [];

    if (!shows.length) {
      detailList.innerHTML = '';
      detailEmpty.hidden = false;
      return;
    }

    detailEmpty.hidden = true;
    detailList.innerHTML = shows
      .map((show) => {
        const kv = show.kv
          ? `<img class="cal-show__kv" src="${escapeHtml(show.kv)}" alt="">`
          : '';
        return `
      <article class="cal-show">
        ${kv}
        <h3 class="cal-show__title">${escapeHtml(show.title)}</h3>
        <dl class="cal-show__meta">
          <div><dt>開演</dt><dd>${escapeHtml(show.time)}</dd></div>
          <div><dt>会場</dt><dd>${escapeHtml(show.place)}</dd></div>
          <div><dt>人数</dt><dd>${escapeHtml(show.team)}</dd></div>
          <div><dt>所要</dt><dd>${escapeHtml(show.duration)}</dd></div>
          <div><dt>料金</dt><dd>${escapeHtml(show.price)}</dd></div>
        </dl>
        <a class="cal-show__link" href="${escapeHtml(show.link)}">詳細をみる</a>
      </article>`;
      })
      .join('');
  };

  const syncSelectedCells = () => {
    calGrid.querySelectorAll('.cal__cell[data-date]').forEach((el) => {
      el.classList.toggle('is-selected', el.dataset.date === selected);
    });
  };

  const hideDetailImmediate = () => {
    window.clearTimeout(closeTimer);
    detail.classList.remove('is-open', 'is-after-last-row');
    detail.hidden = true;
  };

  const closeDetail = () => {
    window.clearTimeout(closeTimer);
    detail.classList.remove('is-open');
    closeTimer = window.setTimeout(() => {
      if (!selected) {
        detail.hidden = true;
      }
    }, 310);
  };

  const openDetailAtRow = (key, rowIndex) => {
    window.clearTimeout(closeTimer);
    populateDetail(key);

    const cells = [...calGrid.querySelectorAll('.cal__cell')];
    const rowEndCell = cells[rowIndex * 7 + 6];
    detail.classList.remove('is-open');
    detail.classList.toggle('is-after-last-row', rowIndex === 5);
    detail.hidden = false;

    if (rowEndCell) {
      rowEndCell.after(detail);
    } else {
      calGrid.appendChild(detail);
    }

    // Force reflow so slide-down transition triggers cleanly from the top
    void detail.offsetHeight;
    detail.classList.add('is-open');
  };

  const renderCal = () => {
    calLabel.textContent = `${year}年 ${month}月`;
    hideDetailImmediate();
    calGrid.innerHTML = '';

    const first = new Date(year, month - 1, 1);
    const start = (first.getDay() + 6) % 7; // Mon=0
    const daysInMonth = new Date(year, month, 0).getDate();
    const prevDaysInMonth = new Date(year, month - 1, 0).getDate();
    const total = 42; // Always 6 rows x 7 columns

    for (let i = 0; i < total; i += 1) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'cal__cell';
      cell.setAttribute('role', 'gridcell');

      const dow = i % 7;
      if (dow === 5) cell.classList.add('is-sat');
      if (dow === 6) cell.classList.add('is-sun');
      if (i >= 35) cell.classList.add('is-last-row');

      const dayNum = i - start + 1;
      if (dayNum < 1 || dayNum > daysInMonth) {
        const outDay = dayNum < 1 ? prevDaysInMonth + dayNum : dayNum - daysInMonth;
        cell.classList.add('is-outside');
        cell.tabIndex = -1;
        cell.disabled = true;
        cell.setAttribute('aria-hidden', 'true');
        cell.innerHTML = `<span class="cal__day">${outDay}</span>`;
        calGrid.appendChild(cell);
        continue;
      }

      const key = keyOf(year, month, dayNum);
      const hasShow = Boolean(SCHEDULE[key]?.length);
      const rowIndex = Math.floor(i / 7);

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
        if (selected === key) {
          selected = null;
          syncSelectedCells();
          closeDetail();
          return;
        }
        selected = key;
        syncSelectedCells();
        openDetailAtRow(key, rowIndex);
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
      renderCal();
    });
  });

  renderCal();
})();
