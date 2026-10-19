"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../logo.png";

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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

            {/* Nav - center (single line, short words, balanced spacing) */}
            <nav
              className={`hidden lg:flex items-center justify-center gap-5 xl:gap-7 text-[11px] xl:text-[12px] tracking-[0.16em] xl:tracking-[0.2em] uppercase font-light whitespace-nowrap transition-colors duration-500 flex-1 ${textColor}`}
            >
              <Link href="#latest-collection" className={`nav-link whitespace-nowrap ${hoverColor}`} onMouseEnter={() => setOpenMenu(null)}>
                New Arrivals
              </Link>
              <button onMouseEnter={() => setOpenMenu("collections")} className={`nav-link uppercase whitespace-nowrap ${hoverColor}`}>
                Collections
              </button>
              <Link href="#latest-collection" onMouseEnter={() => setOpenMenu(null)} className={`nav-link whitespace-nowrap ${hoverColor}`}>
                Bridal
              </Link>
              <Link href="#latest-collection" onMouseEnter={() => setOpenMenu(null)} className={`nav-link whitespace-nowrap ${hoverColor}`}>
                Festive
              </Link>
              <Link href="#pherans" onMouseEnter={() => setOpenMenu(null)} className={`nav-link whitespace-nowrap ${hoverColor}`}>
                Pherans
              </Link>
              <Link href="#appointment" onMouseEnter={() => setOpenMenu(null)} className={`nav-link whitespace-nowrap ${hoverColor}`}>
                Book Now
              </Link>
              <Link href="#discover" onMouseEnter={() => setOpenMenu(null)} className={`nav-link whitespace-nowrap ${hoverColor}`}>
                Discover
              </Link>
            </nav>

            {/* Icons - right */}
            <div className={`flex items-center gap-3 sm:gap-4 lg:gap-5 justify-end shrink-0 transition-colors duration-500 ${textColor}`}>
              <Link
                href="#account"
                aria-label="Account"
                className={`hidden md:block ${hoverColor} transition-colors duration-500`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
                className={`${hoverColor} transition-colors duration-500`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              <Link
                href="#wishlist"
                aria-label="Wishlist"
                className={`hidden md:block ${hoverColor} transition-colors duration-500`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </Link>
              <Link
                href="#cart"
                aria-label="Cart"
                className={`relative ${hoverColor} transition-colors duration-500`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="absolute -top-1.5 -right-2 text-[9px] font-medium">2</span>
              </Link>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-1"
                aria-label="Open menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
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
          className="absolute top-full left-0 right-0 bg-ivory border-t border-border shadow-xl z-40 text-dark"
          onMouseEnter={() => setOpenMenu("collections")}
        >
          <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-12 grid grid-cols-12 gap-10">
            <div className="col-span-3">
              <h3 className="text-[11px] tracking-[0.3em] uppercase text-muted mb-6 font-sans">
                Shop By Silhouette
              </h3>
              <ul className="space-y-3.5 text-[14px] font-light">
                <li><Link href="#latest-collection" className="hover:text-muted">View All Collections</Link></li>
                <li className="flex items-center gap-2">
                  <Link href="#latest-collection" className="hover:text-muted">Blush Sharara Sets</Link>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-gold border border-gold px-1.5 py-0.5">New</span>
                </li>
                <li><Link href="#latest-collection" className="hover:text-muted">Bridal Lehengas</Link></li>
                <li><Link href="#latest-collection" className="hover:text-muted">Embroidered Anarkalis</Link></li>
                <li><Link href="#latest-collection" className="hover:text-muted">Signature Kashmiri Pherans</Link></li>
                <li><Link href="#latest-collection" className="hover:text-muted">Festive Suits &amp; Sets</Link></li>
                <li><Link href="#latest-collection" className="hover:text-muted">Celebrity Closet</Link></li>
                <li><Link href="#craft-revival" className="hover:text-muted">Heritage Tilla &amp; Zardozi</Link></li>
              </ul>
            </div>
            <div className="col-span-6">
              <h3 className="text-[11px] tracking-[0.3em] uppercase text-muted mb-6 font-sans">
                Signature Couture Stories
              </h3>
              <div className="grid grid-cols-3 gap-5">
                {[
                  { title: "Blush Sharara Set", img: "/hero1.jpg" },
                  { title: "Magenta Bridal Lehenga", img: "/hero.jpg" },
                  { title: "Silver Zari Anarkali", img: "/hero1.jpg" },
                  { title: "Ivory Pearl Pheran", img: "/hero.jpg" },
                  { title: "Golden Tilla Suit", img: "/hero1.jpg" },
                  { title: "All Collections →", img: "/hero.jpg" },
                ].map((s, i) => (
                  <Link key={i} href="#latest-collection" className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.img}
                        alt={s.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    </div>
                    <p className="mt-3 text-[12.5px] tracking-wide text-center font-sans italic">
                      {s.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-span-3 relative aspect-[3/4] overflow-hidden bg-cream">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero1.jpg"
                alt="Editorial"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-ivory">
                <p className="text-[10px] tracking-[0.3em] uppercase opacity-80">Just In</p>
                <h4 className="font-display text-2xl mt-1">Couture ’26</h4>
                <Link href="#latest-collection" className="inline-block mt-3 text-[11px] tracking-[0.25em] uppercase border-b border-ivory pb-0.5">
                  Discover Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-ivory border-t border-border p-8 z-40 text-dark">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 border-b border-dark pb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                autoFocus
                type="text"
                placeholder="Search the atelier for bridal, sharara, anarkali, pheran..."
                className="flex-1 bg-transparent outline-none text-base font-light py-2"
              />
              <button onClick={() => setSearchOpen(false)} className="text-xs tracking-widest uppercase">
                Close
              </button>
            </div>
            <div className="mt-6 text-[11px] tracking-[0.25em] uppercase text-muted">
              Suggested · Bridal Lehenga · Sharara Set · Anarkali Suit · Kashmiri Pheran · Tilla Work
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu drawer — purely for women's couture */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-ivory lg:hidden overflow-y-auto text-dark">
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
            <button onClick={() => setMobileOpen(false)} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col p-6">
            {[
              { label: "New Arrivals", href: "#latest-collection" },
              { label: "Collections", href: "#latest-collection" },
              { label: "Bridal", href: "#latest-collection" },
              { label: "Festive", href: "#latest-collection" },
              { label: "Pherans", href: "#pherans" },
              { label: "Book Now", href: "#appointment" },
              { label: "Discover", href: "#discover" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-4 border-b border-border font-display text-2xl"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
