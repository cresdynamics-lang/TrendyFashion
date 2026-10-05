import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = `https://${SITE.domain}`;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/wishlist", "/search", "/api/", "/admin"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: SITE.domain,
  };
}
