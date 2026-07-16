import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = path => readFile(new URL(path, root), "utf8");

test("keeps factual portfolio classification and no fake insights", async () => {
  const content = await read("content/site.ts");
  assert.match(content, /name: "Ammis Moda"[\s\S]*createdByDrehWork: false/);
  assert.match(content, /export const insights: Insight\[\] = \[\]/);
  assert.doesNotMatch(content, /depoimento|% de conversão|clientes satisfeitos/i);
});

test("keeps intro scroll lock guarded and skippable after session", async () => {
  const intro = await read("components/IntroActivation.tsx");
  assert.match(intro, /function acquireIntroLock/);
  assert.match(intro, /INTRO_WATCHDOG_DURATION/);
  assert.match(intro, /finally\s*{\s*complete\(\)/);
  assert.match(intro, /startExit\(\)\.catch/);
  assert.match(intro, /if \(alreadySeen\)[\s\S]*setVisible\(false\)/);
  assert.match(intro, /previousHtmlOverflow/);
  assert.match(intro, /previousBodyOverflow/);
});

test("keeps review-mode diagnostic isolated", async () => {
  const adapter = await read("lib/diagnostic-service.ts");
  const wizard = await read("components/DiagnosticWizard.tsx");
  assert.match(adapter, /mode: "review"/);
  assert.doesNotMatch(adapter, /fetch\(|axios|googleapis/i);
  assert.match(wizard, /Nenhuma informação foi enviada/);
  assert.match(wizard, /localStorage/);
});

test("includes required discovery and accessibility foundations", async () => {
  const [layout, css, page] = await Promise.all([read("app/layout.tsx"), read("app/globals.css"), read("app/[[...slug]]/page.tsx")]);
  assert.match(layout, /application\/ld\+json/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(page, /Política de Privacidade/);
  assert.match(page, /Página 404|notFound/);
  await access(new URL("app/sitemap.ts", root));
  await access(new URL("app/robots.ts", root));
  await access(new URL("public/og.png", root));
});
