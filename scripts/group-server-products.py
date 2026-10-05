#!/usr/bin/env python3
"""Group server SKUs into shop products: same brand + style + price = one PDP with colour/types."""
import json
import re
import unicodedata
from collections import OrderedDict
from pathlib import Path

raw = json.loads(Path("/tmp/tfz-products.json").read_text())

COLORS = sorted(
    [
        "black",
        "white",
        "brown",
        "grey",
        "gray",
        "blue",
        "navy",
        "red",
        "green",
        "olive",
        "tan",
        "beige",
        "cream",
        "pink",
        "purple",
        "yellow",
        "mustard",
        "orange",
        "silver",
        "gold",
        "camel",
        "wheat",
        "burgundy",
        "teal",
        "charcoal",
        "sand",
        "khaki",
        "maroon",
        "ivory",
        "chocolate",
        "floral",
        "neon",
        "peach",
        "mint",
        "sky",
        "slate",
        "royal",
    ],
    key=len,
    reverse=True,
)

# Named sneaker models stay their own products (colourways), regardless of price scatter
MODEL_ALIASES = [
    (re.compile(r"nike\s*sb\s*dunk.*", re.I), "Nike SB Dunk Low"),
    (re.compile(r"nike\s*dunk\s*low.*", re.I), "Nike Dunk Low"),
    (re.compile(r"nike\s*dunk\b.*", re.I), "Nike Dunk Low"),
    (re.compile(r"adidas\s*samba.*", re.I), "Adidas Samba"),
    (re.compile(r"nike\s*air\s*force\s*1.*", re.I), "Nike Air Force 1"),
    (re.compile(r"nike\s*air\s*max\s*95.*", re.I), "Nike Air Max 95"),
    (re.compile(r"nike\s*air\s*max\s*270.*", re.I), "Nike Air Max 270"),
    (re.compile(r"nike\s*air\s*jordan\s*1.*", re.I), "Nike Air Jordan 1"),
    (re.compile(r"air\s*jordan\s*1.*", re.I), "Nike Air Jordan 1"),
    (re.compile(r"new\s*balance\s*9060.*", re.I), "New Balance 9060"),
    (re.compile(r"new\s*balance\s*550.*", re.I), "New Balance 550"),
    (re.compile(r"polo\s*ralph\s*lauren.*shorts.*", re.I), "Polo Ralph Lauren Shorts"),
    (re.compile(r"ralph\s*lauren.*shorts.*", re.I), "Polo Ralph Lauren Shorts"),
]


def slugify(s: str) -> str:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s.lower()).strip("-")
    return s[:80] or "item"


def brand_from(name, sub):
    sub = (sub or "").lower()
    if sub == "empire":
        return "Empire"
    if sub == "clarks":
        return "Clarks"
    if sub in ("john-fosters", "john-foster"):
        return "John Foster"
    if sub == "timberland":
        return "Timberland"
    if sub == "lacoste":
        return "Lacoste"
    brands = [
        "Polo Ralph Lauren",
        "Ralph Lauren",
        "New Balance",
        "John Foster",
        "Timberland",
        "Lacoste",
        "Clarks",
        "Adidas",
        "Jordan",
        "Empire",
        "Loewe",
        "Nike",
        "Puma",
        "Vans",
        "Hugo",
        "Boss",
        "Tommy Hilfiger",
        "Dr Martens",
        "Dr. Martens",
        "On",
    ]
    low = name.lower()
    for b in brands:
        if re.search(rf"(?<![a-z]){re.escape(b.lower())}(?![a-z])", low):
            return b.replace("Dr. Martens", "Dr Martens")
        if b.lower().replace(" ", "-").replace(".", "") == sub.replace(".", ""):
            return b
    return None


def is_bottoms_shorts(name: str, sub: str) -> bool:
    nm = name.lower()
    sub = (sub or "").lower()
    if sub == "shorts":
        return True
    if re.search(r"\bshorts\b", nm):
        return True
    return False


