"use client";

import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  HelpCircle,
} from "lucide-react";

interface PaymentConfig {
  id: string;
  methodKey: string;
  displayName: string;
  accountNumber?: string | null;
  instructions: string;
  requiresTransactionId: boolean;
  requiresSenderNumber: boolean;
  isActive: boolean;
  displayOrder: number;
  minAdvanceFee?: number | null;
}

export default function AdminPaymentSettingsPage() {
  const [configs, setConfigs] = useState<PaymentConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("/api/payments/methods?all=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.methods) {
          setConfigs(data.methods);
        }
      })
      .catch((e) => setErrorMessage("Failed to load payment configurations."))
      .finally(() => setLoading(false));
  }, []);

  const handleFieldChange = (key: string, field: keyof PaymentConfig, value: any) => {
    setConfigs((prev) =>
      prev.map((c) => (c.methodKey === key ? { ...c, [field]: value } : c))
    );
  };

  const handleSaveMethod = async (cfg: PaymentConfig) => {
    setSavingKey(cfg.methodKey);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/payments/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          methodKey: cfg.methodKey,
          displayName: cfg.displayName,
          accountNumber: cfg.accountNumber,
          instructions: cfg.instructions,
          isActive: cfg.isActive,
          requiresTransactionId: cfg.requiresTransactionId,
          requiresSenderNumber: cfg.requiresSenderNumber,
          minAdvanceFee: cfg.minAdvanceFee,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update payment method.");
      }

      setSuccessMessage(`✓ ${cfg.displayName} settings successfully saved!`);
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save settings.");
    } finally {
      setSavingKey(null);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-ivory">
        <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto mb-2" />
        <p className="text-xs">Loading Bangladesh payment configurations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <span className="text-[10px] uppercase tracking-ultra-wide text-gold">FINANCIAL CHANNELS</span>
        <h1 className="font-serif text-2xl sm:text-3xl text-ivory font-medium mt-0.5">
          BANGLADESH PAYMENT SETTINGS
        </h1>
        <p className="text-xs text-ivory/60 mt-1 max-w-2xl">
          Independently modify send-money numbers (bKash, Nagad, Rocket, Bank), update customer instructions,
          and configure advance courier fees. Changes take effect on the live checkout immediately.
        </p>
      </div>

      {successMessage && (
        <div className="p-4 bg-green-950/80 border border-green-700 text-green-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-950/80 border border-red-700 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-6">
        {configs.map((cfg) => {
          const isSaving = savingKey === cfg.methodKey;

          return (
            <div
              key={cfg.methodKey}
              className={`bg-charcoal border p-6 transition-all ${
                cfg.isActive ? "border-ivory/20" : "border-red-900/40 opacity-70"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ivory/10 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gold" />
                  <div>
                    <h2 className="font-serif text-lg text-ivory font-medium">
                      {cfg.displayName}
                    </h2>
                    <span className="font-mono text-[10px] text-gold/70 uppercase">
                      Method Identifier: {cfg.methodKey}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs text-ivory/80 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cfg.isActive}
                      onChange={(e) =>
                        handleFieldChange(cfg.methodKey, "isActive", e.target.checked)
                      }
                      className="accent-gold h-4 w-4"
                    />
                    <span>Active on Storefront</span>
                  </label>

                  <button
                    onClick={() => handleSaveMethod(cfg)}
                    disabled={isSaving}
                    className="flex items-center gap-1.5 bg-gold hover:bg-gold-hover text-charcoal px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors shadow-gold-glow disabled:opacity-50"
                  >
                    {isSaving ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5" />
                    )}
                    <span>Save {cfg.methodKey}</span>
                  </button>
                </div>
              </div>

              {/* Form Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-ivory/70 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={cfg.displayName}
                    onChange={(e) =>
                      handleFieldChange(cfg.methodKey, "displayName", e.target.value)
                    }
                    className="w-full bg-charcoal-dark border border-ivory/20 px-3.5 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                  />
                </div>

                {cfg.methodKey !== "COD" && (
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gold mb-1 font-semibold flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Send-Money / Account Number (Admin Configurable)</span>
                    </label>
                    <input
                      type="text"
                      value={cfg.accountNumber || ""}
                      onChange={(e) =>
                        handleFieldChange(cfg.methodKey, "accountNumber", e.target.value)
                      }
                      placeholder="e.g. 01711-234567 (Personal)"
                      className="w-full bg-charcoal-dark border border-gold/50 px-3.5 py-2.5 text-xs font-mono font-bold text-ivory focus:border-gold focus:outline-none"
                    />
                  </div>
                )}

                {cfg.methodKey === "COD" && (
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-ivory/70 mb-1">
                      Min Advance Courier Fee for Outside Dhaka (BDT ৳)
                    </label>
                    <input
                      type="number"
                      value={cfg.minAdvanceFee || 150}
                      onChange={(e) =>
                        handleFieldChange(cfg.methodKey, "minAdvanceFee", Number(e.target.value))
                      }
                      className="w-full bg-charcoal-dark border border-ivory/20 px-3.5 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none font-mono"
                    />
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-ivory/70 mb-1">
                    Customer Payment Instructions (Displayed on Checkout)
                  </label>
                  <textarea
                    rows={3}
                    value={cfg.instructions}
                    onChange={(e) =>
                      handleFieldChange(cfg.methodKey, "instructions", e.target.value)
                    }
                    className="w-full bg-charcoal-dark border border-ivory/20 p-3 text-xs text-ivory focus:border-gold focus:outline-none font-sans leading-relaxed"
                  />
                </div>

                {cfg.methodKey !== "COD" && (
                  <div className="md:col-span-2 flex items-center gap-6 pt-1 text-ivory/70">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cfg.requiresTransactionId}
                        onChange={(e) =>
                          handleFieldChange(
                            cfg.methodKey,
                            "requiresTransactionId",
                            e.target.checked
                          )
                        }
                        className="accent-gold h-4 w-4"
                      />
                      <span>Require Customer Transaction ID (TrxID)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cfg.requiresSenderNumber}
                        onChange={(e) =>
                          handleFieldChange(
                            cfg.methodKey,
                            "requiresSenderNumber",
                            e.target.checked
                          )
                        }
                        className="accent-gold h-4 w-4"
                      />
                      <span>Require Sender Mobile Number</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
