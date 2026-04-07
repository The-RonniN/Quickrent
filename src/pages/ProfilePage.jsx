// import { useState } from "react";
// import { useAuth, useApp } from "../App";

// const ICONS = { "Electronics":"📷","Vehicles":"🏍️","Party & Events":"🎉","Sports & Outdoor":"⛺","Tools & Equipment":"🔧","Furniture & Appliances":"🛋️" };

// export default function ProfilePage({ navigate }) {
//   const { user, handleLogout, updateUserRole } = useAuth();
//   const { items, rentals, wishlist, toggleWishlist } = useApp();
//   const [activeTab, setActiveTab] = useState("overview");
//   const [showRoleSwitch, setShowRoleSwitch] = useState(false);

//   if (!user) {
//     return (
//       <div style={{ paddingTop:90, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:14, fontFamily:"'DM Sans',sans-serif", background:"#f7f7f7", padding:"90px 20px 40px" }}>
//         <div style={{ fontSize:"3rem" }}>🔒</div>
//         <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.4rem", fontWeight:800, color:"#1a1a1a" }}>Please log in</div>
//         <div style={{ color:"#888" }}>Login to view your dashboard</div>
//       </div>
//     );
//   }

//   const isLister = user.role === "lister";
//   const isRenter = user.role === "renter";

//   // Data
//   const myListings = items.filter(it => it.ownerId === user.id);
//   const myRentals = rentals.filter(r => r.renterId === user.id);
//   const activeRentals = myRentals.filter(r => r.status === "active");
//   const myWishlistItems = items.filter(it => wishlist.includes(it.id));

//   // Lister: requests received on my items
//   const myItemIds = myListings.map(it => it.id);
//   const requestsReceived = rentals.filter(r => myItemIds.includes(r.itemId));
//   const currentlyRentedOut = myListings.filter(it => !it.isAvailable);

//   // Tabs per role
//   const renterTabs = [
//     { id:"overview", label:"Overview" },
//     { id:"active", label:`Active Rentals (${activeRentals.length})` },
//     { id:"history", label:`History (${myRentals.length})` },
//     { id:"wishlist", label:`Wishlist (${myWishlistItems.length})` },
//     { id:"settings", label:"Settings" },
//   ];
//   const listerTabs = [
//     { id:"overview", label:"Overview" },
//     { id:"listings", label:`My Listings (${myListings.length})` },
//     { id:"rented-out", label:`Rented Out (${currentlyRentedOut.length})` },
//     { id:"requests", label:`Requests (${requestsReceived.length})` },
//     { id:"active", label:`My Rentals (${myRentals.length})` },
//     { id:"settings", label:"Settings" },
//   ];
//   const tabs = isLister ? listerTabs : renterTabs;

//   const Card = ({ children, style = {} }) => (
//     <div style={{ background:"#fff", borderRadius:18, padding:"22px 24px", boxShadow:"0 2px 12px rgba(0,0,0,0.05)", ...style }}>
//       {children}
//     </div>
//   );

//   const StatCard = ({ icon, label, value, color="#FF6B00" }) => (
//     <Card>
//       <div style={{ display:"flex", alignItems:"center", gap:14 }}>
//         <div style={{ width:46, height:46, borderRadius:12, background:`${color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem" }}>{icon}</div>
//         <div>
//           <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.5rem", fontWeight:800, color:"#1a1a1a" }}>{value}</div>
//           <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", color:"#888", marginTop:1 }}>{label}</div>
//         </div>
//       </div>
//     </Card>
//   );

//   const ItemCard = ({ item, showStatus=false }) => (
//     <Card style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
//       <div style={{ width:52, height:52, borderRadius:12, background:"linear-gradient(135deg,#ffe0cc,#ffb380)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.5rem", flexShrink:0 }}>
//         {ICONS[item.category] || "📦"}
//       </div>
//       <div style={{ flex:1, minWidth:0 }}>
//         <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", color:"#1a1a1a" }}>{item.title}</div>
//         <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", color:"#888", marginTop:2 }}>📍 {item.city} · ₹{item.price}/day</div>
//         {showStatus && (
//           <span style={{ display:"inline-block", marginTop:6, padding:"2px 10px", borderRadius:50, fontSize:"0.72rem", fontWeight:600, fontFamily:"'DM Sans',sans-serif", background: item.isAvailable ? "#e8f5e9" : "#fff0f0", color: item.isAvailable ? "#2e7d32" : "#e53e3e" }}>
//             {item.isAvailable ? "✅ Available" : `🔴 Rented till ${new Date(item.rentedTill).toLocaleDateString("en-IN")}`}
//           </span>
//         )}
//       </div>
//       {wishlist.includes(item.id) && (
//         <button onClick={() => toggleWishlist(item.id)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:"1.1rem" }}>❤️</button>
//       )}
//     </Card>
//   );

