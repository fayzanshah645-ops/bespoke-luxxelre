import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsApp from "../components/WhatsApp";
import TrackOrderClient from "./TrackOrderClient";

export const metadata: Metadata = {
  title: "Track Your Order — Bespoke Luxurrele",
  description: "Track your bespoke Kashmiri couture commission and atelier crafting progress in real-time.",
};

export default function TrackOrderPage() {
  return (
    <>
      <Header />
      <main id="main" className="pt-24 sm:pt-28 lg:pt-32 pb-24 bg-white min-h-[85vh]">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-[11px] tracking-[0.2em] uppercase text-muted flex items-center gap-2 font-light"
          >
            <Link href="/" className="hover:text-dark transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-dark font-medium">Track Order</span>
          </nav>

          <Suspense
            fallback={
              <div className="max-w-3xl mx-auto py-20 text-center text-muted text-xs uppercase tracking-widest">
                Loading atelier records…
              </div>
            }
          >
            <TrackOrderClient />
          </Suspense>
        </div>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
