"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Heart, User, Menu, X, Crown } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { SearchModal } from "./search-modal";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartItemCount = useCartStore((state) => state.getItemCount());
  const openCart = useCartStore((state) => state.openCart);
  const wishlistCount = useWishlistStore((state) => state.items.length);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-charcoal/95 backdrop-blur-md border-b border-gold/20 py-3 shadow-luxury"
            : "bg-charcoal border-b border-ivory/10 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: ARVANO Brand Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-36 sm:w-44 h-11 sm:h-12 overflow-hidden flex items-center">
                  <Image
                    src="/images/arvano-logo.jpg"
                    alt="ARVANO — TIME. PRESENCE. PRECISION."
                    fill
                    priority
                    className="object-contain object-left group-hover:opacity-90 transition-opacity"
                  />
                </div>
              </Link>
            </div>

            {/* Centre: Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-luxury font-medium text-ivory/80">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <Link href="/shop" className="hover:text-gold transition-colors">
                Shop
              </Link>
              <Link href="/collections" className="hover:text-gold transition-colors">
                Collections
              </Link>
              <Link href="/category/mens-watches" className="hover:text-gold transition-colors">
                Men
              </Link>
              <Link href="/category/womens-watches" className="hover:text-gold transition-colors">
                Women
              </Link>
              <Link href="/about" className="hover:text-gold transition-colors">
                About
              </Link>
              <Link
                href="/membership"
                className="text-gold hover:text-gold-hover transition-colors flex items-center gap-1.5 font-semibold bg-gold/10 px-2.5 py-1 border border-gold/30 hover:border-gold"
              >
                <Crown className="w-3.5 h-3.5 text-gold" />
                <span>VIP Club</span>
              </Link>
            </nav>

            {/* Right: Functional Controls */}
            <div className="flex items-center space-x-4 sm:space-x-5 text-ivory/80">
              {/* Live Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-gold transition-colors p-1"
                aria-label="Search watches"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative hover:text-gold transition-colors p-1 hidden sm:block"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-charcoal text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="hover:text-gold transition-colors p-1 hidden sm:block"
                aria-label="User Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Shopping Bag with Live Count */}
              <button
                onClick={openCart}
                className="relative hover:text-gold transition-colors p-1 flex items-center"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gold text-charcoal text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4 text-center leading-none">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1 text-ivory/80 hover:text-gold transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-gold" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-charcoal-dark border-b border-gold/30 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-3 text-sm uppercase tracking-luxury text-ivory/90">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-gold py-1.5 border-b border-ivory/5"
              >
                Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-gold py-1.5 border-b border-ivory/5"
              >
                All Timepieces
              </Link>
              <Link
                href="/collections"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-gold py-1.5 border-b border-ivory/5"
              >
                Featured Collections
              </Link>
              <Link
                href="/category/mens-watches"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-gold py-1.5 border-b border-ivory/5"
              >
                Men&apos;s Watches
              </Link>
              <Link
                href="/category/womens-watches"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-gold py-1.5 border-b border-ivory/5"
              >
                Women&apos;s Collection
              </Link>
              <Link
                href="/category/automatic-watches"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-gold py-1.5 border-b border-ivory/5"
              >
                Automatic & Mechanical
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-gold py-1.5 border-b border-ivory/5"
              >
                About ARVANO
              </Link>
              <Link
                href="/membership"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gold py-2 border-b border-ivory/5 flex items-center gap-2 font-bold"
              >
                <Crown className="w-4 h-4 text-gold" />
                <span>ARVANO Guild VIP Membership (15% - 30% OFF)</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-ivory/10 flex items-center justify-between text-xs text-ivory/70">
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 hover:text-gold"
              >
                <User className="w-4 h-4 text-gold" />
                <span>My Account</span>
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 hover:text-gold"
              >
                <Heart className="w-4 h-4 text-gold" />
                <span>Wishlist ({wishlistCount})</span>
              </Link>
              <Link
                href="/track-order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-gold"
              >
                Track Order
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Predictive Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
