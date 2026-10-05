import type { Product } from "@/lib/product-utils";

const ALIASES: Record<string, string[]> = {
  dunks: ["dunk"],
  dunk: ["dunk"],
  sambas: ["samba"],
  samba: ["samba"],
  monkstrap: ["monk"],
  "monk strap": ["monk"],
  polo: ["polo"],
  empire: ["empire"],
  clarks: ["clarks"],
  timberland: ["timberland"],
  shirt: ["shirt"],
  shorts: ["shorts"],
};

export function filterProducts(products: Product[], q: string): Product[] {
  const query = q.trim().toLowerCase();
  if (!query) return [];

  const tokens = Array.from(
    new Set([
      query,
      ...(ALIASES[query] ?? []),
      ...query.split(/\s+/).filter(Boolean),
    ]),
  );

  return products.filter((p) => {
    const hay =
      `${p.name} ${p.slug} ${p.brand ?? ""} ${p.category.join(" ")} ${p.colours.map((c) => c.label).join(" ")} ${p.description ?? ""}`.toLowerCase();
    return tokens.some((t) => t.length >= 2 && hay.includes(t));
  });
}
