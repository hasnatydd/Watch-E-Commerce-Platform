import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { ProductCard } from "@/components/storefront/product-card";
import { getProducts, getCategories } from "@/services/product-service";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const currentCategory = categories.find((c) => c.slug === slug);

  if (!currentCategory) {
    // If not found in categories, redirect or render standard
  }

  const products = await getProducts({ category: slug });

  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      {/* Header Banner */}
      <div className="bg-charcoal-dark border-b border-ivory/10 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-ultra-wide text-gold">COLLECTION</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-ivory tracking-tight mt-1">
            {currentCategory?.name || slug.replace(/-/g, " ").toUpperCase()}
          </h1>
          <p className="text-xs sm:text-sm text-ivory/60 mt-2 max-w-xl mx-auto font-light">
            {currentCategory?.description || "Exclusively curated luxury wristwatches engineered for distinct presence."}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="bg-ivory text-primaryText flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-ivory-border">
            <span className="text-xs uppercase tracking-wider text-secondaryText">
              Showing {products.length} Timepieces
            </span>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-luxury text-gold-dark hover:text-gold font-semibold"
            >
              ← Back to All Timepieces
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="font-serif text-2xl text-primaryText">No timepieces currently in this collection</h3>
              <p className="text-xs text-secondaryText mt-1">
                Our artisans are preparing novelties. Please explore our other collections.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-block bg-charcoal text-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-gold hover:text-charcoal transition-colors"
              >
                View All Timepieces
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
