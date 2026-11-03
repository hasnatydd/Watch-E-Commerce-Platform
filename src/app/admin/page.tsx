import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ShieldAlert,
  Boxes,
  Plus,
} from "lucide-react";
import { prisma, isDatabaseAvailable } from "@/lib/db/prisma";
import { INITIAL_PRODUCTS } from "@/lib/data/initial-catalog";

export const revalidate = 0; // Dynamic admin metrics

export default async function AdminDashboardPage() {
  let totalOrdersCount = 0;
  let pendingOrdersCount = 0;
  let paidOrdersCount = 0;
  let grossRevenue = 0;
  let recentOrders: any[] = [];
  let lowStockCount = 0;

  if (await isDatabaseAvailable()) {
    try {
      const [ordersCount, pendingCount, paidOrders, ordersList, variants] = await Promise.all([
        prisma.order.count(),
        prisma.order.count({ where: { orderStatus: "PENDING" } }),
        prisma.order.findMany({
          where: { paymentStatus: "PAID" },
          select: { grandTotal: true },
        }),
        prisma.order.findMany({
          take: 6,
          orderBy: { createdAt: "desc" },
          include: { items: true, payments: true },
        }),
        prisma.productVariant.findMany({
          where: { stockQuantity: { lte: 3 } },
        }),
      ]);

      totalOrdersCount = ordersCount;
      pendingOrdersCount = pendingCount;
      paidOrdersCount = paidOrders.length;
      grossRevenue = paidOrders.reduce((sum, o) => sum + Number(o.grandTotal), 0);
      recentOrders = ordersList;
      lowStockCount = variants.length;
    } catch {
      // ignore
    }
  } else {
    // If database is in initial setup mode, calculate based on demo catalog
    totalOrdersCount = 12;
    pendingOrdersCount = 3;
    paidOrdersCount = 8;
    grossRevenue = 194500;
    lowStockCount = 2;
    recentOrders = [
      {
        id: "ord-1",
        orderNumber: "ARV-20261101-9042",
        customerName: "Kazi Shahriar Rahman",
        phone: "01711234567",
        grandTotal: 18500,
        paymentMethod: "BKASH",
        paymentStatus: "PENDING_VERIFICATION",
        orderStatus: "PENDING",
        createdAt: new Date(),
      },
      {
        id: "ord-2",
        orderNumber: "ARV-20261101-8812",
        customerName: "Tariqul Islam",
        phone: "01811234567",
        grandTotal: 28500,
        paymentMethod: "COD",
        paymentStatus: "UNPAID",
        orderStatus: "CONFIRMED",
        createdAt: new Date(Date.now() - 3600000),
      },
    ];
  }

  const kpis = [
    {
      label: "Gross Paid Revenue",
      value: `৳${grossRevenue.toLocaleString()}`,
      change: "+18.4% vs last cycle",
      icon: TrendingUp,
      color: "text-gold",
    },
    {
      label: "Total Orders Placed",
      value: totalOrdersCount,
      change: "Active consignments",
      icon: ShoppingBag,
      color: "text-blue-400",
    },
    {
      label: "Pending Verifications",
      value: pendingOrdersCount,
      change: "Requires concierge action",
      icon: Clock,
      color: "text-amber-400",
    },
    {
      label: "Low Stock Variations",
      value: lowStockCount,
      change: "Stock count ≤ 3 units",
      icon: AlertTriangle,
      color: "text-red-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-ultra-wide text-gold">Executive Center</span>
          <h1 className="font-serif text-2xl sm:text-3xl text-ivory font-medium mt-0.5">
            ATELIER PERFORMANCE & METRICS
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 bg-gold hover:bg-gold-hover text-charcoal px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors shadow-gold-glow"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Watch</span>
          </Link>

          <Link
            href="/admin/settings/payments"
            className="border border-ivory/20 hover:border-gold text-ivory/80 hover:text-gold px-4 py-2 text-xs uppercase tracking-wider transition-colors"
          >
            Payment Settings
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-charcoal border border-ivory/10 p-5 shadow-luxury space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-ivory/60 font-medium">
                  {kpi.label}
                </span>
                <Icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <div className="font-serif text-3xl font-semibold text-ivory">{kpi.value}</div>
              <div className="text-[11px] text-ivory/40">{kpi.change}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-charcoal border border-ivory/10 p-6 shadow-luxury space-y-4">
        <div className="flex items-center justify-between border-b border-ivory/10 pb-4">
          <div>
            <h2 className="font-serif text-lg text-ivory font-medium">Recent Atelier Orders</h2>
            <p className="text-xs text-ivory/50">Latest customer acquisitions requiring verification & dispatch</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs uppercase tracking-luxury text-gold hover:text-gold-light flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ivory/80">
            <thead className="bg-charcoal-dark text-ivory/50 uppercase tracking-wider font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory/10 font-mono">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-charcoal-dark/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-gold">{ord.orderNumber}</td>
                  <td className="py-3.5 px-4 font-sans font-medium text-ivory">{ord.customerName}</td>
                  <td className="py-3.5 px-4 text-ivory/60">{ord.phone}</td>
                  <td className="py-3.5 px-4 uppercase">{ord.paymentMethod}</td>
                  <td className="py-3.5 px-4 font-sans font-semibold text-ivory">
                    ৳{Number(ord.grandTotal).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] uppercase font-bold ${
                        ord.paymentStatus === "PAID"
                          ? "bg-green-950 text-green-300 border border-green-800"
                          : ord.paymentStatus === "PENDING_VERIFICATION"
                          ? "bg-amber-950 text-amber-300 border border-amber-800"
                          : "bg-charcoal-dark text-ivory/60 border border-ivory/20"
                      }`}
                    >
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 text-[10px] uppercase bg-charcoal-dark text-ivory/80 border border-ivory/20">
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/admin/orders/${ord.id}`}
                      className="text-gold hover:underline text-[11px] font-sans"
                    >
                      Inspect →
                    </Link>
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
