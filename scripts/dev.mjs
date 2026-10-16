import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
// .env is optional, and existing process variables take precedence.
try { process.loadEnvFile(resolve(root, '.env')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
mkdirSync(resolve(root, '.wrangler/logs'), { recursive: true });
const vars = ['--var', `CONTENT_ORIGIN:${process.env.CONTENT_ORIGIN || 'http://127.0.0.1:4320'}`];
const child = spawn(process.execPath, [
  resolve(root, 'node_modules/wrangler/bin/wrangler.js'),
  'dev', '--local', '--config', 'dist/server/wrangler.json', '--persist-to', '.wrangler/state',
  '--ip', '127.0.0.1', '--port', process.env.PORT || '4319', ...vars,
], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, WRANGLER_LOG_PATH: resolve(root, '.wrangler/logs'), WRANGLER_SEND_METRICS: 'false' },
});
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('exit', (code) => process.exit(code || 0));
