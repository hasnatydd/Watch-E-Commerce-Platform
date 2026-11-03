"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { useCartStore } from "@/store/cart-store";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from "lucide-react";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTotal,
    discountAmount,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const subtotal = getSubtotal();
  const freeThreshold = 10000;
  const isFree = subtotal >= freeThreshold;

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;

    setCouponLoading(true);
    setCouponError("");

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: inputCoupon, subtotal }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCouponError(data.error || "Invalid coupon.");
      } else {
        applyCoupon(data.code, data.discountAmount);
        setInputCoupon("");
      }
    } catch {
      setCouponError("Could not validate coupon.");
    } finally {
      setCouponLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      <div className="bg-charcoal-dark border-b border-ivory/10 py-10 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl text-ivory tracking-tight">
          SHOPPING BAG
        </h1>
        <p className="text-xs text-ivory/60 mt-1 uppercase tracking-wider">
          Review your timepieces prior to checkout
        </p>
      </div>

      <div className="bg-ivory text-primaryText flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="py-24 text-center max-w-md mx-auto">
              <ShieldCheck className="w-12 h-12 text-gold-dark mx-auto mb-4" />
              <h2 className="font-serif text-2xl text-primaryText">Your shopping bag is empty</h2>
              <p className="text-xs text-secondaryText mt-2">
                Discover our exceptional timepieces engineered for commanding presence.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-block bg-charcoal text-gold px-8 py-3.5 text-xs font-bold uppercase tracking-luxury hover:bg-gold hover:text-charcoal transition-colors"
              >
                EXPLORE COLLECTION
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Items List */}
              <div className="lg:col-span-8 bg-white border border-ivory-border p-6 shadow-sm divide-y divide-ivory-border">
                {items.map((item) => (
                  <div key={item.variantId} className="py-6 first:pt-0 last:pb-0 flex gap-5">
                    <div className="w-24 h-24 bg-charcoal-dark relative flex-shrink-0 border border-ivory-border">
                      <Image
                        src={item.image || "/images/arvano-icon.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif text-lg text-primaryText font-medium">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gold-dark font-medium">{item.variantName}</p>
                          <p className="text-[11px] text-secondaryText font-mono mt-0.5">
                            SKU: {item.sku}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-secondaryText hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-ivory-border">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="px-2.5 py-1 text-secondaryText hover:text-primaryText"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-primaryText">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="px-2.5 py-1 text-secondaryText hover:text-primaryText"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-base font-semibold text-primaryText">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </div>
                          {item.regularPrice > item.price && (
                            <div className="text-xs text-secondaryText line-through">
                              ৳{(item.regularPrice * item.quantity).toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Column */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white border border-ivory-border p-6 shadow-sm space-y-4">
                  <h3 className="font-serif text-lg text-primaryText uppercase tracking-wide border-b border-ivory-border pb-3">
                    Order Summary
                  </h3>

                  {/* Coupon */}
                  {couponCode ? (
                    <div className="flex items-center justify-between bg-gold/15 border border-gold/40 p-2.5 text-xs text-charcoal">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-4 h-4 text-gold-dark" />
                        <span>Coupon <strong>{couponCode}</strong> applied</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-red-600 hover:underline text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApply} className="flex gap-2">
                      <input
                        type="text"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        placeholder="Coupon Code"
                        className="flex-1 bg-ivory border border-ivory-border px-3 py-2 text-xs uppercase"
                      />
                      <button
                        type="submit"
                        disabled={couponLoading}
                        className="bg-charcoal text-gold px-4 py-2 text-xs font-semibold uppercase hover:bg-gold hover:text-charcoal transition-colors disabled:opacity-50"
                      >
                        {couponLoading ? "..." : "Apply"}
                      </button>
                    </form>
                  )}
                  {couponError && <p className="text-xs text-red-500">{couponError}</p>}

                  <div className="space-y-2 text-xs text-secondaryText pt-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-primaryText">
                        ৳{subtotal.toLocaleString()}
                      </span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-gold-dark font-medium">
                        <span>Discount</span>
                        <span>-৳{discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery Charge</span>
                      <span>
                        {isFree ? (
                          <span className="text-green-700 font-medium">COMPLIMENTARY</span>
                        ) : (
                          "Calculated at Checkout"
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-serif font-bold text-primaryText border-t border-ivory-border pt-3">
                      <span>Estimated Total</span>
                      <span className="text-gold-dark">৳{getTotal().toLocaleString()}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full flex items-center justify-center gap-2 bg-charcoal hover:bg-gold text-ivory hover:text-charcoal py-4 text-xs font-bold uppercase tracking-luxury transition-all shadow-md"
                  >
                    PROCEED TO CHECKOUT
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
