import { CategoryPageView } from "@/components/CategoryPage";
import { productsInPathCards } from "@/lib/products-server";

export const revalidate = 60;

export function generateStaticParams() {
  return [
    { slug: undefined },
    { slug: ["officials"] },
    { slug: ["casuals"] },
    { slug: ["sandals-slides"] },
    { slug: ["officials", "monk-straps"] },
    { slug: ["officials", "loafers"] },
    { slug: ["officials", "oxford-derby"] },
    { slug: ["officials", "official-boots"] },
    { slug: ["casuals", "casual-loafers"] },
    { slug: ["casuals", "lace-up-casuals"] },
    { slug: ["casuals", "casual-boots"] },
    { slug: ["sandals-slides", "buckle-slides"] },
    { slug: ["sandals-slides", "clogs-mules"] },
  ];
}

export default async function ShoesPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const products = productsInPathCards(["shoes", ...slug]);
  return (
    <CategoryPageView root="shoes" segments={slug} products={products} />
  );
}
