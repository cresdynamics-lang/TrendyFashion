export type Colour = {
  slug: string;
  label: string;
  image: string;
  gallery?: string[];
  /** Sizes available for this colour/type - used on the order. */
  sizes?: string[];
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
  description?: string;
  /** Full colour count when `colours` was truncated for listing cards. */
  colourTotal?: number;
};

export type Catalog = {
  shop: string;
  whatsapp: string;
  whatsapp_e164: string;
  products: Product[];
};

/** Sizes for the selected colour/type, falling back to product-level sizes. */
export function sizesForColour(product: Product, colour?: Colour | null) {
  if (colour?.sizes?.length) return colour.sizes;
  return product.sizes;
}

const COLOUR_HEX: Record<string, string> = {
  grey: "#9CA3AF",
  gray: "#9CA3AF",
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
  beige: "#D4C4A8",
  khaki: "#C3B091",
  yellow: "#E4C441",
  red: "#B91C1C",
  green: "#3F6212",
  blue: "#1D4ED8",
  purple: "#6D28D9",
  orange: "#EA580C",
  gold: "#CA8A04",
  silver: "#A1A1AA",
  wheat: "#E8D5A3",
  maroon: "#7F1D1D",
  peach: "#FDBA74",
  mint: "#6EE7B7",
  sky: "#7DD3FC",
  slate: "#64748B",
  royal: "#1E3A8A",
  linen: "#EDE4D3",
  patterned: "#8B5E3C",
  multi: "#6B7280",
  casual: "#A8A29E",
};

/** Resolve a swatch colour from a slug or label (e.g. "Tassel Black" → black). */
export function colourHex(slugOrLabel: string) {
  const raw = (slugOrLabel || "").toLowerCase().replace(/_/g, "-");
  if (COLOUR_HEX[raw]) return COLOUR_HEX[raw];
  const compact = raw.replace(/\s+/g, "-");
  if (COLOUR_HEX[compact]) return COLOUR_HEX[compact];
  const keys = Object.keys(COLOUR_HEX).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    const needle = key.replace(/-/g, " ");
    if (raw.includes(needle) || raw.includes(key)) return COLOUR_HEX[key];
  }
  return "#6B7280";
}

export function imageSrc(path: string) {
  if (!path) return "/catalog/brand/logo.jpg";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("/")
  ) {
    return path;
  }
  return `/catalog/${path}`;
}

export function formatKes(amount: number) {
  return `KES ${amount.toLocaleString("en-KE")}`;
}

export function sizeSummary(sizes: string[]) {
  if (!sizes.length) return "";
  const isNumeric = sizes.every((s) => /^\d+$/.test(s));
  if (isNumeric) return `${sizes[0]}-${sizes[sizes.length - 1]}`;
  return sizes.join(" ");
}

/**
 * Drop description + colour extras so category grids don't ship
 * hundreds of KB of unused text into the client.
 * Keep at most 6 colours for swatches (card UI only shows 5 + “+N”).
 */
export function slimForCard(product: Product): Product {
  const total = product.colours.length;
  return {
    slug: product.slug,
    name: product.name,
    category: product.category,
    brand: product.brand,
    sizes: product.sizes,
    priceKes: product.priceKes,
    badge: product.badge,
    colourTotal: total,
    colours: product.colours.slice(0, 6).map((c) => ({
      slug: c.slug,
      label: c.label,
      image: c.image,
    })),
  };
}

export function slimForCards(products: Product[]) {
  return products.map(slimForCard);
}
