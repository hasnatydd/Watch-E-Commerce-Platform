import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string;
  count?: number;
}

export function CategorySection({ categories }: { categories: Category[] }) {
  return (
    <section className="bg-charcoal-dark py-20 border-b border-ivory/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-ivory/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-ultra-wide text-gold">Shop By Category</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory tracking-tight mt-1">
              THE ARVANO COLLECTIONS
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-gold hover:text-gold-light transition-colors group"
          >
            <span>View All Timepieces</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative h-80 sm:h-96 overflow-hidden border border-ivory/10 hover:border-gold/60 transition-all duration-300 block bg-charcoal"
            >
              {/* Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out opacity-75 group-hover:opacity-90"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal/40 to-transparent" />

              {/* Content at Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-ultra-wide text-gold/80 mb-1">
                  HOROLOGY ATELIER
                </span>
                <h3 className="font-serif text-2xl text-ivory group-hover:text-gold transition-colors">
                  {cat.name}
                </h3>
                {cat.description && (
                  <p className="text-xs text-ivory/70 line-clamp-2 mt-1 font-light">
                    {cat.description}
                  </p>
                )}
                <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-ivory group-hover:text-gold transition-colors">
                  <span>Explore Series</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-gold" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
