"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
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
  const freeShippingThreshold = 10000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = async (e: React.FormEvent) => {
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
    } catch (err) {
      setCouponError("Could not validate coupon. Please try again.");
    } finally {
      setCouponLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal-deep/70 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-charcoal border-l border-gold/30 text-ivory flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-ivory/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-ultra-wide text-gold">Exclusive Selection</span>
              <h2 className="font-serif text-xl tracking-wide text-ivory">SHOPPING BAG ({items.length})</h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-ivory/60 hover:text-gold transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-charcoal-dark px-6 py-3 border-b border-ivory/10">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-ivory/80">
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-gold font-medium">✓ You have unlocked Complimentary Delivery</span>
                ) : (
                  <span>Add ৳{remainingForFree.toLocaleString()} more for Complimentary Delivery</span>
                )}
              </span>
              <span className="text-gold font-semibold">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-charcoal h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gold h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-ivory/10">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-4 border border-gold/30 flex items-center justify-center text-gold">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg text-ivory">Your bag is currently empty</h3>
                <p className="text-xs text-ivory/60 mt-1 max-w-xs mx-auto">
                  Explore our collection of commanding wrist timepieces and elevate your presence.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-6 inline-block bg-gold hover:bg-gold-hover text-charcoal px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  DISCOVER TIMEPIECES
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.variantId} className="pt-4 first:pt-0 flex gap-4">
                  <div className="w-20 h-20 bg-charcoal-dark border border-gold/20 flex-shrink-0 relative overflow-hidden">
                    <Image
                      src={item.image || "/images/arvano-icon.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm text-ivory truncate">{item.name}</h4>
                    <p className="text-xs text-gold/80 mt-0.5 truncate">{item.variantName}</p>
                    <div className="text-[11px] text-ivory/40 font-mono mt-0.5">SKU: {item.sku}</div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-ivory/20 bg-charcoal-dark">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-1 text-ivory/70 hover:text-gold transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-medium text-ivory">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="p-1 text-ivory/70 hover:text-gold transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-semibold text-gold">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </div>
                        {item.regularPrice > item.price && (
                          <div className="text-[11px] text-ivory/40 line-through">
                            ৳{(item.regularPrice * item.quantity).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="text-ivory/40 hover:text-red-400 self-start p-1 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="border-t border-ivory/10 p-6 bg-charcoal-dark space-y-4">
              {/* Coupon Form */}
              {couponCode ? (
                <div className="flex items-center justify-between bg-gold/10 border border-gold/30 px-3 py-2 text-xs">
                  <div className="flex items-center gap-2 text-gold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{couponCode}</strong> applied (-৳{discountAmount.toLocaleString()})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-ivory/60 hover:text-gold text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Enter Coupon (e.g. ARVANO10)"
                    className="flex-1 bg-charcoal border border-ivory/20 px-3 py-2 text-xs text-ivory uppercase placeholder:normal-case placeholder:text-ivory/40 focus:border-gold focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={couponLoading}
                    className="bg-charcoal border border-gold text-gold hover:bg-gold hover:text-charcoal px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {couponLoading ? "..." : "Apply"}
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-400">{couponError}</p>}

              {/* Summary */}
              <div className="space-y-1.5 text-xs text-ivory/70 border-t border-ivory/10 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-ivory">৳{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-gold">
                    <span>Discount</span>
                    <span>-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span>
                    {subtotal >= freeShippingThreshold ? (
                      <span className="text-gold">COMPLIMENTARY</span>
                    ) : (
                      "Calculated at checkout"
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif text-ivory pt-2 border-t border-ivory/10">
                  <span>Grand Total</span>
                  <span className="text-gold font-bold">৳{getTotal().toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-charcoal py-3.5 text-xs font-bold uppercase tracking-luxury transition-all shadow-gold-glow"
                >
                  PROCEED TO SECURE CHECKOUT
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full text-center text-xs text-ivory/60 hover:text-gold uppercase tracking-wider py-1.5 transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
