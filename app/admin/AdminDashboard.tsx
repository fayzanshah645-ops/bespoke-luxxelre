"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

type Order = {
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
  items: { id: string; title: string; size: string; quantity: number; price: number; image?: string }[];
  subtotal: number;
  shipping: number;
  cod_fee: number;
  discount: number;
  total: number;
  payment_method: string;
  notes: string | null;
  created_at: string;
};

const STATUSES = [
  "placed",
  "confirmed",
  "in_atelier",
  "dispatched",
  "delivered",
  "cancelled",
];

const STATUS_COLORS: Record<string, string> = {
  placed: "bg-[#EDE9E2] text-[#6B5D4F] border-[#D8CFC0]",
  confirmed: "bg-[#E3EDF7] text-[#2C5578] border-[#C3D6E8]",
  in_atelier: "bg-[#F6EBD8] text-[#7A5B21] border-[#E3D2AE]",
  dispatched: "bg-[#E6F0E7] text-[#2F6340] border-[#C4DDC7]",
  delivered: "bg-[#DDEEE4] text-[#1F5A3C] border-[#B4D8C0]",
  cancelled: "bg-[#F6E2E0] text-[#8C3A33] border-[#E7C4C0]",
};

const money = (n: number) => `₹${Number(n).toLocaleString("en-IN")}`;

