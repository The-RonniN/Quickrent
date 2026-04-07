// import { useState } from "react";
// import { useApp, useAuth } from "../App";

// const CATS = [
//   "Electronics",
//   "Vehicles",
//   "Party & Events",
//   "Sports & Outdoor",
//   "Tools & Equipment",
//   "Furniture & Appliances",
// ];
// const CONDITIONS = ["Brand New", "Excellent", "Good", "Fair"];

// const Field = ({
//   k,
//   label,
//   ph,
//   type = "text",
//   full = true,
//   form,
//   u,
//   errors,
//   bgColor = "#fafafa",
// }) => (
//   <div style={{ marginBottom: 16, gridColumn: full ? "1/-1" : "auto" }}>
//     <label
//       style={{
//         display: "block",
//         fontFamily: "'DM Sans',sans-serif",
//         fontSize: "0.78rem",
//         color: "#666",
//         marginBottom: 5,
//         textTransform: "uppercase",
//         letterSpacing: "0.5px",
//       }}
//     >
//       {label}
//     </label>
//     <input
//       type={type === "numeric" ? "text" : type}
//       inputMode={type === "numeric" ? "numeric" : undefined}
//       placeholder={ph}
//       value={form[k]}
//       onChange={(e) => {
//         let val = e.target.value;
//         if (type === "numeric") {
//           val = val.replace(/[^0-9]/g, "");
//         }
//         u(k, val);
//       }}
//       maxLength={type === "text" || type === "numeric" ? "200" : undefined}
//       style={{
//         width: "100%",
//         padding: "11px 14px",
//         border: `1.5px solid ${errors[k] ? "#e53e3e" : "#e5e5e5"}`,
//         borderRadius: 10,
//         fontFamily: "'DM Sans',sans-serif",
//         fontSize: "0.92rem",
//         outline: "none",
//         background: bgColor,
//         color: "#000",
//       }}
//       onFocus={(e) => (e.target.style.borderColor = "#FF6B00")}
//       onBlur={(e) =>
//         (e.target.style.borderColor = errors[k] ? "#e53e3e" : "#e5e5e5")
//       }
//     />
//     {errors[k] && (
//       <div
//         style={{
//           fontFamily: "'DM Sans',sans-serif",
//           fontSize: "0.75rem",
//           color: "#e53e3e",
//           marginTop: 4,
//         }}
//       >
//         ⚠ {errors[k]}
//       </div>
//     )}
//   </div>
// );

// export default function ListPage({ navigate, openAuth }) {
//   const { addItem } = useApp();
//   const { user } = useAuth();
//   //date funcion added
//   const [form, setForm] = useState({
//     title: "",
//     category: "Electronics",
//     description: "",
//     price: "",
//     deposit: "",
//     city: "",
//     condition: "Good",
//     availableFrom: new Date().toISOString().split("T")[0],
//     images: [],
//   });
//   const [success, setSuccess] = useState(false);
//   const [errors, setErrors] = useState({});

//   const u = (k, v) => setForm((f) => ({ ...f, [k]: v }));

//   // Guard — must be logged in as lister
//   if (!user) {
//     return (
//       <div
//         style={{
//           paddingTop: 90,
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: "#f7f7f7",
//           flexDirection: "column",
//           gap: 16,
//           padding: "90px 20px 40px",
//         }}
//       >
//         <div style={{ fontSize: "3rem" }}>🔒</div>
//         <div
//           style={{
//             fontFamily: "'Syne',sans-serif",
//             fontSize: "1.4rem",
//             fontWeight: 800,
//             color: "#1a1a1a",
//             textAlign: "center",
//           }}
//         >
//           Login Required
//         </div>
//         <div
//           style={{
//             fontFamily: "'DM Sans',sans-serif",
//             color: "#888",
//             textAlign: "center",
//           }}
//         >
//           You need to be logged in to list an item.
//         </div>
//         <button
//           onClick={() => openAuth("signup")}
//           style={{
//             padding: "12px 32px",
//             background: "#FF6B00",
//             color: "#fff",
//             border: "none",
//             borderRadius: 50,
//             fontFamily: "'Syne',sans-serif",
//             fontWeight: 700,
//             cursor: "pointer",
//             fontSize: "0.97rem",
//           }}
//         >
//           Create Account →
//         </button>
//       </div>
//     );
//   }

