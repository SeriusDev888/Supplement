// Contact content shares the editor's draft, undo, save and publish lifecycle.
(() => {
  const field = document.getElementById('contact-details');
  field.addEventListener('change', () => {
    EditorAPI.mutate(() => {
      EditorAPI.document().contact = { details: field.value };
    });
  });
  function syncContact() {
    field.value = EditorAPI.document()?.contact?.details || '';
  }
  addEventListener('editor:document', syncContact);
  syncContact();
})();
