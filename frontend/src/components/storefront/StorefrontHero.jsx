// frontend/src/components/storefront/StorefrontHero.jsx
import React, { useState } from "react";
import { getDynamicCategories } from "../../utils/categories";

export default function StorefrontHero({ items = [], navigate }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const categories = getDynamicCategories(items);

  const heroSlides = [
    {
      eyebrow: "CURATED COLLECTION",
      headline: "Furnish Your Space With Freedom",
      description: "Designer furniture, functional setups, and studio gear delivered to your door with flexible monthly rentals.",
      cta: "Explore Catalog",
      bgImage: "/images/hero_furniture_dark.jpg",
    },
    {
      eyebrow: "FLEXIBLE LIVING",
      headline: "Quality Pieces For Every Stage",
      description: "Upgrade your living room or workspace without the heavy upfront cost or moving burdens.",
      cta: "Browse All Items",
      bgImage: "/images/lifestyle_living_room.jpg",
    },
    {
      eyebrow: "SUSTAINABLE CHOICES",
      headline: "Smarter Living, Less Waste",
      description: "Join hundreds of happy renters choosing sustainable circular furniture and pristine verified quality.",
      cta: "Rent Today",
      bgImage: "/images/table_lounge_dining.jpg",
    },
  ];

  const currentSlide = heroSlides[activeSlide];

  return (
    <section className="w-full bg-[#FAF9F5] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-[4vw]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* ── Left Sidebar (Categories + Promo Card) ── */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-4">
            {/* Categories Box */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-3 shadow-sm flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#F0ECE4] text-[#1A1E20] font-bold text-xs uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <span>☰</span> All Departments
                </span>
                <span className="text-gray-400 text-xs">›</span>
              </div>

              {/* Dynamic Categories List */}
              <div className="flex flex-col py-2">
                {categories.slice(0, 8).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => navigate("rent", { category: cat.name })}
                    className="flex items-center justify-between px-3 py-2 text-xs text-[#575D60] hover:text-[#0E2721] hover:bg-[#FAF9F5] rounded-lg transition-colors group text-left"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-base group-hover:scale-110 transition-transform">
                        {cat.icon}
                      </span>
                      <span className="font-medium group-hover:font-semibold">
                        {cat.name}
                      </span>
                    </span>
                    <span className="text-[10px] text-gray-400 group-hover:text-[#0E2721]">
                      ›
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Promo Card from Image */}
            <div className="relative rounded-2xl overflow-hidden bg-[#EBF3F0] border border-[#D5E4DE] p-5 flex flex-col justify-end min-h-[180px] shadow-sm group">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: "url('/images/blog_eco_furniture.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E2721]/90 via-[#0E2721]/40 to-transparent" />

              <div className="relative z-10 text-white">
                <div className="text-xs font-serif italic text-white/80 mb-1">
                  Eco-Conscious Living 🌱
                </div>
                <h4 className="font-editorial text-lg font-bold leading-tight mb-3">
                  Smarter Spaces, Greener Future
                </h4>
                <button
                  type="button"
                  onClick={() => navigate("rent")}
                  className="inline-block px-3.5 py-1.5 rounded-full bg-white text-[#0E2721] text-xs font-bold hover:bg-[#FAF9F5] transition-colors shadow-sm"
                >
                  Discover sustainable →
                </button>
              </div>
            </div>
          </div>

          {/* ── Right Main Hero Showcase Banner ── */}
          <div className="lg:col-span-9 relative rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[460px] flex flex-col justify-center px-6 sm:px-12 py-10 shadow-sm border border-[#E8E4DC]">
            {/* Background Image with Warm Vignette */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: `url('${currentSlide.bgImage}')` }}
            />
            {/* Warm Tint Gradient Overlay matching image */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F5]/95 via-[#FAF9F5]/75 to-transparent" />

            {/* Content Container */}
            <div className="relative z-10 max-w-lg">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#0E2721] mb-2 font-sans">
                {currentSlide.eyebrow}
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1E20] leading-[1.15] mb-4">
                {currentSlide.headline}
              </h1>

              <p className="text-sm sm:text-base text-[#575D60] leading-relaxed mb-8 max-w-md font-sans">
                {currentSlide.description}
              </p>

              <div>
                <button
                  type="button"
                  onClick={() => navigate("rent")}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0E2721] hover:bg-[#163A32] text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow"
                >
                  <span>{currentSlide.cta}</span>
                  <span>→</span>
                </button>
              </div>

              {/* Slider Dots Indicator from image */}
              <div className="flex items-center gap-2 mt-10">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeSlide === idx
                        ? "w-8 bg-[#0E2721]"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
