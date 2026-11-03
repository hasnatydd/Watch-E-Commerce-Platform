import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrandStory() {
  return (
    <section className="bg-charcoal-deep py-24 border-b border-ivory/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Copy Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="h-px w-8 bg-gold" />
              <span className="text-xs uppercase tracking-ultra-wide text-gold">THE PHILOSOPHY</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-ivory tracking-tight leading-tight">
              BUILT AROUND <span className="italic text-gold">TIME.</span>
            </h2>

            <p className="text-sm text-ivory/70 leading-relaxed font-light">
              At ARVANO, we believe a wristwatch is not merely a tool for marking minutes; it is the
              anchor of your physical presence. When you enter a boardroom or step onto an international
              stage, your wrist speaks before words are exchanged.
            </p>

            <p className="text-sm text-ivory/70 leading-relaxed font-light">
              Every curve of our 316L steel cases, every facet of our sapphire dials, and every
              meticulous click of our chronograph pushers is purposefully sculpted. We do not manufacture
              disposable fashion watches; we forge lasting instruments of distinction.
            </p>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-gold hover:text-gold-light border-b border-gold/40 pb-1 transition-colors"
              >
                <span>Read The Complete Atelier Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Image & Icon Composite Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-square max-w-md mx-auto bg-charcoal border border-gold/30 p-4 shadow-luxury">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/watches/louis-george-engraved.jpg"
                  alt="ARVANO Horological Craftsmanship"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-charcoal-deep/30" />
              </div>

              {/* Floating Monogram Box */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-charcoal border border-gold shadow-2xl flex items-center justify-center p-2">
                <div className="relative w-16 h-16">
                  <Image
                    src="/images/arvano-icon.jpg"
                    alt="ARVANO Monogram"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
