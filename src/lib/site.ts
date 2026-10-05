export const SITE = {
  name: "Trendy Fashion Zone",
  shortName: "TFZ",
  domain: "trendyfashionzone.co.ke",
  whatsapp: "0790314739",
  whatsappE164: "254790314739",
  address: "Moi Avenue, Nairobi CBD",
  deliveryPromise: "Free delivery in Nairobi",
  hours: "Mon-Sat 9:00-19:00 · Sun 10:00-17:00",
  mapsUrl: "https://maps.google.com/?q=Moi+Avenue+Nairobi+CBD",
} as const;

export type NavLink = { label: string; href: string; badge?: string };

export type NavColumn = {
  title: string;
  href: string;
  links: NavLink[];
};

export type MegaMenu = {
  label: string;
  href: string;
  columns: NavColumn[];
  feature?: { title: string; href: string; image: string };
};

/**
 * Top-nav big categories - each opens a short dropdown of subcategories.
 * Goal: at most two clicks to a product (nav → subcategory → product).
 */
export const MEGA_MENUS: MegaMenu[] = [
  {
    label: "Officials",
    href: "/shoes/officials",
    columns: [
      {
        title: "Official shoes",
        href: "/shoes/officials",
        links: [
          { label: "All official shoes", href: "/shoes/officials" },
          { label: "Monk straps", href: "/shoes/officials/monk-straps" },
          { label: "Loafers", href: "/shoes/officials/loafers" },
          { label: "Oxford & derby", href: "/shoes/officials/oxford-derby" },
          { label: "Official boots", href: "/shoes/officials/official-boots" },
          { label: "Empire", href: "/shoes/officials?brand=Empire" },
          { label: "Clarks", href: "/shoes/officials?brand=Clarks" },
        ],
      },
    ],
  },
  {
    label: "Casuals",
    href: "/shoes/casuals",
    columns: [
      {
        title: "Casual shoes",
        href: "/shoes/casuals",
        links: [
          { label: "All casual shoes", href: "/shoes/casuals" },
          { label: "Casual loafers", href: "/shoes/casuals/casual-loafers" },
          { label: "Lace-ups", href: "/shoes/casuals/lace-up-casuals" },
          { label: "Casual boots", href: "/shoes/casuals/casual-boots" },
          { label: "Timberland", href: "/shoes/casuals?brand=Timberland" },
        ],
      },
    ],
  },
  {
    label: "Sandals",
    href: "/shoes/sandals-slides",
    columns: [
      {
        title: "Sandals & slides",
        href: "/shoes/sandals-slides",
        links: [
          { label: "All sandals", href: "/shoes/sandals-slides" },
          {
            label: "Buckle slides",
            href: "/shoes/sandals-slides/buckle-slides",
          },
          { label: "Clogs & mules", href: "/shoes/sandals-slides/clogs-mules" },
        ],
      },
    ],
  },
  {
    label: "Sneakers",
    href: "/sneakers",
    columns: [
      {
        title: "Shop sneakers",
        href: "/sneakers",
        links: [
          { label: "All sneakers", href: "/sneakers" },
          { label: "New Balance", href: "/sneakers/shop-by-model/new-balance" },
          { label: "Dunk Low", href: "/sneakers/shop-by-model/dunk-low" },
          { label: "Air Force 1", href: "/sneakers/shop-by-model/air-force-1" },
          { label: "Air Max", href: "/sneakers/shop-by-model/air-max" },
          { label: "Samba", href: "/sneakers/shop-by-model/samba" },
          { label: "Jordan", href: "/sneakers/shop-by-model/jordan" },
          { label: "Nike", href: "/sneakers?brand=Nike" },
          { label: "Adidas", href: "/sneakers?brand=Adidas" },
        ],
      },
    ],
  },
  {
    label: "Shop",
    href: "/shop",
    columns: [
      {
        title: "Browse all",
        href: "/shop",
        links: [
          { label: "All products", href: "/shop" },
          { label: "Officials", href: "/shop/officials" },
          { label: "Casuals", href: "/shop/casuals" },
          { label: "Other (sneakers & more)", href: "/shop/other" },
          { label: "Sale by price", href: "/sale", badge: "EASY" },
        ],
      },
    ],
  },
  {
    label: "Clothing",
    href: "/clothing",
    columns: [
      {
        title: "Men's shirts",
        href: "/clothing/tops/shirts",
        links: [
          { label: "All shirts", href: "/clothing/tops/shirts" },
          {
            label: "Long-sleeve shirts",
            href: "/clothing/tops/long-sleeve-shirts",
            badge: "NEW",
          },
          { label: "Official shirts", href: "/clothing/tops/official-shirts" },
          { label: "Polos", href: "/clothing/tops/polos" },
          { label: "T-shirts", href: "/clothing/tops/t-shirts" },
          { label: "Hoodies", href: "/clothing/tops/hoodies" },
        ],
      },
      {
        title: "Men's trousers",
        href: "/clothing/bottoms/trousers",
        links: [
          { label: "Trousers", href: "/clothing/bottoms/trousers" },
          { label: "Casual shorts", href: "/clothing/bottoms/casual-shorts" },
          { label: "All bottoms", href: "/clothing/bottoms" },
        ],
      },
    ],
  },
];

