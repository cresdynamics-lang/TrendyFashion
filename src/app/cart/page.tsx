"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatKes } from "@/lib/products";
import { SITE } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem } = useCart();

  const orderText = [
    "Cart order request",
    ...items.map(
      (i) =>
        `${i.name} · ${i.colourLabel} · ${i.size} · Qty ${i.qty} · ${formatKes(i.priceKes * i.qty)}`,
    ),
    `Subtotal ${formatKes(subtotal)}`,
    SITE.address,
  ].join("\n");

  return (
    <section className="section">
      <div className="container grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h1 className="heading text-3xl">Your cart ({items.reduce((n, i) => n + i.qty, 0)})</h1>
          {!items.length && (
            <div className="mt-8 rounded-sm bg-mist p-8">
              <p className="text-slate-600">Your cart is empty.</p>
              <Link href="/new-in" className="btn btn-navy mt-4">
                Browse New In
              </Link>
            </div>
          )}
          <ul className="mt-8 space-y-4">
            {items.map((item) => (
              <li key={item.key} className="flex gap-4 border-b border-black/10 pb-4">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-mist">
                  <Image src={item.image} alt="" fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex-1">
                  <p className="font-display font-semibold text-navy">{item.name}</p>
                  <p className="text-sm text-slate-600">
                    {item.colourLabel} · {item.size}
                  </p>
                  <p className="mt-1 text-sm font-semibold">{formatKes(item.priceKes)}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      className="btn btn-outline min-h-10 px-3"
                      onClick={() => updateQty(item.key, item.qty - 1)}
                    >
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button
                      type="button"
                      className="btn btn-outline min-h-10 px-3"
                      onClick={() => updateQty(item.key, item.qty + 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="ml-auto text-sm text-muted underline"
                      onClick={() => removeItem(item.key)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit rounded-sm border border-black/10 bg-mist p-6">
          <p className="font-display text-lg font-bold text-navy">Order summary</p>
          <div className="mt-4 flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-semibold">{formatKes(subtotal)}</span>
          </div>
          <p className="mt-2 text-sm text-slate-600">Free delivery in Nairobi</p>
          <a
            href={items.length ? whatsappHref(orderText) : undefined}
            target="_blank"
            rel="noreferrer"
            className={`btn btn-yellow mt-6 w-full ${!items.length ? "pointer-events-none opacity-50" : ""}`}
          >
            Order on WhatsApp
          </a>
          <p className="mt-4 text-sm text-slate-600">
            Need help with your order?
            <br />
            Call or WhatsApp {SITE.whatsapp}
          </p>
          <p className="mt-4 text-xs text-muted">
            Online card/M-Pesa checkout via Pesapal comes next — for now, WhatsApp confirms the order.
          </p>
        </aside>
      </div>
    </section>
  );
}
