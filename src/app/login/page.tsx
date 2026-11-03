"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { Lock, Mail, AlertCircle, Loader2, ShieldCheck, KeyRound } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";
  const isAdminTarget = callbackUrl.includes("/admin");

  const [identifier, setIdentifier] = useState(isAdminTarget ? "admin@arvano.com" : "");
  const [password, setPassword] = useState(isAdminTarget ? "ArvanoSuperAdmin2026!#" : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    searchParams.get("error") === "UnauthorizedAdmin"
      ? "Access restricted: Please sign in with an Administrator account."
      : ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        identifier: identifier.trim(),
        password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        // Fetch session to determine role
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        const role = sessionData?.user?.role;
        const isAdmin =
          role === "ADMIN" ||
          role === "SUPER_ADMIN" ||
          role === "PRODUCT_MANAGER" ||
          role === "ORDER_MANAGER";

        if (callbackUrl) {
          router.push(callbackUrl);
        } else if (isAdmin) {
          router.push("/admin");
        } else {
          router.push("/account");
        }
        router.refresh();
      }
    } catch {
      setError("An unexpected login error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFillAdmin = () => {
    setIdentifier("admin@arvano.com");
    setPassword("ArvanoSuperAdmin2026!#");
  };

  return (
    <div className="w-full max-w-md bg-white border border-ivory-border p-8 shadow-sm">
      {/* Logo Monogram */}
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
          {isAdminTarget ? "EXECUTIVE SECURITY PORTAL" : "CLIENT PORTAL"}
        </span>
        <h1 className="font-serif text-2xl text-primaryText tracking-tight mt-0.5">
          {isAdminTarget ? "ADMINISTRATOR SIGN IN" : "SIGN IN TO ARVANO"}
        </h1>
      </div>

      {/* Admin Target Banner */}
      {isAdminTarget && (
        <div className="mb-5 p-3.5 bg-charcoal text-ivory border border-gold/40 text-xs space-y-1">
          <div className="flex items-center gap-2 text-gold font-bold text-[11px] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
            <span>Executive Clearance Required</span>
          </div>
          <p className="text-[11px] text-ivory/70 leading-relaxed font-light">
            You are accessing the administrative atelier controls. Enter your administrator email and master password.
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium mb-1">
            Email or Mobile Number
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="admin@arvano.com or 017xxxxxxxx"
              className="w-full bg-ivory border border-ivory-border px-3.5 py-2.5 text-xs text-primaryText focus:border-gold focus:outline-none"
            />
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondaryText/40" />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs uppercase tracking-wider text-secondaryText font-medium">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[11px] text-gold-dark hover:underline"
            >
              Forgot?
            </Link>
          </div>
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

        {/* Quick Admin Helper Pill */}
        <div className="pt-1 flex items-center justify-between text-[11px]">
          <button
            type="button"
            onClick={handleFillAdmin}
            className="inline-flex items-center gap-1.5 text-gold-dark hover:text-gold transition-colors font-mono font-medium underline underline-offset-2"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Fill Admin Credentials (Demo)</span>
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-charcoal hover:bg-gold text-ivory hover:text-charcoal py-3.5 text-xs font-bold uppercase tracking-luxury transition-colors duration-200 disabled:opacity-50 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-gold" />
              <span>Verifying Credentials...</span>
            </>
          ) : (
            <span>{isAdminTarget ? "ENTER EXECUTIVE PORTAL" : "ACCESS ACCOUNT"}</span>
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-ivory-border text-center text-xs text-secondaryText">
        Don&apos;t have an ARVANO account yet?{" "}
        <Link href="/register" className="text-gold-dark font-semibold hover:underline">
          Create an account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      <div className="bg-ivory text-primaryText flex-1 flex items-center justify-center py-16 px-4">
        <Suspense
          fallback={
            <div className="w-full max-w-md bg-white border border-ivory-border p-8 shadow-sm text-center">
              <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto mb-2" />
              <span className="text-xs text-secondaryText">Loading Portal...</span>
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
