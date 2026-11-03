import React from "react";
import { Star, ShieldCheck } from "lucide-react";

export function CustomerReviews() {
  const reviews = [
    {
      id: "rev-1",
      customerName: "Kazi Shahriar Rahman",
      location: "Gulshan, Dhaka",
      watchPurchased: "ARVANO Chronos Tachymeter (Steel)",
      rating: 5,
      comment:
        "The heft and finishing on the 316L steel link bracelet are extraordinary. The anti-reflective sapphire dial has a crisp clarity that rivals Swiss timepieces I own costing five times as much. Courier arrived safely in Gulshan within 24 hours.",
      date: "Verified Collector",
    },
    {
      id: "rev-2",
      customerName: "Mahmudul Hasan",
      location: "Chittagong",
      watchPurchased: "ARVANO Sovereign Automatic",
      rating: 5,
      comment:
        "The open-heart dial and sweeping second hand on the Sovereign are mesmerizing. The packaging alone—matte black luxury wooden presentation box with gold-engraved warranty card—feels like haute horlogerie.",
      date: "Verified Collector",
    },
    {
      id: "rev-3",
      customerName: "Tariqul Islam",
      location: "Uttara, Dhaka",
      watchPurchased: "ARVANO Heritage Slim Dress",
      rating: 5,
      comment:
        "At under 8mm, it fits under bespoke shirt cuffs effortlessly. Outstanding customer care from the ARVANO concierge team when verifying my bKash payment.",
      date: "Verified Collector",
    },
  ];

  return (
    <section className="bg-charcoal py-20 border-b border-ivory/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-ultra-wide text-gold">Testimonials</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory tracking-tight mt-1">
            CLIENT PERSPECTIVES
          </h2>
          <p className="text-xs text-ivory/60 mt-2 font-light">
            Genuine experiences from distinguished gentlemen and watch enthusiasts across Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-charcoal-dark border border-ivory/10 p-7 flex flex-col justify-between hover:border-gold/40 transition-colors"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center space-x-1 text-gold mb-3">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-ivory/80 leading-relaxed italic mb-6">
                  &ldquo;{r.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-ivory/10 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm text-ivory font-medium">{r.customerName}</h4>
                  <p className="text-[11px] text-ivory/50">{r.location}</p>
                  <p className="text-[10px] text-gold/80 mt-0.5">{r.watchPurchased}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
