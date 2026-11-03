import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Package, Printer, Clock } from "lucide-react";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { getOrderByNumber } from "@/services/order-service";

interface OrderConfirmationProps {
  searchParams: Promise<{
    orderNumber?: string;
  }>;
}

export default async function OrderConfirmationPage({ searchParams }: OrderConfirmationProps) {
  const { orderNumber } = await searchParams;
  const order = orderNumber ? await getOrderByNumber(orderNumber) : null;

  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      <div className="bg-ivory text-primaryText flex-1 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-ivory-border p-8 sm:p-12 shadow-sm text-center">
            <div className="w-16 h-16 bg-green-50 text-green-700 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs uppercase tracking-ultra-wide text-gold-dark font-semibold">
              ORDER CONFIRMATION
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-primaryText font-medium mt-1">
              THANK YOU FOR YOUR PATRONAGE
            </h1>

            <p className="text-xs sm:text-sm text-secondaryText mt-3 max-w-lg mx-auto leading-relaxed">
              Your luxury timepiece order has been successfully registered into our atelier queue.
              Our concierge team is preparing your package with utmost precision.
            </p>

            {/* Order Reference Box */}
            <div className="my-8 p-6 bg-ivory border border-ivory-border max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-ivory-border pb-2">
                <span className="text-secondaryText uppercase tracking-wider">Order Reference:</span>
                <span className="font-mono font-bold text-primaryText text-sm">
                  {orderNumber || "ARV-CONFIRMED"}
                </span>
              </div>
              {order && (
                <>
                  <div className="flex justify-between">
                    <span className="text-secondaryText">Client Name:</span>
                    <span className="font-medium text-primaryText">{order.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondaryText">Phone:</span>
                    <span className="font-mono text-primaryText">{order.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondaryText">Destination:</span>
                    <span className="text-primaryText">{order.thana}, {order.district}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondaryText">Payment Method:</span>
                    <span className="font-bold text-primaryText">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between border-t border-ivory-border pt-2 text-sm font-serif">
                    <span className="text-primaryText font-semibold">Total Amount:</span>
                    <span className="font-bold text-gold-dark">৳{Number(order.grandTotal).toLocaleString()}</span>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href={`/track-order?orderNumber=${orderNumber || ""}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-gold text-ivory hover:text-charcoal px-7 py-3.5 text-xs font-bold uppercase tracking-luxury transition-all"
              >
                <Package className="w-4 h-4" />
                TRACK LIVE STATUS
              </Link>
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-ivory-border hover:border-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-luxury text-primaryText hover:text-gold-dark transition-colors"
              >
                CONTINUE SHOPPING
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
