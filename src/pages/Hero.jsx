import { useApp, useAuth } from "../App";

const CATEGORY_ICONS = {
  "Electronics": "📷", "Vehicles": "🏍️", "Party & Events": "🎉",
  "Sports & Outdoor": "⛺", "Tools & Equipment": "🔧", "Furniture & Appliances": "🛋️",
};

export default function Hero({ navigate }) {
  const { items } = useApp();
  const { user } = useAuth();

  const topItems = [...items].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, 10);
  const marqueeItems = [...topItems, ...topItems]; // duplicate for infinite scroll

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scrollB{0%,100%{transform:translateY(0);opacity:1}80%{transform:translateY(8px);opacity:0.3}}
        @keyframes marqueeScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

        .hero{min-height:100vh;background:#FF6B00;display:flex;flex-direction:column;justify-content:center;padding:120px 48px 80px;position:relative;overflow:hidden;}
        .hero::before{content:'';position:absolute;top:-100px;right:-100px;width:500px;height:500px;border-radius:50%;background:rgba(255,255,255,0.06);pointer-events:none;}
        .hero::after{content:'';position:absolute;bottom:-150px;right:200px;width:350px;height:350px;border-radius:50%;background:rgba(255,255,255,0.04);pointer-events:none;}

        .h-tag{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.15);color:#fff;padding:6px 16px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:0.83rem;font-weight:500;margin-bottom:26px;width:fit-content;animation:fadeUp .6s both;}
        .h-tag span{width:7px;height:7px;border-radius:50%;background:#fff;display:block;}
        .h-title{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(3rem,8vw,6.5rem);color:#fff;line-height:1;letter-spacing:-2px;animation:fadeUp .6s .1s both;}
        .h-title .dark{color:#1a1a1a;}
        .h-sub{font-family:'DM Sans',sans-serif;font-size:1.1rem;color:rgba(255,255,255,0.82);margin-top:22px;font-weight:300;max-width:460px;line-height:1.65;animation:fadeUp .6s .2s both;}
        .h-actions{display:flex;gap:14px;margin-top:44px;flex-wrap:wrap;animation:fadeUp .6s .3s both;}
        .h-btn1{padding:15px 34px;background:#1a1a1a;color:#fff;border:none;border-radius:50px;font-family:'Syne',sans-serif;font-weight:700;font-size:0.97rem;cursor:pointer;transition:all .2s;}
        .h-btn1:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,0.28);}
        .h-btn2{padding:15px 34px;background:rgba(255,255,255,0.15);color:#fff;border:2px solid rgba(255,255,255,0.38);border-radius:50px;font-family:'Syne',sans-serif;font-weight:600;font-size:0.97rem;cursor:pointer;transition:all .2s;}
        .h-btn2:hover{background:rgba(255,255,255,0.25);transform:translateY(-2px);}
        .h-stats{display:flex;gap:48px;margin-top:64px;flex-wrap:wrap;animation:fadeUp .6s .4s both;}
        .h-stat-num{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:#fff;line-height:1;}
        .h-stat-lbl{font-family:'DM Sans',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.65);margin-top:3px;}

        /* Float cards */
        .h-floats{position:absolute;right:5%;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:14px;animation:fadeUp .7s .5s both;}
        .h-card{background:#fff;border-radius:18px;padding:18px 22px;box-shadow:0 8px 32px rgba(0,0,0,0.10);min-width:230px;transition:transform .2s;}
        .h-card:hover{transform:translateY(-3px);}
        .h-card-lbl{font-family:'DM Sans',sans-serif;font-size:0.72rem;color:#aaa;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;}
        .h-card-val{font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:700;color:#1a1a1a;}
        .h-card-sub{font-family:'DM Sans',sans-serif;font-size:0.78rem;color:#888;margin-top:2px;}
        .h-badge{display:inline-block;border-radius:50px;padding:2px 10px;font-size:0.72rem;font-weight:600;margin-top:7px;}

        /* Scroll hint */
        .h-scroll{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:7px;animation:fadeUp .6s .8s both;}
        .h-scroll span{font-family:'DM Sans',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.55);text-transform:uppercase;letter-spacing:2px;}
        .h-scroll-dot{width:22px;height:38px;border:2px solid rgba(255,255,255,0.38);border-radius:11px;display:flex;justify-content:center;padding-top:5px;}
        .h-scroll-dot::after{content:'';width:4px;height:7px;background:#fff;border-radius:2px;animation:scrollB 1.5s infinite;}

        /* Marquee */
        .marquee-section{background:#1a1a1a;padding:20px 0;overflow:hidden;}
        .marquee-label{font-family:'DM Sans',sans-serif;font-size:0.7rem;color:#666;text-transform:uppercase;letter-spacing:2px;text-align:center;margin-bottom:12px;}
        .marquee-track{display:flex;animation:marqueeScroll 30s linear infinite;}
        .marquee-track:hover{animation-play-state:paused;}
        .marquee-item{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.05);border-radius:50px;padding:10px 20px;margin:0 8px;white-space:nowrap;cursor:pointer;transition:background .2s;flex-shrink:0;}
        .marquee-item:hover{background:rgba(255,107,0,0.2);}
        .marquee-icon{font-size:1.2rem;}
        .marquee-info{}
        .marquee-title{font-family:'Syne',sans-serif;font-size:0.85rem;font-weight:700;color:#fff;}
        .marquee-price{font-family:'DM Sans',sans-serif;font-size:0.75rem;color:#FF6B00;font-weight:600;}
        .marquee-rating{font-family:'DM Sans',sans-serif;font-size:0.72rem;color:#888;margin-left:4px;}

        /* Feature strip */
        .feature-strip{background:#fff;padding:24px 48px;display:flex;gap:40px;align-items:center;flex-wrap:wrap;border-bottom:1px solid #f0f0f0;}
        .feature-item{display:flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:0.87rem;color:#555;}
        .feature-icon{width:34px;height:34px;background:#fff5ee;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1rem;}

        /* Categories section */
        .cats-section{padding:56px 48px;max-width:1200px;margin:0 auto;}
        .section-title{font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;color:#1a1a1a;margin-bottom:6px;}
        .section-sub{font-family:'DM Sans',sans-serif;font-size:0.9rem;color:#888;margin-bottom:32px;}
        .cats-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px;}
        .cat-card{background:#fff;border-radius:16px;padding:24px 16px;text-align:center;cursor:pointer;transition:all .2s;box-shadow:0 2px 12px rgba(0,0,0,0.05);border:2px solid transparent;}
        .cat-card:hover{border-color:#FF6B00;transform:translateY(-3px);box-shadow:0 6px 24px rgba(255,107,0,0.12);}
        .cat-icon{font-size:2.2rem;margin-bottom:10px;}
        .cat-name{font-family:'Syne',sans-serif;font-weight:700;font-size:0.88rem;color:#1a1a1a;}
        .cat-count{font-family:'DM Sans',sans-serif;font-size:0.75rem;color:#aaa;margin-top:3px;}

        @media(max-width:900px){.h-floats{display:none;}.h-stats{gap:28px;}}
        @media(max-width:600px){
          .hero{padding:100px 24px 70px;}
          .feature-strip{padding:20px 24px;gap:20px;}
          .cats-section{padding:40px 24px;}
          .h-actions{gap:10px;}
          .h-btn1,.h-btn2{padding:13px 24px;font-size:0.9rem;}
        }
      `}</style>

      {/* Hero */}
      <section className="hero">
        <div className="h-tag"><span />Tap. Rent. Return. Repeat.</div>
        <h1 className="h-title">TAP. RENT.<br /><span className="dark">MOVE.</span> NOW!</h1>
        <p className="h-sub">Borrow anything from anyone around you. Cameras, bikes, tools, party gear — rent for a day, not forever.</p>

        <div className="h-actions">
          {(!user || user.role === "renter" || user.role === "lister") && (
            <button className="h-btn1" onClick={() => navigate("rent")}>Browse Items →</button>
          )}
          {user?.role === "lister" && (
            <button className="h-btn2" onClick={() => navigate("list")}>List Your Item</button>
          )}
          {!user && (
            <button className="h-btn2" onClick={() => navigate("rent")}>Explore Items</button>
          )}
        </div>

        <div className="h-stats">
          {[["500+","Items Available"],["98%","Happy Renters"],["6","Categories"],["₹200","Starting from/day"]].map(([n,l]) => (
            <div key={l}><div className="h-stat-num">{n}</div><div className="h-stat-lbl">{l}</div></div>
          ))}
        </div>

        {/* Float cards */}
        <div className="h-floats">
          <div className="h-card">
            <div className="h-card-lbl">🔥 Most Rented Today</div>
            <div className="h-card-val">Sony A7III Camera</div>
            <div className="h-card-sub">₹800/day · Pune</div>
            <span className="h-badge" style={{ background:"#e8f5e9", color:"#2e7d32" }}>⭐ 4.8 Rating</span>
          </div>
          <div className="h-card">
            <div className="h-card-lbl">✨ Newly Listed</div>
            <div className="h-card-val">GoPro Hero 12</div>
            <div className="h-card-sub">₹500/day · Goa</div>
            <span className="h-badge" style={{ background:"#fff3e0", color:"#e65100" }}>🆕 Just Added</span>
          </div>
        </div>

        <div className="h-scroll">
          <div className="h-scroll-dot" />
          <span>Scroll</span>
        </div>
      </section>

      {/* Marquee — Top Rated Items */}
      <div className="marquee-section">
        <div className="marquee-label">⭐ Top Rated Items</div>
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <div className="marquee-item" key={i} onClick={() => navigate("rent")}>
              <span className="marquee-icon">{CATEGORY_ICONS[item.category] || "📦"}</span>
              <div className="marquee-info">
                <div className="marquee-title">{item.title}</div>
                <div className="marquee-price">₹{item.price}/day <span className="marquee-rating">⭐ {item.rating}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature strip */}
      <div className="feature-strip">
        {[["⚡","Instant Booking"],["🔐","Verified Owners"],["📍","Multiple Cities"],["💬","24/7 Support"],["🚫","Zero Brokerage"],["🧾","Digital Receipt"]].map(([ic,txt]) => (
          <div className="feature-item" key={txt}>
            <div className="feature-icon">{ic}</div>{txt}
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="cats-section">
        <div className="section-title">Browse by Category</div>
        <div className="section-sub">Find exactly what you need across 6 categories</div>
        <div className="cats-grid">
          {Object.entries(CATEGORY_ICONS).map(([name, icon]) => {
            const count = items.filter(it => it.category === name && it.isAvailable).length;
            return (
              <div className="cat-card" key={name} onClick={() => navigate("rent")}>
                <div className="cat-icon">{icon}</div>
                <div className="cat-name">{name}</div>
                <div className="cat-count">{count} available</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}