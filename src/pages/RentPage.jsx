import { useState } from "react";
import { useApp, useAuth } from "../App";
import ItemDetailPage from "./ItemDetailPage";

const CATS = ["All","Electronics","Vehicles","Party & Events","Sports & Outdoor","Tools & Equipment","Furniture & Appliances"];
const ICONS = {
  Electronics:"📷", Vehicles:"🏍️", "Party & Events":"🎉",
  "Sports & Outdoor":"⛺", "Tools & Equipment":"🔧", "Furniture & Appliances":"🛋️",
};

export default function RentPage({ navigate, openAuth }) {
  const { items, wishlist, toggleWishlist } = useApp();
  const { user } = useAuth();

  const [search, setSearch]   = useState("");
  const [cat, setCat]         = useState("All");
  const [city, setCity]       = useState("All");
  const [sortBy, setSortBy]   = useState("newest");
  const [detailItem, setDetailItem] = useState(null); // ← opens full page

  const cities = ["All", ...new Set(items.map(i => i.city))];

  let filtered = items.filter(it => {
    const matchSearch = it.title.toLowerCase().includes(search.toLowerCase()) ||
                        it.city.toLowerCase().includes(search.toLowerCase());
    const matchCat  = cat  === "All" || it.category === cat;
    const matchCity = city === "All" || it.city === city;
    return matchSearch && matchCat && matchCity;
  });

  if (sortBy === "price-low")  filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "rating")     filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  else filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // If a detail item is selected show full page
  if (detailItem) {
    return (
      <ItemDetailPage
        item={detailItem}
        navigate={(page) => {
          setDetailItem(null);
          if (page !== "rent") navigate(page);
          // if page === "rent" just close detail → back to listing grid
        }}
        openAuth={openAuth}
      />
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .rp{padding-top:68px;min-height:100vh;background:#f7f7f7;}
        .rp-hero{background:linear-gradient(135deg,#FF6B00,#ff9a3c);padding:44px 48px 36px;}
        .rp-hero h1{font-family:'Syne',sans-serif;font-size:2.2rem;font-weight:800;color:#fff;}
        .rp-hero p{font-family:'DM Sans',sans-serif;font-size:0.95rem;opacity:0.85;color:#fff;margin-top:6px;}
        .rp-search-bar{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;}
        .rp-input{flex:1;min-width:180px;padding:13px 18px;border-radius:50px;border:none;font-family:'DM Sans',sans-serif;font-size:0.92rem;outline:none;background:#181515;color:#fff;}
        .rp-input::placeholder{color:#999;}
        .rp-select{padding:13px 18px;border-radius:50px;border:none;font-family:'DM Sans',sans-serif;font-size:0.88rem;outline:none;background:#181515;cursor:pointer;}

        .rp-cats{display:flex;gap:8px;padding:20px 48px 0;overflow-x:auto;scrollbar-width:none;}
        .rp-cats::-webkit-scrollbar{display:none;}
        .rp-cat{padding:8px 18px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:0.85rem;font-weight:500;cursor:pointer;border:1.5px solid #e7e5ed;background:#fff;transition:all .2s;white-space:nowrap;}
        .rp-cat.active{background:#FF6B00;color:#fff;border-color:#FF6B00;}
        .rp-cat:hover:not(.active){border-color:#FF6B00;color:#FF6B00;}

        .rp-bar{display:flex;justify-content:space-between;align-items:center;padding:16px 48px 0;flex-wrap:wrap;gap:8px;}
        .rp-count{font-family:'DM Sans',sans-serif;font-size:0.88rem;color:#666;}
        .rp-sort{padding:8px 14px;border:1.5px solid #333;border-radius:20px;font-family:'DM Sans',sans-serif;font-size:0.85rem;outline:none;cursor:pointer;background:#181515;color:#e7e5ed;}

        .rp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:20px;padding:20px 48px 48px;max-width:1300px;margin:0 auto;}

        /* Card — whole card is now clickable */
        .rp-card{background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 2px 14px rgba(0,0,0,0.06);transition:all .2s;cursor:pointer;position:relative;}
        .rp-card:hover{transform:translateY(-4px);box-shadow:0 8px 30px rgba(0,0,0,0.11);}
        .rp-card-img{height:185px;display:flex;align-items:center;justify-content:center;font-size:3rem;position:relative;overflow:hidden;}
        .rp-card-img img{width:100%;height:100%;object-fit:cover;display:block;}
        .rp-tag{position:absolute;top:10px;left:10px;border-radius:50px;padding:3px 11px;font-family:'DM Sans',sans-serif;font-size:0.72rem;font-weight:600;z-index:2;}
        .rp-wish{position:absolute;top:10px;right:10px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.9);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:transform .2s;z-index:2;}
        .rp-wish:hover{transform:scale(1.15);}

        /* "View Details" hover overlay */
        .rp-card-overlay{
          position:absolute;inset:0;background:rgba(0,0,0,0);
          display:flex;align-items:center;justify-content:center;
          transition:background .2s;pointer-events:none;z-index:1;
        }
        .rp-card:hover .rp-card-overlay{background:rgba(0,0,0,0.08);}
        .rp-card-overlay-txt{
          background:#FF6B00;color:#fff;
          padding:8px 20px;border-radius:50px;
          font-family:'Syne',sans-serif;font-weight:700;font-size:0.85rem;
          opacity:0;transform:translateY(6px);transition:all .2s;
        }
        .rp-card:hover .rp-card-overlay-txt{opacity:1;transform:translateY(0);}

        .rp-body{padding:16px;}
        .rp-cat-tag{font-family:'DM Sans',sans-serif;font-size:0.72rem;color:#FF6B00;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;}
        .rp-title{font-family:'Syne',sans-serif;font-weight:700;font-size:0.98rem;color:#1a1a1a;margin-top:3px;}
        .rp-loc{font-family:'DM Sans',sans-serif;font-size:0.82rem;color:#888;margin-top:3px;}
        .rp-price{font-family:'Syne',sans-serif;font-weight:800;font-size:1.15rem;color:#FF6B00;margin-top:10px;}
        .rp-price span{font-size:0.72rem;font-weight:400;color:#aaa;}
        .rp-meta{display:flex;gap:12px;margin-top:8px;font-family:'DM Sans',sans-serif;font-size:0.78rem;color:#999;}
        .rp-unavail{display:inline-block;background:#fff0f0;color:#e53e3e;border-radius:50px;padding:3px 11px;font-family:'DM Sans',sans-serif;font-size:0.72rem;font-weight:600;}
        .rp-view-btn{
          width:100%;margin-top:12px;padding:10px;
          background:#fff;color:#FF6B00;
          border:2px solid #FF6B00;border-radius:50px;
          font-family:'Syne',sans-serif;font-weight:700;font-size:0.85rem;
          cursor:pointer;transition:all .2s;
        }
        .rp-view-btn:hover{background:#FF6B00;color:#fff;}

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
          <p>Browse verified items — click any item to see full details and book</p>
          <div className="rp-search-bar">
            <input
              className="rp-input"
              placeholder="🔍 Search items, city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
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
            const firstImg = item.images?.[0] || item.image || null;

            return (
              <div
                className="rp-card"
                key={item.id}
                onClick={() => setDetailItem(item)}
              >
                {/* Image area */}
                <div className="rp-card-img" style={{
                  background: firstImg
                    ? "transparent"
                    : item.isAvailable
                      ? "linear-gradient(135deg,#ffe0cc,#ffb380)"
                      : "linear-gradient(135deg,#f0f0f0,#e0e0e0)"
                }}>
                  {firstImg
                    ? <img src={firstImg} alt={item.title} />
                    : <span style={{ fontSize:"3rem" }}>{ICONS[item.category] || "📦"}</span>
                  }

                  {/* Rating / New badge */}
                  {item.rating !== "New"
                    ? <span className="rp-tag" style={{ background:"#fff3e0", color:"#e65100" }}>⭐ {item.rating}</span>
                    : <span className="rp-tag" style={{ background:"#e8f5e9", color:"#2e7d32" }}>🆕 New</span>
                  }

                  {/* Multi-image indicator */}
                  {item.images?.length > 1 && (
                    <span style={{
                      position:"absolute", bottom:10, right:10, zIndex:2,
                      background:"rgba(0,0,0,0.55)", color:"#fff",
                      borderRadius:50, padding:"2px 9px",
                      fontFamily:"'DM Sans',sans-serif", fontSize:"0.72rem"
                    }}>
                      📷 {item.images.length}
                    </span>
                  )}

                  {/* Wishlist button */}
                  <button
                    className="rp-wish"
                    onClick={e => {
                      e.stopPropagation();
                      if (!user) { openAuth("login"); return; }
                      toggleWishlist(item.id);
                    }}
                  >
                    {isWished ? "❤️" : "🤍"}
                  </button>

                  {/* Hover overlay */}
                  <div className="rp-card-overlay">
                    <div className="rp-card-overlay-txt">View Details →</div>
                  </div>
                </div>

                {/* Card body */}
                <div className="rp-body">
                  <div className="rp-cat-tag">{ICONS[item.category]} {item.category}</div>
                  <div className="rp-title">{item.title}</div>
                  <div className="rp-loc">📍 {item.city} · {item.condition} condition</div>
                  <div className="rp-price">₹{item.price} <span>/day · ₹{item.deposit} deposit</span></div>
                  <div className="rp-meta">
                    <span>🔄 {item.rentCount || 0} rented</span>
                    <span>👤 {item.ownerName}</span>
                  </div>
                  {!item.isAvailable && item.rentedTill && (
                    <div style={{ marginTop:8 }}>
                      <span className="rp-unavail">
                        🔴 Unavailable till {new Date(item.rentedTill).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  )}
                  <button className="rp-view-btn">
                    {item.isAvailable ? "View Details & Book →" : "View Details"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}