const iconPaths = {
  arrow: 'M5 12h14m-5-5 5 5-5 5',
  leaf: 'M20 4C9 2 2 9 6 16c7 5 15-1 14-12ZM6 18 17 7M4 21l4-7',
  flower: 'M12 8c-5-9-10 0-5 3-9 3-2 11 3 6 1 9 10 5 7-1 8 1 7-8 1-8 3-7-6-9-6 0Z',
  shield: 'M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Zm-4 9 3 3 5-6',
  heart: 'M12 20S2 14 3 8c1-6 8-5 9 0 2-5 9-6 10 0 1 6-10 12-10 12Z',
  bolt: 'm13 2-9 12h7l-1 8 10-13h-7l1-7Z',
  moon: 'M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z',
  face: 'M7 5c0-4 10-4 10 0M5 7c0-4 14-4 14 0v7c0 9-14 9-14 0V7Zm3 5h1m6 0h1m-6 4q2 2 4 0',
  sun: 'M12 3V1m0 22v-2M3 12H1m22 0h-2M5 5 3 3m16 16 2 2M5 19l-2 2M19 5l2-2M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12',
  hand: 'M7 13V6c0-3 3-3 3 0v5-7c0-3 3-3 3 0v7-6c0-3 3-3 3 0v7-4c0-3 3-3 3 0v7c0 9-11 9-13 4l-3-5c-1-3 2-4 4-1Z',
  mail: 'M3 5h18v14H3V5Zm0 0 9 8 9-8',
  chat: 'M4 4h16v13H9l-5 4V4Zm4 5h8m-8 4h6',
  pin: 'M12 22S4 13 4 9a8 8 0 1 1 16 0c0 4-8 13-8 13ZM12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
};
function ico(name) {
  return `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${iconPaths[name] || iconPaths.leaf}"/></svg>`;
}
const arrow = () => ico('arrow');
const homeProducts = {
  daily: {
    sub: 'Daily Vitamin / 毎日の健に',
    desc: 'วิตามินรวมและสารอาหารที่จำเป็น<br>สำหรับร่างกายในทุกวัน',
    benefits: [
      ['shield', 'เสริมภูมิคุ้มกัน'],
      ['heart', 'ดูแลสุขภาพโดยรวม'],
      ['bolt', 'เพิ่มพลังในแต่ละวัน'],
    ],
  },
  glow: {
    sub: 'Collagen / 輝く毎日に',
    desc: 'คอลลาเจนเพื่อผิวกระจ่างใส<br>และดูสุขภาพดีจากภายใน',
    benefits: [
      ['face', 'ผิวกระจ่างใส'],
      ['hand', 'ยืดหยุ่น'],
      ['sun', 'ลดริ้วรอย'],
    ],
  },
  calm: {
    sub: 'Magnesium / やさしい休息',
    desc: 'แมกนีเซียมเพื่อการพักผ่อน<br>และสมดุลของระบบประสาท',
    benefits: [
      ['leaf', 'ผ่อนคลาย'],
      ['moon', 'นอนหลับสบาย'],
      ['heart', 'ลดความเครียด'],
    ],
  },
};
productImage = function (id) {
  return `<div class="v2-bottle bottle-${id}" role="img" aria-label="CHASHITSU ${products[id].name}"></div>`;
};
function homeProductCard(id) {
  const p = homeProducts[id];
  return `<article class="hp-card hp-${id}"><a href="#product/${id}" class="hp-art" aria-label="CHASHITSU ${products[id].name}">${productImage(id)}</a><div class="hp-info"><h3>CHASHITSU ${products[id].name}</h3><div class="hp-sub">${p.sub}</div><p>${p.desc}</p><div class="hp-benefits">${p.benefits.map(([i, t]) => `<div><span>${ico(i)}</span><small>${t}</small></div>`).join('')}</div><a class="btn" href="#product/${id}">ดูรายละเอียด ${arrow()}</a></div></article>`;
}
const regionTitles = ['Shizuoka', 'Fukuoka / Yame', 'Kyoto / Uji', 'Kagoshima / Chiran'];
const regionCopy = [
  'แหล่งชาเขียวชั้นดีแห่งความบริสุทธิ์<br>และวัตถุดิบคุณภาพ',
  'ต้นตำรับของวัตถุดิบ<br>เพื่อความงามจากภายใน',
  'สมุนไพรและสารสกัด<br>เพื่อการผ่อนคลาย',
  'วัตถุดิบจากธรรมชาติ<br>อันทรงพลังจากดินภูเขาไฟ',
];
home = function () {
  return `<div class="reference-home"><section class="rh-hero"><div class="rh-hero-copy"><div class="eyebrow">CHASHITSU · JAPANESE SUPPLEMENTS</div><h1>Your supplements.<br>Your lovely moment.</h1><div class="rh-tagline">A little boost. A lovely day.</div><p>CHASHITSU คืออาหารเสริมที่ได้รับแรงบันดาลใจจากธรรมชาติและ<br class="wide-only">วัฒนธรรมญี่ปุ่น คัดสรรวัตถุดิบคุณภาพ สูตรเฉพาะที่ช่วยดูแลคุณ<br class="wide-only">ในทุกช่วงของชีวิตเล็กๆ ให้เต็มไปด้วยความสุขมากขึ้น</p><div class="actions"><a class="btn" href="#catalog">Find your supplements ${arrow()}</a><a class="underlink" href="#story">Our Story ${arrow()}</a></div><div class="rh-trust"><span>${ico('leaf')} Inspired by Japan</span><span>${ico('shield')} Quality Ingredients</span><span>${ico('heart')} For Your Everyday Life</span></div></div><div class="rh-seal"><small>MADE FROM</small><strong>JAPAN</strong><small>PREMIUM INGREDIENTS</small><span>富士山</span></div><div class="rh-signature">Supplements.<br>with a little love.</div><div class="rh-wave"></div></section>
<section class="rh-beginning"><div class="rh-beginning-copy"><div class="eyebrow">THE BEGINNING OF CHASHITSU</div><h2>อาหารเสริมเล็กๆ<br>เพื่อวันพรุ่งนี้ที่ดีกว่า</h2><p>Simple supplements for a brighter, healthier tomorrow.<br>Crafted from Japan’s wellness heritage with care for your everyday life.</p></div><div class="rh-circles">${[
    ['daily', 'leaf', 'Care', 'Daily Vitamin', 'ดูแลร่างกาย<br>ในทุกวัน'],
    ['glow', 'flower', 'Glow', 'Glow Collagen', 'เพื่อผิวกระจ่างใส<br>อย่างเป็นธรรมชาติ'],
    ['calm', 'leaf', 'Balance', 'Calm Magnesium', 'ผ่อนคลาย<br>และสมดุลทั้งร่างกาย'],
  ]
    .map(
      ([id, icon, title, sub, copy]) =>
        `<a class="rh-circle ${id}" href="#product/${id}">${ico(icon)}<strong>${title}</strong><small>${sub}</small><span>${copy}</span><b>${arrow()}</b></a>`,
    )
    .join('')}</div></section>
<section class="rh-landscape"><div><h2>Less rush.<br>More wellness.</h2><p>สุขภาพดี เริ่มได้จากเรื่องเล็ก ๆ ในทุกวัน</p><a class="btn" href="#story">Explore our story ${arrow()}</a></div><span class="japanese-vertical" lang="ja">毎日に、<br>ちょっと素敵に。</span></section>
<section class="rh-origins rh-container"><div class="rh-heading"><div><h2>Stories from the wellness sources</h2><p>เราเอาแรงบันดาลใจจากแต่ละภูมิภาคของญี่ปุ่น มาสู่ส่วนผสมที่คัดสรรอย่างพิถีพิถัน</p></div><a class="underlink" href="#origins">Explore all origins ${arrow()}</a></div><div class="rh-region-grid">${regionTitles.map((name, i) => `<a class="rh-region" href="#origins/${i}"><div class="region-photo region-${i}" role="img" aria-label="${name} landscape inspiration"></div><h3>${name}</h3><div><p>${regionCopy[i]}</p><span class="round-arrow">${arrow()}</span></div></a>`).join('')}</div></section>
<section class="rh-products rh-container"><div class="rh-heading"><div><h2>Our Products</h2><p>อาหารเสริมที่ออกแบบมาเพื่อคุณในทุกโมเมนต์ของชีวิต</p></div><a class="underlink" href="#catalog">View all products ${arrow()}</a></div><div class="rh-product-grid">${Object.keys(
    products,
  )
    .filter((id) => products[id].active !== false)
    .map(homeProductCard)
    .join('')}</div></section>
<section class="rh-finder rh-container"><div class="rh-finder-copy"><h2>Find Your Supplement</h2><h3>วันนี้คุณอยากดูแลเรื่องอะไรเป็นพิเศษ?</h3><p>เลือกเป้าหมายที่คุณต้องการ แล้วเราจะช่วยแนะนำ<br>ผลิตภัณฑ์ที่เหมาะกับคุณ</p><a href="#wellness" class="btn">เริ่มค้นหาตอนนี้ ${arrow()}</a></div><div class="rh-goals">${[
    ['glow', 'face', 'ดูแลผิวพรรณ<br>ความกระจ่างใส'],
    ['daily', 'bolt', 'เติมพลัง<br>ในชีวิตประจำวัน'],
    ['calm', 'moon', 'ผ่อนคลาย<br>นอนหลับสบาย'],
    ['daily', 'heart', 'ดูแลสุขภาพ<br>โดยรวม'],
  ]
    .map(
      ([id, icon, title], i) =>
        `<a href="#wellness/${id}" class="rh-goal goal-${i}"><span>${ico(icon)}</span><p>${title}</p></a>`,
    )
    .join('')}</div></section>
<section class="rh-partner"><div><h2>Become our partner</h2><p>ร่วมเป็นส่วนหนึ่งในการนำอาหารเสริมคุณภาพจากญี่ปุ่น<br>ไปสู่ผู้คนที่รักสุขภาพ</p><div class="actions"><a href="#partner" class="btn">ติดต่อเรา ${arrow()}</a><a href="#partner" class="btn secondary">ดูข้อมูลสำหรับพาร์ทเนอร์ ${arrow()}</a></div></div><span>Let’s bring<br>Japanese wellness<br>together.</span></section></div>`;
};
views.home = home;
views.faq = () =>
  `<section class="page-intro"><div class="eyebrow">CHASHITSU · SUPPORT</div><h1>Frequently asked questions</h1><p>เรื่องเล็ก ๆ ที่คุณอาจอยากรู้เกี่ยวกับ CHASHITSU</p></section><section class="product-body"><h2 style="font-size:30px;margin:30px 0">Good to know</h2><details open><summary>สั่งซื้อสินค้าได้ที่ไหน?</summary><p>ขณะนี้อยู่ระหว่างเตรียมเปิดตัวสินค้า ช่องทางสั่งซื้อและข้อมูลผลิตภัณฑ์ฉบับสมบูรณ์จะแจ้งให้ทราบเมื่อพร้อมจำหน่าย</p></details><details><summary>ดูส่วนผสมและวิธีรับประทานได้ที่ไหน?</summary><p>ข้อมูลสูตร ส่วนผสม และวิธีรับประทานที่ยืนยันแล้วจะแสดงบนฉลากและหน้าสินค้าเมื่อเปิดจำหน่าย</p></details><details><summary>สนใจเป็นตัวแทนจำหน่าย ต้องทำอย่างไร?</summary><p>คุณสามารถกรอกข้อมูลและดาวน์โหลดเอกสารแนะนำธุรกิจได้ที่หน้าพาร์ทเนอร์</p><a class="underlink" href="#partner">ข้อมูลสำหรับพาร์ทเนอร์</a></details></section>`;
