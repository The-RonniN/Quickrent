// import { useState } from "react";
// import { useAuth, useApp } from "../App";

// export default function BookingForm({ item, onClose, onSuccess }) {
//   const { user } = useAuth();
//   const { rentItem } = useApp();
//   const today = new Date().toISOString().split("T")[0];

//   const [step, setStep] = useState(1); // 1 = booking details, 2 = pre-order summary
//   const [form, setForm] = useState({
//     startDate: today,
//     endDate: "",
//     name: user?.name || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//     message: "",
//   });
//   const [errors, setErrors] = useState({});

//   const u = (k, v) => setForm(f => ({ ...f, [k]: v }));

//   const days = form.startDate && form.endDate
//     ? Math.max(0, Math.ceil((new Date(form.endDate) - new Date(form.startDate)) / 86400000))
//     : 0;

//   const rentTotal = days * item.price;
//   const platformFee = Math.round(rentTotal * 0.02);
//   const grandTotal = rentTotal + item.deposit + platformFee;

//   // ── Step 1 validation ────────────────────────────────────────────
//   const validateStep1 = () => {
//     const e = {};
//     if (!form.startDate) e.startDate = "Select a start date";
//     if (!form.endDate)   e.endDate = "Select an end date";
//     if (days <= 0)       e.endDate = "End date must be after start date";
//     if (!form.name.trim())  e.name = "Name is required";
//     if (!form.phone.trim()) e.phone = "Phone is required";
//     if (!/^[0-9]{10}$/.test(form.phone)) e.phone = "Enter valid 10-digit phone";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const goToSummary = () => {
//     if (validateStep1()) setStep(2);
//   };

//   // ── Confirm booking ──────────────────────────────────────────────
//   const confirmBooking = () => {
//     const receipt = rentItem({
//       itemId: item.id,
//       itemTitle: item.title,
//       itemOwnerId: item.ownerId,
//       startDate: form.startDate,
//       endDate: form.endDate,
//       days,
//       totalPrice: rentTotal,
//       platformFee,
//       deposit: item.deposit,
//       grandTotal,
//       message: form.message,
//       renterName: form.name,
//       renterPhone: form.phone,
//     });
//     onSuccess(receipt);
//   };

//   const inpStyle = (k) => ({
//     width: "100%", padding: "11px 14px",
//     border: `1.5px solid ${errors[k] ? "#e53e3e" : "#000000"}`,
//     borderRadius: 10, fontFamily: "'DM Sans',sans-serif",
//     fontSize: "0.92rem", outline: "none",
//     background: "#f5f5f5", color: "#000",
//   });

//   const Label = ({ children }) => (
//     <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", color: "#666", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.5px" }}>
//       {children}
//     </label>
//   );

//   const ErrMsg = ({ k }) => errors[k]
//     ? <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.73rem", color: "#e53e3e", marginTop: 4 }}>⚠ {errors[k]}</div>
//     : null;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

//         .bf-overlay {
//           position: fixed; inset: 0; z-index: 3000;
//           background: rgba(0,0,0,0.55); backdrop-filter: blur(5px);
//           display: flex; align-items: center; justify-content: center;
//           padding: 16px; animation: bfFadeIn .2s ease;
//         }
//         @keyframes bfFadeIn { from{opacity:0} to{opacity:1} }
//         @keyframes bfSlideUp { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }

//         .bf-modal {
//           background: #fff; border-radius: 24px;
//           width: 100%; max-width: 520px;
//           max-height: 92vh; overflow-y: auto;
//           box-shadow: 0 32px 80px rgba(0,0,0,0.2);
//           animation: bfSlideUp .28s ease;
//         }

//         .bf-head {
//           background: linear-gradient(135deg, #FF6B00, #ff9a3c);
//           padding: 24px 28px 20px; position: relative;
//         }
//         .bf-close {
//           position: absolute; top: 14px; right: 16px;
//           width: 30px; height: 30px; border-radius: 50%;
//           background: rgba(255,255,255,0.2); border: none;
//           color: #fff; font-size: 1rem; cursor: pointer;
//           display: flex; align-items: center; justify-content: center;
//         }
//         .bf-close:hover { background: rgba(255,255,255,0.35); }
//         .bf-head-title { font-family: 'Syne',sans-serif; font-size: 1.3rem; font-weight: 800; color: #fff; }
//         .bf-head-sub { font-family: 'DM Sans',sans-serif; font-size: 0.83rem; color: rgba(255,255,255,0.8); margin-top: 3px; }

//         /* Item mini card inside modal */
//         .bf-item-mini {
//           display: flex; gap: 12px; align-items: center;
//           background: rgba(255,255,255,0.15); border-radius: 12px;
//           padding: 10px 12px; margin-top: 14px;
//         }
//         .bf-item-mini-img {
//           width: 44px; height: 44px; border-radius: 10px;
//           background: rgba(255,255,255,0.3);
//           display: flex; align-items: center; justify-content: center;
//           font-size: 1.4rem; overflow: hidden; flex-shrink: 0;
//         }
//         .bf-item-mini-img img { width: 100%; height: 100%; object-fit: cover; }
//         .bf-item-mini-name { font-family: 'Syne',sans-serif; font-weight: 700; font-size: 0.9rem; color: #fff; }
//         .bf-item-mini-price { font-family: 'DM Sans',sans-serif; font-size: 0.78rem; color: rgba(255,255,255,0.8); margin-top: 1px; }

//         .bf-body { padding: 24px 28px; }

//         /* Step indicator */
//         .bf-steps {
//           display: flex; align-items: center; gap: 0;
//           margin-bottom: 24px;
//         }
//         .bf-step {
//           display: flex; align-items: center; gap: 6px;
//           font-family: 'DM Sans',sans-serif; font-size: 0.82rem;
//           font-weight: 500; color: #bbb;
//         }
//         .bf-step.active { color: #FF6B00; }
//         .bf-step.done { color: #2e7d32; }
//         .bf-step-num {
//           width: 24px; height: 24px; border-radius: 50%;
//           background: #e5e5e5; color: #aaa;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 0.75rem; font-weight: 700; flex-shrink: 0;
//         }
//         .bf-step.active .bf-step-num { background: #FF6B00; color: #fff; }
//         .bf-step.done .bf-step-num { background: #2e7d32; color: #fff; }
//         .bf-step-line { flex: 1; height: 2px; background: #e5e5e5; margin: 0 8px; }
//         .bf-step-line.done { background: #2e7d32; }

//         .bf-field { margin-bottom: 14px; }
//         .bf-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

//         /* Summary card */
//         .bf-summary {
//           background: #fff8f5; border-radius: 16px;
//           padding: 18px; margin-bottom: 18px;
//           border: 1px solid #ffe0cc;
//         }
//         .bf-sum-title {
//           font-family: 'Syne',sans-serif; font-weight: 700;
//           font-size: 0.9rem; color: #1a1a1a; margin-bottom: 12px;
//         }
//         .bf-sum-row {
//           display: flex; justify-content: space-between;
//           font-family: 'DM Sans',sans-serif; font-size: 0.88rem;
//           padding: 6px 0; color: #555;
//         }
//         .bf-sum-row.total {
//           font-family: 'Syne',sans-serif; font-weight: 800;
//           font-size: 1.05rem; color: #FF6B00;
//           border-top: 1.5px solid #ffe0cc; margin-top: 8px; padding-top: 12px;
//         }
//         .bf-sum-row.fee { color: #aaa; font-size: 0.8rem; }

//         /* Renter info summary */
//         .bf-renter-box {
//           background: #f7f7f7; border-radius: 14px;
//           padding: 14px 16px; margin-bottom: 16px;
//         }
//         .bf-renter-label {
//           font-family: 'Syne',sans-serif; font-weight: 700;
//           font-size: 0.85rem; color: #1a1a1a; margin-bottom: 8px;
//         }
//         .bf-renter-row {
//           display: flex; justify-content: space-between;
//           font-family: 'DM Sans',sans-serif; font-size: 0.84rem;
//           color: #555; padding: 3px 0;
//         }
//         .bf-renter-row span:first-child { color: #999; }

//         .bf-btn {
//           width: 100%; padding: 13px; border: none; border-radius: 50px;
//           font-family: 'Syne',sans-serif; font-weight: 700;
//           font-size: 0.97rem; cursor: pointer; transition: all .2s;
//         }
//         .bf-btn-primary { background: #FF6B00; color: #fff; }
//         .bf-btn-primary:hover { background: #e05e00; transform: translateY(-1px); }
//         .bf-btn-secondary {
//           background: transparent; color: #888; margin-top: 8px;
//           font-size: 0.88rem; font-family: 'DM Sans',sans-serif;
//         }

//         .bf-note {
//           font-family: 'DM Sans',sans-serif; font-size: 0.76rem;
//           color: #aaa; text-align: center; margin-top: 10px; line-height: 1.5;
//         }

//         @media(max-width: 540px) {
//           .bf-two-col { grid-template-columns: 1fr; }
//           .bf-modal { border-radius: 20px 20px 0 0; max-height: 95vh; }
//           .bf-overlay { align-items: flex-end; padding: 0; }
//         }
//       `}</style>

//       <div className="bf-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
//         <div className="bf-modal">

//           {/* Header */}
//           <div className="bf-head">
//             <button className="bf-close" onClick={onClose}>✕</button>
//             <div className="bf-head-title">
//               {step === 1 ? "Book This Item" : "Confirm Booking"}
//             </div>
//             <div className="bf-head-sub">
//               {step === 1 ? "Fill in your booking details" : "Review before confirming"}
//             </div>

//             {/* Item mini preview */}
//             <div className="bf-item-mini">
//               <div className="bf-item-mini-img">
//                 {(item.images?.[0] || item.image)
//                   ? <img src={item.images?.[0] || item.image} alt={item.title} />
//                   : "📦"}
//               </div>
//               <div>
//                 <div className="bf-item-mini-name">{item.title}</div>
//                 <div className="bf-item-mini-price">₹{item.price}/day · 📍 {item.city}</div>
//               </div>
//             </div>
//           </div>

//           <div className="bf-body">

//             {/* Step indicator */}
//             <div className="bf-steps">
//               <div className={`bf-step ${step >= 1 ? (step > 1 ? "done" : "active") : ""}`}>
//                 <div className="bf-step-num">{step > 1 ? "✓" : "1"}</div>
//                 Details
//               </div>
//               <div className={`bf-step-line ${step > 1 ? "done" : ""}`} />
//               <div className={`bf-step ${step === 2 ? "active" : ""}`}>
//                 <div className="bf-step-num">2</div>
//                 Summary
//               </div>
//             </div>

//             {/* ── STEP 1: Booking Details ── */}
//             {step === 1 && (
//               <>
//                 {/* Dates */}
//                 <div className="bf-two-col">
//                   <div className="bf-field">
//                     <Label>Start Date *</Label>
//                     <input
//                       type="date" min={today} value={form.startDate}
//                       onChange={e => u("startDate", e.target.value)}
//                       style={inpStyle("startDate")}
//                     />
//                     <ErrMsg k="startDate" />
//                   </div>
//                   <div className="bf-field">
//                     <Label>End Date *</Label>
//                     <input
//                       type="date" min={form.startDate || today} value={form.endDate}
//                       onChange={e => u("endDate", e.target.value)}
//                       style={inpStyle("endDate")}
//                     />
//                     <ErrMsg k="endDate" />
//                   </div>
//                 </div>

