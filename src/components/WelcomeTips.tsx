"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

const SESSION_KEY = "tfz-welcome-tips-v3";

type Tip = {
  id: string;
  delayMs: number;
  text: string;
  action?: { label: string; href: string; external?: boolean; search?: boolean };
};

const TIPS: Tip[] = [
  {
    id: "search",
    delayMs: 3000,
    text: "Need New Balance, Nike or a size fast? Use Search on top.",
    action: { label: "Open search", href: "/search", search: true },
  },
  {
    id: "sale",
    delayMs: 8000,
    text: "See every product by price on Sale — structured and easy to browse.",
    action: { label: "Go to Sale", href: "/sale" },
  },
  {
    id: "shop",
    delayMs: 13000,
    text: "Or open Shop for Officials, Casuals and everything else in one place.",
    action: { label: "Open Shop", href: "/shop" },
  },
  {
    id: "whatsapp",
    delayMs: 18000,
    text: "Message Trendy Fashion Zone to help you choose.",
    action: {
      label: "WhatsApp us",
      href: whatsappHref(`Hi, I need help choosing a product on ${SITE.name}.`),
      external: true,
    },
  },
];

export function WelcomeTips() {
  const [active, setActive] = useState<Tip | null>(null);
  const [shown, setShown] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "done") return;
    } catch {
      /* ignore */
    }

    const timers = TIPS.map((tip) =>
      window.setTimeout(() => {
        setShown((prev) => {
          if (prev[tip.id]) return prev;
          return { ...prev, [tip.id]: true };
        });
        setActive(tip);
      }, tip.delayMs),
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  // Auto-dismiss each tip after a few seconds
  useEffect(() => {
    if (!active) return;
    const hide = window.setTimeout(() => setActive(null), 5500);
    return () => window.clearTimeout(hide);
  }, [active]);

  useEffect(() => {
    if (Object.keys(shown).length >= TIPS.length) {
      try {
        sessionStorage.setItem(SESSION_KEY, "done");
      } catch {
        /* ignore */
      }
    }
  }, [shown]);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center px-4 md:bottom-8"
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-auto flex max-w-md items-start gap-3 rounded-md border border-navy/10 bg-white px-4 py-3 shadow-xl">
        <p className="flex-1 text-sm font-medium text-navy">{active.text}</p>
        <div className="flex shrink-0 items-center gap-2">
          {active.action ? (
            active.action.external ? (
              <a
                href={active.action.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-navy underline"
              >
                {active.action.label}
              </a>
            ) : active.action.search ? (
              <button
                type="button"
                className="text-xs font-bold text-navy underline"
                onClick={() => {
                  document
                    .querySelector<HTMLButtonElement>(
                      'button[aria-label="Search"]',
                    )
                    ?.click();
                  setActive(null);
                }}
              >
                {active.action.label}
              </button>
            ) : (
              <Link
                href={active.action.href}
                className="text-xs font-bold text-navy underline"
                onClick={() => setActive(null)}
              >
                {active.action.label}
              </Link>
            )
          ) : null}
          <button
            type="button"
            aria-label="Dismiss"
            className="text-lg leading-none text-slate-400 hover:text-navy"
            onClick={() => setActive(null)}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
