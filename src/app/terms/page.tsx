import React from "react";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      <div className="bg-charcoal-dark border-b border-ivory/10 py-12 text-center">
        <span className="text-xs uppercase tracking-ultra-wide text-gold">CLIENT AGREEMENT</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ivory tracking-tight mt-1">
          TERMS & CONDITIONS
        </h1>
      </div>

      <div className="bg-ivory text-primaryText flex-1 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-ivory-border p-8 sm:p-12 shadow-sm space-y-6 text-xs sm:text-sm text-secondaryText leading-relaxed">
          <p>
            By accessing the ARVANO website or commissioning a timepiece acquisition, you agree to comply
            with and be bound by the following terms of service.
          </p>

          <h2 className="font-serif text-lg text-primaryText font-semibold">1. Order Accuracy & Pricing</h2>
          <p>
            All prices listed on the ARVANO platform are denominated in Bangladeshi Taka (BDT ৳) and
            include standard packaging. Prices and stock availability are subject to official confirmation
            by our concierge team upon verification of order details.
          </p>

          <h2 className="font-serif text-lg text-primaryText font-semibold">2. Intellectual Property</h2>
          <p>
            The ARVANO trademark, logo, watch photography, and architectural design system are the
            exclusive intellectual property of ARVANO Horology.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
