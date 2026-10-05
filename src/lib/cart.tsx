"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  key: string;
  slug: string;
  name: string;
  colourSlug: string;
  colourLabel: string;
  size: string;
  priceKes: number;
  image: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "key" | "qty"> & { qty?: number }) => void;
  updateQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "tfz-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.priceKes * i.qty, 0);

    return {
      items,
      count,
      subtotal,
      addItem: (item) => {
        const key = `${item.slug}:${item.colourSlug}:${item.size}`;
        setItems((prev) => {
          const existing = prev.find((p) => p.key === key);
          if (existing) {
            return prev.map((p) =>
              p.key === key ? { ...p, qty: p.qty + (item.qty ?? 1) } : p,
            );
          }
          return [...prev, { ...item, key, qty: item.qty ?? 1 }];
        });
      },
      updateQty: (key, qty) => {
        setItems((prev) =>
          qty <= 0
            ? prev.filter((p) => p.key !== key)
            : prev.map((p) => (p.key === key ? { ...p, qty } : p)),
        );
      },
      removeItem: (key) =>
        setItems((prev) => prev.filter((p) => p.key !== key)),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