//                 {/* Days calculated */}
//                 {days > 0 && (
//                   <div style={{ background: "#e8f5e9", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#2e7d32", fontWeight: 600 }}>
//                     📅 {days} day{days > 1 ? "s" : ""} · Estimated rent: ₹{rentTotal}
//                   </div>
//                 )}

//                 {/* Renter Info */}
//                 <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "#1a1a1a", margin: "4px 0 14px" }}>
//                   Your Details
//                 </div>

//                 <div className="bf-field">
//                   <Label>Full Name *</Label>
//                   <input value={form.name} onChange={e => u("name", e.target.value)} placeholder="Rahul Sharma" style={inpStyle("name")} />
//                   <ErrMsg k="name" />
//                 </div>

//                 <div className="bf-two-col">
//                   <div className="bf-field">
//                     <Label>Phone *</Label>
//                     <input value={form.phone} onChange={e => u("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="9876543210" style={inpStyle("phone")} />
//                     <ErrMsg k="phone" />
//                   </div>
//                   <div className="bf-field">
//                     <Label>Email</Label>
//                     <input value={form.email} onChange={e => u("email", e.target.value)} placeholder="you@gmail.com" style={inpStyle("email")} />
//                   </div>
//                 </div>

//                 <div className="bf-field">
//                   <Label>Message to Owner (optional)</Label>
//                   <textarea
//                     value={form.message} onChange={e => u("message", e.target.value)}
//                     placeholder="Any special requirements or questions for the owner..."
//                     rows={3}
//                     style={{ ...inpStyle("message"), resize: "vertical" }}
//                   />
//                 </div>

//                 <button className="bf-btn bf-btn-primary" onClick={goToSummary}>
//                   Review Booking →
//                 </button>
//                 <button className="bf-btn bf-btn-secondary" onClick={onClose}>Cancel</button>
//               </>
//             )}

//             {/* ── STEP 2: Pre-Order Summary ── */}
//             {step === 2 && (
//               <>
//                 {/* Price breakdown */}
//                 <div className="bf-summary">
//                   <div className="bf-sum-title">💰 Price Breakdown</div>

//                   <div className="bf-sum-row">
//                     <span>Rent (₹{item.price} × {days} day{days > 1 ? "s" : ""})</span>
//                     <span>₹{rentTotal}</span>
//                   </div>
//                   <div className="bf-sum-row">
//                     <span>Refundable Deposit</span>
//                     <span>₹{item.deposit}</span>
//                   </div>
//                   <div className="bf-sum-row fee">
//                     <span>Platform fee (2%)</span>
//                     <span>₹{platformFee}</span>
//                   </div>
//                   <div className="bf-sum-row total">
//                     <span>Total Payable</span>
//                     <span>₹{grandTotal}</span>
//                   </div>
//                 </div>

//                 {/* Rental dates summary */}
//                 <div className="bf-summary" style={{ background: "#f0f7ff", borderColor: "#cce0ff" }}>
//                   <div className="bf-sum-title">📅 Rental Period</div>
//                   <div className="bf-sum-row">
//                     <span>From</span>
//                     <span style={{ fontWeight: 600 }}>{new Date(form.startDate).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}</span>
//                   </div>
//                   <div className="bf-sum-row">
//                     <span>To</span>
//                     <span style={{ fontWeight: 600 }}>{new Date(form.endDate).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}</span>
//                   </div>
//                   <div className="bf-sum-row">
//                     <span>Duration</span>
//                     <span style={{ fontWeight: 600 }}>{days} day{days > 1 ? "s" : ""}</span>
//                   </div>
//                 </div>

//                 {/* Renter info summary */}
//                 <div className="bf-renter-box">
//                   <div className="bf-renter-label">👤 Your Details</div>
//                   {[["Name", form.name], ["Phone", form.phone], ["Email", form.email || "—"]].map(([k, v]) => (
//                     <div className="bf-renter-row" key={k}>
//                       <span>{k}</span><span>{v}</span>
//                     </div>
//                   ))}
//                   {form.message && (
//                     <div style={{ marginTop: 8, fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#777", borderTop: "1px solid #e5e5e5", paddingTop: 8 }}>
//                       💬 "{form.message}"
//                     </div>
//                   )}
//                 </div>

//                 <button className="bf-btn bf-btn-primary" onClick={confirmBooking}>
//                   ✅ Confirm Booking — ₹{grandTotal}
//                 </button>
//                 <button className="bf-btn bf-btn-secondary" onClick={() => setStep(1)}>
//                   ← Edit Details
//                 </button>

//                 <div className="bf-note">
//                   🔒 Payment gateway will be integrated soon.<br />
//                   By confirming, you agree to our rental terms.
//                 </div>
//               </>
//             )}

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

//-----------------------------------------------------------

// import { useState } from "react";
// import { useAuth, useApp } from "../App";
// //import { generateReceiptPDF } from "../utils/generateReceipt";
// import {generateReceiptPDF} from "../utils/generateReceipt";

// // Load Razorpay script dynamically
// function loadRazorpayScript() {
//   return new Promise((resolve) => {
//     if (window.Razorpay) { resolve(true); return; }
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// }

// // ⚠️ Replace with your Razorpay test key from dashboard.razorpay.com
// //const RAZORPAY_KEY = "";
// const RAZORPAY_KEY = "";

// export default function BookingForm({ item, onClose, onSuccess }) {
//   const { user } = useAuth();
//   const { rentItem } = useApp();
//   const today = new Date().toISOString().split("T")[0];

//   const [step, setStep] = useState(1);
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [paymentError, setPaymentError] = useState("");
//   const [form, setForm] = useState({
//     startDate: today, endDate: "",
//     name: user?.name || "", email: user?.email || "",
//     phone: user?.phone || "", message: "",
//   });
//   const [errors, setErrors] = useState({});

//   const u = (k, v) => setForm(f => ({ ...f, [k]: v }));

//   const days = form.startDate && form.endDate
//     ? Math.max(0, Math.ceil((new Date(form.endDate) - new Date(form.startDate)) / 86400000))
//     : 0;

//   const rentTotal   = days * item.price;
//   const platformFee = Math.round(rentTotal * 0.02);
//   const grandTotal  = rentTotal + item.deposit + platformFee;

//   const validateStep1 = () => {
//     const e = {};
//     if (!form.startDate) e.startDate = "Select a start date";
//     if (!form.endDate)   e.endDate   = "Select an end date";
//     if (days <= 0)       e.endDate   = "End date must be after start date";
//     if (!form.name.trim())  e.name  = "Name is required";
//     if (!form.phone.trim()) e.phone = "Phone is required";
//     if (!/^[0-9]{10}$/.test(form.phone)) e.phone = "Enter valid 10-digit phone";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const buildRentalData = (paymentId, paymentMethod) => ({
//     itemId: item.id, itemTitle: item.title,
//     itemCategory: item.category, itemCity: item.city,
//     itemCondition: item.condition, itemPrice: item.price,
//     itemOwnerId: item.ownerId,
//     startDate: form.startDate, endDate: form.endDate, days,
//     totalPrice: rentTotal, platformFee,
//     deposit: item.deposit, grandTotal,
//     message: form.message,
//     renterName: form.name, renterPhone: form.phone, renterEmail: form.email,
//     paymentId:     paymentId    || "N/A",
//     paymentMethod: paymentMethod || "Razorpay",
//     paymentStatus: paymentId ? "Paid" : "Pending",
//   });

//   // ── Razorpay ──────────────────────────────────────────────────────────────
//   const handlePayment = async () => {
//     setPaymentError("");
//     setPaymentLoading(true);
//     const loaded = await loadRazorpayScript();
//     if (!loaded) {
//       setPaymentError("Failed to load payment gateway. Check internet connection.");
//       setPaymentLoading(false);
//       return;
//     }
//     const options = {
//       key: RAZORPAY_KEY,
//       amount: grandTotal * 100,
//       currency: "INR",
//       name: "QuickRent",
//       description: `Rental: ${item.title}`,
//       prefill: { name: form.name, email: form.email, contact: form.phone },
//       notes: { item_id: item.id, start_date: form.startDate, end_date: form.endDate },
//       theme: { color: "#FF6B00" },
//       modal: { ondismiss: () => { setPaymentLoading(false); setPaymentError("Payment cancelled. Try again."); } },
//       handler: (response) => {
//         setPaymentLoading(false);
//         const rental = rentItem(buildRentalData(response.razorpay_payment_id, "Razorpay"));
//         onSuccess(rental);
//       },
//     };
//     try {
//       const rzp = new window.Razorpay(options);
//       rzp.on("payment.failed", (r) => {
//         setPaymentLoading(false);
//         setPaymentError(`Payment failed: ${r.error.description}`);
//       });
//       rzp.open();
//     } catch {
//       setPaymentLoading(false);
//       setPaymentError("Could not open payment gateway. Please try again.");
//     }
//   };

//   // Test mode bypass when key is placeholder
//   const handleTestConfirm = () => {
//     const rental = rentItem(buildRentalData("TEST_" + Date.now(), "Test Mode"));
//     onSuccess(rental);
//   };

//   const isTestMode = RAZORPAY_KEY === "rzp_test_YourKeyHere";

//   const inpStyle = (k) => ({
//     width:"100%", padding:"13px 16px",
//     border:`1.5px solid ${errors[k]?"#dc2626":"#e5e5e5"}`,
//     borderRadius:8, fontFamily:"'DM Sans',sans-serif",
//     fontSize:"0.95rem", outline:"none", background:"#fafafa", color:"#1f2937",
//     transition:"all .25s ease", boxShadow:errors[k]?"0 0 0 3px rgba(220,38,38,0.1)":"none",
//     letterSpacing:"0.3px"
//   });
//   const Lbl = ({ c }) => <label style={{ display:"block", fontFamily:"'Syne',sans-serif", fontSize:"0.78rem", color:"#374151", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.6px", fontWeight:700 }}>{c}</label>;
//   const Err = ({ k }) => errors[k] ? <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.85rem", color:"#dc2626", marginTop:6, display:"flex", alignItems:"center", gap:6, fontWeight:500 }}>✕ {errors[k]}</div> : null;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

//         .bf-overlay{position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;animation:fadeIn .2s ease;}
//         @keyframes fadeIn{from{opacity:0}to{opacity:1}}
//         .bf-modal{background:#fff;border-radius:16px;width:100%;max-width:1200px;max-height:85vh;overflow:hidden;box-shadow:0 25px 50px rgba(0,0,0,0.15);animation:slideUp .3s ease;display:flex;flex-direction:column;}
//         @keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}

//         .bf-head{background:linear-gradient(135deg,#1f2937 0%,#111827 100%);padding:24px 32px 18px;position:relative;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,.05);}
//         .bf-close{position:absolute;top:16px;right:16px;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);color:#fff;font-size:1.3rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .25s ease;}
//         .bf-close:hover{background:rgba(255,255,255,.15);transform:scale(1.08);}
//         .bf-head-title{font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;color:#fff;margin-bottom:6px;letter-spacing:"-0.5px";}
//         .bf-head-sub{font-family:'DM Sans',sans-serif;font-size:0.9rem;color:rgba(255,255,255,.7);}

