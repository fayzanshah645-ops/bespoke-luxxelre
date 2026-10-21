"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product, Category } from "../../lib/products";

export default function CollectionGrid({
  initialProducts,
  categories,
  activeCategorySlug,
}: {
  initialProducts: Product[];
  categories: Category[];
  activeCategorySlug: string;
}) {
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "title">("featured");

  const sortedProducts = [...initialProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className="space-y-10">
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-border text-[11px] uppercase tracking-widest">
        <Link
          href="/collections"
          className={`px-4 py-2 whitespace-nowrap transition-colors ${
            activeCategorySlug === "all"
              ? "text-dark font-medium border-b-2 border-dark"
              : "text-muted hover:text-dark"
          }`}
        >
          All Collections
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/collections/${cat.slug}`}
            className={`px-4 py-2 whitespace-nowrap transition-colors ${
              activeCategorySlug === cat.slug
                ? "text-dark font-medium border-b-2 border-dark"
                : "text-muted hover:text-dark"
            }`}
          >
            {cat.title}
          </Link>
        ))}
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 text-xs tracking-wider uppercase text-muted">
        <div>
          <span>Showing {sortedProducts.length} Heirloom {sortedProducts.length === 1 ? "Piece" : "Pieces"}</span>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort-select" className="text-[10px] tracking-[0.2em] uppercase">
            Sort By:
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-dark border border-border px-3 py-1.5 pr-8 text-xs outline-none focus:border-dark uppercase cursor-pointer"
            >
              <option value="featured">Featured Atelier</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid (2 cols mobile, 3 tablet, 4 desktop) */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#FAF8F5] border border-border">
          <p className="font-display text-2xl text-dark mb-2">No Pieces Found</p>
          <p className="text-xs text-muted mb-6">
            New commissions are being woven in the atelier. Please explore another collection.
          </p>
          <Link
            href="/collections"
            className="inline-block bg-dark text-ivory text-[10.5px] tracking-[0.25em] uppercase px-8 py-3.5 hover:bg-dark-soft transition-colors"
          >
            Browse All Collections →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
          {sortedProducts.map((p) => (
            <div key={p.id} className="group flex flex-col">
              {/* Image card with hover actions */}
              <Link
                href={`/products/${p.slug}`}
                className="relative aspect-[3/4] overflow-hidden bg-cream shadow-xs block"
              >
                <Image
                  src={p.images[0]}
                  alt={p.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Second image preview on hover if available */}
                {p.images[1] && (
                  <Image
                    src={p.images[1]}
                    alt={`${p.title} alternate`}
                    fill
                    className="object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                )}

                {/* Badge */}
                {p.badge && (
                  <span className="absolute top-2.5 left-2.5 z-10 bg-ivory/95 backdrop-blur-xs text-dark text-[8.5px] sm:text-[9px] tracking-[0.22em] uppercase px-2.5 py-1 shadow-xs border border-border/40">
                    {p.badge}
                  </span>
                )}

                {/* Hover CTA: Choose Options (Tul Palav pattern) */}
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="block bg-ivory/95 backdrop-blur-xs text-dark text-center text-[10px] tracking-[0.25em] uppercase py-3 border border-dark/10 shadow-sm font-medium">
                    Choose Options →
                  </span>
                </div>
              </Link>

              {/* Product Info */}
              <div className="pt-3.5 text-center flex-1 flex flex-col justify-between">
                <div>
                  <Link href={`/products/${p.slug}`}>
                    <h3 className="font-display text-[14px] sm:text-[15px] lg:text-base text-dark hover:text-gold transition-colors leading-snug line-clamp-2 px-1">
                      {p.title}
                    </h3>
                  </Link>
                  <p className="mt-1 text-[11px] text-muted tracking-wider uppercase font-light">
                    {p.details.fabric}
                  </p>
                </div>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-[13px] sm:text-[14px] text-dark font-medium font-display">
                    ₹{p.price.toLocaleString("en-IN")}
                  </span>
                  {p.comparePrice && (
                    <span className="text-[12px] text-muted line-through font-light">
                      ₹{p.comparePrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
