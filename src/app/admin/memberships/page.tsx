"use client";

import React, { useState, useEffect } from "react";
import {
  Crown,
  Search,
  CheckCircle2,
  XCircle,
  Plus,
  RefreshCw,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  UserCheck,
  Award,
} from "lucide-react";
import { MemberSubscription, MEMBERSHIP_PLANS } from "@/lib/data/membership-plans";

export default function AdminMembershipsPage() {
  const [members, setMembers] = useState<MemberSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "ACTIVE" | "PENDING_VERIFICATION" | "EXPIRED">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  // Manual Add Member State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPlan, setNewPlan] = useState<"collector" | "connoisseur" | "patron">("connoisseur");
  const [newPaymentMethod, setNewPaymentMethod] = useState("BKASH");
  const [newTrxId, setNewTrxId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    setLoading(true);
    fetch("/api/admin/memberships")
      .then((res) => res.json())
      .then((data) => {
        if (data.members) setMembers(data.members);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleStatusChange = async (id: string, status: "ACTIVE" | "PENDING_VERIFICATION" | "EXPIRED") => {
    try {
      const res = await fetch("/api/admin/memberships/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setMembers((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status } : m))
        );
        showToast(`Member status updated to ${status}.`);
      }
    } catch {
      showToast("Failed to update member status.");
    }
  };

  const handleManualAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone || !newEmail) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/membership/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: newName,
          phone: newPhone,
          email: newEmail,
          planId: newPlan,
          paymentMethod: newPaymentMethod,
          transactionId: newTrxId || "ADMIN-MANUAL-ENTRY",
          senderNumber: newPhone,
        }),
      });
      const data = await res.json();
      if (data.success && data.member) {
        setMembers((prev) => [data.member, ...prev]);
        setShowAddForm(false);
        setNewName("");
        setNewPhone("");
        setNewEmail("");
        setNewTrxId("");
        showToast(`✓ New VIP Member ${data.member.customerName} enrolled successfully!`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculations
  const totalActive = members.filter((m) => m.status === "ACTIVE").length;
  const mrr = members
    .filter((m) => m.status === "ACTIVE")
    .reduce((sum, m) => sum + m.monthlyFee, 0);
  const totalWatchSavings = members.reduce((sum, m) => sum + (m.totalSavedBDT || 0), 0);

  const filteredMembers = members.filter((m) => {
    const matchesFilter = filter === "ALL" || m.status === filter;
    const matchesSearch =
      m.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery) ||
      m.memberId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.planName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-ultra-wide text-gold">RECURRING REVENUE & RETENTION</span>
          <h1 className="font-serif text-2xl sm:text-3xl text-ivory font-medium mt-0.5 flex items-center gap-2">
            <Crown className="w-6 h-6 text-gold" />
            <span>ARVANO GUILD VIP MEMBERSHIPS</span>
          </h1>
          <p className="text-xs text-ivory/60 mt-0.5">
            Manage permanent VIP subscribers, monthly bKash/Nagad collections, and active watch discount privileges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gold hover:bg-gold-hover text-charcoal px-3.5 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-gold-glow"
          >
            <Plus className="w-4 h-4" />
            <span>Enroll New VIP</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-green-950/80 border border-green-700 text-green-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-charcoal border border-ivory/10 p-4 space-y-1">
          <div className="text-ivory/50 uppercase text-[10px]">Active VIP Subscribers</div>
          <div className="text-xl font-bold text-gold font-mono">{totalActive} Members</div>
          <p className="text-[11px] text-ivory/40">Permanent recurring customers</p>
        </div>

        <div className="bg-charcoal border border-ivory/10 p-4 space-y-1">
          <div className="text-ivory/50 uppercase text-[10px]">Monthly Recurring Revenue</div>
          <div className="text-xl font-bold text-ivory font-mono">৳{mrr.toLocaleString()} BDT</div>
          <p className="text-[11px] text-ivory/40">From active monthly fees</p>
        </div>

        <div className="bg-charcoal border border-ivory/10 p-4 space-y-1">
          <div className="text-ivory/50 uppercase text-[10px]">Watch Discounts Active</div>
          <div className="text-xl font-bold text-emerald-400 font-mono">15% — 30%</div>
          <p className="text-[11px] text-ivory/40">Applied automatically at checkout</p>
        </div>

        <div className="bg-charcoal border border-ivory/10 p-4 space-y-1">
          <div className="text-ivory/50 uppercase text-[10px]">Customer Total Savings</div>
          <div className="text-xl font-bold text-amber-300 font-mono">৳{totalWatchSavings.toLocaleString()}</div>
          <p className="text-[11px] text-ivory/40">Delivered on watch purchases</p>
        </div>
      </div>

      {/* Manual Enroll Modal / Card */}
      {showAddForm && (
        <div className="bg-charcoal border border-gold/40 p-5 shadow-luxury">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-sm text-gold font-semibold flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Enroll VIP Guild Member Manually</span>
            </h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-ivory/50 hover:text-ivory text-xs"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleManualAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-[10px] uppercase text-ivory/60 mb-1">Customer Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Asif Mahmud"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-charcoal-deep border border-ivory/20 px-3 py-2 text-ivory focus:border-gold outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase text-ivory/60 mb-1">Mobile Number (BD) *</label>
              <input
                type="tel"
                required
                placeholder="e.g. 01700112233"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="w-full bg-charcoal-deep border border-ivory/20 px-3 py-2 text-ivory font-mono focus:border-gold outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase text-ivory/60 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="e.g. asif@gmail.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full bg-charcoal-deep border border-ivory/20 px-3 py-2 text-ivory focus:border-gold outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase text-ivory/60 mb-1">Select Guild Tier *</label>
              <select
                value={newPlan}
                onChange={(e) => setNewPlan(e.target.value as any)}
                className="w-full bg-charcoal-deep border border-ivory/20 px-3 py-2 text-ivory focus:border-gold outline-none"
              >
                <option value="collector">Collector Circle (15% OFF, ৳499/mo)</option>
                <option value="connoisseur">Connoisseur VIP (20% OFF, ৳999/mo)</option>
                <option value="patron">Master Patron (30% OFF, ৳1,999/mo)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase text-ivory/60 mb-1">Payment Method</label>
              <select
                value={newPaymentMethod}
                onChange={(e) => setNewPaymentMethod(e.target.value)}
                className="w-full bg-charcoal-deep border border-ivory/20 px-3 py-2 text-ivory focus:border-gold outline-none"
              >
                <option value="BKASH">bKash Send Money</option>
                <option value="NAGAD">Nagad Send Money</option>
                <option value="ROCKET">Rocket Send Money</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="CASH">Offline Cash / Atelier VIP</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase text-ivory/60 mb-1">Transaction ID (Optional)</label>
              <input
                type="text"
                placeholder="e.g. 9J47KL82QA"
                value={newTrxId}
                onChange={(e) => setNewTrxId(e.target.value)}
                className="w-full bg-charcoal-deep border border-ivory/20 px-3 py-2 text-ivory font-mono focus:border-gold outline-none"
              />
            </div>

            <div className="sm:col-span-3 pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gold hover:bg-gold-hover text-charcoal px-6 py-2.5 font-bold uppercase tracking-wider text-xs transition-colors"
              >
                {isSubmitting ? "ENROLLING..." : "COMPLETE VIP ENROLLMENT"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Members Table */}
      <div className="bg-charcoal border border-ivory/10 shadow-luxury overflow-hidden">
        <div className="p-4 border-b border-ivory/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            {(["ALL", "ACTIVE", "PENDING_VERIFICATION", "EXPIRED"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1.5 uppercase text-[11px] tracking-wider transition-colors ${
                  filter === st
                    ? "bg-gold text-charcoal font-bold"
                    : "text-ivory/60 hover:text-ivory bg-charcoal-deep border border-ivory/10"
                }`}
              >
                {st.replace(/_/g, " ")}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-ivory/40 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search member, phone, tier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-charcoal-deep border border-ivory/15 pl-8 pr-3 py-1.5 text-xs text-ivory focus:border-gold outline-none"
            />
          </div>
        </div>

        <div className="divide-y divide-ivory/10">
          {filteredMembers.length === 0 ? (
            <div className="p-8 text-center text-ivory/40 text-xs">
              No members found matching your criteria.
            </div>
          ) : (
            filteredMembers.map((m) => (
              <div key={m.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm font-bold text-gold bg-charcoal-deep px-2.5 py-0.5 border border-gold/30">
                      {m.memberId}
                    </span>
                    <span className="font-serif text-sm font-semibold text-ivory">{m.customerName}</span>
                    <span className="px-2 py-0.5 bg-gold/10 text-gold border border-gold/40 text-[10px] font-bold uppercase tracking-wider">
                      {m.planName} ({m.discountPercentage}% OFF)
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        m.status === "ACTIVE"
                          ? "bg-green-950 text-green-300 border border-green-800"
                          : m.status === "PENDING_VERIFICATION"
                          ? "bg-amber-950 text-amber-300 border border-amber-800"
                          : "bg-red-950 text-red-300 border border-red-800"
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-ivory/70 pt-1">
                    <span className="flex items-center gap-1 font-mono">
                      <Phone className="w-3.5 h-3.5 text-gold/70" /> {m.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-gold/70" /> {m.email}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-ivory/50">
                      TrxID: {m.transactionId} ({m.paymentMethod})
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-ivory/50 pt-0.5 font-mono">
                    <span>Joined: {new Date(m.joinedAt).toLocaleDateString("en-GB")}</span>
                    <span>Renews: {new Date(m.renewsAt).toLocaleDateString("en-GB")}</span>
                    <span className="text-emerald-400 font-semibold">
                      Total Watch Savings: ৳{(m.totalSavedBDT || 0).toLocaleString()} BDT
                    </span>
                  </div>
                </div>

                {/* Status Controls */}
                <div className="flex items-center gap-2">
                  {m.status !== "ACTIVE" && (
                    <button
                      onClick={() => handleStatusChange(m.id, "ACTIVE")}
                      className="px-3 py-1.5 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Activate VIP
                    </button>
                  )}

                  {m.status === "ACTIVE" && (
                    <button
                      onClick={() => handleStatusChange(m.id, "EXPIRED")}
                      className="px-3 py-1.5 border border-ivory/20 hover:border-red-500 hover:text-red-400 text-ivory/60 text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Suspend / Expire
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
