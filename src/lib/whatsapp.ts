import { SITE } from "./site";

export function whatsappHref(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsappE164}?text=${text}`;
}

export function productOrderMessage(opts: {
  name: string;
  colour: string;
  size: string;
  price: number;
  url: string;
}) {
  return [
    "Order request",
    opts.name,
    `Colour: ${opts.colour} · Size: ${opts.size}`,
    `Qty: 1 · KES ${opts.price.toLocaleString("en-KE")}`,
    opts.url,
  ].join("\n");
}

export function pageLookingMessage(pageLabel: string) {
  return `Hi, I'm looking at ${pageLabel} on Trendy Fashion Zone.`;
}
