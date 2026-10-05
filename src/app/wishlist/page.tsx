"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/ProductCard";
import { slimForCards, type Product } from "@/lib/product-utils";
import { useWishlist } from "@/lib/wishlist";

export default function WishlistPage() {
  const { slugs } = useWishlist();
  const [all, setAll] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/catalog/products.json", { cache: "force-cache" })
      .then((r) => r.json())
      .then((data: { products: Product[] }) =>
        setAll(slimForCards(data.products ?? [])),
      )
      .catch(() => setAll([]));
  }, []);

  const products = all.filter((p) => slugs.includes(p.slug));

  return (
    <section className="section">
      <div className="container">
        <h1 className="heading text-3xl">Saved for later</h1>
        <p className="mt-2 text-slate-600">
          Hearts stay on this device until you clear them.
        </p>
        <div className="mt-10">
          {products.length ? (
            <ProductGrid products={products} />
          ) : (
            <div className="rounded-sm bg-mist p-8">
              <p className="text-slate-600">Nothing saved yet.</p>
              <Link href="/new-in" className="btn btn-navy mt-4">
                Browse New In
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
