"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight, Loader2 } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.products || []);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-charcoal-deep/85 backdrop-blur-md px-4">
      <div className="w-full max-w-3xl bg-charcoal border border-gold/30 shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-ivory/60 hover:text-gold transition-colors"
          aria-label="Close search"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-ultra-wide text-gold">Search Timepieces</span>
          <h2 className="font-serif text-2xl text-ivory tracking-wide mt-1">DISCOVER ARVANO</h2>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/70" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by model, dial colour, strap, or SKU (e.g. Chronos, Automatic)..."
            className="w-full bg-charcoal-dark border border-ivory/20 text-ivory pl-12 pr-12 py-3.5 focus:border-gold focus:outline-none transition-colors text-sm placeholder:text-ivory/40"
          />
          {loading && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold animate-spin" />
          )}
        </div>

        {/* Results Area */}
        <div className="mt-6 max-h-[60vh] overflow-y-auto divide-y divide-ivory/10">
          {results.length > 0 ? (
            results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="flex items-center gap-4 py-3.5 hover:bg-charcoal-dark/50 px-2 transition-colors group"
              >
                <div className="w-14 h-14 bg-charcoal-dark flex-shrink-0 relative overflow-hidden border border-gold/20">
                  <Image
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs uppercase tracking-wider text-gold/70">{product.modelNumber || "ARVANO"}</div>
                  <h4 className="font-serif text-base text-ivory truncate group-hover:text-gold transition-colors">
                    {product.name}
                  </h4>
                  <div className="text-xs text-ivory/60 truncate">{product.shortDescription}</div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gold">
                    ৳{product.basePrice.toLocaleString()}
                  </span>
                  <ArrowRight className="w-4 h-4 text-ivory/40 group-hover:text-gold group-hover:translate-x-1 transition-all ml-auto mt-1" />
                </div>
              </Link>
            ))
          ) : query.trim() && !loading ? (
            <div className="py-8 text-center text-ivory/60">
              No timepieces found matching &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <div className="py-6">
              <div className="text-xs uppercase tracking-widest text-ivory/40 mb-3">Popular Collections</div>
              <div className="flex flex-wrap gap-2">
                {["Chronos", "Automatic", "Sovereign", "Phantom", "Men's Watches", "Classic"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs bg-charcoal-dark text-ivory/80 border border-ivory/10 hover:border-gold hover:text-gold px-3 py-1.5 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
