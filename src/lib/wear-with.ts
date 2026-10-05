import type { Product } from "@/lib/product-utils";

export type ProductKind = "shirt" | "short" | "trouser" | "shoe" | "other";

function haystack(product: Product) {
  return `${product.slug} ${product.name} ${product.category.join(" ")}`.toLowerCase();
}

export function productKind(product: Product): ProductKind {
  const h = haystack(product);
  if (
    h.includes("short") ||
    product.category.includes("casual-shorts")
  ) {
    return "short";
  }
  if (
    h.includes("trouser") ||
    h.includes("khaki") ||
    h.includes("chino") ||
    product.category.includes("trousers")
  ) {
    return "trouser";
  }
  if (
    product.category[0] === "shoes" ||
    product.category[0] === "sneakers"
  ) {
    return "shoe";
  }
  if (
    product.category[0] === "clothing" &&
    (product.category.includes("tops") ||
      h.includes("shirt") ||
      h.includes("polo") ||
      h.includes("tee") ||
      h.includes("t-shirt"))
  ) {
    return "shirt";
  }
  return "other";
}

function byPriceNear(product: Product, pool: Product[]) {
  return [...pool].sort(
    (a, b) =>
      Math.abs(a.priceKes - product.priceKes) -
      Math.abs(b.priceKes - product.priceKes),
  );
}

function takeRoundRobin(limit: number, pools: Product[][]) {
  const out: Product[] = [];
  const seen = new Set<string>();
  const queues = pools.map((p) => [...p]);
  let guard = 0;
  while (out.length < limit && queues.some((q) => q.length) && guard < 40) {
    const q = queues[guard % queues.length];
    while (q.length) {
      const next = q.shift()!;
      if (!seen.has(next.slug)) {
        seen.add(next.slug);
        out.push(next);
        break;
      }
    }
    guard += 1;
  }
  return out;
}

/**
 * Outfit pairings:
 * - shirt → trousers (or shorts if no trousers)
 * - short → shoes
 * - shoe → shirt + trouser
 * - trouser → shoe + shirt
 */
export function wearWithProducts(
  product: Product,
  all: Product[],
  limit = 3,
): Product[] {
  const others = all.filter((p) => p.slug !== product.slug);
  const shirts = byPriceNear(
    product,
    others.filter((p) => productKind(p) === "shirt"),
  );
  const trousers = byPriceNear(
    product,
    others.filter((p) => productKind(p) === "trouser"),
  );
  const shorts = byPriceNear(
    product,
    others.filter((p) => productKind(p) === "short"),
  );
  const shoes = byPriceNear(
    product,
    others.filter((p) => productKind(p) === "shoe"),
  );
  const bottoms = trousers.length ? trousers : shorts;

  switch (productKind(product)) {
    case "shirt":
      return bottoms.slice(0, limit);
    case "short":
      return shoes.slice(0, limit);
    case "shoe":
      return takeRoundRobin(limit, [shirts, bottoms]);
    case "trouser":
      return takeRoundRobin(limit, [shoes, shirts]);
    default:
      return takeRoundRobin(limit, [shirts, bottoms, shoes]);
  }
}
