(() => {
  const sourceStories = [
    {
      headline: 'The Heart of Japanese Wellness',
      intro: 'ต้นกำเนิดของสุขภาพที่ดีในทุกวัน',
      description:
        'ชิซูโอกะ (Shizuoka) คือดินแดนแห่งชาเขียว ภูเขา และธรรมชาติอันงดงาม ภูมิทัศน์และวัฒนธรรมชาของที่นี่คือแรงบันดาลใจให้ CHASHITSU ใส่ใจในคุณค่าของธรรมชาติ และการดูแลตัวเองในทุกช่วงของชีวิต',
      place: 'ธรรมชาติอันอุดมสมบูรณ์ของชิซูโอกะ',
      placeText:
        'จากทิวเขาไปจนถึงชายฝั่ง ชิซูโอกะมีภูมิทัศน์ที่หลากหลายและวัฒนธรรมชาอันโดดเด่น ไร่ชาสีเขียวและภาพภูเขาไฟฟูจิสะท้อนความสงบที่เป็นจุดเริ่มต้นของเรื่องราวนี้',
      people: 'ผู้คนที่สืบสานคุณภาพ',
      peopleText:
        'ความใส่ใจของผู้ปลูกชา ตั้งแต่การดูแลต้นชาไปจนถึงการเก็บเกี่ยว เป็นแรงบันดาลใจให้เราเห็นคุณค่าของรายละเอียดเล็ก ๆ และความพิถีพิถันในทุกขั้นตอน',
      ingredient: 'ชาเขียวคุณภาพสูง',
      ingredientText:
        'สีเขียวสด กลิ่นหอม และเอกลักษณ์ของใบชา ทำให้ชาเขียวเป็นส่วนหนึ่งของวัฒนธรรมญี่ปุ่น และเป็นแรงบันดาลใจด้านวัตถุดิบธรรมชาติของ CHASHITSU',
      signature: 'From Nature,\nto Your Daily Wellness.',
      productIntro: 'Daily Vitamin / 毎日の健に',
      productText:
        'แนวคิดอาหารเสริมสำหรับการดูแลตัวเองในทุกวัน\nที่ได้รับแรงบันดาลใจจากธรรมชาติและความใส่ใจของชิซูโอกะ',
    },
    {
      headline: 'The Beauty of Patient Care',
      intro: 'ความใส่ใจที่งดงามในทุกรายละเอียด',
      description:
        'ยาเมะ (Yame) ในจังหวัดฟุกุโอกะ มีเรื่องราวของชาและงานฝีมือที่สืบทอดกันมา ความละเมียดละไมของผู้คนและธรรมชาติเป็นแรงบันดาลใจให้ CHASHITSU มองเห็นความงามในช่วงเวลาเล็ก ๆ ของทุกวัน',
      place: 'ความสงบในชนบทของยาเมะ',
      placeText:
        'ทิวทัศน์ไร่ชาและย่านเมืองเก่าของยาเมะชวนให้ค่อย ๆ ใช้เวลา มองเห็นรายละเอียดรอบตัว และสัมผัสเสน่ห์ของวัฒนธรรมท้องถิ่นในฟุกุโอกะ',
      people: 'ความพิถีพิถันที่ส่งต่อกันมา',
      peopleText:
        'งานฝีมือและวัฒนธรรมชาของยาเมะสะท้อนความอดทนและความใส่ใจ เราหยิบแรงบันดาลใจนี้มาเล่าเรื่องการดูแลตัวเองอย่างอ่อนโยนและสม่ำเสมอ',
      ingredient: 'เสน่ห์ของชายาเมะ',
      ingredientText:
        'ยาเมะเป็นที่รู้จักในเรื่องชา รวมถึงเกียวคุโระ เรื่องราวของชาที่ต้องอาศัยการดูแลอย่างพิถีพิถัน สะท้อนแนวคิดการคัดสรรด้วยความใส่ใจของเรา',
      signature: 'A Little Care,\na Lovely Glow.',
      productIntro: 'Collagen / 輝く毎日に',
      productText:
        'ช่วงเวลาสำหรับการดูแลตัวเองอย่างอ่อนโยน\nกับแนวคิด GLOW ที่ได้แรงบันดาลใจจากความพิถีพิถันของยาเมะ',
    },
    {
      headline: 'The Art of a Quieter Moment',
      intro: 'ค้นพบความสมดุลในจังหวะที่ช้าลง',
      description:
        'อุจิ (Uji) ในเกียวโต เชื่อมโยงเรื่องราวของชาเข้ากับวัฒนธรรมและช่วงเวลาแห่งความสงบ CHASHITSU หยิบแรงบันดาลใจนี้มาเป็นคำชวนให้พัก หายใจ และกลับมาใส่ใจตัวเอง',
      place: 'ทิวทัศน์และวัฒนธรรมชาของอุจิ',
      placeText:
        'ท่ามกลางเสน่ห์ของเกียวโต อุจิเป็นจุดหมายที่ผูกพันกับชา บรรยากาศของเมืองและพิธีชงชาชวนให้เราให้เวลากับสิ่งที่อยู่ตรงหน้า',
      people: 'ผู้รักษาจังหวะแห่งความสงบ',
      peopleText:
        'ความตั้งใจในทุกขั้นตอนของการเตรียมชา ทำให้เรื่องธรรมดากลายเป็นช่วงเวลาพิเศษ แนวคิดนี้เป็นแรงบันดาลใจให้การดูแลตัวเองเรียบง่ายและมีความหมาย',
      ingredient: 'เรื่องราวของชาอุจิ',
      ingredientText:
        'ชาอุจิเป็นส่วนหนึ่งของเอกลักษณ์ท้องถิ่นที่มีชื่อเสียง เรานำบรรยากาศและความใส่ใจในวัฒนธรรมชามาเป็นแรงบันดาลใจของช่วงเวลาแห่งการพักผ่อน',
      signature: 'A Softer Pace,\na Moment of Calm.',
      productIntro: 'Magnesium / やさしい休息',
      productText:
        'แนวคิดสำหรับช่วงเวลาที่คุณอยากพักและช้าลง\nได้รับแรงบันดาลใจจากความสงบของวัฒนธรรมชาอุจิ',
    },
    {
      headline: 'Inspired by Nature’s Energy',
      intro: 'สมดุลจากธรรมชาติทางตอนใต้ของญี่ปุ่น',
      description:
        'คาโกชิมะ (Kagoshima) ทางตอนใต้ของเกาะคิวชู มีทิวทัศน์ภูเขาไฟและวัฒนธรรมชาอันเป็นเอกลักษณ์ ธรรมชาติที่หลากหลายชวนให้เราเปิดรับมุมมองใหม่ และค้นพบสมดุลในชีวิตประจำวัน',
      place: 'ธรรมชาติที่มีเอกลักษณ์ของคาโกชิมะ',
      placeText:
        'ภูมิทัศน์ภูเขาไฟและไร่ชาทางตอนใต้ของญี่ปุ่น สร้างภาพจำที่แตกต่างให้กับคาโกชิมะ และเป็นแรงบันดาลใจของความเชื่อมโยงระหว่างธรรมชาติกับชีวิต',
      people: 'ความใส่ใจที่เติบโตไปกับธรรมชาติ',
      peopleText:
        'การใช้ชีวิตร่วมกับสภาพแวดล้อมและการดูแลผลผลิตในแต่ละฤดูกาล เป็นแรงบันดาลใจให้เรามองการดูแลตัวเองเป็นเรื่องของความสม่ำเสมอและสมดุล',
      ingredient: 'ชาเขียวจากตอนใต้ของญี่ปุ่น',
      ingredientText:
        'คาโกชิมะเป็นหนึ่งในแหล่งชาของญี่ปุ่น เรื่องราวของพื้นที่และความหลากหลายทางธรรมชาติ ชวนให้เราเห็นคุณค่าของการเลือกสรรและความใส่ใจในต้นทาง',
      signature: 'Rooted in Nature,\nMade for Balance.',
      productIntro: 'Magnesium / やさしい休息',
      productText:
        'แนวคิดเพื่อช่วงเวลาแห่งความสมดุลในทุกวัน\nที่เชื่อมโยงกับแรงบันดาลใจจากธรรมชาติของคาโกชิมะ',
    },
  ];
  const titles = ['Shizuoka', 'Fukuoka / Yame', 'Kyoto / Uji', 'Kagoshima / Chiran'];
  const short = [
    'The Heart of Japanese Wellness',
    'The Beauty of Patient Care',
    'The Art of a Quieter Moment',
    'Inspired by Nature’s Energy',
  ];
  const searchIcon =
    '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="10" cy="10" r="7"/><path d="m15 15 7 7"/></svg>';
  const bowlIcon =
    '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M3 11h18c0 12-18 12-18 0ZM7 22h10M12 9l8-7M14 10l8-7"/></svg>';
  function leafDecoration() {
    return `<span class="or-leaf or-leaf-a" aria-hidden="true">${ico('leaf')}</span><span class="or-leaf or-leaf-b" aria-hidden="true">${ico('leaf')}</span><span class="or-leaf or-leaf-c" aria-hidden="true">${ico('leaf')}</span>`;
  }
  originsPage = function () {
    const i = selectedOrigin,
      o = origins[i],
      s = sourceStories[i],
      p = products[o.product];
    return `<div class="origins-reference or-region-${i}">
<section class="or-hero"><div class="or-hero-art region-${i}" aria-hidden="true"></div><div class="or-hero-wash"></div><div class="or-hero-copy"><div class="or-breadcrumb"><a href="#origins">Origins</a><span>›</span>${o.name}</div><h1>${o.name}</h1><div class="or-subtitle">${s.headline}</div><div class="or-jp" lang="ja">${o.jp}</div><h2>${s.intro}</h2><p>${s.description}</p></div><div class="or-map"><img src="assets/japan-outline.svg" alt="แผนที่ญี่ปุ่นและแหล่งแรงบันดาลใจทั้ง 4 พื้นที่"><div class="or-map-points">${origins.map((v, n) => `<button class="or-pin or-pin-${n} ${n === i ? 'is-selected' : ''}" data-region="${n}" aria-label="ดูเรื่องราว ${v.name}" aria-pressed="${n === i}"><i></i><span>${v.name}</span></button>`).join('')}</div></div>${leafDecoration()}</section>
<div class="or-content"><div class="or-tabs" role="tablist" aria-label="เลือกแหล่งวัตถุดิบ">${origins.map((v, n) => `<button id="origin-tab-${n}" role="tab" aria-controls="origin-panel" aria-selected="${n === i}" tabindex="${n === i ? 0 : -1}" data-region="${n}">${v.name}</button>`).join('')}</div>
<div id="origin-panel" role="tabpanel" aria-labelledby="origin-tab-${i}">
<section class="or-row or-place"><div class="or-picture or-place-picture region-${i}" role="img" aria-label="ภาพบรรยากาศที่ได้รับแรงบันดาลใจจาก ${o.name}"><span class="or-script">From Nature.<br>To a Brighter Tomorrow.</span></div><div class="or-copy"><h2><span>01</span>The Place</h2><h3>${s.place}</h3><p>${s.placeText}</p></div></section>
<section class="or-row or-people"><div class="or-copy"><h2><span>02</span>The People</h2><h3>${s.people}</h3><p>${s.peopleText}</p></div><div class="or-picture"><img src="assets/origin-people.png" alt="ภาพประกอบผู้ปลูกชาแลกเปลี่ยนความรู้ในไร่ชา" loading="lazy"><span class="or-script or-script-top">People<br>Behind the Wellness.</span></div></section>
<section class="or-row or-ingredient"><div class="or-picture"><img src="assets/origin-leaves.png" alt="ยอดใบชาเขียวท่ามกลางแสงธรรมชาติ" loading="lazy"><span class="or-script">The Power<br>of Green Tea.</span></div><div class="or-copy"><h2><span>03</span>The Ingredient</h2><h3>${s.ingredient}</h3><p>${s.ingredientText}</p></div></section>
<section class="or-formula"><div class="or-copy"><h2><span>04</span>From Source to Formula</h2><h3>จากธรรมชาติ สู่แนวคิดอาหารเสริมของเรา</h3></div><ol class="or-process">${[[ico('leaf'), 'Japan', 'The Origin'], [ico('leaf'), 'Ingredient', 'Selection'], [searchIcon, 'Quality', 'Inspection'], [bowlIcon, 'Formulation', 'with Care'], ...(p.deleted ? [] : [[productImage(o.product), 'CHASHITSU', p.name]])].map(([icon, title, desc], n) => `<li style="--step:${n}"><span class="or-step-icon ${n === 4 ? 'or-step-bottle' : ''}">${icon}</span><strong>${title}</strong><small>${desc}</small>${n < 4 ? `<b class="or-process-arrow" aria-hidden="true">${arrow()}</b>` : ''}</li>`).join('')}</ol><img class="or-matcha" src="assets/origin-matcha.png" alt="" loading="lazy"><span class="or-formula-sign">${s.signature.replace('\n', '<br>')}</span></section>
<section class="or-product" ${p.deleted ? 'hidden' : ''}><div class="or-product-art">${productImage(o.product)}</div><div class="or-product-copy"><div class="or-born">Born from this story.</div><h2>CHASHITSU &nbsp;${p.name}</h2><h3>${p.modifiedFields?.includes('cardSubtitle') ? p.cardSubtitle : p.modifiedFields?.includes('title') ? p.title : s.productIntro}</h3><p>${(p.modifiedFields?.includes('cardDescription') ? p.cardDescription : p.modifiedFields?.includes('description') ? p.description : s.productText).replace('\n', '<br>')}</p><div class="or-benefits">${[
      [
        o.product === 'calm' ? 'moon' : 'shield',
        o.product === 'calm' ? 'ช่วงเวลาแห่งการพักผ่อน' : 'ความใส่ใจในทุกวัน',
      ],
      [
        o.product === 'glow' ? 'flower' : 'sun',
        o.product === 'glow' ? 'โมเมนต์ของความงาม' : 'ดูแลตัวเองอย่างสม่ำเสมอ',
      ],
      ['heart', 'เพื่อวันที่สมดุล'],
    ]
      .map(([icon, t]) => `<span>${ico(icon)}<small>${t}</small></span>`)
      .join(
        '',
      )}</div><div class="actions"><a href="#product/${o.product}" class="btn">Discover CHASHITSU ${p.name} ${arrow()}</a><a href="#product/${o.product}/ingredients" class="btn secondary">View Ingredients ${arrow()}</a></div></div></section>
</div><section class="or-explore"><div class="or-explore-heading"><h2>Explore Other Origins</h2><p>ค้นพบแหล่งแรงบันดาลใจอื่น ๆ ของเรา</p></div><div class="or-cards">${origins.map((v, n) => `<a class="or-card" href="#origins/${n}" ${n === i ? 'aria-current="page"' : ''}><div class="or-card-art region-${n}" role="img" aria-label="ภาพบรรยากาศ ${v.name}"></div><div class="or-card-copy"><h3>${titles[n]}</h3><p>${short[n]}</p><span class="round-arrow">${arrow()}</span></div></a>`).join('')}</div></section><div class="or-source-note"><a href="https://www.japan.travel/en/local-specialities/local-foods/" target="_blank" rel="noopener noreferrer">Discover Japanese tea culture · JNTO</a><span>ภาพประกอบแนวคิดของแบรนด์</span></div></div></div>`;
  };
  views.origins = originsPage;
  function selectRegion(n, focus) {
    if (n < 0 || n > 3) return;
    const y = scrollY;
    selectedOrigin = n;
    main.innerHTML = originsPage();
    history.replaceState(null, '', '#origins/' + n);
    document.title = 'CHASHITSU — ' + origins[n].name;
    window.scrollTo({ top: y, behavior: 'instant' });
    if (focus) document.getElementById('origin-tab-' + n)?.focus({ preventScroll: true });
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-region]');
    if (b) {
      e.preventDefault();
      selectRegion(Number(b.dataset.region), true);
    }
  });
  document.addEventListener('keydown', (e) => {
    const b = e.target.closest('.or-tabs [role="tab"]');
    if (!b) return;
    let next = Number(b.dataset.region);
    if (e.key === 'ArrowRight') next = (next + 1) % 4;
    else if (e.key === 'ArrowLeft') next = (next + 3) % 4;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = 3;
    else return;
    e.preventDefault();
    selectRegion(next, true);
  });
  function markOrigins() {
    const parts = location.hash.slice(1).split('/');
    document.body.classList.toggle('on-origins', parts[0] === 'origins');
    if (parts[0] === 'origins') document.title = 'CHASHITSU — ' + origins[selectedOrigin].name;
    if (parts[0] === 'product' && parts[2] === 'ingredients')
      requestAnimationFrame(() =>
        document
          .getElementById('ingredients')
          ?.scrollIntoView({ behavior: 'instant', block: 'start' }),
      );
  }
  window.addEventListener('hashchange', markOrigins);
  if (location.hash.startsWith('#origins')) render();
  markOrigins();
})();
