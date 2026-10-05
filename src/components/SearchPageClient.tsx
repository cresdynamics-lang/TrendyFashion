"use client";

import { useMemo, useState, useEffect } from "react";
import { ProductGrid } from "@/components/ProductCard";
import { slimForCards, type Product } from "@/lib/product-utils";
import { filterProducts } from "@/lib/search";

export function SearchPageClient({
  initialQuery = "",
}: {
  initialQuery?: string;
}) {
  const [q, setQ] = useState(initialQuery);
  const [all, setAll] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/catalog/products.json", { cache: "force-cache" })
      .then((r) => r.json())
      .then((data: { products: Product[] }) =>
        setAll(slimForCards(data.products ?? [])),
      )
      .catch(() => setAll([]));
  }, []);

  useEffect(() => {
    setQ(initialQuery);
  }, [initialQuery]);

  const products = useMemo(
    () => (q.trim() ? filterProducts(all, q) : []),
    [all, q],
  );

  return (
    <section className="section">
      <div className="container">
        <h1 className="heading text-3xl">Search</h1>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type to filter products…"
          className="mt-4 w-full max-w-xl rounded-sm border border-black/15 px-4 py-3 text-base outline-none focus:border-navy"
          aria-label="Filter products"
        />
        <p className="mt-2 text-slate-600">
          {q.trim() ? (
            <>
              Results for <strong>{q}</strong> · {products.length} found
            </>
          ) : (
            "Type a product, colour or model - results update as you type."
          )}
        </p>
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
