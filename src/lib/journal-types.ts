import { SITE } from "@/lib/site";

export type JournalFaq = { q: string; a: string };

export type JournalBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ol"; items: string[] }
  | { type: "ul"; items: string[] }
  | {
      type: "table";
      caption?: string;
      headers: string[];
      rows: (string | { text: string; href?: string })[][];
    }
  | { type: "faq"; items: JournalFaq[] }
  | { type: "note"; text: string };

export type JournalArticle = {
  slug: string;
  title: string;
  /** Meta title ideally under 60 characters */
  metaTitle: string;
  searchPhrase: string;
  /** Meta description ideally under 155 characters */
  excerpt: string;
  updated: string;
  updatedIso: string;
  minutes: number;
  author: string;
  linksTo: { label: string; href: string }[];
  /** Legacy simple paragraphs */
  body?: string[];
  /** Rich SEO structure */
  blocks?: JournalBlock[];
  faqs?: JournalFaq[];
};

export function articleBlocks(article: JournalArticle): JournalBlock[] {
  if (article.blocks?.length) return article.blocks;
  return (article.body ?? []).map((text) => ({ type: "p" as const, text }));
}

export function blogPostingJsonLd(article: JournalArticle) {
  const url = `https://${SITE.domain}/journal/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    dateModified: article.updatedIso,
    datePublished: article.updatedIso,
    author: {
      "@type": "Organization",
      name: article.author,
      url: `https://${SITE.domain}`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: `https://${SITE.domain}`,
      logo: {
        "@type": "ImageObject",
        url: `https://${SITE.domain}/catalog/brand/logo.jpg`,
      },
    },
    mainEntityOfPage: url,
    url,
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://${SITE.domain}${item.path}`,
    })),
  };
}
