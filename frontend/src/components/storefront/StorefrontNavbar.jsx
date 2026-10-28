import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ThemeToggle";

export default function StorefrontNavbar({
  currentPage,
  navigate,
  openAuth,
  wishlistCount = 0,
}) {
  const { user, handleLogout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("rent", { search: searchQuery.trim() });
    }
  };

  const navLinks = [
    { label: "Home", page: "home" },
    { label: "Catalog", page: "rent" },
    { label: "List Item", page: "list" },
    { label: "About", page: "about" },
    { label: "Terms", page: "terms" },
  ];

  return (
    <header className="w-full bg-white border-b border-[#E8E4DC] sticky top-0 z-40 transition-shadow duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-[4vw] h-[80px] flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => navigate("home")}
          className="flex items-center gap-3 cursor-pointer select-none flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-lg bg-[#0E2721] flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm">
            Q
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-2xl font-bold tracking-tight text-[#1A1E20] leading-none">
              QuickRent
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#686E70] mt-1 font-sans">
              Curated Living
            </span>
          </div>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.page}
              type="button"
              onClick={() => navigate(link.page)}
              className={`text-sm font-medium transition-colors hover:text-[#0E2721] ${
                currentPage === link.page
                  ? "text-[#0E2721] font-semibold border-b-2 border-[#0E2721] pb-1"
                  : "text-[#575D60]"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Search Input & Action Icons */}
        <div className="flex items-center gap-3 md:gap-4 flex-1 lg:flex-initial justify-end">
          {/* Prominent Theme Switcher */}
          <div className="hidden sm:block">
            <ThemeToggle variant="segmented" />
          </div>

          {/* Elongated Search Bar from image */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex items-center relative w-[220px] md:w-[280px]"
          >
            <span className="absolute left-3.5 text-gray-400 text-sm pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E4DC] rounded-full outline-none focus:border-[#0E2721] focus:bg-white transition-all text-[#1A1E20] placeholder:text-[#8C9396]"
            />
          </form>

          {/* User Profile */}
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
                className="w-9 h-9 rounded-full bg-[#FAF9F5] hover:bg-[#EBF3F0] border border-[#E8E4DC] flex items-center justify-center text-[#1A1E20] text-sm transition-colors"
                title={user.name}
              >
                👤
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E8E4DC] py-2 z-50 text-xs"
                  onClick={() => setProfileOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-gray-100 font-semibold text-[#1A1E20] truncate">
                    {user.name}
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("profile")}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF9F5] text-[#575D60]"
                  >
                    My Rentals & Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("list")}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF9F5] text-[#575D60]"
                  >
                    List an Item
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openAuth("login")}
              className="w-9 h-9 rounded-full bg-[#FAF9F5] hover:bg-[#EBF3F0] border border-[#E8E4DC] flex items-center justify-center text-[#1A1E20] text-sm transition-colors"
              title="Sign in"
            >
              👤
            </button>
          )}

          {/* Wishlist Icon */}
          <button
            type="button"
            onClick={() => navigate("profile", { tab: "wishlist" })}
            className="relative w-9 h-9 rounded-full bg-[#FAF9F5] hover:bg-[#EBF3F0] border border-[#E8E4DC] flex items-center justify-center text-[#1A1E20] text-sm transition-colors"
            title="Wishlist"
          >
            <span>♡</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0E2721] text-white text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart / Bag Icon with Badge (0) */}
          <button
            type="button"
            onClick={() => navigate("rent")}
            className="relative w-9 h-9 rounded-full bg-[#FAF9F5] hover:bg-[#EBF3F0] border border-[#E8E4DC] flex items-center justify-center text-[#1A1E20] text-sm transition-colors"
            title="Rental Bag"
          >
            <span>🛍️</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0E2721] text-white text-[10px] font-bold flex items-center justify-center">
              0
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden w-9 h-9 rounded-full bg-[#FAF9F5] border border-[#E8E4DC] flex items-center justify-center text-[#1A1E20] text-sm"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E4DC] bg-white px-6 py-4 flex flex-col gap-3">
          <div className="sm:hidden flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-500">Theme View:</span>
            <ThemeToggle variant="segmented" />
          </div>
          <form onSubmit={handleSearchSubmit} className="flex sm:hidden items-center relative mb-2">
            <span className="absolute left-3.5 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E4DC] rounded-full outline-none"
            />
          </form>
          {navLinks.map((link) => (
            <button
              key={link.page}
              type="button"
              onClick={() => {
                navigate(link.page);
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-sm font-medium text-[#1A1E20] hover:text-[#0E2721]"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
