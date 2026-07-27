(() => {
  'use strict';

  if (typeof NEWS === 'undefined') return;

  const homeList = document.getElementById('homeNewsList');
  const newsList = document.getElementById('newsList');

  const escapeText = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const formatDate = (dateStr) => {
    const m = String(dateStr).match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (!m) return dateStr;
    return `${m[1]}.${m[2].padStart(2, '0')}.${m[3].padStart(2, '0')}`;
  };

  const sortNews = (items) => [...items].sort((a, b) => String(b.date).localeCompare(String(a.date)));

  const renderItem = (item) => {
    const title = escapeText(item.title);
    const dateLabel = escapeText(formatDate(item.date));
    const titleHtml = item.url
      ? `<a class="home-news__link" href="${escapeText(item.url)}"${/^https?:\/\//.test(item.url) ? ' target="_blank" rel="noopener noreferrer"' : ''}>${title}</a>`
      : title;

    return `
      <li class="home-news__item reveal">
        <time datetime="${escapeText(item.date)}">${dateLabel}</time>
        <p>${titleHtml}</p>
      </li>
    `;
  };

  const observe = (container) => {
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

  const sorted = sortNews(NEWS);

  if (homeList) {
    const limit = typeof HOME_NEWS_COUNT === 'number' ? HOME_NEWS_COUNT : 3;
    homeList.innerHTML = sorted.slice(0, limit).map(renderItem).join('');
    observe(homeList);
  }

  if (newsList) {
    newsList.innerHTML = sorted.map(renderItem).join('');
    observe(newsList);
  }
})();
