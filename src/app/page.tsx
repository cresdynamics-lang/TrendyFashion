import Image from "next/image";
import Link from "next/link";
import { ColourSpotlight } from "@/components/ColourSpotlight";
import { ProductGrid } from "@/components/ProductCard";
import { JOURNAL_ARTICLES } from "@/lib/journal";
import { formatKes, getProduct, newInProducts, trendingProducts } from "@/lib/products";
import { homeMeta } from "@/lib/seo";
import {
  BRAND_CHIPS,
  HOME_CATEGORY_TILES,
  HOME_FAQS,
  LOOK_BUNDLE,
  OCCASIONS,
  PLACEHOLDER_REVIEWS,
  PRICE_SHELVES,
  PROMISES,
  SITE,
} from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

export const metadata = homeMeta();

export default function HomePage() {
  const newIn = newInProducts().slice(0, 8);
  const trending = trendingProducts();
  const lookItems = LOOK_BUNDLE.items
    .map((i) => {
      const p = getProduct(i.slug);
      if (!p) return null;
      const colour = p.colours.find((c) => c.slug === i.colour) ?? p.colours[0];
      return { product: p, colour };
    })
    .filter(Boolean) as { product: NonNullable<ReturnType<typeof getProduct>>; colour: { slug: string; label: string; image: string } }[];

  const lookWa = whatsappHref(
    [
      "Order the look",
      LOOK_BUNDLE.title,
      ...lookItems.map((i) => `${i.product.name} · ${i.colour.label}`),
      `Together ${formatKes(LOOK_BUNDLE.priceKes)}`,
    ].join("\n"),
  );

  return (
    <div>
      <section className="relative min-h-[78vh] overflow-hidden bg-navy text-white">
        <Image
          src="/catalog/shoes/casuals/patent-penny-loafer/black.jpg"
          alt=""
          fill
          priority
          className="hero-kenburns object-cover opacity-55"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-navy via-navy/80 to-transparent" />
        <div className="container relative flex min-h-[78vh] flex-col justify-end px-5 pb-14 pt-24 md:justify-center md:pb-20">
          <p className="eyebrow text-yellow fade-up">Trendy Fashion Zone</p>
          <h1 className="font-display mt-3 max-w-xl text-4xl font-bold leading-tight md:text-6xl">
            What a man wears should say who he is — before he speaks.
          </h1>
          <p className="mt-4 max-w-lg text-base text-white/85 md:text-lg">
            From Moi Avenue, we dress the day he has: the walk in, the work, the evening after. Shoes and clothing
            chosen to show him clearly — not to shout.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shoes" className="btn btn-yellow">
              Shop the store
            </Link>
            <Link href="/clothing" className="btn btn-outline border-white text-white hover:bg-white hover:text-navy">
              Shop clothing
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Browse</p>
          <h2 className="heading mt-2 text-3xl">Shop by category</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {HOME_CATEGORY_TILES.map((tile) => (
              <Link key={tile.href} href={tile.href} className="group relative aspect-[4/5] overflow-hidden bg-mist">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-transparent to-transparent" />
                <p className="font-display absolute bottom-4 left-4 text-lg font-bold text-white">{tile.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Just arrived</p>
              <h2 className="heading mt-2 text-3xl">New in</h2>
            </div>
            <Link href="/new-in" className="text-sm font-semibold text-navy">
              View all →
            </Link>
          </div>
          <ProductGrid products={newIn} />
        </div>
      </section>

      <ColourSpotlight slug="nike-sb-dunk-low" />

      <section className="section">
        <div className="container">
          <p className="eyebrow">How buyers think</p>
          <h2 className="heading mt-2 text-3xl">Shop by occasion</h2>
          <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
            {OCCASIONS.map((item) => (
              <Link key={item.title} href={item.href} className="group overflow-hidden bg-mist">
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="33vw"
                  />
                </div>
                <div className="p-2 sm:p-4">
                  <h3 className="font-display text-xs font-bold text-navy sm:text-lg">{item.title}</h3>
                  <p className="mt-0.5 text-[10px] leading-snug text-slate-600 sm:mt-1 sm:text-sm">{item.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="complete-the-look" className="section section-mist">
        <div className="container">
          <p className="eyebrow">Raise the basket</p>
          <h2 className="heading mt-2 text-3xl">Complete the look</h2>
          <p className="mt-2 text-slate-600">{LOOK_BUNDLE.title}</p>
          <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
            {lookItems.map((item) => (
              <Link
                key={item.product.slug}
                href={`/p/${item.product.slug}/${item.colour.slug}`}
                className="overflow-hidden bg-white"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={`/catalog/${item.colour.image}`}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                </div>
                <p className="p-2 font-display text-[11px] font-semibold leading-tight text-navy sm:p-3 sm:text-sm">
                  {item.product.name}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-6 rounded-sm bg-navy p-5 text-white sm:p-6">
            <p className="font-display text-base font-bold sm:text-lg">{LOOK_BUNDLE.body}</p>
            <a href={lookWa} target="_blank" rel="noreferrer" className="btn btn-yellow mt-4 w-full sm:w-auto">
              Order the look on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Budget first</p>
          <h2 className="heading mt-2 text-3xl">Shop by price</h2>
          <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
            {PRICE_SHELVES.map((shelf) => (
              <Link
                key={shelf.title}
                href={shelf.href}
                className="border-t-4 border-yellow bg-mist p-2.5 transition hover:-translate-y-0.5 sm:p-6"
              >
                <h3 className="font-display text-sm font-bold leading-tight text-navy sm:text-2xl">{shelf.title}</h3>
                <p className="mt-1 text-[10px] leading-snug text-slate-600 sm:mt-2 sm:text-base">{shelf.body}</p>
                <p className="mt-2 text-[10px] font-semibold text-navy sm:mt-4 sm:text-sm">Browse →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container">
          <p className="eyebrow">Moving fast</p>
          <h2 className="heading mt-2 text-3xl">Trending now</h2>
          <div className="mt-8">
            <ProductGrid products={trending} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Names people search</p>
          <h2 className="heading mt-2 text-3xl">Shop by brand</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {BRAND_CHIPS.map((b) => (
              <Link
                key={b.label}
                href={b.href}
                className="rounded-full border border-navy/20 px-4 py-2 font-display text-sm font-semibold text-navy hover:bg-navy hover:text-white"
              >
                {b.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container">
          <p className="eyebrow">Three steps</p>
          <h2 className="heading mt-2 text-3xl">How to order</h2>
          <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-6">
            {[
              { n: "1", t: "Pick colour and size", d: "Every colour on one page. Sold-out sizes stay visible." },
              { n: "2", t: "Order on WhatsApp or cart", d: "Yellow button sends the exact product, colour and size." },
              { n: "3", t: "Delivered", d: "Free in Nairobi. Pay on delivery or M-Pesa." },
            ].map((step) => (
              <div key={step.n} className="bg-white p-3 sm:p-6">
                <span className="font-display text-2xl font-bold text-yellow sm:text-4xl">{step.n}</span>
                <h3 className="font-display mt-2 text-xs font-bold leading-tight text-navy sm:mt-3 sm:text-xl">
                  {step.t}
                </h3>
                <p className="mt-1 text-[10px] leading-snug text-slate-600 sm:mt-2 sm:text-sm">{step.d}</p>
              </div>
            ))}
          </div>
          <Link href="/how-to-order" className="btn btn-navy mt-8">
            See how to order
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-6 md:grid-cols-4">
          {PROMISES.map((p) => (
            <div key={p.title} className="border-t-2 border-yellow pt-4">
              <h3 className="font-display text-base font-bold text-navy">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-mist">
        <div className="container grid gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow">Moi Avenue</p>
            <h2 className="heading mt-2 text-3xl">Visit the shop</h2>
            <p className="mt-3 text-slate-600">{SITE.address}</p>
            <p className="mt-2 text-sm text-slate-600">{SITE.hours}</p>
            <p className="mt-2 text-sm font-semibold text-navy">WhatsApp {SITE.whatsapp}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-yellow">
                Open in Google Maps
              </a>
              <Link href="/visit" className="btn btn-outline">
                Directions & hours
              </Link>
            </div>
          </div>
          <div className="relative min-h-[260px] overflow-hidden bg-navy">
            <Image
              src="/catalog/shoes/officials/monk-strap/black.jpeg"
              alt="Visit Trendy Fashion Zone"
              fill
              className="object-cover opacity-70"
              sizes="50vw"
            />
            <div className="absolute inset-0 flex items-end p-6">
              <p className="font-display text-xl font-bold text-white">Shoe store · Nairobi CBD</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Only genuine reviews</p>
          <h2 className="heading mt-2 text-3xl">Real customers</h2>
          <div className="mt-8 -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:gap-4">
            {PLACEHOLDER_REVIEWS.map((r) => (
              <blockquote
                key={r.name}
                className="w-[min(85%,320px)] shrink-0 snap-start border border-black/10 bg-white p-5 sm:w-[340px]"
              >
                <p className="text-yellow">{"★".repeat(r.stars)}</p>
                <p className="mt-3 text-slate-700">“{r.text}”</p>
                <footer className="mt-4 text-sm text-muted">
                  {r.name} · {r.product} · {r.date}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container">
          <div className="mb-8 flex items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Guides that sell a pair</p>
              <h2 className="heading mt-2 text-3xl">From the Journal</h2>
            </div>
            <Link href="/journal" className="shrink-0 text-sm font-semibold text-navy">
              All guides →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {JOURNAL_ARTICLES.slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                href={`/journal/${a.slug}`}
                className="bg-white p-2.5 transition hover:-translate-y-0.5 sm:p-5"
              >
                <p className="text-[9px] uppercase tracking-wider text-muted sm:text-xs">{a.minutes} min</p>
                <h3 className="font-display mt-1 text-[11px] font-bold leading-snug text-navy sm:mt-2 sm:text-lg">
                  {a.title}
                </h3>
                <p className="mt-1 line-clamp-3 text-[10px] leading-snug text-slate-600 sm:mt-2 sm:text-sm">
                  {a.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <p className="eyebrow">Before they ask</p>
          <h2 className="heading mt-2 text-3xl">Questions</h2>
          <div className="mt-6 space-y-3">
            {HOME_FAQS.map((f) => (
              <details key={f.q} className="border-b border-black/10 pb-3">
                <summary className="cursor-pointer font-display font-semibold text-navy">{f.q}</summary>
                <p className="mt-2 text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container max-w-2xl text-center">
          <p className="eyebrow">Drop list</p>
          <h2 className="heading mt-2 text-3xl">Join on WhatsApp</h2>
          <p className="mt-3 text-slate-600">
            New arrivals and restocks — a few messages a month. Phone number only. Opt out anytime.
          </p>
          <a
            href={whatsappHref("Hi, add me to the Trendy Fashion Zone drop list for new arrivals and restocks.")}
            target="_blank"
            rel="noreferrer"
            className="btn btn-yellow mt-6"
          >
            Join the list
          </a>
          <p className="mt-3 text-xs text-muted">
            By joining you agree to our <Link href="/privacy" className="underline">privacy</Link> note for order and list messages.
          </p>
        </div>
      </section>
    </div>
  );
}
