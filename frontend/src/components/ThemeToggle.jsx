// frontend/src/components/ThemeToggle.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ variant = "segmented", className = "" }) {
  const { theme, setTheme, isStorefront } = useTheme();

  if (variant === "select") {
    return (
      <div className={`relative inline-flex items-center gap-1.5 ${className}`}>
        <span className="text-xs text-gray-500 hidden sm:inline">Theme:</span>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="text-xs font-semibold py-1.5 px-2.5 rounded-lg border border-[#E8E4DC] bg-white text-[#1A1E20] outline-none cursor-pointer hover:border-[#0E2721] transition-colors shadow-sm"
          aria-label="Select Theme"
        >
          <option value="storefront">🌿 Storefront (New)</option>
          <option value="classic">⚡ Classic (Previous)</option>
        </select>
      </div>
    );
  }

  // Segmented dual switch option
  return (
    <div
      className={`inline-flex items-center p-1 rounded-full border shadow-sm transition-all ${
        isStorefront
          ? "bg-[#F3F0EA] border-[#E8E4DC]"
          : "bg-[#22252A] border-white/10"
      } ${className}`}
      role="group"
      aria-label="Theme Switcher"
    >
      {/* Storefront Theme Option */}
      <button
        type="button"
        onClick={() => setTheme("storefront")}
        className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
          theme === "storefront"
            ? isStorefront
              ? "bg-[#0E2721] text-white shadow-sm"
              : "bg-white text-[#0E2721] shadow-sm"
            : isStorefront
            ? "text-[#575D60] hover:text-[#0E2721]"
            : "text-white/70 hover:text-white"
        }`}
        title="Switch to Storefront Theme (Editorial UI)"
      >
        <span>🌿</span>
        <span>Storefront</span>
      </button>

      {/* Classic Theme Option (Previous UI) */}
      <button
        type="button"
        onClick={() => setTheme("classic")}
        className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
          theme === "classic"
            ? isStorefront
              ? "bg-[#E24B36] text-white shadow-sm"
              : "bg-brand-primary text-white shadow-sm"
            : isStorefront
            ? "text-[#575D60] hover:text-[#1A1E20]"
            : "text-white/70 hover:text-white"
        }`}
        title="Switch to Classic Theme (Previous UI)"
      >
        <span>⚡</span>
        <span>Classic</span>
      </button>
    </div>
  );
}
