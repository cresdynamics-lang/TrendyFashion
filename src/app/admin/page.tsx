import { redirect } from "next/navigation";
import { isAdminSession } from "@/lib/admin-auth";

export default async function AdminIndex() {
  if (await isAdminSession()) redirect("/admin/products");
  redirect("/admin/login");
}