export function AdminDashboard() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    const res = await fetch("/api/admin/orders", { cache: "no-store" });
    if (res.status === 401) {
      setUnlocked(false);
      return;
    }
    const data = await res.json();
    if (data.ok) setOrders(data.orders);
    else setUnlocked(false);
  }, []);

  useEffect(() => {
    loadOrders().then(() => setUnlocked((v) => (v === null ? false : v)));
  }, [loadOrders]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Could not sign in.");
        return;
      }
      setUnlocked(true);
      setPassword("");
      await loadOrders();
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderNumber: string, status: string) => {
    setUpdating(orderNumber);
    try {
      const res = await fetch(`/api/admin/orders/${orderNumber}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.ok) {
        setOrders((prev) =>
          prev.map((o) =>
            o.order_number === orderNumber ? { ...o, status } : o
          )
        );
      } else {
        setError(data.error || "Could not update the order.");
      }
    } catch {
      setError("Could not reach the server.");
    } finally {
      setUpdating(null);
    }
  };

  const shown = orders.filter((o) => filter === "all" || o.status === filter);
  const revenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + Number(o.total), 0);

  // ---- Lock screen --------------------------------------------------------
  if (unlocked === false) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm border border-border p-8 shadow-sm"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-2">
            Bespoke Luxurrele
          </p>
          <h1 className="font-display text-2xl text-dark mb-1">Order Desk</h1>
          <p className="text-[13px] text-muted font-light mb-7">
            Enter the atelier password to view incoming orders.
          </p>

          <label className="block text-[10px] tracking-[0.25em] uppercase text-muted mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-dark transition-colors"
            placeholder="••••••••••••"
          />

          {error && (
            <p className="mt-3 text-[12px] text-[#8C3A33]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-dark text-ivory text-[11px] tracking-[0.3em] uppercase py-3.5 hover:bg-dark-soft transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Unlock"}
          </button>

          <Link
            href="/"
            className="mt-5 block text-center text-[11px] tracking-[0.2em] uppercase text-muted hover:text-dark transition-colors"
          >
            ← Back to the storefront
          </Link>
        </form>
      </div>
    );
  }

  // ---- Loading state ------------------------------------------------------
  if (unlocked === null) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted">
          Loading…
        </p>
      </div>
    );
  }

  // ---- Dashboard ----------------------------------------------------------
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-border sticky top-0 bg-white z-30">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-1">
              Bespoke Luxurrele
            </p>
            <h1 className="font-display text-2xl text-dark">Order Desk</h1>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={loadOrders}
              className="text-[10px] tracking-[0.25em] uppercase text-muted hover:text-dark transition-colors"
            >
              Refresh
            </button>
            <Link
              href="/"
              className="text-[10px] tracking-[0.25em] uppercase text-muted hover:text-dark transition-colors"
            >
              Storefront →
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total Orders", value: String(orders.length) },
            {
              label: "Awaiting Action",
              value: String(
                orders.filter((o) => o.status === "placed").length
              ),
            },
            {
              label: "In Atelier",
              value: String(
                orders.filter((o) => o.status === "in_atelier").length
              ),
            },
            { label: "Order Value", value: money(revenue) },
          ].map((s) => (
            <div key={s.label} className="border border-border p-4">
              <p className="text-[9.5px] tracking-[0.25em] uppercase text-muted">
                {s.label}
              </p>
              <p className="font-display text-2xl text-dark mt-1.5">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {["all", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-[10px] tracking-[0.25em] uppercase px-4 py-2 border transition-colors ${
                filter === s
                  ? "bg-dark text-ivory border-dark"
                  : "border-border text-muted hover:text-dark"
              }`}
            >
              {s === "all" ? "All" : s.replace("_", " ")}
            </button>
          ))}
        </div>

        {error && (
          <p className="mb-4 border border-[#E7C4C0] bg-[#F6E2E0] px-4 py-3 text-[12px] text-[#8C3A33]">
            {error}
          </p>
        )}

        {shown.length === 0 ? (
          <div className="border border-border p-12 text-center">
            <p className="font-display text-xl text-dark mb-2">No orders yet</p>
            <p className="text-[13px] text-muted font-light">
              Orders placed on the storefront will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {shown.map((order) => (
              <article
                key={order.order_number}
                className="border border-border p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-border">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="font-display text-xl text-dark">
                        {order.order_number}
                      </h2>
                      <span
                        className={`text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 border ${
                          STATUS_COLORS[order.status] ||
                          "bg-cream text-muted border-border"
                        }`}
                      >
                        {order.status.replace("_", " ")}
                      </span>
                      {order.payment_method === "cod" && (
                        <span className="text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 border bg-[#F6EBD8] text-[#7A5B21] border-[#E3D2AE]">
                          Cash on Delivery
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-muted font-light mt-2">
                      {new Date(order.created_at).toLocaleString("en-IN", {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-display text-2xl text-dark">
                      {money(order.total)}
                    </p>
                    <p className="text-[11px] text-muted font-light mt-0.5">
                      {money(order.subtotal)} + {money(order.shipping)} ship
                      {Number(order.cod_fee) > 0 &&
                        ` + ${money(order.cod_fee)} COD`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                  {/* Items */}
                  <div className="lg:col-span-1">
                    <h3 className="text-[9.5px] tracking-[0.25em] uppercase text-muted mb-3">
                      Items
                    </h3>
                    <ul className="space-y-3">
                      {order.items.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          {item.image ? (
                            <div className="relative w-14 h-16 shrink-0 overflow-hidden bg-cream">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-16 shrink-0 bg-cream" />
                          )}
                          <div className="min-w-0">
                            <p className="text-[12.5px] text-dark leading-snug">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-muted font-light mt-0.5">
                              Size {item.size} · Qty {item.quantity}
                            </p>
                            <p className="text-[12px] text-dark mt-0.5">
                              {money(item.price * item.quantity)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Customer */}
                  <div>
                    <h3 className="text-[9.5px] tracking-[0.25em] uppercase text-muted mb-3">
                      Customer
                    </h3>
                    <p className="text-[13px] text-dark">{order.customer_name}</p>
                    <a
                      href={`mailto:${order.email}`}
                      className="text-[12.5px] text-muted font-light hover:text-dark block"
                    >
                      {order.email}
                    </a>
                    <a
                      href={`tel:${order.phone}`}
                      className="text-[12.5px] text-muted font-light hover:text-dark block"
                    >
                      {order.phone}
                    </a>
                    <a
                      href={`https://wa.me/${order.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] tracking-[0.2em] uppercase text-muted hover:text-dark inline-block mt-2"
                    >
                      WhatsApp →
                    </a>
                  </div>

                  {/* Delivery */}
                  <div>
                    <h3 className="text-[9.5px] tracking-[0.25em] uppercase text-muted mb-3">
                      Delivery
                    </h3>
                    <p className="text-[12.5px] text-dark font-light leading-relaxed">
                      {order.address_line1}
                      {order.address_line2 && (
                        <>
                          <br />
                          {order.address_line2}
                        </>
                      )}
                      <br />
                      {order.city}, {order.state} — {order.pincode}
                      <br />
                      {order.country}
                    </p>
                    {order.notes && (
                      <p className="text-[12px] text-muted font-light mt-3 italic">
                        “{order.notes}”
                      </p>
                    )}
                  </div>
                </div>

                {/* Status control */}
                <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center gap-2">
                  <span className="text-[9.5px] tracking-[0.25em] uppercase text-muted mr-2">
                    Update status
                  </span>
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      disabled={updating === order.order_number}
                      onClick={() => updateStatus(order.order_number, s)}
                      className={`text-[9.5px] tracking-[0.2em] uppercase px-3.5 py-1.5 border transition-colors disabled:opacity-40 ${
                        order.status === s
                          ? "bg-dark text-ivory border-dark"
                          : "border-border text-muted hover:border-dark hover:text-dark"
                      }`}
                    >
                      {s.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
