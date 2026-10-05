(() => {
  const esc = SiteCMS.escape,
    lines = (v) => esc(v).replace(/\n/g, '<br>'),
    safeUrl = (v) => {
      try {
        if (/^\/(assets|media)\/[\w./-]+$/.test(v) && !v.includes('..')) return v;
        const u = new URL(v);
        return u.protocol === 'https:' && !u.username && !u.password ? v : '';
      } catch {
        return '';
      }
    };
  const name = (p) => [SiteCMS.brandName(), p.name].filter(Boolean).join(' ');
  const image = (p, url = '', alt = '') =>
    url
      ? `<img src="${esc(safeUrl(url))}" alt="${esc(alt || name(p))}" loading="lazy">`
      : productImage(p.id);
  const gallery = (p) => [{ url: p.image || '', alt: name(p) }, ...ProductDetails.get(p).gallery];
  function productBenefits(p) {
    const benefits = (p.benefits || []).filter(([, text]) => text?.trim());
    if (!benefits.length) return '';
    return `<ul class="pd-benefits" aria-label="จุดเด่นสินค้า">${benefits
      .map(
        ([icon, text]) =>
          `<li><span aria-hidden="true">${ico(icon)}</span><span>${esc(text)}</span></li>`,
      )
      .join('')}</ul>`;
  }
  product = function (id) {
    const p = SiteCMS.product(id);
    if (!p || p.deleted)
      return '<section class="section pd-unavailable"><h1>ไม่พบสินค้านี้</h1><p>สินค้านี้ถูกนำออกจากเว็บไซต์แล้ว</p><a class="btn" href="#catalog">ดูสินค้าทั้งหมด</a></section>';
    const d = ProductDetails.get(p),
      photos = gallery(p),
      all = Object.keys(products)
        .map((key) => SiteCMS.product(key))
        .filter(Boolean),
      related = (
        d.relatedIds.length
          ? d.relatedIds.map((key) => all.find((x) => x.id === key)).filter(Boolean)
          : all
      )
        .filter((x) => x.id !== p.id && x.active !== false)
        .slice(0, 4),
      rating = Number(d.rating),
      count = Number(d.reviewCount),
      ask = safeUrl(d.askUrl || p.buyUrl || '');
    return `<div class="pd-page" data-product-root="${esc(p.id)}"><div class="pd-breadcrumb"><a href="#home">Home</a><span>›</span><a href="#catalog">Products</a><span>›</span>${esc(name(p))}</div>
 <section class="pd-hero product-hero" data-pd-key="hero"><div class="pd-gallery"><div class="pd-thumbnails" aria-label="Product gallery">${photos.map((photo, i) => `<button class="pd-thumb ${i === 0 ? 'is-active' : ''}" data-pd-photo="${i}" data-product="${p.id}" aria-label="View product image ${i + 1}" aria-pressed="${i === 0}">${image(p, photo.url, photo.alt)}</button>`).join('')}</div><div class="pd-main-photo">${image(p, photos[0].url, photos[0].alt)}</div></div>
 <div class="pd-hero-copy"><div class="eyebrow">${esc(p.tag)}</div><h1>${esc(name(p))}</h1><h2>${esc(p.subtitle)}</h2>${rating > 0 ? `<div class="pd-rating"><span aria-label="${rating} out of 5 stars">★★★★★</span> ${rating.toFixed(1)} ${d.reviewUrl ? `<a href="${esc(safeUrl(d.reviewUrl))}" target="_blank" rel="noopener noreferrer">(${count || 0} reviews)</a>` : `<small>(${count || 0} reviews)</small>`}</div>` : ''}<p class="pd-description">${lines(p.description)}</p>${productBenefits(p)}<div class="pd-stock ${d.stockStatus}"><i></i>${{ in_stock: 'In stock', out_of_stock: 'Out of stock', preorder: 'Pre-order', unconfirmed: 'Contact us for availability' }[d.stockStatus]}</div><div class="pd-pricing"><strong class="cms-price">${esc(ProductDetails.price(p) || 'สอบถามราคา')}</strong></div><div class="pd-actions"><button class="btn" data-pd-order="${p.id}" ${d.stockStatus === 'out_of_stock' ? 'disabled' : ''}>${ico('chat')}${esc(d.orderLabel)} ${arrow()}</button>${ask ? `<a class="btn secondary" href="${esc(ask)}" target="_blank" rel="noopener noreferrer">${ico('chat')}${esc(d.askLabel)}</a>` : `<button class="btn secondary" data-dialog="contact">${ico('chat')}${esc(d.askLabel)}</button>`}</div><div class="pd-trust">${d.trust.map((x) => `<div>${ico(x.icon)}<span>${esc(x.title)}<small>${esc(x.text)}</small></span></div>`).join('')}</div></div></section>
 <section class="pd-summary" data-pd-key="summary">${d.summary.map((x) => `<div>${ico(x.icon)}<span><small>${esc(x.label)}</small><strong>${esc(x.value || '—')}</strong></span></div>`).join('')}</section>
 <section class="pd-information pd-tinted" data-pd-key="information" id="ingredients"><h2>Product information</h2><div class="pd-info-body"><div class="pd-overview"><h3>Overview</h3><p>${lines(d.overview)}</p>${d.overviewBullets.length ? `<ul>${d.overviewBullets.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}${d.overviewClosing ? `<p>${lines(d.overviewClosing)}</p>` : ''}</div><div class="pd-facts"><h3>Supplement Facts</h3><p><b>Serving Size:</b> ${esc(d.servingSize || '—')}</p><p><b>Servings Per Container:</b> ${esc(d.servingsPerContainer || '—')}</p><table><thead><tr><th scope="col">Nutrient</th><th scope="col">Amount Per Serving</th><th scope="col">% Daily Value</th></tr></thead><tbody>${d.nutrition.length ? d.nutrition.map((x) => `<tr><th scope="row">${esc(x.name)}</th><td>${esc(x.amount)}</td><td>${esc(x.dailyValue)}</td></tr>`).join('') : `<tr><td colspan="3">ข้อมูลส่วนประกอบจะแสดงเมื่อได้รับการยืนยัน</td></tr>`}</tbody></table>${d.nutritionFootnote ? `<small>${lines(d.nutritionFootnote)}</small>` : ''}</div><div class="pd-information-grid">${d.information.map((x) => `<article>${ico(x.icon)}<div><h3>${esc(x.title)}</h3><p>${lines(x.body || 'โปรดสอบถามข้อมูลจากแบรนด์')}</p></div></article>`).join('')}</div></div></section>
 <section class="pd-certifications pd-tinted" data-pd-key="certificates"><h2>Certifications &amp; Quality</h2><div class="pd-pdf-grid">${d.certificates.length ? d.certificates.map((x) => `<article class="pd-pdf-card"><span class="pd-pdf-icon">${ico('mail')}<small>PDF</small></span><h3>${esc(x.title)}</h3><p>${lines(x.description)}</p>${x.url ? `<a href="${esc(safeUrl(x.url))}" target="_blank" rel="noopener noreferrer" download>Download PDF ${arrow()}</a>` : '<small>ยังไม่มีไฟล์แนบ</small>'}</article>`).join('') : '<p class="pd-empty">เอกสารผลิตภัณฑ์จะแสดงที่นี่เมื่อแบรนด์อัปโหลด</p>'}</div></section>
 ${related.length ? `<section class="pd-related" data-pd-key="related"><h2>You may also like</h2><div class="pd-related-grid">${related.map((x) => `<article><a class="pd-related-image" href="#product/${x.id}">${image(x, x.image)}</a><div><h3>${esc(name(x))}</h3><p>${esc(x.subtitle)}</p><div class="pd-related-bottom"><strong>${esc(ProductDetails.price(x) || 'สอบถามราคา')}</strong><a href="#product/${x.id}" class="pd-view-link">View product</a></div></div></article>`).join('')}</div></section>` : ''}
 <section class="pd-faq" data-pd-key="faq" id="faq"><div class="pd-section-heading"><h2>Questions and answers</h2>${ask ? `<a href="${esc(ask)}" target="_blank" rel="noopener noreferrer">Ask on LINE ${arrow()}</a>` : ''}</div>${d.faq.map((x) => `<details><summary>${esc(x.question)}</summary><p>${lines(x.answer)}</p></details>`).join('')}${!d.faq.length ? '<p class="pd-empty">ติดต่อแบรนด์เพื่อสอบถามข้อมูลเพิ่มเติม</p>' : ''}</section></div>`;
  };
  document.addEventListener('click', (e) => {
    const thumb = e.target.closest('[data-pd-photo]');
    if (thumb) {
      const p = SiteCMS.product(thumb.dataset.product),
        photo = gallery(p)[Number(thumb.dataset.pdPhoto)];
      if (!photo) return;
      const container = thumb.closest('.pd-gallery');
      container.querySelector('.pd-main-photo').innerHTML = image(p, photo.url, photo.alt);
      container.querySelectorAll('.pd-thumb').forEach((t) => {
        t.classList.toggle('is-active', t === thumb);
        t.setAttribute('aria-pressed', String(t === thumb));
      });
    }
    const order = e.target.closest('[data-pd-order]');
    if (order) {
      const p = SiteCMS.product(order.dataset.pdOrder),
        url = safeUrl(p.buyUrl || '');
      document.getElementById('dialog-content').innerHTML =
        `<h2>${esc(name(p))}</h2>${p.price ? `<p>ราคาต่อชิ้น ${esc(p.price)}</p>` : ''}<p>แจ้งชื่อสินค้าและจำนวนกับทีมงานเพื่อยืนยันราคาและการจัดส่ง</p>${url ? `<div class="actions"><a class="btn" href="${esc(url)}" target="_blank" rel="noopener noreferrer">ไปที่ช่องทางสั่งซื้อ ${arrow()}</a></div>` : '<p>แบรนด์ยังไม่ได้ระบุช่องทางสั่งซื้อสำหรับสินค้านี้</p>'}`;
      document.getElementById('info-dialog').showModal();
    }
  });
})();
