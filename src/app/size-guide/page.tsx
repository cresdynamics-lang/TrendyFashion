import { TrustPage } from "@/components/TrustPage";

export const metadata = {
  title: "Size guide | Shoes, shirts, trousers",
  description: "EU shoe sizes, clothing charts, and how to measure. Ask on WhatsApp with a photo of your old label.",
};

export default function SizeGuidePage() {
  return (
    <TrustPage
      title="Size guide"
      intro="Shoes, shirts and trousers — with a one-tap ask if you are still unsure."
    >
      <h2 className="font-display text-xl font-bold text-navy">Shoe size helper (EU)</h2>
      <div className="overflow-x-auto">
        <table className="mt-3 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-black/10 text-left">
              <th className="py-2">EU</th>
              <th>UK</th>
              <th>US</th>
              <th>Foot length</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["39", "5.5", "6", "to measure"],
              ["40", "6.5", "7", "to measure"],
              ["41", "7", "8", "to measure"],
              ["42", "8", "9", "to measure"],
              ["43", "9", "10", "to measure"],
              ["44", "10", "11", "to measure"],
              ["45", "11", "12", "to measure"],
              ["46", "12", "13", "to measure"],
            ].map((row) => (
              <tr key={row[0]} className="border-b border-black/5">
                {row.map((c) => (
                  <td key={c} className="py-2">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-muted">Illustrative conversions. We fill foot-length from our own lasts.</p>

      <h2 className="font-display mt-10 text-xl font-bold text-navy">Clothing (tops)</h2>
      <div className="overflow-x-auto">
        <table className="mt-3 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-black/10 text-left">
              <th className="py-2">Size</th>
              <th>Chest (cm)</th>
              <th>Length (cm)</th>
              <th>Sleeve (cm)</th>
            </tr>
          </thead>
          <tbody>
            {["S", "M", "L", "XL", "XXL"].map((s) => (
              <tr key={s} className="border-b border-black/5">
                <td className="py-2">{s}</td>
                <td>to measure</td>
                <td>to measure</td>
                <td>to measure</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-slate-600">
        Trousers use waist and inseam (tags often show 30–36). Long-sleeve items gain a sleeve-length column once
        measured.
      </p>
    </TrustPage>
  );
}
