"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "../../lib/products";
import { useCart } from "../../lib/cart";
import SizeGuideModal from "../../components/SizeGuideModal";

export default function ProductDetail({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const router = useRouter();
  const { addItem, openCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(
    product.variants[0]?.size || "M"
  );
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  // Accordion states
  const [openSection, setOpenSection] = useState<string>("description");

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? "" : section));
  };

  const handleAddToCart = () => {
    addItem(product, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
    openCart();
  };

  const handleBuyNow = () => {
    addItem(product, selectedSize, quantity);
    router.push("/checkout");
  };

  return (
    <>
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      <div className="pt-24 sm:pt-28 lg:pt-32 pb-20 bg-white">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 sm:mb-8 text-[11px] tracking-[0.2em] uppercase text-muted flex items-center flex-wrap gap-2 font-light"
          >
            <Link href="/" className="hover:text-dark transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/collections"
              className="hover:text-dark transition-colors"
            >
              Collections
            </Link>
            <span>/</span>
            <Link
              href={`/collections/${product.category}`}
              className="hover:text-dark transition-colors capitalize"
            >
              {product.category.replace("-", " ")}
            </Link>
            <span>/</span>
            <span className="text-dark font-medium truncate max-w-[200px] sm:max-w-none">
              {product.title}
            </span>
          </nav>

          {/* Main 2-Column Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left: Product Images Gallery (7 cols on desktop) */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 lg:gap-5 sticky top-28">
              {/* Thumbnails strip */}
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-18 sm:w-20 aspect-[3/4] overflow-hidden border transition-all ${
                      selectedImage === img
                        ? "border-dark ring-1 ring-dark"
                        : "border-border hover:border-muted opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} view ${idx + 1}`}
                      fill
                      className="object-cover object-top"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>

              {/* Main Display Image */}
              <div className="relative flex-1 aspect-[3/4] overflow-hidden bg-cream shadow-xs group">
                <Image
                  src={selectedImage}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />

                {product.badge && (
                  <span className="absolute top-4 left-4 z-10 bg-ivory/95 backdrop-blur-xs text-dark text-[9px] tracking-[0.25em] uppercase px-3 py-1.5 shadow-xs border border-border/40">
                    {product.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Product Purchase Details & Accordions (5 cols on desktop) */}
            <div className="lg:col-span-5 space-y-6 lg:pl-4">
              {/* Category & Title */}
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase text-muted mb-2 font-sans">
                  ✦ Kashmiri Haute Couture ✦
                </p>
                <h1 className="font-display text-2xl sm:text-3xl lg:text-[34px] leading-tight text-dark">
                  {product.title}
                </h1>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-3 border-b border-border/80">
                <span className="font-display text-2xl sm:text-3xl text-dark font-medium">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.comparePrice && (
                  <span className="text-sm text-muted line-through font-light">
                    ₹{product.comparePrice.toLocaleString("en-IN")}
                  </span>
                )}
                <span className="text-[11px] text-muted tracking-wide uppercase font-light">
                  (Incl. of all taxes)
                </span>
              </div>

              {/* Artisan & Made-to-Order Assurance Notice (Tul Palav style) */}
              <div className="bg-[#FAF8F5] p-4 border-l-2 border-gold flex items-start gap-3">
                <span className="text-gold text-base mt-0.5">✦</span>
                <div className="text-xs text-dark/90 leading-relaxed font-light">
                  <p className="font-medium text-dark uppercase tracking-wider text-[10px] mb-0.5">
                    Artisanal Commission
                  </p>
                  Handcrafted by master Kashmiri artisans. Production commences
                  immediately once your bespoke order is confirmed. Estimated dispatch:{" "}
                  <strong>{product.details.deliveryTime}</strong>.
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-[0.2em] uppercase text-dark font-medium">
                    Select Silhouette Size:{" "}
                    <span className="font-normal text-muted">{selectedSize}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-[10.5px] tracking-[0.2em] uppercase text-muted hover:text-dark underline underline-offset-4 transition-colors"
                  >
                    View Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => (
                    <button
                      key={v.size}
                      type="button"
                      disabled={!v.inStock}
                      onClick={() => setSelectedSize(v.size)}
                      className={`min-w-[48px] px-4 py-2.5 text-xs tracking-wider uppercase font-medium border transition-all ${
                        selectedSize === v.size
                          ? "border-dark bg-dark text-ivory"
                          : v.inStock
                          ? "border-border bg-white text-dark hover:border-dark"
                          : "border-border/50 bg-neutral-100 text-muted line-through cursor-not-allowed"
                      }`}
                    >
                      {v.size}
                    </button>
                  ))}
                  {/* Custom Sizing Pill */}
                  <button
                    type="button"
                    onClick={() => setSelectedSize("Custom Bespoke")}
                    className={`px-4 py-2.5 text-xs tracking-wider uppercase font-medium border transition-all ${
                      selectedSize === "Custom Bespoke"
                        ? "border-dark bg-dark text-ivory"
                        : "border-gold/60 text-gold hover:border-gold hover:bg-gold/5"
                    }`}
                  >
                    ✦ Bespoke Measurement
                  </button>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs tracking-[0.2em] uppercase text-dark font-medium">
                  Quantity:
                </span>
                <div className="flex items-center border border-border">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-xs text-dark hover:bg-neutral-100 transition-colors"
                    aria-label="Decrease"
                  >
                    –
                  </button>
                  <span className="px-4 py-1.5 text-xs font-medium text-dark min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-xs text-dark hover:bg-neutral-100 transition-colors"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Primary Call-to-Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-dark text-ivory py-4 text-[11px] tracking-[0.28em] uppercase font-medium hover:bg-dark-soft transition-all shadow-sm active:scale-[0.99]"
                >
                  {addedNotice ? "✓ Added to Bag" : "Add to Atelier Bag"}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full border border-dark text-dark py-4 text-[11px] tracking-[0.28em] uppercase font-medium hover:bg-dark hover:text-ivory transition-all active:scale-[0.99]"
                >
                  Buy It Now →
                </button>
              </div>

              {/* Direct Atelier WhatsApp Consultation Prompt (Tul Palav signature pattern) */}
              <div className="pt-2 text-center">
                <a
                  href={`https://wa.me/917889766195?text=Hello%20Bespoke%20Luxurrele%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(
                    product.title
                  )}%20(₹${product.price}).%20Can%20you%20assist%20with%20customisation%20or%20delivery%20timelines%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-dark hover:text-emerald-700 transition-colors font-light"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Need help with customisation? Chat with design team →</span>
                </a>
              </div>

              {/* Collapsible Accordion Tabs (Tul Palav style) */}
              <div className="pt-6 border-t border-border divide-y divide-border">
                {/* 1. Description */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleSection("description")}
                    className="w-full py-4 flex items-center justify-between text-left text-xs tracking-[0.2em] uppercase font-medium text-dark hover:text-gold transition-colors"
                  >
                    <span>Garment Narrative &amp; Craft</span>
                    <span>{openSection === "description" ? "−" : "+"}</span>
                  </button>
                  {openSection === "description" && (
                    <div className="pb-5 text-[13px] text-muted leading-relaxed font-light">
                      <p>{product.description}</p>
                    </div>
                  )}
                </div>

                {/* 2. What's Included & Specifications */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleSection("specs")}
                    className="w-full py-4 flex items-center justify-between text-left text-xs tracking-[0.2em] uppercase font-medium text-dark hover:text-gold transition-colors"
                  >
                    <span>Ensemble Inclusions &amp; Fabric</span>
                    <span>{openSection === "specs" ? "−" : "+"}</span>
                  </button>
                  {openSection === "specs" && (
                    <div className="pb-5 text-[13px] text-muted space-y-2 font-light">
                      <div>
                        <strong className="text-dark font-medium">Includes:</strong>{" "}
                        {product.details.includes.join(", ")}
                      </div>
                      <div>
                        <strong className="text-dark font-medium">Fabric:</strong>{" "}
                        {product.details.fabric}
                      </div>
                      <div>
                        <strong className="text-dark font-medium">Hues:</strong>{" "}
                        {product.details.color}
                      </div>
                      <div>
                        <strong className="text-dark font-medium">
                          Craft Technique:
                        </strong>{" "}
                        Authentic Hand needle-embroidery (Tilla / Sozni)
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Care Guide */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleSection("care")}
                    className="w-full py-4 flex items-center justify-between text-left text-xs tracking-[0.2em] uppercase font-medium text-dark hover:text-gold transition-colors"
                  >
                    <span>Care &amp; Zari Preservation</span>
                    <span>{openSection === "care" ? "−" : "+"}</span>
                  </button>
                  {openSection === "care" && (
                    <div className="pb-5 text-[13px] text-muted space-y-1.5 font-light">
                      <p>{product.details.care}</p>
                      <p className="text-[12px] text-muted/80">
                        Never spray fragrance directly onto precious metal tilla
                        or silk zari. Wrap in breathable unbleached muslin when
                        storing across seasons.
                      </p>
                    </div>
                  )}
                </div>

                {/* 4. Shipping & Returns */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleSection("shipping")}
                    className="w-full py-4 flex items-center justify-between text-left text-xs tracking-[0.2em] uppercase font-medium text-dark hover:text-gold transition-colors"
                  >
                    <span>Complimentary Shipping &amp; Returns</span>
                    <span>{openSection === "shipping" ? "−" : "+"}</span>
                  </button>
                  {openSection === "shipping" && (
                    <div className="pb-5 text-[13px] text-muted space-y-2 font-light">
                      <p>
                        ✦ Complimentary insured courier delivery on all orders
                        above ₹25,000 within India.
                      </p>
                      <p>
                        ✦ Worldwide delivery through DHL Express (customs clearance
                        and international tracking provided).
                      </p>
                      <p>
                        ✦ Because our couture garments are custom made by artisans,
                        we offer size alteration support and exchanges within 7
                        days of delivery.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related / "You May Also Cherish" Section */}
          {relatedProducts.length > 0 && (
            <section className="mt-24 pt-16 border-t border-border">
              <div className="text-center mb-10">
                <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-2">
                  ✦ Curated Atelier Recommendations ✦
                </p>
                <h2 className="font-display text-2xl sm:text-3xl text-dark title-underline">
                  You May Also Cherish
                </h2>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7">
                {relatedProducts.map((rel) => (
                  <div key={rel.id} className="group">
                    <Link
                      href={`/products/${rel.slug}`}
                      className="block relative aspect-[3/4] overflow-hidden bg-cream shadow-xs"
                    >
                      <Image
                        src={rel.images[0]}
                        alt={rel.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      {rel.badge && (
                        <span className="absolute top-2.5 left-2.5 bg-ivory text-dark text-[8.5px] tracking-[0.25em] uppercase px-2 py-1">
                          {rel.badge}
                        </span>
                      )}
                    </Link>
                    <div className="pt-3.5 text-center">
                      <Link href={`/products/${rel.slug}`}>
                        <h3 className="font-display text-[14px] sm:text-[15px] text-dark hover:text-gold transition-colors line-clamp-1">
                          {rel.title}
                        </h3>
                      </Link>
                      <p className="mt-1 text-[12.5px] text-muted tracking-wide font-light">
                        ₹{rel.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
