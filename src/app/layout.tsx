import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { CartProvider } from "@/lib/cart";
import { homeMeta, localBusinessJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { WishlistProvider } from "@/lib/wishlist";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});

const meta = homeMeta();

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: meta.title,
    template: `%s | ${SITE.name}`,
  },
  description: meta.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main className="min-h-[70vh] pb-28 md:pb-0">{children}</main>
            <Footer />
            <WhatsAppFloat />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
