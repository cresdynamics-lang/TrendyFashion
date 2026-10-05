import type { MetadataRoute } from "next";
import { JOURNAL_ARTICLES } from "@/lib/journal";
import { getAllProducts } from "@/lib/products";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${SITE.domain}`;
  const staticRoutes = [
    "",
    "/shoes",
    "/shoes/officials",
    "/shoes/officials/monk-straps",
    "/shoes/officials/loafers",
    "/shoes/officials/official-boots",
    "/shoes/casuals",
    "/shoes/sandals-slides",
    "/sneakers",
    "/clothing",
    "/clothing/tops",
    "/clothing/tops/t-shirts",
    "/clothing/tops/polos",
    "/clothing/tops/shirts",
    "/clothing/tops/long-sleeve-shirts",
    "/clothing/bottoms",
    "/clothing/bottoms/trousers",
    "/clothing/bottoms/casual-shorts",
    "/new-in",
    "/shop",
    "/shop/officials",
    "/shop/casuals",
    "/shop/other",
    "/sale",
    "/journal",
    "/sneakers/shop-by-model/new-balance",
    "/sneakers/shop-by-model/air-max",
    "/delivery",
    "/exchange",
    "/size-guide",
    "/how-to-order",
    "/visit",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const products = getAllProducts().flatMap((p) => [
    {
      url: `${base}/p/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...p.colours.map((c) => ({
      url: `${base}/p/${p.slug}/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ]);

  const journal = JOURNAL_ARTICLES.map((a) => ({
    url: `${base}/journal/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.75,
    })),
    ...products,
    ...journal,
  ];
}
