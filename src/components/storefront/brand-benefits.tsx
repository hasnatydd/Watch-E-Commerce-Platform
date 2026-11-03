import React from "react";
import { ShieldCheck, Clock, Truck, CreditCard } from "lucide-react";

export function BrandBenefits() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "CERTIFIED HOROLOGY",
      description: "Every ARVANO timepiece is individually numbered, inspected, and backed by authentic craftsmanship standards.",
    },
    {
      icon: Clock,
      title: "2-YEAR WARRANTY",
      description: "Comprehensive 24-month movement warranty covering precision calibration and mechanical integrity.",
    },
    {
      icon: Truck,
      title: "INSURED NATIONWIDE DELIVERY",
      description: "Direct courier dispatch across all 64 districts in Bangladesh with real-time consignment tracking.",
    },
    {
      icon: CreditCard,
      title: "TRUSTED PAYMENT METHODS",
      description: "Cash on delivery, verified bKash, Nagad, Rocket, and corporate bank transfer options.",
    },
  ];

  return (
    <section className="bg-charcoal py-16 border-t border-b border-ivory/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 border border-ivory/10 hover:border-gold/40 transition-colors bg-charcoal-dark/50"
              >
                <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-sm tracking-luxury text-ivory mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-ivory/60 leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
