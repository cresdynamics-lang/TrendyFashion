import { SITE } from "@/lib/site";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container max-w-2xl">
        <h1 className="heading text-4xl">About {SITE.name}</h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-700">
          A store that sells by showing, not by shouting. We stock shoes, sneakers and clothing you can
          see clearly — every colour on one page — then order on WhatsApp for delivery in Nairobi.
        </p>
        <p className="mt-4 text-slate-600">{SITE.address}</p>
      </div>
    </section>
  );
}
