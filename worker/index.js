import { json, fail, readJSON, readLimited } from './http.js';
import { owner, requireOwner, writeOrigin } from './auth.js';
import { state, unpack, seed, saveDraft } from './storage.js';
import { detectImage } from './media.js';
export { validateDocument, safeURL } from './validation.js';
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url),
      path = url.pathname;
    try {
      if (path === '/api/editor/session') return json({ canEdit: !!owner(request, env) });
      if (path === '/api/content' && request.method === 'GET')
        return json(unpack(await state(env.DB, 'published')));
      if (path.startsWith('/media/') && request.method === 'GET') {
        const id = path.slice(7);
        if (!/^[a-f0-9-]{36}$/.test(id)) return new Response('Not found', { status: 404 });
        const media = await env.DB.prepare('SELECT mime,filename FROM editor_media WHERE id=?')
          .bind(id)
          .first();
        if (!media) return new Response('Not found', { status: 404 });
        const object = await env.BUCKET.get('editor/' + id);
        if (!object) return new Response('Not found', { status: 404 });
        return new Response(object.body, {
          headers: {
            'content-type': media.mime,
            'cache-control': 'public,max-age=31536000,immutable',
            'x-content-type-options': 'nosniff',
            ...(media.mime === 'application/pdf'
              ? {
                  'content-disposition': `attachment; filename="document.pdf"; filename*=UTF-8''${encodeURIComponent(media.filename)}`,
                  'content-security-policy': "sandbox; default-src 'none'",
                }
              : {}),
          },
        });
      }
      if (path.startsWith('/api/editor/')) {
        const user = requireOwner(request, env);
        if (request.method !== 'GET') writeOrigin(request);
        if (path === '/api/editor/draft' && request.method === 'GET') {
          const draft = await state(env.DB, 'draft'),
            published = await state(env.DB, 'published');
          return json({
            ...unpack(draft || published),
            publishedRevision: published?.revision || 0,
          });
        }
        if (path === '/api/editor/draft' && request.method === 'PUT') {
          const input = await readJSON(request);
          if (!Number.isInteger(input.revision) || input.revision < 0) fail('Invalid revision');
          return json(await saveDraft(env.DB, user, input.document, input.revision));
        }
        if (path === '/api/editor/publish' && request.method === 'POST') {
          const input = await readJSON(request);
          if (!Number.isInteger(input.revision) || !Number.isInteger(input.publishedRevision))
            fail('Invalid revision');
          await seed(env.DB, user);
          const now = new Date().toISOString(),
            version = crypto.randomUUID(),
            next = input.publishedRevision + 1;
          const results = await env.DB.batch([
            env.DB.prepare(
              "UPDATE editor_state SET payload=(SELECT payload FROM editor_state WHERE key='draft'),revision=revision+1,updated_at=?,updated_by=? WHERE key='published' AND revision=? AND EXISTS(SELECT 1 FROM editor_state WHERE key='draft' AND revision=?)",
            ).bind(now, user.id, input.publishedRevision, input.revision),
            env.DB.prepare(
              "INSERT INTO editor_versions (id,payload,created_at,created_by) SELECT ?,payload,?,? FROM editor_state WHERE key='published' AND revision=? AND updated_at=?",
            ).bind(version, now, user.id, next, now),
          ]);
          if (results[0].meta.changes !== 1)
            fail('ฉบับร่างหรือหน้าเผยแพร่เปลี่ยนแล้ว กรุณาโหลดข้อมูลล่าสุด', 409);
          return json({ publishedRevision: next, versionId: version, updatedAt: now });
        }
        if (path === '/api/editor/versions' && request.method === 'GET') {
          const rows = await env.DB.prepare(
            'SELECT id,created_at FROM editor_versions ORDER BY created_at DESC LIMIT 30',
          ).all();
          return json({ versions: rows.results });
        }
        if (path === '/api/editor/restore' && request.method === 'POST') {
          const input = await readJSON(request);
          if (!Number.isInteger(input.revision)) fail('Invalid revision');
          const row = await env.DB.prepare('SELECT payload FROM editor_versions WHERE id=?')
            .bind(input.id)
            .first();
          if (!row) fail('ไม่พบเวอร์ชันนี้', 404);
          return json(await saveDraft(env.DB, user, JSON.parse(row.payload), input.revision));
        }
        if (path === '/api/editor/media' && request.method === 'GET') {
          const rows = await env.DB.prepare(
            'SELECT id,filename,mime,size,created_at FROM editor_media ORDER BY created_at DESC LIMIT 150',
          ).all();
          return json({ media: rows.results.map((row) => ({ ...row, url: '/media/' + row.id })) });
        }
        if (
          ['/api/editor/media', '/api/editor/documents'].includes(path) &&
          request.method === 'POST'
        ) {
          const bytes = await readLimited(request, 10 * 1024 * 1024),
            pdf = path.endsWith('/documents'),
            mime = pdf
              ? new TextDecoder().decode(bytes.slice(0, 5)) === '%PDF-' &&
                new TextDecoder().decode(bytes.slice(-1024)).includes('%%EOF')
                ? 'application/pdf'
                : null
              : detectImage(bytes);
          if (!mime)
            fail(
              pdf ? 'กรุณาเลือกไฟล์ PDF ที่สมบูรณ์' : 'รองรับไฟล์ PNG, JPG, WebP และ GIF เท่านั้น',
            );
          const id = crypto.randomUUID();
          let name;
          try {
            name = decodeURIComponent(request.headers.get('x-file-name') || 'image');
          } catch {
            name = 'image';
          }
          name = name.slice(0, 180);
          await env.BUCKET.put('editor/' + id, bytes, { httpMetadata: { contentType: mime } });
          try {
            await env.DB.prepare(
              'INSERT INTO editor_media (id,filename,mime,size,created_at,created_by) VALUES (?,?,?,?,?,?)',
            )
              .bind(id, name, mime, bytes.length, new Date().toISOString(), user.id)
              .run();
          } catch (error) {
            await env.BUCKET.delete('editor/' + id);
            throw error;
          }
          return json({ id, url: '/media/' + id, filename: name, mime }, 201);
        }
        return json({ error: 'Not found' }, 404);
      }
      return env.ASSETS.fetch(request);
    } catch (error) {
      console.error('Editor request failed', path, error.message);
      return json(
        {
          error: error.status
            ? error.message
            : 'บันทึกไม่สำเร็จ กรุณาลองใหม่ ข้อมูลที่กำลังแก้ยังอยู่ในหน้านี้',
        },
        error.status || 503,
      );
    }
  },
};
