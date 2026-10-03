import Link from "next/link";
import { JOURNAL_ARTICLES } from "@/lib/journal";

export const metadata = {
  title: "Journal | Men’s style guides Nairobi",
  description: "Short guides on interviews, sizing, monks vs oxfords and more — each linking to live products.",
};

export default function JournalIndexPage() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Style desk</p>
        <h1 className="heading mt-2 text-4xl">Journal</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          One article answers one search. The first lines give the answer — then we link you to products you can order
          today.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {JOURNAL_ARTICLES.map((a) => (
            <Link key={a.slug} href={`/journal/${a.slug}`} className="border border-black/10 p-6 transition hover:-translate-y-0.5">
              <p className="text-xs uppercase tracking-wider text-muted">
                Updated {a.updated} · {a.minutes} min
              </p>
              <h2 className="font-display mt-2 text-xl font-bold text-navy">{a.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{a.excerpt}</p>
              <p className="mt-3 text-xs text-muted">Search: {a.searchPhrase}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
