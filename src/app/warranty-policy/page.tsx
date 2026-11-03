import React from "react";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { Clock, ShieldCheck, Award } from "lucide-react";

export default function WarrantyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      <div className="bg-charcoal-dark border-b border-ivory/10 py-12 text-center">
        <span className="text-xs uppercase tracking-ultra-wide text-gold">HOROLOGICAL GUARANTEE</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ivory tracking-tight mt-1">
          2-YEAR INTERNATIONAL MOVEMENT WARRANTY
        </h1>
      </div>

      <div className="bg-ivory text-primaryText flex-1 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-ivory-border p-8 sm:p-12 shadow-sm space-y-8 text-xs sm:text-sm leading-relaxed text-secondaryText">
          <section className="space-y-3">
            <h2 className="font-serif text-xl text-primaryText uppercase tracking-wide">
              1. Warranty Scope
            </h2>
            <p>
              Every authentic ARVANO wristwatch is backed by our official 24-month (2-Year) Movement
              Warranty from the date of acquisition. This warranty covers manufacturing defects in the
              internal movement calibre, gear train, hands, and dial markers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-primaryText uppercase tracking-wide">
              2. What is Not Covered
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Normal wear and tear from daily use (e.g. leather strap softening, minor hair-line scratches on case).</li>
              <li>Damage resulting from accidental impact, dropping, or unauthorized repairs by third-party technicians.</li>
              <li>Water ingress resulting from failure to screw down the crown or exceeding rated water resistance depth.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-primaryText uppercase tracking-wide">
              3. Claiming Warranty Service
            </h2>
            <p>
              To initiate warranty calibration or service, contact our concierge at{" "}
              <strong>concierge@arvano.com</strong> or present your metal warranty card at our Gulshan 2
              showroom in Dhaka.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
