import Image from "next/image";
import { Breadcrumbs, crumbsForPath } from "@/components/Breadcrumbs";
import { ProductGrid } from "@/components/ProductCard";
import { getCategoryCopy } from "@/lib/categoryCopy";
import { SUBTILES, categoryTitle } from "@/lib/products";
import { imageSrc, type Product } from "@/lib/product-utils";

export function CategoryPageView({
  root,
  segments,
  products,
}: {
  root: string;
  segments: string[];
  products: Product[];
}) {
  const pathKey = [root, ...segments].join("/");
  const tiles =
    SUBTILES[pathKey] ?? (segments.length === 0 ? SUBTILES[root] : []);
  const copy = getCategoryCopy(pathKey);
  const titleLeaf = categoryTitle(
    segments.length ? segments.slice(-1) : [root],
  );
  const heroImage =
    tiles.find((t) => t.image)?.image ??
    (products[0]
      ? imageSrc(products[0].colours[0].image)
      : "/catalog/brand/logo.jpg");

  return (
    <div>
      <section className="bg-navy text-white">
        <div className="container grid items-center gap-6 px-5 py-8 md:grid-cols-[1.2fr_0.8fr] md:py-10">
          <div className="fade-up">
            <Breadcrumbs
              items={crumbsForPath([root, ...segments])}
              tone="light"
            />
            <h1 className="font-display mt-3 text-3xl font-bold md:text-5xl">
              {titleLeaf}
            </h1>
            <p className="mt-3 max-w-xl text-base text-white/80">
              {copy.headline}
            </p>
          </div>
          <div className="relative aspect-[5/3] overflow-hidden rounded-sm">
            <Image
              src={heroImage}
              alt=""
              fill
              className="object-cover"
              sizes="40vw"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ProductGrid products={products as Product[]} />
        </div>
      </section>
    </div>
  );
}
