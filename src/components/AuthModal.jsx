// import { useState } from "react";
// import { useAuth } from "../App";

// export default function AuthModal({ mode, onClose, switchMode }) {
//   const { handleLogin, handleSignup } = useAuth();
//   const [form, setForm] = useState({ name:"", email:"", phone:"", city:"", password:"", role:"renter" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const u = (k, v) => setForm(f => ({ ...f, [k]: v }));

//   const submit = () => {
//     setError("");
//     if (mode === "signup") {
//       if (!form.name || !form.email || !form.phone || !form.password) { setError("Please fill all required fields."); return; }
//       if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
//       setLoading(true);
//       setTimeout(() => { handleSignup({ ...form, joinedDate: new Date().toLocaleDateString("en-IN") }); setLoading(false); }, 700);
//     } else {
//       if (!form.email || !form.password) { setError("Please enter email and password."); return; }
//       setLoading(true);
//       setTimeout(() => { handleLogin({ ...form, name: form.name || form.email.split("@")[0] }); setLoading(false); }, 700);
//     }
//   };

//   const Field = ({ k, label, ph, type = "text" }) => (
//     <div style={{ marginBottom: 16 }}>
//       <label style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem", color:"#080808ff", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</label>
//       <input type={type} placeholder={ph} value={form[k]} onChange={e => u(k, e.target.value)}
//         style={{ width:"100%", padding:"11px 15px", border:"1.5px solid #e5e5e5", borderRadius:10, fontFamily:"'DM Sans',sans-serif", fontSize:"0.93rem", outline:"none", background:"#f9f4f4ff", transition:"border .2s" }}
//         onFocus={e => e.target.style.borderColor="#FF6B00"}
//         onBlur={e => e.target.style.borderColor="#e5e5e5"} />
//     </div>
//   );
  

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
//         .qr-overlay{position:fixed;inset:0;z-index:2000;background:rgba(0,0,0,0.52);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;padding:16px;animation:ovIn .2s ease;}
//         @keyframes ovIn{from{opacity:0}to{opacity:1}}
//         @keyframes boxIn{from{opacity:0;transform:translateY(28px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
//         .qr-modal{background:#fff;border-radius:24px;width:100%;max-width:450px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,0.18);animation:boxIn .28s ease;}
//         .qr-modal-head{background:#FF6B00;padding:32px 36px 26px;position:relative;}
//         .qr-modal-close{position:absolute;top:14px;right:16px;width:30px;height:30px;background:rgba(255,255,255,0.2);border:none;border-radius:50%;color:#fff;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;}
//         .qr-modal-close:hover{background:rgba(255,255,255,0.35);}
//         .qr-modal-title{font-family:'Syne',sans-serif;font-size:1.7rem;font-weight:800;color:#fff;line-height:1.1;}
//         .qr-modal-sub{font-family:'DM Sans',sans-serif;font-size:0.88rem;color:rgba(255,255,255,0.75);margin-top:5px;}
//         .qr-modal-body{padding:28px 36px;}
//         .qr-role-row{display:flex;gap:10px;margin-bottom:18px;}
//         .qr-role-btn{flex:1;padding:12px 8px;border-radius:12px;border:1.5px solid #e5e5e5;background:#fafafa;font-family:'DM Sans',sans-serif;font-size:0.88rem;cursor:pointer;transition:all .2s;font-weight:500;text-align:center;}
//         .qr-role-btn.active{border-color:#FF6B00;background:#fff5ee;color:#FF6B00;}
//         .qr-role-desc{font-size:0.75rem;color:#aaa;margin-top:3px;}
//         .qr-submit{width:100%;padding:13px;background:#FF6B00;color:#fff;border:none;border-radius:50px;font-family:'Syne',sans-serif;font-size:0.97rem;font-weight:700;cursor:pointer;transition:all .2s;margin-top:6px;}
//         .qr-submit:hover{background:#e05e00;transform:translateY(-1px);}
//         .qr-submit:disabled{background:#ccc;cursor:not-allowed;transform:none;}
//         .qr-switch{text-align:center;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:#888;margin-top:16px;}
//         .qr-switch a{color:#FF6B00;font-weight:600;cursor:pointer;text-decoration:underline;}
//         .qr-err{background:#fff5f5;border:1px solid #fcc;color:#e53e3e;border-radius:10px;padding:9px 13px;font-family:'DM Sans',sans-serif;font-size:0.83rem;margin-bottom:14px;}
//         .two-col{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
//       `}</style>

