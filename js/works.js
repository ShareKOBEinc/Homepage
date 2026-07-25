(() => {
  'use strict';

  if (typeof WORKS === 'undefined' && typeof GOODS === 'undefined') return;

  const homeGrid = document.getElementById('homeWorksGrid');
  const homeGoodsGrid = document.getElementById('homeGoodsGrid');
  const worksGrid = document.getElementById('worksGrid');
  const filterBar = document.getElementById('worksFilter');
  const counterEl = document.querySelector('[data-count]');

  const goodsCategory = 'キット';
  const worksList = Array.isArray(WORKS) ? WORKS : [];
  const goodsList = Array.isArray(typeof GOODS !== 'undefined' ? GOODS : null)
    ? GOODS
    : worksList.filter((work) => {
        const cats = Array.isArray(work.categories) && work.categories.length
          ? work.categories
          : (work.category ? [work.category] : []);
        return cats.includes(goodsCategory);
      });

  const getWorkCategories = (work) => {
    if (Array.isArray(work.categories) && work.categories.length) return work.categories;
    if (work.category) return [work.category];
    return [];
  };

  const isGoods = (work) => getWorkCategories(work).includes(goodsCategory);

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

  const portfolioWorks = sortWorks(worksList.filter((work) => !isGoods(work)));
  const goodsWorks = sortWorks(goodsList);

  if (counterEl) {
    counterEl.dataset.count = String(portfolioWorks.length);
  }

  const renderCategories = (work) => {
    const cats = getWorkCategories(work).filter((cat) => cat !== goodsCategory);
    if (!cats.length) return '';
    return `<span class="work-card__cats">${cats.map((cat) => `<span class="work-card__cat">${cat}</span>`).join('')}</span>`;
  };

  const resolveImagePath = (image) => {
    if (!image) return '';
    const trimmed = String(image).trim();
    if (/^(https?:\/\/|\/)/.test(trimmed)) return trimmed;
    const assetBase = document.body?.dataset?.assetBase || '';
    if (trimmed.startsWith('assets/')) return `${assetBase}${trimmed}`;
    return `${assetBase}assets/${trimmed}`;
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

  const renderCard = (work, { showDate = true, showCategory = true } = {}) => {
    const categories = showCategory ? renderCategories(work) : '';
    const meta = showDate
      ? `<div class="work-card__meta">
          ${categories}
          <span class="work-card__year">${formatWorkDate(work)}</span>
        </div>`
      : categories;

    const url = work.url || (isGoods(work) ? '' : `works/${encodeURIComponent(work.id)}.html`);
    const link = url
      ? `<a href="${url}" class="work-card__link" aria-label="${work.title}を見る"></a>`
      : '';

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
        ${link}
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

  // トップページ Works: キット以外の直近作品
  if (homeGrid) {
    const limit = typeof HOME_WORKS_COUNT === 'number' ? HOME_WORKS_COUNT : 6;
    const recent = portfolioWorks.slice(0, limit);
    renderGrid(homeGrid, recent);
  }

  // トップページ Goods: キット分類（件数制限）
  if (homeGoodsGrid) {
    const limit = typeof HOME_GOODS_COUNT === 'number' ? HOME_GOODS_COUNT : 3;
    renderGrid(homeGoodsGrid, goodsWorks.slice(0, limit), { showCategory: false });
  }

  // Goods 一覧ページ
  const goodsGrid = document.getElementById('goodsGrid');
  if (goodsGrid) {
    renderGrid(goodsGrid, goodsWorks, { showCategory: false });
  }

  // Works 一覧ページ: キット以外 + フィルター
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
        ? portfolioWorks
        : portfolioWorks.filter((w) => getWorkCategories(w).includes(activeCategory));

      renderGrid(worksGrid, filtered);
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

  // Works 個別ページ（Tumbleweed風のイベント詳細構成）
  const workDetail = document.getElementById('workDetail');
  if (workDetail) {
    const workId = workDetail.dataset.workId
      || new URLSearchParams(window.location.search).get('id')
      || '';
    const work = [...worksList, ...goodsWorks].find((item) => item.id === workId);
    const assetBase = document.body.dataset.assetBase || '';
    const backHref = `${assetBase}works.html`;

    const escapeText = (value) => String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

    const toParagraphs = (value) => {
      if (!value) return '';
      const parts = Array.isArray(value) ? value : String(value).split(/\n+/);
      return parts
        .map((part) => String(part).trim())
        .filter(Boolean)
        .map((part) => `<p>${escapeText(part)}</p>`)
        .join('');
    };

    const renderBlock = (en, ja, inner, extraClass = '') => {
      if (!inner) return '';
      return `
        <section class="work-block ${extraClass} reveal">
          <header class="work-block__head">
            <p class="work-block__en">${en}</p>
            <h2 class="work-block__ja">${ja}</h2>
          </header>
          <div class="work-block__body">${inner}</div>
        </section>
      `;
    };

    if (!work || isGoods(work)) {
      workDetail.innerHTML = `
        <section class="page-hero page-hero--compact">
          <a href="${backHref}" class="page-hero__back reveal">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M16 10H4M8 6l-4 4 4 4" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            Back to Works
          </a>
          <h1 class="page-hero__title reveal">Works</h1>
          <p class="page-hero__desc reveal">指定の作品が見つかりませんでした。</p>
        </section>
      `;
    } else {
      const date = formatWorkDate(work);
      const storyLead = work.storyLead || '';
      const storyBody = work.story || work.desc || '';
      const overview = work.overview || {};
      const overviewItems = [
        ['チーム人数', overview.team],
        ['所要時間', overview.duration],
        ['スタート形式', overview.start],
        ['開催場所', overview.location || work.place],
        ['開催形式', overview.format],
      ].map(([label, value]) => [label, value || '—']);

      const schedule = work.schedule || {};
      const schedulePeriod = schedule.period || (date ? `${date}` : '');
      const scheduleSlots = Array.isArray(schedule.slots) ? schedule.slots : [];

      const access = work.access || {};
      const tickets = Array.isArray(work.tickets) ? work.tickets : [];
      const notes = Array.isArray(work.notes)
        ? work.notes
        : (work.note ? [work.note] : []);

      const media = work.image
        ? (() => {
            const src = encodeImagePath(resolveImagePath(work.image));
            const alt = escapeText(work.title);
            return `
              <img src="${src}" alt="" class="work-hero__bg" aria-hidden="true">
              <img src="${src}" alt="${alt}" class="work-hero__img">
            `;
          })()
        : '<div class="work-hero__placeholder"></div>';

      document.title = `${work.title} | ShareKOBE`;

      const storyHtml = (storyLead || storyBody)
        ? renderBlock(
          'STORY',
          'ストーリー',
          `
            ${storyLead ? `<p class="work-block__lead">${escapeText(storyLead)}</p>` : ''}
            <div class="work-block__text">${toParagraphs(storyBody)}</div>
          `
        )
        : '';

      const overviewHtml = renderBlock(
        'OVERVIEW',
        'イベント概要',
        `
          <dl class="work-overview">
            ${overviewItems.map(([label, value]) => `
              <div class="work-overview__item">
                <dt>${escapeText(label)}</dt>
                <dd>${escapeText(value)}</dd>
              </div>
            `).join('')}
          </dl>
          ${overview.note ? `<p class="work-overview__note">${escapeText(overview.note)}</p>` : ''}
        `
      );

      const scheduleHtml = (schedulePeriod || scheduleSlots.length)
        ? renderBlock(
          'SCHEDULE',
          '開催日程',
          `
            ${schedulePeriod ? `<p class="work-schedule__period">${escapeText(schedulePeriod)}</p>` : ''}
            ${scheduleSlots.length ? `
              <ul class="work-schedule__list">
                ${scheduleSlots.map((slot) => `
                  <li>
                    <span>${escapeText(slot.label || '')}</span>
                    <span>${escapeText(slot.value || '')}</span>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
            ${schedule.note ? `<div class="work-block__text" style="margin-top:1.25rem">${toParagraphs(schedule.note)}</div>` : ''}
          `
        )
        : '';

      const ticketHtml = tickets.length
        ? renderBlock(
          'TICKET',
          'チケット情報',
          `
            <div class="work-ticket">
              ${tickets.map((ticket) => `
                <div class="work-ticket__row">
                  <span class="work-ticket__label">${escapeText(ticket.label)}</span>
                  <span class="work-ticket__price">${escapeText(ticket.price)}<small>${escapeText(ticket.unit || '円')}</small></span>
                </div>
              `).join('')}
            </div>
            ${work.ticketNotes ? `<div class="work-ticket__notes work-block__text">${toParagraphs(work.ticketNotes)}</div>` : ''}
          `
        )
        : '';

      const accessHtml = (access.address || access.station || access.note)
        ? renderBlock(
          'ACCESS',
          'アクセス',
          `
            <dl class="work-access">
              ${access.address ? `
                <div class="work-access__row">
                  <dt>住所</dt>
                  <dd>${escapeText(access.address)}</dd>
                </div>
              ` : ''}
              ${access.station ? `
                <div class="work-access__row">
                  <dt>最寄駅</dt>
                  <dd>${escapeText(access.station)}</dd>
                </div>
              ` : ''}
            </dl>
            ${access.note ? `<div class="work-block__text" style="margin-top:1.25rem">${toParagraphs(access.note)}</div>` : ''}
          `
        )
        : '';

      const noteHtml = notes.length
        ? renderBlock(
          'NOTE',
          '注意事項',
          `
            <ul class="work-note__list">
              ${notes.map((item) => `<li>${escapeText(item)}</li>`).join('')}
            </ul>
          `
        )
        : '';

      const officialUrl = work.officialUrl || work.siteUrl || '';
      const officialLabel = work.officialLabel || '特設サイトを見る';
      const officialHtml = officialUrl
        ? `
          <a
            href="${escapeText(officialUrl)}"
            class="btn-outline work-detail__official"
            target="_blank"
            rel="noopener noreferrer"
          >${escapeText(officialLabel)} →</a>
        `
        : '';

      workDetail.innerHTML = `
        <section class="work-hero">
          <a href="${backHref}" class="page-hero__back work-hero__back reveal">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M16 10H4M8 6l-4 4 4 4" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            Back to Works
          </a>

          <div class="work-detail">
            <div class="work-detail__media reveal" style="--hue: ${work.hue || 0}">
              ${media.replace(/work-hero__/g, 'work-detail__')}
            </div>

            <div class="work-detail__content">
              <div class="work-hero__copy reveal">
                ${work.place ? `<p class="work-hero__place">${escapeText(work.place)}</p>` : ''}
                <h1 class="work-hero__title">${escapeText(work.title)}</h1>
                ${work.tagline ? `<p class="work-hero__tagline">${escapeText(work.tagline)}</p>` : ''}
                ${date ? `<time class="work-hero__date"${work.year && work.month && work.day ? ` datetime="${work.year}-${String(work.month).padStart(2, '0')}-${String(work.day).padStart(2, '0')}"` : ''}>${escapeText(date)}</time>` : ''}
                ${officialHtml ? `<div class="work-hero__official">${officialHtml}</div>` : ''}
              </div>

              <div class="work-sections">
                ${storyHtml}
                ${overviewHtml}
                ${scheduleHtml}
                ${ticketHtml}
                ${accessHtml}
                ${noteHtml}
              </div>
            </div>
          </div>
        </section>
      `;

      const tintHeaderLogo = (color) => {
        const logoImg = document.querySelector('.logo__img');
        if (!logoImg) return;

        let filterEl = document.getElementById('workLogoTint');
        if (!filterEl) {
          const svgNs = 'http://www.w3.org/2000/svg';
          const svg = document.createElementNS(svgNs, 'svg');
          svg.setAttribute('aria-hidden', 'true');
          svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
          svg.innerHTML = `
            <defs>
              <filter id="workLogoTint" color-interpolation-filters="sRGB">
                <feFlood id="workLogoTintFlood" flood-color="${color}" result="flood"></feFlood>
                <feComposite in="flood" in2="SourceAlpha" operator="in"></feComposite>
              </filter>
            </defs>
          `;
          document.body.appendChild(svg);
          filterEl = document.getElementById('workLogoTint');
        }

        const flood = document.getElementById('workLogoTintFlood');
        if (flood) flood.setAttribute('flood-color', color);
        logoImg.style.filter = 'url(#workLogoTint)';
      };

      const applyWorkTheme = (main, sub, deep) => {
        const root = document.documentElement;
        const resolvedDeep = deep || main;
        [root, document.body, workDetail].forEach((el) => {
          el.style.setProperty('--work-main', main);
          el.style.setProperty('--work-sub', sub);
          el.style.setProperty('--work-main-deep', resolvedDeep);
        });
        root.style.backgroundColor = sub;
        document.body.style.backgroundColor = sub;
        document.body.classList.add('is-work-theme');
        tintHeaderLogo(main);
      };

      const mixWithWhite = (r, g, b, amount) => {
        const t = Math.min(Math.max(amount, 0), 1);
        return `rgb(${Math.round(r + (255 - r) * t)}, ${Math.round(g + (255 - g) * t)}, ${Math.round(b + (255 - b) * t)})`;
      };

      const darkenRgb = (r, g, b, amount) => {
        const t = Math.min(Math.max(amount, 0), 1);
        return `rgb(${Math.round(r * (1 - t))}, ${Math.round(g * (1 - t))}, ${Math.round(b * (1 - t))})`;
      };

      const toCssRgb = (r, g, b) => `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;

      const hslToRgb = (h, s, l) => {
        const sat = s / 100;
        const light = l / 100;
        const c = (1 - Math.abs(2 * light - 1)) * sat;
        const hp = ((h % 360) + 360) % 360 / 60;
        const x = c * (1 - Math.abs((hp % 2) - 1));
        let r = 0;
        let g = 0;
        let b = 0;
        if (hp >= 0 && hp < 1) [r, g, b] = [c, x, 0];
        else if (hp < 2) [r, g, b] = [x, c, 0];
        else if (hp < 3) [r, g, b] = [0, c, x];
        else if (hp < 4) [r, g, b] = [0, x, c];
        else if (hp < 5) [r, g, b] = [x, 0, c];
        else [r, g, b] = [c, 0, x];
        const m = light - c / 2;
        return {
          r: Math.round((r + m) * 255),
          g: Math.round((g + m) * 255),
          b: Math.round((b + m) * 255),
        };
      };

      const paletteFromHue = (hue = 0) => {
        const main = hslToRgb(hue, 48, 36);
        const sub = hslToRgb(hue, 28, 94);
        return {
          main: toCssRgb(main.r, main.g, main.b),
          sub: toCssRgb(sub.r, sub.g, sub.b),
          deep: darkenRgb(main.r, main.g, main.b, 0.35),
        };
      };

      const scorePixel = (r, g, b) => {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        if (max < 28 || min > 248) return 0;
        const sat = max === 0 ? 0 : (max - min) / max;
        const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        if (sat < 0.06 && lum > 0.85) return 0;
        let weight = 1 + sat * 3;
        if (lum > 0.8) weight *= 0.25;
        if (lum < 0.12) weight *= 0.4;
        if (lum > 0.25 && lum < 0.7) weight *= 1.35;
        return weight;
      };

      const extractPaletteFromImageData = (data) => {
        const buckets = new Map();
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 200) continue;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const weight = scorePixel(r, g, b);
          if (!weight) continue;
          const key = `${r >> 3},${g >> 3},${b >> 3}`;
          const prev = buckets.get(key) || { r: 0, g: 0, b: 0, n: 0, score: 0 };
          prev.r += r;
          prev.g += g;
          prev.b += b;
          prev.n += 1;
          prev.score += weight;
          buckets.set(key, prev);
        }

        const ranked = [...buckets.values()]
          .map((bucket) => ({
            r: Math.round(bucket.r / bucket.n),
            g: Math.round(bucket.g / bucket.n),
            b: Math.round(bucket.b / bucket.n),
            score: bucket.score,
          }))
          .sort((a, b) => b.score - a.score);

        if (!ranked.length) return null;
        const main = ranked[0];
        const subSource = ranked.find((c, i) => {
          if (i === 0) return false;
          const dr = c.r - main.r;
          const dg = c.g - main.g;
          const db = c.b - main.b;
          return (dr * dr + dg * dg + db * db) > 2200;
        }) || main;

        return {
          main: toCssRgb(main.r, main.g, main.b),
          sub: mixWithWhite(subSource.r, subSource.g, subSource.b, 0.84),
          deep: darkenRgb(main.r, main.g, main.b, 0.4),
        };
      };

      const extractPaletteFromElement = (img) => {
        try {
          const canvas = document.createElement('canvas');
          const size = 64;
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (!ctx) return null;
          ctx.drawImage(img, 0, 0, size, size);
          return extractPaletteFromImageData(ctx.getImageData(0, 0, size, size).data);
        } catch (err) {
          return null;
        }
      };

      const extractPaletteFromUrl = async (url) => {
        try {
          const res = await fetch(url);
          if (!res.ok) return null;
          const blob = await res.blob();
          const bitmap = await createImageBitmap(blob);
          const canvas = document.createElement('canvas');
          const size = 64;
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (!ctx) return null;
          ctx.drawImage(bitmap, 0, 0, size, size);
          bitmap.close?.();
          return extractPaletteFromImageData(ctx.getImageData(0, 0, size, size).data);
        } catch (err) {
          return null;
        }
      };

      const applyThemeFromWork = async (img) => {
        const preset = (typeof WORK_COLORS !== 'undefined' && WORK_COLORS[work.id])
          || work.colors
          || null;

        if (preset?.main) {
          applyWorkTheme(
            preset.main,
            preset.sub || paletteFromHue(work.hue).sub,
            preset.deep || preset.main
          );
          return;
        }

        // 指定色がない場合のみ自動抽出
        const fallback = paletteFromHue(typeof work.hue === 'number' ? work.hue : 0);
        applyWorkTheme(fallback.main, fallback.sub, fallback.deep);

        let palette = img ? extractPaletteFromElement(img) : null;
        if (!palette && img?.currentSrc) {
          palette = await extractPaletteFromUrl(img.currentSrc);
        }
        if (palette) applyWorkTheme(palette.main, palette.sub, palette.deep);
      };

      // 画像読み込み前にも作品ごとの色を反映
      applyThemeFromWork(null);

      const detailImg = workDetail.querySelector('.work-detail__img');
      if (detailImg) {
        const apply = () => {
          const mediaEl = detailImg.closest('.work-detail__media');
          if (!mediaEl || !detailImg.naturalWidth) return;
          const isLandscape = detailImg.naturalWidth / detailImg.naturalHeight > A4_RATIO;
          mediaEl.classList.toggle('work-detail__media--letterbox', isLandscape);
          mediaEl.classList.toggle('work-detail__media--cover', !isLandscape);
          applyThemeFromWork(detailImg);
        };
        if (detailImg.complete && detailImg.naturalWidth) apply();
        else detailImg.addEventListener('load', apply, { once: true });
      }
    }
  }
})();
