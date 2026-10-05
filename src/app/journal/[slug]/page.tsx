import Link from "next/link";
import { notFound } from "next/navigation";
import {
  JOURNAL_ARTICLES,
  articleBlocks,
  blogPostingJsonLd,
  breadcrumbJsonLd,
  getArticle,
} from "@/lib/journal";
import { localBusinessJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

export function generateStaticParams() {
  return JOURNAL_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Journal" };
  return {
    title: article.metaTitle,
    description: article.excerpt,
    alternates: {
      canonical: `https://${SITE.domain}/journal/${article.slug}`,
    },
    openGraph: {
      title: article.metaTitle,
      description: article.excerpt,
      type: "article",
      url: `https://${SITE.domain}/journal/${article.slug}`,
    },
  };
}

function Cell({
  cell,
}: {
  cell: string | { text: string; href?: string };
}) {
  if (typeof cell === "string") return <>{cell}</>;
  if (cell.href) {
    return (
      <Link href={cell.href} className="font-semibold text-navy underline">
        {cell.text}
      </Link>
    );
  }
  return <>{cell.text}</>;
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const blocks = articleBlocks(article);
  const faqs = article.faqs ?? [];
  const wa = whatsappHref(
    `Hi, I read "${article.title}" on ${SITE.name}. I need help choosing a size or product.`,
  );

  return (
    <article className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingJsonLd(article)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Journal", path: "/journal" },
              { name: article.title, path: `/journal/${article.slug}` },
            ]),
          ),
        }}
      />

      <div className="container max-w-3xl">
        <p className="text-xs uppercase tracking-[0.14em] text-muted">
          <Link href="/journal">Journal</Link> · Blog · Updated{" "}
          {article.updated} · {article.minutes} min read
        </p>
        <h1 className="heading mt-3 text-3xl md:text-4xl">{article.title}</h1>
        <p className="mt-3 text-sm text-slate-600">
          By {article.author} · Last updated {article.updated}
        </p>
        <p className="mt-4 text-lg text-slate-700">{article.excerpt}</p>

        <div className="mt-8 space-y-5 text-slate-700">
          {blocks.map((block, i) => {
            if (block.type === "p") {
              return (
                <p key={i} className="leading-relaxed">
                  {block.text}
                </p>
              );
            }
            if (block.type === "h2") {
              return (
                <h2 key={i} className="heading pt-4 text-2xl text-navy">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "ol") {
              return (
                <ol
                  key={i}
                  className="list-decimal space-y-2 pl-5 leading-relaxed"
                >
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              );
            }
            if (block.type === "ul") {
              return (
                <ul
                  key={i}
                  className="list-disc space-y-2 pl-5 leading-relaxed"
                >
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            if (block.type === "note") {
              return (
                <p
                  key={i}
                  className="rounded-sm border border-navy/10 bg-mist px-4 py-3 text-sm"
                >
                  {block.text}
                </p>
              );
            }
            if (block.type === "table") {
              return (
                <div key={i} className="overflow-x-auto">
                  {block.caption ? (
                    <p className="mb-2 text-sm font-semibold text-navy">
                      {block.caption}
                    </p>
                  ) : null}
                  <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-navy/20 bg-mist">
                        {block.headers.map((h) => (
                          <th
                            key={h}
                            className="px-3 py-2 font-display font-semibold text-navy"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, ri) => (
                        <tr key={ri} className="border-b border-black/10">
                          {row.map((cell, ci) => (
                            <td key={ci} className="px-3 py-2 align-top">
                              <Cell cell={cell} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            return null;
          })}
        </div>

        {faqs.length > 0 ? (
          <div className="mt-12">
            <h2 className="heading text-2xl">Frequently asked questions</h2>
            <div className="mt-4 space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="border-b border-black/10 pb-3"
                >
                  <summary className="cursor-pointer font-display font-semibold text-navy">
                    {f.q}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-10 rounded-sm border border-navy/10 bg-mist p-5">
          <p className="font-display font-semibold text-navy">
            Need a size or colour check?
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Message {SITE.name} on WhatsApp {SITE.whatsapp}. Free delivery in
            Nairobi.
          </p>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="btn btn-yellow mt-4"
          >
            WhatsApp us
          </a>
        </div>

        <div className="mt-10">
          <h2 className="heading text-xl">Shop related</h2>
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
