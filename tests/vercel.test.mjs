import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../worker/index.js';
import { createHandler } from '../platform/vercel.js';

test('Vercel serves the public site and proxies published content/media without visitor credentials', async (t) => {
  const originalFetch = globalThis.fetch,
    seen = [];
  t.after(() => {
    globalThis.fetch = originalFetch;
  });
  globalThis.fetch = async (request) => {
    seen.push(request);
    return request.url.includes('/media/')
      ? new Response(null, {
          status: 302,
          headers: {
            location: 'https://storage.example.test/signed?token=temporary',
            'cache-control': 'no-store',
          },
        })
      : Response.json({ document: { schema: 1 } });
  };
  const handler = createHandler(worker, {
    environment: () => ({ CONTENT_ORIGIN: 'https://admin.test' }),
  });
  const page = await handler.fetch(new Request('https://supplement.test/'));
  assert.equal(page.status, 200);
  assert.match(await page.text(), /CHASHITSU/);
  assert.equal(
    (await handler.fetch(new Request('https://supplement.test/editor.html'))).status,
    404,
  );
  for (const path of ['/api/content', '/media/123']) {
    const response = await handler.fetch(
      new Request('https://supplement.test' + path, {
        headers: { cookie: 'private=user', authorization: 'Bearer secret' },
      }),
    );
    assert.equal(response.status, path.startsWith('/media') ? 302 : 200);
    const request = seen.at(-1);
    assert.equal(request.url, 'https://admin.test' + path);
    assert.equal(request.headers.get('cookie'), null);
    assert.equal(request.headers.get('authorization'), null);
    assert.equal(request.redirect, 'manual');
    if (path.startsWith('/media'))
      assert.ok(response.headers.get('location').includes('temporary'));
  }
  assert.equal(
    (await handler.fetch(new Request('https://supplement.test/api/content', { method: 'POST' })))
      .status,
    405,
  );
});
