import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/storefront/header";
import { HeroSection } from "@/components/storefront/hero-section";
import { CategorySection } from "@/components/storefront/category-section";
import { EditorialSpotlight } from "@/components/storefront/editorial-spotlight";
import { BrandStory } from "@/components/storefront/brand-story";
import { BrandBenefits } from "@/components/storefront/brand-benefits";
import { CustomerReviews } from "@/components/storefront/customer-reviews";
import { Footer } from "@/components/storefront/footer";
import { ProductCard } from "@/components/storefront/product-card";
import { getProducts, getCategories } from "@/services/product-service";

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const [categories, featuredProducts, newArrivals] = await Promise.all([
    getCategories(),
    getProducts({ isFeatured: true, limit: 4 }),
    getProducts({ isNewArrival: true, limit: 4 }),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      {/* 1. Header (STRICTLY NO ANNOUNCEMENT BAR) */}
      <Header />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Shop by Category */}
      <CategorySection categories={categories} />

      {/* 4. New Arrivals Showcase (Ivory Background with Dark Card Contrast) */}
      <section className="bg-ivory text-primaryText py-20 border-b border-ivory-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-ivory-border pb-6">
            <div>
              <span className="text-xs uppercase tracking-ultra-wide text-gold-dark font-semibold">
                RECENT RELEASES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primaryText tracking-tight mt-1">
                NEW HOROLOGICAL ARRIVALS
              </h2>
            </div>
            <Link
              href="/shop?sort=newest"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-gold-dark hover:text-gold transition-colors group font-semibold"
            >
              <span>Explore All Novelties</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Editorial Spotlight */}
      <EditorialSpotlight />

      {/* 6. Curated Best Sellers */}
      <section className="bg-ivory text-primaryText py-20 border-b border-ivory-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-ivory-border pb-6">
            <div>
              <span className="text-xs uppercase tracking-ultra-wide text-gold-dark font-semibold">
                THE ICONIC SERIES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primaryText tracking-tight mt-1">
                BEST-SELLING TIMEPIECES
              </h2>
            </div>
            <Link
              href="/shop"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-gold-dark hover:text-gold transition-colors group font-semibold"
            >
              <span>Shop Full Selection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Brand Story */}
      <BrandStory />

      {/* 8. Brand Benefits & Trust Badges */}
      <BrandBenefits />

      {/* 9. Genuine Customer Reviews */}
      <CustomerReviews />

      {/* 10. Footer */}
      <Footer />
    </div>
  );
}
