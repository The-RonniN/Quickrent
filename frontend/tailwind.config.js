/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#E24B36",
          hover: "#C93C29",
          light: "#FDF1EF",
          dark: "#1A1D20",
          surface: "#22252A",
          muted: "#6C757D",
          border: "#E8E8E6",
          bg: "#FAF9F8",
          star: "#F59E0B",
        },
        store: {
          forest: "#0E2721",
          forestHover: "#163A32",
          bg: "#FAF9F5",
          card: "#FFFFFF",
          border: "#E8E4DC",
          heading: "#1A1E20",
          body: "#575D60",
          gold: "#F59E0B",
          badge: "#EBF3F0",
        },
      },
      fontFamily: {
        editorial: [
          '"Playfair Display"',
          "Georgia",
          "serif",
        ],
        sans: [
          '"Plus Jakarta Sans"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 2px 10px rgba(0, 0, 0, 0.05)",
        card: "0 4px 18px rgba(0, 0, 0, 0.07)",
        hover: "0 12px 28px rgba(0, 0, 0, 0.10)",
      },
      borderRadius: {
        base: "8px",
        card: "14px",
        modal: "20px",
      },
    },
  },
  plugins: [],
}
