import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory border-t border-gold/30">
      {/* Upper Footer: Brand & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <div className="relative w-44 h-12">
                <Image
                  src="/images/arvano-logo.jpg"
                  alt="ARVANO Horology"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-xs text-ivory/60 leading-relaxed max-w-sm">
              ARVANO is dedicated to creating commanding, precision-crafted wrist timepieces.
              Engineered with surgical grade stainless steel, sapphire crystals, and verified mechanical calibres for those who define their own time.
            </p>
            <div className="text-xs tracking-luxury text-gold font-serif">
              TIME. PRESENCE. PRECISION.
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/70 hover:border-gold hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/70 hover:border-gold hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/70 hover:border-gold hover:text-gold transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 3: The Collections */}
          <div>
            <h4 className="font-serif text-sm tracking-luxury uppercase text-gold mb-4">
              COLLECTIONS
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory/70">
              <li>
                <Link href="/shop" className="hover:text-gold transition-colors">
                  All Timepieces
                </Link>
              </li>
              <li>
                <Link href="/category/mens-watches" className="hover:text-gold transition-colors">
                  Men&apos;s Watches
                </Link>
              </li>
              <li>
                <Link href="/category/womens-watches" className="hover:text-gold transition-colors">
                  Women&apos;s Collection
                </Link>
              </li>
              <li>
                <Link href="/category/automatic-watches" className="hover:text-gold transition-colors">
                  Automatic & Mechanical
                </Link>
              </li>
              <li>
                <Link href="/category/chronograph-watches" className="hover:text-gold transition-colors">
                  Chronograph Precision
                </Link>
              </li>
              <li>
                <Link href="/category/luxury-collection" className="hover:text-gold transition-colors">
                  Limited Editions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Services */}
          <div>
            <h4 className="font-serif text-sm tracking-luxury uppercase text-gold mb-4">
              CONCIERGE
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory/70">
              <li>
                <Link href="/track-order" className="hover:text-gold transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-gold transition-colors">
                  Client Account
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-gold transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-gold transition-colors">
                  Return & Exchange Policy
                </Link>
              </li>
              <li>
                <Link href="/warranty-policy" className="hover:text-gold transition-colors">
                  2-Year Warranty Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Atelier & Showroom Address */}
          <div>
            <h4 className="font-serif text-sm tracking-luxury uppercase text-gold mb-4">
              ATELIER DHAKA
            </h4>
            <div className="space-y-3 text-xs text-ivory/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>
                  Plot 12, Road 11, Block C,<br />
                  Gulshan 2, Dhaka 1212,<br />
                  Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+8801700000000" className="hover:text-gold transition-colors">
                  +880 1700-000000
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:concierge@arvano.com" className="hover:text-gold transition-colors">
                  concierge@arvano.com
                </a>
              </div>
              <div className="pt-2 text-[11px] text-ivory/40">
                Showroom Hours: Sat - Thu (10:00 AM - 9:00 PM)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Bar: Bangladesh Payment Options */}
      <div className="border-t border-ivory/10 bg-charcoal-dark/70 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-ivory/60">
            <Shield className="w-4 h-4 text-gold" />
            <span>Secure Checkout & Verified Bangladesh Payment Gateways:</span>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {["Cash on Delivery", "bKash", "Nagad", "Rocket", "Bank Transfer", "Visa / Master"].map((method) => (
              <span
                key={method}
                className="bg-charcoal border border-ivory/20 text-ivory/80 px-2.5 py-1 text-[11px] font-medium"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Footer: Copyright & Legal */}
      <div className="border-t border-ivory/10 py-6 bg-charcoal-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/40">
          <div>
            &copy; {new Date().getFullYear()} ARVANO Horology. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/admin" className="hover:text-gold transition-colors text-ivory/30">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
