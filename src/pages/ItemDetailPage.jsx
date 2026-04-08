// import { useState } from "react";
// import { useApp, useAuth } from "../App";
// import BookingForm from "../components/BookingForm";


// const ICONS = {
//   Electronics: "📷", Vehicles: "🏍️", "Party & Events": "🎉",
//   "Sports & Outdoor": "⛺", "Tools & Equipment": "🔧", "Furniture & Appliances": "🛋️",
// };

// export default function ItemDetailPage({ item, navigate, openAuth }) {
//   const { wishlist, toggleWishlist } = useApp();
//   const { user } = useAuth();
//   const [activeImg, setActiveImg] = useState(0);
//   const [showBooking, setShowBooking] = useState(false);
//   const [bookingSuccess, setBookingSuccess] = useState(null);

//   if (!item) return null;

//   // Build photos array — support up to 4 uploaded images
//   const photos = item.images && item.images.length > 0
//     ? item.images
//     : item.image
//       ? [item.image]
//       : [];

//   const isWished = wishlist.includes(item.id);
//   const isOwner = user?.id === item.ownerId;
//   const canBook = item.isAvailable && !isOwner;

//   const handleBookNow = () => {
//     if (!user) { openAuth("login"); return; }
//     setShowBooking(true);
//   };

//   const handleBookingDone = (receipt) => {
//     setShowBooking(false);
//     setBookingSuccess(receipt);
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

//         .idp { padding-top: 68px; min-height: 100vh; background: #f7f7f7; }

//         /* Back bar */
//         .idp-back {
//           display: flex; align-items: center; gap: 10px;
//           padding: 16px 48px; background: #fff;
//           border-bottom: 1px solid #f0f0f0; cursor: pointer;
//           font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
//           color: #555; transition: color .2s;
//         }
//         .idp-back:hover { color: #FF6B00; }
//         .idp-back-arrow { font-size: 1.1rem; }

//         /* Main layout */
//         .idp-layout {
//           display: grid;
//           grid-template-columns: 1fr 420px;
//           gap: 28px;
//           max-width: 1200px;
//           margin: 28px auto;
//           padding: 0 48px 60px;
//           align-items: start;
//         }

//         /* ── LEFT: Gallery ── */
//         .idp-gallery { position: sticky; top: 84px; }
//         .idp-main-img {
//           width: 100%; height: 420px;
//           border-radius: 20px; overflow: hidden;
//           background: linear-gradient(135deg, #ffe0cc, #ffb380);
//           display: flex; align-items: center; justify-content: center;
//           position: relative;
//         }
//         .idp-main-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
//         .idp-main-emoji { font-size: 6rem; }
//         .idp-avail-badge {
//           position: absolute; top: 16px; left: 16px;
//           padding: 6px 14px; border-radius: 50px;
//           font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 700;
//         }

//         /* Thumbnails */
//         .idp-thumbs {
//           display: flex; gap: 10px; margin-top: 12px; flex-wrap: wrap;
//         }
//         .idp-thumb {
//           width: 76px; height: 76px; border-radius: 12px; overflow: hidden;
//           cursor: pointer; border: 2.5px solid transparent;
//           background: linear-gradient(135deg, #ffe0cc, #ffb380);
//           display: flex; align-items: center; justify-content: center;
//           transition: border .2s; flex-shrink: 0;
//         }
//         .idp-thumb.active { border-color: #FF6B00; }
//         .idp-thumb img { width: 100%; height: 100%; object-fit: cover; }
//         .idp-thumb-emoji { font-size: 1.8rem; }

//         /* ── RIGHT: Info panel ── */
//         .idp-info { display: flex; flex-direction: column; gap: 20px; }

//         .idp-card {
//           background: #fff; border-radius: 20px;
//           padding: 24px 28px; box-shadow: 0 2px 14px rgba(0,0,0,0.05);
//         }

//         .idp-cat-row {
//           display: flex; align-items: center; justify-content: space-between;
//           margin-bottom: 8px;
//         }
//         .idp-cat {
//           font-family: 'DM Sans', sans-serif; font-size: 0.78rem;
//           color: #FF6B00; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
//         }
//         .idp-rating {
//           display: flex; align-items: center; gap: 5px;
//           font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: #555;
//         }
//         .idp-title {
//           font-family: 'Syne', sans-serif; font-size: 1.6rem;
//           font-weight: 800; color: #1a1a1a; line-height: 1.2;
//         }
//         .idp-location {
//           font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
//           color: #888; margin-top: 8px;
//         }

//         .idp-divider { border: none; border-top: 1px solid #f0f0f0; margin: 4px 0; }

//         .idp-section-label {
//           font-family: 'Syne', sans-serif; font-weight: 700;
//           font-size: 0.9rem; color: #1a1a1a; margin-bottom: 10px;
//         }
//         .idp-desc {
//           font-family: 'DM Sans', sans-serif; font-size: 0.92rem;
//           color: #555; line-height: 1.75;
//         }

//         /* Owner */
//         .idp-owner-row {
//           display: flex; align-items: center; gap: 14px;
//         }
//         .idp-owner-avatar {
//           width: 46px; height: 46px; border-radius: 50%;
//           background: #FF6B00; display: flex; align-items: center;
//           justify-content: center; font-size: 1.2rem; color: #fff;
//           font-family: 'Syne', sans-serif; font-weight: 800; flex-shrink: 0;
//         }
//         .idp-owner-name {
//           font-family: 'Syne', sans-serif; font-weight: 700;
//           font-size: 0.95rem; color: #1a1a1a;
//         }
//         .idp-owner-meta {
//           font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
//           color: #888; margin-top: 2px;
//         }

//         /* Pricing */
//         .idp-price-row {
//           display: flex; justify-content: space-between; align-items: flex-end;
//         }
//         .idp-price-big {
//           font-family: 'Syne', sans-serif; font-weight: 800;
//           font-size: 2rem; color: #FF6B00; line-height: 1;
//         }
//         .idp-price-sub {
//           font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
//           color: #aaa; margin-top: 3px;
//         }
//         .idp-deposit {
//           text-align: right;
//         }
//         .idp-deposit-val {
//           font-family: 'Syne', sans-serif; font-weight: 700;
//           font-size: 1.1rem; color: #1a1a1a;
//         }
//         .idp-deposit-lbl {
//           font-family: 'DM Sans', sans-serif; font-size: 0.75rem;
//           color: #aaa; margin-top: 2px;
//         }