//         .bf-item-mini{display:flex;gap:14px;align-items:center;background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.02));border-radius:12px;padding:12px 14px;margin-top:14px;border:1px solid rgba(255,255,255,.1);}
//         .bf-item-thumb{width:56px;height:56px;border-radius:10px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:1.8rem;overflow:hidden;flex-shrink:0;border:1px solid rgba(255,255,255,.15);}
//         .bf-item-thumb img{width:100%;height:100%;object-fit:cover;}
//         .bf-item-mini-name{font-family:'Syne',sans-serif;font-weight:700;font-size:0.98rem;color:#fff;}
//         .bf-item-mini-sub{font-family:'DM Sans',sans-serif;font-size:0.82rem;color:rgba(255,255,255,.7);margin-top:2px;}

//         .bf-body{padding:28px;flex:1;overflow-y:auto;}

//         .bf-steps{display:flex;align-items:center;margin-bottom:20px;padding:12px 14px;background:linear-gradient(135deg,#f9fafb,#f3f4f6);border-radius:10px;border:1px solid #e5e7eb;}
//         .bf-step{display:flex;align-items:center;gap:8px;font-family:'DM Sans',sans-serif;font-size:0.88rem;font-weight:600;color:#6b7280;transition:all .25s ease;}
//         .bf-step.active{color:#FF6B00;}
//         .bf-step.done{color:#16a34a;}
//         .bf-snum{width:28px;height:28px;border-radius:50%;background:#e5e7eb;color:#6b7280;display:flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:700;flex-shrink:0;transition:all .25s ease;}
//         .bf-step.active .bf-snum{background:#FF6B00;color:#fff;box-shadow:0 4px 12px rgba(255,107,0,0.25);}
//         .bf-step.done .bf-snum{background:#16a34a;color:#fff;}
//         .bf-sline{flex:1;height:2px;background:#e5e7eb;margin:0 10px;transition:background .25s ease;}
//         .bf-sline.done{background:#16a34a;}

//         .bf-field{margin-bottom:12px;}
//         .bf-3col{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;}
//         .bf-2col{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
//         .bf-4col{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px;}

//         .bf-summary{background:linear-gradient(135deg,#fafaf9 0%,#f5f3ff 100%);border-radius:12px;padding:16px;margin-bottom:12px;border:1px solid #e5e7eb;box-shadow:0 2px 8px rgba(0,0,0,.04);}
//         .bf-sum-title{font-family:'Syne',sans-serif;font-weight:800;font-size:0.92rem;color:#1f2937;margin-bottom:10px;display:flex;align-items:center;gap:8px;text-transform:uppercase;letter-spacing:"0.5px";}
//         .bf-sum-row{display:flex;justify-content:space-between;align-items:center;font-family:'DM Sans',sans-serif;font-size:0.87rem;padding:6px 0;color:#4b5563;border-bottom:1px solid rgba(0,0,0,.05);}
//         .bf-sum-row:last-child{border-bottom:none;}
//         .bf-sum-row.total{font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;color:#FF6B00;border-top:2px solid #e5e7eb;margin-top:8px;padding-top:10px;border-bottom:none;}

//         .bf-renter{background:linear-gradient(135deg,#f3f4f6 0%,#efefef 100%);border-radius:12px;padding:14px;margin-bottom:12px;border:1px solid #d1d5db;}
//         .bf-renter-title{font-family:'Syne',sans-serif;font-weight:700;font-size:0.88rem;color:#1f2937;margin-bottom:10px;display:flex;align-items:center;gap:8px;text-transform:uppercase;letter-spacing:"0.3px";}
//         .bf-renter-row{display:flex;justify-content:space-between;align-items:center;font-family:'DM Sans',sans-serif;font-size:0.85rem;color:#4b5563;padding:5px 0;}
//         .bf-renter-row span:first-child{color:#6b7280;font-weight:600;}
//         .bf-renter-row span:last-child{color:#1f2937;font-weight:600;}

//         .bf-pay-btn{width:100%;padding:13px 20px;border:none;border-radius:10px;font-family:'Syne',sans-serif;font-weight:700;font-size:0.95rem;cursor:pointer;transition:all .3s ease;background:linear-gradient(135deg,#FF6B00 0%,#ff8c1f 100%);color:#fff;display:flex;align-items:center;justify-content:center;gap:10px;position:relative;overflow:hidden;box-shadow:0 4px 15px rgba(255,107,0,0.25);}
//         .bf-pay-btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);transition:left .6s;}
//         .bf-pay-btn:hover:not(:disabled)::before{left:100%;}
//         .bf-pay-btn:hover:not(:disabled){transform:translateY(-3px);box-shadow:0 12px 28px rgba(255,107,0,0.4);}
//         .bf-pay-btn:active:not(:disabled){transform:translateY(-1px);}
//         .bf-pay-btn:disabled{background:#d1d5db;cursor:not-allowed;opacity:0.7;box-shadow:0 2px 8px rgba(0,0,0,0.1);}
//         .bf-test-btn{width:100%;padding:13px;border:2px solid #FF6B00;border-radius:10px;font-family:'Syne',sans-serif;font-weight:700;font-size:0.92rem;cursor:pointer;background:#fff;color:#FF6B00;margin-top:10px;transition:all .25s ease;}
//         .bf-test-btn:hover{background:#fff5ee;transform:translateY(-2px);border-color:#ff8c1f;box-shadow:0 4px 12px rgba(255,107,0,0.15);}
//         .bf-back-btn{width:100%;padding:12px;background:transparent;color:#6b7280;border:1.5px solid #e5e7eb;font-family:'DM Sans',sans-serif;cursor:pointer;margin-top:10px;font-size:0.9rem;border-radius:10px;transition:all .25s ease;font-weight:600;}
//         .bf-back-btn:hover{background:#f9fafb;border-color:#d1d5db;color:#4b5563;transform:translateY(-1px);}

//         .bf-err{background:linear-gradient(135deg,#fef2f2,#fce7e7);border:1.5px solid #fca5a5;color:#991b1b;border-radius:10px;padding:12px 16px;font-family:'DM Sans',sans-serif;font-size:0.9rem;margin-bottom:16px;display:flex;gap:10px;align-items:center;}

//         .bf-trust{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:12px;padding-top:10px;border-top:1px solid #e5e7eb;flex-wrap:wrap;}
//         .bf-trust span{font-family:'DM Sans',sans-serif;font-size:0.74rem;color:#6b7280;display:flex;align-items:center;gap:4px;font-weight:500;}

//         .bf-section-label{font-family:'Syne',sans-serif;font-weight:700;font-size:0.85rem;color:#1f2937;margin:12px 0 9px;text-transform:uppercase;letter-spacing:"0.6px";display:flex;align-items:center;gap:8px;}

//         .bf-payment-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:20px;}

//         @media(max-width:1200px){.bf-4col{grid-template-columns:1fr 1fr;}.bf-3col{grid-template-columns:1fr 1fr;}.bf-payment-grid{grid-template-columns:1fr;}}
//         @media(max-width:900px){.bf-3col{grid-template-columns:1fr;}.bf-2col{grid-template-columns:1fr;}.bf-4col{grid-template-columns:1fr;}.bf-modal{max-width:95vw;}.bf-body{padding:24px;}.bf-head{padding:20px 24px;}.bf-item-mini{flex-direction:column;text-align:center;}}
//         @media(max-width:640px){.bf-modal{border-radius:20px 20px 0 0;max-height:95vh;}.bf-overlay{align-items:flex-end;padding:0;}.bf-body{padding:16px;}.bf-head{padding:16px;}.bf-steps{flex-direction:column;}.bf-sline{width:2px;height:18px;margin:6px 0 6px 13px;}.bf-head-title{font-size:1.3rem;}.bf-payment-grid{grid-template-columns:1fr;}}
//       `}</style>

//       <div className="bf-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
//         <div className="bf-modal">

//           {/* Header */}
//           <div className="bf-head">
//             <button className="bf-close" onClick={onClose}>✕</button>
//             <div className="bf-head-title">{step===1 ? "Book This Item" : "Review & Pay"}</div>
//             <div className="bf-head-sub">{step===1 ? "Fill in your booking details" : "Confirm and complete payment"}</div>
//             <div className="bf-item-mini">
//               <div className="bf-item-thumb">
//                 {(item.images?.[0]||item.image) ? <img src={item.images?.[0]||item.image} alt="" /> : "📦"}
//               </div>
//               <div>
//                 <div className="bf-item-mini-name">{item.title}</div>
//                 <div className="bf-item-mini-sub">₹{item.price}/day · 📍 {item.city}</div>
//               </div>
//             </div>
//           </div>

//           <div className="bf-body">

//             {/* Steps */}
//             <div className="bf-steps">
//               <div className={`bf-step ${step>1?"done":"active"}`}>
//                 <div className="bf-snum">{step>1?"✓":"1"}</div> Details
//               </div>
//               <div className={`bf-sline ${step>1?"done":""}`} />
//               <div className={`bf-step ${step===2?"active":""}`}>
//                 <div className="bf-snum">2</div> Payment
//               </div>
//             </div>

//             {/* ── STEP 1 ── */}
//             {step===1 && (
//               <>
//                 <div className="bf-section-label">📅 Rental Dates</div>
//                 <div className="bf-2col">
//                   <div className="bf-field">
//                     <Lbl c="Start Date *" />
//                     <input type="date" min={today} value={form.startDate} onChange={e=>u("startDate",e.target.value)} style={inpStyle("startDate")} />
//                     <Err k="startDate" />
//                   </div>
//                   <div className="bf-field">
//                     <Lbl c="End Date *" />
//                     <input type="date" min={form.startDate||today} value={form.endDate} onChange={e=>u("endDate",e.target.value)} style={inpStyle("endDate")} />
//                     <Err k="endDate" />
//                   </div>
//                 </div>

//                 {days>0 && (
//                   <div style={{ background:"linear-gradient(135deg,#e8f5e9,#f1fef5)", border:"1.5px solid #c8e6c9", borderRadius:12, padding:"14px 16px", marginBottom:20, fontFamily:"'Syne',sans-serif", fontSize:"0.95rem", color:"#2e7d32", fontWeight:600, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
//                     <span>📅 {days} day{days>1?"s":""} selected</span>
//                     <span style={{ fontSize:"1.1rem" }}>₹<strong>{grandTotal}</strong></span>
//                   </div>
//                 )}

//                 <div className="bf-section-label">👤 Your Details</div>

//                 <div className="bf-field">
//                   <Lbl c="Full Name *" />
//                   <input value={form.name} onChange={e=>u("name",e.target.value)} placeholder="Rahul Sharma" style={inpStyle("name")} />
//                   <Err k="name" />
//                 </div>

//                 <div className="bf-3col">
//                   <div className="bf-field">
//                     <Lbl c="Phone *" />
//                     <input value={form.phone} onChange={e=>u("phone",e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="9876543210" style={inpStyle("phone")} />
//                     <Err k="phone" />
//                   </div>
//                   <div className="bf-field">
//                     <Lbl c="Email" />
//                     <input value={form.email} onChange={e=>u("email",e.target.value)} placeholder="you@gmail.com" style={inpStyle("email")} />
//                   </div>
//                   <div className="bf-field">
//                     <Lbl c="City" />
//                     <input value={item.city} disabled style={{...inpStyle("city"), opacity:0.7, background:"#f5f5f5"}} />
//                   </div>
//                 </div>

//                 <div className="bf-field">
//                   <Lbl c="Message to Owner (optional)" />
//                   <textarea value={form.message} onChange={e=>u("message",e.target.value)} placeholder="Any special requirements or questions for the owner..." rows={3} style={{ ...inpStyle("message"), resize:"vertical", fontFamily:"'DM Sans',sans-serif" }} />
//                 </div>

