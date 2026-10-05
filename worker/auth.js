import { fail } from './http.js';
export function owner(request, env) {
  const id = request.headers.get('oai-authenticated-user-id'),
    email = request.headers.get('oai-authenticated-user-email');
  return id &&
    email &&
    env.EDITOR_OWNER_EMAIL &&
    email.toLowerCase() === env.EDITOR_OWNER_EMAIL.toLowerCase()
    ? { id, email }
    : null;
}
export function requireOwner(request, env) {
  const user = owner(request, env);
  if (!user) fail('เฉพาะเจ้าของเว็บไซต์เท่านั้นที่เข้าโหมดแก้ไขได้', 403);
  return user;
}
export function writeOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin) fail('Invalid request origin', 403);
  if (request.headers.get('x-editor-request') !== '1') fail('Invalid editor request', 403);
}
