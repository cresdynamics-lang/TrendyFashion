import { TrustPage } from "@/components/TrustPage";

export const metadata = {
  title: "Privacy",
  description: "Plain-language privacy for orders and the WhatsApp drop list under the Kenya Data Protection Act.",
};

export default function PrivacyPage() {
  return (
    <TrustPage
      title="Privacy"
      intro="Plain language for orders and the WhatsApp list — aligned with the Kenya Data Protection Act."
    >
      <p>We collect your name, phone, delivery area and order details to fulfil purchases and answer WhatsApp chats.</p>
      <p>
        The drop list uses your phone number only. You can opt out anytime by messaging “STOP”. We do not sell your
        data.
      </p>
      <p>Questions: message us on WhatsApp and ask for the privacy contact.</p>
    </TrustPage>
  );
}
