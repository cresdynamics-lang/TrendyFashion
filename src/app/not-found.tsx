import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container max-w-2xl text-center">
        <h1 className="heading text-4xl">Page not found</h1>
        <p className="mt-4 text-slate-600">
          That address may have moved. Search or jump into a main category.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/shoes" className="btn btn-navy">
            Shoes
          </Link>
          <Link href="/sneakers" className="btn btn-navy">
            Sneakers
          </Link>
          <Link href="/clothing" className="btn btn-navy">
            Clothing
          </Link>
          <Link href="/search" className="btn btn-outline">
            Search
          </Link>
        </div>
      </div>
    </section>
  );
}