def map_category(cat, sub, name):
    cat = (cat or "").lower()
    sub = (sub or "").lower()
    nm = name.lower()
    if cat in ("sneakers", "vans") or "dunk" in nm or "samba" in nm or "air force" in nm:
        path = ["sneakers"]
        if "dunk" in nm:
            path += ["shop-by-model", "dunk-low"]
        elif "air force" in nm:
            path += ["shop-by-model", "air-force-1"]
        elif "air max" in nm:
            path += ["shop-by-model", "air-max"]
        elif "jordan" in nm:
            path += ["shop-by-model", "jordan"]
        elif "samba" in nm:
            path += ["shop-by-model", "samba"]
        elif "9060" in nm or "new balance" in nm:
            path += ["shop-by-model", "new-balance"]
        else:
            path += ["shop-by-brand", sub or "other"]
        return path
    if cat == "sports":
        return ["shoes", "sports-football", sub or "training"]
    if cat in ("officials", "loafers"):
        path = ["shoes", "officials"]
        if "monk" in nm:
            path.append("monk-straps")
        elif sub == "boots" or re.search(r"\bboots?\b", nm):
            path.append("official-boots")
        elif "loafer" in nm or "tassel" in nm or cat == "loafers":
            path.append("loafers")
        else:
            path.append("oxford-derby")
        return path
    if cat == "casual":
        path = ["shoes", "casuals"]
        if re.search(r"\bboots?\b", nm) or "chukka" in nm:
            path.append("casual-boots")
        elif "loafer" in nm:
            path.append("casual-loafers")
        else:
            path.append("lace-up-casuals")
        return path
    if cat == "sandals":
        path = ["shoes", "sandals-slides"]
        if "mule" in nm or sub == "mules":
            path.append("clogs-mules")
        else:
            path.append("buckle-slides")
        return path
    if cat == "clothing":
        path = ["clothing"]
        if is_bottoms_shorts(name, sub):
            path += ["bottoms", "casual-shorts"]
        elif any(x in nm for x in ("trouser", "khaki", "chino", "pant")):
            path += ["bottoms", "trousers"]
        elif sub == "hoods" or "hood" in nm:
            path += ["tops", "hoodies"]
        elif sub == "vests" or "vest" in nm:
            path += ["tops", "vests"]
        elif sub == "polo-shirts" or ("polo" in nm and not is_bottoms_shorts(name, sub)):
            path += ["tops", "polos"]
        elif sub == "official-shirts" or ("official" in nm and "shirt" in nm):
            path += ["tops", "official-shirts"]
        elif "long sleeve" in nm or "long-sleeve" in nm or "long-sleeved" in nm:
            path += ["tops", "long-sleeve-shirts"]
        elif "tee" in nm or "t-shirt" in nm or "tshirt" in nm:
            path += ["tops", "t-shirts"]
        else:
            path += ["tops", "shirts"]
        return path
    return ["shoes", cat or "other"]


def sizes_for(path):
    # Shoes / sneakers: EU 39–45
    if path[0] in ("shoes", "sneakers"):
        return ["39", "40", "41", "42", "43", "44", "45"]
    if path[0] == "clothing":
        # Trousers & shorts: waist 30–40
        if "trousers" in path or "shorts" in path or "bottoms" in path:
            return [str(n) for n in range(30, 41)]
        # Shirts / tops: S–3XL
        return ["S", "M", "L", "XL", "XXL", "3XL"]
    return ["39", "40", "41", "42", "43", "44", "45"]


def style_family(name: str, cat: str, sub: str) -> str:
    """Bucket that, with brand + price, defines one shop product."""
    nm = name.lower()
    cat = (cat or "").lower()
    sub = (sub or "").lower()

    for rx, canon in MODEL_ALIASES:
        if rx.match(name.strip()):
            return "model:" + slugify(canon)

    if is_bottoms_shorts(name, sub):
        return "shorts"
    if cat == "clothing":
        if "hood" in nm or sub == "hoods":
            return "hoodie"
        if "vest" in nm or sub == "vests":
            return "vest"
        if "polo" in nm or sub == "polo-shirts":
            return "polo"
        if "tee" in nm or "t-shirt" in nm:
            return "tee"
        if "long sleeve" in nm or "long-sleeve" in nm or "long-sleeved" in nm:
            return "shirt-long"
        if "cuban" in nm:
            return "shirt-cuban"
        if "shirt" in nm or sub in ("shirts", "official-shirts", "casual"):
            return "shirt"
        return "clothing-other"

    if "monk" in nm:
        return "monk-strap"
    if "loafer" in nm or "tassel" in nm or cat == "loafers":
        if "woven" in nm or "horsebit" in nm:
            return "loafer-woven"
        return "loafer"
    if re.search(r"\bboots?\b", nm) or sub == "boots" or "chelsea" in nm:
        if "chukka" in nm or "desert" in nm:
            return "boot-chukka"
        return "boot"
    if "chukka" in nm:
        return "boot-chukka"
    if "sandal" in nm or "birken" in nm or cat == "sandals":
        if "mule" in nm or sub == "mules":
            return "mule"
        return "sandal"
    # Dress lace-ups share one family so same brand + price = one PDP
    if "derby" in nm or "oxford" in nm or "brogue" in nm:
        return "dress-shoe"
    if cat == "sneakers" or "sneaker" in nm:
        return "sneaker-other"
    if cat == "casual":
        return "casual-shoe"
    if cat == "officials":
        return "dress-shoe"
    return "other"