//         /* Stats row */
//         .idp-stats {
//           display: flex; gap: 20px; margin-top: 14px; padding-top: 14px;
//           border-top: 1px solid #f0f0f0;
//         }
//         .idp-stat {
//           font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: #777;
//         }
//         .idp-stat strong {
//           display: block; font-family: 'Syne', sans-serif;
//           font-size: 1rem; font-weight: 700; color: #1a1a1a;
//         }

//         /* Availability */
//         .idp-avail-pill {
//           display: inline-flex; align-items: center; gap: 6px;
//           padding: 8px 16px; border-radius: 50px;
//           font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 600;
//         }

//         /* CTA Buttons */
//         .idp-cta { display: flex; gap: 12px; margin-top: 4px; }
//         .idp-wish-btn {
//           width: 48px; height: 48px; border-radius: 50%;
//           border: 2px solid #e5e5e5; background: #fff;
//           font-size: 1.3rem; cursor: pointer;
//           display: flex; align-items: center; justify-content: center;
//           transition: all .2s; flex-shrink: 0;
//         }
//         .idp-wish-btn:hover { border-color: #FF6B00; transform: scale(1.08); }
//         .idp-book-btn {
//           flex: 1; padding: 14px 24px;
//           background: #FF6B00; color: #fff; border: none;
//           border-radius: 50px; font-family: 'Syne', sans-serif;
//           font-weight: 700; font-size: 1rem; cursor: pointer;
//           transition: all .2s;
//         }
//         .idp-book-btn:hover { background: #e05e00; transform: translateY(-1px); }
//         .idp-book-btn:disabled {
//           background: #ccc; cursor: not-allowed; transform: none;
//         }
//         .idp-owner-note {
//           font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
//           color: #aaa; text-align: center; margin-top: 4px;
//         }

//         /* Success overlay */
//         .suc-overlay { position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center;padding:16px; }
//         .suc-box { background:#fff;border-radius:22px;width:100%;max-width:400px;padding:36px;text-align:center;box-shadow:0 24px 80px rgba(0,0,0,0.18); }

//         @media (max-width: 900px) {
//           .idp-layout { grid-template-columns: 1fr; padding: 0 20px 48px; }
//           .idp-gallery { position: static; }
//           .idp-main-img { height: 300px; }
//           .idp-back { padding: 14px 20px; }
//         }
//       `}</style>

//       <div className="idp">
//         {/* Back bar */}
//         <div className="idp-back" onClick={() => navigate("rent")}>
//           <span className="idp-back-arrow">←</span>
//           Back to listings
//         </div>

//         <div className="idp-layout">

//           {/* ── LEFT: Photo Gallery ── */}
//           <div className="idp-gallery">
//             <div className="idp-main-img">
//               {photos.length > 0
//                 ? <img src={photos[activeImg]} alt={item.title} />
//                 : <span className="idp-main-emoji">{ICONS[item.category] || "📦"}</span>
//               }
//               <span className="idp-avail-badge" style={{
//                 background: item.isAvailable ? "#e8f5e9" : "#fff0f0",
//                 color: item.isAvailable ? "#2e7d32" : "#e53e3e"
//               }}>
//                 {item.isAvailable ? "✅ Available" : `🔴 Unavailable till ${new Date(item.rentedTill).toLocaleDateString("en-IN")}`}
//               </span>
//             </div>

//             {/* Thumbnails — show if multiple images OR show single as thumb */}
//             {photos.length > 1 && (
//               <div className="idp-thumbs">
//                 {photos.map((src, i) => (
//                   <div
//                     key={i}
//                     className={`idp-thumb ${activeImg === i ? "active" : ""}`}
//                     onClick={() => setActiveImg(i)}
//                   >
//                     <img src={src} alt={`photo ${i + 1}`} />
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* No images — show category thumbnails as placeholders */}
//             {photos.length === 0 && (
//               <div className="idp-thumbs">
//                 {[...Array(2)].map((_, i) => (
//                   <div key={i} className={`idp-thumb ${activeImg === i ? "active" : ""}`} onClick={() => setActiveImg(i)}>
//                     <span className="idp-thumb-emoji">{ICONS[item.category] || "📦"}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* ── RIGHT: Info Panel ── */}
//           <div className="idp-info">

//             {/* Title card */}
//             <div className="idp-card">
//               <div className="idp-cat-row">
//                 <span className="idp-cat">{ICONS[item.category]} {item.category}</span>
//                 <span className="idp-rating">⭐ {item.rating !== "New" ? item.rating : "New listing"}</span>
//               </div>
//               <div className="idp-title">{item.title}</div>
//               <div className="idp-location">📍 {item.city} &nbsp;·&nbsp; {item.condition} condition</div>
//             </div>

//             {/* Description */}
//             <div className="idp-card">
//               <div className="idp-section-label">About this item</div>
//               <div className="idp-desc">{item.description || "No description provided."}</div>
//             </div>

//             {/* Owner */}
//             <div className="idp-card">
//               <div className="idp-section-label">Listed by</div>
//               <div className="idp-owner-row">
//                 <div className="idp-owner-avatar">
//                   {item.ownerName?.[0]?.toUpperCase() || "?"}
//                 </div>
//                 <div>
//                   <div className="idp-owner-name">{item.ownerName || "Unknown"}</div>
//                   <div className="idp-owner-meta">
//                     📞 {item.ownerPhone ? item.ownerPhone.replace(/(\d{6})(\d{4})/, "XXXXXX$2") : "Not provided"}
//                     &nbsp;·&nbsp; 🔄 {item.rentCount || 0} rentals
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Pricing + CTA */}
//             <div className="idp-card">
//               <div className="idp-section-label">Pricing & Availability</div>

//               <div className="idp-price-row">
//                 <div>
//                   <div className="idp-price-big">₹{item.price}</div>
//                   <div className="idp-price-sub">per day</div>
//                 </div>
//                 <div className="idp-deposit">
//                   <div className="idp-deposit-val">₹{item.deposit}</div>
//                   <div className="idp-deposit-lbl">refundable deposit</div>
//                 </div>
//               </div>

//               <div className="idp-stats">
//                 <div className="idp-stat"><strong>{item.rentCount || 0}</strong>Times rented</div>
//                 <div className="idp-stat"><strong>{item.condition}</strong>Condition</div>
//                 {item.availableFrom && (
//                   <div className="idp-stat">
//                     <strong>{new Date(item.availableFrom).toLocaleDateString("en-IN")}</strong>
//                     Available from
//                   </div>
//                 )}
//               </div>

