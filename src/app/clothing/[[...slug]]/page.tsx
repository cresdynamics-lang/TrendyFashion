import { CategoryPageView } from "@/components/CategoryPage";

export default async function ClothingPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ brand?: string; max?: string }>;
}) {
  const { slug = [] } = await params;
  const sp = await searchParams;
  return (
    <CategoryPageView
      root="clothing"
      segments={slug}
      brand={sp.brand ?? null}
      maxPrice={sp.max ? Number(sp.max) : null}
    />
  );
}