//   const RentalCard = ({ rental }) => (
//     <Card>
//       <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8 }}>
//         <div>
//           <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", color:"#1a1a1a" }}>{rental.itemTitle}</div>
//           <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", color:"#888", marginTop:3 }}>
//             📅 {new Date(rental.startDate).toLocaleDateString("en-IN")} → {new Date(rental.endDate).toLocaleDateString("en-IN")}
//           </div>
//           <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", color:"#888", marginTop:2 }}>
//             🧾 {rental.receiptId} · {rental.days} day{rental.days > 1 ? "s" : ""}
//           </div>
//         </div>
//         <div style={{ textAlign:"right" }}>
//           <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1rem", color:"#FF6B00" }}>₹{rental.totalPrice}</div>
//           <span style={{ display:"inline-block", marginTop:4, padding:"2px 10px", borderRadius:50, fontSize:"0.72rem", fontWeight:600, fontFamily:"'DM Sans',sans-serif", background:"#e8f5e9", color:"#2e7d32" }}>
//             ✅ {rental.status}
//           </span>
//         </div>
//       </div>
//     </Card>
//   );

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
//         .pp{padding-top:68px;min-height:100vh;background:#f7f7f7;font-family:'DM Sans',sans-serif;}
//         .pp-cover{height:180px;background:linear-gradient(135deg,#FF6B00,#ff9a3c);}
//         .pp-main{max-width:1000px;margin:0 auto;padding:0 24px 48px;}
//         .pp-profile-row{display:flex;justify-content:space-between;align-items:flex-end;padding-top:64px;flex-wrap:wrap;gap:12px;}
//         .pp-avatar{position:absolute;top:-52px;left:0;width:100px;height:100px;border-radius:50%;border:4px solid #fff;background:#FF6B00;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 18px rgba(0,0,0,0.13);}
//         .pp-name{font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;color:#1a1a1a;}
//         .pp-role-badge{display:inline-block;padding:4px 14px;border-radius:50px;font-size:0.78rem;font-weight:600;text-transform:capitalize;margin-top:4px;background:#fff3ea;color:#FF6B00;}
//         .pp-tabs{display:flex;gap:4px;background:#fff;border-radius:50px;padding:5px;box-shadow:0 2px 12px rgba(0,0,0,0.06);margin:24px 0 20px;overflow-x:auto;scrollbar-width:none;}
//         .pp-tabs::-webkit-scrollbar{display:none;}
//         .pp-tab{padding:9px 18px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:0.85rem;font-weight:500;cursor:pointer;white-space:nowrap;transition:all .2s;border:none;background:transparent;color:#666;}
//         .pp-tab.active{background:#FF6B00;color:#fff;font-weight:600;}
//         .pp-tab:hover:not(.active){background:#f0f0f0;}
//         .pp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;margin-bottom:20px;}
//         .pp-list{display:flex;flex-direction:column;gap:12px;}
//         .pp-empty{text-align:center;padding:40px;color:#aaa;font-family:'DM Sans',sans-serif;}
//         .pp-logout{padding:10px 24px;border-radius:50px;border:2px solid #e53e3e;background:transparent;color:#e53e3e;font-family:'DM Sans',sans-serif;font-weight:600;cursor:pointer;transition:all .2s;}
//         .pp-logout:hover{background:#fff5f5;}
//         @media(max-width:600px){.pp-grid{grid-template-columns:1fr 1fr;}.pp-main{padding:0 14px 40px;}}
//       `}</style>

//       <div className="pp">
//         <div className="pp-cover" />
//         <div className="pp-main">
//           <div style={{ position:"relative" }}>
//             <div className="pp-avatar">
//               <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
//                 <circle cx="12" cy="8" r="4" fill="#fff" />
//                 <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
//               </svg>
//             </div>
//           </div>

//           <div className="pp-profile-row">
//             <div>
//               <div className="pp-name">{user.name}</div>
//               <div className="pp-role-badge">{isLister ? "🏠 Lister" : "🔑 Renter"}</div>
//             </div>
//             <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
//               <button onClick={() => setShowRoleSwitch(true)}
//                 style={{ padding:"9px 20px", borderRadius:50, border:"2px solid #FF6B00", background:"transparent", color:"#FF6B00", fontFamily:"'DM Sans',sans-serif", fontWeight:600, cursor:"pointer", fontSize:"0.85rem" }}>
//                 ⚙️ Switch Role
//               </button>
//               <button className="pp-logout" onClick={() => { handleLogout(); navigate("home"); }}>🚪 Logout</button>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="pp-tabs">
//             {tabs.map(t => (
//               <button key={t.id} className={`pp-tab ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)}>
//                 {t.label}
//               </button>
//             ))}
//           </div>

