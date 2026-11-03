"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    sku: string;
    modelNumber?: string;
    basePrice: number;
    shortDescription?: string;
    mainImage: string;
    images?: string[];
    isFeatured?: boolean;
    isNewArrival?: boolean;
    variants?: {
      id: string;
      sku: string;
      regularPrice: number;
      salePrice: number;
      stockQuantity: number;
      mainImage: string;
      attributes?: { [key: string]: string };
    }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeVariant = product.variants?.[activeVariantIndex];
  const regularPrice = activeVariant?.regularPrice || product.basePrice * 1.15;
  const salePrice = activeVariant?.salePrice || product.basePrice;
  const hasDiscount = regularPrice > salePrice;
  const discountPercent = hasDiscount
    ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
    : 0;

  const currentImage = isHovered && product.images && product.images[1]
    ? product.images[1]
    : activeVariant?.mainImage || product.mainImage;

  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      variantId: activeVariant?.id || `var-${product.id}-default`,
      name: product.name,
      slug: product.slug,
      variantName: activeVariant
        ? Object.values(activeVariant.attributes || {}).join(" / ") || "Standard"
        : "Standard",
      sku: activeVariant?.sku || product.sku,
      price: salePrice,
      regularPrice: regularPrice,
      image: activeVariant?.mainImage || product.mainImage,
      quantity: 1,
      maxStock: activeVariant?.stockQuantity || 10,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: salePrice,
      regularPrice: regularPrice,
      image: product.mainImage,
    });
  };

  return (
    <div
      className="group bg-ivory border border-ivory-border hover:border-gold/60 transition-all duration-300 flex flex-col justify-between relative shadow-card-soft"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isNewArrival && (
          <span className="bg-charcoal text-gold text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border border-gold/30">
            NEW ARRIVAL
          </span>
        )}
        {hasDiscount && (
          <span className="bg-rose-muted text-charcoal-deep text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
            -{discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
          isInWishlist
            ? "bg-gold text-charcoal"
            : "bg-charcoal/30 text-ivory/80 hover:bg-gold hover:text-charcoal"
        }`}
        aria-label="Save to Wishlist"
      >
        <Heart className="w-4 h-4" fill={isInWishlist ? "currentColor" : "none"} />
      </button>

      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-square bg-charcoal-dark overflow-hidden">
        <Image
          src={currentImage || "/images/arvano-icon.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-charcoal-deep/10 group-hover:bg-transparent transition-colors" />
      </Link>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Subtitle / Model */}
          <div className="flex items-center justify-between text-[11px] text-secondaryText uppercase tracking-wider mb-1">
            <span>{product.modelNumber || "ARVANO HOROLOGY"}</span>
            <span className="font-mono text-[10px] text-gold-dark font-medium">
              {activeVariant?.stockQuantity && activeVariant.stockQuantity <= 3 ? "LOW STOCK" : "IN STOCK"}
            </span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif text-lg font-medium text-primaryText group-hover:text-gold-dark transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Variation Color Swatches */}
          {product.variants && product.variants.length > 1 && (
            <div className="flex items-center gap-1.5 my-2.5">
              {product.variants.map((v, i) => {
                const colorAttr = v.attributes?.["Dial Colour"] || v.attributes?.["Strap Type"] || `Opt ${i + 1}`;
                const isSelected = activeVariantIndex === i;
                return (
                  <button
                    key={v.id}
                    onClick={() => setActiveVariantIndex(i)}
                    title={colorAttr}
                    className={`text-[10px] px-2 py-0.5 border transition-all ${
                      isSelected
                        ? "border-gold bg-gold/15 text-charcoal font-semibold"
                        : "border-ivory-border bg-white text-secondaryText hover:border-gold/50"
                    }`}
                  >
                    {colorAttr}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Pricing & Add to Bag CTA */}
        <div className="pt-3 border-t border-ivory-border/70 flex items-center justify-between mt-2">
          <div>
            <div className="text-base font-semibold text-primaryText">
              ৳{salePrice.toLocaleString()}
            </div>
            {hasDiscount && (
              <div className="text-xs text-secondaryText line-through">
                ৳{regularPrice.toLocaleString()}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickAdd}
              className="bg-charcoal hover:bg-gold text-ivory hover:text-charcoal p-2.5 transition-colors duration-200"
              title="Add to Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <Link
              href={`/product/${product.slug}`}
              className="bg-ivory border border-ivory-border hover:border-gold text-primaryText p-2.5 transition-colors duration-200"
              title="View Timepiece Details"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
