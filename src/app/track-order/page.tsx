"use client";

import React, { useState } from "react";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { Search, Package, Clock, CheckCircle, Truck, AlertCircle, Loader2 } from "lucide-react";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      setError("Please enter your Order Reference (e.g. ARV-20261101-1234).");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/track?orderNumber=${encodeURIComponent(orderNumber.trim())}&phone=${encodeURIComponent(phone.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.order) {
        setError(data.error || "No order found with these credentials.");
      } else {
        setOrder(data.order);
      }
    } catch {
      setError("Failed to track order. Please try again or contact concierge.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      <div className="bg-charcoal-dark border-b border-ivory/10 py-12 text-center">
        <span className="text-xs uppercase tracking-ultra-wide text-gold">DISPATCH & DELIVERY</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ivory tracking-tight mt-1">
          TRACK YOUR TIMEPIECE
        </h1>
        <p className="text-xs text-ivory/60 mt-1">
          Enter your order reference number and phone to inspect consignment status
        </p>
      </div>

      <div className="bg-ivory text-primaryText flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tracking Search Box */}
          <div className="bg-white border border-ivory-border p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleTrack} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                    Order Reference Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g. ARV-20261101-1234"
                    className="w-full bg-ivory border border-ivory-border px-3.5 py-2.5 text-xs text-primaryText focus:border-gold focus:outline-none uppercase font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                    Customer Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 017xxxxxxxx"
                    className="w-full bg-ivory border border-ivory-border px-3.5 py-2.5 text-xs text-primaryText focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-charcoal hover:bg-gold text-ivory hover:text-charcoal py-3 text-xs font-bold uppercase tracking-luxury transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin text-gold" /> : <Search className="w-4 h-4" />}
                <span>LOOKUP CONSIGNMENT STATUS</span>
              </button>
            </form>
          </div>

          {/* Results Box */}
          {order && (
            <div className="mt-8 bg-white border border-ivory-border p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-ivory-border gap-2">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-secondaryText">Order ID</span>
                  <div className="font-mono text-base font-bold text-primaryText">{order.orderNumber}</div>
                </div>
                <div className="sm:text-right">
                  <span className="text-[10px] uppercase tracking-wider text-secondaryText">Current Status</span>
                  <div>
                    <span className="inline-block bg-charcoal text-gold px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Stepper */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs pt-2">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-charcoal text-gold flex items-center justify-center mb-1">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-primaryText">Received</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    ["CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"].includes(order.orderStatus)
                      ? "bg-charcoal text-gold"
                      : "bg-ivory border border-ivory-border text-secondaryText"
                  }`}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-primaryText">Confirmed</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    ["SHIPPED", "DELIVERED"].includes(order.orderStatus)
                      ? "bg-charcoal text-gold"
                      : "bg-ivory border border-ivory-border text-secondaryText"
                  }`}>
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-primaryText">In Transit</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    order.orderStatus === "DELIVERED"
                      ? "bg-green-700 text-white"
                      : "bg-ivory border border-ivory-border text-secondaryText"
                  }`}>
                    <Package className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-primaryText">Delivered</span>
                </div>
              </div>

              {/* Delivery info */}
              <div className="bg-ivory p-4 border border-ivory-border text-xs space-y-1.5">
                <div className="font-semibold text-primaryText uppercase tracking-wider">
                  Destination Address
                </div>
                <p className="text-secondaryText">
                  {order.customerName} • {order.phone}
                </p>
                <p className="text-secondaryText">
                  {order.fullAddress}, {order.thana}, {order.district}, {order.division}
                </p>
                <p className="text-secondaryText pt-1 font-mono">
                  Payment Method: <strong>{order.paymentMethod}</strong> (Status: {order.paymentStatus})
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
