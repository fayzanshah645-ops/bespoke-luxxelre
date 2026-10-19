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
    <section id="latest-collection" className="py-20 lg:py-28 bg-ivory">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-3">
            ✦ The Atelier Edit ✦
          </p>
          <h2 className="font-display text-[30px] leading-tight text-dark title-underline">
            Our Latest Collection
          </h2>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7">
          {products.map((p, i) => (
            <div key={i} className="group">
              <Link href="#" className="block relative aspect-[3/4] overflow-hidden bg-cream">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                {p.badge && (
                  <span className="absolute top-3 left-3 z-10 bg-ivory text-dark text-[9px] tracking-[0.25em] uppercase px-2.5 py-1">
                    {p.badge}
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="block bg-ivory text-dark text-center text-[10px] tracking-[0.3em] uppercase py-3">
                    Choose Options
                  </span>
                </div>
              </Link>
              <div className="pt-4 text-center">
                <h3 className="font-display text-[15px] lg:text-base text-dark leading-snug px-1">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] text-muted tracking-wide">{p.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="#"
            className="inline-block border border-dark text-dark text-[11px] tracking-[0.3em] uppercase px-10 py-4 hover:bg-dark hover:text-ivory transition-colors"
          >
            View all →
          </Link>
        </div>
      </div>
    </section>
  );
}
