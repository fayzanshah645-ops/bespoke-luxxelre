"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type OrderItem = {
  id: string;
  title: string;
  size: string;
  quantity: number;
  price: number;
  image?: string;
};

type TrackedOrder = {
  order_number: string;
  status: string;
  customer_name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  country: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  cod_fee: number;
  discount: number;
  total: number;
  payment_method: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

const STEPS = [
  { key: "placed", label: "Commission Placed", desc: "Order recorded in atelier records" },
  { key: "confirmed", label: "Measurement Confirmed", desc: "Tailoring notes verified by master karigar" },
  { key: "in_atelier", label: "In Atelier Crafting", desc: "Hand-embroidery & finishing in progress" },
  { key: "dispatched", label: "Dispatched", desc: "Shipped via insured pan-India air courier" },
  { key: "delivered", label: "Delivered", desc: "Safely arrived with patron" },
];

export default function TrackOrderClient() {
  const searchParams = useSearchParams();
  const initialOrder = searchParams.get("order") || "";
  const initialEmail = searchParams.get("email") || "";

  const [orderNumber, setOrderNumber] = useState(initialOrder);
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<TrackedOrder | null>(null);

  const fetchOrder = async (ord: string, eml: string) => {
    if (!ord.trim() || !eml.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/orders/${encodeURIComponent(ord.trim().toUpperCase())}?email=${encodeURIComponent(
          eml.trim().toLowerCase()
        )}`
      );
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data?.error || "No order found matching that reference and email.");
        setOrder(null);
      } else {
        setOrder(data.order);
      }
    } catch {
      setError("Unable to connect to the atelier server. Please check your network.");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrder && initialEmail) {
      fetchOrder(initialOrder, initialEmail);
    }
  }, [initialOrder, initialEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(orderNumber, email);
  };

  const getStepIndex = (status: string) => {
    switch (status) {
      case "placed": return 0;
      case "confirmed": return 1;
      case "in_atelier": return 2;
      case "dispatched": return 3;
      case "delivered": return 4;
      default: return 0;
    }
  };

  const currentStepIdx = order ? getStepIndex(order.status) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Search Form */}
      <div className="bg-[#FAF8F5] border border-border p-6 sm:p-8 mb-10 shadow-xs">
        <h2 className="font-display text-xl sm:text-2xl text-dark mb-2">
          Track Your Atelier Commission
        </h2>
        <p className="text-xs text-muted font-light mb-6">
          Enter the order number (e.g. <strong>BL-00001</strong>) and the e-mail address provided at checkout.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-muted mb-1">
              Order Number *
            </label>
            <input
              type="text"
              required
              placeholder="BL-00001"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full text-sm p-3 border border-border bg-white focus:border-dark outline-none font-mono transition"
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-muted mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm p-3 border border-border bg-white focus:border-dark outline-none transition"
            />
          </div>

          <div className="sm:col-span-2 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-dark text-ivory py-3.5 text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-dark-soft transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? "Locating Commission in Atelier..." : "Track Status →"}
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-4 p-3.5 bg-[#F6E2E0] border border-[#E7C4C0] text-[#8C3A33] text-xs">
            {error}
          </p>
        )}
      </div>

      {/* Order Status Display */}
      {order && (
        <div className="bg-white border border-border shadow-sm p-6 sm:p-10 space-y-8">
          {/* Top Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-1">
                ✦ Commission Status
              </p>
              <h3 className="font-display text-2xl sm:text-3xl text-dark">
                {order.order_number}
              </h3>
              <p className="text-xs text-muted mt-1 font-light">
                Commissioned on {new Date(order.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="sm:text-right">
              <span className="inline-block px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase font-medium border border-dark bg-[#FAF8F5] text-dark">
                {order.status.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-muted mb-6">
              Atelier Progress
            </h4>
            <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-5 relative">
              {STEPS.map((step, idx) => {
                const isPassed = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;
                return (
                  <div key={step.key} className="flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-3 sm:gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 transition-colors ${
                        isCurrent
                          ? "bg-dark text-ivory ring-4 ring-neutral-200"
                          : isPassed
                          ? "bg-emerald-700 text-ivory"
                          : "bg-neutral-100 text-muted border border-border"
                      }`}
                    >
                      {isPassed ? "✓" : idx + 1}
                    </div>
                    <div>
                      <p className={`text-xs font-medium ${isCurrent ? "text-dark font-bold" : "text-dark/80"}`}>
                        {step.label}
                      </p>
                      <p className="text-[10.5px] text-muted font-light leading-snug mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Items in Order */}
          <div className="pt-6 border-t border-border">
            <h4 className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
              Commission Items ({order.items?.length || 0})
            </h4>
            <div className="divide-y divide-border">
              {order.items?.map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-center gap-4">
                  {item.image && (
                    <div className="relative w-14 h-18 overflow-hidden bg-cream shrink-0 border border-border">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover object-top"
                        sizes="56px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm text-dark line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted font-light mt-0.5">
                      Size: {item.size} • Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-dark font-display">
                      ₹{Number(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Concierge Support */}
          <div className="pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-muted font-light">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-dark font-medium mb-1.5">
                Delivery Destination
              </p>
              <p className="text-dark/90 leading-relaxed">
                {order.customer_name}<br />
                {order.address_line1} {order.address_line2 ? `, ${order.address_line2}` : ""}<br />
                {order.city}, {order.state} — {order.pincode}
              </p>
              <p className="mt-2 text-dark font-medium">
                Phone: {order.phone}
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-4 border border-border space-y-2">
              <p className="text-[10px] tracking-[0.2em] uppercase text-dark font-medium">
                Need Atelier Assistance?
              </p>
              <p className="leading-relaxed">
                For custom alterations or urgent dispatch timelines, chat with our Master Tailor.
              </p>
              <a
                href={`https://wa.me/917889766195?text=Hello%20Bespoke%20Luxurrele%2C%20I%20am%20inquiring%20about%20my%20order%20${order.order_number}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-emerald-800 font-medium text-[11px] tracking-wider uppercase pt-1 hover:underline"
              >
                Chat on WhatsApp Concierge →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
