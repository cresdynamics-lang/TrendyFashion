"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { IconBell, IconHeart } from "@/components/Icons";
import { ProductGrid } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import {
  colourHex,
  formatKes,
  getAllProducts,
  getProduct,
  imageSrc,
  type Product,
} from "@/lib/products";
import { LOOK_BUNDLE, SITE } from "@/lib/site";
import { productOrderMessage, whatsappHref } from "@/lib/whatsapp";
import { useWishlist } from "@/lib/wishlist";

const RECENT_KEY = "tfz-recent-v1";

export function ProductDetail({
  product,
  colourSlug,
}: {
  product: Product;
  colourSlug?: string;
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const colourIndex = Math.max(0, product.colours.findIndex((c) => c.slug === colourSlug));
  const colour = product.colours[colourIndex] || product.colours[0];
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0] ?? "");
  const [copied, setCopied] = useState(false);
  const [recent, setRecent] = useState<Product[]>([]);
  const saved = has(product.slug);
  const isShoe = product.category[0] === "shoes" || product.category[0] === "sneakers";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      const list: string[] = raw ? (JSON.parse(raw) as string[]) : [];
      const next = [product.slug, ...list.filter((s) => s !== product.slug)].slice(0, 8);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      setRecent(next.slice(1).map((s) => getProduct(s)).filter(Boolean) as Product[]);
    } catch {
      /* ignore */
    }
  }, [product.slug]);

  const pageUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return `https://${SITE.domain}/p/${product.slug}/${colour.slug}`;
    }
    return `${window.location.origin}/p/${product.slug}/${colour.slug}`;
  }, [product.slug, colour.slug]);

  const wa = whatsappHref(
    productOrderMessage({
      name: product.name,
      colour: colour.label,
      size,
      price: product.priceKes,
      url: pageUrl,
    }),
  );

  const sizeAsk = whatsappHref(
    `Hi, what size am I for ${product.name} (${colour.label})? I'll send a photo of my old label.`,
  );
  const backAlert = whatsappHref(
    `Hi, tell me when ${product.name} in ${colour.label}, size ${size}, is back in stock.`,
  );

  const wearWith = LOOK_BUNDLE.items
    .map((i) => getProduct(i.slug))
    .filter((p): p is Product => !!p && p.slug !== product.slug)
    .slice(0, 3);

  const siblings = getAllProducts()
    .filter((p) => p.category[0] === product.category[0] && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="container px-5 py-8 md:py-12">
      <p className="text-xs uppercase tracking-[0.14em] text-muted">
        Home › {product.category.map((c) => c.replace(/-/g, " ")).join(" › ")} › {product.name}
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden bg-mist">
            <Image
              src={imageSrc(colour.image)}
              alt={`${product.name} in ${colour.label} — side view`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          {product.colours.length > 1 && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-navy">Other colours of this {product.category.includes("polos") ? "polo" : "item"}</p>
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {product.colours.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => router.push(`/p/${product.slug}/${c.slug}`)}
                    className={`relative h-20 w-16 shrink-0 overflow-hidden border-2 ${
                      c.slug === colour.slug ? "border-yellow" : "border-transparent"
                    }`}
                  >
                    <Image src={imageSrc(c.image)} alt={c.label} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold text-navy md:text-4xl">{product.name}</h1>
          <p className="mt-3 text-xl font-semibold text-navy">
            {formatKes(product.priceKes)}{" "}
            <span className="text-sm font-normal text-emerald-700">In stock</span>
          </p>

          <div className="mt-6">
            <p className="text-sm font-semibold text-navy">Colour: {colour.label}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colours.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  aria-label={c.label}
                  onClick={() => router.push(`/p/${product.slug}/${c.slug}`)}
                  className={`h-9 w-9 rounded-full border-2 ${
                    c.slug === colour.slug ? "border-yellow ring-2 ring-navy" : "border-black/15"
                  }`}
                  style={{ backgroundColor: colourHex(c.slug) }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-navy">Size {isShoe ? "(EU)" : ""}</p>
              <Link href="/size-guide" className="text-xs font-semibold text-navy underline">
                {isShoe ? "What size am I?" : "Size guide"}
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s, i) => {
                const soldOut = i === product.sizes.length - 1 && product.sizes.length > 3;
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={soldOut}
                    onClick={() => setSize(s)}
                    className={`min-h-11 min-w-11 rounded-sm border px-3 text-sm font-semibold ${
                      soldOut
                        ? "border-black/10 text-slate-400 line-through"
                        : size === s
                          ? "border-navy bg-navy text-white"
                          : "border-black/15 text-navy hover:border-navy"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Fit note: true to size; if between sizes, go up half.{" "}
              <a href={sizeAsk} target="_blank" rel="noreferrer" className="font-semibold underline">
                Ask about my size
              </a>
            </p>
          </div>

          <div className="mt-5 rounded-sm bg-mist px-4 py-3 text-sm">
            <p className="font-semibold text-navy">Deliver to: Nairobi CBD</p>
            <p className="text-slate-600">Free delivery. Arrives in 1–2 days.</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={wa} target="_blank" rel="noreferrer" className="btn btn-yellow flex-1">
              Order on WhatsApp
            </a>
            <button
              type="button"
              className="btn btn-navy flex-1"
              onClick={() =>
                addItem({
                  slug: product.slug,
                  name: product.name,
                  colourSlug: colour.slug,
                  colourLabel: colour.label,
                  size,
                  priceKes: product.priceKes,
                  image: imageSrc(colour.image),
                })
              }
            >
              Add to cart
            </button>
          </div>
          <p className="mt-2 text-sm font-semibold text-navy">Wrong size? We exchange it.</p>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => toggle(product.slug)}
              className="inline-flex min-h-11 items-center gap-2 px-3 text-sm font-semibold text-navy"
            >
              <IconHeart filled={saved} /> {saved ? "Saved" : "Save"}
            </button>
            <a
              href={backAlert}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 px-3 text-sm font-semibold text-navy"
            >
              <IconBell /> Tell me if it’s back
            </a>
          </div>

          <div className="mt-6 space-y-2">
            {[
              {
                t: "Fit",
                b: "Regular / as shown. Confirm height and size worn with the shop if you need a precise note.",
              },
              {
                t: "Fabric and feel",
                b: "Details confirmed against stock before we print final fabric composition on each SKU.",
              },
              {
                t: "Care",
                b: isShoe
                  ? "Wipe after wear. Brush suede dry. Polish leather as needed."
                  : "Wash inside out, cool. Dry in shade.",
              },
              {
                t: "Delivery and exchange",
                b: "Free in Nairobi. Exchange the size within the stated period — start in one WhatsApp message.",
              },
            ].map((row) => (
              <details key={row.t} className="border border-black/10 px-4 py-3">
                <summary className="cursor-pointer font-display font-semibold text-navy">{row.t}</summary>
                <p className="mt-2 text-sm text-slate-600">{row.b}</p>
              </details>
            ))}
          </div>

          <div className="mt-6 rounded-sm border border-black/10 bg-mist p-4">
            <p className="font-display text-sm font-semibold text-navy">Send options to a client</p>
            <button
              type="button"
              className="btn btn-outline mt-3"
              onClick={async () => {
                await navigator.clipboard.writeText(pageUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 1600);
              }}
            >
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>

          <div className="mt-6 border border-black/10 p-4">
            <p className="font-display text-sm font-semibold text-navy">Questions about fit or stock?</p>
            <a className="mt-2 inline-block font-semibold text-navy underline" href={wa} target="_blank" rel="noreferrer">
              Call or WhatsApp {SITE.whatsapp}
            </a>
            <p className="mt-1 text-sm text-slate-600">{SITE.address}</p>
          </div>
        </div>
      </div>

      {wearWith.length > 0 && (
        <section className="mt-16">
          <h2 className="heading text-2xl">Wear it with</h2>
          <div className="mt-6">
            <ProductGrid products={wearWith} />
          </div>
          <a
            href={whatsappHref(`Order the look with ${product.name} (${colour.label})`)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-yellow mt-6"
          >
            Complete the look · Add all
          </a>
        </section>
      )}

      {siblings.length > 0 && (
        <section className="mt-16">
          <h2 className="heading text-2xl">You may also like</h2>
          <div className="mt-6">
            <ProductGrid products={siblings} />
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section className="mt-16 mb-8">
          <h2 className="heading text-2xl">Recently viewed</h2>
          <div className="mt-6">
            <ProductGrid products={recent.slice(0, 4)} />
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 p-3 backdrop-blur md:hidden">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-navy">{formatKes(product.priceKes)}</span>
          <span className="text-muted">
            {colour.label} · {size}
          </span>
        </div>
        <div className="flex gap-2">
          <a href={wa} target="_blank" rel="noreferrer" className="btn btn-yellow flex-1">
            WhatsApp
          </a>
          <Link href="/cart" className="btn btn-navy flex-1">
            Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
