import { useState } from "react";
import { useAuth } from "../App";

export default function AuthModal({ mode, onClose, switchMode }) {
  const { handleLogin, handleSignup } = useAuth();
  const [form, setForm] = useState({ name:"", email:"", phone:"", city:"", password:"", role:"renter" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const u = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    setError("");
    if (mode === "signup") {
      if (!form.name || !form.email || !form.phone || !form.password) { setError("Please fill all required fields."); return; }
      if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
      setLoading(true);
      setTimeout(() => { handleSignup({ ...form, joinedDate: new Date().toLocaleDateString("en-IN") }); setLoading(false); }, 700);
    } else {
      if (!form.email || !form.password) { setError("Please enter email and password."); return; }
      setLoading(true);
      setTimeout(() => { handleLogin({ ...form, name: form.name || form.email.split("@")[0] }); setLoading(false); }, 700);
    }
  };

  const Field = ({ k, label, ph, type = "text" }) => (
    <div style={{ marginBottom: 15 }}>
      <label style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem", color:"#777", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</label>
      <input type={type} placeholder={ph} value={form[k]} onChange={e => u(k, e.target.value)}
        style={{ width:"100%", padding:"11px 15px", border:"1.5px solid #e5e5e5", borderRadius:10, fontFamily:"'DM Sans',sans-serif", fontSize:"0.93rem", outline:"none", background:"#fafafa", transition:"border .2s" }}
        onFocus={e => e.target.style.borderColor="#FF6B00"}
        onBlur={e => e.target.style.borderColor="#e5e5e5"} />
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .qr-overlay{position:fixed;inset:0;z-index:2000;background:rgba(0,0,0,0.52);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;padding:16px;animation:ovIn .2s ease;}
        @keyframes ovIn{from{opacity:0}to{opacity:1}}
        @keyframes boxIn{from{opacity:0;transform:translateY(28px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        .qr-modal{background:#fff;border-radius:24px;width:100%;max-width:450px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,0.18);animation:boxIn .28s ease;}
        .qr-modal-head{background:#FF6B00;padding:32px 36px 26px;position:relative;}
        .qr-modal-close{position:absolute;top:14px;right:16px;width:30px;height:30px;background:rgba(255,255,255,0.2);border:none;border-radius:50%;color:#fff;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;}
        .qr-modal-close:hover{background:rgba(255,255,255,0.35);}
        .qr-modal-title{font-family:'Syne',sans-serif;font-size:1.7rem;font-weight:800;color:#fff;line-height:1.1;}
        .qr-modal-sub{font-family:'DM Sans',sans-serif;font-size:0.88rem;color:rgba(255,255,255,0.75);margin-top:5px;}
        .qr-modal-body{padding:28px 36px;}
        .qr-role-row{display:flex;gap:10px;margin-bottom:18px;}
        .qr-role-btn{flex:1;padding:12px 8px;border-radius:12px;border:1.5px solid #e5e5e5;background:#fafafa;font-family:'DM Sans',sans-serif;font-size:0.88rem;cursor:pointer;transition:all .2s;font-weight:500;text-align:center;}
        .qr-role-btn.active{border-color:#FF6B00;background:#fff5ee;color:#FF6B00;}
        .qr-role-desc{font-size:0.75rem;color:#aaa;margin-top:3px;}
        .qr-submit{width:100%;padding:13px;background:#FF6B00;color:#fff;border:none;border-radius:50px;font-family:'Syne',sans-serif;font-size:0.97rem;font-weight:700;cursor:pointer;transition:all .2s;margin-top:6px;}
        .qr-submit:hover{background:#e05e00;transform:translateY(-1px);}
        .qr-submit:disabled{background:#ccc;cursor:not-allowed;transform:none;}
        .qr-switch{text-align:center;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:#888;margin-top:16px;}
        .qr-switch a{color:#FF6B00;font-weight:600;cursor:pointer;text-decoration:underline;}
        .qr-err{background:#fff5f5;border:1px solid #fcc;color:#e53e3e;border-radius:10px;padding:9px 13px;font-family:'DM Sans',sans-serif;font-size:0.83rem;margin-bottom:14px;}
        .two-col{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
      `}</style>

      <div className="qr-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="qr-modal">
          <div className="qr-modal-head">
            <button className="qr-modal-close" onClick={onClose}>✕</button>
            <div className="qr-modal-title">{mode === "signup" ? "Create Account" : "Welcome Back"}</div>
            <div className="qr-modal-sub">{mode === "signup" ? "Join QuickRent today" : "Log in to your account"}</div>
          </div>

          <div className="qr-modal-body">
            {error && <div className="qr-err">⚠ {error}</div>}

            {/* Role selector — only on signup */}
            {mode === "signup" && (
              <div style={{ marginBottom: 18 }}>
                <label style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem", color:"#777", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.5px" }}>I want to</label>
                <div className="qr-role-row">
                  <div className={`qr-role-btn ${form.role === "renter" ? "active" : ""}`} onClick={() => u("role", "renter")}>
                    🔑 Rent Items
                    <div className="qr-role-desc">Browse &amp; rent items</div>
                  </div>
                  <div className={`qr-role-btn ${form.role === "lister" ? "active" : ""}`} onClick={() => u("role", "lister")}>
                    🏠 List Items
                    <div className="qr-role-desc">List &amp; rent out my items</div>
                  </div>
                </div>
              </div>
            )}

            {mode === "signup" && (
              <div className="two-col">
                <Field k="name" label="Full Name *" ph="Rahul Sharma" />
                <Field k="phone" label="Phone *" ph="+91 9876543210" />
              </div>
            )}

            <Field k="email" label="Email Address *" ph="you@example.com" type="email" />
            {mode === "signup" && <Field k="city" label="City" ph="Pune, Mumbai..." />}
            <Field k="password" label="Password *" ph="••••••••" type="password" />

            <button className="qr-submit" onClick={submit} disabled={loading}>
              {loading ? "Please wait..." : mode === "signup" ? "Create Account →" : "Login →"}
            </button>

            <div className="qr-switch">
              {mode === "signup"
                ? <>Already have an account? <a onClick={() => switchMode("login")}>Login</a></>
                : <>New here? <a onClick={() => switchMode("signup")}>Create account</a></>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}