import Link from "next/link";

export function TrustPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section">
      <div className="container max-w-3xl">
        <p className="text-xs uppercase tracking-[0.14em] text-muted">
          <Link href="/">Home</Link> › {title}
        </p>
        <h1 className="heading mt-3 text-4xl">{title}</h1>
        <p className="mt-4 text-lg text-slate-600">{intro}</p>
        <div className="prose-tfz mt-8 space-y-4 text-slate-700">{children}</div>
      </div>
    </section>
  );
}
