# Trendy Fashion Zone — Build Tracker

Source of truth: `Trendy_Fashion_Zone_Website_Blueprint.pdf` (Cres Dynamics, Oct 2026)  
Site goal: thought → product → WhatsApp order in as few taps as possible.

**Status key:** `⬜ Not started` · `🔄 In progress` · `✅ Done` · `⛔ Blocked (needs client)`

---

## 0. Decision rules (apply everywhere)

| Rule | How it is achieved |
| --- | --- |
| Shop-first menu | Menu = Shoes, Sneakers, Clothing, New In, Sale only. About / Contact / Blog live in footer + product/cart/checkout. |
| One product, every colour | One product record; colour = option with own photos/stock/sizes. One card, one PDP, N colour URLs. |
| Yellow is a signal | Max ~1–3 yellow elements per screen (primary CTA, active underline, Sale, sale badge). |
| Copy tone | Fit / comfort / durability / what it goes with. Never: quality, authentic, original, genuine, premium. No origin-of-manufacture claims. |
| Sizes always visible | Price + size line on cards without scrolling; sold-out sizes struck through, never hidden. |

---

## 1. Brand system (colouring + type + buttons)

**Status:** ⬜

### Colour tokens (site UI — not product colours)

| Token | Hex | Role | Ratio target |
| --- | --- | --- | --- |
| Navy | `#0A1F44` | Headers, nav, secondary buttons, footer links on light | ~70% |
| Deep navy | `#061330` | Footer bg, overlays | — |
| White | `#FFFFFF` | Page / card surfaces | ~25% |
| Mist | `#F4F6FA` | Section backgrounds | — |
| Signal yellow | `#F2B705` | Primary buy CTA, active underline, Sale word, price-drop badge | ~5% |
| WhatsApp green | brand green | Floating WA only (not site theme) | fixed |

### Type

| Use | Font |
| --- | --- |
| Headings, menus, buttons | Poppins |
| Body, product details, prices | Inter |

### Buttons (sizing + colour)

| Variant | Fill / stroke | Use |
| --- | --- | --- |
| Primary | Yellow fill, navy text | Order on WhatsApp |
| Secondary | Navy fill, white text | Add to cart |
| Outline | Navy outline | Browse / View options |
| Touch target (phone) | min **44×44px** | All nav + size chips |

### Logo

| Placement | Treatment |
| --- | --- |
| Header left | Colour logo / wordmark |
| Footer | Reversed white on deep navy |
| Favicon | Tab icon |

**Asset note:** `Logo.jpg` exists but is a promo ad (yellow/purple splash + product shot + `07920 64228`), not a clean wordmark. Need a cropped logo file or SVG. Phone on that file ≠ blueprint number — confirm before wiring.

**Done when:** CSS variables live; Poppins/Inter loaded; button components match the three variants; yellow count audited per template.

---

## 2. Category tree + URL map

**Status:** ⬜

### Menu → structure

```
SHOES
  Officials → Monk straps & buckles | Oxford & derby | Loafers & slip-ons | Official boots
  Casuals → Casual loafers | Lace-up | Chunky-sole | Casual boots
  Sandals & Slides → Buckle slides | Slides | Clogs & mules
  Sports & Football → Football boots | Running | Training | Trail

SNEAKERS
  By model → SB Dunk | Air Max 96 | Nike 2000 | Shox | AF1 | Jordan 1/4 | NB 9060 | NB 2000 | Samba
  By brand → Nike | Jordan | NB | Adidas | On | Puma | Asics | Reebok
  More → Vans & Converse | Running & Training

CLOTHING
  Tops → T-shirts | Polos | Official shirts | Hoodies & sweaters | Vests
  Bottoms → Trousers | Khakis | Linen shorts | Casual shorts
  Jerseys
  Unisex edit

NEW IN  (no dropdown — newest grid + type chips)
SALE    (no dropdown — yellow menu word — reduced + price-band chips)
```

### Brands = filters, not categories

Clarks, John Foster, Aldo, Empire, Timberland, Caterpillar → filter facets inside Officials/Casuals/etc.

### URL patterns

| Page | Pattern | Example |
| --- | --- | --- |
| Category | `/{cat}/{sub}` | `/shoes/officials` |
| Sub-type | `/{cat}/{sub}/{type}` | `/shoes/officials/monk-straps` |
| Product | `/p/{slug}` | `/p/nike-sb-dunk-low` |
| Colour | `/p/{slug}/{colour}` | `/p/nike-sb-dunk-low/sage-blue` |
| Share | `/s/{code}` | `/s/k7Qa2` (noindex, 14-day expiry) |

