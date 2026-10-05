import { CategoryPageView } from "@/components/CategoryPage";
import { productsInPathCards } from "@/lib/products-server";

export const revalidate = 60;

export function generateStaticParams() {
  return [
    { slug: undefined },
    { slug: ["shop-by-model", "new-balance"] },
    { slug: ["shop-by-model", "dunk-low"] },
    { slug: ["shop-by-model", "air-force-1"] },
    { slug: ["shop-by-model", "air-max"] },
    { slug: ["shop-by-model", "samba"] },
    { slug: ["shop-by-model", "jordan"] },
  ];
}

export default async function SneakersPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const products = productsInPathCards(["sneakers", ...slug]);
  return (
    <CategoryPageView root="sneakers" segments={slug} products={products} />
  );
}