//               <hr className="idp-divider" style={{ margin: "16px 0" }} />

//               {/* Availability status */}
//               <div style={{ marginBottom: 16 }}>
//                 {item.isAvailable
//                   ? <span className="idp-avail-pill" style={{ background: "#e8f5e9", color: "#2e7d32" }}>✅ Available for rent</span>
//                   : <span className="idp-avail-pill" style={{ background: "#fff0f0", color: "#e53e3e" }}>
//                       🔴 Unavailable till {new Date(item.rentedTill).toLocaleDateString("en-IN")}
//                     </span>
//                 }
//               </div>

//               {/* CTA */}
//               <div className="idp-cta">
//                 <button
//                   className="idp-wish-btn"
//                   onClick={() => { if (!user) { openAuth("login"); return; } toggleWishlist(item.id); }}
//                   title={isWished ? "Remove from wishlist" : "Add to wishlist"}
//                 >
//                   {isWished ? "❤️" : "🤍"}
//                 </button>
//                 <button
//                   className="idp-book-btn"
//                   disabled={!canBook}
//                   onClick={handleBookNow}
//                 >
//                   {isOwner ? "This is your item" : item.isAvailable ? "📅 Book Now →" : "Not Available"}
//                 </button>
//               </div>
//               {isOwner && <div className="idp-owner-note">You cannot rent your own listing</div>}
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Booking Form Modal */}
//       {showBooking && (
//         <BookingForm
//           item={item}
//           onClose={() => setShowBooking(false)}
//           onSuccess={handleBookingDone}
//           navigate={navigate}
//         />
//       )}

//       {/* Booking Success */}
//       {bookingSuccess && (
//         <div className="suc-overlay">
//           <div className="suc-box">
//             <div style={{ fontSize: "3.5rem", marginBottom: 12 }}>🎉</div>
//             <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#1a1a1a" }}>Booking Confirmed!</div>
//             <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "#aaa", marginTop: 4 }}>
//               Receipt ID: {bookingSuccess.receiptId}
//             </div>
//             <div style={{ background: "#f7f7f7", borderRadius: 14, padding: 16, margin: "18px 0", textAlign: "left" }}>
//               {[
//                 ["Item", bookingSuccess.itemTitle],
//                 ["From", new Date(bookingSuccess.startDate).toLocaleDateString("en-IN")],
//                 ["To", new Date(bookingSuccess.endDate).toLocaleDateString("en-IN")],
//                 ["Days", bookingSuccess.days],
//                 ["Rent", `₹${bookingSuccess.totalPrice}`],
//                 ["Deposit", `₹${bookingSuccess.deposit}`],
//                 ["Total Paid", `₹${bookingSuccess.totalPrice + bookingSuccess.deposit}`],
//               ].map(([k, v]) => (
//                 <div key={k} style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Sans',sans-serif", fontSize: "0.87rem", padding: "5px 0", borderBottom: "1px solid #eee" }}>
//                   <span style={{ color: "#999" }}>{k}</span>
//                   <span style={{ fontWeight: 600, color: "#1a1a1a" }}>{v}</span>
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={() => { setBookingSuccess(null); navigate("profile"); }}
//               style={{ width: "100%", padding: 13, background: "#FF6B00", color: "#fff", border: "none", borderRadius: 50, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.97rem", cursor: "pointer" }}
//             >
//               View My Rentals →
//             </button>
//             <button
//               onClick={() => { setBookingSuccess(null); navigate("rent"); }}
//               style={{ width: "100%", padding: 10, background: "transparent", color: "#888", border: "none", fontFamily: "'DM Sans',sans-serif", cursor: "pointer", marginTop: 6 }}
//             >
//               Back to listings
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
//-----------------------------------------------------------------------------

// import { useState } from "react";
// import { useApp, useAuth } from "../App";
// import BookingForm from "../components/BookingForm";
// import { generateReceiptPDF } from "../utils/generateReceipt";

// const ICONS = {
//   Electronics: "📷", Vehicles: "🏍️", "Party & Events": "🎉",
//   "Sports & Outdoor": "⛺", "Tools & Equipment": "🔧", "Furniture & Appliances": "🛋️",
// };

// export default function ItemDetailPage({ item, navigate, openAuth }) {
//   const { wishlist, toggleWishlist } = useApp();
//   const { user } = useAuth();
//   const [activeImg, setActiveImg] = useState(0);
//   const [showBooking, setShowBooking] = useState(false);
//   const [bookingSuccess, setBookingSuccess] = useState(null);

//   if (!item) return null;

//   // Build photos array — support up to 4 uploaded images
//   const photos = item.images && item.images.length > 0
//     ? item.images
//     : item.image
//       ? [item.image]
//       : [];

//   const isWished = wishlist.includes(item.id);
//   const isOwner = user?.id === item.ownerId;
//   const canBook = item.isAvailable && !isOwner;

//   const handleBookNow = () => {
//     if (!user) { openAuth("login"); return; }
//     setShowBooking(true);
//   };

//   const handleBookingDone = (receipt) => {
//     setShowBooking(false);
//     setBookingSuccess(receipt);
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

//         .idp { padding-top: 68px; min-height: 100vh; background: #f7f7f7; }

//         /* Back bar */
//         .idp-back {
//           display: flex; align-items: center; gap: 10px;
//           padding: 16px 48px; background: #fff;
//           border-bottom: 1px solid #f0f0f0; cursor: pointer;
//           font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
//           color: #555; transition: color .2s;
//         }
//         .idp-back:hover { color: #FF6B00; }
//         .idp-back-arrow { font-size: 1.1rem; }

//         /* Main layout */
//         .idp-layout {
//           display: grid;
//           grid-template-columns: 1fr 420px;
//           gap: 28px;
//           max-width: 1200px;
//           margin: 28px auto;
//           padding: 0 48px 60px;
//           align-items: start;
//         }

//         /* ── LEFT: Gallery ── */
//         .idp-gallery { position: sticky; top: 84px; }
//         .idp-main-img {
//           width: 100%; height: 420px;
//           border-radius: 20px; overflow: hidden;
//           background: linear-gradient(135deg, #ffe0cc, #ffb380);
//           display: flex; align-items: center; justify-content: center;
//           position: relative;
//         }
//         .idp-main-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
//         .idp-main-emoji { font-size: 6rem; }
//         .idp-avail-badge {
//           position: absolute; top: 16px; left: 16px;
//           padding: 6px 14px; border-radius: 50px;
//           font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 700;
//         }

