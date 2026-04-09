import { useEffect, useRef } from "react";
import Footer from "../components/footer";

export default function AboutPage({ navigate }) {

  const countersStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersStarted.current) {
          countersStarted.current = true;
          document.querySelectorAll(".counter").forEach((counter) => {
            let start = 0;
            const end = parseInt(counter.dataset.target);
            const step = Math.ceil(end / 70);
            const update = () => {
              start += step;
              if (start < end) {
                counter.innerText = start;
                requestAnimationFrame(update);
              } else {
                counter.innerText = end;
              }
            };
            update();
          });
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector(".stats-section");
    if (statsSection) statsObserver.observe(statsSection);

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Satoshi:wght@400;500;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .about-root {
          font-family: 'Satoshi', 'DM Sans', sans-serif;
          background: #0a0a0a;
          color: #fff;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        h1, h2, h3 {
          font-family: 'Clash Display', 'Syne', sans-serif;
        }

        /* ── REVEAL ANIMATIONS ── */
        .reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-left {
          opacity: 0;
          transform: translateX(-60px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .reveal-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .reveal-right {
          opacity: 0;
          transform: translateX(60px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .reveal-right.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .delay-1 { transition-delay: 0.1s !important; }
        .delay-2 { transition-delay: 0.2s !important; }
        .delay-3 { transition-delay: 0.3s !important; }
        .delay-4 { transition-delay: 0.4s !important; }

        /* ── HERO ── */
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 80px 8% 60px;
          position: relative;
          overflow: hidden;
        }
        .hero-section::before {
          content: '';
          position: absolute;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(255,107,0,0.18) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,107,0,0.12);
          border: 1px solid rgba(255,107,0,0.3);
          border-radius: 100px;
          padding: 6px 18px;
          font-size: 0.82rem;
          color: #FF8C30;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 28px;
          animation: fadeDown 0.8s ease both;
        }
        .hero-eyebrow span { width: 6px; height: 6px; border-radius: 50%; background: #FF6B00; display: inline-block; }
        .hero-title {
          font-size: clamp(2.8rem, 6vw, 5.2rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -1.5px;
          animation: fadeDown 1s ease 0.1s both;
        }
        .hero-title .grad {
          background: linear-gradient(100deg, #FF6B00 30%, #FFB347 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          max-width: 620px;
          margin: 22px auto 0;
          color: #a0a0a0;
          line-height: 1.85;
          font-size: 1.1rem;
          animation: fadeDown 1s ease 0.2s both;
        }
        .hero-actions {
          display: flex;
          gap: 14px;
          margin-top: 40px;
          animation: fadeDown 1s ease 0.3s both;
          flex-wrap: wrap;
          justify-content: center;
        }
        .btn-primary {
          padding: 14px 34px;
          background: #FF6B00;
          color: #fff;
          font-weight: 700;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          transition: transform 0.25s, box-shadow 0.25s, background 0.25s;
          font-family: inherit;
        }
        .btn-primary:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 12px 32px rgba(255,107,0,0.35);
          background: #ff7a1a;
        }
        .btn-outline {
          padding: 14px 34px;
          background: transparent;
          color: #fff;
          font-weight: 600;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.2);
          cursor: pointer;
          font-size: 1rem;
          transition: border-color 0.25s, background 0.25s;
          font-family: inherit;
        }
        .btn-outline:hover { border-color: #FF6B00; background: rgba(255,107,0,0.07); }

        .hero-scroll {
          margin-top: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: #555;
          font-size: 0.78rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          animation: fadeDown 1.2s ease 0.5s both;
        }
        .hero-scroll-line {
          width: 1px;
          height: 50px;
          background: linear-gradient(to bottom, #FF6B00, transparent);
          animation: scrollPulse 2s infinite;
        }

        /* ── MARQUEE ── */
        .marquee-wrapper {
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 18px 0;
          background: rgba(255,107,0,0.04);
        }
        .marquee-track {
          display: flex;
          gap: 60px;
          animation: marquee 22s linear infinite;
          width: max-content;
        }
        .marquee-item {
          font-size: 0.82rem;
          color: #666;
          letter-spacing: 2px;
          text-transform: uppercase;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .marquee-item::after {
          content: '◆';
          color: #FF6B00;
          font-size: 0.5rem;
        }

        /* ── STORY ── */
        .story-section {
          padding: 110px 8%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          max-width: 1300px;
          margin: auto;
        }
        .story-label {
          color: #FF6B00;
          font-size: 0.78rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          margin-bottom: 14px;
          font-weight: 600;
        }
        .story-heading {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.5px;
          margin-bottom: 22px;
        }
        .story-body { color: #999; line-height: 1.9; font-size: 1rem; }
        .story-body + .story-body { margin-top: 14px; }

        .story-visual {
          position: relative;
          height: 420px;
        }
        .story-card {
          position: absolute;
          background: #161616;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 22px;
          padding: 28px;
          transition: transform 0.4s;
        }
        .story-card:hover { transform: translateY(-8px) !important; }
        .story-card.c1 { top: 0; left: 0; width: 200px; }
        .story-card.c2 { top: 60px; right: 0; width: 220px; }
        .story-card.c3 { bottom: 0; left: 30px; width: 240px; }
        .story-card-icon { font-size: 2rem; margin-bottom: 10px; }
        .story-card-title { font-size: 0.95rem; font-weight: 600; margin-bottom: 5px; }
        .story-card-text { font-size: 0.82rem; color: #888; line-height: 1.6; }
        .story-orb {
          position: absolute;
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          animation: pulse 4s ease-in-out infinite;
        }

        /* ── HOW IT WORKS ── */
        .hiw-section {
          padding: 110px 8%;
          background: #0d0d0d;
        }
        .section-header {
          text-align: center;
          margin-bottom: 70px;
        }
        .section-label {
          color: #FF6B00;
          font-size: 0.78rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          margin-bottom: 12px;
          font-weight: 600;
        }
        .section-title {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 2px;
          max-width: 1100px;
          margin: auto;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          overflow: hidden;
        }
        .step-card {
          background: #111;
          padding: 40px 32px;
          position: relative;
          transition: background 0.3s;
        }
        .step-card:hover { background: #161616; }
        .step-num {
          font-size: 3.5rem;
          font-weight: 700;
          color: rgba(255,107,0,0.15);
          font-family: 'Clash Display', sans-serif;
          line-height: 1;
          margin-bottom: 16px;
        }
        .step-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 8px; }
        .step-desc { font-size: 0.88rem; color: #777; line-height: 1.7; }
        .step-accent {
          position: absolute;
          top: 0; left: 0;
          width: 3px;
          height: 0;
          background: #FF6B00;
          transition: height 0.4s ease;
          border-radius: 0 0 3px 3px;
        }
        .step-card:hover .step-accent { height: 100%; }

        /* ── FEATURES ── */
        .features-section {
          padding: 110px 8%;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
          max-width: 1200px;
          margin: auto;
        }
        .feature-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 22px;
          padding: 36px 28px;
          transition: transform 0.35s, border-color 0.35s, background 0.35s;
          cursor: default;
        }
        .feature-card:hover {
          transform: translateY(-10px);
          border-color: rgba(255,107,0,0.4);
          background: #151515;
        }
        .feature-icon-box {
          width: 52px;
          height: 52px;
          background: rgba(255,107,0,0.1);
          border: 1px solid rgba(255,107,0,0.2);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 20px;
          transition: background 0.3s;
        }
        .feature-card:hover .feature-icon-box {
          background: rgba(255,107,0,0.2);
        }
        .feature-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 10px; }
        .feature-desc { font-size: 0.88rem; color: #777; line-height: 1.75; }

        /* ── STATS ── */
        .stats-section {
          padding: 100px 8%;
          background: linear-gradient(135deg, #111 0%, #0e0a07 100%);
          border-top: 1px solid rgba(255,107,0,0.12);
          border-bottom: 1px solid rgba(255,107,0,0.12);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          max-width: 1100px;
          margin: auto;
          text-align: center;
        }
        .stat-card {
          padding: 40px 20px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 22px;
          transition: border-color 0.3s, transform 0.3s;
        }
        .stat-card:hover { border-color: rgba(255,107,0,0.35); transform: scale(1.04); }
        .stat-value {
          font-size: 3rem;
          font-weight: 700;
          color: #FF6B00;
          font-family: 'Clash Display', sans-serif;
          line-height: 1;
        }
        .stat-suffix { font-size: 2rem; color: #FF6B00; }
        .stat-label { margin-top: 10px; font-size: 0.88rem; color: #777; letter-spacing: 0.5px; }

        /* ── TESTIMONIALS ── */
        .testimonials-section {
          padding: 110px 8%;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 22px;
          max-width: 1100px;
          margin: auto;
        }
        .testimonial-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 22px;
          padding: 32px;
          transition: transform 0.35s, border-color 0.35s;
        }
        .testimonial-card:hover { transform: translateY(-8px); border-color: rgba(255,107,0,0.3); }
        .testimonial-stars { color: #FF6B00; font-size: 1rem; margin-bottom: 18px; }
        .testimonial-text { color: #aaa; font-size: 0.95rem; line-height: 1.8; font-style: italic; margin-bottom: 24px; }
        .testimonial-author { display: flex; align-items: center; gap: 12px; }
        .testimonial-avatar {
          width: 42px; height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF6B00, #FFB347);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 0.9rem; color: #fff;
          flex-shrink: 0;
        }
        .testimonial-name { font-size: 0.9rem; font-weight: 600; }
        .testimonial-city { font-size: 0.78rem; color: #666; }

        /* ── CTA ── */
        .cta-section {
          padding: 130px 8%;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .cta-title {
          font-size: clamp(2rem, 4vw, 3.4rem);
          font-weight: 700;
          letter-spacing: -1px;
          max-width: 700px;
          margin: auto;
          line-height: 1.2;
        }
        .cta-sub { color: #888; margin: 18px auto 40px; max-width: 500px; line-height: 1.8; font-size: 1rem; }

        /* ── KEYFRAMES ── */
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
        }

        @media (max-width: 900px) {
          .story-section { grid-template-columns: 1fr; gap: 40px; }
          .story-visual { height: 300px; }
        }
        @media (max-width: 600px) {
          .story-visual { display: none; }
        }
      `}</style>

      <div className="about-root">

        {/* ── HERO ── */}
        <section className="hero-section">
          {/* <div className="hero-eyebrow">
            <span></span>
            India's Smartest Rental Platform
          </div> */}
          <h1 className="hero-title">
            Rent Anything.<br /><span className="grad">Own Less. Live More.</span>
          </h1>
          <p className="hero-sub">
            QuickRent connects people across India to share unused items — from cameras to tools to sports gear — saving money, reducing waste, and building community.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => window.location.href = "/"}>
              Explore Rentals
            </button>
            <button className="btn-outline" onClick={() => {
              document.querySelector('.story-section').scrollIntoView({ behavior: 'smooth' });
            }}>
              Our Story ↓
            </button>
          </div>
          <div className="hero-scroll">
            <div className="hero-scroll-line"></div>
            <span>scroll</span>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...Array(2)].map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: '60px' }}>
                {["Instant Rentals", "Verified Users", "Zero Brokerage", "30+ Cities", "Smart Sharing", "Affordable Access", "Trusted Community", "Eco-Friendly"].map((t) => (
                  <div className="marquee-item" key={t}>{t}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── OUR STORY ── */}
        <div className="story-section">
          <div className="reveal reveal-left">
            <p className="story-label">Our Story</p>
            <h2 className="story-heading">Built for India's Sharing Economy</h2>
            <p className="story-body">
              The idea for QuickRent was born from a simple frustration — thousands of useful items sitting idle in homes across India while people spent money buying things they'd only use for a few days.
            </p>
            <p className="story-body" style={{ marginTop: '14px' }}>
              We envisioned a platform where a camera in Mumbai could serve a photographer in Pune, where a power drill in Bengaluru could build something beautiful nearby. A truly connected sharing ecosystem.
            </p>
          </div>
          <div className="story-visual reveal reveal-right">
            <div className="story-orb"></div>
            <div className="story-card c1" style={{ transform: 'rotate(-3deg)' }}>
              <div className="story-card-icon">📸</div>
              <div className="story-card-title">DSLR Camera</div>
              <div className="story-card-text">₹600/day · Mumbai</div>
            </div>
            <div className="story-card c2" style={{ transform: 'rotate(2deg)' }}>
              <div className="story-card-icon">🛠️</div>
              <div className="story-card-title">Power Tools</div>
              <div className="story-card-text">₹250/day · Pune</div>
            </div>
            <div className="story-card c3" style={{ transform: 'rotate(-1.5deg)' }}>
              <div className="story-card-icon">🎿</div>
              <div className="story-card-title">Sports Gear</div>
              <div className="story-card-text">₹400/day · Delhi</div>
            </div>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <section className="hiw-section">
          <div className="section-header reveal">
            <p className="section-label">How It Works</p>
            <h2 className="section-title">Simple. Fast. Reliable.</h2>
          </div>
          <div className="steps-grid">
            {[
              { n: "01", title: "Browse Nearby", desc: "Explore thousands of items listed by verified owners near your location." },
              { n: "02", title: "Book Instantly", desc: "Select dates, confirm details, and book with a few taps. No waiting." },
              { n: "03", title: "Meet & Rent", desc: "Connect with the owner, pick up the item, and get on with your day." },
              { n: "04", title: "Return & Review", desc: "Return when done and leave a review to help the community grow." },
            ].map((s, i) => (
              <div className={`step-card reveal delay-${i + 1}`} key={s.n}>
                <div className="step-accent"></div>
                <div className="step-num">{s.n}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="features-section">
          <div className="section-header reveal">
            <p className="section-label">Why QuickRent</p>
            <h2 className="section-title">Everything You Need to Rent Smarter</h2>
          </div>
          <div className="features-grid">
            {[
              { icon: "⚡", title: "Instant Rentals", desc: "Find and rent items within minutes near your location. No lengthy processes." },
              { icon: "🔐", title: "Trusted & Verified", desc: "Every user is verified. Every listing is screened. Your safety is our priority." },
              { icon: "💸", title: "Zero Brokerage", desc: "No middlemen. No hidden charges. What you see is what you pay." },
              { icon: "🌍", title: "Eco-Friendly", desc: "Reduce consumer waste by giving idle items a second life in your community." },
              { icon: "📍", title: "Hyper-Local", desc: "Rentals from people near you — faster pickup, lower cost, real connections." },
              { icon: "🛡️", title: "Damage Protection", desc: "Optional damage protection plans for both owners and renters, built in." },
            ].map((f, i) => (
              <div className={`feature-card reveal delay-${(i % 3) + 1}`} key={f.title}>
                <div className="feature-icon-box">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── STATS ── */}
        {/* <section className="stats-section">
          <div className="section-header reveal">
            <p className="section-label">Our Growth</p>
            <h2 className="section-title">Numbers That Tell the Story</h2>
          </div>
          <div className="stats-grid">
            {[
              { target: 20, suffix: "+", label: "Active Users" },
              { target: 1200, suffix: "+", label: "Products Listed" },
              { target: 30, suffix: "+", label: "Cities Connected" },
              { target: 95, suffix: "%", label: "User Satisfaction" },
            ].map((s, i) => (
              <div className={`stat-card reveal delay-${i + 1}`} key={s.label}>
                <div className="stat-value">
                  <span className="counter" data-target={s.target}>0</span>
                  <span className="stat-suffix">{s.suffix}</span>
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section> */}

        {/* ── TESTIMONIALS ── */}
        <section className="testimonials-section">
          <div className="section-header reveal">
            <p className="section-label">Testimonials</p>
            <h2 className="section-title">People Love QuickRent</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { initials: "AK", name: "Aryan Kapoor", city: "Mumbai", text: "Rented a DSLR for my sister's wedding for just ₹600/day. Saved me ₹80,000 in buying one. Absolutely brilliant platform." },
              { initials: "PM", name: "Priya Mehta", city: "Bangalore", text: "Listed my camping gear and made ₹4,000 last month without lifting a finger. QuickRent just works." },
              { initials: "RS", name: "Rohit Sharma", city: "Pune", text: "The verification process makes me feel safe. I've done 12 rentals and every single one was smooth." },
            ].map((t, i) => (
              <div className={`testimonial-card reveal delay-${i + 1}`} key={t.name}>
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-city">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="reveal">
            <h2 className="cta-title">Start Renting Smarter Today</h2>
            <p className="cta-sub">Join thousands of Indians already saving money and sharing resources through QuickRent.</p>
            <button className="btn-primary" style={{ fontSize: '1.05rem', padding: '16px 42px' }}
              onClick={() => window.location.href = "/"}>
              Explore Rentals →
            </button>
          </div>
        </section>

        

      </div>
    </>
  );
}