**Done when:** taxonomy seeded in CMS/admin; old ID URLs have redirect map; brands only appear as filters.

---

## 3. Desktop header + mega-menus

**Status:** ⬜

### Layout (top → bottom)

1. **Utility bar** — `Free delivery in Nairobi · Order on WhatsApp {number}`
2. **Sticky header** — Logo | Shoes▾ Sneakers▾ Clothing▾ New In | **Sale** (yellow) | Search | Wishlist | Cart (n)
3. On scroll: header shrinks slightly, stays pinned

### Mega-menu behaviour

- Opens on hover **or** keyboard focus after short delay (no flash)
- Active item: **yellow underline**
- Columns of sub-cats; column heading links to landing
- Brand column → filtered view (e.g. Officials + Clarks)
- Feature tile: one promo photo + “Shop now →”

### Per-menu content (must match blueprint)

| Menu | Columns | Feature tile example |
| --- | --- | --- |
| Shoes | Officials / Casuals / Sandals / Sports / Shop by brand | New double monk straps |
| Sneakers | By model / By brand / More | SB Dunk: 6 colours |
| Clothing | Tops / Bottoms / Also | Zip-neck polos |

**Search:** typeahead with photo + price (all colourways for a model).

**Done when:** hover/focus delay works; keyboard accessible; Sale is only yellow nav word; feature tiles use real stock photos.

---

## 4. Phone navigation

**Status:** ⬜

| State | Display |
| --- | --- |
| Closed | Utility strip + ☰ + logo + search + cart |
| Drawer | Search field; Shoes/Sneakers/Clothing accordions; New In; Sale; footer links; Chat on WhatsApp |
| Expanded | One section open at a time; nested Officials → types |
| Product | Sticky buy bar: price, sizes, Order on WhatsApp (yellow) + Add to cart — must not cover floating WA |

**Sizing:** tap targets ≥ 44px; drawer remembers last open section.

**Done when:** accordion exclusivity, sticky bar + floating WA coexist without overlap, phone QA pass.

---

## 5. Homepage (display map)

**Status:** ⬜

| # | Section | Colouring | Sizing / layout | Content / behaviour |
| --- | --- | --- | --- | --- |
| 1 | Utility + header | Navy / white / yellow Sale | Full width sticky | As nav |
| 2 | Hero | Mist or photo-led; yellow primary CTA, navy/outline secondary | Full-bleed product photos; weekly rotate, **no auto-slide** | One promise line + 2 buttons (e.g. Shop sneakers / Shop shoes). Example: “Dunks, Sambas and a 9060 or two.” |
| 3 | Shop by category | Photo tiles | **4 large tiles** desktop; stack 2×2 phone | Officials · Sneakers · Sandals & Slides · Clothing |
| 4 | New in | White cards on mist | Grid; grouped cards with colour dots + “N colours” / New badges | Real products, newest first |
| 5 | Shop by occasion | Photo tiles | 3 tiles | Office & interviews · Weekend · Smart casual (each bundles shoes + clothes) |
| 6 | Trending now | Same card system | Mixed categories | Best movers |
| 7 | Promise strip | Mist / white; facts only | 4 columns → 2×2 phone | Free Nairobi delivery · M-Pesa/POD · Exchange · WhatsApp |
| 8 | Footer | Deep navy, white type, reversed logo | 3 link columns + visit | Shop / Help / Company + phone + Moi Avenue |
| — | Social | Icons | Desktop: float left edge; Phone: in footer | IG / TikTok / FB |
| — | Floating WA | Green | Bottom-right every page | Prefill: page context |

**Done when:** section order matches; hero never autoplays; first viewport is catalogue-led (not slogan banner).

---

## 6. Grouped product card (colour + size display)

**Status:** ⬜

### On every card

| Element | Rule |
| --- | --- |
| Photo | Default = first colour; hover/tap colour dot swaps photo |
| Badges | `N colours` · `New` · `Few left` · `Sale` |
| Name | Plain product words |
| Price | Current; if sale, old price struck beside it |
| Colour dots | Max **5** visible, then `+N` |
| Size line | e.g. `S M L XL` or `40–45` — one line |
| Desktop hover | Quick-view bar |
| Phone | **2 cards per row**; dots always visible (no hover dependence) |

### Colour management (admin)

One product row → colour rows each with photos, stock, sizes. Adding a colour ≠ new product.

### Not on card

Star ratings, vague taglines, duplicate cards per colour.

**Done when:** one tee with 3 colours = one card; desktop hover + phone tap both swap image; sizes visible without opening PDP.

---

## 7. Product page (colour URL + size UX)