//         /* Thumbnails */
//         .idp-thumbs {
//           display: flex; gap: 10px; margin-top: 12px; flex-wrap: wrap;
//         }
//         .idp-thumb {
//           width: 76px; height: 76px; border-radius: 12px; overflow: hidden;
//           cursor: pointer; border: 2.5px solid transparent;
//           background: linear-gradient(135deg, #ffe0cc, #ffb380);
//           display: flex; align-items: center; justify-content: center;
//           transition: border .2s; flex-shrink: 0;
//         }
//         .idp-thumb.active { border-color: #FF6B00; }
//         .idp-thumb img { width: 100%; height: 100%; object-fit: cover; }
//         .idp-thumb-emoji { font-size: 1.8rem; }

//         /* ── RIGHT: Info panel ── */
//         .idp-info { display: flex; flex-direction: column; gap: 20px; }

//         .idp-card {
//           background: #fff; border-radius: 20px;
//           padding: 24px 28px; box-shadow: 0 2px 14px rgba(0,0,0,0.05);
//         }

//         .idp-cat-row {
//           display: flex; align-items: center; justify-content: space-between;
//           margin-bottom: 8px;
//         }
//         .idp-cat {
//           font-family: 'DM Sans', sans-serif; font-size: 0.78rem;
//           color: #FF6B00; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
//         }
//         .idp-rating {
//           display: flex; align-items: center; gap: 5px;
//           font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: #555;
//         }
//         .idp-title {
//           font-family: 'Syne', sans-serif; font-size: 1.6rem;
//           font-weight: 800; color: #1a1a1a; line-height: 1.2;
//         }
//         .idp-location {
//           font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
//           color: #888; margin-top: 8px;
//         }

//         .idp-divider { border: none; border-top: 1px solid #f0f0f0; margin: 4px 0; }

//         .idp-section-label {
//           font-family: 'Syne', sans-serif; font-weight: 700;
//           font-size: 0.9rem; color: #1a1a1a; margin-bottom: 10px;
//         }
//         .idp-desc {
//           font-family: 'DM Sans', sans-serif; font-size: 0.92rem;
//           color: #555; line-height: 1.75;
//         }

//         /* Owner */
//         .idp-owner-row {
//           display: flex; align-items: center; gap: 14px;
//         }
//         .idp-owner-avatar {
//           width: 46px; height: 46px; border-radius: 50%;
//           background: #FF6B00; display: flex; align-items: center;
//           justify-content: center; font-size: 1.2rem; color: #fff;
//           font-family: 'Syne', sans-serif; font-weight: 800; flex-shrink: 0;
//         }
//         .idp-owner-name {
//           font-family: 'Syne', sans-serif; font-weight: 700;
//           font-size: 0.95rem; color: #1a1a1a;
//         }
//         .idp-owner-meta {
//           font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
//           color: #888; margin-top: 2px;
//         }

//         /* Pricing */
//         .idp-price-row {
//           display: flex; justify-content: space-between; align-items: flex-end;
//         }
//         .idp-price-big {
//           font-family: 'Syne', sans-serif; font-weight: 800;
//           font-size: 2rem; color: #FF6B00; line-height: 1;
//         }
//         .idp-price-sub {
//           font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
//           color: #aaa; margin-top: 3px;
//         }
//         .idp-deposit {
//           text-align: right;
//         }
//         .idp-deposit-val {
//           font-family: 'Syne', sans-serif; font-weight: 700;
//           font-size: 1.1rem; color: #1a1a1a;
//         }
//         .idp-deposit-lbl {
//           font-family: 'DM Sans', sans-serif; font-size: 0.75rem;
//           color: #aaa; margin-top: 2px;
//         }

//         /* Stats row */
//         .idp-stats {
//           display: flex; gap: 20px; margin-top: 14px; padding-top: 14px;
//           border-top: 1px solid #f0f0f0;
//         }
//         .idp-stat {
//           font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: #777;
//         }
//         .idp-stat strong {
//           display: block; font-family: 'Syne', sans-serif;
//           font-size: 1rem; font-weight: 700; color: #1a1a1a;
//         }

//         /* Availability */
//         .idp-avail-pill {
//           display: inline-flex; align-items: center; gap: 6px;
//           padding: 8px 16px; border-radius: 50px;
//           font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 600;
//         }

//         /* CTA Buttons */
//         .idp-cta { display: flex; gap: 12px; margin-top: 4px; }
//         .idp-wish-btn {
//           width: 48px; height: 48px; border-radius: 50%;
//           border: 2px solid #e5e5e5; background: #fff;
//           font-size: 1.3rem; cursor: pointer;
//           display: flex; align-items: center; justify-content: center;
//           transition: all .2s; flex-shrink: 0;
//         }
//         .idp-wish-btn:hover { border-color: #FF6B00; transform: scale(1.08); }
//         .idp-book-btn {
//           flex: 1; padding: 14px 24px;
//           background: #FF6B00; color: #fff; border: none;
//           border-radius: 50px; font-family: 'Syne', sans-serif;
//           font-weight: 700; font-size: 1rem; cursor: pointer;
//           transition: all .2s;
//         }
//         .idp-book-btn:hover { background: #e05e00; transform: translateY(-1px); }
//         .idp-book-btn:disabled {
//           background: #ccc; cursor: not-allowed; transform: none;
//         }
//         .idp-owner-note {
//           font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
//           color: #aaa; text-align: center; margin-top: 4px;
//         }

//         /* Success overlay */
//         .suc-overlay { position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center;padding:16px; }
//         .suc-box { background:#fff;border-radius:22px;width:100%;max-width:400px;padding:36px;text-align:center;box-shadow:0 24px 80px rgba(0,0,0,0.18); }

//         @media (max-width: 900px) {
//           .idp-layout { grid-template-columns: 1fr; padding: 0 20px 48px; }
//           .idp-gallery { position: static; }
//           .idp-main-img { height: 300px; }
//           .idp-back { padding: 14px 20px; }
//         }
//       `}</style>

//       <div className="idp">
//         {/* Back bar */}
//         <div className="idp-back" onClick={() => navigate("rent")}>
//           <span className="idp-back-arrow">←</span>
//           Back to listings
//         </div>

//         <div className="idp-layout">

