// frontend/src/components/storefront/StorefrontFeaturedProducts.jsx
import React, { useRef } from "react";

export default function StorefrontFeaturedProducts({
  items = [],
  onSelectItem,
  onToggleWishlist,
  wishlist = [],
  navigate,
}) {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const featuredList = items.slice(0, 8);

  return (
    <section className="w-full bg-[#FAF9F5] py-12 border-t border-[#E8E4DC]/60">
      <div className="max-w-7xl mx-auto px-[4vw]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1A1E20] mb-1">
              Featured Items
            </h2>
            <p className="text-xs sm:text-sm text-[#686E70]">
              Handpicked favorites for everyday living
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("rent")}
            className="text-xs sm:text-sm font-semibold text-[#0E2721] hover:text-[#163A32] flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View all items</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Carousel Container with Arrow Controls */}
        <div className="relative group">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Previous items"
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-[#E8E4DC] text-[#1A1E20] shadow-md items-center justify-center hover:bg-[#FAF9F5] hover:border-[#0E2721] transition-all"
          >
            ‹
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Next items"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-[#E8E4DC] text-[#1A1E20] shadow-md items-center justify-center hover:bg-[#FAF9F5] hover:border-[#0E2721] transition-all"
          >
            ›
          </button>

          {/* Cards Row (Horizontal Scroll on Mobile / Grid on Desktop) */}
          <div
            ref={scrollRef}
            className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth"
          >
            {featuredList.map((item, index) => {
              const displayPrice = item.price || 150;
              const originalPrice = Math.round(displayPrice * 1.25);
              const discountPct = index % 2 === 0 ? "-20%" : index % 3 === 0 ? "-15%" : null;
              const isWish = wishlist.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem && onSelectItem(item)}
                  className="flex-shrink-0 w-[240px] md:w-auto bg-white rounded-2xl border border-[#E8E4DC] p-3 flex flex-col justify-between hover:border-[#0E2721]/30 hover:shadow-lg transition-all duration-200 cursor-pointer relative group/card"
                >
                  {/* Image & Badges */}
                  <div className="relative w-full aspect-square rounded-xl bg-[#F5F3EF] overflow-hidden mb-3">
                    <img
                      src={item.image_url || "/images/chair_black_relax.jpg"}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/chair_black_relax.jpg";
                      }}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                    />

                    {/* Top-Left Discount Badge */}
                    {discountPct && (
                      <span className="absolute top-2.5 left-2.5 bg-[#0E2721] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        {discountPct}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      aria-label="Wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist && onToggleWishlist(item.id);
                      }}
                      className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-sm ${
                        isWish ? "bg-red-50 text-red-500" : "bg-white/90 text-gray-400 hover:text-red-500"
                      }`}
                    >
                      {isWish ? "❤️" : "♡"}
                    </button>
                  </div>

                  {/* Title & Specs */}
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#1A1E20] truncate w-full mb-1 group-hover/card:text-[#0E2721] transition-colors">
                      {item.title}
                    </h3>

                    {/* Star Rating & Review Count */}
                    <div className="flex items-center gap-1.5 text-[11px] text-[#686E70] mb-3">
                      <div className="flex text-[#F59E0B]">
                        {"★".repeat(5)}
                      </div>
                      <span className="text-[10px] font-medium">
                        ({item.rent_count || 30 + (index * 7)})
                      </span>
                    </div>
                  </div>

                  {/* Price & Cart Action Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#F0ECE4]">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-[#1A1E20]">
                          ₹{displayPrice}
                        </span>
                        <span className="text-[10px] text-gray-400 line-through">
                          ₹{originalPrice}
                        </span>
                      </div>
                      <span className="text-[9px] text-[#8C9396] uppercase font-medium">
                        / month
                      </span>
                    </div>

                    {/* Dark Circular Cart Icon Button from Image */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem && onSelectItem(item);
                      }}
                      aria-label="Rent this item"
                      className="w-8 h-8 rounded-full bg-[#0E2721] hover:bg-[#163A32] text-white flex items-center justify-center text-xs shadow-sm hover:scale-105 transition-all"
                      title="Rent Item"
                    >
                      🛍️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
