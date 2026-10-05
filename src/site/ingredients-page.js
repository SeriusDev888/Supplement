(() => {
  const flask =
    '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M9 2h6m-5 0v7L4 19q-1 3 2 3h12q3 0 2-3L14 9V2M7 16h10"/><circle cx="12" cy="13" r=".6"/></svg>';
  const sparkle =
    '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="m12 2 2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2ZM20 17l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z"/></svg>';
  const drop =
    '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M12 2S4 11 4 15a8 8 0 0 0 16 0c0-4-8-13-8-13ZM8 15q0 4 4 4"/></svg>';
  const capsule =
    '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="m8 4-4 4a6 6 0 0 0 8 8l4-4a6 6 0 0 0-8-8Zm-3 3 8 8m-3 2 5 5a5 5 0 0 0 7-7l-5-5"/></svg>';
  const entries = [
    {
      id: 'vitamin-c',
      name: 'Vitamin C',
      th: 'วิตามินซี',
      groups: ['daily', 'glow'],
      photo: 'feature-0',
      tone: 'daily',
      copy: 'วิตามินที่เราคุ้นเคยจากผลไม้รสเปรี้ยว เป็นแรงบันดาลใจของความสดใสและการดูแลตัวเองในทุกวัน',
      mini: 'ความสดใสจากเรื่องราวของผลไม้',
      tags: [
        [ico('shield'), 'วิตามิน'],
        [ico('sun'), 'ความสดใส'],
        [ico('bolt'), 'ทุกวัน'],
      ],
    },
    {
      id: 'collagen',
      name: 'Collagen Peptide',
      th: 'คอลลาเจนเปปไทด์',
      groups: ['glow'],
      photo: 'feature-1',
      tone: 'glow',
      copy: 'ทำความรู้จักคอลลาเจนเปปไทด์ หนึ่งในแนวคิดส่วนผสมของ GLOW สำหรับโมเมนต์ที่คุณอยากใส่ใจตัวเอง',
      mini: 'ส่วนหนึ่งของแนวคิดการดูแลตัวเอง',
      tags: [
        [ico('face'), 'แนวคิด GLOW'],
        [sparkle, 'โมเมนต์ของคุณ'],
        [drop, 'ใส่ใจตัวเอง'],
      ],
    },
    {
      id: 'magnesium',
      name: 'Magnesium',
      th: 'แมกนีเซียม',
      groups: ['calm'],
      photo: 'feature-2',
      tone: 'calm',
      copy: 'แร่ธาตุที่อยู่ในแนวคิดของ CALM เชื่อมโยงกับช่วงเวลาที่เราชวนให้ช้าลง พัก และกลับมาดูแลตัวเอง',
      mini: 'แรงบันดาลใจของช่วงเวลาพักผ่อน',
      tags: [
        [ico('moon'), 'โมเมนต์พักผ่อน'],
        [ico('heart'), 'ดูแลตัวเอง'],
        [ico('flower'), 'แนวคิด CALM'],
      ],
    },
    {
      id: 'peach',
      name: 'Peach Extract',
      th: 'สารสกัดลูกพีช',
      groups: ['glow'],
      photo: 'natural-0',
      tone: 'glow',
      copy: 'สีสันและความอ่อนโยนของพีชเป็นแรงบันดาลใจให้กับเรื่องราวความงามจากธรรมชาติของเรา',
      mini: 'แรงบันดาลใจจากความอ่อนโยนของพีช',
    },
    {
      id: 'green-tea',
      name: 'Green Tea Extract',
      th: 'สารสกัดจากชาเขียว',
      groups: ['daily', 'calm'],
      photo: 'natural-1',
      tone: 'daily',
      copy: 'ใบชาเชื่อมโยงธรรมชาติ ผู้คน และวัฒนธรรมญี่ปุ่น เป็นจุดเริ่มต้นของเรื่องราวการคัดสรรด้วยความใส่ใจ',
      mini: 'คุณค่าของความใส่ใจจากวัฒนธรรมชา',
    },
    {
      id: 'rice',
      name: 'Rice Ceramide',
      th: 'เซราไมด์จากข้าว',
      groups: ['glow'],
      photo: 'natural-2',
      tone: 'glow',
      copy: 'สำรวจแนวคิดส่วนผสมจากข้าว วัตถุดิบที่ใกล้ชิดกับวิถีชีวิตญี่ปุ่นและเรื่องราวการดูแลตัวเอง',
      mini: 'แนวคิดการดูแลผิวจากเรื่องราวของข้าว',
    },
    {
      id: 'q10',
      name: 'Coenzyme Q10',
      th: 'โคเอนไซม์คิวเทน',
      groups: ['daily'],
      photo: 'natural-3',
      tone: 'daily',
      copy: 'อีกหนึ่งแนวคิดส่วนผสมในโลกของการดูแลตัวเอง ที่เราหยิบมาเล่าควบคู่กับโมเมนต์เล็ก ๆ ในชีวิตประจำวัน',
      mini: 'แนวคิดสำหรับการใส่ใจตัวเองในทุกวัน',
    },
    {
      id: 'hyaluronic',
      name: 'Hyaluronic Acid',
      th: 'ไฮยาลูรอนิก แอซิด',
      groups: ['glow'],
      photo: 'natural-4',
      tone: 'glow',
      copy: 'แรงบันดาลใจจากความชุ่มฉ่ำและความอ่อนโยน เติมเรื่องราวให้โมเมนต์การดูแลตัวเองในกลุ่ม GLOW',
      mini: 'แรงบันดาลใจจากความชุ่มฉ่ำ',
    },
    {
      id: 'centella',
      name: 'Centella Extract',
      th: 'สารสกัดใบบัวบก',
      groups: ['calm'],
      photo: 'natural-5',
      tone: 'calm',
      copy: 'ใบสีเขียวจากธรรมชาติที่ชวนให้เรานึกถึงความอ่อนโยน และการสร้างพื้นที่เล็ก ๆ ให้ตัวเองได้พัก',
      mini: 'ความอ่อนโยนจากพืชพรรณธรรมชาติ',
    },
  ];
  let filter = 'all',
    expanded = false;
  const photo = (e, extra = '') =>
    `<div class="ig-photo ig-${e.photo} ${extra}" role="img" aria-label="ภาพประกอบ ${e.name}"></div>`;
  function ingredientCard(e) {
    const tags = e.tags || [
      [ico('leaf'), 'ธรรมชาติ'],
      [ico('heart'), 'ใส่ใจตัวเอง'],
      [sparkle, e.tone.toUpperCase()],
    ];
    return `<article class="ig-card ig-tone-${e.tone}">${photo(e, 'ig-card-art')}<div class="ig-card-copy"><h3>${e.name}</h3><h4>${e.th}</h4><p>${e.copy}</p><div class="ig-card-tags">${tags.map(([icon, label]) => `<span>${icon}<small>${label}</small></span>`).join('')}</div></div></article>`;
  }
  function naturalCard(e) {
    return `<article class="ig-natural-card">${photo(e, 'ig-round')}<h3>${e.name}</h3><h4>${e.th}</h4><p>${e.mini}</p></article>`;
  }
  function matches(e) {
    return filter === 'all' || e.groups.includes(filter);
  }
  function resultMarkup() {
    return entries
      .filter((e) => matches(e) && (expanded || entries.indexOf(e) < 3))
      .map(ingredientCard)
      .join('');
  }
  function naturalMarkup() {
    return entries.slice(3).filter(matches).map(naturalCard).join('');
  }
  views.ingredients = () => {
    const arg = location.hash.split('/')[1];
    filter = ['daily', 'glow', 'calm'].includes(arg) ? arg : 'all';
    expanded = false;
    return `<div class="ingredients-reference"><section class="ig-hero"><div class="ig-hero-copy"><div class="eyebrow">OUR INGREDIENTS</div><h1>Pure Ingredients<br>for a Brighter Tomorrow.</h1><h2>คัดสรรแรงบันดาลใจจากธรรมชาติญี่ปุ่น<br>เพื่อสุขภาพที่ดีในทุกวัน</h2><p>CHASHITSU เริ่มต้นจากความใส่ใจในวัตถุดิบ<br class="ig-wide">สำรวจเรื่องราวของส่วนผสมจากธรรมชาติและแนวคิดการดูแลตัวเอง<br class="ig-wide">ที่เราอยากให้เป็นส่วนหนึ่งของชีวิตประจำวัน</p><div class="ig-trust">${[
      [ico('leaf'), '天然由来', 'จากธรรมชาติ'],
      [flask, '科学の視点', 'ใส่ใจในความรู้'],
      [ico('shield'), '品質への想い', 'แนวคิดเรื่องคุณภาพ'],
    ]
      .map(
        ([icon, jp, t]) =>
          `<span><i>${icon}</i><span><strong lang="ja">${jp}</strong><small>${t}</small></span></span>`,
      )
      .join(
        '',
      )}</div></div><span class="ig-sign">Good Ingredients.<br>Better Tomorrows.</span></section>
<div class="ig-content"><div class="ig-filters" role="group" aria-label="กรองส่วนผสมตามกลุ่มผลิตภัณฑ์">${[
      ['all', 'All Ingredients', 'ดูส่วนผสมทั้งหมด', ico('leaf')],
      ['daily', 'DAILY', 'วิตามินและการดูแลตัวเอง', photo(entries[0])],
      ['glow', 'GLOW', 'โมเมนต์ของความงาม', ico('flower')],
      ['calm', 'CALM', 'โมเมนต์แห่งการพักผ่อน', ico('moon')],
    ]
      .map(
        ([id, title, sub, icon]) =>
          `<button data-ig-filter="${id}" aria-pressed="${filter === id}" class="ig-filter ig-filter-${id}"><span class="ig-filter-icon">${icon}</span><span><strong>${title}</strong><small>${sub}</small></span>${id === 'all' ? arrow() : ''}</button>`,
      )
      .join('')}</div>
<section class="ig-featured" id="ingredient-library"><div class="ig-heading"><div><h2 id="ig-list-title">Featured Ingredients</h2><h3>ส่วนผสมเด่นจากธรรมชาติญี่ปุ่น</h3><p>ทำความรู้จักแนวคิดส่วนผสมและเรื่องราวของวัตถุดิบที่เราสนใจ</p></div><button class="btn secondary" data-ig-expand>View All Ingredients ${arrow()}</button></div><div id="ig-status" class="ig-sr-only" role="status" aria-live="polite"></div><div class="ig-grid" id="ig-results">${resultMarkup()}</div></section>
<section class="ig-other"><h2>Other Natural Ingredients</h2><h3>ส่วนผสมธรรมชาติอื่น ๆ ที่เราสนใจ</h3><div class="ig-carousel"><button class="ig-carousel-btn ig-prev" data-ig-scroll="-1" aria-label="เลื่อนดูส่วนผสมก่อนหน้า">‹</button><div class="ig-natural-track" tabindex="0" role="region" aria-label="ส่วนผสมธรรมชาติ เลื่อนซ้ายและขวาเพื่อดูเพิ่มเติม">${naturalMarkup()}</div><button class="ig-carousel-btn ig-next" data-ig-scroll="1" aria-label="เลื่อนดูส่วนผสมถัดไป">›</button></div></section>
<section class="ig-quality"><div class="ig-quality-copy"><h2>From Nature to You</h2><h3>จากธรรมชาติ สู่แนวคิดผลิตภัณฑ์คุณภาพ</h3><p>ความใส่ใจเริ่มตั้งแต่ต้นทางของวัตถุดิบ<br>ไปจนถึงแนวคิดการพัฒนาผลิตภัณฑ์<br>ทำความรู้จักสิ่งที่ CHASHITSU ให้ความสำคัญ</p><a href="#story/quality" class="btn">Learn about our quality ${arrow()}</a></div><ol class="ig-quality-steps"><li><span class="ig-quality-picture ig-quality-nature"></span><strong>1. แรงบันดาลใจ<br>จากธรรมชาติญี่ปุ่น</strong></li><li><span class="ig-quality-picture ig-quality-science">${flask}</span><strong>2. ใส่ใจในความรู้<br>และคุณภาพวัตถุดิบ</strong></li><li><span class="ig-quality-picture ig-quality-capsule">${capsule}</span><strong>3. พัฒนาแนวคิด<br>ด้วยความพิถีพิถัน</strong></li><li><span class="ig-quality-picture ig-quality-product"></span><strong>4. เพื่อโมเมนต์<br>ที่ดีในทุกวัน</strong></li></ol></section></div></div>`;
  };
  function carouselState() {
    const track = main.querySelector('.ig-natural-track');
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    main.querySelector('.ig-prev').disabled = track.scrollLeft <= 2;
    main.querySelector('.ig-next').disabled = track.scrollLeft >= max - 2;
  }
  function updateIngredients() {
    document
      .querySelectorAll('[data-ig-filter]')
      .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.igFilter === filter)));
    main.querySelector('#ig-results').innerHTML = resultMarkup();
    main.querySelector('.ig-natural-track').innerHTML = naturalMarkup();
    main.querySelector('.ig-natural-track').scrollLeft = 0;
    main.querySelector('.ig-other').hidden = expanded;
    main.querySelector('#ig-list-title').textContent = expanded
      ? 'All Ingredients'
      : filter === 'all'
        ? 'Featured Ingredients'
        : filter.toUpperCase() + ' Ingredients';
    main.querySelector('[data-ig-expand]').innerHTML =
      (expanded ? 'Show Featured' : 'View All Ingredients') + ' ' + arrow();
    main.querySelector('#ig-status').textContent =
      `แสดงส่วนผสม ${entries.filter(matches).length} รายการ ในกลุ่ม ${filter === 'all' ? 'ทั้งหมด' : filter.toUpperCase()}`;
    requestAnimationFrame(carouselState);
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-ig-filter]');
    if (b) {
      filter = b.dataset.igFilter;
      expanded = false;
      history.replaceState(null, '', '#ingredients' + (filter === 'all' ? '' : '/' + filter));
      updateIngredients();
    }
    const all = e.target.closest('[data-ig-expand]');
    if (all) {
      expanded = !expanded;
      filter = 'all';
      history.replaceState(null, '', '#ingredients');
      updateIngredients();
    }
    const scroll = e.target.closest('[data-ig-scroll]');
    if (scroll) {
      const track = main.querySelector('.ig-natural-track');
      if (track && track.firstElementChild) {
        const step =
          track.firstElementChild.getBoundingClientRect().width +
          parseFloat(getComputedStyle(track).columnGap);
        track.scrollTo({
          left: (Math.round(track.scrollLeft / step) + Number(scroll.dataset.igScroll)) * step,
          behavior: document.documentElement.classList.contains('motion-off')
            ? 'instant'
            : 'smooth',
        });
      }
    }
  });
  document.addEventListener(
    'scroll',
    (e) => {
      if (e.target.matches?.('.ig-natural-track')) carouselState();
    },
    true,
  );
  window.addEventListener('resize', carouselState);
  function markIngredients() {
    const [route, arg] = location.hash.slice(1).split('/');
    document.body.classList.toggle('on-ingredients', route === 'ingredients');
    if (route === 'ingredients') requestAnimationFrame(carouselState);
    if (route === 'story' && arg === 'quality')
      requestAnimationFrame(() =>
        document.querySelector('.st-philosophy')?.scrollIntoView({ behavior: 'instant' }),
      );
  }
  window.addEventListener('hashchange', markIngredients);
  if (location.hash.startsWith('#ingredients')) render();
  markIngredients();
})();
