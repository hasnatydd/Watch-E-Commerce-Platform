import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit3, Trash2, Eye, Boxes } from "lucide-react";
import { getProducts } from "@/services/product-service";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-ultra-wide text-gold">HOROLOGY INVENTORY</span>
          <h1 className="font-serif text-2xl sm:text-3xl text-ivory font-medium mt-0.5">
            ALL TIMEPIECES & VARIATIONS
          </h1>
          <p className="text-xs text-ivory/60 mt-0.5">
            Manage models, individual variation pricing, SKUs, and stock availability
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-gold hover:bg-gold-hover text-charcoal px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors shadow-gold-glow self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Timepiece</span>
        </Link>
      </div>

      <div className="bg-charcoal border border-ivory/10 shadow-luxury overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ivory/80">
            <thead className="bg-charcoal-dark text-ivory/50 uppercase tracking-wider font-mono text-[10px] border-b border-ivory/10">
              <tr>
                <th className="py-3.5 px-4">Watch / Model</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Variations</th>
                <th className="py-3.5 px-4">Base Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory/10">
              {products.map((p) => {
                const totalStock = p.variants?.reduce((sum, v) => sum + v.stockQuantity, 0) || 0;
                return (
                  <tr key={p.id} className="hover:bg-charcoal-dark/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-charcoal-dark relative flex-shrink-0 border border-ivory/20">
                          <Image
                            src={p.mainImage || "/images/arvano-icon.jpg"}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-serif text-sm text-ivory font-medium">{p.name}</div>
                          <div className="text-[10px] text-ivory/50 uppercase font-mono">
                            {p.modelNumber || "ARVANO"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-gold text-[11px]">{p.sku}</td>
                    <td className="py-3 px-4">
                      <span className="bg-charcoal-dark border border-ivory/20 px-2 py-0.5 text-[10px] text-ivory/80">
                        {p.variants?.length || 1} Variations
                      </span>
                    </td>
                    <td className="py-3 px-4 font-serif font-semibold text-ivory text-sm">
                      ৳{p.basePrice.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-mono text-xs font-bold ${
                          totalStock <= 5 ? "text-amber-400" : "text-green-400"
                        }`}
                      >
                        {totalStock} units
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-green-950 text-green-300 border border-green-800 text-[10px] font-bold uppercase px-2 py-0.5">
                        PUBLISHED
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/product/${p.slug}`}
                          target="_blank"
                          className="p-1.5 text-ivory/50 hover:text-gold"
                          title="View on Storefront"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/products/new?edit=${p.id}`}
                          className="p-1.5 text-ivory/50 hover:text-gold"
                          title="Edit Timepiece"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
