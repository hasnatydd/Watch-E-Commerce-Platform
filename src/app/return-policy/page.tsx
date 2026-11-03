import React from "react";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { RotateCcw, ShieldCheck, Clock } from "lucide-react";

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      <div className="bg-charcoal-dark border-b border-ivory/10 py-12 text-center">
        <span className="text-xs uppercase tracking-ultra-wide text-gold">CLIENT SATISFACTION</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ivory tracking-tight mt-1">
          RETURN & REFUND POLICY
        </h1>
      </div>

      <div className="bg-ivory text-primaryText flex-1 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-ivory-border p-8 sm:p-12 shadow-sm space-y-8 text-xs sm:text-sm leading-relaxed text-secondaryText">
          <section className="space-y-3">
            <h2 className="font-serif text-xl text-primaryText uppercase tracking-wide">
              1. 7-Day Inspection Window
            </h2>
            <p>
              We want you to be completely satisfied with your ARVANO timepiece. You are entitled to
              inspect your purchase for up to 7 calendar days from the date of physical delivery. If the
              timepiece arrives with manufacturing flaws, transit damage, or does not match your chosen
              variation, you are entitled to an immediate replacement or full refund.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-primaryText uppercase tracking-wide">
              2. Eligibility Criteria
            </h2>
            <p>To qualify for an exchange or return:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>The timepiece must be in unused, unworn condition with protective films intact.</li>
              <li>The bracelet must not have been resized or altered.</li>
              <li>
                Original presentation box, warranty card, manual, and microfiber cloth must be returned intact.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-primaryText uppercase tracking-wide">
              3. Refund Processing
            </h2>
            <p>
              Approved refunds are disbursed within 3 to 5 business days via the customer&apos;s original
              payment method (bKash, Nagad, Rocket, or direct bank transfer).
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
