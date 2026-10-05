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
  imageSrc,
  sizesForColour,
  type Product,
} from "@/lib/product-utils";
import { Breadcrumbs, crumbsForProduct } from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site";
import { absoluteMediaUrl, productOrderMessage, whatsappHref } from "@/lib/whatsapp";
import { useWishlist } from "@/lib/wishlist";

const RECENT_KEY = "tfz-recent-cards-v2";

export function ProductDetail({
  product,
  colourSlug,
  related = [],
  wearWith = [],
  cardSnapshot,
}: {
  product: Product;
  colourSlug?: string;
  related?: Product[];
  wearWith?: Product[];
  cardSnapshot?: Product;
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const initialIndex = Math.max(
    0,
    product.colours.findIndex((c) => c.slug === colourSlug),
  );
  const [activeSlug, setActiveSlug] = useState(
    product.colours[initialIndex]?.slug ?? product.colours[0]?.slug ?? "",
  );
  const colour =
    product.colours.find((c) => c.slug === activeSlug) || product.colours[0];
  const colourSizes = sizesForColour(product, colour);
  const [size, setSize] = useState(colourSizes[1] ?? colourSizes[0] ?? "");
  const [copied, setCopied] = useState(false);
  const [recent, setRecent] = useState<Product[]>([]);
  const saved = has(product.slug);
  const isShoe =
    product.category[0] === "shoes" || product.category[0] === "sneakers";

  // Keep active colour in sync if the URL colour changes (back/forward)
  useEffect(() => {
    if (colourSlug && colourSlug !== activeSlug) {
      setActiveSlug(colourSlug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when URL colour changes
  }, [colourSlug]);

  // Preload nearby colour photos (not all — many colourways crash low-memory Androids)
  useEffect(() => {
    const idx = Math.max(
      0,
      product.colours.findIndex((c) => c.slug === activeSlug),
    );
    const nearby = product.colours.slice(
      Math.max(0, idx - 2),
      Math.min(product.colours.length, idx + 4),
    );
    nearby.forEach((c) => {
      if (c.slug === activeSlug) return;
      const img = new window.Image();
      img.decoding = "async";
      img.src = imageSrc(c.image);
    });
  }, [product.colours, activeSlug]);

  const selectColour = (slug: string) => {
    if (slug === activeSlug) return;
    setActiveSlug(slug);
    router.replace(`/p/${product.slug}/${slug}`, { scroll: false });
  };

  // When the shopper switches colour/type, size options belong to that variant
  useEffect(() => {
    const next = sizesForColour(product, colour);
    setSize((prev) =>
      next.includes(prev) ? prev : (next[1] ?? next[0] ?? ""),
    );
  }, [product, colour]);

  useEffect(() => {
    try {
      const snap = cardSnapshot ?? {
        slug: product.slug,
        name: product.name,
        category: product.category,
        brand: product.brand,
        sizes: product.sizes,
        priceKes: product.priceKes,
        badge: product.badge,
        colours: product.colours.map((c) => ({
          slug: c.slug,
          label: c.label,
          image: c.image,
          sizes: c.sizes,
        })),
      };
      const raw = localStorage.getItem(RECENT_KEY);
      const list: Product[] = raw ? (JSON.parse(raw) as Product[]) : [];
      const next = [snap, ...list.filter((p) => p.slug !== product.slug)].slice(
        0,
        8,
      );
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      setRecent(next.slice(1, 5));
    } catch {
      /* ignore */
    }
  }, [product, cardSnapshot]);

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
      imageUrl: colour.image,
    }),
  );

  const sizeAsk = whatsappHref(
    `Hi, what size am I for ${product.name} (${colour.label})? I'll send a photo of my old label.`,
  );
  const backAlert = whatsappHref(
    `Hi, tell me when ${product.name} in ${colour.label}, size ${size}, is back in stock.`,
  );

  return (
    <div className="container px-5 py-8 md:py-12">
      <Breadcrumbs items={crumbsForProduct(product.category, product.name)} />

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="min-w-0">
          {/*
            One active image only. Stacking a fill Image per colourway
            breaks layout/memory on Android when a product has many colours.
          */}
          <div className="relative mx-auto w-full max-w-lg overflow-hidden bg-mist">
            {/*
              Padding-bottom (not aspect-ratio alone) keeps a stable 4:5 box on
              Android so Next/Image fill cannot expand to the photo's intrinsic size.
            */}
            <div className="relative w-full" style={{ paddingBottom: "125%" }}>
              <Image
                key={colour.slug}
                src={imageSrc(colour.image)}
                alt={`${product.name} in ${colour.label} - side view`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 512px"
                priority
              />
            </div>
          </div>
          {product.colours.length > 1 && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-navy">Other colours</p>
              <div className="mt-3 flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch]">
                {product.colours.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => selectColour(c.slug)}
                    className={`relative h-20 w-16 shrink-0 overflow-hidden border-2 ${
                      c.slug === colour.slug
                        ? "border-yellow"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={imageSrc(c.image)}
                      alt={c.label}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold text-navy md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-xl font-semibold text-navy">
            {formatKes(product.priceKes)}{" "}
            <span className="text-sm font-normal text-emerald-700">
              In stock
            </span>
          </p>

          {product.description ? (
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {product.description}
            </p>
          ) : null}

          <div className="mt-6">
            <p className="text-sm font-semibold text-navy">Colour</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colours.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  aria-label={c.label}
                  title={c.label}
                  onClick={() => selectColour(c.slug)}
                  className={`h-9 w-9 rounded-full border-2 ${
                    c.slug === colour.slug
                      ? "border-yellow ring-2 ring-navy"
                      : "border-black/15"
                  }`}
                  style={{ backgroundColor: colourHex(c.label || c.slug) }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-navy">
                Size {isShoe ? "(EU)" : ""}
              </p>
              <Link
                href="/size-guide"
                className="text-xs font-semibold text-navy underline"
              >
                {isShoe ? "What size am I?" : "Size guide"}
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {colourSizes.map((s) => {
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`min-h-11 min-w-11 rounded-sm border px-3 text-sm font-semibold ${
                      size === s
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
              <a
                href={sizeAsk}
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline"
              >
                Ask about my size
              </a>
            </p>
          </div>

          <div className="mt-5 rounded-sm bg-mist px-4 py-3 text-sm">
            <p className="font-semibold text-navy">Deliver to: Nairobi CBD</p>
            <p className="text-slate-600">
              Free delivery. Arrives in 1-2 days.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="btn btn-yellow flex-1"
            >
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
          <p className="mt-2 text-sm font-semibold text-navy">
            Wrong size? We exchange it.
          </p>

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
                b: "Free in Nairobi. Exchange the size within the stated period - start in one WhatsApp message.",
              },
            ].map((row) => (
              <details key={row.t} className="border border-black/10 px-4 py-3">
                <summary className="cursor-pointer font-display font-semibold text-navy">
                  {row.t}
                </summary>
                <p className="mt-2 text-sm text-slate-600">{row.b}</p>
              </details>
            ))}
          </div>

          <div className="mt-6 rounded-sm border border-black/10 bg-mist p-4">
            <p className="font-display text-sm font-semibold text-navy">
              Send options to a client
            </p>
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
            <p className="font-display text-sm font-semibold text-navy">
              Questions about fit or stock?
            </p>
            <a
              className="mt-2 inline-block font-semibold text-navy underline"
              href={wa}
              target="_blank"
              rel="noreferrer"
            >
              Call or WhatsApp {SITE.whatsapp}
            </a>
            <p className="mt-1 text-sm text-slate-600">{SITE.address}</p>
          </div>
        </div>
      </div>

      {wearWith.length > 0 && (
        <section className="mt-16">
          <h2 className="heading text-2xl">Wear it with</h2>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            Pieces that complete this look - pick sizes and order together on
            WhatsApp.
          </p>
          <div className="mt-6">
            <ProductGrid products={wearWith} paginate={false} />
          </div>
          <a
            href={whatsappHref(
              [
                `Order the look with ${product.name} (${colour.label})`,
                `Photo: ${absoluteMediaUrl(colour.image)}`,
                `Product: ${pageUrl}`,
                ...wearWith.map(
                  (p) =>
                    `Also: ${p.name} · https://${SITE.domain}/p/${p.slug}/${p.colours[0]?.slug ?? ""}`,
                ),
              ].join("\n"),
            )}
            target="_blank"
            rel="noreferrer"
            className="btn btn-yellow mt-6"
          >
            Complete the look · WhatsApp
          </a>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="heading text-2xl">You may also like</h2>
          <div className="mt-6">
            <ProductGrid products={related} paginate={false} />
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section className="mt-16 mb-8">
          <h2 className="heading text-2xl">Recently viewed</h2>
          <div className="mt-6">
            <ProductGrid products={recent.slice(0, 4)} paginate={false} />
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 p-3 backdrop-blur md:hidden">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-navy">
            {formatKes(product.priceKes)}
          </span>
          <span className="text-muted">
            {colour.label} · {size}
          </span>
        </div>
        <div className="flex gap-2">
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="btn btn-yellow flex-1"
          >
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
