"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

interface VariationFormItem {
  sku: string;
  regularPrice: number;
  salePrice: number;
  stockQuantity: number;
  mainImage: string;
  dialColour: string;
  strapType: string;
  caseSize: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Product Fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [sku, setSku] = useState("");
  const [basePrice, setBasePrice] = useState<number>(18500);
  const [categorySlug, setCategorySlug] = useState("mens-watches");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");

  // Technical Specs
  const [movement, setMovement] = useState("Miyota OS20 Quartz Chronograph Movement");
  const [caseMaterial, setCaseMaterial] = useState("316L Surgical Grade Stainless Steel");
  const [caseDiameter, setCaseDiameter] = useState("42 mm");
  const [glassType, setGlassType] = useState("Anti-Reflective Sapphire Crystal");
  const [waterResistance, setWaterResistance] = useState("5 ATM (50m)");

  // Variations List
  const [variants, setVariants] = useState<VariationFormItem[]>([
    {
      sku: "ARV-MODEL-01-BK",
      regularPrice: 21500,
      salePrice: 18500,
      stockQuantity: 10,
      mainImage: "/images/watches/chronograph-speedmaster.jpg",
      dialColour: "Obsidian Black",
      strapType: "316L Solid Steel",
      caseSize: "42mm",
    },
    {
      sku: "ARV-MODEL-01-BL",
      regularPrice: 19800,
      salePrice: 17500,
      stockQuantity: 8,
      mainImage: "/images/watches/navitimer-chronograph.jpg",
      dialColour: "Obsidian Black",
      strapType: "Italian Calfskin Leather",
      caseSize: "42mm",
    },
  ]);