//                 <button className="bf-pay-btn" style={{ background:"linear-gradient(135deg,#FF6B00 0%,#ff8c1f 100%)", marginTop:"12px", fontSize:"1.03rem", fontWeight:800, letterSpacing:"0.3px", boxShadow:"0 8px 20px rgba(255,107,0,0.3)" }} onClick={() => { if(validateStep1()) setStep(2); }}>
//                   → Review & Proceed to Payment
//                 </button>
//                 <button className="bf-back-btn" onClick={onClose} style={{marginTop:"8px"}}>Cancel</button>
//               </>
//             )}

//             {/* ── STEP 2 ── */}
//             {step===2 && (
//               <>
//                 {paymentError && <div className="bf-err">⚠️ <span>{paymentError}</span></div>}

//                 {/* Two Column Layout */}
//                 <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"18px", marginBottom:"18px" }}>

//                   {/* LEFT: Summary Cards */}
//                   <div>
//                     {/* Price Breakdown Card */}
//                     <div className="bf-summary" style={{ background:"linear-gradient(135deg,#fff8f0 0%,#fffbf7 100%)", borderColor:"#f0e5d8" }}>
//                       <div className="bf-sum-title" style={{color:"#FF6B00"}}>💰 Price Breakdown</div>
//                       <div className="bf-sum-row"><span>Rental ({days} day{days>1?"s":""})</span><span style={{fontWeight:600, fontSize:"0.92rem"}}>₹{rentTotal}</span></div>
//                       <div className="bf-sum-row"><span>Refundable Deposit</span><span style={{fontWeight:600, fontSize:"0.92rem"}}>₹{item.deposit}</span></div>
//                       <div className="bf-sum-row fee"><span>Platform Fee (2%)</span><span style={{color:"#9ca3af"}}>₹{platformFee}</span></div>
//                       <div className="bf-sum-row total" style={{ fontSize:"1.15rem", marginTop:"10px", paddingTop:"10px", borderTop:"2px solid #e5d5c8" }}>
//                         <span style={{color:"#1f2937", fontSize:"0.9rem", fontWeight:600}}>Total Amount</span>
//                         <span style={{color:"#FF6B00"}}>₹{grandTotal}</span>
//                       </div>
//                     </div>

//                     {/* Rental Period Card */}
//                     <div className="bf-summary" style={{ background:"linear-gradient(135deg,#f0f7ff 0%,#f5fbff 100%)", borderColor:"#cce0ff", marginTop:"12px" }}>
//                       <div className="bf-sum-title" style={{color:"#0369a1"}}>📅 Rental Period</div>
//                       <div className="bf-sum-row">
//                         <span>Check-in</span>
//                         <span style={{ fontWeight:600, color:"#1f2937" }}>{new Date(form.startDate).toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short",year:"2-digit"})}</span>
//                       </div>
//                       <div className="bf-sum-row">
//                         <span>Check-out</span>
//                         <span style={{ fontWeight:600, color:"#1f2937" }}>{new Date(form.endDate).toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short",year:"2-digit"})}</span>
//                       </div>
//                       <div className="bf-sum-row" style={{borderTop:"2px solid #cce0ff", marginTop:"8px", paddingTop:"8px"}}>
//                         <span>Duration</span>
//                         <span style={{ fontWeight:600, color:"#0369a1", fontSize:"0.95rem" }}>{days} day{days>1?"s":""}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* RIGHT: Item & Renter Info */}
//                   <div>
//                     {/* Item Card */}
//                     <div className="bf-summary" style={{ background:"linear-gradient(135deg,#fef3f0 0%,#fffaf7 100%)", borderColor:"#fce4d6" }}>
//                       <div className="bf-sum-title" style={{color:"#9a3412", marginBottom:"8px"}}>📦 Item Details</div>
//                       <div style={{ background:"rgba(255,255,255,0.7)", borderRadius:"10px", padding:"10px", display:"flex", gap:"10px", alignItems:"flex-start", border:"1px solid rgba(255,107,0,0.1)" }}>
//                         <div style={{ width:"56px", height:"56px", borderRadius:"10px", background:"linear-gradient(135deg,#f5f5f5,#efefef)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.6rem", overflow:"hidden", flexShrink:0, border:"2px solid #f0e5d8" }}>
//                           {(item.images?.[0]||item.image) ? <img src={item.images?.[0]||item.image} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} /> : "📦"}
//                         </div>
//                         <div style={{flex:1}}>
//                           <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem",color:"#1f2937",marginBottom:"3px"}}>{item.title}</div>
//                           <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"0.85rem",color:"#6b7280",marginBottom:"4px"}}>₹{item.price}/day</div>
//                           <div style={{fontSize:"0.75rem", color:"#999"}}>📍 {item.city}</div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Renter Info Card */}
//                     <div className="bf-renter" style={{ background:"linear-gradient(135deg,#f3f4f6 0%,#f9fafb 100%)", marginTop:"12px", borderColor:"#d1d5db" }}>
//                       <div className="bf-renter-title" style={{color:"#374151"}}>👤 Your Information</div>
//                       <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
//                         {[["Name",form.name],["Phone",form.phone],["Email",form.email||"Not provided"]].map(([k,v])=>(
//                           <div key={k} style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"1px solid rgba(0,0,0,0.05)"}}>
//                             <span style={{fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", color:"#6b7280", fontWeight:600}}>{k}</span>
//                             <span style={{fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", color:"#1f2937", fontWeight:500, textAlign:"right", maxWidth:"50%"}}>{v}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Payment Section */}
//                 <div style={{ background:"linear-gradient(135deg,#1f2937 0%,#111827 100%)", borderRadius:"14px", padding:"18px", marginBottom:"16px", border:"1px solid rgba(255,255,255,0.1)" }}>
//                   <div className="bf-section-label" style={{color:"#fff", marginTop:0, marginBottom:"12px"}}>💳 Complete Your Payment</div>

//                   {/* Amount Display */}
//                   <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:"12px", padding:"14px", marginBottom:"12px", border:"1px solid rgba(255,107,0,0.2)", textAlign:"center" }}>
//                     <div style={{fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem", color:"rgba(255,255,255,0.7)", marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.5px"}}>Total Amount Due</div>
//                     <div style={{fontFamily:"'Syne',sans-serif", fontSize:"2rem", fontWeight:800, background:"linear-gradient(135deg,#FF6B00,#ff8c1f)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text"}}>₹{grandTotal}</div>
//                   </div>

//                   {/* Pay Button */}
//                   <button className="bf-pay-btn" onClick={handlePayment} disabled={paymentLoading} style={{background:"linear-gradient(135deg,#FF6B00 0%,#ff8c1f 100%)", marginBottom:"8px", fontSize:"1.03rem", fontWeight:800, letterSpacing:"0.3px", boxShadow:"0 12px 24px rgba(255,107,0,0.35)", padding:"14px 20px"}}>
//                     {paymentLoading ? (
//                       <>⏳ Processing Payment...</>
//                     ) : (
//                       <>🔒 Pay Securely via Razorpay</>
//                     )}
//                   </button>

//                   {/* Trust Badges - Horizontal */}
//                   <div style={{display:"flex", gap:"10px", justifyContent:"center", flexWrap:"wrap", marginTop:"10px", paddingTop:"10px", borderTop:"1px solid rgba(255,255,255,0.1)"}}>
//                     <span style={{fontFamily:"'DM Sans',sans-serif", fontSize:"0.74rem", color:"rgba(255,255,255,0.7)", display:"flex", alignItems:"center", gap:"4px"}}>🔒 SSL</span>
//                     <span style={{fontFamily:"'DM Sans',sans-serif", fontSize:"0.74rem", color:"rgba(255,255,255,0.7)", display:"flex", alignItems:"center", gap:"4px"}}>💳 All Methods</span>
//                     <span style={{fontFamily:"'DM Sans',sans-serif", fontSize:"0.74rem", color:"rgba(255,255,255,0.7)", display:"flex", alignItems:"center", gap:"4px"}}>✓ PCI</span>
//                   </div>
//                 </div>

//                 {/* Test Mode Banner */}
//                 {isTestMode && (
//                   <div style={{ background:"linear-gradient(135deg,#fffbea 0%,#fffef0 100%)", border:"1.5px solid #ffe082", borderRadius:12, padding:"12px 14px", marginBottom:"8px", fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", color:"#7a5f00", display:"flex", gap:"10px", alignItems:"flex-start" }}>
//                     <span style={{fontSize:"1.2rem", marginTop:"1px"}}>⚠️</span>
//                     <div><strong>Test Mode:</strong> Real payments disabled. Add Razorpay key to enable live transactions.</div>
//                   </div>
//                 )}

//                 {/* Test Button */}
//                 {isTestMode && (
//                   <button className="bf-test-btn" onClick={handleTestConfirm} style={{ marginBottom:"8px", fontSize:"0.92rem", padding:"12px" }}>
//                     🧪 Simulate Successful Payment (Test Mode)
//                   </button>
//                 )}

//                 {/* Edit Button */}
//                 <button className="bf-back-btn" onClick={() => { setStep(1); setPaymentError(""); }} style={{marginBottom:"10px"}}>← Edit Booking Details</button>

//                 {/* Terms & Conditions */}
//                 <div style={{background:"linear-gradient(135deg,#f9fafb 0%,#f3f4f6 100%)",borderRadius:12,padding:"12px 14px",fontFamily:"'DM Sans',sans-serif",fontSize:"0.78rem",color:"#6b7280",textAlign:"center",lineHeight:"1.5",border:"1px solid #e5e7eb", marginTop:"12px"}}>
//                   By clicking "Pay Securely", I confirm that I have read and agree to QuickRent's <strong style={{color:"#1f2937"}}>rental terms</strong>, <strong style={{color:"#1f2937"}}>cancellation policy</strong>, and <strong style={{color:"#1f2937"}}>privacy policy</strong>.
//                 </div>
//               </>
//             )}

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
//-------------------------------------------------------

// import { useState, useEffect, useRef } from "react";
// import { useAuth, useApp } from "../App";

// // ── Load Razorpay script ──────────────────────────────────────────────────────
// function loadRazorpayScript() {
//   return new Promise((resolve) => {
//     if (window.Razorpay) {
//       resolve(true);
//       return;
//     }
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// }

// // ⚠️ Replace with your key from dashboard.razorpay.com → Settings → API Keys
// const RAZORPAY_KEY = "rzp_test_Sb7kYz1PicBvud";

// // ── Confetti burst ────────────────────────────────────────────────────────────
// function launchConfetti() {
//   const canvas = document.createElement("canvas");
//   canvas.style.cssText =
//     "position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none;";
//   document.body.appendChild(canvas);
//   const ctx = canvas.getContext("2d");
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;

//   const pieces = Array.from({ length: 140 }, () => ({
//     x: Math.random() * canvas.width,
//     y: Math.random() * -canvas.height,
//     w: Math.random() * 10 + 5,
//     h: Math.random() * 5 + 3,
//     color: [
//       "#FF6B00",
//       "#FFD700",
//       "#FF4081",
//       "#00BCD4",
//       "#8BC34A",
//       "#9C27B0",
//       "#FF5722",
//     ][Math.floor(Math.random() * 7)],
//     rot: Math.random() * 360,
//     speed: Math.random() * 4 + 2,
//     spin: (Math.random() - 0.5) * 6,
//     drift: (Math.random() - 0.5) * 2,
//   }));

