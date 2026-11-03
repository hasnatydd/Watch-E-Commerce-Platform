import React from "react";
import Link from "next/link";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { ProductCard } from "@/components/storefront/product-card";
import { getProducts, getCategories } from "@/services/product-service";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    search?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts({
      category: params.category,
      sort: params.sort,
      search: params.search,
    }),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      {/* Header Banner */}
      <div className="bg-charcoal-dark border-b border-ivory/10 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-ultra-wide text-gold">HOROLOGY CATALOGUE</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-ivory tracking-tight mt-1">
            ALL TIMEPIECES
          </h1>
          <p className="text-xs sm:text-sm text-ivory/60 mt-2 max-w-xl mx-auto font-light">
            Engineered with surgical 316L stainless steel, scratch-resistant sapphire crystals, and precision calibres.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-ivory text-primaryText flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter and Sort Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-ivory-border">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/shop"
                className={`text-xs uppercase tracking-wider px-3.5 py-1.5 border transition-colors ${
                  !params.category
                    ? "bg-charcoal text-gold border-charcoal font-semibold"
                    : "bg-white text-secondaryText border-ivory-border hover:border-gold"
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.slug}`}
                  className={`text-xs uppercase tracking-wider px-3.5 py-1.5 border transition-colors ${
                    params.category === cat.slug
                      ? "bg-charcoal text-gold border-charcoal font-semibold"
                      : "bg-white text-secondaryText border-ivory-border hover:border-gold"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Sorting links */}
            <div className="flex items-center gap-2 text-xs text-secondaryText">
              <span className="uppercase tracking-wider">Sort:</span>
              <Link
                href={`/shop?${params.category ? `category=${params.category}&` : ""}sort=featured`}
                className={`hover:text-primaryText ${params.sort === "featured" || !params.sort ? "font-bold text-primaryText" : ""}`}
              >
                Featured
              </Link>
              <span>•</span>
              <Link
                href={`/shop?${params.category ? `category=${params.category}&` : ""}sort=newest`}
                className={`hover:text-primaryText ${params.sort === "newest" ? "font-bold text-primaryText" : ""}`}
              >
                Newest
              </Link>
              <span>•</span>
              <Link
                href={`/shop?${params.category ? `category=${params.category}&` : ""}sort=price-low`}
                className={`hover:text-primaryText ${params.sort === "price-low" ? "font-bold text-primaryText" : ""}`}
              >
                Price: Low to High
              </Link>
              <span>•</span>
              <Link
                href={`/shop?${params.category ? `category=${params.category}&` : ""}sort=price-high`}
                className={`hover:text-primaryText ${params.sort === "price-high" ? "font-bold text-primaryText" : ""}`}
              >
                Price: High to Low
              </Link>
            </div>
          </div>

          {/* Product Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="font-serif text-2xl text-primaryText">No timepieces found</h3>
              <p className="text-xs text-secondaryText mt-1">
                Try selecting a different category or clearing search filters.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-block bg-charcoal text-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-gold hover:text-charcoal transition-colors"
              >
                Clear Filters
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
