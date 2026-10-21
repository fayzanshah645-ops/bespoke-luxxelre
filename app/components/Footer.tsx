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
                <Link href="#appointment" className="hover:text-ivory transition-colors">
                  Private Fittings &amp; Consultations
                </Link>
              </li>
              <li>
                <Link href="#appointment" className="hover:text-ivory transition-colors">
                  Bespoke Sizing &amp; Tailoring
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-ivory transition-colors">
                  Complimentary Shipping
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-ivory transition-colors">
                  Returns &amp; Exchange Policies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-ivory transition-colors">
                  Fabric &amp; Zari Care Guide
                </Link>
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

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-ivory/80">
            {/* Facebook */}
            <Link href="#" aria-label="Facebook" className="hover:text-ivory transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </Link>
            {/* Instagram */}
            <Link
              href="https://www.instagram.com/bespoke_luxurelle/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-ivory transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </Link>
            {/* Pinterest */}
            <Link href="#" aria-label="Pinterest" className="hover:text-ivory transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </Link>
            {/* YouTube */}
            <Link href="#" aria-label="YouTube" className="hover:text-ivory transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </Link>
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
    </footer>
  );
}
