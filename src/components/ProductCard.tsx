"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconHeart } from "@/components/Icons";
import {
  colourHex,
  formatKes,
  imageSrc,
  sizeSummary,
  type Product,
} from "@/lib/products";
import { useWishlist } from "@/lib/wishlist";

export function ProductCard({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const { has, toggle } = useWishlist();
  const colour = product.colours[active] ?? product.colours[0];
  const visibleDots = product.colours.slice(0, 5);
  const extra = Math.max(0, product.colours.length - 5);
  const href = `/p/${product.slug}/${colour.slug}`;
  const saved = has(product.slug);

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-mist">
        <Link href={href} className="block">
          <div className="relative aspect-[4/5]">
            <Image
              src={imageSrc(colour.image)}
              alt={`${product.name} in ${colour.label}`}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute left-2 top-2 flex flex-wrap gap-1">
              {product.colours.length > 1 && (
                <span className="rounded-sm bg-white/95 px-2 py-1 font-display text-[11px] font-semibold text-navy">
                  {product.colours.length} colours
                </span>
              )}
              {product.badge && (
                <span className="rounded-sm bg-navy px-2 py-1 font-display text-[11px] font-semibold text-white">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-navy/90 px-3 py-2 text-center text-xs font-semibold text-white transition group-hover:translate-y-0">
              Quick view · sizes {sizeSummary(product.sizes)}
            </div>
          </div>
        </Link>
        <button
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Save for later"}
          onClick={() => toggle(product.slug)}
          className={`absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-navy shadow-sm ${
            saved ? "text-yellow" : ""
          }`}
        >
          <IconHeart filled={saved} className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-1.5">
          {visibleDots.map((c, i) => (
            <button
              key={c.slug}
              type="button"
              aria-label={`Show ${c.label}`}
              title={c.label}
              onMouseEnter={() => setActive(i)}
              onClick={(e) => {
                e.preventDefault();
                setActive(i);
              }}
              className={`h-4 w-4 rounded-full border ${
                active === i ? "border-navy ring-2 ring-yellow" : "border-black/20"
              }`}
              style={{ backgroundColor: colourHex(c.slug) }}
            />
          ))}
          {extra > 0 && <span className="text-xs text-muted">+{extra}</span>}
        </div>
        <Link href={href} className="font-display text-sm font-semibold text-navy">
          {product.name}
        </Link>
        <p className="text-sm text-slate-700">
          {formatKes(product.priceKes)} · {sizeSummary(product.sizes)}
        </p>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return <p className="text-muted">No products in this section yet.</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