def family_display_name(brand, family: str, sample_name: str) -> str:
    if family.startswith("model:"):
        for rx, canon in MODEL_ALIASES:
            if rx.match(sample_name.strip()):
                return canon
        return sample_name
    nice = {
        "loafer": "Patent Leather Loafer",
        "loafer-woven": "Woven Loafer",
        "monk-strap": "Monk Strap Shoe",
        "boot": "Official Boots",
        "boot-chukka": "Chukka Boot",
        "dress-shoe": "Official Shoe",
        "sandal": "Buckle Sandal",
        "mule": "Mule",
        "shorts": "Shorts",
        "polo": "Polo Shirt",
        "shirt-long": "Long-Sleeve Shirt",
        "shirt-cuban": "Cuban Collar Shirt",
        "shirt": "Shirt",
        "hoodie": "Hoodie",
        "vest": "Vest",
        "tee": "T-Shirt",
        "sneaker-other": "Sneaker",
        "casual-shoe": "Casual Shoe",
    }
    label = nice.get(family, family.replace("-", " ").title())
    # Brand-specific overrides
    if brand == "Empire" and family == "loafer":
        return "Empire Patent Leather Loafer"
    if brand == "Empire" and family == "monk-strap":
        return "Empire Monk Strap Shoe"
    if brand == "Empire" and family == "dress-shoe":
        return "Empire Official Shoe"
    if brand == "Clarks" and family == "boot":
        return "Clarks Official Boots"
    if brand == "Clarks" and family == "dress-shoe":
        return "Clarks Official Shoe"
    if brand == "Clarks" and family == "sandal":
        return "Clarks Buckle Sandal"
    if brand == "Timberland" and family == "boot":
        return "Timberland Leather Boot"
    if brand == "Timberland" and family == "boot-chukka":
        return "Timberland Chukka Boot"
    if brand == "Timberland" and family == "loafer-woven":
        return "Timberland Woven Loafer"
    if brand == "Timberland" and family == "loafer":
        return "Timberland Loafer"
    if brand == "Polo Ralph Lauren" and family == "shorts":
        return "Polo Ralph Lauren Shorts"
    if brand == "John Foster" and family == "dress-shoe":
        return "John Foster Official Shoe"
    if brand:
        return f"{brand} {label}"
    # Never ship a product literally named "Other"
    if family in ("other", "clothing-other", "sneaker-other", "casual-shoe"):
        # Fall back to a cleaned sample name
        n = sample_name
        for c in COLORS:
            n = re.sub(rf"\b{c}\b", " ", n, flags=re.I)
        n = re.sub(r"\s+", " ", n).strip(" -")
        return n or "Untitled"
    return label


def variant_label(name: str, tags) -> str:
    """Colour / type chip for one SKU inside a grouped product."""
    low = name.lower()
    parts = []

    # Type nuances first
    if "tassel" in low:
        parts.append("Tassel")
    if "patterned" in low:
        parts.append("Patterned")
    if "linen" in low and "short" in low:
        parts.append("Linen")
    if re.search(r"\bdouble\b", low) and "monk" in low:
        parts.append("Double")
    if "platform" in low:
        parts.append("Platform")
    if "horsebit" in low:
        parts.append("Horsebit")
    if "woven" in low:
        parts.append("Woven")
    if "casual" in low and re.search(r"\bshorts\b", low) and not any(
        re.search(rf"\b{c}\b", low) for c in COLORS
    ):
        parts.append("Casual")

    # Colours from name
    colours = []
    if re.search(r"\bburgundy\b", low):
        colours.append("Burgundy")
    if re.search(r"\boff[- ]?white\b", low):
        colours.append("Off-White")
    # two-tone "black and blue"
    m = re.search(r"\b(black|brown|blue|navy|white|tan|grey|gray)\s+and\s+(black|brown|blue|navy|white|tan|grey|gray)\b", low)
    if m:
        a, b = m.group(1).title(), m.group(2).title()
        if a in ("Grey", "Gray"):
            a = "Grey"
        if b in ("Grey", "Gray"):
            b = "Grey"
        colours.append(f"{a} & {b}")
    else:
        for c in COLORS:
            if re.search(rf"\b{re.escape(c)}\b", low):
                label = "Grey" if c in ("grey", "gray") else c.title()
                if label not in colours:
                    colours.append(label)
                break

    if not colours:
        for t in tags or []:
            if isinstance(t, str) and t.lower().startswith("color:"):
                colours.append(t.split(":", 1)[1].strip().title())
                break

    if colours:
        parts.append(colours[0])
    if not parts:
        # last resort: trim brand/style words
        label = re.sub(
            r"empire|clarks|timberland|polo|ralph|lauren|john|foster|official|"
            r"patent|leather|loafer|loafers|shoes?|boots?|monk|strap|shorts|casual",
            " ",
            name,
            flags=re.I,
        )
        label = re.sub(r"\s+", " ", label).strip(" -")
        parts.append(label[:40] if label else "Default")

    return " ".join(parts)


