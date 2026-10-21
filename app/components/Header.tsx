"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../logo.png";
import { useCart } from "../lib/cart";
import { getProducts } from "../lib/products";

export default function Header() {
  const { openCart, totalItems } = useCart();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const allProducts = getProducts();
  const searchResults = searchQuery.trim()
    ? allProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.details.fabric.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Color classes flip when transparent (over hero) vs scrolled (white bg)
  const textColor = scrolled ? "text-dark" : "text-ivory";
  const subColor = scrolled ? "text-muted" : "text-ivory/70";
  const hoverColor = scrolled ? "hover:text-muted" : "hover:text-ivory/70";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* Announcement marquee — always dark */}
      <div className="h-[38px] bg-dark text-ivory text-[10.5px] tracking-[0.22em] uppercase overflow-hidden border-b border-dark-soft flex items-center">
        <div className="flex animate-marquee whitespace-nowrap py-2.5">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="px-10">✦ Complimentary shipping on orders above ₹25,000</span>
              <span className="px-10">◈ Bespoke bridal fittings by private appointment</span>
              <span className="px-10">❧ The Couture Edit — Now in atelier</span>
              <span className="px-10">✦ Crafted by master artisans of Kashmir</span>
              <span className="px-10">◈ Book a bridal consultation</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main nav — transparent over hero, white when scrolled */}
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-ivory shadow-sm border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-3 lg:gap-8 h-16 sm:h-20 lg:h-24">
            {/* Logo - left */}
            <Link
              href="/"
              className={`flex items-center gap-2 sm:gap-3 transition-colors duration-500 shrink-0 whitespace-nowrap ${textColor}`}
            >
              <div className="relative w-8 h-8 sm:w-11 sm:h-11 lg:w-14 lg:h-14 shrink-0">
                <Image
                  src={logoImg}
                  alt="Bespoke Luxurrele"
                  fill
                  sizes="(max-width: 640px) 32px, 56px"
                  className="rounded-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col leading-none whitespace-nowrap">
                <span className="font-display text-[15px] sm:text-lg lg:text-xl tracking-[0.03em] sm:tracking-[0.06em] whitespace-nowrap">
                  Bespoke Luxurrele
                </span>
                <span
                  className={`text-[6.5px] sm:text-[7px] tracking-[0.22em] sm:tracking-[0.35em] uppercase mt-1 transition-colors duration-500 whitespace-nowrap ${subColor}`}
                >
                  Luxurious to the Core
                </span>
              </div>
            </Link>

            {/* Nav - center */}
            <nav
              className={`hidden lg:flex items-center justify-center gap-5 xl:gap-7 text-[11px] xl:text-[12px] tracking-[0.16em] xl:tracking-[0.2em] uppercase font-light whitespace-nowrap transition-colors duration-500 flex-1 ${textColor}`}
            >
              <Link
                href="/collections/new-arrivals"
                className={`nav-link whitespace-nowrap ${hoverColor}`}
                onMouseEnter={() => setOpenMenu(null)}
              >
                New Arrivals
              </Link>
              <Link
                href="/collections"
                onMouseEnter={() => setOpenMenu("collections")}
                className={`nav-link uppercase whitespace-nowrap ${hoverColor}`}
              >
                Collections
              </Link>
              <Link
                href="/collections/bridal"
                onMouseEnter={() => setOpenMenu(null)}
                className={`nav-link whitespace-nowrap ${hoverColor}`}
              >
                Bridal
              </Link>
              <Link
                href="/collections/festive"
                onMouseEnter={() => setOpenMenu(null)}
                className={`nav-link whitespace-nowrap ${hoverColor}`}
              >
                Festive
              </Link>
              <Link
                href="/collections/pherans"
                onMouseEnter={() => setOpenMenu(null)}
                className={`nav-link whitespace-nowrap ${hoverColor}`}
              >
                Pherans
              </Link>
              <a
                href="https://wa.me/917889766195?text=Hello%20Bespoke%20Luxurrele%2C%20I%20would%20like%20to%20book%20a%20private%20bridal%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setOpenMenu(null)}
                className={`nav-link whitespace-nowrap ${hoverColor}`}
              >
                Book Now
              </a>
              <Link
                href="/#rich-legacy"
                onMouseEnter={() => setOpenMenu(null)}
                className={`nav-link whitespace-nowrap ${hoverColor}`}
              >
                Discover
              </Link>
              <Link
                href="/track"
                onMouseEnter={() => setOpenMenu(null)}
                className={`nav-link whitespace-nowrap ${hoverColor}`}
              >
                Track Order
              </Link>
            </nav>

            {/* Icons - right */}
            <div
              className={`flex items-center gap-3 sm:gap-4 lg:gap-5 justify-end shrink-0 transition-colors duration-500 ${textColor}`}
            >
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search catalogue"
                className={`${hoverColor} transition-colors duration-500 p-1 cursor-pointer`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              {/* Cart Trigger */}
              <button
                type="button"
                onClick={openCart}
                aria-label="Open Cart Drawer"
                className={`relative ${hoverColor} transition-colors duration-500 p-1 cursor-pointer`}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-dark text-ivory text-[9px] rounded-full flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-1"
                aria-label="Open menu"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mega menu - Women's Collections */}
      {openMenu === "collections" && (
        <div
          className="absolute top-full left-0 right-0 bg-white border-t border-border shadow-xl z-40 text-dark"
          onMouseEnter={() => setOpenMenu("collections")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-12 grid grid-cols-12 gap-10">
            <div className="col-span-3">
              <h3 className="text-[11px] tracking-[0.3em] uppercase text-muted mb-6 font-sans">
                Shop By Silhouette
              </h3>
              <ul className="space-y-3.5 text-[14px] font-light">
                <li>
                  <Link
                    href="/collections"
                    onClick={() => setOpenMenu(null)}
                    className="hover:text-gold transition-colors"
                  >
                    View All Collections
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/bridal"
                    onClick={() => setOpenMenu(null)}
                    className="hover:text-gold transition-colors flex items-center justify-between"
                  >
                    <span>Bridal Lehengas &amp; Sets</span>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-gold border border-gold px-1.5 py-0.5">
                      Bespoke
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/pherans"
                    onClick={() => setOpenMenu(null)}
                    className="hover:text-gold transition-colors"
                  >
                    Kashmiri Velvet &amp; Silk Pherans
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/festive"
                    onClick={() => setOpenMenu(null)}
                    className="hover:text-gold transition-colors"
                  >
                    Festive Shararas &amp; Kurtas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/anarkalis"
                    onClick={() => setOpenMenu(null)}
                    className="hover:text-gold transition-colors"
                  >
                    Silver &amp; Gold Zari Anarkalis
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/new-arrivals"
                    onClick={() => setOpenMenu(null)}
                    className="hover:text-gold transition-colors"
                  >
                    Latest Atelier Arrivals
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-6">
              <h3 className="text-[11px] tracking-[0.3em] uppercase text-muted mb-6 font-sans">
                Signature Couture Stories
              </h3>
              <div className="grid grid-cols-3 gap-5">
                {[
                  {
                    title: "Sozni Tilla Bridal Ensemble",
                    img: "/pheran1.jpg",
                    slug: "sozni-tilla-bridal-ensemble",
                  },
                  {
                    title: "Velvet Aari Pheran",
                    img: "/pheran2.jpg",
                    slug: "aari-embroidered-velvet-pheran",
                  },
                  {
                    title: "Silver Zari Anarkali",
                    img: "/product1.jpg",
                    slug: "chinar-sozni-anarkali",
                  },
                ].map((s, i) => (
                  <Link
                    key={i}
                    href={`/products/${s.slug}`}
                    onClick={() => setOpenMenu(null)}
                    className="group block"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                      <Image
                        src={s.img}
                        alt={s.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        sizes="180px"
                      />
                    </div>
                    <p className="mt-3 text-[12.5px] tracking-wide text-center font-sans">
                      {s.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-span-3 relative aspect-[3/4] overflow-hidden bg-cream">
              <Image
                src="/hero1.jpg"
                alt="Editorial"
                fill
                className="object-cover object-top"
                sizes="300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-ivory">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold">
                  Just In
                </p>
                <h4 className="font-display text-2xl mt-1 text-ivory">
                  Couture ’26
                </h4>
                <Link
                  href="/collections"
                  onClick={() => setOpenMenu(null)}
                  className="inline-block mt-3 text-[11px] tracking-[0.25em] uppercase border-b border-ivory pb-0.5"
                >
                  Discover Collection →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Search overlay */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-border p-6 sm:p-8 z-40 text-dark shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 border-b border-dark pb-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by garment, embroidery technique (Tilla, Sozni, Aari), or silhouette..."
                className="flex-1 bg-transparent outline-none text-base font-light py-1"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs tracking-widest uppercase hover:opacity-70 cursor-pointer"
              >
                Close [ESC]
              </button>
            </div>

            {/* Quick Suggestions when empty */}
            {!searchQuery.trim() && (
              <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-muted">
                <span>Suggested:</span>
                {["Pheran", "Bridal", "Tilla", "Anarkali", "Velvet"].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="border border-border px-3 py-1 bg-[#FAF8F5] text-dark hover:border-dark transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            )}

            {/* Live Search Results */}
            {searchQuery.trim() && (
              <div className="mt-8">
                <p className="text-[11px] tracking-[0.2em] uppercase text-muted mb-4">
                  {searchResults.length} {searchResults.length === 1 ? "Result" : "Results"} for &ldquo;{searchQuery}&rdquo;
                </p>

                {searchResults.length === 0 ? (
                  <p className="text-sm text-muted font-light py-8 text-center">
                    No atelier pieces matched your query. Try searching for &ldquo;Pheran&rdquo;, &ldquo;Tilla&rdquo;, or &ldquo;Silk&rdquo;.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="group block text-left"
                      >
                        <div className="relative aspect-[3/4] overflow-hidden bg-cream mb-2">
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            sizes="160px"
                          />
                        </div>
                        <h4 className="font-display text-xs text-dark group-hover:text-gold transition-colors line-clamp-1">
                          {product.title}
                        </h4>
                        <p className="text-[11px] text-muted">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-white lg:hidden overflow-y-auto text-dark">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Image
                src={logoImg}
                alt="Bespoke Luxurrele"
                width={36}
                height={36}
                className="rounded-full object-contain"
              />
              <span className="font-display text-xl">Bespoke Luxurrele</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close"
              className="p-1"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col p-6">
            {[
              { label: "All Collections", href: "/collections" },
              { label: "New Arrivals", href: "/collections/new-arrivals" },
              { label: "Bridal Couture", href: "/collections/bridal" },
              { label: "Festive Wear", href: "/collections/festive" },
              { label: "Signature Pherans", href: "/collections/pherans" },
              { label: "Silk Anarkalis", href: "/collections/anarkalis" },
              { label: "Track Your Order", href: "/track" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-4 border-b border-border font-display text-2xl hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://wa.me/917889766195?text=Hello%20Bespoke%20Luxurrele%2C%20I%20would%20like%20to%20book%20a%20private%20bridal%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="py-4 border-b border-border font-display text-2xl text-emerald-700"
            >
              Book Private Consultation →
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
