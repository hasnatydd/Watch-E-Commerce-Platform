import React from "react";
import Link from "next/link";
import { ShoppingBag, Eye, Printer, Filter, CheckCircle2, AlertCircle } from "lucide-react";
import { prisma, isDatabaseAvailable } from "@/lib/db/prisma";

export const revalidate = 0;

export default async function AdminOrdersPage() {
  let orders: any[] = [];

  if (await isDatabaseAvailable()) {
    try {
      orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          items: true,
          payments: true,
          shipments: true,
        },
      });
    } catch {
      // fallback
    }
  }

  if (!orders || orders.length === 0) {
    // Demo orders fallback
    orders = [
      {
        id: "ord-1",
        orderNumber: "ARV-20261101-9042",
        customerName: "Kazi Shahriar Rahman",
        phone: "01711234567",
        thana: "Gulshan",
        district: "Dhaka",
        grandTotal: 18500,
        paymentMethod: "BKASH",
        paymentStatus: "PENDING_VERIFICATION",
        orderStatus: "PENDING",
        createdAt: new Date(),
        items: [
          {
            productName: "ARVANO Chronos Tachymeter",
            variantName: "Obsidian Black / Steel",
            quantity: 1,
            unitPrice: 18500,
          },
        ],
      },
      {
        id: "ord-2",
        orderNumber: "ARV-20261101-8812",
        customerName: "Tariqul Islam",
        phone: "01811234567",
        thana: "Agrabad",
        district: "Chittagong",
        grandTotal: 28500,
        paymentMethod: "COD",
        paymentStatus: "UNPAID",
        orderStatus: "CONFIRMED",
        createdAt: new Date(Date.now() - 3600000),
        items: [
          {
            productName: "ARVANO Sovereign Automatic",
            variantName: "Emerald / Gold",
            quantity: 1,
            unitPrice: 28500,
          },
        ],
      },
    ];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-ultra-wide text-gold">ORDER DISPATCH</span>
          <h1 className="font-serif text-2xl sm:text-3xl text-ivory font-medium mt-0.5">
            CLIENT ORDERS MANAGEMENT
          </h1>
          <p className="text-xs text-ivory/60 mt-0.5">
            Track consignments, update workflow statuses, and verify financial payments
          </p>
        </div>
      </div>

      <div className="bg-charcoal border border-ivory/10 shadow-luxury overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ivory/80">
            <thead className="bg-charcoal-dark text-ivory/50 uppercase tracking-wider font-mono text-[10px] border-b border-ivory/10">
              <tr>
                <th className="py-3.5 px-4">Order Ref</th>
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Destination</th>
                <th className="py-3.5 px-4">Grand Total</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Order Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory/10 font-mono">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-charcoal-dark/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-gold">{ord.orderNumber}</td>
                  <td className="py-3.5 px-4 font-sans font-medium text-ivory">{ord.customerName}</td>
                  <td className="py-3.5 px-4 text-ivory/60">{ord.phone}</td>
                  <td className="py-3.5 px-4 font-sans text-ivory/70">
                    {ord.thana}, {ord.district}
                  </td>
                  <td className="py-3.5 px-4 font-sans font-semibold text-ivory">
                    ৳{Number(ord.grandTotal).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-[10px] font-bold uppercase">{ord.paymentMethod}</div>
                    <span
                      className={`inline-block px-1.5 py-0.2 text-[9px] uppercase font-bold mt-0.5 ${
                        ord.paymentStatus === "PAID"
                          ? "text-green-400"
                          : ord.paymentStatus === "PENDING_VERIFICATION"
                          ? "text-amber-400"
                          : "text-ivory/50"
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
                    <div className="flex items-center justify-end gap-2 font-sans">
                      <Link
                        href={`/order-confirmation?orderNumber=${ord.orderNumber}`}
                        target="_blank"
                        className="text-gold hover:underline text-[11px]"
                      >
                        Invoice Slip ↗
                      </Link>
                    </div>
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