//   let frame;
//   const draw = () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     let alive = false;
//     pieces.forEach((p) => {
//       p.y += p.speed;
//       p.x += p.drift;
//       p.rot += p.spin;
//       if (p.y < canvas.height + 20) alive = true;
//       ctx.save();
//       ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
//       ctx.rotate((p.rot * Math.PI) / 180);
//       ctx.fillStyle = p.color;
//       ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
//       ctx.restore();
//     });
//     if (alive) frame = requestAnimationFrame(draw);
//     else {
//       cancelAnimationFrame(frame);
//       document.body.removeChild(canvas);
//     }
//   };
//   frame = requestAnimationFrame(draw);
//   setTimeout(() => {
//     cancelAnimationFrame(frame);
//     if (canvas.parentNode) document.body.removeChild(canvas);
//   }, 3500);
// }

// // ── Progress steps ────────────────────────────────────────────────────────────
// const PROGRESS_STEPS = [
//   { label: "Connecting to Razorpay", duration: 800 },
//   { label: "Securing your session", duration: 600 },
//   { label: "Loading payment methods", duration: 700 },
//   { label: "Opening checkout", duration: 400 },
// ];

// export default function BookingForm({ item, onClose, onSuccess }) {
//   const { user } = useAuth();
//   const { rentItem } = useApp();
//   const today = new Date().toISOString().split("T")[0];

//   const [step, setStep] = useState(1);
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [progressStep, setProgressStep] = useState(0); // 0‒4
//   const [progressPct, setProgressPct] = useState(0);
//   const [paymentError, setPaymentError] = useState("");
//   const [form, setForm] = useState({
//     startDate: today,
//     endDate: "",
//     name: user?.name || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//     message: "",
//   });
//   const [errors, setErrors] = useState({});
//   const timerRef = useRef([]);

//   const u = (k, v) => setForm((f) => ({ ...f, [k]: v }));

//   // cleanup timers on unmount
//   useEffect(() => () => timerRef.current.forEach(clearTimeout), []);

//   const days =
//     form.startDate && form.endDate
//       ? Math.max(
//           0,
//           Math.ceil(
//             (new Date(form.endDate) - new Date(form.startDate)) / 86400000,
//           ),
//         )
//       : 0;
//   const rentTotal = days * item.price;
//   const platformFee = Math.round(rentTotal * 0.02);
//   const grandTotal = rentTotal + item.deposit + platformFee;

//   // ── Validation ────────────────────────────────────────────────────────────
//   const validateStep1 = () => {
//     const e = {};
//     if (!form.startDate) e.startDate = "Select a start date";
//     if (!form.endDate) e.endDate = "Select an end date";
//     if (days <= 0) e.endDate = "End date must be after start date";
//     if (!form.name.trim()) e.name = "Name is required";
//     if (!form.phone.trim()) e.phone = "Phone is required";
//     if (!/^[0-9]{10}$/.test(form.phone)) e.phone = "Enter valid 10-digit phone";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const buildRentalData = (paymentId, paymentMethod) => ({
//     itemId: item.id,
//     itemTitle: item.title,
//     itemCategory: item.category,
//     itemCity: item.city,
//     itemCondition: item.condition,
//     itemPrice: item.price,
//     itemOwnerId: item.ownerId,
//     startDate: form.startDate,
//     endDate: form.endDate,
//     days,
//     totalPrice: rentTotal,
//     platformFee,
//     deposit: item.deposit,
//     grandTotal,
//     message: form.message,
//     renterName: form.name,
//     renterPhone: form.phone,
//     renterEmail: form.email,
//     paymentId: paymentId || "N/A",
//     paymentMethod: paymentMethod || "Razorpay",
//     paymentStatus: paymentId ? "Paid" : "Pending",
//   });

//   // ── Animated progress bar ─────────────────────────────────────────────────
//   const runProgressBar = () => {
//     return new Promise((resolve) => {
//       let elapsed = 0;
//       PROGRESS_STEPS.forEach((s, i) => {
//         const t1 = setTimeout(() => {
//           setProgressStep(i);
//           setProgressPct(Math.round((i / PROGRESS_STEPS.length) * 85));
//         }, elapsed);
//         timerRef.current.push(t1);
//         elapsed += s.duration;
//       });
//       const t2 = setTimeout(() => {
//         setProgressPct(90);
//         resolve();
//       }, elapsed);
//       timerRef.current.push(t2);
//     });
//   };

//   // ── Razorpay handler ──────────────────────────────────────────────────────
//   const handlePayment = async () => {
//     setPaymentError("");
//     setPaymentLoading(true);
//     setProgressStep(0);
//     setProgressPct(0);

//     // Run progress animation while loading script
//     const [loaded] = await Promise.all([
//       loadRazorpayScript(),
//       runProgressBar(),
//     ]);

//     if (!loaded) {
//       setPaymentLoading(false);
//       setProgressPct(0);
//       setPaymentError(
//         "Failed to load Razorpay. Check your internet connection.",
//       );
//       return;
//     }

//     setProgressPct(100);

//     const options = {
//       key: RAZORPAY_KEY,
//       amount: grandTotal * 100, // paise
//       currency: "INR",
//       name: "QuickRent",
//       description: `Rental: ${item.title}`,
//       image: "https://placehold.co/60x60/FF6B00/ffffff?text=QR",

//       // ── Enable ALL payment methods including UPI ──────────────────────────
//       config: {
//         display: {
//           blocks: {
//             utib: { name: "Pay via UPI", instruments: [{ method: "upi" }] },
//             other: {
//               name: "Other Payment Methods",
//               instruments: [
//                 { method: "card" },
//                 { method: "netbanking" },
//                 { method: "wallet" },
//               ],
//             },
//           },
//           sequence: ["block.utib", "block.other"],
//           preferences: { show_default_blocks: false },
//         },
//       },

//       // Explicitly enable each method
//       method: {
//         upi: true,
//         card: true,
//         netbanking: true,
//         wallet: true,
//         emi: false,
//         paylater: false,
//       },

//       // UPI-specific options
//       upi: {
//         flow: "collect", // shows all UPI apps
//       },

//       prefill: {
//         name: form.name,
//         email: form.email,
//         contact: "91" + form.phone, // include country code for better UPI detection
//       },

//       notes: {
//         item_id: String(item.id),
//         start_date: form.startDate,
//         end_date: form.endDate,
//       },

//       theme: {
//         color: "#FF6B00",
//         hide_topbar: false,
//       },

//       modal: {
//         ondismiss: () => {
//           setPaymentLoading(false);
//           setProgressPct(0);
//           setPaymentError("Payment was cancelled. You can try again.");
//         },
//         animation: true,
//         confirm_close: true,
//         escape: false,
//       },

//       // ── Success callback ──────────────────────────────────────────────────
//       handler: (response) => {
//         setPaymentLoading(false);
//         setProgressPct(0);
//         launchConfetti();
//         const rental = rentItem(
//           buildRentalData(response.razorpay_payment_id, "Razorpay"),
//         );
//         onSuccess(rental);
//       },
//     };

//     try {
//       const rzp = new window.Razorpay(options);
//       rzp.on("payment.failed", (r) => {
//         setPaymentLoading(false);
//         setProgressPct(0);
//         setPaymentError(
//           `Payment failed: ${r.error.description}. Please try again.`,
//         );
//       });
//       // Small delay so progress bar hits 100% visibly before popup
//       setTimeout(() => rzp.open(), 300);
//     } catch (err) {
//       setPaymentLoading(false);
//       setProgressPct(0);
//       setPaymentError("Could not open payment gateway. Please try again.");
//     }
//   };

//   // ── Test mode bypass ──────────────────────────────────────────────────────
//   const handleTestConfirm = () => {
//     launchConfetti();
//     const rental = rentItem(buildRentalData("TEST_" + Date.now(), "Test Mode"));
//     onSuccess(rental);
//   };

//   const isTestMode = RAZORPAY_KEY === "rzp_test_YourKeyHere";

//   // ── Helpers ───────────────────────────────────────────────────────────────
//   const inpStyle = (k) => ({
//     width: "100%",
//     padding: "11px 14px",
//     border: `1.5px solid ${errors[k] ? "#e53e3e" : "#e5e5e5"}`,
//     borderRadius: 10,
//     fontFamily: "'DM Sans',sans-serif",
//     fontSize: "0.92rem",
//     outline: "none",
//     background: k === "startDate" || k === "endDate" ? "#f0f0f0" : "#fafafa",
//     color: "#000",
//   });
//   const Lbl = ({ c }) => (
//     <label
//       style={{
//         display: "block",
//         fontFamily: "'DM Sans',sans-serif",
//         fontSize: "0.76rem",
//         color: "#666",
//         marginBottom: 5,
//         textTransform: "uppercase",
//         letterSpacing: "0.5px",
//       }}
//     >
//       {c}
//     </label>
//   );
//   const Err = ({ k }) =>
//     errors[k] ? (
//       <div
//         style={{
//           fontFamily: "'DM Sans',sans-serif",
//           fontSize: "0.73rem",
//           color: "#e53e3e",
//           marginTop: 4,
//         }}
//       >
//         ⚠ {errors[k]}
//       </div>
//     ) : null;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

//         .bf-overlay{position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.6);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:16px;}
//         .bf-modal{background:#fff;border-radius:10px;width:100%;max-width:900px;max-height:700px;overflow-y:auto;box-shadow:0 40px 100px rgba(0,0,0,0.25);animation:bfUp .3s cubic-bezier(.16,1,.3,1);}
//         @keyframes bfUp{from{opacity:0;transform:translateY(32px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}

//         /* Head */
//         .bf-head{background:linear-gradient(135deg,#FF6B00,#ff9a3c);padding:24px 28px 20px;position:relative;}
//         .bf-close{position:absolute;top:14px;right:16px;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.22);border:none;color:#fff;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;}
//         .bf-close:hover{background:rgba(255,255,255,.38);}
//         .bf-head-title{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;color:#fff;}
//         .bf-head-sub{font-family:'DM Sans',sans-serif;font-size:0.83rem;color:rgba(255,255,255,.82);margin-top:3px;}
//         .bf-item-mini{display:flex;gap:12px;align-items:center;background:rgba(255,255,255,.16);border-radius:12px;padding:10px 12px;margin-top:14px;}
//         .bf-item-thumb{width:44px;height:44px;border-radius:10px;background:rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;font-size:1.4rem;overflow:hidden;flex-shrink:0;}
//         .bf-item-thumb img{width:100%;height:100%;object-fit:cover;}
//         .bf-item-mini-name{font-family:'Syne',sans-serif;font-weight:700;font-size:0.9rem;color:#fff;}
//         .bf-item-mini-sub{font-family:'DM Sans',sans-serif;font-size:0.78rem;color:rgba(255,255,255,.8);margin-top:1px;}

//         .bf-body{padding:24px 28px;}

