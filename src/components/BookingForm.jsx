import { useState } from "react";
import { useAuth, useApp } from "../App";

export default function BookingForm({ item, onClose, onSuccess }) {
  const { user } = useAuth();
  const { rentItem } = useApp();
  const today = new Date().toISOString().split("T")[0];

  const [step, setStep] = useState(1); // 1 = booking details, 2 = pre-order summary
  const [form, setForm] = useState({
    startDate: today,
    endDate: "",
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const u = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const days = form.startDate && form.endDate
    ? Math.max(0, Math.ceil((new Date(form.endDate) - new Date(form.startDate)) / 86400000))
    : 0;

  const rentTotal = days * item.price;
  const platformFee = Math.round(rentTotal * 0.02);
  const grandTotal = rentTotal + item.deposit + platformFee;

  // ── Step 1 validation ────────────────────────────────────────────
  const validateStep1 = () => {
    const e = {};
    if (!form.startDate) e.startDate = "Select a start date";
    if (!form.endDate)   e.endDate = "Select an end date";
    if (days <= 0)       e.endDate = "End date must be after start date";
    if (!form.name.trim())  e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!/^[0-9]{10}$/.test(form.phone)) e.phone = "Enter valid 10-digit phone";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goToSummary = () => {
    if (validateStep1()) setStep(2);
  };

  // ── Confirm booking ──────────────────────────────────────────────
  const confirmBooking = () => {
    const receipt = rentItem({
      itemId: item.id,
      itemTitle: item.title,
      itemOwnerId: item.ownerId,
      startDate: form.startDate,
      endDate: form.endDate,
      days,
      totalPrice: rentTotal,
      platformFee,
      deposit: item.deposit,
      grandTotal,
      message: form.message,
      renterName: form.name,
      renterPhone: form.phone,
    });
    onSuccess(receipt);
  };

  const inpStyle = (k) => ({
    width: "100%", padding: "11px 14px",
    border: `1.5px solid ${errors[k] ? "#e53e3e" : "#000000"}`,
    borderRadius: 10, fontFamily: "'DM Sans',sans-serif",
    fontSize: "0.92rem", outline: "none",
    background: "#f5f5f5", color: "#000",
  });

  const Label = ({ children }) => (
    <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", color: "#666", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.5px" }}>
      {children}
    </label>
  );

  const ErrMsg = ({ k }) => errors[k]
    ? <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.73rem", color: "#e53e3e", marginTop: 4 }}>⚠ {errors[k]}</div>
    : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .bf-overlay {
          position: fixed; inset: 0; z-index: 3000;
          background: rgba(0,0,0,0.55); backdrop-filter: blur(5px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px; animation: bfFadeIn .2s ease;
        }
        @keyframes bfFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes bfSlideUp { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }

        .bf-modal {
          background: #fff; border-radius: 24px;
          width: 100%; max-width: 520px;
          max-height: 92vh; overflow-y: auto;
          box-shadow: 0 32px 80px rgba(0,0,0,0.2);
          animation: bfSlideUp .28s ease;
        }

        .bf-head {
          background: linear-gradient(135deg, #FF6B00, #ff9a3c);
          padding: 24px 28px 20px; position: relative;
        }
        .bf-close {
          position: absolute; top: 14px; right: 16px;
          width: 30px; height: 30px; border-radius: 50%;
          background: rgba(255,255,255,0.2); border: none;
          color: #fff; font-size: 1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .bf-close:hover { background: rgba(255,255,255,0.35); }
        .bf-head-title { font-family: 'Syne',sans-serif; font-size: 1.3rem; font-weight: 800; color: #fff; }
        .bf-head-sub { font-family: 'DM Sans',sans-serif; font-size: 0.83rem; color: rgba(255,255,255,0.8); margin-top: 3px; }

        /* Item mini card inside modal */
        .bf-item-mini {
          display: flex; gap: 12px; align-items: center;
          background: rgba(255,255,255,0.15); border-radius: 12px;
          padding: 10px 12px; margin-top: 14px;
        }
        .bf-item-mini-img {
          width: 44px; height: 44px; border-radius: 10px;
          background: rgba(255,255,255,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem; overflow: hidden; flex-shrink: 0;
        }
        .bf-item-mini-img img { width: 100%; height: 100%; object-fit: cover; }
        .bf-item-mini-name { font-family: 'Syne',sans-serif; font-weight: 700; font-size: 0.9rem; color: #fff; }
        .bf-item-mini-price { font-family: 'DM Sans',sans-serif; font-size: 0.78rem; color: rgba(255,255,255,0.8); margin-top: 1px; }

        .bf-body { padding: 24px 28px; }

        /* Step indicator */
        .bf-steps {
          display: flex; align-items: center; gap: 0;
          margin-bottom: 24px;
        }
        .bf-step {
          display: flex; align-items: center; gap: 6px;
          font-family: 'DM Sans',sans-serif; font-size: 0.82rem;
          font-weight: 500; color: #bbb;
        }
        .bf-step.active { color: #FF6B00; }
        .bf-step.done { color: #2e7d32; }
        .bf-step-num {
          width: 24px; height: 24px; border-radius: 50%;
          background: #e5e5e5; color: #aaa;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 700; flex-shrink: 0;
        }
        .bf-step.active .bf-step-num { background: #FF6B00; color: #fff; }
        .bf-step.done .bf-step-num { background: #2e7d32; color: #fff; }
        .bf-step-line { flex: 1; height: 2px; background: #e5e5e5; margin: 0 8px; }
        .bf-step-line.done { background: #2e7d32; }

        .bf-field { margin-bottom: 14px; }
        .bf-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        /* Summary card */
        .bf-summary {
          background: #fff8f5; border-radius: 16px;
          padding: 18px; margin-bottom: 18px;
          border: 1px solid #ffe0cc;
        }
        .bf-sum-title {
          font-family: 'Syne',sans-serif; font-weight: 700;
          font-size: 0.9rem; color: #1a1a1a; margin-bottom: 12px;
        }
        .bf-sum-row {
          display: flex; justify-content: space-between;
          font-family: 'DM Sans',sans-serif; font-size: 0.88rem;
          padding: 6px 0; color: #555;
        }
        .bf-sum-row.total {
          font-family: 'Syne',sans-serif; font-weight: 800;
          font-size: 1.05rem; color: #FF6B00;
          border-top: 1.5px solid #ffe0cc; margin-top: 8px; padding-top: 12px;
        }
        .bf-sum-row.fee { color: #aaa; font-size: 0.8rem; }

        /* Renter info summary */
        .bf-renter-box {
          background: #f7f7f7; border-radius: 14px;
          padding: 14px 16px; margin-bottom: 16px;
        }
        .bf-renter-label {
          font-family: 'Syne',sans-serif; font-weight: 700;
          font-size: 0.85rem; color: #1a1a1a; margin-bottom: 8px;
        }
        .bf-renter-row {
          display: flex; justify-content: space-between;
          font-family: 'DM Sans',sans-serif; font-size: 0.84rem;
          color: #555; padding: 3px 0;
        }
        .bf-renter-row span:first-child { color: #999; }

        .bf-btn {
          width: 100%; padding: 13px; border: none; border-radius: 50px;
          font-family: 'Syne',sans-serif; font-weight: 700;
          font-size: 0.97rem; cursor: pointer; transition: all .2s;
        }
        .bf-btn-primary { background: #FF6B00; color: #fff; }
        .bf-btn-primary:hover { background: #e05e00; transform: translateY(-1px); }
        .bf-btn-secondary {
          background: transparent; color: #888; margin-top: 8px;
          font-size: 0.88rem; font-family: 'DM Sans',sans-serif;
        }

        .bf-note {
          font-family: 'DM Sans',sans-serif; font-size: 0.76rem;
          color: #aaa; text-align: center; margin-top: 10px; line-height: 1.5;
        }

        @media(max-width: 540px) {
          .bf-two-col { grid-template-columns: 1fr; }
          .bf-modal { border-radius: 20px 20px 0 0; max-height: 95vh; }
          .bf-overlay { align-items: flex-end; padding: 0; }
        }
      `}</style>

      <div className="bf-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="bf-modal">

          {/* Header */}
          <div className="bf-head">
            <button className="bf-close" onClick={onClose}>✕</button>
            <div className="bf-head-title">
              {step === 1 ? "Book This Item" : "Confirm Booking"}
            </div>
            <div className="bf-head-sub">
              {step === 1 ? "Fill in your booking details" : "Review before confirming"}
            </div>

            {/* Item mini preview */}
            <div className="bf-item-mini">
              <div className="bf-item-mini-img">
                {(item.images?.[0] || item.image)
                  ? <img src={item.images?.[0] || item.image} alt={item.title} />
                  : "📦"}
              </div>
              <div>
                <div className="bf-item-mini-name">{item.title}</div>
                <div className="bf-item-mini-price">₹{item.price}/day · 📍 {item.city}</div>
              </div>
            </div>
          </div>

          <div className="bf-body">

            {/* Step indicator */}
            <div className="bf-steps">
              <div className={`bf-step ${step >= 1 ? (step > 1 ? "done" : "active") : ""}`}>
                <div className="bf-step-num">{step > 1 ? "✓" : "1"}</div>
                Details
              </div>
              <div className={`bf-step-line ${step > 1 ? "done" : ""}`} />
              <div className={`bf-step ${step === 2 ? "active" : ""}`}>
                <div className="bf-step-num">2</div>
                Summary
              </div>
            </div>

            {/* ── STEP 1: Booking Details ── */}
            {step === 1 && (
              <>
                {/* Dates */}
                <div className="bf-two-col">
                  <div className="bf-field">
                    <Label>Start Date *</Label>
                    <input
                      type="date" min={today} value={form.startDate}
                      onChange={e => u("startDate", e.target.value)}
                      style={inpStyle("startDate")}
                    />
                    <ErrMsg k="startDate" />
                  </div>
                  <div className="bf-field">
                    <Label>End Date *</Label>
                    <input
                      type="date" min={form.startDate || today} value={form.endDate}
                      onChange={e => u("endDate", e.target.value)}
                      style={inpStyle("endDate")}
                    />
                    <ErrMsg k="endDate" />
                  </div>
                </div>

                {/* Days calculated */}
                {days > 0 && (
                  <div style={{ background: "#e8f5e9", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#2e7d32", fontWeight: 600 }}>
                    📅 {days} day{days > 1 ? "s" : ""} · Estimated rent: ₹{rentTotal}
                  </div>
                )}

                {/* Renter Info */}
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "#1a1a1a", margin: "4px 0 14px" }}>
                  Your Details
                </div>

                <div className="bf-field">
                  <Label>Full Name *</Label>
                  <input value={form.name} onChange={e => u("name", e.target.value)} placeholder="Rahul Sharma" style={inpStyle("name")} />
                  <ErrMsg k="name" />
                </div>

                <div className="bf-two-col">
                  <div className="bf-field">
                    <Label>Phone *</Label>
                    <input value={form.phone} onChange={e => u("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="9876543210" style={inpStyle("phone")} />
                    <ErrMsg k="phone" />
                  </div>
                  <div className="bf-field">
                    <Label>Email</Label>
                    <input value={form.email} onChange={e => u("email", e.target.value)} placeholder="you@gmail.com" style={inpStyle("email")} />
                  </div>
                </div>

                <div className="bf-field">
                  <Label>Message to Owner (optional)</Label>
                  <textarea
                    value={form.message} onChange={e => u("message", e.target.value)}
                    placeholder="Any special requirements or questions for the owner..."
                    rows={3}
                    style={{ ...inpStyle("message"), resize: "vertical" }}
                  />
                </div>

                <button className="bf-btn bf-btn-primary" onClick={goToSummary}>
                  Review Booking →
                </button>
                <button className="bf-btn bf-btn-secondary" onClick={onClose}>Cancel</button>
              </>
            )}

            {/* ── STEP 2: Pre-Order Summary ── */}
            {step === 2 && (
              <>
                {/* Price breakdown */}
                <div className="bf-summary">
                  <div className="bf-sum-title">💰 Price Breakdown</div>

                  <div className="bf-sum-row">
                    <span>Rent (₹{item.price} × {days} day{days > 1 ? "s" : ""})</span>
                    <span>₹{rentTotal}</span>
                  </div>
                  <div className="bf-sum-row">
                    <span>Refundable Deposit</span>
                    <span>₹{item.deposit}</span>
                  </div>
                  <div className="bf-sum-row fee">
                    <span>Platform fee (2%)</span>
                    <span>₹{platformFee}</span>
                  </div>
                  <div className="bf-sum-row total">
                    <span>Total Payable</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                {/* Rental dates summary */}
                <div className="bf-summary" style={{ background: "#f0f7ff", borderColor: "#cce0ff" }}>
                  <div className="bf-sum-title">📅 Rental Period</div>
                  <div className="bf-sum-row">
                    <span>From</span>
                    <span style={{ fontWeight: 600 }}>{new Date(form.startDate).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <div className="bf-sum-row">
                    <span>To</span>
                    <span style={{ fontWeight: 600 }}>{new Date(form.endDate).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <div className="bf-sum-row">
                    <span>Duration</span>
                    <span style={{ fontWeight: 600 }}>{days} day{days > 1 ? "s" : ""}</span>
                  </div>
                </div>

                {/* Renter info summary */}
                <div className="bf-renter-box">
                  <div className="bf-renter-label">👤 Your Details</div>
                  {[["Name", form.name], ["Phone", form.phone], ["Email", form.email || "—"]].map(([k, v]) => (
                    <div className="bf-renter-row" key={k}>
                      <span>{k}</span><span>{v}</span>
                    </div>
                  ))}
                  {form.message && (
                    <div style={{ marginTop: 8, fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#777", borderTop: "1px solid #e5e5e5", paddingTop: 8 }}>
                      💬 "{form.message}"
                    </div>
                  )}
                </div>

                <button className="bf-btn bf-btn-primary" onClick={confirmBooking}>
                  ✅ Confirm Booking — ₹{grandTotal}
                </button>
                <button className="bf-btn bf-btn-secondary" onClick={() => setStep(1)}>
                  ← Edit Details
                </button>

                <div className="bf-note">
                  🔒 Payment gateway will be integrated soon.<br />
                  By confirming, you agree to our rental terms.
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}