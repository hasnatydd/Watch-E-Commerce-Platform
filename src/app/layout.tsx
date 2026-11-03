import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { CartDrawer } from "@/components/storefront/cart-drawer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "ARVANO — Premium Luxury Wrist Watches | TIME. PRESENCE. PRECISION.",
  description:
    "Discover ARVANO — commanding, masculine, precision-crafted luxury wristwatches. Engineered with surgical stainless steel, sapphire crystal, and authentic mechanical calibres in Bangladesh.",
  icons: {
    icon: "/images/arvano-icon.jpg",
    apple: "/images/arvano-icon.jpg",
  },
  openGraph: {
    title: "ARVANO — TIME. PRESENCE. PRECISION.",
    description: "Haute horlogerie wristwatches crafted for authority, character, and enduring presence.",
    images: ["/images/arvano-logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-charcoal text-ivory antialiased selection:bg-gold selection:text-charcoal font-sans">
        <AuthProvider>
          {children}
          <CartDrawer />
        </AuthProvider>
      </body>
    </html>
  );
}
