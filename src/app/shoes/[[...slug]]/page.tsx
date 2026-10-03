import { CategoryPageView } from "@/components/CategoryPage";

export default async function ShoesPage({
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
      root="shoes"
      segments={slug}
      brand={sp.brand ?? null}
      maxPrice={sp.max ? Number(sp.max) : null}
    />
  );
}
