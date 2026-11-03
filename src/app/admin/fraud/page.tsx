"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Ban,
  Search,
  UserX,
  Plus,
  ShieldCheck,
  RefreshCw,
  PhoneCall,
} from "lucide-react";

interface FlaggedOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  grandTotal: number;
  paymentMethod: string;
  fraudScore: number;
  reasons: string[];
  status: "PENDING_REVIEW" | "APPROVED" | "CANCELLED" | "BLACKLISTED";
}

interface BlacklistEntry {
  id: string;
  phone: string;
  customerName?: string;
  reason: string;
  blockedAt: string;
  riskScore: number;
}

export default function AdminFraudReviewPage() {
  const [activeTab, setActiveTab] = useState<"flagged" | "blacklist">("flagged");
  const [flaggedOrders, setFlaggedOrders] = useState<FlaggedOrder[]>([
    {
      id: "f-1",
      orderNumber: "ARV-20261101-9821",
      customerName: "Unknown Guest",
      phone: "01999887766",
      grandTotal: 34500,
      paymentMethod: "COD",
      fraudScore: 65,
      reasons: [
        "High-value COD order (> ৳30,000) requested outside Dhaka",
        "Phone number has 2 previously returned/unreceived parcels in BD courier databases",
      ],
      status: "PENDING_REVIEW",
    },
    {
      id: "f-2",
      orderNumber: "ARV-20261101-7714",
      customerName: "Rakib Ahmed",
      phone: "01755443322",
      grandTotal: 18500,
      paymentMethod: "COD",
      fraudScore: 45,
      reasons: ["3 duplicate checkout attempts within 4 minutes from identical IP"],
      status: "PENDING_REVIEW",
    },
  ]);

  const [blacklist, setBlacklist] = useState<BlacklistEntry[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "warning" | "danger" } | null>(null);

  // New Blacklist Entry Form State
  const [newPhone, setNewPhone] = useState("");
  const [newName, setNewName] = useState("");
  const [newReason, setNewReason] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch blacklist on mount
  useEffect(() => {
    fetch("/api/admin/fraud/action")
      .then((res) => res.json())
      .then((data) => {
        if (data.blacklist) {
          setBlacklist(data.blacklist);
        }
      })
      .catch((err) => console.error("Failed loading blacklist:", err));
  }, []);

  const showNotification = (message: string, type: "success" | "warning" | "danger" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4500);
  };

  // 1. Release Order Action (Approves order for dispatch)
  const handleReleaseOrder = (id: string, orderNumber: string) => {
    setFlaggedOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "APPROVED" } : o))
    );
    showNotification(`Order ${orderNumber} verified and released to fulfillment queue.`, "success");
  };

  // 2. Separate Cancel Order Action (Cancels order ONLY, does NOT ban customer)
  const handleCancelOrder = (id: string, orderNumber: string, customerName: string) => {
    setFlaggedOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "CANCELLED" } : o))
    );
    showNotification(
      `Order ${orderNumber} for "${customerName}" has been cancelled. Customer was NOT blacklisted.`,
      "warning"
    );
  };

  // 3. Separate Blacklist Customer Action (Bans customer phone/IP and blocks order)
  const handleBlacklistCustomer = async (id: string, phone: string, orderNumber: string, name: string) => {
    setFlaggedOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "BLACKLISTED" } : o))
    );

    try {
      const res = await fetch("/api/admin/fraud/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "BLACKLIST",
          phone,
          customerName: name,
          reason: `Flagged from order ${orderNumber} - High fraud risk & courier return history`,
          riskScore: 95,
        }),
      });
      const data = await res.json();
      if (data.entry) {
        setBlacklist((prev) => [data.entry, ...prev.filter((b) => b.phone !== phone)]);
      }
      showNotification(
        `Customer "${name}" (${phone}) has been permanently added to the Fraud Blacklist. Future COD orders will be blocked.`,
        "danger"
      );
    } catch (e) {
      showNotification(`Customer added to local blacklist.`, "danger");
    }
  };

  // Remove / Unblock from Blacklist
  const handleUnblock = async (entry: BlacklistEntry) => {
    try {
      await fetch("/api/admin/fraud/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "UNBLACKLIST", phone: entry.phone, id: entry.id }),
      });
      setBlacklist((prev) => prev.filter((b) => b.id !== entry.id));
      showNotification(`Phone ${entry.phone} unblocked and removed from Fraud Blacklist.`, "success");
    } catch {
      showNotification(`Failed to unblock phone.`, "danger");
    }
  };

  // Manual Blacklist Submit
  const handleManualBlacklist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhone.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/fraud/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "BLACKLIST",
          phone: newPhone.trim(),
          customerName: newName.trim() || "Manual Blacklist",
          reason: newReason.trim() || "Manually added by admin",
          riskScore: 90,
        }),
      });
      const data = await res.json();
      if (data.entry) {
        setBlacklist((prev) => [data.entry, ...prev]);
        setNewPhone("");
        setNewName("");
        setNewReason("");
        showNotification(`Phone ${newPhone} manually blacklisted.`, "danger");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredBlacklist = blacklist.filter(
    (b) =>
      b.phone.includes(searchQuery) ||
      (b.customerName && b.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      b.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-ultra-wide text-gold">RISK MITIGATION</span>
          <h1 className="font-serif text-2xl sm:text-3xl text-ivory font-medium mt-0.5">
            FAKE ORDER & FRAUD REVIEW
          </h1>
          <p className="text-xs text-ivory/60 mt-0.5">
            Independent controls for Order Cancellation vs. Permanent Customer Blacklisting
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-charcoal p-1 border border-ivory/15">
          <button
            onClick={() => setActiveTab("flagged")}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === "flagged"
                ? "bg-gold text-charcoal font-bold shadow"
                : "text-ivory/70 hover:text-ivory"
            }`}
          >
            Flagged Orders ({flaggedOrders.filter((o) => o.status === "PENDING_REVIEW").length})
          </button>
          <button
            onClick={() => setActiveTab("blacklist")}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === "blacklist"
                ? "bg-gold text-charcoal font-bold shadow"
                : "text-ivory/70 hover:text-ivory"
            }`}
          >
            Blacklist Registry ({blacklist.length})
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div
          className={`p-3 text-xs flex items-center gap-2 border transition-all ${
            notification.type === "success"
              ? "bg-green-950/80 border-green-700 text-green-300"
              : notification.type === "warning"
              ? "bg-amber-950/80 border-amber-700 text-amber-300"
              : "bg-red-950/80 border-red-700 text-red-200"
          }`}
        >
          {notification.type === "success" && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
          {notification.type === "warning" && <XCircle className="w-4 h-4 flex-shrink-0" />}
          {notification.type === "danger" && <Ban className="w-4 h-4 flex-shrink-0" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-charcoal border border-ivory/10 p-4 space-y-1">
          <div className="text-ivory/50 uppercase text-[10px]">High-Value COD Threshold</div>
          <div className="text-lg font-bold text-gold font-mono">৳30,000 BDT</div>
          <p className="text-[11px] text-ivory/40">Orders above this limit trigger concierge phone check</p>
        </div>

        <div className="bg-charcoal border border-ivory/10 p-4 space-y-1">
          <div className="text-ivory/50 uppercase text-[10px]">Rapid Rate Limiter</div>
          <div className="text-lg font-bold text-ivory font-mono">2 orders / 5 min</div>
          <p className="text-[11px] text-ivory/40">Prevents bot spamming and automated abuse</p>
        </div>

        <div className="bg-charcoal border border-ivory/10 p-4 space-y-1">
          <div className="text-ivory/50 uppercase text-[10px]">Outside Dhaka Policy</div>
          <div className="text-lg font-bold text-amber-400 font-mono">৳150 Courier Fee</div>
          <p className="text-[11px] text-ivory/40">Advance deposit verification flag on COD</p>
        </div>

        <div className="bg-charcoal border border-ivory/10 p-4 space-y-1">
          <div className="text-ivory/50 uppercase text-[10px]">Total Blacklisted Phones</div>
          <div className="text-lg font-bold text-red-400 font-mono">{blacklist.length} Banned</div>
          <p className="text-[11px] text-ivory/40">Auto-blocked from future COD checkout</p>
        </div>
      </div>

      {/* TAB 1: FLAGGED ORDERS QUEUE */}
      {activeTab === "flagged" && (
        <div className="bg-charcoal border border-ivory/10 shadow-luxury overflow-hidden">
          <div className="p-4 border-b border-ivory/10 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-base text-ivory font-medium">Flagged Orders Requiring Action</h2>
              <p className="text-[11px] text-ivory/50">
                Choose to release, simply cancel the order, or permanently blacklist the customer.
              </p>
            </div>
            <span className="text-xs text-amber-400 font-mono font-bold">
              {flaggedOrders.filter((o) => o.status === "PENDING_REVIEW").length} Pending Review
            </span>
          </div>

          <div className="divide-y divide-ivory/10">
            {flaggedOrders.map((ord) => (
              <div key={ord.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm font-bold text-gold">{ord.orderNumber}</span>
                    <span className="text-xs text-ivory/90 font-medium">{ord.customerName}</span>
                    <span className="text-xs font-mono text-ivory/60 bg-charcoal-deep px-2 py-0.5 border border-ivory/10">
                      {ord.phone}
                    </span>
                    <span className="px-2 py-0.5 bg-red-950 text-red-300 border border-red-800 text-[10px] font-bold">
                      Risk Score: {ord.fraudScore} / 100
                    </span>
                  </div>

                  <div className="text-xs text-secondaryText">
                    Total: <strong className="text-ivory">৳{ord.grandTotal.toLocaleString()}</strong> via{" "}
                    <strong className="text-ivory">{ord.paymentMethod}</strong>
                  </div>

                  <div className="space-y-1 pt-1">
                    {ord.reasons.map((r, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-amber-300">
                        <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Granular Action Buttons: RELEASE vs CANCEL vs BLACKLIST */}
                <div className="flex flex-wrap items-center gap-2">
                  {ord.status === "PENDING_REVIEW" ? (
                    <>
                      {/* Action 1: Release Order */}
                      <button
                        onClick={() => handleReleaseOrder(ord.id, ord.orderNumber)}
                        title="Approve this order and send to fulfillment"
                        className="inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-600 text-white px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Release Order</span>
                      </button>

                      {/* Action 2: Cancel Order ONLY (Separated!) */}
                      <button
                        onClick={() => handleCancelOrder(ord.id, ord.orderNumber, ord.customerName)}
                        title="Cancel this order only. Does NOT ban customer phone number"
                        className="inline-flex items-center gap-1.5 bg-charcoal-deep hover:bg-charcoal border border-amber-500/50 hover:border-amber-400 text-amber-300 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Cancel Order</span>
                      </button>

                      {/* Action 3: Blacklist Customer (Separated!) */}
                      <button
                        onClick={() =>
                          handleBlacklistCustomer(ord.id, ord.phone, ord.orderNumber, ord.customerName)
                        }
                        title="Permanently ban this phone number and IP from placing future COD orders"
                        className="inline-flex items-center gap-1.5 bg-red-900/90 hover:bg-red-800 text-red-100 border border-red-700 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                      >
                        <Ban className="w-3.5 h-3.5 text-red-300" />
                        <span>Blacklist Customer</span>
                      </button>
                    </>
                  ) : ord.status === "APPROVED" ? (
                    <span className="px-3 py-1.5 bg-green-950 border border-green-800 text-green-300 text-xs font-mono font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      RELEASED TO FULFILLMENT
                    </span>
                  ) : ord.status === "CANCELLED" ? (
                    <span className="px-3 py-1.5 bg-amber-950 border border-amber-800 text-amber-300 text-xs font-mono font-semibold flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5" />
                      ORDER CANCELLED (NOT BLACKLISTED)
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 bg-red-950 border border-red-800 text-red-300 text-xs font-mono font-semibold flex items-center gap-1.5">
                      <Ban className="w-3.5 h-3.5" />
                      CUSTOMER BLACKLISTED
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: FRAUD BLACKLIST REGISTRY */}
      {activeTab === "blacklist" && (
        <div className="space-y-6">
          {/* Manual Add Form */}
          <div className="bg-charcoal border border-ivory/10 p-5 shadow-luxury">
            <h3 className="font-serif text-sm text-ivory font-medium mb-3 flex items-center gap-2">
              <UserX className="w-4 h-4 text-red-400" />
              <span>Manually Add Phone to Fraud Blacklist</span>
            </h3>

            <form onSubmit={handleManualBlacklist} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-[10px] uppercase text-ivory/60 mb-1">Mobile / Phone Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 01700112233"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-charcoal-deep border border-ivory/20 px-3 py-2 text-ivory font-mono focus:border-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-ivory/60 mb-1">Customer / Alias Name</label>
                <input
                  type="text"
                  placeholder="e.g. Fake Order Customer"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-charcoal-deep border border-ivory/20 px-3 py-2 text-ivory focus:border-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-ivory/60 mb-1">Blacklist Reason</label>
                <input
                  type="text"
                  placeholder="e.g. Repeated refusal on Steadfast/Pathao"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  className="w-full bg-charcoal-deep border border-ivory/20 px-3 py-2 text-ivory focus:border-gold outline-none"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-900 hover:bg-red-800 text-red-100 py-2 px-4 font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add To Blacklist</span>
                </button>
              </div>
            </form>
          </div>

          {/* Blacklisted Table */}
          <div className="bg-charcoal border border-ivory/10 shadow-luxury overflow-hidden">
            <div className="p-4 border-b border-ivory/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif text-base text-ivory">Active Blacklisted Records ({blacklist.length})</h3>
                <p className="text-[11px] text-ivory/50">
                  Phone numbers blocked from placing COD orders across Bangladesh.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-ivory/40 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search phone, name, reason..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-charcoal-deep border border-ivory/15 pl-8 pr-3 py-1.5 text-xs text-ivory focus:border-gold outline-none"
                />
              </div>
            </div>

            <div className="divide-y divide-ivory/10">
              {filteredBlacklist.length === 0 ? (
                <div className="p-8 text-center text-ivory/40 text-xs">
                  No matching blacklisted records found.
                </div>
              ) : (
                filteredBlacklist.map((b) => (
                  <div key={b.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-red-400">{b.phone}</span>
                        {b.customerName && (
                          <span className="text-xs text-ivory font-medium">{b.customerName}</span>
                        )}
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-red-950 border border-red-900 text-red-300">
                          Risk: {b.riskScore}/100
                        </span>
                      </div>
                      <p className="text-xs text-ivory/70">{b.reason}</p>
                      <span className="text-[10px] text-ivory/40 font-mono">
                        Blocked on: {new Date(b.blockedAt).toLocaleDateString("en-GB")}
                      </span>
                    </div>

                    <div>
                      <button
                        onClick={() => handleUnblock(b)}
                        className="text-xs border border-ivory/20 hover:border-green-600 hover:text-green-400 px-3 py-1.5 text-ivory/70 transition-colors uppercase font-mono tracking-wider"
                      >
                        Unblock / Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