//       <div className="qr-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
//         <div className="qr-modal">
//           <div className="qr-modal-head">
//             <button className="qr-modal-close" onClick={onClose}>✕</button>
//             <div className="qr-modal-title">{mode === "signup" ? "Create Account" : "Welcome Back"}</div>
//             <div className="qr-modal-sub">{mode === "signup" ? "Join QuickRent today" : "Log in to your account"}</div>
//           </div>

//           <div className="qr-modal-body">
//             {error && <div className="qr-err">⚠ {error}</div>}

//             {/* Role selector — only on signup */}
//             {mode === "signup" && (
//               <div style={{ marginBottom: 18 }}>
//                 <label style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem", color:"#777", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.5px" }}>I want to</label>
//                 <div className="qr-role-row">
//                   <div className={`qr-role-btn ${form.role === "renter" ? "active" : ""}`} onClick={() => u("role", "renter")}>
//                     🔑 Rent Items
//                     <div className="qr-role-desc">Browse &amp; rent items</div>
//                   </div>
//                   <div className={`qr-role-btn ${form.role === "lister" ? "active" : ""}`} onClick={() => u("role", "lister")}>
//                     🏠 List Items
//                     <div className="qr-role-desc">List &amp; rent out my items</div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {mode === "signup" && (
//               <div className="two-col">
//                 <Field k="name" label="Full Name *" ph="Rahul Sharma" />
//                 <Field k="phone" label="Phone *" ph="+91 9876543210" />
//               </div>
//             )}

//             <Field k="email" label="Email Address *" ph="you@example.com" type="email" />
//             {mode === "signup" && <Field k="city" label="City" ph="Pune, Mumbai..." />}
//             <Field k="password" label="Password *" ph="••••••••" type="password" />

//             <button className="qr-submit" onClick={submit} disabled={loading}>
//               {loading ? "Please wait..." : mode === "signup" ? "Create Account →" : "Login →"}
//             </button>

//             <div className="qr-switch">
//               {mode === "signup"
//                 ? <>Already have an account? <a onClick={() => switchMode("login")}>Login</a></>
//                 : <>New here? <a onClick={() => switchMode("signup")}>Create account</a></>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



//---------------------------------------------

import { useState } from "react";
import { useAuth } from "../App";

// ─── Floating label + scrolling hint field ───────────────────────────────────
const Field = ({ k, label, hint, type = "text", value, onChange, showToggle }) => {
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(false);
  const inputType = type === "password" && showToggle ? (visible ? "text" : "password") : type;

  return (
    <div className="qr-field">
      <label className={`qr-label ${focus || value ? "active" : ""}`}>{label}</label>

      {!value && !focus && (
        <div className="qr-scroll-hint">
          <span>{hint}</span>
        </div>
      )}

      <input
        type={inputType}
        value={value}
        className="qr-input"
        style={{ paddingRight: type === "password" && showToggle ? 78 : 14 }}
        onChange={(e) => onChange(k, e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />

      {type === "password" && showToggle && (
        <button
          type="button"
          className="qr-password-toggle"
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? "👁" : "🙈"}
        </button>
      )}
    </div>
  );
};

// ─── Helpers: accounts stored in localStorage ────────────────────────────────
const ACCOUNTS_KEY = "qr_accounts";

const getAccounts = () => {
  try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || []; }
  catch { return []; }
};

const saveAccount = (user) => {
  const accounts = getAccounts();
  // avoid duplicate emails
  const filtered = accounts.filter(a => a.email !== user.email);
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...filtered, user]));
};

