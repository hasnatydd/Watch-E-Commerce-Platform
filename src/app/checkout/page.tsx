"use client";

import React, { useState, useEffect, useId } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CreditCard,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  Lock,
  Crown,
} from "lucide-react";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { useCartStore } from "@/store/cart-store";
import { BANGLADESH_LOCATIONS } from "@/lib/data/bangladesh-locations";

interface PaymentConfig {
  id: string;
  methodKey: string;
  displayName: string;
  accountNumber?: string | null;
  instructions: string;
  requiresTransactionId: boolean;
  requiresSenderNumber: boolean;
  minAdvanceFee?: number | null;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, discountAmount, couponCode, clearCart } = useCartStore();

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("Dhaka");
  const [selectedDistrict, setSelectedDistrict] = useState("Dhaka");
  const [selectedThana, setSelectedThana] = useState("Gulshan");
  const [fullAddress, setFullAddress] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  // Payment State
  const [paymentMethods, setPaymentMethods] = useState<PaymentConfig[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>("COD");
  const [transactionId, setTransactionId] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [copiedNumber, setCopiedNumber] = useState(false);

  // ARVANO Guild VIP Member State
  const [memberQuery, setMemberQuery] = useState("");
  const [verifiedMember, setVerifiedMember] = useState<{
    memberId: string;
    planName: string;
    discountPercentage: number;
    customerName: string;
  } | null>(null);
  const [memberLoading, setMemberLoading] = useState(false);
  const [memberMessage, setMemberMessage] = useState("");

  // Status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [idempotencyKey, setIdempotencyKey] = useState("");

  useEffect(() => {
    // Generate unique idempotency key
    setIdempotencyKey(`idemp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);

    // Fetch active payment methods from backend
    fetch("/api/payments/methods")
      .then((res) => res.json())
      .then((data) => {
        if (data.methods) {
          setPaymentMethods(data.methods);
          if (data.methods.length > 0) {
            setSelectedMethod(data.methods[0].methodKey);
          }
        }
      })
      .catch((e) => console.error("Failed to load payment methods:", e));
  }, []);

  // Cascading location filtering
  const currentDivisionObj = BANGLADESH_LOCATIONS.divisions.find(
    (d) => d.name.toLowerCase() === selectedDivision.toLowerCase()
  );
  const availableDistricts = currentDivisionObj ? currentDivisionObj.districts : [];
  const currentDistrictObj = availableDistricts.find(
    (dist) => dist.name.toLowerCase() === selectedDistrict.toLowerCase()
  );
  const availableThanas = currentDistrictObj ? currentDistrictObj.thanas : [];

  const handleDivisionChange = (divName: string) => {
    setSelectedDivision(divName);
    const divObj = BANGLADESH_LOCATIONS.divisions.find((d) => d.name === divName);
    if (divObj && divObj.districts.length > 0) {
      setSelectedDistrict(divObj.districts[0].name);
      setSelectedThana(divObj.districts[0].thanas[0] || "");
    }
  };

  const handleDistrictChange = (distName: string) => {
    setSelectedDistrict(distName);
    const distObj = availableDistricts.find((d) => d.name === distName);
    if (distObj && distObj.thanas.length > 0) {
      setSelectedThana(distObj.thanas[0]);
    }
  };

  // Calculations
  const subtotal = getSubtotal();
  const isInsideDhaka =
    selectedDivision.toLowerCase() === "dhaka" && selectedDistrict.toLowerCase() === "dhaka";
  const defaultDelivery = isInsideDhaka ? 80 : 150;
  const deliveryCharge = (subtotal >= 10000 || verifiedMember) ? 0 : defaultDelivery;
  const memberDiscountAmount = verifiedMember
    ? Math.round(subtotal * (verifiedMember.discountPercentage / 100))
    : 0;
  const totalDiscount = discountAmount + memberDiscountAmount;
  const grandTotal = Math.max(0, subtotal - totalDiscount + deliveryCharge);

  const activeConfig = paymentMethods.find((m) => m.methodKey === selectedMethod);

  const handleCopyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleApplyMemberDiscount = async () => {
    if (!memberQuery.trim()) return;
    setMemberLoading(true);
    setMemberMessage("");
    try {
      const res = await fetch(`/api/membership/verify?query=${encodeURIComponent(memberQuery.trim())}`);
      const data = await res.json();
      if (data.isMember && data.member) {
        setVerifiedMember({
          memberId: data.member.memberId,
          planName: data.member.planName,
          discountPercentage: data.discountPercentage,
          customerName: data.member.customerName,
        });
        setMemberMessage(`✓ ${data.member.planName} Verified! ${data.discountPercentage}% VIP Discount Applied.`);
      } else {
        setVerifiedMember(null);
        setMemberMessage("No active Guild Membership found. Check ID or mobile number.");
      }
    } catch {
      setMemberMessage("Verification failed. Please try again.");
    } finally {
      setMemberLoading(false);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!customerName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your active mobile phone number.");
      return;
    }
    if (!fullAddress.trim()) {
      setError("Please enter your detailed house/road delivery address.");
      return;
    }

    if (activeConfig?.requiresTransactionId && !transactionId.trim()) {
      setError(`Please provide the ${activeConfig.displayName} Transaction ID (TrxID).`);
      return;
    }

    if (items.length === 0) {
      setError("Your shopping bag is empty. Please select a timepiece.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        division: selectedDivision,
        district: selectedDistrict,
        thana: selectedThana,
        fullAddress: fullAddress.trim(),
        paymentMethod: selectedMethod,
        transactionId: transactionId.trim() || undefined,
        senderNumber: senderNumber.trim() || undefined,
        customerNotes: customerNotes.trim() || undefined,
        couponCode: couponCode || undefined,
        idempotencyKey,
        items: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          quantity: i.quantity,
        })),
      };

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit order. Please try again.");
      }

      clearCart();
      router.push(`/order-confirmation?orderNumber=${data.order.orderNumber}`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please contact concierge.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      {/* Title */}
      <div className="bg-charcoal-dark border-b border-ivory/10 py-10 text-center">
        <span className="text-[10px] uppercase tracking-ultra-wide text-gold flex items-center justify-center gap-1.5">
          <Lock className="w-3.5 h-3.5" /> SECURE SSL ENCRYPTED CHECKOUT
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ivory tracking-tight mt-1">
          CONFIRM YOUR HOROLOGICAL ORDER
        </h1>
      </div>

      <div className="bg-ivory text-primaryText flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="font-serif text-2xl text-primaryText">Your shopping bag is empty</h2>
              <Link
                href="/shop"
                className="mt-4 inline-block bg-charcoal text-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-wider"
              >
                Browse Timepieces
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmitOrder}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left 7 Columns: Delivery & Payment Details */}
                <div className="lg:col-span-7 space-y-8">
                  {/* Step 1: Customer Contact */}
                  <div className="bg-white border border-ivory-border p-6 shadow-sm">
                    <h3 className="font-serif text-lg text-primaryText uppercase tracking-wider border-b border-ivory-border pb-3 mb-5">
                      1. Customer Contact Details
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Asif Mahmud"
                          className="w-full bg-ivory border border-ivory-border px-3.5 py-2.5 text-xs text-primaryText focus:border-gold focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                            Mobile Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g. 01700-000000"
                            className="w-full bg-ivory border border-ivory-border px-3.5 py-2.5 text-xs text-primaryText focus:border-gold focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                            Email Address (Optional)
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="for invoice & dispatch updates"
                            className="w-full bg-ivory border border-ivory-border px-3.5 py-2.5 text-xs text-primaryText focus:border-gold focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Cascading Bangladesh Delivery Address */}
                  <div className="bg-white border border-ivory-border p-6 shadow-sm">
                    <h3 className="font-serif text-lg text-primaryText uppercase tracking-wider border-b border-ivory-border pb-3 mb-5">
                      2. Delivery Destination (Bangladesh)
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Division */}
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                            Division *
                          </label>
                          <select
                            value={selectedDivision}
                            onChange={(e) => handleDivisionChange(e.target.value)}
                            className="w-full bg-ivory border border-ivory-border px-3 py-2.5 text-xs text-primaryText focus:border-gold focus:outline-none"
                          >
                            {BANGLADESH_LOCATIONS.divisions.map((d) => (
                              <option key={d.name} value={d.name}>
                                {d.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* District */}
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                            District *
                          </label>
                          <select
                            value={selectedDistrict}
                            onChange={(e) => handleDistrictChange(e.target.value)}
                            className="w-full bg-ivory border border-ivory-border px-3 py-2.5 text-xs text-primaryText focus:border-gold focus:outline-none"
                          >
                            {availableDistricts.map((dist) => (
                              <option key={dist.name} value={dist.name}>
                                {dist.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Thana / Area */}
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                            Thana / Area *
                          </label>
                          <select
                            value={selectedThana}
                            onChange={(e) => setSelectedThana(e.target.value)}
                            className="w-full bg-ivory border border-ivory-border px-3 py-2.5 text-xs text-primaryText focus:border-gold focus:outline-none"
                          >
                            {availableThanas.map((th) => (
                              <option key={th} value={th}>
                                {th}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Full Address */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                          Full Street Address (House, Road, Block, Landmark) *
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={fullAddress}
                          onChange={(e) => setFullAddress(e.target.value)}
                          placeholder="e.g. House 45, Road 11, Block D, Banani, Dhaka"
                          className="w-full bg-ivory border border-ivory-border p-3 text-xs text-primaryText focus:border-gold focus:outline-none"
                        />
                      </div>

                      {/* Customer Order Notes */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                          Special Instructions / Delivery Notes
                        </label>
                        <input
                          type="text"
                          value={customerNotes}
                          onChange={(e) => setCustomerNotes(e.target.value)}
                          placeholder="e.g. Please call before arrival; deliver after 2 PM"
                          className="w-full bg-ivory border border-ivory-border px-3.5 py-2 text-xs text-primaryText focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Bangladesh Payment System */}
                  <div className="bg-white border border-ivory-border p-6 shadow-sm">
                    <h3 className="font-serif text-lg text-primaryText uppercase tracking-wider border-b border-ivory-border pb-3 mb-5">
                      3. Select Payment Method
                    </h3>

                    {/* Method Radio Options */}
                    <div className="space-y-3">
                      {paymentMethods.map((method) => {
                        const isSelected = selectedMethod === method.methodKey;
                        return (
                          <div
                            key={method.id}
                            onClick={() => setSelectedMethod(method.methodKey)}
                            className={`p-4 border cursor-pointer transition-all ${
                              isSelected
                                ? "border-gold bg-gold/10"
                                : "border-ivory-border hover:border-gold/40 bg-ivory/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="paymentOption"
                                  checked={isSelected}
                                  onChange={() => setSelectedMethod(method.methodKey)}
                                  className="accent-gold h-4 w-4"
                                />
                                <span className="text-xs font-bold uppercase tracking-wider text-primaryText">
                                  {method.displayName}
                                </span>
                              </div>
                              {method.methodKey === "COD" && (
                                <span className="text-[10px] bg-charcoal text-gold px-2 py-0.5">
                                  Cash on Delivery
                                </span>
                              )}
                            </div>

                            {/* Detailed Payment Instructions when Selected */}
                            {isSelected && (
                              <div className="mt-4 pt-4 border-t border-gold/30 text-xs text-secondaryText space-y-3">
                                {method.accountNumber && (
                                  <div className="bg-white border border-gold/40 p-3 flex items-center justify-between">
                                    <div>
                                      <span className="text-[10px] uppercase text-secondaryText block">
                                        Send Money Number
                                      </span>
                                      <span className="font-mono text-sm font-bold text-primaryText">
                                        {method.accountNumber}
                                      </span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCopyNumber(method.accountNumber || "");
                                      }}
                                      className="flex items-center gap-1 text-[11px] bg-charcoal text-gold px-2.5 py-1.5 hover:bg-gold hover:text-charcoal transition-colors font-medium"
                                    >
                                      {copiedNumber ? (
                                        <>
                                          <Check className="w-3.5 h-3.5 text-green-400" /> Copied
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3.5 h-3.5" /> Copy
                                        </>
                                      )}
                                    </button>
                                  </div>
                                )}

                                <p className="whitespace-pre-line text-xs leading-relaxed">
                                  {method.instructions}
                                </p>

                                {/* Inputs for Transaction ID & Sender Number */}
                                {method.requiresTransactionId && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    <div>
                                      <label className="block text-[11px] uppercase font-semibold text-primaryText mb-1">
                                        Transaction ID (TrxID) *
                                      </label>
                                      <input
                                        type="text"
                                        required
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        placeholder="e.g. 9J47KL82QA"
                                        className="w-full bg-white border border-gold/50 px-3 py-2 text-xs font-mono uppercase focus:border-gold focus:outline-none"
                                      />
                                    </div>

                                    {method.requiresSenderNumber && (
                                      <div>
                                        <label className="block text-[11px] uppercase font-semibold text-primaryText mb-1">
                                          Sender Mobile Number *
                                        </label>
                                        <input
                                          type="tel"
                                          required
                                          value={senderNumber}
                                          onChange={(e) => setSenderNumber(e.target.value)}
                                          placeholder="e.g. 017xxxxxxxx"
                                          className="w-full bg-white border border-gold/50 px-3 py-2 text-xs font-mono focus:border-gold focus:outline-none"
                                        />
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right 5 Columns: Order Summary & Place Order */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white border border-ivory-border p-6 shadow-sm space-y-5 sticky top-28">
                    <h3 className="font-serif text-lg text-primaryText uppercase tracking-wide border-b border-ivory-border pb-3">
                      Your Order ({items.length} items)
                    </h3>

                    {/* Miniature Item List */}
                    <div className="max-h-60 overflow-y-auto divide-y divide-ivory-border space-y-3">
                      {items.map((item) => (
                        <div key={item.variantId} className="pt-3 first:pt-0 flex gap-3">
                          <div className="w-14 h-14 bg-charcoal-dark relative flex-shrink-0 border border-ivory-border">
                            <Image
                              src={item.image || "/images/arvano-icon.jpg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-xs text-primaryText font-medium truncate">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-gold-dark truncate">{item.variantName}</p>
                            <div className="text-[11px] text-secondaryText">
                              Qty: {item.quantity} × ৳{item.price.toLocaleString()}
                            </div>
                          </div>
                          <div className="text-xs font-semibold text-primaryText self-center">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* VIP Guild Member Discount Input */}
                    <div className="border-t border-ivory-border pt-4">
                      <div className="bg-charcoal text-ivory p-3.5 border border-gold/40 shadow-sm space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 font-semibold text-gold">
                            <Crown className="w-4 h-4 text-gold" />
                            <span>ARVANO Guild VIP Discount</span>
                          </div>
                          {!verifiedMember && (
                            <Link
                              href="/membership"
                              target="_blank"
                              className="text-[10px] text-ivory/60 hover:text-gold uppercase tracking-wider"
                            >
                              Join Guild &rarr;
                            </Link>
                          )}
                        </div>

                        {!verifiedMember ? (
                          <div className="space-y-1.5">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Enter Member ID (ARV-VIP-XXXX) or Phone"
                                value={memberQuery}
                                onChange={(e) => setMemberQuery(e.target.value)}
                                className="flex-1 bg-charcoal-deep border border-ivory/20 px-2.5 py-1.5 text-xs text-ivory font-mono focus:border-gold outline-none"
                              />
                              <button
                                type="button"
                                onClick={handleApplyMemberDiscount}
                                disabled={memberLoading || !memberQuery.trim()}
                                className="bg-gold hover:bg-gold-hover text-charcoal px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider disabled:opacity-50 transition-colors whitespace-nowrap"
                              >
                                {memberLoading ? "Checking..." : "Apply"}
                              </button>
                            </div>
                            {memberMessage && (
                              <p className={`text-[11px] ${memberMessage.startsWith("✓") ? "text-green-400 font-semibold" : "text-amber-300"}`}>
                                {memberMessage}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center justify-between bg-gold/15 p-2 border border-gold/40 text-xs">
                            <div>
                              <div className="font-semibold text-gold flex items-center gap-1">
                                <Check className="w-3.5 h-3.5 text-green-400" />
                                <span>{verifiedMember.planName} ({verifiedMember.discountPercentage}% OFF)</span>
                              </div>
                              <div className="text-[10px] text-ivory/70 font-mono">
                                Member: {verifiedMember.customerName} ({verifiedMember.memberId})
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setVerifiedMember(null);
                                setMemberMessage("");
                              }}
                              className="text-[10px] text-red-400 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="border-t border-ivory-border pt-4 space-y-2 text-xs text-secondaryText">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="font-semibold text-primaryText">৳{subtotal.toLocaleString()}</span>
                      </div>

                      {memberDiscountAmount > 0 && verifiedMember && (
                        <div className="flex justify-between text-gold-dark font-bold bg-gold/10 p-1.5 border border-gold/30">
                          <span className="flex items-center gap-1 text-gold-dark">
                            <Crown className="w-3.5 h-3.5" />
                            <span>VIP Member Discount ({verifiedMember.discountPercentage}%)</span>
                          </span>
                          <span className="text-gold-dark">-৳{memberDiscountAmount.toLocaleString()}</span>
                        </div>
                      )}

                      {discountAmount > 0 && (
                        <div className="flex justify-between text-gold-dark font-medium">
                          <span>Coupon Discount ({couponCode})</span>
                          <span>-৳{discountAmount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>
                          Delivery Fee ({isInsideDhaka ? "Inside Dhaka" : "Outside Dhaka"})
                        </span>
                        <span className="font-semibold text-primaryText">
                          {(deliveryCharge === 0 || verifiedMember) ? (
                            <span className="text-green-700 font-bold">COMPLIMENTARY (VIP BENEFIT)</span>
                          ) : (
                            `৳${deliveryCharge}`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-base font-serif font-bold text-primaryText border-t border-ivory-border pt-3">
                        <span>Grand Total Payable</span>
                        <span className="text-gold-dark">৳{grandTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Place Order CTA */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-charcoal hover:bg-gold text-ivory hover:text-charcoal py-4 text-xs font-bold uppercase tracking-luxury transition-all duration-300 shadow-md disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-gold" />
                          <span>Processing Luxury Order...</span>
                        </>
                      ) : (
                        <span>CONFIRM & PLACE ORDER</span>
                      )}
                    </button>

                    <div className="text-[11px] text-center text-secondaryText flex items-center justify-center gap-1 pt-1">
                      <ShieldCheck className="w-4 h-4 text-gold-dark" />
                      <span>Insured delivery with tamper-proof seal.</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
