"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../lib/cart";

const SHIPPING_THRESHOLD = 25000;

export default function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCart();

  // Form states
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Jammu & Kashmir",
    pincode: "",
    country: "India",
    notes: "",
    shippingMethod: "standard",
    paymentMethod: "razorpay",
  });

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState("");

  // Calculations
  const discountAmount = promoApplied ? Math.round(totalPrice * 0.1) : 0;
  const isFreeShipping = totalPrice >= SHIPPING_THRESHOLD || formData.shippingMethod === "standard" && totalPrice >= SHIPPING_THRESHOLD;
  
  const shippingFee =
    formData.shippingMethod === "express"
      ? 1200
      : isFreeShipping
      ? 0
      : 500;

  const codFee = formData.paymentMethod === "cod" ? 250 : 0;
  const grandTotal = Math.max(0, totalPrice - discountAmount + shippingFee + codFee);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "ATELIER10" || promoCode.trim().toUpperCase() === "LUXURRELE") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try 'ATELIER10' for 10% privilege discount.");
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      customer: {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
      },
      address: {
        line1: formData.address.trim(),
        line2: formData.apartment.trim() || undefined,
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        country: formData.country.trim(),
      },
      items: items.map((item) => ({
        id: item.product.id,
        title: item.product.title,
        slug: item.product.slug,
        price: item.product.price,
        size: item.size,
        quantity: item.quantity,
        image: item.product.images?.[0],
      })),
      totals: {
        subtotal: totalPrice,
        shipping: shippingFee,
        codFee,
        discount: discountAmount,
        total: grandTotal,
      },
      paymentMethod: formData.paymentMethod,
      notes: formData.notes.trim() || undefined,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setSubmitError(
          data?.error || "We could not register your order. Please try again."
        );
        setIsSubmitting(false);
        return;
      }

      setOrderComplete(data.order.orderNumber);
      clearCart();
    } catch {
      setSubmitError(
        "We could not reach the atelier right now. Please check your connection and try again, or message us on WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // If order is completed, show luxurious Confirmation view
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#FCFAF8] pt-16 pb-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center bg-white p-8 sm:p-12 shadow-sm border border-border">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-6">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p className="text-[10px] tracking-[0.35em] uppercase text-muted mb-2">
            ✦ Commission Confirmed ✦
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-dark mb-3">
            Thank You for Your Patronage
          </h1>
          <p className="text-sm text-muted font-light max-w-md mx-auto leading-relaxed mb-6">
            Your bespoke commission has been registered with our Srinagar atelier. Our master concierge will contact you via WhatsApp / Phone at <strong>{formData.phone || "your phone"}</strong> to review custom sizing measurements.
          </p>

          <div className="bg-[#FAF8F5] p-5 border border-border text-left my-8 space-y-2.5 text-xs">
            <div className="flex justify-between border-b border-border/60 pb-2">
              <span className="text-muted uppercase tracking-wider">Order Reference:</span>
              <span className="font-mono font-medium text-dark">{orderComplete}</span>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-2">
              <span className="text-muted uppercase tracking-wider">Client:</span>
              <span className="text-dark font-medium">{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-2">
              <span className="text-muted uppercase tracking-wider">Payment Method:</span>
              <span className="text-dark font-medium">
                {formData.paymentMethod === "cod" ? "Cash on Delivery" : "UPI / Bank Transfer on Confirmation"}
              </span>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-2">
              <span className="text-muted uppercase tracking-wider">Estimated Dispatch:</span>
              <span className="text-dark">3–4 weeks (Artisanal Crafting)</span>
            </div>
            <div className="flex justify-between pt-1 font-medium text-sm">
              <span className="text-dark">Total Amount:</span>
              <span className="font-display text-base text-dark">₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={`https://wa.me/917889766195?text=Hello%20Bespoke%20Luxurrele%2C%20I%20have%20placed%20order%20${orderComplete}%20for%20₹${grandTotal.toLocaleString("en-IN")}.%20Kindly%20confirm%20commission%20details.`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-emerald-800 text-ivory text-[11px] tracking-[0.25em] uppercase py-3.5 hover:bg-emerald-900 transition-colors"
            >
              Confirm on WhatsApp Atelier →
            </a>
            <Link
              href={`/track?order=${orderComplete}&email=${encodeURIComponent(formData.email)}`}
              className="block w-full border border-dark text-dark text-[11px] tracking-[0.25em] uppercase py-3.5 hover:bg-dark hover:text-ivory transition-colors"
            >
              Track Order Status Online →
            </Link>
            <Link
              href="/"
              className="block w-full text-center text-xs text-muted hover:text-dark py-2 transition-colors uppercase tracking-wider"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty, redirect user back to shop
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-24 px-4 text-center">
        <div className="max-w-md mx-auto py-16">
          <div className="w-16 h-16 rounded-full bg-[#FAF8F5] flex items-center justify-center mx-auto mb-4 text-muted">
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
          <h1 className="font-display text-3xl text-dark mb-2">
            Your Atelier Bag is Empty
          </h1>
          <p className="text-xs text-muted mb-8 font-light">
            Please add an item to your bag before proceeding to checkout.
          </p>
          <Link
            href="/collections"
            className="inline-block bg-dark text-ivory text-[11px] tracking-[0.28em] uppercase px-8 py-4 hover:bg-dark-soft transition-colors"
          >
            Explore Collections →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Simple Luxury Header */}
      <header className="border-b border-border py-6 px-4 sm:px-8 bg-white sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="font-display text-xl sm:text-2xl text-dark tracking-wide">
              Bespoke Luxurrele
            </span>
            <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-light">
              Checkout
            </span>
          </Link>
          <Link
            href="/collections"
            className="text-[11px] tracking-[0.2em] uppercase text-muted hover:text-dark transition-colors"
          >
            Return to Store
          </Link>
        </div>
      </header>

      {/* 2-Column Shopify/Tul Palav Checkout Experience */}
      <main className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]">
        {/* Left Column: Form Details (7 cols) */}
        <div className="lg:col-span-7 px-4 sm:px-8 lg:px-12 py-10 lg:border-r border-border">
          <form onSubmit={handleSubmitOrder} className="max-w-xl mx-auto lg:mr-0 space-y-10">
            {/* Express Checkout Header */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted mb-2">
                Express Payment Options
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: "razorpay" }))}
                  className="py-3 px-2 border border-border hover:border-dark text-center text-xs font-medium uppercase tracking-wider bg-[#FAF8F5] transition-colors"
                >
                  Direct UPI / QR
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: "razorpay" }))}
                  className="py-3 px-2 border border-border hover:border-dark text-center text-xs font-medium uppercase tracking-wider bg-[#FAF8F5] transition-colors"
                >
                  Bank Transfer
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: "cod" }))}
                  className="py-3 px-2 border border-border hover:border-dark text-center text-xs font-medium uppercase tracking-wider bg-[#FAF8F5] transition-colors"
                >
                  Cash on Delivery
                </button>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-border w-full" />
              <span className="bg-white px-3 text-[10px] uppercase tracking-widest text-muted absolute">
                Or Continue With Details
              </span>
            </div>

            {/* 1. Contact Info */}
            <div className="space-y-4">
              <h2 className="font-display text-xl text-dark">
                1. Contact Information
              </h2>
              <div>
                <label className="block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5 font-light">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="client@couture.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full text-sm p-3.5 border border-border focus:border-dark outline-none bg-white transition"
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5 font-light">
                  WhatsApp / Phone (for delivery &amp; custom sizing updates) *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-border bg-[#FAF8F5] text-xs text-dark font-medium">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="78897 66195"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full text-sm p-3.5 border border-border focus:border-dark outline-none bg-white transition"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="space-y-4">
              <h2 className="font-display text-xl text-dark">
                2. Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5 font-light">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full text-sm p-3.5 border border-border focus:border-dark outline-none bg-white transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5 font-light">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full text-sm p-3.5 border border-border focus:border-dark outline-none bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5 font-light">
                  House / Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Apartment, suite, or house number"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full text-sm p-3.5 border border-border focus:border-dark outline-none bg-white transition"
                />
              </div>

              <div>
                <label className="block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5 font-light">
                  Landmark / Sector (Optional)
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="w-full text-sm p-3.5 border border-border focus:border-dark outline-none bg-white transition"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5 font-light">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full text-sm p-3.5 border border-border focus:border-dark outline-none bg-white transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5 font-light">
                    State / UT *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full text-sm p-3.5 border border-border focus:border-dark outline-none bg-white transition"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5 font-light">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    placeholder="190001"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full text-sm p-3.5 border border-border focus:border-dark outline-none bg-white transition"
                  />
                </div>
              </div>
            </div>

            {/* 3. Shipping Method */}
            <div className="space-y-4">
              <h2 className="font-display text-xl text-dark">
                3. Delivery Preference
              </h2>
              <div className="space-y-2.5">
                <label
                  className={`flex items-center justify-between p-4 border cursor-pointer transition ${
                    formData.shippingMethod === "standard"
                      ? "border-dark bg-[#FAF8F5]"
                      : "border-border hover:border-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === "standard"}
                      onChange={handleInputChange}
                      className="accent-dark"
                    />
                    <div>
                      <span className="text-xs font-medium text-dark block">
                        Insured Standard Atelier Dispatch (7–10 days post craft)
                      </span>
                      <span className="text-[11px] text-muted font-light">
                        {isFreeShipping
                          ? "✦ Free for orders above ₹25,000"
                          : "Pan-India trackable courier"}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-dark">
                    {isFreeShipping ? "FREE" : "₹500"}
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between p-4 border cursor-pointer transition ${
                    formData.shippingMethod === "express"
                      ? "border-dark bg-[#FAF8F5]"
                      : "border-border hover:border-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === "express"}
                      onChange={handleInputChange}
                      className="accent-dark"
                    />
                    <div>
                      <span className="text-xs font-medium text-dark block">
                        Priority Air Courier (3–5 days post craft)
                      </span>
                      <span className="text-[11px] text-muted font-light">
                        Direct flight dispatch with dedicated concierge tracking
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-dark">₹1,200</span>
                </label>
              </div>
            </div>

            {/* 4. Payment Selection */}
            <div className="space-y-4">
              <h2 className="font-display text-xl text-dark">
                4. Payment Method
              </h2>
              <div className="space-y-2.5">
                <label
                  className={`flex items-start justify-between p-4 border cursor-pointer transition ${
                    formData.paymentMethod === "razorpay"
                      ? "border-dark bg-[#FAF8F5]"
                      : "border-border hover:border-muted"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={formData.paymentMethod === "razorpay"}
                      onChange={handleInputChange}
                      className="accent-dark mt-1"
                    />
                    <div>
                      <span className="text-xs font-medium text-dark block">
                        Direct UPI &amp; Online Transfer (Recommended)
                      </span>
                      <span className="text-[11px] text-muted font-light block">
                        Google Pay, PhonePe, Paytm, or Net Banking. Official atelier invoice &amp; UPI QR provided upon order confirmation.
                      </span>
                      <div className="mt-2 flex items-center gap-2 text-[9px] uppercase tracking-wider text-muted">
                        <span className="border border-border px-1.5 py-0.5 bg-white">GPay</span>
                        <span className="border border-border px-1.5 py-0.5 bg-white">PhonePe</span>
                        <span className="border border-border px-1.5 py-0.5 bg-white">UPI QR</span>
                        <span className="border border-border px-1.5 py-0.5 bg-white">Net Banking</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-gold font-medium">
                    Recommended
                  </span>
                </label>

                <label
                  className={`flex items-start justify-between p-4 border cursor-pointer transition ${
                    formData.paymentMethod === "cod"
                      ? "border-dark bg-[#FAF8F5]"
                      : "border-border hover:border-muted"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                      className="accent-dark mt-1"
                    />
                    <div>
                      <span className="text-xs font-medium text-dark block">
                        Cash on Delivery (Eligible Orders)
                      </span>
                      <span className="text-[11px] text-muted font-light">
                        Pay upon doorstep arrival. Note: A nominal ₹250 handling surcharge applies for COD security.
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-muted">+₹250</span>
                </label>
              </div>
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5 font-light">
                Special Tailoring / Gift Note (Optional)
              </label>
              <textarea
                name="notes"
                rows={2}
                placeholder="Specific sleeves length, bust measurements, or gift card message..."
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full text-xs p-3 border border-border focus:border-dark outline-none bg-white transition"
              />
            </div>

            {/* Submit Order Button */}
            <div className="pt-4">
              {submitError && (
                <p className="mb-4 border border-[#E7C4C0] bg-[#F6E2E0] px-4 py-3 text-[12.5px] leading-relaxed text-[#8C3A33]">
                  {submitError}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-dark text-ivory py-4 text-[11.5px] tracking-[0.28em] uppercase font-medium hover:bg-dark-soft transition-all shadow-md active:scale-[0.99] disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting
                  ? "Securing Atelier Commission..."
                  : `Complete Order — ₹${grandTotal.toLocaleString("en-IN")}`}
              </button>
              <p className="text-[10.5px] text-center text-muted mt-3 font-light">
                By placing your commission, you agree to Bespoke Luxurrele Terms of Service and Heritage Craft Guarantee.
              </p>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary (5 cols, sticky) */}
        <div className="lg:col-span-5 bg-[#FAF8F5] px-4 sm:px-8 lg:px-10 py-10 border-t lg:border-t-0 border-border">
          <div className="max-w-md mx-auto lg:ml-0 sticky top-28 space-y-6">
            <h2 className="font-display text-xl text-dark pb-3 border-b border-border/80">
              Order Review ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>

            {/* Line Items */}
            <div className="divide-y divide-border/60 max-h-[380px] overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="py-3.5 flex gap-3.5 items-center">
                  <div className="relative w-16 h-20 shrink-0 overflow-hidden bg-white border border-border">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-cover object-top"
                      sizes="64px"
                    />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-dark text-ivory text-[9.5px] rounded-full flex items-center justify-center font-medium">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-[13.5px] text-dark leading-snug line-clamp-1">
                      {item.product.title}
                    </h3>
                    <p className="text-[10.5px] text-muted uppercase tracking-wider mt-0.5">
                      Size: {item.size}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-display text-sm font-medium text-dark">
                      ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Discount code (e.g. ATELIER10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 text-xs uppercase tracking-wider p-2.5 border border-border bg-white outline-none focus:border-dark"
                />
                <button
                  type="submit"
                  className="bg-dark text-ivory text-[10px] tracking-[0.2em] uppercase px-4 py-2.5 hover:bg-dark-soft transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-emerald-700 text-xs mt-1.5 font-light">
                  ✦ Atelier privilege discount applied (-10%)
                </p>
              )}
              {promoError && (
                <p className="text-red-700 text-xs mt-1.5 font-light">
                  {promoError}
                </p>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-2.5 pt-4 border-t border-border/80 text-xs font-light">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="text-dark font-medium font-display text-sm">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-emerald-800">
                  <span>Privilege Discount</span>
                  <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-800 font-medium">FREE</span>
                  ) : (
                    `₹${shippingFee.toLocaleString("en-IN")}`
                  )}
                </span>
              </div>

              {codFee > 0 && (
                <div className="flex justify-between text-muted">
                  <span>COD Handling</span>
                  <span>₹{codFee}</span>
                </div>
              )}

              <div className="flex justify-between text-dark pt-3 border-t border-border text-base font-medium">
                <span className="font-display">Total</span>
                <div className="text-right">
                  <span className="font-display text-lg">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                  <span className="block text-[10px] text-muted font-normal uppercase tracking-wider">
                    Including all taxes
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="bg-white p-4 border border-border/80 space-y-2 text-[11px] text-muted font-light">
              <div className="flex items-center gap-2 text-dark font-medium">
                <span>✦</span>
                <span>Direct Srinagar Atelier Craftsmanship</span>
              </div>
              <p>
                Each piece is handmade with authentic silk zari and natural fabrics by our master karigars in the Kashmir Valley.
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-muted border-t border-border/60">
                <span>Secure SSL 256-Bit</span>
                <span>Insured Transit</span>
                <span>Alteration Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