//           {/* ── OVERVIEW ── */}
//           {activeTab === "overview" && (
//             <>
//               <div className="pp-grid">
//                 {isRenter && <>
//                   <StatCard icon="📦" label="Active Rentals" value={activeRentals.length} />
//                   <StatCard icon="📋" label="Total Rented" value={myRentals.length} color="#4CAF50" />
//                   <StatCard icon="❤️" label="Wishlist" value={myWishlistItems.length} color="#e53e3e" />
//                   <StatCard icon="💸" label="Total Spent" value={`₹${myRentals.reduce((s,r)=>s+r.totalPrice,0)}`} color="#9C27B0" />
//                 </>}
//                 {isLister && <>
//                   <StatCard icon="📋" label="Total Listings" value={myListings.length} />
//                   <StatCard icon="🔴" label="Rented Out" value={currentlyRentedOut.length} color="#e53e3e" />
//                   <StatCard icon="📬" label="Total Requests" value={requestsReceived.length} color="#4CAF50" />
//                   <StatCard icon="💰" label="Est. Earnings" value={`₹${requestsReceived.reduce((s,r)=>s+(r.totalPrice||0),0)}`} color="#9C27B0" />
//                 </>}
//               </div>

//               {/* Info card */}
//               <Card>
//                 <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", color:"#1a1a1a", marginBottom:16 }}>Account Info</div>
//                 {[["Name",user.name],["Email",user.email],["Phone",user.phone||"Not provided"],["City",user.city||"Not provided"],["Role",isLister?"Lister":"Renter"],["Joined",user.joinedDate]].map(([k,v])=>(
//                   <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:"1px solid #f5f5f5", fontSize:"0.88rem" }}>
//                     <span style={{ color:"#999" }}>{k}</span>
//                     <span style={{ color:"#1a1a1a", fontWeight:500 }}>{v}</span>
//                   </div>
//                 ))}
//               </Card>
//             </>
//           )}

//           {/* ── ACTIVE RENTALS (Renter) ── */}
//           {activeTab === "active" && (
//             <div className="pp-list">
//               {(isRenter ? activeRentals : myRentals).length === 0
//                 ? <div className="pp-empty"><div style={{fontSize:"2.5rem",marginBottom:8}}>📦</div>No rentals yet.<br/><button onClick={()=>navigate("rent")} style={{marginTop:12,padding:"10px 24px",background:"#FF6B00",color:"#fff",border:"none",borderRadius:50,fontFamily:"'Syne',sans-serif",fontWeight:700,cursor:"pointer"}}>Browse Items</button></div>
//                 : (isRenter ? activeRentals : myRentals).map(r => <RentalCard key={r.id} rental={r} />)
//               }
//             </div>
//           )}

//           {/* ── HISTORY ── */}
//           {activeTab === "history" && (
//             <div className="pp-list">
//               {myRentals.length === 0
//                 ? <div className="pp-empty"><div style={{fontSize:"2.5rem",marginBottom:8}}>📋</div>No rental history yet.</div>
//                 : myRentals.map(r => <RentalCard key={r.id} rental={r} />)
//               }
//             </div>
//           )}

//           {/* ── WISHLIST ── */}
//           {activeTab === "wishlist" && (
//             <div className="pp-list">
//               {myWishlistItems.length === 0
//                 ? <div className="pp-empty"><div style={{fontSize:"2.5rem",marginBottom:8}}>❤️</div>No items saved yet.<br/><button onClick={()=>navigate("rent")} style={{marginTop:12,padding:"10px 24px",background:"#FF6B00",color:"#fff",border:"none",borderRadius:50,fontFamily:"'Syne',sans-serif",fontWeight:700,cursor:"pointer"}}>Browse Items</button></div>
//                 : myWishlistItems.map(it => <ItemCard key={it.id} item={it} />)
//               }
//             </div>
//           )}

//           {/* ── MY LISTINGS (Lister) ── */}
//           {activeTab === "listings" && (
//             <div className="pp-list">
//               {myListings.length === 0
//                 ? <div className="pp-empty"><div style={{fontSize:"2.5rem",marginBottom:8}}>📋</div>No listings yet.<br/><button onClick={()=>navigate("list")} style={{marginTop:12,padding:"10px 24px",background:"#FF6B00",color:"#fff",border:"none",borderRadius:50,fontFamily:"'Syne',sans-serif",fontWeight:700,cursor:"pointer"}}>List an Item</button></div>
//                 : myListings.map(it => <ItemCard key={it.id} item={it} showStatus />)
//               }
//             </div>
//           )}

