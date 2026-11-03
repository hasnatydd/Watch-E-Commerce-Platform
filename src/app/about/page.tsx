import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { ShieldCheck, Compass, Clock, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      {/* Hero */}
      <div className="bg-charcoal-dark border-b border-ivory/10 py-20 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs uppercase tracking-ultra-wide text-gold">THE ATELIER STORY</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory tracking-tight mt-2">
            TIME. PRESENCE. PRECISION.
          </h1>
          <p className="text-sm text-ivory/70 mt-4 max-w-2xl mx-auto font-light leading-relaxed">
            ARVANO was founded on a singular conviction: that a gentleman&apos;s wristwatch should never be
            a compromised fashion accessory, but an uncompromising instrument of character and mechanical authority.
          </p>
        </div>
      </div>

      {/* Main Philosophy */}
      <div className="bg-ivory text-primaryText py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-ultra-wide text-gold-dark font-semibold">
                OUR PHILOSOPHY
              </span>
              <h2 className="font-serif text-3xl text-primaryText">
                CRAFTED FOR THE UNCOMPROMISING
              </h2>
              <p className="text-xs sm:text-sm text-secondaryText leading-relaxed">
                In an era dominated by fleeting digital notifications, mechanical and high-torque horology
                represents an enduring bond with physical reality. Our designs marry international haute
                horlogerie aesthetics with surgical 316L metallurgy and scratch-resistant sapphire crystals.
              </p>
              <p className="text-xs sm:text-sm text-secondaryText leading-relaxed">
                Each ARVANO timepiece is assembled with precision tolerances, inspected in our Dhaka atelier,
                and accompanied by an individualized certificate of authenticity.
              </p>
            </div>

            <div className="relative aspect-[4/3] bg-charcoal border border-ivory-border overflow-hidden shadow-luxury">
              <Image
                src="/images/watches/omega-caliber-321.jpg"
                alt="Horology Atelier & Watchmaking Calibre"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-ivory-border">
            <div className="p-6 bg-white border border-ivory-border text-center space-y-3">
              <Compass className="w-8 h-8 text-gold-dark mx-auto" />
              <h3 className="font-serif text-lg text-primaryText uppercase tracking-wider">
                SURGICAL 316L STEEL
              </h3>
              <p className="text-xs text-secondaryText leading-relaxed">
                Corrosion-proof, hypoallergenic, and polished to mirror tolerances for permanent luster.
              </p>
            </div>

            <div className="p-6 bg-white border border-ivory-border text-center space-y-3">
              <Clock className="w-8 h-8 text-gold-dark mx-auto" />
              <h3 className="font-serif text-lg text-primaryText uppercase tracking-wider">
                SAPPHIRE CRYSTAL
              </h3>
              <p className="text-xs text-secondaryText leading-relaxed">
                Ranked 9 on the Mohs hardness scale with internal anti-reflective coating for pristine legibility.
              </p>
            </div>

            <div className="p-6 bg-white border border-ivory-border text-center space-y-3">
              <Award className="w-8 h-8 text-gold-dark mx-auto" />
              <h3 className="font-serif text-lg text-primaryText uppercase tracking-wider">
                2-YEAR WARRANTY
              </h3>
              <p className="text-xs text-secondaryText leading-relaxed">
                Comprehensive 24-month movement warranty with direct concierge service in Gulshan, Dhaka.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
