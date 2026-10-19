"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import bgImg from "../hero1.jpg";

type GoogleReview = {
  name: string;
  avatarInitial: string;
  avatarColor: string;
  time: string;
  text: string;
};

const reviews: GoogleReview[] = [
  {
    name: "Rukhsana Andrabi",
    avatarInitial: "R",
    avatarColor: "bg-[#2E7D32]",
    time: "3 months ago",
    text: "I absolutely love her designs! Every outfit is thoughtfully crafted with stunning colors, premium-quality fabrics, and beautiful embroidery. The attention to detail and unique style make each piece feel special. The fit, finishing, and overall craftsmanship are truly exceptional.",
  },
  {
    name: "Sanah Jeelani",
    avatarInitial: "S",
    avatarColor: "bg-[#37474F]",
    time: "4 months ago",
    text: "My mom and I absolutely love this boutique. Their designs are original, thoughtfully made, and they're great at bringing your ideas to life, even when you share reference pictures. Beautiful fabrics, flawless custom tailoring, and authentic Kashmiri craftsmanship make every visit so special.",
  },
  {
    name: "Dr. Farhana Shah",
    avatarInitial: "F",
    avatarColor: "bg-[#4E342E]",
    time: "2 months ago",
    text: "Ordered a bespoke crushed velvet bridal pheran with silver tilla for my wedding reception. The precision of the embroidery and the luxurious feel of the silk velvet exceeded every expectation. An authentic heirloom piece.",
  },
  {
    name: "Alia Qureshi",
    avatarInitial: "A",
    avatarColor: "bg-[#880E4F]",
    time: "1 month ago",
    text: "The handcrafted anarkalis and pherans are unmatched in Srinagar. Authentic tilla wire and master needlework. The team at Samandhar Bagh was so warm and helpful with custom sizing.",
  },
  {
    name: "Mehak Rashid",
    avatarInitial: "M",
    avatarColor: "bg-[#004D40]",
    time: "5 months ago",
    text: "Bespoke Luxurrele is truly luxurious to the core. The passion for Kashmiri heritage shines in every piece. Highly recommended for brides looking for authentic high couture.",
  },
];

export default function LovedTrusted() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-advance loop carousel every 4.5s
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % reviews.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  return (
    <section
      id="reviews"
      className="relative py-16 lg:py-20 overflow-hidden text-ivory"
    >
      {/* Background Image with Dark Luxury Overlay */}
      <Image
        src={bgImg}
        alt="Bespoke Luxurrele Atelier"
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/65" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Title and Balanced Subtitle (Zero Dashes, Centered) */}
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ivory text-center leading-tight mb-3">
            Our Happy Clients
          </h2>
          <p className="text-[13.5px] md:text-[14.5px] text-ivory/85 text-center font-light max-w-lg mx-auto leading-relaxed text-balance">
            Authentic reflections from brides and patrons across the world who cherish our handcrafted Kashmiri heirlooms.
          </p>
        </div>

        {/* Carousel with Fixed Beside-Card Arrow Icons (No bulky buttons, fixed alignment) */}
        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-center gap-3 md:gap-6">
            {/* Left Arrow Icon (Clean SVG, Fixed Position) */}
            <button
              onClick={handlePrev}
              aria-label="Previous review"
              className="text-ivory/70 hover:text-ivory transition-colors p-2 shrink-0"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Slider Viewport Window */}
            <div className="w-full max-w-xl overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${currentIdx * 100}%)`,
                }}
              >
                {reviews.map((rev, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-1">
                    {/* Fixed Equal Height Card (Never Jumps or Shifts) */}
                    <div className="bg-white text-dark p-7 md:p-8 shadow-2xl relative h-[240px] md:h-[250px] flex flex-col justify-between">
                      <div>
                        {/* Top Row: User Avatar, Name, Time, and Only the Google Icon */}
                        <div className="flex items-center justify-between mb-3.5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-full ${rev.avatarColor} text-white flex items-center justify-center font-display text-sm font-semibold shadow-sm shrink-0`}
                            >
                              {rev.avatarInitial}
                            </div>
                            <div>
                              <h4 className="font-display text-base text-dark font-medium leading-none">
                                {rev.name}
                              </h4>
                              <p className="text-[11px] text-muted font-light mt-1">
                                {rev.time}
                              </p>
                            </div>
                          </div>

                          {/* Google G Icon */}
                          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                          </svg>
                        </div>

                        {/* 5 Stars */}
                        <div className="flex items-center gap-1 text-amber-500 text-xs mb-3">
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                        </div>

                        {/* Review Text */}
                        <p className="text-[13px] md:text-[14px] leading-relaxed text-dark/85 font-light italic line-clamp-4">
                          “{rev.text}”
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow Icon (Clean SVG, Fixed Position) */}
            <button
              onClick={handleNext}
              aria-label="Next review"
              className="text-ivory/70 hover:text-ivory transition-colors p-2 shrink-0"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Minimal Dots Indicator */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIdx ? "w-7 bg-ivory" : "w-2 bg-ivory/40 hover:bg-ivory/60"
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
