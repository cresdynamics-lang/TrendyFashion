import { SITE } from "./site";
import type { Product } from "./products";

export function homeMeta() {
  return {
    title: `Men's Shoes & Clothing Nairobi CBD | ${SITE.name}`,
    description: `Officials, sneakers, slides, polos and khakis on ${SITE.address}. Free delivery in Nairobi. Order on WhatsApp ${SITE.whatsapp}.`,
  };
}

export function categoryMeta(opts: {
  title: string;
  path: string;
  description: string;
}) {
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: `https://${SITE.domain}${opts.path}` },
  };
}

export function productMeta(product: Product, colourLabel?: string) {
  const sizes = product.sizes;
  const sizeRange =
    sizes.length > 1 ? `${sizes[0]}–${sizes[sizes.length - 1]}` : sizes[0] ?? "";
  const isClothing = product.category[0] === "clothing";
  const title = colourLabel
    ? isClothing
      ? `Men's ${product.name}, ${colourLabel} | Sizes ${sizeRange} | KES ${product.priceKes.toLocaleString("en-KE")}`
      : `${product.name} ${colourLabel}, Sizes ${sizeRange} | KES ${product.priceKes.toLocaleString("en-KE")}`
    : `${product.name} in Nairobi | All Colours & Sizes`;
  const other =
    product.colours.length > 1
      ? `Also in ${product.colours.length - 1} more colour${product.colours.length > 2 ? "s" : ""}. `
      : "";
  return {
    title,
    description: `In stock · KES ${product.priceKes.toLocaleString("en-KE")} · ${other}Free delivery in Nairobi. Order on WhatsApp.`,
  };
}

export function productJsonLd(product: Product, colourSlug?: string) {
  const colour = product.colours.find((c) => c.slug === colourSlug) ?? product.colours[0];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name}${colour ? `, ${colour.label}` : ""}`,
    image: [`https://${SITE.domain}/catalog/${colour.image}`],
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "KES",
      price: product.priceKes,
      availability: "https://schema.org/InStock",
      url: `https://${SITE.domain}/p/${product.slug}/${colour.slug}`,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ShoeStore",
    name: SITE.name,
    telephone: SITE.whatsapp,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Moi Avenue",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    url: `https://${SITE.domain}`,
  };
}