//           {/* ── LEFT: Photo Gallery ── */}
//           <div className="idp-gallery">
//             <div className="idp-main-img">
//               {photos.length > 0
//                 ? <img src={photos[activeImg]} alt={item.title} />
//                 : <span className="idp-main-emoji">{ICONS[item.category] || "📦"}</span>
//               }
//               <span className="idp-avail-badge" style={{
//                 background: item.isAvailable ? "#e8f5e9" : "#fff0f0",
//                 color: item.isAvailable ? "#2e7d32" : "#e53e3e"
//               }}>
//                 {item.isAvailable ? "✅ Available" : `🔴 Unavailable till ${new Date(item.rentedTill).toLocaleDateString("en-IN")}`}
//               </span>
//             </div>

//             {/* Thumbnails — show if multiple images OR show single as thumb */}
//             {photos.length > 1 && (
//               <div className="idp-thumbs">
//                 {photos.map((src, i) => (
//                   <div
//                     key={i}
//                     className={`idp-thumb ${activeImg === i ? "active" : ""}`}
//                     onClick={() => setActiveImg(i)}
//                   >
//                     <img src={src} alt={`photo ${i + 1}`} />
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* No images — show category thumbnails as placeholders */}
//             {photos.length === 0 && (
//               <div className="idp-thumbs">
//                 {[...Array(2)].map((_, i) => (
//                   <div key={i} className={`idp-thumb ${activeImg === i ? "active" : ""}`} onClick={() => setActiveImg(i)}>
//                     <span className="idp-thumb-emoji">{ICONS[item.category] || "📦"}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* ── RIGHT: Info Panel ── */}
//           <div className="idp-info">

//             {/* Title card */}
//             <div className="idp-card">
//               <div className="idp-cat-row">
//                 <span className="idp-cat">{ICONS[item.category]} {item.category}</span>
//                 <span className="idp-rating">⭐ {item.rating !== "New" ? item.rating : "New listing"}</span>
//               </div>
//               <div className="idp-title">{item.title}</div>
//               <div className="idp-location">📍 {item.city} &nbsp;·&nbsp; {item.condition} condition</div>
//             </div>

//             {/* Description */}
//             <div className="idp-card">
//               <div className="idp-section-label">About this item</div>
//               <div className="idp-desc">{item.description || "No description provided."}</div>
//             </div>

//             {/* Owner */}
//             <div className="idp-card">
//               <div className="idp-section-label">Listed by</div>
//               <div className="idp-owner-row">
//                 <div className="idp-owner-avatar">
//                   {item.ownerName?.[0]?.toUpperCase() || "?"}
//                 </div>
//                 <div>
//                   <div className="idp-owner-name">{item.ownerName || "Unknown"}</div>
//                   <div className="idp-owner-meta">
//                     📞 {item.ownerPhone ? item.ownerPhone.replace(/(\d{6})(\d{4})/, "XXXXXX$2") : "Not provided"}
//                     &nbsp;·&nbsp; 🔄 {item.rentCount || 0} rentals
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Pricing + CTA */}
//             <div className="idp-card">
//               <div className="idp-section-label">Pricing & Availability</div>

//               <div className="idp-price-row">
//                 <div>
//                   <div className="idp-price-big">₹{item.price}</div>
//                   <div className="idp-price-sub">per day</div>
//                 </div>
//                 <div className="idp-deposit">
//                   <div className="idp-deposit-val">₹{item.deposit}</div>
//                   <div className="idp-deposit-lbl">refundable deposit</div>
//                 </div>
//               </div>

//               <div className="idp-stats">
//                 <div className="idp-stat"><strong>{item.rentCount || 0}</strong>Times rented</div>
//                 <div className="idp-stat"><strong>{item.condition}</strong>Condition</div>
//                 {item.availableFrom && (
//                   <div className="idp-stat">
//                     <strong>{new Date(item.availableFrom).toLocaleDateString("en-IN")}</strong>
//                     Available from
//                   </div>
//                 )}
//               </div>

//               <hr className="idp-divider" style={{ margin: "16px 0" }} />

//               {/* Availability status */}
//               <div style={{ marginBottom: 16 }}>
//                 {item.isAvailable
//                   ? <span className="idp-avail-pill" style={{ background: "#e8f5e9", color: "#2e7d32" }}>✅ Available for rent</span>
//                   : <span className="idp-avail-pill" style={{ background: "#fff0f0", color: "#e53e3e" }}>
//                       🔴 Unavailable till {new Date(item.rentedTill).toLocaleDateString("en-IN")}
//                     </span>
//                 }
//               </div>

//               {/* CTA */}
//               <div className="idp-cta">
//                 <button
//                   className="idp-wish-btn"
//                   onClick={() => { if (!user) { openAuth("login"); return; } toggleWishlist(item.id); }}
//                   title={isWished ? "Remove from wishlist" : "Add to wishlist"}
//                 >
//                   {isWished ? "❤️" : "🤍"}
//                 </button>
//                 <button
//                   className="idp-book-btn"
//                   disabled={!canBook}
//                   onClick={handleBookNow}
//                 >
//                   {isOwner ? "This is your item" : item.isAvailable ? "📅 Book Now →" : "Not Available"}
//                 </button>
//               </div>
//               {isOwner && <div className="idp-owner-note">You cannot rent your own listing</div>}
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Booking Form Modal */}
//       {showBooking && (
//         <BookingForm
//           item={item}
//           onClose={() => setShowBooking(false)}
//           onSuccess={handleBookingDone}
//           navigate={navigate}
//         />
//       )}

//       {/* Booking Success */}
//       {bookingSuccess && (
//         <div className="suc-overlay">
//           <div className="suc-box">
//             {/* Animated check */}
//             <div style={{ width:70, height:70, borderRadius:"50%", background:"#e8f5e9", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", fontSize:"2rem" }}>✅</div>

//             <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.4rem", fontWeight:800, color:"#1a1a1a" }}>Booking Confirmed!</div>
//             <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.82rem", color:"#aaa", marginTop:4 }}>
//               Receipt ID: <strong style={{ color:"#FF6B00" }}>{bookingSuccess.receiptId}</strong>
//             </div>

