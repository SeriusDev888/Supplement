// Local-only identity is injected by the test browser. Production identity comes from Sites.
import { spawn } from 'node:child_process';
const child = spawn(
  process.execPath,
  [
    'node_modules/wrangler/bin/wrangler.js',
    'dev',
    '--local',
    '--config',
    'dist/server/wrangler.json',
    '--persist-to',
    '.wrangler/state',
    '--ip',
    '127.0.0.1',
    '--port',
    '4319',
    '--var',
    'EDITOR_OWNER_EMAIL:owner@example.test',
  ],
  { stdio: 'inherit' },
);
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('exit', (code) => process.exit(code || 0));
