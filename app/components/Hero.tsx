"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import heroPlumImg from "../hero 3.jpg"; // 2576x1273 ultra-high-definition asset
import hero2Img from "../hero.jpg";
import hero1Img from "../hero1.jpg";

const slides = [
  {
    eyebrow: "✦ Kashmiri Heritage ✦",
    headline: "Royal Plum Tilla Pheran",
    subtext: "Handcrafted deep plum silk velvet pheran adorned with intricate Kashmiri antique gold tilla needlework.",
    image: heroPlumImg,
  },
  {
    eyebrow: "◈ Royal Heritage ◈",
    headline: "Royal Bridal Lehenga",
    subtext: "Opulent magenta silk brocade lehenga paired with delicate hand-embroidered pale mint organza dupatta.",
    image: hero2Img,
  },
  {
    eyebrow: "✦ Festive Couture ✦",
    headline: "Blush Sharara Set",
    subtext: "Handcrafted blush tissue short kurta and flared sharara adorned with antique champagne tilla.",
    image: hero1Img,
  },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const slide = slides[idx];

  // Auto-rotate slides every 6s
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full mt-[38px] h-[calc(100vh-38px)] max-h-[calc(100vh-38px)] overflow-hidden bg-dark">
      {/* Background Hero Slides with smooth cross-fade transition */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <Image
            src={s.image}
            alt={s.headline}
            fill
            priority={i === 0}
            sizes="100vw"
            quality={100}
            unoptimized
            className="object-cover object-center"
          />
          {/* 10% dark overlay for 90% image brightness as requested */}
          <div className="absolute inset-0 bg-black/10" />
        </div>
      ))}

      {/* Content — perfectly centered vertically and horizontally with fixed slot heights */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-ivory px-6 max-w-4xl mx-auto">
        {/* Eyebrow container with fixed height */}
        <div className="h-5 flex items-center justify-center mb-2.5">
          <p
            key={`e-${idx}`}
            className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase opacity-90 fade-up drop-shadow-md whitespace-nowrap"
          >
            {slide.eyebrow}
          </p>
        </div>

        {/* Main headline container with fixed height — strictly 1 line, short 3 words */}
        <div className="h-16 md:h-20 flex items-center justify-center">
          <h1
            key={`h-${idx}`}
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[68px] leading-none whitespace-nowrap fade-up fade-up-delay-1 drop-shadow-lg"
          >
            {slide.headline}
          </h1>
        </div>

        {/* Subtext container with fixed height — 13 words in 2 lines */}
        <div className="h-12 md:h-14 flex items-center justify-center mt-3">
          <p
            key={`s-${idx}`}
            className="text-[12.5px] sm:text-[13.5px] md:text-[14.5px] leading-relaxed tracking-[0.05em] opacity-85 font-light fade-up fade-up-delay-2 drop-shadow-md max-w-md md:max-w-xl mx-auto"
          >
            {slide.subtext}
          </p>
        </div>

        {/* CTAs — fixed location, reduced width, short words */}
        <div className="mt-7 flex items-center justify-center gap-3.5 fade-up fade-up-delay-3">
          <Link
            href="#latest-collection"
            className="inline-block bg-ivory text-dark text-[10.5px] tracking-[0.25em] uppercase px-7 py-2.5 hover:bg-ivory/90 transition-all duration-300 text-center shadow-lg whitespace-nowrap"
          >
            Explore
          </Link>
          <Link
            href="#appointment"
            className="inline-block border border-ivory text-ivory text-[10.5px] tracking-[0.25em] uppercase px-7 py-2.5 bg-black/20 backdrop-blur-[2px] hover:bg-ivory hover:text-dark transition-all duration-300 text-center shadow-lg whitespace-nowrap"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-7 left-0 right-0 z-20 flex items-center justify-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-[2px] transition-all duration-500 ${
              i === idx ? "w-10 bg-ivory" : "w-5 bg-ivory/40 hover:bg-ivory/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Side arrows */}
      <button
        onClick={() => setIdx((idx - 1 + slides.length) % slides.length)}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-ivory/40 text-ivory items-center justify-center hover:bg-ivory/10 transition-colors"
        aria-label="Previous slide"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={() => setIdx((idx + 1) % slides.length)}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-ivory/40 text-ivory items-center justify-center hover:bg-ivory/10 transition-colors"
        aria-label="Next slide"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Scroll cue */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 text-ivory/70 text-[9px] tracking-[0.3em] uppercase">
        <span className="block mb-0.5">Scroll</span>
        <span className="block w-px h-5 bg-ivory/50 mx-auto" />
      </div>
    </section>
  );
}
