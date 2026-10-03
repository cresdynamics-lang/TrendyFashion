export type JournalArticle = {
  slug: string;
  title: string;
  searchPhrase: string;
  excerpt: string;
  updated: string;
  minutes: number;
  linksTo: { label: string; href: string }[];
  body: string[];
};

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "what-to-wear-to-an-interview-nairobi",
    title: "What to Wear to an Interview in Nairobi",
    searchPhrase: "interview outfit men Nairobi",
    excerpt: "Dark trousers, a plain long-sleeve or polo, black monk straps or loafers.",
    updated: "2 Oct 2026",
    minutes: 5,
    linksTo: [
      { label: "Officials", href: "/shoes/officials" },
      { label: "Polos", href: "/clothing/tops/polos" },
      { label: "Trousers", href: "/clothing/bottoms/trousers" },
    ],
    body: [
      "Short answer: Dark trousers, a plain shirt or polo, black monk straps or loafers.",
      "Nairobi offices read clean lines faster than loud logos. Pick one colour story — black or navy shoes, charcoal or navy trousers, a white or sky shirt.",
      "If you are between sizes on shoes, go up half and message us a photo of your old pair’s inner label.",
    ],
  },
  {
    slug: "monk-straps-vs-oxfords-vs-loafers",
    title: "Monk Straps vs Oxfords vs Loafers",
    searchPhrase: "monk strap vs oxford",
    excerpt: "Want slim with a buckle detail? Monk straps. Want classic lace? Oxfords. Want ease? Loafers.",
    updated: "2 Oct 2026",
    minutes: 4,
    linksTo: [
      { label: "Monk straps", href: "/shoes/officials/monk-straps" },
      { label: "Loafers", href: "/shoes/officials/loafers" },
    ],
    body: [
      "Monk straps carry a buckle detail that reads decided without a lace. Oxfords are the quiet classic. Loafers skip the lace for speed.",
      "For interviews and dinners, black monks or loafers cover the most ground in one pair.",
    ],
  },
  {
    slug: "chelsea-boots-with-a-suit",
    title: "Chelsea Boots With a Suit",
    searchPhrase: "chelsea boots with suit",
    excerpt: "A clean boot line under suit trousers — and a flash of colour inside only you know about.",
    updated: "2 Oct 2026",
    minutes: 4,
    linksTo: [
      { label: "Official boots", href: "/shoes/officials/official-boots" },
      { label: "Chelsea boot", href: "/p/chelsea-boot/black" },
    ],
    body: [
      "Chelsea boots keep trousers clean-lined. Pair with navy or charcoal suits; leave a little sock show so the ankle reads intentional.",
      "Side gussets get you in and out in the morning rush.",
    ],
  },
  {
    slug: "how-to-size-sneakers-kenya",
    title: "How to Size Sneakers in Kenya",
    searchPhrase: "sneaker size EU UK Kenya",
    excerpt: "Most of our sneakers run EU 40–45. True to size for Dunk and Samba; ask if you are between sizes.",
    updated: "2 Oct 2026",
    minutes: 5,
    linksTo: [
      { label: "Sneakers", href: "/sneakers" },
      { label: "Size guide", href: "/size-guide" },
    ],
    body: [
      "We list EU sizes on every sneaker page. Sold-out sizes stay visible so you know what to ask for.",
      "Not sure? Tap “Ask about my size” on a product — send a photo of your old shoe’s label.",
    ],
  },
  {
    slug: "how-a-polo-should-fit",
    title: "How a Polo Should Fit",
    searchPhrase: "polo fit men",
    excerpt: "A collar that holds, a zip that sits flat, and sleeves that end mid-bicep — not at the elbow.",
    updated: "2 Oct 2026",
    minutes: 3,
    linksTo: [
      { label: "Polos", href: "/clothing/tops/polos" },
      { label: "Zip-neck polo", href: "/p/zip-neck-polo/teal" },
    ],
    body: [
      "For Friday at the office, black, white or teal covers heat, evenings and being noticed.",
      "Pair with textured trousers and loafers for smart casual that still reads decided.",
    ],
  },
  {
    slug: "best-sneakers-under-3500-kenya",
    title: "Best Sneakers Under KES 3,500",
    searchPhrase: "sneakers under 3500",
    excerpt: "Samba, Dunk colourways and court styles that stay under budget without hiding sizes.",
    updated: "2 Oct 2026",
    minutes: 4,
    linksTo: [
      { label: "Under 3,500", href: "/sneakers?max=3500" },
      { label: "Samba", href: "/p/samba/chocolate" },
    ],
    body: [
      "Filter sneakers under KES 3,500, check your size is marked in stock, then order on WhatsApp.",
      "Every colour sits on one product page — no duplicate listings.",
    ],
  },
];

export function getArticle(slug: string) {
  return JOURNAL_ARTICLES.find((a) => a.slug === slug);
}
