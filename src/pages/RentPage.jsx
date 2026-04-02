import { useState } from "react";
import { useApp, useAuth } from "../App";

const CATS = ["All","Electronics","Vehicles","Party & Events","Sports & Outdoor","Tools & Equipment","Furniture & Appliances"];
const ICONS = { "Electronics":"📷","Vehicles":"🏍️","Party & Events":"🎉","Sports & Outdoor":"⛺","Tools & Equipment":"🔧","Furniture & Appliances":"🛋️" };

export default function RentPage({ navigate, openAuth }) {
  const { items, rentals, wishlist, rentItem, toggleWishlist } = useApp();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [city, setCity] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [rentModal, setRentModal] = useState(null);
  const [rentForm, setRentForm] = useState({ startDate:"", endDate:"", message:"" });
  const [success, setSuccess] = useState(null);

  const cities = ["All", ...new Set(items.map(i => i.city))];

  let filtered = items.filter(it => {
    const matchSearch = it.title.toLowerCase().includes(search.toLowerCase()) || it.city.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === "All" || it.category === cat;
    const matchCity = city === "All" || it.city === city;
    return matchSearch && matchCat && matchCity;
  });

  if (sortBy === "price-low") filtered.sort((a,b) => a.price - b.price);
  else if (sortBy === "price-high") filtered.sort((a,b) => b.price - a.price);
  else if (sortBy === "rating") filtered.sort((a,b) => parseFloat(b.rating) - parseFloat(a.rating));
  else filtered.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleRent = () => {
    if (!user) { openAuth("login"); return; }
    if (!rentForm.startDate || !rentForm.endDate) { alert("Please select rental dates."); return; }
    const days = Math.ceil((new Date(rentForm.endDate) - new Date(rentForm.startDate)) / 86400000);
    if (days <= 0) { alert("End date must be after start date."); return; }
    const total = days * rentModal.price;
    const receipt = rentItem({ itemId: rentModal.id, itemTitle: rentModal.title, itemOwnerId: rentModal.ownerId, startDate: rentForm.startDate, endDate: rentForm.endDate, days, totalPrice: total, deposit: rentModal.deposit, message: rentForm.message });
    setSuccess({ ...receipt, days, total, item: rentModal });
    setRentModal(null);
    setRentForm({ startDate:"", endDate:"", message:"" });
  };

  const days = rentForm.startDate && rentForm.endDate
    ? Math.max(0, Math.ceil((new Date(rentForm.endDate) - new Date(rentForm.startDate)) / 86400000))
    : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .rp{padding-top:68px;min-height:100vh;background:#f7f7f7;}
        .rp-hero{background:linear-gradient(135deg,#FF6B00,#ff9a3c);padding:44px 48px 36px;}
        .rp-hero h1{font-family:'Syne',sans-serif;font-size:2.2rem;font-weight:800;color:#fff;}
        .rp-hero p{font-family:'DM Sans',sans-serif;font-size:0.95rem;opacity:0.85;color:#fff;margin-top:6px;}
        .rp-search-bar{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;}
        .rp-input{flex:1;min-width:180px;padding:13px 18px;border-radius:50px;border:none;font-family:'DM Sans',sans-serif;font-size:0.92rem;outline:none;}
        .rp-select{padding:13px 18px;border-radius:50px;border:none;font-family:'DM Sans',sans-serif;font-size:0.88rem;outline:none;background:#fff;cursor:pointer;}
        .rp-search-btn{padding:13px 28px;background:#1a1a1a;color:#fff;border:none;border-radius:50px;font-family:'Syne',sans-serif;font-weight:700;cursor:pointer;font-size:0.9rem;}

        /* Cat filter */
        .rp-cats{display:flex;gap:8px;padding:20px 48px 0;overflow-x:auto;scrollbar-width:none;}
        .rp-cats::-webkit-scrollbar{display:none;}
        .rp-cat{padding:8px 18px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:0.85rem;font-weight:500;cursor:pointer;border:1.5px solid #e0e0e0;background:#fff;transition:all .2s;white-space:nowrap;}
        .rp-cat.active{background:#FF6B00;color:#fff;border-color:#FF6B00;}
        .rp-cat:hover:not(.active){border-color:#FF6B00;color:#FF6B00;}

        /* Count & sort bar */
        .rp-bar{display:flex;justify-content:space-between;align-items:center;padding:16px 48px 0;flex-wrap:wrap;gap:8px;}
        .rp-count{font-family:'DM Sans',sans-serif;font-size:0.88rem;color:#666;}
        .rp-sort{padding:8px 14px;border:1.5px solid #e0e0e0;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:0.85rem;outline:none;cursor:pointer;background:#fff;}

        /* Grid */
        .rp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:20px;padding:20px 48px 48px;max-width:1300px;margin:0 auto;}
        .rp-card{background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 2px 14px rgba(0,0,0,0.06);transition:all .2s;cursor:pointer;}
        .rp-card:hover{transform:translateY(-4px);box-shadow:0 8px 30px rgba(0,0,0,0.11);}
        .rp-card-img{height:175px;display:flex;align-items:center;justify-content:center;font-size:3rem;position:relative;}
        .rp-tag{position:absolute;top:10px;left:10px;border-radius:50px;padding:3px 11px;font-family:'DM Sans',sans-serif;font-size:0.72rem;font-weight:600;}
        .rp-wish{position:absolute;top:10px;right:10px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.9);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:transform .2s;}
        .rp-wish:hover{transform:scale(1.15);}
        .rp-body{padding:16px;}
        .rp-cat-tag{font-family:'DM Sans',sans-serif;font-size:0.72rem;color:#FF6B00;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;}
        .rp-title{font-family:'Syne',sans-serif;font-weight:700;font-size:0.98rem;color:#1a1a1a;margin-top:3px;}
        .rp-loc{font-family:'DM Sans',sans-serif;font-size:0.82rem;color:#888;margin-top:3px;}
        .rp-price{font-family:'Syne',sans-serif;font-weight:800;font-size:1.15rem;color:#FF6B00;margin-top:10px;}
        .rp-price span{font-size:0.72rem;font-weight:400;color:#aaa;}
        .rp-meta{display:flex;gap:12px;margin-top:8px;font-family:'DM Sans',sans-serif;font-size:0.78rem;color:#999;}
        .rp-footer{display:flex;gap:8px;margin-top:12px;}
        .rp-rent-btn{flex:1;padding:10px;background:#FF6B00;color:#fff;border:none;border-radius:50px;font-family:'Syne',sans-serif;font-weight:700;font-size:0.85rem;cursor:pointer;transition:all .2s;}
        .rp-rent-btn:hover{background:#e05e00;}
        .rp-rent-btn:disabled{background:#ccc;cursor:not-allowed;}
        .rp-unavail{display:inline-block;background:#fff0f0;color:#e53e3e;border-radius:50px;padding:3px 11px;font-family:'DM Sans',sans-serif;font-size:0.72rem;font-weight:600;}

        /* Rent modal */
        .rm-overlay{position:fixed;inset:0;z-index:2000;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:16px;}
        .rm-box{background:#fff;border-radius:22px;width:100%;max-width:440px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,0.16);max-height:90vh;overflow-y:auto;}
        .rm-head{background:#FF6B00;padding:24px 28px 20px;}
        .rm-head h2{font-family:'Syne',sans-serif;font-weight:800;font-size:1.35rem;color:#fff;}
        .rm-head p{font-family:'DM Sans',sans-serif;font-size:0.83rem;color:rgba(255,255,255,0.78);margin-top:4px;}
        .rm-body{padding:24px 28px;}
        .rm-field{margin-bottom:14px;}
        .rm-label{display:block;font-family:'DM Sans',sans-serif;font-size:0.76rem;color:#777;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.5px;}
        .rm-input{width:100%;padding:11px 14px;border:1.5px solid #e5e5e5;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:0.92rem;outline:none;background:#fafafa;}
        .rm-input:focus{border-color:#FF6B00;}
        .rm-summary{background:#fff8f5;border-radius:14px;padding:16px;margin:16px 0;}
        .rm-sum-row{display:flex;justify-content:space-between;font-family:'DM Sans',sans-serif;font-size:0.87rem;padding:5px 0;}
        .rm-sum-row.total{font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;color:#FF6B00;border-top:1px solid #ffe0cc;margin-top:6px;padding-top:10px;}
        .rm-submit{width:100%;padding:13px;background:#FF6B00;color:#fff;border:none;border-radius:50px;font-family:'Syne',sans-serif;font-weight:700;font-size:0.97rem;cursor:pointer;transition:all .2s;}
        .rm-submit:hover{background:#e05e00;}
        .rm-cancel{width:100%;padding:10px;background:transparent;color:#888;border:none;font-family:'DM Sans',sans-serif;cursor:pointer;margin-top:8px;font-size:0.87rem;}

        /* Success */
        .suc-overlay{position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center;padding:16px;}
        .suc-box{background:#fff;border-radius:22px;width:100%;max-width:400px;padding:36px;text-align:center;box-shadow:0 24px 80px rgba(0,0,0,0.18);}
        .suc-icon{font-size:3.5rem;margin-bottom:12px;}
        .suc-title{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;color:#1a1a1a;}
        .suc-id{font-family:'DM Sans',sans-serif;font-size:0.8rem;color:#aaa;margin-top:4px;}
        .suc-details{background:#f7f7f7;border-radius:14px;padding:16px;margin:18px 0;text-align:left;}
        .suc-row{display:flex;justify-content:space-between;font-family:'DM Sans',sans-serif;font-size:0.87rem;padding:4px 0;}
        .suc-row span:last-child{font-weight:600;color:#1a1a1a;}
        .suc-btn{width:100%;padding:13px;background:#FF6B00;color:#fff;border:none;border-radius:50px;font-family:'Syne',sans-serif;font-weight:700;font-size:0.97rem;cursor:pointer;}

        @media(max-width:600px){
          .rp-hero{padding:32px 20px 28px;}
          .rp-cats{padding:16px 20px 0;}
          .rp-bar{padding:12px 20px 0;}
          .rp-grid{padding:16px 20px 40px;grid-template-columns:1fr;}
        }
      `}</style>

      <div className="rp">
        {/* Header */}
        <div className="rp-hero">
          <h1>Rent Items Near You</h1>
          <p>Browse verified items from real people in your city</p>
          <div className="rp-search-bar">
            <input className="rp-input" placeholder="🔍 Search items, city..." value={search} onChange={e => setSearch(e.target.value)} />
            <select className="rp-select" value={city} onChange={e => setCity(e.target.value)}>
              {cities.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Category filter */}
        <div className="rp-cats">
          {CATS.map(c => (
            <div key={c} className={`rp-cat ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>
              {ICONS[c] || "🔍"} {c}
            </div>
          ))}
        </div>

        {/* Count + sort */}
        <div className="rp-bar">
          <div className="rp-count">{filtered.length} items found</div>
          <select className="rp-sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Grid */}
        <div className="rp-grid">
          {filtered.length === 0 && (
            <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"60px 20px", fontFamily:"'DM Sans',sans-serif", color:"#aaa" }}>
              <div style={{ fontSize:"3rem", marginBottom:12 }}>🔍</div>
              <div style={{ fontSize:"1.1rem", fontWeight:600, color:"#555" }}>No items found</div>
              <div style={{ marginTop:6 }}>Try a different search or category</div>
            </div>
          )}
          {filtered.map(item => {
            const isWished = wishlist.includes(item.id);
            const isOwner = user?.id === item.ownerId;
            return (
              <div className="rp-card" key={item.id}>
                <div className="rp-card-img" style={{ background: item.isAvailable ? "linear-gradient(135deg,#ffe0cc,#ffb380)" : "linear-gradient(135deg,#f0f0f0,#e0e0e0)" }}>
                  {item.images && item.images.length > 0 ? (
                    <img src={item.images[0]} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontSize:"3rem" }}>{ICONS[item.category] || "📦"}</span>
                  )}
                  {item.rating !== "New" && <span className="rp-tag" style={{ background:"#fff3e0", color:"#e65100" }}>⭐ {item.rating}</span>}
                  {item.rating === "New" && <span className="rp-tag" style={{ background:"#e8f5e9", color:"#2e7d32" }}>🆕 New</span>}
                  <button className="rp-wish" onClick={e => { e.stopPropagation(); if (!user) { openAuth("login"); return; } toggleWishlist(item.id); }}>
                    {isWished ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="rp-body">
                  <div className="rp-cat-tag">{ICONS[item.category]} {item.category}</div>
                  <div className="rp-title">{item.title}</div>
                  <div className="rp-loc">📍 {item.city} · {item.condition} condition</div>
                  <div className="rp-price">₹{item.price} <span>/day · ₹{item.deposit} deposit</span></div>
                  <div className="rp-meta">
                    <span>🔄 {item.rentCount} rented</span>
                    <span>👤 {item.ownerName}</span>
                  </div>
                  {!item.isAvailable && item.rentedTill && (
                    <div style={{ marginTop:8 }}>
                      <span className="rp-unavail">🔴 Unavailable till {new Date(item.rentedTill).toLocaleDateString("en-IN")}</span>
                    </div>
                  )}
                  <div className="rp-footer">
                    <button className="rp-rent-btn"
                      disabled={!item.isAvailable || isOwner}
                      onClick={() => {
                        if (!user) { openAuth("login"); return; }
                        setRentModal(item);
                      }}>
                      {isOwner ? "Your Item" : item.isAvailable ? "Rent Now" : "Unavailable"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rent Modal */}
      {rentModal && (
        <div className="rm-overlay" onClick={e => e.target === e.currentTarget && setRentModal(null)}>
          <div className="rm-box">
            <div className="rm-head">
              <h2>{rentModal.title}</h2>
              <p>₹{rentModal.price}/day · ₹{rentModal.deposit} refundable deposit</p>
            </div>
            <div className="rm-body">
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <div className="rm-field">
                  <label className="rm-label">Start Date *</label>
                  <input className="rm-input" type="date" min={new Date().toISOString().split("T")[0]}
                    value={rentForm.startDate} onChange={e => setRentForm(f => ({ ...f, startDate: e.target.value }))} />
                </div>
                <div className="rm-field">
                  <label className="rm-label">End Date *</label>
                  <input className="rm-input" type="date" min={rentForm.startDate || new Date().toISOString().split("T")[0]}
                    value={rentForm.endDate} onChange={e => setRentForm(f => ({ ...f, endDate: e.target.value }))} />
                </div>
              </div>
              <div className="rm-field">
                <label className="rm-label">Message to Owner (optional)</label>
                <textarea className="rm-input" rows={3} placeholder="Any special requirements..."
                  value={rentForm.message} onChange={e => setRentForm(f => ({ ...f, message: e.target.value }))} style={{ resize:"vertical" }} />
              </div>

              {days > 0 && (
                <div className="rm-summary">
                  <div className="rm-sum-row"><span>Duration</span><span>{days} day{days > 1 ? "s" : ""}</span></div>
                  <div className="rm-sum-row"><span>Rent (₹{rentModal.price} × {days})</span><span>₹{rentModal.price * days}</span></div>
                  <div className="rm-sum-row"><span>Refundable Deposit</span><span>₹{rentModal.deposit}</span></div>
                  <div className="rm-sum-row total"><span>Total Payable</span><span>₹{rentModal.price * days + rentModal.deposit}</span></div>
                </div>
              )}

              <button className="rm-submit" onClick={handleRent}>Confirm Rental →</button>
              <button className="rm-cancel" onClick={() => setRentModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {success && (
        <div className="suc-overlay">
          <div className="suc-box">
            <div className="suc-icon">🎉</div>
            <div className="suc-title">Rental Confirmed!</div>
            <div className="suc-id">Receipt ID: {success.receiptId}</div>
            <div className="suc-details">
              {[
                ["Item", success.item?.title],
                ["From", new Date(success.startDate).toLocaleDateString("en-IN")],
                ["To", new Date(success.endDate).toLocaleDateString("en-IN")],
                ["Days", success.days],
                ["Total Paid", `₹${success.totalPrice + success.deposit}`],
              ].map(([k,v]) => (
                <div className="suc-row" key={k}><span>{k}</span><span>{v}</span></div>
              ))}
            </div>
            <button className="suc-btn" onClick={() => { setSuccess(null); navigate("profile"); }}>
              View My Rentals →
            </button>
          </div>
        </div>
      )}
    </>
  );
}