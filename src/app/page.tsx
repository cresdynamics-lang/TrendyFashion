import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { imageSrc, newInProducts, slimForCards } from "@/lib/products";
import { homeMeta } from "@/lib/seo";
import { HOME_CATEGORY_TILES, HOME_FAQS, PROMISES, SITE } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

export const metadata = homeMeta();
export const revalidate = 60;

export default function HomePage() {
  const newIn = slimForCards(newInProducts().slice(0, 6));

  return (
    <div>
      <section className="relative min-h-[70vh] overflow-hidden bg-navy text-white md:min-h-[72vh]">
        <Image
          src="/catalog/shoes/casuals/patent-penny-loafer/black.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-55"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-navy via-navy/80 to-transparent" />
        <div className="container relative flex min-h-[70vh] flex-col justify-end px-5 pb-14 pt-24 md:min-h-[72vh] md:justify-center md:pb-20">
          <p className="eyebrow text-yellow">Trendy Fashion Zone</p>
          <h1 className="font-display mt-3 max-w-xl text-4xl font-bold leading-tight md:text-6xl">
            What a man wears should say who he is, before he speaks.
          </h1>
          <p className="mt-4 max-w-lg text-base text-white/85 md:text-lg">
            From Moi Avenue: shoes and clothing for the walk in, the work, and
            the evening after.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shoes/officials" className="btn btn-yellow">
              Shop officials
            </Link>
            <Link
              href="/clothing/tops/shirts"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-navy"
            >
              Men&apos;s shirts
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Browse</p>
          <h2 className="heading mt-2 text-3xl">Shop by category</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {HOME_CATEGORY_TILES.map((tile) => (
              <Link
                key={tile.href}
                href={tile.href}
                className="group relative aspect-[4/5] overflow-hidden bg-mist"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  loading="lazy"
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-transparent to-transparent" />
                <p className="font-display absolute bottom-4 left-4 text-lg font-bold text-white">
                  {tile.title}
                </p>
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
          <ProductGrid products={newIn} paginate={false} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Budget first</p>
          <h2 className="heading mt-2 text-3xl">Shop by price</h2>
          <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
            {[
              {
                title: "Under 2,000",
                href: "/sale?max=2000",
                body: "Tees, polos, shorts",
              },
              {
                title: "Under 3,500",
                href: "/sale?max=3500",
                body: "Sneakers, slides, casuals",
              },
              {
                title: "Under 5,000",
                href: "/sale?max=5000",
                body: "Officials and boots",
              },
            ].map((shelf) => (
              <Link
                key={shelf.title}
                href={shelf.href}
                className="border-t-4 border-yellow bg-mist p-2.5 transition hover:-translate-y-0.5 sm:p-6"
              >
                <h3 className="font-display text-sm font-bold leading-tight text-navy sm:text-2xl">
                  {shelf.title}
                </h3>
                <p className="mt-1 text-[10px] leading-snug text-slate-600 sm:mt-2 sm:text-base">
                  {shelf.body}
                </p>
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
              {
                n: "1",
                t: "Pick colour and size",
                d: "Every colour on one page.",
              },
              {
                n: "2",
                t: "Order on WhatsApp",
                d: "Send the exact product, colour and size.",
              },
              {
                n: "3",
                t: "Delivered",
                d: "Free in Nairobi. Pay on delivery or M-Pesa.",
              },
            ].map((step) => (
              <div key={step.n} className="bg-white p-3 sm:p-6">
                <span className="font-display text-2xl font-bold text-yellow sm:text-4xl">
                  {step.n}
                </span>
                <h3 className="font-display mt-2 text-xs font-bold leading-tight text-navy sm:mt-3 sm:text-xl">
                  {step.t}
                </h3>
                <p className="mt-1 text-[10px] leading-snug text-slate-600 sm:mt-2 sm:text-sm">
                  {step.d}
                </p>
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
              <h3 className="font-display text-base font-bold text-navy">
                {p.title}
              </h3>
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
            <p className="mt-2 text-sm font-semibold text-navy">
              WhatsApp {SITE.whatsapp}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-yellow"
              >
                Open in Google Maps
              </a>
              <Link href="/visit" className="btn btn-outline">
                Directions and hours
              </Link>
            </div>
          </div>
          <div className="relative min-h-[220px] overflow-hidden bg-navy">
            <Image
              src={imageSrc("/catalog/shoes/officials/monk-strap/black.jpeg")}
              alt="Visit Trendy Fashion Zone"
              fill
              loading="lazy"
              className="object-cover opacity-70"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 flex items-end p-6">
              <p className="font-display text-xl font-bold text-white">
                Shoe store · Nairobi CBD
              </p>
            </div>
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
                <summary className="cursor-pointer font-display font-semibold text-navy">
                  {f.q}
                </summary>
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
            New arrivals and restocks. A few messages a month. Phone number
            only. Opt out anytime.
          </p>
          <a
            href={whatsappHref(
              "Hi, add me to the Trendy Fashion Zone drop list for new arrivals and restocks.",
            )}
            target="_blank"
            rel="noreferrer"
            className="btn btn-yellow mt-6"
          >
            Join the list
          </a>
        </div>
      </section>
    </div>
  );
}
