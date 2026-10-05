import Link from "next/link";
import { FindFasterBar } from "@/components/FindFasterBar";
import { ProductGrid } from "@/components/ProductCard";
import { getAllProducts, slimForCards } from "@/lib/products";

export const metadata = {
  title: "Sale: Men’s Shoes & Clothing",
  description:
    "Reduced and budget picks across shoes, sneakers and clothing. Free delivery in Nairobi.",
};

export const revalidate = 60;

function saleHref(max: number) {
  return `/sale?max=${max}`;
}

export default async function SalePage({
  searchParams,
}: {
  searchParams: Promise<{ max?: string }>;
}) {
  const sp = await searchParams;
  const max = sp.max ? Number(sp.max) : null;
  const priceCap = max != null && Number.isFinite(max) ? max : 3500;

  const products = slimForCards(
    getAllProducts()
      .filter((p) => p.priceKes <= priceCap)
      .sort((a, b) => a.priceKes - b.priceKes),
  );

  const chips = [
    { label: "Under 2,000", max: 2000 },
    { label: "Under 3,500", max: 3500 },
    { label: "Under 5,000", max: 5000 },
  ] as const;

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow text-yellow">Reduced picks</p>
        <h1 className="heading mt-2 text-4xl">Sale</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Price-band picks under KES {priceCap.toLocaleString("en-KE")}. Browse
          12 at a time — Next loads the next set without weighing down the page.
          Prefer brands? Use Search or open{" "}
          <Link href="/shop" className="font-semibold text-navy underline">
            Shop
          </Link>
          .
        </p>
        <div className="mt-6">
          <FindFasterBar />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {chips.map((chip) => {
            const active = priceCap === chip.max;
            return (
              <Link
                key={chip.max}
                href={saleHref(chip.max)}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                  active
                    ? "bg-navy text-white"
                    : "bg-yellow/20 text-navy hover:bg-yellow/30"
                }`}
              >
                {chip.label}
              </Link>
            );
          })}
        </div>
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
