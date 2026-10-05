(() => {
  const v3Items = [
    {
      id: 'vitamin-c',
      name: 'Vitamin C',
      th: 'วิตามินซี',
      groups: ['daily', 'glow'],
      image: 'vitamin',
      primary: true,
      product: 'daily',
      copy: 'วิตามินซีเป็นหนึ่งในแนวคิดส่วนผสมของ DAILY ที่เชื่อมโยงกับเรื่องราวของผลไม้รสเปรี้ยวและการดูแลตัวเองในทุกวัน',
      pills: ['เรื่องราวของผลไม้', 'ความสดใส', 'กิจวัตรประจำวัน'],
    },
    {
      id: 'collagen',
      name: 'Collagen Peptide',
      th: 'คอลลาเจนเปปไทด์',
      groups: ['glow'],
      image: 'collagen',
      primary: true,
      product: 'glow',
      copy: 'สำรวจแนวคิดคอลลาเจนเปปไทด์ในโลกของ GLOW และช่วงเวลาเล็ก ๆ ที่คุณเลือกใส่ใจตัวเอง',
      pills: ['แนวคิด GLOW', 'ความงาม', 'ดูแลตัวเอง'],
    },
    {
      id: 'magnesium',
      name: 'Magnesium',
      th: 'แมกนีเซียม',
      groups: ['calm'],
      image: 'magnesium',
      primary: true,
      product: 'calm',
      copy: 'แร่ธาตุที่อยู่ในแนวคิดของ CALM ชวนให้เรากลับมาให้เวลากับการพัก และสร้างสมดุลในแต่ละวัน',
      pills: ['ช่วงเวลาพัก', 'ความสมดุล', 'แนวคิด CALM'],
    },
    {
      id: 'peach',
      name: 'Peach Extract',
      th: 'สารสกัดลูกพีช',
      groups: ['glow'],
      image: 'natural-0',
      product: 'glow',
      copy: 'แรงบันดาลใจจากความอ่อนโยนของพีช',
      pills: ['ธรรมชาติ', 'แนวคิด GLOW'],
    },
    {
      id: 'tea',
      name: 'Green Tea Extract',
      th: 'สารสกัดชาเขียว',
      groups: ['daily', 'calm'],
      image: 'natural-1',
      product: 'daily',
      copy: 'เรื่องราวของชาเขียวและวัฒนธรรมญี่ปุ่น',
      pills: ['ชาเขียว', 'ธรรมชาติ'],
    },
    {
      id: 'rice',
      name: 'Rice Ceramide',
      th: 'เซราไมด์จากข้าว',
      groups: ['glow'],
      image: 'natural-2',
      product: 'glow',
      copy: 'เรื่องราวการดูแลตัวเองจากข้าว',
      pills: ['ข้าว', 'แนวคิด GLOW'],
    },
    {
      id: 'q10',
      name: 'Coenzyme Q10',
      th: 'โคเอนไซม์คิวเทน',
      groups: ['daily'],
      image: 'natural-3',
      product: 'daily',
      copy: 'แนวคิดสำหรับการใส่ใจตัวเองในทุกวัน',
      pills: ['ทุกวัน', 'แนวคิด DAILY'],
    },
    {
      id: 'hyaluronic',
      name: 'Hyaluronic Acid',
      th: 'ไฮยาลูรอนิก แอซิด',
      groups: ['glow'],
      image: 'natural-4',
      product: 'glow',
      copy: 'แรงบันดาลใจจากความชุ่มฉ่ำ',
      pills: ['โมเมนต์ของคุณ', 'แนวคิด GLOW'],
    },
    {
      id: 'centella',
      name: 'Centella Extract',
      th: 'สารสกัดใบบัวบก',
      groups: ['calm'],
      image: 'natural-5',
      product: 'calm',
      copy: 'ความอ่อนโยนจากพืชพรรณธรรมชาติ',
      pills: ['พืชพรรณ', 'แนวคิด CALM'],
    },
  ];
  const compass =
    '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M20 4c-10-3-17 2-16 11 1 6 9 7 13 2C20 13 21 8 20 4ZM5 22 15 9"/></svg>';
  const flask =
    '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M9 2h6m-5 0v7L4 19q-1 3 2 3h12q3 0 2-3L14 9V2M7 16h10"/></svg>';
  let chosen = 'all',
    allOpen = false;
  const chosenItems = () => v3Items.filter((v) => chosen === 'all' || v.groups.includes(chosen));
  const picture = (v, cls = '') =>
    `<div class="ig3-photo ig3-photo-${v.image} ${cls}" role="img" aria-label="ภาพประกอบ ${v.name}"></div>`;
  function feature(v) {
    return `<article class="ig3-card">${picture(v, 'ig3-card-art')}<span class="ig3-badge ig3-badge-${v.primary ? v.product : 'other'}">${v.primary ? v.product.toUpperCase() : 'INGREDIENT'}</span><div class="ig3-card-body"><h3>${v.name}</h3><h4>${v.th}</h4><p>${v.copy}</p><div class="ig3-pills">${v.pills.map((x) => `<span>${x}</span>`).join('')}</div><a class="ig3-detail" href="#product/${v.product}/ingredients">ดูรายละเอียด ${arrow()}</a></div></article>`;
  }
  function natural(v) {
    return `<article class="ig3-natural">${picture(v, 'ig3-natural-art')}<h3>${v.name}</h3><p>${v.th}</p></article>`;
  }
  function updateResults() {
    const cards = chosenItems();
    const lead = allOpen ? cards : cards.filter((v) => v.primary);
    const other = cards.filter((v) => !v.primary);
    const grid = main.querySelector('#ig3-results');
    if (!grid) return;
    grid.innerHTML = lead.map(feature).join('');
    main.querySelector('#ig3-natural').innerHTML = other.map(natural).join('');
    main.querySelector('.ig3-other').hidden = allOpen;
    main.querySelector('.ig3-reset').hidden = !allOpen;
    main.querySelectorAll('[data-ig3-filter]').forEach((b) => {
      const active = b.dataset.ig3Filter === chosen;
      b.setAttribute('aria-pressed', String(active));
      b.classList.toggle('is-active', active);
    });
    main
      .querySelectorAll('[data-ig3-all]')
      .forEach(
        (b) =>
          (b.innerHTML = (allOpen ? 'กลับไปส่วนผสมเด่น' : 'ดูวัตถุดิบทั้งหมด') + ' ' + arrow()),
      );
    main.querySelector('#ig3-count').textContent =
      `แสดง ${cards.length} ส่วนผสมในกลุ่ม ${chosen === 'all' ? 'ทั้งหมด' : chosen.toUpperCase()}`;
  }
  views.ingredients = () => {
    const routeGroup = location.hash.split('/')[1];
    chosen = ['daily', 'glow', 'calm'].includes(routeGroup) ? routeGroup : 'all';
    allOpen = false;
    return `<div class="ingredients-reference ig3-page">
<section class="ig3-hero"><div class="ig3-hero-copy"><div class="ig3-eyebrow">INGREDIENTS</div><h1>Pure Ingredients<br>for Everyday Wellness.</h1><h2>คัดสรรแรงบันดาลใจจากธรรมชาติญี่ปุ่น<br>เพื่อสุขภาพที่ดีในทุกวัน</h2><p>CHASHITSU เล่าเรื่องวัตถุดิบและความใส่ใจผ่านแนวคิดของแต่ละสูตร<br>สำรวจส่วนผสมที่เราสนใจ เพื่อสร้างกิจวัตรการดูแลตัวเองที่เรียบง่าย</p><div class="ig3-trust">${[
      [compass, 'Nature Inspired', 'จากธรรมชาติ'],
      [flask, 'Thoughtful Selection', 'เลือกอย่างใส่ใจ'],
      [ico('shield'), 'Quality Matters', 'ความพิถีพิถัน'],
      [ico('heart'), 'Everyday Wellness', 'ในทุกวัน'],
    ]
      .map(
        ([icon, title, th]) =>
          `<span>${icon}<span><strong>${title}</strong><small>${th}</small></span></span>`,
      )
      .join(
        '',
      )}</div></div><span class="ig3-japanese" lang="ja">自然のちからを、<br>毎日の健やかさに。</span><span class="ig3-script">Ingredients<br>from Japanese Nature.</span></section>
<div class="ig3-content"><section class="ig3-key"><div class="ig3-key-head"><div><div class="ig3-eyebrow">KEY INGREDIENTS</div><h2>วัตถุดิบหลักในแต่ละสูตร</h2></div><div class="ig3-filters" role="group" aria-label="กรองส่วนผสมตามสูตร">${[
      ['all', 'All', ''],
      ['daily', 'DAILY', 'สุขภาพกาย'],
      ['glow', 'GLOW', 'ความงาม'],
      ['calm', 'CALM', 'การผ่อนคลาย'],
    ]
      .map(
        ([id, title, desc]) =>
          `<button data-ig3-filter="${id}" aria-pressed="${chosen === id}" class="ig3-filter ig3-filter-${id}"><strong>${title}</strong>${desc ? `<small>${desc}</small>` : ''}</button>`,
      )
      .join(
        '',
      )}</div><button class="ig3-reset" data-ig3-reset hidden>← กลับไปส่วนผสมเด่น</button></div><div id="ig3-count" class="ig3-sr" role="status" aria-live="polite"></div><div id="ig3-results" class="ig3-grid">${chosenItems()
      .filter((v) => v.primary)
      .map(feature)
      .join('')}</div></section>
<section class="ig3-other"><div class="ig3-other-head"><div><div class="ig3-eyebrow">OTHER INGREDIENTS</div><h2>ส่วนผสมธรรมชาติอื่น ๆ ที่เราสนใจ</h2></div><button data-ig3-all class="ig3-underlink">ดูวัตถุดิบทั้งหมด ${arrow()}</button></div><div id="ig3-natural" class="ig3-natural-grid">${chosenItems()
      .filter((v) => !v.primary)
      .map(natural)
      .join('')}</div></section>
<section class="ig3-process"><div class="ig3-process-copy"><div class="ig3-eyebrow">FROM NATURE TO YOU</div><h2>จากธรรมชาติ สู่แนวคิดผลิตภัณฑ์คุณภาพ</h2><p>เราหยิบแรงบันดาลใจจากแหล่งธรรมชาติของญี่ปุ่นมาพัฒนาเป็นเรื่องราวของผลิตภัณฑ์ ด้วยความใส่ใจในแต่ละขั้นตอน</p><a href="#story/quality" class="btn secondary">ดูขั้นตอนการคัดสรร ${arrow()}</a></div><ol>${[
      ['tea', 'คัดเลือกวัตถุดิบ', 'จากธรรมชาติญี่ปุ่น'],
      ['water', 'ใส่ใจคุณภาพ', 'อย่างพิถีพิถัน'],
      ['capsules', 'พัฒนาแนวคิด', 'ด้วยความตั้งใจ'],
      ['bottle', 'ส่งมอบช่วงเวลา', 'ที่ดีในทุกวัน'],
    ]
      .map(
        ([id, a, b], i) =>
          `<li style="--step:${i}"><span class="ig3-process-art ig3-process-${id}"></span><b>${i + 1}</b><strong>${a}<br>${b}</strong></li>`,
      )
      .join('')}</ol></section></div>
<section class="ig3-banner"><div><h2>Japanese Ingredients<br>for a Healthier Tomorrow.</h2><p>พลังจากธรรมชาติญี่ปุ่น เพื่อสุขภาพที่ดีในทุกวัน</p></div><a class="btn secondary" href="#catalog">Explore Our Products ${arrow()}</a></section></div>`;
  };
  document.addEventListener('click', (e) => {
    const f = e.target.closest('[data-ig3-filter]');
    if (f) {
      chosen = f.dataset.ig3Filter;
      allOpen = false;
      history.replaceState(null, '', '#ingredients' + (chosen === 'all' ? '' : '/' + chosen));
      updateResults();
    }
    const reset = e.target.closest('[data-ig3-reset]');
    if (reset) {
      allOpen = false;
      updateResults();
    }
    const all = e.target.closest('[data-ig3-all]');
    if (all) {
      allOpen = !allOpen;
      chosen = 'all';
      history.replaceState(null, '', '#ingredients');
      updateResults();
      main.querySelector('.ig3-key')?.scrollIntoView({
        behavior: document.documentElement.classList.contains('motion-off') ? 'instant' : 'smooth',
      });
    }
  });
  if (location.hash.startsWith('#ingredients')) render();
})();
