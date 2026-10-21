import type { Metadata } from "next";
import localFont from "next/font/local";
import { CartProvider } from "./lib/cart";
import "./globals.css";

const nunito = localFont({
  variable: "--font-nunito",
  display: "swap",
  weight: "300 700",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  src: [
    { path: "./fonts/Nunito-latin-ext.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/Nunito-latin.woff2", weight: "300 700", style: "normal" },
  ],
});

const instrument = localFont({
  variable: "--font-instrument",
  display: "swap",
  weight: "400 700",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  src: [
    {
      path: "./fonts/InstrumentSans-latin-ext.woff2",
      weight: "400 700",
      style: "normal",
    },
    {
      path: "./fonts/InstrumentSans-latin.woff2",
      weight: "400 700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bespokeluxurrele.com"
  ),
  title: {
    default: "Bespoke Luxurrele — Bespoke Kashmiri Couture House",
    template: "%s | Bespoke Luxurrele",
  },
  description:
    "Bespoke Luxurrele is a couture house dedicated to preserving heritage craftsmanship. Hand-embroidered pherans, bridal couture, and timeless heirlooms.",
  openGraph: {
    type: "website",
    siteName: "Bespoke Luxurrele",
    title: "Bespoke Luxurrele — Bespoke Kashmiri Couture House",
    description:
      "Hand-embroidered pherans, bridal couture, and timeless heirlooms, crafted by master artisans of Kashmir.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${instrument.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white text-foreground font-sans">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
