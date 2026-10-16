import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

test('public site stays read-only in an iframe, including preview query parameters and editor messages', async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  });
  try {
    const page = await browser.newPage();
    const requests = [];
    const errors = [];
    page.on('request', (request) => requests.push(new URL(request.url()).pathname));
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(process.env.SITE_URL || 'http://127.0.0.1:4319/');
    await page.evaluate(() => {
      const iframe = document.createElement('iframe');
      iframe.id = 'public-content-test';
      iframe.src = '/?editor-preview=1#ingredients';
      iframe.style.cssText = 'width:1200px;height:900px';
      document.body.append(iframe);
    });
    const iframe = await page.locator('#public-content-test').elementHandle();
    const frame = await iframe.contentFrame();
    await frame.locator('h1').waitFor();
    await frame.waitForFunction(() => document.querySelector('h1')?.dataset.contentId);
    const before = await frame.locator('h1').innerText();
    const id = await frame.locator('h1').getAttribute('data-content-id');
    await page.evaluate((id) => {
      document.querySelector('#public-content-test').contentWindow.postMessage({
        source: 'chashitsu-editor',
        type: 'state',
        document: {
          schema: 1,
          theme: {},
          global: { nodes: {} },
          pages: { ingredients: { nodes: { [id]: { text: 'UNPUBLISHED MESSAGE' } } } },
        },
      }, location.origin);
    }, id);
    await frame.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    assert.equal(await frame.locator('h1').innerText(), before);
    assert.equal(await frame.locator('.ve-selection-tools,.ve-editable,[data-editor-ui]').count(), 0);
    await frame.locator('h1').dblclick();
    assert.equal(await frame.locator('[contenteditable]').count(), 0);
    assert.ok(!requests.some((path) => /(?:editor|preview)-runtime\.(?:js|css)$|^\/api\/editor\//.test(path)));
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
});
