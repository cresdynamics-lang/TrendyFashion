import "server-only";
import { readCatalogFile } from "@/lib/catalog-io";
import { slimForCards, type Product } from "@/lib/product-utils";

export function getAllProductsLive(): Product[] {
  return readCatalogFile().products;
}

export function getProductLive(slug: string) {
  return getAllProductsLive().find((p) => p.slug === slug);
}

export function productsInPathLive(
  segments: string[],
  brand?: string | null,
  maxPrice?: number | null,
) {
  return getAllProductsLive().filter((p) => {
    const prefixMatch =
      segments.length === 0 ||
      segments.every((seg, i) => p.category[i] === seg);
    const containsMatch =
      segments.length > 1 &&
      segments.slice(1).every((seg) => p.category.includes(seg));
    const sneakerModelMatch =
      segments[0] === "sneakers" &&
      !!segments[1] &&
      (p.slug === segments[1] || p.category.includes(segments[1]));
    const pathOk = prefixMatch || containsMatch || sneakerModelMatch;
    if (!pathOk) return false;
    if (brand && p.brand !== brand) return false;
    if (maxPrice != null && p.priceKes > maxPrice) return false;
    return true;
  });
}

/** Category/listing payload without long descriptions. */
export function productsInPathCards(
  segments: string[],
  brand?: string | null,
  maxPrice?: number | null,
) {
  return slimForCards(productsInPathLive(segments, brand, maxPrice));
}
