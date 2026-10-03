import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { getAllProducts, getProduct } from "@/lib/products";
import { productJsonLd, productMeta } from "@/lib/seo";

export function generateStaticParams() {
  return getAllProducts().flatMap((p) => [
    { slug: p.slug, colour: [] as string[] },
    ...p.colours.map((c) => ({ slug: p.slug, colour: [c.slug] })),
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; colour?: string[] }>;
}): Promise<Metadata> {
  const { slug, colour } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  const colourLabel = product.colours.find((c) => c.slug === colour?.[0])?.label;
  return productMeta(product, colourLabel);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; colour?: string[] }>;
}) {
  const { slug, colour } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const colourSlug = colour?.[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product, colourSlug)) }}
      />
      <ProductDetail product={product} colourSlug={colourSlug} />
    </>
  );
}
