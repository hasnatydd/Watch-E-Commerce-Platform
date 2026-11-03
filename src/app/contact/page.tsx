"use client";

import React, { useState } from "react";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      <div className="bg-charcoal-dark border-b border-ivory/10 py-14 text-center">
        <span className="text-xs uppercase tracking-ultra-wide text-gold">CLIENT CONCIERGE</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-ivory tracking-tight mt-1">
          CONNECT WITH ARVANO
        </h1>
        <p className="text-xs sm:text-sm text-ivory/60 mt-2 max-w-md mx-auto">
          Our horology specialists are available to assist with inquiries, custom fittings, and showroom appointments.
        </p>
      </div>

      <div className="bg-ivory text-primaryText flex-1 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Atelier Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-ivory-border p-8 shadow-sm space-y-6">
                <h3 className="font-serif text-xl text-primaryText uppercase tracking-wider border-b border-ivory-border pb-3">
                  Atelier & Showroom
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-secondaryText">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-primaryText block">Gulshan Atelier</strong>
                      Plot 12, Road 11, Block C, Gulshan 2,<br />
                      Dhaka 1212, Bangladesh
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gold-dark flex-shrink-0" />
                    <div>
                      <strong className="text-primaryText block">Concierge Hotline</strong>
                      +880 1700-000000
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gold-dark flex-shrink-0" />
                    <div>
                      <strong className="text-primaryText block">Direct Inquiries</strong>
                      concierge@arvano.com
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gold-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-primaryText block">Visiting Hours</strong>
                      Saturday – Thursday: 10:00 AM – 9:00 PM<br />
                      Friday: 2:00 PM – 9:00 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiries Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-ivory-border p-8 shadow-sm">
                <h3 className="font-serif text-xl text-primaryText uppercase tracking-wider border-b border-ivory-border pb-3 mb-6">
                  Send A Direct Inquiry
                </h3>

                {submitted ? (
                  <div className="py-12 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                    <h4 className="font-serif text-2xl text-primaryText">Message Received</h4>
                    <p className="text-xs text-secondaryText max-w-sm mx-auto">
                      Thank you for contacting the ARVANO atelier. A senior watch specialist will review your inquiry and respond within 12 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          className="w-full bg-ivory border border-ivory-border px-3.5 py-2.5 text-xs text-primaryText focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="017xxxxxxxx"
                          className="w-full bg-ivory border border-ivory-border px-3.5 py-2.5 text-xs text-primaryText focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@domain.com"
                        className="w-full bg-ivory border border-ivory-border px-3.5 py-2.5 text-xs text-primaryText focus:border-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                        Message / Model Inquiry *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell us which timepiece or customization you wish to inquire about..."
                        className="w-full bg-ivory border border-ivory-border p-3 text-xs text-primaryText focus:border-gold focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-charcoal hover:bg-gold text-ivory hover:text-charcoal px-8 py-3.5 text-xs font-bold uppercase tracking-luxury transition-colors shadow-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>DISPATCH MESSAGE</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
