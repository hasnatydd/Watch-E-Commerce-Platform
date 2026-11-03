"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Crown,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Gem,
  Award,
  Zap,
  HelpCircle,
  Clock,
  X,
  Copy,
  Check,
  CreditCard,
  Phone,
} from "lucide-react";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { MEMBERSHIP_PLANS, MembershipPlan } from "@/lib/data/membership-plans";

export default function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculator State
  const [calcModel, setCalcModel] = useState({
    name: "ARVANO Sovereign Automatic",
    price: 28500,
  });

  // Modal Form State
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("BKASH");
  const [transactionId, setTransactionId] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedNumber, setCopiedNumber] = useState(false);

  const sampleWatches = [
    { name: "ARVANO Heritage Slim Dress", price: 14500 },
    { name: "ARVANO Tangente Bauhaus Minimalist", price: 17200 },
    { name: "ARVANO Chronos Tachymeter", price: 18500 },
    { name: "ARVANO Panthère Grace Two-Tone", price: 21500 },
    { name: "ARVANO Sovereign Automatic", price: 28500 },
    { name: "ARVANO Golden Ellipse Grand Classic", price: 29800 },
    { name: "ARVANO Phantom Skeleton", price: 34500 },
  ];

  const handleOpenJoin = (plan: MembershipPlan) => {
    setSelectedPlan(plan);
    setSuccessResult(null);
    setErrorMessage("");
    setIsModalOpen(true);
  };

  const handleCopyPaymentNumber = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/membership/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          email,
          address,
          planId: selectedPlan.id,
          paymentMethod,
          transactionId,
          senderNumber,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to complete membership activation.");
      }

      setSuccessResult(data.member);
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-ivory flex flex-col">
      <Header />

      {/* Hero Banner */}
      <section className="relative py-24 sm:py-32 bg-charcoal-deep border-b border-ivory/10 overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-gold/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/40 text-gold text-xs uppercase tracking-ultra-wide mb-6">
            <Crown className="w-4 h-4 text-gold" />
            <span>THE ARVANO HOROLOGY GUILD</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-ivory tracking-tight leading-[1.08] max-w-4xl mx-auto">
            A PRIVATE CIRCLE OF <span className="italic text-gold">DISCERNING COLLECTORS.</span>
          </h1>

          <p className="mt-6 text-sm sm:text-base text-ivory/70 max-w-2xl mx-auto font-light leading-relaxed">
            Subscribe monthly to ARVANO Guild and unlock an extraordinary <strong className="text-gold font-semibold">15% to 30% massive discount</strong> on
            every luxury timepiece. Permanent patrons enjoy bespoke caseback laser engraving, complimentary Italian leather pouches, and private atelier viewing privileges in Dhaka.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#plans"
              className="bg-gold hover:bg-gold-hover text-charcoal px-8 py-4 text-xs font-bold uppercase tracking-luxury transition-all shadow-gold-glow flex items-center gap-2"
            >
              <span>EXPLORE GUILD TIERS</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#calculator"
              className="border border-ivory/30 hover:border-gold text-ivory hover:text-gold px-8 py-4 text-xs font-semibold uppercase tracking-luxury transition-colors bg-charcoal/50"
            >
              CALCULATE YOUR SAVINGS
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Savings Calculator */}
      <section id="calculator" className="py-20 bg-charcoal-dark border-b border-ivory/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-ultra-wide text-gold">INSTANT RETURN ON INVESTMENT</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory mt-1">SEE HOW MUCH YOU SAVE</h2>
            <p className="text-xs text-ivory/60 mt-2 max-w-lg mx-auto">
              Choose any ARVANO watch to see how your monthly membership pays for itself multiple times over on a single timepiece purchase.
            </p>
          </div>

          {/* Model Selector Bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {sampleWatches.map((w) => (
              <button
                key={w.name}
                onClick={() => setCalcModel(w)}
                className={`px-3 py-1.5 text-xs font-mono transition-all border ${
                  calcModel.name === w.name
                    ? "bg-gold text-charcoal font-bold border-gold shadow-md"
                    : "bg-charcoal border-ivory/20 text-ivory/80 hover:border-gold/50"
                }`}
              >
                {w.name} (৳{w.price.toLocaleString()})
              </button>
            ))}
          </div>

          {/* Savings Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MEMBERSHIP_PLANS.map((plan) => {
              const discountBDT = Math.round(calcModel.price * (plan.discountPercentage / 100));
              const memberPrice = calcModel.price - discountBDT;
              const netGain = discountBDT - plan.monthlyFee;

              return (
                <div
                  key={plan.id}
                  className={`bg-charcoal p-6 border relative flex flex-col justify-between ${
                    plan.isPopular
                      ? "border-gold shadow-gold-glow"
                      : "border-ivory/15 hover:border-ivory/40"
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-charcoal text-[10px] font-bold px-3 py-0.5 uppercase tracking-wider">
                      MOST POPULAR TIER
                    </div>
                  )}

                  <div>
                    <div className="text-xs uppercase tracking-luxury text-gold font-medium">{plan.name}</div>
                    <div className="font-serif text-2xl text-ivory mt-1">
                      {plan.discountPercentage}% <span className="text-sm font-sans text-ivory/60">OFF WATCHES</span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-ivory/10 space-y-2 text-xs">
                      <div className="flex justify-between text-ivory/60">
                        <span>Original Price:</span>
                        <span className="line-through">৳{calcModel.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gold font-bold">
                        <span>VIP Member Price:</span>
                        <span>৳{memberPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-green-400 font-bold bg-green-950/40 p-2 border border-green-900/50">
                        <span>Instant Watch Savings:</span>
                        <span>-৳{discountBDT.toLocaleString()} BDT</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-ivory/10">
                    <div className="text-[11px] text-ivory/50">Monthly Membership: ৳{plan.monthlyFee.toLocaleString()}/mo</div>
                    <div className="text-xs font-semibold text-emerald-300 mt-0.5">
                      Net First-Purchase Profit: +৳{netGain.toLocaleString()}
                    </div>
                    <button
                      onClick={() => handleOpenJoin(plan)}
                      className={`w-full mt-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                        plan.isPopular
                          ? "bg-gold hover:bg-gold-hover text-charcoal shadow-gold-glow"
                          : "border border-gold text-gold hover:bg-gold hover:text-charcoal"
                      }`}
                    >
                      JOIN {plan.name.toUpperCase()}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Plans Section */}
      <section id="plans" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-ultra-wide text-gold">CHOOSE YOUR ATELIER TIER</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory tracking-tight mt-1">
            MEMBERSHIP TIERS & PRIVILEGES
          </h2>
          <p className="text-xs sm:text-sm text-ivory/60 mt-3 font-light">
            Cancel or upgrade anytime with zero lock-in contract. All benefits activate immediately upon confirmation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`bg-charcoal border flex flex-col justify-between p-8 relative ${
                plan.isPopular
                  ? "border-gold shadow-2xl scale-102 bg-gradient-to-b from-charcoal via-charcoal to-charcoal-deep"
                  : "border-ivory/15 hover:border-gold/40"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold text-charcoal text-[11px] font-bold px-4 py-1 uppercase tracking-wider shadow">
                  RECOMMENDED FOR COLLECTORS
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-ultra-wide text-gold/90 font-semibold font-mono">
                    {plan.tierCode}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gold/10 border border-gold/30 text-gold font-bold">
                    {plan.badge}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-ivory mt-2">{plan.name}</h3>
                <p className="text-xs text-ivory/60 mt-1 min-h-[36px]">{plan.tagline}</p>

                {/* Price Display */}
                <div className="mt-6 pb-6 border-b border-ivory/10">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl text-ivory font-bold">৳{plan.monthlyFee.toLocaleString()}</span>
                    <span className="text-xs text-ivory/60 uppercase">/ month</span>
                  </div>
                  <div className="text-[11px] text-green-400 font-medium mt-1">
                    ✓ Immediate {plan.discountPercentage}% Discount on Every Watch Purchase
                  </div>
                </div>

                {/* Perks Checklist */}
                <ul className="mt-6 space-y-3 text-xs">
                  {plan.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-ivory/80">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-ivory/10">
                <button
                  onClick={() => handleOpenJoin(plan)}
                  className={`w-full py-4 text-xs font-bold uppercase tracking-luxury transition-all flex items-center justify-center gap-2 ${
                    plan.isPopular
                      ? "bg-gold hover:bg-gold-hover text-charcoal shadow-gold-glow"
                      : "border border-ivory/30 hover:border-gold hover:text-gold text-ivory"
                  }`}
                >
                  <Crown className="w-4 h-4" />
                  <span>SUBSCRIBE & JOIN GUILD</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guild FAQ */}
      <section className="py-20 bg-charcoal-deep border-t border-ivory/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-ultra-wide text-gold">QUESTIONS & POLICIES</span>
            <h2 className="font-serif text-3xl text-ivory mt-1">FREQUENTLY ASKED QUESTIONS</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="bg-charcoal border border-ivory/10 p-5 space-y-2">
              <h4 className="font-serif text-sm text-ivory font-semibold">
                How does the monthly watch discount work?
              </h4>
              <p className="text-ivory/70 leading-relaxed font-light">
                As soon as your membership is active, you receive an individualized ARVANO Member ID (e.g. ARV-VIP-7104). Whenever you purchase a watch on our website, simply enter your Member ID or registered phone number during checkout to instantly deduct 15%, 20%, or 30% from the grand total.
              </p>
            </div>

            <div className="bg-charcoal border border-ivory/10 p-5 space-y-2">
              <h4 className="font-serif text-sm text-ivory font-semibold">
                Can I cancel my membership anytime?
              </h4>
              <p className="text-ivory/70 leading-relaxed font-light">
                Yes. There are no lock-in periods. You can pause or cancel your subscription at any time by messaging our concierge or via your customer account dashboard without penalty.
              </p>
            </div>

            <div className="bg-charcoal border border-ivory/10 p-5 space-y-2">
              <h4 className="font-serif text-sm text-ivory font-semibold">
                How do I pay the monthly subscription?
              </h4>
              <p className="text-ivory/70 leading-relaxed font-light">
                You can easily pay via bKash, Nagad, Rocket send-money, or direct bank transfer. Renewal reminders with quick 1-click payment links are sent to your mobile phone each month.
              </p>
            </div>

            <div className="bg-charcoal border border-ivory/10 p-5 space-y-2">
              <h4 className="font-serif text-sm text-ivory font-semibold">
                Can I use my member discount on newly released or limited-edition models?
              </h4>
              <p className="text-ivory/70 leading-relaxed font-light">
                Yes! Your Guild discount applies across our entire collection—including Automatic Skeletons, Chronographs, and Classic Dress timepieces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JOIN GUILD MODAL */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-charcoal border border-gold/40 max-w-lg w-full p-6 sm:p-8 relative shadow-2xl my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-ivory/60 hover:text-gold"
            >
              <X className="w-5 h-5" />
            </button>

            {!successResult ? (
              <div>
                <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-wider mb-1">
                  <Crown className="w-4 h-4 text-gold" />
                  <span>JOIN THE ARVANO HOROLOGY GUILD</span>
                </div>

                <h3 className="font-serif text-2xl text-ivory">
                  Activate {selectedPlan.name}
                </h3>
                <p className="text-xs text-ivory/70 mt-1">
                  Monthly Subscription: <strong className="text-gold font-bold">৳{selectedPlan.monthlyFee.toLocaleString()} / mo</strong> (Unlocks {selectedPlan.discountPercentage}% Discount)
                </p>

                {errorMessage && (
                  <div className="mt-4 p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubscribe} className="mt-6 space-y-4 text-xs">
                  <div>
                    <label className="block text-[10px] uppercase text-ivory/60 mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rakib Ahmed"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-charcoal-deep border border-ivory/20 px-3 py-2 text-ivory focus:border-gold outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase text-ivory/60 mb-1">Mobile / Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 01700112233"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-charcoal-deep border border-ivory/20 px-3 py-2 text-ivory font-mono focus:border-gold outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase text-ivory/60 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rakib@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-charcoal-deep border border-ivory/20 px-3 py-2 text-ivory focus:border-gold outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-ivory/60 mb-1">
                      Delivery Address (For Guild VIP gifts & travel pouch)
                    </label>
                    <input
                      type="text"
                      placeholder="House, Road, Area, District"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-charcoal-deep border border-ivory/20 px-3 py-2 text-ivory focus:border-gold outline-none"
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div className="pt-2 border-t border-ivory/10">
                    <label className="block text-[10px] uppercase text-gold font-semibold mb-2">
                      Send-Money Monthly Fee (৳{selectedPlan.monthlyFee.toLocaleString()} BDT) via:
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                      {["BKASH", "NAGAD", "ROCKET"].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setPaymentMethod(m)}
                          className={`py-2 text-xs font-mono font-bold uppercase transition-all border ${
                            paymentMethod === m
                              ? "bg-gold text-charcoal border-gold"
                              : "bg-charcoal-deep border-ivory/20 text-ivory/70 hover:border-gold/50"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>

                    {/* Payment Instruction Box */}
                    <div className="mt-3 p-3 bg-charcoal-deep border border-gold/30 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-ivory/70">Send Money to {paymentMethod} Number:</span>
                        <button
                          type="button"
                          onClick={() => handleCopyPaymentNumber("01843-366599")}
                          className="text-[10px] text-gold hover:underline flex items-center gap-1 font-mono"
                        >
                          {copiedNumber ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedNumber ? "Copied!" : "Copy"}</span>
                        </button>
                      </div>

                      <div className="font-mono text-sm font-bold text-gold">
                        01843-366599 <span className="text-xs text-ivory/60 font-sans font-normal">(Personal)</span>
                      </div>
                      <p className="text-[10px] text-ivory/50">
                        1. Open your {paymentMethod} App &gt; Select Send Money &gt; Send ৳{selectedPlan.monthlyFee.toLocaleString()}
                        <br />
                        2. Copy the Transaction ID (TrxID) and enter it below to activate.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase text-ivory/60 mb-1">Transaction ID (TrxID) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. BLM98234KL1"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full bg-charcoal-deep border border-ivory/20 px-3 py-2 text-ivory font-mono focus:border-gold outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase text-ivory/60 mb-1">Sender Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 017XXXXXXXX"
                        value={senderNumber}
                        onChange={(e) => setSenderNumber(e.target.value)}
                        className="w-full bg-charcoal-deep border border-ivory/20 px-3 py-2 text-ivory font-mono focus:border-gold outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 bg-gold hover:bg-gold-hover text-charcoal py-3.5 text-xs font-bold uppercase tracking-luxury transition-all shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    <Crown className="w-4 h-4" />
                    <span>{isSubmitting ? "ACTIVATING VIP GUILD..." : "CONFIRM & ACTIVATE MEMBERSHIP"}</span>
                  </button>
                </form>
              </div>
            ) : (
              /* Success VIP Card */
              <div className="text-center py-4 space-y-6">
                <div className="w-16 h-16 bg-gold/10 border border-gold rounded-full flex items-center justify-center mx-auto text-gold">
                  <Crown className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-ultra-wide text-gold">WELCOME TO THE FELLOWSHIP</span>
                  <h3 className="font-serif text-2xl text-ivory mt-1">
                    MEMBERSHIP ACTIVATED!
                  </h3>
                  <p className="text-xs text-ivory/70 mt-1">
                    Your {successResult.planName} is now active. Your {successResult.discountPercentage}% discount applies to all watches immediately.
                  </p>
                </div>

                {/* Holographic VIP Member Card */}
                <div className="p-6 bg-gradient-to-br from-charcoal via-charcoal-deep to-black border-2 border-gold max-w-sm mx-auto shadow-2xl relative text-left">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-serif text-lg text-gold font-bold tracking-wider">ARVANO GUILD</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-gold/20 text-gold border border-gold/40">
                      {successResult.discountPercentage}% VIP DISCOUNT
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-ivory/50">MEMBER ID</div>
                    <div className="font-mono text-xl font-bold text-ivory tracking-widest">{successResult.memberId}</div>
                  </div>

                  <div className="mt-4 flex justify-between items-end text-xs">
                    <div>
                      <div className="text-[9px] uppercase text-ivory/50">MEMBER NAME</div>
                      <div className="text-ivory font-medium">{successResult.customerName}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] uppercase text-ivory/50">VALID THRU</div>
                      <div className="font-mono text-gold">{new Date(successResult.renewsAt).toLocaleDateString("en-GB")}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-3">
                  <Link
                    href="/shop"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full bg-gold hover:bg-gold-hover text-charcoal py-3 text-xs font-bold uppercase tracking-luxury transition-all shadow-gold-glow block"
                  >
                    SHOP WATCHES WITH {successResult.discountPercentage}% DISCOUNT
                  </Link>

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-xs text-ivory/60 hover:text-ivory"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
