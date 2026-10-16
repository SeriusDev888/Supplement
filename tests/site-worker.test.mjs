import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../worker/index.js';

test('public site rejects editor routes and write requests before forwarding', async () => {
  const env = { ASSETS: { fetch() { throw new Error('Must not serve admin assets'); } } };
  for (const path of ['/editor.html', '/api/editor/session', '/api/editor/draft', '/api/unknown']) {
    assert.equal((await worker.fetch(new Request('https://site.test' + path), env)).status, 404);
  }
  for (const method of ['POST', 'PUT', 'DELETE']) {
    assert.equal((await worker.fetch(new Request('https://site.test/api/content', { method }), env)).status, 405);
    assert.equal((await worker.fetch(new Request('https://site.test/media/file', { method }), env)).status, 405);
  }
});

test('published content and media use the content service without visitor credentials', async () => {
  const seen = [];
  const env = {
    CONTENT_SERVICE: { async fetch(request) {
      seen.push(request);
      return new Response('published', { headers: { 'content-type': 'application/json' } });
    } },
  };
  for (const path of ['/api/content', '/media/asset?version=1']) {
    const response = await worker.fetch(new Request('https://site.test' + path, {
      headers: { cookie: 'private=1', authorization: 'Bearer private', 'oai-authenticated-user-email': 'owner@example.test' },
    }), env);
    assert.equal(await response.text(), 'published');
    assert.equal(new URL(seen.at(-1).url).pathname + new URL(seen.at(-1).url).search, path);
    assert.equal([...seen.at(-1).headers].length, 0);
  }
  const head = await worker.fetch(new Request('https://site.test/api/content', { method: 'HEAD' }), env);
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  assert.equal(seen.at(-1).method, 'GET');
});

test('storefront assets are served locally and upstream failure reports 503', async () => {
  let requested;
  const response = await worker.fetch(new Request('https://site.test/styles.css'), {
    ASSETS: { fetch(request) { requested = request.url; return new Response('body {}'); } },
  });
  assert.equal(requested, 'https://site.test/styles.css');
  assert.equal(await response.text(), 'body {}');
  assert.equal((await worker.fetch(new Request('https://site.test/api/content'), {
    CONTENT_SERVICE: { fetch() { throw new Error('offline'); } },
  })).status, 503);
});
