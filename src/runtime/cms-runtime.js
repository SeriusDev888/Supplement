(() => {
  const defaults = window.SiteDefaults;
  Object.assign(iconPaths, defaults.icons);
  const escape = (value) =>
    String(value ?? '').replace(
      /[&<>"']/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
    );
  const safeTree = (value) =>
    Array.isArray(value)
      ? value.map(safeTree)
      : value && typeof value === 'object'
        ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k, safeTree(v)]))
        : typeof value === 'string'
          ? escape(value)
          : value;
  let signature = '',
    current = defaults.products,
    brand = {},
    contact = {};
  const oldImage = productImage;
  productImage = (id) => {
    const p = products[id];
    if (!p) return '';
    const box = document.createElement('div');
    box.innerHTML = oldImage(id);
    const el = box.querySelector('[role="img"]');
    if (el) {
      el.dataset.productId = id;
      productImages(box);
    }
    return box.innerHTML;
  };
  function sync(state) {
    const next = JSON.stringify([
      state.catalog || null,
      state.brand || null,
      state.contact || null,
    ]);
    if (next === signature) return false;
    signature = next;
    current = state.catalog || defaults.products;
    brand = state.brand || {};
    contact = state.contact || {};
    for (const id of Object.keys(products)) delete products[id];
    for (const record of current) {
      const fallback = defaults.products.find((p) => p.id === record.id) || {};
      const p = { ...fallback, ...record };
      products[p.id] = { ...safeTree(p), cmsEdited: !!state.catalog };
      homeProducts[p.id] = {
        sub: escape(p.cardSubtitle || p.title),
        desc: escape(p.cardDescription || p.description).replace(/\n/g, '<br>'),
        benefits: safeTree(
          p.benefits || [
            ['leaf', ''],
            ['heart', ''],
            ['sun', ''],
          ],
        ),
      };
    }
    return true;
  }
  function productImages(root = document) {
    root.querySelectorAll('[data-product-id]').forEach((el) => {
      const p = current.find((v) => v.id === el.dataset.productId);
      if (!p) return;
      const url = p.image || '';
      el.classList.toggle('cms-product-replaced', !!url);
      el.classList.toggle(
        'cms-product-empty',
        !url && !defaults.products.some((v) => v.id === p.id),
      );
      if (url)
        el.style.setProperty('--cms-product-image', `url("${url.replace(/["\\\n\r]/g, '')}")`);
      else el.style.removeProperty('--cms-product-image');
    });
  }
  function applyBrand() {
    document.querySelectorAll('a[href^="#product/"],[data-wellness]').forEach((el) => {
      const id = el.dataset.wellness || el.getAttribute('href').split('/')[1];
      const removed = current.find((p) => p.id === id)?.deleted === true;
      if (removed) {
        el.hidden = true;
        el.dataset.cmsRemoved = 'true';
      } else if (el.dataset.cmsRemoved) {
        el.hidden = false;
        delete el.dataset.cmsRemoved;
      }
    });
    const name = brand.name || 'CHASHITSU';
    document.querySelectorAll('.brand').forEach((el) => {
      let label = el.querySelector('.cms-brand-name');
      if (!label) {
        for (const node of [...el.childNodes]) if (node.nodeType === 3) node.remove();
        label = document.createElement('span');
        label.className = 'cms-brand-name';
        label.dataset.cmsPart = 'true';
        el.append(label);
      }
      label.textContent = name;
      el.setAttribute('aria-label', name + ' home');
      const symbol = el.querySelector('.brand-symbol');
      if (symbol) {
        symbol.replaceChildren();
        if (brand.logo) {
          const img = document.createElement('img');
          img.src = brand.logo;
          img.alt = name;
          img.dataset.cmsPart = 'true';
          symbol.append(img);
          symbol.classList.add('cms-brand-logo');
        } else {
          symbol.classList.remove('cms-brand-logo');
          symbol.textContent = brand.mark || 'C';
        }
      }
    });
    if (brand.tagline !== undefined) {
      const p = document.querySelector('.rf-brand>p');
      if (p) p.textContent = brand.tagline;
    }
  }
  function sticker(el, name) {
    const path = defaults.icons[name];
    if (!path || el.tagName.toLowerCase() !== 'svg') return;
    el.innerHTML = '';
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', path);
    el.append(p);
    el.setAttribute('viewBox', '0 0 24 24');
    el.setAttribute('fill', 'none');
    el.setAttribute('stroke', 'currentColor');
    el.setAttribute('stroke-width', '1.6');
    el.setAttribute('stroke-linecap', 'round');
    el.setAttribute('stroke-linejoin', 'round');
    el.dataset.veTextApplied = 'true';
  }
  function effect(el, config) {
    if (!config || config.type === 'original') return;
    el.dataset.cmsEffect = config.type;
    const existing = el.querySelector(':scope > .motion-atmosphere');
    if (config.type === 'none') {
      if (existing) existing.style.display = 'none';
      return;
    }
    let layer = existing;
    if (!layer) {
      layer = document.createElement('div');
      layer.className = 'motion-atmosphere';
      layer.setAttribute('aria-hidden', 'true');
      el.append(layer);
      el.classList.add('motion-scene');
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    }
    layer.style.display = '';
    layer.replaceChildren();
    layer.style.opacity = String(config.opacity ?? 0.7);
    const count = config.density || 10;
    for (let i = 0; i < count; i++) {
      const f = document.createElement('i');
      f.className = 'motion-fleck';
      f.style.cssText = `--x:${(i * 37 + 11) % 100}%;--size:${config.size || 20}px;--duration:${11 + (i % 6) * 1.5}s;--delay:-${i * 1.37}s;--drift:${45 + (i % 5) * 28}px;--fall:${Math.max(el.clientHeight, 350) + 100}px;`;
      f.style.setProperty(
        'background',
        config.color ||
          { sakura: '#f6aecb', leaves: '#91b66c', sparkles: '#e8cb77', snow: '#ffffff' }[
            config.type
          ] ||
          '#fff',
        'important',
      );
      f.style.height = (config.size || 20) + 'px';
      f.style.borderRadius =
        config.type === 'leaves'
          ? '90% 10% 90% 10%'
          : config.type === 'sakura'
            ? '70% 25% 65% 30%'
            : config.type === 'snow'
              ? '50%'
              : '0';
      if (config.type === 'sparkles')
        f.style.clipPath = 'polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)';
      if (config.type === 'custom' && config.image) {
        f.style.setProperty(
          'background',
          `url("${config.image.replace(/["\\\n\r]/g, '')}") center/contain no-repeat`,
          'important',
        );
        f.style.boxShadow = 'none';
        f.style.borderRadius = '0';
      }
      layer.append(f);
    }
  }
  window.SiteCMS = {
    contact: () => contact,
    sync,
    productImages,
    applyBrand,
    sticker,
    effect,
    product: (id) => current.find((p) => p.id === id),
    brandName: () => brand.name || 'CHASHITSU',
    escape,
  };
})();
