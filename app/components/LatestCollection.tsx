"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import product1 from "../product1.jpg";
import product2 from "../product2.jpg";
import product3 from "../product3.jpg";
import product4 from "../product4.jpg";

type Product = {
  title: string;
  price: string;
  img: typeof product1;
  badge?: string;
};

const products: Product[] = [
  {
    title: "Silver Zari Embroidered Anarkali Suit",
    price: "₹ 4,500",
    img: product1,
    badge: "New",
  },
  {
    title: "Golden Tilla Embroidered Anarkali with Dupatta",
    price: "₹ 5,800",
    img: product2,
  },
  {
    title: "Ivory Pearl-Embroidered Pheran Suit",
    price: "₹ 3,200",
    img: product3,
  },
  {
    title: "Magenta Zari Bridal Suit with Dupatta",
    price: "₹ 6,500",
    img: product4,
    badge: "Bestseller",
  },
];

export default function LatestCollection() {
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
          {products.map((p, i) => (
            <div key={i} className="group">
              <Link href="#" className="block relative aspect-[3/4] overflow-hidden bg-cream shadow-sm">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                {p.badge && (
                  <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 bg-ivory text-dark text-[8.5px] sm:text-[9px] tracking-[0.25em] uppercase px-2 sm:px-2.5 py-1">
                    {p.badge}
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="block bg-ivory text-dark text-center text-[10px] tracking-[0.3em] uppercase py-3">
                    Choose Options
                  </span>
                </div>
              </Link>
              <div className="pt-3.5 text-center">
                <h3 className="font-display text-[14px] sm:text-[15px] lg:text-base text-dark leading-snug px-1">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-[12.5px] sm:text-[13px] text-muted tracking-wide font-light">{p.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA Button — prominently visible on mobile and desktop */}
        <div className="relative z-20 text-center mt-10 sm:mt-14">
          <Link
            href="#latest-collection"
            className="inline-block w-full max-w-[260px] sm:w-auto border border-dark text-dark text-[11px] tracking-[0.28em] uppercase px-10 py-3.5 sm:py-4 bg-transparent hover:bg-dark hover:text-ivory transition-colors shadow-sm"
          >
            View all →
          </Link>
        </div>
      </div>
    </section>
  );
}
