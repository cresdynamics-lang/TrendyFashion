"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { IconSearch } from "@/components/Icons";
import {
  formatKes,
  imageSrc,
  slimForCards,
  type Product,
} from "@/lib/product-utils";
import { filterProducts } from "@/lib/search";

type CatalogFile = { products: Product[] };

export function LiveSearch({
  onClose,
  autofocus = true,
}: {
  onClose?: () => void;
  autofocus?: boolean;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [all, setAll] = useState<Product[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/catalog/products.json", { cache: "force-cache" })
      .then((r) => r.json())
      .then((data: CatalogFile) => {
        if (!cancelled) {
          setAll(slimForCards(data.products ?? []));
          setReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(() => filterProducts(all, q).slice(0, 12), [all, q]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 rounded-md border border-black/10 bg-white p-3 shadow-xl">
        <IconSearch className="h-5 w-5 shrink-0 text-navy" />
        <input
          autoFocus={autofocus}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onClose?.();
              router.push(
                q.trim()
                  ? `/search?q=${encodeURIComponent(q.trim())}`
                  : "/new-in",
              );
            }
            if (e.key === "Escape") onClose?.();
          }}
          placeholder="Type to filter - Empire, Dunk, shirt…"
          className="min-h-11 w-full bg-transparent text-base outline-none"
          aria-label="Search products"
        />
      </div>

      <div className="mt-3 max-h-[60vh] overflow-y-auto rounded-md border border-black/5 bg-white shadow-lg">
        {!ready && (
          <p className="px-4 py-3 text-sm text-muted">Loading catalogue…</p>
        )}
        {ready && !q.trim() && (
          <p className="px-4 py-3 text-sm text-muted">
            Start typing - results filter as you go.
          </p>
        )}
        {ready && q.trim() && results.length === 0 && (
          <p className="px-4 py-3 text-sm text-muted">
            No matches for “{q.trim()}”.
          </p>
        )}
        {results.map((p) => {
          const colour = p.colours[0];
          return (
            <Link
              key={p.slug}
              href={`/p/${p.slug}/${colour?.slug ?? ""}`}
              onClick={() => onClose?.()}
              className="flex items-center gap-3 border-b border-black/5 px-3 py-2.5 hover:bg-mist"
            >
              <div className="relative h-14 w-12 shrink-0 overflow-hidden bg-mist">
                {colour && (
                  <Image
                    src={imageSrc(colour.image)}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-semibold text-navy">
                  {p.name}
                </p>
                <p className="text-xs text-slate-600">
                  {formatKes(p.priceKes)}
                  {p.colours.length > 1 ? ` · ${p.colours.length} colours` : ""}
                </p>
              </div>
            </Link>
          );
        })}
        {q.trim() && results.length > 0 && (
          <button
            type="button"
            className="w-full px-4 py-3 text-left text-sm font-semibold text-navy hover:bg-mist"
            onClick={() => {
              onClose?.();
              router.push(`/search?q=${encodeURIComponent(q.trim())}`);
            }}
          >
            See all results for “{q.trim()}”
          </button>
        )}
      </div>
    </div>
  );
}
