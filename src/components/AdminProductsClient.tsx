"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { formatKes, imageSrc, type Product } from "@/lib/product-utils";

export function AdminProductsClient({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return products;
    return products.filter((p) =>
      `${p.name} ${p.brand ?? ""} ${p.slug} ${p.category.join(" ")}`
        .toLowerCase()
        .includes(needle),
    );
  }, [products, q]);

  async function save() {
    if (!selected) return;
    setBusy(true);
    setStatus("");
    const res = await fetch("/api/admin/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: selected }),
    });
    setBusy(false);
    if (!res.ok) {
      setStatus("Save failed.");
      return;
    }
    const data = (await res.json()) as { product: Product };
    setProducts((prev) =>
      prev.map((p) => (p.slug === data.product.slug ? data.product : p)),
    );
    setStatus("Saved. Live on the site now (search + product pages).");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Grouped products</h1>
          <p className="text-sm text-slate-600">
            {products.length} products · edit name, price, description, colour
            labels & sizes
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/" className="btn btn-outline">
            View site
          </Link>
          <button type="button" className="btn btn-navy" onClick={logout}>
            Log out
          </button>
        </div>
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter products…"
        className="mt-6 w-full max-w-md rounded-sm border border-black/15 bg-white px-3 py-2.5"
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <ul className="max-h-[75vh] space-y-2 overflow-y-auto rounded-md border border-black/10 bg-white p-2">
          {filtered.map((p) => (
            <li key={p.slug}>
              <button
                type="button"
                onClick={() => setSelected(structuredClone(p))}
                className={`flex w-full items-center gap-3 rounded-sm px-2 py-2 text-left hover:bg-mist ${
                  selected?.slug === p.slug ? "bg-mist ring-1 ring-navy" : ""
                }`}
              >
                <div className="relative h-12 w-10 shrink-0 overflow-hidden bg-mist">
                  {p.colours[0] && (
                    <Image
                      src={imageSrc(p.colours[0].image)}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-slate-600">
                    {formatKes(p.priceKes)} · {p.colours.length} colours ·{" "}
                    {p.category.slice(-1)[0]}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>

        <div className="rounded-md border border-black/10 bg-white p-5">
          {!selected && (
            <p className="text-sm text-muted">Select a product to edit.</p>
          )}
          {selected && (
            <div className="space-y-4">
              <label className="block text-sm font-semibold">
                Name
                <input
                  className="mt-1 w-full rounded-sm border border-black/15 px-3 py-2"
                  value={selected.name}
                  onChange={(e) =>
                    setSelected({ ...selected, name: e.target.value })
                  }
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-sm font-semibold">
                  Price (KES)
                  <input
                    type="number"
                    className="mt-1 w-full rounded-sm border border-black/15 px-3 py-2"
                    value={selected.priceKes}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        priceKes: Number(e.target.value) || 0,
                      })
                    }
                  />
                </label>
                <label className="block text-sm font-semibold">
                  Brand
                  <input
                    className="mt-1 w-full rounded-sm border border-black/15 px-3 py-2"
                    value={selected.brand ?? ""}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        brand: e.target.value || undefined,
                      })
                    }
                  />
                </label>
              </div>
              <label className="block text-sm font-semibold">
                Description (single text for all colours)
                <textarea
                  rows={5}
                  className="mt-1 w-full rounded-sm border border-black/15 px-3 py-2 text-sm"
                  value={selected.description ?? ""}
                  onChange={(e) =>
                    setSelected({ ...selected, description: e.target.value })
                  }
                />
              </label>
              <label className="block text-sm font-semibold">
                Default sizes (comma-separated)
                <input
                  className="mt-1 w-full rounded-sm border border-black/15 px-3 py-2"
                  value={selected.sizes.join(", ")}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      sizes: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </label>

              <div>
                <p className="text-sm font-semibold">
                  Colours / types ({selected.colours.length})
                </p>
                <div className="mt-2 max-h-64 space-y-3 overflow-y-auto">
                  {selected.colours.map((c, i) => (
                    <div
                      key={c.slug}
                      className="flex gap-3 rounded-sm border border-black/10 p-2"
                    >
                      <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-mist">
                        <Image
                          src={imageSrc(c.image)}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <input
                          className="w-full rounded-sm border border-black/15 px-2 py-1.5 text-sm"
                          value={c.label}
                          onChange={(e) => {
                            const colours = [...selected.colours];
                            colours[i] = { ...c, label: e.target.value };
                            setSelected({ ...selected, colours });
                          }}
                        />
                        <input
                          className="w-full rounded-sm border border-black/15 px-2 py-1.5 text-xs"
                          value={(c.sizes ?? selected.sizes).join(", ")}
                          onChange={(e) => {
                            const sizes = e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean);
                            const colours = [...selected.colours];
                            colours[i] = { ...c, sizes };
                            setSelected({ ...selected, colours });
                          }}
                          placeholder="Sizes for this colour"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="btn btn-yellow"
                  disabled={busy}
                  onClick={save}
                >
                  {busy ? "Saving…" : "Save product"}
                </button>
                <Link
                  href={`/p/${selected.slug}`}
                  className="text-sm font-semibold underline"
                  target="_blank"
                >
                  Open on site
                </Link>
              </div>
              {status && <p className="text-sm text-emerald-700">{status}</p>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
