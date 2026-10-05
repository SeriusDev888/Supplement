// A deliberately blank contact page until the owner adds their details.
(() => {
  views.contact = () => `<section class="contact-page">
    <a class="contact-back" href="#home">← กลับหน้าแรก</a>
    <h1>Contact</h1>
    <div class="contact-content">${SiteCMS.escape(SiteCMS.contact().details || '')}</div>
  </section>`;
})();
