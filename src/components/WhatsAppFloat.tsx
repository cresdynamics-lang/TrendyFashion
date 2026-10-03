"use client";

import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import { pageLookingMessage, whatsappHref } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  const pathname = usePathname();
  const label = pathname === "/" ? "the homepage" : pathname.replace(/\//g, " ").trim();
  const href = whatsappHref(pageLookingMessage(label || "your shop"));

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-lg transition hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
        <path d="M20.5 3.5A11.8 11.8 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.85c0 2.09.55 4.12 1.6 5.92L0 24l6.4-1.68a11.8 11.8 0 0 0 5.65 1.44h.01c6.54 0 11.85-5.3 11.85-11.85 0-3.17-1.23-6.15-3.41-8.41ZM12.06 21.5h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.8 1 1.01-3.7-.23-.38a9.8 9.8 0 0 1-1.5-5.23c0-5.42 4.41-9.83 9.84-9.83 2.63 0 5.1 1.02 6.96 2.88a9.78 9.78 0 0 1 2.87 6.96c0 5.43-4.42 9.84-9.84 9.84Zm5.4-7.36c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      </svg>
      <span className="sr-only">WhatsApp {SITE.whatsapp}</span>
    </a>
  );
}
