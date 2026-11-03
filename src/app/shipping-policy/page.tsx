import React from "react";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { Truck, ShieldCheck, Clock, MapPin } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      <div className="bg-charcoal-dark border-b border-ivory/10 py-12 text-center">
        <span className="text-xs uppercase tracking-ultra-wide text-gold">CLIENT GUIDELINES</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ivory tracking-tight mt-1">
          SHIPPING & DELIVERY POLICY
        </h1>
      </div>

      <div className="bg-ivory text-primaryText flex-1 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-ivory-border p-8 sm:p-12 shadow-sm space-y-8 text-xs sm:text-sm leading-relaxed text-secondaryText">
          <section className="space-y-3">
            <h2 className="font-serif text-xl text-primaryText uppercase tracking-wide">
              1. Nationwide Insured Delivery
            </h2>
            <p>
              ARVANO provides insured, tamper-proof courier dispatch across all 64 districts in
              Bangladesh. Every parcel is packed inside our bespoke protective packaging to safeguard the
              delicate mechanical calibration of your timepiece during transit.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-primaryText uppercase tracking-wide">
              2. Delivery Timelines
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Dhaka Metropolitan:</strong> 24 to 48 business hours after order confirmation.
              </li>
              <li>
                <strong>Chittagong, Sylhet, Rajshahi & Other Divisions:</strong> 48 to 72 business hours
                via verified express courier services (e.g. Steadfast, Pathao, RedX).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-primaryText uppercase tracking-wide">
              3. Delivery Charges
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Inside Dhaka City:</strong> ৳80 flat rate.</li>
              <li><strong>Outside Dhaka (All Districts):</strong> ৳150 flat rate.</li>
              <li>
                <strong className="text-green-700">Complimentary Shipping:</strong> All orders with a
                subtotal exceeding ৳10,000 enjoy 100% free delivery across Bangladesh.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-primaryText uppercase tracking-wide">
              4. Cash on Delivery (COD) & Advance Courier Policy
            </h2>
            <p>
              To prevent fraudulent and unverified dispatches, our concierge team may contact customers
              requesting outside Dhaka COD to confirm their shipment. For selected high-value timepieces
              or delivery locations outside Dhaka, an advance courier deposit of ৳150 may be requested
              via bKash or Nagad before the consignment is released to the courier.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
