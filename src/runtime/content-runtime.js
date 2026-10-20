(() => {
  const main = document.querySelector('main');
  if (!main) return;
  let documentState = {
      schema: 1,
      theme: {},
      pages: {},
      global: { nodes: {}, additions: [], order: {} },
    },
    base = '',
    applying = false;
  const originals = new Map(),
    elements = new Map();
  let observer;
  const route = () => {
    const raw = location.hash.slice(1) || 'home';
    if (raw === 'origins/0') return 'origins';
    if (/^(story|ingredients|wellness)\//.test(raw)) return raw.split('/')[0];
    return raw;
  };
  const ignored = (e) =>
    e.matches(
      'script,style,svg,svg *,option,.motion-atmosphere,.motion-atmosphere *,.motion-ripple,[data-ig4-prev]',
    );
  const scopes = () => [
    ['main', main],
    ['header', document.querySelector('.header')],
    ['footer', document.querySelector('footer')],
  ];
  function indexTree(root, prefix, keep = false) {
    if (!root) return;
    if (prefix === 'main' && (route() === 'contact' || SiteDefaults.isProductRoute(route()))) return;
    function walk(el, id) {
      if (ignored(el)) return;
      if (el.dataset.productRoot) id = 'main/product-v2-' + el.dataset.productRoot;
      if (el.dataset.pdKey) id = id.substring(0, id.lastIndexOf('/')) + '/' + el.dataset.pdKey;
      if (el.matches('.product-card')) {
        const product = el
          .querySelector('a[href^="#product/"]')
          ?.getAttribute('href')
          ?.split('/')[1];
        if (product) id = id.substring(0, id.lastIndexOf('/')) + '/product-' + product;
      }
      el.dataset.contentId = id;
      elements.set(id, el);
      if (keep && !originals.has(id))
        originals.set(id, {
          html: el.innerHTML,
          style: el.getAttribute('style'),
          href: el.getAttribute('href'),
          src: el.getAttribute('src'),
          alt: el.getAttribute('alt'),
        });
      let n = 0,
        icon = 0;
      for (const child of el.children) {
        if (child.tagName.toLowerCase() === 'svg') {
          const iconId = id + '/icon-' + icon++;
          child.dataset.contentId = iconId;
          elements.set(iconId, child);
          if (keep && !originals.has(iconId))
            originals.set(iconId, {
              html: child.innerHTML,
              style: child.getAttribute('style'),
              href: null,
              src: null,
              alt: null,
            });
        } else if (!ignored(child)) walk(child, id + '/' + n++);
      }
    }
    walk(root, prefix);
  }
  function resetGlobal() {
    for (const [id, original] of originals) {
      const el = elements.get(id);
      if (!el) continue;
      if (el.dataset.contentTextApplied) {
        el.innerHTML = original.html;
        delete el.dataset.contentTextApplied;
      }
      if (el.dataset.contentPatched) {
        for (const [key, value] of Object.entries({
          style: original.style,
          href: original.href,
          src: original.src,
          alt: original.alt,
        }))
          value === null ? el.removeAttribute(key) : el.setAttribute(key, value);
        delete el.dataset.contentPatched;
        delete el.dataset.contentAnimation;
        delete el.dataset.contentHidden;
        delete el.dataset.contentDeleted;
        el.hidden = false;
      }
    }
  }
  const escapeCSS = (value) => String(value).replace(/["\\\n\r]/g, '');
  function setText(el, text) {
    const icons = [...el.children]
      .filter((child) => child.tagName.toLowerCase() === 'svg')
      .map((e) => e.cloneNode(true));
    el.replaceChildren();
    String(text)
      .split('\n')
      .forEach((line, index) => {
        if (index) el.append(document.createElement('br'));
        el.append(document.createTextNode(line));
      });
    icons.forEach((e) => el.append(e));
    el.dataset.contentTextApplied = 'true';
  }
  function makeBlock(block) {
    let el;
    if (block.type === 'clone') {
      const source = elements.get(block.source);
      if (!source) return;
      el = source.cloneNode(true);
      el.querySelectorAll('[id]').forEach((e) => e.removeAttribute('id'));
      el.removeAttribute('id');
    } else {
      el = document.createElement('section');
      el.className = 'content-custom-block';
      if (block.type === 'image')
        el.innerHTML = '<img src="assets/ingredients-oranges-v4.png" alt="รูปภาพของคุณ">';
      else if (block.type === 'banner')
        el.innerHTML =
          '<h2>หัวข้อใหม่ของคุณ</h2><p>คลิกเพื่อแก้ไขข้อความและเพิ่มเรื่องราวของคุณ</p><a href="#catalog" class="btn">ดูเพิ่มเติม</a>';
      else el.innerHTML = '<h2>หัวข้อใหม่ของคุณ</h2><p>เริ่มต้นเขียนข้อความของคุณที่นี่</p>';
    }
    el.dataset.contentCustom = block.id;
    indexTree(el, block.id);
    return el;
  }
  function applyGroup(group = {}) {
    for (const block of group.additions || []) {
      const el = makeBlock(block),
        parentEl = elements.get(block.parent) || main;
      if (!el) continue;
      const after = elements.get(block.after);
      after && after.parentElement === parentEl ? after.after(el) : parentEl.append(el);
    }
    for (const [id, ids] of Object.entries(group.order || {})) {
      const parentEl = elements.get(id);
      if (!parentEl || !main.contains(parentEl) || !Array.isArray(ids)) continue;
      const children = [...parentEl.children].filter(
        (el) => el.matches('section,article') && el.dataset.contentId,
      );
      if (children.length < 2) continue;
      const lookup = new Map(children.map((el) => [el.dataset.contentId, el]));
      const ordered = [...new Set(ids)].map((key) => lookup.get(key)).filter(Boolean);
      for (const child of children) if (!ordered.includes(child)) ordered.push(child);
      const slots = children.map((child) => {
        const marker = document.createComment('section');
        child.replaceWith(marker);
        return marker;
      });
      slots.forEach((slot, index) => slot.replaceWith(ordered[index]));
    }
    for (const [id, patch] of Object.entries(group.nodes || {})) {
      const el = elements.get(id);
      if (!el) continue;
      el.dataset.contentPatched = 'true';
      if (patch.text !== undefined) setText(el, patch.text);
      for (const [property, value] of Object.entries({
        ...patch.styles,
        ...(innerWidth <= 760 ? patch.mobileStyles : {}),
      }))
        el.style.setProperty(
          property.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase()),
          value,
          'important',
        );
      if (patch.image !== undefined) {
        if (el.matches('.v2-bottle')) {
          el.classList.toggle('cms-product-replaced', !!patch.image);
          el.style.setProperty('--cms-product-image', `url("${escapeCSS(patch.image)}")`);
        } else if (el.tagName === 'IMG') {
          el.src = patch.image;
          el.srcset = '';
        } else {
          el.style.setProperty(
            'background-image',
            patch.image ? `url("${escapeCSS(patch.image)}")` : 'none',
            'important',
          );
          if (!patch.styles?.backgroundSize)
            el.style.setProperty('background-size', 'cover', 'important');
        }
      }
      if (patch.alt !== undefined)
        el.tagName === 'IMG' ? (el.alt = patch.alt) : el.setAttribute('aria-label', patch.alt);
      if (patch.href !== undefined && el.tagName === 'A') el.href = patch.href;
      if (patch.hidden) {
        el.dataset.contentHidden = 'true';
        el.style.setProperty('display', 'none', 'important');
      }
      if (patch.deleted) {
        el.dataset.contentDeleted = 'true';
        el.style.setProperty('display', 'none', 'important');
      }
      if (patch.sticker) SiteCMS.sticker(el, patch.sticker);
      if (patch.effect) SiteCMS.effect(el, patch.effect);
    }
  }
  function applyTheme() {
    const theme = documentState.theme || {};
    let style = document.getElementById('content-theme');
    if (!style) {
      style = document.createElement('style');
      style.id = 'content-theme';
      document.head.append(style);
    }
    let css = '';
    const fonts = {
      thai: '"Noto Sans Thai",sans-serif',
      sans: '"DM Sans","Noto Sans Thai",sans-serif',
      serif: 'Georgia,"Noto Sans Thai",serif',
    };
    if (theme.text)
      css += `body{--ink:${theme.text};--muted:${theme.text}}body main :is(h1,h2,h3,h4,p,small,strong,li,dt,dd),body footer{color:${theme.text}!important}`;
    if (theme.background)
      css += `body,main,main>div,main section{background-color:${theme.background}!important}`;
    if (theme.surface)
      css += `main article,main [class$="-facts"],header{background-color:${theme.surface}!important}`;
    if (theme.accent)
      css += `.btn:not(.secondary),.line-btn{background:${theme.accent}!important;border-color:${theme.accent}!important}.ig4-nav-track button.is-active{background:${theme.accent}!important}`;
    if (fonts[theme.font])
      css += `main :is(h1,h2,h3,h4,p,a,button,small,span),header,footer{font-family:${fonts[theme.font]}!important}`;
    style.textContent = css;
  }
  function apply() {
    if (applying || !base) return;
    applying = true;
    observer?.disconnect();
    const y = scrollY;
    resetGlobal();
    if (SiteCMS.sync(documentState)) {
      const scroll = scrollY;
      render();
      base = main.innerHTML;
      window.scrollTo(0, scroll);
    }
    main.innerHTML = base;
    elements.clear();
    for (const [key, root] of scopes()) indexTree(root, key, key !== 'main');
    const firstSection = main.querySelector('section,article');
    applyTheme();
    SiteCMS.productImages();
    applyGroup(documentState.global);
    if (route() !== 'contact' && !SiteDefaults.isProductRoute(route())) applyGroup(documentState.pages?.[route()]);
    SiteCMS.applyBrand();
    const header = document.querySelector('.header'),
      needsHeaderSpace =
        firstSection !== main.querySelector('section,article') &&
        getComputedStyle(header).position === 'absolute';
    main.classList.toggle('content-reordered-top', needsHeaderSpace);
    if (needsHeaderSpace)
      main.style.setProperty(
        '--content-header-space',
        header.offsetHeight + (parseFloat(getComputedStyle(header).marginTop) || 0) + 24 + 'px',
      );
    window.scrollTo(0, y);
    observer?.observe(main, { childList: true });
    applying = false;
  }
  function capture() {
    if (applying) return;
    base = main.innerHTML;
    apply();
  }
  // Published content is read-only; edits and draft previews run in the admin project.
  fetch('/api/content')
    .then((response) => {
      if (!response.ok) throw new Error('Published content unavailable');
      return response.json();
    })
    .then((data) => {
      documentState = data.document;
      apply();
    })
    .catch(() => {});
  observer = new MutationObserver(capture);
  observer.observe(main, { childList: true });
  capture();
  let mobile = innerWidth <= 760;
  let resizeTimer;
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const changed = mobile !== (innerWidth <= 760);
      mobile = innerWidth <= 760;
      if (changed && JSON.stringify(documentState).includes('mobileStyles')) apply();
    }, 180);
  });
})();
