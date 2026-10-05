import type { Product } from "@/lib/product-utils";

export type ShopSection = "all" | "officials" | "casuals" | "other";

export const SHOP_SECTIONS: {
  id: ShopSection;
  label: string;
  href: string;
  blurb: string;
}[] = [
  {
    id: "all",
    label: "All products",
    href: "/shop",
    blurb: "Every shoe and clothing piece in one place.",
  },
  {
    id: "officials",
    label: "Officials",
    href: "/shop/officials",
    blurb: "Monk straps, oxfords, loafers and official boots.",
  },
  {
    id: "casuals",
    label: "Casuals",
    href: "/shop/casuals",
    blurb: "Everyday casual shoes and lace-ups.",
  },
  {
    id: "other",
    label: "Other",
    href: "/shop/other",
    blurb: "Sneakers, sandals, shirts, polos and more.",
  },
];

export function isOfficialProduct(p: Product) {
  return p.category.includes("officials");
}

export function isCasualProduct(p: Product) {
  return p.category[0] === "shoes" && p.category.includes("casuals");
}

export function productsForShopSection(
  section: ShopSection,
  all: Product[],
): Product[] {
  switch (section) {
    case "officials":
      return all.filter(isOfficialProduct);
    case "casuals":
      return all.filter(isCasualProduct);
    case "other":
      return all.filter((p) => !isOfficialProduct(p) && !isCasualProduct(p));
    default:
      return all;
  }
}

/** Popular brand shortcuts for Shop / Sale discovery. */
export const SHOP_BRAND_CHIPS = [
  { label: "New Balance", href: "/shop/other?brand=New%20Balance" },
  { label: "Nike", href: "/shop/other?brand=Nike" },
  { label: "Adidas", href: "/shop/other?brand=Adidas" },
  { label: "Jordan", href: "/shop/other?brand=Jordan" },
  { label: "Clarks", href: "/shop/officials?brand=Clarks" },
  { label: "Empire", href: "/shop/officials?brand=Empire" },
  { label: "Timberland", href: "/shop/casuals?brand=Timberland" },
] as const;