//             {/* Summary */}
//             <div style={{ background:"#f7f7f7", borderRadius:14, padding:16, margin:"18px 0", textAlign:"left" }}>
//               {[
//                 ["Item",       bookingSuccess.itemTitle],
//                 ["From",       new Date(bookingSuccess.startDate).toLocaleDateString("en-IN")],
//                 ["To",         new Date(bookingSuccess.endDate).toLocaleDateString("en-IN")],
//                 ["Days",       bookingSuccess.days],
//                 ["Rent",       `₹${bookingSuccess.totalPrice}`],
//                 ["Deposit",    `₹${bookingSuccess.deposit}`],
//                 ["Platform Fee", `₹${bookingSuccess.platformFee || 0}`],
//                 ["Total Paid", `₹${bookingSuccess.grandTotal || (bookingSuccess.totalPrice + bookingSuccess.deposit)}`],
//               ].map(([k, v]) => (
//                 <div key={k} style={{ display:"flex", justifyContent:"space-between", fontFamily:"'DM Sans',sans-serif", fontSize:"0.87rem", padding:"5px 0", borderBottom:"1px solid #eee" }}>
//                   <span style={{ color:"#999" }}>{k}</span>
//                   <span style={{ fontWeight:600, color: k==="Total Paid" ? "#FF6B00" : "#1a1a1a" }}>{v}</span>
//                 </div>
//               ))}
//             </div>

//             {/* ── Download Receipt PDF ── */}
//             <button
//               onClick={() => generateReceiptPDF(bookingSuccess)}
//               style={{ width:"100%", padding:13, background:"#1a1a1a", color:"#fff", border:"none", borderRadius:50, fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.97rem", cursor:"pointer", marginBottom:8, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}
//             >
//               📄 Download Receipt PDF
//             </button>

//             <button
//               onClick={() => { setBookingSuccess(null); navigate("profile"); }}
//               style={{ width:"100%", padding:13, background:"#FF6B00", color:"#fff", border:"none", borderRadius:50, fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.97rem", cursor:"pointer", marginBottom:6 }}
//             >
//               View My Rentals →
//             </button>
//             <button
//               onClick={() => { setBookingSuccess(null); navigate("rent"); }}
//               style={{ width:"100%", padding:10, background:"transparent", color:"#888", border:"none", fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}
//             >
//               Back to listings
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
//-----------------------------------------------------------------------------
import { useState } from "react";
import { useApp, useAuth } from "../App";
import BookingForm from "../components/BookingForm";
import { generateReceiptPDF } from "../utils/generateReceipt";

const ICONS = {
  Electronics: "📷", Vehicles: "🏍️", "Party & Events": "🎉",
  "Sports & Outdoor": "⛺", "Tools & Equipment": "🔧", "Furniture & Appliances": "🛋️",
};

