// frontend/src/components/storefront/StorefrontTrustStrip.jsx
import React from "react";

export default function StorefrontTrustStrip() {
  const perks = [
    {
      icon: "🚚",
      title: "Doorstep Delivery",
      desc: "Free delivery & assembly on select tenures",
    },
    {
      icon: "🛡️",
      title: "Secure Escrow",
      desc: "100% safe deposits, fast return refunds",
    },
    {
      icon: "🌿",
      title: "Quality Sanitized",
      desc: "Multipoint inspection & fresh hygiene",
    },
    {
      icon: "🎧",
      title: "Rental Support",
      desc: "Assistance available 7 days a week",
    },
  ];

  return (
    <section className="w-full bg-[#FAF9F5] py-8">
      <div className="max-w-7xl mx-auto px-[4vw]">
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shadow-sm">
          {perks.map((p, idx) => (
            <div
              key={p.title}
              className={`flex items-start gap-4 ${
                idx !== 0 ? "lg:border-l lg:border-[#F0ECE4] lg:pl-6" : ""
              }`}
            >
              <div className="w-11 h-11 rounded-full bg-[#FAF9F5] border border-[#E8E4DC] flex items-center justify-center text-xl flex-shrink-0">
                {p.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1A1E20] mb-0.5">
                  {p.title}
                </h4>
                <p className="text-xs text-[#686E70] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
