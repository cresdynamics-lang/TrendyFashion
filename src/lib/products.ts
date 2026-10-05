import catalog from "../../catalog/products.json";
import type { Catalog, Product } from "@/lib/product-utils";

export type { Colour, Product, Catalog } from "@/lib/product-utils";
export {
  colourHex,
  formatKes,
  imageSrc,
  sizeSummary,
  sizesForColour,
  slimForCard,
  slimForCards,
} from "@/lib/product-utils";

const data = catalog as Catalog;

export function getAllProducts(): Product[] {
  return data.products;
}

export function getProduct(slug: string) {
  return data.products.find((p) => p.slug === slug);
}

export function getColour(product: Product, colourSlug?: string) {
  if (!colourSlug) return product.colours[0];
  return (
    product.colours.find((c) => c.slug === colourSlug) ?? product.colours[0]
  );
}

/** Match products whose category path starts with the given segments. */
export function productsInPath(
  segments: string[],
  brand?: string | null,
  maxPrice?: number | null,
) {
  return data.products.filter((p) => {
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

export function newInProducts() {
  return [...data.products].sort((a, b) => {
    const aNew = a.badge === "New" ? 0 : 1;
    const bNew = b.badge === "New" ? 0 : 1;
    return aNew - bNew || a.priceKes - b.priceKes;
  });
}

export function trendingProducts() {
  const picks = [
    "dunk-low",
    "cloud-runner",
    "textured-trousers",
    "buckle-slide",
    "samba",
    "zip-neck-polo",
    "monk-strap",
    "timberland-hightop",
  ];
  return picks.map((slug) => getProduct(slug)).filter(Boolean) as Product[];
}

export function categoryTitle(segments: string[]) {
  if (!segments.length) return "Shop";
  return segments
    .map((s) =>
      s
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
    )
    .join(" · ");
}

export function categoryPromise(root: string) {
  const map: Record<string, string> = {
    shoes:
      "Monk straps, oxfords, loafers and boots that carry a full workday and the dinner after it.",
    sneakers: "Pick your pair. Pick your colour. We’ll hold it.",
    clothing: "Fit, fabric and what it goes with - written plainly.",
  };
  return map[root] ?? "Browse the range and order on WhatsApp.";
}

export const SUBTILES: Record<
  string,
  { label: string; href: string; image?: string }[]
> = {
  shoes: [
    {
      label: "Officials",
      href: "/shoes/officials",
      image: "/catalog/shoes/officials/monk-strap/black.jpeg",
    },
    {
      label: "Casuals",
      href: "/shoes/casuals",
      image: "/catalog/shoes/casuals/suede-penny-loafer/brown.jpg",
    },
    {
      label: "Sandals & Slides",
      href: "/shoes/sandals-slides",
      image: "/catalog/shoes/sandals-slides/buckle-slide/black.jpeg",
    },
  ],
  "shoes/officials": [
    { label: "Monk straps", href: "/shoes/officials/monk-straps" },
    { label: "Loafers", href: "/shoes/officials/loafers" },
    { label: "Oxford & derby", href: "/shoes/officials/oxford-derby" },
    { label: "Official boots", href: "/shoes/officials/official-boots" },
  ],
  "shoes/casuals": [
    { label: "Casual loafers", href: "/shoes/casuals/casual-loafers" },
    { label: "Lace-ups", href: "/shoes/casuals/lace-up-casuals" },
    { label: "Casual boots", href: "/shoes/casuals/casual-boots" },
  ],
  "shoes/sandals-slides": [
    { label: "Buckle slides", href: "/shoes/sandals-slides/buckle-slides" },
    { label: "Clogs & mules", href: "/shoes/sandals-slides/clogs-mules" },
  ],
  sneakers: [
    {
      label: "New Balance",
      href: "/sneakers/shop-by-model/new-balance",
      image: "/catalog/sneakers/dunk-low/olive-blue.jpeg",
    },
    {
      label: "Dunk Low",
      href: "/sneakers/shop-by-model/dunk-low",
      image: "/catalog/sneakers/dunk-low/olive-blue.jpeg",
    },
    {
      label: "Air Force 1",
      href: "/sneakers/shop-by-model/air-force-1",
      image: "/catalog/sneakers/air-force-1/pink-grey.jpeg",
    },
    {
      label: "Samba",
      href: "/sneakers/shop-by-model/samba",
      image: "/catalog/sneakers/samba/chocolate.jpeg",
    },
    {
      label: "Jordan",
      href: "/sneakers/shop-by-model/jordan",
      image: "/catalog/sneakers/dunk-low/olive-blue.jpeg",
    },
  ],
  clothing: [
    {
      label: "Men's shirts",
      href: "/clothing/tops/shirts",
      image: "/catalog/clothing/tops/raglan-oversized-tee/brown.jpeg",
    },
    {
      label: "Men's trousers",
      href: "/clothing/bottoms/trousers",
      image: "/catalog/clothing/bottoms/textured-trousers/charcoal.jpeg",
    },
    {
      label: "Polos",
      href: "/clothing/tops/polos",
      image: "/catalog/clothing/tops/zip-neck-polo/teal.jpeg",
    },
    {
      label: "Shorts",
      href: "/clothing/bottoms/casual-shorts",
      image: "/catalog/clothing/bottoms/textured-trousers/charcoal.jpeg",
    },
  ],
  "clothing/tops": [
    { label: "Shirts", href: "/clothing/tops/shirts" },
    { label: "Long-sleeve shirts", href: "/clothing/tops/long-sleeve-shirts" },
    { label: "Polos", href: "/clothing/tops/polos" },
    { label: "T-shirts", href: "/clothing/tops/t-shirts" },
  ],
  "clothing/bottoms": [
    { label: "Trousers", href: "/clothing/bottoms/trousers" },
    { label: "Casual shorts", href: "/clothing/bottoms/casual-shorts" },
  ],
};
