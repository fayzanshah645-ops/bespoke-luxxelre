"use client";

import Link from "next/link";
import Image from "next/image";

import post1 from "../product1.jpg";
import post2 from "../pheran1.jpg";
import post3 from "../product4.jpg";
import post4 from "../pheran2.jpg";

type InstagramPost = {
  img: typeof post1;
  alt: string;
  title: string;
};

const posts: InstagramPost[] = [
  {
    img: post1,
    alt: "Silver Zari Handcrafted Anarkali Suit",
    title: "Silver Zari Anarkali",
  },
  {
    img: post2,
    alt: "Mocha Velvet Kashmiri Tilla Pheran",
    title: "Mocha Tilla Pheran",
  },
  {
    img: post3,
    alt: "Magenta Zari Royal Bridal Suit",
    title: "Magenta Zari Bridal",
  },
  {
    img: post4,
    alt: "Onyx Noir Aari Velvet Kashmiri Pheran",
    title: "Onyx Noir Pheran",
  },
];

export default function Instagram() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-ivory">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-2.5">
            ✦ Follow The Atelier ✦
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark mb-3 sm:mb-4">
            @bespoke_luxurelle
          </h2>
          <Link
            href="https://www.instagram.com/bespoke_luxurelle/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[11px] tracking-[0.3em] uppercase border-b border-dark pb-0.5 hover:text-muted hover:border-muted transition-colors"
          >
            Follow on Instagram →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
          {posts.map((post, i) => (
            <a
              key={i}
              href="https://www.instagram.com/bespoke_luxurelle/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${post.title} on Instagram`}
              className="group relative block aspect-square overflow-hidden bg-cream"
            >
              <Image
                src={post.img}
                alt={post.alt}
                fill
                className="object-cover object-top zoom-on-hover"
              />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/55 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <p className="text-ivory font-display text-sm tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {post.title}
                </p>
                <span className="mt-1 text-[9px] tracking-[0.25em] uppercase text-ivory/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View on Instagram →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
