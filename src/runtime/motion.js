(() => {
  const root = document.documentElement,
    main = document.querySelector('main');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)'),
    fine = matchMedia('(hover: hover) and (pointer: fine)');
  let paused = false;
  try {
    paused = localStorage.getItem('chashitsu-motion-paused') === 'true';
  } catch {}
  let active = false,
    frame = 0,
    scanQueued = false,
    chapters = [];
  const seen = new WeakSet(),
    observed = new Set(),
    running = new Set();
  const progress = document.createElement('div');
  progress.className = 'motion-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  const toggle = document.createElement('button');
  toggle.className = 'motion-toggle';
  toggle.type = 'button';
  document.body.append(toggle);
  const disabled = () => paused || reduced.matches || root.dataset.motionPaused === 'true';
  function play(el, frames, opts = {}) {
    if (disabled() || !el.isConnected) return;
    const a = el.animate(frames, { duration: 750, easing: 'cubic-bezier(.16,1,.3,1)', ...opts });
    running.add(a);
    a.finished
      .catch(() => {})
      .finally(() => {
        running.delete(a);
        el.classList.remove('motion-entering');
      });
    return a;
  }
  function updatePreference() {
    active = !disabled();
    root.classList.toggle('motion-off', !active);
    toggle.disabled = reduced.matches;
    toggle.setAttribute('aria-pressed', String(paused || reduced.matches));
    const label = reduced.matches
      ? 'ลดการเคลื่อนไหวตามระบบ'
      : paused
        ? 'เปิดแอนิเมชัน'
        : 'หยุดแอนิเมชัน';
    toggle.innerHTML = `<svg viewBox="0 0 16 16" aria-hidden="true">${active ? '<path d="M3 2h3v12H3zm7 0h3v12h-3z"/>' : '<path d="M4 2l10 6-10 6z"/>'}</svg><span>${label}</span>`;
    if (!active) {
      for (const a of running) a.cancel();
      document.querySelectorAll('[data-motion-hover]').forEach((el) => {
        el.style.removeProperty('--tilt-x');
        el.style.removeProperty('--tilt-y');
        el.style.removeProperty('--magnet-x');
        el.style.removeProperty('--magnet-y');
      });
    }
    schedule();
  }
  toggle.addEventListener('click', () => {
    paused = !paused;
    try {
      localStorage.setItem('chashitsu-motion-paused', String(paused));
    } catch {}
    updatePreference();
  });
  reduced.addEventListener('change', updatePreference);
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target;
        el.classList.toggle('motion-in-view', entry.isIntersecting);
        if (entry.isIntersecting && !seen.has(el)) {
          seen.add(el);
          if (el.matches('.st-chapter')) enterChapter(el);
          if (el.dataset.reveal === 'true' && !disabled()) {
            el.classList.add('motion-entering');
            play(
              el,
              [
                { opacity: 0, transform: 'translateY(35px) scale(.975)' },
                { opacity: 1, transform: 'translateY(0) scale(1)' },
              ],
              { delay: Number(el.dataset.motionDelay) || 0 },
            );
          }
        }
      }
    },
    { threshold: 0.08 },
  );
  function watch(el, reveal = false, index = 0) {
    if (observed.has(el)) return;
    observed.add(el);
    if (reveal) {
      el.dataset.reveal = 'true';
      el.dataset.motionDelay = String(Math.min(index, 3) * 85);
    }
    observer.observe(el);
  }
  function atmosphere(scene) {
    if (scene.querySelector(':scope > .motion-atmosphere')) return;
    scene.classList.add('motion-scene');
    const layer = document.createElement('div');
    layer.className = 'motion-atmosphere';
    layer.setAttribute('aria-hidden', 'true');
    const glow = document.createElement('div');
    glow.className = 'motion-glow';
    layer.append(glow);
    const count = scene.classList.contains('rh-hero') ? 18 : 8;
    for (let i = 0; i < count; i++) {
      const f = document.createElement('i');
      f.className = 'motion-fleck';
      f.style.cssText = `--x:${(i * 37 + 11) % 100}%;--size:${10 + (i % 4) * 5}px;--duration:${11 + (i % 6) * 1.5}s;--delay:-${i * 1.37}s;--drift:${45 + (i % 5) * 28}px;--fall:${Math.max(scene.clientHeight, 350) + 100}px`;
      layer.append(f);
    }
    scene.append(layer);
    watch(scene);
  }

  function enterChapter(chapter) {
    if (disabled()) return;
    const direction = chapter.classList.contains('st-chapter-two') ? 1 : -1;
    chapter.querySelectorAll('.st-chapter-copy > *').forEach((el, i) =>
      play(
        el,
        [
          { opacity: 0, translate: direction * 32 + 'px 14px' },
          { opacity: 1, translate: '0 0' },
        ],
        { duration: 850, delay: 80 + i * 130, fill: 'both' },
      ),
    );
    const photo = chapter.querySelector('.st-photo');
    if (photo)
      play(
        photo,
        [
          { clipPath: 'ellipse(10% 25% at 50% 50%)', scale: '1.08', opacity: 0.3 },
          { clipPath: 'ellipse(75% 75% at 50% 50%)', scale: '1', opacity: 1 },
        ],
        { duration: 1400, delay: 100, fill: 'both' },
      );
    chapter.querySelectorAll('.st-quote,.st-handwritten').forEach((el) =>
      play(
        el,
        [
          { opacity: 0, translate: '0 22px', scale: '.88' },
          { opacity: 1, translate: '0 0', scale: '1' },
        ],
        { duration: 1000, delay: 650, fill: 'both' },
      ),
    );
  }
  function enterHero() {
    const hero = main.querySelector(
      '.ig4-hero-copy,.ig3-hero-copy,.ig-hero-copy,.or-hero-copy,.st-hero-copy,.rh-hero-copy,.story-hero>div,.product-hero>div,.page-intro,.wellness-wrap',
    );
    if (!hero || hero.dataset.motionIntro) return;
    hero.dataset.motionIntro = 'true';
    const children = [...hero.children].filter(
      (el) => !el.matches('.wellness-options,#wellness-result'),
    );
    children.forEach((el, i) =>
      play(
        el,
        [
          { opacity: 0, transform: 'translateY(26px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 900, delay: 100 + i * 105 },
      ),
    );
  }
  function scan() {
    scanQueued = false;
    for (const el of observed) {
      if (!el.isConnected) {
        observer.unobserve(el);
        observed.delete(el);
      }
    }
    for (const a of running)
      if (!a.effect?.target?.isConnected) {
        a.cancel();
        running.delete(a);
      }
    main
      .querySelectorAll(
        '.rh-hero,.rh-landscape,.rh-partner,.st-hero,.st-origins,.st-closing,.or-hero,.ig-hero,.ig3-hero,.ig3-banner,.ig4-hero,.ig4-banner',
      )
      .forEach(atmosphere);
    const selectors =
      '.ig4-feature-copy,.ig4-feature-art,.ig4-small-card,.ig4-process-copy,.ig4-other-heading,.ig4-banner>div,.ig3-key-head,.ig3-card,.ig3-natural,.ig3-other-head,.ig3-process-copy,.ig3-banner>div,.ig-heading,.ig-card,.ig-quality-copy,.or-copy,.or-picture,.or-product-art,.or-product-copy,.or-card,.st-section-heading,.st-value,.st-origins-copy,.st-map-link,.st-closing-copy,.rh-beginning-copy,.rh-circle,.rh-heading,.rh-region,.hp-card,.rh-finder-copy,.rh-goal,.rh-partner>div:not(.motion-atmosphere),.rh-landscape>div:not(.motion-atmosphere),.chapter,.origin-heading,.origin-detail,.process,.product-card,.product-section>h2,.product-section>p,.ingredient,.ritual>div,.wellness-option,.wellness-result,.value,.partner-type,.contact-panel';
    main
      .querySelectorAll(selectors)
      .forEach((el) => watch(el, true, [...el.parentElement.children].indexOf(el)));
    main
      .querySelectorAll(
        '.hp-card,.rh-region,.rh-goal,.product-card,.wellness-option,.ingredient,.value',
      )
      .forEach((el) => {
        el.classList.add('motion-card');
        el.dataset.motionHover = 'true';
      });
    main.querySelectorAll('.rh-circle,.rh-seal,.rh-wave').forEach((el) => watch(el));
    main
      .querySelectorAll('.or-process,.ig-quality,.ig3-process,.ig4-process')
      .forEach((el) => watch(el));
    chapters = [...main.querySelectorAll('.st-chapter')];
    chapters.forEach((el) => {
      el.classList.add('chapter-motion');
      watch(el);
    });
    enterHero();
    schedule();
  }
  const mutations = new MutationObserver(() => {
    if (!scanQueued) {
      scanQueued = true;
      queueMicrotask(scan);
    }
  });
  mutations.observe(main, { childList: true, subtree: true });
  let pointerFrame = 0,
    lastPointer;
  document.addEventListener(
    'pointermove',
    (e) => {
      if (!active || !fine.matches || e.pointerType === 'touch') return;
      lastPointer = { target: e.target, x: e.clientX, y: e.clientY };
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        const data = lastPointer;
        const card = data.target.closest('.motion-card'),
          button = data.target.closest('.btn');
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty(
            '--tilt-x',
            `${(-(data.y - r.top - r.height / 2) / r.height) * 5}deg`,
          );
          card.style.setProperty(
            '--tilt-y',
            `${((data.x - r.left - r.width / 2) / r.width) * 6}deg`,
          );
        }
        if (button) {
          const r = button.getBoundingClientRect();
          button.dataset.motionHover = 'true';
          button.style.setProperty(
            '--magnet-x',
            `${((data.x - r.left - r.width / 2) / r.width) * 7}px`,
          );
          button.style.setProperty(
            '--magnet-y',
            `${((data.y - r.top - r.height / 2) / r.height) * 7}px`,
          );
        }
      });
    },
    { passive: true },
  );
  document.addEventListener('pointerout', (e) => {
    const el = e.target.closest('.motion-card,.btn');
    if (el && !el.contains(e.relatedTarget)) {
      el.style.removeProperty('--tilt-x');
      el.style.removeProperty('--tilt-y');
      el.style.removeProperty('--magnet-x');
      el.style.removeProperty('--magnet-y');
    }
  });
  document.addEventListener('click', (e) => {
    if (!active) return;
    const btn = e.target.closest('.btn');
    if (btn) {
      const r = btn.getBoundingClientRect(),
        ripple = document.createElement('span');
      ripple.className = 'motion-ripple';
      ripple.setAttribute('aria-hidden', 'true');
      ripple.style.left = `${e.detail ? e.clientX - r.left : r.width / 2}px`;
      ripple.style.top = `${e.detail ? e.clientY - r.top : r.height / 2}px`;
      btn.append(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
      setTimeout(() => ripple.remove(), 900);
    }
  });
  document.addEventListener(
    'toggle',
    (e) => {
      if (e.target.matches('details[open]'))
        [...e.target.children]
          .filter((el) => el.tagName !== 'SUMMARY')
          .forEach((el) =>
            play(
              el,
              [
                { opacity: 0, transform: 'translateY(-6px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
              { duration: 300 },
            ),
          );
    },
    true,
  );
  document.addEventListener('focusin', (e) => {
    for (const a of running) {
      const el = a.effect?.target;
      if (el && (el === e.target || el.contains(e.target))) a.finish();
    }
  });
  document.querySelector('dialog')?.classList.add('motion-dialog');
  function paint() {
    frame = 0;
    for (const chapter of chapters) {
      if (!chapter.isConnected) continue;
      const rect = chapter.getBoundingClientRect(),
        progress = active
          ? Math.max(
              0,
              Math.min(1, (innerHeight * 0.78 - rect.top) / Math.max(rect.height * 0.8, 1)),
            )
          : 1;
      chapter.style.setProperty('--chapter-progress', progress.toFixed(3));
      chapter.style.setProperty(
        '--chapter-shift',
        active ? ((0.5 - progress) * 14).toFixed(2) + 'px' : '0px',
      );
      chapter.classList.toggle('chapter-complete', progress > 0.96);
    }
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty(
      '--reading-progress',
      String(max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0),
    );
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(paint);
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener(
    'resize',
    () => {
      document
        .querySelectorAll('.motion-scene')
        .forEach((scene) =>
          scene
            .querySelectorAll('.motion-fleck')
            .forEach((f) =>
              f.style.setProperty('--fall', `${Math.max(scene.clientHeight, 350) + 100}px`),
            ),
        );
      schedule();
    },
    { passive: true },
  );
  document.addEventListener('visibilitychange', () => {
    root.classList.toggle('motion-suspended', document.hidden);
    for (const a of running) document.hidden ? a.pause() : a.play();
  });
  updatePreference();
  scan();
  play(
    document.querySelector('.header'),
    [
      { opacity: 0, transform: 'translateY(-14px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 650 },
  );
})();
