const products = {
  daily: {
    name: 'DAILY',
    title: 'Daily care',
    category: 'daily',
    tag: 'EVERYDAY CARE',
    mood: 'Care',
    subtitle: 'A little boost. A lovely day.',
    description:
      'Make a little room for yourself. A thoughtful addition to your everyday routine, inspired by the fresh mornings and green landscapes of Japan.',
    color: '#e6ecf7',
    ingredients: [
      ['V', 'Vitamins', 'A daily vitamin concept for your everyday ritual.'],
      ['C', 'Citrus', 'A bright, fresh inspiration from nature.'],
      ['葉', 'Botanicals', 'Inspired by the green landscapes of Japan.'],
    ],
  },
  glow: {
    name: 'GLOW',
    title: 'Glow collagen',
    category: 'beauty',
    tag: 'YOUR BEAUTY RITUAL',
    mood: 'Glow',
    subtitle: 'from the little things.',
    description:
      'Beauty care for your everyday life. A lovely pause in a busy day, inspired by soft peach blossoms and the simple pleasure of looking after yourself.',
    color: '#fbdce7',
    ingredients: [
      ['C', 'Collagen', 'At the heart of the GLOW collection concept.'],
      ['C⁺', 'Vitamin C', 'A bright addition to this daily beauty story.'],
      ['桃', 'Peach extract', 'A gentle botanical inspiration.'],
    ],
  },
  calm: {
    name: 'CALM',
    title: 'Calm magnesium',
    category: 'balance',
    tag: 'A MOMENT FOR YOU',
    mood: 'Balance',
    subtitle: 'Make room for a softer moment.',
    description:
      'Turn down the pace and find a little space for yourself. A quiet daily ritual inspired by the stillness of a Japanese tea garden.',
    color: '#e9eddf',
    ingredients: [
      ['Mg', 'Magnesium', 'The mineral at the heart of the CALM concept.'],
      ['葉', 'Botanicals', 'A story inspired by peaceful green gardens.'],
      ['間', 'A little pause', 'An invitation to make time for yourself.'],
    ],
  },
};
const origins = [
  {
    name: 'Shizuoka',
    jp: '静岡',
    subtitle: 'The heart of Japanese wellness',
    text: 'A landscape of green tea fields, gentle mountain light, and unhurried mornings. Shizuoka inspires our appreciation for the small things that make each day feel a little better.',
    theme: 'Fresh beginnings',
    product: 'daily',
  },
  {
    name: 'Yame',
    jp: '八女',
    subtitle: 'The quiet beauty of a daily ritual',
    text: 'From the rolling countryside of Yame comes an appreciation for patient craft. Its tea culture is a reminder that care lives in the details, and lovely moments are worth making time for.',
    theme: 'Thoughtful care',
    product: 'glow',
  },
  {
    name: 'Uji',
    jp: '宇治',
    subtitle: 'A place to slow down',
    text: 'The gentle rhythm of a tea ritual inspires us to pause. Uji is our invitation to take a breath, return to the present, and make a little room for calm.',
    theme: 'A softer pace',
    product: 'calm',
  },
  {
    name: 'Kagoshima',
    jp: '鹿児島',
    subtitle: 'Nature with a little energy',
    text: 'Open landscapes and a distinctive volcanic horizon inspire a fresh perspective. Our Kagoshima story celebrates the connection between the natural world and everyday life.',
    theme: 'Natural balance',
    product: 'calm',
  },
];
let selectedOrigin = 0,
  selectedFilter = 'all';
const main = document.querySelector('main');
const scenic = (
  title = 'Less rush. More wellness.',
  copy = 'Good wellness begins at the source.',
  link = '#story',
  label = 'Discover our story',
) =>
  `<section class="scenic-banner"><div><h2>${title}</h2><p>${copy}</p><a class="btn" href="${link}">${label}</a></div></section>`;
