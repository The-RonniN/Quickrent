// frontend/src/components/storefront/StorefrontFooter.jsx
import React, { useState } from "react";

export default function StorefrontFooter({ navigate }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#0E2721] text-white pt-16 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Decorative leaf watermark background in corner */}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none text-9xl select-none">
        🌿
      </div>

      <div className="max-w-7xl mx-auto px-[4vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2 flex flex-col">
            <div
              onClick={() => navigate("home")}
              className="flex items-center gap-3 cursor-pointer select-none mb-3"
            >
              <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white font-serif font-bold text-lg">
                Q
              </div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-white">
                QuickRent
              </span>
            </div>
            <p className="text-xs text-white/70 max-w-sm leading-relaxed mb-6">
              Flexible furniture and essentials rental platform designed for contemporary living. Quality checked, doorstep delivered, and hassle-free.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 text-white/80 text-sm">
              <a href="#facebook" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                f
              </a>
              <a href="#instagram" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                📷
              </a>
              <a href="#pinterest" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                📌
              </a>
              <a href="#youtube" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                ▶
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 mb-4 font-sans">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button type="button" onClick={() => navigate("home")} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate("rent")} className="hover:text-white transition-colors">
                  Catalog
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate("list")} className="hover:text-white transition-colors">
                  List Your Item
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate("about")} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 mb-4 font-sans">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button type="button" onClick={() => navigate("about")} className="hover:text-white transition-colors">
                  Shipping & Setup
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate("terms")} className="hover:text-white transition-colors">
                  Rental Agreement
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate("privacy")} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate("cookie")} className="hover:text-white transition-colors">
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>

          {/* Join Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 mb-2 font-sans">
              Join Our Newsletter
            </h4>
            <p className="text-xs text-white/70 mb-4 leading-relaxed">
              Get the latest updates, design inspiration, and exclusive rental offers.
            </p>

            {subscribed ? (
              <div className="p-3 bg-white/10 border border-white/20 rounded-xl text-xs text-white">
                ✓ You are subscribed to QuickRent!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full pl-3.5 pr-10 py-2.5 text-xs bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/50 outline-none focus:border-white focus:bg-white/15 transition-all"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 w-7 h-7 rounded-full bg-white text-[#0E2721] flex items-center justify-center text-xs font-bold hover:bg-gray-100 transition-colors"
                >
                  →
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/60 gap-4">
          <div>© {new Date().getFullYear()} QuickRent. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>Verified Escrow</span>
            <span>·</span>
            <span>Eco-Friendly Circulation</span>
            <span>·</span>
            <span>24/7 Concierge</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
