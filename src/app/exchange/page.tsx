import { TrustPage } from "@/components/TrustPage";
import { SITE } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

export const metadata = {
  title: "Exchange policy",
  description: "Wrong size? Start an exchange in one WhatsApp message.",
};

export default function ExchangePage() {
  return (
    <TrustPage
      title="Exchange"
      intro="Window, conditions, and how to start one in one message."
    >
      <p>
        If the size is off, send the product link, colour, size bought, and the
        size you need.
      </p>
      <p>
        Items should be unused and in original condition. We’ll confirm the
        exchange window on WhatsApp.
      </p>
      <a
        className="btn btn-yellow inline-flex"
        href={whatsappHref("Hi, I'd like to start a size exchange.")}
        target="_blank"
        rel="noreferrer"
      >
        Start exchange · {SITE.whatsapp}
      </a>
    </TrustPage>
  );
}
