import type { JournalArticle } from "@/lib/journal-types";
import { SITE } from "@/lib/site";

const AUTHOR = SITE.name;
const UPDATED = "5 Oct 2026";
const UPDATED_ISO = "2026-10-05";

/** Publishing order: CBD guide → prices → sneakers → officials → budget → ordering */
export const JOURNAL_GUIDES: JournalArticle[] = [
  {
    slug: "mens-shoes-clothes-nairobi-cbd-moi-avenue",
    title:
      "Where to Buy Men's Shoes and Clothes in Nairobi CBD: A Moi Avenue Shopping Guide",
    metaTitle: "Men's Clothes Shop Nairobi CBD | Moi Avenue",
    searchPhrase: "men's clothes shop Nairobi CBD",
    excerpt:
      "Find men's shoes and clothes on Moi Avenue, Nairobi CBD. Trendy Fashion Zone hours, payment, WhatsApp order and free Nairobi delivery.",
    updated: UPDATED,
    updatedIso: UPDATED_ISO,
    minutes: 9,
    author: AUTHOR,
    linksTo: [
      { label: "Visit the shop", href: "/visit" },
      { label: "Shop all", href: "/shop" },
      { label: "Officials", href: "/shoes/officials" },
      { label: "Sneakers", href: "/sneakers" },
      { label: "Men's shirts", href: "/clothing/tops/shirts" },
      { label: "Sale", href: "/sale" },
    ],
    blocks: [
      {
        type: "p",
        text: `Looking for a men's clothes shop in Nairobi CBD? Trendy Fashion Zone is a men's footwear and clothing shop on ${SITE.address}. We sell officials, casuals, sneakers, sandals, shirts and polos, with sizes listed on every product and free delivery in Nairobi.`,
      },
      {
        type: "h2",
        text: "Who is Trendy Fashion Zone?",
      },
      {
        type: "p",
        text: `${SITE.name} is a Nairobi CBD shop on Moi Avenue selling men's footwear and clothing. We focus on pieces men actually wear to work, interviews, weekends and evenings — not one-week trends. Prices are shown in Kenyan shillings on every product page, and every colour sits on one card so you are not hunting duplicate listings.`,
      },
      {
        type: "ul",
        items: [
          `Address: ${SITE.address}`,
          `Hours: ${SITE.hours}`,
          `WhatsApp: ${SITE.whatsapp}`,
          "What we sell: official shoes, casuals, sneakers, sandals & slides, shirts, polos, tees and shorts",
        ],
      },
      {
        type: "h2",
        text: "How do I find the shop on Moi Avenue?",
      },
      {
        type: "p",
        text: "Moi Avenue runs through Nairobi CBD and is one of the easiest streets to reach by matatu, ride-hailing or on foot from the main bus termini. Ask for Trendy Fashion Zone on Moi Avenue, or open our map pin before you leave. If you are already on Moi Avenue, use WhatsApp with a quick “I am nearby” message and we will help you walk in.",
      },
      {
        type: "ol",
        items: [
          "Open Google Maps and search Trendy Fashion Zone or Moi Avenue Nairobi CBD.",
          "Arrive during shop hours so you can try sizes in person.",
          `Message ${SITE.whatsapp} if you need a landmark check or want us to hold a pair.`,
        ],
      },
      {
        type: "note",
        text: `Map: ${SITE.mapsUrl}`,
      },
      {
        type: "h2",
        text: "How do payment and collection work?",
      },
      {
        type: "p",
        text: "In store you can pay and collect the same day. Online or WhatsApp orders in Nairobi can use pay on delivery or M-Pesa, then receive at your door. Countrywide delivery is available on request — ask for the fee and timing before you confirm.",
      },
      {
        type: "table",
        caption: "Buying options at a glance",
        headers: ["Option", "Best for", "What to expect"],
        rows: [
          [
            "Walk in on Moi Avenue",
            "Trying size and colour",
            "Pay in shop, leave with the pair",
          ],
          [
            "WhatsApp order",
            "Busy schedules",
            "Send product link + size, we confirm stock",
          ],
          [
            "Nairobi delivery",
            "Home or office",
            "Free delivery in Nairobi on qualifying orders",
          ],
          [
            "Outside Nairobi",
            "Upcountry or other towns",
            "Ask for courier fee and timing on WhatsApp",
          ],
        ],
      },
      {
        type: "h2",
        text: "What should I buy first at a men's shop in CBD?",
      },
      {
        type: "p",
        text: "Start with the shoe that covers most of your week, then add one top. Officials cover interviews and office days. Sneakers cover weekends and casual Fridays. A plain shirt or polo multiplies both. Browse Officials, Sneakers and Men's shirts, or open Shop to see everything in one place.",
      },
      {
        type: "ul",
        items: [
          "Office / interview: black or brown officials + long-sleeve or polo",
          "Weekend: sneakers + tee or Cuban collar shirt",
          "Heat / home: sandals or slides + shorts or light shirt",
        ],
      },
    ],
    faqs: [
      {
        q: "Where is Trendy Fashion Zone in Nairobi CBD?",
        a: `On ${SITE.address}. Hours: ${SITE.hours}. WhatsApp ${SITE.whatsapp} if you need directions.`,
      },
      {
        q: "Do you sell only shoes?",
        a: "No. We sell men's footwear and clothing — officials, casuals, sneakers, sandals, shirts, polos, tees and shorts.",
      },
      {
        q: "Is delivery free in Nairobi?",
        a: "Yes — Nairobi delivery is free. Ask on WhatsApp for countrywide fees.",
      },
      {
        q: "Can I order on WhatsApp without visiting?",
        a: `Yes. Send the product link, colour and size to ${SITE.whatsapp}. We confirm stock, then arrange pay on delivery or M-Pesa.`,
      },
      {
        q: "What if the size is wrong?",
        a: "Message us with the product link and size. We walk you through a simple exchange.",
      },
    ],
  },
  {
    slug: "mens-shoes-price-kenya",
    title:
      "Men's Shoes Price in Kenya: What to Pay for Sneakers, Official Shoes, Loafers and Sandals",
    metaTitle: "Men's Shoes Price in Kenya | TFZ Nairobi",
    searchPhrase: "men's shoes price in Kenya",
    excerpt:
      "Real men's shoes prices in Kenya from our Nairobi shop: sneakers from KES 1,400, officials from KES 2,500, sandals from KES 2,400.",
    updated: UPDATED,
    updatedIso: UPDATED_ISO,
    minutes: 8,
    author: AUTHOR,
    linksTo: [
      { label: "Sale by price", href: "/sale" },
      { label: "Sneakers", href: "/sneakers" },
      { label: "Officials", href: "/shoes/officials" },
      { label: "Casuals", href: "/shoes/casuals" },
      { label: "Sandals", href: "/shoes/sandals-slides" },
    ],
    blocks: [
      {
        type: "p",
        text: "Men's shoes price in Kenya at Trendy Fashion Zone starts from about KES 1,400 for entry sneakers, with most sneakers around KES 3,000–3,500, official shoes from about KES 2,500–4,800, casual loafers from about KES 2,800, and sandals from about KES 2,400. Below is what to pay by type, using our live Nairobi CBD prices.",
      },
      {
        type: "h2",
        text: "What is a fair men's shoes price in Kenya right now?",
      },
      {
        type: "p",
        text: "A fair price is one that matches materials, sole construction and how many times you will wear the pair. Cheap men's shoes in Nairobi that crack in a month cost more per wear than a solid official shoe worn to work five days a week. Use the table, then open the linked category to see exact colours and sizes.",
      },
      {
        type: "table",
        caption: "Typical men's shoe prices at Trendy Fashion Zone (KES)",
        headers: [
          "Shoe type",
          "Typical price",
          "Best for",
          "Normal wear life",
        ],
        rows: [
          [
            { text: "Sneakers", href: "/sneakers" },
            "1,400–4,300 (many ~3,000–3,500)",
            "Daily, casual, some offices",
            "6–18 months with care",
          ],
          [
            { text: "Official / derby-oxford", href: "/shoes/officials/oxford-derby" },
            "2,500–4,800",
            "Work, interviews, church",
            "1–3 years with rotation",
          ],
          [
            { text: "Loafers", href: "/shoes/officials/loafers" },
            "2,600–3,300",
            "Smart casual, office Fridays",
            "1–2 years",
          ],
          [
            { text: "Monk straps", href: "/shoes/officials/monk-straps" },
            "3,300–4,800",
            "Interviews, evenings, suits",
            "1–3 years",
          ],
          [
            { text: "Official boots", href: "/shoes/officials/official-boots" },
            "4,000–5,000",
            "Cooler months, tailored looks",
            "2+ years with care",
          ],
          [
            { text: "Casual shoes", href: "/shoes/casuals" },
            "2,800–4,500",
            "Weekends, travel, smart casual",
            "1–2 years",
          ],
          [
            { text: "Sandals & slides", href: "/shoes/sandals-slides" },
            "2,400–4,000",
            "Heat, home, short errands",
            "1–2 seasons",
          ],
        ],
      },
      {
        type: "h2",
        text: "What moves the price of men's shoes?",
      },
      {
        type: "ul",
        items: [
          "Materials: leather and denser uppers cost more than thin synthetics, and usually last longer.",
          "Sole construction: a stable sole and clean stitching hold shape through Nairobi walking.",
          "Finish: patent, woven or detailed monks sit higher than basic court styles.",
          "Brand and model demand: named sneakers (for example New Balance, Nike, Adidas lines we stock) price by model.",
        ],
      },
      {
        type: "h2",
        text: "Examples from our shelves (linked)",
      },
      {
        type: "ul",
        items: [
          "Entry sneaker from KES 1,400 — see Sale under 2,000 and Sneakers.",
          "Patent leather loafer from about KES 2,600 — Officials → Loafers.",
          "Clarks-style official shoe from about KES 2,500 — Officials.",
          "New Balance sneakers from about KES 3,300 — Sneakers → New Balance.",
          "Buckle sandals from about KES 2,400 — Sandals.",
        ],
      },
      {
        type: "note",
        text: "Prices change with stock. Always check the product page for the live KES price before you order on WhatsApp.",
      },
    ],
    faqs: [
      {
        q: "What is the cheapest men's shoe price at TFZ?",
        a: "Entry sneakers start around KES 1,400. Sandals start around KES 2,400. Check Sale for the current under-2,000 and under-3,500 lists.",
      },
      {
        q: "How much are official shoes in Kenya at your shop?",
        a: "Official-style shoes typically run about KES 2,500–4,800 depending on style (loafer, derby/oxford, monk strap, boot).",
      },
      {
        q: "Are sneakers in Nairobi always expensive?",
        a: "No. We stock sneakers from about KES 1,400 up to roughly KES 4,300. Many solid daily pairs sit near KES 3,000–3,500.",
      },
      {
        q: "Do higher prices always mean better shoes?",
        a: "Not always. Pay for materials and construction that match how often you wear them. Cost per wear matters more than the sticker alone.",
      },
      {
        q: "Where can I compare all prices quickly?",
        a: "Open Sale and filter by under 2,000 / 3,500 / 5,000, or browse Shop.",
      },
    ],
  },
  {
    slug: "mens-sneakers-kenya-buying-guide",
    title:
      "Men's Sneakers in Kenya: How to Choose a Pair That Fits, Lasts and Looks Right",
    metaTitle: "Men's Sneakers Kenya Buying Guide | TFZ",
    searchPhrase: "men's sneakers Kenya",
    excerpt:
      "How to choose men's sneakers in Kenya by use, fit and colour — plus cost per wear and care tips for Nairobi dust.",
    updated: UPDATED,
    updatedIso: UPDATED_ISO,
    minutes: 9,
    author: AUTHOR,
    linksTo: [
      { label: "All sneakers", href: "/sneakers" },
      { label: "New Balance", href: "/sneakers/shop-by-model/new-balance" },
      { label: "Dunk Low", href: "/sneakers/shop-by-model/dunk-low" },
      { label: "Samba", href: "/sneakers/shop-by-model/samba" },
      { label: "Sale", href: "/sale?max=3500" },
      { label: "Size guide", href: "/size-guide" },
    ],
    blocks: [
      {
        type: "p",
        text: "Men's sneakers in Kenya should be chosen by how you wear them first (daily, casual or work), then by fit, then by colour. At Trendy Fashion Zone in Nairobi CBD, sneakers start from about KES 1,400, with many everyday pairs around KES 3,000–3,500 — so a fair price worn often beats a weaker pair that dies early.",
      },
      {
        type: "h2",
        text: "How should I choose men's sneakers in Kenya?",
      },
      {
        type: "ol",
        items: [
          "Decide the job: daily walking, weekend casual, or sneakers for work / smart-casual Fridays.",
          "Confirm EU size on the product page (we list 39–45 on footwear).",
          "Pick colour for your wardrobe: white/off-white for clean looks, black for forgiving dust, colourways for weekends.",
          "Check cost per wear: price ÷ expected wears. A KES 3,300 pair worn 200 times is about KES 16.50 per wear.",
        ],
      },
      {
        type: "h2",
        text: "What is cost per wear for sneakers?",
      },
      {
        type: "p",
        text: "Cost per wear is the only honest way to compare cheap men's sneakers in Nairobi with mid-range pairs. A KES 1,400 pair that lasts 40 wears costs KES 35 per wear. A KES 3,300 New Balance-style pair that lasts 200 wears costs about KES 16.50 per wear. Buy the pair that matches your week, not only the lowest tag.",
      },
      {
        type: "table",
        caption: "Sneaker use → what to prioritise",
        headers: ["How you wear them", "Prioritise", "Browse"],
        rows: [
          [
            "Daily / commuting",
            "Comfort, dark or mid colours, stable sole",
            { text: "All sneakers", href: "/sneakers" },
          ],
          [
            "Casual weekends",
            "Shape and colourway",
            { text: "Dunk Low", href: "/sneakers/shop-by-model/dunk-low" },
          ],
          [
            "Smart casual / some offices",
            "Clean silhouette, black or white",
            { text: "Samba / classic", href: "/sneakers/shop-by-model/samba" },
          ],
          [
            "Named models",
            "Fit notes + colour on one page",
            {
              text: "New Balance",
              href: "/sneakers/shop-by-model/new-balance",
            },
          ],
        ],
      },
      {
        type: "h2",
        text: "How do I keep white sneakers clean in Nairobi dust?",
      },
      {
        type: "ul",
        items: [
          "Wipe dust the same day with a dry cloth before it cakes into the mesh or leather.",
          "Use mild soap and a soft brush on rubber midsoles; avoid soaking the whole shoe.",
          "Rotate pairs so one pair dries fully between wears.",
          "For heavy dust days, black or olive colourways hide more than pure white.",
        ],
      },
      {
        type: "h2",
        text: "Outfit combinations that work",
      },
      {
        type: "ul",
        items: [
          "Weekend: sneakers + crew-neck tee (from about KES 1,400) — browse T-shirts and Sneakers.",
          "Friday smart casual: black sneakers + polo (from about KES 1,600) — Polos.",
          "Heat: sneakers or slides + Cuban collar shirt — Shirts.",
        ],
      },
    ],
    faqs: [
      {
        q: "What EU sizes do you stock for men's sneakers?",
        a: "Footwear is listed EU 39–45 on product pages. If you are between sizes, WhatsApp a photo of your old label.",
      },
      {
        q: "Do you stock New Balance in Nairobi?",
        a: "Yes — see Sneakers → New Balance, with colours on one product page each.",
      },
      {
        q: "Are white sneakers practical in Nairobi?",
        a: "Yes if you wipe dust daily and rotate pairs. Otherwise choose off-white, grey or black for lower maintenance.",
      },
      {
        q: "Can sneakers work for work?",
        a: "In many Nairobi smart-casual offices, a clean black or white low-top works on Fridays. Strict dress codes still need officials.",
      },
      {
        q: "Where do I see sneakers under KES 3,500?",
        a: "Open Sale with max 3,500, or filter Sneakers by budget on Sale.",
      },
    ],
  },
  {
    slug: "official-shoes-for-men-kenya",
    title:
      "Official Shoes for Men in Kenya: What to Wear to Work, Interviews and Weddings",
    metaTitle: "Official Shoes for Men Kenya | Work & Events",
    searchPhrase: "official shoes for men Kenya",
    excerpt:
      "Derby, oxford, loafer and monk strap explained for Kenya — what to wear to work, interviews and weddings, with colour rules.",
    updated: UPDATED,
    updatedIso: UPDATED_ISO,
    minutes: 9,
    author: AUTHOR,
    linksTo: [
      { label: "All officials", href: "/shoes/officials" },
      { label: "Monk straps", href: "/shoes/officials/monk-straps" },
      { label: "Loafers", href: "/shoes/officials/loafers" },
      { label: "Oxford & derby", href: "/shoes/officials/oxford-derby" },
      { label: "Official boots", href: "/shoes/officials/official-boots" },
      { label: "Long-sleeve shirts", href: "/clothing/tops/long-sleeve-shirts" },
    ],
    blocks: [
      {
        type: "p",
        text: "Official shoes for men in Kenya should match the occasion first: interviews and formal offices favour clean black derby, oxford or monk straps; many workplaces accept loafers; weddings lean black or polished brown. At Trendy Fashion Zone on Moi Avenue, official styles typically run about KES 2,500–5,000 depending on loafer, derby/oxford, monk strap or boot.",
      },
      {
        type: "h2",
        text: "What is the difference between derby, oxford, loafer and monk strap?",
      },
      {
        type: "ul",
        items: [
          "Derby: open lacing, slightly more forgiving on the foot — strong all-round office shoe.",
          "Oxford: closed lacing, cleaner and more formal — interviews, suits, solemn events.",
          "Loafer: no laces, faster on and off — smart casual and many Nairobi offices.",
          "Monk strap: buckle instead of laces — decided look for interviews, dinners and weddings.",
        ],
      },
      {
        type: "p",
        text: "Browse Oxford & derby, Loafers, Monk straps and Official boots on our Officials pages. Prices for loafers often start near KES 2,600; monks and many formal pairs sit higher toward KES 3,300–4,800.",
      },
      {
        type: "h2",
        text: "What colour shoes should I wear — black or brown?",
      },
      {
        type: "p",
        text: "Simple matching rule: belt and shoes should be the same colour family. Black shoes with a black belt for navy, charcoal and black trousers. Brown shoes with a brown belt for khaki, olive and many earth-tone looks. When unsure for interviews, black is the safest official shoes choice in Kenya.",
      },
      {
        type: "table",
        caption: "Occasion → best official shoe",
        headers: ["Occasion", "Best style", "Best colour"],
        rows: [
          ["Office (strict)", "Oxford or derby", "Black"],
          ["Office (smart casual)", "Loafer or derby", "Black or dark brown"],
          ["Interview", "Oxford, derby or monk strap", "Black"],
          ["Wedding (guest)", "Monk strap or oxford", "Black or polished brown"],
          ["Church / formal family", "Derby or oxford", "Black"],
          ["Cooler months / tailored", "Official boots", "Black or brown"],
        ],
      },
      {
        type: "h2",
        text: "Need help with size or colour?",
      },
      {
        type: "p",
        text: `Ask us on WhatsApp ${SITE.whatsapp}. Send the product link, your usual EU size, and a photo of an old shoe label if you have one. We will confirm stock for the colour you want before you pay.`,
      },
    ],
    faqs: [
      {
        q: "What official shoes should men wear to an interview in Kenya?",
        a: "Black oxford, derby or monk strap with a dark belt. Keep the rest of the outfit simple — dark trousers and a plain shirt.",
      },
      {
        q: "Are loafers formal enough for work?",
        a: "In many Nairobi offices yes, especially polished black loafers. Strict corporate dress codes may still prefer laced derby or oxford.",
      },
      {
        q: "Black vs brown shoes — which is more useful?",
        a: "Black covers interviews and most formal nights. Brown expands weekend and earth-tone outfits. If you buy one pair first, buy black.",
      },
      {
        q: "How much do official shoes cost at TFZ?",
        a: "Roughly KES 2,500–5,000 depending on style. Check the product page for the live price.",
      },
      {
        q: "Do you have Clarks and Empire?",
        a: "Yes — filter Officials by brand in the menu, or search Clarks / Empire on the site.",
      },
    ],
  },
  {
    slug: "mens-outfits-budget-nairobi",
    title:
      "How to Dress Well on a Budget in Nairobi: Men's Outfits Under KES 3,000, 5,000 and 10,000",
    metaTitle: "Men's Outfits Under 5000 Kenya | Nairobi",
    searchPhrase: "men's outfits under 5000 Kenya",
    excerpt:
      "Build men's outfits in Nairobi under KES 3,000, 5,000 and 10,000 using real TFZ prices — tees, polos, sneakers and officials.",
    updated: UPDATED,
    updatedIso: UPDATED_ISO,
    minutes: 10,
    author: AUTHOR,
    linksTo: [
      { label: "Sale under 2,000", href: "/sale?max=2000" },
      { label: "Sale under 5,000", href: "/sale?max=5000" },
      { label: "Shop", href: "/shop" },
      { label: "T-shirts", href: "/clothing/tops/t-shirts" },
      { label: "Polos", href: "/clothing/tops/polos" },
      { label: "Sneakers", href: "/sneakers" },
    ],
    blocks: [
      {
        type: "p",
        text: "Men's outfits under 5,000 Kenya shillings are realistic when you shop a CBD catalogue with clear prices. At Trendy Fashion Zone we built three tiers from live stock: under KES 3,000, under KES 5,000 and under KES 10,000 — mixing tops and footwear you can reorder by colour on one product page.",
      },
      {
        type: "h2",
        text: "How do you dress well on a budget in Nairobi?",
      },
      {
        type: "p",
        text: "Buy fewer pieces that mix. One neutral tee, one polo, one dark shoe and one casual shoe cover more weeks than five loud items. Check totals before you buy, and use Sale to stay inside your band.",
      },
      {
        type: "h2",
        text: "Outfit under KES 3,000",
      },
      {
        type: "p",
        text: "Weekend starter: Crew Neck T-Shirt (about KES 1,400) + entry Sneaker (about KES 1,400) = about KES 2,800. Add shorts later when budget allows (casual shorts about KES 2,000).",
      },
      {
        type: "ul",
        items: [
          "Crew Neck T-Shirt — /p/crew-neck-t-shirt/white — ~KES 1,400",
          "Sneaker — /p/sneaker-1400/pink (pick your colour on the page) — ~KES 1,400",
          "Total ≈ KES 2,800",
        ],
      },
      {
        type: "h2",
        text: "Outfit under KES 5,000",
      },
      {
        type: "p",
        text: "Smart-casual Friday: Polo Shirt (about KES 1,600–1,700) + Buckle Sandal or entry loafer path. Example: polo ~KES 1,700 + buckle sandal ~KES 2,400 = about KES 4,100. Or polo ~KES 1,600 + patent loafer ~KES 2,600 = about KES 4,200.",
      },
      {
        type: "ul",
        items: [
          "Polo — /clothing/tops/polos — from ~KES 1,600",
          "Buckle sandal — /shoes/sandals-slides — from ~KES 2,400",
          "Or loafer — /shoes/officials/loafers — from ~KES 2,600",
          "Total ≈ KES 4,000–4,200",
        ],
      },
      {
        type: "h2",
        text: "Outfit under KES 10,000",
      },
      {
        type: "p",
        text: "Interview / office core: Long-sleeve or Cuban shirt (about KES 1,600) + official shoe or monk strap (about KES 3,300–4,800). Example: shirt ~KES 1,600 + official shoe ~KES 4,700 = about KES 6,300. Or shirt ~KES 1,600 + monk strap ~KES 4,800 = about KES 6,400 — still under KES 10,000 with room for a belt or second top.",
      },
      {
        type: "ul",
        items: [
          "Long-sleeve shirts — /clothing/tops/long-sleeve-shirts — from ~KES 1,600",
          "Official shoes — /shoes/officials — from ~KES 2,500",
          "Monk straps — /shoes/officials/monk-straps — from ~KES 3,300",
          "Example total ≈ KES 6,300–6,400",
        ],
      },
      {
        type: "h2",
        text: "How do I mix a few items into many outfits?",
      },
      {
        type: "ol",
        items: [
          "Keep tops neutral (white, black, navy, sky).",
          "Keep one black shoe for formal days and one sneaker for weekends.",
          "Repeat the same trousers/shorts colour so every top works.",
          "Order extra colours of a tee or polo you already like — they share the same fit.",
        ],
      },
      {
        type: "note",
        text: "Totals use typical shelf prices at publish time. Confirm live prices on each product page before you order.",
      },
    ],
    faqs: [
      {
        q: "Can I really build a look under KES 3,000?",
        a: "Yes — for example a tee at about KES 1,400 plus an entry sneaker at about KES 1,400. Bottoms push the total up; add them in the next budget band.",
      },
      {
        q: "What is the best men's outfit under 5,000 in Kenya from TFZ?",
        a: "A polo plus sandals or loafers usually lands around KES 4,000–4,200. Check Sale under 5,000 for current combinations.",
      },
      {
        q: "How do I keep outfits affordable long term?",
        a: "Repeat colours, rotate two pairs of shoes, and buy quality mid-range footwear instead of replacing failed cheap pairs monthly.",
      },
      {
        q: "Do you deliver budget orders in Nairobi?",
        a: "Yes — free delivery in Nairobi. Order on WhatsApp with the product links.",
      },
      {
        q: "Where do I browse everything by price?",
        a: "Sale (under 2,000 / 3,500 / 5,000) or Shop.",
      },
    ],
  },
  {
    slug: "order-shoes-clothes-online-nairobi",
    title:
      "How to Order Shoes and Clothes Online in Nairobi: Sizing, Payment and Returns",
    metaTitle: "Buy Shoes Online Nairobi | WhatsApp Order",
    searchPhrase: "buy shoes online Nairobi",
    excerpt:
      "Order men's shoes and clothes online in Nairobi via WhatsApp: sizing tips, M-Pesa or pay on delivery, free Nairobi delivery and exchanges.",
    updated: UPDATED,
    updatedIso: UPDATED_ISO,
    minutes: 8,
    author: AUTHOR,
    linksTo: [
      { label: "How to order", href: "/how-to-order" },
      { label: "Size guide", href: "/size-guide" },
      { label: "Delivery", href: "/delivery" },
      { label: "Exchange", href: "/exchange" },
      { label: "Shop", href: "/shop" },
      { label: "Sale", href: "/sale" },
    ],
    blocks: [
      {
        type: "p",
        text: "To buy shoes online in Nairobi from Trendy Fashion Zone: pick the product and colour, confirm your size, message us on WhatsApp with the link, pay by M-Pesa or pay on delivery, then receive — free delivery in Nairobi. Same stock as the Moi Avenue shop.",
      },
      {
        type: "h2",
        text: "How do I order shoes and clothes online in Nairobi?",
      },
      {
        type: "ol",
        items: [
          "Choose the item on trendyfashionzone.co.ke and tap the colour you want (each colour has its own URL).",
          "Confirm size: shoes EU 39–45; shirts S–3XL; shorts/trousers per the size guide.",
          `WhatsApp ${SITE.whatsapp} with the product link, colour, size and your delivery area.`,
          "Pay by M-Pesa or pay on delivery (Nairobi) once stock is confirmed.",
          "Receive at your door — free delivery in Nairobi; ask for countrywide fees.",
        ],
      },
      {
        type: "h2",
        text: "How do I get the size right without visiting?",
      },
      {
        type: "p",
        text: "Use our size guide, then send a photo of the inner label of a shoe or shirt that already fits. For shoes, stand on paper, mark heel and longest toe, and measure in centimetres — compare to the EU chart on Size guide. If you are between sizes, say so on WhatsApp before we dispatch.",
      },
      {
        type: "table",
        caption: "Quick size reference",
        headers: ["Category", "What we list", "Tip"],
        rows: [
          ["Shoes & sneakers", "EU 39–45", "Photo your old label if unsure"],
          ["Shirts / polos / tees", "S–3XL", "Fit notes on the product page"],
          ["Shorts", "Listed on product", "Ask WhatsApp for waist help"],
        ],
      },
      {
        type: "h2",
        text: "What is your exchange and return policy?",
      },
      {
        type: "p",
        text: "Wrong size? Start an exchange in one WhatsApp message with the product link, colour and size you received. We keep the process plain so online ordering feels safe. Read Exchange for the current steps. Unworn items in sellable condition are the standard for a smooth swap.",
      },
      {
        type: "h2",
        text: "Why order from a real CBD shop online?",
      },
      {
        type: "p",
        text: `${SITE.name} is a Nairobi CBD shop on Moi Avenue selling men's footwear and clothing. Online orders use the same catalogue, the same KES prices, and the same WhatsApp number as walk-in customers — so you are not guessing stock from a faceless listing.`,
      },
    ],
    faqs: [
      {
        q: "Can I pay on delivery in Nairobi?",
        a: "Yes for many Nairobi orders. Confirm with us on WhatsApp when you send the product link.",
      },
      {
        q: "Do you accept M-Pesa?",
        a: "Yes. We share payment details after confirming colour, size and stock.",
      },
      {
        q: "Is delivery free?",
        a: "Free delivery in Nairobi. Outside Nairobi, ask for courier pricing before you confirm.",
      },
      {
        q: "What if I order the wrong size?",
        a: "Message Exchange / WhatsApp with the link and sizes. We guide a simple exchange.",
      },
      {
        q: "Can I still visit the shop after ordering online?",
        a: `Yes — ${SITE.address}, ${SITE.hours}. Many customers browse online then collect or try similar styles in store.`,
      },
    ],
  },
];
