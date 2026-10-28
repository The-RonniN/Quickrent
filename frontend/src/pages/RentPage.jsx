// frontend/src/pages/RentPage.jsx
import React, { useState } from "react";
import ListingCard from "../components/ListingCard";

const CATEGORIES = [
  "All",
  "Furniture & Living",
  "Living Room",
  "Dining & Bistro",
  "Electronics",
  "Sports & Outdoor",
];

export default function RentPage({
  items = [],
  selectedItem,
  onSelectItem,
  onToggleWishlist,
  wishlist = [],
  onBookItem,
  openAuth,
  user,
  initialCategory = "All",
  initialSearch = "",
}) {
  const [search, setSearch] = useState(initialSearch || "");
  const [selectedCat, setSelectedCat] = useState(initialCategory || "All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [bookingSuccess, setBookingSuccess] = useState(null);

  React.useEffect(() => {
    if (initialCategory) setSelectedCat(initialCategory);
  }, [initialCategory]);

  React.useEffect(() => {
    if (initialSearch !== undefined) setSearch(initialSearch);
  }, [initialSearch]);

  // Booking Form State for Selected Item
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState("");
  const [bookLoading, setBookLoading] = useState(false);
  const [bookError, setBookError] = useState("");

  const cities = ["All", ...new Set(items.map((i) => i.city).filter(Boolean))];

  // Filtering
  let filtered = items.filter((it) => {
    const q = search.toLowerCase();
    const matchSearch =
      it.title.toLowerCase().includes(q) ||
      (it.city && it.city.toLowerCase().includes(q)) ||
      (it.category && it.category.toLowerCase().includes(q));
    const matchCat = selectedCat === "All" || it.category === selectedCat;
    const matchCity = selectedCity === "All" || it.city === selectedCity;
    return matchSearch && matchCat && matchCity;
  });

  // Sorting
  if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") filtered.sort((a, b) => (b.rating || 5) - (a.rating || 5));

  // Rental Calculation for Modal
  const days = startDate && endDate
    ? Math.max(0, Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000))
    : 0;

  const currentPrice = selectedItem?.price || 100;
  const currentDeposit = selectedItem?.deposit || 0;
  const rentTotal = days * currentPrice;
  const platformFee = Math.round(rentTotal * 0.02);
  const grandTotal = rentTotal + currentDeposit + platformFee;

  const handleConfirmBooking = async () => {
    if (!user) {
      openAuth("login");
      return;
    }
    if (!startDate || !endDate || days <= 0) {
      setBookError("Please choose valid start and end dates.");
      return;
    }

    setBookLoading(true);
    setBookError("");
    try {
      const res = await onBookItem({
        item_id: selectedItem.id,
        item_title: selectedItem.title,
        start_date: startDate,
        end_date: endDate,
        days,
        total_amount_paise: grandTotal * 100,
        security_deposit_paise: currentDeposit * 100,
        platform_fee_paise: platformFee * 100,
        renter_name: user.name,
        renter_email: user.email,
        renter_phone: user.phone || "",
      });

      setBookingSuccess({
        receiptId: res.hold?.receipt_id || "QR-" + Date.now().toString().slice(-8),
        itemTitle: selectedItem.title,
        grandTotal,
        days,
      });
    } catch (err) {
      setBookError(err.message || "Unable to confirm booking hold. Please try different dates.");
    } finally {
      setBookLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-[72px]">
      {/* ── Page Header & Search ── */}
      <section className="bg-brand-dark text-white px-[4vw] py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-primary mb-2">
            Marketplace Catalog
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Explore Available Rentals
          </h1>
          <p className="text-sm text-white/70 max-w-xl mt-2">
            Inspected and verified furniture, electronics, and lifestyle setups ready for instant reservation.
          </p>

          {/* Search Inputs Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-3xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, city, or keyword..."
              className="flex-1 px-4 py-3 bg-brand-surface border border-white/10 rounded-base text-sm text-white placeholder-gray-400 outline-none focus:border-brand-primary"
            />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-3 bg-brand-surface border border-white/10 rounded-base text-sm text-white outline-none focus:border-brand-primary cursor-pointer"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  📍 {c === "All" ? "All Locations" : c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ── Filter Chips Bar ── */}
      <div className="max-w-6xl mx-auto px-[4vw] pt-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-base text-xs font-bold whitespace-nowrap transition-colors border ${
                selectedCat === cat
                  ? "bg-brand-primary text-white border-brand-primary shadow-soft"
                  : "bg-white text-brand-muted hover:text-brand-dark border-brand-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-brand-muted">
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-brand-border px-3 py-1.5 rounded-base text-xs text-brand-dark font-medium outline-none"
          >
            <option value="newest">Latest Listed</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* ── Catalog Item Grid ── */}
      <main className="max-w-6xl mx-auto px-[4vw] py-8">
        <div className="text-xs text-brand-muted mb-4 font-medium">
          Showing <strong>{filtered.length}</strong> available item{filtered.length !== 1 ? "s" : ""}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-card border border-brand-border p-12 text-center text-brand-muted my-6">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-brand-dark mb-1">No items match your search</h3>
            <p className="text-xs max-w-sm mx-auto mb-4">
              Try adjusting your category filter, city location, or search keywords.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCat("All");
                setSelectedCity("All");
              }}
              className="px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-base shadow-soft"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <ListingCard
                key={item.id}
                item={item}
                onSelect={(it) => {
                  setBookingSuccess(null);
                  onSelectItem(it);
                }}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.includes(item.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Item Detail & Booking Drawer Modal ── */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={(e) => e.target === e.currentTarget && onSelectItem(null)}
        >
          <div className="bg-white rounded-modal shadow-2xl border border-brand-border w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row animate-in zoom-in-95">
            {/* Image Preview */}
            <div className="md:w-1/2 bg-gray-100 relative min-h-[260px] md:min-h-full">
              <img
                src={selectedItem.image_url || selectedItem.image || "/images/chair_black_relax.jpg"}
                alt={selectedItem.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/chair_black_relax.jpg";
                }}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-brand-dark/80 text-white text-xs font-bold px-3 py-1 rounded-md backdrop-blur-sm">
                {selectedItem.category}
              </span>
            </div>

            {/* Content & Dates */}
            <div className="md:w-1/2 p-6 flex flex-col overflow-y-auto">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs uppercase tracking-wider text-brand-muted font-bold">
                  📍 {selectedItem.city} · {selectedItem.condition}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectItem(null)}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <h2 className="text-xl font-extrabold text-brand-dark mb-2">
                {selectedItem.title}
              </h2>
              <p className="text-xs text-brand-muted leading-relaxed mb-4">
                {selectedItem.description}
              </p>

              {bookingSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-card p-6 text-center my-auto">
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                    ✓
                  </div>
                  <h3 className="font-extrabold text-lg text-brand-dark">Booking Hold Confirmed!</h3>
                  <p className="text-xs text-brand-muted mt-1 mb-4">
                    Receipt ID: <strong className="text-brand-dark">{bookingSuccess.receiptId}</strong>
                    <br />
                    Total amount: ₹{bookingSuccess.grandTotal} for {bookingSuccess.days} days.
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelectItem(null)}
                    className="w-full py-2.5 bg-brand-primary text-white text-xs font-bold rounded-base shadow-soft"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="space-y-4 mt-auto">
                  {bookError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-base">
                      {bookError}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-brand-muted mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        min={today}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-brand-bg border border-brand-border rounded-base outline-none focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-brand-muted mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        min={startDate || today}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-brand-bg border border-brand-border rounded-base outline-none focus:border-brand-primary"
                      />
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="bg-brand-bg p-3.5 rounded-card border border-brand-border text-xs space-y-1.5">
                    <div className="flex justify-between text-brand-muted">
                      <span>Rate (₹{currentPrice}/day × {days}d)</span>
                      <span>₹{rentTotal}</span>
                    </div>
                    <div className="flex justify-between text-brand-muted">
                      <span>Refundable Deposit</span>
                      <span>₹{currentDeposit}</span>
                    </div>
                    <div className="flex justify-between text-brand-muted">
                      <span>Platform Fee (2%)</span>
                      <span>₹{platformFee}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-brand-dark pt-2 border-t border-brand-border">
                      <span>Total Payable</span>
                      <span className="text-brand-primary">₹{grandTotal}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={bookLoading || days <= 0}
                    onClick={handleConfirmBooking}
                    className="w-full py-3 bg-brand-primary hover:bg-brand-hover disabled:bg-gray-400 text-white font-bold rounded-base shadow-soft text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {bookLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Reserving Dates...</span>
                      </>
                    ) : days <= 0 ? (
                      "Select Rental Dates"
                    ) : (
                      `🔒 Confirm Hold (₹${grandTotal})`
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
