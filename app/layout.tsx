import type { Metadata } from "next";
import { Nunito, Instrument_Sans } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bespoke Luxurelle — Bespoke Couture House",
  description:
    "Bespoke Luxurelle is a couture house dedicated to preserving heritage craftsmanship. Hand-embroidered pherans, bridal couture, and timeless heirlooms.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${instrument.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
