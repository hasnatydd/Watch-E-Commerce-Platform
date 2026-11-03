"use client";

import React, { useState } from "react";
import { Boxes, Plus, Minus, AlertTriangle, CheckCircle2, History } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  variation: string;
  sku: string;
  stockQuantity: number;
  lowStockThreshold: number;
}

export default function AdminInventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: "var-1",
      name: "ARVANO Chronos Tachymeter",
      variation: "Obsidian Black / 316L Steel",
      sku: "ARV-CR-901-BS",
      stockQuantity: 14,
      lowStockThreshold: 3,
    },
    {
      id: "var-2",
      name: "ARVANO Chronos Tachymeter",
      variation: "Midnight Navy / 316L Steel",
      sku: "ARV-CR-901-BLS",
      stockQuantity: 8,
      lowStockThreshold: 3,
    },
    {
      id: "var-3",
      name: "ARVANO Sovereign Automatic",
      variation: "Sunburst Emerald / Gold & Steel",
      sku: "ARV-SV-800-EG",
      stockQuantity: 2,
      lowStockThreshold: 3,
    },
    {
      id: "var-4",
      name: "ARVANO Phantom Skeleton",
      variation: "Skeleton Gunmetal / Titanium Bracelet",
      sku: "ARV-SK-770-GM",
      stockQuantity: 5,
      lowStockThreshold: 3,
    },
    {
      id: "var-5",
      name: "ARVANO Heritage Slim Dress",
      variation: "Warm Ivory / Cognac Brown Leather",
      sku: "ARV-HT-550-IV",
      stockQuantity: 20,
      lowStockThreshold: 4,
    },
  ]);

  const [notification, setNotification] = useState("");

  const handleAdjustStock = (id: string, delta: number, reason: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.stockQuantity + delta);
          return { ...item, stockQuantity: newQty };
        }
        return item;
      })
    );
    setNotification(`Stock movement recorded (${delta > 0 ? "+" : ""}${delta} units) • Reason: ${reason}`);
    setTimeout(() => setNotification(""), 3500);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-ultra-wide text-gold">HOROLOGY ATELIER</span>
          <h1 className="font-serif text-2xl sm:text-3xl text-ivory font-medium mt-0.5">
            INVENTORY & STOCK CONTROL
          </h1>
          <p className="text-xs text-ivory/60 mt-0.5">
            Perform Stock In, Stock Out, and inspect low-stock warnings across individual watch variations
          </p>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-green-950/80 border border-green-700 text-green-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      <div className="bg-charcoal border border-ivory/10 shadow-luxury overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ivory/80">
            <thead className="bg-charcoal-dark text-ivory/50 uppercase tracking-wider font-mono text-[10px] border-b border-ivory/10">
              <tr>
                <th className="py-3.5 px-4">Timepiece / Model</th>
                <th className="py-3.5 px-4">Variation Attributes</th>
                <th className="py-3.5 px-4">Variation SKU</th>
                <th className="py-3.5 px-4">Current Stock</th>
                <th className="py-3.5 px-4">Threshold</th>
                <th className="py-3.5 px-4 text-right">Adjust Stock (In / Out)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory/10 font-mono">
              {items.map((item) => {
                const isLow = item.stockQuantity <= item.lowStockThreshold;

                return (
                  <tr key={item.id} className="hover:bg-charcoal-dark/50 transition-colors">
                    <td className="py-3.5 px-4 font-sans font-medium text-ivory">{item.name}</td>
                    <td className="py-3.5 px-4 font-sans text-ivory/70">{item.variation}</td>
                    <td className="py-3.5 px-4 text-gold font-bold">{item.sku}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-ivory">{item.stockQuantity}</span>
                        {isLow && (
                          <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-950/80 px-2 py-0.5 border border-amber-700 font-sans uppercase">
                            <AlertTriangle className="w-3 h-3" /> Low Stock
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-ivory/50">{item.lowStockThreshold} units</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 font-sans">
                        <button
                          onClick={() => handleAdjustStock(item.id, -1, "STOCK_OUT")}
                          disabled={item.stockQuantity <= 0}
                          className="p-1.5 bg-charcoal-dark hover:bg-red-950 text-ivory/70 hover:text-red-300 border border-ivory/20 disabled:opacity-30"
                          title="Stock Out (-1 unit)"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleAdjustStock(item.id, 1, "STOCK_IN")}
                          className="p-1.5 bg-charcoal-dark hover:bg-green-950 text-ivory/70 hover:text-green-300 border border-ivory/20"
                          title="Stock In (+1 unit)"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleAdjustStock(item.id, 5, "BATCH_STOCK_IN")}
                          className="px-2 py-1 bg-charcoal-dark hover:bg-gold hover:text-charcoal text-ivory/70 border border-ivory/20 text-[10px] font-bold"
                          title="Add Batch (+5 units)"
                        >
                          +5 Batch
                        </button>
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