views.ingredients = () =>
  `<section class="page-intro"><div class="eyebrow">CHASHITSU · INGREDIENTS</div><h1>Inspired by nature.<br>Chosen with care.</h1><p>ทำความรู้จักแนวคิดของส่วนผสมในแต่ละผลิตภัณฑ์</p></section><section class="collection"><div class="product-grid">${['daily', 'glow', 'calm'].map(productCard).join('')}</div></section>`;
const originalRender = render;
render = function () {
  originalRender();
  const [page, arg] = (location.hash.slice(1) || 'home').split('/');
  document.body.classList.toggle('on-home', page === 'home');
  document.documentElement.lang = 'th';
  if (page === 'wellness' && products[arg])
    document.querySelector(`[data-wellness="${arg}"]`)?.click();
  if (page === 'faq') document.title = 'CHASHITSU — Frequently asked questions';
  if (page === 'ingredients') document.title = 'CHASHITSU — Ingredients';
};
window.removeEventListener('hashchange', originalRender);
window.addEventListener('hashchange', render);
document.querySelector('.header').innerHTML =
  `<a class="brand" href="#home" aria-label="CHASHITSU home"><span class="brand-symbol">C</span> CHASHITSU</a><button class="menu-toggle" aria-label="Open menu" aria-expanded="false">☰</button><nav aria-label="Main navigation"><a href="#home" data-en="Home" data-th="หน้าหลัก">Home</a><a href="#catalog" data-en="Products" data-th="สินค้า">Products</a><a href="#story" data-en="Our Story" data-th="เรื่องราว">Our Story</a><a href="#origins" data-en="Origins" data-th="แหล่งที่มา">Origins</a><a href="#ingredients" data-en="Ingredients" data-th="ส่วนผสม">Ingredients</a><a href="#wellness" data-en="Find Your Wellness" data-th="ค้นหาสิ่งที่ใช่">Find Your Wellness</a><a href="#faq" data-en="FAQ" data-th="คำถามที่พบบ่อย">FAQ</a><a href="#contact" data-en="Contact" data-th="ติดต่อเรา">Contact</a></nav><div class="header-actions"><select id="language" aria-label="Navigation language"><option value="en">EN</option><option value="th">TH</option></select><button class="btn line-btn" data-dialog="contact">LINE OA ${arrow()}</button></div>`;
