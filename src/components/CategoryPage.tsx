import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { getCategoryCopy } from "@/lib/categoryCopy";
import {
  SUBTILES,
  categoryTitle,
  productsInPath,
  type Product,
} from "@/lib/products";

export function CategoryPageView({
  root,
  segments,
  brand,
  maxPrice,
}: {
  root: string;
  segments: string[];
  brand?: string | null;
  maxPrice?: number | null;
}) {
  const pathKey = [root, ...segments].join("/");
  const products = productsInPath([root, ...segments], brand, maxPrice);
  const tiles = SUBTILES[pathKey] ?? (segments.length === 0 ? SUBTILES[root] : []);
  const copy = getCategoryCopy(pathKey);
  const titleLeaf = categoryTitle(segments.length ? segments.slice(-1) : [root]);
  const heroImage =
    tiles.find((t) => t.image)?.image ??
    (products[0] ? `/catalog/${products[0].colours[0].image}` : "/catalog/brand/logo.jpg");

  return (
    <div>
      <section className="bg-navy text-white">
        <div className="container grid items-center gap-8 px-5 py-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="fade-up">
            <p className="text-xs uppercase tracking-[0.18em] text-white/60">
              Home › {categoryTitle([root, ...segments]).replace(/ · /g, " › ")}
            </p>
            <h1 className="font-display mt-3 text-3xl font-bold md:text-5xl">{titleLeaf}</h1>
            <p className="mt-4 max-w-xl text-lg font-medium text-white">{copy.headline}</p>
            <p className="mt-2 max-w-xl text-base text-white/75">{copy.support}</p>
          </div>
          <div className="relative aspect-[5/3] overflow-hidden rounded-sm">
            <Image src={heroImage} alt="" fill className="object-cover" sizes="40vw" />
          </div>
        </div>
      </section>

      {(copy.chooser?.length || tiles.length > 0) && (
        <section className="section">
          <div className="container">
            <h2 className="heading text-xl">Which one is for me?</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {(copy.chooser ?? tiles.map((t) => ({ label: t.label, bestFor: t.label, href: t.href }))).map(
                (tile) => (
                  <Link
                    key={tile.href}
                    href={tile.href}
                    className="group overflow-hidden rounded-sm bg-mist transition hover:-translate-y-0.5"
                  >
                    {"image" in tile && (tile as { image?: string }).image ? (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={(tile as { image?: string }).image!}
                          alt={tile.label}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="25vw"
                        />
                      </div>
                    ) : null}
                    <div className="p-3">
                      <p className="font-display text-sm font-semibold text-navy">{tile.label}</p>
                      <p className="mt-1 text-xs text-slate-600">{"bestFor" in tile ? tile.bestFor : ""}</p>
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      <section className="border-y border-black/5 bg-mist">
        <div className="container flex flex-wrap items-center justify-between gap-4 px-5 py-5 text-sm">
          <p>
            <strong className="text-navy">Sizes {copy.sizeRange}</strong>
            <span className="text-slate-600"> · {copy.fitNote}</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/size-guide" className="font-semibold text-navy underline">
              Size guide
            </Link>
            <span className="text-navy">{copy.buttonLine}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Catalogue</p>
              <h2 className="heading mt-1 text-2xl">{products.length} products</h2>
              <p className="mt-1 text-sm text-slate-600">{copy.valueLine}</p>
            </div>
            <p className="text-sm text-muted">Sort: Newest</p>
          </div>
          <ProductGrid products={products as Product[]} />
        </div>
      </section>

      {copy.outfits && copy.outfits.length > 0 && (
        <section className="section section-mist">
          <div className="container">
            <h2 className="heading text-2xl">Styled outfits</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {copy.outfits.map((o) => (
                <Link key={o.title} href={o.href} className="bg-white p-5">
                  <h3 className="font-display font-bold text-navy">{o.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{o.items}</p>
                  <p className="mt-3 text-sm font-semibold text-navy">Order the look →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container max-w-3xl">
          <h2 className="heading text-xl">Buying guide</h2>
          <p className="mt-3 text-slate-600">
            <strong className="text-navy">The doubt:</strong> {copy.doubt}
          </p>
          <p className="mt-3 text-slate-600">{copy.support}</p>
          <p className="mt-3 text-slate-600">{copy.valueLine}</p>
          <div className="mt-8 space-y-4">
            {copy.faqs.map((f) => (
              <details key={f.q} className="border-b border-black/10 pb-3">
                <summary className="cursor-pointer font-display font-semibold text-navy">{f.q}</summary>
                <p className="mt-2 text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