  const handleNameChange = (val: string) => {
    setName(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(generatedSlug);
  };

  const handleAddVariation = () => {
    setVariants((prev) => [
      ...prev,
      {
        sku: `${sku || "ARV-WATCH"}-VAR-${prev.length + 1}`,
        regularPrice: basePrice * 1.15,
        salePrice: basePrice,
        stockQuantity: 10,
        mainImage: "/images/watches/skeleton-watch.jpg",
        dialColour: "Champagne Gold",
        strapType: "316L Stainless Steel",
        caseSize: "42mm",
      },
    ]);
  };

  const handleUpdateVariation = (index: number, field: keyof VariationFormItem, value: any) => {
    setVariants((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleRemoveVariation = (index: number) => {
    if (variants.length <= 1) {
      alert("A product must contain at least one variation.");
      return;
    }
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !sku.trim()) {
      setError("Product Name and Parent SKU are required.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: name.trim(),
        slug: slug.trim(),
        modelNumber: modelNumber.trim(),
        sku: sku.trim(),
        basePrice,
        categorySlug,
        shortDescription,
        fullDescription,
        technicalSpecs: {
          movement,
          caseMaterial,
          caseDiameter,
          glassType,
          waterResistance,
        },
        variants,
      };

      const res = await fetch("/api/admin/products/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create timepiece.");
      }

      setSuccess(true);
      setTimeout(() => router.push("/admin/products"), 1500);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="flex items-center gap-1.5 text-xs text-ivory/60 hover:text-gold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      <div>
        <span className="text-[10px] uppercase tracking-ultra-wide text-gold">ATELIER CATALOGUE</span>
        <h1 className="font-serif text-2xl sm:text-3xl text-ivory font-medium mt-0.5">
          ADD NEW LUXURY TIMEPIECE & VARIATIONS
        </h1>
        <p className="text-xs text-ivory/60 mt-0.5">
          Configure parent watch details, technical specifications, and independent variation combinations
        </p>
      </div>

      {success && (
        <div className="p-4 bg-green-950/80 border border-green-700 text-green-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>Timepiece and variations successfully saved to atelier catalogue! Redirecting...</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-950/80 border border-red-700 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Core Details */}
        <div className="bg-charcoal border border-ivory/15 p-6 space-y-4">
          <h2 className="font-serif text-base text-ivory uppercase tracking-wider border-b border-ivory/10 pb-3">
            1. Core Timepiece Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-ivory/70 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. ARVANO Imperium Tourbillon"
                className="w-full bg-charcoal-dark border border-ivory/20 px-3.5 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-ivory/70 mb-1">
                URL Slug (Auto-generated) *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. arvano-imperium-tourbillon"
                className="w-full bg-charcoal-dark border border-ivory/20 px-3.5 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-ivory/70 mb-1">
                Model Number
              </label>
              <input
                type="text"
                value={modelNumber}
                onChange={(e) => setModelNumber(e.target.value)}
                placeholder="e.g. ARV-IMP-990"
                className="w-full bg-charcoal-dark border border-ivory/20 px-3.5 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-ivory/70 mb-1">
                Parent SKU *
              </label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="e.g. ARV-IMP-990-PARENT"
                className="w-full bg-charcoal-dark border border-ivory/20 px-3.5 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-ivory/70 mb-1">
                Base Price (BDT ৳)
              </label>
              <input
                type="number"
                required
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="w-full bg-charcoal-dark border border-ivory/20 px-3.5 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-ivory/70 mb-1">
                Primary Category *
              </label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full bg-charcoal-dark border border-ivory/20 px-3.5 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
              >
                <option value="mens-watches">Men&apos;s Watches</option>
                <option value="automatic-watches">Automatic & Mechanical</option>
                <option value="chronograph-watches">Chronograph Precision</option>
                <option value="classic-watches">Classic & Dress</option>
                <option value="womens-watches">Women&apos;s Collection</option>
                <option value="luxury-collection">Luxury Limited Edition</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] uppercase tracking-wider text-ivory/70 mb-1">
                Short Description
              </label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="e.g. An authoritative 42mm mechanical chronograph with champagne gold accents."
                className="w-full bg-charcoal-dark border border-ivory/20 px-3.5 py-2 text-xs text-ivory focus:border-gold focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] uppercase tracking-wider text-ivory/70 mb-1">
                Full Atelier Editorial Description
              </label>
              <textarea
                rows={3}
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                placeholder="Detailed story of the watch, engineering, movement craftsmanship..."
                className="w-full bg-charcoal-dark border border-ivory/20 p-3 text-xs text-ivory focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Technical Specifications */}
        <div className="bg-charcoal border border-ivory/15 p-6 space-y-4">
          <h2 className="font-serif text-base text-ivory uppercase tracking-wider border-b border-ivory/10 pb-3">
            2. Technical Specifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-[11px] uppercase text-ivory/70 mb-1">Movement Type</label>
              <input
                type="text"
                value={movement}
                onChange={(e) => setMovement(e.target.value)}
                className="w-full bg-charcoal-dark border border-ivory/20 px-3 py-2 text-xs text-ivory"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase text-ivory/70 mb-1">Case Material</label>
              <input
                type="text"
                value={caseMaterial}
                onChange={(e) => setCaseMaterial(e.target.value)}
                className="w-full bg-charcoal-dark border border-ivory/20 px-3 py-2 text-xs text-ivory"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase text-ivory/70 mb-1">Case Diameter</label>
              <input
                type="text"
                value={caseDiameter}
                onChange={(e) => setCaseDiameter(e.target.value)}
                className="w-full bg-charcoal-dark border border-ivory/20 px-3 py-2 text-xs text-ivory"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase text-ivory/70 mb-1">Glass Type</label>
              <input
                type="text"
                value={glassType}
                onChange={(e) => setGlassType(e.target.value)}
                className="w-full bg-charcoal-dark border border-ivory/20 px-3 py-2 text-xs text-ivory"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase text-ivory/70 mb-1">Water Resistance</label>
              <input
                type="text"
                value={waterResistance}
                onChange={(e) => setWaterResistance(e.target.value)}
                className="w-full bg-charcoal-dark border border-ivory/20 px-3 py-2 text-xs text-ivory"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Dynamic Variations (Independent Pricing, SKU, Stock, Image) */}
        <div className="bg-charcoal border border-ivory/15 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-ivory/10 pb-3">
            <div>
              <h2 className="font-serif text-base text-ivory uppercase tracking-wider">
                3. Product Variations Matrix
              </h2>
              <p className="text-[11px] text-ivory/50">
                Each variation has its own independent Regular Price, Sales Price, SKU, Stock Quantity, and Image
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddVariation}
              className="flex items-center gap-1.5 bg-charcoal-dark border border-gold text-gold hover:bg-gold hover:text-charcoal px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Variation</span>
            </button>
          </div>

          <div className="space-y-5">
            {variants.map((v, idx) => (
              <div
                key={idx}
                className="p-5 bg-charcoal-dark border border-ivory/15 relative space-y-4"
              >
                <div className="flex items-center justify-between border-b border-ivory/10 pb-2">
                  <span className="font-serif text-xs uppercase tracking-wider text-gold font-bold">
                    Variation #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveVariation(idx)}
                    className="text-ivory/40 hover:text-red-400 text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] uppercase text-ivory/60 mb-1">Dial Colour</label>
                    <input
                      type="text"
                      value={v.dialColour}
                      onChange={(e) => handleUpdateVariation(idx, "dialColour", e.target.value)}
                      placeholder="e.g. Obsidian Black"
                      className="w-full bg-charcoal border border-ivory/20 px-2.5 py-1.5 text-xs text-ivory"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-ivory/60 mb-1">Strap Type</label>
                    <input
                      type="text"
                      value={v.strapType}
                      onChange={(e) => handleUpdateVariation(idx, "strapType", e.target.value)}
                      placeholder="e.g. 316L Steel"
                      className="w-full bg-charcoal border border-ivory/20 px-2.5 py-1.5 text-xs text-ivory"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-ivory/60 mb-1">Unique SKU</label>
                    <input
                      type="text"
                      value={v.sku}
                      onChange={(e) => handleUpdateVariation(idx, "sku", e.target.value)}
                      className="w-full bg-charcoal border border-ivory/20 px-2.5 py-1.5 text-xs text-ivory font-mono uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-ivory/60 mb-1">Sale Price (৳)</label>
                    <input
                      type="number"
                      value={v.salePrice}
                      onChange={(e) => handleUpdateVariation(idx, "salePrice", Number(e.target.value))}
                      className="w-full bg-charcoal border border-gold/40 px-2.5 py-1.5 text-xs text-ivory font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-ivory/60 mb-1">Regular Price (৳)</label>
                    <input
                      type="number"
                      value={v.regularPrice}
                      onChange={(e) =>
                        handleUpdateVariation(idx, "regularPrice", Number(e.target.value))
                      }
                      className="w-full bg-charcoal border border-ivory/20 px-2.5 py-1.5 text-xs text-ivory font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-ivory/60 mb-1">Stock Qty</label>
                    <input
                      type="number"
                      value={v.stockQuantity}
                      onChange={(e) =>
                        handleUpdateVariation(idx, "stockQuantity", Number(e.target.value))
                      }
                      className="w-full bg-charcoal border border-ivory/20 px-2.5 py-1.5 text-xs text-ivory font-mono"
                    />
                  </div>

                  <div className="sm:col-span-3 lg:col-span-6">
                    <label className="block text-[10px] uppercase text-ivory/60 mb-1">
                      Variation Image URL (Dedicated photo for this variation)
                    </label>
                    <input
                      type="text"
                      value={v.mainImage}
                      onChange={(e) => handleUpdateVariation(idx, "mainImage", e.target.value)}
                      placeholder="/images/watches/model.jpg or https://..."
                      className="w-full bg-charcoal border border-ivory/20 px-2.5 py-1.5 text-xs text-ivory font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/products"
            className="border border-ivory/20 hover:border-ivory text-ivory/80 px-6 py-3 text-xs uppercase tracking-wider transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-gold hover:bg-gold-hover text-charcoal px-8 py-3.5 text-xs font-bold uppercase tracking-luxury transition-all shadow-gold-glow disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>PUBLISH TIMEPIECE & VARIATIONS</span>
          </button>
        </div>
      </form>
    </div>
  );
}
