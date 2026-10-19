"use client";

import Link from "next/link";
import Image from "next/image";
import pheran1 from "../pheran1.jpg";
import pheran2 from "../pheran2.jpg";
import pheran3 from "../pheran3.jpg";
import pheran4 from "../pheran4.jpg";

type PheranItem = {
  title: string;
  fabric: string;
  price: string;
  img: typeof pheran1;
  badge?: string;
};

const pherans: PheranItem[] = [
  {
    title: "Mocha Velvet Tilla Pheran",
    fabric: "Crushed Velvet · Antique Silver Tilla",
    price: "₹ 5,200",
    img: pheran1,
    badge: "Bestseller",
  },
  {
    title: "Onyx Noir Aari Velvet Pheran",
    fabric: "Midnight Silk Velvet · Floral Aari Work",
    price: "₹ 5,800",
    img: pheran2,
    badge: "New",
  },
  {
    title: "Silver Mist Velvet Pheran",
    fabric: "Ice Blue Velvet · Keyhole Zardozi",
    price: "₹ 5,400",
    img: pheran3,
  },
  {
    title: "Royal Plum Gold Tilla Pheran",
    fabric: "Deep Plum Velvet · Kashmiri Gold Tilla",
    price: "₹ 6,200",
    img: pheran4,
    badge: "Atelier Edit",
  },
];

export default function Celebrities() {
  return (
    <section id="pherans" className="py-20 lg:py-28 bg-ivory">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-3">
            ✦ Handcrafted Heritage ✦
          </p>
          <h2 className="font-display text-[30px] leading-tight text-dark title-underline">
            Elegant Kashmiri Pherans
          </h2>
          <p className="mt-4 text-[13px] md:text-[14px] text-muted tracking-wide font-light max-w-xl mx-auto">
            Traditional Kashmiri silhouettes crafted in rich crushed velvet and fine silk, embellished with master artisan tilla and aari needlework.
          </p>
        </div>

        {/* Pherans 4-column Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7">
          {pherans.map((p, i) => (
            <div key={i} className="group">
              <Link href="#appointment" className="block relative aspect-[3/4] overflow-hidden bg-cream">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                {p.badge && (
                  <span className="absolute top-3 left-3 z-10 bg-ivory text-dark text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 shadow-sm">
                    {p.badge}
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="block bg-ivory text-dark text-center text-[10px] tracking-[0.3em] uppercase py-3 shadow-md">
                    Choose Options
                  </span>
                </div>
              </Link>
              <div className="pt-4 text-center">
                <h3 className="font-display text-[15px] lg:text-base text-dark leading-snug px-1">
                  {p.title}
                </h3>
                <p className="mt-1 text-[11px] text-muted/80 tracking-wider uppercase">
                  {p.fabric}
                </p>
                <p className="mt-2 text-[13px] text-dark font-medium tracking-wide">
                  {p.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="#appointment"
            className="inline-block border border-dark text-dark text-[11px] tracking-[0.3em] uppercase px-10 py-4 hover:bg-dark hover:text-ivory transition-colors"
          >
            Explore All Pherans →
          </Link>
        </div>
      </div>
    </section>
  );
}
