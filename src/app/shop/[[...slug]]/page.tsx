import Link from "next/link";
import { FindFasterBar } from "@/components/FindFasterBar";
import { ProductGrid } from "@/components/ProductCard";
import { getAllProducts, slimForCards } from "@/lib/products";
import {
  SHOP_BRAND_CHIPS,
  SHOP_SECTIONS,
  productsForShopSection,
  type ShopSection,
} from "@/lib/shop";

export const revalidate = 60;

const SECTION_IDS = new Set<ShopSection>([
  "all",
  "officials",
  "casuals",
  "other",
]);

function resolveSection(slug?: string[]): ShopSection {
  const leaf = slug?.[0];
  if (leaf && SECTION_IDS.has(leaf as ShopSection) && leaf !== "all") {
    return leaf as ShopSection;
  }
  return "all";
}

export function generateStaticParams() {
  return [
    { slug: undefined },
    { slug: ["officials"] },
    { slug: ["casuals"] },
    { slug: ["other"] },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const section = resolveSection(slug);
  const meta = SHOP_SECTIONS.find((s) => s.id === section)!;
  return {
    title: `Shop ${section === "all" ? "all products" : meta.label} | Trendy Fashion Zone`,
    description: `${meta.blurb} Search by brand or browse Sale for price bands.`,
  };
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const section = resolveSection(slug);
  const current = SHOP_SECTIONS.find((s) => s.id === section)!;
  const products = slimForCards(
    productsForShopSection(section, getAllProducts()),
  );

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Shop</p>
        <h1 className="heading mt-2 text-4xl">
          {section === "all" ? "All products" : current.label}
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">{current.blurb}</p>

        <div className="mt-6">
          <FindFasterBar />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {SHOP_SECTIONS.map((s) => {
            const active = s.id === section;
            return (
              <Link
                key={s.id}
                href={s.href}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                  active
                    ? "bg-navy text-white"
                    : "border border-navy/15 text-navy hover:bg-mist"
                }`}
              >
                {s.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted">
            Jump by brand
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SHOP_BRAND_CHIPS.map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className="rounded-full bg-yellow/20 px-3 py-1.5 text-sm font-semibold text-navy hover:bg-yellow/30"
              >
                {chip.label}
              </Link>
            ))}
            <Link
              href="/sale"
              className="rounded-full bg-navy px-3 py-1.5 text-sm font-semibold text-white"
            >
              View on Sale →
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
