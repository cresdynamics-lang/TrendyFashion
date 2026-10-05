import { NextResponse } from "next/server";
import {
  adminCookieHeader,
  checkPassword,
  signAdminToken,
} from "@/lib/admin-auth";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    password?: string;
    email?: string;
  };
  const emailOk =
    !process.env.ADMIN_EMAIL ||
    !body.email ||
    body.email === process.env.ADMIN_EMAIL;
  if (!emailOk || !checkPassword(body.password || "")) {
    return NextResponse.json({ error: "Invalid login" }, { status: 401 });
  }
  const token = signAdminToken();
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", adminCookieHeader(token));
  return res;
}
