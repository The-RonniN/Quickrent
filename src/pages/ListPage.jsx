import { useState } from "react";
import { useApp, useAuth } from "../App";

const CATS = ["Electronics","Vehicles","Party & Events","Sports & Outdoor","Tools & Equipment","Furniture & Appliances"];
const CONDITIONS = ["Brand New","Excellent","Good","Fair"];

const Field = ({ k, label, ph, type="text", full=true, form, u, errors }) => (
  <div style={{ marginBottom:16, gridColumn: full ? "1/-1" : "auto" }}>
    <label style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem", color:"#666", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</label>
    <input type={type === "numeric" ? "text" : type} inputMode={type === "numeric" ? "numeric" : undefined} placeholder={ph} value={form[k]} 
      onChange={e => {
        let val = e.target.value;
        if (type === "numeric") {
          val = val.replace(/[^0-9]/g, '');
        }
        u(k, val);
      }} 
      maxLength={(type === "text" || type === "numeric") ? "200" : undefined}
      style={{ width:"100%", padding:"11px 14px", border:`1.5px solid ${errors[k]?"#e53e3e":"#e5e5e5"}`, borderRadius:10, fontFamily:"'DM Sans',sans-serif", fontSize:"0.92rem", outline:"none", background:"#fafafa", color:"#000" }}
      onFocus={e => e.target.style.borderColor="#FF6B00"}
      onBlur={e => e.target.style.borderColor=errors[k]?"#e53e3e":"#e5e5e5"} />
    {errors[k] && <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.75rem", color:"#e53e3e", marginTop:4 }}>⚠ {errors[k]}</div>}
  </div>
);

export default function ListPage({ navigate, openAuth }) {
  const { addItem } = useApp();
  const { user } = useAuth();
  //date funcion added 
  const [form, setForm] = useState({ title:"", category:"Electronics", description:"", price:"", deposit:"", city:"", condition:"Good", availableFrom: new Date().toISOString().split("T")[0], availableTill:"", images:[] });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const u = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Guard — must be logged in as lister
  if (!user) {
    return (
      <div style={{ paddingTop:90, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f7f7f7", flexDirection:"column", gap:16, padding:"90px 20px 40px" }}>
        <div style={{ fontSize:"3rem" }}>🔒</div>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.4rem", fontWeight:800, color:"#1a1a1a", textAlign:"center" }}>Login Required</div>
        <div style={{ fontFamily:"'DM Sans',sans-serif", color:"#888", textAlign:"center" }}>You need to be logged in to list an item.</div>
        <button onClick={() => openAuth("signup")} style={{ padding:"12px 32px", background:"#FF6B00", color:"#fff", border:"none", borderRadius:50, fontFamily:"'Syne',sans-serif", fontWeight:700, cursor:"pointer", fontSize:"0.97rem" }}>
          Create Account →
        </button>
      </div>
    );
  }

  if (user.role !== "lister") {
    return (
      <div style={{ paddingTop:90, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f7f7f7", flexDirection:"column", gap:16, padding:"90px 20px 40px" }}>
        <div style={{ fontSize:"3rem" }}>🏠</div>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.4rem", fontWeight:800, color:"#1a1a1a", textAlign:"center" }}>Lister Account Required</div>
        <div style={{ fontFamily:"'DM Sans',sans-serif", color:"#888", textAlign:"center", maxWidth:360 }}>You currently have a Renter account. Switch to a Lister account from your profile to list items.</div>
        <button onClick={() => navigate("profile")} style={{ padding:"12px 32px", background:"#FF6B00", color:"#fff", border:"none", borderRadius:50, fontFamily:"'Syne',sans-serif", fontWeight:700, cursor:"pointer", fontSize:"0.97rem" }}>
          Go to Profile →
        </button>
      </div>
    );
  }

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.price || isNaN(form.price) || +form.price <= 0) e.price = "Enter a valid price";
    if (!form.deposit || isNaN(form.deposit) || +form.deposit < 0) e.deposit = "Enter a valid deposit";
    if (!form.city.trim()) e.city = "City is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    addItem({ ...form, price: +form.price, deposit: +form.deposit });
    setSuccess(true);
    setForm({ title:"", category:"Electronics", description:"", price:"", deposit:"", city:"", condition:"Good", availableFrom: new Date().toISOString().split("T")[0], availableTill:"", images:[] });
  };


  
  if (success) {
    return (
      <div style={{ paddingTop:90, minHeight:"100vh", background:"#f7f7f7", display:"flex", alignItems:"center", justifyContent:"center", padding:"90px 20px 40px" }}>
        <div style={{ background:"#fff", borderRadius:24, padding:"48px 36px", textAlign:"center", maxWidth:400, width:"100%", boxShadow:"0 2px 20px rgba(0,0,0,0.08)" }}>
          <div style={{ fontSize:"3.5rem", marginBottom:12 }}>✅</div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.5rem", fontWeight:800, color:"#1a1a1a" }}>Item Listed!</div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", color:"#888", marginTop:8, lineHeight:1.6 }}>Your item is now live on QuickRent and visible to renters.</div>
          <div style={{ display:"flex", gap:10, marginTop:24, flexDirection:"column" }}>
            <button onClick={() => { setSuccess(false); }} style={{ padding:"12px", background:"#FF6B00", color:"#fff", border:"none", borderRadius:50, fontFamily:"'Syne',sans-serif", fontWeight:700, cursor:"pointer" }}>
              List Another Item
            </button>
            <button onClick={() => navigate("rent")} style={{ padding:"12px", background:"transparent", color:"#FF6B00", border:"2px solid #FF6B00", borderRadius:50, fontFamily:"'Syne',sans-serif", fontWeight:700, cursor:"pointer" }}>
              View All Listings
            </button>
            <button onClick={() => navigate("profile")} style={{ padding:"12px", background:"transparent", color:"#888", border:"none", fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }



  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .lp{padding-top:68px;min-height:100vh;background:#f7f7f7;}
        .lp-hero{background:#1a1a1a;padding:40px 48px;}
        .lp-hero h1{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:#fff;}
        .lp-hero p{font-family:'DM Sans',sans-serif;font-size:0.92rem;color:#aaa;margin-top:6px;}
        .lp-wrap{max-width:680px;margin:32px auto;padding:0 24px 48px;}
        .lp-card{background:#fff;border-radius:22px;padding:32px;box-shadow:0 2px 18px rgba(0,0,0,0.06);}
        .lp-section-title{font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;color:#1a1a1a;margin-bottom:18px;padding-bottom:10px;border-bottom:2px solid #f0f0f0;}
        .lp-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 14px;}
        input[type="text"], input[type="number"], input[type="date"] { color: #000 !important; }
        input::placeholder { color: #999 !important; }
        .lp-select{width:100%;padding:"11px 14px";border:1.5px solid #e5e5e5;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:0.92rem;outline:none;background:#fafafa;cursor:pointer;margin-bottom:16px;color:#000;}
        .lp-textarea{width:100%;padding:11px 14px;border:1.5px solid #e5e5e5;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:0.92rem;outline:none;background:#fafafa;resize:vertical;margin-bottom:16px;color:#000;}
        .lp-submit{width:100%;padding:14px;background:#FF6B00;color:#fff;border:none;border-radius:50px;font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;cursor:pointer;transition:all .2s;margin-top:8px;}
        .lp-submit:hover{background:#e05e00;transform:translateY(-1px);}
        .cond-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;}
        .cond-btn{padding:8px 16px;border-radius:50px;border:1.5px solid #e5e5e5;background:#fafafa;font-family:'DM Sans',sans-serif;font-size:0.83rem;cursor:pointer;transition:all .2s;}
        .cond-btn.active{border-color:#FF6B00;background:#fff5ee;color:#FF6B00;}
        @media(max-width:600px){.lp-hero{padding:28px 20px;}.lp-grid{grid-template-columns:1fr;}.lp-wrap{padding:0 16px 40px;}}
      `}</style>

      <div className="lp">
        <div className="lp-hero">
          <h1>List Your Item</h1>
          <p>Fill in the details below and start earning from your idle items.</p>
        </div>

        <div className="lp-wrap">
          <div className="lp-card">
            {/* Basic Info */}
            <div className="lp-section-title">📦 Item Details</div>
            <Field k="title" label="Item Title *" ph="e.g. Sony A7III Camera" full form={form} u={u} errors={errors} />

            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem", color:"#666", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>Category *</label>
              <select className="lp-select" style={{ padding:"11px 14px" }} value={form.category} onChange={e => u("category", e.target.value)}>
                {CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem", color:"#666", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>Condition *</label>
              <div className="cond-row">
                {CONDITIONS.map(c => (
                  <div key={c} className={`cond-btn ${form.condition === c ? "active" : ""}`} onClick={() => u("condition", c)}>{c}</div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem", color:"#666", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>Description *</label>
              <textarea className="lp-textarea" rows={4} placeholder="Describe your item — what's included, any usage notes..."
                value={form.description} onChange={e => u("description", e.target.value)}
                style={{ borderColor: errors.description ? "#e53e3e" : "#e5e5e5" }} />
              {errors.description && <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.75rem", color:"#e53e3e", marginTop:-10, marginBottom:12 }}>⚠ {errors.description}</div>}
            </div>

            {/* Pricing */}
            <div className="lp-section-title">💰 Pricing</div>
            <div className="lp-grid">
              <Field k="price" label="Rent per Day (₹) *" ph="e.g. 500" type="numeric" form={form} u={u} errors={errors} />
              <Field k="deposit" label="Refundable Deposit (₹) *" ph="e.g. 2000" type="numeric" form={form} u={u} errors={errors} />
            </div>

            {/* Location */}
            <div className="lp-section-title">📍 Location & Availability</div>
            <Field k="city" label="City *" ph="Pune, Mumbai, Bangalore..." full form={form} u={u} errors={errors} />
            {/* availabe form to till */}

            <div className="lp-grid">      
            <Field k="availableFrom" label="Available From" type="date" form={form} u={u} errors={errors} />
              <Field k="availableTill" label="Available Till" type="date" form={form} u={u} errors={errors} />
            </div>

            {/* Photos */}
            <div className="lp-section-title" style={{ marginTop: 24 }}>📸 Photos</div>
            <div style={{ marginBottom: 16 }}>
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={e => {
                  const files = Array.from(e.target.files);
                  const newImages = files.map(f => URL.createObjectURL(f));
                  u("images", [...(form.images || []), ...newImages]);
                }}
                style={{ marginBottom: 12, width: "100%", padding: "8px", background: "#fff", borderRadius: 8, border: "1.5px solid #e5e5e5", fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem" }}
              />
              {form.images && form.images.length > 0 && (
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {form.images.map((img, idx) => (
                    <div key={idx} style={{ position: "relative", width: 80, height: 80 }}>
                      <img src={img} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
                      <button 
                        onClick={() => u("images", form.images.filter((_, i) => i !== idx))} 
                        style={{ position: "absolute", top: -5, right: -5, background: "#e53e3e", color: "white", borderRadius: "50%", border: "none", width: 22, height: 22, cursor: "pointer", fontSize: 12, display:"flex", alignItems:"center", justifyContent:"center" }}
                      >✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="lp-submit" onClick={handleSubmit}>
              🚀 List My Item →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}