**Status:** ⬜

### Layout

| Zone | Behaviour |
| --- | --- |
| Left gallery | Photos for **selected colour**; colour change swaps gallery + URL |
| Breadcrumb | Home › Category › Sub › Product |
| Title + price + stock | Always above the fold |
| Colour dots | Change address to `/p/slug/colour` (shareable + crawlable) |
| Sizes | One row; sold-out **struck through**, still visible |
| CTAs | Yellow = Order on WhatsApp · Navy = Add to cart |
| Share | “Send options to a client” → Copy link → `/s/...` |
| Contact block | `079x…` + Moi Avenue where doubt appears |
| Promise ticks | Free Nairobi delivery · Exchange · Pay on delivery / M-Pesa |
| Details | Fabric, fit, care, pairs-with — plain language |

### Sticky phone buy bar

Price + size chips + both CTAs; floating WA stays clear of it.

**Done when:** colour switch updates URL without full reload flash; sibling colour links work; sold-out sizes remain visible.

---

## 8. Category landing page template

**Status:** ⬜

Same template for Shoes / Sneakers / Clothing (tiles change by domain: type vs model vs tops/bottoms).

| Order | Block | Notes |
| --- | --- | --- |
| 1 | Navy banner | Breadcrumb + name + 2-line promise + 1 photo |
| 2 | Sub-category tiles | e.g. Monk straps / Double monks / Chelsea / Ankle — avoid scrolling 100+ items |
| 3 | Filters | Desktop left rail; phone slide-up: Size, Colour, Brand, Price |
| 4 | Grid | Grouped cards, newest first, count + sort |
| 5 | Buying guide + 3–4 FAQs | **Below** grid so SEO text never pushes products down |

**Done when:** Officials, Sneakers, Clothing landings all reuse one template; filters update URL query without losing crawlable base path.

---

## 9. Share-with-client link

**Status:** ⬜

| Step | Display |
| --- | --- |
| Staff | On PDP: Copy link |
| Client opens `/s/code` | Product, all colours, in-stock sizes only |
| Client sends | Prefills WhatsApp order: name · colour · size · qty · price · product URL |

Rules: short, private, **expire 14 days**; works for one product or a small set (“my three picks”).

**Done when:** expired links show clear message; only in-stock sizes selectable; return message matches blueprint format.

---

## 10. SEO / crawlable colour pages

**Status:** ⬜

Per colour page: own title (`{Product}, {colour} | Trendy Fashion Zone`), photos + alt, price, sizes, availability, Product structured data (KES), sibling colour links, breadcrumbs, sitemap entry, SSR (Google reads without JS).

Local signals: Nairobi, Moi Avenue, free delivery in footer + category copy.

Also: Search Console, Google Business Profile photos, Merchant Center free product feed, redirects from old random-ID URLs, responsive image sizes.

**Done when:** `/p/slug` and `/p/slug/colour` both indexable; `/s/` noindex; sitemap auto-updates.

---

## 11. Cart, checkout, contact placements

**Status:** ⬜

| Surface | Contact behaviour |
| --- | --- |
| `/cart` | Line items (colour · size · qty); subtotal; “Need help?” + phone/WA |
| `/checkout` | Name, phone (M-Pesa), area/landmark; M-Pesa or Pay on delivery (Nairobi); “Prefer to talk?” |
| Footer | Full shop/help/company + visit/call |
| Floating WA | Every page; prefill names current page/product |
| About / Contact pages | Exist, footer only — not in main menu |

**Done when:** contact never appears in main nav; appears on product, cart, checkout, footer, WA button.

---

## 12. Page copy (wire then fact-check)

**Status:** ⬜ / ⛔ pending stock fact-check

| Area | Meta / H1 intent | Status |
| --- | --- | --- |
| Officials | Official Shoes for Men Nairobi \| Monk Straps, Oxfords, Loafers | ⬜ draft in blueprint |
| Official boots | Chelsea & Official Boots… | ⬜ |
| Casuals | Men’s Casual Shoes Nairobi… | ⬜ |
| Sandals & Slides | Men’s Slides & Sandals Nairobi… | ⬜ |
| Sneakers | Sneakers Nairobi \| Dunk, Air Max, NB 9060, Samba | ⬜ — no authentic/original claims |
| Sports & Football | Football Boots, Running & Training… | ⬜ |
| T-shirts / Polos / Trousers / Linen / Shirts / Unisex | Fit, fabric, pairs-with | ⬜ + size charts required |

**Done when:** shop confirms materials, models (Nike 2000 vs Air Max 96?), sizes, exchange terms; banned adjectives audited out.

