import { SITE } from "./site";

export function whatsappHref(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsappE164}?text=${text}`;
}

/** Absolute https URL for product photos (WhatsApp can open/preview these). */
export function absoluteMediaUrl(pathOrUrl: string) {
  if (!pathOrUrl) return `https://${SITE.domain}/catalog/brand/logo.jpg`;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  if (pathOrUrl.startsWith("/")) return `https://${SITE.domain}${pathOrUrl}`;
  return `https://${SITE.domain}/catalog/${pathOrUrl}`;
}

export function productOrderMessage(opts: {
  name: string;
  colour: string;
  size: string;
  price: number;
  url: string;
  imageUrl: string;
  qty?: number;
}) {
  const qty = opts.qty ?? 1;
  const photo = absoluteMediaUrl(opts.imageUrl);
  return [
    "Order request",
    opts.name,
    `Colour: ${opts.colour} · Size: ${opts.size}`,
    `Qty: ${qty} · KES ${opts.price.toLocaleString("en-KE")}`,
    `Photo: ${photo}`,
    `Product: ${opts.url}`,
  ].join("\n");
}

export function cartOrderMessage(
  items: {
    name: string;
    colourLabel: string;
    size: string;
    qty: number;
    priceKes: number;
    image: string;
    slug: string;
    colourSlug: string;
  }[],
  subtotal: number,
) {
  const lines = ["Cart order request", ""];
  items.forEach((i, idx) => {
    const photo = absoluteMediaUrl(i.image);
    const productUrl = `https://${SITE.domain}/p/${i.slug}/${i.colourSlug}`;
    lines.push(
      `${idx + 1}. ${i.name}`,
      `Colour: ${i.colourLabel} · Size: ${i.size} · Qty ${i.qty}`,
      `KES ${(i.priceKes * i.qty).toLocaleString("en-KE")}`,
      `Photo: ${photo}`,
      `Product: ${productUrl}`,
      "",
    );
  });
  lines.push(`Subtotal KES ${subtotal.toLocaleString("en-KE")}`, SITE.address);
  return lines.join("\n");
}

export function pageLookingMessage(pageLabel: string) {
  return `Hi, I'm looking at ${pageLabel} on Trendy Fashion Zone.`;
}
