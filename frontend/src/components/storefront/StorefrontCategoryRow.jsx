// frontend/src/components/storefront/StorefrontCategoryRow.jsx
import React from "react";
import { getDynamicCategories } from "../../utils/categories";

export default function StorefrontCategoryRow({ items = [], navigate }) {
  const categories = getDynamicCategories(items).slice(0, 6);

  return (
    <section className="w-full bg-[#FAF9F5] pb-10">
      <div className="max-w-7xl mx-auto px-[4vw]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate("rent", { category: cat.name })}
              className="group bg-white rounded-2xl border border-[#E8E4DC] p-3 flex flex-col items-start cursor-pointer hover:border-[#0E2721]/30 hover:shadow-md transition-all duration-200"
            >
              {/* Thumbnail Container */}
              <div className="w-full aspect-square rounded-xl bg-[#F5F3EF] overflow-hidden mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/chair_black_relax.jpg";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="text-xs sm:text-sm font-bold text-[#1A1E20] truncate w-full mb-1 group-hover:text-[#0E2721] transition-colors">
                {cat.name}
              </h3>

              {/* Action Link */}
              <span className="text-[11px] font-semibold text-[#686E70] group-hover:text-[#0E2721] flex items-center gap-1 transition-colors">
                <span>Rent now</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
