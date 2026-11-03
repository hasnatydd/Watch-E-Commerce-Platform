"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Clock,
  Heart,
  ShoppingBag,
  Zap,
  Check,
  ChevronDown,
  Crown,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

interface Variation {
  id: string;
  sku: string;
  regularPrice: number;
  salePrice: number;
  stockQuantity: number;
  mainImage: string;
  images: string[];
  attributes: { [key: string]: string };
}

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    slug: string;
    sku: string;
    modelNumber?: string;
    basePrice: number;
    shortDescription?: string;
    fullDescription: string;
    technicalSpecs: {
      movement?: string;
      caseMaterial?: string;
      caseDiameter?: string;
      caseThickness?: string;
      glassType?: string;
      waterResistance?: string;
      strapMaterial?: string;
      powerReserve?: string;
      warranty?: string;
      boxContents?: string;
    };
    variants: Variation[];
  };
}

export function ProductDetailsClient({ product }: ProductDetailsProps) {
  const router = useRouter();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "shipping" | "warranty">("specs");

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const regularPrice = currentVariant.regularPrice;
  const salePrice = currentVariant.salePrice;
  const hasDiscount = regularPrice > salePrice;
  const discountPercent = hasDiscount
    ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
    : 0;

  const galleryImages = currentVariant.images && currentVariant.images.length > 0
    ? currentVariant.images
    : [currentVariant.mainImage || "/images/arvano-icon.jpg"];

  const activeImage = galleryImages[selectedImageIndex] || galleryImages[0];

  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: currentVariant.id,
      name: product.name,
      slug: product.slug,
      variantName: Object.values(currentVariant.attributes || {}).join(" / ") || "Standard",
      sku: currentVariant.sku,
      price: salePrice,
      regularPrice: regularPrice,
      image: currentVariant.mainImage,
      quantity,
      maxStock: currentVariant.stockQuantity,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: Gallery Column */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Stage Image */}
          <div className="relative aspect-square bg-charcoal border border-ivory-border overflow-hidden shadow-luxury group">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {hasDiscount && (
              <span className="absolute top-4 left-4 bg-rose-muted text-charcoal-deep text-xs font-bold uppercase tracking-wider px-3 py-1">
                -{discountPercent}% OFF
              </span>
            )}
            <button
              onClick={() =>
                toggleWishlist({
                  productId: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: salePrice,
                  regularPrice,
                  image: currentVariant.mainImage,
                })
              }
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
                isInWishlist
                  ? "bg-gold text-charcoal shadow-gold-glow"
                  : "bg-charcoal/40 text-ivory/80 hover:bg-gold hover:text-charcoal"
              }`}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" fill={isInWishlist ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 flex-shrink-0 border transition-all ${
                    selectedImageIndex === idx
                      ? "border-gold shadow-gold-glow"
                      : "border-ivory-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Purchasing & Details Column */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-secondaryText uppercase tracking-wider mb-1.5">
              <span>{product.modelNumber || "ARVANO ATELIER"}</span>
              <span className="font-mono text-gold-dark font-medium">SKU: {currentVariant.sku}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-primaryText font-medium tracking-tight">
              {product.name}
            </h1>

            {/* Pricing */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-serif font-bold text-primaryText">
                ৳{salePrice.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-base text-secondaryText line-through">
                  ৳{regularPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 border border-green-200 uppercase font-semibold">
                {currentVariant.stockQuantity > 0 ? "In Stock & Ready to Dispatch" : "Out of Stock"}
              </span>
            </div>

            {/* VIP Guild Member Price Banner */}
            <div className="mt-3 p-3 bg-charcoal border border-gold/40 text-ivory flex items-center justify-between text-xs shadow-sm">
              <div className="flex items-center gap-2.5">
                <Crown className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gold font-bold">
                    ARVANO GUILD MEMBER PRICE
                  </div>
                  <div className="font-mono text-sm font-bold text-ivory">
                    ৳{Math.round(salePrice * 0.8).toLocaleString()}{" "}
                    <span className="text-[11px] font-sans text-green-400 font-semibold">
                      (Save ৳{Math.round(salePrice * 0.2).toLocaleString()} with 20% VIP Discount)
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href="/membership"
                className="text-[11px] text-gold hover:text-gold-hover border-b border-gold/50 pb-0.5 uppercase tracking-wider font-semibold whitespace-nowrap ml-2"
              >
                Join &amp; Save &rarr;
              </Link>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-secondaryText leading-relaxed font-light">
            {product.shortDescription}
          </p>

          {/* Variation Selector (Dial & Strap Attributes) */}
          {product.variants.length > 1 && (
            <div className="space-y-3 pt-4 border-t border-ivory-border">
              <label className="block text-xs uppercase tracking-luxury text-primaryText font-semibold">
                Select Variation / Configuration:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {product.variants.map((v, idx) => {
                  const isSelected = selectedVariantIndex === idx;
                  const label = Object.entries(v.attributes || {})
                    .map(([key, val]) => `${key}: ${val}`)
                    .join(" | ");

                  return (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVariantIndex(idx);
                        setSelectedImageIndex(0);
                      }}
                      className={`p-3 text-left border text-xs transition-all ${
                        isSelected
                          ? "border-gold bg-gold/10 text-charcoal font-semibold shadow-sm"
                          : "border-ivory-border bg-white text-secondaryText hover:border-gold/50"
                      }`}
                    >
                      <div className="font-medium text-primaryText">
                        {Object.values(v.attributes || {}).join(" / ")}
                      </div>
                      <div className="text-[11px] text-gold-dark mt-0.5">
                        ৳{v.salePrice.toLocaleString()}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-ivory-border">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-ivory-border bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2.5 text-secondaryText hover:text-primaryText transition-colors"
                >
                  -
                </button>
                <span className="px-4 text-xs font-semibold text-primaryText">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(currentVariant.stockQuantity, quantity + 1))}
                  className="px-3 py-2.5 text-secondaryText hover:text-primaryText transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-charcoal hover:bg-gold text-ivory hover:text-charcoal py-3.5 px-6 text-xs font-bold uppercase tracking-luxury transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4" />
                ADD TO SHOPPING BAG
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-charcoal py-3.5 px-6 text-xs font-bold uppercase tracking-luxury transition-all duration-300 shadow-gold-glow"
            >
              <Zap className="w-4 h-4" />
              DIRECT ORDER / BUY NOW
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-6 border-t border-ivory-border text-xs text-secondaryText">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gold-dark" />
              <span>Complimentary shipping &gt; ৳10,000</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-dark" />
              <span>2-Year Movement Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-dark" />
              <span>100% Authentic Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-gold-dark" />
              <span>7-Day Inspection Return</span>
            </div>
          </div>

          {/* Specifications Accordion / Tabs */}
          <div className="pt-6 border-t border-ivory-border">
            <div className="flex border-b border-ivory-border text-xs uppercase tracking-wider font-semibold">
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-2.5 px-3 border-b-2 transition-colors ${
                  activeTab === "specs"
                    ? "border-gold text-primaryText"
                    : "border-transparent text-secondaryText hover:text-primaryText"
                }`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab("warranty")}
                className={`pb-2.5 px-3 border-b-2 transition-colors ${
                  activeTab === "warranty"
                    ? "border-gold text-primaryText"
                    : "border-transparent text-secondaryText hover:text-primaryText"
                }`}
              >
                Warranty & Box
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`pb-2.5 px-3 border-b-2 transition-colors ${
                  activeTab === "shipping"
                    ? "border-gold text-primaryText"
                    : "border-transparent text-secondaryText hover:text-primaryText"
                }`}
              >
                Delivery In BD
              </button>
            </div>

            <div className="py-4 text-xs">
              {activeTab === "specs" && (
                <div className="space-y-2 divide-y divide-ivory-border/60">
                  {Object.entries(product.technicalSpecs || {}).map(([key, val]) => (
                    <div key={key} className="pt-2 first:pt-0 flex justify-between">
                      <span className="text-secondaryText capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </span>
                      <span className="font-medium text-primaryText text-right">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "warranty" && (
                <div className="space-y-2 text-secondaryText leading-relaxed">
                  <p>
                    <strong>Movement Warranty:</strong> {product.technicalSpecs?.warranty || "2 Years Official ARVANO Guarantee"}.
                  </p>
                  <p>
                    <strong>Packaging:</strong> {product.technicalSpecs?.boxContents || "Luxury presentation wooden box, certificate, warranty card"}.
                  </p>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-2 text-secondaryText leading-relaxed">
                  <p><strong>Dhaka City:</strong> 24 to 48 hours delivery (৳80 or Free &gt; ৳10k).</p>
                  <p><strong>All Other Districts:</strong> 48 to 72 hours via verified courier (৳150 or Free &gt; ৳10k).</p>
                  <p><strong>Payment Options:</strong> Cash on Delivery, bKash, Nagad, Rocket, Bank Transfer.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
