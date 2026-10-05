import { redirect } from "next/navigation";
import { isAdminSession } from "@/lib/admin-auth";
import { readCatalogFile } from "@/lib/catalog-io";
import { AdminProductsClient } from "@/components/AdminProductsClient";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  if (!(await isAdminSession())) redirect("/admin/login");
  const catalog = readCatalogFile();
  return <AdminProductsClient initialProducts={catalog.products} />;
}
