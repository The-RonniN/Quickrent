// generateReceipt.js
// Generates a professional PDF receipt using the browser's print API
// No external library needed - works in all browsers

export function generateReceiptPDF(rental) {
  const fmt = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });

  const now = new Date().toLocaleString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>QuickRent Receipt – ${rental.receiptId}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: #fff;
      color: #1a1a1a;
      padding: 0;
    }

    .page {
      max-width: 680px;
      margin: 0 auto;
      padding: 48px 48px 64px;
    }

    /* ── Header ── */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 28px;
      border-bottom: 3px solid #FF6B00;
      margin-bottom: 32px;
    }
    .logo {
      font-family: 'Syne', sans-serif;
      font-size: 2rem;
      font-weight: 800;
      color: #FF6B00;
      letter-spacing: -1px;
    }
    .logo-sub {
      font-size: 0.78rem;
      color: #aaa;
      margin-top: 3px;
      font-weight: 400;
    }
    .receipt-badge {
      text-align: right;
    }
    .receipt-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: #1a1a1a;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .receipt-id {
      font-size: 1.4rem;
      font-weight: 700;
      color: #FF6B00;
      font-family: 'Syne', sans-serif;
      margin-top: 4px;
    }
    .receipt-date {
      font-size: 0.78rem;
      color: #999;
      margin-top: 3px;
    }

    /* ── Status banner ── */
    .status-banner {
      background: #e8f5e9;
      border-left: 4px solid #2e7d32;
      border-radius: 10px;
      padding: 14px 18px;
      margin-bottom: 28px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .status-icon { font-size: 1.5rem; }
    .status-text { font-weight: 600; font-size: 0.95rem; color: #2e7d32; }
    .status-sub { font-size: 0.8rem; color: #555; margin-top: 2px; }

    /* ── Two column layout ── */
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 28px;
    }
    .info-box {
      background: #f9f9f9;
      border-radius: 12px;
      padding: 18px 20px;
    }
    .info-box-title {
      font-family: 'Syne', sans-serif;
      font-size: 0.78rem;
      font-weight: 700;
      color: #FF6B00;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 12px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      font-size: 0.85rem;
      border-bottom: 1px solid #f0f0f0;
    }
    .info-row:last-child { border-bottom: none; }
    .info-key { color: #888; }
    .info-val { font-weight: 600; color: #1a1a1a; text-align: right; }

    /* ── Item section ── */
    .item-section {
      background: #fff5ee;
      border-radius: 12px;
      padding: 18px 20px;
      margin-bottom: 28px;
      border: 1px solid #ffe0cc;
    }
    .item-section-title {
      font-family: 'Syne', sans-serif;
      font-size: 0.78rem;
      font-weight: 700;
      color: #FF6B00;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 10px;
    }
    .item-name {
      font-family: 'Syne', sans-serif;
      font-size: 1.15rem;
      font-weight: 800;
      color: #1a1a1a;
    }
    .item-meta {
      font-size: 0.82rem;
      color: #777;
      margin-top: 4px;
    }

    /* ── Price table ── */
    .price-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 28px;
    }
    .price-table th {
      background: #1a1a1a;
      color: #fff;
      padding: 10px 16px;
      text-align: left;
      font-family: 'Syne', sans-serif;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .price-table th:last-child { text-align: right; }
    .price-table td {
      padding: 10px 16px;
      font-size: 0.88rem;
      border-bottom: 1px solid #f0f0f0;
    }
    .price-table td:last-child { text-align: right; font-weight: 600; }
    .price-table tr:nth-child(even) td { background: #fafafa; }
    .price-table .total-row td {
      background: #FF6B00 !important;
      color: #fff;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 0.95rem;
      border: none;
    }
    .price-table .deposit-row td { color: #2e7d32; }

    /* ── Footer ── */
    .footer {
      border-top: 2px solid #f0f0f0;
      padding-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .footer-left { font-size: 0.78rem; color: #aaa; line-height: 1.6; }
    .footer-brand {
      font-family: 'Syne', sans-serif;
      font-size: 1rem;
      font-weight: 800;
      color: #FF6B00;
    }
    .qr-placeholder {
      width: 60px; height: 60px;
      background: #f0f0f0;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
    }

    @media print {
      body { padding: 0; }
      .page { padding: 24px 32px 40px; }
    }
  </style>
</head>
<body>
<div class="page">

  <!-- Header -->
  <div class="header">
    <div>
      <div class="logo">QuickRent</div>
      <div class="logo-sub">TAP. RENT. MOVE. NOW.</div>
    </div>
    <div class="receipt-badge">
      <div class="receipt-title">Rental Receipt</div>
      <div class="receipt-id">${rental.receiptId}</div>
      <div class="receipt-date">Generated: ${now}</div>
    </div>
  </div>

  <!-- Status -->
  <div class="status-banner">
    <div class="status-icon">✅</div>
    <div>
      <div class="status-text">Booking Confirmed</div>
      <div class="status-sub">Your rental is active. Keep this receipt for your records.</div>
    </div>
  </div>

  <!-- Item -->
  <div class="item-section">
    <div class="item-section-title">📦 Rented Item</div>
    <div class="item-name">${rental.itemTitle}</div>
    <div class="item-meta">
      Category: ${rental.itemCategory || "—"} &nbsp;·&nbsp;
      City: ${rental.itemCity || "—"} &nbsp;·&nbsp;
      Condition: ${rental.itemCondition || "—"}
    </div>
  </div>

  <!-- Two columns: Renter + Rental Period -->
  <div class="two-col">
    <div class="info-box">
      <div class="info-box-title">👤 Renter Details</div>
      <div class="info-row"><span class="info-key">Name</span><span class="info-val">${rental.renterName || "—"}</span></div>
      <div class="info-row"><span class="info-key">Email</span><span class="info-val">${rental.renterEmail || "—"}</span></div>
      <div class="info-row"><span class="info-key">Phone</span><span class="info-val">${rental.renterPhone || "—"}</span></div>
    </div>
    <div class="info-box">
      <div class="info-box-title">📅 Rental Period</div>
      <div class="info-row"><span class="info-key">From</span><span class="info-val">${fmt(rental.startDate)}</span></div>
      <div class="info-row"><span class="info-key">To</span><span class="info-val">${fmt(rental.endDate)}</span></div>
      <div class="info-row"><span class="info-key">Duration</span><span class="info-val">${rental.days} day${rental.days > 1 ? "s" : ""}</span></div>
    </div>
  </div>

  <!-- Price table -->
  <table class="price-table">
    <thead>
      <tr>
        <th>Description</th>
        <th>Rate</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Rental Charge</td>
        <td>₹${rental.itemPrice || (rental.totalPrice / rental.days)} × ${rental.days} day${rental.days > 1 ? "s" : ""}</td>
        <td>₹${rental.totalPrice}</td>
      </tr>
      <tr class="deposit-row">
        <td>Refundable Deposit</td>
        <td>Returned after rental</td>
        <td>₹${rental.deposit}</td>
      </tr>
      <tr>
        <td>Platform Fee (2%)</td>
        <td>Service charge</td>
        <td>₹${rental.platformFee || 0}</td>
      </tr>
      <tr class="total-row">
        <td colspan="2">Total Paid</td>
        <td>₹${rental.grandTotal || (rental.totalPrice + rental.deposit + (rental.platformFee || 0))}</td>
      </tr>
    </tbody>
  </table>

  <!-- Payment info -->
  <div class="info-box" style="margin-bottom:28px;">
    <div class="info-box-title">💳 Payment Details</div>
    <div class="info-row"><span class="info-key">Payment ID</span><span class="info-val">${rental.paymentId || "Pending"}</span></div>
    <div class="info-row"><span class="info-key">Payment Method</span><span class="info-val">${rental.paymentMethod || "Razorpay"}</span></div>
    <div class="info-row"><span class="info-key">Payment Status</span><span class="info-val" style="color:#2e7d32">${rental.paymentStatus || "Paid"}</span></div>
    <div class="info-row"><span class="info-key">Booked On</span><span class="info-val">${now}</span></div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="footer-left">
      <div class="footer-brand">QuickRent</div>
      quickrent.in &nbsp;·&nbsp; support@quickrent.in<br/>
      This is a computer-generated receipt. No signature required.<br/>
      Receipt ID: ${rental.receiptId}
    </div>
    <div class="qr-placeholder">📱</div>
  </div>

</div>
</body>
</html>`;

  // Open in new window and trigger print/save as PDF
  const win = window.open("", "_blank", "width=800,height=900");
  win.document.write(html);
  win.document.close();
  win.focus();
  // Small delay to let fonts load before print dialog
  setTimeout(() => {
    win.print();
  }, 800);
}