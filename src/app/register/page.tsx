"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { Lock, Mail, User, Phone, AlertCircle, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed.");
      }

      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      <div className="bg-ivory text-primaryText flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md bg-white border border-ivory-border p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="relative w-16 h-16 mx-auto mb-3">
              <Image
                src="/images/arvano-icon.jpg"
                alt="ARVANO Icon"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[10px] uppercase tracking-ultra-wide text-gold-dark font-semibold">
              JOIN THE CIRCLE
            </span>
            <h1 className="font-serif text-2xl text-primaryText tracking-tight mt-0.5">
              CREATE ARVANO ACCOUNT
            </h1>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Asif Mahmud"
                  className="w-full bg-ivory border border-ivory-border px-3.5 py-2.5 text-xs text-primaryText focus:border-gold focus:outline-none"
                />
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondaryText/40" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. asif@example.com"
                  className="w-full bg-ivory border border-ivory-border px-3.5 py-2.5 text-xs text-primaryText focus:border-gold focus:outline-none"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondaryText/40" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                Mobile Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 017xxxxxxxx"
                  className="w-full bg-ivory border border-ivory-border px-3.5 py-2.5 text-xs text-primaryText focus:border-gold focus:outline-none"
                />
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondaryText/40" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
                Password (min 6 characters) *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-ivory border border-ivory-border px-3.5 py-2.5 text-xs text-primaryText focus:border-gold focus:outline-none"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondaryText/40" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-charcoal hover:bg-gold text-ivory hover:text-charcoal py-3.5 text-xs font-bold uppercase tracking-luxury transition-colors duration-200 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-gold" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>REGISTER AS CLIENT</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-ivory-border text-center text-xs text-secondaryText">
            Already have an account?{" "}
            <Link href="/login" className="text-gold-dark font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
