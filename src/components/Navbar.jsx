import { useState, useEffect } from "react";
import { useAuth } from "../App";

export default function Navbar({ currentPage, navigate, openAuth }) {
  const { user, handleLogout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isHome = currentPage === "home";
  const isOrange = isHome && !scrolled;
  const bg = isOrange ? "#FF6B00" : "#fff";
  const tc = isOrange ? "#fff" : "#1a1a1a";
  const lc = isOrange ? "#fff" : "#FF6B00";
  const shadow = isOrange ? "none" : "0 2px 20px rgba(0,0,0,0.09)";

  const role = user?.role || "guest";

  // Renter → Home, Rent Items, About
  // Lister → Home, Rent Items, List Item, About  (lister can also rent)
  // Guest  → Home, About
  const allLinks = [
    { label: "Home",       page: "home",  roles: ["guest","renter","lister"] },
    { label: "Rent Items", page: "rent",  roles: ["renter","lister"] },
    { label: "List Item",  page: "list",  roles: ["lister"] },
    { label: "About",      page: "about", roles: ["guest","renter","lister"] },
  ];
  const links = allLinks.filter(l => l.roles.includes(role));

  const S = {
    nav:`position:fixed;top:0;left:0;right:0;z-index:1000;display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:68px;transition:background .35s,box-shadow .35s;`,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        .qr-nav{position:fixed;top:0;left:0;right:0;z-index:1000;display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:68px;transition:background .35s,box-shadow .35s;}
        .qr-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:1.4rem;cursor:pointer;letter-spacing:-0.5px;transition:color .35s;white-space:nowrap;}
        .qr-links{display:flex;gap:28px;list-style:none;}
        .qr-link{cursor:pointer;font-family:'DM Sans',sans-serif;font-size:0.92rem;font-weight:500;padding-bottom:3px;transition:all .2s;border-bottom:2px solid transparent;}
        .qr-link:hover{opacity:.7;}
        .qr-link.active{border-bottom-color:currentColor;}
        .qr-actions{display:flex;gap:10px;align-items:center;}
        .qr-btn-login{padding:8px 20px;border-radius:50px;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:500;font-size:0.88rem;background:transparent;transition:all .2s;}
        .qr-btn-signup{padding:8px 20px;border-radius:50px;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:600;font-size:0.88rem;border:none;transition:all .2s;}
        .qr-btn-login:hover{opacity:.8;}
        .qr-btn-signup:hover{opacity:.85;transform:translateY(-1px);}

        /* Profile */
        .qr-profile-wrap{position:relative;}
        .qr-profile-btn{width:40px;height:40px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;border:2px solid;}
        .qr-profile-btn:hover{transform:scale(1.06);}
        .qr-dropdown{position:absolute;top:52px;right:0;background:#fff;border-radius:16px;min-width:215px;box-shadow:0 8px 40px rgba(0,0,0,0.13);overflow:hidden;animation:qrDrop .2s ease;}
        @keyframes qrDrop{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .qr-dd-head{padding:15px 20px;background:#fff8f5;border-bottom:1px solid #ffe0cc;}
        .qr-dd-name{font-family:'Syne',sans-serif;font-weight:700;font-size:0.95rem;color:#1a1a1a;}
        .qr-dd-role{font-size:0.74rem;color:#FF6B00;margin-top:3px;font-weight:600;text-transform:capitalize;}
        .qr-dd-item{padding:11px 20px;font-size:0.87rem;cursor:pointer;font-family:'DM Sans',sans-serif;color:#333;transition:background .15s;}
        .qr-dd-item:hover{background:#fff5ee;color:#FF6B00;}
        .qr-dd-item.danger{color:#e53e3e;}
        .qr-dd-item.danger:hover{background:#fff5f5;}

        /* Hamburger */
        .qr-burger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px;}
        .qr-burger span{display:block;width:24px;height:2px;border-radius:2px;transition:all .3s;}

        /* Mobile menu */
        .qr-mobile{position:fixed;top:68px;left:0;right:0;background:#fff;padding:12px 0 8px;box-shadow:0 8px 24px rgba(0,0,0,0.11);z-index:999;animation:qrDrop .2s ease;}
        .qr-mobile-link{display:block;padding:13px 28px;font-family:'DM Sans',sans-serif;font-size:0.98rem;font-weight:500;color:#1a1a1a;cursor:pointer;transition:background .15s;border-left:3px solid transparent;}
        .qr-mobile-link:hover,.qr-mobile-link.active{background:#fff5ee;color:#FF6B00;border-left-color:#FF6B00;}
        .qr-mobile-auth{padding:14px 28px;display:flex;gap:10px;border-top:1px solid #f0f0f0;margin-top:6px;}

        @media(max-width:768px){
          .qr-nav{padding:0 20px;}
          .qr-links{display:none;}
          .qr-btn-login,.qr-btn-signup{display:none;}
          .qr-burger{display:flex;}
        }
      `}</style>

      <nav className="qr-nav" style={{ background: bg, boxShadow: shadow }}>
        <span className="qr-logo" style={{ color: lc }} onClick={() => navigate("home")}>
          QuickRent
        </span>

        {/* Desktop links */}
        <ul className="qr-links">
          {links.map(({ label, page }) => (
            <li key={page} className={`qr-link ${currentPage === page ? "active" : ""}`}
              style={{ color: tc }} onClick={() => navigate(page)}>
              {label}
            </li>
          ))}
        </ul>

        {/* Desktop auth / profile */}
        <div className="qr-actions">
          {!user ? (
            <>
              <button className="qr-btn-login"
                style={{ color: isOrange ? "#fff" : "#FF6B00", border: `2px solid ${isOrange ? "rgba(255,255,255,0.55)" : "#FF6B00"}` }}
                onClick={() => openAuth("login")}>Login</button>
              <button className="qr-btn-signup"
                style={{ background: isOrange ? "#fff" : "#FF6B00", color: isOrange ? "#FF6B00" : "#fff" }}
                onClick={() => openAuth("signup")}>Sign Up</button>
            </>
          ) : (
            <div className="qr-profile-wrap">
              <div className="qr-profile-btn"
                style={{ background: isOrange ? "#fff" : "#FF6B00", borderColor: isOrange ? "rgba(255,255,255,0.4)" : "#FF6B00" }}
                onClick={() => setProfileOpen(p => !p)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" fill={isOrange ? "#FF6B00" : "#fff"} />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={isOrange ? "#FF6B00" : "#fff"} strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {profileOpen && (
                <div className="qr-dropdown" onClick={() => setProfileOpen(false)}>
                  <div className="qr-dd-head">
                    <div className="qr-dd-name">{user.name}</div>
                    <div className="qr-dd-role">
                      {role === "lister" ? "🏠 Lister" : "🔑 Renter"}
                    </div>
                  </div>
                  <div className="qr-dd-item" onClick={() => navigate("profile")}>👤 My Dashboard</div>
                  {role === "renter" && <>
                    <div className="qr-dd-item" onClick={() => navigate("profile")}>📦 My Rentals</div>
                    <div className="qr-dd-item" onClick={() => navigate("profile")}>❤️ Wishlist</div>
                  </>}
                  {role === "lister" && <>
                    <div className="qr-dd-item" onClick={() => navigate("profile")}>📋 My Listings</div>
                    <div className="qr-dd-item" onClick={() => navigate("profile")}>📬 Rental Requests</div>
                  </>}
                  <div className="qr-dd-item" onClick={() => navigate("profile")}>⚙️ Settings</div>
                  <div className="qr-dd-item danger" onClick={() => { handleLogout(); setProfileOpen(false); }}>🚪 Logout</div>
                </div>
              )}
            </div>
          )}

          {/* Hamburger */}
          <button className="qr-burger" onClick={() => setMenuOpen(m => !m)}>
            <span style={{ background: tc }} />
            <span style={{ background: tc }} />
            <span style={{ background: tc }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="qr-mobile">
          {links.map(({ label, page }) => (
            <div key={page} className={`qr-mobile-link ${currentPage === page ? "active" : ""}`}
              onClick={() => { navigate(page); setMenuOpen(false); }}>
              {label}
            </div>
          ))}
          {!user ? (
            <div className="qr-mobile-auth">
              <button onClick={() => { openAuth("login"); setMenuOpen(false); }}
                style={{ flex:1,padding:"10px",borderRadius:50,border:"2px solid #FF6B00",background:"transparent",color:"#FF6B00",fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",fontSize:"0.9rem" }}>
                Login
              </button>
              <button onClick={() => { openAuth("signup"); setMenuOpen(false); }}
                style={{ flex:1,padding:"10px",borderRadius:50,border:"none",background:"#FF6B00",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",fontSize:"0.9rem" }}>
                Sign Up
              </button>
            </div>
          ) : (
            <div className="qr-mobile-auth" style={{ justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif",fontWeight:700,color:"#1a1a1a",fontSize:"0.95rem" }}>{user.name}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"0.78rem",color:"#FF6B00",fontWeight:600 }}>{role === "lister" ? "🏠 Lister" : "🔑 Renter"}</div>
              </div>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }}
                style={{ padding:"8px 16px",borderRadius:50,border:"2px solid #e53e3e",background:"transparent",color:"#e53e3e",fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer",fontSize:"0.85rem" }}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}