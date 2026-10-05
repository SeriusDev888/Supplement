import { fail } from './http.js';
import { validateDocument } from './validation.js';
const EMPTY = { schema: 1, theme: {}, pages: {}, global: { nodes: {}, additions: [], order: {} } };
export const state = async (db, key) =>
  await db
    .prepare('SELECT payload, revision, updated_at FROM editor_state WHERE key = ?')
    .bind(key)
    .first();
export const unpack = (row) =>
  row
    ? { document: JSON.parse(row.payload), revision: row.revision, updatedAt: row.updated_at }
    : { document: structuredClone(EMPTY), revision: 0, updatedAt: null };
export async function seed(db, user) {
  const now = new Date().toISOString();
  await db.batch(
    ['draft', 'published'].map((key) =>
      db
        .prepare(
          'INSERT OR IGNORE INTO editor_state (key,payload,revision,updated_at,updated_by) VALUES (?,?,0,?,?)',
        )
        .bind(key, JSON.stringify(EMPTY), now, user.id),
    ),
  );
}
export async function saveDraft(db, user, payload, revision) {
  await seed(db, user);
  const now = new Date().toISOString();
  const result = await db
    .prepare(
      "UPDATE editor_state SET payload=?,revision=revision+1,updated_at=?,updated_by=? WHERE key='draft' AND revision=?",
    )
    .bind(JSON.stringify(validateDocument(payload)), now, user.id, revision)
    .run();
  if (result.meta.changes !== 1)
    fail('มีฉบับร่างใหม่จากอีกแท็บ กรุณาโหลดฉบับล่าสุดก่อนบันทึก', 409);
  return unpack(await state(db, 'draft'));
}
