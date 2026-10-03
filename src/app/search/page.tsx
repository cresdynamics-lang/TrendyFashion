import { ProductGrid } from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";

export const metadata = {
  title: "Search",
  robots: { index: false, follow: false },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const aliases: Record<string, string[]> = {
    dunks: ["dunk"],
    dunk: ["dunk"],
    sambas: ["samba"],
    samba: ["samba"],
    monkstrap: ["monk"],
    "monk strap": ["monk"],
    polo: ["polo"],
  };

  const tokens = query
    ? Array.from(
        new Set([
          query,
          ...(aliases[query] ?? []),
          ...query.split(/\s+/),
        ]),
      )
    : [];

  const products = getAllProducts().filter((p) => {
    if (!tokens.length) return false;
    const hay = `${p.name} ${p.slug} ${p.brand ?? ""} ${p.category.join(" ")} ${p.colours.map((c) => c.label).join(" ")}`.toLowerCase();
    return tokens.some((t) => t && hay.includes(t));
  });

  return (
    <section className="section">
      <div className="container">
        <h1 className="heading text-3xl">Search</h1>
        <p className="mt-2 text-slate-600">
          {query ? (
            <>
              Results for <strong>{q}</strong> · {products.length} found
            </>
          ) : (
            "Type a product, colour or model — dunks, sambas, monkstrap all work."
          )}
        </p>
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
