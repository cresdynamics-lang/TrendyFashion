import Link from "next/link";
import {
  JOURNAL_ARTICLES,
  JOURNAL_GUIDES,
  JOURNAL_QUALITY_GUIDES,
} from "@/lib/journal";

export const metadata = {
  title: "Journal | Men’s shoes & clothes guides Nairobi | TFZ",
  description:
    "Quality shop checklists, khakis, polos, shirts, shoe prices and Moi Avenue buying guides from Trendy Fashion Zone, Nairobi CBD.",
};

function Card({
  a,
  eyebrow,
}: {
  a: (typeof JOURNAL_ARTICLES)[number];
  eyebrow: string;
}) {
  return (
    <Link
      href={`/journal/${a.slug}`}
      className="border border-black/10 p-6 transition hover:-translate-y-0.5"
    >
      <p className="text-xs uppercase tracking-wider text-muted">
        {eyebrow} · Updated {a.updated} · {a.minutes} min
      </p>
      <h3 className="font-display mt-2 text-xl font-bold text-navy">
        {a.title}
      </h3>
      <p className="mt-2 text-sm text-slate-600">{a.excerpt}</p>
      <p className="mt-3 text-xs text-muted">Focus: {a.searchPhrase}</p>
    </Link>
  );
}

export default function JournalIndexPage() {
  const qualitySlugs = new Set(JOURNAL_QUALITY_GUIDES.map((g) => g.slug));
  const guideSlugs = new Set(JOURNAL_GUIDES.map((g) => g.slug));
  const quality = JOURNAL_ARTICLES.filter((a) => qualitySlugs.has(a.slug));
  const guides = JOURNAL_ARTICLES.filter((a) => guideSlugs.has(a.slug));
  const more = JOURNAL_ARTICLES.filter(
    (a) => !qualitySlugs.has(a.slug) && !guideSlugs.has(a.slug),
  );
  const hub = quality.find((a) => a.slug === "mens-weekend-wear-nairobi");
  const qualityPosts = quality.filter(
    (a) => a.slug !== "mens-weekend-wear-nairobi",
  );

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Style desk · Blog</p>
        <h1 className="heading mt-2 text-4xl">Journal</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Evidence-led guides from Trendy Fashion Zone on Moi Avenue — how to
          judge shops, shoes, khakis, polos and shirts, plus CBD price and
          ordering posts. Start with the weekend wear hub if you want the short
          map of links.
        </p>

        {hub ? (
          <div className="mt-8 rounded-sm border border-yellow/40 bg-yellow/10 p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-navy">
              Start here
            </p>
            <Link
              href={`/journal/${hub.slug}`}
              className="font-display mt-2 block text-2xl font-bold text-navy underline"
            >
              {hub.title}
            </Link>
            <p className="mt-2 max-w-2xl text-sm text-slate-700">{hub.excerpt}</p>
          </div>
        ) : null}

        <h2 className="heading mt-12 text-2xl">Quality & shop guides</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Publishing focus: shop trust posts first (pair with Google Business
          Profile), then khakis, polo and shirts. Khaki care and khaki fit are
          split on purpose — link both.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {qualityPosts.map((a, i) => (
            <Card key={a.slug} a={a} eyebrow={`Quality ${i + 1}`} />
          ))}
        </div>

        <h2 className="heading mt-14 text-2xl">CBD buying guides</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {guides.map((a, i) => (
            <Card key={a.slug} a={a} eyebrow={`Guide ${i + 1}`} />
          ))}
        </div>

        <h2 className="heading mt-14 text-2xl">More from the desk</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {more.map((a) => (
            <Card key={a.slug} a={a} eyebrow="Journal" />
          ))}
        </div>
      </div>
    </section>
  );
}
