"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: fd.get("email"),
        password: fd.get("password"),
      }),
    });
    setBusy(false);
    if (!res.ok) {
      setError("Wrong email or password.");
      return;
    }
    router.replace("/admin/products");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-12">
      <h1 className="font-display text-2xl font-bold">Admin login</h1>
      <p className="mt-2 text-sm text-slate-600">
        Edit grouped products, prices and descriptions.
      </p>
      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 rounded-md border border-black/10 bg-white p-6"
      >
        <label className="block text-sm font-semibold">
          Email
          <input
            name="email"
            type="email"
            autoComplete="username"
            className="mt-1 w-full rounded-sm border border-black/15 px-3 py-2.5"
            defaultValue=""
          />
        </label>
        <label className="block text-sm font-semibold">
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 w-full rounded-sm border border-black/15 px-3 py-2.5"
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="btn btn-navy w-full" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
