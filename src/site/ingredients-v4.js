(() => {
  const main = document.querySelector('main');
  const arrowIcon =
    '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
  const icons = {
    leaf: '<path d="M20 4C10 2 4 7 4 14c0 4 3 6 7 6 7 0 11-7 9-16ZM5 22c3-6 7-9 12-12"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M20 4l-2 2M6 18l-2 2"/>',
    shield: '<path d="M12 2 4 5v6c0 6 3 9 8 11 5-2 8-5 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
    sparkle: '<path d="m12 2 2 7 7 3-7 2-2 8-2-8-7-2 7-3 2-7Z"/>',
    drop: '<path d="M12 2C8 8 5 12 5 16a7 7 0 0 0 14 0c0-4-3-8-7-14Z"/>',
    wave: '<path d="M2 8c3-3 5 3 8 0s5 3 8 0 4 0 4 0M2 15c3-3 5 3 8 0s5 3 8 0 4 0 4 0"/>',
    moon: '<path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10Z"/>',
    heart:
      '<path d="M20.8 8.3c0 4.4-8.8 10.5-8.8 10.5S3.2 12.7 3.2 8.3a4.4 4.4 0 0 1 8.8-.5 4.4 4.4 0 0 1 8.8.5Z"/>',
    flower: '<path d="M12 11c-6-7-11-1-5 3-2 7 6 9 8 2 7 0 8-8 1-9-1-7-9-6-9 1"/>',
  };
  const icon = (name) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
  const features = [
    {
      id: 'vitamin-c',
      number: '01',
      tone: 'daily',
      name: 'Vitamin C',
      thai: 'วิตามินซี',
      copy: 'วิตามินซีจากผลไม้ตระกูลส้ม เป็นสารต้านอนุมูลอิสระที่ช่วยเสริมภูมิคุ้มกัน ลดความอ่อนล้า และมีส่วนช่วยในการสร้างคอลลาเจน',
      art: 'orange',
      note: 'Citrus Goodness<br>from Japan.',
      japanese: '太陽の恵みを、<br>あなたの毎日に。',
      benefits: [
        ['shield', 'เสริมภูมิคุ้มกัน'],
        ['sun', 'ผิวกระจ่างใส'],
        ['sparkle', 'ลดความอ่อนล้า'],
      ],
      facts: [
        ['Source', 'Citrus Fruits<br>(Orange, Acerola, Yuzu)'],
        ['Origin', '<span class="ig4-japan-dot"></span> Japan / Asia'],
        ['Main Nutrient', 'Vitamin C<br>(Ascorbic Acid)'],
      ],
      product: 'daily',
    },
    {
      id: 'collagen',
      number: '02',
      tone: 'glow',
      name: 'Collagen Peptide',
      thai: 'คอลลาเจนเปปไทด์',
      copy: 'คอลลาเจนเปปไทด์คุณภาพสูงจากปลา ช่วยเสริมความยืดหยุ่นให้ผิวดูเรียบเนียน กระจ่างใส และช่วยดูแลสุขภาพข้อและกระดูก',
      art: 'collagen',
      note: 'Marine Collagen<br>from Japan.',
      japanese: '海からの贈り物で、<br>美しさを内側から。',
      benefits: [
        ['sparkle', 'ผิวดูอ่อนเยาว์'],
        ['drop', 'เพิ่มความชุ่มชื้น'],
        ['wave', 'เสริมความยืดหยุ่น'],
      ],
      facts: [
        ['Source', 'Marine Collagen<br>(Fish)'],
        ['Origin', '<span class="ig4-japan-dot"></span> Japan'],
        ['Main Nutrient', 'Collagen Peptide<br>(Type I)'],
      ],
      product: 'glow',
    },
    {
      id: 'magnesium',
      number: '03',
      tone: 'calm',
      name: 'Magnesium',
      thai: 'แมกนีเซียม',
      copy: 'แมกนีเซียมจากแหล่งแร่ธรรมชาติ ช่วยผ่อนคลายความเครียด สนับสนุนการทำงานของระบบประสาทและกล้ามเนื้อ',
      art: 'mineral',
      note: 'Natural Minerals<br>from the Earth.',
      japanese: '',
      benefits: [
        ['moon', 'ช่วยให้ผ่อนคลาย'],
        ['flower', 'นอนหลับสบาย'],
        ['heart', 'ลดความตึงเครียด'],
      ],
      facts: [
        ['Source', 'Natural Mineral<br>(Marine Mineral, Rock Salt)'],
        ['Origin', '<span class="ig4-japan-dot"></span> Japan / Global'],
        ['Main Nutrient', 'Magnesium<br>(Magnesium Citrate)'],
      ],
      product: 'calm',
    },
  ];
  const extras = [
    {
      id: 'peach',
      name: 'Peach Extract',
      thai: 'สารสกัดลูกพีช',
      tone: 'glow',
      tag: 'BEAUTY',
      art: 0,
      copy: 'ช่วยให้ผิวดูสุขภาพดีและเปล่งปลั่ง',
      product: 'glow',
    },
    {
      id: 'green-tea',
      name: 'Green Tea Extract',
      thai: 'สารสกัดชาเขียว',
      tone: 'calm',
      tag: 'BALANCE',
      art: 1,
      copy: 'สารต้านอนุมูลอิสระ ช่วยดูแลสุขภาพโดยรวม',
      product: 'calm',
    },
    {
      id: 'rice',
      name: 'Rice Ceramide',
      thai: 'เซราไมด์จากข้าว',
      tone: 'glow',
      tag: 'MOISTURE',
      art: 2,
      copy: 'ช่วยเพิ่มความชุ่มชื้นให้ผิวและเสริมเกราะป้องกันผิว',
      product: 'glow',
    },
    {
      id: 'q10',
      name: 'Coenzyme Q10',
      thai: 'โคเอนไซม์คิวเทน',
      tone: 'daily',
      tag: 'ENERGY',
      art: 3,
      copy: 'ช่วยในการสร้างพลังงานและลดความอ่อนล้า',
      product: 'daily',
    },
  ];
  function feature(item, index) {
    const art = `<div class="ig4-feature-art ig4-art-${item.art}" role="img" aria-label="ภาพประกอบ ${item.name}">${item.japanese ? `<span class="ig4-art-japanese" lang="ja">${item.japanese}</span>` : ''}<span class="ig4-art-note">${item.note}</span></div>`;
    const copy = `<div class="ig4-feature-copy"><div class="ig4-feature-heading"><span class="ig4-number">${item.number}</span><span class="ig4-tone ig4-tone-${item.tone}">${item.tone.toUpperCase()}</span></div><h2>${item.name}</h2><h3>${item.thai}</h3><p>${item.copy}</p><div class="ig4-benefits">${item.benefits.map(([key, text]) => `<span>${icon(key)}<small>${text}</small></span>`).join('')}</div><dl class="ig4-facts">${item.facts.map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`).join('')}</dl><a class="ig4-detail" href="#product/${item.product}/ingredients">ดูรายละเอียดเพิ่มเติม ${arrowIcon}</a></div>`;
    return `<article class="ig4-feature ig4-feature-${item.tone} ${index % 2 ? 'ig4-reverse' : ''}" id="ig4-${item.id}">${art}${copy}</article>`;
  }
  function extra(item) {
    return `<article class="ig4-small-card" id="ig4-${item.id}"><div class="ig4-small-art ig4-natural-${item.art}" role="img" aria-label="ภาพประกอบ ${item.name}"></div><div class="ig4-small-copy"><h3>${item.name}</h3><p class="ig4-thai">${item.thai}</p><span class="ig4-small-tone ig4-tone-${item.tone}">${item.tag}</span><p>${item.copy}</p><a href="#product/${item.product}/ingredients" aria-label="ดูรายละเอียด ${item.name}">ดูรายละเอียด ${arrowIcon}</a></div></article>`;
  }
  const navItems = [
    ['all', 'All'],
    ['vitamin-c', 'Vitamin C'],
    ['collagen', 'Collagen Peptide'],
    ['magnesium', 'Magnesium'],
    ['peach', 'Peach Extract'],
    ['green-tea', 'Green Tea Extract'],
    ['rice', 'Rice Ceramide'],
    ['q10', 'Coenzyme Q10'],
  ];
  views.ingredients =
    () => `<div class="ingredients-reference ig4-page"><section class="ig4-hero"><div class="ig4-hero-copy"><div class="ig4-eyebrow">INGREDIENTS</div><h1>Japanese<br>Ingredients<br>for Everyday Wellness.</h1><h2>คัดสรรวัตถุดิบคุณภาพจากธรรมชาติญี่ปุ่น<br>เพื่อสุขภาพที่ดีในทุกวัน</h2><p>เราเลือกใช้วัตถุดิบที่มีคุณภาพ ปลอดภัย และผ่านการศึกษาทางวิทยาศาสตร์<br>เพื่อนำมาใช้ในผลิตภัณฑ์เสริมอาหารของเรา</p></div><span class="ig4-hero-japanese" lang="ja">自然のちからを、<br>毎日の健やかさに。</span><span class="ig4-hero-script">Good Ingredients.<br>Brighter Days.</span></section>
  <nav class="ig4-nav" aria-label="ไปยังส่วนผสม"><div class="ig4-nav-track" id="ig4-nav-track">${navItems.map(([id, label], i) => `<button type="button" data-ig4-target="${id}" aria-pressed="${i === 0}" class="${i === 0 ? 'is-active' : ''}">${label}</button>`).join('')}</div><button type="button" class="ig4-nav-next" data-ig4-next aria-label="เลื่อนรายชื่อส่วนผสมไปทางขวา">${arrowIcon}</button></nav>
  <div class="ig4-content" id="ig4-start"><div class="ig4-feature-list">${features.map(feature).join('')}</div><section class="ig4-other" aria-label="ส่วนผสมอื่น ๆ"><div class="ig4-small-grid">${extras.map(extra).join('')}</div></section>
  <section class="ig4-process"><div class="ig4-process-copy"><div class="ig4-eyebrow">FROM NATURE TO YOUR GUMMY</div><h2>จากวัตถุดิบธรรมชาติ สู่เยลลี่ที่คุณทานทุกวัน</h2><p>เราคัดสรรวัตถุดิบคุณภาพจากธรรมชาติ นำมาผ่านกระบวนการผลิตที่ได้มาตรฐาน เพื่อให้คุณได้รับประโยชน์จากสารอาหารในรูปแบบเยลลี่ที่อร่อยและรับประทานง่าย</p><a href="#story/quality" class="ig4-outline-link">ดูขั้นตอนการผลิต ${arrowIcon}</a></div><ol>${[
    ['source', 'คัดเลือกวัตถุดิบ', 'จากธรรมชาติ'],
    ['care', 'สกัดและตรวจสอบ', 'คุณภาพ'],
    ['gummy', 'พัฒนาสูตร', 'ให้อยู่ในรูปแบบเยลลี่'],
    ['moment', 'ผลิตเป็น CHASHITSU', 'Gummy'],
  ]
    .map(
      ([art, a, b], i) =>
        `<li style="--step:${i}"><span class="ig4-process-art ig4-process-${art}"></span><b>${i + 1}</b><strong>${a}<br>${b}</strong></li>`,
    )
    .join(
      '',
    )}</ol></section></div><section class="ig4-banner"><div><h2>“Simple Ingredients.<br>Real Results.”</h2><p>วัตถุดิบที่ดี นำไปสู่เยลลี่ที่ดี<br>เพื่อสุขภาพที่ดีในทุกวัน</p></div><span class="ig4-banner-note">Everyday Wellness<br>in a Gummy.</span></section></div>`;
  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-ig4-target]');
    if (target) {
      const id = target.dataset.ig4Target;
      const behavior = document.documentElement.classList.contains('motion-off')
        ? 'instant'
        : 'smooth';
      document.querySelectorAll('[data-ig4-target]').forEach((button) => {
        const active = button === target;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      const track = document.getElementById('ig4-nav-track');
      // Scroll only the pill strip horizontally; a second scrollIntoView would
      // pull the document back to the strip when animations are disabled.
      track.scrollTo({
        left: target.offsetLeft - track.offsetLeft - (track.clientWidth - target.offsetWidth) / 2,
        behavior,
      });
      document
        .getElementById(id === 'all' ? 'ig4-start' : `ig4-${id}`)
        ?.scrollIntoView({ behavior, block: 'start' });
    }
    const navButton = event.target.closest('[data-ig4-next],[data-ig4-prev]');
    if (navButton) {
      const track = document.getElementById('ig4-nav-track');
      track?.scrollBy({
        left: track.clientWidth * 0.7 * (navButton.hasAttribute('data-ig4-prev') ? -1 : 1),
        behavior: document.documentElement.classList.contains('motion-off') ? 'instant' : 'smooth',
      });
    }
  });
  function updateStrip() {
    const track = document.getElementById('ig4-nav-track');
    if (!track) return;
    let previous = main.querySelector('[data-ig4-prev]');
    if (!previous) {
      previous = document.createElement('button');
      previous.type = 'button';
      previous.className = 'ig4-nav-next ig4-nav-prev';
      previous.setAttribute('data-ig4-prev', '');
      previous.setAttribute('aria-label', 'เลื่อนรายชื่อส่วนผสมไปทางซ้าย');
      previous.innerHTML = arrowIcon;
      track.before(previous);
    }
    const next = main.querySelector('[data-ig4-next]');
    const overflow = track.scrollWidth > track.clientWidth + 2;
    previous.hidden = !overflow;
    next.hidden = !overflow;
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  }
  const update = () => requestAnimationFrame(updateStrip);
  document.addEventListener(
    'scroll',
    (event) => {
      if (event.target.id === 'ig4-nav-track') update();
    },
    true,
  );
  addEventListener('resize', update);
  new MutationObserver(update).observe(main, { childList: true });
  document.fonts.ready.then(update);
  if (location.hash.startsWith('#ingredients')) render();
  update();
})();
