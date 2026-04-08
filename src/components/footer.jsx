import React from "react";

export default function Footer({ navigate }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <style>{`
        .footer {
          background-color: #1a1a1a;
          color: #f0f0f0;
          font-family: 'DM Sans', sans-serif;
          padding: 80px 48px 30px;
          border-top: 4px solid #FF6B00;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .footer-brand h2 {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 16px 0;
          cursor: pointer;
        }

        .footer-brand h2 span {
          color: #FF6B00;
        }

        .footer-brand p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          font-size: 0.95rem;
          max-width: 300px;
          margin-bottom: 24px;
        }

        .social-links {
          display: flex;
          gap: 16px;
        }

        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          transition: all 0.3s;
          font-size: 1.2rem;
        }

        .social-link:hover {
          background: #FF6B00;
          transform: translateY(-3px);
        }

        .footer-links h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          color: #fff;
          margin: 0 0 24px 0;
          font-weight: 700;
        }

        .footer-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-links li a {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.2s;
          cursor: pointer;
        }

        .footer-links li a:hover {
          color: #FF6B00;
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.85rem;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-bottom-links {
          display: flex;
          gap: 24px;
        }

        .footer-bottom-links a {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-bottom-links a:hover {
          color: #fff;
        }

        @media (max-width: 900px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
          .footer-brand {
            grid-column: span 2;
          }
        }

        @media (max-width: 600px) {
          .footer {
            padding: 60px 24px 30px;
          }
          .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .footer-brand {
            grid-column: span 1;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <div className="footer-content">
        <div className="footer-brand">
          <h2 onClick={() => navigate("home")}>Quick<span>Rent</span></h2>
          <p>The ultimate peer-to-peer rental marketplace. Borrow what you need, lend what you don't. Tap. Rent. Move. Now!</p>
          <div className="social-links">
            <a href="#" className="social-link" title="Twitter">𝕏</a>
            <a href="#" className="social-link" title="Instagram">📸</a>
            <a href="#" className="social-link" title="LinkedIn">💼</a>
            <a href="#" className="social-link" title="Facebook">📘</a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Categories</h3>
          <ul>
            <li><a onClick={() => navigate("rent")}>Electronics</a></li>
            <li><a onClick={() => navigate("rent")}>Vehicles</a></li>
            <li><a onClick={() => navigate("rent")}>Party & Events</a></li>
            <li><a onClick={() => navigate("rent")}>Sports & Outdoor</a></li>
            <li><a onClick={() => navigate("rent")}>Tools & Equipment</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a onClick={() => navigate("home")}>Home</a></li>
            <li><a onClick={() => navigate("rent")}>Browse Items</a></li>
            <li><a onClick={() => navigate("list")}>List an Item</a></li>
            <li><a onClick={() => navigate("about")}>About Us</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Support</h3>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Trust & Safety</a></li>
            <li><a href="#">Cancellation Policy</a></li>
            <li><a href="#">Contact Support</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          © {currentYear} QuickRent. All rights reserved.
        </div>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}