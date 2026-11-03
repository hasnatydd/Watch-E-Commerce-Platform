import React from "react";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { CategorySection } from "@/components/storefront/category-section";
import { getCategories } from "@/services/product-service";

export default async function CollectionsPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      <div className="bg-charcoal-dark border-b border-ivory/10 py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-ultra-wide text-gold">THE ATELIER</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory tracking-tight mt-1">
            CURATED COLLECTIONS
          </h1>
          <p className="text-xs sm:text-sm text-ivory/60 mt-3 max-w-xl mx-auto font-light">
            From the visceral complexity of Automatic Skeletons to the aerodynamic precision of Chronographs, explore ARVANO series.
          </p>
        </div>
      </div>

      <CategorySection categories={categories} />

      <Footer />
    </div>
  );
}
