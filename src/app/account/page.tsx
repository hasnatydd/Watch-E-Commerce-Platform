"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import {
  User,
  Package,
  MapPin,
  LogOut,
  ShieldAlert,
  Loader2,
  Clock,
  ArrowRight,
  Crown,
} from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-charcoal text-ivory flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  const user = session?.user as any;
  const isAdmin = user?.role === "SUPER_ADMIN" || user?.role === "ADMIN";

  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      <div className="bg-charcoal-dark border-b border-ivory/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-ultra-wide text-gold">CLIENT PROFILE</span>
            <h1 className="font-serif text-3xl text-ivory tracking-tight mt-1">
              WELCOME, {user?.name || "ESTEEMED CLIENT"}
            </h1>
            <p className="text-xs text-ivory/60 mt-0.5">{user?.email}</p>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="bg-gold hover:bg-gold-hover text-charcoal px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors shadow-gold-glow flex items-center gap-1.5"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            )}

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="border border-ivory/20 hover:border-red-400 hover:text-red-400 text-ivory/80 px-4 py-2.5 text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-ivory text-primaryText flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Account Quick Stats */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-ivory-border p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-3 border-b border-ivory-border pb-4">
                  <div className="w-12 h-12 bg-charcoal text-gold rounded-full flex items-center justify-center font-serif text-lg font-bold">
                    {user?.name ? user.name[0] : "A"}
                  </div>
                  <div>
                    <h3 className="font-serif text-base text-primaryText font-medium">
                      {user?.name}
                    </h3>
                    <p className="text-xs text-gold-dark uppercase font-semibold tracking-wider">
                      {user?.role || "CLIENT"}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-secondaryText space-y-2">
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-medium text-primaryText">{user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Account Status:</span>
                    <span className="text-green-700 font-bold">Active & Verified</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Membership:</span>
                    <span className="text-gold-dark font-medium">ARVANO Circle</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-ivory-border">
                  <Link
                    href="/track-order"
                    className="w-full flex items-center justify-center gap-2 bg-charcoal text-gold py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-gold hover:text-charcoal transition-colors"
                  >
                    <Package className="w-4 h-4" />
                    <span>Track Active Consignment</span>
                  </Link>
                </div>
              </div>

              {/* ARVANO Guild VIP Membership Status Card */}
              <div className="bg-charcoal text-ivory border border-gold/40 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gold">
                    <Crown className="w-4 h-4 text-gold" />
                    <span className="font-serif text-sm font-semibold tracking-wide">ARVANO GUILD</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gold/15 text-gold border border-gold/40 uppercase font-bold">
                    VIP CIRCLE
                  </span>
                </div>

                <p className="text-xs text-ivory/70 leading-relaxed font-light">
                  Subscribe monthly to unlock <strong>15% to 30% huge watch discounts</strong>, bespoke laser engraving, and complimentary Italian leather travel pouches.
                </p>

                <div className="pt-1">
                  <Link
                    href="/membership"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-charcoal py-2.5 text-xs font-bold uppercase tracking-wider transition-colors shadow-gold-glow"
                  >
                    <span>Manage / Join VIP Guild</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-ivory-border p-6 shadow-sm">
                <h3 className="font-serif text-lg text-primaryText uppercase tracking-wider border-b border-ivory-border pb-3 mb-6 flex items-center justify-between">
                  <span>Recent Timepiece Acquisitions</span>
                  <Package className="w-4 h-4 text-gold-dark" />
                </h3>

                <div className="text-center py-12 text-secondaryText">
                  <Clock className="w-10 h-10 text-secondaryText/40 mx-auto mb-2" />
                  <h4 className="font-serif text-lg text-primaryText">No order history found</h4>
                  <p className="text-xs text-secondaryText mt-1 max-w-sm mx-auto">
                    When you order timepieces with your account, your authenticated order history and
                    warranty certificates will appear here.
                  </p>
                  <Link
                    href="/shop"
                    className="mt-5 inline-flex items-center gap-2 bg-charcoal text-gold px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-charcoal transition-colors"
                  >
                    <span>Explore Atelier Catalogue</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