//         /* Step indicator */
//         .bf-steps{display:flex;align-items:center;margin-bottom:24px;}
//         .bf-step{display:flex;align-items:center;gap:6px;font-family:'DM Sans',sans-serif;font-size:0.82rem;font-weight:500;color:#bbb;}
//         .bf-step.active{color:#FF6B00;}.bf-step.done{color:#2e7d32;}
//         .bf-snum{width:24px;height:24px;border-radius:50%;background:#e5e5e5;color:#aaa;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;transition:all .3s;}
//         .bf-step.active .bf-snum{background:#FF6B00;color:#fff;box-shadow:0 0 0 3px rgba(255,107,0,.2);}
//         .bf-step.done .bf-snum{background:#2e7d32;color:#fff;}
//         .bf-sline{flex:1;height:2px;background:#e5e5e5;margin:0 8px;transition:background .4s;}
//         .bf-sline.done{background:#2e7d32;}

//         .bf-field{margin-bottom:14px;}
//         .bf-2col{display:grid;grid-template-columns:1fr 1fr;gap:12px;}

//         /* Summary boxes */
//         .bf-summary{background:#fff8f5;border-radius:16px;padding:18px;margin-bottom:14px;border:1px solid #ffe0cc;}
//         .bf-sum-title{font-family:'Syne',sans-serif;font-weight:700;font-size:0.9rem;color:#1a1a1a;margin-bottom:12px;}
//         .bf-sum-row{display:flex;justify-content:space-between;font-family:'DM Sans',sans-serif;font-size:0.88rem;padding:6px 0;color:#555;}
//         .bf-sum-row.total{font-family:'Syne',sans-serif;font-weight:800;font-size:1.05rem;color:#FF6B00;border-top:1.5px solid #ffe0cc;margin-top:8px;padding-top:12px;}
//         .bf-sum-row.fee{color:#aaa;font-size:.8rem;}
//         .bf-renter{background:#f7f7f7;border-radius:14px;padding:14px 16px;margin-bottom:14px;}
//         .bf-renter-title{font-family:'Syne',sans-serif;font-weight:700;font-size:0.85rem;color:#1a1a1a;margin-bottom:8px;}
//         .bf-renter-row{display:flex;justify-content:space-between;font-family:'DM Sans',sans-serif;font-size:0.84rem;color:#555;padding:3px 0;}
//         .bf-renter-row span:first-child{color:#999;}

//         /* ── Progress bar ── */
//         .bf-progress-wrap{margin-bottom:16px;background:#f7f7f7;border-radius:14px;padding:16px;}
//         .bf-progress-label{font-family:'DM Sans',sans-serif;font-size:0.82rem;color:#555;margin-bottom:10px;display:flex;justify-content:space-between;}
//         .bf-progress-label span:last-child{color:#FF6B00;font-weight:600;}
//         .bf-progress-track{height:8px;background:#e5e5e5;border-radius:50px;overflow:hidden;}
//         .bf-progress-bar{height:100%;background:linear-gradient(90deg,#FF6B00,#ff9a3c);border-radius:50px;transition:width .5s cubic-bezier(.4,0,.2,1);}
//         .bf-progress-step{font-family:'DM Sans',sans-serif;font-size:0.75rem;color:#aaa;margin-top:8px;display:flex;align-items:center;gap:6px;}
//         .bf-progress-dot{width:6px;height:6px;border-radius:50%;background:#FF6B00;animation:bfPulse 1s infinite;}
//         @keyframes bfPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(0.7)}}

//         /* ── Pay button with loading state ── */
//         .bf-pay-btn{
//           width:100%;padding:15px;border:none;border-radius:50px;
//           font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;
//           cursor:pointer;transition:all .3s;
//           background:#1a1a1a;color:#fff;
//           display:flex;align-items:center;justify-content:center;gap:10px;
//           position:relative;overflow:hidden;
//         }
//         .bf-pay-btn::before{
//           content:'';position:absolute;top:0;left:-100%;
//           width:100%;height:100%;
//           background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);
//           transition:left .5s;
//         }
//         .bf-pay-btn:hover:not(:disabled)::before{left:100%;}
//         .bf-pay-btn:hover:not(:disabled){background:#000;transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,0,0,.25);}
//         .bf-pay-btn:disabled{background:#ccc;cursor:not-allowed;transform:none;}

//         /* Loading spinner inside button */
//         .bf-spinner{width:18px;height:18px;border:2.5px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;}
//         @keyframes spin{to{transform:rotate(360deg)}}

//         /* Payment method icons */
//         .bf-methods{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;}
//         .bf-method-pill{
//           display:flex;align-items:center;gap:5px;
//           padding:5px 12px;border-radius:50px;
//           border:1.5px solid #e5e5e5;background:#fafafa;
//           font-family:'DM Sans',sans-serif;font-size:0.75rem;color:#555;
//           font-weight:500;
//         }

//         .bf-test-btn{width:100%;padding:13px;border:2px dashed #FF6B00;border-radius:50px;font-family:'Syne',sans-serif;font-weight:700;font-size:0.9rem;cursor:pointer;background:#fff5ee;color:#FF6B00;margin-top:8px;transition:all .2s;}
//         .bf-test-btn:hover{background:#ffe8d6;transform:translateY(-1px);}
//         .bf-back-btn{width:100%;padding:10px;background:transparent;color:#888;border:none;font-family:'DM Sans',sans-serif;cursor:pointer;margin-top:8px;font-size:0.88rem;}
//         .bf-err{background:#fff5f5;border:1px solid #fcc;color:#e53e3e;border-radius:10px;padding:10px 14px;font-family:'DM Sans',sans-serif;font-size:0.83rem;margin-bottom:14px;}

//         /* Trust bar */
//         .bf-trust{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:14px;padding-top:12px;border-top:1px solid #f0f0f0;flex-wrap:wrap;}
//         .bf-trust span{font-family:'DM Sans',sans-serif;font-size:0.72rem;color:#aaa;}

//         @media(max-width:540px){
//           .bf-2col{grid-template-columns:1fr;}
//           .bf-modal{border-radius:20px 20px 0 0;max-height:95vh;}
//           .bf-overlay{align-items:flex-end;padding:0;}
//         }
//       `}</style>

//       <div
//         className="bf-overlay"
//         onClick={(e) =>
//           e.target === e.currentTarget && !paymentLoading && onClose()
//         }
//       >
//         <div className="bf-modal">
//           {/* Header */}
//           <div className="bf-head">
//             <button
//               className="bf-close"
//               onClick={onClose}
//               disabled={paymentLoading}
//             >
//               ✕
//             </button>
//             <div className="bf-head-title">
//               {step === 1 ? "Book This Item" : "Review & Pay"}
//             </div>
//             <div className="bf-head-sub">
//               {step === 1
//                 ? "Fill in your booking details"
//                 : "Confirm details and complete payment"}
//             </div>
//             <div className="bf-item-mini">
//               <div className="bf-item-thumb">
//                 {item.images?.[0] || item.image ? (
//                   <img src={item.images?.[0] || item.image} alt="" />
//                 ) : (
//                   "📦"
//                 )}
//               </div>
//               <div>
//                 <div className="bf-item-mini-name">{item.title}</div>
//                 <div className="bf-item-mini-sub">
//                   ₹{item.price}/day · 📍 {item.city}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bf-body">
//             {/* Step indicator */}
//             <div className="bf-steps">
//               <div className={`bf-step ${step > 1 ? "done" : "active"}`}>
//                 <div className="bf-snum">{step > 1 ? "✓" : "1"}</div>Details
//               </div>
//               <div className={`bf-sline ${step > 1 ? "done" : ""}`} />
//               <div className={`bf-step ${step === 2 ? "active" : ""}`}>
//                 <div className="bf-snum">2</div>Payment
//               </div>
//             </div>

//             {/* ── STEP 1: Details ── */}
//             {step === 1 && (
//               <>
//                 <div className="bf-2col">
//                   <div className="bf-field">
//                     <Lbl c="Start Date *" />
//                     <input
//                       type="date"
//                       min={today}
//                       value={form.startDate}
//                       onChange={(e) => u("startDate", e.target.value)}
//                       style={inpStyle("startDate")}
//                     />
//                     <Err k="startDate" />
//                   </div>
//                   <div className="bf-field">
//                     <Lbl c="End Date *" />
//                     <input
//                       type="date"
//                       min={form.startDate || today}
//                       value={form.endDate}
//                       onChange={(e) => u("endDate", e.target.value)}
//                       style={inpStyle("endDate")}
//                     />
//                     <Err k="endDate" />
//                   </div>
//                 </div>

//                 {days > 0 && (
//                   <div
//                     style={{
//                       background: "#e8f5e9",
//                       borderRadius: 10,
//                       padding: "10px 14px",
//                       marginBottom: 14,
//                       fontFamily: "'DM Sans',sans-serif",
//                       fontSize: "0.85rem",
//                       color: "#2e7d32",
//                       fontWeight: 600,
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                     }}
//                   >
//                     <span>
//                       📅 {days} day{days > 1 ? "s" : ""}
//                     </span>
//                     <span>
//                       Total: <strong>₹{grandTotal}</strong>
//                     </span>
//                   </div>
//                 )}

//                 <div
//                   style={{
//                     fontFamily: "'Syne',sans-serif",
//                     fontWeight: 700,
//                     fontSize: "0.88rem",
//                     color: "#1a1a1a",
//                     margin: "4px 0 14px",
//                   }}
//                 >
//                   Your Details
//                 </div>

//                 <div className="bf-field">
//                   <Lbl c="Full Name *" />
//                   <input
//                     value={form.name}
//                     onChange={(e) => u("name", e.target.value)}
//                     placeholder="Rahul Sharma"
//                     style={inpStyle("name")}
//                   />
//                   <Err k="name" />
//                 </div>
//                 <div className="bf-2col">
//                   <div className="bf-field">
//                     <Lbl c="Phone *" />
//                     <input
//                       value={form.phone}
//                       onChange={(e) =>
//                         u(
//                           "phone",
//                           e.target.value.replace(/\D/g, "").slice(0, 10),
//                         )
//                       }
//                       placeholder="9876543210"
//                       style={inpStyle("phone")}
//                     />
//                     <Err k="phone" />
//                   </div>
//                   <div className="bf-field">
//                     <Lbl c="Email" />
//                     <input
//                       value={form.email}
//                       onChange={(e) => u("email", e.target.value)}
//                       placeholder="you@gmail.com"
//                       style={inpStyle("email")}
//                     />
//                   </div>
//                 </div>
//                 <div className="bf-field">
//                   <Lbl c="Message to Owner (optional)" />
//                   <textarea
//                     value={form.message}
//                     onChange={(e) => u("message", e.target.value)}
//                     placeholder="Any special requirements or questions..."
//                     rows={3}
//                     style={{ ...inpStyle("message"), resize: "vertical" }}
//                   />
//                 </div>

//                 <button
//                   className="bf-pay-btn"
//                   style={{ background: "#FF6B00" }}
//                   onClick={() => {
//                     if (validateStep1()) setStep(2);
//                   }}
//                 >
//                   Review & Pay →
//                 </button>
//                 <button className="bf-back-btn" onClick={onClose}>
//                   Cancel
//                 </button>
//               </>
//             )}

//             {/* ── STEP 2: Payment ── */}
//             {step === 2 && (
//               <>
//                 {paymentError && <div className="bf-err">⚠ {paymentError}</div>}

//                 {/* Price breakdown */}
//                 <div className="bf-summary">
//                   <div className="bf-sum-title">💰 Price Breakdown</div>
//                   <div className="bf-sum-row">
//                     <span>
//                       Rent (₹{item.price} × {days} day{days > 1 ? "s" : ""})
//                     </span>
//                     <span>₹{rentTotal}</span>
//                   </div>
//                   <div className="bf-sum-row">
//                     <span>Refundable Deposit</span>
//                     <span>₹{item.deposit}</span>
//                   </div>
//                   <div className="bf-sum-row fee">
//                     <span>Platform Fee (2%)</span>
//                     <span>₹{platformFee}</span>
//                   </div>
//                   <div className="bf-sum-row total">
//                     <span>Total Payable</span>
//                     <span>₹{grandTotal}</span>
//                   </div>
//                 </div>