const originCards = () =>
  `<div class="origin-grid">${origins.map((o, i) => `<a class="origin-card" href="#origins/${i}"><img src="assets/japan.png" alt="Japanese landscape inspiration" loading="lazy"><div class="origin-card-body"><h3>${o.name}</h3><p>${o.subtitle}</p><small>Explore the story</small></div></a>`).join('')}</div>`;
function productImage(id) {
  return `<div class="single-product ${id}"><img src="assets/products.png" alt="CHASHITSU ${products[id].name} bottle" loading="lazy"></div>`;
}
function productCard(id) {
  const p = products[id];
  return `<article class="product-card"><a href="#product/${id}" aria-label="Explore CHASHITSU ${p.name}"><div class="product-picture">${productImage(id)}<span class="tag">${p.tag}</span></div></a><div class="product-card-body"><h3>CHASHITSU ${p.name}</h3><p>${p.title} · ${p.subtitle}</p><a class="btn" href="#product/${id}">Discover ${p.name}</a></div></article>`;
}
function home() {
  return `<section class="hero"><img class="hero-art" src="assets/products.png" alt="CHASHITSU daily, glow and calm supplements surrounded by sakura, peaches and citrus"><div class="hero-copy"><div class="eyebrow">FROM JAPAN, WITH A LITTLE LOVE</div><h1>Your supplements.<br>Your lovely moment.</h1><div class="tagline">A little boost. A lovely day.</div><p>A thoughtful little ritual, inspired by Japan.<br>Discover everyday wellness that fits naturally<br>into your life, one lovely moment at a time.</p><div class="actions"><a class="btn" href="#catalog">Find your supplements</a><a class="underlink" href="#story">Our story</a></div></div><div class="hero-stamp">A LITTLE CARE<strong>DAILY</strong>A LOVELY MOMENT</div><div class="hero-wave"></div></section><section class="section beginning center"><div class="section-head"><div class="eyebrow">SMALL RITUALS. LOVELY POSSIBILITIES.</div><h2>The beginning of CHASHITSU</h2><p>Simple supplements for a brighter, healthier tomorrow.<br>Inspired by Japanese nature. Made for your everyday life.</p></div><div class="care-circles"><a class="care-circle" href="#product/daily"><strong>Care</strong><small>Daily vitamins</small><span class="circle-plus">+</span></a><a class="care-circle" href="#product/glow"><strong>Glow</strong><small>Glow collagen</small><span class="circle-plus">+</span></a><a class="care-circle" href="#product/calm"><strong>Balance</strong><small>Calm magnesium</small><span class="circle-plus">+</span></a></div></section>${scenic()}<section class="section"><div class="section-title-row"><div><div class="eyebrow">ROOTED IN SOMETHING LOVELY</div><h2>Stories from the wellness sources</h2><p>Four places. A shared appreciation for nature and care.<br>Explore the Japanese landscapes that inspire our world.</p></div><a href="#origins" class="underlink">Discover our origins</a></div>${originCards()}</section><section class="partner-banner"><div><div class="eyebrow">LET’S BRING LOVELY MOMENTS TOGETHER</div><h2>Become our partner</h2><p>Share a thoughtful approach to everyday wellness.<br>Discover how we can grow together.</p><div class="actions"><a class="btn" href="#partner">Let’s connect</a><a class="underlink" href="#catalog">View collection</a></div></div><img src="assets/japan.png" alt="Spring blossoms overlooking a Japanese tea garden" loading="lazy"></section>`;
}
function story() {
  return `<section class="story-hero"><div><div class="eyebrow">THE CHASHITSU STORY</div><h1>Wellness doesn’t<br>begin in a bottle.</h1><p>It begins with where it comes from.<br>And the care we bring to everyday life.</p><p class="serif">毎日の自分を、心地よく。</p></div><img src="assets/japan.png" alt="Mount Fuji and a springtime Japanese tea landscape"></section><div class="chapters">${[
    [
      'A simple question',
      'How can we bring the Japanese appreciation for self-care into everyday life? Our story began with the belief that looking after ourselves can be simple, thoughtful, and a little lovely.',
    ],
    [
      'Looking to Japan',
      'We found inspiration in the unhurried rhythm of a tea ritual, the changing seasons, and the care given to even the smallest detail. Wellness became a way of noticing, as much as a way of doing.',
    ],
    [
      'Finding our sources',
      'We follow the stories of landscapes, ingredients, and daily rituals. Each collection brings a different mood to your day, connected by a shared appreciation for nature and care.',
    ],
  ]
    .map(
      (s, i) =>
        `<section class="chapter"><img src="assets/japan.png" alt="Japanese nature and tea culture inspiration" style="object-position:${i * 45}%" loading="lazy"><div><div class="eyebrow">Chapter 0${i + 1}</div><h2>${s[0]}</h2><p>${s[1]}</p></div></section>`,
    )
    .join(
      '',
    )}</div><section class="section center" style="padding-top:0"><div class="section-head"><h2 class="serif">Every lovely moment has a beginning.</h2></div>${originCards()}<div class="actions" style="justify-content:center"><a class="btn" href="#origins">Explore our sources</a></div></section>${scenic('From nature. With care.', 'A little inspiration for the everyday.', '#catalog', 'Meet the collection')}`;
}
function originsPage() {
  const o = origins[selectedOrigin];
  return `<div class="origin-hero" role="img" aria-label="Dreamlike Japanese landscape with Mount Fuji and tea fields"></div><section class="origin-content"><div class="origin-heading"><div><div class="eyebrow">OUR ORIGINS</div><h1>${o.name}</h1><p>${o.subtitle}</p></div><div class="jp" lang="ja">${o.jp}</div></div><div class="tabs" role="tablist" aria-label="Select a region">${origins.map((v, i) => `<button role="tab" aria-selected="${i === selectedOrigin}" class="${i === selectedOrigin ? 'active' : ''}" data-origin="${i}">${v.name}</button>`).join('')}</div><div role="tabpanel"><div class="origin-detail"><img src="assets/japan.png" alt="Japanese landscape inspiration for the collection"><div><div class="eyebrow">01 · The place</div><h2>From rich nature<br>to everyday wellness.</h2><p>${o.text}</p></div></div><div class="origin-detail"><div><div class="eyebrow">02 · The inspiration</div><h2>${o.theme}</h2><p>Nature sets the pace. We take inspiration from the people who make time for thoughtful rituals, and the beauty of a simple moment, well cared for.</p></div><img src="assets/japan.png" alt="Sunlit tea fields and cherry blossoms" loading="lazy" style="object-position:right"></div><div class="eyebrow">03 · From source to story</div><div class="process"><span><b>Japan</b>The inspiration</span><span><b>Nature</b>The ingredients</span><span><b>Care</b>The intention</span><span><b>You</b>The lovely moment</span></div></div><div class="actions" style="justify-content:center"><a href="#product/${o.product}" class="btn">Discover CHASHITSU ${products[o.product].name}</a></div></section>`;
}
function catalog() {
  return `<section class="page-intro"><div class="eyebrow">THE CHASHITSU COLLECTION</div><h1>Find your little wellness moment.</h1><p>A little care, a lovely glow, a moment of balance.<br>Make everyday wellness your own.</p></section><section class="collection"><div class="tabs" role="tablist" aria-label="Product categories">${[
    ['all', 'All moments'],
    ['daily', 'Daily care'],
    ['beauty', 'Beauty'],
    ['balance', 'Balance'],
  ]
    .map(
      ([id, label]) =>
        `<button class="${selectedFilter === id ? 'active' : ''}" data-filter="${id}" role="tab" aria-selected="${selectedFilter === id}">${label}</button>`,
    )
    .join('')}</div><div class="product-grid" role="tabpanel">${Object.keys(products)
    .filter(
      (id) =>
        products[id].active !== false &&
        (selectedFilter === 'all' || products[id].category === selectedFilter),
    )
    .map(productCard)
    .join(
      '',
    )}</div></section>${scenic('What does your day need?', 'Let’s find your perfect little wellness moment.', '#wellness', 'Find your wellness')}`;
}
function product(id) {
  const p = products[id] || products.glow;
  id = products[id] ? id : 'glow';
  return `<section class="product-hero" style="background:${p.color}"><div><div class="breadcrumb"><a href="#catalog">Collection</a> / CHASHITSU ${p.name}</div><div class="eyebrow">${p.tag}</div><h1>${p.name}</h1><h2>${p.subtitle}</h2><p>${p.description}</p>${p.price ? `<div class="cms-price">${p.price}</div>` : ''}${p.sku ? `<div class="cms-sku">SKU: ${p.sku}</div>` : ''}<div class="actions">${p.buyUrl ? `<a class="btn" href="${p.buyUrl}" target="_blank" rel="noopener noreferrer">ดูช่องทางสั่งซื้อ</a>` : '<button class="btn" data-dialog="availability">Where to find us</button>'}<a class="underlink" href="#origins">Explore the inspiration</a></div></div><div class="detail-product-image">${productImage(id)}</div></section><div class="product-body"><nav class="product-nav" aria-label="Product sections"><a href="#" data-scroll="product-story">Our story</a><a href="#" data-scroll="ingredients">Ingredients</a><a href="#" data-scroll="ritual">Your lovely moment</a><a href="#" data-scroll="faq">Good to know</a></nav><section id="product-story" class="product-section"><div class="eyebrow">A LITTLE CARE GOES A LONG WAY</div><h2 class="serif">The story behind ${p.name}</h2><p>${p.description} Because looking after yourself belongs in the little things, the familiar routines, and the moments you make your own.</p></section><section id="ingredients" class="product-section"><h2>What’s inside the story</h2><div class="ingredient-grid">${p.ingredients.map((a) => `<div class="ingredient"><div class="ingredient-initial">${a[0]}</div><h3>${a[1]}</h3><p>${a[2]}</p></div>`).join('')}</div></section><section id="ritual" class="product-section"><h2>Your ${p.name.toLowerCase()} moment</h2><div class="ritual">${[
    ['07:00', 'A fresh beginning', 'Open the curtains. Welcome the day.'],
    ['09:00', 'A little nourishment', 'Take your time over breakfast.'],
    ['13:00', 'A moment for you', 'Pause, breathe, and check in with yourself.'],
    ['19:00', 'A softer evening', 'Let the day settle. Make room for calm.'],
  ]
    .map((a) => `<div><small>${a[0]}</small><h3>${a[1]}</h3><p>${a[2]}</p></div>`)
    .join(
      '',
    )}</div></section><section id="faq" class="product-section"><h2>Good to know</h2><details><summary>Where can I find the collection?</summary><p>Our collection is being introduced. Availability and purchasing details will be shared here when the collection launches.</p></details><details><summary>Where can I see the final product details?</summary><p>The complete formula, serving information, and product label will be available with the final collection.</p></details><details><summary>How do I find my lovely moment?</summary><p>Explore our wellness finder to discover the collection story that matches your daily routine.</p><div class="actions"><a href="#wellness" class="btn secondary">Find your wellness</a></div></details></section></div>${scenic('Start your lovely day.', 'A little ritual. A moment of your own.', '#catalog', 'Explore the collection')}`;
}
function wellness() {
  return `<section class="wellness-wrap"><div class="eyebrow">FIND YOUR WELLNESS</div><h1>What does your day need today?</h1><p>Choose the moment you’d like to make a little more lovely.</p><div class="wellness-options">${[
    ['daily', '朝', 'Everyday care', 'A simple ritual to start my day.'],
    ['glow', '花', 'A lovely glow', 'A little more time to care for myself.'],
    ['calm', '茶', 'A moment of balance', 'A quieter pace and a softer moment.'],
  ]
    .map(
      ([id, icon, title, copy]) =>
        `<button class="wellness-option" data-wellness="${id}" aria-pressed="false"><span class="option-icon">${icon}</span><strong>${title}</strong><p>${copy}</p></button>`,
    )
    .join('')}</div><div id="wellness-result" aria-live="polite"></div></section>`;
}
function about() {
  return `<section class="story-hero"><div><div class="eyebrow">ABOUT CHASHITSU</div><h1>From Japan,<br>with a little love.</h1><p>We believe wellness is not just a routine,<br>but a collection of little moments that make life brighter.</p><div class="actions"><a href="#story" class="btn">Get to know our story</a></div></div><img src="assets/japan.png" alt="A quiet Japanese landscape in spring"></section><section class="section"><div class="section-head center"><div class="eyebrow">THE THINGS WE COME BACK TO</div><h2 class="serif">Thoughtful by nature.</h2></div><div class="values">${[
    ['What we believe', 'Small, thoughtful acts of care belong in everyday life.'],
    ['Why Japan', 'Nature, detail, and an appreciation for the present moment.'],
    ['How we choose', 'With intention, curiosity, and care for the little things.'],
    ['Our promise', 'To make everyday wellness feel a little more lovely.'],
  ]
    .map((a) => `<div class="value"><h3>${a[0]}</h3><p>${a[1]}</p></div>`)
    .join(
      '',
    )}</div></section>${scenic('Your day. Your lovely moment.', 'Find the collection that feels like you.', '#catalog', 'Meet CHASHITSU')}`;
}
function partner() {
  return `<section class="page-intro"><div class="eyebrow">GROW WITH CHASHITSU</div><h1>Bring Japanese wellness<br>closer to everyone.</h1><p>We’re looking for thoughtful partners who share our appreciation for quality, care, and lovely everyday moments.</p></section><section class="section" style="background:#f9e9ed"><div class="contact-panel"><div><div class="eyebrow">LET’S MAKE SOMETHING LOVELY</div><h2>Start a conversation.</h2><p>Tell us a little about your business and what you have in mind.</p><p class="form-note">Prepare an enquiry to download and keep. Direct submission will be available when our partner programme opens.</p><a class="partner-line-qr" href="https://lin.ee/SVyOMJG" target="_blank" rel="noopener noreferrer"><img src="assets/line-oa-qr.png" width="180" height="180" alt="Scan to connect with CHASHITSU on LINE OA"><span>Scan to chat on LINE OA</span></a></div><form id="partner-form"><label>Your name<input name="name" autocomplete="name" required maxlength="100"></label><label>Email address<input type="email" name="email" autocomplete="email" required maxlength="200"></label><label>Company<input name="company" autocomplete="organization" required maxlength="200"></label><label>Partnership type<select name="type"><option>Distributor</option><option>Retail partner</option><option>Wellness business</option><option>Corporate partner</option></select></label><label class="full">What do you have in mind?<textarea name="message" required maxlength="3000"></textarea></label><div class="full"><button class="btn" type="submit">Download your enquiry</button></div><div id="form-status" class="full form-status" role="status"></div></form></div></section>`;
}
const views = { home, story, origins: originsPage, catalog, wellness, about, partner };
function render() {
  const [page, arg] = (location.hash.slice(1) || 'home').split('/');
  if (page === 'origins' && arg !== undefined)
    selectedOrigin = Math.min(3, Math.max(0, Number(arg) || 0));
  main.innerHTML = page === 'product' ? product(arg) : views[page] ? views[page]() : home();
  document
    .querySelectorAll('.header nav a')
    .forEach((a) =>
      a.classList.toggle('active', a.hash === '#' + (page === 'product' ? 'catalog' : page)),
    );
  document.querySelector('.header nav').classList.remove('open');
  document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
  document.title = `CHASHITSU — ${page === 'home' ? 'Your lovely moment' : page === 'product' ? 'The ' + (products[arg]?.name || 'GLOW') + ' collection' : { story: 'Our story', origins: 'Our origins', catalog: 'The collection', wellness: 'Find your wellness', about: 'About us', partner: 'Become a partner' }[page] || 'Your lovely moment'}`;
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', render);
document.querySelector('.menu-toggle').addEventListener('click', (e) => {
  const open = document.querySelector('.header nav').classList.toggle('open');
  e.currentTarget.setAttribute('aria-expanded', String(open));
});
document.addEventListener('click', (e) => {
  const origin = e.target.closest('[data-origin]');
  if (origin) {
    const y = window.scrollY;
    selectedOrigin = Number(origin.dataset.origin);
    main.innerHTML = originsPage();
    window.scrollTo(0, y);
    main.querySelector(`[data-origin="${selectedOrigin}"]`).focus({ preventScroll: true });
  }
  const filter = e.target.closest('[data-filter]');
  if (filter) {
    selectedFilter = filter.dataset.filter;
    const y = window.scrollY;
    main.innerHTML = catalog();
    window.scrollTo(0, y);
    main.querySelector(`[data-filter="${selectedFilter}"]`).focus({ preventScroll: true });
  }
  const w = e.target.closest('[data-wellness]');
  if (w) {
    const id = w.dataset.wellness,
      p = products[id];
    if (!p || p.deleted) return;
    document.querySelectorAll('[data-wellness]').forEach((b) => {
      b.classList.toggle('selected', b === w);
      b.setAttribute('aria-pressed', String(b === w));
    });
    document.querySelector('#wellness-result').innerHTML =
      `<div class="wellness-result"><div class="result-image">${productImage(id)}</div><div><div class="eyebrow">YOUR LOVELY MOMENT MIGHT BE</div><h2>CHASHITSU ${p.name}</h2><p>${p.subtitle} Explore the ${p.name} story and make a little time for yourself.</p><a href="#product/${id}" class="btn">Meet ${p.name}</a></div></div>`;
    document
      .querySelector('#wellness-result')
      .scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  const scroll = e.target.closest('[data-scroll]');
  if (scroll) {
    e.preventDefault();
    document.getElementById(scroll.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' });
  }
  const d = e.target.closest('[data-dialog]');
  if (d) {
    if (d.dataset.dialog === 'contact') {
      e.preventDefault();
      location.hash = 'contact';
      return;
    }
    const content = {
      contact: [
        'Let’s keep in touch',
        'Our contact details will be available when the collection launches. For partnership enquiries, visit the Partner page to prepare your introduction.',
      ],
      availability: [
        'Lovely things are on their way.',
        'The CHASHITSU collection is coming soon. Stockists, purchasing options, and final product information will be shared here at launch.',
      ],
      privacy: [
        'Your privacy',
        'This preview has no analytics or tracking cookies. Partner enquiry details stay in your browser and are downloaded only when you choose. Web fonts are loaded from Google Fonts.',
      ],
      terms: [
        'A little note',
        'This website presents the CHASHITSU brand and collection concept. Final products, availability, ingredients, and serving information are subject to confirmation.',
      ],
    }[d.dataset.dialog];
    document.querySelector('#dialog-content').innerHTML =
      `<h2>${content[0]}</h2><p>${content[1]}</p>`;
    document.querySelector('dialog').showModal();
  }
});
document
  .querySelector('.close-dialog')
  .addEventListener('click', () => document.querySelector('dialog').close());
document.querySelector('dialog').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    const b = e.currentTarget.getBoundingClientRect();
    if (e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom)
      e.currentTarget.close();
  }
});
document.addEventListener('submit', (e) => {
  if (e.target.id !== 'partner-form') return;
  e.preventDefault();
  const f = new FormData(e.target);
  const content = `CHASHITSU PARTNER ENQUIRY\n\nName: ${f.get('name')}\nEmail: ${f.get('email')}\nCompany: ${f.get('company')}\nPartnership: ${f.get('type')}\n\n${f.get('message')}\n`;
  const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'chashitsu-partner-enquiry.txt';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#form-status').textContent =
    'Your enquiry has been downloaded. Nothing has been sent.';
});
render();