export const PROMISES = [
  { title: "Free delivery in Nairobi", body: "Delivered to your door" },
  { title: "Pay your way", body: "M-Pesa · pay on delivery · WhatsApp order" },
  { title: "Wrong size?", body: "Exchange - start in one message" },
  { title: "Talk to us", body: "0790314739 on WhatsApp" },
] as const;

export const OCCASIONS = [
  {
    title: "Office & interviews",
    body: "Officials, boots, trousers",
    href: "/shoes/officials",
    image: "/catalog/shoes/officials/monk-strap/black.jpeg",
  },
  {
    title: "Weekend",
    body: "Sneakers, tees, slides",
    href: "/sneakers",
    image: "/catalog/sneakers/samba/chocolate.jpeg",
  },
  {
    title: "Smart casual",
    body: "Polos, khakis, loafers",
    href: "/clothing/tops/polos",
    image: "/catalog/clothing/tops/zip-neck-polo/teal.jpeg",
  },
] as const;

export const HOME_CATEGORY_TILES = [
  {
    title: "Officials",
    href: "/shoes/officials",
    image: "/catalog/shoes/officials/clarks-penny-loafer/black-01.jpg",
  },
  {
    title: "Casuals",
    href: "/shoes/casuals",
    image: "/catalog/shoes/casuals/suede-penny-loafer/brown.jpg",
  },
  {
    title: "Sandals",
    href: "/shoes/sandals-slides",
    image: "/catalog/shoes/sandals-slides/buckle-slide/black.jpeg",
  },
  {
    title: "Sneakers",
    href: "/sneakers",
    image: "/catalog/sneakers/dunk-low/olive-blue.jpeg",
  },
  {
    title: "Men's shirts",
    href: "/clothing/tops/shirts",
    image: "/catalog/clothing/tops/raglan-oversized-tee/brown.jpeg",
  },
  {
    title: "Men's trousers",
    href: "/clothing/bottoms/trousers",
    image: "/catalog/clothing/bottoms/textured-trousers/charcoal.jpeg",
  },
] as const;

export const PRICE_SHELVES = [
  {
    title: "Under 2,000",
    body: "Tees, polos, shorts",
    href: "/sale?max=2000",
    max: 2000,
  },
  {
    title: "Under 3,500",
    body: "Sneakers, slides, casuals",
    href: "/sale?max=3500",
    max: 3500,
  },
  {
    title: "Under 5,000",
    body: "Officials and boots",
    href: "/sale?max=5000",
    max: 5000,
  },
] as const;

export const BRAND_CHIPS = [
  { label: "Clarks", href: "/shoes?brand=Clarks" },
  { label: "Timberland", href: "/shoes?brand=Timberland" },
  { label: "Nike", href: "/sneakers?brand=Nike" },
  { label: "Adidas", href: "/sneakers?brand=Adidas" },
  { label: "Lacoste", href: "/shoes?brand=Lacoste" },
  { label: "On", href: "/sneakers?brand=On" },
  { label: "Boss", href: "/shoes?brand=Boss" },
  { label: "Puma", href: "/shoes?brand=Puma" },
] as const;

export const LOOK_BUNDLE = {
  id: "friday-office",
  title: "The Friday office look",
  body: "Polo, khakis, monk straps · pick sizes · KES 8,400 together",
  priceKes: 8400,
  items: [
    { slug: "zip-neck-polo", colour: "teal" },
    { slug: "textured-trousers", colour: "charcoal" },
    { slug: "monk-strap", colour: "black" },
  ],
} as const;

export const HOME_FAQS = [
  {
    q: "Do you deliver outside Nairobi?",
    a: "Yes - ask on WhatsApp for countrywide fees and timing. Nairobi delivery is free.",
  },
  {
    q: "Can I exchange a size?",
    a: "Send the product link, colour and size. We’ll walk you through a simple exchange.",
  },
  {
    q: "How do I pay?",
    a: "Order on WhatsApp today. Pay on delivery or M-Pesa in Nairobi. Online checkout via Pesapal is next.",
  },
  {
    q: "Can I come and try them on?",
    a: `Yes - visit us on ${SITE.address}. Hours: ${SITE.hours}.`,
  },
] as const;

export const PLACEHOLDER_REVIEWS = [
  {
    name: "James K.",
    product: "Zip-neck polo · Teal · L",
    date: "Sep 2026",
    text: "Ordered on WhatsApp in the afternoon, picked up the next day on Moi Avenue. Fit as shown.",
    stars: 5,
  },
  {
    name: "Brian M.",
    product: "Dunk Low · Olive blue · 42",
    date: "Aug 2026",
    text: "Colour matched the page. Size was true - I wear 42 in Nike.",
    stars: 5,
  },
  {
    name: "David O.",
    product: "Monk strap · Black · 41",
    date: "Aug 2026",
    text: "Wore them to an interview the same week. Softened after two evenings at home.",
    stars: 5,
  },
] as const;
