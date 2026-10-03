export type CategoryCopy = {
  headline: string;
  support: string;
  doubt: string;
  chooser?: { label: string; bestFor: string; href: string }[];
  fitNote: string;
  sizeRange: string;
  valueLine: string;
  buttonLine: string;
  faqs: { q: string; a: string }[];
  outfits?: { title: string; items: string; href: string }[];
};

const DEFAULT: CategoryCopy = {
  headline: "Shop the range",
  support: "Pick a type, check your size, order on WhatsApp.",
  doubt: "Will it fit? What does it go with?",
  fitNote: "Sizes shown on every card. Sold-out sizes stay visible on the product page.",
  sizeRange: "See each product for the full run",
  valueLine: "Free delivery in Nairobi. Exchange if the size is off.",
  buttonLine: "Order on WhatsApp. Wrong size? We exchange it.",
  faqs: [
    { q: "How do I order?", a: "Pick colour and size, then Order on WhatsApp or add to cart." },
    { q: "Can I exchange?", a: "Yes — message us with the product link and size." },
  ],
};

export const CATEGORY_COPY: Record<string, CategoryCopy> = {
  "shoes/officials": {
    headline: "Wear them to the 9am meeting and the 7pm dinner.",
    support: "No change of shoes. Monk straps, loafers and boots sized 39–46.",
    doubt: "Will they hurt by lunch? Will they look right with my suit?",
    chooser: [
      { label: "Monk straps", bestFor: "Want slim with a buckle? Pick monk straps.", href: "/shoes/officials/monk-straps" },
      { label: "Loafers", bestFor: "Want ease without laces? Pick loafers.", href: "/shoes/officials/loafers" },
      { label: "Official boots", bestFor: "Chelsea for slim, zip for speed.", href: "/shoes/officials/official-boots" },
    ],
    fitNote: "True to size for most pairs; if between sizes, go up half. Break them in two hours at home first.",
    sizeRange: "39–46",
    valueLine: "At KES 4,500, worn three days a week for a year — about KES 29 a day.",
    buttonLine: "Order on WhatsApp. Wrong size? We exchange it.",
    faqs: [
      { q: "Will they work with a suit?", a: "Yes — clean toe shapes and buckle details, no loud logos." },
      { q: "What sizes do you stock?", a: "Officials typically run 39 to 46. Sold-out sizes stay marked on the page." },
      { q: "Can I exchange?", a: "Message the product link, colour and size — we exchange if the fit is off." },
    ],
    outfits: [
      { title: "Interview look", items: "Black monk · charcoal trousers · polo", href: "/journal/what-to-wear-to-an-interview-nairobi" },
      { title: "Friday dinner", items: "Loafers · navy trousers · zip polo", href: "/shoes/officials/loafers" },
      { title: "Rainy week", items: "Chelsea boot · dark trousers", href: "/shoes/officials/official-boots" },
    ],
  },
  "shoes/officials/monk-straps": {
    headline: "Single and double monk straps for work and dinner.",
    support: "Black and burgundy on one browse. Sizes 39–46. Exchange if the size is off.",
    doubt: "Will the buckle look too much?",
    fitNote: "True to size; if between sizes, go up half.",
    sizeRange: "39–46",
    valueLine: "See every colour on one page — pick once.",
    buttonLine: "Order on WhatsApp. Wrong size? We exchange it.",
    faqs: [
      { q: "Single or double monk?", a: "Single for everyday offices; double when you want more presence." },
      { q: "Do you have brown?", a: "Browse colour dots on each product — burgundy and black are live now." },
    ],
    outfits: [
      { title: "Office", items: "Black monk · textured trousers", href: "/p/monk-strap/black" },
      { title: "Dinner", items: "Burgundy double monk · dark trousers", href: "/p/double-monk-strap/burgundy" },
    ],
  },
  "shoes/casuals": {
    headline: "The pair that works on both days.",
    support: "Loafers, lace-ups and chunky soles for Saturday and the not-quite-meeting.",
    doubt: "Too dressy for Saturday? Too casual for the office?",
    chooser: [
      { label: "Casual loafers", bestFor: "Ease — slip on and go.", href: "/shoes/casuals/casual-loafers" },
      { label: "Lace-ups", bestFor: "Structure for smarter days.", href: "/shoes/casuals/lace-up-casuals" },
      { label: "Chunky soles", bestFor: "Streetwear presence.", href: "/shoes/casuals/chunky-sole-casuals" },
    ],
    fitNote: "Check the size line on each card before you open WhatsApp.",
    sizeRange: "39–46 / 40–45 by model",
    valueLine: "One casual pair often works with six of our trousers and shorts.",
    buttonLine: "Order on WhatsApp. Wrong size? We exchange it.",
    faqs: [
      { q: "Office or weekend?", a: "Loafers bridge both; chunky soles lean weekend." },
    ],
  },
  "shoes/sandals-slides": {
    headline: "Cool feet, clean look.",
    support: "The slide you can wear to the shop and the hotel — black and white on one page.",
    doubt: "Will they be comfortable? Too loud?",
    fitNote: "Adjustable buckles — open and close to fit your foot.",
    sizeRange: "40–45",
    valueLine: "Pick black or white once; wear with linen shorts and a polo.",
    buttonLine: "Order on WhatsApp. Wrong size? We exchange it.",
    faqs: [
      { q: "Black or white?", a: "Both live on one product — swap the colour dot and share the link." },
    ],
  },
  sneakers: {
    headline: "See every colour, check your size, send it before you pay.",
    support: "Dunks, Air Force, Air Max, Samba — model pages with every colourway.",
    doubt: "Is my size left? Will it look as good in person?",
    chooser: [
      { label: "Dunk Low", bestFor: "Low profile, every colour on one page.", href: "/sneakers/dunk-low" },
      { label: "Samba", bestFor: "Slim under jeans or chinos.", href: "/sneakers/samba" },
      { label: "Under 3,500", bestFor: "Budget-first browse.", href: "/sneakers?max=3500" },
    ],
    fitNote: "True to size for most models; ask if you are between sizes.",
    sizeRange: "40–45",
    valueLine: "Sold-out sizes stay marked. Tell us when your size is back.",
    buttonLine: "Order on WhatsApp. Wrong size? We exchange it.",
    faqs: [
      { q: "How many colours?", a: "Open a model page — every colourway sits together, not as duplicates." },
      { q: "Can a friend pick?", a: "Copy the colour link or create a share link from the product." },
    ],
  },
  clothing: {
    headline: "Fit, fabric and what it goes with.",
    support: "Tops, bottoms and looks you can order together.",
    doubt: "Will oversized look sloppy? Is a polo smart enough?",
    chooser: [
      { label: "T-shirts", bestFor: "Oversized on purpose.", href: "/clothing/tops/t-shirts" },
      { label: "Polos", bestFor: "Friday at the office.", href: "/clothing/tops/polos" },
      { label: "Trousers", bestFor: "Waist first, length confirmed.", href: "/clothing/bottoms/trousers" },
      { label: "Long sleeves", bestFor: "Interview to church.", href: "/clothing/tops/long-sleeve-shirts" },
    ],
    fitNote: "Clothing sizes S–XXL; trousers use waist sizes on tags.",
    sizeRange: "S–XXL · waist 30–36",
    valueLine: "One tee, three outfits — khakis, shorts and jeans.",
    buttonLine: "Order on WhatsApp. Wrong size? We exchange it.",
    faqs: [
      { q: "Long sleeves in stock?", a: "The long-sleeve page is live for search; photos arrive as stock is shot." },
    ],
  },
  "clothing/tops/polos": {
    headline: "A collar and a zip: enough structure for Friday at the office.",
    support: "Black for evenings, white for heat, teal when you want to be noticed.",
    doubt: "Is a polo smart enough for work?",
    fitNote: "Model reference on each product where available. Sizes S–XXL.",
    sizeRange: "S–XXL",
    valueLine: "Styled with trousers and loafers — one polo, three settings.",
    buttonLine: "Order on WhatsApp. Wrong size? We exchange it.",
    faqs: [
      { q: "Which colour first?", a: "Black and white cover the most days; teal when you want the page to notice you." },
    ],
    outfits: [
      { title: "Friday office", items: "Teal polo · charcoal trousers · monk straps", href: "/#complete-the-look" },
    ],
  },
  "clothing/tops/t-shirts": {
    headline: "Oversized on purpose.",
    support: "The shoulder seam sits right and the hem hangs straight — grey, brown, black and sand.",
    doubt: "Will oversized look sloppy?",
    fitNote: "Relaxed fit. Check the size line before you order.",
    sizeRange: "S–XL",
    valueLine: "One tee, three outfits: khakis, shorts and jeans.",
    buttonLine: "Order on WhatsApp. Wrong size? We exchange it.",
    faqs: [
      { q: "How many colours?", a: "Four colourways on one card — tap a dot to swap the photo." },
    ],
  },
  "clothing/tops/long-sleeve-shirts": {
    headline: "Sleeves that end at the wrist and roll up when the day heats up.",
    support: "Official for the office, casual for dinners, polo for weekends. Photos of the range coming as stock is shot.",
    doubt: "Will it be too hot? Will the sleeves be the right length?",
    fitNote: "Sleeve length will appear in the size chart once measured.",
    sizeRange: "S–XXL",
    valueLine: "One white long sleeve covers interview, wedding and church.",
    buttonLine: "Ask on WhatsApp for current long-sleeve stock.",
    faqs: [
      { q: "Do you have photos?", a: "Not yet for every colour — message us and we’ll send what’s in hand." },
    ],
  },
  "clothing/bottoms/trousers": {
    headline: "Choose your waist — we confirm the length before delivery.",
    support: "Textured weaves that hide a long day’s creases.",
    doubt: "Will they fit my waist and my length?",
    fitNote: "Waist sizes on tags (e.g. 32). Ask us to confirm inseam on WhatsApp.",
    sizeRange: "30–36",
    valueLine: "Works with polos, long sleeves and loafers.",
    buttonLine: "Order on WhatsApp. Wrong size? We exchange it.",
    faqs: [
      { q: "Charcoal or navy?", a: "Both live on one product — swap colour and share the link." },
    ],
  },
};

export function getCategoryCopy(pathKey: string): CategoryCopy {
  if (CATEGORY_COPY[pathKey]) return CATEGORY_COPY[pathKey];
  const parts = pathKey.split("/");
  while (parts.length > 1) {
    parts.pop();
    const key = parts.join("/");
    if (CATEGORY_COPY[key]) return CATEGORY_COPY[key];
  }
  return DEFAULT;
}
