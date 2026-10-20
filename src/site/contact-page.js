(() => {
  const defaults = window.SiteDefaults?.contact || {};
  const esc = (value) => SiteCMS.escape(value ?? '');
  const clone = (value) => structuredClone(value);
  const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

  function merge(base, custom) {
    if (Array.isArray(base)) {
      if (!Array.isArray(custom)) return clone(base);

      return base.map((item, index) => {
        if (custom[index] === undefined) return clone(item);
        if (isObject(item) && isObject(custom[index])) return merge(item, custom[index]);
        return clone(custom[index]);
      });
    }

    if (!isObject(base)) return custom === undefined ? clone(base) : clone(custom);

    const result = clone(base);
    if (!isObject(custom)) return result;

    for (const [key, value] of Object.entries(custom)) {
      if (isObject(result[key]) && isObject(value)) result[key] = merge(result[key], value);
      else if (Array.isArray(result[key]) && Array.isArray(value)) result[key] = merge(result[key], value);
      else result[key] = clone(value);
    }

    return result;
  }

  function safeUrl(value, { image = false } = {}) {
    const text = String(value || '').trim();
    if (!text) return '';

    if (/^\/(assets|media)\/[a-zA-Z0-9_.\/-]+$/.test(text) && !text.includes('..')) return text;
    if (/^assets\/[a-zA-Z0-9_.\/-]+$/.test(text) && !text.includes('..')) return text;

    try {
      const url = new URL(text);
      if (url.protocol !== 'https:' || url.username || url.password) return '';
      return text;
    } catch {
      return image ? '' : '';
    }
  }

  const language = () => (document.querySelector('#language')?.value === 'th' ? 'th' : 'en');

  const localized = (value, lang = language()) =>
    value?.[lang] ?? value?.en ?? value?.th ?? '';

  const lines = (value) => esc(value).replace(/\n/g, '<br>');

  function contactData() {
    return merge(defaults, SiteCMS.contact?.() || {});
  }

  views.contact = () => {
    const contact = contactData();
    const lang = language();

    const hero = contact.hero || {};
    const line = contact.line || {};
    const form = contact.form || {};
    const location = contact.location || {};

    const lineUrl = safeUrl(line.url);
    const qrImage = safeUrl(line.qrImage, { image: true });
    const mapEmbedUrl = safeUrl(location.mapEmbedUrl);

    const phone = String(location.phone || '').trim();
    const email = String(location.email || '').trim();

    const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : '';
    const emailHref = email ? `mailto:${email}` : '';

    return `
      <div class="contact-page ct-page" data-contact-language="${esc(lang)}">

        <!-- INTRO -->
        <section class="ct-intro">
          <div class="ct-container ct-intro-inner">
            <div class="ct-eyebrow">${esc(localized(hero.tag, lang))}</div>

            <h1>${lines(localized(hero.title, lang))}</h1>

            <p>${lines(localized(hero.subtitle, lang))}</p>
          </div>
        </section>

        <!-- LINE + FORM -->
        <section class="ct-main">
          <div class="ct-container ct-main-grid">

            <article class="ct-line-card">
              <div class="ct-line-content">
                <div class="ct-line-icon">
                  ${ico('chat')}
                </div>

                <span class="ct-pill">${esc(localized(line.badge, lang))}</span>

                <h2>${lines(localized(line.title, lang))}</h2>

                <p class="ct-line-description">
                  ${lines(localized(line.description, lang))}
                </p>

                ${
                  lineUrl
                    ? `
                      <a
                        class="ct-line-button btn"
                        href="${esc(lineUrl)}"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ${ico('chat')}
                        <span>${esc(localized(line.buttonText, lang))}</span>
                      </a>
                    `
                    : ''
                }

                ${
                  qrImage
                    ? `
                      <div class="ct-qr-box">
                        ${
                          lineUrl
                            ? `
                              <a
                                class="ct-qr-image"
                                href="${esc(lineUrl)}"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img src="${esc(qrImage)}" alt="LINE OA QR Code">
                              </a>
                            `
                            : `
                              <div class="ct-qr-image">
                                <img src="${esc(qrImage)}" alt="LINE OA QR Code">
                              </div>
                            `
                        }

                        <p>${lines(localized(line.scanText, lang))}</p>

                        ${
                          line.lineId
                            ? `<strong>${esc(line.lineId)}</strong>`
                            : ''
                        }
                      </div>
                    `
                    : ''
                }
              </div>
            </article>

            <article class="ct-form-card">
              <div class="ct-form-heading">
                <div class="ct-eyebrow">${esc(localized(form.tag, lang))}</div>

                <h2>${esc(localized(form.title, lang))}</h2>

                <p>${esc(localized(form.description, lang))}</p>
              </div>

              <form id="contact-form" class="ct-form">
                <div class="ct-form-row">
                  <label>
                    <span>${esc(localized(form.labels?.name, lang))}</span>
                    <input
                      name="name"
                      type="text"
                      autocomplete="name"
                      required
                      maxlength="100"
                      placeholder="${esc(localized(form.placeholders?.name, lang))}"
                    >
                  </label>

                   <label>
                      <span>${esc(localized(form.labels?.email, lang))}</span>
                      <input
                        name="email"
                        type="email"
                        autocomplete="email"
                        required
                        maxlength="200"
                        placeholder="${esc(localized(form.placeholders?.email, lang))}"
                      >
                    </label>
                  </div>

                  <label>
                    <span>${esc(localized(form.labels?.phone, lang))}</span>
                    <input
                      name="phone"
                      type="tel"
                      autocomplete="tel"
                      maxlength="100"
                      placeholder="${esc(localized(form.placeholders?.phone, lang))}"
                    >
                  </label>

                  <label>
                    <span>${esc(localized(form.labels?.message, lang))}</span>
                    <textarea
                      name="message"
                      rows="5"
                      maxlength="3000"
                      placeholder="${esc(localized(form.placeholders?.message, lang))}"
                    ></textarea>
                  </label>

                <button class="ct-submit btn" type="submit">
                  <span>${esc(localized(form.buttonText, lang))}</span>
                  ${arrow()}
                </button>

                <p id="contact-form-status" class="ct-form-status" role="status" aria-live="polite"></p>
              </form>
            </article>

          </div>
        </section>

        <!-- CONTACT INFO -->
        <section class="ct-info">
          <div class="ct-container ct-info-grid">

            <div class="ct-info-item">
              <span class="ct-info-icon">${ico('chat')}</span>

              <div class="ct-info-label">
                ${lang === 'th' ? 'โทรศัพท์' : 'PHONE'}
              </div>

              ${
                phoneHref
                  ? `<a href="${esc(phoneHref)}">${esc(phone)}</a>`
                  : `<strong>${esc(phone)}</strong>`
              }

              <small>${lines(localized(location.officeHours, lang))}</small>
            </div>

            <div class="ct-info-item">
              <span class="ct-info-icon">${ico('mail')}</span>

              <div class="ct-info-label">
                ${lang === 'th' ? 'อีเมล' : 'EMAIL'}
              </div>

              ${
                emailHref
                  ? `<a href="${esc(emailHref)}">${esc(email)}</a>`
                  : `<strong>${esc(email)}</strong>`
              }

              <small>${esc(localized(location.emailNote, lang))}</small>
            </div>

            <div class="ct-info-item">
              <span class="ct-info-icon">${ico('pin')}</span>

              <div class="ct-info-label">
                ${lang === 'th' ? 'ที่อยู่' : 'ADDRESS'}
              </div>

              <strong>${esc(localized(location.company, lang))}</strong>

              <small>${lines(localized(location.address, lang))}</small>
            </div>

          </div>
        </section>

        <!-- MAP -->
        <section class="ct-map-section">
          <div class="ct-container">
            <div class="ct-map-card">
              ${
                mapEmbedUrl
                  ? `
                    <iframe
                      src="${esc(mapEmbedUrl)}"
                      width="100%"
                      height="100%"
                      style="border:0"
                      allowfullscreen
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                      title="${
                        lang === 'th'
                          ? 'แผนที่สถานที่ตั้งสำนักงาน'
                          : 'Office location map'
                      }"
                    ></iframe>
                  `
                  : `
                    <div class="ct-map-empty">
                      ${
                        lang === 'th'
                          ? 'ยังไม่ได้กำหนดแผนที่'
                          : 'Map has not been configured yet.'
                      }
                    </div>
                  `
              }
            </div>
          </div>
        </section>

      </div>
    `;
  };

  document.addEventListener('submit', (event) => {
    if (event.target.id !== 'contact-form') return;

    event.preventDefault();

    const status = document.getElementById('contact-form-status');
    if (!status) return;

    status.textContent =
      language() === 'th'
        ? 'แบบฟอร์มพร้อมใช้งานแล้ว แต่ยังไม่ได้เชื่อมระบบส่งข้อความ กรุณาติดต่อผ่าน LINE OA ในระหว่างนี้'
        : 'The form UI is ready, but message delivery is not connected yet. Please contact us through LINE OA for now.';
  });

  document.querySelector('#language')?.addEventListener('change', () => {
    const page = (location.hash.slice(1) || 'home').split('/')[0];
    if (page === 'contact') render();
  });

  const currentPage = (location.hash.slice(1) || 'home').split('/')[0];

  if (currentPage === 'contact') {
    render();
  }
})();