---

## 13. Asset inventory → category mapping

**Status:** 🔄 catalogued (needs rename + colour/size tagging)

| Bucket | Files (approx) | Blueprint home | Suggested use |
| --- | --- | --- | --- |
| `Logo.jpg` | 1 | Brand | Extract wordmark OR replace; phone on art is `07920 64228` |
| WhatsApp clothing set | 33 | Clothing / New In / Hero | Raglan tees (brown, sand/grey colourways), trousers (charcoal melange size 32 tagged), polos, etc. — **group by product + colour** |
| `ClarksOfficials*` | 3 | Shoes › Officials + brand filter Clarks | Black polished loafers / officials |
| `CasualsOfficial*` | 8 | Shoes › Casuals / Officials loafers | e.g. terracotta suede loafer-sneaker hybrids |
| `LacosteCassual*` | 5 | Shoes › Casuals + brand filter | Casual lace-ups / loafers |
| `Timberland*` / `Timba*` / `TimberCas*` | ~90 | Casuals / boots + Timberland filter | Primary volume for casual boots & shoes |
| `Timberlandshoes*` | 5 | Officials / casual boots | Dress-casual Timberland pairs |
| Monk / red-sole WhatsApp shots | in WA set | Officials › Monk straps | Black monk with red lining/sole — “one detail only you know” copy |

### Colour + size data model (target)

```
Product
  id, slug, name, categoryPath[], brand?, tags[unisex?]
  colours[]:
    slug, label, hexSwatch, images[],
    sizes[]: { code, stock }
  priceKes, compareAtKes?, badges[]
```

**Clothing sizes:** S M L XL XXL (+ size guide)  
**Shoe sizes:** typically 39–46 officials; 40–45 sneakers (confirm per SKU)  
**Example from photos:** trousers hangtag SIZE 32; monk lining mark size 41.

**Done when:** every live SKU has named colour slug, swatch, ≥1 image, size×stock matrix; files renamed off “WhatsApp Image…” into `/public/products/{slug}/{colour}/01.webp`.

---

## 14. Client blockers

| Item | Blueprint note | Current project state |
| --- | --- | --- |
| Clean logo file | None attached in PDF | `catalog/brand/logo.jpg` (promo mark) — prefer SVG later |
| WhatsApp number | Confirm | **Confirmed: `0790314739`** (`+254790314739`) |
| Product sheet | Model names, colours, sizes, stock | **`catalog/products.json`** — 29 products named from photos; stock TBD |
| Payment | Promise strip + checkout | **Pesapal** — client sending docs; wire when received |
| Photos per colour | Required for cards | Culled **145 → 55** keepers under `catalog/` by category |
| Brand-name claims | No “authentic/original” unless proof | Enforce in copy review |

---

## 15. Four-week execution (success checklist)

### Week 1 — Foundations
- [ ] Brand tokens + fonts + button components
- [ ] Category tree in data layer
- [ ] Clean product/colour/size schema
- [ ] URL scheme + placeholder redirects
- [ ] Asset rename + first colour groupings from image library

### Week 2 — Templates
- [ ] Desktop header + 3 mega-menus + search shell
- [ ] Phone drawer + floating WA
- [ ] Homepage all 8 sections
- [ ] Grouped product card
- [ ] Category landing template
- [ ] Product page with colour↔URL

### Week 3 — Commerce + search
- [ ] Cart + checkout (M-Pesa / POD)
- [ ] Share link `/s/`
- [ ] Structured data + sitemap
- [ ] Merchant Center feed draft
- [ ] Old URL redirects

### Week 4 — Content + launch
- [ ] Final copy + size charts
- [ ] Photo crop pass
- [ ] Mobile speed + phone matrix QA
- [ ] Search Console
- [ ] Launch

### Done when (blueprint definition of done)
1. Any shopper reaches a specific product in **two taps** from the menu.
2. One product with N colours = **one card, one page, N findable colour pages**.
3. Phone and desktop menus behave as drawn.
4. Every page loads quickly on mobile data.

---

## Tracking log

| Date | Section | Achievement note |
| --- | --- | --- |
| 2026-10-03 | Tracker created | Blueprint read (20pp); 145 local images inventoried; brand/UI colour vs product colour distinguished; phone/logo blockers logged |
| 2026-10-03 | Assets | WA set to 0790314739; Pesapal noted; culled to 55 catalog images; 29 products named + sized in `catalog/products.json` |
| 2026-10-03 | Part 2 | Header UX (hamburger right, search icon, cart basket); long homepage; deep PDP; trust pages; Journal; SEO/sitemap; wishlist |
| | | |
