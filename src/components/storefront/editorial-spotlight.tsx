import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function EditorialSpotlight() {
  return (
    <section className="bg-charcoal py-24 border-b border-ivory/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Artwork */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] bg-charcoal-dark border border-gold/30 shadow-2xl overflow-hidden group">
              <Image
                src="/images/watches/automatic-movement.jpg"
                alt="ARVANO Sovereign Automatic Mechanical Movement"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/80 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-charcoal/90 border border-gold/40 p-4 backdrop-blur-md max-w-xs">
                <span className="text-[10px] uppercase tracking-ultra-wide text-gold">Featured Calibre</span>
                <div className="font-serif text-lg text-ivory mt-0.5">Calibre ARV-8800</div>
                <div className="text-[11px] text-ivory/60 mt-1">24 Synthetic Ruby Jewels • 42-Hour Reserve • 21,600 VPH</div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="h-px w-6 bg-gold" />
              <span className="text-xs uppercase tracking-ultra-wide text-gold">
                FLAGSHIP SPOTLIGHT
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-ivory leading-tight">
              ARVANO SOVEREIGN <br />
              <span className="italic text-gold">AUTOMATIC MECHANICAL</span>
            </h2>

            <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-light">
              Crafted for those who reject ordinary quartz timepieces. The Sovereign harnesses your
              natural body movement to power an intricate mechanical gear train visible through an
              exhibition sapphire caseback.
            </p>

            {/* Specifications checklist */}
            <div className="space-y-3 pt-2 text-xs text-ivory/80">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>316L Solid Surgical Grade Stainless Steel with Champagne Gold PVD</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Double-Domed Sapphire Crystal with Internal Anti-Reflective Shield</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>10 ATM (100m Water Resistance) with Screw-Down Crown Protection</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>2-Year Comprehensive Movement Warranty & Authentication Certificate</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/product/arvano-sovereign-automatic"
                className="inline-flex items-center gap-3 bg-gold hover:bg-gold-hover text-charcoal px-7 py-3.5 text-xs font-bold uppercase tracking-luxury transition-all shadow-gold-glow"
              >
                DISCOVER SOVEREIGN
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-right">
                <span className="block text-[11px] text-ivory/40 uppercase">Introductory</span>
                <span className="font-serif text-xl text-ivory font-semibold">৳28,500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
