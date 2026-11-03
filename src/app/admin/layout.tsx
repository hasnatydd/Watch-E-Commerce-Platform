"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Watch,
  FolderTree,
  Boxes,
  ShoppingBag,
  CreditCard,
  ShieldAlert,
  Ticket,
  Settings,
  Users,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Crown,
  Lock,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { name: "Executive Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products & Watches", href: "/admin/products", icon: Watch },
    { name: "Categories", href: "/admin/categories", icon: FolderTree },
    { name: "Stock & Inventory", href: "/admin/inventory", icon: Boxes },
    { name: "Orders Management", href: "/admin/orders", icon: ShoppingBag },
    { name: "Payment Verification", href: "/admin/payments", icon: CreditCard },
    { name: "Payment Settings (BD)", href: "/admin/settings/payments", icon: Settings },
    { name: "Fraud & Fake Order", href: "/admin/fraud", icon: ShieldAlert },
    { name: "VIP Memberships", href: "/admin/memberships", icon: Crown },
    { name: "Promotional Coupons", href: "/admin/coupons", icon: Ticket },
    { name: "Website & Delivery", href: "/admin/settings/site", icon: Settings },
  ];

  // 1. Loading State
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-charcoal-deep text-ivory flex flex-col items-center justify-center p-6">
        <div className="relative w-16 h-16 mb-4">
          <Image
            src="/images/arvano-icon.jpg"
            alt="ARVANO Icon"
            fill
            className="object-contain"
          />
        </div>
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4" />
        <span className="font-serif text-lg tracking-wide text-ivory">
          VERIFYING EXECUTIVE CLEARANCE...
        </span>
        <span className="text-xs text-ivory/50 mt-1 font-mono">
          ARVANO Security Protocol
        </span>
      </div>
    );
  }

  // 2. Unauthenticated State (Requires Admin Email & Password)
  if (status === "unauthenticated" || !session) {
    return (
      <div className="min-h-screen bg-charcoal-deep text-ivory flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-charcoal border border-gold/40 p-8 shadow-2xl space-y-6">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-3">
              <Image
                src="/images/arvano-icon.jpg"
                alt="ARVANO Icon"
                fill
                className="object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px] uppercase tracking-ultra-wide font-mono mb-2">
              <Lock className="w-3.5 h-3.5" />
              <span>AUTHENTICATION MANDATORY</span>
            </div>
            <h1 className="font-serif text-2xl text-ivory tracking-tight">
              ADMINISTRATOR LOGIN REQUIRED
            </h1>
            <p className="text-xs text-ivory/70 mt-2 font-light leading-relaxed">
              ARVANO Executive Atelier controls are strictly protected. To access orders, inventory, payments, and system settings, you must authenticate with administrator credentials.
            </p>
          </div>

          {/* Admin Credentials Reference Card */}
          <div className="p-4 bg-charcoal-deep border border-ivory/10 space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-ivory/10 pb-2">
              <span className="text-[10px] uppercase font-bold text-gold tracking-wider font-mono">
                Atelier Master Credentials:
              </span>
              <span className="text-[10px] text-green-400 font-mono">● Active</span>
            </div>
            <div className="space-y-1 font-mono text-[11px]">
              <div className="flex justify-between text-ivory/80">
                <span className="text-ivory/50">Admin Email:</span>
                <span className="font-semibold text-ivory select-all">admin@arvano.com</span>
              </div>
              <div className="flex justify-between text-ivory/80">
                <span className="text-ivory/50">Master Password:</span>
                <span className="font-semibold text-gold select-all">ArvanoSuperAdmin2026!#</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
              className="w-full bg-gold hover:bg-gold-hover text-charcoal py-3.5 text-xs font-bold uppercase tracking-luxury transition-all shadow-gold-glow flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>SIGN IN TO ADMIN PANEL</span>
            </Link>

            <Link
              href="/"
              className="w-full border border-ivory/20 hover:border-gold hover:text-gold text-ivory/70 py-3 text-xs uppercase tracking-wider transition-all block text-center"
            >
              Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated but Insufficient Permissions (e.g. CUSTOMER role)
  const role = (session.user as any)?.role;
  const isAdmin =
    role === "ADMIN" ||
    role === "SUPER_ADMIN" ||
    role === "PRODUCT_MANAGER" ||
    role === "ORDER_MANAGER";

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-charcoal-deep text-ivory flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-charcoal border border-red-500/40 p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-ultra-wide text-red-400 font-mono font-bold">
              ACCESS RESTRICTED (403)
            </span>
            <h1 className="font-serif text-2xl text-ivory mt-1">
              INSUFFICIENT PERMISSIONS
            </h1>
            <p className="text-xs text-ivory/60 mt-2 font-light leading-relaxed">
              You are signed in as <strong className="text-ivory">{session.user?.email}</strong> with role{" "}
              <span className="font-mono text-gold font-bold">{role || "CUSTOMER"}</span>. Only authenticated Atelier Administrators can access this dashboard.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => signOut({ callbackUrl: "/login?callbackUrl=/admin" })}
              className="w-full bg-gold hover:bg-gold-hover text-charcoal py-3.5 text-xs font-bold uppercase tracking-luxury transition-all"
            >
              Sign In with Admin Account
            </button>
            <Link
              href="/"
              className="w-full border border-ivory/20 hover:border-gold hover:text-gold text-ivory/70 py-3 text-xs uppercase tracking-wider transition-all block text-center"
            >
              Return to Customer Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 4. Authenticated Administrator -> Full Dashboard
  return (
    <div className="min-h-screen bg-charcoal-deep text-ivory flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-charcoal border-r border-gold/20 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Logo Brand */}
          <div className="p-6 border-b border-ivory/10 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative w-36 h-10">
                <Image
                  src="/images/arvano-logo.jpg"
                  alt="ARVANO Admin"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-ivory/60 hover:text-gold"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 text-xs uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-gold text-charcoal font-bold shadow-gold-glow"
                      : "text-ivory/80 hover:text-gold hover:bg-ivory/5"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Admin Profile & Sign Out Footer */}
        <div className="p-4 border-t border-ivory/10 space-y-3 text-xs">
          <div className="p-3 bg-charcoal-deep border border-ivory/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-serif font-bold text-sm">
              A
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-ivory truncate flex items-center gap-1.5">
                <span>{session.user?.name || "ARVANO Super Admin"}</span>
                <Crown className="w-3 h-3 text-gold flex-shrink-0" />
              </div>
              <div className="text-[10px] text-ivory/50 font-mono truncate">
                {session.user?.email || "admin@arvano.com"}
              </div>
            </div>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-ivory/70 hover:text-gold px-2 py-1.5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Storefront</span>
            </span>
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 px-2 py-1.5 transition-colors text-left font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-charcoal border-b border-ivory/10 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1 text-ivory/80 hover:text-gold"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-serif text-lg text-ivory font-medium tracking-wide">
              ARVANO EXECUTIVE PORTAL
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px] font-mono">
              <ShieldCheck className="w-3 h-3 text-gold" />
              <span>AUTHENTICATED: {role}</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="System Online" />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
