"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../logo.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [policyModal, setPolicyModal] = useState<"shipping" | "returns" | "care" | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeError("");
    setSubscribing(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setSubscribeError(data?.error || "We could not subscribe you right now.");
        return;
      }
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribeError("We could not reach the server. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#0e0d0c] text-ivory pt-20 pb-10 border-t border-ivory/10">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
        {/* Top — Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-16 border-b border-ivory/15 items-end">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-ivory/60 mb-3">
              ✦ The Atelier Letter ✦
            </p>
            <h3 className="font-display text-3xl md:text-4xl text-ivory mb-3">
              Be the first to know.
            </h3>
            <p className="text-[13px] text-ivory/70 font-light max-w-md leading-relaxed">
              Quiet dispatches from the atelier — new collections, private
              appointments, and the occasional behind-the-stitch.
            </p>
          </div>
          <div>
            <form
              onSubmit={handleSubscribe}
              className="flex items-center gap-4 border-b border-ivory/30 pb-2.5"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your e-mail address"
                className="flex-1 bg-transparent outline-none text-sm py-2 placeholder:text-ivory/40 text-ivory font-light"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="text-[11px] tracking-[0.3em] uppercase text-ivory hover:opacity-70 transition-opacity whitespace-nowrap disabled:opacity-50"
              >
                {subscribed
                  ? "Subscribed ✦"
                  : subscribing
                  ? "Subscribing…"
                  : "Subscribe →"}
              </button>
            </form>
            {subscribeError && (
              <p className="mt-2.5 text-[11.5px] text-[#E8A9A2] font-light">
                {subscribeError}
              </p>
            )}
          </div>
        </div>

        {/* Middle — 4 Balanced Columns with Zero Negative Space */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-16 border-b border-ivory/15">
          {/* Column 1: Collections */}
          <div>
            <h4 className="font-display text-lg tracking-wide uppercase text-ivory mb-6 pb-2 border-b border-ivory/10">
              Collections
            </h4>
            <ul className="space-y-3 text-[13px] text-ivory/75 font-light">
              <li>
                <Link href="/collections/new-arrivals" className="hover:text-ivory transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections/bridal" className="hover:text-ivory transition-colors">
                  Bridal Lehengas &amp; Sets
                </Link>
              </li>
              <li>
                <Link href="/collections/pherans" className="hover:text-ivory transition-colors">
                  Kashmiri Velvet Pherans
                </Link>
              </li>
              <li>
                <Link href="/collections/anarkalis" className="hover:text-ivory transition-colors">
                  Handcrafted Anarkalis
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-ivory transition-colors">
                  All Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Client Care & Policies */}
          <div>
            <h4 className="font-display text-lg tracking-wide uppercase text-ivory mb-6 pb-2 border-b border-ivory/10">
              Client Care
            </h4>
            <ul className="space-y-3 text-[13px] text-ivory/75 font-light">
              <li>
                <Link href="/track" className="text-gold hover:text-ivory font-medium transition-colors">
                  ✦ Track Your Order
                </Link>
              </li>
              <li>
                <Link href="#appointment" className="hover:text-ivory transition-colors">
                  Private Fittings &amp; Consultations
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setPolicyModal("shipping")}
                  className="hover:text-ivory transition-colors text-left cursor-pointer"
                >
                  Complimentary Shipping Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setPolicyModal("returns")}
                  className="hover:text-ivory transition-colors text-left cursor-pointer"
                >
                  Returns &amp; Exchange Guarantee
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setPolicyModal("care")}
                  className="hover:text-ivory transition-colors text-left cursor-pointer"
                >
                  Fabric &amp; Zari Care Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Atelier Location & Timings */}
          <div>
            <h4 className="font-display text-lg tracking-wide uppercase text-ivory mb-6 pb-2 border-b border-ivory/10">
              Atelier Location
            </h4>
            <div className="space-y-4 text-[13px] text-ivory/75 font-light leading-relaxed">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-ivory/50 block mb-1">
                  Physical Flagship
                </span>
                <p className="text-ivory/90">
                  Samandhar Bagh, Opp. Directorate of Education,
                  <br />
                  M.A. Road, Srinagar,
                  <br />
                  Jammu &amp; Kashmir — 190001
                </p>
              </div>
              <div className="pt-1">
                <span className="text-[10px] tracking-[0.25em] uppercase text-ivory/50 block mb-1">
                  Atelier Hours
                </span>
                <p>Monday – Saturday: 10:30 AM – 7:30 PM</p>
                <p className="text-[11.5px] text-ivory/60 mt-0.5">
                  Private Sunday bridal fittings by appointment
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Direct Consultation & Contact */}
          <div id="appointment">
            <h4 className="font-display text-lg tracking-wide uppercase text-ivory mb-6 pb-2 border-b border-ivory/10">
              Appointments
            </h4>
            <div className="space-y-4 text-[13px] text-ivory/75 font-light">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-ivory/50 block mb-1">
                  Direct WhatsApp &amp; Phone
                </span>
                <a
                  href="https://wa.me/917889766195"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory font-medium hover:text-emerald-400 transition-colors inline-block text-[14px]"
                >
                  +91 788 976 6195
                </a>
                <a
                  href="https://wa.me/917889766195?text=Hello%20Bespoke%20Luxurrele%2C%20I%20would%20like%20to%20book%20a%20private%20bridal%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-1 text-[10.5px] tracking-[0.22em] uppercase text-ivory/90 hover:text-emerald-400 transition-colors"
                >
                  Book on WhatsApp →
                </a>
              </div>

              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-ivory/50 block mb-1">
                  Concierge E-mail
                </span>
                <a
                  href="mailto:atelier@bespokeluxurrele.com"
                  className="text-ivory/90 hover:text-ivory transition-colors"
                >
                  atelier@bespokeluxurrele.com
                </a>
              </div>

              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-ivory/50 block mb-1">
                  Instagram
                </span>
                <a
                  href="https://www.instagram.com/bespoke_luxurelle/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/90 hover:text-ivory transition-colors"
                >
                  @bespoke_luxurelle
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom — Logo + Brand, Social Icons, and Secure Badges */}
        <div className="pt-8 sm:pt-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Logo & Brand matching the header / hero branding */}
          <Link href="/" className="flex items-center gap-3 sm:gap-3.5 group shrink-0 whitespace-nowrap">
            <Image
              src={logoImg}
              alt="Bespoke Luxurrele"
              width={48}
              height={48}
              className="rounded-full object-contain group-hover:opacity-90 transition-opacity"
            />
            <div className="flex flex-col text-left leading-none whitespace-nowrap">
              <span className="font-display text-lg sm:text-xl lg:text-2xl text-ivory tracking-[0.06em] whitespace-nowrap">
                Bespoke Luxurrele
              </span>
              <span className="text-[6.5px] sm:text-[7.5px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-ivory/70 mt-1 whitespace-nowrap">
                Luxurious to the Core
              </span>
            </div>
          </Link>

          {/* Social Icons & Direct Channels */}
          <div className="flex items-center gap-5 text-ivory/80">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/bespoke_luxurelle/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-ivory transition-colors p-1"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/917889766195"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-emerald-400 transition-colors p-1"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
            {/* Email */}
            <a
              href="mailto:atelier@bespokeluxurrele.com"
              aria-label="Email"
              className="hover:text-ivory transition-colors p-1"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
            </a>
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-ivory/70">
            <span>Secure payments</span>
            <span className="border border-ivory/30 px-2 py-0.5 rounded text-ivory/90">VISA</span>
            <span className="border border-ivory/30 px-2 py-0.5 rounded text-ivory/90">MC</span>
            <span className="border border-ivory/30 px-2 py-0.5 rounded text-ivory/90">UPI</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-ivory/10 text-center text-[10px] tracking-[0.25em] uppercase text-ivory/50">
          © 2026 — Bespoke Luxurrele. All rights reserved.
        </div>
      </div>

      {/* Client Care & Guarantee Modal */}
      {policyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 text-dark">
          <div
            onClick={() => setPolicyModal(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />
          <div className="relative z-10 w-full max-w-xl bg-white shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted mb-1">
                  ✦ Bespoke Luxurrele Atelier ✦
                </p>
                <h3 className="font-display text-2xl text-dark">
                  {policyModal === "shipping" && "Complimentary Shipping & Dispatch"}
                  {policyModal === "returns" && "Bespoke Fit Guarantee & Returns"}
                  {policyModal === "care" && "Heirloom Fabric & Zari Care"}
                </h3>
              </div>
              <button
                onClick={() => setPolicyModal(null)}
                aria-label="Close"
                className="p-2 text-dark/60 hover:text-dark transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-5 space-y-4 text-xs sm:text-[13px] text-muted font-light leading-relaxed">
              {policyModal === "shipping" && (
                <>
                  <p>
                    Every bespoke piece is crafted in our Srinagar atelier and packaged in archival protective garment casings.
                  </p>
                  <div className="bg-[#FAF8F5] p-4 border-l-2 border-gold space-y-1 text-dark">
                    <p className="font-medium text-xs uppercase tracking-wider">✦ Pan-India Insured Dispatch</p>
                    <p className="text-muted">Complimentary insured courier on all orders above ₹25,000. For orders below ₹25,000, standard insured shipping is ₹500.</p>
                  </div>
                  <p>
                    <strong>Timelines:</strong> Ready-to-wear pieces ship in 5–7 business days. Made-to-order couture pherans and bridal ensembles take 3–6 weeks depending on tilla needlework complexity.
                  </p>
                </>
              )}

              {policyModal === "returns" && (
                <>
                  <p>
                    Because each ensemble is individually cut and embroidered by master artisans to your silhouette, all commissions are bespoke.
                  </p>
                  <div className="bg-[#FAF8F5] p-4 border-l-2 border-gold space-y-1 text-dark">
                    <p className="font-medium text-xs uppercase tracking-wider">✦ 100% Fit &amp; Alteration Guarantee</p>
                    <p className="text-muted">If your garment requires fitting adjustments, our Srinagar master tailors alter it with complimentary return logistics until the contour is perfect.</p>
                  </div>
                  <p>
                    In the rare case of transit damage or craft defect, contact our concierge on WhatsApp within 48 hours for immediate replacement.
                  </p>
                </>
              )}

              {policyModal === "care" && (
                <>
                  <p>
                    Our garments are woven from 100% pure silk velvet, GI-certified Pashmina, and pure metallic silver/gold tilla thread.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted">
                    <li><strong>Dry Clean Only:</strong> Always entrust your pieces to specialized luxury dry cleaners.</li>
                    <li><strong>Storage:</strong> Store flat in the provided muslin garment bag. Never hang heavy velvet by thin wire hangers.</li>
                    <li><strong>Moisture &amp; Perfume:</strong> Spray perfumes and mists before wearing; avoid direct contact with metallic zari threads.</li>
                  </ul>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <a
                href="https://wa.me/917889766195"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-700 hover:underline tracking-wider uppercase font-medium"
              >
                Chat with Concierge →
              </a>
              <button
                onClick={() => setPolicyModal(null)}
                className="bg-dark text-ivory text-[10.5px] tracking-[0.25em] uppercase px-6 py-2.5 hover:bg-dark-soft transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
