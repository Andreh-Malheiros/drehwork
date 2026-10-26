import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

// Editorial rules: docs/11-blog-insights.md
const dir = new URL("../content/insights/", import.meta.url);
const read = path => readFile(new URL(path, dir), "utf8");
const files = (await readdir(dir)).filter(name => name.endsWith(".json"));
const guides = (await Promise.all(files.map(async name => JSON.parse(await read(name))))).flat();
const published = guides.filter(guide => guide.status === "published");
const index = await read("index.ts");
const categories = [...index.match(/insightCategories = \[([^\]]+)\]/)[1].matchAll(/"([^"]+)"/g)].map(m => m[1]);
const site = await readFile(new URL("../content/site.ts", import.meta.url), "utf8");
const serviceSlugs = [...site.matchAll(/^    slug: "([^"]+)"/gm)].map(m => m[1]);
const words = text => text.split(/\s+/).filter(Boolean).length;
const bodyWords = g => words([g.intro, ...g.sections.flatMap(s => [...(s.paragraphs ?? []), ...(s.items ?? [])]), ...g.faqs.flat()].join(" "));
const fold = text => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const NEWS = "Notícias e tendências";

test("publishes at least 20 guides covering every category", () => {
  assert.ok(published.length >= 20, `published: ${published.length}`);
  for (const category of categories.filter(c => c !== NEWS)) assert.ok(published.some(g => g.category === category), `category without guide: ${category}`);
});

test("keeps slugs and main keywords unique", () => {
  const slugs = guides.map(g => g.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  const keywords = guides.map(g => fold(g.keyword));
  assert.equal(new Set(keywords).size, keywords.length);
  for (const slug of slugs) assert.match(slug, /^[a-z0-9]+(-[a-z0-9]+)*$/);
});

for (const g of published) {
  test(`guide meets editorial rules: ${g.slug}`, () => {
    assert.ok(categories.includes(g.category), "unknown category");
    assert.ok(g.seoTitle.length <= 60, `seoTitle ${g.seoTitle.length} chars`);
    assert.ok(g.description.length >= 110 && g.description.length <= 160, `description ${g.description.length} chars`);
    assert.match(g.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(g.updated, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(g.updated >= g.date, "updated before date");
    const keyword = fold(g.keyword);
    assert.ok(fold(`${g.title} ${g.seoTitle}`).includes(keyword), "keyword missing from title");
    assert.ok(fold(g.intro).includes(keyword), "keyword missing from intro");
    assert.ok(g.sections.length >= 4, "fewer than 4 sections");
    assert.ok(g.faqs.length >= 3, "fewer than 3 FAQs");
    assert.ok(bodyWords(g) >= 700, `only ${bodyWords(g)} words`);
    const related = g.relatedServices.filter(slug => serviceSlugs.includes(slug));
    assert.ok(related.length >= 2 && related.length === g.relatedServices.length, "needs 2+ valid related services");
    const sources = g.sources ?? [];
    for (const source of sources) assert.match(source.url, /^https:\/\//, "source must be an https URL");
    if (g.category === NEWS) assert.ok(sources.length >= 2, "news needs 2+ sources");
    const text = JSON.stringify({ ...g, sources: undefined });
    if (!sources.length) assert.doesNotMatch(text, /\d\s?%/, "percentages need a verifiable source");
    assert.doesNotMatch(text, /depoimento|garantimos|resultado garantido|primeira posição garantida/i);
  });
}
