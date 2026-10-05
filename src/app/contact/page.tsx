import { SITE } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container max-w-2xl">
        <h1 className="heading text-4xl">Contact</h1>
        <p className="mt-4 text-slate-600">
          Reach us when you need fit, stock or delivery answers - on the
          product, in the cart, or here.
        </p>
        <div className="mt-8 space-y-3 text-slate-700">
          <p>
            <strong className="text-navy">WhatsApp / Call:</strong>{" "}
            {SITE.whatsapp}
          </p>
          <p>
            <strong className="text-navy">Visit:</strong> {SITE.address}
          </p>
          <p>
            <strong className="text-navy">Delivery:</strong> Free in Nairobi
          </p>
        </div>
        <a
          className="btn btn-yellow mt-8"
          href={whatsappHref(`Hi, I'd like to talk to ${SITE.name}.`)}
          target="_blank"
          rel="noreferrer"
        >
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}
