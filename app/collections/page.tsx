import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getCategories, getProducts } from "../lib/products";
import CollectionGrid from "./[category]/CollectionGrid";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsApp from "../components/WhatsApp";

export const metadata: Metadata = {
  title: "Atelier Collections — Bespoke Luxurrele",
  description:
    "Explore our complete range of Kashmiri couture: bespoke bridal lehengas, velvet and tilla pherans, celebratory shararas, and silk anarkalis.",
};

const CATEGORY_FEATURE_IMAGES: Record<string, string> = {
  bridal: "/hero.jpg",
  pherans: "/pheran1.jpg",
  festive: "/hero1.jpg",
  anarkalis: "/product1.jpg",
  "new-arrivals": "/pheran4.jpg",
};

export default function AllCollectionsPage() {
  const categories = getCategories();
  const allProducts = getProducts();

  return (
    <>
      <Header />
      <main id="main" className="pt-24 sm:pt-28 lg:pt-32 pb-24 bg-white">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 text-[11px] tracking-[0.2em] uppercase text-muted flex items-center gap-2 font-light"
          >
            <Link href="/" className="hover:text-dark transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-dark font-medium">Collections</span>
          </nav>

          {/* Editorial Master Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-2.5">
              ✦ The Kashmiri Haute Couture Archives ✦
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-dark title-underline mb-4">
              All Atelier Collections
            </h1>
            <p className="text-[13px] sm:text-[14px] text-muted font-light leading-relaxed max-w-2xl mx-auto pt-2">
              Every creation is a dialogue between master karigars of the Kashmir Valley and timeless regal aesthetics. Discover our bespoke silhouettes.
            </p>
          </div>

          {/* Featured Category Banners (Tul Palav editorial collection tiles) */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-5 mb-16">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/collections/${cat.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-cream flex flex-col justify-end p-4 shadow-xs"
              >
                <Image
                  src={CATEGORY_FEATURE_IMAGES[cat.slug] || "/hero1.jpg"}
                  alt={cat.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-95"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative z-10 text-white text-center">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-gold mb-1">
                    Couture Line
                  </p>
                  <h3 className="font-display text-base sm:text-lg tracking-wide text-ivory">
                    {cat.title}
                  </h3>
                  <span className="inline-block mt-2 text-[9px] tracking-[0.25em] uppercase border-b border-ivory/60 pb-0.5 text-ivory/90 group-hover:border-ivory">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* All Products Grid with Category Filter & Sorting */}
          <div className="pt-8 border-t border-border">
            <div className="mb-8">
              <h2 className="font-display text-2xl text-dark">
                Complete Atelier Catalogue
              </h2>
              <p className="text-xs text-muted font-light mt-1">
                Browse our current seasonal commissions and ready-to-dispatch bespoke pieces.
              </p>
            </div>

            <CollectionGrid
              initialProducts={allProducts}
              categories={categories}
              activeCategorySlug="all"
            />
          </div>
        </div>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
