// frontend/src/components/storefront/StorefrontPromoBanners.jsx
import React from "react";

export default function StorefrontPromoBanners({ navigate }) {
  return (
    <section className="w-full bg-[#FAF9F5] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-[4vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ── Left Banner: Curated Living ── */}
          <div className="relative rounded-2xl overflow-hidden min-h-[300px] sm:min-h-[340px] p-8 flex flex-col justify-center border border-[#E8E4DC] shadow-sm group">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/images/lifestyle_living_room.jpg')" }}
            />
            {/* Warm Gradient Wash */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F5]/95 via-[#FAF9F5]/80 to-transparent" />

            {/* Content */}
            <div className="relative z-10 max-w-sm">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0E2721] mb-2 block">
                CURATED LIVING
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1A1E20] leading-tight mb-2">
                Spaces Designed For Rest & Balance
              </h3>
              <p className="text-xs sm:text-sm text-[#575D60] leading-relaxed mb-6">
                Ergonomic comfort, refined craft, and effortless tenures tailored to modern lifestyles.
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => navigate("rent")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0E2721] hover:bg-[#163A32] text-white text-xs font-semibold transition-all shadow-sm"
                >
                  <span>Explore Collection</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── Right Banner: Open-Air / Lounge ── */}
          <div className="relative rounded-2xl overflow-hidden min-h-[300px] sm:min-h-[340px] p-8 flex flex-col justify-center border border-[#E8E4DC] shadow-sm group">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/images/table_lounge_dining.jpg')" }}
            />
            {/* Cool Warm Gradient Wash */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F5]/95 via-[#FAF9F5]/80 to-transparent" />

            {/* Content */}
            <div className="relative z-10 max-w-sm">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0E2721] mb-2 block">
                LEISURE & DINING
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1A1E20] leading-tight mb-2">
                Made For Gatherings & Conversations
              </h3>
              <p className="text-xs sm:text-sm text-[#575D60] leading-relaxed mb-6">
                Solid timber dining setups and weather-ready armchairs that bring people together.
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => navigate("rent")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0E2721] hover:bg-[#163A32] text-white text-xs font-semibold transition-all shadow-sm"
                >
                  <span>View Sets</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
