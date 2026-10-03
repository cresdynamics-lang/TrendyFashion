#!/usr/bin/env python3
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
    ],
    key=len,
    reverse=True,
)

MODEL_ALIASES = [
    (re.compile(r"nike\s*sb\s*dunk.*", re.I), "Nike SB Dunk Low"),
    (re.compile(r"nike\s*dunk\s*low.*", re.I), "Nike Dunk Low"),
    (re.compile(r"nike\s*dunk\b.*", re.I), "Nike Dunk Low"),
    (re.compile(r"adidas\s*samba.*", re.I), "Adidas Samba"),
    (re.compile(r"nike\s*air\s*force\s*1.*", re.I), "Nike Air Force 1"),
    (re.compile(r"nike\s*air\s*max\s*95.*", re.I), "Nike Air Max 95"),
    (re.compile(r"nike\s*air\s*max\s*270.*", re.I), "Nike Air Max 270"),
    (re.compile(r"nike\s*air\s*jordan\s*1.*", re.I), "Nike Air Jordan 1"),
    (re.compile(r"new\s*balance\s*9060.*", re.I), "New Balance 9060"),
    (re.compile(r"new\s*balance\s*550.*", re.I), "New Balance 550"),
    (re.compile(r"zip[- ]?neck\s*polo.*", re.I), "Zip-neck polo"),
]


def slugify(s: str) -> str:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s.lower()).strip("-")
    return s[:80] or "item"


def extract_colors(name: str, tags):
    found = []
    for t in tags or []:
        if isinstance(t, str) and t.lower().startswith("color:"):
            c = t.split(":", 1)[1].strip()
            if c and c.lower() not in [x.lower() for x in found]:
                found.append(c)
    low = name.lower()
    for c in COLORS:
        if re.search(rf"\b{re.escape(c)}\b", low):
            label = "Grey" if c in ("grey", "gray") else c.title()
            if label.lower() not in [x.lower() for x in found]:
                found.append(label)
    if not found:
        label = re.sub(
            r"nike|adidas|sb|dunk|low|air|force|max|samba|sneakers?|shoes?",
            " ",
            name,
            flags=re.I,
        )
        label = re.sub(r"\s+", " ", label).strip(" -")
        found = [label[:40] if label else "Default"]
    return found


def canonical_name(name: str) -> str:
    for rx, canon in MODEL_ALIASES:
        if rx.match(name.strip()):
            return canon
    n = name
    for c in COLORS:
        n = re.sub(rf"\b{c}\b", " ", n, flags=re.I)
    return re.sub(r"\s+", " ", n).strip(" -") or name


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
        elif "boot" in nm or sub == "boots":
            path.append("official-boots")
        elif "loafer" in nm or cat == "loafers":
            path.append("loafers")
        else:
            path.append("oxford-derby")
        return path
    if cat == "casual":
        path = ["shoes", "casuals"]
        if "boot" in nm:
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
        if "polo" in nm or sub == "polo-shirts":
            path += ["tops", "polos"]
        elif "hood" in nm or sub == "hoods":
            path += ["tops", "hoodies"]
        elif ("short" in nm and "shirt" not in nm) or sub == "shorts":
            path += ["bottoms", "casual-shorts"]
        elif any(x in nm for x in ("trouser", "khaki", "chino", "pant")):
            path += ["bottoms", "trousers"]
        elif "vest" in nm or sub == "vests":
            path += ["tops", "vests"]
        elif "long sleeve" in nm or "long-sleeve" in nm:
            path += ["tops", "long-sleeve-shirts"]
        elif "official" in nm or sub == "official-shirts":
            path += ["tops", "official-shirts"]
        elif "tee" in nm or "t-shirt" in nm:
            path += ["tops", "t-shirts"]
        else:
            path += ["tops", "shirts"]
        return path
    return ["shoes", cat or "other"]


def brand_from(name, sub):
    for b in [
        "Nike",
        "Adidas",
        "Jordan",
        "New Balance",
        "Timberland",
        "Clarks",
        "Lacoste",
        "Puma",
        "Vans",
        "On",
        "Empire",
        "John Foster",
        "Hugo",
        "Boss",
        "Loewe",
    ]:
        if b.lower() in name.lower() or b.lower() in (sub or "").lower():
            return b
    return None


def sizes_for(path):
    if path[0] == "clothing":
        if "trousers" in path or "shorts" in path:
            return ["30", "32", "34", "36"]
        return ["S", "M", "L", "XL", "XXL"]
    if path[0] == "sneakers":
        return ["40", "41", "42", "43", "44", "45"]
    return ["39", "40", "41", "42", "43", "44", "45", "46"]


groups = OrderedDict()
for p in raw:
    display = canonical_name(p["name"])
    key = ((p["category"] or "").lower(), display.lower())
    groups.setdefault(key, []).append((display, p))

products = []
for (cat, _dlow), pairs in groups.items():
    display = pairs[0][0]
    items = [p for _, p in pairs]
    slug = slugify(display)
    existing = {x["slug"] for x in products}
    base = slug
    n = 2
    while slug in existing:
        slug = f"{base}-{n}"
        n += 1
    path = map_category(cat, items[0].get("subcategory"), items[0]["name"])
    colours = []
    for it in items:
        cols = extract_colors(it["name"], it.get("tags"))
        label = cols[0]
        cslug = slugify(label) or "default"
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
                "label": label,
                "image": it["image"],
                "sourceId": it.get("id"),
                "sourceName": it["name"],
            }
        )
    price = float(items[0]["price"] or 0)
    tags0 = items[0].get("tags") or []
    products.append(
        {
            "slug": slug,
            "name": display,
            "category": path,
            "brand": brand_from(items[0]["name"], items[0].get("subcategory")),
            "sizes": sizes_for(path),
            "priceKes": int(price) if price == int(price) else price,
            "badge": "Sale" if "Sale" in tags0 else ("New" if items[0].get("featured") else None),
            "colours": colours,
            "description": (items[0].get("description") or "")[:500],
        }
    )

print("grouped", len(products), "multi", sum(1 for p in products if len(p["colours"]) > 1))
for needle in ["Nike SB Dunk Low", "Nike Dunk Low", "Adidas Samba", "Nike Air Force 1"]:
    hits = [p for p in products if p["name"] == needle]
    print(needle, "colours", len(hits[0]["colours"]) if hits else 0)

out = {
    "shop": "Trendy Fashion Zone",
    "whatsapp": "0790314739",
    "whatsapp_e164": "+254790314739",
    "payment": "Pesapal",
    "source": "server-db-grouped-v2",
    "kept_images": sum(len(p["colours"]) for p in products),
    "products": products,
}
Path("/tmp/tfz-catalog-grouped.json").write_text(json.dumps(out, indent=2))
print("wrote /tmp/tfz-catalog-grouped.json")
