"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      <div className="bg-charcoal-dark border-b border-ivory/10 py-12 text-center">
        <span className="text-xs uppercase tracking-ultra-wide text-gold">CURATED PREFERENCES</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ivory tracking-tight mt-1">
          YOUR SAVED TIMEPIECES ({items.length})
        </h1>
      </div>

      <div className="bg-ivory text-primaryText flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="py-20 text-center max-w-md mx-auto">
              <Heart className="w-12 h-12 text-secondaryText/40 mx-auto mb-3" />
              <h2 className="font-serif text-2xl text-primaryText">Your wishlist is currently empty</h2>
              <p className="text-xs text-secondaryText mt-1">
                Explore our collections and tap the heart icon on any timepiece to save it here.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-block bg-charcoal text-gold px-8 py-3 text-xs font-bold uppercase tracking-luxury hover:bg-gold hover:text-charcoal transition-colors"
              >
                EXPLORE COLLECTION
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white border border-ivory-border p-4 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square bg-charcoal-dark overflow-hidden mb-3">
                      <Image
                        src={item.image || "/images/arvano-icon.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Link href={`/product/${item.slug}`}>
                      <h3 className="font-serif text-base text-primaryText font-medium hover:text-gold-dark transition-colors truncate">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="text-sm font-semibold text-primaryText mt-1">
                      ৳{item.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-ivory-border mt-4 flex items-center justify-between">
                    <button
                      onClick={() =>
                        addItem({
                          productId: item.productId,
                          variantId: `var-${item.productId}`,
                          name: item.name,
                          slug: item.slug,
                          variantName: "Standard",
                          sku: `SKU-${item.productId.slice(0, 6)}`,
                          price: item.price,
                          regularPrice: item.regularPrice,
                          image: item.image,
                          quantity: 1,
                          maxStock: 10,
                        })
                      }
                      className="flex items-center gap-1.5 bg-charcoal text-gold hover:bg-gold hover:text-charcoal px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-secondaryText hover:text-red-500 p-2"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
