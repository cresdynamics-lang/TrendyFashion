import { ProductGrid } from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";

export const metadata = {
  title: "Sale: Men’s Shoes & Clothing",
  description: "Reduced and budget picks across shoes, sneakers and clothing. Free delivery in Nairobi.",
};

export default async function SalePage({
  searchParams,
}: {
  searchParams: Promise<{ max?: string }>;
}) {
  const { max } = await searchParams;
  const limit = max ? Number(max) : 3500;
  const products = getAllProducts()
    .filter((p) => p.priceKes <= (Number.isFinite(limit) ? limit : 3500))
    .sort((a, b) => a.priceKes - b.priceKes);

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow text-yellow">Reduced picks</p>
        <h1 className="heading mt-2 text-4xl">Sale</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Price-band picks {max ? `under KES ${Number(max).toLocaleString("en-KE")}` : "under KES 3,500"} while we
          wire full sale badges from stock.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { label: "Under 2,000", href: "/sale?max=2000" },
            { label: "Under 3,500", href: "/sale?max=3500" },
            { label: "Under 5,000", href: "/sale?max=5000" },
          ].map((chip) => (
            <a
              key={chip.href}
              href={chip.href}
              className="rounded-full bg-yellow/20 px-3 py-1.5 text-sm font-semibold text-navy"
            >
              {chip.label}
            </a>
          ))}
        </div>
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