//           {/* ── RENTED OUT (Lister) ── */}
//           {activeTab === "rented-out" && (
//             <div className="pp-list">
//               {currentlyRentedOut.length === 0
//                 ? <div className="pp-empty"><div style={{fontSize:"2.5rem",marginBottom:8}}>✅</div>No items currently rented out.</div>
//                 : currentlyRentedOut.map(it => <ItemCard key={it.id} item={it} showStatus />)
//               }
//             </div>
//           )}

//           {/* ── REQUESTS (Lister) ── */}
//           {activeTab === "requests" && (
//             <div className="pp-list">
//               {requestsReceived.length === 0
//                 ? <div className="pp-empty"><div style={{fontSize:"2.5rem",marginBottom:8}}>📬</div>No rental requests received yet.</div>
//                 : requestsReceived.map(r => <RentalCard key={r.id} rental={r} />)
//               }
//             </div>
//           )}

//           {/* ── SETTINGS ── */}
//           {activeTab === "settings" && (
//             <Card>
//               <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", color:"#1a1a1a", marginBottom:20 }}>Account Settings</div>
//               <div style={{ marginBottom:24 }}>
//                 <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.85rem", color:"#666", marginBottom:10 }}>Current Role</div>
//                 <div style={{ display:"flex", gap:10 }}>
//                   <div style={{ padding:"12px 20px", borderRadius:14, border:`2px solid ${isRenter?"#FF6B00":"#e5e5e5"}`, background:isRenter?"#fff5ee":"#fafafa", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:"0.9rem", color:isRenter?"#FF6B00":"#999" }}>
//                     🔑 Renter {isRenter && "✓"}
//                   </div>
//                   <div style={{ padding:"12px 20px", borderRadius:14, border:`2px solid ${isLister?"#FF6B00":"#e5e5e5"}`, background:isLister?"#fff5ee":"#fafafa", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:"0.9rem", color:isLister?"#FF6B00":"#999" }}>
//                     🏠 Lister {isLister && "✓"}
//                   </div>
//                 </div>
//               </div>
//               <button onClick={() => setShowRoleSwitch(true)}
//                 style={{ padding:"11px 28px", background:"#FF6B00", color:"#fff", border:"none", borderRadius:50, fontFamily:"'Syne',sans-serif", fontWeight:700, cursor:"pointer", fontSize:"0.92rem" }}>
//                 Switch Role
//               </button>
//               <div style={{ marginTop:24, paddingTop:20, borderTop:"1px solid #f0f0f0" }}>
//                 <button className="pp-logout" onClick={() => { handleLogout(); navigate("home"); }}>🚪 Logout</button>
//               </div>
//             </Card>
//           )}
//         </div>
//       </div>

//       {/* Role Switch Modal */}
//       {showRoleSwitch && (
//         <div style={{ position:"fixed", inset:0, zIndex:2000, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
//           <div style={{ background:"#fff", borderRadius:22, padding:"32px 28px", maxWidth:400, width:"100%", boxShadow:"0 24px 80px rgba(0,0,0,0.18)" }}>
//             <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.3rem", fontWeight:800, color:"#1a1a1a", marginBottom:8 }}>Switch Role</div>
//             <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", color:"#888", marginBottom:22 }}>Choose what you want to do on QuickRent</div>
//             <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
//               {[
//                 { role:"renter", icon:"🔑", title:"Renter", desc:"Browse and rent items from others" },
//                 { role:"lister", icon:"🏠", title:"Lister", desc:"List your items + also rent items" },
//               ].map(opt => (
//                 <div key={opt.role} onClick={() => { updateUserRole(opt.role); setShowRoleSwitch(false); setActiveTab("overview"); }}
//                   style={{ padding:"16px 18px", borderRadius:14, border:`2px solid ${user.role===opt.role?"#FF6B00":"#e5e5e5"}`, background:user.role===opt.role?"#fff5ee":"#fafafa", cursor:"pointer", transition:"all .2s", display:"flex", alignItems:"center", gap:14 }}>
//                   <span style={{ fontSize:"1.8rem" }}>{opt.icon}</span>
//                   <div>
//                     <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", color:"#1a1a1a" }}>{opt.title} {user.role===opt.role?"(Current)":""}</div>
//                     <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", color:"#888", marginTop:2 }}>{opt.desc}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button onClick={() => setShowRoleSwitch(false)}
//               style={{ width:"100%", marginTop:16, padding:"10px", background:"transparent", border:"none", fontFamily:"'DM Sans',sans-serif", color:"#aaa", cursor:"pointer", fontSize:"0.88rem" }}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

//----------------------------------------------------------------------------------

import { useState } from "react";
import { useAuth, useApp } from "../App";
import { generateReceiptPDF } from "../utils/generateReceipt";

