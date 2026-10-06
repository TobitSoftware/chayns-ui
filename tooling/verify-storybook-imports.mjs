import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { chromium, webkit } from 'playwright';

const directory = resolve(import.meta.dirname, '../storybook-static');
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};
const server = createServer(async (request, response) => {
  try {
    const path = new URL(request.url, 'http://localhost').pathname;
    const file = resolve(directory, `.${decodeURIComponent(path === '/' ? '/index.html' : path)}`);
    if (!file.startsWith(`${directory}${sep}`)) {
      response.writeHead(403).end();
      return;
    }
    const contents = await readFile(file);
    response.writeHead(200, {
      'Content-Type': mimeTypes[extname(file)] ?? 'application/octet-stream',
    });
    response.end(contents);
  } catch {
    response.writeHead(404).end();
  }
});
await new Promise((resolveReady, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', resolveReady);
});
const origin = `http://127.0.0.1:${server.address().port}`;

try {
  const index = JSON.parse(await readFile(resolve(directory, 'index.json'), 'utf8'));
  const stories = Object.values(index.entries).filter((entry) => entry.type === 'story');
  if (stories.length === 0) throw new Error('The static Storybook contains no stories.');
  for (const [name, engine] of [
    ['Chromium', chromium],
    ['WebKit', webkit],
  ]) {
    const browser = await engine.launch();
    try {
      for (const story of stories) {
        const page = await browser.newPage();
        try {
          const errors = [];
          page.on('pageerror', (error) => errors.push(error.message));
          page.on('requestfailed', (request) => {
            if (request.url().startsWith(origin) && new URL(request.url()).pathname.endsWith('.js'))
              errors.push(`${request.url()}: ${request.failure()?.errorText}`);
          });
          page.on('response', (response) => {
            if (response.url().startsWith(origin) && response.status() >= 400)
              errors.push(`${response.status()} ${response.url()}`);
          });
          await page.goto(
            `${origin}/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story`,
          );
          await page.locator('body.sb-show-main #storybook-root > *').first().waitFor();
          await page.locator('body:not(.sb-preparing-story)').waitFor();
          if (await page.locator('.sb-errordisplay').isVisible())
            errors.push(await page.locator('.sb-errordisplay').innerText());
          if (errors.length) throw new Error(`${name}: ${story.id}\n${errors.join('\n')}`);
        } finally {
          await page.close();
        }
      }
      console.log(
        `${name} ${browser.version()}: rendered all ${stories.length} static stories without module errors.`,
      );
    } finally {
      await browser.close();
    }
  }
} finally {
  await new Promise((resolveClosed, reject) =>
    server.close((error) => (error ? reject(error) : resolveClosed())),
  );
}
