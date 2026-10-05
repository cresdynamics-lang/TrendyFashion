import { TrustPage } from "@/components/TrustPage";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Delivery | Free in Nairobi",
  description: `Free delivery in Nairobi. Countrywide on request. Track by WhatsApp ${SITE.whatsapp}.`,
};

export default function DeliveryPage() {
  return (
    <TrustPage
      title="Delivery"
      intro="Nairobi and countrywide - times, fees, tracking by WhatsApp."
    >
      <p>
        <strong>Nairobi CBD and suburbs:</strong> free delivery. Most orders
        arrive in 1-2 days once confirmed on WhatsApp.
      </p>
      <p>
        <strong>Outside Nairobi:</strong> message us with your town. We’ll
        confirm the fee and timing before you pay.
      </p>
      <p>
        <strong>Tracking:</strong> updates come on WhatsApp - same number as the
        order chat ({SITE.whatsapp}).
      </p>
    </TrustPage>
  );
}
