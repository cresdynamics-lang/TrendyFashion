"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  colourHex,
  formatKes,
  getProduct,
  imageSrc,
  sizeSummary,
} from "@/lib/products";

export function ColourSpotlight({
  slug = "nike-sb-dunk-low",
}: {
  slug?: string;
}) {
  const product =
    getProduct(slug) ??
    getProduct("nike-dunk-low") ??
    getProduct("adidas-samba") ??
    getProduct("nike-air-force-1");
  const [active, setActive] = useState(0);
  if (!product) return null;
  const colour = product.colours[active];

  return (
    <section className="section section-mist">
      <div className="container grid items-center gap-8 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden bg-white">
          <Image
            src={imageSrc(colour.image)}
            alt={`${product.name} in ${colour.label}`}
            fill
            className="object-cover transition duration-500"
            sizes="50vw"
          />
        </div>
        <div>
          <p className="eyebrow">Colour spotlight</p>
          <h2 className="heading mt-2 text-3xl md:text-4xl">
            {product.name}: pick your colour
          </h2>
          <p className="mt-3 text-slate-600">
            Tap a colour: the photo, price and sizes change right here.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {product.colours.map((c, i) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setActive(i)}
                className={`h-10 w-10 rounded-full border-2 ${
                  i === active
                    ? "border-yellow ring-2 ring-navy"
                    : "border-black/15"
                }`}
                style={{ backgroundColor: colourHex(c.label || c.slug) }}
                aria-label={c.label}
                title={c.label}
              />
            ))}
          </div>
          <p className="mt-4 font-display text-lg font-semibold text-navy">
            {formatKes(product.priceKes)}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Sizes {sizeSummary(product.sizes)}
          </p>
          <Link
            href={`/p/${product.slug}/${colour.slug}`}
            className="btn btn-yellow mt-6"
          >
            See sizes
          </Link>
        </div>
      </div>
    </section>
  );
}
