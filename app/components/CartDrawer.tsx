"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../lib/cart";

const FREE_SHIPPING_THRESHOLD = 25000;

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    isCartOpen,
    closeCart,
  } = useCart();

  const [orderNotes, setOrderNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);

  const amountNeededForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - totalPrice
  );
  const freeShippingProgress = Math.min(
    100,
    (totalPrice / FREE_SHIPPING_THRESHOLD) * 100
  );

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-500 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your Shopping Bag"
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[460px] bg-white text-dark shadow-2xl flex flex-col transition-transform duration-500 ease-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <h2 className="font-display text-xl tracking-wide uppercase">
              Your Atelier Bag
            </h2>
            <span className="text-xs text-muted font-sans font-light">
              ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-2 -mr-2 text-dark/70 hover:text-dark transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Complimentary Shipping Progress Banner */}
        <div className="bg-[#FAF8F5] px-6 py-3.5 border-b border-border/80">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider mb-2">
            {amountNeededForFreeShipping > 0 ? (
              <span className="text-muted">
                Add{" "}
                <strong className="text-dark font-medium">
                  ₹{amountNeededForFreeShipping.toLocaleString("en-IN")}
                </strong>{" "}
                more for complimentary shipping
              </span>
            ) : (
              <span className="text-emerald-800 font-medium flex items-center gap-1.5">
                <span>✦</span> You have unlocked complimentary delivery!
              </span>
            )}
            <span className="text-[10px] text-muted">
              {Math.round(freeShippingProgress)}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-[#EAE5DE] rounded-full overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-500 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-border">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] flex items-center justify-center mb-4 text-muted">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h3 className="font-display text-2xl text-dark mb-2">
                Your Bag is Empty
              </h3>
              <p className="text-xs text-muted max-w-xs leading-relaxed mb-6 font-light">
                Explore our signature Kashmiri pherans, bespoke bridal lehengas,
                and heirloom hand-embroidered ensembles.
              </p>
              <Link
                href="/collections"
                onClick={closeCart}
                className="inline-block bg-dark text-ivory text-[10.5px] tracking-[0.25em] uppercase px-8 py-3.5 hover:bg-dark-soft transition-colors"
              >
                Discover Collections →
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="py-4.5 flex gap-4 items-start"
              >
                {/* Thumbnail */}
                <Link
                  href={`/products/${item.product.slug}`}
                  onClick={closeCart}
                  className="relative w-20 h-26 shrink-0 overflow-hidden bg-cream border border-border/60"
                >
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.title}
                    fill
                    className="object-cover object-top"
                    sizes="80px"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${item.product.slug}`}
                        onClick={closeCart}
                        className="font-display text-[15px] leading-snug text-dark hover:text-gold transition-colors line-clamp-2"
                      >
                        {item.product.title}
                      </Link>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        aria-label="Remove item"
                        className="text-muted hover:text-red-700 transition-colors p-1"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-[11px] text-muted tracking-wider uppercase font-light">
                      <span>Size: {item.size}</span>
                      <span>•</span>
                      <span className="text-[10px] text-gold uppercase tracking-widest">
                        Handcrafted
                      </span>
                    </div>
                  </div>

                  <div className="mt-3.5 flex items-center justify-between">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        className="px-2.5 py-1 text-xs text-dark hover:bg-neutral-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        –
                      </button>
                      <span className="px-3 py-1 text-xs font-medium text-dark min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        className="px-2.5 py-1 text-xs text-dark hover:bg-neutral-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-[14px] font-medium text-dark font-display">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 bg-[#FCFAF8] space-y-4">
            {/* Custom Sizing / Order Notes Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setShowNotes(!showNotes)}
                className="text-[11px] tracking-[0.2em] uppercase text-muted hover:text-dark flex items-center justify-between w-full"
              >
                <span>Add Custom Measurements / Note</span>
                <span>{showNotes ? "−" : "+"}</span>
              </button>
              {showNotes && (
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Chest 36, Waist 30, Length 44 or gift message for recipient..."
                  rows={2}
                  className="mt-2 w-full text-xs p-2.5 bg-white border border-border focus:border-dark outline-none transition"
                />
              )}
            </div>

            {/* Subtotal */}
            <div className="space-y-1.5 pt-2 border-t border-border/70">
              <div className="flex items-center justify-between text-xs tracking-wider uppercase text-muted">
                <span>Subtotal</span>
                <span className="text-dark font-display text-base font-medium">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[11px] text-muted font-light">
                Taxes, shipping, and bespoke tailoring calculated at checkout.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full text-center bg-dark text-ivory py-4 text-[11px] tracking-[0.28em] uppercase font-medium hover:bg-dark-soft transition-colors shadow-sm"
              >
                Proceed to Checkout →
              </Link>

              <button
                type="button"
                onClick={closeCart}
                className="w-full text-center text-[10.5px] tracking-[0.22em] uppercase text-muted hover:text-dark py-2 transition-colors"
              >
                Continue Browsing Atelier
              </button>
            </div>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-3 pt-2 text-[9.5px] tracking-[0.2em] uppercase text-muted border-t border-border/50">
              <span>✦ Master Handcrafted</span>
              <span>•</span>
              <span>Srinagar Dispatch</span>
              <span>•</span>
              <span>Secure Checkout</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
