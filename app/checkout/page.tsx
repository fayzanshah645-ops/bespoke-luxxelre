import type { Metadata } from "next";
import CheckoutForm from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout — Bespoke Luxurrele",
  description: "Securely finalize your bespoke Kashmiri couture order.",
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
