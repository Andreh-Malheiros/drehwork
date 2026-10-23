import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = path => readFile(new URL(path, root), "utf8");

test("keeps factual portfolio classification and no fake claims", async () => {
  const content = await read("content/site.ts");
  assert.match(content, /name: "Ammis Moda"[\s\S]*createdByDrehWork: false/);
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

test("diagnostic sends through the validated API with consent and honeypot", async () => {
  const [adapter, wizard, route, schema] = await Promise.all([read("lib/diagnostic-service.ts"), read("components/DiagnosticWizard.tsx"), read("app/api/diagnostico/route.ts"), read("lib/diagnostic-schema.ts")]);
  assert.match(adapter, /fetch\("\/api\/diagnostico"/);
  assert.match(route, /validateDiagnostic\(body\)/);
  assert.match(route, /body\.website/);
  assert.match(route, /mailerConfigured\(\)/);
  assert.match(await read("lib/mailer.ts"), /process\.env\.RESEND_API_KEY/);
  const contact = await read("app/api/contato/route.ts");
  assert.match(contact, /body\.consent !== true/);
  assert.doesNotMatch(await read("components/Header.tsx"), /event\.preventDefault\(\)\}>/);
  assert.match(schema, /source\.consent !== true/);
  assert.match(wizard, /localStorage/);
  assert.doesNotMatch(wizard, /modo de revisão|Nenhuma informação foi enviada/i);
});

test("includes required discovery and accessibility foundations", async () => {
  const [layout, css, page] = await Promise.all([read("app/layout.tsx"), read("app/globals.css"), read("app/[[...slug]]/page.tsx")]);
  assert.match(layout, /JsonLd data=\{organizationSchema\(\)\}/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(await read("content/legal.ts"), /Política de Privacidade/);
  assert.match(page, /Página 404|notFound/);
  await access(new URL("app/sitemap.ts", root));
  await access(new URL("app/robots.ts", root));
  await access(new URL("public/og.png", root));
});

test("uses the official www.drehwork.com domain everywhere", async () => {
  const files = ["content/site.ts", "app/layout.tsx", "app/robots.ts", "app/sitemap.ts"];
  const sources = await Promise.all(files.map(read));
  for (const source of sources) assert.doesNotMatch(source, /drehwork\.com\.br/);
  assert.match(sources[0], /url: "https:\/\/www\.drehwork\.com"/);
  assert.match(sources[0], /email: "contato@drehwork\.com"/);
});

test("ships brand icons, manifest and logo", async () => {
  for (const file of ["app/icon.svg", "app/favicon.ico", "app/apple-icon.png", "app/manifest.ts", "public/brand/icon-512.png", "public/brand/icon-maskable-512.png", "public/og.png"]) await access(new URL(file, root));
  const header = await read("components/Header.tsx");
  assert.match(header, /<BrandLogo \/>/);
});

test("keeps SEO foundations consistent", async () => {
  const [seo, site] = await Promise.all([read("lib/seo.tsx"), read("content/site.ts")]);
  assert.match(seo, /sobre:/);
  assert.match(seo, /replace\(\/<\/g/);
  assert.doesNotMatch(seo, /insights: \{[^}]*index: false/);
  assert.match(site, /\["Guias", "\/insights"\]/);
  await access(new URL("public/llms.txt", root));
});

test("legal documents identify the controller and consent gates analytics", async () => {
  const [legal, consent, layout] = await Promise.all([read("content/legal.ts"), read("lib/consent.ts"), read("app/layout.tsx")]);
  assert.match(legal, /brand\.legalName/);
  assert.match(legal, /brand\.cnpj/);
  assert.match(legal, /art\. 18 da LGPD/);
  assert.doesNotMatch(legal, /sujeito a revisão|não representa validação jurídica/i);
  assert.match(consent, /CONSENT_KEY = "dreh-consent"/);
  assert.match(layout, /<CookieConsent \/>/);
});

test("analytics only loads Google after consent", async () => {
  const bridge = await read("components/AnalyticsBridge.tsx");
  assert.match(bridge, /analytics_storage: "denied"/);
  assert.match(bridge, /if \(!granted \|\| document\.getElementById\("ga4-script"\)\) return;/);
  assert.doesNotMatch(bridge, /email:|whatsapp:|responsible/);
});
