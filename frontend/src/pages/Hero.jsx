import React, { useState } from "react";
import ListingCard from "../components/ListingCard";
import { useTheme } from "../context/ThemeContext";
import StorefrontHero from "../components/storefront/StorefrontHero";
import StorefrontCategoryRow from "../components/storefront/StorefrontCategoryRow";
import StorefrontFeaturedProducts from "../components/storefront/StorefrontFeaturedProducts";
import StorefrontPromoBanners from "../components/storefront/StorefrontPromoBanners";
import StorefrontTrustStrip from "../components/storefront/StorefrontTrustStrip";
import StorefrontTestimonials from "../components/storefront/StorefrontTestimonials";

export default function Hero({ items, onSelectItem, onToggleWishlist, wishlist = [], navigate }) {
  const { isStorefront } = useTheme();
  const [selectedVideo, setSelectedVideo] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [consultPhone, setConsultPhone] = useState("");

  if (isStorefront) {
    return (
      <div className="w-full bg-[#FAF9F5] text-[#1A1E20]">
        {/* 1. Hero Split Section: Dynamic Sidebar Categories + Showcase Banner */}
        <StorefrontHero items={items} navigate={navigate} />

        {/* 2. Sub-Hero Quick Browsing 6-Card Category Row */}
        <StorefrontCategoryRow items={items} navigate={navigate} />

        {/* 3. Featured Products Carousel with Badges, Ratings, and Dark Cart Button */}
        <StorefrontFeaturedProducts
          items={items}
          onSelectItem={onSelectItem}
          onToggleWishlist={onToggleWishlist}
          wishlist={wishlist}
          navigate={navigate}
        />

        {/* 4. Dual Split Collection Promo Banners */}
        <StorefrontPromoBanners navigate={navigate} />

        {/* 5. 4-Pillar Service & Trust Benefits Strip */}
        <StorefrontTrustStrip />

        {/* 6. Customer Reviews & Testimonials Section */}
        <StorefrontTestimonials navigate={navigate} />
      </div>
    );
  }

  const trendingItems = items.slice(0, 4);
  const latestArrivals = items.slice(0, 8);

  const categories = [
    { name: "Living Room", icon: "🛋️", count: "48 items" },
    { name: "Dining & Bistro", icon: "🪑", count: "32 items" },
    { name: "Electronics", icon: "📷", count: "24 items" },
    { name: "Outdoor & Camp", icon: "⛺", count: "19 items" },
    { name: "Office & Study", icon: "🖥️", count: "27 items" },
  ];

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    if (consultPhone.length >= 10) {
      setConsultSubmitted(true);
      setTimeout(() => {
        setConsultSubmitted(false);
        setConsultOpen(false);
        setConsultPhone("");
      }, 2500);
    }
  };

  return (
    <div className="w-full bg-white text-brand-dark">
      {/* ── 1. Hero Showcase Banner ── */}
      <section className="relative min-h-[85vh] w-full flex flex-col items-center justify-center text-center px-6 py-28 bg-[#1A1D20] text-white overflow-hidden rounded-b-[36px] shadow-lg">
        {/* Background Image with Dark Vignette */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-overlay"
          style={{ backgroundImage: "url('/images/hero_furniture_dark.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#1A1D20]" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold tracking-widest uppercase text-white/90 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            Curated Living · Flexible Tenures
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Rent What You Need, <br />
            <span className="text-brand-primary">Live Without Compromise.</span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
            Experience handpicked designer furniture, premium appliances, and studio gear delivered to your doorstep across Pune, Mumbai, Bangalore, and Delhi.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate("rent")}
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-primary hover:bg-brand-hover text-white font-bold rounded-base transition-all duration-200 shadow-soft hover:shadow-hover text-sm flex items-center justify-center gap-2"
            >
              <span>Explore Rental Catalog</span>
              <span>→</span>
            </button>
            <button
              type="button"
              onClick={() => setConsultOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-base transition-colors text-sm backdrop-blur-sm"
            >
              Free Design Consultation
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. Category Carousel Chips ── */}
      <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-card shadow-card border border-brand-border p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => navigate("rent", { category: c.name })}
              className="p-3.5 rounded-base bg-brand-bg hover:bg-brand-light border border-brand-border hover:border-brand-primary/40 flex flex-col items-center text-center transition-all group"
            >
              <span className="text-2xl mb-1.5 transition-transform group-hover:scale-110">{c.icon}</span>
              <span className="text-xs font-bold text-brand-dark group-hover:text-brand-primary transition-colors">{c.name}</span>
              <span className="text-[10px] text-brand-muted mt-0.5">{c.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── 3. Trending Collections Grid ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">
              Top Booked
            </div>
            <h2 className="text-3xl font-extrabold text-brand-dark">Trending In Demand</h2>
          </div>
          <button
            type="button"
            onClick={() => navigate("rent")}
            className="text-sm font-bold text-brand-primary hover:text-brand-hover flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Products</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingItems.map((item) => (
            <ListingCard
              key={item.id}
              item={item}
              onSelect={onSelectItem}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(item.id)}
            />
          ))}
        </div>
      </section>

      {/* ── 4. Lifestyle Interactive Showcase Banner ── */}
      <section className="bg-brand-bg py-20 border-y border-brand-border">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-primary mb-2">
              Transform Your Space
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight mb-6">
              Designer Living Without The Commitment.
            </h2>
            <p className="text-brand-muted text-base leading-relaxed mb-6">
              Whether you are staging a home, moving for a project, or upgrading your living room, QuickRent gives you complete freedom with flexible swap options and zero moving hassles.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { title: "Zero Lock-In Period", desc: "Rent month-to-month or save up to 40% on annual commitments." },
                { title: "Complimentary Maintenance", desc: "Deep cleaning and wear-and-tear repairs handled by our certified team." },
                { title: "Verified Identity & Deposits", desc: "100% transparent security deposits held safely in escrow." },
              ].map((feat) => (
                <div key={feat.title} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-light text-brand-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-dark">{feat.title}</h4>
                    <p className="text-xs text-brand-muted">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSelectedVideo(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-dark hover:bg-black text-white text-xs font-bold rounded-base shadow-soft transition-colors"
            >
              <span>▶</span>
              <span>Watch Customer Story</span>
            </button>
          </div>

          <div className="relative rounded-card overflow-hidden shadow-card border border-brand-border">
            <img
              src="/images/lifestyle_living_room.jpg"
              alt="Scandinavian Living Room Lifestyle"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/chair_black_relax.jpg";
              }}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <div className="text-xs uppercase tracking-wider font-semibold text-white/80">Featured Setup</div>
                <div className="text-lg font-bold">Nordic Oak Lounge Collection · ₹320/day</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Latest Arrivals 8-Grid ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">
            New In Stock
          </div>
          <h2 className="text-3xl font-extrabold text-brand-dark mb-3">Latest Arrivals</h2>
          <p className="text-sm text-brand-muted">
            Recently listed by verified homeowners and studios. Inspected, sanitized, and ready for swift dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestArrivals.map((item) => (
            <ListingCard
              key={item.id}
              item={item}
              onSelect={onSelectItem}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(item.id)}
            />
          ))}
        </div>
      </section>

      {/* ── 6. Editorial Blog Showcase ── */}
      <section className="bg-brand-bg py-20 border-t border-brand-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">
                Design Editorial
              </div>
              <h2 className="text-3xl font-extrabold text-brand-dark">Living Well & Smarter</h2>
            </div>
            <span className="text-xs text-brand-muted font-medium">Curated guides for urban living</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "How Renting Quality Furniture Beats Disposable Purchases",
                category: "Circular Living",
                image: "/images/blog_eco_furniture.jpg",
                date: "Oct 2026",
              },
              {
                title: "Maximizing Compact Urban Spaces with Modular Accent Tables",
                category: "Space Design",
                image: "/images/blog_custom_furniture.jpg",
                date: "Oct 2026",
              },
              {
                title: "The Eco-Friendly Home: Reducing Moving Waste in Tier-1 Cities",
                category: "Sustainability",
                image: "/images/blog_sustainable_green.jpg",
                date: "Sep 2026",
              },
            ].map((blog) => (
              <div
                key={blog.title}
                className="bg-white rounded-card overflow-hidden border border-brand-border shadow-soft flex flex-col"
              >
                <div className="h-44 overflow-hidden bg-gray-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/chair_black_relax.jpg";
                    }}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-xs text-brand-muted mb-2">
                    <span className="text-brand-primary font-bold uppercase">{blog.category}</span>
                    <span>{blog.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-brand-dark leading-snug mb-3">
                    {blog.title}
                  </h3>
                  <div className="mt-auto pt-2">
                    <span className="text-xs font-bold text-brand-dark hover:text-brand-primary cursor-pointer transition-colors">
                      Read Article →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedVideo(false)}
        >
          <div className="relative w-full max-w-3xl aspect-video bg-black rounded-modal overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedVideo(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 text-white font-bold flex items-center justify-center"
            >
              ✕
            </button>
            <iframe
              title="QuickRent Customer Experience"
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Free Consultation Modal */}
      {consultOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setConsultOpen(false)}
        >
          <div className="bg-white rounded-modal shadow-2xl border border-brand-border w-full max-w-md p-6 text-brand-dark">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Schedule Free Consultation</h3>
              <button onClick={() => setConsultOpen(false)} className="text-gray-400 hover:text-brand-dark">✕</button>
            </div>
            {consultSubmitted ? (
              <div className="py-8 text-center text-green-700">
                <div className="text-3xl mb-2">✓</div>
                <div className="font-bold text-base">Request Received!</div>
                <p className="text-xs text-brand-muted mt-1">Our interior consultant will call you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-4">
                <p className="text-xs text-brand-muted">
                  Share your 10-digit mobile number and our design advisor will help you plan your furniture layout.
                </p>
                <div>
                  <label className="block text-xs uppercase font-bold text-brand-muted mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={consultPhone}
                    onChange={(e) => setConsultPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                    className="w-full px-3.5 py-2.5 text-sm bg-brand-bg border border-brand-border rounded-base outline-none focus:border-brand-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-brand-primary hover:bg-brand-hover text-white text-sm font-bold rounded-base shadow-soft"
                >
                  Confirm Free Callback →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
