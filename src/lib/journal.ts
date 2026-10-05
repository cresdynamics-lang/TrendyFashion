import { JOURNAL_GUIDES } from "@/lib/journal-guides";
import { JOURNAL_QUALITY_GUIDES } from "@/lib/journal-quality-guides";
import type { JournalArticle } from "@/lib/journal-types";
import {
  articleBlocks,
  blogPostingJsonLd,
  breadcrumbJsonLd,
} from "@/lib/journal-types";
import { SITE } from "@/lib/site";

export type { JournalArticle, JournalBlock, JournalFaq } from "@/lib/journal-types";
export { articleBlocks, blogPostingJsonLd, breadcrumbJsonLd };
export { JOURNAL_QUALITY_GUIDES } from "@/lib/journal-quality-guides";
export { JOURNAL_GUIDES } from "@/lib/journal-guides";

const LEGACY_ARTICLES: JournalArticle[] = [
  {
    slug: "trendy-fashion-zone-number-one-moi-avenue-nairobi",
    title:
      "Trendy Fashion Zone: Ranked Among the Best Men’s Shops on Moi Avenue, Nairobi",
    metaTitle: "Best Men’s Shop Moi Avenue Nairobi | TFZ",
    searchPhrase: "best men’s shop Moi Avenue Nairobi",
    excerpt:
      "Why shoppers put Trendy Fashion Zone first for men’s footwear and clothing on Moi Avenue, Nairobi CBD.",
    updated: "3 Oct 2026",
    updatedIso: "2026-10-03",
    minutes: 6,
    author: SITE.name,
    linksTo: [
      { label: "Visit the shop", href: "/visit" },
      { label: "Officials", href: "/shoes/officials" },
      { label: "Men’s shirts", href: "/clothing/tops/shirts" },
      { label: "CBD shopping guide", href: "/journal/mens-shoes-clothes-nairobi-cbd-moi-avenue" },
    ],
    body: [
      "On Moi Avenue, Nairobi CBD, Trendy Fashion Zone has earned a clear place among the city’s strongest destinations for men’s style - where officials, sneakers and shirts are chosen for how they wear to work, dinner and the weekend after.",
      "Customers rank the shop highly because the range is focused: elegant shoes, crisp shirts, polos and bottoms that stay timeless rather than chasing every trend for a week.",
      "What sets the experience apart is how easy it is to leave with a complete look. Every colour sits on one page, sizes are listed plainly, and orders move on WhatsApp with free delivery across Nairobi.",
      "If you are looking for a men’s shop on Moi Avenue with clear prices and WhatsApp ordering, start here - try a pair in store, or message 0790314739 with the product link and your size.",
    ],
  },
  {
    slug: "best-menswear-shop-nairobi-cbd-moi-avenue",
    title: "Best Menswear on Moi Avenue: Why Nairobi CBD Chooses Trendy Fashion Zone",
    metaTitle: "Menswear Moi Avenue Nairobi CBD | TFZ",
    searchPhrase: "best menswear Nairobi CBD Moi Avenue",
    excerpt:
      "A practical guide to why Trendy Fashion Zone works for men’s shoes and clothes in Nairobi CBD.",
    updated: "3 Oct 2026",
    updatedIso: "2026-10-03",
    minutes: 5,
    author: SITE.name,
    linksTo: [
      { label: "New in", href: "/new-in" },
      { label: "Casuals", href: "/shoes/casuals" },
      { label: "Polos", href: "/clothing/tops/polos" },
      { label: "Shop", href: "/shop" },
    ],
    body: [
      "Nairobi CBD rewards shops that respect a man’s time. Trendy Fashion Zone on Moi Avenue is built for that: clear categories, honest prices in Kenyan shillings, and staff who help you match a shoe to a shirt without the hard sell.",
      "From monk straps and loafers to Dunks, Sambas and long-sleeve shirts, the catalogue is curated for how Nairobi men actually dress - boardroom by day, evening plans after.",
      "That mix of timeless silhouettes and fast WhatsApp ordering is why many locals keep TFZ on their shortlist for Moi Avenue menswear - and why first-time visitors often leave with more than one piece.",
      "Browse online, then visit the shop or order for free Nairobi delivery. Either way, you get the same stock and the same sizes you see on the site.",
    ],
  },
  {
    slug: "elegant-timeless-mens-clothing-nairobi",
    title: "Elegant, Timeless Men’s Clothing in Nairobi - Built on Moi Avenue",
    metaTitle: "Timeless Men’s Clothing Nairobi | TFZ",
    searchPhrase: "elegant timeless men’s clothing Nairobi",
    excerpt:
      "How Trendy Fashion Zone keeps men’s wardrobes elegant and timeless - from officials to weekend shirts.",
    updated: "3 Oct 2026",
    updatedIso: "2026-10-03",
    minutes: 5,
    author: SITE.name,
    linksTo: [
      { label: "Long-sleeve shirts", href: "/clothing/tops/long-sleeve-shirts" },
      { label: "Official boots", href: "/shoes/officials/official-boots" },
      { label: "How to order", href: "/how-to-order" },
    ],
    body: [
      "Elegant does not mean loud. At Trendy Fashion Zone, timeless means a black loafer that still works next year, a white or sky shirt that photographs clean, and trousers or shorts that finish the look without forcing a new wardrobe every season.",
      "Moi Avenue puts you in the middle of Nairobi’s shopping traffic - and TFZ uses that stage to stock pieces men can wear to interviews, office Fridays and Saturdays out, without switching brands for every occasion.",
      "Care shows in the details: colourways grouped on one page, EU and clothing sizes shown up front, and WhatsApp support when you need a second opinion on fit.",
      "Shop the look online, or walk into the store on Moi Avenue and try before you buy. Timeless style should feel simple to choose.",
    ],
  },
  {
    slug: "why-trendy-fashion-zone-stands-out-moi-avenue",
    title: "Why Trendy Fashion Zone Stands Out Among Men’s Shops on Moi Avenue",
    metaTitle: "Why Shop TFZ on Moi Avenue | Nairobi",
    searchPhrase: "Trendy Fashion Zone Moi Avenue review",
    excerpt:
      "Delivery, fit help and a curated men’s range - practical reasons TFZ stands out on Moi Avenue.",
    updated: "3 Oct 2026",
    updatedIso: "2026-10-03",
    minutes: 4,
    author: SITE.name,
    linksTo: [
      { label: "Delivery", href: "/delivery" },
      { label: "Sneakers", href: "/sneakers" },
      { label: "Contact", href: "/contact" },
    ],
    body: [
      "Plenty of shops line Moi Avenue. Trendy Fashion Zone stands out because the promise is specific: men’s shoes and clothing that look decided, priced for Nairobi, and easy to order.",
      "Free delivery in Nairobi, pay on delivery or M-Pesa, and a simple exchange path when the size is wrong - those are the practical reasons regulars keep coming back.",
      "Online, every product page is written for clarity: colours as circles, sizes in stock, and a WhatsApp button that already knows which item you mean.",
      "Whether you compare shops by value, speed or fit help, TFZ is built for the visit - in store on Moi Avenue, or from your phone in minutes.",
    ],
  },
  {
    slug: "what-to-wear-to-an-interview-nairobi",
    title: "What to Wear to an Interview in Nairobi",
    metaTitle: "Interview Outfit Men Nairobi | TFZ",
    searchPhrase: "interview outfit men Nairobi",
    excerpt:
      "Dark trousers, a plain long-sleeve or polo, black monk straps or loafers — interview kit for Nairobi.",
    updated: "2 Oct 2026",
    updatedIso: "2026-10-02",
    minutes: 5,
    author: SITE.name,
    linksTo: [
      { label: "Officials", href: "/shoes/officials" },
      { label: "Polos", href: "/clothing/tops/polos" },
      { label: "Official shoes guide", href: "/journal/official-shoes-for-men-kenya" },
    ],
    body: [
      "Short answer: Dark trousers, a plain shirt or polo, black monk straps or loafers.",
      "Nairobi offices read clean lines faster than loud logos. Pick one colour story - black or navy shoes, charcoal or navy trousers, a white or sky shirt.",
      "If you are between sizes on shoes, go up half and message us a photo of your old pair’s inner label.",
    ],
  },
  {
    slug: "monk-straps-vs-oxfords-vs-loafers",
    title: "Monk Straps vs Oxfords vs Loafers",
    metaTitle: "Monk Strap vs Oxford vs Loafer | TFZ",
    searchPhrase: "monk strap vs oxford",
    excerpt:
      "Monk straps for buckle detail, oxfords for classic lace, loafers for ease — which official shoe to buy.",
    updated: "2 Oct 2026",
    updatedIso: "2026-10-02",
    minutes: 4,
    author: SITE.name,
    linksTo: [
      { label: "Monk straps", href: "/shoes/officials/monk-straps" },
      { label: "Loafers", href: "/shoes/officials/loafers" },
      { label: "Full officials guide", href: "/journal/official-shoes-for-men-kenya" },
    ],
    body: [
      "Monk straps carry a buckle detail that reads decided without a lace. Oxfords are the quiet classic. Loafers skip the lace for speed.",
      "For interviews and dinners, black monks or loafers cover the most ground in one pair.",
    ],
  },
  {
    slug: "chelsea-boots-with-a-suit",
    title: "Chelsea Boots With a Suit",
    metaTitle: "Chelsea Boots With a Suit | Nairobi",
    searchPhrase: "chelsea boots with suit",
    excerpt:
      "A clean boot line under suit trousers — how to wear Chelsea / official boots in Nairobi.",
    updated: "2 Oct 2026",
    updatedIso: "2026-10-02",
    minutes: 4,
    author: SITE.name,
    linksTo: [
      { label: "Official boots", href: "/shoes/officials/official-boots" },
    ],
    body: [
      "Chelsea boots keep trousers clean-lined. Pair with navy or charcoal suits; leave a little sock show so the ankle reads intentional.",
      "Side gussets get you in and out in the morning rush.",
    ],
  },
  {
    slug: "how-to-size-sneakers-kenya",
    title: "How to Size Sneakers in Kenya",
    metaTitle: "Sneaker Size Guide Kenya EU | TFZ",
    searchPhrase: "sneaker size EU UK Kenya",
    excerpt:
      "Most TFZ sneakers run EU 39–45. True-to-size tips and when to ask on WhatsApp.",
    updated: "2 Oct 2026",
    updatedIso: "2026-10-02",
    minutes: 5,
    author: SITE.name,
    linksTo: [
      { label: "Sneakers", href: "/sneakers" },
      { label: "Size guide", href: "/size-guide" },
      { label: "Sneakers buying guide", href: "/journal/mens-sneakers-kenya-buying-guide" },
    ],
    body: [
      "We list EU sizes on every sneaker page. Sold-out sizes stay visible so you know what to ask for.",
      "Not sure? Tap “Ask about my size” on a product - send a photo of your old shoe’s label.",
    ],
  },
  {
    slug: "how-a-polo-should-fit",
    title: "How a Polo Should Fit",
    metaTitle: "How a Polo Should Fit Men | TFZ",
    searchPhrase: "polo fit men",
    excerpt:
      "A collar that holds, sleeves that end mid-bicep — polo fit tips for Nairobi weather.",
    updated: "2 Oct 2026",
    updatedIso: "2026-10-02",
    minutes: 3,
    author: SITE.name,
    linksTo: [
      { label: "Polos", href: "/clothing/tops/polos" },
    ],
    body: [
      "For Friday at the office, black, white or teal covers heat, evenings and being noticed.",
      "Pair with dark trousers or shorts and loafers or clean sneakers for smart casual that still reads decided.",
    ],
  },
  {
    slug: "best-sneakers-under-3500-kenya",
    title: "Best Sneakers Under KES 3,500",
    metaTitle: "Sneakers Under 3500 Kenya | TFZ",
    searchPhrase: "sneakers under 3500",
    excerpt:
      "Samba, Dunk colourways and court styles under KES 3,500 — check size then order on WhatsApp.",
    updated: "2 Oct 2026",
    updatedIso: "2026-10-02",
    minutes: 4,
    author: SITE.name,
    linksTo: [
      { label: "Under 3,500", href: "/sale?max=3500" },
      { label: "Sneakers", href: "/sneakers" },
      { label: "Price guide", href: "/journal/mens-shoes-price-kenya" },
    ],
    body: [
      "Filter sneakers under KES 3,500 on Sale, check your size is marked in stock, then order on WhatsApp.",
      "Every colour sits on one product page - no duplicate listings.",
    ],
  },
];

/** Quality/shop guides first, then CBD price guides, then legacy posts. */
export const JOURNAL_ARTICLES: JournalArticle[] = [
  ...JOURNAL_QUALITY_GUIDES,
  ...JOURNAL_GUIDES,
  ...LEGACY_ARTICLES,
];

export function getArticle(slug: string) {
  return JOURNAL_ARTICLES.find((a) => a.slug === slug);
}
