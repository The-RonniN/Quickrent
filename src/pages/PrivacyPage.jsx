export default function PrivacyPage() {
  return (
    <>
      <style>{`
        .privacy-page { padding-top: 84px; min-height: 100vh; background: linear-gradient(180deg, #f9fafb 0%, #ffffff 45%, #f4f5f7 100%); font-family: 'DM Sans', sans-serif; }
        .privacy-hero { max-width: 1080px; margin: 0 auto; padding: 48px 32px 40px; background: linear-gradient(135deg, #15171d 0%, #2d343f 100%); border-radius: 32px; box-shadow: 0 30px 80px rgba(15, 23, 42, 0.16); position: relative; overflow: hidden; }
        .privacy-hero::before { content: ""; position: absolute; top: -24px; right: -90px; width: 220px; height: 220px; background: rgba(255, 107, 0, 0.14); border-radius: 50%; }
        .privacy-hero::after { content: ""; position: absolute; bottom: -36px; left: -80px; width: 210px; height: 210px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; }
        .privacy-badge { display: inline-flex; align-items: center; justify-content: center; padding: 10px 16px; border-radius: 999px; background: rgba(255, 107, 0, 0.16); color: #ffb37a; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 24px; }
        .privacy-hero h1 { font-family: 'Syne', sans-serif; font-size: clamp(2.4rem, 4vw, 3.6rem); color: #fff; margin: 0 0 18px; line-height: 1.02; }
        .privacy-hero p { max-width: 760px; color: rgba(255, 255, 255, 0.78); line-height: 1.9; font-size: 1.05rem; margin: 0; }
        .privacy-summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 34px; }
        .privacy-card { background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 24px; padding: 24px; color: #f5f5f5; box-shadow: 0 14px 34px rgba(0,0,0,0.08); }
        .privacy-card strong { display: block; font-family: 'Syne', sans-serif; font-size: 1.04rem; margin-bottom: 10px; }
        .privacy-card p { margin: 0; color: rgba(255, 255, 255, 0.78); line-height: 1.75; font-size: 0.95rem; }
        .privacy-body { max-width: 1080px; margin: 0 auto; padding: 42px 32px 80px; }
        .privacy-section { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
        .privacy-panel { background: #fff; border-radius: 24px; padding: 28px 32px; box-shadow: 0 22px 42px rgba(15, 23, 42, 0.06); }
        .privacy-panel h2 { font-family: 'Syne', sans-serif; font-size: 1.4rem; margin-bottom: 14px; color: #111827; }
        .privacy-panel p { margin: 0 0 14px; color: #374151; line-height: 1.8; font-size: 0.96rem; }
        .privacy-panel ul { padding-left: 20px; margin: 0; color: #374151; }
        .privacy-panel ul li { margin-bottom: 12px; line-height: 1.75; }
        .privacy-cta { max-width: 1080px; margin: 0 auto; padding: 0 32px 40px; display: flex; justify-content: space-between; align-items: center; gap: 20px; }
        .privacy-cta p { margin: 0; color: #4b5563; font-size: 0.96rem; line-height: 1.75; }
        .privacy-cta a { display: inline-flex; align-items: center; justify-content: center; padding: 14px 24px; background: #FF6B00; color: #fff; border-radius: 999px; text-decoration: none; font-weight: 700; transition: transform 0.2s, box-shadow 0.2s; }
        .privacy-cta a:hover { transform: translateY(-2px); box-shadow: 0 16px 32px rgba(255, 107, 0, 0.25); }
        @media (max-width: 960px) { .privacy-summary, .privacy-section { grid-template-columns: 1fr; } .privacy-cta { flex-direction: column; align-items: stretch; text-align: center; } }
        @media (max-width: 720px) { .privacy-hero { padding: 36px 20px 28px; } .privacy-body { padding: 32px 20px 70px; } }
      `}</style>
      <div className="privacy-page">
        <section className="privacy-hero">
          <div className="privacy-badge">Privacy First</div>
          <h1>Your data belongs to you — we keep it safe and transparent.</h1>
          <p>QuickRent is built to protect your personal information while giving you the freedom to rent and lend with confidence.</p>
          <div className="privacy-summary">
            <div className="privacy-card">
              <strong>Secure by design</strong>
              <p>Every account action and booking is protected by smart controls and secure session handling.</p>
            </div>
            <div className="privacy-card">
              <strong>Clear usage</strong>
              <p>We use data only to deliver the service, improve the platform, and keep our marketplace trustworthy.</p>
            </div>
            <div className="privacy-card">
              <strong>Your control</strong>
              <p>Update profile details, review settings, or request data removal when you need to.</p>
            </div>
          </div>
        </section>
        <div className="privacy-body">
          <div className="privacy-section">
            <div className="privacy-panel">
              <h2>Information we collect</h2>
              <p>We gather only what is necessary to support rentals, verify accounts, and keep transactions reliable.</p>
              <ul>
                <li>Personal details like name, email, phone, and profile data.</li>
                <li>Booking information, rental histories, and item preferences.</li>
                <li>Usage signals such as activity trends, browser type, and device details.</li>
              </ul>
            </div>
            <div className="privacy-panel">
              <h2>How we use your data</h2>
              <p>Your information is used to create a seamless rental experience, resolve issues quickly, and protect the community.</p>
              <ul>
                <li>Process bookings, manage payments, and support listing activity.</li>
                <li>Improve search relevance, item discovery, and personalized recommendations.</li>
                <li>Secure accounts and prevent unauthorized access or fraud.</li>
              </ul>
            </div>
          </div>
          <div className="privacy-section">
            <div className="privacy-panel">
              <h2>Sharing & retention</h2>
              <p>We never sell your personal data. Sharing happens only when needed for rental service delivery or legal compliance.</p>
              <p>We retain information as long as necessary to support your account and the services you use.</p>
            </div>
            <div className="privacy-panel">
              <h2>Your rights</h2>
              <p>You can review, update, or remove your account data at any time. If you have questions, our support team is ready to help.</p>
              <ul>
                <li>Access your stored information.</li>
                <li>Correct inaccurate account details.</li>
                <li>Request data deletion when you no longer need the service.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="privacy-cta">
          <p>Need help with your privacy settings? Reach out to our support team and we’ll guide you through the process.</p>
          <a href="#">Contact Support</a>
        </div>
      </div>
    </>
  );
}
