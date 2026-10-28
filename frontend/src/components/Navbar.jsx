// frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ currentPage, navigate, openAuth, wishlistCount = 0 }) {
  const { user, handleLogout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = currentPage === "home";
  const isTransparent = isHome && !scrolled;

  const links = [
    { label: "Home", page: "home" },
    { label: "Store", page: "rent" },
    { label: "List Item", page: "list" },
    { label: "About Us", page: "about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] px-[4vw] flex items-center justify-between transition-all duration-200 border-b ${
        isTransparent
          ? "bg-[#16181C]/50 border-white/10 text-white backdrop-blur-md"
          : "bg-white border-brand-border text-brand-dark shadow-sm"
      }`}
    >
      {/* Brand Logo */}
      <div
        onClick={() => navigate("home")}
        className="flex items-center gap-2.5 cursor-pointer select-none"
      >
        <div className="w-[38px] h-[38px] bg-brand-primary rounded-[9px] flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
          QR
        </div>
        <span className="text-xl font-bold tracking-tight">
          Quick<span className="text-brand-primary">Rent</span>
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <button
            key={link.page}
            type="button"
            onClick={() => navigate(link.page)}
            className={`text-sm font-semibold transition-colors hover:text-brand-primary ${
              currentPage === link.page
                ? "text-brand-primary"
                : isTransparent
                ? "text-white/90"
                : "text-brand-muted"
            }`}
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* Right Actions & Auth */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Prominent Theme Switcher Segment */}
        <div className="hidden sm:block">
          <ThemeToggle variant="segmented" />
        </div>

        {/* Wishlist Link */}
        <button
          type="button"
          onClick={() => navigate("profile", { tab: "wishlist" })}
          className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${
            isTransparent ? "hover:bg-white/10 text-white" : "hover:bg-gray-100 text-brand-dark"
          }`}
          aria-label={`Wishlist with ${wishlistCount} items`}
        >
          <span>❤️</span>
          <span className="font-bold text-xs">{wishlistCount}</span>
        </button>

        {user ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm hover:bg-brand-primary/20 transition-colors"
            >
              <span>👤</span>
              <span className="max-w-[100px] truncate">{user.name}</span>
            </button>

            {profileOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-card shadow-card border border-brand-border py-2 text-brand-dark z-50 animate-in fade-in"
                onClick={() => setProfileOpen(false)}
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="text-xs text-brand-muted uppercase font-semibold">Signed in as</div>
                  <div className="text-sm font-bold truncate">{user.name}</div>
                  <div className="text-xs text-brand-primary capitalize mt-0.5">{user.role}</div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("profile")}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-brand-bg transition-colors"
                >
                  Dashboard & Rentals
                </button>
                <button
                  type="button"
                  onClick={() => navigate("list")}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-brand-bg transition-colors"
                >
                  List an Item
                </button>
                <div className="border-t border-gray-100 my-1" />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openAuth("login")}
              className={`text-sm font-bold px-4 py-2 rounded-base transition-colors ${
                isTransparent ? "text-white hover:bg-white/10" : "text-brand-dark hover:bg-gray-100"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => openAuth("signup")}
              className="text-sm font-bold px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white rounded-base shadow-soft transition-colors"
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-base hover:bg-white/10"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden fixed top-[72px] left-0 right-0 bg-white border-b border-brand-border p-6 shadow-card flex flex-col gap-4 text-brand-dark z-50">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-500">Theme View:</span>
            <ThemeToggle variant="segmented" />
          </div>
          {links.map((link) => (
            <button
              key={link.page}
              type="button"
              onClick={() => {
                navigate(link.page);
                setMenuOpen(false);
              }}
              className="text-left font-semibold text-base py-2 border-b border-gray-50"
            >
              {link.label}
            </button>
          ))}
          {!user && (
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  openAuth("login");
                  setMenuOpen(false);
                }}
                className="flex-1 py-2.5 border border-brand-border rounded-base font-bold text-sm"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  openAuth("signup");
                  setMenuOpen(false);
                }}
                className="flex-1 py-2.5 bg-brand-primary text-white rounded-base font-bold text-sm"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