//   if (user.role !== "lister") {
//     return (
//       <div
//         style={{
//           paddingTop: 90,
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: "#f7f7f7",
//           flexDirection: "column",
//           gap: 16,
//           padding: "90px 20px 40px",
//         }}
//       >
//         <div style={{ fontSize: "3rem" }}>🏠</div>
//         <div
//           style={{
//             fontFamily: "'Syne',sans-serif",
//             fontSize: "1.4rem",
//             fontWeight: 800,
//             color: "#1a1a1a",
//             textAlign: "center",
//           }}
//         >
//           Lister Account Required
//         </div>
//         <div
//           style={{
//             fontFamily: "'DM Sans',sans-serif",
//             color: "#888",
//             textAlign: "center",
//             maxWidth: 360,
//           }}
//         >
//           You currently have a Renter account. Switch to a Lister account from
//           your profile to list items.
//         </div>
//         <button
//           onClick={() => navigate("profile")}
//           style={{
//             padding: "12px 32px",
//             background: "#FF6B00",
//             color: "#fff",
//             border: "none",
//             borderRadius: 50,
//             fontFamily: "'Syne',sans-serif",
//             fontWeight: 700,
//             cursor: "pointer",
//             fontSize: "0.97rem",
//           }}
//         >
//           Go to Profile →
//         </button>
//       </div>
//     );
//   }

//   const validate = () => {
//     const e = {};
//     if (!form.title.trim()) e.title = "Title is required";
//     if (!form.description.trim()) e.description = "Description is required";
//     if (!form.price || isNaN(form.price) || +form.price <= 0)
//       e.price = "Enter a valid price";
//     if (!form.deposit || isNaN(form.deposit) || +form.deposit < 0)
//       e.deposit = "Enter a valid deposit";
//     if (!form.city.trim()) e.city = "City is required";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = () => {
//     if (!validate()) return;
//     addItem({ ...form, price: +form.price, deposit: +form.deposit });
//     setSuccess(true);
//     setForm({
//       title: "",
//       category: "Electronics",
//       description: "",
//       price: "",
//       deposit: "",
//       city: "",
//       condition: "Good",
//       availableFrom: new Date().toISOString().split("T")[0],
//       images: [],
//     });
//   };

