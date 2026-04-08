export default function TermsPage() {
  return (
    <>
      <style>{`
        .terms-page { padding-top: 84px; min-height: 100vh; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 45%, #f3f4f6 100%); font-family: 'DM Sans', sans-serif; }
        .terms-hero { max-width: 1080px; margin: 0 auto; padding: 48px 32px 40px; background: linear-gradient(135deg, #111827 0%, #2f3a51 100%); border-radius: 32px; box-shadow: 0 30px 80px rgba(15, 23, 42, 0.16); position: relative; overflow: hidden; }
        .terms-hero::before { content: ""; position: absolute; top: -28px; right: -86px; width: 220px; height: 220px; background: rgba(255, 107, 0, 0.14); border-radius: 50%; }
        .terms-hero::after { content: ""; position: absolute; bottom: -34px; left: -72px; width: 210px; height: 210px; background: rgba(255, 255, 255, 0.08); border-radius: 50%; }
        .terms-badge { display: inline-flex; align-items: center; justify-content: center; padding: 10px 16px; border-radius: 999px; background: rgba(255, 107, 0, 0.16); color: #ffb37a; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 24px; }
        .terms-hero h1 { font-family: 'Syne', sans-serif; font-size: clamp(2.4rem, 4vw, 3.6rem); color: #fff; margin: 0 0 18px; line-height: 1.02; }
        .terms-hero p { max-width: 760px; color: rgba(255, 255, 255, 0.78); line-height: 1.9; font-size: 1.05rem; margin: 0; }
        .terms-summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 34px; }
        .terms-card { background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 24px; padding: 24px; color: #f5f5f5; box-shadow: 0 14px 34px rgba(0,0,0,0.08); }
        .terms-card strong { display: block; font-family: 'Syne', sans-serif; font-size: 1.04rem; margin-bottom: 10px; }
        .terms-card p { margin: 0; color: rgba(255, 255, 255, 0.78); line-height: 1.75; font-size: 0.95rem; }
        .terms-body { max-width: 1080px; margin: 0 auto; padding: 42px 32px 80px; }
        .terms-section { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
        .terms-panel { background: #fff; border-radius: 24px; padding: 28px 32px; box-shadow: 0 22px 42px rgba(15, 23, 42, 0.06); }
        .terms-panel h2 { font-family: 'Syne', sans-serif; font-size: 1.4rem; margin-bottom: 14px; color: #111827; }
        .terms-panel p { margin: 0 0 14px; color: #374151; line-height: 1.8; font-size: 0.96rem; }
        .terms-panel ul { padding-left: 20px; margin: 0; color: #374151; }
        .terms-panel ul li { margin-bottom: 12px; line-height: 1.75; }
        .terms-cta { max-width: 1080px; margin: 0 auto; padding: 0 32px 40px; display: flex; justify-content: space-between; align-items: center; gap: 20px; }
        .terms-cta p { margin: 0; color: #4b5563; font-size: 0.96rem; line-height: 1.75; }
        .terms-cta a { display: inline-flex; align-items: center; justify-content: center; padding: 14px 24px; background: #FF6B00; color: #fff; border-radius: 999px; text-decoration: none; font-weight: 700; transition: transform 0.2s, box-shadow 0.2s; }
        .terms-cta a:hover { transform: translateY(-2px); box-shadow: 0 16px 32px rgba(255, 107, 0, 0.25); }
        @media (max-width: 960px) { .terms-summary, .terms-section { grid-template-columns: 1fr; } .terms-cta { flex-direction: column; align-items: stretch; text-align: center; } }
        @media (max-width: 720px) { .terms-hero { padding: 36px 20px 28px; } .terms-body { padding: 32px 20px 70px; } }
      `}</style>
      <div className="terms-page">
        <section className="terms-hero">
          <div className="terms-badge">Terms of Service</div>
          <h1>Rules for renting and sharing on QuickRent, made clear and easy to follow.</h1>
          <p>These terms define how renters, listers, and the platform interact so every transaction stays fair and trusted.</p>
          <div className="terms-summary">
            <div className="terms-card">
              <strong>Fair use</strong>
              <p>Everyone must use QuickRent respectfully, honestly, and in line with the platform’s community standards.</p>
            </div>
            <div className="terms-card">
              <strong>Secure bookings</strong>
              <p>Payments and deposits must be completed before rentals begin so both parties are protected.</p>
            </div>
            <div className="terms-card">
              <strong>Community safety</strong>
              <p>Bad behavior, fraud, or misrepresentation may result in restrictions or account suspension.</p>
            </div>
          </div>
        </section>
        <div className="terms-body">
          <div className="terms-section">
            <div className="terms-panel">
              <h2>Using QuickRent</h2>
              <p>By using QuickRent, you agree to provide accurate information, respect other users, and follow all applicable laws.</p>
              <p>Accounts must represent real individuals, and listings should be honest and accurate.</p>
            </div>
            <div className="terms-panel">
              <h2>Booking & Payment</h2>
              <p>Renters must pay the rental fee and any deposit for a booking to be confirmed. Owners should keep items available and ready as promised.</p>
              <ul>
                <li>Payments must be completed before pickup or delivery.</li>
                <li>Deposits are held to protect against loss or damage.</li>
                <li>Refunds follow the platform’s cancellation and damage policies.</li>
              </ul>
            </div>
          </div>
          <div className="terms-section">
            <div className="terms-panel">
              <h2>Safety & Conduct</h2>
              <p>QuickRent is a community marketplace. Harassment, fraud, and policy abuse are not tolerated.</p>
              <p>Report issues quickly, inspect items carefully, and communicate openly with your rental partner.</p>
            </div>
            <div className="terms-panel">
              <h2>Support & disputes</h2>
              <p>If a rental issue arises, contact support right away. We’ll help resolve disputes fairly and keep the marketplace safe.</p>
            </div>
          </div>
        </div>
        <div className="terms-cta">
          <p>Questions about your rights or obligations on QuickRent? Contact support for help and fast guidance.</p>
          <a href="#">Contact Support</a>
        </div>
      </div>
    </>
  );
}