const ICONS = {
  "Electronics":"📷","Vehicles":"🏍️","Party & Events":"🎉",
  "Sports & Outdoor":"⛺","Tools & Equipment":"🔧","Furniture & Appliances":"🛋️",
};

export default function ProfilePage({ navigate }) {
  const { user, handleLogout, updateUserRole } = useAuth();
  const { items, rentals, wishlist, toggleWishlist } = useApp();
  const [activeTab, setActiveTab] = useState("overview");
  const [showRoleSwitch, setShowRoleSwitch] = useState(false);

  if (!user) {
    return (
      <div style={{ paddingTop:90, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:14, fontFamily:"'DM Sans',sans-serif", background:"#f7f7f7", padding:"90px 20px 40px" }}>
        <div style={{ fontSize:"3rem" }}>🔒</div>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.4rem", fontWeight:800, color:"#1a1a1a" }}>Please log in</div>
        <div style={{ color:"#888" }}>Login to view your dashboard</div>
      </div>
    );
  }

  const isLister = user.role === "lister";
  const isRenter = user.role === "renter";

  const myListings      = items.filter(it => it.ownerId === user.id);
  const myRentals       = rentals.filter(r => r.renterId === user.id);
  const activeRentals   = myRentals.filter(r => r.status === "active");
  const myWishlistItems = items.filter(it => wishlist.includes(it.id));
  const myItemIds       = myListings.map(it => it.id);
  const requestsReceived   = rentals.filter(r => myItemIds.includes(r.itemId));
  const currentlyRentedOut = myListings.filter(it => !it.isAvailable);

  const renterTabs = [
    { id:"overview", label:"Overview" },
    { id:"active",   label:`Active Rentals (${activeRentals.length})` },
    { id:"history",  label:`History (${myRentals.length})` },
    { id:"wishlist", label:`Wishlist (${myWishlistItems.length})` },
    { id:"settings", label:"Settings" },
  ];
  const listerTabs = [
    { id:"overview",   label:"Overview" },
    { id:"listings",   label:`My Listings (${myListings.length})` },
    { id:"rented-out", label:`Rented Out (${currentlyRentedOut.length})` },
    { id:"requests",   label:`Requests (${requestsReceived.length})` },
    { id:"my-rentals", label:`My Rentals (${myRentals.length})` },
    { id:"settings",   label:"Settings" },
  ];
  const tabs = isLister ? listerTabs : renterTabs;

  // ── Sub-components ──────────────────────────────────────────────────────────
  const Card = ({ children, style={} }) => (
    <div style={{ background:"#fff", borderRadius:18, padding:"20px 22px", boxShadow:"0 2px 12px rgba(0,0,0,0.05)", ...style }}>
      {children}
    </div>
  );

  const StatCard = ({ icon, label, value, color="#FF6B00" }) => (
    <Card>
      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
        <div style={{ width:46, height:46, borderRadius:12, background:`${color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem" }}>{icon}</div>
        <div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.5rem", fontWeight:800, color:"#1a1a1a" }}>{value}</div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", color:"#888", marginTop:1 }}>{label}</div>
        </div>
      </div>
    </Card>
  );

  // ── Rental card with Download Receipt button ─────────────────────────────
  const RentalCard = ({ rental }) => {
    const grandTotal = rental.grandTotal || (rental.totalPrice + rental.deposit + (rental.platformFee || 0));
    return (
      <Card>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10 }}>
          {/* Left: Item info */}
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.97rem", color:"#1a1a1a" }}>
              {rental.itemTitle}
            </div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", color:"#888", marginTop:3 }}>
              📅 {new Date(rental.startDate).toLocaleDateString("en-IN")} → {new Date(rental.endDate).toLocaleDateString("en-IN")}
              &nbsp;·&nbsp; {rental.days} day{rental.days > 1 ? "s" : ""}
            </div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem", color:"#aaa", marginTop:2 }}>
              🧾 {rental.receiptId}
              {rental.paymentId && rental.paymentId !== "N/A" && ` · 💳 ${rental.paymentId}`}
            </div>

            {/* Status + Payment pill */}
            <div style={{ display:"flex", gap:8, marginTop:8, flexWrap:"wrap" }}>
              <span style={{ display:"inline-block", padding:"3px 10px", borderRadius:50, fontSize:"0.72rem", fontWeight:600, fontFamily:"'DM Sans',sans-serif", background:"#e8f5e9", color:"#2e7d32" }}>
                ✅ {rental.status}
              </span>
              <span style={{ display:"inline-block", padding:"3px 10px", borderRadius:50, fontSize:"0.72rem", fontWeight:600, fontFamily:"'DM Sans',sans-serif",
                background: rental.paymentStatus === "Paid" ? "#e3f2fd" : "#fff3e0",
                color:      rental.paymentStatus === "Paid" ? "#1565c0" : "#e65100"
              }}>
                💳 {rental.paymentStatus || "Pending"}
              </span>
            </div>
          </div>

          {/* Right: Amount + Download */}
          <div style={{ textAlign:"right", flexShrink:0 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.05rem", color:"#FF6B00" }}>
              ₹{grandTotal}
            </div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.72rem", color:"#aaa", marginTop:2 }}>
              incl. ₹{rental.deposit} deposit
            </div>

            {/* ── Download Receipt PDF ── */}
            <button
              onClick={() => generateReceiptPDF(rental)}
              style={{
                marginTop:10, padding:"7px 14px",
                background:"#1a1a1a", color:"#fff",
                border:"none", borderRadius:50,
                fontFamily:"'DM Sans',sans-serif", fontWeight:600,
                fontSize:"0.78rem", cursor:"pointer",
                display:"flex", alignItems:"center", gap:5,
                transition:"all .2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background="#FF6B00"}
              onMouseLeave={e => e.currentTarget.style.background="#1a1a1a"}
            >
              📄 Receipt PDF
            </button>
          </div>
        </div>
      </Card>
    );
  };

  const ItemCard = ({ item, showStatus=false }) => (
    <Card style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
      <div style={{ width:52, height:52, borderRadius:12, background:"linear-gradient(135deg,#ffe0cc,#ffb380)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.5rem", flexShrink:0, overflow:"hidden" }}>
        {(item.images?.[0]||item.image) ? <img src={item.images?.[0]||item.image} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : (ICONS[item.category]||"📦")}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", color:"#1a1a1a" }}>{item.title}</div>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", color:"#888", marginTop:2 }}>📍 {item.city} · ₹{item.price}/day</div>
        {showStatus && (
          <span style={{ display:"inline-block", marginTop:6, padding:"2px 10px", borderRadius:50, fontSize:"0.72rem", fontWeight:600, fontFamily:"'DM Sans',sans-serif",
            background:item.isAvailable?"#e8f5e9":"#fff0f0", color:item.isAvailable?"#2e7d32":"#e53e3e" }}>
            {item.isAvailable ? "✅ Available" : `🔴 Rented till ${new Date(item.rentedTill).toLocaleDateString("en-IN")}`}
          </span>
        )}
      </div>
      {wishlist.includes(item.id) && (
        <button onClick={()=>toggleWishlist(item.id)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:"1.1rem" }}>❤️</button>
      )}
    </Card>
  );

  const Empty = ({ icon, msg, btnLabel, btnAction }) => (
    <div style={{ textAlign:"center", padding:"48px 20px", fontFamily:"'DM Sans',sans-serif", color:"#aaa" }}>
      <div style={{ fontSize:"2.5rem", marginBottom:10 }}>{icon}</div>
      <div style={{ fontSize:"0.95rem", color:"#777", fontWeight:500 }}>{msg}</div>
      {btnLabel && (
        <button onClick={btnAction} style={{ marginTop:14, padding:"10px 24px", background:"#FF6B00", color:"#fff", border:"none", borderRadius:50, fontFamily:"'Syne',sans-serif", fontWeight:700, cursor:"pointer", fontSize:"0.9rem" }}>
          {btnLabel}
        </button>
      )}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .pp{padding-top:68px;min-height:100vh;background:#f7f7f7;}
        .pp-cover{height:180px;background:linear-gradient(135deg,#FF6B00,#ff9a3c);}
        .pp-main{max-width:980px;margin:0 auto;padding:0 24px 56px;}
        .pp-avatar{position:absolute;top:-52px;left:0;width:100px;height:100px;border-radius:50%;border:4px solid #fff;background:#FF6B00;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 18px rgba(0,0,0,0.13);}
        .pp-name{font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;color:#1a1a1a;}
        .pp-role-badge{display:inline-block;padding:4px 14px;border-radius:50px;font-size:0.78rem;font-weight:600;text-transform:capitalize;margin-top:4px;background:#fff3ea;color:#FF6B00;}
        .pp-tabs{display:flex;gap:4px;background:#fff;border-radius:50px;padding:5px;box-shadow:0 2px 12px rgba(0,0,0,0.06);margin:24px 0 20px;overflow-x:auto;scrollbar-width:none;}
        .pp-tabs::-webkit-scrollbar{display:none;}
        .pp-tab{padding:9px 18px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:0.85rem;font-weight:500;cursor:pointer;white-space:nowrap;transition:all .2s;border:none;background:transparent;color:#666;}
        .pp-tab.active{background:#FF6B00;color:#fff;font-weight:600;}
        .pp-tab:hover:not(.active){background:#f0f0f0;}
        .pp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;margin-bottom:20px;}
        .pp-list{display:flex;flex-direction:column;gap:12px;}
        .pp-logout{padding:10px 24px;border-radius:50px;border:2px solid #e53e3e;background:transparent;color:#e53e3e;font-family:'DM Sans',sans-serif;font-weight:600;cursor:pointer;transition:all .2s;font-size:0.88rem;}
        .pp-logout:hover{background:#fff5f5;}
        @media(max-width:600px){.pp-grid{grid-template-columns:1fr 1fr;}.pp-main{padding:0 14px 40px;}}
      `}</style>

      <div className="pp">
        <div className="pp-cover" />
        <div className="pp-main">
          <div style={{ position:"relative" }}>
            <div className="pp-avatar">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="#fff"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Profile row */}
          <div style={{ paddingTop:72, display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:12 }}>
            <div>
              <div className="pp-name">{user.name}</div>
              <div className="pp-role-badge">{isLister ? "🏠 Lister" : "🔑 Renter"}</div>
            </div>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              <button onClick={()=>setShowRoleSwitch(true)}
                style={{ padding:"9px 20px", borderRadius:50, border:"2px solid #FF6B00", background:"transparent", color:"#FF6B00", fontFamily:"'DM Sans',sans-serif", fontWeight:600, cursor:"pointer", fontSize:"0.85rem" }}>
                ⚙️ Switch Role
              </button>
              <button className="pp-logout" onClick={()=>{ handleLogout(); navigate("home"); }}>🚪 Logout</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="pp-tabs">
            {tabs.map(t => (
              <button key={t.id} className={`pp-tab ${activeTab===t.id?"active":""}`} onClick={()=>setActiveTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>

          {/* ── OVERVIEW ── */}
          {activeTab==="overview" && (
            <>
              <div className="pp-grid">
                {isRenter && <>
                  <StatCard icon="📦" label="Active Rentals" value={activeRentals.length} />
                  <StatCard icon="📋" label="Total Rented"   value={myRentals.length}      color="#4CAF50" />
                  <StatCard icon="❤️" label="Wishlist"       value={myWishlistItems.length} color="#e53e3e" />
                  <StatCard icon="💸" label="Total Spent"    value={`₹${myRentals.reduce((s,r)=>s+(r.grandTotal||r.totalPrice+r.deposit),0)}`} color="#9C27B0" />
                </>}
                {isLister && <>
                  <StatCard icon="📋" label="Total Listings"  value={myListings.length} />
                  <StatCard icon="🔴" label="Rented Out"      value={currentlyRentedOut.length}   color="#e53e3e" />
                  <StatCard icon="📬" label="Total Requests"  value={requestsReceived.length}      color="#4CAF50" />
                  <StatCard icon="💰" label="Est. Earnings"   value={`₹${requestsReceived.reduce((s,r)=>s+(r.totalPrice||0),0)}`} color="#9C27B0" />
                </>}
              </div>
              {/* Account info */}
              <div style={{ background:"#fff", borderRadius:18, padding:"22px 24px", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", color:"#1a1a1a", marginBottom:16 }}>Account Info</div>
                {[["Name",user.name],["Email",user.email],["Phone",user.phone||"Not provided"],["City",user.city||"Not provided"],["Role",isLister?"Lister":"Renter"],["Joined",user.joinedDate]].map(([k,v])=>(
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:"1px solid #f5f5f5", fontSize:"0.88rem" }}>
                    <span style={{ color:"#999", fontFamily:"'DM Sans',sans-serif" }}>{k}</span>
                    <span style={{ color:"#1a1a1a", fontWeight:500, fontFamily:"'DM Sans',sans-serif" }}>{v}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── ACTIVE RENTALS ── */}
          {activeTab==="active" && (
            <div className="pp-list">
              {activeRentals.length===0
                ? <Empty icon="📦" msg="No active rentals yet." btnLabel="Browse Items" btnAction={()=>navigate("rent")} />
                : activeRentals.map(r => <RentalCard key={r.id} rental={r} />)
              }
            </div>
          )}

          {/* ── HISTORY ── */}
          {activeTab==="history" && (
            <div className="pp-list">
              {myRentals.length===0
                ? <Empty icon="📋" msg="No rental history yet." />
                : myRentals.map(r => <RentalCard key={r.id} rental={r} />)
              }
            </div>
          )}

          {/* ── WISHLIST ── */}
          {activeTab==="wishlist" && (
            <div className="pp-list">
              {myWishlistItems.length===0
                ? <Empty icon="❤️" msg="No items saved yet." btnLabel="Browse Items" btnAction={()=>navigate("rent")} />
                : myWishlistItems.map(it => <ItemCard key={it.id} item={it} />)
              }
            </div>
          )}

          {/* ── MY LISTINGS (Lister) ── */}
          {activeTab==="listings" && (
            <div className="pp-list">
              {myListings.length===0
                ? <Empty icon="📋" msg="No listings yet." btnLabel="List an Item" btnAction={()=>navigate("list")} />
                : myListings.map(it => <ItemCard key={it.id} item={it} showStatus />)
              }
            </div>
          )}

          {/* ── RENTED OUT (Lister) ── */}
          {activeTab==="rented-out" && (
            <div className="pp-list">
              {currentlyRentedOut.length===0
                ? <Empty icon="✅" msg="No items currently rented out." />
                : currentlyRentedOut.map(it => <ItemCard key={it.id} item={it} showStatus />)
              }
            </div>
          )}

          {/* ── REQUESTS (Lister) ── */}
          {activeTab==="requests" && (
            <div className="pp-list">
              {requestsReceived.length===0
                ? <Empty icon="📬" msg="No rental requests received yet." />
                : requestsReceived.map(r => <RentalCard key={r.id} rental={r} />)
              }
            </div>
          )}

          {/* ── MY RENTALS (Lister can also rent) ── */}
          {activeTab==="my-rentals" && (
            <div className="pp-list">
              {myRentals.length===0
                ? <Empty icon="📦" msg="You haven't rented anything yet." btnLabel="Browse Items" btnAction={()=>navigate("rent")} />
                : myRentals.map(r => <RentalCard key={r.id} rental={r} />)
              }
            </div>
          )}

          {/* ── SETTINGS ── */}
          {activeTab==="settings" && (
            <div style={{ background:"#fff", borderRadius:18, padding:"24px", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", color:"#1a1a1a", marginBottom:20 }}>Account Settings</div>
              <div style={{ marginBottom:24 }}>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.85rem", color:"#666", marginBottom:10 }}>Current Role</div>
                <div style={{ display:"flex", gap:10 }}>
                  {[{r:"renter",icon:"🔑",label:"Renter"},{r:"lister",icon:"🏠",label:"Lister"}].map(opt=>(
                    <div key={opt.r} style={{ padding:"12px 20px", borderRadius:14, border:`2px solid ${user.role===opt.r?"#FF6B00":"#e5e5e5"}`, background:user.role===opt.r?"#fff5ee":"#fafafa", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:"0.9rem", color:user.role===opt.r?"#FF6B00":"#999" }}>
                      {opt.icon} {opt.label} {user.role===opt.r?"✓":""}
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={()=>setShowRoleSwitch(true)}
                style={{ padding:"11px 28px", background:"#FF6B00", color:"#fff", border:"none", borderRadius:50, fontFamily:"'Syne',sans-serif", fontWeight:700, cursor:"pointer", fontSize:"0.92rem" }}>
                Switch Role
              </button>
              <div style={{ marginTop:24, paddingTop:20, borderTop:"1px solid #f0f0f0" }}>
                <button className="pp-logout" onClick={()=>{ handleLogout(); navigate("home"); }}>🚪 Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Role Switch Modal */}
      {showRoleSwitch && (
        <div style={{ position:"fixed", inset:0, zIndex:2000, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div style={{ background:"#fff", borderRadius:22, padding:"32px 28px", maxWidth:400, width:"100%", boxShadow:"0 24px 80px rgba(0,0,0,0.18)" }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.3rem", fontWeight:800, color:"#1a1a1a", marginBottom:8 }}>Switch Role</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", color:"#888", marginBottom:22 }}>Choose what you want to do on QuickRent</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[{role:"renter",icon:"🔑",title:"Renter",desc:"Browse and rent items from others"},
                {role:"lister",icon:"🏠",title:"Lister",desc:"List your items + also rent from others"}].map(opt=>(
                <div key={opt.role} onClick={()=>{ updateUserRole(opt.role); setShowRoleSwitch(false); setActiveTab("overview"); }}
                  style={{ padding:"16px 18px", borderRadius:14, border:`2px solid ${user.role===opt.role?"#FF6B00":"#e5e5e5"}`, background:user.role===opt.role?"#fff5ee":"#fafafa", cursor:"pointer", transition:"all .2s", display:"flex", alignItems:"center", gap:14 }}>
                  <span style={{ fontSize:"1.8rem" }}>{opt.icon}</span>
                  <div>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", color:"#1a1a1a" }}>{opt.title} {user.role===opt.role?"(Current)":""}</div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", color:"#888", marginTop:2 }}>{opt.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={()=>setShowRoleSwitch(false)}
              style={{ width:"100%", marginTop:16, padding:"10px", background:"transparent", border:"none", fontFamily:"'DM Sans',sans-serif", color:"#aaa", cursor:"pointer", fontSize:"0.88rem" }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}