def pick_description(items) -> str:
    """One description for the group — longest useful text."""
    best = ""
    for it in items:
        d = (it.get("description") or "").strip()
        if len(d) > len(best):
            best = d
    # Soft trim for storefront
    if len(best) > 600:
        best = best[:597].rsplit(" ", 1)[0] + "…"
    return best


# --- group: brand + style family + price (+ db category) ---
groups = OrderedDict()
for p in raw:
    brand = brand_from(p["name"], p.get("subcategory"))
    fam = style_family(p["name"], p.get("category") or "", p.get("subcategory") or "")
    price = float(p.get("price") or 0)
    price_key = int(price) if price == int(price) else price
    cat = (p.get("category") or "").lower()
    # Never use DB subcategory as a "brand" (shirts vs casual was splitting the same tee)
    brand_key = brand or "unbranded"
    # Named models group by model only (colourways across slight price noise)
    if fam.startswith("model:"):
        key = ("model", fam)
    else:
        # Brand + style + price — ignore DB category so loafers/casual don't split the same shoe
        key = (brand_key, fam, price_key)
    groups.setdefault(key, []).append(p)

products = []
for key, items in groups.items():
    brand = brand_from(items[0]["name"], items[0].get("subcategory"))
    fam = style_family(items[0]["name"], items[0].get("category") or "", items[0].get("subcategory") or "")
    display = family_display_name(brand, fam, items[0]["name"])
    # Drop junk untitled / Other groups
    if display.strip().lower() in ("other", "untitled", "item", "default"):
        continue
    # Prefer a name that appears most often after colour strip for non-brand families
    path = map_category(items[0].get("category"), items[0].get("subcategory"), items[0]["name"])
    # If mixed paths in group, prefer majority path
    path_votes = {}
    for it in items:
        pt = tuple(map_category(it.get("category"), it.get("subcategory"), it["name"]))
        path_votes[pt] = path_votes.get(pt, 0) + 1
    path = list(max(path_votes.items(), key=lambda x: x[1])[0])

    sizes = sizes_for(path)
    colours = []
    label_counts = {}
    for it in items:
        label = variant_label(it["name"], it.get("tags"))
        label_counts[label.lower()] = label_counts.get(label.lower(), 0) + 1
        n = label_counts[label.lower()]
        display_label = label if n == 1 else f"{label} {n}"
        cslug = slugify(display_label) or "default"
        taken = {c["slug"] for c in colours}
        cs = cslug
        k = 2
        while cs in taken:
            sid = str(it.get("id", k))[:6]
            cs = f"{cslug}-{sid}"
            k += 1
        colours.append(
            {
                "slug": cs,
                "label": display_label,
                "image": it["image"],
                "sizes": list(sizes),
                "sourceId": it.get("id"),
                "sourceName": it["name"],
            }
        )

    slug = slugify(display)
    existing = {x["slug"] for x in products}
    base = slug
    n = 2
    while slug in existing:
        # disambiguate by price when needed
        price = float(items[0].get("price") or 0)
        slug = f"{base}-{int(price)}" if n == 2 else f"{base}-{n}"
        n += 1

    price = float(items[0]["price"] or 0)
    tags0 = items[0].get("tags") or []
    badge = "Sale" if "Sale" in tags0 else ("New" if items[0].get("featured") else None)
    products.append(
        {
            "slug": slug,
            "name": display,
            "category": path,
            "brand": brand,
            "sizes": sizes,
            "priceKes": int(price) if price == int(price) else price,
            "badge": badge,
            "description": pick_description(items),
            "colours": colours,
        }
    )

print("grouped", len(products), "multi", sum(1 for p in products if len(p["colours"]) > 1))
for needle in [
    "Empire Patent Leather Loafer",
    "Empire Monk Strap Shoe",
    "Clarks Official Boots",
    "Clarks Official Shoe",
    "Timberland Chukka Boot",
    "Timberland Leather Boot",
    "Polo Ralph Lauren Shorts",
    "Nike SB Dunk Low",
]:
    hits = [p for p in products if p["name"] == needle]
    if hits:
        h = hits[0]
        print(f"  {needle}: {len(h['colours'])} types @ {h['priceKes']} →", [c["label"] for c in h["colours"]])
    else:
        print(f"  {needle}: (not found)")

out = {
    "shop": "Trendy Fashion Zone",
    "whatsapp": "0790314739",
    "whatsapp_e164": "+254790314739",
    "payment": "Pesapal",
    "source": "server-db-grouped-v3-brand-style-price",
    "kept_images": sum(len(p["colours"]) for p in products),
    "products": products,
}
Path("/tmp/tfz-catalog-grouped.json").write_text(json.dumps(out, indent=2))
print("wrote /tmp/tfz-catalog-grouped.json")
