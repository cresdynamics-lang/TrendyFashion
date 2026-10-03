import Link from "next/link";
import { SITE } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-deep-navy text-white">
      <div className="container px-5 py-14">
        <div className="max-w-md">
          <p className="font-display text-lg font-bold tracking-wide">
            TRENDY
            <br />
            FASHION ZONE
          </p>
          <p className="mt-3 text-sm text-white/70">{SITE.address}</p>
          <p className="mt-1 text-sm text-white/70">{SITE.hours}</p>
          <a
            className="mt-3 inline-block text-sm font-semibold text-yellow"
            href={whatsappHref(`Hi, I'd like to visit ${SITE.name}.`)}
            target="_blank"
            rel="noreferrer"
          >
            {SITE.whatsapp} · WhatsApp
          </a>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-wider sm:text-sm">Shop</p>
            <ul className="mt-3 space-y-2 text-xs text-white/75 sm:text-sm">
              <li>
                <Link href="/shoes">Shoes</Link>
              </li>
              <li>
                <Link href="/sneakers">Sneakers</Link>
              </li>
              <li>
                <Link href="/clothing">Clothing</Link>
              </li>
              <li>
                <Link href="/new-in">New In</Link>
              </li>
              <li>
                <Link href="/sale">Sale</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-wider sm:text-sm">Help</p>
            <ul className="mt-3 space-y-2 text-xs text-white/75 sm:text-sm">
              <li>
                <Link href="/delivery">Delivery</Link>
              </li>
              <li>
                <Link href="/exchange">Exchange</Link>
              </li>
              <li>
                <Link href="/size-guide">Size guide</Link>
              </li>
              <li>
                <Link href="/how-to-order">How to order</Link>
              </li>
              <li>
                <Link href="/visit">Visit the shop</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-wider sm:text-sm">Company</p>
            <ul className="mt-3 space-y-2 text-xs text-white/75 sm:text-sm">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/journal">Journal</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/75 sm:text-sm">
              <span>Instagram</span>
              <span>TikTok</span>
              <span>Facebook</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {SITE.name} · {SITE.domain}
      </div>
    </footer>
  );
}
