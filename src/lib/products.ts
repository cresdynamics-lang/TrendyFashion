import catalog from "../../catalog/products.json";

export type Colour = {
  slug: string;
  label: string;
  image: string;
  gallery?: string[];
};

export type Product = {
  slug: string;
  name: string;
  category: string[];
  brand?: string;
  sizes: string[];
  colours: Colour[];
  priceKes: number;
  badge?: string | null;
};

export type Catalog = {
  shop: string;
  whatsapp: string;
  whatsapp_e164: string;
  products: Product[];
};

const data = catalog as Catalog;

const COLOUR_HEX: Record<string, string> = {
  grey: "#9CA3AF",
  brown: "#6B3F2A",
  black: "#111111",
  sand: "#C2B280",
  cream: "#F5F0E6",
  olive: "#556B2F",
  camel: "#C19A6B",
  teal: "#2A5A56",
  white: "#F3F4F6",
  charcoal: "#36454F",
  navy: "#0A1F44",
  "pink-grey": "#D8A7B1",
  pink: "#F4C2C2",
  "olive-blue": "#6B7F5A",
  "black-purple": "#4C1D95",
  chocolate: "#3D2B1F",
  "white-black": "#E5E7EB",
  burgundy: "#6B1E2F",
  "navy-orange": "#1E3A5F",
  tan: "#D2A679",
  "navy-alt": "#1B3A5C",
  mustard: "#D4A017",
  sage: "#8A9A7B",
};

export function colourHex(slug: string) {
  return COLOUR_HEX[slug] ?? "#6B7280";
}

export function imageSrc(path: string) {
  if (!path) return "/catalog/brand/logo.jpg";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path;
  }
  return `/catalog/${path}`;
}

export function formatKes(amount: number) {
  return `KES ${amount.toLocaleString("en-KE")}`;
}

export function getAllProducts(): Product[] {
  return data.products;
}

export function getProduct(slug: string) {
  return data.products.find((p) => p.slug === slug);
}

export function getColour(product: Product, colourSlug?: string) {
  if (!colourSlug) return product.colours[0];
  return product.colours.find((c) => c.slug === colourSlug) ?? product.colours[0];
}

export function sizeSummary(sizes: string[]) {
  if (!sizes.length) return "";
  const isNumeric = sizes.every((s) => /^\d+$/.test(s));
  if (isNumeric) return `${sizes[0]}–${sizes[sizes.length - 1]}`;
  return sizes.join(" ");
}

/** Match products whose category path starts with the given segments. */
export function productsInPath(segments: string[], brand?: string | null, maxPrice?: number | null) {
  return data.products.filter((p) => {
    const prefixMatch =
      segments.length === 0 || segments.every((seg, i) => p.category[i] === seg);
    const containsMatch =
      segments.length > 1 && segments.slice(1).every((seg) => p.category.includes(seg));
    const sneakerModelMatch =
      segments[0] === "sneakers" && !!segments[1] && (p.slug === segments[1] || p.category.includes(segments[1]));
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
    shoes: "Monk straps, oxfords, loafers and boots that carry a full workday and the dinner after it.",
    sneakers: "Pick your pair. Pick your colour. We’ll hold it.",
    clothing: "Fit, fabric and what it goes with — written plainly.",
  };
  return map[root] ?? "Browse the range and order on WhatsApp.";
}

export const SUBTILES: Record<string, { label: string; href: string; image?: string }[]> = {
  shoes: [
    { label: "Officials", href: "/shoes/officials", image: "/catalog/shoes/officials/monk-strap/black.jpeg" },
    { label: "Casuals", href: "/shoes/casuals", image: "/catalog/shoes/casuals/suede-penny-loafer/brown.jpg" },
    {
      label: "Sandals & Slides",
      href: "/shoes/sandals-slides",
      image: "/catalog/shoes/sandals-slides/buckle-slide/black.jpeg",
    },
  ],
  "shoes/officials": [
    { label: "Monk straps", href: "/shoes/officials/monk-straps" },
    { label: "Loafers", href: "/shoes/officials/loafers" },
    { label: "Chelsea & boots", href: "/shoes/officials/official-boots" },
  ],
  "shoes/casuals": [
    { label: "Casual loafers", href: "/shoes/casuals/casual-loafers" },
    { label: "Lace-ups", href: "/shoes/casuals/lace-up-casuals" },
    { label: "Chunky soles", href: "/shoes/casuals/chunky-sole-casuals" },
    { label: "Casual boots", href: "/shoes/casuals/casual-boots" },
  ],
  sneakers: [
    { label: "Dunk Low", href: "/sneakers/dunk-low", image: "/catalog/sneakers/dunk-low/olive-blue.jpeg" },
    { label: "Air Force 1", href: "/sneakers/air-force-1", image: "/catalog/sneakers/air-force-1/pink-grey.jpeg" },
    { label: "Samba", href: "/sneakers/samba", image: "/catalog/sneakers/samba/chocolate.jpeg" },
    { label: "Air Max", href: "/sneakers/air-max", image: "/catalog/sneakers/air-max/black-purple.jpeg" },
  ],
  clothing: [
    { label: "Tops", href: "/clothing/tops", image: "/catalog/clothing/tops/raglan-oversized-tee/brown.jpeg" },
    { label: "Bottoms", href: "/clothing/bottoms", image: "/catalog/clothing/bottoms/textured-trousers/charcoal.jpeg" },
    { label: "Polos", href: "/clothing/tops/polos", image: "/catalog/clothing/tops/zip-neck-polo/teal.jpeg" },
    { label: "Long sleeves", href: "/clothing/tops/long-sleeve-shirts", image: "/catalog/clothing/tops/zip-neck-polo/white.jpeg" },
  ],
  "clothing/tops": [
    { label: "T-shirts", href: "/clothing/tops/t-shirts" },
    { label: "Polos", href: "/clothing/tops/polos" },
    { label: "Long-sleeve shirts", href: "/clothing/tops/long-sleeve-shirts" },
  ],
};
