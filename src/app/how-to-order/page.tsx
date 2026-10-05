import Link from "next/link";
import { TrustPage } from "@/components/TrustPage";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "How to order",
  description:
    "Three steps: pick colour and size, order on WhatsApp, get delivery in Nairobi.",
};

export default function HowToOrderPage() {
  return (
    <TrustPage
      title="How to order"
      intro="Three steps - with WhatsApp as the fastest path today."
    >
      <ol className="list-decimal space-y-4 pl-5">
        <li>
          <strong>Pick colour and size</strong> on any product page. Colour
          changes the URL so you can share the exact shade.
        </li>
        <li>
          <strong>Order on WhatsApp</strong> (yellow button) or add to cart and
          send the cart summary. Include delivery area.
        </li>
        <li>
          <strong>Delivered.</strong> Free in Nairobi. Pay on delivery or
          M-Pesa. Online Pesapal checkout comes next.
        </li>
      </ol>
      <p>
        Prefer the shop? Visit {SITE.address}. See{" "}
        <Link href="/visit" className="underline">
          visit details
        </Link>
        .
      </p>
    </TrustPage>
  );
}
