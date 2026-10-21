"use client";

import Link from "next/link";
import Image from "next/image";

import craftImg from "../legacy-craft.jpg";
import packagingImg from "../initiative-packaging.jpg";

export default function CraftRevival() {
  return (
    <section id="craft-revival" className="py-14 sm:py-20 lg:py-28 bg-cream">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-2.5">
            ✦ Preserving Kashmiri Heritage ✦
          </p>
          <h2 className="font-display text-[30px] leading-tight text-dark title-underline">
            Craft Revival Initiatives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {/* Card 1 — The Pure Tilla Guild */}
          <Link
            href="/collections/pherans"
            className="group relative block aspect-[4/3] sm:aspect-[4/3] md:aspect-[5/4] overflow-hidden bg-dark shadow-md"
          >
            <Image
              src={craftImg}
              alt="The Pure Tilla Guild"
              fill
              className="object-cover zoom-on-hover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute inset-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-end text-ivory">
              <p className="text-[9.5px] sm:text-[10px] tracking-[0.35em] uppercase text-ivory/80 mb-2">
                ◈ Initiative 01
              </p>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl mb-2.5">
                The Pure Tilla Guild
              </h3>
              <p className="text-[13px] leading-relaxed max-w-md text-ivory/90 mb-5 font-light">
                Reviving the endangered art of hand-couched metallic silver tilla on crushed silk velvet, sustaining 5th-generation master craft families across Kashmir.
              </p>
              <span className="inline-block self-start border-b border-ivory text-[10px] tracking-[0.3em] uppercase pb-1 group-hover:border-ivory/60 transition-colors">
                Explore The Needlework →
              </span>
            </div>
          </Link>

          {/* Card 2 — From Atelier to Heirloom (Packaging & Trousseau Care) */}
          <Link
            href="/collections/bridal"
            className="group relative block aspect-[4/3] md:aspect-[5/4] overflow-hidden bg-dark shadow-md"
          >
            <Image
              src={packagingImg}
              alt="From Atelier to Heirloom"
              fill
              className="object-cover object-center zoom-on-hover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end text-ivory">
              <p className="text-[10px] tracking-[0.35em] uppercase text-ivory/80 mb-2">
                ◈ Initiative 02
              </p>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl mb-2.5">
                From Atelier to Heirloom
              </h3>
              <p className="text-[13px] leading-relaxed max-w-md text-ivory/90 mb-5 font-light">
                Each bespoke velvet pheran is hand-folded and sealed in archival protective packaging with our signature atelier seal, preserving delicate tilla needlework for generations.
              </p>
              <span className="inline-block self-start border-b border-ivory text-[10px] tracking-[0.3em] uppercase pb-1 group-hover:border-ivory/60 transition-colors">
                Order Bespoke Pheran →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
