"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconCart, IconHeart, IconMenu, IconSearch } from "@/components/Icons";
import { LiveSearch } from "@/components/LiveSearch";
import { useCart } from "@/lib/cart";
import { MEGA_MENUS, SITE } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

export function Header() {
  const { count } = useCart();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [compact, setCompact] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer, searchOpen]);

  const openDelayed = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(label), 120);
  };

  const closeDelayed = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-navy px-4 py-2 text-center text-xs text-white sm:text-sm">
        {SITE.deliveryPromise} ·{" "}
        <a
          className="font-semibold text-yellow underline-offset-2 hover:underline"
          href={whatsappHref(`Hi, I'd like to order from ${SITE.name}.`)}
          target="_blank"
          rel="noreferrer"
        >
          Order on WhatsApp {SITE.whatsapp}
        </a>
      </div>

      <div
        className={`border-b border-black/5 bg-white/95 backdrop-blur transition-all ${
          compact ? "py-2 shadow-sm" : "py-3"
        }`}
      >
        <div className="container flex items-center gap-2 sm:gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/catalog/brand/logo.jpg"
              alt={`${SITE.name} logo`}
              width={compact ? 40 : 48}
              height={compact ? 40 : 48}
              className="rounded-sm object-cover"
              priority
            />
            <span className="font-display text-sm font-bold leading-tight text-navy sm:text-base">
              TRENDY
              <br />
              FASHION ZONE
            </span>
          </Link>

          <nav className="ml-2 hidden flex-1 items-center justify-center gap-0.5 lg:flex">
            {MEGA_MENUS.map((menu) => (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => openDelayed(menu.label)}
                onMouseLeave={closeDelayed}
                onFocus={() => setOpenMenu(menu.label)}
              >
                <Link
                  href={menu.href}
                  className={`font-display px-3 py-2 text-sm font-semibold tracking-wide ${
                    openMenu === menu.label
                      ? "text-navy underline decoration-yellow decoration-2 underline-offset-8"
                      : "text-navy/90 hover:text-navy"
                  }`}
                >
                  {menu.label}
                </Link>
                {openMenu === menu.label && (
                  <div
                    className={`absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded-md border border-black/5 bg-white p-5 shadow-xl ${
                      menu.columns.length > 1
                        ? "w-[min(520px,90vw)]"
                        : "w-[min(280px,90vw)]"
                    }`}
                    onMouseEnter={() => openDelayed(menu.label)}
                    onMouseLeave={closeDelayed}
                  >
                    <div
                      className={`grid gap-6 ${
                        menu.columns.length > 1 ? "grid-cols-2" : "grid-cols-1"
                      }`}
                    >
                      {menu.columns.map((col) => (
                        <div key={col.title}>
                          <Link
                            href={col.href}
                            className="font-display text-xs font-bold uppercase tracking-wider text-navy hover:underline"
                          >
                            {col.title}
                          </Link>
                          <ul className="mt-3 space-y-2">
                            {col.links.map((link) => (
                              <li key={link.href + link.label}>
                                <Link
                                  href={link.href}
                                  className="block text-sm text-slate-600 hover:text-navy"
                                >
                                  {link.label}
                                  {link.badge ? (
                                    <span className="ml-1 rounded-sm bg-yellow px-1.5 py-0.5 text-[10px] font-bold text-navy">
                                      {link.badge}
                                    </span>
                                  ) : null}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/new-in"
              className="font-display px-3 py-2 text-sm font-semibold text-navy"
            >
              New In
            </Link>
            <Link
              href="/journal"
              className="font-display px-3 py-2 text-sm font-semibold text-navy"
            >
              Journal
            </Link>
            <Link
              href="/sale"
              className="font-display px-3 py-2 text-sm font-bold text-yellow"
            >
              Sale
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="Search"
              className="inline-flex h-11 w-11 items-center justify-center text-navy transition hover:bg-mist"
              onClick={() => setSearchOpen(true)}
            >
              <IconSearch />
            </button>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="hidden h-11 w-11 items-center justify-center text-navy transition hover:bg-mist sm:inline-flex"
            >
              <IconHeart />
            </Link>
            <Link
              href="/cart"
              aria-label={`Cart (${count})`}
              className="relative inline-flex h-11 w-11 items-center justify-center text-navy transition hover:bg-mist"
            >
              <IconCart className="h-6 w-6" />
              {count > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-yellow px-1 font-display text-[10px] font-bold text-navy">
                  {count}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center text-navy transition hover:bg-mist lg:hidden"
              aria-label="Open menu"
              onClick={() => setDrawer(true)}
            >
              <IconMenu />
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-deep-navy/40 p-4 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div className="container mt-16" onClick={(e) => e.stopPropagation()}>
            <LiveSearch onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-deep-navy/50"
            aria-label="Close menu"
            onClick={() => setDrawer(false)}
          />
          <aside className="absolute inset-y-0 right-0 flex w-[min(100%,360px)] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/5 px-4 py-4">
              <p className="font-display text-sm font-bold text-navy">
                TRENDY FASHION ZONE
              </p>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center text-2xl"
                onClick={() => setDrawer(false)}
              >
                ×
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-2">
              {MEGA_MENUS.map((menu) => {
                const isOpen = expanded === menu.label;
                return (
                  <div key={menu.label} className="border-b border-black/5">
                    <button
                      type="button"
                      className="flex min-h-12 w-full items-center justify-between px-3 text-left font-display text-base font-semibold text-navy"
                      onClick={() => setExpanded(isOpen ? null : menu.label)}
                    >
                      {menu.label}
                      <span>{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="space-y-3 px-3 pb-4">
                        <Link
                          href={menu.href}
                          className="block min-h-10 text-sm font-semibold text-navy underline"
                          onClick={() => setDrawer(false)}
                        >
                          Shop all {menu.label}
                        </Link>
                        {menu.columns.map((col) => (
                          <div key={col.title}>
                            <Link
                              href={col.href}
                              className="text-xs font-bold uppercase tracking-wider text-navy"
                              onClick={() => setDrawer(false)}
                            >
                              {col.title}
                            </Link>
                            <ul className="mt-2 space-y-2">
                              {col.links.map((link) => (
                                <li key={link.label}>
                                  <Link
                                    href={link.href}
                                    className="block min-h-10 text-sm text-slate-600"
                                    onClick={() => setDrawer(false)}
                                  >
                                    {link.label}
                                    {link.badge ? ` · ${link.badge}` : ""}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <Link
                href="/shop"
                className="flex min-h-12 items-center px-3 font-display text-base font-semibold"
                onClick={() => setDrawer(false)}
              >
                Shop (all)
              </Link>
              <Link
                href="/new-in"
                className="flex min-h-12 items-center px-3 font-display text-base font-semibold"
                onClick={() => setDrawer(false)}
              >
                New In
              </Link>
              <Link
                href="/sale"
                className="flex min-h-12 items-center px-3 font-display text-base font-bold text-yellow"
                onClick={() => setDrawer(false)}
              >
                Sale
              </Link>
              <Link
                href="/journal"
                className="flex min-h-12 items-center px-3 font-display text-base font-semibold"
                onClick={() => setDrawer(false)}
              >
                Journal
              </Link>
            </nav>
            <div className="space-y-2 border-t border-black/5 p-4 text-sm text-slate-600">
              <Link href="/delivery" onClick={() => setDrawer(false)}>
                Delivery
              </Link>
              {" · "}
              <Link href="/visit" onClick={() => setDrawer(false)}>
                Visit
              </Link>
              {" · "}
              <Link href="/contact" onClick={() => setDrawer(false)}>
                Contact
              </Link>
              <a
                className="btn btn-yellow mt-3 w-full"
                href={whatsappHref(`Hi, I'd like to chat with ${SITE.name}.`)}
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
