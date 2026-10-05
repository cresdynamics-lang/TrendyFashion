import { readFileSync, statSync, writeFileSync } from "fs";
import path from "path";
import type { Product } from "@/lib/product-utils";

export type CatalogFile = {
  shop: string;
  whatsapp: string;
  whatsapp_e164: string;
  payment?: string;
  source?: string;
  kept_images?: number;
  products: Product[];
};

function catalogPaths() {
  const root = process.cwd();
  return {
    primary: path.join(root, "catalog", "products.json"),
    publicCopy: path.join(root, "public", "catalog", "products.json"),
  };
}

let cache: { mtimeMs: number; data: CatalogFile } | null = null;

export function readCatalogFile(): CatalogFile {
  const { primary } = catalogPaths();
  const mtimeMs = statSync(primary).mtimeMs;
  if (cache && cache.mtimeMs === mtimeMs) return cache.data;
  const data = JSON.parse(readFileSync(primary, "utf8")) as CatalogFile;
  cache = { mtimeMs, data };
  return data;
}

export function writeCatalogFile(data: CatalogFile) {
  const { primary, publicCopy } = catalogPaths();
  data.kept_images = data.products.reduce(
    (n, p) => n + (p.colours?.length ?? 0),
    0,
  );
  data.source = data.source || "admin-edited";
  const json = JSON.stringify(data, null, 2);
  writeFileSync(primary, json);
  writeFileSync(publicCopy, json);
  cache = { mtimeMs: statSync(primary).mtimeMs, data };
}
