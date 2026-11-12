import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = path => readFile(new URL(path, root), "utf8");

test("captures, validates, preserves and includes UTM attribution in lead emails", async () => {
  const [utm, bridge, requestForm, diagnosticForm, contactRoute, diagnosticRoute] = await Promise.all([
    read("lib/utm.ts"), read("components/AnalyticsBridge.tsx"), read("components/ProjectRequestForm.tsx"),
    read("components/DiagnosticWizard.tsx"), read("app/api/contato/route.ts"), read("app/api/diagnostico/route.ts"),
  ]);

  assert.match(bridge, /captureUtmAttribution\(location\.search\)/);
  assert.match(utm, /sessionStorage\.setItem\(STORAGE_KEY/);
  assert.match(utm, /sessionStorage\.getItem\(STORAGE_KEY/);
  assert.match(utm, /slice\(0, 100\)/);
  for (const field of ["utm_source", "utm_medium", "utm_campaign"]) assert.match(utm, new RegExp(field));
  assert.match(requestForm, /utm: readUtmAttribution\(\)/);
  assert.match(diagnosticForm, /utm: readUtmAttribution\(\)/);
  assert.match(contactRoute, /rows\.push\(\.\.\.utmEmailRows\(body\.utm\)\)/);
  assert.match(diagnosticRoute, /rows\.push\(\.\.\.utmEmailRows\(body\.utm\)\)/);
});

