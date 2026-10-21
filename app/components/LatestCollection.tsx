"use client";

import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "../lib/products";

export default function LatestCollection() {
  const products = getFeaturedProducts().slice(0, 4);

  return (
    <section id="latest-collection" className="relative z-10 py-14 sm:py-20 lg:py-28 bg-ivory">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-2.5">
            ✦ The Atelier Edit ✦
          </p>
          <h2 className="font-display text-[30px] leading-tight text-dark title-underline">
            Our Latest Collection
          </h2>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-7">
          {products.map((p) => (
            <div key={p.id} className="group">
              <Link
                href={`/products/${p.slug}`}
                className="block relative aspect-[3/4] overflow-hidden bg-cream shadow-xs"
              >
                <Image
                  src={p.images[0]}
                  alt={p.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                />
                {p.badge && (
                  <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 bg-ivory text-dark text-[8.5px] sm:text-[9px] tracking-[0.25em] uppercase px-2 sm:px-2.5 py-1 shadow-xs border border-border/40">
                    {p.badge}
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="block bg-ivory/95 backdrop-blur-xs text-dark text-center text-[10px] tracking-[0.3em] uppercase py-3 border border-dark/10 shadow-sm font-medium">
                    Choose Options →
                  </span>
                </div>
              </Link>
              <div className="pt-3.5 text-center">
                <Link href={`/products/${p.slug}`}>
                  <h3 className="font-display text-[14px] sm:text-[15px] lg:text-base text-dark hover:text-gold transition-colors leading-snug px-1 line-clamp-1">
                    {p.title}
                  </h3>
                </Link>
                <p className="mt-1.5 text-[12.5px] sm:text-[13px] text-muted tracking-wide font-light font-display">
                  ₹{p.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA Button */}
        <div className="relative z-20 text-center mt-10 sm:mt-14">
          <Link
            href="/collections"
            className="inline-block w-full max-w-[260px] sm:w-auto border border-dark text-dark text-[11px] tracking-[0.28em] uppercase px-10 py-3.5 sm:py-4 bg-transparent hover:bg-dark hover:text-ivory transition-colors shadow-xs"
          >
            View All Collections →
          </Link>
        </div>
      </div>
    </section>
  );
}
