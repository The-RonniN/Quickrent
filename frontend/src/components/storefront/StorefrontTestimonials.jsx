// frontend/src/components/storefront/StorefrontTestimonials.jsx
import React from "react";

export default function StorefrontTestimonials({ navigate }) {
  const reviews = [
    {
      name: "Ananya S.",
      city: "Pune",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      quote: "The dining set arrived in pristine condition, spotless and securely packed. Completely transformed our home without huge upfront costs.",
    },
    {
      name: "Rohan M.",
      city: "Bangalore",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      quote: "Relocating for a 9-month project made renting the smartest choice. Seamless delivery, great customer support, and easy returns.",
    },
    {
      name: "Pooja K.",
      city: "Mumbai",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      quote: "Top-notch experience from booking to delivery. Deposit refund was prompt and the items look even better in person!",
    },
  ];

  return (
    <section className="w-full bg-[#FAF9F5] py-12 border-t border-[#E8E4DC]/60">
      <div className="max-w-7xl mx-auto px-[4vw]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1A1E20] mb-1">
              What Our Renters Say
            </h2>
            <p className="text-xs sm:text-sm text-[#686E70]">
              Real experiences from verified members across India
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("about")}
            className="text-xs sm:text-sm font-semibold text-[#0E2721] hover:text-[#163A32] flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View all reviews</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.name}
              className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#E8E4DC]"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/chair_black_relax.jpg";
                    }}
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1E20] leading-none mb-1">
                      {rev.name}
                    </h4>
                    <div className="flex text-[#F59E0B] text-xs">
                      {"★".repeat(rev.rating)}
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#575D60] leading-relaxed italic mb-4">
                  "{rev.quote}"
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-[#0E2721] font-semibold pt-3 border-t border-[#F0ECE4]">
                <span className="w-4 h-4 rounded-full bg-[#EBF3F0] flex items-center justify-center text-[10px]">
                  ✓
                </span>
                <span>Verified Renter · {rev.city}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
