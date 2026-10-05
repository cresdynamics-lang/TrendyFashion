"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo } from "react";
import { useState } from "react";
import { IconHeart } from "@/components/Icons";
import {
  colourHex,
  formatKes,
  imageSrc,
  sizeSummary,
  type Product,
} from "@/lib/product-utils";
import { useWishlist } from "@/lib/wishlist";

/** 3 rows × 4 columns on desktop; 6 rows × 2 on mobile. */
export const GRID_PAGE_SIZE = 12;

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const [active, setActive] = useState(0);
  const { has, toggle } = useWishlist();
  const colour = product.colours[active] ?? product.colours[0];
  const visibleDots = product.colours.slice(0, 5);
  const colourCount = product.colourTotal ?? product.colours.length;
  const extra = Math.max(0, colourCount - 5);
  const href = `/p/${product.slug}/${colour.slug}`;
  const saved = has(product.slug);

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-mist">
        <Link href={href} className="block">
          <div className="relative w-full overflow-hidden" style={{ paddingBottom: "125%" }}>
            <Image
              src={imageSrc(colour.image)}
              alt={`${product.name} in ${colour.label}`}
              fill
              priority={priority}
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute left-2 top-2 z-10 flex flex-wrap gap-1">
              {colourCount > 1 && (
                <span className="rounded-sm bg-white/95 px-2 py-1 font-display text-[11px] font-semibold text-navy">
                  {colourCount} colours
                </span>
              )}
              {product.badge && (
                <span className="rounded-sm bg-navy px-2 py-1 font-display text-[11px] font-semibold text-white">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full bg-navy/90 px-3 py-2 text-center text-xs font-semibold text-white transition group-hover:translate-y-0">
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
                active === i
                  ? "border-navy ring-2 ring-yellow"
                  : "border-black/20"
              }`}
              style={{ backgroundColor: colourHex(c.label || c.slug) }}
            />
          ))}
          {extra > 0 && <span className="text-xs text-muted">+{extra}</span>}
        </div>
        <Link
          href={href}
          className="font-display text-sm font-semibold text-navy"
        >
          {product.name}
        </Link>
        <p className="text-sm text-slate-700">
          {formatKes(product.priceKes)} · {sizeSummary(product.sizes)}
        </p>
      </div>
    </article>
  );
}

function PaginationBar({
  page,
  totalPages,
  showingFrom,
  showingTo,
  total,
  onPage,
}: {
  page: number;
  totalPages: number;
  showingFrom: number;
  showingTo: number;
  total: number;
  onPage: (n: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-6"
      aria-label="Product pages"
    >
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
        className="btn btn-outline disabled:pointer-events-none disabled:opacity-40"
      >
        ← Previous
      </button>

      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-slate-600">
          Showing{" "}
          <strong className="text-navy">
            {showingFrom}–{showingTo}
          </strong>{" "}
          of <strong className="text-navy">{total}</strong>
          <span className="text-muted">
            {" "}
            · Page {page} of {totalPages}
          </span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onPage(n)}
              aria-current={n === page ? "page" : undefined}
              className={`inline-flex h-10 min-w-10 items-center justify-center px-2 font-display text-sm font-semibold ${
                n === page
                  ? "bg-navy text-white"
                  : "border border-navy/15 text-navy hover:bg-mist"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPage(page + 1)}
        className="btn btn-navy disabled:pointer-events-none disabled:opacity-40"
      >
        Next →
      </button>
    </nav>
  );
}

function SimpleGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return <p className="text-muted">No products in this section yet.</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} priority={i < 4} />
      ))}
    </div>
  );
}

function PaginatedGrid({
  products,
  pageSize,
}: {
  products: Product[];
  pageSize: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const brand = sp.get("brand");
  const maxRaw = sp.get("max");
  const maxPrice = maxRaw ? Number(maxRaw) : null;

  const filtered = useMemo(() => {
    const brandNorm = brand?.trim().toLowerCase();
    return products.filter((p) => {
      if (brandNorm) {
        const pb = (p.brand || "").trim().toLowerCase();
        const inName = `${p.name} ${p.slug}`.toLowerCase();
        if (pb !== brandNorm && !inName.includes(brandNorm)) return false;
      }
      if (maxPrice != null && Number.isFinite(maxPrice) && p.priceKes > maxPrice)
        return false;
      return true;
    });
  }, [products, brand, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageFromUrl = Math.max(1, Number(sp.get("page")) || 1);
  const page = Math.min(pageFromUrl, totalPages);

  useEffect(() => {
    if (pageFromUrl > totalPages && totalPages >= 1) {
      const params = new URLSearchParams(sp.toString());
      if (totalPages <= 1) params.delete("page");
      else params.set("page", String(totalPages));
      const q = params.toString();
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    }
  }, [pageFromUrl, totalPages, pathname, router, sp]);

  const goToPage = (n: number) => {
    const next = Math.min(Math.max(1, n), totalPages);
    const params = new URLSearchParams(sp.toString());
    if (next <= 1) params.delete("page");
    else params.set("page", String(next));
    const q = params.toString();
    router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
    document.getElementById("product-grid")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!filtered.length) {
    return <p className="text-muted">No products in this section yet.</p>;
  }

  const usePages = filtered.length > pageSize;
  const start = usePages ? (page - 1) * pageSize : 0;
  const visible = usePages
    ? filtered.slice(start, start + pageSize)
    : filtered;
  const showingFrom = start + 1;
  const showingTo = start + visible.length;

  return (
    <div id="product-grid">
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i < 4} />
        ))}
      </div>
      {usePages ? (
        <PaginationBar
          page={page}
          totalPages={totalPages}
          showingFrom={showingFrom}
          showingTo={showingTo}
          total={filtered.length}
          onPage={goToPage}
        />
      ) : null}
    </div>
  );
}

export function ProductGrid({
  products,
  pageSize = GRID_PAGE_SIZE,
  paginate = true,
}: {
  products: Product[];
  /** Products per page (default 12 = ~3 desktop rows). */
  pageSize?: number;
  /** Set false for small related-product strips. */
  paginate?: boolean;
}) {
  if (!paginate) {
    return <SimpleGrid products={products} />;
  }

  return (
    <Suspense fallback={<SimpleGrid products={products.slice(0, pageSize)} />}>
      <PaginatedGrid products={products} pageSize={pageSize} />
    </Suspense>
  );
}
