import React from "react";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";

export default function FAQPage() {
  const faqs = [
    {
      q: "Are ARVANO timepieces genuine mechanical watches?",
      a: "Yes. Our Automatic and Skeleton series are 100% mechanical self-winding watches featuring balance springs, ruby jewels, and automatic rotors that wind themselves through your natural wrist motion. Our Chronograph and Slim series utilize high-precision Swiss Ronda and Japanese Miyota calibres.",
    },
    {
      q: "What glass is used on the watch dials?",
      a: "Every ARVANO wristwatch is equipped with scratch-resistant Sapphire Crystal (or hardened sapphire shield) treated with internal anti-reflective coating to ensure optimal legibility under sunlight and boardroom lighting.",
    },
    {
      q: "Can I pay using Cash on Delivery (COD)?",
      a: "Yes. Cash on Delivery is available across all 64 districts in Bangladesh. For selected high-value orders or destinations outside Dhaka, our concierge team may request an advance courier verification fee of ৳150 via bKash or Nagad before dispatch.",
    },
    {
      q: "How do I verify the bKash or Nagad send money payment?",
      a: "When checking out via bKash, Nagad, or Rocket, the website displays our official verified number. After sending the amount via your mobile app, simply input your 8-digit Transaction ID (TrxID) and sender number in the checkout form. Our team verifies the transaction and updates your order status to Confirmed.",
    },
    {
      q: "What does the 2-Year Warranty cover?",
      a: "Our 24-month warranty covers all internal mechanical movement malfunctions, calibration deviations, and structural manufacturing defects.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      <div className="bg-charcoal-dark border-b border-ivory/10 py-12 text-center">
        <span className="text-xs uppercase tracking-ultra-wide text-gold">CLIENT CONCIERGE</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ivory tracking-tight mt-1">
          FREQUENTLY ASKED QUESTIONS
        </h1>
      </div>

      <div className="bg-ivory text-primaryText flex-1 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white border border-ivory-border p-6 shadow-sm space-y-2">
              <h3 className="font-serif text-base text-primaryText font-semibold">
                {f.q}
              </h3>
              <p className="text-xs sm:text-sm text-secondaryText leading-relaxed">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