//   if (success) {
//     return (
//       <div
//         style={{
//           paddingTop: 90,
//           minHeight: "100vh",
//           background: "#f7f7f7",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: "90px 20px 40px",
//         }}
//       >
//         <div
//           style={{
//             background: "#fff",
//             borderRadius: 24,
//             padding: "48px 36px",
//             textAlign: "center",
//             maxWidth: 400,
//             width: "100%",
//             boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
//           }}
//         >
//           <div style={{ fontSize: "3.5rem", marginBottom: 12 }}>✅</div>
//           <div
//             style={{
//               fontFamily: "'Syne',sans-serif",
//               fontSize: "1.5rem",
//               fontWeight: 800,
//               color: "#1a1a1a",
//             }}
//           >
//             Item Listed!
//           </div>
//           <div
//             style={{
//               fontFamily: "'DM Sans',sans-serif",
//               color: "#888",
//               marginTop: 8,
//               lineHeight: 1.6,
//             }}
//           >
//             Your item is now live on QuickRent and visible to renters.
//           </div>
//           <div
//             style={{
//               display: "flex",
//               gap: 10,
//               marginTop: 24,
//               flexDirection: "column",
//             }}
//           >
//             <button
//               onClick={() => {
//                 setSuccess(false);
//               }}
//               style={{
//                 padding: "12px",
//                 background: "#FF6B00",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: 50,
//                 fontFamily: "'Syne',sans-serif",
//                 fontWeight: 700,
//                 cursor: "pointer",
//               }}
//             >
//               List Another Item
//             </button>
//             <button
//               onClick={() => navigate("rent")}
//               style={{
//                 padding: "12px",
//                 background: "transparent",
//                 color: "#FF6B00",
//                 border: "2px solid #FF6B00",
//                 borderRadius: 50,
//                 fontFamily: "'Syne',sans-serif",
//                 fontWeight: 700,
//                 cursor: "pointer",
//               }}
//             >
//               View All Listings
//             </button>
//             <button
//               onClick={() => navigate("profile")}
//               style={{
//                 padding: "12px",
//                 background: "transparent",
//                 color: "#888",
//                 border: "none",
//                 fontFamily: "'DM Sans',sans-serif",
//                 cursor: "pointer",
//               }}
//             >
//               Go to Dashboard
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
//         .lp{padding-top:68px;min-height:100vh;background:#f7f7f7;}
//         .lp-hero{background:#1a1a1a;padding:40px 48px;}
//         .lp-hero h1{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:#fff;}
//         .lp-hero p{font-family:'DM Sans',sans-serif;font-size:0.92rem;color:#aaa;margin-top:6px;}
//         .lp-wrap{max-width:680px;margin:32px auto;padding:0 24px 48px;}
//         .lp-card{background:#fff;border-radius:22px;padding:32px;box-shadow:0 2px 18px rgba(0,0,0,0.06);}
//         .lp-section-title{font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;color:#1a1a1a;margin-bottom:18px;padding-bottom:10px;border-bottom:2px solid #f0f0f0;}
//         .lp-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 14px;}
//         input[type="text"], input[type="number"], input[type="date"] { color: #000 !important; }
//         input::placeholder { color: #999 !important; }
//         .lp-select{width:100%;padding:"11px 14px";border:1.5px solid #e5e5e5;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:0.92rem;outline:none;background:#fafafa;cursor:pointer;margin-bottom:16px;color:#000;}
//         .lp-textarea{width:100%;padding:11px 14px;border:1.5px solid #e5e5e5;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:0.92rem;outline:none;background:#fafafa;resize:vertical;margin-bottom:16px;color:#000;}
//         .lp-submit{width:100%;padding:14px;background:#FF6B00;color:#fff;border:none;border-radius:50px;font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;cursor:pointer;transition:all .2s;margin-top:8px;}
//         .lp-submit:hover{background:#e05e00;transform:translateY(-1px);}
//         .cond-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;}
//         .cond-btn{padding:8px 16px;border-radius:50px;border:1.5px solid #e5e5e5;background:#fafafa;font-family:'DM Sans',sans-serif;font-size:0.83rem;cursor:pointer;transition:all .2s;}
//         .cond-btn.active{border-color:#FF6B00;background:#fff5ee;color:#FF6B00;}
//         @media(max-width:600px){.lp-hero{padding:28px 20px;}.lp-grid{grid-template-columns:1fr;}.lp-wrap{padding:0 16px 40px;}}
//       `}</style>

//       <div className="lp">
//         <div className="lp-hero">
//           <h1>List Your Item</h1>
//           <p>
//             Fill in the details below and start earning from your idle items.
//           </p>
//         </div>

//         <div className="lp-wrap">
//           <div className="lp-card">
//             {/* Basic Info */}
//             <div className="lp-section-title">📦 Item Details</div>
//             <Field
//               k="title"
//               label="Item Title *"
//               ph="e.g. Sony A7III Camera"
//               full
//               form={form}
//               u={u}
//               errors={errors}
//             />

//             <div style={{ marginBottom: 16 }}>
//               <label
//                 style={{
//                   display: "block",
//                   fontFamily: "'DM Sans',sans-serif",
//                   fontSize: "0.78rem",
//                   color: "#666",
//                   marginBottom: 5,
//                   textTransform: "uppercase",
//                   letterSpacing: "0.5px",
//                 }}
//               >
//                 Category *
//               </label>
//               <select
//                 className="lp-select"
//                 style={{ padding: "11px 14px" }}
//                 value={form.category}
//                 onChange={(e) => u("category", e.target.value)}
//               >
//                 {CATS.map((c) => (
//                   <option key={c}>{c}</option>
//                 ))}
//               </select>
//             </div>

