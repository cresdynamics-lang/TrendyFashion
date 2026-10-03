import Link from "next/link";
import { notFound } from "next/navigation";
import { JOURNAL_ARTICLES, getArticle } from "@/lib/journal";

export function generateStaticParams() {
  return JOURNAL_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Journal" };
  return {
    title: `${article.title} | Men’s Guide`,
    description: article.excerpt,
  };
}

export default async function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article className="section">
      <div className="container max-w-3xl">
        <p className="text-xs uppercase tracking-[0.14em] text-muted">
          <Link href="/journal">Journal</Link> · Style desk · Updated {article.updated} · {article.minutes} min read
        </p>
        <h1 className="heading mt-3 text-4xl">{article.title}</h1>
        <p className="mt-4 text-lg text-slate-700">{article.excerpt}</p>
        <div className="mt-8 space-y-4 text-slate-700">
          {article.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-10">
          <h2 className="heading text-xl">Shop the look</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {article.linksTo.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="btn btn-outline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