const findAccount = (email) => {
  return getAccounts().find(a => a.email.toLowerCase() === email.toLowerCase()) || null;
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function AuthModal({ mode, onClose, switchMode }) {
  const { handleLogin, handleSignup } = useAuth();

  const [form, setForm] = useState({
    name: "", email: "", phone: "", city: "", password: "", role: "renter",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (k, v) => {
    if (k === "phone") v = v.replace(/[^0-9]/g, "").slice(0, 10);
    if (k === "name")  v = v.replace(/[^a-zA-Z ]/g, "");
    if (k === "city")  v = v.replace(/[^a-zA-Z ]/g, "");
    setForm((f) => ({ ...f, [k]: v }));
  };

  const submit = () => {
    setError("");
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phoneRegex = /^[0-9]{10}$/;

    // ── SIGNUP ──────────────────────────────────────────────────────────────
    if (mode === "signup") {
      if (!form.name || !form.email || !form.phone || !form.password) {
        setError("Please fill all required fields"); return;
      }
      if (!gmailRegex.test(form.email)) {
        setError("Email must end with @gmail.com"); return;
      }
      if (!phoneRegex.test(form.phone)) {
        setError("Phone number must be exactly 10 digits"); return;
      }
      if (form.password.length < 6) {
        setError("Password must be at least 6 characters"); return;
      }

      // Check if email already registered
      if (findAccount(form.email)) {
        setError("An account with this email already exists. Please login instead.");
        return;
      }

      setLoading(true);
      setTimeout(() => {
        const newUser = {
          ...form,
          id: Date.now(),
          joinedDate: new Date().toLocaleDateString("en-IN"),
        };
        // Save to accounts registry (for future logins)
        saveAccount(newUser);
        // Log the user in
        handleSignup(newUser);
        setLoading(false);
      }, 700);
    }

    // ── LOGIN ───────────────────────────────────────────────────────────────
    else {
      if (!form.email || !form.password) {
        setError("Please enter your email and password"); return;
      }

      setLoading(true);
      setTimeout(() => {
        // Look up account by email
        const account = findAccount(form.email);

        if (!account) {
          setError("No account found with this email. Please create an account first.");
          setLoading(false);
          return;
        }

        if (account.password !== form.password) {
          setError("Incorrect password. Please try again.");
          setLoading(false);
          return;
        }

        // ✅ Credentials match — load the FULL saved profile
        handleLogin(account);
        setLoading(false);
      }, 700);
    }
  };

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .qr-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center;padding:20px;z-index:2000;backdrop-filter:blur(6px);}
        .qr-modal{width:92%;max-width:720px;background:white;border-radius:26px;overflow:hidden;box-shadow:0 40px 90px rgba(0,0,0,0.25);}
        .qr-head{background:linear-gradient(135deg,#FF6B00,#ff8a3d);padding:40px;color:white;position:relative;}
        .qr-close{position:absolute;right:18px;top:18px;background:rgba(255,255,255,0.2);border:none;color:white;font-size:18px;width:34px;height:34px;border-radius:50%;cursor:pointer;}
        .qr-title{font-family:'Syne';font-size:2rem;font-weight:800;}
        .qr-sub{font-family:'DM Sans';font-size:.95rem;opacity:.9;margin-top:6px;}
        .qr-body{padding:40px;}

        .qr-role{display:flex;gap:14px;margin-bottom:24px;}
        .qr-role-btn{flex:1;border:1.5px solid #eee;padding:14px;border-radius:14px;cursor:pointer;background:#fafafa;text-align:center;font-family:'DM Sans';}
        .qr-role-btn.active{border-color:#FF6B00;background:#fff3ea;color:#FF6B00;font-weight:600;}

        .qr-field{position:relative;margin-bottom:20px;}
        .qr-input{width:100%;padding:16px 14px;border-radius:12px;border:1.5px solid #e6e6e6;font-family:'DM Sans';font-size:.95rem;outline:none;background:white;color:#000;caret-color:#000;position:relative;z-index:2;}
        .qr-input:focus{border-color:#FF6B00;}

        .qr-label{position:absolute;left:14px;top:14px;font-size:.9rem;color:#999;font-family:'DM Sans';pointer-events:none;transition:.2s;background:white;padding:0 6px;z-index:3;}
        .qr-label.active{top:-7px;font-size:.75rem;color:#FF6B00;}

        .qr-scroll-hint{position:absolute;left:14px;right:14px;top:16px;overflow:hidden;white-space:nowrap;pointer-events:none;color:#bbb;font-size:.9rem;font-family:'DM Sans';z-index:1;}
        .qr-scroll-hint span{display:inline-block;padding-left:100%;animation:scrollHint 10s linear infinite;}
        @keyframes scrollHint{0%{transform:translateX(0);}100%{transform:translateX(-100%);}}

        .qr-password-toggle{position:absolute;right:14px;top:50%;transform:translateY(-50%);border:none;background:transparent;color:#FF6B00;font-family:'DM Sans';font-size:.95rem;font-weight:700;cursor:pointer;padding:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;z-index:3;}

        .qr-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}

        .qr-btn{width:100%;padding:16px;background:#FF6B00;border:none;border-radius:50px;color:white;font-family:'Syne';font-size:1rem;font-weight:700;cursor:pointer;margin-top:10px;transition:all .2s;}
        .qr-btn:hover{background:#e05e00;transform:translateY(-1px);}
        .qr-btn:disabled{background:#ccc;cursor:not-allowed;transform:none;}

        .qr-error{background:#fff5f5;border:1px solid #ffcaca;color:#d93c3c;padding:10px 14px;border-radius:10px;margin-bottom:18px;font-family:'DM Sans';font-size:.85rem;}

        /* "No account" quick link inside error */
        .qr-error-link{color:#FF6B00;font-weight:600;cursor:pointer;text-decoration:underline;margin-left:4px;}

        .qr-footer-row{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:18px;font-family:'DM Sans';font-size:.9rem;flex-wrap:wrap;}
        .qr-footer-row--center{justify-content:center;}
        .qr-switch{color:#666;}
        .qr-switch span{color:#FF6B00;font-weight:600;cursor:pointer;}
        .qr-forgot-button{background:none;border:none;color:#FF6B00;font-weight:700;cursor:pointer;padding:0;font-size:inherit;}
        .qr-forgot-button:hover{color:#e05e00;}

        @media(max-width:650px){
          .qr-grid{grid-template-columns:1fr;}
          .qr-modal{max-width:95%;}
          .qr-head{padding:30px;}
          .qr-body{padding:28px;}
        }
      `}</style>

      <div className="qr-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="qr-modal">

          <div className="qr-head">
            <button className="qr-close" onClick={onClose}>✕</button>
            <div className="qr-title">{mode === "signup" ? "Create Account" : "Welcome Back"}</div>
            <div className="qr-sub">{mode === "signup" ? "Join QuickRent today" : "Login to continue"}</div>
          </div>

          <div className="qr-body">

            {/* Error message — with quick switch to signup if no account found */}
            {error && (
              <div className="qr-error">
                ⚠ {error}
                {error.includes("No account found") && (
                  <span className="qr-error-link" onClick={() => { setError(""); switchMode("signup"); }}>
                    Sign up here
                  </span>
                )}
                {error.includes("already exists") && (
                  <span className="qr-error-link" onClick={() => { setError(""); switchMode("login"); }}>
                    Login here
                  </span>
                )}
              </div>
            )}

            {/* Role selector — signup only */}
            {mode === "signup" && (
              <div className="qr-role">
                <div className={`qr-role-btn ${form.role === "renter" ? "active" : ""}`} onClick={() => updateField("role", "renter")}>
                  🔑 Rent Items
                </div>
                <div className={`qr-role-btn ${form.role === "lister" ? "active" : ""}`} onClick={() => updateField("role", "lister")}>
                  🏠 List Items
                </div>
              </div>
            )}

            {/* Signup-only fields */}
            {mode === "signup" && (
              <div className="qr-grid">
                <Field k="name"  label="Full Name"     hint="Enter your full name"        value={form.name}  onChange={updateField} />
                <Field k="phone" label="Phone Number"  hint="Enter 10 digit phone number" value={form.phone} onChange={updateField} />
              </div>
            )}

            <Field k="email"    label="Email Address" hint="example@gmail.com"           value={form.email}    onChange={updateField} />
            {mode === "signup" && (
              <Field k="city"   label="City"           hint="Enter your city"             value={form.city}     onChange={updateField} />
            )}
            <Field k="password" label="Password"       hint="Use letters, numbers & symbols" type="password" value={form.password} onChange={updateField} showToggle />

            <button className="qr-btn" onClick={submit} disabled={loading}>
              {loading ? "Please wait..." : mode === "signup" ? "Create Account →" : "Login →"}
            </button>

            <div className={`qr-footer-row ${mode === "signup" ? "qr-footer-row--center" : ""}`}>
              {mode === "login" ? (
                <>
                  <button
                    type="button"
                    className="qr-forgot-button"
                    onClick={() => { setError(""); switchMode("forgot"); }}
                  >
                    Forgot password?
                  </button>
                  <div className="qr-switch">
                    New here? <span onClick={() => { setError(""); switchMode("signup"); }}>Create account</span>
                  </div>
                </>
              ) : (
                <div className="qr-switch">
                  Already have an account? <span onClick={() => { setError(""); switchMode("login"); }}>Login</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}