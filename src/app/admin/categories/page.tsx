import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FolderTree, Plus, Edit3 } from "lucide-react";
import { getCategories } from "@/services/product-service";

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-ultra-wide text-gold">COLLECTION TAXONOMY</span>
          <h1 className="font-serif text-2xl sm:text-3xl text-ivory font-medium mt-0.5">
            PRODUCT CATEGORIES
          </h1>
          <p className="text-xs text-ivory/60 mt-0.5">
            Manage storefront collection tiles, navigation links, and category imagery
          </p>
        </div>
      </div>

      <div className="bg-charcoal border border-ivory/10 shadow-luxury overflow-hidden">
        <div className="divide-y divide-ivory/10">
          {categories.map((c) => (
            <div key={c.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-charcoal-dark/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-charcoal-dark relative flex-shrink-0 border border-ivory/20">
                  <Image src={c.image} alt={c.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-ivory font-medium">{c.name}</h3>
                  <div className="text-[11px] text-gold font-mono">slug: /category/{c.slug}</div>
                  <p className="text-xs text-ivory/60 line-clamp-1 mt-0.5">{c.description}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="bg-charcoal-dark border border-ivory/20 px-2.5 py-1 text-xs text-ivory font-mono">
                  {c.count} Timepieces
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
