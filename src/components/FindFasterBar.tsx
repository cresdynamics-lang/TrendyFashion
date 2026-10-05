"use client";

import Link from "next/link";

/** Persistent cue: search + Sale + Shop for structured browsing. */
export function FindFasterBar({ tone = "mist" }: { tone?: "mist" | "navy" }) {
  const mist = tone === "mist";
  return (
    <div
      className={`rounded-sm px-4 py-3 text-sm sm:px-5 ${
        mist
          ? "border border-navy/10 bg-mist text-slate-700"
          : "bg-white/10 text-white"
      }`}
    >
      <p className={mist ? "font-semibold text-navy" : "font-semibold text-yellow"}>
        Looking for a brand or model?
      </p>
      <p className="mt-1 leading-relaxed">
        Use{" "}
        <button
          type="button"
          className={`font-bold underline underline-offset-2 ${
            mist ? "text-navy" : "text-white"
          }`}
          onClick={() =>
            document
              .querySelector<HTMLButtonElement>('button[aria-label="Search"]')
              ?.click()
          }
        >
          Search
        </button>{" "}
        on top, browse everything in{" "}
        <Link
          href="/shop"
          className={`font-bold underline underline-offset-2 ${
            mist ? "text-navy" : "text-white"
          }`}
        >
          Shop
        </Link>
        , or open{" "}
        <Link
          href="/sale"
          className={`font-bold underline underline-offset-2 ${
            mist ? "text-navy" : "text-yellow"
          }`}
        >
          Sale
        </Link>{" "}
        to view products by price in a clear list.
      </p>
    </div>
  );
}
