import { ProductGrid } from "@/components/ProductCard";
import { newInProducts, slimForCards } from "@/lib/products";

export const metadata = {
  title: "New In",
};

export const revalidate = 60;

export default function NewInPage() {
  const products = slimForCards(newInProducts());
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Newest first</p>
        <h1 className="heading mt-2 text-4xl">New In</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Fresh arrivals across shoes, sneakers and clothing. 12 products per
          page — tap Next for more.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["Shoes", "Sneakers", "Clothing"].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-navy/20 px-3 py-1.5 text-sm font-semibold text-navy"
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
