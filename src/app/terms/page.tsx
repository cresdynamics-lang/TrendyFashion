import { TrustPage } from "@/components/TrustPage";

export const metadata = {
  title: "Terms",
  description: "Order, delivery and exchange terms for Trendy Fashion Zone.",
};

export default function TermsPage() {
  return (
    <TrustPage title="Terms" intro="Simple rules for ordering, delivery and exchange.">
      <p>Orders are confirmed on WhatsApp. Prices are in Kenyan shillings. Stock can change until confirmed.</p>
      <p>Delivery and exchange follow the policies on those pages. Brand names describe style; we do not claim brand-issued stock unless we can show proof.</p>
    </TrustPage>
  );
}
