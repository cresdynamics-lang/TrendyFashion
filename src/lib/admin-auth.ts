import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "tfz_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
  return (
    process.env.ADMIN_PASSWORD || process.env.CRON_SECRET || "tfz-dev-admin"
  );
}

export function signAdminToken() {
  const exp = String(Date.now() + MAX_AGE * 1000);
  const body = `ok.${exp}`;
  const sig = createHmac("sha256", secret()).update(body).digest("hex");
  return `${body}.${sig}`;
}

export function verifyAdminToken(token: string | undefined | null) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [ok, exp, sig] = parts;
  if (ok !== "ok") return false;
  const expN = Number(exp);
  if (!Number.isFinite(expN) || Date.now() > expN) return false;
  const body = `${ok}.${exp}`;
  const expect = createHmac("sha256", secret()).update(body).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expect));
  } catch {
    return false;
  }
}

export async function isAdminSession() {
  const jar = await cookies();
  return verifyAdminToken(jar.get(COOKIE)?.value);
}

export function adminCookieHeader(token: string) {
  return `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}`;
}

export function clearAdminCookieHeader() {
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export { COOKIE as ADMIN_COOKIE };