//                 {/* Rental period */}
//                 <div
//                   className="bf-summary"
//                   style={{ background: "#f0f7ff", borderColor: "#cce0ff" }}
//                 >
//                   <div className="bf-sum-title">📅 Rental Period</div>
//                   <div className="bf-sum-row">
//                     <span>From</span>
//                     <span style={{ fontWeight: 600 }}>
//                       {new Date(form.startDate).toLocaleDateString("en-IN", {
//                         weekday: "short",
//                         day: "numeric",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </span>
//                   </div>
//                   <div className="bf-sum-row">
//                     <span>To</span>
//                     <span style={{ fontWeight: 600 }}>
//                       {new Date(form.endDate).toLocaleDateString("en-IN", {
//                         weekday: "short",
//                         day: "numeric",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </span>
//                   </div>
//                   <div className="bf-sum-row">
//                     <span>Duration</span>
//                     <span style={{ fontWeight: 600 }}>
//                       {days} day{days > 1 ? "s" : ""}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Renter summary */}
//                 <div className="bf-renter">
//                   <div className="bf-renter-title">👤 Renter Details</div>
//                   {[
//                     ["Name", form.name],
//                     ["Phone", form.phone],
//                     ["Email", form.email || "—"],
//                   ].map(([k, v]) => (
//                     <div className="bf-renter-row" key={k}>
//                       <span>{k}</span>
//                       <span>{v}</span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Accepted payment methods */}
//                 <div style={{ marginBottom: 14 }}>
//                   <div
//                     style={{
//                       fontFamily: "'DM Sans',sans-serif",
//                       fontSize: "0.75rem",
//                       color: "#aaa",
//                       marginBottom: 8,
//                     }}
//                   >
//                     ACCEPTED PAYMENT METHODS
//                   </div>
//                   <div className="bf-methods">
//                     {[
//                       ["📱", "UPI"],
//                       ["💳", "Cards"],
//                       ["🏦", "Net Banking"],
//                       ["👜", "Wallets"],
//                     ].map(([ic, lbl]) => (
//                       <div className="bf-method-pill" key={lbl}>
//                         {ic} {lbl}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* ── Progress bar (shown during loading) ── */}
//                 {/* {paymentLoading && (
//                   <div className="bf-progress-wrap">
//                     <div className="bf-progress-label">
//                       <span>Preparing payment...</span>
//                       <span>{progressPct}%</span>
//                     </div>
//                     <div className="bf-progress-track">
//                       <div
//                         className="bf-progress-bar"
//                         style={{ width: `${progressPct}%` }}
//                       />
//                     </div>
//                     <div className="bf-progress-step">
//                       <div className="bf-progress-dot" />
//                       {
//                         PROGRESS_STEPS[
//                           Math.min(progressStep, PROGRESS_STEPS.length - 1)
//                         ].label
//                       }
//                       ...
//                     </div>
//                   </div>
//                 )} */}

//                 {/* Pay button with loading animation */}
//                 <button
//                   className="bf-pay-btn"
//                   onClick={handlePayment}
                  
//                   disabled={paymentLoading}
//                 >
//                   {paymentLoading ? (
//                     <>
//                       <div className="bf-spinner" /> Processing payment...
//                     </>
//                   ) : (
//                     <>🔒 Pay ₹{grandTotal} via Razorpay</>
//                   )}
//                 </button>

//                 {/* Test mode */}
//                 {isTestMode && !paymentLoading && (
//                   <>
//                     <div
//                       style={{
//                         background: "#fffbea",
//                         border: "1px solid #ffe082",
//                         borderRadius: 10,
//                         padding: "10px 14px",
//                         margin: "10px 0 0",
//                         fontFamily: "'DM Sans',sans-serif",
//                         fontSize: "0.8rem",
//                         color: "#7a5f00",
//                       }}
//                     >
//                       ⚠️ <strong>Test Mode:</strong> Replace{" "}
//                       <code>rzp_test_YourKeyHere</code> in BookingForm.jsx with
//                       your Razorpay test key to enable real payments.
//                     </div>
//                     <button className="bf-test-btn" onClick={handleTestConfirm}>
//                       🧪 Simulate Successful Payment
//                     </button>
//                   </>
//                 )}

//                 {!paymentLoading && (
//                   <button
//                     className="bf-back-btn"
//                     onClick={() => {
//                       setStep(1);
//                       setPaymentError("");
//                     }}
//                   >
//                     ← Edit Details
//                   </button>
//                 )}

//                 {/* Trust badges */}
//                 <div className="bf-trust">
//                   <span>🔒 256-bit SSL</span>
//                   <span>📱 UPI / GPay / PhonePe</span>
//                   <span>💳 All Cards</span>
//                   <span>🏦 Powered by Razorpay</span>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
//the issue is the table contetn in not passign in the db. so we have new code for the booking form which is as follows:



import { useState, useEffect, useRef } from "react";
import { useAuth } from "../App";
import { rentalsAPI, paymentsAPI } from "../utils/api";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function launchConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none;";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const pieces = Array.from({ length: 140 }, () => ({
    x: Math.random()*canvas.width, y: Math.random()*-canvas.height,
    w: Math.random()*10+5, h: Math.random()*5+3,
    color: ["#FF6B00","#FFD700","#FF4081","#00BCD4","#8BC34A","#9C27B0"][Math.floor(Math.random()*6)],
    rot: Math.random()*360, speed: Math.random()*4+2,
    spin: (Math.random()-0.5)*6, drift: (Math.random()-0.5)*2,
  }));
  let frame;
  const draw = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height); let alive = false;
    pieces.forEach(p => {
      p.y+=p.speed; p.x+=p.drift; p.rot+=p.spin;
      if (p.y<canvas.height+20) alive=true;
      ctx.save(); ctx.translate(p.x+p.w/2,p.y+p.h/2); ctx.rotate(p.rot*Math.PI/180);
      ctx.fillStyle=p.color; ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h); ctx.restore();
    });
    if (alive) frame=requestAnimationFrame(draw);
    else { cancelAnimationFrame(frame); if(canvas.parentNode) document.body.removeChild(canvas); }
  };
  frame=requestAnimationFrame(draw);
  setTimeout(()=>{ cancelAnimationFrame(frame); if(canvas.parentNode) document.body.removeChild(canvas); },3500);
}