//             <div style={{ marginBottom: 16 }}>
//               <label
//                 style={{
//                   display: "block",
//                   fontFamily: "'DM Sans',sans-serif",
//                   fontSize: "0.78rem",
//                   color: "#666",
//                   marginBottom: 5,
//                   textTransform: "uppercase",
//                   letterSpacing: "0.5px",
//                 }}
//               >
//                 Condition *
//               </label>
//               <div className="cond-row">
//                 {CONDITIONS.map((c) => (
//                   <div
//                     key={c}
//                     className={`cond-btn ${form.condition === c ? "active" : ""}`}
//                     onClick={() => u("condition", c)}
//                   >
//                     {c}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div style={{ marginBottom: 16 }}>
//               <label
//                 style={{
//                   display: "block",
//                   fontFamily: "'DM Sans',sans-serif",
//                   fontSize: "0.78rem",
//                   color: "#666",
//                   marginBottom: 5,
//                   textTransform: "uppercase",
//                   letterSpacing: "0.5px",
//                 }}
//               >
//                 Description *
//               </label>
//               <textarea
//                 className="lp-textarea"
//                 rows={4}
//                 placeholder="Describe your item — what's included, any usage notes..."
//                 value={form.description}
//                 onChange={(e) => u("description", e.target.value)}
//                 style={{
//                   borderColor: errors.description ? "#e53e3e" : "#e5e5e5",
//                 }}
//               />
//               {errors.description && (
//                 <div
//                   style={{
//                     fontFamily: "'DM Sans',sans-serif",
//                     fontSize: "0.75rem",
//                     color: "#e53e3e",
//                     marginTop: -10,
//                     marginBottom: 12,
//                   }}
//                 >
//                   ⚠ {errors.description}
//                 </div>
//               )}
//             </div>

//             {/* Pricing */}
//             <div className="lp-section-title">💰 Pricing</div>
//             <div className="lp-grid">
//               <Field
//                 k="price"
//                 label="Rent per Day (₹) *"
//                 ph="e.g. 500"
//                 type="numeric"
//                 form={form}
//                 u={u}
//                 errors={errors}
//               />
//               <Field
//                 k="deposit"
//                 label="Refundable Deposit (₹) *"
//                 ph="e.g. 2000"
//                 type="numeric"
//                 form={form}
//                 u={u}
//                 errors={errors}
//               />
//             </div>

//             {/* Location */}
//             <div className="lp-section-title">📍 Location & Availability</div>
//             <Field
//               k="city"
//               label="City *"
//               ph="Pune, Mumbai, Bangalore..."
//               full
//               form={form}
//               u={u}
//               errors={errors}
//             />
//             {/* available from date added */}
//             <Field
//               k="availableFrom"
//               label="Available From"
//               type="date"
//               full
//               form={form}
//               u={u}
//               errors={errors}
//               bgColor="#e2dddd"
//             />

//             {/* Photos */}
//             <div className="lp-section-title" style={{ marginTop: 24 }}>
//               📸 Photos
//             </div>
//             <div style={{ marginBottom: 16 }}>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={(e) => {
//                   const files = Array.from(e.target.files);
//                   const newImages = files.map((f) => URL.createObjectURL(f));
//                   u("images", [...(form.images || []), ...newImages]);
//                 }}
//                 style={{
//                   marginBottom: 12,
//                   width: "100%",
//                   padding: "8px",
//                   background: "#fff",
//                   borderRadius: 8,
//                   border: "1.5px solid #e5e5e5",
//                   fontFamily: "'DM Sans',sans-serif",
//                   fontSize: "0.9rem",
//                 }}
//               />
//               {form.images && form.images.length > 0 && (
//                 <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//                   {form.images.map((img, idx) => (
//                     <div
//                       key={idx}
//                       style={{ position: "relative", width: 80, height: 80 }}
//                     >
//                       <img
//                         src={img}
//                         alt="preview"
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover",
//                           borderRadius: 8,
//                         }}
//                       />
//                       <button
//                         onClick={() =>
//                           u(
//                             "images",
//                             form.images.filter((_, i) => i !== idx),
//                           )
//                         }
//                         style={{
//                           position: "absolute",
//                           top: -5,
//                           right: -5,
//                           background: "#e53e3e",
//                           color: "white",
//                           borderRadius: "50%",
//                           border: "none",
//                           width: 22,
//                           height: 22,
//                           cursor: "pointer",
//                           fontSize: 12,
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <button className="lp-submit" onClick={handleSubmit}>
//               🚀 List My Item →
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

