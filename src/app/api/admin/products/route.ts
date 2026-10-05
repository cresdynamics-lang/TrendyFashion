import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/admin-auth";
import { readCatalogFile, writeCatalogFile } from "@/lib/catalog-io";
import type { Product } from "@/lib/product-utils";

export async function GET() {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const catalog = readCatalogFile();
  return NextResponse.json(catalog);
}

export async function PUT(req: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as { product?: Product };
  if (!body.product?.slug) {
    return NextResponse.json({ error: "Missing product" }, { status: 400 });
  }
  const catalog = readCatalogFile();
  const idx = catalog.products.findIndex((p) => p.slug === body.product!.slug);
  if (idx < 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  catalog.products[idx] = body.product;
  writeCatalogFile(catalog);
  revalidatePath("/", "layout");
  revalidatePath("/shoes");
  revalidatePath("/sneakers");
  revalidatePath("/clothing");
  revalidatePath("/new-in");
  revalidatePath("/sale");
  revalidatePath(`/p/${body.product.slug}`);
  return NextResponse.json({ ok: true, product: catalog.products[idx] });
}