export default function BookingForm({ item, onClose, onSuccess }) {
  const { user } = useAuth();
  const today = new Date().toISOString().split("T")[0];
  const [step, setStep] = useState(1);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [form, setForm] = useState({
    startDate: today, endDate: "",
    name: user?.name||"", email: user?.email||"", phone: user?.phone||"", message: "",
  });
  const [errors, setErrors] = useState({});
  const timerRef = useRef([]);
  useEffect(() => () => timerRef.current.forEach(clearTimeout), []);

  const u = (k,v) => setForm(f=>({...f,[k]:v}));
  const days = form.startDate && form.endDate
    ? Math.max(0, Math.ceil((new Date(form.endDate)-new Date(form.startDate))/86400000)) : 0;
  const pricePerDay = parseFloat(item.price_per_day || item.price || 0);
  const rentTotal   = days * pricePerDay;
  const platformFee = Math.round(rentTotal * 0.02);
  const deposit     = parseFloat(item.deposit || 0);
  const grandTotal  = rentTotal + deposit + platformFee;

  const validateStep1 = () => {
    const e = {};
    if (!form.startDate) e.startDate="Select a start date";
    if (!form.endDate)   e.endDate="Select an end date";
    if (days<=0)         e.endDate="End date must be after start date";
    if (!form.name.trim())  e.name="Name is required";
    if (!form.phone.trim()) e.phone="Phone is required";
    if (!/^[0-9]{10}$/.test(form.phone)) e.phone="Enter valid 10-digit phone";
    setErrors(e); return Object.keys(e).length===0;
  };

  const handlePayment = async () => {
    setPaymentError(""); setPaymentLoading(true);
    try {
      // 1. Create rental in Django DB
      const rentalRes = await rentalsAPI.create({
        item: item.id, start_date: form.startDate,
        end_date: form.endDate, message: form.message,
      });
      const rental = rentalRes.data;

      // 2. Create Razorpay order via Django
      const orderRes = await paymentsAPI.createOrder(rental.id);
      const { order_id, amount, key_id } = orderRes.data;

      // 3. Load Razorpay JS
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setPaymentError("Failed to load Razorpay. Check internet.");
        setPaymentLoading(false); return;
      }

      // 4. Open Razorpay popup
      const rzp = new window.Razorpay({
        key: key_id, amount, currency: "INR",
        name: "QuickRent", description: `Rental: ${item.title}`,
        order_id,
        prefill: { name: form.name, email: form.email, contact: "91"+form.phone },
        theme: { color: "#FF6B00" },
        method: { upi:true, card:true, netbanking:true, wallet:true },
        modal: {
          ondismiss: () => { setPaymentLoading(false); setPaymentError("Payment cancelled."); },
          confirm_close: true,
        },
        handler: async (response) => {
          try {
            // 5. Verify payment signature in Django
            const verRes = await paymentsAPI.verifyPayment({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
            });
            setPaymentLoading(false);
            launchConfetti();
            onSuccess({
              ...rental, receipt_id: verRes.data.receipt_id,
              payment_id: response.razorpay_payment_id,
              grand_total: grandTotal, rent_total: rentTotal,
              platform_fee: platformFee, deposit, days,
              item_title: item.title, renter_name: form.name,
              renter_phone: form.phone, renter_email: form.email,
            });
          } catch {
            setPaymentLoading(false);
            setPaymentError("Payment done but verification failed. Contact support. Payment ID: "+response.razorpay_payment_id);
          }
        },
      });
      rzp.on("payment.failed", r => {
        setPaymentLoading(false);
        setPaymentError("Payment failed: "+r.error.description);
      });
      rzp.open();
    } catch (err) {
      setPaymentLoading(false);
      const data = err.response?.data;
      if (data?.non_field_errors) setPaymentError(data.non_field_errors[0]);
      else if (data?.detail) setPaymentError(data.detail);
      else setPaymentError("Something went wrong. Please try again.");
    }
  };

  const inpStyle = k => ({
    width:"100%", padding:"11px 14px",
    border:`1.5px solid ${errors[k]?"#e53e3e":"#e5e5e5"}`,
    borderRadius:10, fontFamily:"'DM Sans',sans-serif",
    fontSize:"0.92rem", outline:"none", background:"#fafafa", color:"#000", boxSizing:"border-box",
  });
  const Lbl = ({c}) => <label style={{display:"block",fontFamily:"'DM Sans',sans-serif",fontSize:"0.76rem",color:"#666",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.5px"}}>{c}</label>;
  const Err = ({k}) => errors[k] ? <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"0.73rem",color:"#e53e3e",marginTop:4}}>⚠ {errors[k]}</div> : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .bf-overlay{position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.6);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:16px;}
        .bf-modal{background:#fff;border-radius:20px;width:100%;max-width:900px;max-height:90vh;overflow-y:auto;box-shadow:0 40px 100px rgba(0,0,0,0.25);animation:bfUp .3s cubic-bezier(.16,1,.3,1);}
        @keyframes bfUp{from{opacity:0;transform:translateY(32px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        .bf-head{background:linear-gradient(135deg,#FF6B00,#ff9a3c);padding:24px 28px 20px;position:relative;}
        .bf-close{position:absolute;top:14px;right:16px;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.22);border:none;color:#fff;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;}
        .bf-head-title{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;color:#fff;}
        .bf-head-sub{font-family:'DM Sans',sans-serif;font-size:0.83rem;color:rgba(255,255,255,.82);margin-top:3px;}
        .bf-item-mini{display:flex;gap:12px;align-items:center;background:rgba(255,255,255,.16);border-radius:12px;padding:10px 12px;margin-top:14px;}
        .bf-item-thumb{width:44px;height:44px;border-radius:10px;background:rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;font-size:1.4rem;overflow:hidden;flex-shrink:0;}
        .bf-item-thumb img{width:100%;height:100%;object-fit:cover;}
        .bf-item-mini-name{font-family:'Syne',sans-serif;font-weight:700;font-size:0.9rem;color:#fff;}
        .bf-item-mini-sub{font-family:'DM Sans',sans-serif;font-size:0.78rem;color:rgba(255,255,255,.8);margin-top:1px;}
        .bf-body{padding:24px 28px;}
        .bf-steps{display:flex;align-items:center;margin-bottom:24px;}
        .bf-step{display:flex;align-items:center;gap:6px;font-family:'DM Sans',sans-serif;font-size:0.82rem;font-weight:500;color:#bbb;}
        .bf-step.active{color:#FF6B00;}.bf-step.done{color:#2e7d32;}
        .bf-snum{width:24px;height:24px;border-radius:50%;background:#e5e5e5;color:#aaa;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;}
        .bf-step.active .bf-snum{background:#FF6B00;color:#fff;}
        .bf-step.done .bf-snum{background:#2e7d32;color:#fff;}
        .bf-sline{flex:1;height:2px;background:#e5e5e5;margin:0 8px;}
        .bf-sline.done{background:#2e7d32;}
        .bf-field{margin-bottom:14px;}
        .bf-2col{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .bf-summary{background:#fff8f5;border-radius:16px;padding:18px;margin-bottom:14px;border:1px solid #ffe0cc;}
        .bf-sum-title{font-family:'Syne',sans-serif;font-weight:700;font-size:0.9rem;color:#1a1a1a;margin-bottom:12px;}
        .bf-sum-row{display:flex;justify-content:space-between;font-family:'DM Sans',sans-serif;font-size:0.88rem;padding:6px 0;color:#555;}
        .bf-sum-row.total{font-family:'Syne',sans-serif;font-weight:800;font-size:1.05rem;color:#FF6B00;border-top:1.5px solid #ffe0cc;margin-top:8px;padding-top:12px;}
        .bf-sum-row.fee{color:#aaa;font-size:.8rem;}
        .bf-renter{background:#f7f7f7;border-radius:14px;padding:14px 16px;margin-bottom:14px;}
        .bf-renter-title{font-family:'Syne',sans-serif;font-weight:700;font-size:0.85rem;color:#1a1a1a;margin-bottom:8px;}
        .bf-renter-row{display:flex;justify-content:space-between;font-family:'DM Sans',sans-serif;font-size:0.84rem;color:#555;padding:3px 0;}
        .bf-renter-row span:first-child{color:#999;}
        .bf-pay-btn{width:100%;padding:15px;border:none;border-radius:50px;font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;cursor:pointer;transition:all .3s;background:#1a1a1a;color:#fff;display:flex;align-items:center;justify-content:center;gap:10px;}
        .bf-pay-btn:hover:not(:disabled){background:#000;transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,0,0,.25);}
        .bf-pay-btn:disabled{background:#ccc;cursor:not-allowed;}
        .bf-spinner{width:18px;height:18px;border:2.5px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;}
        @keyframes spin{to{transform:rotate(360deg)}}
        .bf-methods{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;}
        .bf-method-pill{display:flex;align-items:center;gap:5px;padding:5px 12px;border-radius:50px;border:1.5px solid #e5e5e5;background:#fafafa;font-family:'DM Sans',sans-serif;font-size:0.75rem;color:#555;}
        .bf-back-btn{width:100%;padding:10px;background:transparent;color:#888;border:none;font-family:'DM Sans',sans-serif;cursor:pointer;margin-top:8px;font-size:0.88rem;}
        .bf-err{background:#fff5f5;border:1px solid #fcc;color:#e53e3e;border-radius:10px;padding:10px 14px;font-family:'DM Sans',sans-serif;font-size:0.83rem;margin-bottom:14px;}
        .bf-trust{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:14px;padding-top:12px;border-top:1px solid #f0f0f0;flex-wrap:wrap;}
        .bf-trust span{font-family:'DM Sans',sans-serif;font-size:0.72rem;color:#aaa;}
        @media(max-width:540px){.bf-2col{grid-template-columns:1fr;}.bf-modal{border-radius:20px 20px 0 0;max-height:95vh;}.bf-overlay{align-items:flex-end;padding:0;}}
      `}</style>

      <div className="bf-overlay" onClick={e=>e.target===e.currentTarget&&!paymentLoading&&onClose()}>
        <div className="bf-modal">
          <div className="bf-head">
            <button className="bf-close" onClick={onClose} disabled={paymentLoading}>✕</button>
            <div className="bf-head-title">{step===1?"Book This Item":"Review & Pay"}</div>
            <div className="bf-head-sub">{step===1?"Fill in your booking details":"Confirm details and pay"}</div>
            <div className="bf-item-mini">
              <div className="bf-item-thumb">
                {item.images?.[0]?.image_url||item.image ? <img src={item.images?.[0]?.image_url||item.image} alt="" /> : "📦"}
              </div>
              <div>
                <div className="bf-item-mini-name">{item.title}</div>
                <div className="bf-item-mini-sub">₹{pricePerDay}/day · 📍 {item.city}</div>
              </div>
            </div>
          </div>

          <div className="bf-body">
            <div className="bf-steps">
              <div className={`bf-step ${step>1?"done":"active"}`}><div className="bf-snum">{step>1?"✓":"1"}</div>Details</div>
              <div className={`bf-sline ${step>1?"done":""}`} />
              <div className={`bf-step ${step===2?"active":""}`}><div className="bf-snum">2</div>Payment</div>
            </div>

            {step===1 && (
              <>
                <div className="bf-2col">
                  <div className="bf-field">
                    <Lbl c="Start Date *" />
                    <input type="date" min={today} value={form.startDate} onChange={e=>u("startDate",e.target.value)} style={inpStyle("startDate")} />
                    <Err k="startDate" />
                  </div>
                  <div className="bf-field">
                    <Lbl c="End Date *" />
                    <input type="date" min={form.startDate||today} value={form.endDate} onChange={e=>u("endDate",e.target.value)} style={inpStyle("endDate")} />
                    <Err k="endDate" />
                  </div>
                </div>
                {days>0 && (
                  <div style={{background:"#e8f5e9",borderRadius:10,padding:"10px 14px",marginBottom:14,fontFamily:"'DM Sans',sans-serif",fontSize:"0.85rem",color:"#2e7d32",fontWeight:600,display:"flex",justifyContent:"space-between"}}>
                    <span>📅 {days} day{days>1?"s":""}</span><span>Total: <strong>₹{grandTotal}</strong></span>
                  </div>
                )}
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",color:"#1a1a1a",margin:"4px 0 14px"}}>Your Details</div>
                <div className="bf-field">
                  <Lbl c="Full Name *" />
                  <input value={form.name} onChange={e=>u("name",e.target.value)} placeholder="Rahul Sharma" style={inpStyle("name")} />
                  <Err k="name" />
                </div>
                <div className="bf-2col">
                  <div className="bf-field">
                    <Lbl c="Phone *" />
                    <input value={form.phone} onChange={e=>u("phone",e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="9876543210" style={inpStyle("phone")} />
                    <Err k="phone" />
                  </div>
                  <div className="bf-field">
                    <Lbl c="Email" />
                    <input value={form.email} onChange={e=>u("email",e.target.value)} placeholder="you@gmail.com" style={inpStyle("email")} />
                  </div>
                </div>
                <div className="bf-field">
                  <Lbl c="Message to Owner (optional)" />
                  <textarea value={form.message} onChange={e=>u("message",e.target.value)} placeholder="Any special requirements..." rows={3} style={{...inpStyle("message"),resize:"vertical"}} />
                </div>
                <button className="bf-pay-btn" style={{background:"#FF6B00"}} onClick={()=>{if(validateStep1())setStep(2);}}>Review & Pay →</button>
                <button className="bf-back-btn" onClick={onClose}>Cancel</button>
              </>
            )}

            {step===2 && (
              <>
                {paymentError && <div className="bf-err">⚠ {paymentError}</div>}
                <div className="bf-summary">
                  <div className="bf-sum-title">💰 Price Breakdown</div>
                  <div className="bf-sum-row"><span>Rent (₹{pricePerDay} × {days} day{days>1?"s":""})</span><span>₹{rentTotal}</span></div>
                  <div className="bf-sum-row"><span>Refundable Deposit</span><span>₹{deposit}</span></div>
                  <div className="bf-sum-row fee"><span>Platform Fee (2%)</span><span>₹{platformFee}</span></div>
                  <div className="bf-sum-row total"><span>Total Payable</span><span>₹{grandTotal}</span></div>
                </div>
                <div className="bf-summary" style={{background:"#f0f7ff",borderColor:"#cce0ff"}}>
                  <div className="bf-sum-title">📅 Rental Period</div>
                  <div className="bf-sum-row"><span>From</span><span style={{fontWeight:600}}>{new Date(form.startDate).toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short",year:"numeric"})}</span></div>
                  <div className="bf-sum-row"><span>To</span><span style={{fontWeight:600}}>{new Date(form.endDate).toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short",year:"numeric"})}</span></div>
                  <div className="bf-sum-row"><span>Duration</span><span style={{fontWeight:600}}>{days} day{days>1?"s":""}</span></div>
                </div>
                <div className="bf-renter">
                  <div className="bf-renter-title">👤 Renter Details</div>
                  {[["Name",form.name],["Phone",form.phone],["Email",form.email||"—"]].map(([k,v])=>(
                    <div className="bf-renter-row" key={k}><span>{k}</span><span>{v}</span></div>
                  ))}
                </div>
                <div className="bf-methods">
                  {[["📱","UPI"],["💳","Cards"],["🏦","Net Banking"],["👜","Wallets"]].map(([ic,lbl])=>(
                    <div className="bf-method-pill" key={lbl}>{ic} {lbl}</div>
                  ))}
                </div>
                <button className="bf-pay-btn" onClick={handlePayment} disabled={paymentLoading}>
                  {paymentLoading ? <><div className="bf-spinner"/> Processing...</> : <>🔒 Pay ₹{grandTotal} via Razorpay</>}
                </button>
                {!paymentLoading && (
                  <button className="bf-back-btn" onClick={()=>{setStep(1);setPaymentError("");}}>← Edit Details</button>
                )}
                <div className="bf-trust">
                  <span>🔒 256-bit SSL</span><span>📱 UPI / GPay / PhonePe</span>
                  <span>💳 All Cards</span><span>🏦 Powered by Razorpay</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}