export default function ItemDetailPage({ item, navigate, openAuth }) {
  const { wishlist, toggleWishlist } = useApp();
  const { user } = useAuth();
  const [activeImg, setActiveImg] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  if (!item) return null;

  // Build photos array — support up to 4 uploaded images
  const photos = item.images && item.images.length > 0
    ? item.images
    : item.image
      ? [item.image]
      : [];

  const isWished = wishlist.includes(item.id);
  const isOwner = user?.id === item.ownerId;
  const canBook = item.isAvailable && !isOwner;

  const handleBookNow = () => {
    if (!user) { openAuth("login"); return; }
    setShowBooking(true);
  };

  const handleBookingDone = (receipt) => {
    setShowBooking(false);
    setBookingSuccess(receipt);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .idp { padding-top: 68px; min-height: 100vh; background: #f7f7f7; }

        /* Back bar */
        .idp-back {
          display: flex; align-items: center; gap: 10px;
          padding: 16px 48px; background: #fff;
          border-bottom: 1px solid #f0f0f0; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
          color: #555; transition: color .2s;
        }
        .idp-back:hover { color: #FF6B00; }
        .idp-back-arrow { font-size: 1.1rem; }

        /* Main layout */
        .idp-layout {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 28px;
          max-width: 1200px;
          margin: 28px auto;
          padding: 0 48px 60px;
          align-items: start;
        }

        /* ── LEFT: Gallery ── */
        .idp-gallery { position: sticky; top: 84px; }
        .idp-main-img {
          width: 100%; height: 420px;
          border-radius: 20px; overflow: hidden;
          background: linear-gradient(135deg, #ffe0cc, #ffb380);
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .idp-main-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .idp-main-emoji { font-size: 6rem; }
        .idp-avail-badge {
          position: absolute; top: 16px; left: 16px;
          padding: 6px 14px; border-radius: 50px;
          font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 700;
        }

        /* Thumbnails */
        .idp-thumbs {
          display: flex; gap: 10px; margin-top: 12px; flex-wrap: wrap;
        }
        .idp-thumb {
          width: 76px; height: 76px; border-radius: 12px; overflow: hidden;
          cursor: pointer; border: 2.5px solid transparent;
          background: linear-gradient(135deg, #ffe0cc, #ffb380);
          display: flex; align-items: center; justify-content: center;
          transition: border .2s; flex-shrink: 0;
        }
        .idp-thumb.active { border-color: #FF6B00; }
        .idp-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .idp-thumb-emoji { font-size: 1.8rem; }

        /* ── RIGHT: Info panel ── */
        .idp-info { display: flex; flex-direction: column; gap: 20px; }

        .idp-card {
          background: #fff; border-radius: 20px;
          padding: 24px 28px; box-shadow: 0 2px 14px rgba(0,0,0,0.05);
        }

        .idp-cat-row {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 8px;
        }
        .idp-cat {
          font-family: 'DM Sans', sans-serif; font-size: 0.78rem;
          color: #FF6B00; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
        }
        .idp-rating {
          display: flex; align-items: center; gap: 5px;
          font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: #555;
        }
        .idp-title {
          font-family: 'Syne', sans-serif; font-size: 1.6rem;
          font-weight: 800; color: #1a1a1a; line-height: 1.2;
        }
        .idp-location {
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
          color: #888; margin-top: 8px;
        }

        .idp-divider { border: none; border-top: 1px solid #f0f0f0; margin: 4px 0; }

        .idp-section-label {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 0.9rem; color: #1a1a1a; margin-bottom: 10px;
        }
        .idp-desc {
          font-family: 'DM Sans', sans-serif; font-size: 0.92rem;
          color: #555; line-height: 1.75;
        }

        /* Owner */
        .idp-owner-row {
          display: flex; align-items: center; gap: 14px;
        }
        .idp-owner-avatar {
          width: 46px; height: 46px; border-radius: 50%;
          background: #FF6B00; display: flex; align-items: center;
          justify-content: center; font-size: 1.2rem; color: #fff;
          font-family: 'Syne', sans-serif; font-weight: 800; flex-shrink: 0;
        }
        .idp-owner-name {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 0.95rem; color: #1a1a1a;
        }
        .idp-owner-meta {
          font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
          color: #888; margin-top: 2px;
        }

        /* Pricing */
        .idp-price-row {
          display: flex; justify-content: space-between; align-items: flex-end;
        }
        .idp-price-big {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: 2rem; color: #FF6B00; line-height: 1;
        }
        .idp-price-sub {
          font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
          color: #aaa; margin-top: 3px;
        }
        .idp-deposit {
          text-align: right;
        }
        .idp-deposit-val {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 1.1rem; color: #1a1a1a;
        }
        .idp-deposit-lbl {
          font-family: 'DM Sans', sans-serif; font-size: 0.75rem;
          color: #aaa; margin-top: 2px;
        }

        /* Stats row */
        .idp-stats {
          display: flex; gap: 20px; margin-top: 14px; padding-top: 14px;
          border-top: 1px solid #f0f0f0;
        }
        .idp-stat {
          font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: #777;
        }
        .idp-stat strong {
          display: block; font-family: 'Syne', sans-serif;
          font-size: 1rem; font-weight: 700; color: #1a1a1a;
        }

        /* Availability */
        .idp-avail-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 50px;
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 600;
        }

        /* CTA Buttons */
        .idp-cta { display: flex; gap: 12px; margin-top: 4px; }
        .idp-wish-btn {
          width: 48px; height: 48px; border-radius: 50%;
          border: 2px solid #e5e5e5; background: #fff;
          font-size: 1.3rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all .2s; flex-shrink: 0;
        }
        .idp-wish-btn:hover { border-color: #FF6B00; transform: scale(1.08); }
        .idp-book-btn {
          flex: 1; padding: 14px 24px;
          background: #FF6B00; color: #fff; border: none;
          border-radius: 50px; font-family: 'Syne', sans-serif;
          font-weight: 700; font-size: 1rem; cursor: pointer;
          transition: all .2s;
        }
        .idp-book-btn:hover { background: #e05e00; transform: translateY(-1px); }
        .idp-book-btn:disabled {
          background: #ccc; cursor: not-allowed; transform: none;
        }
        .idp-owner-note {
          font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
          color: #aaa; text-align: center; margin-top: 4px;
        }

        /* Success overlay */
        .suc-overlay { position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center;padding:16px; }
        .suc-box { background:#fff;border-radius:22px;width:100%;max-width:400px;padding:36px;text-align:center;box-shadow:0 24px 80px rgba(0,0,0,0.18); }

        @media (max-width: 900px) {
          .idp-layout { grid-template-columns: 1fr; padding: 0 20px 48px; }
          .idp-gallery { position: static; }
          .idp-main-img { height: 300px; }
          .idp-back { padding: 14px 20px; }
        }
      `}</style>

      <div className="idp">
        {/* Back bar */}
        <div className="idp-back" onClick={() => navigate("rent")}>
          <span className="idp-back-arrow">←</span>
          Back to listings
        </div>

        <div className="idp-layout">

          {/* ── LEFT: Photo Gallery ── */}
          <div className="idp-gallery">
            <div className="idp-main-img">
              {photos.length > 0
                ? <img src={photos[activeImg]} alt={item.title} />
                : <span className="idp-main-emoji">{ICONS[item.category] || "📦"}</span>
              }
              <span className="idp-avail-badge" style={{
                background: item.isAvailable ? "#e8f5e9" : "#fff0f0",
                color: item.isAvailable ? "#2e7d32" : "#e53e3e"
              }}>
                {item.isAvailable ? "✅ Available" : `🔴 Unavailable till ${new Date(item.rentedTill).toLocaleDateString("en-IN")}`}
              </span>
            </div>

            {/* Thumbnails — show if multiple images OR show single as thumb */}
            {photos.length > 1 && (
              <div className="idp-thumbs">
                {photos.map((src, i) => (
                  <div
                    key={i}
                    className={`idp-thumb ${activeImg === i ? "active" : ""}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={src} alt={`photo ${i + 1}`} />
                  </div>
                ))}
              </div>
            )}

            {/* No images — show category thumbnails as placeholders */}
            {photos.length === 0 && (
              <div className="idp-thumbs">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className={`idp-thumb ${activeImg === i ? "active" : ""}`} onClick={() => setActiveImg(i)}>
                    <span className="idp-thumb-emoji">{ICONS[item.category] || "📦"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Info Panel ── */}
          <div className="idp-info">

            {/* Title card */}
            <div className="idp-card">
              <div className="idp-cat-row">
                <span className="idp-cat">{ICONS[item.category]} {item.category}</span>
                <span className="idp-rating">⭐ {item.rating !== "New" ? item.rating : "New listing"}</span>
              </div>
              <div className="idp-title">{item.title}</div>
              <div className="idp-location">📍 {item.city} &nbsp;·&nbsp; {item.condition} condition</div>
            </div>

            {/* Description */}
            <div className="idp-card">
              <div className="idp-section-label">About this item</div>
              <div className="idp-desc">{item.description || "No description provided."}</div>
            </div>

            {/* Owner */}
            <div className="idp-card">
              <div className="idp-section-label">Listed by</div>
              <div className="idp-owner-row">
                <div className="idp-owner-avatar">
                  {item.ownerName?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <div className="idp-owner-name">{item.ownerName || "Unknown"}</div>
                  <div className="idp-owner-meta">
                    📞 {item.ownerPhone ? item.ownerPhone.replace(/(\d{6})(\d{4})/, "XXXXXX$2") : "Not provided"}
                    &nbsp;·&nbsp; 🔄 {item.rentCount || 0} rentals
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing + CTA */}
            <div className="idp-card">
              <div className="idp-section-label">Pricing & Availability</div>

              <div className="idp-price-row">
                <div>
                  <div className="idp-price-big">₹{item.price}</div>
                  <div className="idp-price-sub">per day</div>
                </div>
                <div className="idp-deposit">
                  <div className="idp-deposit-val">₹{item.deposit}</div>
                  <div className="idp-deposit-lbl">refundable deposit</div>
                </div>
              </div>

              <div className="idp-stats">
                <div className="idp-stat"><strong>{item.rentCount || 0}</strong>Times rented</div>
                <div className="idp-stat"><strong>{item.condition}</strong>Condition</div>
                {item.availableFrom && (
                  <div className="idp-stat">
                    <strong>{new Date(item.availableFrom).toLocaleDateString("en-IN")}</strong>
                    Available from
                  </div>
                )}
              </div>

              <hr className="idp-divider" style={{ margin: "16px 0" }} />

              {/* Availability status */}
              <div style={{ marginBottom: 16 }}>
                {item.isAvailable
                  ? <span className="idp-avail-pill" style={{ background: "#e8f5e9", color: "#2e7d32" }}>✅ Available for rent</span>
                  : <span className="idp-avail-pill" style={{ background: "#fff0f0", color: "#e53e3e" }}>
                      🔴 Unavailable till {new Date(item.rentedTill).toLocaleDateString("en-IN")}
                    </span>
                }
              </div>

              {/* CTA */}
              <div className="idp-cta">
                <button
                  className="idp-wish-btn"
                  onClick={() => { if (!user) { openAuth("login"); return; } toggleWishlist(item.id); }}
                  title={isWished ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isWished ? "❤️" : "🤍"}
                </button>
                <button
                  className="idp-book-btn"
                  disabled={!canBook}
                  onClick={handleBookNow}
                >
                  {isOwner ? "This is your item" : item.isAvailable ? "📅 Book Now →" : "Not Available"}
                </button>
              </div>
              {isOwner && <div className="idp-owner-note">You cannot rent your own listing</div>}
            </div>

          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBooking && (
        <BookingForm
          item={item}
          onClose={() => setShowBooking(false)}
          onSuccess={handleBookingDone}
          navigate={navigate}
        />
      )}

      {/* ── Booking Success — Animated Receipt Reveal ── */}
      {bookingSuccess && (
        <>
          <style>{`
            @keyframes sucOverlayIn { from{opacity:0} to{opacity:1} }
            @keyframes sucBoxIn { from{opacity:0;transform:translateY(40px) scale(0.92)} to{opacity:1;transform:translateY(0) scale(1)} }
            @keyframes checkPop { 0%{transform:scale(0) rotate(-20deg);opacity:0} 60%{transform:scale(1.2) rotate(4deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
            @keyframes rowSlide { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
            @keyframes btnPulse { 0%,100%{box-shadow:0 0 0 0 rgba(255,107,0,0.4)} 50%{box-shadow:0 0 0 8px rgba(255,107,0,0)} }

            .suc-overlay2{position:fixed;inset:0;z-index:4000;background:rgba(0,0,0,0.65);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;animation:sucOverlayIn .3s ease;}
            .suc-box2{background:#fff;border-radius:26px;width:100%;max-width:420px;padding:0;overflow:hidden;box-shadow:0 48px 120px rgba(0,0,0,0.3);animation:sucBoxIn .5s cubic-bezier(.16,1,.3,1);}
            .suc-head{background:linear-gradient(135deg,#1a1a1a,#333);padding:28px 28px 24px;text-align:center;}
            .suc-check{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#4CAF50,#66BB6A);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;font-size:2rem;animation:checkPop .6s .2s cubic-bezier(.16,1,.3,1) both;}
            .suc-head-title{font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:800;color:#fff;}
            .suc-head-id{font-family:'DM Sans',sans-serif;font-size:0.8rem;color:rgba(255,255,255,.55);margin-top:4px;}
            .suc-head-id strong{color:#FF6B00;}

            .suc-receipt{padding:20px 24px 0;}
            .suc-receipt-title{font-family:'Syne',sans-serif;font-size:0.78rem;font-weight:700;color:#FF6B00;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;}
            .suc-row{display:flex;justify-content:space-between;font-family:'DM Sans',sans-serif;font-size:0.87rem;padding:8px 0;border-bottom:1px solid #f0f0f0;opacity:0;animation:rowSlide .35s ease forwards;}
            .suc-row:last-child{border-bottom:none;}
            .suc-row span:first-child{color:#999;}
            .suc-row span:last-child{font-weight:600;color:#1a1a1a;}
            .suc-row.total span:last-child{color:#FF6B00;font-size:1rem;font-family:'Syne',sans-serif;font-weight:800;}

            .suc-actions{padding:20px 24px 24px;display:flex;flex-direction:column;gap:10px;}
            .suc-dl-btn{width:100%;padding:13px;background:#1a1a1a;color:#fff;border:none;border-radius:50px;font-family:'Syne',sans-serif;font-weight:700;font-size:0.95rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .2s;}
            .suc-dl-btn:hover{background:#FF6B00;transform:translateY(-1px);}
            .suc-main-btn{width:100%;padding:13px;background:#FF6B00;color:#fff;border:none;border-radius:50px;font-family:'Syne',sans-serif;font-weight:700;font-size:0.95rem;cursor:pointer;transition:all .2s;animation:btnPulse 2s 1s infinite;}
            .suc-main-btn:hover{background:#e05e00;transform:translateY(-1px);}
            .suc-back-btn{width:100%;padding:9px;background:transparent;color:#aaa;border:none;font-family:'DM Sans',sans-serif;cursor:pointer;font-size:0.85rem;}
          `}</style>

          <div className="suc-overlay2">
            <div className="suc-box2">
              {/* Head */}
              <div className="suc-head">
                <div className="suc-check">✅</div>
                <div className="suc-head-title">Booking Confirmed!</div>
                <div className="suc-head-id">
                  Receipt ID: <strong>{bookingSuccess.receiptId}</strong>
                </div>
              </div>

              {/* Animated receipt rows */}
              <div className="suc-receipt">
                <div className="suc-receipt-title">🧾 Receipt Summary</div>
                {[
                  ["Item",         bookingSuccess.itemTitle],
                  ["From",         new Date(bookingSuccess.startDate).toLocaleDateString("en-IN")],
                  ["To",           new Date(bookingSuccess.endDate).toLocaleDateString("en-IN")],
                  ["Duration",     `${bookingSuccess.days} day${bookingSuccess.days>1?"s":""}`],
                  ["Rent",         `₹${bookingSuccess.totalPrice}`],
                  ["Deposit",      `₹${bookingSuccess.deposit}`],
                  ["Platform Fee", `₹${bookingSuccess.platformFee||0}`],
                  ["Total Paid",   `₹${bookingSuccess.grandTotal||(bookingSuccess.totalPrice+bookingSuccess.deposit)}`],
                ].map(([k, v], i) => (
                  <div
                    key={k}
                    className={`suc-row ${k==="Total Paid"?"total":""}`}
                    style={{ animationDelay:`${0.4 + i*0.07}s` }}
                  >
                    <span>{k}</span><span>{v}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="suc-actions">
                <button className="suc-dl-btn" onClick={() => generateReceiptPDF(bookingSuccess)}>
                  📄 Download Receipt PDF
                </button>
                <button className="suc-main-btn" onClick={() => { setBookingSuccess(null); navigate("profile"); }}>
                  View My Rentals →
                </button>
                <button className="suc-back-btn" onClick={() => { setBookingSuccess(null); navigate("rent"); }}>
                  Back to listings
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}