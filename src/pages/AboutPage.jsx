export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
        .ap{padding-top:68px;min-height:100vh;font-family:'DM Sans',sans-serif;}
        .ap-hero{background:linear-gradient(135deg,#FF6B00,#1a1a1a);padding:72px 48px;color:#fff;text-align:center;}
        .ap-hero h1{font-family:'Syne',sans-serif;font-size:2.8rem;font-weight:800;}
        .ap-hero p{font-size:1.05rem;color:rgba(255,255,255,0.8);margin-top:10px;max-width:500px;margin-inline:auto;line-height:1.7;}
        .ap-body{max-width:860px;margin:0 auto;padding:52px 40px;}
        .ap-card{background:#fff;border-radius:22px;padding:36px;margin-bottom:32px;box-shadow:0 2px 16px rgba(0,0,0,0.05);}
        .ap-card h2{font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:800;color:#1a1a1a;margin-bottom:12px;}
        .ap-card p{color:#666;line-height:1.8;font-size:0.95rem;}
        .team-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:32px;}
        .tc{background:#fff;border-radius:18px;padding:28px 16px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.05);}
        .tc-emoji{font-size:2.8rem;margin-bottom:10px;}
        .tc-name{font-family:'Syne',sans-serif;font-weight:700;font-size:0.95rem;color:#1a1a1a;}
        .tc-role{font-size:0.8rem;color:#FF6B00;margin-top:3px;}
        .vals{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .vc{background:#fff;border-radius:18px;padding:22px;box-shadow:0 2px 12px rgba(0,0,0,0.05);}
        .vc-icon{font-size:1.8rem;margin-bottom:8px;}
        .vc-title{font-family:'Syne',sans-serif;font-weight:700;color:#1a1a1a;font-size:0.95rem;}
        .vc-desc{font-size:0.85rem;color:#777;margin-top:5px;line-height:1.6;}
        @media(max-width:600px){.ap-hero{padding:52px 24px;}.ap-body{padding:36px 20px;}.team-grid{grid-template-columns:1fr 1fr;}.vals{grid-template-columns:1fr;}}
      `}</style>
      <div className="ap">
        <div className="ap-hero">
          <h1>About QuickRent</h1>
          <p>Rent anything from anyone. We're building India's most trusted peer-to-peer item rental platform.</p>
        </div>
        <div className="ap-body">
          <div className="ap-card">
            <h2>Our Story</h2>
            <p>QuickRent was built out of frustration. Our founders needed a camera for a weekend trip and a drill for home repairs — both sitting in a neighbor's home unused. We built the platform that connects people who have things with people who need them — no buying, no wasting, just renting.</p>
          </div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.3rem", fontWeight:800, color:"#1a1a1a", marginBottom:16 }}>Meet the Team</div>
          <div className="team-grid">
            {[["👨‍💻","Aryan Mehta","Co-founder & CEO"],["👩‍💻","Priya Nair","Co-founder & CTO"],["🚀","Rohan Gupta","Head of Growth"]].map(([ic,n,r])=>(
              <div className="tc" key={n}><div className="tc-emoji">{ic}</div><div className="tc-name">{n}</div><div className="tc-role">{r}</div></div>
            ))}
          </div>
          <div className="vals">
            {[["🔐","Trust First","Every listing is verified. No scams, no hidden costs."],["⚡","Speed","List in 2 minutes. Rent in 5."],["💸","Zero Brokerage","We never charge renters a platform fee."],["🤝","Fair to All","Equal experience for renters and listers."]].map(([ic,t,d])=>(
              <div className="vc" key={t}><div className="vc-icon">{ic}</div><div className="vc-title">{t}</div><div className="vc-desc">{d}</div></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}