"use client";

import React, { useState } from "react";
import { Settings, Save, CheckCircle2, Truck, MapPin, Phone, Mail } from "lucide-react";

export default function AdminSiteSettingsPage() {
  const [insideDhaka, setInsideDhaka] = useState(80);
  const [outsideDhaka, setOutsideDhaka] = useState(150);
  const [freeThreshold, setFreeThreshold] = useState(10000);
  const [phone, setPhone] = useState("+880 1700-000000");
  const [email, setEmail] = useState("concierge@arvano.com");
  const [address, setAddress] = useState("Plot 12, Road 11, Block C, Gulshan 2, Dhaka 1212, Bangladesh");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <span className="text-[10px] uppercase tracking-ultra-wide text-gold">GLOBAL CONFIGURATION</span>
        <h1 className="font-serif text-2xl sm:text-3xl text-ivory font-medium mt-0.5">
          WEBSITE & DELIVERY SETTINGS
        </h1>
        <p className="text-xs text-ivory/60 mt-0.5">
          Configure nationwide shipping rates, free delivery incentives, and official concierge contacts
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-green-950/80 border border-green-700 text-green-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>Website delivery rates and contact information updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Shipping Rates */}
        <div className="bg-charcoal border border-ivory/15 p-6 space-y-4">
          <div className="flex items-center gap-2 text-gold font-semibold uppercase tracking-wider text-xs border-b border-ivory/10 pb-3">
            <Truck className="w-4 h-4" />
            <span>Bangladesh Delivery Rates (BDT ৳)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] text-ivory/70 uppercase mb-1">
                Inside Dhaka Charge
              </label>
              <input
                type="number"
                value={insideDhaka}
                onChange={(e) => setInsideDhaka(Number(e.target.value))}
                className="w-full bg-charcoal-dark border border-ivory/20 px-3 py-2 text-xs font-mono text-ivory"
              />
            </div>

            <div>
              <label className="block text-[11px] text-ivory/70 uppercase mb-1">
                Outside Dhaka (63 Districts)
              </label>
              <input
                type="number"
                value={outsideDhaka}
                onChange={(e) => setOutsideDhaka(Number(e.target.value))}
                className="w-full bg-charcoal-dark border border-ivory/20 px-3 py-2 text-xs font-mono text-ivory"
              />
            </div>

            <div>
              <label className="block text-[11px] text-ivory/70 uppercase mb-1">
                Complimentary Shipping Threshold
              </label>
              <input
                type="number"
                value={freeThreshold}
                onChange={(e) => setFreeThreshold(Number(e.target.value))}
                className="w-full bg-charcoal-dark border border-ivory/20 px-3 py-2 text-xs font-mono text-ivory font-bold text-gold"
              />
            </div>
          </div>
        </div>

        {/* Concierge & Showroom */}
        <div className="bg-charcoal border border-ivory/15 p-6 space-y-4">
          <div className="flex items-center gap-2 text-gold font-semibold uppercase tracking-wider text-xs border-b border-ivory/10 pb-3">
            <MapPin className="w-4 h-4" />
            <span>Showroom & Client Concierge Contacts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] text-ivory/70 uppercase mb-1">
                Showroom Hotline
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-charcoal-dark border border-ivory/20 px-3 py-2 text-xs text-ivory"
              />
            </div>

            <div>
              <label className="block text-[11px] text-ivory/70 uppercase mb-1">
                Official Concierge Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-charcoal-dark border border-ivory/20 px-3 py-2 text-xs text-ivory"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] text-ivory/70 uppercase mb-1">
                Atelier Showroom Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-charcoal-dark border border-ivory/20 px-3 py-2 text-xs text-ivory"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-gold hover:bg-gold-hover text-charcoal px-7 py-3 text-xs font-bold uppercase tracking-wider transition-colors shadow-gold-glow"
          >
            <Save className="w-4 h-4" />
            <span>Save Global Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
