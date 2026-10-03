import { TrustPage } from "@/components/TrustPage";
import { SITE } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

export const metadata = {
  title: "Visit the shop | Moi Avenue Nairobi",
  description: `Shoe store on ${SITE.address}. Hours, directions, WhatsApp ${SITE.whatsapp}.`,
};

export default function VisitPage() {
  return (
    <TrustPage title="Visit the shop" intro="Map, hours, landmarks — same details as our Google Business Profile.">
      <p>
        <strong>Address:</strong> {SITE.address}
      </p>
      <p>
        <strong>Hours:</strong> {SITE.hours}
      </p>
      <p>
        <strong>Phone / WhatsApp:</strong> {SITE.whatsapp}
      </p>
      <p>Landmark: Moi Avenue, Nairobi CBD — ask us for the nearest parking tip on WhatsApp before you come.</p>
      <div className="flex flex-wrap gap-3 pt-2">
        <a className="btn btn-yellow" href={SITE.mapsUrl} target="_blank" rel="noreferrer">
          Open in Google Maps
        </a>
        <a className="btn btn-outline" href={whatsappHref("Hi, I'm coming to the shop — any tip for finding you?")} target="_blank" rel="noreferrer">
          Message before you visit
        </a>
      </div>
    </TrustPage>
  );
}
