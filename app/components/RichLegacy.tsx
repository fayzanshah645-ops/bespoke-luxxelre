"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import craftImg from "../legacy-craft.jpg";
import pheranImg from "../legacy-pheran.jpg";

const stories = [
  {
    title: "Where Every Thread Remembers Heritage",
    subtitle:
      "Before a garment ever touches a body, it lives for months in the patient hands of a Kashmiri master artisan. Seated beside a glowing winter hearth, with spools of fine silver tilla wire, his needle moves by instinct passed down through five generations—breathing memory and soul into raw crushed velvet.",
    image: craftImg,
    imageAlt: "Master Kashmiri artisan hand-embroidering silver tilla onto crushed velvet",
  },
  {
    title: "An Armor of Velvet & Dignity",
    subtitle:
      "When the final tilla knot is tied, the velvet takes on a soul. Draped in the crisp chill of winter, the finished Kashmiri pheran rests with effortless nobility—shimmering with quiet champagne brilliance, keeping the chill at bay while wrapping the wearer in timeless grace.",
    image: pheranImg,
    imageAlt: "Woman wearing the bespoke Kashmiri winter embroidered crushed velvet pheran",
  },
];

export default function RichLegacy() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Smooth scroll tracking: image and story content seamlessly transition
  // at the exact same static position as the user scrolls through the section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      if (progress < 0.5) {
        setActiveStep(0);
      } else {
        setActiveStep(1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const current = stories[activeStep];

  return (
    <section
      id="rich-legacy"
      ref={sectionRef}
      className="relative bg-white text-dark min-h-[170vh] py-16 lg:py-20"
    >
      {/* Sticky Content Viewport: Pins the section in place while scrolling */}
      <div className="sticky top-20 lg:top-24 max-w-[1500px] mx-auto px-6 lg:px-10 h-[calc(100vh-5.5rem)] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center">
          {/* Left Column: Full-Height Clean Image (No badges, No bottom text/texture) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[540px] h-[520px] md:h-[620px] lg:h-[680px] xl:h-[720px] overflow-hidden bg-cream shadow-xl">
              {stories.map((s, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === activeStep
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    priority={idx === 0}
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Ultra-Minimal Content (Title, Subtitle, CTA buttons) */}
          <div className="lg:col-span-6 flex flex-col justify-center max-w-xl">
            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-dark leading-[1.15] mb-6 transition-all duration-500">
              {current.title}
            </h3>

            <p className="text-[15px] lg:text-[16px] leading-relaxed text-dark/80 font-light mb-8 transition-all duration-500">
              {current.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#pherans"
                className="inline-block bg-dark text-ivory text-[10.5px] tracking-[0.25em] uppercase px-8 py-3.5 hover:bg-dark-soft transition-colors shadow-sm"
              >
                View Kashmiri Pherans →
              </Link>
              <a
                href={`https://wa.me/917889766195?text=${encodeURIComponent(
                  "Hello Bespoke Luxurrele, I would like to enquire about your handcrafted Kashmiri velvet pherans."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-dark text-dark text-[10.5px] tracking-[0.25em] uppercase px-7 py-3.5 hover:bg-dark hover:text-ivory transition-colors"
              >
                Enquire with Artisan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
