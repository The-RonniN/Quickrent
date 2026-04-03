// ItemDetailModal.jsx
// Drop this file in the same folder as RentPage.jsx (e.g. src/pages/ or src/components/)
// Import and use it inside RentPage.jsx — see integration notes at bottom of this file.

export default function ItemDetailModal({
  item,
  onClose,
  onRentSuccess,
  user,
  openAuth,
  rentItem,
}) {
  const { useState } = window.React ?? require("react");

  const today = new Date().toISOString().split("T")[0];
  const [imgIdx, setImgIdx] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [form, setForm] = useState({ startDate: today, endDate: "", message: "" });
  const [success, setSuccess] = useState(null);

  if (!item) return null;

  const images = item.images && item.images.length > 0 ? item.images : null;
  const isOwner = user?.id === item.ownerId;

  const days =
    form.startDate && form.endDate
      ? Math.max(
          0,
          Math.ceil(
            (new Date(form.endDate) - new Date(form.startDate)) / 86400000
          )
        )
      : 0;

  const handleConfirm = () => {
    if (!user) { onClose(); openAuth("login"); return; }
    if (!form.startDate || !form.endDate) { alert("Please select rental dates."); return; }
    if (days <= 0) { alert("End date must be after start date."); return; }
    const total = days * item.price;
    const receipt = rentItem({
      itemId: item.id,
      itemTitle: item.title,
      itemOwnerId: item.ownerId,
      startDate: form.startDate,
      endDate: form.endDate,
      days,
      totalPrice: total,
      deposit: item.deposit,
      message: form.message,
    });
    setSuccess({ ...receipt, days, total, item });
    setShowBooking(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .idm-overlay {
          position: fixed; inset: 0; z-index: 3000;
          background: rgba(0,0,0,0.6); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px; animation: idm-fade-in 0.2s ease;
        }
        @keyframes idm-fade-in { from { opacity:0 } to { opacity:1 } }

        .idm-box {
          background: #fff; border-radius: 24px;
          width: 100%; max-width: 860px; max-height: 92vh;
          overflow-y: auto; display: flex; flex-direction: column;
          box-shadow: 0 32px 100px rgba(0,0,0,0.22);
          animation: idm-slide-up 0.28s cubic-bezier(.4,0,.2,1);
        }
        @keyframes idm-slide-up { from { transform:translateY(40px); opacity:0 } to { transform:translateY(0); opacity:1 } }

        /* Gallery */
        .idm-gallery { position: relative; height: 340px; background: linear-gradient(135deg,#ffe0cc,#ffb380); flex-shrink:0; border-radius: 24px 24px 0 0; overflow: hidden; }
        .idm-gallery img { width:100%; height:100%; object-fit:cover; }
        .idm-gallery-emoji { display:flex; align-items:center; justify-content:center; height:100%; font-size:5rem; }
        .idm-close { position:absolute; top:14px; right:14px; width:36px; height:36px; border-radius:50%; background:rgba(0,0,0,0.45); border:none; color:#fff; font-size:1.1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:10; transition: background .2s; }
        .idm-close:hover { background:rgba(0,0,0,0.7); }
        .idm-arrow { position:absolute; top:50%; transform:translateY(-50%); width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,0.88); border:none; font-size:1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:10; transition: background .15s; }
        .idm-arrow:hover { background:#fff; }
        .idm-arrow.left { left:14px; }
        .idm-arrow.right { right:14px; }
        .idm-dots { position:absolute; bottom:12px; left:50%; transform:translateX(-50%); display:flex; gap:6px; }
        .idm-dot { width:7px; height:7px; border-radius:50%; background:rgba(255,255,255,0.5); transition:background .2s; }
        .idm-dot.active { background:#fff; }
        .idm-photo-count { position:absolute; bottom:14px; right:14px; background:rgba(0,0,0,0.45); color:#fff; font-family:'DM Sans',sans-serif; font-size:0.75rem; padding:3px 10px; border-radius:20px; }

        /* Content */
        .idm-content { padding: 28px 32px 32px; }
        .idm-top { display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; }
        .idm-cat { font-family:'DM Sans',sans-serif; font-size:0.75rem; color:#FF6B00; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; }
        .idm-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1.55rem; color:#1a1a1a; margin-top:4px; }
        .idm-price-block { text-align:right; }
        .idm-price { font-family:'Syne',sans-serif; font-size:1.6rem; font-weight:800; color:#FF6B00; }
        .idm-price sub { font-size:0.75rem; font-weight:400; color:#aaa; font-family:'DM Sans',sans-serif; }
        .idm-deposit { font-family:'DM Sans',sans-serif; font-size:0.8rem; color:#888; margin-top:3px; }

        .idm-badges { display:flex; gap:8px; margin-top:14px; flex-wrap:wrap; }
        .idm-badge { display:inline-flex; align-items:center; gap:5px; background:#f5f5f5; border-radius:50px; padding:5px 13px; font-family:'DM Sans',sans-serif; font-size:0.8rem; color:#444; font-weight:500; }
        .idm-badge.rating { background:#fff3e0; color:#e65100; }
        .idm-badge.avail { background:#e8f5e9; color:#2e7d32; }
        .idm-badge.unavail { background:#fff0f0; color:#e53e3e; }

        .idm-divider { height:1px; background:#f0f0f0; margin: 20px 0; }

        .idm-section-title { font-family:'Syne',sans-serif; font-size:0.95rem; font-weight:700; color:#1a1a1a; margin-bottom:10px; }
        .idm-desc { font-family:'DM Sans',sans-serif; font-size:0.9rem; color:#555; line-height:1.65; }

        .idm-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:4px; }
        .idm-info-item { background:#fafafa; border-radius:12px; padding:12px 16px; }
        .idm-info-label { font-family:'DM Sans',sans-serif; font-size:0.72rem; color:#aaa; text-transform:uppercase; letter-spacing:0.5px; }
        .idm-info-val { font-family:'DM Sans',sans-serif; font-size:0.9rem; color:#1a1a1a; font-weight:600; margin-top:3px; }

        .idm-owner { display:flex; align-items:center; gap:14px; background:#f9f9f9; border-radius:14px; padding:14px 18px; }
        .idm-avatar { width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg,#FF6B00,#ff9a3c); display:flex; align-items:center; justify-content:center; font-size:1.3rem; color:#fff; font-family:'Syne',sans-serif; font-weight:800; flex-shrink:0; }
        .idm-owner-name { font-family:'Syne',sans-serif; font-weight:700; font-size:0.95rem; color:#1a1a1a; }
        .idm-owner-sub { font-family:'DM Sans',sans-serif; font-size:0.78rem; color:#888; margin-top:2px; }

        /* Book button */
        .idm-book-btn { width:100%; padding:15px; background:#FF6B00; color:#fff; border:none; border-radius:50px; font-family:'Syne',sans-serif; font-weight:800; font-size:1rem; cursor:pointer; transition:all .2s; margin-top:6px; letter-spacing:0.3px; }
        .idm-book-btn:hover { background:#e05e00; transform:translateY(-1px); box-shadow:0 6px 20px rgba(255,107,0,0.3); }
        .idm-book-btn:disabled { background:#ccc; cursor:not-allowed; transform:none; box-shadow:none; }
        .idm-owner-item-note { text-align:center; font-family:'DM Sans',sans-serif; font-size:0.83rem; color:#aaa; margin-top:10px; }

        /* Booking panel */
        .idm-booking { background:#fff8f4; border-radius:18px; padding:22px; margin-top:20px; border:1.5px solid #ffe0cc; animation: idm-fade-in 0.2s ease; }
        .idm-booking-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1.05rem; color:#1a1a1a; margin-bottom:16px; }
        .idm-field { margin-bottom:13px; }
        .idm-label { display:block; font-family:'DM Sans',sans-serif; font-size:0.73rem; color:#888; margin-bottom:5px; text-transform:uppercase; letter-spacing:0.5px; }
        .idm-input { width:100%; padding:11px 14px; border:1.5px solid #e5e5e5; border-radius:11px; font-family:'DM Sans',sans-serif; font-size:0.9rem; outline:none; background:#fff; color:#111; box-sizing:border-box; }
        .idm-input[type=date] { color:#111; }
        .idm-input[type=date]::-webkit-calendar-picker-indicator { cursor:pointer; }
        .idm-input:focus { border-color:#FF6B00; }
        .idm-date-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

        .idm-summary { background:#fff; border-radius:13px; padding:14px 16px; margin:14px 0; border:1px solid #ffe0cc; }
        .idm-sum-row { display:flex; justify-content:space-between; font-family:'DM Sans',sans-serif; font-size:0.86rem; padding:4px 0; color:#555; }
        .idm-sum-row.total { font-family:'Syne',sans-serif; font-weight:700; font-size:1rem; color:#FF6B00; border-top:1px solid #ffe0cc; margin-top:7px; padding-top:10px; }

        .idm-confirm-btn { width:100%; padding:13px; background:#1a1a1a; color:#fff; border:none; border-radius:50px; font-family:'Syne',sans-serif; font-weight:700; font-size:0.95rem; cursor:pointer; transition:all .2s; }
        .idm-confirm-btn:hover { background:#333; }
        .idm-cancel-link { text-align:center; margin-top:10px; font-family:'DM Sans',sans-serif; font-size:0.83rem; color:#aaa; cursor:pointer; }
        .idm-cancel-link:hover { color:#FF6B00; }

        /* Success */
        .idm-success { text-align:center; padding:10px 0 4px; }
        .idm-suc-icon { font-size:3rem; margin-bottom:8px; }
        .idm-suc-title { font-family:'Syne',sans-serif; font-size:1.3rem; font-weight:800; color:#1a1a1a; }
        .idm-suc-id { font-family:'DM Sans',sans-serif; font-size:0.78rem; color:#aaa; margin-top:3px; }
        .idm-suc-details { background:#f7f7f7; border-radius:13px; padding:14px; margin:16px 0; text-align:left; }
        .idm-suc-row { display:flex; justify-content:space-between; font-family:'DM Sans',sans-serif; font-size:0.86rem; padding:4px 0; }
        .idm-suc-row span:last-child { font-weight:600; color:#1a1a1a; }
        .idm-suc-btn { width:100%; padding:13px; background:#FF6B00; color:#fff; border:none; border-radius:50px; font-family:'Syne',sans-serif; font-weight:700; font-size:0.95rem; cursor:pointer; }

        @media(max-width:600px) {
          .idm-gallery { height:240px; }
          .idm-content { padding:20px 18px 24px; }
          .idm-title { font-size:1.25rem; }
          .idm-info-grid { grid-template-columns:1fr; }
          .idm-top { flex-direction:column; }
          .idm-price-block { text-align:left; }
        }
      `}</style>

      <div
        className="idm-overlay"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="idm-box">

          {/* ── Gallery ── */}
          <div className="idm-gallery">
            {images ? (
              <img src={images[imgIdx]} alt={item.title} />
            ) : (
              <div className="idm-gallery-emoji">{ICONS[item.category] || "📦"}</div>
            )}

            <button className="idm-close" onClick={onClose}>✕</button>

            {images && images.length > 1 && (
              <>
                <button
                  className="idm-arrow left"
                  onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                >‹</button>
                <button
                  className="idm-arrow right"
                  onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                >›</button>
                <div className="idm-dots">
                  {images.map((_, i) => (
                    <div
                      key={i}
                      className={`idm-dot${i === imgIdx ? " active" : ""}`}
                      onClick={() => setImgIdx(i)}
                    />
                  ))}
                </div>
                <div className="idm-photo-count">{imgIdx + 1} / {images.length}</div>
              </>
            )}
          </div>

          {/* ── Content ── */}
          <div className="idm-content">

            {success ? (
              /* Success state */
              <div className="idm-success">
                <div className="idm-suc-icon">🎉</div>
                <div className="idm-suc-title">Rental Confirmed!</div>
                <div className="idm-suc-id">Receipt: {success.receiptId}</div>
                <div className="idm-suc-details">
                  {[
                    ["Item", success.item?.title],
                    ["From", new Date(success.startDate).toLocaleDateString("en-IN")],
                    ["To", new Date(success.endDate).toLocaleDateString("en-IN")],
                    ["Days", success.days],
                    ["Total Paid", `₹${success.totalPrice + success.deposit}`],
                  ].map(([k, v]) => (
                    <div className="idm-suc-row" key={k}>
                      <span>{k}</span><span>{v}</span>
                    </div>
                  ))}
                </div>
                <button className="idm-suc-btn" onClick={onClose}>
                  Done ✓
                </button>
              </div>
            ) : (
              <>
                {/* Title + Price */}
                <div className="idm-top">
                  <div>
                    <div className="idm-cat">{ICONS[item.category]} {item.category}</div>
                    <div className="idm-title">{item.title}</div>
                  </div>
                  <div className="idm-price-block">
                    <div className="idm-price">₹{item.price}<sub>/day</sub></div>
                    <div className="idm-deposit">+ ₹{item.deposit} refundable deposit</div>
                  </div>
                </div>

                {/* Badges */}
                <div className="idm-badges">
                  {item.rating !== "New" ? (
                    <span className="idm-badge rating">⭐ {item.rating} rating</span>
                  ) : (
                    <span className="idm-badge avail">🆕 New listing</span>
                  )}
                  <span className="idm-badge">📍 {item.city}</span>
                  <span className="idm-badge">🔄 {item.rentCount} rentals</span>
                  <span className={`idm-badge ${item.isAvailable ? "avail" : "unavail"}`}>
                    {item.isAvailable ? "✅ Available" : "🔴 Unavailable"}
                  </span>
                </div>

                <div className="idm-divider" />

                {/* Description */}
                {item.description && (
                  <>
                    <div className="idm-section-title">About this item</div>
                    <div className="idm-desc">{item.description}</div>
                    <div className="idm-divider" />
                  </>
                )}

                {/* Info grid */}
                <div className="idm-section-title">Item Details</div>
                <div className="idm-info-grid">
                  <div className="idm-info-item">
                    <div className="idm-info-label">Condition</div>
                    <div className="idm-info-val">{item.condition}</div>
                  </div>
                  <div className="idm-info-item">
                    <div className="idm-info-label">Category</div>
                    <div className="idm-info-val">{item.category}</div>
                  </div>
                  <div className="idm-info-item">
                    <div className="idm-info-label">Location</div>
                    <div className="idm-info-val">{item.city}</div>
                  </div>
                  <div className="idm-info-item">
                    <div className="idm-info-label">Listed on</div>
                    <div className="idm-info-val">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("en-IN")
                        : "—"}
                    </div>
                  </div>
                  {!item.isAvailable && item.rentedTill && (
                    <div className="idm-info-item" style={{ gridColumn: "1/-1" }}>
                      <div className="idm-info-label">Available from</div>
                      <div className="idm-info-val" style={{ color: "#e53e3e" }}>
                        {new Date(item.rentedTill).toLocaleDateString("en-IN")}
                      </div>
                    </div>
                  )}
                </div>

                <div className="idm-divider" />

                {/* Owner */}
                <div className="idm-section-title">Owner</div>
                <div className="idm-owner">
                  <div className="idm-avatar">
                    {(item.ownerName || "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="idm-owner-name">{item.ownerName}</div>
                    <div className="idm-owner-sub">Member · {item.city}</div>
                  </div>
                </div>

                <div className="idm-divider" />

                {/* Booking section */}
                {!showBooking ? (
                  <>
                    <button
                      className="idm-book-btn"
                      disabled={!item.isAvailable || isOwner}
                      onClick={() => {
                        if (!user) { onClose(); openAuth("login"); return; }
                        setForm({ startDate: today, endDate: "", message: "" });
                        setShowBooking(true);
                      }}
                    >
                      {isOwner
                        ? "This is your item"
                        : item.isAvailable
                        ? "📅 Book This Item"
                        : "Currently Unavailable"}
                    </button>
                    {isOwner && (
                      <div className="idm-owner-item-note">You cannot rent your own item</div>
                    )}
                  </>
                ) : (
                  <div className="idm-booking">
                    <div className="idm-booking-title">📅 Booking Details</div>

                    <div className="idm-date-row">
                      <div className="idm-field">
                        <label className="idm-label">Start Date *</label>
                        <input
                          className="idm-input"
                          type="date"
                          min={today}
                          value={form.startDate}
                          onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                        />
                      </div>
                      <div className="idm-field">
                        <label className="idm-label">End Date *</label>
                        <input
                          className="idm-input"
                          type="date"
                          min={form.startDate || today}
                          value={form.endDate}
                          onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="idm-field">
                      <label className="idm-label">Message to Owner (optional)</label>
                      <textarea
                        className="idm-input"
                        rows={3}
                        placeholder="Any special requirements or questions..."
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        style={{ resize: "vertical" }}
                      />
                    </div>

                    {/* Pre-order summary */}
                    {days > 0 && (
                      <div className="idm-summary">
                        <div className="idm-sum-row">
                          <span>Duration</span>
                          <span>{days} day{days > 1 ? "s" : ""}</span>
                        </div>
                        <div className="idm-sum-row">
                          <span>Rent (₹{item.price} × {days})</span>
                          <span>₹{item.price * days}</span>
                        </div>
                        <div className="idm-sum-row">
                          <span>Refundable Deposit</span>
                          <span>₹{item.deposit}</span>
                        </div>
                        <div className="idm-sum-row total">
                          <span>Total Payable</span>
                          <span>₹{item.price * days + item.deposit}</span>
                        </div>
                      </div>
                    )}

                    <button className="idm-confirm-btn" onClick={handleConfirm}>
                      Confirm Rental →
                    </button>
                    <div className="idm-cancel-link" onClick={() => setShowBooking(false)}>
                      ← Back to details
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── ICONS map (same as RentPage) ────────────────────────────────────────────
const ICONS = {
  Electronics: "📷",
  Vehicles: "🏍️",
  "Party & Events": "🎉",
  "Sports & Outdoor": "⛺",
  "Tools & Equipment": "🔧",
  "Furniture & Appliances": "🛋️",
};

/*
──────────────────────────────────────────────────────────────────────────────
HOW TO INTEGRATE INTO RentPage.jsx
──────────────────────────────────────────────────────────────────────────────

1. IMPORT at top of RentPage.jsx:
   import ItemDetailModal from "./ItemDetailModal";
   (adjust path if files are in different folders)

2. REMOVE the old `selectedItem` / `detailImageIndex` state (ItemDetailModal handles this internally).
   Keep: selectedItem, setSelectedItem — you still need these to open/close the modal.

3. ADD the modal at the end of your return (before the closing </>):

   {selectedItem && (
     <ItemDetailModal
       item={selectedItem}
       onClose={() => setSelectedItem(null)}
       user={user}
       openAuth={openAuth}
       rentItem={rentItem}
     />
   )}

4. The card onClick in RentPage already does:
   onClick={() => { setSelectedItem(item); setDetailImageIndex(0); }}
   You can remove setDetailImageIndex(0) since it's handled inside the modal now.

5. You can now REMOVE the entire old "Rent Modal" block (rentModal state + rm-overlay JSX)
   from RentPage.jsx — booking is handled inside ItemDetailModal.
   Keep the "Success Modal" in RentPage only if you want it there too,
   but ItemDetailModal shows its own inline success screen.
──────────────────────────────────────────────────────────────────────────────
*/