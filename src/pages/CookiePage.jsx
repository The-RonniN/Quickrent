export default function CookiePage() {
  return (
    <>
      <style>{`
        .cookies-page { padding-top: 84px; min-height: 100vh; background: linear-gradient(180deg, #f7f7fb 0%, #ffffff 40%, #fafafa 100%); font-family: 'DM Sans', sans-serif; }
        .cookies-hero { max-width: 1080px; margin: 0 auto; padding: 48px 32px 40px; background: linear-gradient(135deg, #121212 0%, #242424 100%); border-radius: 32px; box-shadow: 0 30px 80px rgba(18, 18, 18, 0.16); position: relative; overflow: hidden; }
        .cookies-hero::before { content: ""; position: absolute; top: -30px; right: -80px; width: 220px; height: 220px; background: rgba(255, 107, 0, 0.16); border-radius: 50%; }
        .cookies-hero::after { content: ""; position: absolute; bottom: -40px; left: -80px; width: 220px; height: 220px; background: rgba(255, 255, 255, 0.08); border-radius: 50%; }
        .cookies-hero-content { position: relative; z-index: 1; }
        .cookies-badge { display: inline-block; background: rgba(255, 107, 0, 0.16); color: #ffb37a; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 10px 16px; border-radius: 999px; margin-bottom: 24px; }
        .cookies-hero h1 { font-family: 'Syne', sans-serif; font-size: clamp(2.4rem, 4vw, 3.8rem); color: #ffffff; margin: 0 0 18px; line-height: 1.03; }
        .cookies-hero p { max-width: 760px; color: rgba(255, 255, 255, 0.78); line-height: 1.9; font-size: 1.05rem; margin: 0; }
        .cookies-summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 34px; }
        .cookies-card { background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 22px; padding: 24px; color: #f5f5f5; box-shadow: 0 14px 40px rgba(0,0,0,0.08); }
        .cookies-card strong { display: block; font-family: 'Syne', sans-serif; font-size: 1.06rem; margin-bottom: 10px; }
        .cookies-card p { margin: 0; color: rgba(255, 255, 255, 0.78); line-height: 1.75; font-size: 0.95rem; }
        .cookies-body { max-width: 1080px; margin: 0 auto; padding: 42px 32px 80px; }
        .cookies-section { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
        .cookies-section:nth-child(odd) .cookies-panel { background: #fff; }
        .cookies-panel { background: white; border-radius: 24px; padding: 28px 30px; box-shadow: 0 22px 40px rgba(15, 23, 42, 0.06); }
        .cookies-panel h2 { font-family: 'Syne', sans-serif; font-size: 1.4rem; margin-bottom: 14px; color: #111827; }
        .cookies-panel p { margin: 0 0 14px; color: #4b5563; line-height: 1.8; font-size: 0.96rem; }
        .cookies-panel ul { padding-left: 20px; margin: 0; color: #4b5563; }
        .cookies-panel ul li { margin-bottom: 12px; line-height: 1.8; }
        .cookies-action { max-width: 1080px; margin: 0 auto; padding: 0 32px 40px; display: flex; justify-content: space-between; align-items: center; gap: 20px; }
        .cookies-action p { margin: 0; color: #374151; font-size: 0.96rem; line-height: 1.75; }
        .cookies-action a { display: inline-flex; align-items: center; justify-content: center; padding: 14px 24px; background: #FF6B00; color: white; border-radius: 999px; text-decoration: none; font-weight: 700; transition: transform 0.2s, box-shadow 0.2s; }
        .cookies-action a:hover { transform: translateY(-2px); box-shadow: 0 16px 32px rgba(255, 107, 0, 0.25); }
        @media (max-width: 960px) { .cookies-summary { grid-template-columns: 1fr; } .cookies-section { grid-template-columns: 1fr; } .cookies-action { flex-direction: column; align-items: stretch; text-align: center; } }
      `}</style>
      <div className="cookies-page">
        <section className="cookies-hero">
          <div className="cookies-hero-content">
            <span className="cookies-badge">Cookie Policy</span>
            <h1>Cookies keep your QuickRent experience faster, safer, and more personal.</h1>
            <p>We use cookies and similar technologies to save your preferences, secure your session, and tailor the platform so renting and listing items feels effortless.</p>
          </div>
          <div className="cookies-summary">
            <div className="cookies-card">
              <strong>Essential cookies</strong>
              <p>These are required for login, checkout, and secure browsing. They keep QuickRent working the way it should.</p>
            </div>
            <div className="cookies-card">
              <strong>Performance cookies</strong>
              <p>These help us understand how the site performs so we can make pages faster and more reliable for everyone.</p>
            </div>
            <div className="cookies-card">
              <strong>Functional cookies</strong>
              <p>These save your layout preferences, language choices, and settings so the site feels customized to you.</p>
            </div>
          </div>
        </section>
        <div className="cookies-body">
          <div className="cookies-section">
            <div className="cookies-panel">
              <h2>What cookies do</h2>
              <p>Cookies are small pieces of data that help QuickRent remember your choices and deliver a faster booking experience.</p>
              <p>They also protect your account by keeping sessions secure and detecting unusual activity on the platform.</p>
            </div>
            <div className="cookies-panel">
              <h2>Managing cookies</h2>
              <p>You can control cookie settings through your browser or device preferences at any time.</p>
              <ul>
                <li>Allow essential cookies to keep core features working.</li>
                <li>Disable performance cookies if you prefer less tracking.</li>
                <li>Note that disabling some cookies may affect your QuickRent experience.</li>
              </ul>
            </div>
          </div>
          <div className="cookies-section">
            <div className="cookies-panel">
              <h2>How we use cookies</h2>
              <p>We use cookies to remember your settings, show relevant content, and analyze site performance so the marketplace stays fast.</p>
              <p>That includes making sure search results load quickly and your rental checkout is smooth.</p>
            </div>
            <div className="cookies-panel">
              <h2>Cookie safety</h2>
              <p>QuickRent only uses cookies for support and site improvement. We do not sell your cookie data to third parties.</p>
              <p>If you have questions about how cookies work, we’re happy to help — just reach out to support.</p>
            </div>
          </div>
        </div>
        <div className="cookies-action">
          <p>If you'd like, you can manage your cookie preferences in your browser settings or contact our support team for assistance.</p>
          <a href="#">Contact Support</a>
        </div>
      </div>
    </>
  );
}
