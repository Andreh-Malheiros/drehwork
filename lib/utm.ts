export type UtmAttribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
};

const STORAGE_KEY = "dreh:utm:v1";
const FIELDS = ["utm_source", "utm_medium", "utm_campaign"] as const;

function cleanUtmValue(value: unknown) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, 100)
    : "";
}

export function sanitizeUtmAttribution(value: unknown): UtmAttribution {
  const input = value && typeof value === "object" ? value as Record<string, unknown> : {};
  return {
    utm_source: cleanUtmValue(input.utm_source),
    utm_medium: cleanUtmValue(input.utm_medium),
    utm_campaign: cleanUtmValue(input.utm_campaign),
  };
}

export function captureUtmAttribution(search: string) {
  try {
    const params = new URLSearchParams(search);
    if (!FIELDS.some(field => params.has(field))) return;

    const previous = readUtmAttribution() ?? sanitizeUtmAttribution({});
    const incoming = sanitizeUtmAttribution(Object.fromEntries(FIELDS.map(field => [field, params.get(field) ?? ""])));
    const merged = Object.fromEntries(FIELDS.map(field => [field, incoming[field] || previous[field]])) as UtmAttribution;
    if (FIELDS.some(field => merged[field])) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // Attribution is best-effort when storage is unavailable.
  }
}

export function readUtmAttribution(): UtmAttribution | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const attribution = sanitizeUtmAttribution(JSON.parse(raw));
    return FIELDS.some(field => attribution[field]) ? attribution : null;
  } catch {
    return null;
  }
}

export function utmEmailRows(value: unknown): (readonly [string, string])[] {
  const attribution = sanitizeUtmAttribution(value);
  const rows: (readonly [string, string])[] = [
    ["UTM source", attribution.utm_source],
    ["UTM medium", attribution.utm_medium],
    ["UTM campaign", attribution.utm_campaign],
  ];
  return rows.filter(([, entry]) => Boolean(entry));
}
