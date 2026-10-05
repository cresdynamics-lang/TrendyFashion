import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { productJsonLd, productMeta } from "@/lib/seo";
import { slimForCard, slimForCards } from "@/lib/product-utils";
import { getAllProducts } from "@/lib/products";
import { getAllProductsLive, getProductLive } from "@/lib/products-server";
import { wearWithProducts } from "@/lib/wear-with";

export const revalidate = 60;

export function generateStaticParams() {
  return getAllProducts().flatMap((p) => [
    { slug: p.slug, colour: undefined as string[] | undefined },
    ...p.colours.map((c) => ({ slug: p.slug, colour: [c.slug] })),
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; colour?: string[] }>;
}): Promise<Metadata> {
  const { slug, colour } = await params;
  const product = getProductLive(slug);
  if (!product) return { title: "Product" };
  const colourLabel = product.colours.find(
    (c) => c.slug === colour?.[0],
  )?.label;
  return productMeta(product, colourLabel);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; colour?: string[] }>;
}) {
  const { slug, colour } = await params;
  const product = getProductLive(slug);
  if (!product) notFound();
  const colourSlug = colour?.[0];
  const all = getAllProductsLive();

  const wearWith = slimForCards(wearWithProducts(product, all, 3));

  const related = slimForCards(
    all
      .filter(
        (p) => p.category[0] === product.category[0] && p.slug !== product.slug,
      )
      .slice(0, 4),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd(product, colourSlug)),
        }}
      />
      <ProductDetail
        product={product}
        colourSlug={colourSlug}
        related={related}
        wearWith={wearWith}
        cardSnapshot={slimForCard(product)}
      />
    </>
  );
}
