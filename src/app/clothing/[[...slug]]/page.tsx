import { CategoryPageView } from "@/components/CategoryPage";
import { productsInPathCards } from "@/lib/products-server";

export const revalidate = 60;

export function generateStaticParams() {
  return [
    { slug: undefined },
    { slug: ["tops"] },
    { slug: ["bottoms"] },
    { slug: ["tops", "shirts"] },
    { slug: ["tops", "long-sleeve-shirts"] },
    { slug: ["tops", "polos"] },
    { slug: ["tops", "t-shirts"] },
    { slug: ["bottoms", "trousers"] },
    { slug: ["bottoms", "casual-shorts"] },
  ];
}

export default async function ClothingPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const products = productsInPathCards(["clothing", ...slug]);
  return (
    <CategoryPageView root="clothing" segments={slug} products={products} />
  );
}
