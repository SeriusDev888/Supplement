(() => {
  const flask =
    '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 2h6m-5 0v7L4 19q-1 3 2 3h12q3 0 2-3L14 9V2M7 16h10"/></svg>';
  const mountain =
    '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="m2 20 8-15 4 7 3-5 5 13H2Zm5-9 3 2 3-3M5 17h15M17 2v3m-3-2h6"/></svg>';
  views.story = () => `<div class="brand-story">
<section class="st-hero"><div class="st-hero-copy"><div class="eyebrow">OUR STORY</div><h1>From Japan,<br><em>with a little love.</em></h1><p>เรื่องราวของ CHASHITSU เริ่มต้นจากความเชื่อว่า<br>การดูแลสุขภาพที่ดี ไม่จำเป็นต้องซับซ้อน<br>แค่เป็นเรื่องเล็ก ๆ ที่ทำได้ในทุกวัน</p><a class="btn" href="#story" data-scroll="story-chapters">Discover our story ${arrow()}</a></div><div class="st-hero-wave"></div></section>
<div class="st-story-sign">Supplements.<br>for a brighter tomorrow.</div>
<div class="st-chapters" id="story-chapters">
<section class="st-chapter st-chapter-one"><div class="st-chapter-copy"><div class="st-chapter-label">${ico('flower')}<span>Chapter 01</span></div><h2>A Simple Question</h2><h3>จากคำถามเล็ก ๆ สู่จุดเริ่มต้นของแบรนด์</h3><p>เราตั้งคำถามว่า “เราจะทำให้การดูแลสุขภาพ<br class="st-desktop">เป็นเรื่องง่าย และอยู่ในชีวิตประจำวันได้อย่างไร?”<br class="st-desktop">จากคำถามนั้น CHASHITSU จึงเริ่มต้นขึ้น</p></div><div class="st-chapter-visual"><img class="st-photo st-photo-question" src="assets/story-question.png" alt="หญิงสาวชมภูเขาไฟฟูจิท่ามกลางดอกซากุระ" loading="lazy"><blockquote class="st-quote"><span>“</span>สุขภาพที่ดี<br>อาจเริ่มจาก<br>เรื่องเล็ก ๆ<br>ในทุกวัน<span>”</span></blockquote></div></section>
<section class="st-chapter st-chapter-two"><div class="st-chapter-visual"><div class="st-photo st-photo-town" role="img" aria-label="ถนนเมืองเก่าญี่ปุ่นท่ามกลางดอกซากุระ"></div><span class="st-handwritten">Inspired<br>by Japan</span></div><div class="st-chapter-copy"><div class="st-chapter-label">${ico('flower')}<span>Chapter 02</span></div><h2>Looking to Japan</h2><h3>แรงบันดาลใจจากความใส่ใจแบบญี่ปุ่น</h3><p>เราหลงใหลในแนวทางการดูแลสุขภาพของคนญี่ปุ่น<br class="st-desktop">ที่ใส่ใจในคุณภาพของวัตถุดิบ ความสมดุล และการใช้ชีวิต<br class="st-desktop">อย่างมีสติ จึงออกเดินทางเพื่อค้นหาวัตถุดิบและแนวคิด<br class="st-desktop">ที่ดีที่สุดมาสร้างผลิตภัณฑ์ของเรา</p></div></section>
<section class="st-chapter st-chapter-three"><div class="st-chapter-copy"><div class="st-chapter-label">${ico('flower')}<span>Chapter 03</span></div><h2>Turning Inspiration<br>into Supplements</h2><h3>เปลี่ยนแรงบันดาลใจสู่ผลิตภัณฑ์จริง</h3><p>เรานำความรู้จากวัตถุดิบธรรมชาติของญี่ปุ่น<br class="st-desktop">ผสมผสานกับงานวิจัยและมาตรฐานการผลิต<br class="st-desktop">เพื่อสร้างอาหารเสริมที่ตอบโจทย์ชีวิตคนในปัจจุบัน</p></div><div class="st-chapter-visual"><img class="st-photo st-photo-ingredients" src="assets/story-ingredients.png" alt="การคัดเลือกใบชาอย่างพิถีพิถัน" loading="lazy"><span class="st-handwritten st-selected">Carefully<br>Selected<br>Ingredients.</span></div></section>
</div>
<section class="st-philosophy"><div class="st-section-heading"><div class="eyebrow">OUR PHILOSOPHY</div><h2>แนวคิดของ CHASHITSU</h2><p>เราสร้างอาหารเสริมจากความเชื่อ 4 ข้อ เพื่อให้คุณมีสุขภาพที่ดีในทุกวัน</p></div><div class="st-values">${[
    [ico('leaf'), 'Quality Ingredients', 'คัดสรรวัตถุดิบคุณภาพ<br>จากธรรมชาติของญี่ปุ่น'],
    [flask, 'Science-backed', 'อ้างอิงงานวิจัยและ<br>มาตรฐานการผลิต'],
    [ico('heart'), 'Everyday Wellness', 'สุขภาพดีได้<br>ในชีวิตประจำวัน'],
    [mountain, 'Inspired by Japan', 'แรงบันดาลใจจากวัฒนธรรมญี่ปุ่น<br>ที่ใส่ใจในความสมดุล'],
  ]
    .map(
      ([icon, title, copy]) =>
        `<article class="st-value"><span class="st-value-icon">${icon}</span><h3>${title}</h3><p>${copy}</p></article>`,
    )
    .join('')}</div></section>
<section class="st-origins"><div class="st-origins-copy"><div class="eyebrow">THE JAPANESE ORIGINS</div><h2>แหล่งวัตถุดิบจากธรรมชาติทั่วญี่ปุ่น</h2><p>เราร่วมมือกับแหล่งวัตถุดิบที่มีชื่อเสียงในแต่ละภูมิภาคของญี่ปุ่น<br>เพื่อนำคุณค่าจากธรรมชาติมาสู่ผลิตภัณฑ์ของเรา</p><a href="#origins" class="btn">Explore all origins ${arrow()}</a></div><div class="st-map"><img class="st-map-outline" src="assets/japan-outline.svg" alt="แผนที่ประเทศญี่ปุ่น" loading="lazy">${[
    ['Shizuoka', 'Daily Health', 0],
    ['Uji', 'Calm', 2],
    ['Yame', 'Glow', 1],
    ['Kagoshima', 'Balance', 3],
  ]
    .map(
      ([name, theme, i]) =>
        `<a class="st-map-link st-map-${name.toLowerCase()}" href="#origins/${i}"><span class="st-map-thumb region-${i}"></span><span><strong>${name}</strong><em>${theme}</em><b aria-hidden="true">→</b></span></a>`,
    )
    .join(
      '',
    )}<a class="st-map-credit" href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noopener noreferrer">Map: Natural Earth</a></div></section>
<section class="st-closing"><div class="st-closing-copy"><h2>A <em>healthier</em> tomorrow,<br>for your everyday life.</h2><p>CHASHITSU จะยังคงสร้างสรรค์อาหารเสริมที่ดี<br>จากญี่ปุ่น เพื่อเป็นส่วนเล็ก ๆ ที่ทำให้ทุกวันของคุณดีขึ้น</p><div class="actions"><a class="btn" href="#catalog">View our products ${arrow()}</a><a class="btn secondary" href="#wellness">Find Your Wellness ${arrow()}</a></div></div><blockquote class="st-closing-quote">“<br>Less rush.<br>More<br>wellness.<br>”</blockquote></section>
</div>`;
  function markStory() {
    document.body.classList.toggle(
      'on-story',
      (location.hash.slice(1) || 'home').split('/')[0] === 'story',
    );
  }
  window.addEventListener('hashchange', markStory);
  markStory();
  if (document.body.classList.contains('on-story')) render();
})();
