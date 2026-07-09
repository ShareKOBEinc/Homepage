(() => {
  'use strict';

  if (typeof WORKS === 'undefined') return;

  const homeGrid = document.getElementById('homeWorksGrid');
  const worksGrid = document.getElementById('worksGrid');
  const filterBar = document.getElementById('worksFilter');
  const countEl = document.getElementById('worksCount');
  const counterEl = document.querySelector('[data-count]');

  if (counterEl) {
    counterEl.dataset.count = String(WORKS.length);
  }

  const getWorkDateParts = (work) => {
    if (typeof work.year === 'number') {
      return {
        year: work.year,
        month: work.month ?? null,
        day: work.day ?? null,
      };
    }

    const raw = String(work.date || work.year || '').trim();
    if (!raw) return { year: 0, month: null, day: null };

    const iso = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (iso) {
      return {
        year: Number(iso[1]),
        month: Number(iso[2]),
        day: Number(iso[3]),
      };
    }

    const jp = raw.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日?$/);
    if (jp) {
      return {
        year: Number(jp[1]),
        month: Number(jp[2]),
        day: Number(jp[3]),
      };
    }

    const dotted = raw.match(/^(\d{4})\.(\d{1,2})\.(\d{1,2})$/);
    if (dotted) {
      return {
        year: Number(dotted[1]),
        month: Number(dotted[2]),
        day: Number(dotted[3]),
      };
    }

    const yearOnly = raw.match(/^(\d{4})$/);
    if (yearOnly) return { year: Number(yearOnly[1]), month: null, day: null };

    return { year: 0, month: null, day: null };
  };

  const parseWorkDate = (work) => {
    const { year, month, day } = getWorkDateParts(work);
    if (!year) return 0;
    if (month && day) return new Date(year, month - 1, day).getTime();
    return new Date(year, 0, 1).getTime();
  };

  const formatWorkDate = (work) => {
    const { year, month, day } = getWorkDateParts(work);
    if (!year) return '';
    if (month && day) return `${year}.${month}.${day}`;
    return String(year);
  };

  const sortWorks = (works) => [...works]
    .map((work, index) => ({ work, index }))
    .sort((a, b) => {
      const dateDiff = parseWorkDate(b.work) - parseWorkDate(a.work);
      if (dateDiff !== 0) return dateDiff;
      return b.index - a.index;
    })
    .map(({ work }) => work);

  const sortedWorks = sortWorks(WORKS);

  const getWorkCategories = (work) => {
    if (Array.isArray(work.categories) && work.categories.length) return work.categories;
    if (work.category) return [work.category];
    return [];
  };

  const renderCategories = (work) => {
    const cats = getWorkCategories(work);
    if (!cats.length) return '';
    return `<span class="work-card__cats">${cats.map((cat) => `<span class="work-card__cat">${cat}</span>`).join('')}</span>`;
  };

  const resolveImagePath = (image) => {
    if (!image) return '';
    const trimmed = String(image).trim();
    if (/^(https?:\/\/|\/)/.test(trimmed)) return trimmed;
    if (trimmed.startsWith('assets/')) return trimmed;
    return `assets/${trimmed}`;
  };

  const encodeImagePath = (path) => {
    const slash = path.lastIndexOf('/');
    const dir = slash === -1 ? '' : path.slice(0, slash + 1);
    const file = slash === -1 ? path : path.slice(slash + 1);
    return dir + encodeURIComponent(file.normalize('NFC'));
  };

  const renderMedia = (work) => {
    if (!work.image) {
      return '<div class="work-card__placeholder"></div>';
    }
    const src = encodeImagePath(resolveImagePath(work.image));
    const alt = work.title.replace(/"/g, '&quot;');
    return `
      <img src="${src}" alt="" class="work-card__bg" aria-hidden="true" loading="lazy">
      <img src="${src}" alt="${alt}" class="work-card__img" loading="lazy">
    `;
  };

  const A4_RATIO = 210 / 297;

  const fitWorkImages = (container) => {
    container.querySelectorAll('.work-card__img').forEach((img) => {
      const apply = () => {
        const media = img.closest('.work-card__media');
        if (!media || !img.naturalWidth) return;
        const isLandscape = img.naturalWidth / img.naturalHeight > A4_RATIO;
        media.classList.toggle('work-card__media--letterbox', isLandscape);
        media.classList.toggle('work-card__media--cover', !isLandscape);
      };
      if (img.complete) apply();
      else img.addEventListener('load', apply, { once: true });
    });
  };

  const renderCard = (work, { showDate = true } = {}) => {
    const categories = renderCategories(work);
    const meta = showDate
      ? `<div class="work-card__meta">
          ${categories}
          <span class="work-card__year">${formatWorkDate(work)}</span>
        </div>`
      : categories;

    const url = work.url || '#';

    return `
      <article class="work-card reveal" data-category="${getWorkCategories(work).join(',')}">
        <div class="work-card__media" style="--hue: ${work.hue}">
          ${renderMedia(work)}
        </div>
        <div class="work-card__info">
          ${meta}
          <h3 class="work-card__title">${work.title}</h3>
          <p class="work-card__desc">${work.desc}</p>
        </div>
        <a href="${url}" class="work-card__link" aria-label="${work.title}を見る"></a>
      </article>
    `;
  };

  const observeCards = (container) => {
    container.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 0.05, 0.4)}s`;
      requestAnimationFrame(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        );
        observer.observe(el);
      });
    });
  };

  const renderGrid = (container, works, options = {}) => {
    container.innerHTML = works.map((work) => renderCard(work, options)).join('');
    fitWorkImages(container);
    observeCards(container);
  };

  // トップページ: 直近の作品を表示（日付の新しい順）
  if (homeGrid) {
    const limit = typeof HOME_WORKS_COUNT === 'number' ? HOME_WORKS_COUNT : 6;
    const recent = sortedWorks.slice(0, limit);
    renderGrid(homeGrid, recent);
  }

  // Works 一覧ページ: フィルター付き
  if (worksGrid && filterBar) {
    const allCategory = WORK_CATEGORIES[0];
    let activeCategory = allCategory;

    filterBar.innerHTML = WORK_CATEGORIES.map((cat, i) => `
      <button
        type="button"
        class="works-filter__btn${i === 0 ? ' active' : ''}"
        data-filter="${cat}"
        role="tab"
        aria-selected="${i === 0}"
      >${cat}</button>
    `).join('');

    const render = () => {
      const filtered = activeCategory === allCategory
        ? sortedWorks
        : sortedWorks.filter((w) => getWorkCategories(w).includes(activeCategory));

      renderGrid(worksGrid, filtered);

      if (countEl) {
        countEl.textContent = `${filtered.length} Projects`;
      }
    };

    filterBar.querySelectorAll('[data-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.filter;
        filterBar.querySelectorAll('[data-filter]').forEach((b) => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-selected', String(b === btn));
        });
        render();
      });
    });

    render();
  }
})();