document.querySelector('.menu-toggle').addEventListener('click', (e) => {
  const open = document.querySelector('.header nav').classList.toggle('open');
  e.currentTarget.setAttribute('aria-expanded', String(open));
});
document.querySelector('#language').addEventListener('change', (e) => {
  document
    .querySelectorAll('.header nav a')
    .forEach((a) => (a.textContent = a.dataset[e.target.value]));
});
document.querySelector('footer').innerHTML =
  `<div class="rf-columns"><div class="rf-brand"><a class="brand" href="#home"><span class="brand-symbol">C</span> CHASHITSU</a><p>Supplements. With a little love.</p><small lang="ja">毎日に、ちょっと素敵に。</small><div class="rf-social"><button data-dialog="contact" aria-label="LINE contact">${ico('chat')}</button><button data-dialog="contact" aria-label="Social media contact">◎</button><button data-dialog="contact" aria-label="Facebook contact">f</button><button data-dialog="contact" aria-label="Email contact">${ico('mail')}</button></div></div><div><h4>Navigation</h4>${[
    ['home', 'Home'],
    ['catalog', 'Products'],
    ['story', 'Our Story'],
    ['origins', 'Origins'],
    ['ingredients', 'Ingredients'],
    ['wellness', 'Find Your Wellness'],
    ['faq', 'FAQ'],
    ['partner', 'Contact'],
  ]
    .map(([id, label]) => `<a href="#${id}">${label}</a>`)
    .join(
      '',
    )}</div><div><h4>Products</h4><a href="#product/daily">CHASHITSU DAILY</a><a href="#product/glow">CHASHITSU GLOW</a><a href="#product/calm">CHASHITSU CALM</a><a href="#catalog">All Products</a></div><div><h4>Support</h4><a href="#faq">FAQ</a><a href="#faq">How to Take</a><button class="text-button" data-dialog="availability">Shipping</button><button class="text-button" data-dialog="availability">Returns</button><button class="text-button" data-dialog="terms">Terms of Service</button><button class="text-button" data-dialog="privacy">Privacy Policy</button></div><div><h4>Contact Us</h4><button class="text-button contact-item" data-dialog="contact">${ico('chat')} LINE OA</button><a class="contact-item" href="#contact">${ico('mail')} ติดต่อ CHASHITSU</a><span class="contact-item">${ico('pin')} Inspired by Japan</span></div></div><div class="rf-bottom"><small>© 2026 CHASHITSU. All rights reserved.</small><small>毎日に、ちょっと素敵に。</small></div>`;
render();
