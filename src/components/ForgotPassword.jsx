import { useState } from "react";

const Field = ({ label, hint, type = "text", value, onChange, showToggle }) => {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const active = focused || Boolean(value);
  const inputType = type === "password" && showToggle ? (visible ? "text" : "password") : type;

  return (
    <div className="fp-field">
      <label className={`fp-label ${active ? "active" : ""}`}>{label}</label>
      <input
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="fp-input"
        placeholder={active ? "" : hint}
        autoComplete="off"
      />
      {type === "password" && showToggle && (
        <button
          type="button"
          className="fp-toggle"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? "👁️" : "🙈"}
        </button>
      )}
    </div>
  );
};

export default function ForgotPassword({ onBack }) {
  const [view, setView] = useState("forgot");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetErrors = () => setError("");

  const handleSendResetLink = () => {
    setError("");
    if (!email.trim()) {
      setError("Please enter your registered email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView("sent");
    }, 800);
  };

  const handleUpdatePassword = () => {
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView("updated");
    }, 700);
  };

  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack();
      return;
    }
    setView("forgot");
    setError("");
  };

  const forgotDisabled = loading || email.trim().length === 0;
  const resetDisabled = loading || password.trim().length === 0 || confirmPassword.trim().length === 0;

  return (
    <div className="fp-shell">
      <style>{`
        .fp-shell{position:fixed;inset:0;z-index:2200;background:rgba(10,10,10,0.28);display:flex;align-items:center;justify-content:center;padding:18px;backdrop-filter:blur(4px);}
        .fp-card{width:100%;max-width:430px;background:#fafafa;border:1px solid rgba(255,107,0,0.12);border-radius:28px;box-shadow:0 30px 80px rgba(0,0,0,0.18);overflow:hidden;}
        .fp-panel{padding:34px 28px;position:relative;min-height:360px;transition:all .28s ease;}
        .fp-title{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:#1e1e1e;margin:0;line-height:1.05;}
        .fp-subtitle{font-family:'DM Sans',sans-serif;font-size:.96rem;color:#545454;margin-top:10px;line-height:1.6;}
        .fp-note{font-family:'DM Sans',sans-serif;font-size:.94rem;color:#666;margin-top:16px;}
        .fp-field{position:relative;margin-top:24px;}
        .fp-input{width:100%;padding:18px 16px 16px;border-radius:18px;border:1.5px solid #e6e6e6;background:white;color:#1a1a1a;font-size:.96rem;font-family:'DM Sans',sans-serif;outline:none;transition:box-shadow .22s ease,border-color .22s ease;}
        .fp-input:focus{border-color:#FF6B00;box-shadow:0 0 0 5px rgba(255,107,0,0.12);}
        .fp-label{position:absolute;left:16px;top:18px;pointer-events:none;font-family:'DM Sans',sans-serif;font-size:.92rem;color:#8f8f8f;background:#fafafa;padding:0 6px;transition:all .22s ease;}
        .fp-label.active{top:-8px;font-size:.76rem;color:#FF6B00;letter-spacing:.02em;}
        .fp-toggle{position:absolute;right:14px;top:50%;transform:translateY(-50%);border:none;background:transparent;color:#FF6B00;font-size:1rem;cursor:pointer;padding:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;}
        .fp-button{width:100%;padding:16px 18px;border:none;border-radius:999px;background:#FF6B00;color:white;font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;cursor:pointer;transition:all .22s ease;margin-top:24px;}
        .fp-button:hover{background:#e35d00;transform:translateY(-1px);}
        .fp-button:disabled{background:#d8d8d8;color:#9a9a9a;cursor:not-allowed;transform:none;}
        .fp-secondary{margin-top:20px;text-align:center;font-family:'DM Sans',sans-serif;font-size:.92rem;color:#666;}
        .fp-secondary button{background:none;border:none;color:#FF6B00;font-weight:700;cursor:pointer;padding:0;margin-left:6px;transition:color .2s;}
        .fp-secondary button:hover{color:#d84e00;}
        .fp-error{margin-top:18px;padding:14px 16px;border:1px solid #ffc4bd;background:#fff1ed;color:#912d0f;border-radius:16px;font-family:'DM Sans',sans-serif;font-size:.9rem;}
        .fp-success{display:flex;flex-direction:column;align-items:center;text-align:center;padding-top:10px;}
        .fp-success-icon{width:86px;height:86px;border-radius:50%;background:#fff2e5;color:#FF6B00;font-size:2.4rem;display:flex;align-items:center;justify-content:center;box-shadow:0 14px 40px rgba(255,107,0,0.16);margin:0 auto 18px;}
        .fp-success-title{font-family:'Syne',sans-serif;font-size:1.55rem;color:#1e1e1e;margin:0;}
        .fp-success-copy{font-family:'DM Sans',sans-serif;font-size:.96rem;color:#5f5f5f;margin-top:12px;line-height:1.7;}
        .fp-link{text-align:center;margin-top:26px;font-family:'DM Sans',sans-serif;font-size:.92rem;color:#444;}
        .fp-link button{background:none;border:none;color:#FF6B00;font-weight:700;cursor:pointer;text-decoration:underline;padding:0;}
        .fp-fade{opacity:0;transform:translateY(14px);animation:fadeInUp .32s ease forwards;}
        @keyframes fadeInUp{to{opacity:1;transform:translateY(0);}}
        @media(max-width:460px){.fp-card{border-radius:24px;} .fp-panel{padding:26px;} .fp-title{font-size:1.75rem;} .fp-input{padding:16px 14px;} }
      `}</style>

      <div className="fp-card" role="dialog" aria-modal="true">
        <div className="fp-panel fp-fade">
          {view === "forgot" && (
            <>
              <h1 className="fp-title">Forgot Password</h1>
              <p className="fp-subtitle">Enter your email to receive a reset link.</p>
              <Field
                label="Email"
                hint="Enter your registered email"
                type="email"
                value={email}
                onChange={setEmail}
              />
              {error && <div className="fp-error">{error}</div>}
              <button
                className="fp-button"
                type="button"
                onClick={handleSendResetLink}
                disabled={forgotDisabled}
              >
                {loading ? "Sending link..." : "Send Reset Link"}
              </button>
              <div className="fp-secondary">
                <span>Remembered your password?</span>
                <button type="button" onClick={handleBack}>Back to Login</button>
              </div>
            </>
          )}

          {view === "sent" && (
            <>
              <div className="fp-success">
                <div className="fp-success-icon">✓</div>
                <h1 className="fp-success-title">Reset Link Sent</h1>
                <p className="fp-success-copy">
                  Reset link sent successfully. Please check your email and use the link to update your password.
                </p>
              </div>
              <button className="fp-button" type="button" onClick={handleBack}>
                Back to Login
              </button>
              <div className="fp-link">
                <span>Already have a reset link?</span>
                <button type="button" onClick={() => { resetErrors(); setView("reset"); }}>
                  Open Reset Screen
                </button>
              </div>
            </>
          )}

          {view === "reset" && (
            <>
              <h1 className="fp-title">Reset Password</h1>
              <p className="fp-subtitle">Create a new password and confirm it below.</p>
              <Field
                label="New Password"
                hint="Enter new password"
                type="password"
                value={password}
                onChange={setPassword}
                showToggle
              />
              <Field
                label="Confirm Password"
                hint="Repeat new password"
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                showToggle
              />
              {error && <div className="fp-error">{error}</div>}
              <button
                className="fp-button"
                type="button"
                onClick={handleUpdatePassword}
                disabled={resetDisabled}
              >
                {loading ? "Updating password..." : "Update Password"}
              </button>
              <div className="fp-secondary">
                <span>Need to start over?</span>
                <button type="button" onClick={() => { resetErrors(); setView("forgot"); }}>
                  Back to Forgot Password
                </button>
              </div>
            </>
          )}

          {view === "updated" && (
            <>
              <div className="fp-success">
                <div className="fp-success-icon">✅</div>
                <h1 className="fp-success-title">Password Updated</h1>
                <p className="fp-success-copy">
                  Your password has been updated successfully. You can now log in with your new credentials.
                </p>
              </div>
              <button className="fp-button" type="button" onClick={handleBack}>
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
