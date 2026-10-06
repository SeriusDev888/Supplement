import { mkdir, cp, copyFile, readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

// Anchor every build path to this project, not to the shell working directory.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist');
if (dirname(output) !== root || !output.endsWith('dist'))
  throw new Error('Invalid build directory');
// Preserve watched output directories while the local preview is running.
// Every application file is overwritten from its source on each build.
for (const dir of ['client', 'server', '.openai'])
  await mkdir(resolve(output, dir), { recursive: true });
await cp(resolve(root, 'public'), resolve(output, 'client'), { recursive: true });
const files = JSON.parse(await readFile(resolve(root, 'scripts/frontend-files.json'), 'utf8'));
for (const [filename, source] of Object.entries(files)) {
  await copyFile(resolve(root, source), resolve(output, 'client', filename));
}
const stickers = await readFile(resolve(root, 'src/shared/sticker-library.json'), 'utf8');
await writeFile(
  resolve(output, 'client/sticker-library.js'),
  `// Lucide icons, ISC license: assets/licenses/lucide.txt\nwindow.StickerLibrary = ${stickers};\nObject.assign(SiteDefaults.icons, Object.fromEntries(Object.entries(StickerLibrary).map(([key, item]) => [key, item.path])));\n`,
);
await build({
  entryPoints: [resolve(root, 'worker/index.js')],
  outfile: resolve(output, 'server/index.js'),
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
});
await copyFile(resolve(root, '.openai/hosting.json'), resolve(output, '.openai/hosting.json'));
await writeFile(
  resolve(output, 'server/wrangler.json'),
  JSON.stringify(
    {
      name: 'chashitsu-editor',
      main: 'index.js',
      compatibility_date: '2026-05-15',
      assets: {
        directory: '../client',
        binding: 'ASSETS',
        run_worker_first: ['/api/*', '/media/*'],
      },
      d1_databases: [
        {
          binding: 'DB',
          database_name: 'chashitsu-editor',
          database_id: '00000000-0000-4000-8000-000000000000',
          migrations_dir: '../../drizzle',
        },
      ],
      r2_buckets: [{ binding: 'BUCKET', bucket_name: 'chashitsu-editor' }],
    },
    null,
    2,
  ),
);
console.log('Built frontend sources and modular editor Worker');
