const base = "http://127.0.0.1:3907";
const pages = ["/", "/servicos", "/diagnostico", "/contato"];
const checked = new Map();

for (const page of pages) {
  const response = await fetch(base + page);
  if (!response.ok) checked.set(page, response.status);
  const html = await response.text();
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const path = new URL(href, base).pathname;
    if (checked.has(path)) continue;
    const target = await fetch(base + path, { redirect: "manual" });
    checked.set(path, target.status);
  }
}

const bad = [...checked].filter(([, status]) => status >= 400);
console.log(JSON.stringify({ uniqueInternalPaths: checked.size, bad }, null, 2));
if (bad.length) process.exitCode = 1;
