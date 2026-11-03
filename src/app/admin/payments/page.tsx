"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, AlertCircle, Loader2, Copy, Check } from "lucide-react";

interface PendingPayment {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  method: string;
  transactionId: string;
  senderNumber: string;
  amount: number;
  status: string;
  createdAt: string;
}

export default function AdminPaymentVerificationPage() {
  const [payments, setPayments] = useState<PendingPayment[]>([
    {
      id: "pay-1",
      orderNumber: "ARV-20261101-9042",
      customerName: "Kazi Shahriar Rahman",
      phone: "01711234567",
      method: "BKASH",
      transactionId: "9J47KL82QA",
      senderNumber: "01711234567",
      amount: 18500,
      status: "PENDING_VERIFICATION",
      createdAt: "Today at 1:15 PM",
    },
    {
      id: "pay-2",
      orderNumber: "ARV-20261101-9104",
      customerName: "Imran Hossain",
      phone: "01822334455",
      method: "NAGAD",
      transactionId: "8BN55QWER9",
      senderNumber: "01822334455",
      amount: 28500,
      status: "PENDING_VERIFICATION",
      createdAt: "Today at 12:40 PM",
    },
  ]);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState("");

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApprove = (id: string, orderNumber: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "PAID" } : p))
    );
    setActionSuccess(`✓ Payment for order ${orderNumber} approved and marked PAID.`);
    setTimeout(() => setActionSuccess(""), 4000);
  };

  const handleReject = (id: string, orderNumber: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "FAILED" } : p))
    );
    setActionSuccess(`Payment for order ${orderNumber} rejected.`);
    setTimeout(() => setActionSuccess(""), 4000);
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] uppercase tracking-ultra-wide text-gold">FINANCIAL AUDIT</span>
        <h1 className="font-serif text-2xl sm:text-3xl text-ivory font-medium mt-0.5">
          PAYMENT VERIFICATION QUEUE
        </h1>
        <p className="text-xs text-ivory/60 mt-0.5">
          Verify incoming bKash, Nagad, Rocket & Bank Transfer Transaction IDs against your merchant statements
        </p>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-green-950/80 border border-green-700 text-green-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      <div className="bg-charcoal border border-ivory/10 shadow-luxury overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ivory/80">
            <thead className="bg-charcoal-dark text-ivory/50 uppercase tracking-wider font-mono text-[10px] border-b border-ivory/10">
              <tr>
                <th className="py-3.5 px-4">Order Ref</th>
                <th className="py-3.5 px-4">Method</th>
                <th className="py-3.5 px-4">Submitted TrxID</th>
                <th className="py-3.5 px-4">Sender Phone</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Verification Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory/10 font-mono">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-charcoal-dark/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-gold">{p.orderNumber}</td>
                  <td className="py-3.5 px-4 uppercase font-bold text-ivory">{p.method}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-charcoal-dark px-2 py-1 text-gold font-bold border border-gold/30">
                        {p.transactionId}
                      </span>
                      <button
                        onClick={() => handleCopy(p.transactionId, p.id)}
                        className="text-ivory/40 hover:text-gold p-1"
                        title="Copy TrxID"
                      >
                        {copiedId === p.id ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-ivory/70">{p.senderNumber}</td>
                  <td className="py-3.5 px-4 font-sans font-semibold text-ivory">
                    ৳{p.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] uppercase font-bold ${
                        p.status === "PAID"
                          ? "bg-green-950 text-green-300 border border-green-800"
                          : p.status === "PENDING_VERIFICATION"
                          ? "bg-amber-950 text-amber-300 border border-amber-800"
                          : "bg-red-950 text-red-300 border border-red-800"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {p.status === "PENDING_VERIFICATION" ? (
                      <div className="flex items-center justify-end gap-2 font-sans">
                        <button
                          onClick={() => handleApprove(p.id, p.orderNumber)}
                          className="flex items-center gap-1 bg-green-700 hover:bg-green-600 text-white px-2.5 py-1 text-[11px] font-semibold transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleReject(p.id, p.orderNumber)}
                          className="flex items-center gap-1 bg-red-900/60 hover:bg-red-800 text-red-200 px-2.5 py-1 text-[11px] font-semibold transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-ivory/40 font-sans text-xs">Decided</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