//--------------------------------------------
import { useState, useRef } from "react";
import { useApp, useAuth } from "../App";

const CATS = [
  "Electronics",
  "Vehicles",
  "Party & Events",
  "Sports & Outdoor",
  "Tools & Equipment",
  "Furniture & Appliances",
];
const CONDITIONS = ["Brand New", "Excellent", "Good", "Fair"];
const MAX_IMAGES = 4;

const Field = ({ k, label, ph, type = "text", full = false, min, form, u, errors }) => {
  const value = form[k] ?? "";
  const handleChange = (e) => {
    const raw = e.currentTarget.value;
    const nextValue = type === "number" ? raw.replace(/[^0-9]/g, "") : raw;
    u(k, nextValue);
  };

  return (
    <div style={{ marginBottom: 16, gridColumn: full ? "1/-1" : "auto" }}>
      <label
        style={{
          display: "block",
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.78rem",
          color: "#666",
          marginBottom: 5,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {label}
      </label>
      <input
        type={type === "number" ? "text" : type}
        inputMode={type === "number" ? "numeric" : undefined}
        placeholder={ph}
        value={value}
        min={type === "date" || type === "number" ? min : undefined}
        onChange={handleChange}
        autoComplete="off"
        spellCheck={false}
        style={{
          width: "100%",
          padding: "11px 14px",
          border: `1.5px solid ${errors[k] ? "#e53e3e" : "#000000"}`,
          borderRadius: 10,
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.92rem",
          outline: "none",
          background: "#f5f5f5",
          color: "#000",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#FF6B00")}
        onBlur={(e) =>
          (e.target.style.borderColor = errors[k] ? "#e53e3e" : "#000000")
        }
      />
      {errors[k] && (
        <div
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.75rem",
            color: "#e53e3e",
            marginTop: 4,
          }}
        >
          ⚠ {errors[k]}
        </div>
      )}
    </div>
  );
};

export default function ListPage({ navigate, openAuth }) {
  const { addItem } = useApp();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    category: "Electronics",
    description: "",
    price: "",
    deposit: "",
    city: "",
    condition: "Good",
    availableFrom: "",
  });
  const [images, setImages] = useState([]); // array of base64 strings, max 4
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const fileRef = useRef();

  const u = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // ── Multi-image handler ─────────────────────────────────────────
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) return;

    const toRead = files.slice(0, remaining);
    toRead.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is over 5MB, skipped.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages((prev) =>
          prev.length < MAX_IMAGES ? [...prev, ev.target.result] : prev,
        );
      };
      reader.readAsDataURL(file);
    });
    // reset input so same file can be re-selected
    if (fileRef.current) fileRef.current.value = "";
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const moveImage = (from, to) => {
    setImages((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      return arr;
    });
  };

  // ── Guards ──────────────────────────────────────────────────────
  if (!user) {
    return (
      <div
        style={{
          paddingTop: 90,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f7f7",
          flexDirection: "column",
          gap: 16,
          padding: "90px 20px 40px",
        }}
      >
        <div style={{ fontSize: "3rem" }}>🔒</div>
        <div
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: "1.4rem",
            fontWeight: 800,
            color: "#1a1a1a",
            textAlign: "center",
          }}
        >
          Login Required
        </div>
        <div
          style={{
            fontFamily: "'DM Sans',sans-serif",
            color: "#888",
            textAlign: "center",
          }}
        >
          You need to be logged in to list an item.
        </div>
        <button
          onClick={() => openAuth("signup")}
          style={{
            padding: "12px 32px",
            background: "#FF6B00",
            color: "#fff",
            border: "none",
            borderRadius: 50,
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "0.97rem",
          }}
        >
          Create Account →
        </button>
      </div>
    );
  }

  if (user.role !== "lister") {
    return (
      <div
        style={{
          paddingTop: 90,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f7f7",
          flexDirection: "column",
          gap: 16,
          padding: "90px 20px 40px",
        }}
      >
        <div style={{ fontSize: "3rem" }}>🏠</div>
        <div
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: "1.4rem",
            fontWeight: 800,
            color: "#1a1a1a",
            textAlign: "center",
          }}
        >
          Lister Account Required
        </div>
        <div
          style={{
            fontFamily: "'DM Sans',sans-serif",
            color: "#888",
            textAlign: "center",
            maxWidth: 360,
          }}
        >
          You currently have a Renter account. Switch to a Lister account from
          your profile to list items.
        </div>
        <button
          onClick={() => navigate("profile")}
          style={{
            padding: "12px 32px",
            background: "#FF6B00",
            color: "#fff",
            border: "none",
            borderRadius: 50,
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "0.97rem",
          }}
        >
          Go to Profile →
        </button>
      </div>
    );
  }

  // ── Validation ──────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.price || isNaN(form.price) || +form.price <= 0)
      e.price = "Enter a valid price";
    if (!form.deposit || isNaN(form.deposit) || +form.deposit < 0)
      e.deposit = "Enter a valid deposit amount";
    if (!form.city.trim()) e.city = "City is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    addItem({
      ...form,
      price: +form.price,
      deposit: +form.deposit,
      images: images, // ← array of up to 4 base64 images
      image: images[0] || null, // ← keep single image field for backward compat
    });
    setSuccess(true);
    setForm({
      title: "",
      category: "Electronics",
      description: "",
      price: "",
      deposit: "",
      city: "",
      condition: "Good",
      availableFrom: "",
    });
    setImages([]);
  };

  // ── Success screen ──────────────────────────────────────────────
  if (success) {
    return (
      <div
        style={{
          paddingTop: 90,
          minHeight: "100vh",
          background: "#f7f7f7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "90px 20px 40px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            padding: "48px 36px",
            textAlign: "center",
            maxWidth: 400,
            width: "100%",
            boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: "3.5rem", marginBottom: 12 }}>✅</div>
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#1a1a1a",
            }}
          >
            Item Listed!
          </div>
          <div
            style={{
              fontFamily: "'DM Sans',sans-serif",
              color: "#888",
              marginTop: 8,
              lineHeight: 1.6,
            }}
          >
            Your item is now live on QuickRent and visible to renters.
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 24,
              flexDirection: "column",
            }}
          >
            <button
              onClick={() => setSuccess(false)}
              style={{
                padding: "12px",
                background: "#FF6B00",
                color: "#fff",
                border: "none",
                borderRadius: 50,
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              List Another Item
            </button>
            <button
              onClick={() => navigate("rent")}
              style={{
                padding: "12px",
                background: "transparent",
                color: "#FF6B00",
                border: "2px solid #FF6B00",
                borderRadius: 50,
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              View All Listings
            </button>
            <button
              onClick={() => navigate("profile")}
              style={{
                padding: "12px",
                background: "transparent",
                color: "#888",
                border: "none",
                fontFamily: "'DM Sans',sans-serif",
                cursor: "pointer",
              }}
            >
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
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0;}
        input[type="number"]{-moz-appearance:textfield;}
        input[type="text"],input[type="number"],input[type="date"]{color:#000!important;}
        input::placeholder{color:#999!important;}
        .lp-select{width:100%;padding:11px 14px;border:1.5px solid #000000;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:0.92rem;outline:none;background:#f5f5f5;cursor:pointer;margin-bottom:16px;color:#000;}
        .lp-textarea{width:100%;padding:11px 14px;border:1.5px solid #000000;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:0.92rem;outline:none;background:#f5f5f5;resize:vertical;margin-bottom:16px;color:#000;}
        .lp-submit{width:100%;padding:14px;background:#FF6B00;color:#fff;border:none;border-radius:50px;font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;cursor:pointer;transition:all .2s;margin-top:8px;}
        .lp-submit:hover{background:#e05e00;transform:translateY(-1px);}
        .cond-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;}
        .cond-btn{padding:8px 16px;border-radius:50px;border:1.5px solid #e5e5e5;background:#fafafa;font-family:'DM Sans',sans-serif;font-size:0.83rem;cursor:pointer;transition:all .2s;}
        .cond-btn.active{border-color:#FF6B00;background:#fff5ee;color:#FF6B00;}

        /* Multi-image grid */
        .img-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:8px;}
        .img-slot{
          aspect-ratio:1;border-radius:12px;overflow:hidden;position:relative;
          border:2px dashed #e0e0e0;background:#fafafa;
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;transition:border .2s,background .2s;
        }
        .img-slot.filled{border-style:solid;border-color:#FF6B00;cursor:default;}
        .img-slot.add:hover{border-color:#FF6B00;background:#fff8f5;}
        .img-slot img{width:100%;height:100%;object-fit:cover;display:block;}
        .img-slot-remove{
          position:absolute;top:4px;right:4px;
          width:22px;height:22px;border-radius:50%;
          background:rgba(0,0,0,0.6);color:#fff;
          border:none;font-size:0.75rem;cursor:pointer;
          display:flex;align-items:center;justify-content:center;
          transition:background .2s;
        }
        .img-slot-remove:hover{background:rgba(229,62,62,0.9);}
        .img-slot-num{
          position:absolute;bottom:4px;left:4px;
          background:rgba(0,0,0,0.55);color:#fff;
          font-size:0.6rem;font-family:'DM Sans',sans-serif;
          padding:1px 6px;border-radius:50px;font-weight:700;
        }
        .img-slot-add-icon{font-size:1.6rem;color:#ccc;}
        .img-slot-add-lbl{font-family:'DM Sans',sans-serif;font-size:0.65rem;color:#bbb;margin-top:4px;text-align:center;}

        @media(max-width:600px){
          .lp-hero{padding:28px 20px;}
          .lp-grid{grid-template-columns:1fr;}
          .lp-wrap{padding:0 16px 40px;}
          .img-grid{grid-template-columns:repeat(2,1fr);}
        }
      `}</style>

      <div className="lp">
        <div className="lp-hero">
          <h1>List Your Item</h1>
          <p>
            Fill in the details below and start earning from your idle items.
          </p>
        </div>

        <div className="lp-wrap">
          <div className="lp-card">
            {/* ── Item Details ── */}
            <div className="lp-section-title">📦 Item Details</div>
            <Field
              k="title"
              label="Item Title *"
              ph="e.g. Sony A7III Camera with 28-70mm Kit Lens"
              full
              form={form}
              u={u}
              errors={errors}
            />

            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.78rem",
                  color: "#666",
                  marginBottom: 5,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Category *
              </label>
              <select
                className="lp-select"
                value={form.category}
                onChange={(e) => u("category", e.target.value)}
              >
                {CATS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.78rem",
                  color: "#666",
                  marginBottom: 5,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Condition *
              </label>
              <div className="cond-row">
                {CONDITIONS.map((c) => (
                  <div
                    key={c}
                    className={`cond-btn ${form.condition === c ? "active" : ""}`}
                    onClick={() => u("condition", c)}
                  >
                    {c}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.78rem",
                  color: "#666",
                  marginBottom: 5,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Description *
              </label>
              <textarea
                className="lp-textarea"
                rows={4}
                placeholder="Describe your item — accessories included, usage notes, pickup location..."
                value={form.description}
                onChange={(e) => u("description", e.target.value)}
                style={{
                  borderColor: errors.description ? "#e53e3e" : "#e5e5e5",
                }}
              />
              {errors.description && (
                <div
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.75rem",
                    color: "#e53e3e",
                    marginTop: -10,
                    marginBottom: 12,
                  }}
                >
                  ⚠ {errors.description}
                </div>
              )}
            </div>

            {/* ── Photos: up to 4 ── */}
            <div className="lp-section-title">
              📸 Item Photos
              <span
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 400,
                  fontSize: "0.78rem",
                  color: "#aaa",
                  marginLeft: 8,
                }}
              >
                {images.length}/{MAX_IMAGES} uploaded · First photo is the cover
              </span>
            </div>

            <div className="img-grid">
              {/* Filled slots */}
              {images.map((src, i) => (
                <div className="img-slot filled" key={i}>
                  <img src={src} alt={`photo ${i + 1}`} />
                  <button
                    className="img-slot-remove"
                    onClick={() => removeImage(i)}
                  >
                    ✕
                  </button>
                  <div className="img-slot-num">
                    {i === 0 ? "Cover" : `#${i + 1}`}
                  </div>
                  {/* Move left/right arrows */}
                  {i > 0 && (
                    <button
                      onClick={() => moveImage(i, i - 1)}
                      style={{
                        position: "absolute",
                        bottom: 4,
                        left: 4,
                        background: "rgba(0,0,0,0.55)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 50,
                        width: 20,
                        height: 20,
                        cursor: "pointer",
                        fontSize: "0.6rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      ←
                    </button>
                  )}
                  {i < images.length - 1 && (
                    <button
                      onClick={() => moveImage(i, i + 1)}
                      style={{
                        position: "absolute",
                        bottom: 4,
                        right: i > 0 ? 28 : 4,
                        background: "rgba(0,0,0,0.55)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 50,
                        width: 20,
                        height: 20,
                        cursor: "pointer",
                        fontSize: "0.6rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      →
                    </button>
                  )}
                </div>
              ))}

              {/* Add slot — show if < 4 images */}
              {images.length < MAX_IMAGES && (
                <div
                  className="img-slot add"
                  onClick={() => fileRef.current?.click()}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div className="img-slot-add-icon">+</div>
                    <div className="img-slot-add-lbl">Add Photo</div>
                  </div>
                </div>
              )}

              {/* Empty placeholder slots */}
              {Array.from({
                length: Math.max(0, MAX_IMAGES - images.length - 1),
              }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="img-slot"
                  style={{ opacity: 0.4, cursor: "default" }}
                >
                  <div
                    className="img-slot-add-icon"
                    style={{ fontSize: "1.2rem" }}
                  >
                    📷
                  </div>
                </div>
              ))}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.75rem",
                color: "#aaa",
                marginBottom: 20,
                lineHeight: 1.5,
              }}
            >
              💡 Items with photos get rented 3× more · Use ← → to reorder ·
              First photo becomes the cover image
            </div>

            {/* ── Pricing ── */}
            <div className="lp-section-title">💰 Pricing</div>
            <div className="lp-grid">
              <Field
                k="price"
                label="Rent per Day (₹) *"
                ph="e.g. 500"
                type="number"
                min="1"
                form={form}
                u={u}
                errors={errors}
              />
              <Field
                k="deposit"
                label="Refundable Deposit (₹) *"
                ph="e.g. 2000"
                type="number"
                min="0"
                form={form}
                u={u}
                errors={errors}
              />
            </div>

            {/* ── Location ── */}
            <div className="lp-section-title">📍 Location & Availability</div>
            <Field
              k="city"
              label="City *"
              ph="Pune, Mumbai, Bangalore..."
              full
              form={form}
              u={u}
              errors={errors}
            />
            <Field
              k="availableFrom"
              label="Available From"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              full
              form={form}
              u={u}
              errors={errors}
            />

            <button className="lp-submit" onClick={handleSubmit}>
              🚀 List My Item →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
