import React from "react";
import Link from "next/link";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { Clock, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />

      <div className="bg-ivory text-primaryText flex-1 flex items-center justify-center py-24 px-4 text-center">
        <div className="max-w-md mx-auto space-y-5">
          <Clock className="w-16 h-16 text-gold-dark mx-auto stroke-1" />
          <span className="text-xs uppercase tracking-ultra-wide text-gold-dark font-semibold">
            ERROR 404
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-primaryText font-medium">
            MOMENT OUT OF CALIBRATION
          </h1>
          <p className="text-xs sm:text-sm text-secondaryText leading-relaxed">
            The page or timepiece record you are seeking does not exist or has been retired from the
            atelier collection.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-charcoal hover:bg-gold text-ivory hover:text-charcoal px-7 py-3.5 text-xs font-bold uppercase tracking-luxury transition-colors"
            >
              <span>RETURN TO MAIN ATELIER</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
