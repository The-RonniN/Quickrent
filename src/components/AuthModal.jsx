import { useState } from "react";
import { useAuth } from "../App";

const Field = ({ k, label, hint, type = "text", value, onChange }) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className="qr-field">
      <label className={`qr-label ${focus || value ? "active" : ""}`}>
        {label}
      </label>

      {!value && !focus && (
        <div className="qr-scroll-hint">
          <span>{hint}</span>
        </div>
      )}

      <input
        type={type}
        value={value}
        className="qr-input"
        onChange={(e) => onChange(k, e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
};

export default function AuthModal({ mode, onClose, switchMode }) {
  const { handleLogin, handleSignup } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    role: "renter",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (k, v) => {
    if (k === "phone") {
      v = v.replace(/[^0-9]/g, "").slice(0, 10);
    }

    if (k === "name") {
      v = v.replace(/[^a-zA-Z ]/g, "");
    }

    if (k === "city") {
      v = v.replace(/[^a-zA-Z ]/g, "");
    }

    setForm((f) => ({ ...f, [k]: v }));
  };

  const submit = () => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phoneRegex = /^[0-9]{10}$/;

    setError("");

    if (mode === "signup") {
      if (!form.name || !form.email || !form.phone || !form.password) {
        setError("Please fill all required fields");
        return;
      }

      if (!gmailRegex.test(form.email)) {
        setError("Email must end with @gmail.com");
        return;
      }

      if (!phoneRegex.test(form.phone)) {
        setError("Phone number must be exactly 10 digits");
        return;
      }

      setLoading(true);

      setTimeout(() => {
        handleSignup({
          ...form,
          joinedDate: new Date().toLocaleDateString("en-IN"),
        });

        setLoading(false);
      }, 700);
    } else {
      if (!form.email || !form.password) {
        setError("Enter email and password");
        return;
      }

      setLoading(true);

      setTimeout(() => {
        handleLogin({
          ...form,
          name: form.email.split("@")[0],
        });

        setLoading(false);
      }, 700);
    }
  };

  return (
    <div>
      <style>{`

@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

.qr-overlay{
position:fixed;
inset:0;
background:rgba(0,0,0,0.55);
display:flex;
align-items:center;
justify-content:center;
padding:20px;
z-index:2000;
backdrop-filter:blur(6px);
}

.qr-modal{
width:92%;
max-width:720px;
background:white;
border-radius:26px;
overflow:hidden;
box-shadow:0 40px 90px rgba(0,0,0,0.25);
}

.qr-head{
background:linear-gradient(135deg,#FF6B00,#ff8a3d);
padding:40px;
color:white;
position:relative;
}

.qr-close{
position:absolute;
right:18px;
top:18px;
background:rgba(255,255,255,0.2);
border:none;
color:white;
font-size:18px;
width:34px;
height:34px;
border-radius:50%;
cursor:pointer;
}

.qr-title{
font-family:'Syne';
font-size:2rem;
font-weight:800;
}

.qr-sub{
font-family:'DM Sans';
font-size:.95rem;
opacity:.9;
margin-top:6px;
}

.qr-body{
padding:40px;
}

.qr-role{
display:flex;
gap:14px;
margin-bottom:24px;
}

.qr-role-btn{
flex:1;
border:1.5px solid #eee;
padding:14px;
border-radius:14px;
cursor:pointer;
background:#fafafa;
text-align:center;
font-family:'DM Sans';
}

.qr-role-btn.active{
border-color:#FF6B00;
background:#fff3ea;
color:#FF6B00;
font-weight:600;
}

.qr-field{
position:relative;
margin-bottom:20px;
}

.qr-input{
width:100%;
padding:16px 14px;
border-radius:12px;
border:1.5px solid #e6e6e6;
font-family:'DM Sans';
font-size:.95rem;
outline:none;
background:white;
color:#000;
caret-color:#000;
position:relative;
z-index:2;
}

.qr-input:focus{
border-color:#FF6B00;
}

.qr-label{
position:absolute;
left:14px;
top:14px;
font-size:.9rem;
color:#999;
font-family:'DM Sans';
pointer-events:none;
transition:.2s;
background:white;
padding:0 6px;
z-index:3;
}

.qr-label.active{
top:-7px;
font-size:.75rem;
color:#FF6B00;
}

.qr-scroll-hint{
position:absolute;
left:14px;
right:14px;
top:16px;
overflow:hidden;
white-space:nowrap;
pointer-events:none;
color:#bbb;
font-size:.9rem;
font-family:'DM Sans';
z-index:1;
}

.qr-scroll-hint span{
display:inline-block;
padding-left:100%;
animation:scrollHint 10s linear infinite;
}

@keyframes scrollHint{
0%{transform:translateX(0);}
100%{transform:translateX(-100%);}
}

.qr-grid{
display:grid;
grid-template-columns:1fr 1fr;
gap:16px;
}

.qr-btn{
width:100%;
padding:16px;
background:#FF6B00;
border:none;
border-radius:50px;
color:white;
font-family:'Syne';
font-size:1rem;
cursor:pointer;
margin-top:10px;
}

.qr-error{
background:#fff5f5;
border:1px solid #ffcaca;
color:#d93c3c;
padding:10px 14px;
border-radius:10px;
margin-bottom:18px;
font-family:'DM Sans';
font-size:.85rem;
}

.qr-switch{
text-align:center;
margin-top:18px;
font-family:'DM Sans';
font-size:.9rem;
}

.qr-switch span{
color:#FF6B00;
font-weight:600;
cursor:pointer;
}

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

            <div className="qr-title">
              {mode === "signup" ? "Create Account" : "Welcome Back"}
            </div>

            <div className="qr-sub">
              {mode === "signup" ? "Join QuickRent today" : "Login to continue"}
            </div>
          </div>

          <div className="qr-body">

            {error && <div className="qr-error">⚠ {error}</div>}

            {mode === "signup" && (
              <div className="qr-role">

                <div
                  className={`qr-role-btn ${form.role === "renter" ? "active" : ""}`}
                  onClick={() => updateField("role", "renter")}
                >
                  🔑 Rent Items
                </div>

                <div
                  className={`qr-role-btn ${form.role === "lister" ? "active" : ""}`}
                  onClick={() => updateField("role", "lister")}
                >
                  🏠 List Items
                </div>

              </div>
            )}

            {mode === "signup" && (
              <div className="qr-grid">

                <Field
                  k="name"
                  label="Full Name"
                  hint="Enter your full name"
                  value={form.name}
                  onChange={updateField}
                />

                <Field
                  k="phone"
                  label="Phone Number"
                  hint="Enter 10 digit phone number"
                  value={form.phone}
                  onChange={updateField}
                />

              </div>
            )}

            <Field
              k="email"
              label="Email Address"
              hint="example@gmail.com"
              value={form.email}
              onChange={updateField}
            />

            {mode === "signup" && (
              <Field
                k="city"
                label="City"
                hint="Enter your city"
                value={form.city}
                onChange={updateField}
              />
            )}

            <Field
              k="password"
              label="Password"
              hint="Use letters numbers & symbols"
              type="password"
              value={form.password}
              onChange={updateField}
            />

            <button className="qr-btn" onClick={submit} disabled={loading}>
              {loading ? "Please wait..." : mode === "signup" ? "Create Account →" : "Login →"}
            </button>

            <div className="qr-switch">
              {mode === "signup" ? (
                <div>
                  Already have an account?
                  <span onClick={() => switchMode("login")}> Login</span>
                </div>
              ) : (
                <div>
                  New here?
                  <span onClick={() => switchMode("signup")}> Create account</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
import axios from "axios";

const handleSignup = async () => {
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/signup/", {
      full_name: fullName,
      email: email,
      phone: phone,
      city: city,
      password: password
    });

    alert("Account created successfully");
  } catch (error) {
    console.log(error);
  }
};