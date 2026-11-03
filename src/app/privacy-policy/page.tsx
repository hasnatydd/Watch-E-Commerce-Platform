import React from "react";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      <div className="bg-charcoal-dark border-b border-ivory/10 py-12 text-center">
        <span className="text-xs uppercase tracking-ultra-wide text-gold">LEGAL & PRIVACY</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ivory tracking-tight mt-1">
          PRIVACY POLICY
        </h1>
      </div>

      <div className="bg-ivory text-primaryText flex-1 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-ivory-border p-8 sm:p-12 shadow-sm space-y-6 text-xs sm:text-sm text-secondaryText leading-relaxed">
          <p>
            ARVANO is committed to safeguarding the privacy and confidentiality of our clients.
            This Privacy Policy describes how we collect, protect, and use your personal information
            when you browse our website, acquire timepieces, or interact with our concierge.
          </p>

          <h2 className="font-serif text-lg text-primaryText font-semibold">1. Information We Collect</h2>
          <p>
            We collect your name, mobile contact number, delivery address, and transaction references
            solely for the purposes of order fulfillment, courier consignment generation, warranty
            registration, and fraud prevention.
          </p>

          <h2 className="font-serif text-lg text-primaryText font-semibold">2. Data Security & Discretion</h2>
          <p>
            We never sell, rent, or trade your personal information with third-party advertisers. All
            financial information, mobile payment references, and client records are encrypted using
            industry-standard SSL protocols.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
