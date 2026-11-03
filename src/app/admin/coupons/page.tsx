"use client";

import React, { useState, useEffect } from "react";
import {
  Ticket,
  Plus,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Percent,
  Banknote,
  Calendar,
  Layers,
  Power,
  Trash2,
  X,
  Search,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Clock,
  Loader2,
} from "lucide-react";
import { CouponItem } from "@/services/coupon-service";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");
  const [typeFilter, setTypeFilter] = useState<"ALL" | "PERCENTAGE" | "FIXED">("ALL");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Form Fields
  const [code, setCode] = useState("");
  const [type, setType] = useState<"PERCENTAGE" | "FIXED">("PERCENTAGE");
  const [value, setValue] = useState("");
  const [minOrderValue, setMinOrderValue] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/coupons");
      const data = await res.json();
      if (data.coupons) {
        setCoupons(data.coupons);
      }
    } catch (err) {
      console.error("Failed fetching coupons:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (couponCode: string) => {
    navigator.clipboard.writeText(couponCode);
    setCopiedCode(couponCode);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/coupons?action=toggle&id=${id}`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.success && data.coupon) {
        setCoupons((prev) =>
          prev.map((c) => (c.id === id ? { ...c, isActive: data.coupon.isActive } : c))
        );
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleDeleteCoupon = async (id: string, couponCode: string) => {
    if (!confirm(`Are you sure you want to permanently delete coupon '${couponCode}'?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/coupons?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setCoupons((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert(data.error || "Failed deleting coupon.");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          type,
          value: parseFloat(value),
          minOrderValue: minOrderValue ? parseFloat(minOrderValue) : null,
          maxDiscount: type === "PERCENTAGE" && maxDiscount ? parseFloat(maxDiscount) : null,
          usageLimit: usageLimit ? parseInt(usageLimit, 10) : null,
          endDate: endDate ? new Date(endDate).toISOString() : null,
          description: description.trim() || null,
          isActive,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed creating coupon.");
      }

      // Add to list and close modal
      setCoupons((prev) => [data.coupon, ...prev]);
      resetForm();
      setModalOpen(false);
    } catch (err: any) {
      setFormError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setCode("");
    setType("PERCENTAGE");
    setValue("");
    setMinOrderValue("");
    setMaxDiscount("");
    setUsageLimit("");
    setEndDate("");
    setDescription("");
    setIsActive(true);
    setFormError("");
  };

  const applyPreset = (preset: {
    code: string;
    type: "PERCENTAGE" | "FIXED";
    value: string;
    minOrderValue: string;
    maxDiscount: string;
    description: string;
  }) => {
    setCode(preset.code);
    setType(preset.type);
    setValue(preset.value);
    setMinOrderValue(preset.minOrderValue);
    setMaxDiscount(preset.maxDiscount);
    setDescription(preset.description);
  };

  // Filtered coupons
  const filteredCoupons = coupons.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "ALL"
        ? true
        : statusFilter === "ACTIVE"
        ? c.isActive
        : !c.isActive;

    const matchesType =
      typeFilter === "ALL" ? true : c.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Analytics Metrics
  const totalCouponsCount = coupons.length;
  const activeCount = coupons.filter((c) => c.isActive).length;
  const totalRedemptions = coupons.reduce((sum, c) => sum + (c.usedCount || 0), 0);

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ivory/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gold/10 border border-gold/30 text-gold text-[10px] uppercase font-mono tracking-wider mb-2">
            <Ticket className="w-3.5 h-3.5" />
            <span>MARKETING & PROMOTIONS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-ivory font-normal tracking-tight">
            PROMOTIONAL COUPONS ENGINE
          </h1>
          <p className="text-xs sm:text-sm text-ivory/60 mt-1 font-light max-w-2xl">
            Create, configure, and monitor customer promo codes with server-validated minimum spend thresholds, percentage/fixed savings, and redemption ceilings.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setModalOpen(true);
          }}
          className="bg-gold hover:bg-gold-hover text-charcoal px-6 py-3.5 text-xs font-bold uppercase tracking-luxury transition-all shadow-gold-glow flex items-center justify-center gap-2 flex-shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>CREATE NEW COUPON</span>
        </button>
      </div>

      {/* KPI Stats Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-charcoal border border-ivory/10 p-5 space-y-1">
          <div className="flex items-center justify-between text-ivory/50 text-[10px] uppercase font-mono tracking-wider">
            <span>Configured Vouchers</span>
            <Layers className="w-4 h-4 text-gold" />
          </div>
          <div className="font-serif text-3xl text-ivory font-bold">{totalCouponsCount}</div>
          <div className="text-[11px] text-ivory/60 font-light">Total promotional codes in database</div>
        </div>

        <div className="bg-charcoal border border-ivory/10 p-5 space-y-1">
          <div className="flex items-center justify-between text-ivory/50 text-[10px] uppercase font-mono tracking-wider">
            <span>Active Campaigns</span>
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          </div>
          <div className="font-serif text-3xl text-green-400 font-bold">{activeCount}</div>
          <div className="text-[11px] text-ivory/60 font-light">Currently redeemable in cart & checkout</div>
        </div>

        <div className="bg-charcoal border border-ivory/10 p-5 space-y-1">
          <div className="flex items-center justify-between text-ivory/50 text-[10px] uppercase font-mono tracking-wider">
            <span>Total Redemptions</span>
            <TrendingUp className="w-4 h-4 text-gold" />
          </div>
          <div className="font-serif text-3xl text-gold font-bold">{totalRedemptions}</div>
          <div className="text-[11px] text-ivory/60 font-light">Times customers applied vouchers</div>
        </div>

        <div className="bg-charcoal border border-ivory/10 p-5 space-y-1">
          <div className="flex items-center justify-between text-ivory/50 text-[10px] uppercase font-mono tracking-wider">
            <span>Security Engine</span>
            <ShieldCheck className="w-4 h-4 text-gold" />
          </div>
          <div className="font-serif text-lg text-ivory font-medium mt-1">100% Server Verified</div>
          <div className="text-[11px] text-green-400 font-mono">● Instant Min-Spend Enforcement</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-charcoal p-4 border border-ivory/10">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ivory/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coupon code or campaign note (e.g. ARVANO10)..."
            className="w-full bg-charcoal-deep border border-ivory/15 pl-10 pr-4 py-2.5 text-xs text-ivory placeholder:text-ivory/30 focus:border-gold outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-charcoal-deep border border-ivory/15 px-3 py-2.5 text-xs text-ivory focus:border-gold outline-none font-mono"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Only</option>
            <option value="INACTIVE">Paused / Inactive</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="bg-charcoal-deep border border-ivory/15 px-3 py-2.5 text-xs text-ivory focus:border-gold outline-none font-mono"
          >
            <option value="ALL">All Types</option>
            <option value="PERCENTAGE">Percentage (%)</option>
            <option value="FIXED">Fixed Cash (৳)</option>
          </select>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-charcoal border border-ivory/10 shadow-luxury overflow-hidden">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto" />
            <p className="text-xs text-ivory/60 font-mono">Loading Promotional Engine Records...</p>
          </div>
        ) : filteredCoupons.length === 0 ? (
          <div className="py-16 text-center space-y-4 px-4">
            <Ticket className="w-12 h-12 text-ivory/20 mx-auto" />
            <div>
              <h3 className="font-serif text-lg text-ivory">No Promotional Coupons Found</h3>
              <p className="text-xs text-ivory/50 mt-1 max-w-md mx-auto font-light">
                {searchQuery || statusFilter !== "ALL" || typeFilter !== "ALL"
                  ? "No vouchers matched your current search filters. Try clearing search criteria."
                  : "No promotional campaigns currently created. Click '+ Create New Coupon' to launch your first code."}
              </p>
            </div>
            {(searchQuery || statusFilter !== "ALL" || typeFilter !== "ALL") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("ALL");
                  setTypeFilter("ALL");
                }}
                className="text-xs text-gold hover:underline font-mono"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ivory/80 font-mono">
              <thead className="bg-charcoal-deep text-ivory/50 uppercase tracking-wider text-[10px] border-b border-ivory/10">
                <tr>
                  <th className="py-3.5 px-5">Coupon Code</th>
                  <th className="py-3.5 px-4">Discount Value</th>
                  <th className="py-3.5 px-4">Spend Requirements</th>
                  <th className="py-3.5 px-4">Usage / Ceiling</th>
                  <th className="py-3.5 px-4">Validity</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory/10">
                {filteredCoupons.map((c) => {
                  const isExpired = c.endDate && new Date(c.endDate) < new Date();
                  const isExhausted = c.usageLimit && c.usedCount >= c.usageLimit;

                  return (
                    <tr key={c.id} className="hover:bg-charcoal-deep/60 transition-colors">
                      {/* Coupon Code & Description */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gold text-sm tracking-wider font-mono">
                            {c.code}
                          </span>
                          <button
                            onClick={() => handleCopyCode(c.code)}
                            title="Copy code to clipboard"
                            className="text-ivory/40 hover:text-gold transition-colors p-1"
                          >
                            {copiedCode === c.code ? (
                              <Check className="w-3.5 h-3.5 text-green-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        {c.description && (
                          <div className="text-[11px] text-ivory/50 font-sans mt-0.5 line-clamp-1 max-w-xs">
                            {c.description}
                          </div>
                        )}
                      </td>

                      {/* Discount Value */}
                      <td className="py-4 px-4">
                        <div className="inline-flex items-center gap-1.5 font-bold text-ivory font-sans text-sm">
                          {c.type === "PERCENTAGE" ? (
                            <>
                              <Percent className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                              <span>{c.value}% OFF</span>
                            </>
                          ) : (
                            <>
                              <Banknote className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                              <span>৳{c.value.toLocaleString()} FLAT</span>
                            </>
                          )}
                        </div>
                        <div className="text-[10px] text-ivory/40 uppercase font-mono mt-0.5">
                          {c.type === "PERCENTAGE" ? "Percentage Reduction" : "Fixed Cash Discount"}
                        </div>
                      </td>

                      {/* Spend Requirements */}
                      <td className="py-4 px-4 text-[11px]">
                        <div>
                          <span className="text-ivory/50">Min: </span>
                          <span className="text-ivory font-semibold">
                            {c.minOrderValue ? `৳${c.minOrderValue.toLocaleString()}` : "None"}
                          </span>
                        </div>
                        {c.type === "PERCENTAGE" && (
                          <div className="text-[10px] text-ivory/50">
                            Cap:{" "}
                            <span className="text-gold font-medium">
                              {c.maxDiscount ? `৳${c.maxDiscount.toLocaleString()}` : "Unlimited"}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Usage / Ceiling */}
                      <td className="py-4 px-4 text-[11px]">
                        <div className="flex items-center gap-1.5 font-medium text-ivory">
                          <span>{c.usedCount}</span>
                          <span className="text-ivory/40">
                            / {c.usageLimit ? `${c.usageLimit} max` : "∞"}
                          </span>
                        </div>
                        {c.usageLimit && (
                          <div className="w-20 bg-ivory/10 h-1.5 mt-1 overflow-hidden">
                            <div
                              className={`h-full ${
                                isExhausted ? "bg-red-400" : "bg-gold"
                              }`}
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.round((c.usedCount / c.usageLimit) * 100)
                                )}%`,
                              }}
                            />
                          </div>
                        )}
                      </td>

                      {/* Validity */}
                      <td className="py-4 px-4 text-[11px]">
                        {c.endDate ? (
                          <div>
                            <div className={isExpired ? "text-red-400 font-semibold" : "text-ivory/80"}>
                              {new Date(c.endDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                            {isExpired && (
                              <span className="text-[9px] uppercase font-bold text-red-400 bg-red-950/60 px-1 py-0.2">
                                Expired
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-ivory/50">Never Expires</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        {c.isActive && !isExpired && !isExhausted ? (
                          <span className="bg-green-950 text-green-300 border border-green-800 text-[10px] uppercase font-bold px-2 py-0.5 inline-block">
                            ACTIVE
                          </span>
                        ) : (
                          <span className="bg-charcoal-deep text-ivory/40 border border-ivory/20 text-[10px] uppercase font-bold px-2 py-0.5 inline-block">
                            {isExpired ? "EXPIRED" : isExhausted ? "EXHAUSTED" : "PAUSED"}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right space-x-2">
                        <button
                          onClick={() => handleToggleStatus(c.id)}
                          title={c.isActive ? "Pause voucher" : "Activate voucher"}
                          className={`p-1.5 border transition-colors ${
                            c.isActive
                              ? "border-green-800/60 text-green-400 hover:bg-green-900/30"
                              : "border-ivory/20 text-ivory/40 hover:text-ivory hover:border-ivory/40"
                          }`}
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteCoupon(c.id, c.code)}
                          title="Delete coupon"
                          className="p-1.5 border border-red-900/40 text-red-400 hover:bg-red-950/40 hover:border-red-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE NEW COUPON MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-charcoal border border-gold/40 shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-ivory/10 pb-4">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-gold" />
                <h2 className="font-serif text-xl sm:text-2xl text-ivory">
                  CREATE PROMOTIONAL COUPON
                </h2>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-ivory/60 hover:text-gold transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Presets Ribbon */}
            <div className="p-3 bg-charcoal-deep border border-ivory/10 space-y-1.5">
              <span className="text-[10px] uppercase font-mono text-gold flex items-center gap-1 font-semibold">
                <Sparkles className="w-3 h-3 text-gold" />
                <span>Quick Atelier Presets:</span>
              </span>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() =>
                    applyPreset({
                      code: "ARVANO15",
                      type: "PERCENTAGE",
                      value: "15",
                      minOrderValue: "18000",
                      maxDiscount: "4000",
                      description: "Special seasonal 15% luxury voucher for orders above ৳18,000",
                    })
                  }
                  className="px-2.5 py-1 bg-charcoal border border-ivory/15 hover:border-gold hover:text-gold text-ivory/80 transition-colors"
                >
                  15% Off (Min ৳18k)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    applyPreset({
                      code: "EID2026",
                      type: "FIXED",
                      value: "2000",
                      minOrderValue: "25000",
                      maxDiscount: "",
                      description: "Eid-ul-Fitr Royal Festive Promotion - Flat ৳2,000 Reduction",
                    })
                  }
                  className="px-2.5 py-1 bg-charcoal border border-ivory/15 hover:border-gold hover:text-gold text-ivory/80 transition-colors"
                >
                  ৳2,000 Eid Voucher
                </button>
                <button
                  type="button"
                  onClick={() =>
                    applyPreset({
                      code: "HOROLOGY5000",
                      type: "FIXED",
                      value: "5000",
                      minOrderValue: "50000",
                      maxDiscount: "",
                      description: "Master Patron acquisition incentive on tourbillon calibres",
                    })
                  }
                  className="px-2.5 py-1 bg-charcoal border border-ivory/15 hover:border-gold hover:text-gold text-ivory/80 transition-colors"
                >
                  ৳5,000 Flagship Code
                </button>
              </div>
            </div>

            {formError && (
              <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              {/* Row 1: Code and Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ivory/80 font-mono mb-1">
                    Coupon Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, ""))}
                    placeholder="e.g. EID2026"
                    className="w-full bg-charcoal-deep border border-ivory/20 px-3.5 py-2.5 text-sm text-gold font-bold font-mono focus:border-gold outline-none uppercase placeholder:text-ivory/30"
                  />
                  <span className="text-[10px] text-ivory/40">Only letters, numbers, and dashes.</span>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ivory/80 font-mono mb-1">
                    Campaign / Internal Note
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Eid Luxury Promotion"
                    className="w-full bg-charcoal-deep border border-ivory/20 px-3.5 py-2.5 text-xs text-ivory focus:border-gold outline-none placeholder:text-ivory/30"
                  />
                  <span className="text-[10px] text-ivory/40">Visible to administrators and cart notes.</span>
                </div>
              </div>

              {/* Row 2: Discount Type (Tabs) */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-ivory/80 font-mono mb-1.5">
                  Discount Mechanism *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setType("PERCENTAGE")}
                    className={`py-2.5 px-4 text-xs font-bold uppercase tracking-wider border flex items-center justify-center gap-2 transition-all ${
                      type === "PERCENTAGE"
                        ? "bg-gold text-charcoal border-gold shadow-gold-glow"
                        : "bg-charcoal-deep text-ivory/70 border-ivory/20 hover:border-gold/50"
                    }`}
                  >
                    <Percent className="w-4 h-4" />
                    <span>Percentage (%) Off</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setType("FIXED")}
                    className={`py-2.5 px-4 text-xs font-bold uppercase tracking-wider border flex items-center justify-center gap-2 transition-all ${
                      type === "FIXED"
                        ? "bg-gold text-charcoal border-gold shadow-gold-glow"
                        : "bg-charcoal-deep text-ivory/70 border-ivory/20 hover:border-gold/50"
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                    <span>Fixed Cash (৳ BDT)</span>
                  </button>
                </div>
              </div>

              {/* Row 3: Value and Cap */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ivory/80 font-mono mb-1">
                    {type === "PERCENTAGE" ? "Discount Percentage (%) *" : "Flat Reduction Amount (৳) *"}
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max={type === "PERCENTAGE" ? "100" : undefined}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={type === "PERCENTAGE" ? "e.g. 15" : "e.g. 2000"}
                    className="w-full bg-charcoal-deep border border-ivory/20 px-3.5 py-2.5 text-xs text-ivory font-mono focus:border-gold outline-none"
                  />
                </div>

                {type === "PERCENTAGE" ? (
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ivory/80 font-mono mb-1">
                      Max Discount Cap (৳ BDT)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={maxDiscount}
                      onChange={(e) => setMaxDiscount(e.target.value)}
                      placeholder="e.g. 3000 (Optional)"
                      className="w-full bg-charcoal-deep border border-ivory/20 px-3.5 py-2.5 text-xs text-ivory font-mono focus:border-gold outline-none"
                    />
                    <span className="text-[10px] text-ivory/40">Leave empty for uncapped discount.</span>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ivory/80 font-mono mb-1">
                      Target Currency
                    </label>
                    <div className="w-full bg-charcoal-deep/50 border border-ivory/10 px-3.5 py-2.5 text-xs text-gold font-mono">
                      BDT (৳ Bangladeshi Taka)
                    </div>
                  </div>
                )}
              </div>

              {/* Row 4: Minimum Order & Usage Limit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ivory/80 font-mono mb-1">
                    Minimum Order Spend (৳)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={minOrderValue}
                    onChange={(e) => setMinOrderValue(e.target.value)}
                    placeholder="e.g. 15000 (0 for none)"
                    className="w-full bg-charcoal-deep border border-ivory/20 px-3.5 py-2.5 text-xs text-ivory font-mono focus:border-gold outline-none"
                  />
                  <span className="text-[10px] text-ivory/40">Cart subtotal must equal or exceed this.</span>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ivory/80 font-mono mb-1">
                    Total Redemptions Limit
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(e.target.value)}
                    placeholder="e.g. 100 (Optional)"
                    className="w-full bg-charcoal-deep border border-ivory/20 px-3.5 py-2.5 text-xs text-ivory font-mono focus:border-gold outline-none"
                  />
                  <span className="text-[10px] text-ivory/40">Leave empty for unlimited redemptions.</span>
                </div>
              </div>

              {/* Row 5: Expiration Date & Active Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ivory/80 font-mono mb-1">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-charcoal-deep border border-ivory/20 px-3.5 py-2.5 text-xs text-ivory font-mono focus:border-gold outline-none"
                  />
                  <span className="text-[10px] text-ivory/40">Leave empty for perpetual campaign.</span>
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="w-4 h-4 accent-gold"
                    />
                    <div>
                      <div className="text-xs text-ivory font-semibold">Active Immediately</div>
                      <div className="text-[10px] text-ivory/50">Allow instant customer checkout redemption</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-ivory/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider text-ivory/60 hover:text-ivory border border-ivory/20 hover:border-ivory/40 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gold hover:bg-gold-hover text-charcoal px-7 py-3 text-xs font-bold uppercase tracking-luxury transition-all shadow-gold-glow flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating Voucher...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>SAVE & PUBLISH COUPON</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
